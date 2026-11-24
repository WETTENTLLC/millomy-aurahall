# WETT Girls 30-Song Challenge — Implementation Specification

Status: Draft / not live  
Development branch: `feature/wett-girls-30-song-competition`

## Confirmed competition format

- 30 original challenge entries.
- Round 1: fans may select up to 2 different songs; 15 advance.
- Round 2 (Top 15): fans may select up to 2 different songs; 8 advance.
- Final (Top 8): fans select exactly 1 winner.
- Official ballot is intended to live on the WETT Girls website.
- Daily campaign publishing cadence.
- Campaign reviewer: wettentertainmentllc@gmail.com.
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

A production ballot therefore must not be implemented as client-only counting. The project needs a server-capable deployment and a persistent backend before votes can be accepted. A managed database/auth provider (for example Supabase) is a candidate, subject to account ownership and environment-secret configuration.

## Not yet approved / must remain configurable

- Exact round dates and closing times.
- Voter eligibility and verification method (email OTP is a candidate).
- Tie-break procedure.
- Whether voting is geographically or age restricted.
- Final prize fulfillment details and any eligibility/selection conditions.
- Public results format and whether totals are published.

## Release gates

- No live voting until server-side storage, voter verification, duplicate prevention, admin access controls, rate limiting, and audit/export tests pass.
- No deployment to the production domain until the owner reviews the preview and approves launch.
- No social posts are published or scheduled without content approval.
