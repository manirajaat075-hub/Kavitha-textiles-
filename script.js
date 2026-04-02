/* ============================================
   KAVITHA TEXTILES — Premium Interactive Engine
   ============================================ */

(function () {
  'use strict';

  // ─── Loading Screen ───
  const loadingScreen = document.getElementById('loadingScreen');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.querySelector('.hero').classList.add('loaded');
    }, 1800);
  });

  // Fallback: hide loader after 4 seconds regardless
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    document.querySelector('.hero')?.classList.add('loaded');
  }, 4000);

  // ─── Navbar Scroll Behavior ───
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');
  let lastScrollY = 0;

  function handleNavbarScroll() {
    const scrollY = window.scrollY;
    const heroHeight = heroSection?.offsetHeight || 700;

    if (scrollY > 80) {
      navbar.classList.remove('transparent');
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.add('transparent');
      navbar.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ─── Mobile Navigation ───
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Smooth Scroll for Anchor Links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight || 70;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ─── Scroll Reveal Animations (Intersection Observer) ───
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Don't unobserve — keeps it lightweight but animates once
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── Parallax Effect on Hero Image ───
  const heroBgImage = document.getElementById('heroBgImage');

  function handleParallax() {
    if (!heroBgImage) return;
    const scrollY = window.scrollY;
    const heroHeight = heroSection?.offsetHeight || 700;

    if (scrollY < heroHeight) {
      const parallaxOffset = scrollY * 0.35;
      heroBgImage.style.transform = `scale(1.1) translateY(${parallaxOffset}px)`;
    }
  }

  window.addEventListener('scroll', handleParallax, { passive: true });

  // ─── Collection Card Ripple Effect (Mouse Tracking) ───
  const collectionCards = document.querySelectorAll('.collection-card');

  collectionCards.forEach(card => {
    const ripple = card.querySelector('.collection-card-ripple');
    if (!ripple) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      ripple.style.setProperty('--mouse-x', x + '%');
      ripple.style.setProperty('--mouse-y', y + '%');
    });
  });

  // ─── Custom Cursor (Desktop Only) ───
  const customCursor = document.getElementById('customCursor');

  if (customCursor && window.matchMedia('(hover: hover)').matches) {
    let cursorX = 0, cursorY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    function animateCursor() {
      currentX += (cursorX - currentX) * 0.15;
      currentY += (cursorY - currentY) * 0.15;
      customCursor.style.left = currentX + 'px';
      customCursor.style.top = currentY + 'px';
      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .collection-card, .why-card, .review-card, .experience-feature');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
    });
  } else if (customCursor) {
    customCursor.style.display = 'none';
  }

  // ─── Back to Top Button ───
  const backToTopBtn = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 600) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Counter Animation for Rating Badge ───
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = start + (target - start) * eased;

      if (target % 1 !== 0) {
        element.textContent = current.toFixed(1);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Observe rating badge for counter animation
  const ratingScore = document.querySelector('.rating-badge-score');
  if (ratingScore) {
    const ratingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(ratingScore, 3.8, 1500);
          ratingObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    ratingObserver.observe(ratingScore);
  }

  // ─── Staggered Card Entrance Animation ───
  const whyCards = document.querySelectorAll('.why-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 120);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  whyCards.forEach(card => {
    cardObserver.observe(card);
  });

  // ─── Image Lazy Load with Fade In ───
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  lazyImages.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';

    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });

  // ─── Scroll Progress Indicator (subtle) ───
  function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      width: 0%;
      background: linear-gradient(90deg, #7A1E2C, #CFA24A);
      z-index: 10001;
      transition: width 0.1s linear;
      pointer-events: none;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }, { passive: true });
  }

  createScrollProgress();

  // ─── Hover Tilt Effect on Collection Cards ───
  if (window.matchMedia('(hover: hover)').matches) {
    collectionCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // ─── Typing Effect for Hero Badge (optional enhancement) ───
  const heroBadgeText = document.querySelector('.hero-badge span:not(.badge-dot)');
  if (heroBadgeText) {
    const fullText = heroBadgeText.textContent;
    heroBadgeText.textContent = '';

    setTimeout(() => {
      let i = 0;
      function typeChar() {
        if (i < fullText.length) {
          heroBadgeText.textContent += fullText.charAt(i);
          i++;
          setTimeout(typeChar, 40);
        }
      }
      typeChar();
    }, 2200);
  }

  // ─── Active Nav Link Highlighting on Scroll ───
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  function updateActiveNavLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinksAll.forEach(link => {
          link.style.opacity = '0.7';
          if (link.getAttribute('href') === '#' + id) {
            link.style.opacity = '1';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ─── Preload Critical Images ───
  function preloadImage(src) {
    const img = new Image();
    img.src = src;
  }

  preloadImage('images/hero-bg.png');

  // ─── Performance: Throttle scroll events ───
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleNavbarScroll();
        handleParallax();
        handleBackToTop();
        updateActiveNavLink();
        ticking = false;
      });
      ticking = true;
    }
  }

  // We already added individual listeners above, but this unified handler
  // can be used as an optimization if needed in the future.

  // ─── Console Branding ───
  console.log(
    '%c✨ Kavitha Textiles %c கவிதா ஜவுளி ',
    'background: #7A1E2C; color: #CFA24A; padding: 10px 16px; font-size: 16px; font-weight: bold; border-radius: 4px 0 0 4px;',
    'background: #CFA24A; color: #7A1E2C; padding: 10px 16px; font-size: 16px; font-weight: bold; border-radius: 0 4px 4px 0;'
  );
  console.log('%cWhere Tradition Meets Elegant Fashion', 'color: #6B6B6B; font-style: italic; font-size: 12px;');

})();
