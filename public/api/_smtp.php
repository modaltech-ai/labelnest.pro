<?php
/**
 * Minimal authenticated SMTP sender.
 *
 * PHP's mail() sends from the web server, which labelnest.pro's SPF record does
 * not authorise and which cannot DKIM-sign for the domain. Hostinger also forces
 * the envelope sender, so the -f parameter is ignored. The result passes SPF for
 * the *server's* domain but fails DMARC alignment for ours, and lands in spam.
 *
 * Sending as the mailbox through Hostinger's SMTP fixes all three: the envelope
 * sender is hello@labelnest.pro, SPF authorises it, and Hostinger DKIM-signs it.
 *
 * Credentials live OUTSIDE the document root and are never committed — see
 * smtp_config() below.
 */

declare(strict_types=1);

if (!defined('LABELNEST_INTERNAL')) {
    http_response_code(404);
    exit;
}

/**
 * Reads waitlist-data/smtp.ini, which sits beside the signups file, one level
 * above public_html. Returns null when it is absent, so the caller can fall
 * back to mail() rather than dropping the notification.
 *
 * Expected contents:
 *   host   = smtp.hostinger.com
 *   port   = 465
 *   user   = hello@labelnest.pro
 *   pass   = <mailbox password>
 *   notify = you@example.com   ; optional, see below
 *
 * `notify` is where signup alerts are sent. It defaults to the mailbox itself,
 * but mail from an address to that same address, sent automatically, on a
 * young domain, is a well-known spam heuristic — Hostinger filed ours as spam
 * even with SPF and DKIM passing. Pointing `notify` at a different inbox avoids
 * the self-addressed pattern entirely.
 */
function smtp_config(string $dir): ?array
{
    $path = $dir . '/smtp.ini';
    if (!is_file($path) || !is_readable($path)) {
        return null;
    }
    $cfg = @parse_ini_file($path);
    if (!is_array($cfg) || empty($cfg['user']) || empty($cfg['pass'])) {
        return null;
    }
    $notify = trim((string) ($cfg['notify'] ?? ''));
    return [
        'host' => (string) ($cfg['host'] ?? 'smtp.hostinger.com'),
        'port' => (int) ($cfg['port'] ?? 465),
        'user' => (string) $cfg['user'],
        'pass' => (string) $cfg['pass'],
        // Fall back to the mailbox when no separate destination is configured.
        'notify' => $notify !== '' && filter_var($notify, FILTER_VALIDATE_EMAIL)
            ? $notify
            : (string) $cfg['user'],
    ];
}

/** Reads one SMTP reply (handling multi-line 250-FOO continuations). */
function smtp_read($fp): string
{
    $out = '';
    while (($line = fgets($fp, 1024)) !== false) {
        $out .= $line;
        // A space in the 4th position marks the final line of the reply.
        if (strlen($line) < 4 || $line[3] === ' ') {
            break;
        }
    }
    return $out;
}

/** Sends one command and asserts the reply opens with $expect. */
function smtp_cmd($fp, string $cmd, string $expect, string &$err): bool
{
    if ($cmd !== '') {
        fwrite($fp, $cmd . "\r\n");
    }
    $reply = smtp_read($fp);
    if (strncmp($reply, $expect, strlen($expect)) !== 0) {
        // Never echo the command back — it may carry the password.
        $err = 'expected ' . $expect . ', got ' . trim(substr($reply, 0, 90));
        return false;
    }
    return true;
}

/**
 * @return bool True when the server accepted the message for delivery.
 */
function smtp_send(array $cfg, string $to, string $subject, string $body, string $replyTo, string &$err): bool
{
    $err = '';
    $transport = $cfg['port'] === 465 ? 'ssl://' : 'tcp://';
    $fp = @stream_socket_client(
        $transport . $cfg['host'] . ':' . $cfg['port'],
        $errno,
        $errstr,
        15,
        STREAM_CLIENT_CONNECT
    );
    if (!$fp) {
        $err = 'connect failed: ' . $errstr;
        return false;
    }
    stream_set_timeout($fp, 15);

    $ok = smtp_cmd($fp, '', '220', $err)
        && smtp_cmd($fp, 'EHLO labelnest.pro', '250', $err)
        && smtp_cmd($fp, 'AUTH LOGIN', '334', $err)
        && smtp_cmd($fp, base64_encode($cfg['user']), '334', $err)
        && smtp_cmd($fp, base64_encode($cfg['pass']), '235', $err)
        && smtp_cmd($fp, 'MAIL FROM:<' . $cfg['user'] . '>', '250', $err)
        && smtp_cmd($fp, 'RCPT TO:<' . $to . '>', '250', $err)
        && smtp_cmd($fp, 'DATA', '354', $err);

    if (!$ok) {
        @fclose($fp);
        return false;
    }

    $headers = [
        'Date: ' . gmdate('r'),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@labelnest.pro>',
        'From: Labelnest <' . $cfg['user'] . '>',
        'To: <' . $to . '>',
        'Reply-To: <' . $replyTo . '>',
        'Subject: ' . $subject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=utf-8',
        'Content-Transfer-Encoding: 8bit',
        'Auto-Submitted: auto-generated',
    ];

    // Dot-stuffing: a line that is just "." would otherwise end the message.
    $safeBody = preg_replace('/^\./m', '..', str_replace("\n", "\r\n", $body));

    fwrite($fp, implode("\r\n", $headers) . "\r\n\r\n" . $safeBody . "\r\n.\r\n");

    $accepted = smtp_cmd($fp, '', '250', $err);

    // QUIT is a courtesy; its outcome does not change whether the message was
    // accepted. $quitErr must still be a real string — smtp_cmd() types it, and
    // an undefined variable here is a TypeError that @ does not suppress.
    $quitErr = '';
    smtp_cmd($fp, 'QUIT', '221', $quitErr);
    @fclose($fp);

    return $accepted;
}
