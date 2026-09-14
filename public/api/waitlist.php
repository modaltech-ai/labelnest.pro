<?php
/**
 * Waitlist intake.
 *
 * Same-origin endpoint for the landing page form. Appends each signup to a
 * JSON Lines file kept OUTSIDE the document root — the Node build overwrites
 * public_html on every deploy, so anything stored in there would be lost, and
 * anything readable in there would be a public list of email addresses.
 *
 * No database, no third party, no credentials to leak.
 */

declare(strict_types=1);

define('LABELNEST_INTERNAL', true);
require __DIR__ . '/_smtp.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const NOTIFY_TO      = 'hello@labelnest.pro';
const MAX_PER_IP     = 5;      // per window
const WINDOW_SECONDS = 3600;

/** Storage lives one level above public_html and survives redeploys. */
function storage_dir(): string
{
    $dir = dirname($_SERVER['DOCUMENT_ROOT']) . '/waitlist-data';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    return $dir;
}

function fail(int $code, string $message): never
{
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'Method not allowed.');
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 8192) {
    fail(413, 'Request too large.');
}

$body = json_decode($raw, true);
if (!is_array($body)) {
    fail(400, 'Expected a JSON body.');
}

// Honeypot: a real person never fills this. Answer 200 so bots learn nothing.
if (trim((string) ($body['company'] ?? '')) !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$email = trim((string) ($body['email'] ?? ''));
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    fail(422, 'That does not look like an email address.');
}

$label  = mb_substr(trim((string) ($body['label'] ?? '')), 0, 200);
$source = mb_substr(trim((string) ($body['source'] ?? '')), 0, 40);
$ip     = (string) ($_SERVER['REMOTE_ADDR'] ?? '');

$dir = storage_dir();
if (!is_dir($dir) || !is_writable($dir)) {
    error_log('waitlist: storage dir not writable: ' . $dir);
    fail(500, 'Could not record the signup.');
}

// Rate limit per IP, so one client cannot flood the list.
$rateFile = $dir . '/rate-' . hash('sha256', $ip . '|labelnest') . '.json';
$now      = time();
$hits     = [];
if (is_file($rateFile)) {
    $decoded = json_decode((string) file_get_contents($rateFile), true);
    if (is_array($decoded)) {
        $hits = array_values(array_filter(
            $decoded,
            static fn($t): bool => is_int($t) && $t > $now - WINDOW_SECONDS
        ));
    }
}
if (count($hits) >= MAX_PER_IP) {
    header('Retry-After: ' . WINDOW_SECONDS);
    fail(429, 'Too many signups from here. Try again later.');
}
$hits[] = $now;
@file_put_contents($rateFile, json_encode($hits), LOCK_EX);

$record = [
    'email'      => $email,
    'label'      => $label,
    'source'     => $source,
    'ip'         => $ip,
    'user_agent' => mb_substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
    'at'         => gmdate('c'),
];

$line    = json_encode($record, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";
$written = @file_put_contents($dir . '/signups.jsonl', $line, FILE_APPEND | LOCK_EX);

if ($written === false) {
    error_log('waitlist: failed to append signup');
    fail(500, 'Could not record the signup.');
}

// Notification is best effort — a mail failure must not lose a signup that is
// already safely on disk. But it must never fail *silently*. Every early
// notification bounced ("User doesn't exist") and nothing recorded it, because
// this call used to discard its return value.
$subject = 'Labelnest waitlist: ' . $email;
$bodyText = "Email:  {$email}\n"
    . 'Label:  ' . ($label !== '' ? $label : '—') . "\n"
    . "Source: {$source}\n"
    . "When:   {$record['at']}\n";

$sent = false;
$how = '';
$err = '';

// Preferred: authenticated SMTP as the mailbox, so SPF and DKIM line up with
// the From address and the message reaches the inbox rather than spam.
$cfg = smtp_config($dir);
if ($cfg !== null) {
    $how = 'smtp';
    $sent = smtp_send($cfg, $cfg['notify'], $subject, $bodyText, $email, $err);
}

// Fallback: PHP mail(). Delivers, but the web server cannot sign for this
// domain, so the message is likely to be filed as spam.
if (!$sent) {
    $how = $how === 'smtp' ? 'smtp-failed/mail' : 'mail';
    $sent = @mail(
        NOTIFY_TO,
        $subject,
        $bodyText,
        implode("\r\n", [
            'From: Labelnest <' . NOTIFY_TO . '>',
            'Reply-To: ' . $email,
            'Content-Type: text/plain; charset=utf-8',
        ])
    );
}

if (!$sent || $how !== 'smtp') {
    // Either nobody was told, or they were told over the channel that lands in
    // spam. Both are worth knowing about without reading the mail logs.
    @file_put_contents(
        $dir . '/notify-failures.log',
        gmdate('c') . "\t{$how}\t" . ($sent ? 'accepted' : 'NOT SENT')
            . "\t{$email}\t{$err}\n",
        FILE_APPEND | LOCK_EX
    );
    if (!$sent) {
        error_log('waitlist: could not send notification for ' . $email . ' — ' . $err);
    }
}

echo json_encode(['ok' => true]);
