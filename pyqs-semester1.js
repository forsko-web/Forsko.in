/**
 * Forsko - PYQs Semester Page JavaScript
 * Handles: Navbar Scroll, Mobile Menu, Single-Open Accordions, Real-Time Search Filtering
 */

document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  const searchInput = document.getElementById('subjectSearch');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const accordionCards = document.querySelectorAll('.subject-accordion-card');
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

  const navLinks = document.querySelectorAll('.nav-link');
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
     3. Smooth Accordion Interactivity (Only One Open at a Time)
     -------------------------------------------------------------------------- */

  function closeAccordion(card) {
    card.classList.remove('open');
    const toggleBtn = card.querySelector('.accordion-toggle-btn');
    const content = card.querySelector('.accordion-content');
    
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      const btnText = toggleBtn.querySelector('.btn-text');
      if (btnText) btnText.textContent = 'View Papers';
    }
    
    if (content) {
      content.style.maxHeight = null;
    }
  }

  function openAccordion(card) {
    card.classList.add('open');
    const toggleBtn = card.querySelector('.accordion-toggle-btn');
    const content = card.querySelector('.accordion-content');
    
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'true');
      const btnText = toggleBtn.querySelector('.btn-text');
      if (btnText) btnText.textContent = 'Hide Papers';
    }
    
    if (content) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }

  accordionCards.forEach(card => {
    const header = card.querySelector('.accordion-header');
    
    if (header) {
      header.addEventListener('click', (e) => {
        const isOpen = card.classList.contains('open');

        // Close all currently open accordions first
        accordionCards.forEach(otherCard => {
          if (otherCard !== card && otherCard.classList.contains('open')) {
            closeAccordion(otherCard);
          }
        });

        // Toggle clicked accordion
        if (isOpen) {
          closeAccordion(card);
        } else {
          openAccordion(card);
        }
      });
    }
  });

  /* --------------------------------------------------------------------------
     4. Real-Time Subject Search Filtering
     -------------------------------------------------------------------------- */

  function filterSubjects() {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    if (query.length > 0) {
      searchClearBtn.classList.remove('hidden');
    } else {
      searchClearBtn.classList.add('hidden');
    }

    accordionCards.forEach(card => {
      const subjectData = card.getAttribute('data-subject') || '';
      const titleText = card.querySelector('.subject-title')?.textContent.toLowerCase() || '';
      const descText = card.querySelector('.subject-description')?.textContent.toLowerCase() || '';

      const match = subjectData.includes(query) || titleText.includes(query) || descText.includes(query);

      if (match) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
        // Close if hidden
        if (card.classList.contains('open')) {
          closeAccordion(card);
        }
      }
    });

    if (visibleCount === 0) {
      noResultsState.classList.remove('hidden');
    } else {
      noResultsState.classList.add('hidden');
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterSubjects);
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterSubjects();
      searchInput.focus();
    });
  }

});