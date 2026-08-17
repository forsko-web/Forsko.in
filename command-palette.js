/**
 * Forsko - VS Code Style Command Palette Component
 * Shortcut: Ctrl + K (or Cmd + K on Mac)
 * Pure JavaScript - Self-contained CSS Injection & Keyboard Navigation
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Comprehensive Search Database (All 7 Categories)
  // ==========================================================================
  const commandDatabase = [
    // Syllabus
    { title: "B.Sc. Computer Science Syllabus", category: "Syllabus", desc: "Official SGBAU curriculum & unit breakdown", icon: "fa-solid fa-book-bookmark", url: "syllabus.html", badgeClass: "badge-syllabus" },
    { title: "Fundamentals of Computer Syllabus", category: "Syllabus", desc: "Semester I Hardware, Software & OS syllabus", icon: "fa-solid fa-desktop", url: "syllabus.html", badgeClass: "badge-syllabus" },
    { title: "Programming with C Syllabus", category: "Syllabus", desc: "Semester II C language & pointer syllabus", icon: "fa-solid fa-laptop-code", url: "syllabus.html", badgeClass: "badge-syllabus" },

    // Notes
    { title: "Programming with C Notes", category: "Notes", desc: "Handwritten Unit 1 to 4 notes with diagrams", icon: "fa-solid fa-file-lines", url: "notes.html", badgeClass: "badge-notes" },
    { title: "Fundamentals of Computer Notes", category: "Notes", desc: "Logic gates, memory units & OS notes", icon: "fa-solid fa-file-code", url: "notes.html", badgeClass: "badge-notes" },
    { title: "Data Structures Notes", category: "Notes", desc: "Arrays, Linked Lists, Stacks & Queues notes", icon: "fa-solid fa-layer-group", url: "notes.html", badgeClass: "badge-notes" },

    // PYQs
    { title: "Semester I Question Papers (PYQs)", category: "PYQs", desc: "SGBAU past papers (2022–2025)", icon: "fa-solid fa-clock-rotate-left", url: "pyqs.html", badgeClass: "badge-pyqs" },
    { title: "Semester II Question Papers (PYQs)", category: "PYQs", desc: "SGBAU past papers (2022–2025)", icon: "fa-solid fa-file-invoice", url: "pyqs.html", badgeClass: "badge-pyqs" },

    // Question Bank
    { title: "B.Sc. CS Unit-Wise Question Bank", category: "Question Bank", desc: "Important 5-mark and 10-mark long questions", icon: "fa-solid fa-database", url: "question-bank.html", badgeClass: "badge-qb" },
    { title: "C Programming Expected Exam Questions", category: "Question Bank", desc: "Code output predicting & viva questions", icon: "fa-solid fa-list-check", url: "question-bank.html", badgeClass: "badge-qb" },

    // Paper Pattern
    { title: "Official SGBAU Paper Pattern", category: "Paper Pattern", desc: "Examination marking schemes & blueprints", icon: "fa-solid fa-chart-pie", url: "paper-patterns.html", badgeClass: "badge-pattern" },
    { title: "Model Sample Question Papers", category: "Paper Pattern", desc: "University-style practice sample papers", icon: "fa-solid fa-file-contract", url: "paper-patterns.html", badgeClass: "badge-pattern" },

    // Practicals
    { title: "Laboratory on Programming with C", category: "Practicals", desc: "Executable C lab codes & viva prep", icon: "fa-solid fa-terminal", url: "semester1.html", badgeClass: "badge-practicals" },
    { title: "Office Automation Tools Lab Manual", category: "Practicals", desc: "MS Word, Excel formulas & PowerPoint labs", icon: "fa-solid fa-file-pen", url: "semester1.html", badgeClass: "badge-practicals" },
    { title: "Web Publishing Practicals", category: "Practicals", desc: "HTML, CSS layouts & website creation code", icon: "fa-solid fa-code", url: "semester2.html", badgeClass: "badge-practicals" },

    // Resources
    { title: "GOEC 1: Information Communication Tech", category: "Resources", desc: "Elective course ICT & digital basics", icon: "fa-solid fa-tower-cell", url: "semester1.html", badgeClass: "badge-resources" },
    { title: "GOEC 2: Business Data Processing", category: "Resources", desc: "Elective course BDP & office computing", icon: "fa-solid fa-cubes", url: "semester2.html", badgeClass: "badge-resources" },
    { title: "Generative AI Tools & Study Guides", category: "Resources", desc: "AI tools & prompt engineering guides", icon: "fa-solid fa-robot", url: "genai.html", badgeClass: "badge-resources" }
  ];

  // Component State
  let isOpen = false;
  let selectedIndex = 0;
  let filteredCommands = [];

  // ==========================================================================
  // 2. Dynamic Glassmorphism CSS Injection
  // ==========================================================================
  function injectStyles() {
    if (document.getElementById('cmd-palette-styles')) return;

    const style = document.createElement('style');
    style.id = 'cmd-palette-styles';
    style.textContent = `
      /* Command Palette Backdrop */
      .cmd-overlay {
        position: fixed;
        inset: 0;
        background: rgba(11, 17, 32, 0.78);
        -webkit-backdrop-filter: blur(12px);
        backdrop-filter: blur(12px);
        z-index: 999999;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 80px 16px 20px 16px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .cmd-overlay.cmd-active {
        opacity: 1;
        pointer-events: auto;
      }

      /* Modal Window */
      .cmd-modal {
        width: 100%;
        max-width: 640px;
        background: rgba(30, 41, 59, 0.88);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 18px;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.65), 0 0 35px rgba(59, 130, 246, 0.3);
        overflow: hidden;
        transform: translateY(-16px) scale(0.96);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
      }

      .cmd-overlay.cmd-active .cmd-modal {
        transform: translateY(0) scale(1);
      }

      /* Search Header Input */
      .cmd-header {
        display: flex;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        gap: 14px;
        position: relative;
      }

      .cmd-search-icon {
        color: #3B82F6;
        font-size: 1.25rem;
      }

      .cmd-input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: #FFFFFF;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 1.05rem;
        font-weight: 500;
      }

      .cmd-input::placeholder {
        color: #94A3B8;
      }

      .cmd-kbd-badge {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #94A3B8;
        font-family: monospace;
        font-size: 0.75rem;
        padding: 3px 8px;
        border-radius: 6px;
        user-select: none;
      }

      /* Results List Box */
      .cmd-results {
        max-height: 380px;
        overflow-y: auto;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .cmd-results::-webkit-scrollbar {
        width: 6px;
      }
      .cmd-results::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.18);
        border-radius: 6px;
      }

      /* Single Command Item */
      .cmd-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 14px;
        background: rgba(15, 23, 42, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        color: #FFFFFF;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .cmd-item-left {
        display: flex;
        align-items: center;
        gap: 14px;
        min-width: 0;
      }

      .cmd-item-icon {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: rgba(59, 130, 246, 0.15);
        color: #3B82F6;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.05rem;
        flex-shrink: 0;
        transition: all 0.15s ease;
      }

      .cmd-item-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .cmd-item-title {
        font-size: 0.95rem;
        font-weight: 600;
        color: #FFFFFF;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .cmd-item-desc {
        font-size: 0.8rem;
        color: #94A3B8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Highlighted Selection */
      .cmd-item.cmd-selected,
      .cmd-item:hover {
        background: rgba(59, 130, 246, 0.22);
        border-color: rgba(59, 130, 246, 0.5);
        transform: translateX(4px);
      }

      .cmd-item.cmd-selected .cmd-item-icon,
      .cmd-item:hover .cmd-item-icon {
        background: #3B82F6;
        color: #FFFFFF;
      }

      /* Category Badges */
      .cmd-badge {
        font-size: 0.7rem;
        font-weight: 700;
        padding: 3px 9px;
        border-radius: 10px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        flex-shrink: 0;
      }

      .badge-syllabus   { background: rgba(59, 130, 246, 0.18); color: #60A5FA; border: 1px solid rgba(59, 130, 246, 0.35); }
      .badge-notes      { background: rgba(16, 185, 129, 0.18); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.35); }
      .badge-pyqs       { background: rgba(249, 115, 22, 0.18); color: #FB923C; border: 1px solid rgba(249, 115, 22, 0.35); }
      .badge-qb         { background: rgba(139, 92, 246, 0.18); color: #C084FC; border: 1px solid rgba(139, 92, 246, 0.35); }
      .badge-pattern    { background: rgba(239, 68, 68, 0.18); color: #F87171; border: 1px solid rgba(239, 68, 68, 0.35); }
      .badge-practicals { background: rgba(20, 184, 166, 0.18); color: #2DD4BF; border: 1px solid rgba(20, 184, 166, 0.35); }
      .badge-resources  { background: rgba(148, 163, 184, 0.18); color: #CBD5E1; border: 1px solid rgba(148, 163, 184, 0.35); }

      /* Empty State */
      .cmd-empty {
        text-align: center;
        padding: 36px 16px;
        color: #94A3B8;
        font-size: 0.9rem;
      }

      /* Footer Hints Bar */
      .cmd-footer {
        padding: 10px 20px;
        background: rgba(15, 23, 42, 0.6);
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.78rem;
        color: #94A3B8;
      }

      .cmd-footer-hints {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .cmd-footer-hints span {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .cmd-footer kbd {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #CBD5E1;
        padding: 1px 5px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 0.7rem;
      }

      /* Responsive Adjustments */
      @media (max-width: 640px) {
        .cmd-overlay {
          padding-top: 20px;
        }
        .cmd-kbd-badge {
          display: none;
        }
        .cmd-footer-hints {
          font-size: 0.72rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================================================
  // 3. Create DOM Elements dynamically
  // ==========================================================================
  let overlayEl, modalEl, inputEl, resultsEl;

  function createDOM() {
    if (document.getElementById('cmdPaletteOverlay')) return;

    overlayEl = document.createElement('div');
    overlayEl.id = 'cmdPaletteOverlay';
    overlayEl.className = 'cmd-overlay';
    overlayEl.setAttribute('role', 'dialog');
    overlayEl.setAttribute('aria-modal', 'true');

    overlayEl.innerHTML = `
      <div class="cmd-modal" id="cmdPaletteModal">
        <div class="cmd-header">
          <i class="fa-solid fa-magnifying-glass cmd-search-icon"></i>
          <input type="text" id="cmdInput" class="cmd-input" placeholder="Type a command or search everything..." autocomplete="off" spellcheck="false">
          <span class="cmd-kbd-badge">ESC</span>
        </div>
        <div class="cmd-results" id="cmdResults" role="listbox"></div>
        <div class="cmd-footer">
          <div class="cmd-footer-hints">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Open</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
          <div>Forsko Command Palette</div>
        </div>
      </div>
    `;

    document.body.appendChild(overlayEl);

    modalEl = document.getElementById('cmdPaletteModal');
    inputEl = document.getElementById('cmdInput');
    resultsEl = document.getElementById('cmdResults');

    // Event Handlers
    inputEl.addEventListener('input', handleFilter);
    overlayEl.addEventListener('click', (e) => {
      if (e.target === overlayEl) closePalette();
    });
  }

  // ==========================================================================
  // 4. Render Commands & Selected Item Management
  // ==========================================================================
  function renderResults() {
    resultsEl.innerHTML = '';

    if (filteredCommands.length === 0) {
      resultsEl.innerHTML = `
        <div class="cmd-empty">
          <i class="fa-solid fa-magnifying-glass-minus" style="font-size: 1.8rem; margin-bottom: 8px; color: #64748B;"></i>
          <div>No matching commands or pages found</div>
        </div>
      `;
      return;
    }

    filteredCommands.forEach((cmd, idx) => {
      const itemEl = document.createElement('a');
      itemEl.href = cmd.url;
      itemEl.className = `cmd-item ${idx === selectedIndex ? 'cmd-selected' : ''}`;
      itemEl.setAttribute('role', 'option');
      itemEl.setAttribute('data-index', idx);

      itemEl.innerHTML = `
        <div class="cmd-item-left">
          <div class="cmd-item-icon">
            <i class="${cmd.icon}"></i>
          </div>
          <div class="cmd-item-text">
            <span class="cmd-item-title">${cmd.title}</span>
            <span class="cmd-item-desc">${cmd.desc}</span>
          </div>
        </div>
        <span class="cmd-badge ${cmd.badgeClass}">${cmd.category}</span>
      `;

      itemEl.addEventListener('mouseenter', () => {
        setSelectedIndex(idx);
      });

      itemEl.addEventListener('click', (e) => {
        closePalette();
      });

      resultsEl.appendChild(itemEl);
    });

    scrollToSelected();
  }

  function setSelectedIndex(idx) {
    const items = resultsEl.querySelectorAll('.cmd-item');
    if (items.length === 0) return;

    if (selectedIndex >= 0 && items[selectedIndex]) {
      items[selectedIndex].classList.remove('cmd-selected');
    }

    selectedIndex = idx;

    if (selectedIndex >= 0 && items[selectedIndex]) {
      items[selectedIndex].classList.add('cmd-selected');
      scrollToSelected();
    }
  }

  function scrollToSelected() {
    const selectedEl = resultsEl.querySelector('.cmd-item.cmd-selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  // ==========================================================================
  // 5. Filter Logic
  // ==========================================================================
  function handleFilter() {
    const query = inputEl.value.trim().toLowerCase();

    if (!query) {
      filteredCommands = [...commandDatabase];
    } else {
      filteredCommands = commandDatabase.filter(cmd => {
        const matchTitle = cmd.title.toLowerCase().includes(query);
        const matchDesc = cmd.desc.toLowerCase().includes(query);
        const matchCat = cmd.category.toLowerCase().includes(query);
        return matchTitle || matchDesc || matchCat;
      });
    }

    selectedIndex = 0;
    renderResults();
  }

  // ==========================================================================
  // 6. Open / Close Controls
  // ==========================================================================
  function openPalette() {
    if (isOpen) return;

    injectStyles();
    createDOM();

    isOpen = true;
    overlayEl.classList.add('cmd-active');
    document.body.style.overflow = 'hidden';

    inputEl.value = '';
    handleFilter();

    setTimeout(() => {
      inputEl.focus();
    }, 50);
  }

  function closePalette() {
    if (!isOpen) return;

    isOpen = false;
    overlayEl.classList.remove('cmd-active');
    document.body.style.overflow = '';
    inputEl.blur();
  }

  function togglePalette() {
    if (isOpen) {
      closePalette();
    } else {
      openPalette();
    }
  }

  // ==========================================================================
  // 7. Keyboard Navigation (Ctrl + K, Up/Down, Enter, ESC)
  // ==========================================================================
  document.addEventListener('keydown', (e) => {
    // Shortcut Trigger: Ctrl + K or Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      togglePalette();
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (filteredCommands.length > 0) {
          setSelectedIndex((selectedIndex + 1) % filteredCommands.length);
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (filteredCommands.length > 0) {
          setSelectedIndex((selectedIndex - 1 + filteredCommands.length) % filteredCommands.length);
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (filteredCommands.length > 0 && filteredCommands[selectedIndex]) {
          const targetUrl = filteredCommands[selectedIndex].url;
          closePalette();
          window.location.href = targetUrl;
        }
        break;

      case 'Escape':
        e.preventDefault();
        closePalette();
        break;
    }
  });

  // Expose global controller API if needed
  window.ForskoCommandPalette = {
    open: openPalette,
    close: closePalette,
    toggle: togglePalette
  };

})();