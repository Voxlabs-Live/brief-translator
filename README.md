# Brief Translator

Paste a messy client message — WhatsApp ping, email fragment, transcribed voice note — and get:

- a **structured creative brief** (project, deliverable, audience, deadline, etc.)
- **open questions** to send back to the client (what they didn't tell you)
- **parallel asks** flagged separately (anything that snuck in alongside the main request)

Part of the [Agency Vibe-Coding Kit](https://voxlabs.live) — a $7 starter pack of four small tools your creative agency can run from a browser.

**Live demo:** [brief-translator.voxlabs.live](https://brief-translator.voxlabs.live) (5 free runs per visitor)

---

## Deploy your own copy (3 minutes, browser-only)

You don't need a terminal. You need a GitHub account, a Vercel account, and an Anthropic API key.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FVoxlabs-Live%2Fbrief-translator&env=ANTHROPIC_API_KEY&envDescription=Get%20your%20Anthropic%20API%20key%20from%20console.anthropic.com&envLink=https%3A%2F%2Fconsole.anthropic.com%2Fsettings%2Fkeys)

1. Click the **Deploy with Vercel** button above.
2. Sign in to GitHub. Vercel will fork this repo into your GitHub account.
3. Sign up for Vercel free tier (~3 min, no credit card needed).
4. In Vercel's setup screen, paste your **Anthropic API key** when prompted. Get one at [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) — takes a minute, no waitlist.
5. Click **Deploy**. Wait ~90 seconds. You'll get your own URL.

That's it. The tool is yours — no limits, no subscription, you pay only what you use on Anthropic (~$0.005 per call).

### Watch the deploy walkthrough

A 10-minute screen recording covers the whole flow end-to-end. [Watch it here](#loom-coming-soon) *(link added when the kit's Looms are released)*.

---

## What you'll spend on your own deploy

The tool uses [Claude Sonnet 4.6](https://www.anthropic.com/news/claude-4-6) for the language work. Per Anthropic's pricing:

- ~**$0.005 – $0.015 per translated brief** depending on message length
- ~**$5 – $15/month** for typical agency use (a few briefs per day)
- No subscription, no commitment. You pay Anthropic directly for what you run.

The hosted demo uses prompt caching to keep our cost cap low — your deploy gets the same benefit automatically.

---

## Customize the tool

The "vibe-coding" part of the kit means: this repo is **yours to modify**. Two suggested customizations:

### Adjust the brief fields

Open `src/prompts/system.ts`. The system prompt defines what fields get extracted and how open questions/parallel asks are detected. Change the schema, add fields specific to your agency's workflow, drop fields you don't need.

### Adjust the output format

Open `src/components/BriefResult.astro` for the rendered UI, and the `toMarkdown` / `toNotion` helpers in `src/pages/index.astro` for the copy-to-clipboard formats. Add a copy-to-Linear, copy-to-ClickUp, whatever fits your tools.

### Upgrade to polished UI

The kit's **Bump #1 — Claude Design Polish Guide** ($17) walks you through styling this exact repo with [Claude Design](https://claude.com/design) — exporting handoff bundles that Claude Code reads to upgrade the UI. *(Available after kit purchase.)*

---

## Local dev

Optional — only if you want to run from a terminal with a clone instead of a fork.

```sh
git clone https://github.com/Voxlabs-Live/brief-translator
cd brief-translator
npm install
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local
npm run dev
```

Then open `http://localhost:4321`.

---

## Tech

- **Astro 5** (single-page tool, no Tailwind, design-token-driven CSS)
- **TypeScript** strict mode
- **`@anthropic-ai/sdk`** with prompt caching enabled on the system prompt
- **Claude Sonnet 4.6** as default model
- **Vercel** for hosting + serverless API route
- **Vercel KV** for the hosted demo's lifetime-cap rate limit (NOT active on your own deploy — your tool has no limits)

---

## Part of the kit

| Tool | Repo |
|---|---|
| **Brief Translator** | this repo |
| Brand Voice Checker | [Voxlabs-Live/brand-voice-checker](https://github.com/Voxlabs-Live/brand-voice-checker) |
| Weekly Hook Sheet Generator | coming next |
| Shot List Generator | coming next |

---

## License

MIT for the code. The system prompts (`src/prompts/system.ts`) are part of the kit product — you can modify them for your own use, but please don't redistribute the prompts unchanged as a competing product.
