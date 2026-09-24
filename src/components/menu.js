/**
 * Menu Component - Editorial Alternating Product Showcase
 * Features:
 * - Alternating layouts (Image Left / Info Right vs Image Right / Info Left)
 * - Real high-resolution product photography
 * - Pakistani Rs. pricing
 * - Official WhatsApp ordering buttons with SVG icons
 * - Smooth GSAP ScrollTrigger reveals
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuItems } from '../data/menuData.js';
import { getProductWhatsAppUrl, WHATSAPP_ICON_SVG } from '../data/siteData.js';

gsap.registerPlugin(ScrollTrigger);

export function renderMenuSection() {
  const container = document.getElementById('menu-list-container');
  if (!container) return;

  const html = menuItems.map((item, index) => {
    const isEven = index % 2 === 0;
    const layoutClass = isEven ? 'layout-normal' : 'layout-reversed';
    const waUrl = getProductWhatsAppUrl(item.name, item.price);

    return `
      <article class="editorial-product ${layoutClass}" data-index="${index}">
        <div class="product-media-col">
          <div class="product-image-frame" style="--accent-color: ${item.colorAccent}">
            <div class="product-ambient-halo"></div>
            <img 
              src="${item.image}" 
              alt="${item.name} - H2O Soda" 
              class="product-image"
              loading="${index < 2 ? 'eager' : 'lazy'}"
              width="600"
              height="600"
            />
            <div class="product-temp-tag">
              <span>34°F CHILL</span>
            </div>
          </div>
        </div>

        <div class="product-info-col">
          <div class="product-badge-row">
            <span class="product-tag-pill">${item.tag}</span>
            <span class="product-carbonation-badge">Micro-Carbonated</span>
          </div>

          <h3 class="product-title">${item.name}</h3>

          <div class="product-price-row">
            <span class="product-price-val">${item.price}</span>
            <span class="product-tax-note">Freshly Poured • 16 oz</span>
          </div>

          <p class="product-description">${item.description}</p>

          <div class="product-attributes">
            <span class="attr-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/></svg>
              Zero Syrups
            </span>
            <span class="attr-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              Cold Steeped
            </span>
            <span class="attr-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Diamond Ice
            </span>
          </div>

          <div class="product-cta-wrap">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
              ${WHATSAPP_ICON_SVG}
              <span>ORDER ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = html;
}

export function initMenuAnimations() {
  const products = document.querySelectorAll('.editorial-product');
  if (!products.length) return;

  products.forEach((product, idx) => {
    const media = product.querySelector('.product-media-col');
    const info = product.querySelector('.product-info-col');
    const isEven = idx % 2 === 0;

    const fromMediaX = isEven ? -40 : 40;
    const fromInfoX = isEven ? 40 : -40;

    gsap.fromTo(media, 
      { opacity: 0, x: fromMediaX, scale: 0.96 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: product,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(info,
      { opacity: 0, x: fromInfoX },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: product,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}
