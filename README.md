# Sadak India - India Road Tracker

A transparency platform tracking India's National Highways and Expressways with public data from NHAI, MoRTH, and government sources.

## Features

- **50+ Highways & Expressways** - Real data on National Highways (NH) and Expressways
- **Interactive India Map** - State heatmap with highway route visualization
- **Highway Report Cards** - Detailed stats, construction status, costs, and facts
- **State-wise Dashboards** - Filter and explore by state
- **Advanced Search** - Filter by status, type, and text search
- **Dark "Control Room" Theme** - Modern, data-focused UI

## Tech Stack

- **Next.js 16.2.3** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Google AdSense** - 7 ad placements across pages
- **Google Analytics 4** - Traffic analytics
- **JSON-LD Structured Data** - SEO optimization

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/HarshKhatore/sadak-india.git
cd sadak-india

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Deploy with zero configuration
4. Update environment variables if needed

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## AdSense Setup

1. **Create AdSense Account**
   - Apply at [Google AdSense](https://adsense.google.com)
   - Add your domain (e.g., sadakindia.vercel.app)

2. **Required Pages** (Already included)
   - Privacy Policy: `/privacy-policy`
   - Terms of Use: `/terms-of-use`
   - About: `/about`

3. **Ad Placements**
   - Homepage: 5 placements (header, sidebar x2, inline, footer)
   - Highway Detail: 2 placements (banner, inline)
   - Search Page: 2 placements (banner, sidebar)

4. **Update AdSense ID**
   - Edit `src/lib/constants.ts`
   - Replace `ADSENSE_ID` with your publisher ID

## SEO & Indexing

### Sitemap
- Dynamic sitemap at `/sitemap.xml`
- Includes all highways, states, and static pages
- Auto-updates with new data

### Robots.txt
- Allows all crawlers
- Points to sitemap

### Structured Data
- JSON-LD for website schema
- Road schema for highway pages
- SearchAction for search functionality

### Open Graph
- Custom OG image at `/og-image.svg`
- Twitter card support
- Social sharing optimized

## Project Structure

```
src/
├── app/
│   ├── about/              # About page
│   ├── highway/[id]/       # Highway detail pages
│   ├── privacy-policy/    # Privacy policy
│   ├── search/            # Search page
│   ├── state/[slug]/      # State dashboards
│   ├── terms-of-use/      # Terms of use
│   ├── layout.tsx         # Root layout with GA & AdSense
│   ├── page.tsx           # Homepage
│   ├── robots.ts          # Robots.txt
│   └── sitemap.ts         # Dynamic sitemap
├── components/
│   ├── AdBanner.tsx       # AdSense ad component
│   ├── Footer.tsx         # Footer
│   ├── Header.tsx         # Header
│   ├── HighwayCard.tsx    # Highway card
│   ├── IndiaMap.tsx       # Interactive map
│   └── StatCard.tsx       # Stat card
└── lib/
    ├── constants.ts       # App constants
    └── highways.ts        # Highway data & functions
```

## Data Sources

- National Highways Authority of India (NHAI)
- Ministry of Road Transport & Highways (MoRTH)
- Wikipedia (verified against official sources)
- Central Public Procurement Portal (CPPP)

## Contributing

This is a transparency project using public data. Contributions welcome:
- Data corrections
- New highway additions
- UI improvements
- Bug reports

## License

MIT License - See LICENSE file for details

## Contact

Email: dailywishcards@gmail.com
GitHub: https://github.com/HarshKhatore/sadak-india

---

Built with ❤️ for India's road infrastructure transparency
