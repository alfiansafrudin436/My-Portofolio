# Elegant Next.js Portfolio

This is a modern, elegant web developer portfolio template built with Next.js (App Router), Tailwind CSS v4, Framer Motion, and Sanity.io CMS.

## Quick Start

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.
Open [http://localhost:3000/studio](http://localhost:3000/studio) to manage your projects in Sanity Studio.

## Deployment to Vercel

1. Push this repository to GitHub.
2. Log into [Vercel](https://vercel.com) and click "Add New... Project".
3. Import your GitHub repository.
4. Set up the Environment Variables (if any, like `NEXT_PUBLIC_SANITY_PROJECT_ID`).
5. Click **Deploy**. Vercel will automatically use Next.js routing and build everything. Note that we provided a `vercel.json` that sets the deployment region to `sin1` (Singapore) for faster access in SE Asia.

## Content Management (Sanity)

To activate your CMS:

1. Go to [Sanity.io](https://sanity.io) and create an account/project.
2. Add your Project ID and Dataset to `.env.local` or directly to `sanity.config.ts`.
3. Start adding projects via `/studio` route!
