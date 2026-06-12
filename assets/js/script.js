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

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
