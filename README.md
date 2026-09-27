# Local Service Business Template — Setup Guide

Welcome to your new Local Service Business site. It's built for contractors, repair techs, salons, cleaners, and other local/home-service businesses that book jobs by phone or form. You get 100% data ownership, fast loading, and $0/month in platform fees.

## What's Included in Your Package
- `index.html` — your site's structure and content sections
- `style.css` — the visual design (colors, layout, fonts)
- `app.js` — site-wide settings (CONFIG) plus the engine that syncs your Services and Testimonials sections to Airtable
- `.github/workflows/sync-catalog.yml` — the automatic sync job
- `SETUP-GUIDE.md` — this file

## Two Ways to Customize This Site

**1. Site-wide details — edit in `app.js`.** Things that rarely change: your business name, phone number, tagline, service area, trust badges, hours, license number. Open `app.js`, edit the `CONFIG` object at the top, save, and commit. No Airtable needed for any of this.

**2. Services & Testimonials — edit in Airtable.** These are the things you'll actually update over time (a new service you offer, a new customer review). They live in two tables in your Airtable base and sync to the site automatically.

## Quick Start Checklist

### Step 1: Duplicate Your Database Blueprint
1. Log into your free Airtable account.
2. Open your Master Core Blueprint link and click **Duplicate Base** to save it into your own workspace.
3. Confirm it has two tables: **Services** and **Testimonials**, each with a `Status` field.

**Services table fields:**
- `Service Name` — e.g. "Plumbing repair"
- `Description` — one line, e.g. "Leaks, clogs, water heaters, and fixture swaps."
- `Icon Letter` — a single letter shown in the icon circle (e.g. "P")
- `Status` — set to **Published** to make it live

**Testimonials table fields:**
- `Quote` — the review text
- `Customer Name` — e.g. "Dana M."
- `Neighborhood` — e.g. "Cottonwood" (optional)
- `Status` — set to **Published** to make it live

### Step 2: Configure Your Secure Database Keys
This template needs four GitHub repo secrets (Settings → Secrets and variables → Actions → New repository secret):
- `AIRTABLE_TOKEN` — a Personal Access Token scoped to `data.records:read` on your duplicated base only
- `AIRTABLE_BASE_ID` — found in your browser's address bar when viewing your base (starts with `app...`)
- `AIRTABLE_SERVICES_TABLE` — the exact name of your Services table (defaults to `Services` if left blank)
- `AIRTABLE_TESTIMONIALS_TABLE` — the exact name of your Testimonials table (defaults to `Testimonials` if left blank)

**Security best practice:** always restrict your token to Read-Only (`data.records:read`) access. This ensures visitors can never modify or erase records in your database.

### Step 3: Edit Your Site-Wide Details
Open `app.js` and edit the `CONFIG` object: business name, phone number, hero text, trust badges, service area, hours, license number. Save and commit — GitHub Pages will pick it up automatically.

### Step 4: Deploy to GitHub Pages (Free Hosting)
1. Create a repository on GitHub (Public) and upload all the files, keeping the folder structure intact (`.github/workflows/sync-catalog.yml` must stay in that exact path).
2. Go to **Settings → Pages**, set Branch to `main` and folder to `/ (root)`, then Save.
3. Your site will be live at `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/` within a minute or two.

### Step 5: Trigger the First Sync
The sync runs automatically every 30 minutes and on every push, but you don't have to wait: go to your repo's **Actions** tab → **Sync services & testimonials from Airtable** → **Run workflow**. See the companion **GitHub Actions Quick-Start SOP** for the exact click-by-click.

## Connecting a Custom Domain
Already have a domain from Squarespace, Namecheap, GoDaddy, or Cloudflare?
1. In GitHub: **Settings → Pages → Custom domain** → enter your domain → Save → check **Enforce HTTPS**.
2. In your domain provider's DNS settings, add a `CNAME` record: Host `www` → Target `YOUR_GITHUB_USERNAME.github.io`, plus `A` records for the root domain pointing to:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
3. DNS changes typically take 5–30 minutes to go live, sometimes longer.

## If Something Isn't Showing Up
See the companion **Airtable Quick-Start SOP** and **GitHub Actions Quick-Start SOP** — they walk through, in order, exactly what to check before assuming anything's broken (it's almost always a normal sync delay, not a bug).
