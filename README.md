# Albatross Defense — website

Marketing site for Albatross Defense and **Zephyr Z1**. React + Vite with React Router.
The only animation is the Zephyr Z1 flight sequence on the Products page (GSAP ScrollTrigger).

## Run it locally

Requires Node 20.19+ or 22.12+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
```

## Pages

| Route | File |
| --- | --- |
| `/` | `src/pages/Home.jsx` (static, no animation) |
| `/products` | `src/pages/Products.jsx` (flight sequence, specs, latest updates) |
| `/products/updates` | `src/pages/Updates.jsx` (every update) |
| `/products/updates/<folder>` | `src/pages/UpdatePage.jsx` (one update) |
| `/founders` | `src/pages/Founders.jsx` |
| `/mission` | `src/pages/Mission.jsx` |
| `/careers` | `src/pages/Careers.jsx` |

All copy lives in **`src/content.js`**. Page photos (the team and founder pictures) live in **`src/assets/photos/`** as full-size originals. The build makes small WebP copies, so camera files are fine. To swap a photo, replace the file and keep the same name. Search the project for `TODO(content)` to find every gap that still needs real material (photos, specs, roles, copy).

## How to post an update

1. **Create the post.** In the project folder, run:
   ```bash
   npm run new-update "First static fire"
   ```
   This creates `src/updates/2026-10-21-first-static-fire/index.md` with today's date.
2. **Write it.** Open that `index.md`, keep the `title` and `date` lines, and replace the placeholder sentence with a few sentences about what happened. Plain text is fine; **bold**, lists and links work too.
3. **Drop in photos.** Copy the photos into the same folder. JPG, PNG and WebP all work, and they're shown in file-name order, so name them `01-…`, `02-…` to control it. Full-size phone photos are fine because the build makes small, compressed copies automatically. iPhone HEIC photos need to be JPG: set Settings → Camera → Formats → *Most Compatible*, or AirDrop/export them as JPG.
4. **Captions (optional).** Add them in the `index.md` header, keyed by file name:
   ```yaml
   captions:
     01-test-stand.jpg: Booster on the test stand
   ```
5. **Publish.** Commit and push to `main`:
   ```bash
   git add src/updates
   git commit -m "Update: First static fire"
   git push
   ```
   GitHub Actions rebuilds the site and it's live a minute or two later. The Products page shows the 5 newest updates; `/products/updates` lists all of them; each post has its own page.

To remove a post, delete its folder and push. The folder `src/updates/2026-10-21-sample-update-delete-me/` is a sample: delete it once you've published a real update.

**Later, optionally:** a browser-based editor such as a Git-based CMS (e.g. Decap CMS or TinaCMS) could replace steps 1–5 with a web form that commits the same folders for you. It isn't set up.

## Deploying (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. In the repo, **Settings → Pages → Source** must be set to **GitHub Actions** (it already is).

The build reads its base path from the Pages settings (`/Albatross/` on github.io, `/` on a custom domain), and `scripts/postbuild.mjs` writes a copy of the page into each route's folder so links like `/products/updates/…` work when opened directly.

## Moving to a custom domain (e.g. albatrossdefence.com)

1. Create `public/CNAME` containing only the domain, e.g. `albatrossdefence.com`.
2. At your registrar, add `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, and a `CNAME` for `www` pointing to `sawyerlocke85-pixel.github.io`.
3. In **Settings → Pages → Custom domain**, enter the domain, save, then tick **Enforce HTTPS** once offered.
4. Push to `main`. No code changes are needed.

## Design system

Defined at the top of `src/styles/global.css`:

- **Colors:** ivory `#FAF8EF` background, ink `#14171A` text, gray `#5B6168` secondary text (5.9:1). Accent `#6c9fbd` is 2.7:1 on ivory, so it's used only for fills, rules, selected states and large shapes, never for text. `#3A6A87` is the same hue darkened to 5.5:1 for the rare case small accent text is needed.
- **Type:** Helvetica Neue / Helvetica / Arial. The root size is fluid (14px on small screens, scaling with the viewport from 1280px). h1 is 5rem/700; h2–h6 run from 4rem down to 1.5rem at weight 400 with tight negative tracking.
- **Layout:** 12-column grid with 2rem margins (1.4rem on mobile), 1.25rem row gap and 1.125rem column gap. 2px radius on images and buttons.
- **Motion:** none except the Products flight sequence; UI transitions are 0.25s. With *Reduce motion* turned on, the flight sequence shows its final frame and all 4 stage labels.
