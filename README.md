# Hamza Chaabi — Portfolio V4

Deployment-ready bilingual portfolio focused on IT, software engineering, Python and the path toward AI software engineering.

## V4 highlights
- Recruiter-friendly landing page and recruiter view
- English/French switching
- Interactive project filtering and skill categories
- Live public GitHub profile data
- Project case studies
- Resume page with print/PDF support
- PWA/offline support
- SEO, social preview, favicon, robots.txt and sitemap
- GitHub Pages deployment workflow
- Responsive and accessibility-conscious UI

## Run locally
```powershell
py -m http.server 8000
```
Then open `http://localhost:8000`.

## Deploy to GitHub Pages
1. Create or use a GitHub repository for the portfolio.
2. Put these files at the repository root.
3. Commit and push to `main`.
4. In GitHub: **Settings → Pages → Source → GitHub Actions**.
5. The included workflow deploys the site automatically on every push to `main`.

> If you deploy under a repository name different from `python-ai-journey`, update the URLs in `robots.txt` and `sitemap.xml`.

## Next content upgrades
Replace generic project descriptions with screenshots, measurable outcomes and links to source code as those projects become public.
