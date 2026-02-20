# Millo My & Aura Hall - Festival 2026

## Setup

```bash
npm install
npm run dev
```

## Deploy to Vercel

✅ Vercel config ready (`vercel.json`)
1. Push to GitHub: `git init && git add . && git commit -m "Initial commit"`
2. Import to Vercel: vercel.com/new
3. Deploy (automatic on every push)

## Gumroad Configuration

1. Create product on Gumroad
2. Set price to "$1+" (enables custom amount)
3. ✅ Product URL configured: `wettentertainment.gumroad.com/l/milloaura2026`
4. Enable "Overlay checkout" in Gumroad settings (required for Apple Pay/Google Pay)

## UTM Tracking

Generate QR codes with location-specific UTM parameters:
- `?utm_content=main_stage_fence`
- `?utm_content=merch_tent`
- `?utm_content=backstage`

## Analytics Setup

✅ Google Analytics configured in `app/layout.js`
- Replace `G-XXXXXXXXXX` with your GA4 Measurement ID
- Tracks: checkout_started, listen_clicked, spotify_clicked, apple_clicked, youtube_clicked
- UTM parameters automatically captured

## Cloudflare Setup

1. Add site to Cloudflare
2. Enable "Rocket Loader" in Speed settings
3. Enable "Auto Minify" for HTML/CSS/JS

## Media Optimization

- Convert images to WebP/AVIF
- Use Mux or Cloudinary for video background
- Place optimized assets in `public/` folder
