<?php
/**
 * TEMPORARY diagnostic for waitlist notification delivery.
 *
 * Reports whether smtp.ini was found and parsed and whether an SMTP session can
 * be established, without ever printing the password. Guarded by a token so it
 * is not a public information leak.
 *
 * DELETE THIS FILE once notifications are confirmed working.
 */

declare(strict_types=1);

const DIAG_TOKEN = 'N64a1NUEZFyNTa5OwrI8U3V1_qIZEuXZ';

if (!hash_equals(DIAG_TOKEN, (string) ($_GET['k'] ?? ''))) {
    http_response_code(404);
    exit;
}

define('LABELNEST_INTERNAL', true);
require __DIR__ . '/_smtp.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$docRoot = (string) ($_SERVER['DOCUMENT_ROOT'] ?? '');
$dir = dirname($docRoot) . '/waitlist-data';
$ini = $dir . '/smtp.ini';

$out = [
    'document_root' => $docRoot,
    'data_dir' => $dir,
    'data_dir_exists' => is_dir($dir),
    'data_dir_writable' => is_writable($dir),
    'ini_path' => $ini,
    'ini_exists' => is_file($ini),
    'ini_readable' => is_readable($ini),
    'ini_size' => is_file($ini) ? filesize($ini) : null,
];

// What else is in the data directory? Names only.
$out['data_dir_listing'] = is_dir($dir)
    ? array_values(array_diff(scandir($dir) ?: [], ['.', '..']))
    : [];

// Raw parse result, with the password reduced to its length.
if (is_file($ini) && is_readable($ini)) {
    $raw = @parse_ini_file($ini);
    $out['ini_parsed'] = is_array($raw);
    if (is_array($raw)) {
        $out['ini_keys'] = array_keys($raw);
        $out['ini_host'] = $raw['host'] ?? null;
        $out['ini_port'] = $raw['port'] ?? null;
        $out['ini_user'] = $raw['user'] ?? null;
        $out['ini_pass_length'] = isset($raw['pass']) ? strlen((string) $raw['pass']) : 0;
    } else {
        // Show the shape of the file so a quoting mistake is visible, but never
        // the value after "pass".
        $lines = @file($ini, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
        $out['ini_line_shapes'] = array_map(
            static fn(string $l): string => preg_replace('/(pass\s*=\s*).*/i', '$1<redacted>', $l) ?? '',
            $lines
        );
    }
}

// Does smtp_config() accept it?
$cfg = smtp_config($dir);
$out['smtp_config_ok'] = $cfg !== null;

// Can we actually reach Hostinger SMTP and authenticate?
if ($cfg !== null) {
    $err = '';
    $t0 = microtime(true);
    $ok = smtp_send(
        $cfg,
        $cfg['user'],
        'Labelnest SMTP diagnostic',
        "This message confirms the waitlist endpoint can send over authenticated SMTP.\n",
        $cfg['user'],
        $err
    );
    $out['smtp_send_ok'] = $ok;
    $out['smtp_error'] = $err;
    $out['smtp_ms'] = (int) ((microtime(true) - $t0) * 1000);
}

// What channel did recent real signups actually use?
$logPath = $dir . '/notify-failures.log';
if (is_file($logPath)) {
    $lines = @file($logPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
    $out['notify_log_tail'] = array_slice($lines, -8);
    $out['notify_log_lines'] = count($lines);
} else {
    $out['notify_log_tail'] = '(file absent — every notification went out over SMTP)';
}

// How many signups are recorded, and when was the last one?
$sig = $dir . '/signups.jsonl';
if (is_file($sig)) {
    $rows = @file($sig, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
    $out['signup_count'] = count($rows);
    $last = json_decode((string) end($rows), true);
    $out['last_signup_at'] = is_array($last) ? ($last['at'] ?? null) : null;
}

// Is outbound 465 open from this server at all?
$probe = @stream_socket_client('ssl://smtp.hostinger.com:465', $n, $e, 10);
$out['port_465_reachable'] = (bool) $probe;
$out['port_465_error'] = $probe ? '' : $e;
if ($probe) {
    fclose($probe);
}

echo json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
