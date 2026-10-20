# Albatross Defense — website

Single-page marketing site for Albatross Defense and its first platform, **Zephyr Z1**.
Built with React + Vite, animated with GSAP (ScrollTrigger, SplitText, ScrambleText, DrawSVG, MotionPath) and Lenis smooth scrolling.

## Run it locally

Requires Node 20.19+ or 22.12+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
```

## Editing content

All copy, specs, founder bios, event details and image paths live in **`src/content.js`**. Change text there — no component edits needed.

### Replacing the template keynote photos

The founder and event photos are placeholders in `public/images/keynote/`:

| File | Used for | Shape |
| --- | --- | --- |
| `event-wide.svg` | Launch-event photo | 16:9 landscape |
| `sawyer-locke.svg` | Sawyer's spotlight | 4:5 portrait |
| `henry-de-roulet.svg` | Henry's spotlight | 4:5 portrait |
| `rocky-jiang.svg` | Rocky's spotlight | 4:5 portrait |

1. Export each photo as a JPG (about 2000px on the long edge is plenty), e.g. `sawyer-locke.jpg`.
2. Drop it into `public/images/keynote/`.
3. Update the matching `photo:` path in `src/content.js` (e.g. `asset('images/keynote/sawyer-locke.jpg')`).
4. Delete the old `.svg` placeholder.

Photos are cropped to fill their frame (`object-fit: cover`), so keep the speaker roughly centred.

### Logo

The mark (an "A" whose apex is a nose cone and whose crossbar is a pair of deployed wings) is in `src/components/Logo.jsx`. Standalone files for other uses are in `public/brand/`:

- `albatross-mark.svg`: for light backgrounds
- `albatross-mark-white.svg`: for dark backgrounds
- `public/favicon.svg`: browser tab icon

## Deploying to GitHub Pages

The repo includes `.github/workflows/deploy.yml`, which builds and publishes the site on every push to `main`.

One-time setup:

1. Push this repo to GitHub.
2. Open **Settings → Pages**, and under **Build and deployment → Source** pick **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The site will be live at `https://<github-username>.github.io/Albatross/`.

The build uses relative asset paths (`base: './'` in `vite.config.js`), so the same build works under the `/Albatross/` sub-path and at the root of a custom domain.

## Moving to a custom domain (e.g. albatrossdefence.com)

Once you own the domain:

1. Create `public/CNAME` containing only the domain, e.g.
   ```
   albatrossdefence.com
   ```
2. At your domain registrar, add DNS records:
   - `A` records for the apex domain (`@`) pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`
   - a `CNAME` record for `www` pointing to `<github-username>.github.io`
3. In **Settings → Pages → Custom domain**, enter the domain and save. Once the certificate is issued, tick **Enforce HTTPS**.
4. Push to `main`. No code changes are needed.

GitHub's current guide: <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>

## Project structure

```
src/
  content.js            ← all site copy & image paths
  App.jsx               ← page composition, smooth scroll
  lib/gsap.js           ← GSAP plugin registration
  lib/scroll.js         ← Lenis smooth scroll + scroll helpers
  components/
    Intro.jsx           ← scan-line loader
    Nav.jsx             ← top bar, active-section indicator, mobile menu
    Hero.jsx            ← scramble headline, flight-path background
    About.jsx           ← company intro + stats
    Mission.jsx         ← pinned word-by-word mission statement
    Platform.jsx        ← Zephyr Z1 pinned flight sequence + specs
    ZephyrSVG.jsx       ← the vehicle drawing used in the sequence
    Founders.jsx        ← dark→ivory transition, launch event, founder spotlights
    Careers.jsx, Contact.jsx, Footer.jsx
  styles/global.css     ← design tokens and all styles
public/
  images/keynote/       ← template photos (replace these)
  brand/                ← logo files
```

All animations respect the visitor's "reduce motion" system setting.
