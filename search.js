/**
 * Forsko - Universal Global Live Search Logic
 * Features:
 * - Live instant filtering across Syllabus, Notes, PYQs, Question Bank, Paper Pattern, Practicals, Resources
 * - Matching text highlighting
 * - Keyboard navigation (ArrowUp, ArrowDown, Enter, Escape)
 * - ARIA Accessibility & Mobile Responsiveness
 */

document.addEventListener('DOMContentLoaded', () => {

  // Cache DOM Elements
  const container = document.getElementById('navSearchContainer');
  const searchInput = document.getElementById('globalSearchInput');
  const searchResults = document.getElementById('globalSearchResults');
  const clearBtn = document.getElementById('globalSearchClear');

  if (!searchInput || !searchResults) return;

  // Search State
  let currentFilteredData = [];
  let selectedIndex = -1;

  /* --------------------------------------------------------------------------
     1. Helper Utility Functions
     -------------------------------------------------------------------------- */

  // Escapes regex special characters to prevent errors during highlighting
  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Highlights query matching text within a string
  function highlightMatch(text, query) {
    if (!query) return text;
    const escapedQuery = escapeRegExp(query);
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  // Maps category name to CSS badge class
  function getCategoryBadgeClass(category) {
    switch (category) {
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

  /* --------------------------------------------------------------------------
     2. Render Search Results
     -------------------------------------------------------------------------- */

  function renderResults(results, query) {
    searchResults.innerHTML = '';
    selectedIndex = -1;

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-empty-state">
          <i class="fa-solid fa-magnifying-glass-minus search-empty-icon"></i>
          <div class="search-empty-title">No results found</div>
          <div class="search-empty-text">Try another keyword like "Notes", "PYQs", or "C".</div>
        </div>
      `;
      searchResults.classList.remove('hidden');
      searchInput.setAttribute('aria-expanded', 'true');
      return;
    }

    results.forEach((item, index) => {
      const badgeClass = getCategoryBadgeClass(item.category);
      const highlightedTitle = highlightMatch(item.title, query);
      const highlightedDesc = highlightMatch(item.description, query);

      const resultCard = document.createElement('a');
      resultCard.href = item.url;
      resultCard.className = 'search-result-item';
      resultCard.setAttribute('role', 'option');
      resultCard.setAttribute('id', `search-item-${index}`);
      resultCard.setAttribute('data-index', index);

      resultCard.innerHTML = `
        <div class="search-result-icon">
          <i class="${item.icon}"></i>
        </div>
        <div class="search-result-content">
          <div class="search-result-header">
            <h4 class="search-result-title">${highlightedTitle}</h4>
            <span class="category-badge ${badgeClass}">${item.category}</span>
          </div>
          <p class="search-result-desc">${highlightedDesc}</p>
        </div>
        <i class="fa-solid fa-arrow-right search-result-arrow"></i>
      `;

      // Mouse hover index sync
      resultCard.addEventListener('mouseenter', () => {
        setSelectedIndex(index);
      });

      searchResults.appendChild(resultCard);
    });

    searchResults.classList.remove('hidden');
    searchInput.setAttribute('aria-expanded', 'true');
  }

  /* --------------------------------------------------------------------------
     3. Search Filtering Engine
     -------------------------------------------------------------------------- */

  function performSearch() {
    const query = searchInput.value.trim();

    if (query.length === 0) {
      closeDropdown();
      if (clearBtn) clearBtn.classList.add('hidden');
      return;
    }

    if (clearBtn) clearBtn.classList.remove('hidden');

    const lowerQuery = query.toLowerCase();

    // Instant Case-Insensitive Matching
    currentFilteredData = searchData.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(lowerQuery);
      const matchCategory = item.category.toLowerCase().includes(lowerQuery);
      const matchDesc = item.description.toLowerCase().includes(lowerQuery);
      return matchTitle || matchCategory || matchDesc;
    });

    renderResults(currentFilteredData, query);
  }

  function closeDropdown() {
    searchResults.classList.add('hidden');
    searchResults.innerHTML = '';
    searchInput.setAttribute('aria-expanded', 'false');
    selectedIndex = -1;
  }

  /* --------------------------------------------------------------------------
     4. Keyboard Navigation (Up, Down, Enter, Escape)
     -------------------------------------------------------------------------- */

  function setSelectedIndex(newIndex) {
    const items = searchResults.querySelectorAll('.search-result-item');
    if (items.length === 0) return;

    if (selectedIndex >= 0 && items[selectedIndex]) {
      items[selectedIndex].classList.remove('is-selected');
    }

    selectedIndex = newIndex;

    if (selectedIndex >= 0 && items[selectedIndex]) {
      items[selectedIndex].classList.add('is-selected');
      items[selectedIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      searchInput.setAttribute('aria-activedescendant', `search-item-${selectedIndex}`);
    } else {
      searchInput.removeAttribute('aria-activedescendant');
    }
  }

  searchInput.addEventListener('keydown', (e) => {
    const items = searchResults.querySelectorAll('.search-result-item');

    if (searchResults.classList.contains('hidden') || items.length === 0) {
      if (e.key === 'ArrowDown' && searchInput.value.trim().length > 0) {
        performSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (selectedIndex < items.length - 1) {
          setSelectedIndex(selectedIndex + 1);
        } else {
          setSelectedIndex(0); // Loop to start
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        } else {
          setSelectedIndex(items.length - 1); // Loop to end
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          items[selectedIndex].click();
        } else if (items.length > 0) {
          items[0].click(); // Navigate to top result on Enter
        }
        break;

      case 'Escape':
        e.preventDefault();
        closeDropdown();
        searchInput.blur();
        break;
    }
  });

  /* --------------------------------------------------------------------------
     5. Event Listeners (Input, Focus, Clear, Click Outside)
     -------------------------------------------------------------------------- */

  // Input listener for live search
  searchInput.addEventListener('input', performSearch);

  // Focus re-opens search results if query exists
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length > 0) {
      performSearch();
    }
  });

  // Clear button click
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      closeDropdown();
      clearBtn.classList.add('hidden');
      searchInput.focus();
    });
  }

  // Close dropdown when clicking outside search container
  document.addEventListener('click', (e) => {
    if (container && !container.contains(e.target)) {
      closeDropdown();
    }
  });

});
