/**
 * Forsko Platform - Universal JavaScript Module
 * Handles Navigation Drawer, Counter Animations, Typewriter Input, & Live Dropdown Search
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Search Database Source
     -------------------------------------------------------------------------- */
  const searchData = [
    // Syllabus
    {
      title: "B.Sc. Computer Science Syllabus",
      category: "Syllabus",
      description: "Official SGBAU B.Sc. Computer Science curriculum year-wise.",
      keywords: ["syllabus", "curriculum", "sgbau", "bsc cs", "course", "subjects"],
      icon: "fa-solid fa-book-bookmark",
      url: "syllabus.html"
    },
    {
      title: "Fundamentals of Computer Syllabus",
      category: "Syllabus",
      description: "Official Semester I syllabus for Fundamentals of Computer.",
      keywords: ["fundamentals", "computer", "semester 1", "foc", "hardware", "software"],
      icon: "fa-solid fa-desktop",
      url: "syllabus.html"
    },
    {
      title: "Programming with C Syllabus",
      category: "Syllabus",
      description: "Official Semester II syllabus for Programming with C.",
      keywords: ["c programming", "c language", "semester 2", "syllabus", "pointers", "arrays"],
      icon: "fa-solid fa-laptop-code",
      url: "syllabus.html"
    },
    // Notes
    {
      title: "B.Sc. CS Notes Portal",
      category: "Notes",
      description: "Download chapter-wise revision notes for B.Sc. Computer Science.",
      keywords: ["notes", "study material", "revision", "handwritten notes", "pdf notes"],
      icon: "fa-solid fa-file-lines",
      url: "notes.html"
    },
    {
      title: "Fundamentals of Computer Notes",
      category: "Notes",
      description: "Semester I notes covering hardware, software, OS, memory & logic gates.",
      keywords: ["foc notes", "computer basics notes", "os notes", "number system"],
      icon: "fa-solid fa-desktop",
      url: "notes.html"
    },
    {
      title: "Programming with C Notes",
      category: "Notes",
      description: "Semester II notes covering loops, functions, arrays, pointers, structures & files.",
      keywords: ["c notes", "c programming notes", "pointers notes", "functions notes"],
      icon: "fa-solid fa-code",
      url: "notes.html"
    },
    // PYQs
    {
      title: "Previous Year Question Papers (PYQs)",
      category: "PYQs",
      description: "Access semester-wise SGBAU university exam papers for all years.",
      keywords: ["pyq", "previous year papers", "old question papers", "sgbau papers", "exam papers"],
      icon: "fa-solid fa-clock-rotate-left",
      url: "pyqs.html"
    },
    // Question Bank
    {
      title: "B.Sc. CS Question Bank",
      category: "Question Bank",
      description: "Unit-wise long questions, short notes, and important exam question sets.",
      keywords: ["question bank", "important questions", "exam questions", "expected questions"],
      icon: "fa-solid fa-database",
      url: "question-bank.html"
    },
    // Paper Pattern
    {
      title: "Official SGBAU Paper Pattern",
      category: "Paper Pattern",
      description: "University paper pattern format and semester-wise sample papers.",
      keywords: ["paper pattern", "exam format", "marking scheme", "blueprint", "sample papers"],
      icon: "fa-solid fa-chart-pie",
      url: "paper-patterns.html"
    },
    // Practicals
    {
      title: "Laboratory on Programming with C",
      category: "Practicals",
      description: "Practical executable C programs, viva questions, and output logs.",
      keywords: ["c lab", "c practicals", "c programs", "c viva questions"],
      icon: "fa-solid fa-code",
      url: "semester1.html"
    },
    // Resources
    {
      title: "GOEC 1: Information Communication Technology",
      category: "Resources",
      description: "Semester I Generic Open Elective Course - ICT concepts & digital communication.",
      keywords: ["goec 1", "ict resources", "elective course", "digital communication"],
      icon: "fa-solid fa-tower-cell",
      url: "semester2.html"
    }
  ];

  /* --------------------------------------------------------------------------
     2. Navbar & Responsive Drawer
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
    }
  });

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
     3. Animated Stat Counters
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsSection = document.querySelector('.stats-section');
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
     4. Typewriter Placeholder Animation
     -------------------------------------------------------------------------- */
  const searchInput = document.getElementById('searchInput');
  const searchCard = document.querySelector('.search-card');

  if (searchInput) {
    const phrases = [
      "Search Data Structure Notes...",
      "Search Computer Fundamentals Syllabus...",
      "Search Programming with C...",
      "Search Semester I PYQs...",
      "Search Question Bank..."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isFocused = false;
    let loopTimeout = null;

    function typeEffect() {
      if (isFocused) return;

      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      searchInput.placeholder = currentPhrase.substring(0, charIndex);

      let delay = isDeleting ? 30 : 60;

      if (!isDeleting && charIndex === currentPhrase.length) {
        delay = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 300;
      }

      loopTimeout = setTimeout(typeEffect, delay);
    }

    searchInput.addEventListener('focus', () => {
      isFocused = true;
      clearTimeout(loopTimeout);
      searchInput.placeholder = "Search syllabus, notes, PYQs, practical codes...";
    });

    searchInput.addEventListener('blur', () => {
      if (searchInput.value.trim() === '') {
        isFocused = false;
        isDeleting = false;
        charIndex = 0;
        typeEffect();
      }
    });

    typeEffect();
  }

  /* --------------------------------------------------------------------------
     5. Live Global Search Dropdown Engine
     -------------------------------------------------------------------------- */
  const searchBtn = document.getElementById('searchBtn');

  if (searchInput && searchCard) {
    let selectedIndex = -1;
    let currentResults = [];

    // Create dropdown element
    const dropdown = document.createElement('div');
    dropdown.id = 'searchDropdown';
    dropdown.className = 'search-dropdown hidden';
    searchCard.parentNode.appendChild(dropdown);

    function getBadgeClass(cat) {
      switch (cat) {
        case 'Syllabus': return 'badge-syllabus';
        case 'Notes': return 'badge-notes';
        case 'PYQs': return 'badge-pyqs';
        case 'Question Bank': return 'badge-question-bank';
        case 'Paper Pattern': return 'badge-paper-pattern';
        case 'Practicals': return 'badge-practicals';
        case 'Resources': return 'badge-resources';
        default: return 'badge-syllabus';
      }
    }

    function highlightText(text, query) {
      if (!query) return text;
      const reg = new RegExp(`(${query})`, 'gi');
      return text.replace(reg, '<mark class="search-highlight">$1</mark>');
    }

    function closeDropdown() {
      dropdown.classList.add('hidden');
      dropdown.innerHTML = '';
      selectedIndex = -1;
    }

    function renderResults(results, query) {
      dropdown.innerHTML = '';
      selectedIndex = -1;

      if (results.length === 0) {
        dropdown.innerHTML = `
          <div class="search-empty-state">
            <i class="fa-solid fa-magnifying-glass-minus search-empty-icon"></i>
            <div class="search-empty-title">No results found</div>
            <p>Try searching for "C", "Notes", "PYQs", or "Syllabus".</p>
          </div>
        `;
        dropdown.classList.remove('hidden');
        return;
      }

      results.forEach((item, idx) => {
        const card = document.createElement('a');
        card.href = item.url;
        card.className = 'search-item';
        card.setAttribute('data-index', idx);

        card.innerHTML = `
          <div class="search-item-icon">
            <i class="${item.icon}"></i>
          </div>
          <div class="search-item-content">
            <div class="search-item-header">
              <h4 class="search-item-title">${highlightText(item.title, query)}</h4>
              <span class="category-badge ${getBadgeClass(item.category)}">${item.category}</span>
            </div>
            <p class="search-item-desc">${highlightText(item.description, query)}</p>
          </div>
          <i class="fa-solid fa-arrow-right search-item-arrow"></i>
        `;

        card.addEventListener('mouseenter', () => setSelection(idx));
        dropdown.appendChild(card);
      });

      dropdown.classList.remove('hidden');
    }

    function executeSearch() {
      const query = searchInput.value.trim().toLowerCase();

      if (query.length === 0) {
        closeDropdown();
        return;
      }

      currentResults = searchData.filter(item => {
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchKeywords = item.keywords.some(kw => kw.toLowerCase().includes(query));
        return matchTitle || matchDesc || matchKeywords;
      });

      renderResults(currentResults, query);
    }

    function setSelection(idx) {
      const items = dropdown.querySelectorAll('.search-item');
      if (items.length === 0) return;

      if (selectedIndex >= 0 && items[selectedIndex]) {
        items[selectedIndex].classList.remove('is-selected');
      }

      selectedIndex = idx;

      if (selectedIndex >= 0 && items[selectedIndex]) {
        items[selectedIndex].classList.add('is-selected');
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
      }
    }

    // Input Events
    searchInput.addEventListener('input', executeSearch);
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length > 0) executeSearch();
    });

    // Keyboard Navigation
    searchInput.addEventListener('keydown', (e) => {
      const items = dropdown.querySelectorAll('.search-item');
      if (dropdown.classList.contains('hidden') || items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelection(selectedIndex < items.length - 1 ? selectedIndex + 1 : 0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelection(selectedIndex > 0 ? selectedIndex - 1 : items.length - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && currentResults[selectedIndex]) {
          window.location.href = currentResults[selectedIndex].url;
        } else if (currentResults.length > 0) {
          window.location.href = currentResults[0].url;
        }
      } else if (e.key === 'Escape') {
        closeDropdown();
        searchInput.blur();
      }
    });

    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentResults.length > 0) {
          window.location.href = currentResults[0].url;
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (!searchCard.parentNode.contains(e.target)) {
        closeDropdown();
      }
    });
  }

});