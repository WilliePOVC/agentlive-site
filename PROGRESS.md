# PROGRESS

## Done

- **M0. Scaffold.** Repo `WilliePOVC/agentlive-site` created public. Brand Kit assets copied in
  unchanged from `WilliePOVC/AgentLive.Events-Design-Kit` (`tokens/`, `fonts/`, `logo/`,
  `favicon/`, `components/components.css`). Kit version verified: `components/index.html` reads
  "Connecting agents to wholesale." under the first pillar. `.nojekyll`, `CNAME`,
  `site.config.json`, `WEBSITE_HANDOFF.md`, `PROGRESS.md` committed.
  Desktop TTF font files were not copied: the web needs only woff2, and the TTFs are for desktop
  document use (kit README). This keeps the page weight inside the 200 KB budget.

- **M1. Home page.** Every section in 4.1. All 39 copy strings verified character for character
  against the spec with an automated check. Responsive at 360 / 768 / 1280 / 1600.

- **M2. Why now and the small pages.** 4.2 and 4.3. All nav, footer and in-page links resolve
  (checked automatically across every page).

- **M3. Pre-launch behaviours.** Counter fed from `site.config.json`, disabled copy box that stays
  focusable and announces its reason, waitlist with both the JavaScript and no-JavaScript paths.
  Verified against the live Apps Script endpoint:
  valid email -> "You're on the list."; duplicate -> success, no new row; honeypot -> silent
  success, nothing stored; invalid address -> "That didn't go through."

- **M4. Agent and crawler files.** `llms.txt`, placeholder `SKILL.md`, `robots.txt`, and the
  noindex meta on all five pages. Live copies diffed byte for byte against section 6.

- **M5. Live on agentlive.events.** HTTPS enforced, certificate approved for the apex and www
  (expires 2026-12-20). `https://agentlive.events` returns 200 with a valid certificate,
  `http://www.agentlive.events` 301s to the apex, unknown paths serve the custom 404,
  and `robots.txt` disallows everything.

## Next

- M6. Review with Willie on a phone and a laptop.

## Blocked

Nothing.

## Notes and decisions

- Repo is **public**, as specced (section A1) and confirmed by Willie on September 22, 2026.
  GitHub Pages on a free plan requires it.
- `waitlist/Code.gs` is a reference copy only; the script runs from the Google Sheet, not the repo.
- Two site-only CSS fixes were needed beyond the kit, both in `site.css` and neither touching kit
  files: the `.plaintext` block keeps its authored line breaks inside the narrower `.split` column
  (it scrolls rather than re-wrapping and orphaning words), and the comparison table is prevented
  from propagating its ~506 px min-content width up through the flex/grid ancestors on phones.
- The home page hero leaves deliberate whitespace under the conversation panel on desktop; the
  panel is top-aligned per the kit, which matches the tear sheet.

## For Willie, at launch

These are the section 9 launch-switch items that need a human, recorded here so they are not lost:

1. Replace the static experiences figure with the platform's live count (`source: api`).
2. Counsel review of "Lowest all-in price" and the plain-text names on the wire strip.
3. Real `/SKILL.md` served by the platform; placeholder removed; `llms.txt` updated to live.
4. Enable the copy button, link the Skill / MCP / API cards, remove the waitlist, email the list.
5. Set `mode: live`, remove noindex from every page, replace `robots.txt`, add a sitemap.
6. Optional: add agentlive.events as a verified domain in GitHub account settings so nobody else
   can claim it on Pages if this repo is ever removed. This needs Willie's account access.
