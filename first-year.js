/**
 * Forsko - First Year Page JavaScript
 * Handles Navigation & Animated Stat Counter Observer
 */

document.addEventListener('DOMContentLoaded', () => {

  // Navigation Elements
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  /* --------------------------------------------------------------------------
     1. Mobile Navigation Toggle
     -------------------------------------------------------------------------- */
  
  if (hamburger) {
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
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.replace('fa-xmark', 'fa-bars');
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     2. Animated Stat Counters Observer
     -------------------------------------------------------------------------- */

  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let animated = false;

  function runCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 30));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          stat.textContent = target + (target > 2 ? '+' : '');
          clearInterval(timer);
        } else {
          stat.textContent = current + (target > 2 ? '+' : '');
        }
      }, 40);
    });
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        runCounters();
        animated = true;
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

});