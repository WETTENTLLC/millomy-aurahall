# WETT Girls 30-Song Challenge — Implementation Specification

Status: Draft / not live  
Development branch: `feature/wett-girls-30-song-competition`  
Confirmed Supabase project: `WETT Girls`  
Supabase project reference: `ynnanrasjzuhcwauxttg`

## Confirmed competition format

- 30 original challenge entries.
- Round 1: fans may select up to 2 different songs; 15 advance.
- Round 2 (Top 15): fans may select up to 2 different songs; 8 advance.
- Final (Top 8): fans select up to 1 song.
- Official ballot is intended to live on the WETT Girls website.
- Daily campaign publishing cadence.
- Campaign reviewer: wettentertainment@gmail.com.
- The winning song's prize has been described as a full music video or special visual.

## Ballot requirements

1. Display all active songs for the current round with consistent song-title spelling and original challenge numbers.
2. Enforce the selection cap in the interface and again on the server.
3. Prevent selecting the same song twice.
4. Require a verified voter identity and enforce one submitted ballot per voter per round.
5. Store ballots server-side; never use browser localStorage as the vote ledger.
6. Keep live vote totals private until the round closes.
7. Record immutable submission timestamps and round IDs.
8. Provide an administrator-only results view and an exportable audit record.
9. Publish round opening/closing times, advancement rules, and tie-break rules before voting opens.
10. Include privacy notice, eligibility rules, and abuse/rate-limit protections.

## Technical audit findings

The existing project is a Next.js 14 app configured with `output: 'export'` in `next.config.js` and a static-export `vercel.json`. The inspected repository has no existing vote database, API route, authentication provider, or server-side ballot handler. The existing `/admin` page reads visitor information from localStorage and is not a secure voting administration system.

The owner confirmed the existing Supabase project is named WETT Girls and supplied project reference `ynnanrasjzuhcwauxttg`. Its project URL is `https://ynnanrasjzuhcwauxttg.supabase.co`. The URL/reference is not a credential and does not provide database access by itself.

## Database foundation added to this branch

Migration: `supabase/migrations/202611230001_wett_girls_competition.sql`

The migration is prepared but **has not been applied** to Supabase. It creates:
- The 30-song master list with exact owner-approved titles and original challenge numbers.
- Three draft rounds with the approved selection limits.
- Round-to-song lineup records for the opening 30-song round.
- A private ballot ledger with one ballot per authenticated voter per round.
- A ballot submission RPC that requires a Supabase-authenticated user with a confirmed email, checks the round window and lineup, enforces the selection cap, and prevents duplicate ballots.
- Row-level security that permits reading published lineup data but does not expose ballot records to client roles.

The migration deliberately leaves all rounds in `draft`; it does not open voting. Administrative result access and round management must use trusted server-side credentials only. Never put a Supabase service-role key in browser code or commit it to Git.

## Remaining implementation work

- Apply and verify the migration in the confirmed WETT Girls Supabase project.
- Configure email OTP / magic-link verification and its redirect URLs.
- Implement a client ballot UI that calls the secure RPC only after sign-in.
- Add server-side/admin-only round management, tally/export, and audit controls.
- Add rate limiting / abuse controls and privacy/eligibility notices.
- Replace or adjust the static-export deployment architecture as needed for secure admin/server functions; alternatively keep public UI static and use Supabase Edge Functions for privileged operations.
- Test duplicate submissions, unverified users, closed rounds, invalid songs, over-limit selections, and unauthorized results access.

## Not yet approved / must remain configurable

- Exact round dates and closing times.
- Voter eligibility details beyond verified-email account requirement.
- Tie-break procedure.
- Whether voting is geographically or age restricted.
- Final prize fulfillment details and any eligibility/selection conditions.
- Public results format and whether totals are published.

## Release gates

- No live voting until server-side storage, voter verification, duplicate prevention, admin access controls, rate limiting, and audit/export tests pass.
- Do not apply the migration or change project settings without explicit authorization to modify the Supabase project.
- No deployment to the production domain until the owner reviews the preview and approves launch.
- No social posts are published or scheduled without content approval.
