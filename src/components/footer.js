/**
 * Universal Footer Component
 * Charcoal Strategic Section, Clean Minimalist Typography, WhatsApp CTA
 */

import { siteData, getWhatsAppUrl, WHATSAPP_ICON_SVG } from '../data/siteData.js';

export function renderFooter() {
  const whatsAppUrl = getWhatsAppUrl('Hello H2O Soda, I would like to place an order / make an inquiry.');

  const footerHtml = `
    <footer class="footer">
      <div class="container footer-container">
        <div class="footer-grid">
          <!-- Column 1: Brand -->
          <div class="footer-col footer-col-brand">
            <a href="#hero" class="brand-logo footer-logo">
              <span class="h2o">H<span class="sub">2</span>O</span>
              <span class="soda-tag">SODA</span>
            </a>
            <p class="footer-tagline">
              Freshness, With a Fizz. Precision 34°F chill, micro-carbonation, and pure citrus botanicals.
            </p>
            <div class="footer-demo-pill">
              <span>● Serving Fresh Daily</span>
            </div>
          </div>

          <!-- Column 2: Navigation -->
          <div class="footer-col footer-col-nav">
            <h4 class="footer-heading">Navigation</h4>
            <ul class="footer-nav-list">
              <li><a href="#hero" class="footer-link">Home</a></li>
              <li><a href="#menu" class="footer-link">Menu</a></li>
              <li><a href="#about" class="footer-link">About</a></li>
              <li><a href="#contact" class="footer-link">Contact</a></li>
            </ul>
          </div>

          <!-- Column 3: Contact & Order -->
          <div class="footer-col footer-col-contact">
            <h4 class="footer-heading">Order & Bar Counter</h4>
            <p class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>${siteData.contact.location}</span>
            </p>
            <p class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>${siteData.contact.hours}</span>
            </p>
            <p class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <a href="mailto:${siteData.contact.email}" class="footer-mail-link">${siteData.contact.email}</a>
            </p>
            <div style="margin-top: 20px;">
              <a href="${whatsAppUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
                ${WHATSAPP_ICON_SVG}
                <span>ORDER ON WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-copyright">
            © ${new Date().getFullYear()} H2O Soda. All rights reserved.
          </div>
          <div class="footer-demo-note">
            Client Presentation Demo • Pakistani Beverage Craft
          </div>
        </div>
      </div>
    </footer>
  `;

  const mountPoint = document.getElementById('footer-mount');
  if (mountPoint) {
    mountPoint.innerHTML = footerHtml;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHtml);
  }

  // Smooth scroll for footer links
  document.querySelectorAll('.footer-link, .footer-logo').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: targetId === 'hero' ? 0 : elementPosition - navOffset,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}
