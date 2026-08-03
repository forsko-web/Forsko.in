/**
 * Forsko - Semester I Question Bank JavaScript
 * Controls: Mobile Navigation Menu, Navbar Scroll Effect, Accordion Toggles, and Live Subject Search
 */

document.addEventListener('DOMContentLoaded', () => {

  // Navbar & Mobile Menu Elements
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Accordion & Search Elements
  const accordionCards = document.querySelectorAll('.subject-accordion-card');
  const subjectSearch = document.getElementById('subjectSearch');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const noResultsState = document.getElementById('noResultsState');

  /* --------------------------------------------------------------------------
     1. Navbar Scroll Effect
     -------------------------------------------------------------------------- */
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* --------------------------------------------------------------------------
     2. Mobile Menu Toggle
     -------------------------------------------------------------------------- */

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.replace('fa-xmark', 'fa-bars');
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     3. Accordion Toggle Logic
     -------------------------------------------------------------------------- */

  accordionCards.forEach(card => {
    const toggleBtn = card.querySelector('.accordion-toggle-btn');
    const header = card.querySelector('.accordion-header');

    const toggleAccordion = (e) => {
      // Don't toggle if clicking directly on a link
      if (e.target.closest('a')) return;

      const isActive = card.classList.contains('active');

      // Toggle current card active state
      card.classList.toggle('active');

      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', !isActive);
        const btnText = toggleBtn.querySelector('.btn-text');
        if (btnText) {
          btnText.textContent = !isActive ? 'Hide Question Bank' : 'View Question Bank';
        }
      }
    };

    if (header) {
      header.addEventListener('click', toggleAccordion);
    }
  });

  /* --------------------------------------------------------------------------
     4. Subject Live Search & Filtering
     -------------------------------------------------------------------------- */

  if (subjectSearch) {
    subjectSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      // Show/Hide Clear Button
      if (query.length > 0) {
        if (searchClearBtn) searchClearBtn.classList.remove('hidden');
      } else {
        if (searchClearBtn) searchClearBtn.classList.add('hidden');
      }

      let visibleCount = 0;

      accordionCards.forEach(card => {
        const subjectAttr = card.getAttribute('data-subject') || '';
        const titleText = card.querySelector('.subject-title')?.textContent.toLowerCase() || '';
        const descText = card.querySelector('.subject-description')?.textContent.toLowerCase() || '';

        // Match search query against subject name or description
        if (subjectAttr.includes(query) || titleText.includes(query) || descText.includes(query)) {
          card.style.display = 'block';
          visibleCount++;

          // Auto expand matched accordion if actively searching
          if (query.length >= 2) {
            card.classList.add('active');
            const toggleBtn = card.querySelector('.accordion-toggle-btn');
            if (toggleBtn) {
              toggleBtn.setAttribute('aria-expanded', 'true');
              const btnText = toggleBtn.querySelector('.btn-text');
              if (btnText) btnText.textContent = 'Hide Question Bank';
            }
          }
        } else {
          card.style.display = 'none';
        }
      });

      // Toggle No Results State
      if (visibleCount === 0) {
        if (noResultsState) noResultsState.classList.remove('hidden');
      } else {
        if (noResultsState) noResultsState.classList.add('hidden');
      }
    });

    // Clear Search Input Handler
    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        subjectSearch.value = '';
        searchClearBtn.classList.add('hidden');
        if (noResultsState) noResultsState.classList.add('hidden');

        accordionCards.forEach(card => {
          card.style.display = 'block';
          card.classList.remove('active');
          const toggleBtn = card.querySelector('.accordion-toggle-btn');
          if (toggleBtn) {
            toggleBtn.setAttribute('aria-expanded', 'false');
            const btnText = toggleBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = 'View Question Bank';
          }
        });
      });
    }
  }

});