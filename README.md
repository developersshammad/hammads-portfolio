# Muhammad Hammad — Portfolio (HTML, CSS, JavaScript)

A static, animation-heavy portfolio. No build step and no backend: open `index.html`, or upload the
folder to GitHub Pages, Netlify, Vercel or any web host.

## Edit your details
Everything you'd want to change lives in **`js/data.js`**:
- `SITE.email`, `SITE.phone`, `SITE.phoneHref` — contact details used by the contact section, terminal and mobile menu
- `SITE.github`, `SITE.linkedin`
- `PROJECTS` — 17 projects; set `featured: true` for the big stacked cards, add a `source` URL to show a "View source" button
- `SKILLS`, `TIMELINE`, `PROCESS`

## What's inside
- Preloader with an SVG "MH" that draws itself and a counter, then a curtain reveal
- Three.js hero: a metallic core in a wireframe shell, orbit rings and particles that react to cursor and scroll
- Custom cursor with labels (View / Drag / Copy), magnetic buttons, scroll progress bar, back-to-top ring
- About: word-by-word reveal, 3D code panels that tilt and separate, count-up stats
- **Skills sphere**: 20 skills on a 3D sphere you can drag and spin, with group filters and a detail card
- **Projects**: 4 featured case studies in a scroll-stacking deck, plus a filterable archive (GSAP Flip) with 3D tilt cards
- Case-study modal with previous/next buttons and arrow-key navigation
- Experience timeline that draws itself and lights each step
- **Terminal**: a working shell — `help`, `projects`, `open abyss`, `live pc-centre`, `goto contact`, `accent mint`, Tab completion and history
- Contact form with validation that opens the visitor's email app with the message filled in, plus copy-email
- Responsive from 320px phones to wide monitors; reduced-motion users get a calm static version

## Files
```
index.html
css/style.css
js/data.js        ← your content
js/main.js        ← interactions and animations
js/hero-scene.js  ← Three.js hero (loads Three.js from a CDN)
```

## Notes
- Project links pointing to claude.ai previews are private until you share them. Hosting each project
  on GitHub Pages and updating the `live` URLs in `js/data.js` is the most reliable option.
- The contact form has no server: it opens the visitor's mail app. To receive messages directly,
  connect a form service (for example Formspree) or use the PHP version of this portfolio.
