/**
 * H2O Soda - Main Single Page Application Logic
 * Pinned GSAP Canvas Hero + Editorial Menu + About Experience + WhatsApp Contact
 */

import '../assets/styles.css';
import { FrameEngine } from '../core/frameEngine.js';
import { initHeroAnimation } from '../core/heroAnimation.js';
import { renderNavbar } from '../components/navbar.js';
import { renderMenuSection, initMenuAnimations } from '../components/menu.js';
import { renderAboutSection } from '../components/about.js';
import { renderContactSection } from '../components/contact.js';
import { renderFooter } from '../components/footer.js';
import { getWhatsAppUrl } from '../data/siteData.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mount Universal Components
  renderNavbar('hero');
  renderMenuSection();
  renderAboutSection();
  renderContactSection();
  renderFooter();

  // 2. Initialize Frame Preloading & Canvas Engine
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const frameEngine = new FrameEngine({
      canvas,
      maxConcurrent: 4
    });

    // 3. Initialize GSAP ScrollTrigger Hero Sequence
    initHeroAnimation(frameEngine);
  }

  // 4. Initialize GSAP Scroll Animations for Menu
  initMenuAnimations();

  // 5. Hero CTA WhatsApp Button
  const heroWaBtn = document.getElementById('hero-whatsapp-btn');
  if (heroWaBtn) {
    heroWaBtn.href = getWhatsAppUrl('Hello H2O Soda, I would like to order the Electric Blue Citrus signature soda.');
  }

  // 6. Smooth Scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const navOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: targetId === 'hero' ? 0 : elementPosition - navOffset,
          behavior: 'smooth'
        });
      }
    });
  });
});
