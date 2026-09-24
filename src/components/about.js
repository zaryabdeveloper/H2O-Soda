/**
 * About Section Component - The H2O Experience
 * Concise, premium brand storytelling focusing on craft, temperature & carbonation
 */

export function renderAboutSection() {
  const container = document.getElementById('about-section-container');
  if (!container) return;

  const html = `
    <div class="container">
      <div class="about-hero-block">
        <span class="section-tag-pill">THE H2O EXPERIENCE</span>
        <h2 class="about-main-title">
          Cold Craft Carbonation.<br>
          <span class="text-gradient-cyan">Freshness, With a Fizz.</span>
        </h2>
        <p class="about-lead-text">
          H2O Soda was conceived around a single obsession: creating the purest, coldest, most refreshing soda experience. We believe a great drink needs no synthetic colorants or artificial syrup cloyness—just cold-extracted botanicals, diamond ice, and precision carbonation.
        </p>
      </div>

      <div class="about-pillars-grid">
        <div class="about-pillar-card">
          <div class="pillar-icon-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/>
            </svg>
          </div>
          <span class="pillar-number">01</span>
          <h3 class="pillar-title">34°F Precision Chill</h3>
          <p class="pillar-desc">
            CO₂ absorbs with maximum molecular stability at exactly 34°F. Every drop leaves our counter-pressure draft taps ice-cold without freezing, delivering an instant electrifying snap.
          </p>
        </div>

        <div class="about-pillar-card">
          <div class="pillar-icon-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="8" cy="10" r="1"/>
              <circle cx="15" cy="8" r="1.5"/>
              <circle cx="11" cy="16" r="2"/>
            </svg>
          </div>
          <span class="pillar-number">02</span>
          <h3 class="pillar-title">Micro-Bubble Fizz</h3>
          <p class="pillar-desc">
            Unlike harsh, bloated commercial sodas, our micro-carbonation creates needle-fine champagne bubbles that dance softly across your tongue and lift natural aromas.
          </p>
        </div>

        <div class="about-pillar-card">
          <div class="pillar-icon-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
              <path d="M12 6a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6z"/>
            </svg>
          </div>
          <span class="pillar-number">03</span>
          <h3 class="pillar-title">Pure Cold Extracts</h3>
          <p class="pillar-desc">
            We cold-press fresh California Eureka lemons, Tahitian lime peels, and whole botanical flowers daily. Zero artificial syrups, zero chemical dyes, and pure natural clarity.
          </p>
        </div>
      </div>

      <div class="about-banner-strip">
        <div class="banner-stat">
          <span class="stat-val">34°F</span>
          <span class="stat-lbl">Serving Temperature</span>
        </div>
        <div class="banner-divider"></div>
        <div class="banner-stat">
          <span class="stat-val">100%</span>
          <span class="stat-lbl">Cold Botanical Infusion</span>
        </div>
        <div class="banner-divider"></div>
        <div class="banner-stat">
          <span class="stat-val">0%</span>
          <span class="stat-lbl">Synthetic Syrups</span>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}
