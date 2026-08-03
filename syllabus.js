/**
 * Forsko - Syllabus Landing Page JavaScript
 * Handles Navigation & Responsive Layout Behavior
 */

document.addEventListener('DOMContentLoaded', () => {

  // Navigation Elements
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  /* --------------------------------------------------------------------------
     1. Mobile Menu Navigation
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

});