// =========================================================================
// LOCAL SERVICE BUSINESS TEMPLATE — CONFIG
// Edit everything in the CONFIG object below. You don't need to touch
// index.html or style.css to customize the site-wide details (business
// name, phone number, hours, service area, etc.)
//
// Your SERVICES and TESTIMONIALS are kept up to date automatically from
// Airtable — see SETUP-GUIDE.md for the one-time setup. You never paste
// any secret token into this file.
// =========================================================================

const CONFIG = {
    businessName: "Your Business Name",
    businessNameAccent: "Home Services", // the part of the name shown in the accent color

    phoneNumber: "(555) 123-4567",
    phoneNumberLink: "+15551234567", // digits only, with country code, no spaces or symbols

    heroHeadlineLine1: "Fixed right.",
    heroHeadlineLine2: "Fixed fast.",
    heroSubtext: "Licensed, insured home repair and maintenance serving the greater area. Same-week appointments, upfront pricing, no surprise callbacks.",

    // Short trust badges shown under the hero CTAs.
    trustBullets: [
        "Licensed & insured",
        "14 years in business",
        "4.9★ from 200+ jobs"
    ],

    // Shown in the dark "service area" band.
    serviceAreaHeadline: "Proudly serving the Verde Valley",
    serviceAreaList: [
        "Cottonwood",
        "Sedona",
        "Camp Verde",
        "Clarkdale",
        "Jerome",
        "Village of Oak Creek"
    ],

    // "Why us" section — the bullet list next to the photo block.
    whyHeadline: "We show up, we quote it straight, and we clean up after.",
    whyLead: "No subcontractor roulette — the person who quotes the job is the person who shows up to do it.",
    whyBullets: [
        "Upfront, written pricing before any work starts",
        "Same crew from quote to completion",
        "Text updates so you're not guessing on arrival time",
        "90-day workmanship guarantee on every job"
    ],

    // Bottom CTA banner.
    ctaHeadline: "Something need fixing?",
    ctaSubtext: "Free, no-pressure quotes. Most calls get a same-week appointment.",

    // Footer line.
    hours: "Mon–Sat, 7am–6pm",
    licenseNumber: "ROC-000000",
    insured: true, // set to false to hide the "insured" badge in the footer
    footerYear: "2026"
};

// =========================================================================
// Rendering — you shouldn't need to edit anything below this line.
// =========================================================================

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderBusinessInfo() {
    const nameEls = document.querySelectorAll('.js-business-name');
    nameEls.forEach(el => { el.textContent = CONFIG.businessName; });

    const accentEls = document.querySelectorAll('.js-business-name-accent');
    accentEls.forEach(el => { el.textContent = CONFIG.businessNameAccent; });

    document.querySelectorAll('.js-phone-link').forEach(el => {
        el.href = `tel:+${CONFIG.phoneNumberLink.replace(/^\+/, '')}`;
        if (el.dataset.labelPrefix) {
            el.textContent = `${el.dataset.labelPrefix} ${CONFIG.phoneNumber}`;
        } else {
            el.textContent = CONFIG.phoneNumber;
        }
    });

    const h1line1 = document.getElementById('hero-headline-1');
    const h1line2 = document.getElementById('hero-headline-2');
    if (h1line1) h1line1.textContent = CONFIG.heroHeadlineLine1;
    if (h1line2) h1line2.textContent = CONFIG.heroHeadlineLine2;

    const heroSub = document.getElementById('hero-subtext');
    if (heroSub) heroSub.textContent = CONFIG.heroSubtext;

    const trustRow = document.getElementById('trust-row');
    if (trustRow) {
        trustRow.innerHTML = CONFIG.trustBullets
            .map(t => `<span><span class="dot"></span>${escapeHTML(t)}</span>`)
            .join('');
    }

    const areaHeadline = document.getElementById('area-headline');
    if (areaHeadline) areaHeadline.textContent = CONFIG.serviceAreaHeadline;

    const areaList = document.getElementById('area-list');
    if (areaList) {
        areaList.innerHTML = CONFIG.serviceAreaList
            .map(a => `<span>${escapeHTML(a)}</span>`)
            .join('');
    }

    const whyHeadline = document.getElementById('why-headline');
    if (whyHeadline) whyHeadline.textContent = CONFIG.whyHeadline;
    const whyLead = document.getElementById('why-lead');
    if (whyLead) whyLead.textContent = CONFIG.whyLead;
    const whyBullets = document.getElementById('why-bullets');
    if (whyBullets) {
        whyBullets.innerHTML = CONFIG.whyBullets
            .map(b => `<li><span class="check">✓</span>${escapeHTML(b)}</li>`)
            .join('');
    }

    const ctaHeadline = document.getElementById('cta-headline');
    if (ctaHeadline) ctaHeadline.textContent = CONFIG.ctaHeadline;
    const ctaSub = document.getElementById('cta-subtext');
    if (ctaSub) ctaSub.textContent = CONFIG.ctaSubtext;

    const footerLine = document.getElementById('footer-details');
    if (footerLine) {
        const insuredText = CONFIG.insured ? ' · Licensed &amp; insured' : ' · Licensed';
        footerLine.innerHTML =
            `<strong>${escapeHTML(CONFIG.businessName)}</strong>${insuredText} · Lic. #${escapeHTML(CONFIG.licenseNumber)}`;
    }
    const footerHours = document.getElementById('footer-hours');
    if (footerHours) footerHours.textContent = `${CONFIG.hours} · Serving ${CONFIG.serviceAreaList[0] || 'your area'} and nearby`;
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = `© ${CONFIG.footerYear} ${CONFIG.businessName}`;
}

/**
 * Loads your Services grid from data/services.json — a plain data file that
 * a scheduled GitHub Action keeps in sync with the "Services" table in your
 * Airtable base. This file never contains your Airtable token; it only
 * contains the published records themselves. See SETUP-GUIDE.md.
 */
async function fetchServices() {
    const container = document.getElementById('service-grid');
    if (!container) return;

    try {
        const response = await fetch('data/services.json', { cache: 'no-store' });

        if (!response.ok) {
            container.innerHTML = `<p class="loading">Your services will appear here once the automatic sync runs for the first time.</p>`;
            return;
        }

        const data = await response.json();

        if (!data.records || data.records.length === 0) {
            container.innerHTML = `<p class="loading">No published services yet. Set a row's Status to "Published" in your Services table to display it here.</p>`;
            return;
        }

        container.innerHTML = data.records.map(record => {
            const fields = record.fields || {};
            const name = escapeHTML(fields['Service Name'] || 'Untitled Service');
            const description = escapeHTML(fields['Description'] || '');
            const icon = escapeHTML((fields['Icon Letter'] || name.charAt(0) || '?').toString().charAt(0).toUpperCase());

            return `
                <div class="service-card">
                    <div class="service-icon">${icon}</div>
                    <h3>${name}</h3>
                    <p>${description}</p>
                </div>`;
        }).join('');

    } catch (error) {
        console.error('Services load error:', error);
        container.innerHTML = `<p class="loading">Couldn't load services right now. Check the Actions tab in your GitHub repo for errors.</p>`;
    }
}

/**
 * Loads your Testimonials grid from data/testimonials.json — synced from
 * the "Testimonials" table in your Airtable base the same way Services is.
 */
async function fetchTestimonials() {
    const container = document.getElementById('t-grid');
    if (!container) return;

    try {
        const response = await fetch('data/testimonials.json', { cache: 'no-store' });

        if (!response.ok) {
            container.innerHTML = `<p class="loading">Your testimonials will appear here once the automatic sync runs for the first time.</p>`;
            return;
        }

        const data = await response.json();

        if (!data.records || data.records.length === 0) {
            container.innerHTML = `<p class="loading">No published testimonials yet. Set a row's Status to "Published" in your Testimonials table to display it here.</p>`;
            return;
        }

        container.innerHTML = data.records.map(record => {
            const fields = record.fields || {};
            const quote = escapeHTML(fields['Quote'] || '');
            const name = escapeHTML(fields['Customer Name'] || 'A happy customer');
            const neighborhood = escapeHTML(fields['Neighborhood'] || '');
            const attribution = neighborhood ? `${name}, ${neighborhood}` : name;

            return `
                <div class="t-card">
                    <p class="quote">${quote}</p>
                    <p class="attr">— ${attribution}</p>
                </div>`;
        }).join('');

    } catch (error) {
        console.error('Testimonials load error:', error);
        container.innerHTML = `<p class="loading">Couldn't load testimonials right now. Check the Actions tab in your GitHub repo for errors.</p>`;
    }
}

function init() {
    renderBusinessInfo();
    fetchServices();
    fetchTestimonials();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
