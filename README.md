# All Your Tools

A growing collection of fast, free, browser-based tools for developers, designers, and everyday users. No login required — everything runs entirely in your browser.

**Live site:** https://allyourtools.com/

---

## File Structure

```
ayt/
├── index.html                  # Homepage with tool grid
├── password-generator.html     # Password generator tool
├── username-generator.html     # Username generator tool
├── uuid-generator.html         # UUID v4 generator tool
├── text-case-converter.html    # Text case converter tool
├── random-name-generator.html  # Random name generator tool
├── style.css                   # Shared stylesheet (all pages)
├── script.js                   # Shared JS utilities (copy, toast, nav)
├── favicon.svg                 # SVG favicon (lightning bolt)
├── robots.txt                  # Crawler directives + sitemap pointer
├── sitemap.xml                 # XML sitemap for all 6 pages
└── tools/
    ├── password-generator.js
    ├── username-generator.js
    ├── uuid-generator.js
    ├── text-case-converter.js
    └── random-name-generator.js
```

---

## Running Locally

No build step needed. Open any HTML file directly in your browser, or serve the directory with any static file server:

```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .
```

Then open http://localhost:8080.

---

## Adding a New Tool

1. Create `tools/my-tool.js` — export an `initMyTool()` function that wires up the UI logic.
2. Copy any existing tool page (e.g. `uuid-generator.html`) as `my-tool.html`.
3. Update the `<head>` meta tags (title, description, canonical, OG, JSON-LD).
4. Replace the tool interface card content with your tool's controls and result box.
5. Update the SEO article at the bottom of the page.
6. Add the new tool to:
   - The tool grid in `index.html`
   - The "Explore more free tools" cross-links on all other tool pages
   - The footer `<ul class="footer__links">` on all pages
   - `sitemap.xml`
7. Wire up the script tags at the bottom of the page: `<script src="tools/my-tool.js"></script><script>initMyTool();</script>`

---

## Deployment (Vercel Static)

The project deploys as a static site — no server, no build command.

1. Push to GitHub (or connect the repo to Vercel).
2. In Vercel project settings:
   - **Framework Preset:** Other
   - **Build Command:** _(leave empty)_
   - **Output Directory:** `.` (root, or `ayt/` if the repo root is the parent)
3. Set the custom domain to `allyourtools.com` in Vercel's Domains tab.
4. Vercel auto-deploys on every push to `main`.

No environment variables required — all tools are purely client-side.
