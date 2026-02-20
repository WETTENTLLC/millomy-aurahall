# ✅ Site Ready - Quick Start

## Test Locally
```bash
npm run dev
```
Open: http://localhost:3000

Test the Gumroad overlay by clicking "Download ($1+)"

---

## Deploy to Production

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Festival 2026 site ready"
```

Create repo at: https://github.com/new

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to: https://vercel.com/new
2. Import your GitHub repo
3. Click "Deploy" (no config needed)
4. Done - Live in ~60 seconds

### 3. Add Custom Domain (Optional)
- Vercel Dashboard → Settings → Domains
- Add: milloaura.com (or your domain)

### 4. Add to Cloudflare
1. Add site to Cloudflare
2. Speed → Optimization → Enable "Rocket Loader"
3. Speed → Optimization → Enable "Auto Minify" (HTML, CSS, JS)

---

## Generate QR Codes for Festival

Use these URLs for location-specific tracking:

**Main Stage:**
```
https://YOUR_DOMAIN.vercel.app?utm_content=main_stage_fence
```

**Merch Tent:**
```
https://YOUR_DOMAIN.vercel.app?utm_content=merch_tent
```

**Backstage:**
```
https://YOUR_DOMAIN.vercel.app?utm_content=backstage
```

Generate QR codes at: https://qr-code-generator.com

---

## Add Google Analytics

Replace `G-XXXXXXXXXX` in `app/layout.js` with your GA4 Measurement ID

Get ID from: https://analytics.google.com/analytics/web/#/a/property/create

---

## Update Streaming Links

Edit `app/page.js` lines 38-40 with your real artist URLs:
- Spotify: `https://open.spotify.com/artist/YOUR_ID`
- Apple Music: `https://music.apple.com/artist/YOUR_ID`
- YouTube Music: `https://music.youtube.com/channel/YOUR_ID`

---

**Everything else is configured and ready to go.**
