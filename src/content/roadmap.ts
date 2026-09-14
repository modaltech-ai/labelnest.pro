import type { Dual } from '../voice'

/** Split verified in CLAIMS.md. Moving a line between these two lists is a
 *  factual claim — check the product code first. */
export const SHIPPED: Dual<string[]> = {
  plain: [
    'Releases and catalogue',
    'Contacts and who knows who',
    'Demos and signing',
    'Promo, and who supported it',
    'Events, budgets and guest lists',
    'Marketing campaigns',
    'Sample library',
    'To-do lists and templates',
    'Files, with older versions kept',
    'Reports',
    'Search across everything',
    'Permissions, two-step sign-in, change history',
    'Each label sealed off from every other',
    'Your own web address',
    'Your own storage, email and alerts',
  ],
  tech: [
    'Releases and catalogue',
    'Contacts and relationships',
    'Demos and A&R',
    'Promo distribution and feedback',
    'Events, budgets and guest lists',
    'Campaigns',
    'Sample library',
    'Tasks and templates',
    'Files and versioning',
    'Reports',
    'Search across every module',
    'Roles, two-factor and audit log',
    'Workspace isolation in the database',
    'Custom domains with DNS verification',
    'Your own storage, email, Telegram and AI keys',
  ],
}

export const BUILDING: Dual<string[]> = {
  plain: [
    'Signing up and paying online, by yourself',
    'Invitation and password emails',
    'A public catalogue page you can share',
    'A proper phone version',
    'Shop links filled in automatically',
    'Sales and streaming numbers per release',
    'Sending updates to other tools you use',
    'Adding your own extra fields',
  ],
  tech: [
    'Self-serve signup and billing',
    'Email delivery for invites and password resets',
    'A public catalogue page you can share without a login',
    'Installable mobile app (PWA)',
    'Store and streaming links pulled automatically from a UPC',
    'Per-release sales and stream figures',
    'Outbound webhooks',
    'Custom fields',
  ],
}
