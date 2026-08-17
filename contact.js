/**
 * Forsko - Premium Contact Page & Team Section JavaScript
 * Controls: Navigation, Mouse Spotlight, Character Counter, Floating Particles,
 *           3D Card Tilt, Ripple Effects, Form Validation, EmailJS Integration,
 *           Copy Clipboard, & Scroll Reveal.
 */

document.addEventListener('DOMContentLoaded', () => {

  // DOM Elements - Navigation & Hero
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const mouseSpotlight = document.getElementById('mouseSpotlight');
  const heroSection = document.getElementById('hero');

  // DOM Elements - Contact Form
  const contactForm = document.getElementById('contactForm');
  const fullName = document.getElementById('fullName');
  const emailAddress = document.getElementById('emailAddress');
  const inquiryType = document.getElementById('inquiryType');
  const messageText = document.getElementById('messageText');
  const charCounter = document.getElementById('charCounter');
  const submitBtn = document.getElementById('submitBtn');
  const btnSpinner = document.getElementById('btnSpinner');
  const successAlert = document.getElementById('successAlert');

  // DOM Elements - Quick Actions, Team & Scroll Reveal
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');
  const particleContainer = document.getElementById('teamParticleContainer');
  const teamCards = document.querySelectorAll('.team-card-saas, [data-tilt]');
  const rippleTriggers = document.querySelectorAll('.ripple-trigger');
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  /* --------------------------------------------------------------------------
     1. Sticky Navbar & Mobile Navigation
     -------------------------------------------------------------------------- */
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
    hamburger.addEventListener('click', () => {
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
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (hamburger) {
          const icon = hamburger.querySelector('i');
          if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     2. Hero Section Mouse Spotlight Effect
     -------------------------------------------------------------------------- */
  if (heroSection && mouseSpotlight) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseSpotlight.style.setProperty('--mouse-x', `${x}px`);
      mouseSpotlight.style.setProperty('--mouse-y', `${y}px`);
    });
  }

  /* --------------------------------------------------------------------------
     3. Character Counter for Message Textarea
     -------------------------------------------------------------------------- */
  if (messageText && charCounter) {
    messageText.addEventListener('input', () => {
      const currentLength = messageText.value.length;
      charCounter.textContent = `${currentLength} / 500`;
      if (currentLength >= 480) {
        charCounter.style.color = '#EF4444';
      } else {
        charCounter.style.color = '#94A3B8';
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Floating Particles Generator (Team Section)
     -------------------------------------------------------------------------- */
  if (particleContainer) {
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';

      const size = Math.random() * 4 + 2; // 2px - 6px
      const left = Math.random() * 100;   // 0% - 100%
      const top = Math.random() * 100;    // 0% - 100%
      const delay = Math.random() * 8;    // 0s - 8s
      const duration = Math.random() * 10 + 8; // 8s - 18s

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;

      particleContainer.appendChild(particle);
    }
  }

  /* --------------------------------------------------------------------------
     5. 3D Tilt Parallax & Mouse Light Spotlight Tracking
     -------------------------------------------------------------------------- */
  teamCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--card-mouse-x', `${x}px`);
      card.style.setProperty('--card-mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7; // Max tilt 7 deg
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* --------------------------------------------------------------------------
     6. Button Ripple Effect & Smooth Scroll
     -------------------------------------------------------------------------- */
  rippleTriggers.forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

      const contactFormSection = document.getElementById('contact-form-section');
      if (contactFormSection) {
        contactFormSection.scrollIntoView({ behavior: 'smooth' });

        if (inquiryType) {
          inquiryType.value = 'Contribution / Feedback';
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     7. Form Validation & EmailJS Submission Handler
     -------------------------------------------------------------------------- */
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setError(inputElement, groupElement) {
    if (groupElement) groupElement.classList.add('error');
  }

  function clearError(groupElement) {
    if (groupElement) groupElement.classList.remove('error');
  }

  if (contactForm) {
    // Real-time error clearance
    [fullName, emailAddress, inquiryType, messageText].forEach(field => {
      if (field) {
        field.addEventListener('input', () => {
          const group = field.closest('.input-group');
          if (group) clearError(group);
        });
        if (field.tagName === 'SELECT') {
          field.addEventListener('change', () => {
            const group = field.closest('.input-group');
            if (group) clearError(group);
          });
        }
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Name Validation
      const nameGroup = fullName ? fullName.closest('.input-group') : null;
      if (!fullName || !fullName.value.trim()) {
        setError(fullName, nameGroup);
        isValid = false;
      } else {
        clearError(nameGroup);
      }

      // Email Validation
      const emailGroup = emailAddress ? emailAddress.closest('.input-group') : null;
      if (!emailAddress || !emailAddress.value.trim() || !validateEmail(emailAddress.value.trim())) {
        setError(emailAddress, emailGroup);
        isValid = false;
      } else {
        clearError(emailGroup);
      }

      // Category Validation
      const categoryGroup = inquiryType ? inquiryType.closest('.input-group') : null;
      if (!inquiryType || !inquiryType.value) {
        setError(inquiryType, categoryGroup);
        isValid = false;
      } else {
        clearError(categoryGroup);
      }

      // Message Validation
      const messageGroup = messageText ? messageText.closest('.input-group') : null;
      if (!messageText || !messageText.value.trim() || messageText.value.trim().length < 10) {
        setError(messageText, messageGroup);
        isValid = false;
      } else {
        clearError(messageGroup);
      }

      if (!isValid) return;

      // Loading State
      const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
      const btnIcon = submitBtn ? submitBtn.querySelector('.btn-icon') : null;

      if (btnText) btnText.textContent = 'Sending...';
      if (btnIcon) btnIcon.classList.add('hidden');
      if (btnSpinner) btnSpinner.classList.remove('hidden');
      if (submitBtn) submitBtn.disabled = true;

      // EmailJS Send Handler
      if (typeof emailjs !== 'undefined') {
      emailjs.sendForm(
  'service_noz6nel',
  'template_j5a6b19',
  contactForm
)
        .then(() => {
          // Success State
          if (btnText) btnText.textContent = 'Message Sent';
          if (btnSpinner) btnSpinner.classList.add('hidden');
          if (btnIcon) {
            btnIcon.classList.replace('fa-paper-plane', 'fa-check');
            btnIcon.classList.remove('hidden');
          }

          if (successAlert) {
            successAlert.classList.remove('hidden');
          }

          contactForm.reset();
          if (charCounter) charCounter.textContent = '0 / 500';

          setTimeout(() => {
            if (btnText) btnText.textContent = 'Send Message';
            if (btnIcon) btnIcon.classList.replace('fa-check', 'fa-paper-plane');
            if (submitBtn) submitBtn.disabled = false;
          }, 4000);
        })
        .catch((error) => {

  console.error('FORSKO EmailJS Error:', error);

  alert(
    'EmailJS Error:\n\n' +
    'Status: ' + error.status +
    '\nMessage: ' + error.text
  );

  btnText.textContent = 'Failed to Send';
  btnSpinner.classList.add('hidden');

  btnIcon.classList.replace(
    'fa-paper-plane',
    'fa-exclamation'
  );

  btnIcon.classList.remove('hidden');

  submitBtn.disabled = false;

  setTimeout(() => {

    btnText.textContent = 'Send Message';

    btnIcon.classList.replace(
      'fa-exclamation',
      'fa-paper-plane'
    );

  }, 3000);

});
      } else {
        // Fallback if EmailJS SDK is missing
        console.warn('EmailJS SDK not detected on page.');
        setTimeout(() => {
          if (btnText) btnText.textContent = 'Message Sent';
          if (btnSpinner) btnSpinner.classList.add('hidden');
          if (btnIcon) {
            btnIcon.classList.replace('fa-paper-plane', 'fa-check');
            btnIcon.classList.remove('hidden');
          }
          if (successAlert) successAlert.classList.remove('hidden');
          contactForm.reset();
          if (charCounter) charCounter.textContent = '0 / 500';

          setTimeout(() => {
            if (btnText) btnText.textContent = 'Send Message';
            if (btnIcon) btnIcon.classList.replace('fa-check', 'fa-paper-plane');
            if (submitBtn) submitBtn.disabled = false;
          }, 4000);
        }, 1200);
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. Copy Email to Clipboard Action
     -------------------------------------------------------------------------- */
  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      const emailToCopy = emailText.textContent.trim();

      navigator.clipboard.writeText(emailToCopy).then(() => {
        const btnSpan = copyEmailBtn.querySelector('span');
        const btnIcon = copyEmailBtn.querySelector('i');
        const originalText = btnSpan ? btnSpan.textContent : 'Copy Email';

        if (btnSpan) btnSpan.textContent = 'Copied!';
        if (btnIcon) btnIcon.classList.replace('fa-copy', 'fa-check');

        copyEmailBtn.style.backgroundColor = 'var(--emerald-green)';
        copyEmailBtn.style.borderColor = 'var(--emerald-green)';

        setTimeout(() => {
          if (btnSpan) btnSpan.textContent = originalText;
          if (btnIcon) btnIcon.classList.replace('fa-check', 'fa-copy');
          copyEmailBtn.style.backgroundColor = '';
          copyEmailBtn.style.borderColor = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  /* --------------------------------------------------------------------------
     9. Scroll Reveal Animation Observer
     -------------------------------------------------------------------------- */
  if (revealElements.length > 0) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

});