/* =========================================================
   Nazish — Portfolio scripts
   ---------------------------------------------------------
   EDIT YOUR LINKS HERE — every GitHub / LinkedIn / Email
   button on the site reads from this one object.
   ========================================================= */
const CONFIG = {
  github: "https://github.com/MS-Nazish",
  linkedin: "https://www.linkedin.com/in/nazish-khan-dev",
  email: "infotech8nz@gmail.com",
  // Free form backend (FormSubmit) so messages arrive in your inbox without a mail app.
  // The first message sends an activation email to this address — click "Activate Form" once.
  // Leave empty to fall back to opening the visitor's email app.
  formEndpoint: "https://formsubmit.co/ajax/infotech8nz@gmail.com",
};

document.documentElement.classList.remove("no-js");

/* ---------- Apply links ---------- */
document.querySelectorAll("[data-link]").forEach((el) => {
  const key = el.dataset.link;
  if (key === "email") el.href = `mailto:${CONFIG.email}`;
  else if (CONFIG[key]) el.href = CONFIG[key];
});
document.querySelectorAll('[data-text="email"]').forEach((el) => (el.textContent = CONFIG.email));
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Navbar: scrolled state, progress bar, back-to-top ---------- */
const nav = document.getElementById("nav");
const progress = document.querySelector(".scroll-progress");
const backTop = document.getElementById("backTop");

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  nav.classList.toggle("scrolled", y > 20);
  backTop.classList.toggle("show", y > 600);
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Mobile menu ---------- */
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
function setMenu(open) {
  links.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

/* ---------- Active nav link ---------- */
const navAnchors = [...links.querySelectorAll('a[href^="#"]:not(.btn)')];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
navAnchors.forEach((a) => {
  const section = document.querySelector(a.getAttribute("href"));
  if (section) sectionObserver.observe(section);
});

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  // Stagger siblings in grids for a smoother cascade
  const parent = el.parentElement;
  const index = [...parent.children].filter((c) => c.classList.contains("reveal")).indexOf(el);
  el.style.transitionDelay = `${Math.min(index, 6) * 80}ms`;
  revealObserver.observe(el);
});

/* ---------- Typing effect ---------- */
const roles = ["Full-Stack Developer", "React Native Developer", "AI Developer", "Freelancer"];
const typed = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (typed && !reduceMotion) {
  let r = 0, c = roles[0].length, deleting = true;
  const tick = () => {
    const word = roles[r];
    c += deleting ? -1 : 1;
    typed.textContent = word.slice(0, c);
    let delay = deleting ? 45 : 85;
    if (!deleting && c === word.length) { deleting = true; delay = 1800; }
    else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 2200);
}

/* ---------- Animated counters ---------- */
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const dur = 1400;
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

/* ---------- Skill card spotlight ---------- */
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

/* ---------- Project filters ---------- */
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.toggle("active", b === btn));
    const f = btn.dataset.filter;
    projects.forEach((p) => {
      const show = f === "all" || p.dataset.cat.split(" ").includes(f);
      p.classList.toggle("hide", !show);
      if (show) p.classList.add("visible");
    });
  })
);

/* ---------- Contact form ---------- */
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fields = [...form.querySelectorAll("[required]")];
  let valid = true;
  fields.forEach((f) => {
    const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
    f.classList.toggle("invalid", bad);
    if (bad) valid = false;
  });
  if (!valid) {
    statusEl.className = "form-status err";
    statusEl.textContent = "Please fill in your name, a valid email and a message.";
    return;
  }

  const data = Object.fromEntries(new FormData(form));

  if (CONFIG.formEndpoint) {
    statusEl.className = "form-status";
    statusEl.textContent = "Sending…";
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `Portfolio: ${data.subject || "New message"} — from ${data.name}`,
          _template: "table",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error(json.message);
      form.reset();
      statusEl.className = "form-status ok";
      statusEl.textContent = "Thanks! Your message has been sent — I'll reply within 24 hours.";
    } catch (err) {
      statusEl.className = "form-status err";
      statusEl.textContent = `Sorry, the message couldn't be sent. Please email me directly at ${CONFIG.email}.`;
      if (err.message) console.warn("Contact form:", err.message);
    }
    return;
  }

  const subject = encodeURIComponent(data.subject || `Project inquiry from ${data.name}`);
  const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
  window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  statusEl.className = "form-status ok";
  statusEl.textContent = "Opening your email app…";
});

/* ---------- Particle network background ---------- */
(function particles() {
  const canvas = document.getElementById("particles");
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext("2d");
  let w, h, dots, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    const count = Math.min(Math.floor((innerWidth * innerHeight) / 18000), 80);
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * dpr,
      vy: (Math.random() - 0.5) * 0.25 * dpr,
      r: (Math.random() * 1.4 + 0.4) * dpr,
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    const link = 130 * dpr;
    for (let i = 0; i < dots.length; i++) {
      const a = dots[i];
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;
      ctx.fillStyle = "rgba(167,139,250,0.55)";
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      for (let j = i + 1; j < dots.length; j++) {
        const b = dots[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < link) {
          ctx.strokeStyle = `rgba(129,140,248,${0.14 * (1 - d / link)})`;
          ctx.lineWidth = dpr * 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(frame);
})();
