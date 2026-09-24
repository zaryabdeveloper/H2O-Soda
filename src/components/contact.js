/**
 * Contact & WhatsApp Order Form Component
 * Two-Column Layout (Desktop) / Stacked (Mobile)
 * Captures user input and generates direct WhatsApp message URL
 */

import { siteData, formatOrderMessage, getWhatsAppUrl, WHATSAPP_ICON_SVG } from '../data/siteData.js';
import { menuItems } from '../data/menuData.js';

export function renderContactSection() {
  const container = document.getElementById('contact-section-container');
  if (!container) return;

  const directWaUrl = getWhatsAppUrl('Hello H2O Soda, I would like to make an inquiry.');

  const drinkOptions = menuItems.map(item => `
    <option value="${item.name} (${item.price})">${item.name} — ${item.price}</option>
  `).join('');

  const html = `
    <div class="container">
      <div class="contact-header text-center">
        <span class="section-tag-pill">DIRECT ORDER & INQUIRY</span>
        <h2 class="section-heading-dark">Order On WhatsApp</h2>
        <p class="section-subheading-dark">
          Freshly carbonated and sealed cold at 34°F. Send your direct order or event inquiry straight to our counter.
        </p>
      </div>

      <div class="contact-dual-grid">
        <!-- Left Column: Information -->
        <div class="contact-info-card">
          <div class="contact-info-header">
            <h3 class="info-card-title">Bar Counter & Inquiries</h3>
            <p class="info-card-desc">
              Connect directly with our team. We handle individual chilled takeaway orders, bulk events, and business collaborations.
            </p>
          </div>

          <div class="contact-detail-items">
            <div class="detail-item">
              <div class="detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div class="detail-text">
                <div class="detail-label">WhatsApp & Phone</div>
                <div class="detail-val">${siteData.contact.whatsapp}</div>
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div class="detail-text">
                <div class="detail-label">Direct Email</div>
                <div class="detail-val"><a href="mailto:${siteData.contact.email}">${siteData.contact.email}</a></div>
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div class="detail-text">
                <div class="detail-label">Location</div>
                <div class="detail-val">${siteData.contact.location}</div>
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div class="detail-text">
                <div class="detail-label">Hours of Operation</div>
                <div class="detail-val">${siteData.contact.hours}</div>
              </div>
            </div>
          </div>

          <div class="contact-quick-cta">
            <a href="${directWaUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width:100%; justify-content:center;">
              ${WHATSAPP_ICON_SVG}
              <span>DIRECT WHATSAPP CHAT</span>
            </a>
          </div>
        </div>

        <!-- Right Column: WhatsApp Order Form -->
        <div class="contact-form-card">
          <div class="form-card-header">
            <h3 class="form-title">Send WhatsApp Order</h3>
            <p class="form-subtitle">Fill in details below to generate your direct WhatsApp order.</p>
          </div>

          <form id="whatsapp-order-form" class="order-form">
            <div class="form-group-row">
              <div class="form-group">
                <label for="order-name" class="form-label">Full Name <span class="required">*</span></label>
                <input type="text" id="order-name" class="form-input" placeholder="e.g. Zaryab" required />
              </div>
              <div class="form-group">
                <label for="order-phone" class="form-label">Phone Number <span class="required">*</span></label>
                <input type="tel" id="order-phone" class="form-input" placeholder="e.g. 0300 1234567" required />
              </div>
            </div>

            <div class="form-group-row">
              <div class="form-group" style="flex: 2;">
                <label for="order-drink" class="form-label">Select Drink <span class="required">*</span></label>
                <select id="order-drink" class="form-select" required>
                  ${drinkOptions}
                </select>
              </div>
              <div class="form-group" style="flex: 1;">
                <label for="order-qty" class="form-label">Quantity <span class="required">*</span></label>
                <input type="number" id="order-qty" class="form-input" min="1" max="50" value="1" required />
              </div>
            </div>

            <div class="form-group">
              <label for="order-flavour" class="form-label">Preferred Flavour / Custom Note (Optional)</label>
              <input type="text" id="order-flavour" class="form-input" placeholder="e.g. Extra lemon wheel, less ice" />
            </div>

            <div class="form-group">
              <label for="order-message" class="form-label">Message / Delivery Details (Optional)</label>
              <textarea id="order-message" class="form-textarea" rows="3" placeholder="Tell us your delivery area or any special requirements..."></textarea>
            </div>

            <div id="form-feedback" class="form-feedback hidden"></div>

            <button type="submit" id="btn-submit-order" class="btn btn-whatsapp btn-lg" style="width:100%; justify-content:center;">
              ${WHATSAPP_ICON_SVG}
              <span>SEND ORDER VIA WHATSAPP</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Bind form submission
  const form = document.getElementById('whatsapp-order-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('order-name')?.value.trim();
      const phone = document.getElementById('order-phone')?.value.trim();
      const drink = document.getElementById('order-drink')?.value;
      const quantity = document.getElementById('order-qty')?.value || '1';
      const flavour = document.getElementById('order-flavour')?.value.trim();
      const message = document.getElementById('order-message')?.value.trim();

      if (!name || !phone) {
        if (feedback) {
          feedback.textContent = 'Please enter your Name and Phone Number.';
          feedback.className = 'form-feedback error';
          feedback.classList.remove('hidden');
        }
        return;
      }

      const waUrl = formatOrderMessage({
        name,
        phone,
        drink,
        quantity,
        flavour,
        message
      });

      if (feedback) {
        feedback.textContent = '✓ Redirecting to WhatsApp with your order...';
        feedback.className = 'form-feedback success';
        feedback.classList.remove('hidden');
      }

      window.open(waUrl, '_blank');
    });
  }
}
