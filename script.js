/**
 * Forsko Platform - Main Script
 * Isolated functions to prevent script crashes across pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFAB();
  initStudyTips();
  initSearchDropdown();
  initCounterStats();
});

/* ==========================================================================
   1. Mobile Hamburger Menu
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
          icon.classList.replace('fa-xmark', 'fa-bars');
        }
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
      });
    });
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const visualCard = document.getElementById('aboutVisualCard');
  const spotlight = document.getElementById('aboutSpotlight');

  if (visualCard) {
    visualCard.addEventListener('mousemove', (e) => {
      const rect = visualCard.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X inside card
      const y = e.clientY - rect.top;  // Mouse Y inside card

      // Update light spotlight position
      if (spotlight) {
        visualCard.style.setProperty('--spot-x', `${x}px`);
        visualCard.style.setProperty('--spot-y', `${y}px`);
      }

      // Calculate 3D Parallax Tilt Angles
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8; // Max tilt 8 deg
      const rotateY = ((x - centerX) / centerX) * 8;

      visualCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    // Reset card position smoothly on mouse leave
    visualCard.addEventListener('mouseleave', () => {
      visualCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }
});


// ==========================================
// Forsko - Bento Grid 3D Tilt & Spotlight
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const bentoCards = document.querySelectorAll('.bento-card[data-tilt]');

  bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X inside card
      const y = e.clientY - rect.top;  // Mouse Y inside card

      // Update light spotlight position
      card.style.setProperty('--bento-x', `${x}px`);
      card.style.setProperty('--bento-y', `${y}px`);

      // Calculate 3D Parallax Tilt Angles
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // Max tilt 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.015)`;
    });

    // Reset card position smoothly on mouse leave
    card.style.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });
});

/* ==========================================================================
   2. Floating Action Button (FAB)
   ========================================================================== */
function initFAB() {
  const fabContainer = document.getElementById('fabContainer');
  const fabMainBtn = document.getElementById('fabMainBtn');
  const fabMenu = document.getElementById('fabMenu');
  const fabSearch = document.getElementById('fabSearch');
  const fabBackToTop = document.getElementById('fabBackToTop');
  const fabFeedback = document.getElementById('fabFeedback');

  if (!fabContainer || !fabMainBtn) return;

  function toggleFabMenu() {
    const isActive = fabContainer.classList.toggle('active');
    fabMainBtn.setAttribute('aria-expanded', isActive);
    if (fabMenu) fabMenu.setAttribute('aria-hidden', !isActive);
  }

  function closeFabMenu() {
    if (fabContainer.classList.contains('active')) {
      fabContainer.classList.remove('active');
      fabMainBtn.setAttribute('aria-expanded', 'false');
      if (fabMenu) fabMenu.setAttribute('aria-hidden', 'true');
    }
  }

  fabMainBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFabMenu();
  });

  if (fabSearch) {
    fabSearch.addEventListener('click', () => {
      closeFabMenu();
      const searchInput = document.getElementById('searchInput');
      const searchSection = document.getElementById('search');
      if (searchSection) searchSection.scrollIntoView({ behavior: 'smooth' });
      if (searchInput) setTimeout(() => searchInput.focus(), 400);
    });
  }

  if (fabBackToTop) {
    fabBackToTop.addEventListener('click', () => {
      closeFabMenu();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (fabFeedback) {
    fabFeedback.addEventListener('click', () => {
      closeFabMenu();
      window.location.href = 'https://forms.gle/d7s2tebfezbqtuK68';
    });
  }

  document.addEventListener('click', (e) => {
    if (!fabContainer.contains(e.target)) closeFabMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeFabMenu();
  });
}


// ==========================================
// Forsko - Hero Section 3D Tilt & Spotlight
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const codeWindow = document.getElementById('heroCodeWindow');
  const codeSpotlight = document.getElementById('codeSpotlight');

  if (codeWindow) {
    codeWindow.addEventListener('mousemove', (e) => {
      const rect = codeWindow.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X inside window
      const y = e.clientY - rect.top;  // Mouse Y inside window

      // Update cursor light spotlight
      if (codeSpotlight) {
        codeWindow.style.setProperty('--code-x', `${x}px`);
        codeWindow.style.setProperty('--code-y', `${y}px`);
      }

      // Calculate 3D Parallax Tilt Angles
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7; // Max tilt 7 deg
      const rotateY = ((x - centerX) / centerX) * 7;

      codeWindow.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    // Reset transform on mouse leave
    codeWindow.addEventListener('mouseleave', () => {
      codeWindow.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }
});

/* ==========================================================================
   5. Interactive Counter Stats & 3D Parallax Tilt
   ========================================================================== */
function initCounterStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsSection = document.querySelector('.stats-section');
  const statCards = document.querySelectorAll('.stat-card[data-tilt]');

  if (!statsSection || statNumbers.length === 0) return;

  let animated = false;

  /* --------------------------------------------------------------------------
     A. Smooth Ease-Out Deceleration Counter Animation
     -------------------------------------------------------------------------- */
  function runCounterAnimation() {
    if (animated) return;
    animated = true;

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
      if (target === 0) return;

      const duration = 1600; // 1.6s total time
      const startTime = performance.now();

      // Cubic Ease-Out curve for smooth deceleration
      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeOutCubic(progress);

        const currentCount = Math.floor(easedProgress * target);

        if (progress < 1) {
          stat.innerText = currentCount + '+';
          requestAnimationFrame(updateCounter);
        } else {
          stat.innerText = target + '+';
          
          // Subtle completion pulse animation on completion
          stat.style.transform = 'scale(1.15)';
          setTimeout(() => {
            stat.style.transform = 'scale(1)';
          }, 200);
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // Trigger animation using IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runCounterAnimation();
      }
    }, { threshold: 0.15 });

    observer.observe(statsSection);
  } else {
    runCounterAnimation();
  }

  /* --------------------------------------------------------------------------
     B. Mouse Spotlight & 3D Tilt Parallax Effect
     -------------------------------------------------------------------------- */
  statCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X inside card
      const y = e.clientY - rect.top;  // Mouse Y inside card

      // Update cursor light spotlight position
      card.style.setProperty('--stat-x', `${x}px`);
      card.style.setProperty('--stat-y', `${y}px`);

      // Calculate 3D Parallax Tilt Angles
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8; // Max 8 deg tilt
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    // Reset card position smoothly on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });
}

// Call initializer
document.addEventListener('DOMContentLoaded', initCounterStats);