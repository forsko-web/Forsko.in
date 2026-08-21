/**
 * Forsko - Supreme "Last Level" Cinematic Splash Screen Engine (5.8s)
 * Features:
 * - 5.8 Second Cinematic Timeline
 * - 3D Mouse Parallax Depth Tilt
 * - Supernova Particle Explosion on Logo Click (Easter Egg)
 * - Constellation Nodes & Code Stream Engine (Canvas Physics)
 * - Native Web Audio API 5-Note Ascending Chord Synthesizer
 * - Live Cyber Terminal Log & Color Shift Engine
 * - Lens Flare Light Burst Exit Reveal
 */

(function () {
  'use strict';

  const SESSION_KEY = 'forskoIntroShown';
  const START_DELAY = 1200;    // Time when progress starts
  const TOTAL_DURATION = 5400; // Counter reaches 100% at 5.4s
  const FADE_OUT_DELAY = 5800; // Exact 5.8-Second Exit Trigger
  const REMOVE_DELAY = 6500;   // DOM Removal

  let soundEnabled = false;
  let audioCtx = null;
  let particles = [];
  let supernovaParticles = [];

  function initSplashScreen() {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    let splashElement = document.getElementById('forskoSplashScreen');

    if (alreadyShown === 'true') {
      if (splashElement) {
        splashElement.style.display = 'none';
        splashElement.remove();
      }
      return;
    }

    // Auto-inject HTML if missing
    if (!splashElement) {
      splashElement = document.createElement('div');
      splashElement.id = 'forskoSplashScreen';
      splashElement.className = 'forsko-splash-screen';
      splashElement.setAttribute('aria-hidden', 'false');

      const logoSrc = window.FORSKO_LOGO_PATH || 'forsko-logo.png';

      splashElement.innerHTML = `
        <canvas id="splashCanvas" class="splash-canvas"></canvas>
        <div class="splash-ambient-mesh"></div>
        <div class="splash-hex-grid"></div>
        <div class="splash-lens-flare" id="splashLensFlare"></div>
        <div class="splash-top-bar">
          <div class="splash-greeting-wrapper">
          </div>
          <div class="splash-top-right">
            </button>
            <button type="button" class="splash-skip-btn" id="splashSkipBtn">
              <span>Skip Intro</span>
              <i class="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>
        <div class="forsko-splash-content" id="splashTiltContent">
          <div class="forsko-splash-logo-container" id="splashLogoClickTarget" title="Click for Particle Supernova!">
            <div class="splash-energy-beam"></div>
            <div class="splash-hex-shield"></div>
            <div class="splash-ring ring-outer"></div>
            <div class="splash-ring ring-middle"></div>
            <div class="splash-ring ring-inner"></div>
            <div class="forsko-splash-glow" id="splashDynamicGlow"></div>
            <img src="${logoSrc}" alt="Forsko Logo" class="forsko-splash-logo" id="forskoSplashLogo" onerror="this.src='FORSKO2.png'">
          </div>
          <h1 class="forsko-splash-title" aria-label="FORSKO">
            <span class="splash-letter" style="--i:1">F</span>
            <span class="splash-letter" style="--i:2">O</span>
            <span class="splash-letter" style="--i:3">R</span>
            <span class="splash-letter" style="--i:4">S</span>
            <span class="splash-letter" style="--i:5">K</span>
            <span class="splash-letter" style="--i:6">O</span>
          </h1>
          <p class="forsko-splash-subtitle">Your Personal Academic Companion</p>
          <div class="splash-terminal-line">
            <span class="terminal-prompt">&gt;</span>
            <span class="splash-status-text" id="splashStatusText">forsko --init</span>
            <span class="terminal-cursor">_</span>
          </div>
          <div class="splash-status-wrapper">
            <span class="splash-module-tag" id="splashModuleTag">SYS_BOOT</span>
            <span class="splash-percent-text" id="splashPercentText">0%</span>
          </div>
          <div class="forsko-splash-loader">
            <div class="forsko-splash-progress-bar" id="splashProgressBar">
              <div class="splash-progress-head"></div>
            </div>
          </div>
          <div class="splash-badge-tag">FORSKO • Personal • Academic Portal </div>
        </div>
      `;

      document.body.prepend(splashElement);
    }

    document.body.style.overflow = 'hidden';

    // 1. Time Greeting
    updateTimeGreeting();

    // 2. 3D Mouse Parallax Tilt
    initParallaxTilt();

    // 3. Interactive Canvas Engine
    initCanvasConstellation();

    // 4. Controls & Supernova Click Easter Egg
    setupControls(splashElement);

    // Save Session
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch (e) {}

    // 5. Start Progress Engine
    startProgressEngine();

    // 6. Trigger Exit at 5.8 Seconds
    const exitTimer = setTimeout(() => {
      triggerExit(splashElement);
    }, FADE_OUT_DELAY);

    // Skip Button Handler
    const skipBtn = document.getElementById('splashSkipBtn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        clearTimeout(exitTimer);
        triggerExit(splashElement);
      });
    }
  }

  // 3D Parallax Tilt Effect on Mouse/Gyroscope Move
  function initParallaxTilt() {
    const tiltCard = document.getElementById('splashTiltContent');
    if (!tiltCard) return;

    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      tiltCard.style.transform = `rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg)`;
    });

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null) {
          const tiltX = Math.min(Math.max(e.gamma, -20), 20) / 2;
          const tiltY = Math.min(Math.max(e.beta, -20), 20) / 2;
          tiltCard.style.transform = `rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;
        }
      });
    }
  }

  // Exit Sequence with Lens Flare Burst
  function triggerExit(splashElement) {
    if (!splashElement || splashElement.classList.contains('fade-out')) return;

    const flare = document.getElementById('splashLensFlare');
    if (flare) flare.classList.add('active');

    if (soundEnabled) playChimeSound();

    setTimeout(() => {
      splashElement.classList.add('fade-out');
      splashElement.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      setTimeout(() => {
        if (splashElement && splashElement.parentNode) {
          splashElement.parentNode.removeChild(splashElement);
        }
      }, REMOVE_DELAY - FADE_OUT_DELAY);
    }, 250);
  }

  function updateTimeGreeting() {
    const greetingEl = document.getElementById('splashTimeGreeting');
    if (!greetingEl) return;

    const hour = new Date().getHours();
    if (hour < 12) greetingEl.textContent = "🌅 Good Morning, Computer Science Scholar";
    else if (hour < 17) greetingEl.textContent = "☀️ Good Afternoon, Computer Science Scholar";
    else greetingEl.textContent = "🌙 Good Evening, Computer Science Scholar";
  }

  function setupControls(splashElement) {
    const audioBtn = document.getElementById('splashAudioBtn');
    const audioIcon = document.getElementById('splashAudioIcon');
    const logoTarget = document.getElementById('splashLogoClickTarget');

    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
          audioIcon.className = 'fa-solid fa-volume-high';
          audioBtn.style.background = '#3B82F6';
          playChimeSound();
        } else {
          audioIcon.className = 'fa-solid fa-volume-xmark';
          audioBtn.style.background = '';
        }
      });
    }

    // Logo Click Supernova Easter Egg
    if (logoTarget) {
      logoTarget.addEventListener('click', (e) => {
        triggerSupernova(e.clientX, e.clientY);
      });
    }
  }

  // Supernova Particle Explosion
  function triggerSupernova(cx, cy) {
    const colors = ['#3B82F6', '#60A5FA', '#10B981', '#F59E0B', '#FFFFFF'];
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      supernovaParticles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015,
        size: Math.random() * 4 + 2
      });
    }
  }

  // Web Audio 5-Note Ascending Chord
  function playChimeSound() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const freqs = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
      freqs.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + (index * 0.08));

        gain.gain.setValueAtTime(0.01, audioCtx.currentTime + (index * 0.08));
        gain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + (index * 0.08) + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (index * 0.08) + 1.6);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + (index * 0.08));
        osc.stop(audioCtx.currentTime + (index * 0.08) + 1.7);
      });
    } catch (e) {}
  }

  // Canvas Physics Engine
  function initCanvasConstellation() {
    const canvas = document.getElementById('splashCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }
    });
    window.addEventListener('resize', () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });

    const particleCount = Math.min(Math.floor(width / 20), 55);
    const csTags = ['</>', 'C++', 'SGBAU', '{ }', 'SQL', '0101', 'PYQ', 'RAM', 'B.Sc. CS', 'CPU', 'void()', 'HTML', 'CSS', 'JS', 'API', 'DB', 'OOP', 'Algo', 'DataStr', 'Func()', 'Class', 'Obj', 'Stack', 'Heap', 'Recursion', 'Loop', 'Array', 'Pointer', 'Compile', 'Execute', 'Thread', 'Process', 'Kernel', 'Binary', 'Hex', 'Bitwise', 'Logic', 'Condition', 'Switch', 'Case', 'Break', 'Continue', 'Return', 'Const', 'Var', 'Let', 'Async', 'Await', 'Promise', 'Callback', 'Event', 'DOM', 'Node', 'Element', 'Attribute', 'Selector', 'Style', 'Render', 'Frame', 'Canvas', 'SVG', 'JSON', 'XML', 'YAML', 'Markdown', 'Regex', 'Lambda', 'Closure', 'Scope', 'Context', 'Prototype', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'Interface', 'Module', 'Package', 'Library', 'Framework', 'Version', 'Commit', 'Branch', 'Merge', 'Pull', 'Push', 'Fork', 'Clone', 'Repo', 'Issue', 'Bug', 'Feature', 'Release', 'Deploy', 'DBMS', 'SQL', 'NoSQL', 'ORM', 'Query', 'Index', 'Transaction', 'Lock', 'Deadlock', 'Cache', 'Session', 'Cookie', 'Token', 'Auth', 'OAuth', 'JWT', 'SSL', 'TLS', 'HTTPS', 'HTTP2', 'REST', 'GraphQL', 'Computer', 'Science', 'Scholar', 'Forsko', 'Portal', 'Academic', 'B.Sc.', 'SGBAU', 'Shri Shivaji College'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1.5,
        isTag: i % 4 === 0,
        text: csTags[i % csTags.length]
      });
    }

    function animate() {
      if (!document.getElementById('forskoSplashScreen')) return;

      ctx.clearRect(0, 0, width, height);

      // Render Supernova Explosion Particles
      for (let k = supernovaParticles.length - 1; k >= 0; k--) {
        const sp = supernovaParticles[k];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life -= sp.decay;

        if (sp.life <= 0) {
          supernovaParticles.splice(k, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.life;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Render Constellation Nodes
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (p.isTag) {
          ctx.font = '700 11px monospace';
          ctx.fillStyle = 'rgba(147, 197, 253, 0.45)';
          ctx.fillText(p.text, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(96, 165, 250, 0.7)';
          ctx.fill();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${1 - dist / 120})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        if (mouse.x !== null) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${1 - mdist / mouse.radius})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  // 5.8-Second Progress & Cyber Terminal Engine
  function startProgressEngine() {
    const progressBar = document.getElementById('splashProgressBar');
    const percentText = document.getElementById('splashPercentText');
    const statusText = document.getElementById('splashStatusText');
    const moduleTag = document.getElementById('splashModuleTag');
    const splashScreen = document.getElementById('forskoSplashScreen');

    if (!progressBar || !percentText) return;

    let startTime = null;

    function animateProgress(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < START_DELAY) {
        requestAnimationFrame(animateProgress);
        return;
      }

      const progressElapsed = elapsed - START_DELAY;
      const duration = TOTAL_DURATION - START_DELAY;
      const progress = Math.min(progressElapsed / duration, 1);
      const percentage = Math.floor(progress * 100);

      progressBar.style.width = `${percentage}%`;
      percentText.textContent = `${percentage}%`;

      // Color Shift Engine (Sky Blue -> Electric Cyan -> Emerald Success)
      if (percentage > 85) {
        splashScreen.style.setProperty('--splash-accent', '#10B981');
        splashScreen.style.setProperty('--splash-glow', 'rgba(16, 185, 129, 0.8)');
      } else if (percentage > 45) {
        splashScreen.style.setProperty('--splash-accent', '#38BDF8');
        splashScreen.style.setProperty('--splash-glow', 'rgba(56, 189, 248, 0.8)');
      }

      // Cyber Terminal Status Updates
      if (statusText && moduleTag) {
        if (percentage < 15) {
          statusText.textContent = "forsko --init --team_forsko";
          moduleTag.textContent = "SYS_BOOT";
        }
        else if (percentage < 25) {
          statusText.textContent = "loading_modules: [Forsko Core] [OK]";
          moduleTag.textContent = "LOAD_MODULES";
        }
        else if (percentage < 55) {
          statusText.textContent = "mounting_modules: [Syllabus, Notes, PYQs, Question Banks] [OK]";
          moduleTag.textContent = "LOAD_DATA";
        }
        else if (percentage < 65) {
          statusText.textContent = "mounting_modules: [Forsko Core, PDF Engine, Data] [OK]";
          moduleTag.textContent = "LOAD_FORSKO";
        } else if (percentage < 80) {
          statusText.textContent = "verifying_syllabus: [B.Sc. Computer Science] [OK]";
          moduleTag.textContent = "AUTH_SYLLABUS";
        } else if (percentage < 98) {
          statusText.textContent = "optimizing_cache: 100+ PDFs [OK]";
          moduleTag.textContent = "LOAD_RESOURCES";
        } else {
          statusText.textContent = "SYSTEM READY. Launching Forsko...";
          statusText.style.color = "#10B981";
          moduleTag.textContent = "SUCCESS";
          moduleTag.style.color = "#10B981";
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animateProgress);
      }
    }

    requestAnimationFrame(animateProgress);
  }

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplashScreen);
  } else {
    initSplashScreen();
  }
})();
