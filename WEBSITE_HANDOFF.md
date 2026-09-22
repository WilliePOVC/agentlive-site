# AgentLive.Events Website: Design Spec and Build Handoff

Version 1.5, September 21, 2026. Owner: Willie. Final for build. Builder: Willie's OpenClaw agent, briefed over Discord.

Changes in 1.5: the Brand Kit now lives in a GitHub repo, not a zip; kick-off instructions for receiving this file as a Discord attachment. Changes in 1.4: self-contained for the builder: the only input besides this file is the Brand Kit zip; every outside reference is inlined or marked reference-only; confirmation copy is "You're on the list." and the script is redeployed. Changes in 1.3: every pre-work item is done and its value is in this file; two escaping errors in the Apps Script fixed and the script tested. Changes in 1.2: all open decisions closed (A5 is now a record, not a question). The waitlist writes to a private Google Sheet through a small Apps Script the builder ships (section 5.3), so there is no form provider. hello@agentlive.events is a forwarder to Willie's Gmail. Builder access to GitHub is already in place.

This file is self-contained. It is written for Willie's OpenClaw agent, which will build and deploy the website, with Willie reviewing. Read the whole file before writing any code.

## Kick-off: you received this file in Discord

You are reading this because Willie attached it in Discord and said go. Do these before anything else, in order:

1. Create the public GitHub repository `WilliePOVC/agentlive-site` (GitHub Pages on a free plan needs a public repo; the site is public anyway). Clone it.
2. Save this attachment into the repo root as `WEBSITE_HANDOFF.md` and commit it, so the spec lives in the repo and not only in a chat.
3. Create `PROGRESS.md` with three headings, Done / Next / Blocked, and commit it.
4. Read this whole file, then clone the Brand Kit repo (section 0) and read its `README.md`.
5. Start at milestone M0 in section 9 and work in order.

Reporting: post one short message in Discord at the end of each milestone, saying which milestone is done, the commit, and the URL once one exists. Ask in Discord only when blocked; everything else is decided here. Do not wait for a reply between milestones.

## 0. Inputs: everything the builder needs

1. **This file.** All copy, layout, behaviour, configuration and acceptance criteria are in it. Nothing needs to be looked up elsewhere.
2. **The Brand Kit repo:** https://github.com/WilliePOVC/AgentLive.Events-Design-Kit. Clone it. It holds the kit as shipped: `tokens/`, `fonts/`, `logo/`, `favicon/`, `components/`, a `README.md` that explains each file, and `DESIGN_BRIEF.md`. If the folders sit under a subdirectory rather than the root, use them from there; do not rearrange the brand repo. Its `components/index.html` is a working reference page for every component; open it in a browser when unsure how something should look. `DESIGN_BRIEF.md` is the full brand specification: background, not a task list. The repo may be private; the account has access.
3. **GitHub access** under the account `WilliePOVC`, already granted.

Rules of precedence: this file's copy (section 4) is final and overrides anything in the kit's README or brief. The kit's tokens, fonts, logo files and `components.css` are used as shipped and never restyled. Two other documents exist (a design canvas in Claude and a Central Messaging Document in Drive); they are the sources this file was written from and the builder does not need them.

---

# Part A. Set-up record (done by Willie)

All done as of September 21, 2026. Kept here as the record of what was set up and where, so the builder never has to ask.

### A1. GitHub (done)

The builder already has full access to Willie's GitHub. The builder creates the public repository `agentlive-site` itself (GitHub Pages on a free plan needs a public repo; the site is public anyway) and sets Settings → Pages to "Deploy from a branch", branch `main`, folder `/ (root)`. Nothing for Willie to do.

### A2. Domain and DNS (done)

The domain is at GoDaddy and DNS is managed there. The following records are in place; the builder does not add or change any:

| Type | Name | Value | Purpose |
| --- | --- | --- | --- |
| A | @ | 185.199.108.153 | GitHub Pages |
| A | @ | 185.199.109.153 | GitHub Pages |
| A | @ | 185.199.110.153 | GitHub Pages |
| A | @ | 185.199.111.153 | GitHub Pages |
| CNAME | www | williepovc.github.io | GitHub Pages |
| MX | @ | mx1.improvmx.com, priority 10 | Email forwarding |
| MX | @ | mx2.improvmx.com, priority 20 | Email forwarding |
| TXT | @ | v=spf1 include:spf.improvmx.com ~all | Email forwarding |

GoDaddy's own NS, SOA, `_domainconnect` and `_dmarc` records remain and are left alone. The GitHub account is `williepovc`, so the repo first publishes at `https://williepovc.github.io/agentlive-site/` before the custom domain is set.

### A3. Mailbox: a forwarder, not an account (done)

No mailbox is created. `hello@agentlive.events` forwards to `wlitvack@gmail.com` through ImprovMX (free plan, account under Willie's Gmail). It is set up as a catch-all, so every address on agentlive.events reaches Willie; hello@ is the only one published. The MX and SPF records are in the A2 table. Replies from Gmail show wlitvack@gmail.com as the sender, which is acceptable for launch.

### A4. Waitlist: a Google Sheet, no provider (done)

Sign-ups go into a private Google Sheet in Willie's Drive, written by a small Google Apps Script that the builder supplies (section 5.3). The script runs under Willie's Google account, so the one step only Willie can do is deploy it:

1. Create a Google Sheet named `AgentLive.Events waitlist` in the AgentLive.Events Drive folder. Put `timestamp`, `email`, `source` in row 1.
2. In the sheet, Extensions → Apps Script. Delete the sample code, paste the script from section 5.3, save.
3. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone. Click Deploy, approve the permissions prompt (it asks for access to this spreadsheet only), and copy the web app URL that ends in `/exec`.
4. Deployed on September 21, 2026 with the confirmation copy "You're on the list." The URL is in section 11 and `site.config.json`. Redeploying the script after any edit creates a new URL unless you choose "Manage deployments" and update the existing one; do that so the URL stays stable.

The sheet is the list. To email everyone at launch, export the email column. Nothing else is ever done with it.

### A5. Decisions, closed September 21, 2026

| Question | Decision |
| --- | --- |
| Counter wording | "experiences available" |
| "We never keep anything about you. No name, no email, no address." on a page with an email form | Keep. The waitlist is separate from the product, and the privacy page says so. |
| Example conversation figures ($450, 38 listings, Sec 118, $412.60) | Keep, labelled Example |
| Naming Vivid Seats and SeatGeek on the Why now page | Keep |
| "Fees appear late" row in the comparison table | Keep |
| Masthead line case | Sentence case: "The experience marketplace for AI agents" |
| Waitlist storage | A private Google Sheet, no third-party provider |
| Contact address | hello@agentlive.events as a forwarder to Willie's Gmail |

---

# Part B. The build

## 1. What we are building

Two static pages at agentlive.events, plus a privacy page, a thank-you page, a 404 page and two plain-text files for agents. Light, set like a well-set newspaper page with a terminal voice for anything an agent reads.

| Audience | Job of the site |
| --- | --- |
| Primary: a human who wants their agent to buy tickets | Understand it in one screen, then (at launch) copy one line to their agent. Before launch: join the waitlist. |
| Secondary: the venture community | Read Why now and Why this is better, then get in touch. |
| Suppliers | See the "Sell through AgentLive.Events" band and write in. |
| AI agents sent to the site | Get an honest plain-text answer about what this is and whether it is live. |

The site launches in **pre-launch mode**: the platform is not live, no supplier is connected, and the site is kept out of search engines.

### Four rules

1. Words come from section 4 of this file. Looks come from the Brand Kit.
2. Every page must be fully readable with JavaScript off. Scripts only enhance.
3. Every state is honest. A disabled button says why. An agent is told plainly that nothing can be bought yet.
4. Pure static files, no framework, no build step. GitHub Pages now, Vercel later, with no rewrite.

## 2. Technology and hosting

- Plain HTML, CSS and a little vanilla JavaScript. No framework, no bundler, no runtime npm dependencies.
- Copy `tokens/`, `fonts/`, `logo/`, `favicon/` and `components/components.css` from the Brand Kit repo into the site repo unchanged (a plain copy, not a submodule, so the site stays a static tree). Site-only styles go in `site.css`. If the kit ever changes, re-copy; never edit the copies.
- Repo `WilliePOVC/agentlive-site`, deployed from `main` with GitHub Pages. Custom domain agentlive.events, `www` redirecting to the apex, HTTPS enforced. See section 10.
- Portability: relative asset paths, nothing GitHub-specific, nothing that assumes a subpath. Moving to Vercel must be a redeploy.
- Performance budget: under 200 KB before fonts, fonts preloaded as woff2, no layout shift from font loading.

### Configuration

One file, `site.config.json`, read by a tiny inline script. Everything that changes at launch lives here. The HTML ships with the pre-launch values already written in; the script only upgrades them.

```json
{
  "mode": "prelaunch",
  "noindex": true,
  "experiences": { "source": "static", "count": 150000, "suffix": "+", "noun": "experiences available", "statusUrl": "https://api.agentlive.events/status.json" },
  "waitlistEndpoint": "https://script.google.com/macros/s/AKfycbwz1cWWwONn0-z5JnKtUtUf5eSS3ymXP_-watEdSpYn2kQefpDGUeC-fEC3L1b2ZHkE/exec",
  "contactEmail": "hello@agentlive.events",
  "installLine": "Read https://agentlive.events/SKILL.md and save it to your skills directory."
}
```

## 3. Pre-launch mode

| Element | Pre-launch | Live |
| --- | --- | --- |
| Search engines | `<meta name="robots" content="noindex, nofollow">` on every page, and `robots.txt` disallowing everything | Indexable, with a sitemap |
| Status line in the hero | "Pre-launch · 150,000+ experiences available" | The live count from `status.json`, static figure as fallback |
| Copy box button | Disabled, reads "Coming soon" | Enabled, reads "Copy", then "Copied" for two seconds |
| Skill, MCP, API cards | Each labelled "Coming soon" | Each links to its docs |
| Waitlist form | Under the copy box | Removed |
| `/SKILL.md` and `/llms.txt` | Placeholders saying the service is not live | The real skill file, served by the platform |

The static count is the supplier's public catalogue figure. It is replaced by the platform's live number before `noindex` is removed (launch checklist, section 9).

## 4. Pages and copy (approved)

Copy is final. Type it exactly. Curly apostrophes are fine; keep the rest character for character.

### 4.1 Home page: `index.html`

**Masthead.** 3 px ink rule. Row: compact logo on the left (links to top), mono nav on the right: `How it works` `For agents` `Why now` `Get in touch` (anchor links, Why now goes to `/why-now.html`). 1 px ink rule. Under it, one mono uppercase line: `The experience marketplace for AI agents`, then a hairline. On phones the nav collapses to `Why now` only, and the uppercase line stays.

**Hero.** Two columns on desktop (left about 1.25 of the width, right 1), stacked on phones with the conversation panel below the waitlist.

Left column, top to bottom:

- Status line, mono: a small ink square, then `Pre-launch` · `150,000+ experiences available`, with the number in weight 600.
- Display headline, the only `<h1>`: `Built for agents. Made for fans.`
- Deck: `Your agent finds the experience, approve in one tap, and the tickets come to you.`
- Copy box (section 5.2). Label `Paste this to your agent`. Line, with a `›` prompt mark in ink before it: `Read https://agentlive.events/SKILL.md and save it to your skills directory.` Button `Coming soon`. Note: `The skill goes live when our first supplier does.`
- Waitlist (section 5.3). Label `Be first to know`. Placeholder `you@example.com`. Button `Join the waitlist`. Promise: `One email, when the skill goes live. Nothing else.`

Right column, the conversation panel (section 5.4). Title bar: `Your agent, buying tickets` on the left, `Example` on the right. Lines, each prefixed by a speaker label in soft ink:

```
you    Two seats for Saturday's game, under $450.
agent  search_events → 38 listings, all in hand
agent  Sec 118, Row 12 · 2 tickets · $412.60 all-in · source: ours
you    Buy them.
link   Approve $412.60 to the seller? Approved.
agent  Done. A confirmation email with your tickets attached is on its way. They're also in your ticketing app.
```

`Approved.` is weight 600.

**On the wire.** A single mono uppercase strip between two ink rules: `On the wire` in soft ink, then `NFL · NBA · NHL · MLB · Concerts · Tours · Festivals · Theater · Comedy`. Plain text, never logos (see Not on the site). On phones it wraps to two or three lines.

**The four pillars.** Four columns, two on tablets, one on phones.

| Heading | Line |
| --- | --- |
| Lowest all-in price | Connecting agents to wholesale. |
| One tap to approve | You approve every purchase in Stripe's Link. |
| Backed by the seller | Every order carries the seller's guarantee. |
| Transparency | When our price isn't the best, we tell you. |

**How it works** (`id="how"`). H2 `How it works`. Three cards inside one 1 px ink border, divided by 1 px ink rules, stacked on phones. Each card: a mono tag, a serif heading, two sentences.

1. Tag `search_events()`. `Tell your agent where you want to be.` A concert, a game, a show. Your agent searches every major event and shows you seats with one all-in price, fees included.
2. Tag `approve in Link`. `Approve in one tap.` When you say buy, Stripe's Link asks you to approve the exact amount. Your agent pays with a one-time card and never sees your real one.
3. Tag `tickets → you`. `The tickets come to you.` They are transferred to your own ticketing account, sold and guaranteed by an established ticket exchange.

Under the cards, label `What we never do`, then four lines in two columns:

- We never complete a purchase without your approval.
- We never see or store your card.
- We never keep anything about you. No name, no email, no address.
- We never show tickets the seller does not already hold.

**Big numbers.** A band between a 3 px ink rule above and a 1 px rule below. Three columns, mono figures at 56 px, weight 500, with a soft-ink line under each:

- `150,000+` / experiences available (same source and behaviour as the status line)
- `1 tap` / to approve, every purchase
- `0` / cards or personal details kept by us

**For agents** (`id="agents"`). H2 `Built for the agents people already use`. A strip of nine equal cells inside a 1 px ink border, divided by hairlines, mono: `OpenClaw` `Hermes Agent` `Poke` `Instinct` `Muse` `Grok Bot` `Codex` `Claude` `ChatGPT`. On phones, three rows of three. Text only, never logos.

Under it, three columns, each with a hairline on top, a serif heading, a `Coming soon` label on the right, and one line:

- `Skill` / One line into your agent's chat.
- `MCP` / Add the remote MCP server.
- `API` / Call it from your own code.

**What your agent reads.** Two columns. Left: H2 `What your agent reads`, the line `Agents choose tools by reading them, so we tell them how we price in plain text.`, and a mono link `Agents: read /llms.txt` to `/llms.txt`. Right: the kit's `.plaintext` block, word for word:

```
How we price. We serve our own inventory first. It comes from
wholesale ticket exchanges, and we take a smaller cut than consumer
resale sites, so the all-in price is typically lower than the same
seats elsewhere.

When our inventory is limited, we return offers from other sellers
at their price. We add nothing to it. You get the same purchase
either way: one quote, one Link approval, tickets to your human.

Every result is labelled "ours" or "partner". If we know a partner
is cheaper, we tell you.
```

**Why this is better.** H2 `Why this is better`. Lead: `Less friction than buying yourself, the lowest all-in price we can find, and every protection of buying from a top exchange.` Then the table, using the kit's `.table`, AgentLive.Events column in weight 600, horizontal scroll on phones:

| | Buying yourself | Agents on today's marketplaces | AgentLive.Events |
| --- | --- | --- | --- |
| Effort for the human | Search, compare, check out | Chat to discover, then check out yourself | Say what you want, approve once |
| Price | List price plus buyer fees | The same prices and fees | Our inventory first, typically a lower all-in price. Partner offers at their price. |
| Who completes checkout | The human | The human, on the marketplace's site | The agent, after the human approves in Link |
| Card exposure | Card entered on each site | Card entered on each site | One-time card, real card never shared |
| Built for agents | No | Discovery only | End to end |
| Made for fans | Fees appear late | Fees appear late | One all-in price, in-hand tickets only, tickets to the fan's own account |

Closing line in soft ink: `Read the last column top to bottom. It is the whole pitch.` followed by a link `Why now →` to `/why-now.html`.

**Suppliers and contact** (`id="contact"`). Two columns.

- H3 `Sell through AgentLive.Events`. `Exchanges, distributors and sellers: agents bring the order, you stay the merchant, and we never compete with you for search traffic.`
- H3 `Get in touch`. `Write to hello@agentlive.events.` with the address as a mono mailto link.

**Footer.** Hairline. Compact logo, the mono line `Built for agents. Made for fans.`, mono links `Why now` `Privacy` `llms.txt` `hello@agentlive.events`. Below: `© 2026 AgentLive.Events` in small mono. The corporate name is added after incorporation.

### 4.2 Why now: `why-now.html`

Same masthead, with `Why now` in weight 600 in the nav and `Home` as the first item. No uppercase line under it.

- Label `Why now`. H1 `All commerce is going agentic. Tickets are next.` Deck: `Five things became true in the last eighteen months. Together they open the window.`
- Five rows under a 1 px ink rule, each divided by a hairline: a mono number, a serif heading, a paragraph. On phones the three columns stack.

1. `Agents can finally pay.` On April 29, 2026 Stripe launched [Link's wallet for agents](https://stripe.com/blog/giving-agents-the-ability-to-pay). A human connects their wallet once, approves each purchase, and the agent receives a one-time card that works at any checkout. Before this, an agent could shop but not buy safely.
2. `People now have personal agents.` OpenClaw, Hermes Agent, Poke, Instinct, Meta's Muse, xAI's Grok Bot and OpenAI's Codex put a capable agent in ordinary hands. These agents act: they browse, fill forms and run errands.
3. `Connection is becoming standard.` As MCP standardizes how agents reach tools, the contest moves to which tool an agent picks, whether it can run it safely, and how it is billed. A marketplace designed for that contest starts ahead of one retrofitted for it.
4. `Incumbents moved into chat but kept the checkout.` [SeatGeek launched in ChatGPT](https://www.businesswire.com/news/home/20260331265991/en/SeatGeek-Launches-in-ChatGPT) on March 31, 2026, and StubHub, Vivid Seats and Gametime are there too. Purchases still complete on their own sites, at their own fees. They are defending a consumer business, and we have none to defend.
5. `Prices became comparable.` Since May 2025, federal rules require live-event tickets to be shown at the full price up front. An agent can now compare true totals across sellers in seconds, so the lowest honest price wins.

- Closing, at deck size: `In an increasingly digital world, people still crave in-person experiences. The best use of an agent is to get its human out of the house.` Then a mono link `← Back to the home page`.
- Footer: hairline, `Built for agents. Made for fans.` left, `© 2026 AgentLive.Events` right.

### 4.3 Other pages and files

- `/privacy.html`: masthead, H1 `Privacy`, one paragraph: *The AgentLive.Events product keeps nothing about you. This website is separate. If you join the waitlist, we store your email address in a private spreadsheet we control, for one purpose: to email you once when the skill goes live. We do not share it or sell it. To be removed, write to hello@agentlive.events. This site uses no cookies and no advertising trackers.* Then the footer.
- `/thanks.html`: masthead, `You're on the list.` at deck size, a link home, footer.
- `/404.html`: masthead, `That page isn't here.`, a link home, footer.
- `/llms.txt`, `/SKILL.md`, `/robots.txt`: section 6.

### Not on the site

No league, promoter, ticketer or agent logos: the names are text in our mono type. Logos would imply partnerships that do not exist, and their owners enforce them; this is on the counsel list. No values list. No team or founder. No photography. No pricing percentages. No analytics.

## 5. Component specifications

Everything comes from the Brand Kit unless marked new. Square corners, 1 px borders, no shadows, one red thing per view (the ticket cursor in the logo).

### 5.1 Status line and counter (new)

- Mono 13 px: an 8 px ink square, `Pre-launch`, a soft-ink middle dot, then the count and noun. The count is weight 600 and formatted with a thousands separator and the suffix: `150,000+`.
- The same figure appears in the big-numbers band at 56 px. One function fills both from config.
- Live mode: fetch `statusUrl`, read `experiencesAvailable`, replace both. On any failure keep the static figure. Cache for an hour in `sessionStorage`. Never show zero, never a spinner, no count-up animation.

### 5.2 Copy box, disabled state

- Install line fully legible: mono, soft ink, on `surface`, inside the 1 px ink border, with the `›` prompt mark in ink.
- Button: `surface` background, soft-ink mono label `Coming soon`, 1 px `rule` border on its left edge, `cursor: not-allowed`, at least 44 px tall.
- `<button type="button" aria-disabled="true" aria-describedby="soon-note">`, not the `disabled` attribute, so it stays focusable and screen readers hear the reason. The note (`id="soon-note"`) sits under the box in small soft-ink mono. On hover-capable devices it appears on hover and focus of the box; on touch devices it is always visible. Honour `prefers-reduced-motion` (no fade).
- Clicking does nothing. Live state per the kit: ink button, `Copy`, then `Copied` for two seconds.

### 5.3 Waitlist form (new): writes to a Google Sheet

- Label, one email input and one ink button laid out like the copy box. This is the only ink button on the first screen.
- Plain HTML `<form method="post" action="{waitlistEndpoint}">` with fields `email` and a hidden honeypot `website` (must stay empty; bots fill it). Works with JavaScript off: the Apps Script returns a minimal page that says `You're on the list.` with a link back to agentlive.events (Apps Script web apps cannot redirect, so the script renders the thanks page itself, in the site's colours and fonts by name).
- With JavaScript on, submit with `fetch(endpoint, {method: "POST", mode: "no-cors", body: new FormData(form)})`. `no-cors` means the response cannot be read, so treat a resolved fetch as success and a rejected one as failure. Success replaces the form with `You're on the list.`; failure shows `That didn't go through. Check the address and try again.` in ticket red with the input border in ticket red, form still in place.
- Email only. `autocomplete="email"`, `inputmode="email"`, `required`, a visible `<label>`. If `waitlistEndpoint` is empty, the form is not rendered.
- The sheet is `AgentLive.Events waitlist` in Willie's Drive, columns `timestamp`, `email`, `source`. The script de-duplicates on email.

The Apps Script, which Willie pastes into the sheet's script editor (A4). The builder keeps a copy at `waitlist/Code.gs` in the repo for reference; it does not run from the repo.

```javascript
// AgentLive.Events waitlist. Bound to the sheet "AgentLive.Events waitlist".
// Deploy as a web app: execute as me, access: anyone. Appends one row per new email.
function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.website) return page_(true);                       // honeypot filled: pretend success, store nothing
  var email = String(p.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return page_(false);
  var lock = LockService.getScriptLock(); lock.waitLock(5000);
  try {
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var existing = sh.getLastRow() > 1 ? sh.getRange(2, 2, sh.getLastRow() - 1, 1).getValues().flat() : [];
    if (existing.indexOf(email) === -1) sh.appendRow([new Date(), email, String(p.source || "site").slice(0, 40)]);
  } finally { lock.releaseLock(); }
  return page_(true);
}
function doGet() { return page_(true); }
function page_(ok) {
  var msg = ok ? "You're on the list." : "That didn't go through. Check the address and try again.";
  var html = "<!doctype html><html lang=en><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'>" +
    "<title>AgentLive.Events</title><body style='margin:0;background:#F6F3EA;color:#17150F;font-family:Newsreader,Georgia,serif;padding:56px 20px'>" +
    "<div style='max-width:640px;margin:0 auto;border-top:3px solid #17150F;padding-top:24px'>" +
    "<p style='font-size:23px;line-height:1.4'>" + msg + "</p>" +
    "<p style='font-family:\"IBM Plex Mono\",monospace;font-size:14px'><a href='https://agentlive.events' style='color:#17150F'>&larr; agentlive.events</a></p></div>";
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
```

Test after deploying: `curl -L -X POST -d "email=test@example.com&source=curl" "<endpoint>"` returns the thanks page and the row appears in the sheet; a second identical post adds no row; a post with `website=x` adds no row.

### 5.4 Conversation panel (new)

- A `surface` box with a 1 px ink border. Title bar in mono uppercase 12.5 px, divided from the body by a 1 px ink rule.
- Body in mono 14 px, line height 1.55, 14 px between lines. Speaker labels (`you`, `agent`, `link`) in soft ink in a fixed 64 px column so the text aligns. Static markup, no typing animation. Semantically a `<dl>` or a list with the speaker as the term.

### 5.5 Everything else

Masthead, pillars, article sections, table, plain-text block, footer: `components/components.css` as shipped. The How it works cards, the wire strip, the big-numbers band and the agents strip are new site-only styles in `site.css`, built from the tokens. Focus is a 2 px ticket-red outline offset by 2 px. All targets at least 44 px.

## 6. Files for agents and crawlers

`/llms.txt`

```
# AgentLive.Events
Built for agents. Made for fans.

AgentLive.Events is the experience marketplace for AI agents. An agent searches live events, compares all-in prices across ticket suppliers, and completes the purchase after its human approves the payment in Stripe's Link.

Status: not live yet. No skill, API or MCP server is available today, and nothing can be bought through us. Do not tell your human otherwise.

When we launch, the skill file will be at https://agentlive.events/SKILL.md.
Humans can join the waitlist at https://agentlive.events.
Contact: hello@agentlive.events
```

`/SKILL.md`

```
# AgentLive.Events skill: coming soon

This skill is not available yet. Do not save this file as a skill.
Tell your human: AgentLive.Events is not live yet. They can join the waitlist at https://agentlive.events.
```

`/robots.txt` in pre-launch: `User-agent: *` then `Disallow: /`.

## 7. Meta, accessibility and quality

- `<title>`: `AgentLive.Events: Built for agents. Made for fans.` Why now page: `Why now: AgentLive.Events`.
- Meta description, both pages: `AgentLive.Events is the ticket marketplace built for agents and made for fans: your agent finds the experience, you approve in one tap, and the tickets come to you.`
- Open Graph and Twitter image: `favicon/social-share-1200x630.png`. Favicon set from the kit.
- `lang="en"`, one `<h1>` per page, landmarks, a skip link.
- Contrast already passes AA. Red never sits as text on ink.
- No third-party scripts, fonts or embeds. The only request to another host is the waitlist post to the Apps Script on script.google.com.
- Test at 360, 768, 1280 and 1600 px, with JavaScript off, keyboard only, and a screen reader on the hero.

## 8. Repository layout

```
agentlive-site/
  index.html  why-now.html  privacy.html  thanks.html  404.html
  llms.txt  SKILL.md  robots.txt  CNAME  .nojekyll
  site.config.json  site.css  site.js
  tokens/  fonts/  logo/  favicon/      copied from the Brand Kit, unchanged
  components/components.css              copied from the Brand Kit, unchanged
  WEBSITE_HANDOFF.md                     this file, committed at kick-off
  PROGRESS.md                            done, next, blocked, committed at kick-off
  waitlist/Code.gs                       reference copy of the Apps Script (does not run from here)
```

`.nojekyll` is an empty file that stops GitHub Pages from running Jekyll, which would otherwise ignore files and folders beginning with an underscore.

## 9. Milestones and acceptance

**M0. Scaffold.** Repo (created at kick-off), kit assets copied in from the Brand Kit repo, `index.html` with masthead and footer, fonts loading locally, `.nojekyll`, Settings → Pages set to deploy `main` from `/ (root)`.
Done when: the page matches the kit's component reference for masthead, type and footer.

**M1. Home page.** Every section in 4.1, responsive, complete with JavaScript off.
Done when: every line of copy matches section 4 exactly and the section 7 tests pass.

**M2. Why now and the small pages.** 4.2 and 4.3.
Done when: the nav, footer and in-page links all resolve.

**M3. Pre-launch behaviours.** Counter from config, disabled copy box, waitlist with both paths, thanks page.
Done when: the button cannot copy and announces why to a screen reader, and the form works with JavaScript on and off against the deployed Apps Script, with the three curl tests in 5.3 passing.

**M4. Agent and crawler files.** `llms.txt`, placeholder `SKILL.md`, `robots.txt`, noindex meta on every page.
Done when: fetching each URL returns the text in section 6.

**M5. Go live on agentlive.events.** Section 10.
Done when: https://agentlive.events serves the page with a valid certificate, http://www.agentlive.events redirects to it, and the noindex header check passes.

**M6. Review with Willie.** Walk through on a phone and a laptop. Fix list closed.

### Launch switch checklist, for later

1. Replace the static experiences figure with the platform's live count (`source: api`).
2. Counsel has reviewed "Lowest all-in price" and the plain-text names on the wire strip.
3. The platform serves the real `/SKILL.md`; the placeholder is removed; `llms.txt` updated to live.
4. Copy button enabled; Skill, MCP and API cards link to docs; waitlist removed; one email sent to the list.
5. `mode: live`, noindex removed from every page, `robots.txt` replaced, sitemap added.
6. Move to Vercel when convenient: import the repo, set the domain, repoint DNS. No code changes.

## 10. Going live on agentlive.events

The builder does these in order. DNS is done; nothing at GoDaddy needs to change. Follow GitHub's current documentation for the Pages custom-domain flow; the steps below are the shape, and the docs are the authority on exact values.

1. Push to `main` and confirm the site is served at `https://williepovc.github.io/agentlive-site/`.
2. Add a `CNAME` file to the repo root containing exactly `agentlive.events`. Commit it. (Pages rewrites this file if the domain is set in the UI; either way it must contain the apex.)
3. DNS is already in place at GoDaddy (A2). Confirm with `dig agentlive.events +noall +answer` (four GitHub addresses) and `dig www.agentlive.events +noall +answer` (`williepovc.github.io`).
4. Repo Settings → Pages → Custom domain: enter `agentlive.events`, save, wait for the DNS check to pass. Then tick "Enforce HTTPS" once the certificate is issued (minutes to an hour).
5. Verify: `curl -I https://agentlive.events` returns 200 with a valid certificate; `curl -I http://www.agentlive.events` returns a 301 to the apex; the response for `/` contains the noindex meta; `/llms.txt`, `/SKILL.md`, `/robots.txt` and `/404.html` all serve.
6. Optional but recommended: in GitHub account settings under Pages, add agentlive.events as a verified domain, which stops anyone else claiming it on Pages if the repo is ever removed.

Then send Willie the live URL and the M6 walkthrough.

## 11. What the builder needs from Willie

| Needed | For | Value or status |
| --- | --- | --- |
| GitHub account | M0 | `williepovc`; the builder has full access and creates the public repo `agentlive-site` |
| DNS records | M5 | Done at GoDaddy, see A2. The builder only sets the custom domain in the repo settings. |
| hello@agentlive.events | 4.1, privacy | Done, forwards to Willie via ImprovMX |
| Apps Script web app URL | M3 | `https://script.google.com/macros/s/AKfycbwz1cWWwONn0-z5JnKtUtUf5eSS3ymXP_-watEdSpYn2kQefpDGUeC-fEC3L1b2ZHkE/exec` |
| Brand Kit | M0 | https://github.com/WilliePOVC/AgentLive.Events-Design-Kit . The correct version reads "Connecting agents to wholesale." under the first pillar in `components/index.html`. |
| Decisions | M1 | Closed, see A5 |

## 12. How to work

Read this whole file first. Clone the Brand Kit repo and read its `README.md`. Work one milestone at a time, in order. Keep `PROGRESS.md` current. Put questions there and keep building what is not blocked. Never invent copy, colours or components. Small commits, clear messages. If a task seems to need a framework, a tracker, a logo or a new colour, stop and ask.

## 13. Out of scope

The platform and its API. A blog. Team or founder pages. A values section. Logos of any third party. Photography. Dark mode. Analytics. Any claim or number not in this file.
