# Security

## Supported surface

This repository is a frontend application for Rentiverse.

## Reporting a vulnerability

Please report vulnerabilities privately to:

- hello@rentiverse.com

Include:

- a short description of the issue
- affected route or component
- reproduction steps
- proof of concept if available
- impact assessment

## Security posture in this repository

- Supabase usage is limited to the public anon key on the client
- Environment variables can override the built-in public Supabase values for deployment
- Admin routes are protected behind authentication and admin-email verification
- Search input is sanitized before being interpolated into Supabase filter syntax
- The storefront now falls back gracefully when live inventory is unavailable, reducing error-driven broken states

## Deployment recommendations

- Keep Supabase Row Level Security enabled
- Never expose service-role keys in the frontend
- Review CSP, frame, and referrer policies at the hosting layer
- Use HTTPS-only deployment
- Restrict admin or back-office interfaces behind authenticated routes before launch
