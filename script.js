/**
 * Forsko Platform - Updated JavaScript
 * Controls: Sticky Navigation, Search Filter, Animated Counters & Smooth Scroll Sync
 */

document.addEventListener('DOMContentLoaded', () => {

  // DOM Elements
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const resetSearchBtn = document.getElementById('resetSearch');
  const featureCards = document.querySelectorAll('.feature-card');
  const noResults = document.getElementById('noResults');
  const statNumbers = document.querySelectorAll('.stat-number');

  /* --------------------------------------------------------------------------
     1. Sticky Navbar Effect & Mobile Navigation
     -------------------------------------------------------------------------- */

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
    }
  });

  // Close mobile navigation drawer when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  });

  /* --------------------------------------------------------------------------
     2. Real-Time Search & Card Filtering
     -------------------------------------------------------------------------- */

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    featureCards.forEach(card => {
      const title = card.getAttribute('data-title') || '';
      const textContent = card.textContent.toLowerCase();

      if (title.includes(query) || textContent.includes(query)) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
  }

  // Event Listeners for Search
  searchInput.addEventListener('input', performSearch);

  searchBtn.addEventListener('click', () => {
    performSearch();
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
      document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    }
  });

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      performSearch();
    });
  }

  /* --------------------------------------------------------------------------
     3. Animated Stat Counters (1000+ Notes, 500+ PYQs, 100+ Practicals, 50+ Subjects)
     -------------------------------------------------------------------------- */

  let counterAnimated = false;

  function animateCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      let count = 0;
      const increment = Math.max(1, Math.ceil(target / 40));

      const updateCounter = () => {
        count += increment;
        if (count < target) {
          stat.innerText = count + '+';
          setTimeout(updateCounter, 30);
        } else {
          stat.innerText = target + '+';
        }
      };

      updateCounter();
    });
  }

  // IntersectionObserver to trigger animation when scrolled into view
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counterAnimated) {
        animateCounters();
        counterAnimated = true;
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  /* --------------------------------------------------------------------------
     4. Active Link Highlight on Scroll
     -------------------------------------------------------------------------- */

  const sections = document.querySelectorAll('section, footer');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

});