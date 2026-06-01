(function () {
  const D = window.portfolioData;

  /* ── LOADING SCREEN ── */
  const loaderBar = document.getElementById("loader-bar");
  const loaderStatus = document.getElementById("loader-status");
  const loadingScreen = document.getElementById("loading-screen");
  const msgs = ["Loading modules...", "Compiling data...", "Rendering UI...", "System ready."];
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress > 100) progress = 100;
    loaderBar.style.width = progress + "%";
    const idx = Math.min(Math.floor((progress / 100) * msgs.length), msgs.length - 1);
    loaderStatus.textContent = msgs[idx];
    if (progress >= 100) {
      clearInterval(loadInterval);
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        document.body.style.overflow = "auto";
        initScrollAnimations();
      }, 600);
    }
  }, 180);
  document.body.style.overflow = "hidden";

  /* ── CUSTOM CURSOR ── */
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
  (function moveCursor() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(moveCursor);
  })();
  document.querySelectorAll("a, button, .project-card, .timeline-item, .hex-item, .achieve-card").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  });

  /* ── NAVBAR ── */
  document.getElementById("nav-logo").textContent = D.name.split(" ")[0].toUpperCase();
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
  /* scroll highlight */
  const sections = document.querySelectorAll(".section");
  const navLinkEls = document.querySelectorAll(".nav-link");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinkEls.forEach((l) => {
      l.classList.toggle("active", l.dataset.section === current);
    });
  });

  /* ── HERO ── */
  const heroName = document.getElementById("hero-name");
  heroName.textContent = D.name;
  heroName.dataset.text = D.name;
  document.getElementById("avatar-img").src = D.avatar || "";
  const cvBtn = document.getElementById("cta-cv");
  if (D.cvFile) { cvBtn.href = D.cvFile; cvBtn.setAttribute("download", D.cvFile); }
  else { cvBtn.style.display = "none"; }

  /* Typewriter */
  const twEl = document.getElementById("typewriter");
  let twIdx = 0, twChar = 0, twDeleting = false;
  function typewrite() {
    const word = D.titles[twIdx];
    if (!twDeleting) {
      twEl.textContent = word.substring(0, ++twChar);
      if (twChar === word.length) { twDeleting = true; setTimeout(typewrite, 1800); return; }
      setTimeout(typewrite, 80);
    } else {
      twEl.textContent = word.substring(0, --twChar);
      if (twChar === 0) { twDeleting = false; twIdx = (twIdx + 1) % D.titles.length; setTimeout(typewrite, 400); return; }
      setTimeout(typewrite, 40);
    }
  }
  typewrite();

  /* 3D background handled by background.js */


  /* ── RENDER ABOUT ── */
  function renderAbout() {
    document.getElementById("about-text").innerHTML = `<p>${D.summary}</p>`;
    const bars = [
      { name: "Python", pct: 95 }, { name: "BI Tools", pct: 95 },
      { name: "Data Visualization", pct: 95 }, { name: "ReactJS / FastAPI", pct: 85 }, { name: "Machine Learning", pct: 80 }, { name: "SQL & Databases", pct: 75 }
    
    ];
    const barsHtml = bars.map((b) =>
      `<div class="skill-bar-item fade-up"><div class="skill-bar-label"><span>${b.name}</span><span>${b.pct}%</span></div><div class="skill-bar-track"><div class="skill-bar-fill" data-pct="${b.pct}"></div></div></div>`
    ).join("");
    document.getElementById("about-bars").innerHTML = barsHtml;
  }
  renderAbout();

  /* ── RENDER SKILLS ── */
  function renderSkills() {
    const catConfig = {
      languages:          { label: "Languages",               color: "var(--blue)" },
      librariesFrameworks:{ label: "Libraries & Frameworks",   color: "var(--violet)" },
      tools:              { label: "Tools",                   color: "#00ffaa" },
      platforms:          { label: "Platforms",               color: "#ff6b6b" },
      soft:               { label: "Soft Skills",             color: "var(--gold)" },
    };
    let html = "";
    for (const [cat, skills] of Object.entries(D.skills)) {
      const cfg = catConfig[cat] || { label: cat, color: "var(--blue)" };
      const pillsHtml = skills.map(s =>
        `<div class="skill-card tilt-el" style="--cat-color:${cfg.color}">${s}</div>`
      ).join("");
      html += `<div class="skill-category fade-up">
        <div class="skill-cat-header" style="--cat-color:${cfg.color}">
          <span class="skill-cat-dot"></span>
          <span class="skill-cat-label">${cfg.label}</span>
        </div>
        <div class="skill-cards-row">${pillsHtml}</div>
      </div>`;
    }
    document.getElementById("hex-grid").innerHTML = html;
  }
  renderSkills();

  /* ── RENDER EXPERIENCE ── */
  function renderExperience() {
    let html = "";
    D.experience.forEach((exp) => {
      const bulletsHtml = exp.bullets.map((b) => `<li>${b}</li>`).join("");
      let imagesHtml = "";
      if (exp.images && exp.images.length > 0) {
        imagesHtml = exp.images.map((src) => `<img src="${src}" alt="Screenshot" />`).join("");
      }
      html += `<div class="timeline-item fade-up" data-id="${exp.id}">
        <div class="timeline-dot"></div>
        <div class="timeline-period">${exp.period}</div>
        <h3 class="timeline-role">${exp.role}</h3>
        <div class="timeline-company">${exp.company}</div>
        <span class="timeline-type">${exp.type}</span>
        <div class="timeline-bullets"><ul>${bulletsHtml}</ul>${imagesHtml ? `<div class="timeline-images">${imagesHtml}</div>` : ""}</div>
        <div class="timeline-expand">CLICK TO EXPAND ▾</div>
      </div>`;
    });
    document.getElementById("experience-timeline").innerHTML = html;
    document.querySelectorAll(".timeline-item").forEach((item) => {
      item.addEventListener("click", () => item.classList.toggle("expanded"));
    });
  }
  renderExperience();

  /* ── RENDER PROJECTS ── */
  function renderProjects() {
    let html = "";
    D.projects.forEach((p) => {
      const techHtml = p.tech.map((t) => `<span class="tech-pill">${t}</span>`).join("");
      html += `<div class="project-card fade-up" data-id="${p.id}">
        <div class="project-card-period">${p.period}</div>
        <h3 class="project-card-title">${p.title}</h3>
        <div class="project-card-subtitle">${p.subtitle}</div>
        <div class="project-card-tech">${techHtml}</div>
        <p class="project-card-desc">${p.description}</p>
        <div class="project-card-footer"><span class="view-details">VIEW DETAILS →</span></div>
      </div>`;
    });
    document.getElementById("projects-grid").innerHTML = html;
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", () => openModal(card.dataset.id));
    });
  }
  renderProjects();

  /* ── PROJECT MODAL ── */
  const modalOverlay = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");
  document.getElementById("modal-close").addEventListener("click", () => modalOverlay.classList.remove("active"));
  modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove("active"); });

  function openModal(id) {
    const p = D.projects.find((pr) => pr.id === id);
    if (!p) return;
    const statsHtml = (p.stats || []).map((s) => `<div class="stat-badge">${s}</div>`).join("");
    const techHtml = (p.tech || []).map((t) => `<span class="tech-pill">${t}</span>`).join("");
    let galleryHtml = "";
    if (p.images && p.images.length > 0) {
      galleryHtml = `<div class="modal-gallery">${p.images.map((src) => `<img src="${src}" alt="Project screenshot" />`).join("")}</div>`;
    }
    const ghBtn = p.github ? `<a href="${p.github}" target="_blank" class="modal-github">⬡ GitHub Repository</a>` : "";
    modalContent.innerHTML = `
      <h2 class="modal-title">${p.title}</h2>
      <div class="modal-subtitle">${p.subtitle}</div>
      <div class="modal-period">${p.period}</div>
      <p class="modal-desc">${p.description}</p>
      <div class="modal-stats">${statsHtml}</div>
      <div class="modal-tech">${techHtml}</div>
      ${galleryHtml}${ghBtn}`;
    modalOverlay.classList.add("active");
  }

  /* ── RENDER ACHIEVEMENTS ── */
  function renderAchievements() {
    const iconMap = { trophy: "🏆", medal: "🥉", certificate: "📜" };
    let html = "";
    D.achievements.forEach((a) => {
      html += `<div class="achieve-card fade-up">
        <div class="achieve-particles"></div>
        <div class="achieve-icon">${iconMap[a.icon] || "⭐"}</div>
        <h3 class="achieve-title">${a.title}</h3>
        <div class="achieve-org">${a.org}</div>
      </div>`;
    });
    document.getElementById("achievements-grid").innerHTML = html;
    /* gold particle burst */
    document.querySelectorAll(".achieve-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const container = card.querySelector(".achieve-particles");
        for (let i = 0; i < 20; i++) {
          const p = document.createElement("span");
          p.style.cssText = `position:absolute;width:4px;height:4px;background:#ffd700;border-radius:50%;left:50%;top:50%;pointer-events:none;opacity:1;`;
          const angle = Math.random() * Math.PI * 2;
          const dist = 40 + Math.random() * 60;
          const tx = Math.cos(angle) * dist, ty = Math.sin(angle) * dist;
          p.animate([
            { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
          ], { duration: 700 + Math.random() * 300, easing: "ease-out" });
          container.appendChild(p);
          setTimeout(() => p.remove(), 1000);
        }
      });
    });
  }
  renderAchievements();

  /* ── RENDER EDUCATION ── */
  function renderEducation() {
    let html = "";
    D.education.forEach((e) => {
      html += `<div class="timeline-item fade-up">
        <div class="timeline-dot"></div>
        <div class="timeline-period">${e.period}</div>
        <h3 class="timeline-role">${e.degree}</h3>
        <div class="timeline-company">${e.institution}</div>
        ${e.grade ? `<div class="edu-grade">${e.grade}</div>` : ""}
        <div class="edu-location">${e.location}</div>
      </div>`;
    });
    document.getElementById("education-timeline").innerHTML = html;
  }
  renderEducation();

  /* ── RENDER CONTACT ── */
  function renderContact() {
    document.getElementById("contact-panel").innerHTML = `
      <div class="contact-info">
        <a href="mailto:${D.email}" class="contact-item"><div class="contact-item-icon">✉</div><div><div class="contact-item-label">Email</div><div class="contact-item-value">${D.email}</div></div></a>
        <a href="tel:${D.phone}" class="contact-item"><div class="contact-item-icon">☎</div><div><div class="contact-item-label">Phone</div><div class="contact-item-value">${D.phone}</div></div></a>
        <a href="${D.linkedin}" target="_blank" class="contact-item"><div class="contact-item-icon">in</div><div><div class="contact-item-label">LinkedIn</div><div class="contact-item-value">Hamza Saif</div></div></a>
        <a href="${D.github}" target="_blank" class="contact-item"><div class="contact-item-icon">⬡</div><div><div class="contact-item-label">GitHub</div><div class="contact-item-value">hamzasaif19</div></div></a>
      </div>
      <form class="contact-form" id="contact-form">
        <div class="form-group"><input type="text" placeholder="YOUR NAME" required /></div>
        <div class="form-group"><input type="email" placeholder="YOUR EMAIL" required /></div>
        <div class="form-group"><textarea placeholder="YOUR MESSAGE" required></textarea></div>
        <div class="form-submit"><button type="submit" class="btn btn-primary">TRANSMIT MESSAGE</button></div>
      </form>
      <div class="sent-overlay" id="sent-overlay"><div class="sent-text">✦ MESSAGE SENT ✦</div><p style="color:var(--text2);letter-spacing:2px;font-size:.85rem">Transmission successful</p></div>`;
    document.getElementById("contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const overlay = document.getElementById("sent-overlay");
      overlay.classList.add("active");
      setTimeout(() => { overlay.classList.remove("active"); e.target.reset(); }, 3000);
    });
  }
  renderContact();

  /* ── FOOTER ── */
  document.getElementById("footer-text").textContent = `© ${new Date().getFullYear()} ${D.name} — All Rights Reserved`;

  /* ── SCROLL ANIMATIONS ── */
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); } });
    }, { threshold: 0.15 });
    document.querySelectorAll(".fade-up").forEach((el, i) => {
      el.style.transitionDelay = `${(i % 8) * 0.08}s`;
      observer.observe(el);
    });
    /* skill bars */
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.style.width = e.target.dataset.pct + "%"; }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll(".skill-bar-fill").forEach((b) => barObserver.observe(b));
    /* GSAP section titles */
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray(".section-title").forEach((t) => {
        gsap.from(t, { scrollTrigger: { trigger: t, start: "top 85%" }, y: 40, opacity: 0, duration: 1, ease: "power3.out" });
      });
    }
  }

  /* ── GLOBAL 3D TILT ── */
  function initTilt() {
    // All selectors that should tilt
    const els = document.querySelectorAll(
      ".project-card, .timeline-item, .achieve-card, .contact-item, .about-text, .about-bars, .skill-card"
    );

    const MAX_TILT  = 20;    // rotation degrees
    const LERP      = 0.10;  // easing smoothness

    els.forEach((card) => {
      // inject sheen layer if not already present
      if (!card.querySelector(".card-sheen")) {
        const sheen = document.createElement("div");
        sheen.className = "card-sheen";
        card.appendChild(sheen);
      }
      const sheen = card.querySelector(".card-sheen");

      let tX = 0, tY = 0, cX = 0, cY = 0;
      let pX = 50, pY = 50;   // sheen position %
      let active = false, raf = null;

      function tick() {
        cX += (tX - cX) * LERP;
        cY += (tY - cY) * LERP;
        card.style.transform =
          `perspective(900px) rotateY(${cX}deg) rotateX(${cY}deg) scale3d(1.025,1.025,1.025)`;
        sheen.style.background =
          `radial-gradient(circle at ${pX}% ${pY}%, rgba(255,255,255,0.10) 0%, transparent 65%)`;

        const settling = Math.abs(tX - cX) > 0.05 || Math.abs(tY - cY) > 0.05;
        if (active || settling) {
          raf = requestAnimationFrame(tick);
        } else {
          card.style.transform = "";
          sheen.style.background = "transparent";
          raf = null;
        }
      }

      card.addEventListener("mousemove", (e) => {
        const r   = card.getBoundingClientRect();
        const nx  = (e.clientX - r.left) / r.width;   // 0’1
        const ny  = (e.clientY - r.top)  / r.height;  // 0’1
        tX  = (nx - 0.5) * MAX_TILT * 2;
        tY  = (ny - 0.5) * -MAX_TILT * 2;
        pX  = nx * 100;
        pY  = ny * 100;
        if (!raf) { active = true; tick(); }
      });

      card.addEventListener("mouseleave", () => {
        active = false;
        tX = 0; tY = 0;
        pX = 50; pY = 50;
        if (!raf) tick();   // ease back to zero
      });
    });
  }

  /* ── RE-BIND CURSOR HOVERS + TILT (dynamic elements) ── */
  // Run tilt early so cards are interactive as soon as loading screen clears
  setTimeout(initTilt, 200);

  setTimeout(() => {
    document.querySelectorAll("a, button, .project-card, .timeline-item, .skill-card, .achieve-card").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
    initTilt(); // re-run to catch any late-rendered elements
  }, 3500);
})();
