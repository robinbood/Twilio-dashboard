# AGENTS.md - Twilio Dashboard Project (Client-Side Demo)

## Project Goal
Build a clean, simple, functional Next.js 16 dashboard that connects to Twilio and shows:
- Call and SMS logs grouped by counterparty/customer phone number
- Volume counts: Total Calls + Total Texts per number
- Date range filtering (From / To)
- Minimal clean UI with Tailwind CSS
- No auth,One single page that shows the dashboard

## Dev Environment Tips (Using Bun)
- Use **Bun** as the package manager and runtime
- Run `bun install` to install dependencies
- Run `bun dev` to start the development server
- Run `bun run build` to test production build
- Always restart the dev server (`Ctrl + C` then `bun dev`) after changing `.env.local`
- Check browser console for any errors during development
- Everything on the dashboard should be functional with aesthetically pleasing working UI
- Read Docs when working with  APIs,tools or methodologies
- No UI libraries of any sort,use tailwind for everything
- This is a temporary demo project. We will use client-side Twilio calls for simplicity.
- Focus on typesafety and an industrial-grade coding technique
- .env.local has API keys,choose to use them how the docs says so



