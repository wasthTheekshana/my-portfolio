# Theekshana Harischandra portfolio

Next.js (App Router) + GSAP + Lenis. Concept and design system: see `DESIGN.md`. All copy lives in `src/data/site.ts`.

```bash
npm install
npm run dev          # development
npm run build && npm start   # production
```

## Deploy on Vercel

The site is fully static Next.js, so Vercel needs no configuration: framework preset "Next.js", build command `npm run build`, root directory = this folder (`theekshana-portfolio`).

1. Push this folder to a GitHub repository (`.shots`, `.audit.txt`, `node_modules` and `.next` are already git-ignored).
2. On vercel.com choose Add New, Project, import the repository, and deploy.
3. In the project, open Settings, Domains, and add `theekshanaharischandra.me` (and `www.theekshanaharischandra.me`). Set the DNS records Vercel shows at the domain registrar.
4. Check `https://theekshanaharischandra.me/sitemap.xml` and `/robots.txt`, then submit the sitemap in Google Search Console.

Already set: domain, email, LinkedIn, GitHub and the real CV (`public/resume.pdf`). The domain lives in `site.url` in `src/data/site.ts`.

## Hidden for now

The Research section is hidden. To show it again, restore `<Research />` in `src/app/page.tsx` (and its import), add `{ label: 'Research', href: '/#research' }` back to `nav` in `src/data/site.ts`, and add `'research'` to `ids` in `src/components/Header.tsx`.

Still to confirm: the Sinhala spelling of the name, the thesis summary, and an Upwork link if you want one.
