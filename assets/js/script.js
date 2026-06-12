/* =========================================================
   ClaudeTools — Interactions
   Mobile nav · scroll reveal · tabs · FAQ · typing demo
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
      navToggle.textContent = mainNav.classList.contains("open") ? "✕" : "☰";
    });
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.textContent = "☰";
      });
    });
  }

  /* ---------- Active nav link by filename ---------- */
  (function highlightNav() {
    const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".main-nav a").forEach(function (a) {
      const target = (a.getAttribute("href") || "").toLowerCase();
      if (target === here || (here === "" && target === "index.html")) {
        a.classList.add("active");
      }
    });
  })();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Tabs ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    const btns = group.querySelectorAll(".tab-btn");
    const panels = group.querySelectorAll(".tab-panel");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-tab");
        btns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        panels.forEach(function (p) {
          p.classList.toggle("active", p.getAttribute("data-panel") === id);
        });
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");
      // close siblings within the same .faq container
      const parent = item.closest(".faq");
      if (parent) {
        parent.querySelectorAll(".faq-item.open").forEach(function (other) {
          if (other !== item) {
            other.classList.remove("open");
            const oa = other.querySelector(".faq-a");
            if (oa) oa.style.maxHeight = null;
          }
        });
      }
      item.classList.toggle("open", !isOpen);
      a.style.maxHeight = isOpen ? null : a.scrollHeight + "px";
    });
  });

  /* ---------- Typing chat demo (home hero) ---------- */
  const typeTarget = document.getElementById("typeTarget");
  if (typeTarget) {
    const phrases = JSON.parse(typeTarget.getAttribute("data-phrases") || "[]");
    let pi = 0, ci = 0, deleting = false;
    function tick() {
      const full = phrases[pi] || "";
      if (!deleting) {
        ci++;
        typeTarget.textContent = full.slice(0, ci);
        if (ci === full.length) {
          deleting = true;
          return setTimeout(tick, 1700);
        }
      } else {
        ci--;
        typeTarget.textContent = full.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 28 : 46);
    }
    setTimeout(tick, 600);
  }

  /* ---------- Actualités (news page) ---------- */
  const newsGrid = document.getElementById("newsGrid");
  if (newsGrid) {
    const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
    function frDate(iso) {
      if (!iso || iso.indexOf("-") === -1) return iso || "";
      const p = iso.split("-").map(Number);
      return p[2] + " " + (MONTHS[p[1] - 1] || "") + " " + p[0];
    }
    function esc(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    // Tag → theme color (matches the rest of the site)
    const TAG_STYLE = {
      "Modèle":      "background:#fbf0ea;color:#c15f3c;",
      "Produit":     "background:#fbf0ea;color:#c15f3c;",
      "Code":        "background:#e3eadb;color:#57663f;",
      "Cowork":      "background:#efe4d6;color:#8a6033;",
      "Connecteurs": "background:#e2ecf3;color:#3f5d75;",
      "Skills":      "background:#ece4f3;color:#6b4f87;",
      "Entreprise":  "background:#f0eee6;color:#6b6a63;"
    };
    const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

    const data = Array.isArray(window.CLAUDE_NEWS) ? window.CLAUDE_NEWS.slice() : [];
    data.sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });

    if (!data.length) {
      newsGrid.outerHTML = '<p class="news-empty">Aucune actualité pour le moment. Le fichier <code>assets/data/news.js</code> sera bientôt mis à jour.</p>';
    } else {
      newsGrid.innerHTML = data.map(function (n) {
        const tagStyle = TAG_STYLE[n.tag] || "";
        const link = n.url
          ? '<a class="card-link" href="' + esc(n.url) + '" target="_blank" rel="noopener">Lire la suite ' + arrow + '</a>'
          : "";
        return '' +
          '<article class="news-card">' +
            '<div class="news-top">' +
              '<span class="news-tag" style="' + tagStyle + '">' + esc(n.tag || "Actu") + '</span>' +
              '<span class="news-date">' + esc(frDate(n.date)) + '</span>' +
            '</div>' +
            '<h3>' + esc(n.title) + '</h3>' +
            '<p>' + esc(n.summary) + '</p>' +
            link +
          '</article>';
      }).join("");
    }

    const updatedEl = document.getElementById("newsUpdated");
    if (updatedEl && window.CLAUDE_NEWS_UPDATED) {
      updatedEl.textContent = frDate(window.CLAUDE_NEWS_UPDATED);
    }
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
