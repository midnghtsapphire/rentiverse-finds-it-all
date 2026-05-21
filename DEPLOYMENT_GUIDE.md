# Deployment Guide

## Overview

Rentiverse is a static Vite frontend with optional Supabase-backed inventory. It can be deployed to any static host that supports SPA rewrites.

## Requirements

- Node.js 20+
- npm 10+
- A static hosting provider such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages
- Optional Supabase project for live listings

## Environment

Set these variables in your hosting provider:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

If they are omitted, the app still builds and falls back to the existing public project configuration plus the curated launch catalog.

## Local verification

```bash
npm ci
npm run lint
npm run build
```

## Static deployment steps

1. Install dependencies with `npm ci`
2. Run `npm run build`
3. Publish the `dist/` directory
4. Configure SPA fallback so unknown routes rewrite to `index.html`

## Recommended host settings

### Vercel

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Add SPA redirect:

```text
/*    /index.html   200
```

## Supabase notes

- The frontend uses the public anon key only
- Row Level Security should remain enabled for all production tables
- Live catalog problems no longer blank the UI because the app now falls back to curated content

## Release checklist

- Confirm environment variables are set correctly
- Confirm lint passes for launch-critical files, or resolve the existing repo-wide lint backlog before production launch
- Confirm `npm run build` passes
- Smoke test `/` and at least one `/listing/:id` route
- Confirm contact CTA email targets are correct before public launch
