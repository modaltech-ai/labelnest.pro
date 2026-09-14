<?php
/**
 * TEMPORARY: remove the verification rows written into signups.jsonl while the
 * waitlist endpoint was being built and debugged.
 *
 * The file lives outside the document root, so it cannot be edited through the
 * hosting API — hence a guarded endpoint rather than a file edit.
 *
 * Deliberately conservative:
 *   - `?dry=1` (the default) changes nothing and reports what *would* go.
 *   - A timestamped backup is written before any row is removed.
 *   - Only rows carrying the exact test marker, or one of the known test
 *     addresses, are considered. Everything else is kept.
 *
 * DELETE THIS FILE once the list is clean.
 */

declare(strict_types=1);

const CLEANUP_TOKEN = 'Q_VtIfvbIWIHyIYmAnVV_WtJgO0lhyqZ';
const TEST_LABEL = 'TEST ENTRY - delete me';

/** Addresses used during verification that may lack the label (form submits). */
const TEST_EMAILS = [
    'browser-check@labelnest.pro',
    'deploy-test@labelnest.pro',
    'delivery-check@labelnest.pro',
    'delivery-check-2@labelnest.pro',
    'smtp-check@labelnest.pro',
    'inbox-test@labelnest.pro',
    'final-check@labelnest.pro',
];

if (!hash_equals(CLEANUP_TOKEN, (string) ($_GET['k'] ?? ''))) {
    http_response_code(404);
    exit;
}

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$dry = ($_GET['dry'] ?? '1') !== '0';
$dir = dirname((string) ($_SERVER['DOCUMENT_ROOT'] ?? '')) . '/waitlist-data';
$path = $dir . '/signups.jsonl';

if (!is_file($path)) {
    echo json_encode(['ok' => false, 'error' => 'signups.jsonl not found', 'path' => $path]);
    exit;
}

$lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];

/** A row is test data only if it says so. Anything unparseable is kept. */
function isTestRow(string $line): bool
{
    $row = json_decode($line, true);
    if (!is_array($row)) {
        return false;
    }
    if (trim((string) ($row['label'] ?? '')) === TEST_LABEL) {
        return true;
    }
    return in_array(strtolower(trim((string) ($row['email'] ?? ''))), TEST_EMAILS, true);
}

$keep = [];
$drop = [];
foreach ($lines as $line) {
    if (isTestRow($line)) {
        $row = json_decode($line, true);
        $drop[] = ['email' => $row['email'] ?? '?', 'at' => $row['at'] ?? '?'];
    } else {
        $keep[] = $line;
    }
}

$remaining = array_map(static function (string $l): array {
    $r = json_decode($l, true);
    return is_array($r)
        ? ['email' => $r['email'] ?? '?', 'label' => $r['label'] ?? '', 'at' => $r['at'] ?? '?']
        : ['email' => '(unparseable — kept)', 'label' => '', 'at' => ''];
}, $keep);

$result = [
    'ok' => true,
    'dry_run' => $dry,
    'total_before' => count($lines),
    'would_remove' => count($drop),
    'removed' => $drop,
    'total_after' => count($keep),
    'remaining' => $remaining,
];

if (!$dry) {
    $backup = $dir . '/signups.jsonl.bak-' . gmdate('Ymd-His');
    if (!@copy($path, $backup)) {
        echo json_encode(['ok' => false, 'error' => 'could not write a backup; nothing changed']);
        exit;
    }
    $written = @file_put_contents(
        $path,
        $keep ? implode("\n", $keep) . "\n" : '',
        LOCK_EX
    );
    if ($written === false) {
        echo json_encode(['ok' => false, 'error' => 'write failed; backup kept at ' . $backup]);
        exit;
    }
    $result['backup'] = $backup;
    $result['applied'] = true;
}

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
