# Headless WordPress → Vercel (Crypto Research Blog)

This is a **no-code friendly** frontend that pulls articles from **WordPress.com** via the REST API and renders them on a colorful, crypto-native site deployed on **Vercel**.

## What you do
- Write in **WordPress** (free). Paste **Cloudinary** image links using “Insert from URL” to avoid WP storage limits.
- The website auto-updates — no manual deploys.

## Configure
1. Open `scripts/api.js` and set:
```js
WP_SITE: 'YOUR-SITE.wordpress.com',
SOCIAL: { twitter: 'https://twitter.com/your', linkedin: 'https://linkedin.com/in/your', github: 'https://github.com/your' }
```
2. Deploy to Vercel.

## WordPress setup
- Create a site on WordPress.com (free) → e.g., `yourblog.wordpress.com`
- Editor → when adding images, choose **“Insert from URL”** and paste your **Cloudinary** image URL.
- Add tags like: Early Stage, Liquid Token Analysis, Narratives Deep Dive, Others.

## Cloudinary (images)
- Sign up free → upload images → copy the **secure URL**.
- In WordPress, use **Insert from URL** to place images without using WP storage.

## Tweet embeds
- In WordPress editor, paste the **tweet URL** on a new line (Gutenberg creates an embed).
- This frontend loads Twitter widgets to render the embed on the article page.

## Files
- `index.html` – lists recent posts with tag chips + pagination
- `post.html` – single article page with hero, meta, tags, share buttons
- `styles.css` – colorful theme
- `scripts/api.js` – WordPress site & social config + helpers
- `scripts/list.js` – fetch & render post list
- `scripts/post.js` – fetch & render a single post (by slug or id)

## Deploy (GitHub → Vercel)
1. Create a GitHub repo and upload all files.
2. On Vercel → **New Project → Import Git Repository** → Deploy.

## Tips
- Keep images ~1200–1600px wide; use WebP/AVIF when possible.
- For SEO, we can add meta tags or prerendering later if needed.
