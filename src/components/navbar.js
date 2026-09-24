/**
 * Universal Navigation Bar Component
 * Single-Page Anchor Navigation: HOME | MENU | ABOUT | CONTACT + WhatsApp CTA
 */

import { siteData, getWhatsAppUrl, WHATSAPP_ICON_SVG } from '../data/siteData.js';

export function renderNavbar(activeSection = 'hero') {
  const whatsAppUrl = getWhatsAppUrl('Hello H2O Soda, I would like to place an order / make an inquiry.');

  const navHtml = `
    <nav class="navbar" id="main-nav">
      <div class="container nav-container">
        <a href="#hero" class="brand-logo" aria-label="H2O Soda Home">
          <span class="h2o">H<span class="sub">2</span>O</span>
          <span class="soda-tag">SODA</span>
        </a>

        <ul class="nav-menu">
          <li><a href="#hero" class="nav-link active" data-target="hero">HOME</a></li>
          <li><a href="#menu" class="nav-link" data-target="menu">MENU</a></li>
          <li><a href="#about" class="nav-link" data-target="about">ABOUT</a></li>
          <li><a href="#contact" class="nav-link" data-target="contact">CONTACT</a></li>
        </ul>

        <div class="nav-actions">
          <a href="${whatsAppUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
            ${WHATSAPP_ICON_SVG}
            <span>ORDER ON WHATSAPP</span>
          </a>
          <button class="mobile-nav-toggle" id="mobile-toggle" aria-label="Toggle navigation menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Navigation Drawer -->
    <div class="mobile-drawer" id="mobile-drawer">
      <div class="mobile-drawer-header">
        <a href="#hero" class="brand-logo mobile-logo-link">
          <span class="h2o">H<span class="sub">2</span>O</span>
          <span class="soda-tag">SODA</span>
        </a>
        <button id="mobile-close" class="mobile-drawer-close" aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <ul class="mobile-nav-list">
        <li><a href="#hero" class="mobile-nav-link active" data-target="hero">HOME</a></li>
        <li><a href="#menu" class="mobile-nav-link" data-target="menu">MENU</a></li>
        <li><a href="#about" class="mobile-nav-link" data-target="about">ABOUT</a></li>
        <li><a href="#contact" class="mobile-nav-link" data-target="contact">CONTACT</a></li>
      </ul>

      <div class="mobile-drawer-footer">
        <a href="${whatsAppUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width:100%; justify-content:center;">
          ${WHATSAPP_ICON_SVG}
          <span>ORDER ON WHATSAPP</span>
        </a>
      </div>
    </div>
    <div class="drawer-backdrop" id="drawer-backdrop"></div>
  `;

  const mountPoint = document.getElementById('navbar-mount') || document.body;
  if (document.getElementById('navbar-mount')) {
    mountPoint.innerHTML = navHtml;
  } else {
    mountPoint.insertAdjacentHTML('afterbegin', navHtml);
  }

  // Navbar background change on scroll
  const nav = document.getElementById('main-nav');
  const onScroll = () => {
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle logic
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileClose = document.getElementById('mobile-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  const openDrawer = () => {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', openDrawer);
  mobileClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  // Smooth scrolling for all nav links & close mobile drawer on click
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .mobile-logo-link, .brand-logo');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeDrawer();
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

  // Active section tracking on scroll
  const sections = ['hero', 'menu', 'about', 'contact'];
  const updateActiveNav = () => {
    const scrollY = window.scrollY + 120;
    let current = 'hero';

    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          current = sectionId;
        }
      }
    }

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      if (link.getAttribute('data-target') === current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
}
