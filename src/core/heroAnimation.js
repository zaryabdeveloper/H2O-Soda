import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FRAME_COUNT } from '../data/framesManifest.js';

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimation(frameEngine) {
  const heroSection = document.querySelector('.hero-section');
  const canvas = document.querySelector('#hero-canvas');
  const heroLeft = document.querySelector('.hero-left');

  if (!heroSection || !canvas || !frameEngine) {
    return null;
  }

  // Bind canvas to engine and initialize size
  frameEngine.setCanvas(canvas);
  frameEngine.resizeCanvas();

  // Resize handler
  const handleResize = () => {
    frameEngine.resizeCanvas();
    ScrollTrigger.refresh();
  };

  window.addEventListener('resize', handleResize, { passive: true });

  const animProxy = { frame: 0 };
  const total = Math.max(0, FRAME_COUNT - 1);

  // Main ScrollTrigger timeline
  // The hero is pinned while the soda frame animation plays.
  // CRITICAL REQUIREMENT: Left hero content stays visible throughout the entire animation.
  // NO step indicators, NO progress numbers, NO fading out the hero text.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Subtle pour indicator badge if present
        const pourBadge = document.querySelector('.hero-pour-status');
        if (pourBadge) {
          if (self.progress >= 0.9) {
            pourBadge.textContent = '● Poured & Sealed (34°F)';
            pourBadge.classList.add('ready');
          } else if (self.progress > 0.1) {
            pourBadge.textContent = '● Pouring Fresh...';
            pourBadge.classList.remove('ready');
          } else {
            pourBadge.textContent = '● Scroll to Pour';
            pourBadge.classList.remove('ready');
          }
        }
      }
    }
  });

  // Scrub frame animation smoothly across scroll
  tl.to(animProxy, {
    frame: total,
    ease: 'none',
    duration: 1,
    onUpdate: () => {
      const targetIndex = Math.round(animProxy.frame);
      frameEngine.render(targetIndex);
    }
  }, 0);

  return {
    timeline: tl,
    destroy: () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === heroSection) {
          st.kill();
        }
      });
    }
  };
}
