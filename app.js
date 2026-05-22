document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // Configuration
  // ==========================================================================
  const LATER_MINUTES = 30; // Configure the delay for "Später"
  const LATER_MS = LATER_MINUTES * 60 * 1000;

  // ==========================================================================
  // State Initialization
  // ==========================================================================
  const STORAGE_KEY_LEGACY = 'eb_learned_questions';
  const STORAGE_KEY_PROGRESS = 'eb_progress';
  const THEME_KEY = 'eb_theme';
  
  let progress = {}; // { [index]: { state: 'gelernt' | 'later', timestamp?: number } }
  let searchQuery = '';
  let activeFilter = 'bereit'; // 'bereit', 'later', 'learned'
  let cards = [];

  // Load progress from LocalStorage
  const loadProgress = () => {
    try {
      const storedProgress = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (storedProgress) {
        progress = JSON.parse(storedProgress);
      } else {
        // Migrate from legacy format
        const legacy = localStorage.getItem(STORAGE_KEY_LEGACY);
        if (legacy) {
          const arr = JSON.parse(legacy);
          arr.forEach(id => {
            progress[id] = { state: 'gelernt' };
          });
          saveProgress();
        }
      }
    } catch (e) {
      console.error("Error loading progress:", e);
      progress = {};
    }
  };

  const saveProgress = () => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error("Error saving progress:", e);
    }
  };

  const getCardState = (index) => {
    const data = progress[index];
    if (!data) return 'bereit';
    if (data.state === 'gelernt') return 'gelernt';
    if (data.state === 'later') {
      if (Date.now() - data.timestamp > LATER_MS) {
        progress[index] = { state: 'bereit', readyAt: Date.now() };
        saveProgress();
        return 'bereit';
      }
      return 'later';
    }
    if (data.state === 'bereit') return 'bereit';
    return 'bereit';
  };

  // ==========================================================================
  // DOM Elements
  // ==========================================================================
  const gridContainer = document.getElementById('questions-grid');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const noResultsDiv = document.getElementById('no-results');
  
  // Stats
  const statTotalVal = document.getElementById('stat-total');
  const statLearnedVal = document.getElementById('stat-learned');
  const statBereitVal = document.getElementById('stat-bereit');
  const progressPercentText = document.getElementById('progress-percentage');
  const progressFillBar = document.getElementById('progress-fill');
  
  // Badges
  const badgeBereit = document.getElementById('badge-bereit');
  const badgeLater = document.getElementById('badge-later');
  const badgeLearned = document.getElementById('badge-learned');
  
  // Reset Modal
  const resetSection = document.querySelector('.reset-section');
  const resetBtn = document.getElementById('reset-all');
  const resetModal = document.getElementById('reset-modal');
  const modalCancel = document.getElementById('modal-cancel');
  const modalConfirm = document.getElementById('modal-confirm');
  const controlsSection = document.getElementById('controls');

  // ==========================================================================
  // Theme Toggle Logic
  // ==========================================================================
  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const theme = savedTheme || 'dark';
    setTheme(theme);
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = '';
    } else {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = 'var(--accent-gold)';
    }
  };

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // ==========================================================================
  // Statistics and Badge Updates
  // ==========================================================================
  const updateStats = () => {
    const totalCount = QUESTIONS_DATA.length;
    let bereitCount = 0;
    let laterCount = 0;
    let learnedCount = 0;

    for (let i = 0; i < totalCount; i++) {
      const state = getCardState(i);
      if (state === 'bereit') bereitCount++;
      else if (state === 'later') laterCount++;
      else if (state === 'gelernt') learnedCount++;
    }

    const percentage = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

    statTotalVal.textContent = totalCount;
    statLearnedVal.textContent = learnedCount;
    statBereitVal.textContent = bereitCount;
    
    progressPercentText.textContent = `${percentage}%`;
    progressFillBar.style.width = `${percentage}%`;

    badgeBereit.textContent = bereitCount;
    badgeLater.textContent = laterCount;
    badgeLearned.textContent = learnedCount;
  };

  // ==========================================================================
  // Card Creation & Filtering Logic
  // ==========================================================================
  const createCardElement = (item, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.setAttribute('data-index', index);

    card.innerHTML = `
      <div class="card-header">
        <span class="question-number">Frage ${index + 1}</span>
        <div class="learned-status">
          <i class="fa-solid fa-chevron-down card-chevron"></i>
        </div>
      </div>
      <div class="card-body">
        <p class="question-text">${item.q}</p>
      </div>
      <div class="card-answer-wrapper">
        <div class="card-answer-inner">
          <div class="card-answer-content">
            <div class="answer-label">Antwort:</div>
            <p class="answer-text">${item.a}</p>
          </div>
          <div class="card-footer">
            <button class="btn-footer btn-later" aria-label="Frage später wiederholen">
              <i class="fa-solid fa-clock"></i> Später wiederholen
            </button>
            <button class="btn-footer btn-learn" aria-label="Frage als gelernt markieren">
              <i class="fa-solid fa-check"></i> Als gelernt markieren
            </button>
          </div>
        </div>
      </div>
    `;

    const header = card.querySelector('.card-header');
    const body = card.querySelector('.card-body');
    const answerWrapper = card.querySelector('.card-answer-wrapper');
    const btnLater = card.querySelector('.btn-later');
    const btnLearn = card.querySelector('.btn-learn');

    const toggleAnswer = (e) => {
      const isExpanded = card.classList.contains('expanded-card');
      
      if (!isExpanded) {
        // Close all currently open cards before expanding this one
        document.querySelectorAll('.expanded-card').forEach(openCard => {
          openCard.classList.remove('expanded-card');
          const openWrapper = openCard.querySelector('.card-answer-wrapper');
          if (openWrapper) openWrapper.classList.remove('expanded');
        });
      }

      if (isExpanded) {
        card.classList.remove('expanded-card');
        answerWrapper.classList.remove('expanded');
      } else {
        card.classList.add('expanded-card');
        answerWrapper.classList.add('expanded');
      }
    };

    header.addEventListener('click', toggleAnswer);
    body.addEventListener('click', toggleAnswer);

    btnLater.addEventListener('click', (e) => {
      e.stopPropagation();
      progress[index] = { state: 'later', timestamp: Date.now() };
      saveProgress();
      updateStats();
      card.classList.remove('expanded-card');
      answerWrapper.classList.remove('expanded');
      applyFilters();
    });

    btnLearn.addEventListener('click', (e) => {
      e.stopPropagation();
      progress[index] = { state: 'gelernt' };
      saveProgress();
      updateStats();
      card.classList.remove('expanded-card');
      answerWrapper.classList.remove('expanded');
      applyFilters();
    });

    return card;
  };

  const buildQuestionsGrid = () => {
    gridContainer.innerHTML = '';
    cards = [];

    QUESTIONS_DATA.forEach((item, index) => {
      const card = createCardElement(item, index);
      gridContainer.appendChild(card);
      
      cards.push({
        index: index,
        domElement: card,
        qText: item.q.toLowerCase(),
        aText: item.a.toLowerCase()
      });
    });

    applyFilters();
  };

  const applyFilters = () => {
    let visibleCount = 0;

    cards.forEach(card => {
      const state = getCardState(card.index);
      
      // Check Filter Tab
      let matchesFilter = false;
      if (activeFilter === 'bereit' && state === 'bereit') {
        matchesFilter = true;
      } else if (activeFilter === 'later' && state === 'later') {
        matchesFilter = true;
      } else if (activeFilter === 'learned' && state === 'gelernt') {
        matchesFilter = true;
      }

      // Check Search Query
      let matchesSearch = false;
      if (!searchQuery) {
        matchesSearch = true;
      } else {
        matchesSearch = card.qText.includes(searchQuery) || card.aText.includes(searchQuery);
      }

      // Action buttons visibility
      if (activeFilter === 'later' || activeFilter === 'learned') {
        card.domElement.classList.add('hide-actions');
      } else {
        card.domElement.classList.remove('hide-actions');
      }

      // Update card status indicator and order
      const statusDiv = card.domElement.querySelector('.learned-status');
      const data = progress[card.index];

      if (state === 'gelernt') {
        statusDiv.innerHTML = `
          <span class="learned-badge"><i class="fa-solid fa-circle-check"></i> Gelernt</span>
          <button class="btn-revert" data-index="${card.index}" title="Zurücksetzen">
            <i class="fa-solid fa-xmark"></i> Zurücksetzen 
          </button>
        `;
        card.domElement.style.order = card.index;
      } else if (state === 'later') {
        const remainingMs = Math.max(0, LATER_MS - (Date.now() - data.timestamp));
        const mins = String(Math.floor(remainingMs / 60000)).padStart(2, '0');
        const secs = String(Math.floor((remainingMs % 60000) / 1000)).padStart(2, '0');
        statusDiv.innerHTML = `
          <span class="learned-badge" style="color: var(--accent-gold); background-color: rgba(255, 204, 0, 0.1);"><i class="fa-solid fa-clock"></i> Bereit in ${mins}:${secs}</span>
          <button class="btn-revert" data-index="${card.index}" title="Zurücksetzen">
            <i class="fa-solid fa-xmark"></i> Zurücksetzen 
          </button>
        `;
        card.domElement.style.order = card.index;
      } else {
        statusDiv.innerHTML = '<i class="fa-solid fa-chevron-down card-chevron"></i>';
        if (data && data.state === 'bereit' && data.readyAt) {
          card.domElement.style.order = 10000 + Math.floor(data.readyAt / 1000) - 1700000000;
        } else {
          card.domElement.style.order = card.index;
        }
      }

      // Toggle Visibility
      if (matchesFilter && matchesSearch) {
        card.domElement.style.display = 'block';
        visibleCount++;
      } else {
        card.domElement.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      const emptyTextP = noResultsDiv.querySelector('p');
      if (searchQuery) {
        emptyTextP.textContent = "Keine Fragen gefunden, die deiner Suche entsprechen.";
      } else if (activeFilter === 'bereit') {
        emptyTextP.textContent = "Du hast derzeit keine offenen Fragen. Schau später wieder vorbei oder setze die Übungsdaten zurück!";
      } else if (activeFilter === 'later') {
        emptyTextP.textContent = "Du hast momentan keine Fragen auf später verschoben.";
      } else if (activeFilter === 'learned') {
        emptyTextP.textContent = "Du hast noch keine Fragen als gelernt markiert.";
      }
      noResultsDiv.style.display = 'block';
    } else {
      noResultsDiv.style.display = 'none';
    }

    // Only show reset section when in 'bereit' tab
    if (activeFilter === 'bereit') {
      resetSection.style.display = 'block';
    } else {
      resetSection.style.display = 'none';
    }
  };

  // ==========================================================================
  // Event Listeners for Filters & Search
  // ==========================================================================
  
  gridContainer.addEventListener('click', (e) => {
    const revertBtn = e.target.closest('.btn-revert');
    if (revertBtn) {
      e.stopPropagation(); // prevent card expansion
      const idx = revertBtn.getAttribute('data-index');
      progress[idx] = { state: 'bereit', readyAt: Date.now() };
      saveProgress();
      updateStats();
      applyFilters();
    }
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    if (searchQuery) {
      clearSearchBtn.style.display = 'flex';
    } else {
      clearSearchBtn.style.display = 'none';
    }
    applyFilters();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    searchInput.focus();
    applyFilters();
  });

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.getAttribute('data-filter');
      applyFilters();
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      controlsSection.classList.add('scrolled');
    } else {
      controlsSection.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // Reset Logic
  // ==========================================================================
  const showResetModal = () => {
    resetModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeResetModal = () => {
    resetModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  resetBtn.addEventListener('click', showResetModal);
  modalCancel.addEventListener('click', closeResetModal);
  
  resetModal.addEventListener('click', (e) => {
    if (e.target === resetModal) {
      closeResetModal();
    }
  });

  modalConfirm.addEventListener('click', () => {
    progress = {};
    saveProgress();
    updateStats();
    closeResetModal();
    buildQuestionsGrid();
  });

  // ==========================================================================
  // Startup
  // ==========================================================================
  initTheme();
  loadProgress();
  updateStats();
  buildQuestionsGrid();

  // Periodically re-evaluate "later" state and update countdowns
  setInterval(() => {
    // Only re-apply if we are in "bereit" or "later" tabs where time matters
    if (activeFilter === 'bereit' || activeFilter === 'later') {
      updateStats();
      applyFilters();
    }
  }, 1000); // check every second
});
