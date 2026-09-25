# Sena Erdem - Portfolio Website Deployment

This is the production-ready Next.js 16 portfolio for Sena Erdem (Junior Data Analyst).

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Icons**: lucide-react
- **Fonts**: Geist Sans + Geist Mono

## Local Development

```bash
bun install
bun run dev
```

Visit http://localhost:3000

## Production Deployment (Vercel)

### Option A: Connect GitHub repo to Vercel (Recommended)

1. **Create a new GitHub repo** (or use your existing portfolio repo):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: tech-themed portfolio"
   git branch -M main
   git remote add origin https://github.com/senaerdemm2/portfolio.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import the GitHub repo
   - Framework preset: Next.js (auto-detected)
   - Build command: `next build` (default)
   - Output directory: `.next` (default)
   - Click "Deploy"

3. **Wait ~2 minutes** for the build to complete

4. **Your site is live**: `https://your-repo-name.vercel.app`

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from this directory
vercel

# Follow the prompts (accept defaults)
# When satisfied with the preview, deploy to production:
vercel --prod
```

## Custom Domain (Optional)

After deployment:
1. Vercel Dashboard → Your project → Settings → Domains
2. Add your domain (e.g. `senaerdem.dev`)
3. Configure DNS at your domain registrar:
   - Add CNAME record: `@` → `cname.vercel-dns.com`
   - Or A record: `@` → `76.76.21.21`
4. Wait for SSL certificate provisioning (~5-10 minutes)

## Project Structure

```
.
├── src/
│   └── app/
│       ├── layout.tsx       # Root layout with metadata
│       ├── page.tsx          # Single-page portfolio (all sections)
│       └── globals.css       # Dark tech theme + animations
├── public/
│   ├── certificates/          # 4 certificate JPGs (TechPro + 3 HackerRank)
│   └── Sena_Erdem_CV.pdf      # CV download
├── prisma/                    # Prisma schema (SQLite for dev)
├── package.json
└── README_DEPLOY.md           # This file
```

## Sections Included

1. **Hero** — Name, role, summary, 3 CTAs (View Projects / Download CV / Hire Me)
2. **Stats Bar** — 3 projects, 4 certifications, 100K+ rows, 8 tools
3. **Tech Stack** — 12 tools grouped by category
4. **About** — Bio + Quick Facts sidebar
5. **Experience** — GLP Software Data Analyst Intern (Remote)
6. **Projects** — 3 featured projects with metrics, stack badges, repo links
7. **Certifications** — TechPro (with image lightbox) + HackerRank SQL (3 levels)
8. **Contact** — Email, LinkedIn, GitHub cards
9. **Footer** — Sticky with quick links

## Tech Theme Features

- Dark navy background with animated grid pattern
- 6 drifting gradient orbs (cyan, violet, blue)
- Terminal-style typography (monospace, `>` prefixes)
- Glow effects on cards and buttons (tech-card-glow, tech-btn-glow classes)
- Mobile-responsive (44px touch targets met)
- Lightbox modal for certificate images (click image → full-size view)

## Notes

- No environment variables required
- No database required for the portfolio to function (Prisma schema is included but unused by the portfolio UI)
- All assets are static (no external API calls)
