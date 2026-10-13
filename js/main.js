/* Muhammad Hammad — portfolio interactions (vanilla JS + GSAP + Lenis). Content comes from data.js. */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const root = document.documentElement;
  const SITE = window.SITE, PROJECTS = window.PROJECTS, SKILLS = window.SKILLS;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';
  const hasFlip = hasGsap && typeof window.Flip !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);
  if (hasFlip) gsap.registerPlugin(Flip);
  const animate = hasGsap && !reduced;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const CAT = { frontend: 'Frontend', php: 'PHP + MySQL', dotnet: 'C# / .NET', creative: 'Creative frontend' };
  const pad2 = (n) => String(n).padStart(2, '0');

  /* =========================================================
     Render content from data.js
     ========================================================= */
  const socials = [
    SITE.github && ['GitHub', 'fa-brands fa-github', SITE.github],
    SITE.linkedin && ['LinkedIn', 'fa-brands fa-linkedin-in', SITE.linkedin],
  ].filter(Boolean);
  $$('[data-socials]').forEach((el) => { el.innerHTML = socials.map(([l, i, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${l}"><i class="${i}" aria-hidden="true"></i></a>`).join(''); });
  $$('[data-socials-list]').forEach((el) => { el.innerHTML = socials.map(([l, i, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener"><i class="${i}" aria-hidden="true"></i>${l}</a></li>`).join(''); });
  $$('[data-email-link]').forEach((a) => { a.textContent = SITE.email; a.href = 'mailto:' + SITE.email; });
  $('#copyEmail').textContent = SITE.email;
  $$('[data-phone-link]').forEach((a) => { if (!SITE.phone) { a.remove(); return; } a.href = SITE.phoneHref; a.setAttribute('aria-label', 'Call ' + SITE.phone); $('span', a).textContent = SITE.phone; });
  $('#year').textContent = new Date().getFullYear();
  if (!SITE.available) $('#status').remove();

  function cover(p) {
    return `<div class="cover" style="--c1:${p.colors[0]};--c2:${p.colors[1]}"><i class="cover__grid"></i><i class="cover__orb"></i><span class="cover__tag">${esc(p.stack[0])}</span><span class="cover__name">${esc(p.title)}</span></div>`;
  }
  function preview(p) {
    let view;
    if (p.preview === 'fanhub') {
      view = `<div class="mock mock--fanhub" aria-hidden="true"><div class="mock__nav"><b></b><span></span><span></span><span></span><em></em></div>
        <div class="mock__pills">${['Anime', 'Gaming', 'Movies', 'TV Shows', 'K-Pop', 'Comics', 'Manga', 'Cosplay'].map((c) => `<span>${c}</span>`).join('')}</div>
        <div class="mock__grid">${'<div class="mock__tile"><i></i><span></span><span></span></div>'.repeat(6)}</div></div>`;
    } else if (p.preview === 'pc') {
      view = `<div class="mock mock--pc" aria-hidden="true"><div class="mock__nav"><b></b><span></span><span></span><span></span><em></em></div>
        <div class="mock__banner"><span></span><span></span><i></i></div>
        <div class="mock__products">${'<div class="mock__product"><i></i><span></span><span></span><b></b></div>'.repeat(4)}</div></div>`;
    } else if (p.preview === 'fur') {
      view = `<div class="mock mock--fur" aria-hidden="true"><div class="mock__nav"><b></b><span></span><span></span><span></span><em></em></div>
        <div class="mock__hero"><div><span></span><span></span><span></span><i></i></div><figure><i class="fa-solid fa-paw"></i></figure></div>
        <div class="mock__cards">${'<div><i></i><span></span><span></span></div>'.repeat(3)}</div></div>`;
    } else view = cover(p);
    return `<div class="browser"><div class="browser__bar"><span class="browser__dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="browser__url"><i class="fa-solid fa-lock" aria-hidden="true"></i>${esc(p.host || p.title.toLowerCase().replace(/\s+/g, '-') + '.local')}</span></div><div class="browser__view">${view}</div></div>`;
  }
  const liveBtn = (p, cls = 'btn-x btn-x--ghost') => (p.live ? `<a href="${esc(p.live)}" class="${cls}" target="_blank" rel="noopener">Live project <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : '');

  const featured = PROJECTS.filter((p) => p.featured);
  $('#projectStack').innerHTML = featured.map((p) => `
    <article class="project-card">
      <div class="project-card__inner">
        <div class="project-card__info">
          <p class="project-card__category">${esc(p.label)}</p>
          <h3 class="project-card__title"><button type="button" class="title-btn" data-open="${p.id}">${esc(p.title)}</button></h3>
          <p class="project-card__summary">${esc(p.summary)}</p>
          <ul class="chips">${p.stack.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <div class="project-card__actions">
            <button type="button" class="btn-x btn-x--solid" data-open="${p.id}">Read case study</button>
            ${liveBtn(p)}
          </div>
        </div>
        <button type="button" class="project-card__preview" data-open="${p.id}" data-cursor="view" aria-label="Open ${esc(p.title)} case study">${preview(p)}</button>
      </div>
      <div class="project-card__shade" aria-hidden="true"></div>
    </article>`).join('');

  const rest = PROJECTS.filter((p) => !p.featured);
  $('#archiveGrid').innerHTML = rest.map((p) => `
    <li class="acard" data-cat="${p.cat}">
      <span class="acard__glare" aria-hidden="true"></span>
      <button type="button" class="acard__btn" data-open="${p.id}" data-cursor="view">
        <span class="acard__cover">${cover(p)}</span>
        <span class="acard__body">
          <span class="acard__meta"><span>${esc(p.label)}</span><b>${esc(CAT[p.cat])}</b></span>
          <span class="acard__title" role="heading" aria-level="4">${esc(p.title)}</span>
          <span class="acard__sum">${esc(p.summary)}</span>
        </span>
      </button>
    </li>`).join('');
  $('#archiveCount').textContent = rest.length;

  $('#timeline').insertAdjacentHTML('beforeend', window.TIMELINE.map((t) => `
    <li class="timeline__item">
      <div class="timeline__meta"><span class="timeline__kind">${esc(t.kind)}</span></div>
      <div class="timeline__body">
        <h3>${esc(t.title)} <span>${esc(t.where)}</span></h3>
        <p>${esc(t.text)}</p>
        <ul class="chips chips--quiet">${t.tags.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      </div>
    </li>`).join(''));
  $('#process').innerHTML = window.PROCESS.map((s, i) => `<li><span class="process__num">${i + 1}</span><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></li>`).join('');

  /* =========================================================
     Smooth scroll
     ========================================================= */
  let lenis = null;
  if (animate && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    if (hasST) lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  $$('[data-lenis-prevent], .term__out').forEach((el) => el.setAttribute('data-lenis-prevent', ''));
  const navOffset = () => -(($('.site-nav')?.offsetHeight || 76) - 10);
  function scrollToEl(el) {
    if (lenis) lenis.scrollTo(el, { offset: el.id === 'home' ? 0 : navOffset(), duration: 1.4 });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }

  /* =========================================================
     Text helpers
     ========================================================= */
  $$('[data-chars]').forEach((el) => { el.innerHTML = [...el.textContent].map((c) => (c === ' ' ? '<span class="char char--space"> </span>' : `<span class="char">${esc(c)}</span>`)).join(''); });
  function splitWords(el) {
    const text = el.textContent.trim().replace(/\s+/g, ' ');
    el.setAttribute('aria-label', text);
    el.innerHTML = text.split(' ').map((w) => `<span class="w" aria-hidden="true"><span>${esc(w)}</span></span>`).join(' ');
    return $$('.w > span', el);
  }
  function scramble(el, duration = 1.1) {
    const final = el.textContent, glyphs = '!<>-_\\/[]{}=+*^?#01';
    if (reduced) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const n = Math.floor(p * final.length);
      el.textContent = [...final].map((c, i) => (i < n || c === ' ' ? c : glyphs[Math.floor(Math.random() * glyphs.length)])).join('');
      if (p < 1) requestAnimationFrame(tick); else el.textContent = final;
    };
    requestAnimationFrame(tick);
  }

  /* =========================================================
     Preloader → hero intro
     ========================================================= */
  function heroIntro() {
    root.classList.add('ready', 'anim-ready');
    lenis?.start();
    if (!animate) return;
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from('.hero .char', { yPercent: 118, rotate: 4, duration: 1.5, stagger: 0.035 }, 0.05)
      .add(() => scramble($('[data-scramble]')), 0.2)
      .from('[data-hero-fade]', { y: 22, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.6)
      .from('.site-nav', { yPercent: -100, opacity: 0, duration: 1.2, clearProps: 'transform,opacity' }, 0.7);
  }
  (function preloader() {
    const loader = $('#loader');
    if (!animate) { loader.remove(); heroIntro(); return; }
    const num = $('#loaderNum'), bar = $('#loaderBar'), o = { v: 0 };
    const show = () => { num.textContent = Math.round(o.v); bar.style.transform = `scaleX(${o.v / 100})`; };
    gsap.to('.loader__mark text', { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' });
    gsap.to('.loader__mark text', { fill: '#ededea', duration: 0.6, delay: 1.2 });
    gsap.to(o, { v: 82, duration: 1.4, ease: 'power2.out', onUpdate: show });
    const ready = Promise.all([document.fonts ? document.fonts.ready : 0, new Promise((r) => setTimeout(r, 1500))]);
    Promise.race([ready, new Promise((r) => setTimeout(r, 3200))]).then(() => {
      gsap.timeline()
        .to(o, { v: 100, duration: 0.4, ease: 'power1.in', onUpdate: show })
        .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '+=0.1')
        .add(heroIntro, '-=0.5')
        .add(() => { loader.remove(); if (hasST) ScrollTrigger.refresh(); });
    });
  })();

  /* =========================================================
     Mobile menu, anchors, nav state, progress
     ========================================================= */
  const menu = $('#mobile-menu'), toggle = $('.menu-toggle');
  let menuOpen = false;
  function openMenu() {
    if (menuOpen) return;
    menuOpen = true; menu.hidden = false; root.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true'); toggle.setAttribute('aria-label', 'Close menu');
    lenis?.stop();
    if (animate) {
      gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.inOut' });
      gsap.fromTo($$('.mm-link span', menu), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.05, ease: 'expo.out', delay: 0.3 });
    }
    $('.mm-link', menu).focus({ preventScroll: true });
  }
  function closeMenu(instant = false) {
    if (!menuOpen) return;
    menuOpen = false; root.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu');
    lenis?.start();
    const done = () => { menu.hidden = true; };
    if (animate && !instant) gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'expo.inOut', onComplete: done }); else done();
  }
  toggle.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    const wasOpen = menuOpen;
    closeMenu(true);
    if (modalOpen) closeModal();
    setTimeout(() => scrollToEl(target), wasOpen ? 50 : 0);
  });

  const nav = $('[data-nav]'), progress = $('#scrollProgress'), ring = $('#topRing');
  let lastY = scrollY;
  function onScroll() {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('is-scrolled', y > 30);
    if (y > lastY + 4 && y > 420 && !menuOpen) nav.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 420) nav.classList.remove('is-hidden');
    lastY = y;
    const p = max > 0 ? y / max : 0;
    progress.style.transform = `scaleX(${p})`;
    ring.style.strokeDashoffset = (113.1 * (1 - p)).toFixed(1);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const links = $$('.nav-link[data-target]');
  const io = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (!en.isIntersecting) return;
    links.forEach((l) => { const on = l.dataset.target === en.target.id; l.classList.toggle('is-active', on); on ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current'); });
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('section[data-section]').forEach((s) => io.observe(s));

  /* =========================================================
     Cursor + magnetic
     ========================================================= */
  if (fine && animate) {
    const cursor = $('.cursor'), dot = $('.cursor-dot'), ringEl = $('.cursor-ring'), label = $('.cursor-label');
    root.classList.add('has-cursor');
    gsap.set([dot, ringEl], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' }), dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(ringEl, 'x', { duration: 0.5, ease: 'power3' }), ry = gsap.quickTo(ringEl, 'y', { duration: 0.5, ease: 'power3' });
    addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); cursor.classList.remove('is-hidden'); }, { passive: true });
    root.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
    addEventListener('pointerdown', () => cursor.classList.add('is-press'));
    addEventListener('pointerup', () => cursor.classList.remove('is-press'));
    const LABELS = { view: 'View', drag: 'Drag', copy: 'Copy' };
    document.addEventListener('pointerover', (e) => {
      cursor.classList.remove('is-hover', 'is-view', 'is-text');
      const lab = e.target.closest('[data-cursor]');
      const el = e.target.closest('a, button, .choice, input, textarea');
      if (el && el.matches('input:not([type="radio"]), textarea')) { cursor.classList.add('is-text'); return; }
      if (lab && (!el || el === lab || lab.contains(el)) && !e.target.closest('.tag')) { label.textContent = LABELS[lab.dataset.cursor] || ''; cursor.classList.add('is-view'); return; }
      if (el) cursor.classList.add('is-hover');
    });
    $$('.magnetic').forEach((el) => {
      const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' }), y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); x((e.clientX - (r.left + r.width / 2)) * 0.22); y((e.clientY - (r.top + r.height / 2)) * 0.3); });
      el.addEventListener('pointerleave', () => { x(0); y(0); });
    });
  }

  /* =========================================================
     Scroll scenes
     ========================================================= */
  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  if (hasST && animate) {
    gsap.to('.hero__inner', { yPercent: -10, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    $$('[data-split]').forEach((el) => {
      const words = splitWords(el);
      gsap.from(words, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.04, scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });
    $$('[data-scrub-text]').forEach((el) => {
      const words = splitWords(el);
      gsap.fromTo(words, { opacity: 0.18 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true } });
    });
    $$('.section-label, .section-note, .about__body, .contact__text').forEach((el) => gsap.from(el, { y: 24, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
    $$('[data-count]').forEach((el) => {
      const o = { v: 0 };
      gsap.to(o, { v: +el.dataset.count, duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = fmt(o.v); }, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });

    // Marquee: speed follows scroll velocity
    const loop = gsap.to('.marquee__track', { xPercent: -50, repeat: -1, duration: 38, ease: 'none' });
    ScrollTrigger.create({
      trigger: '.marquee', start: 'top bottom', end: 'bottom top',
      onToggle: (s) => (s.isActive ? loop.play() : loop.pause()),
      onUpdate: (s) => { gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(s.getVelocity()) / 350, 5), duration: 0.2, overwrite: true }); gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.25 }); },
    });

    // About: code panels separate in depth
    gsap.fromTo('.code-panel', { z: 0 }, { z: (i) => i * 70, ease: 'none', scrollTrigger: { trigger: '[data-tilt-scene]', start: 'top 85%', end: 'center 40%', scrub: true } });

    // Featured projects stack and recede (desktop)
    const mm = gsap.matchMedia();
    mm.add('(min-width: 992px)', () => {
      const cards = $$('.project-card');
      cards.forEach((card, i) => {
        const next = cards[i + 1]; if (!next) return;
        const st = { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true };
        gsap.to($('.project-card__inner', card), { scale: 0.92, ease: 'none', scrollTrigger: st });
        gsap.to($('.project-card__shade', card), { opacity: 0.65, ease: 'none', scrollTrigger: { ...st } });
      });
    });
    $$('.project-card').forEach((card) => gsap.from($('.browser', card), { y: 60, rotateX: 8, opacity: 0, duration: 1.4, ease: 'expo.out', transformPerspective: 1200, scrollTrigger: { trigger: card, start: 'top 80%', once: true } }));
    gsap.from('.acard', { y: 50, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: '#archiveGrid', start: 'top 85%', once: true } });

    // Timeline line fills and dots light up
    gsap.to('#timelineFill', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#timeline', start: 'top 70%', end: 'bottom 60%', scrub: true } });
    $$('.timeline__item').forEach((li) => ScrollTrigger.create({ trigger: li, start: 'top 65%', onEnter: () => li.classList.add('is-lit'), onLeaveBack: () => li.classList.remove('is-lit') }));
    $$('.timeline__item').forEach((li) => gsap.from(li, { x: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: li, start: 'top 85%', once: true } }));
    gsap.from('.process__steps li', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.process__steps', start: 'top 85%', once: true } });
    gsap.from('.term', { y: 60, opacity: 0, rotateX: 10, transformPerspective: 1400, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.term', start: 'top 85%', once: true } });
    gsap.from('.contact-form', { y: 50, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.contact-form', start: 'top 85%', once: true } });
    gsap.fromTo('.site-footer__mark', { xPercent: 12 }, { xPercent: -4, ease: 'none', scrollTrigger: { trigger: '.site-footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });

    addEventListener('load', () => ScrollTrigger.refresh());
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  } else {
    $$('[data-split], [data-scrub-text]').forEach(splitWords);
    $$('[data-count]').forEach((el) => { el.textContent = fmt(+el.dataset.count); });
    $$('.timeline__item').forEach((li) => li.classList.add('is-lit'));
    $('#timelineFill').style.transform = 'scaleY(1)';
  }

  // About: tilt the code stack with the cursor
  if (animate && fine) {
    const stack = $('.code-stack'), scene = $('[data-tilt-scene]');
    gsap.set(stack, { rotationX: 14, rotationY: -18 });
    const rX = gsap.quickTo(stack, 'rotationX', { duration: 0.9, ease: 'power3' }), rY = gsap.quickTo(stack, 'rotationY', { duration: 0.9, ease: 'power3' });
    scene.addEventListener('pointermove', (e) => { const r = scene.getBoundingClientRect(); rY(-18 + ((e.clientX - r.left) / r.width - 0.5) * 22); rX(14 - ((e.clientY - r.top) / r.height - 0.5) * 16); });
    scene.addEventListener('pointerleave', () => { rX(14); rY(-18); });
  }

  /* =========================================================
     Skills sphere
     ========================================================= */
  (function sphere() {
    const box = $('#sphere');
    const N = SKILLS.length, golden = Math.PI * (3 - Math.sqrt(5));
    const pts = SKILLS.map((_, i) => { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), a = i * golden; return { x: Math.cos(a) * r, y, z: Math.sin(a) * r }; });
    box.innerHTML = SKILLS.map((s, i) => `<button type="button" class="tag" data-i="${i}" data-group="${s.group}"><i class="${s.icon}" aria-hidden="true"></i>${esc(s.name)}</button>`).join('');
    const tags = $$('.tag', box);
    let R = 0, vx = 0, vy = 0, auto = reduced ? 0 : 0.0035, slow = 1, visible = false, dragging = false;
    const measure = () => { R = box.clientWidth * (box.clientWidth < 480 ? 0.33 : 0.39); };
    measure(); addEventListener('resize', measure);
    function rotate(ax, ay) {
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      for (const p of pts) {
        const x = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
        const y = p.y * cx - z1 * sx, z = p.y * sx + z1 * cx;
        p.x = x; p.y = y; p.z = z;
      }
    }
    function render() {
      for (let i = 0; i < N; i++) {
        const p = pts[i], t = tags[i], depth = (p.z + 1) / 2;
        t.style.transform = `translate(-50%, -50%) translate3d(${(p.x * R).toFixed(1)}px, ${(p.y * R).toFixed(1)}px, 0) scale(${(0.62 + depth * 0.5).toFixed(3)})`;
        t.style.opacity = (0.25 + depth * 0.75).toFixed(2);
        t.style.zIndex = Math.round(depth * 100);
      }
    }
    function loop() {
      if (visible) {
        if (!dragging) { vx *= 0.94; vy *= 0.94; }
        rotate(vx, vy + auto * slow);
        render();
      }
      requestAnimationFrame(loop);
    }
    render(); requestAnimationFrame(loop);
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(box);

    let last = null, moved = 0;
    box.addEventListener('pointerdown', (e) => { dragging = true; moved = 0; last = { x: e.clientX, y: e.clientY }; });
    addEventListener('pointermove', (e) => {
      if (!dragging || !last) return;
      const ddx = e.clientX - last.x, ddy = e.clientY - last.y;
      moved += Math.abs(ddx) + Math.abs(ddy);
      vy = ddx * 0.006; vx = -ddy * 0.006;
      last = { x: e.clientX, y: e.clientY };
    }, { passive: true });
    const endDrag = () => { dragging = false; last = null; };
    addEventListener('pointerup', endDrag); addEventListener('pointercancel', endDrag);
    box.addEventListener('pointerenter', () => { slow = 0.25; });
    box.addEventListener('pointerleave', () => { slow = 1; });

    const card = { icon: $('#skillIcon'), group: $('#skillGroup'), name: $('#skillName'), desc: $('#skillDesc') };
    const GROUP = { frontend: 'Frontend', backend: 'Backend', tools: 'Tools' };
    function show(i) {
      const s = SKILLS[i];
      tags.forEach((t, k) => t.classList.toggle('is-active', k === i));
      const fill = () => { card.icon.innerHTML = `<i class="${s.icon}" aria-hidden="true"></i>`; card.group.textContent = GROUP[s.group]; card.name.textContent = s.name; card.desc.textContent = s.desc; };
      if (!animate) return fill();
      gsap.timeline()
        .to('#skillCard > *', { y: -14, opacity: 0, duration: 0.2, stagger: 0.03, ease: 'power2.in' })
        .add(fill)
        .fromTo('#skillCard > *', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'expo.out' });
      gsap.fromTo(card.icon, { rotate: -20, scale: 0.7 }, { rotate: 0, scale: 1, duration: 0.9, ease: 'elastic.out(1, .5)', delay: 0.2 });
    }
    box.addEventListener('click', (e) => { const t = e.target.closest('.tag'); if (t && moved < 8) show(+t.dataset.i); });
    box.addEventListener('focusin', (e) => { const t = e.target.closest('.tag'); if (t) { slow = 0; show(+t.dataset.i); } });
    box.addEventListener('focusout', () => { slow = 1; });
    $$('.skill-filter .chip-btn').forEach((b) => b.addEventListener('click', () => {
      const g = b.dataset.group;
      $$('.skill-filter .chip-btn').forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      tags.forEach((t) => t.classList.toggle('is-dim', g !== 'all' && t.dataset.group !== g));
      if (g !== 'all') { card.group.textContent = `${tags.filter((t) => t.dataset.group === g).length} skills`; }
    }));
  })();

  /* =========================================================
     Archive: filter with Flip, tilt cards
     ========================================================= */
  const acards = $$('.acard');
  $$('.archive__filters .chip-btn').forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.filter;
    $$('.archive__filters .chip-btn').forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    const state = hasFlip && animate ? Flip.getState(acards) : null;
    acards.forEach((c) => { c.style.display = f === 'all' || c.dataset.cat === f ? '' : 'none'; });
    $('#archiveCount').textContent = acards.filter((c) => c.style.display !== 'none').length;
    if (state) {
      Flip.from(state, {
        duration: 0.7, ease: 'expo.inOut', scale: true, absolute: true, stagger: 0.02,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.4 }),
        onComplete: () => hasST && ScrollTrigger.refresh(),
      });
    } else if (hasST) ScrollTrigger.refresh();
  }));
  if (fine && animate) {
    acards.forEach((c) => {
      const rX = gsap.quickTo(c, 'rotationX', { duration: 0.6, ease: 'power3' }), rY = gsap.quickTo(c, 'rotationY', { duration: 0.6, ease: 'power3' });
      gsap.set(c, { transformPerspective: 900 });
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.style.setProperty('--mx', px * 100 + '%'); c.style.setProperty('--my', py * 100 + '%');
        rY((px - 0.5) * 10); rX((0.5 - py) * 10);
      });
      c.addEventListener('pointerleave', () => { rX(0); rY(0); });
    });
  }

  /* =========================================================
     Case-study modal
     ========================================================= */
  const modal = $('#project-modal'), panel = $('.pmodal__panel', modal), body = $('#modalBody');
  let modalOpen = false, current = 0, lastFocus = null;
  function caseHtml(p) {
    const overview = p.overview || p.summary;
    const note = !p.live ? `<p class="case__note">${p.cat === 'dotnet' ? 'Runs locally in Visual Studio.' : 'Runs on PHP + MySQL hosting.'} Code and a walkthrough are available on request: <a href="mailto:${esc(SITE.email)}?subject=${encodeURIComponent(p.title)}">${esc(SITE.email)}</a></p>` : '';
    return `<article class="case">
      <header class="case__head">
        <p class="case__category">${esc(p.label)} · ${esc(CAT[p.cat])}</p>
        <h2 class="case__title">${esc(p.title)}</h2>
        <p class="case__summary">${esc(p.summary)}</p>
        <div class="case__actions">
          ${liveBtn(p, 'btn-x btn-x--solid')}
          ${p.source ? `<a href="${esc(p.source)}" class="btn-x btn-x--line" target="_blank" rel="noopener">View source <i class="fa-brands fa-github" aria-hidden="true"></i></a>` : ''}
          ${p.role ? `<span class="case__role">${esc(p.role)}</span>` : ''}
        </div>
        ${note}
      </header>
      <div class="case__preview">${preview(p)}</div>
      <div class="case__grid">
        <section class="case__block case__block--wide"><h3>Overview</h3><p>${esc(overview)}</p></section>
        <section class="case__block"><h3>Technologies</h3><ul class="chips">${p.stack.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></section>
        <section class="case__block"><h3>Key features</h3><ul class="case__list">${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></section>
        ${p.focus ? `<section class="case__block case__block--wide"><h3>Development focus</h3><ul class="case__list case__list--focus">${p.focus.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></section>` : ''}
      </div>
      <footer class="case__foot">
        ${p.live ? `<a href="${esc(p.live)}" class="btn-x btn-x--line" target="_blank" rel="noopener">Visit ${esc(p.host || 'live project')} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : '<span></span>'}
        <button type="button" class="case__next" data-step="1"><span>Next project</span><strong>${esc(PROJECTS[(PROJECTS.indexOf(p) + 1) % PROJECTS.length].title)}</strong></button>
      </footer>
    </article>`;
  }
  function fill(i) {
    current = (i + PROJECTS.length) % PROJECTS.length;
    const p = PROJECTS[current];
    body.innerHTML = caseHtml(p);
    $('#modalCount').textContent = `${pad2(current + 1)} / ${pad2(PROJECTS.length)}`;
    modal.setAttribute('aria-label', `${p.title} case study`);
    panel.scrollTop = 0;
  }
  function openModal(id) {
    const i = PROJECTS.findIndex((p) => p.id === id);
    if (i < 0) return;
    if (modalOpen) { swap(i); return; }
    modalOpen = true; lastFocus = document.activeElement;
    fill(i); modal.hidden = false; root.classList.add('modal-open'); lenis?.stop();
    if (animate) {
      gsap.fromTo('.pmodal__backdrop', { opacity: 0 }, { opacity: 1, duration: 0.5 });
      gsap.fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: 'expo.out' });
      gsap.fromTo($$('.case > *', body), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.25 });
    }
    panel.focus({ preventScroll: true });
  }
  function swap(i, dir = 1) {
    if (!animate) return fill(i);
    gsap.to(body, { opacity: 0, x: -40 * dir, duration: 0.25, ease: 'power2.in', onComplete: () => { fill(i); gsap.fromTo(body, { opacity: 0, x: 40 * dir }, { opacity: 1, x: 0, duration: 0.6, ease: 'expo.out' }); } });
  }
  function closeModal() {
    if (!modalOpen) return;
    modalOpen = false;
    const done = () => { modal.hidden = true; body.innerHTML = ''; root.classList.remove('modal-open'); lenis?.start(); lastFocus?.focus?.({ preventScroll: true }); };
    if (animate) { gsap.to('.pmodal__backdrop', { opacity: 0, duration: 0.4 }); gsap.to(panel, { yPercent: 100, duration: 0.6, ease: 'expo.in', onComplete: done }); } else done();
  }
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); openModal(o.dataset.open); return; }
    const s = e.target.closest('[data-step]');
    if (s && modalOpen) { const d = +s.dataset.step; swap(current + d, d); return; }
    if (e.target.closest('[data-close-modal]')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (modalOpen) closeModal(); else closeMenu(); }
    if (modalOpen && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !e.target.closest('input, textarea')) { const d = e.key === 'ArrowRight' ? 1 : -1; swap(current + d, d); }
    if (e.key !== 'Tab') return;
    const scope = modalOpen ? modal : (menuOpen ? menu : null);
    if (!scope) return;
    const f = $$('a[href], button:not([disabled]), input, textarea', scope).concat(menuOpen ? [toggle] : []).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  /* =========================================================
     Terminal
     ========================================================= */
  (function terminal() {
    const out = $('#termOut'), input = $('#termInput'), form = $('#termForm');
    const history = []; let hIndex = 0;
    const ACCENTS = { ice: '#9cc8ff', mint: '#8ff0c4', amber: '#ffc46b', rose: '#ff9fbf', silver: '#d6d6d2' };
    const SECTIONS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const print = (html, cls = '') => { const p = document.createElement('p'); if (cls) p.className = cls; p.innerHTML = html; out.appendChild(p); out.scrollTop = out.scrollHeight; return p; };
    const findProject = (q) => {
      q = (q || '').toLowerCase().trim(); if (!q) return null;
      const n = parseInt(q, 10);
      if (n >= 1 && n <= PROJECTS.length && String(n) === q) return PROJECTS[n - 1];
      return PROJECTS.find((p) => p.id === q || p.title.toLowerCase() === q) || PROJECTS.find((p) => p.title.toLowerCase().includes(q) || p.id.includes(q));
    };
    const projLink = (p) => `<button type="button" class="link" data-open="${p.id}">${esc(p.title)}</button>`;

    const CMDS = {
      help: { d: 'list commands', run: () => print(`<table>${Object.entries(CMDS).filter(([k, c]) => c.d && !ALIASES.includes(k)).map(([k, c]) => `<tr><td class="hi">${k}${c.a ? ' ' + c.a : ''}</td><td class="muted">${c.d}</td></tr>`).join('')}</table>`) },
      about: { d: 'who I am', run: () => print(`Muhammad Hammad, ${esc(SITE.role)}.\nI build responsive interfaces and the PHP, .NET and MySQL systems behind them,\nand I like pushing plain HTML, CSS and JavaScript into 3D, audio and generative art.`) },
      skills: { a: '[frontend|backend|tools]', d: 'what I work with', run: (g) => {
        const groups = g ? [g] : ['frontend', 'backend', 'tools'];
        if (g && !['frontend', 'backend', 'tools'].includes(g)) return print(`skills: unknown group "${esc(g)}". Try frontend, backend or tools.`, 'err');
        groups.forEach((gr) => print(`<span class="hi">${gr}</span>  ${SKILLS.filter((s) => s.group === gr).map((s) => esc(s.name)).join(' · ')}`));
      } },
      projects: { a: '[creative|frontend|php|dotnet]', d: 'list projects (click a name to open it)', run: (c) => {
        const list = c ? PROJECTS.filter((p) => p.cat === c) : PROJECTS;
        if (!list.length) return print(`projects: no category "${esc(c)}". Try creative, frontend, php or dotnet.`, 'err');
        print(`<table>${list.map((p) => `<tr><td class="muted">${pad2(PROJECTS.indexOf(p) + 1)}</td><td>${projLink(p)}</td><td class="muted">${esc(p.label)}</td></tr>`).join('')}</table>`);
      } },
      open: { a: '<project>', d: 'open a case study, e.g. open abyss or open 4', run: (q) => {
        const p = findProject(q);
        if (!p) return print(q ? `open: no project matches "${esc(q)}". Type projects to see them all.` : 'open: which project? e.g. open abyss', 'err');
        print(`Opening ${esc(p.title)}…`, 'ok'); setTimeout(() => openModal(p.id), 250);
      } },
      live: { a: '<project>', d: 'open a project’s live site in a new tab', run: (q) => {
        const p = findProject(q);
        if (!p) return print(`live: no project matches "${esc(q || '')}".`, 'err');
        if (!p.live) return print(`${esc(p.title)} has no public link yet. Type contact to ask for a demo.`, 'muted');
        window.open(p.live, '_blank', 'noopener'); print(`Opened ${esc(p.title)} in a new tab.`, 'ok');
      } },
      goto: { a: '<section>', d: 'scroll to a section of the page', run: (s) => {
        if (!SECTIONS.includes(s)) return print(`goto: try ${SECTIONS.join(', ')}`, 'err');
        print(`Scrolling to ${s}…`, 'ok'); scrollToEl(document.getElementById(s));
      } },
      contact: { d: 'how to reach me', run: () => print(`Email   <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>\n${SITE.phone ? `Phone   <a href="${esc(SITE.phoneHref)}">${esc(SITE.phone)}</a>\n` : ''}${socials.map(([l, , u]) => `${l.padEnd(8)}<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u.replace(/^https?:\/\//, ''))}</a>`).join('\n')}\nType mail to fill in the contact form.`) },
      mail: { d: 'jump to the contact form', run: () => { print('Taking you to the form…', 'ok'); scrollToEl($('#contact')); setTimeout(() => $('#cf-name').focus({ preventScroll: true }), 1400); } },
      accent: { a: '<ice|mint|amber|rose|silver>', d: 'change the site’s accent colour', run: (c) => {
        if (!ACCENTS[c]) return print(`accent: pick one of ${Object.keys(ACCENTS).join(', ')}`, 'err');
        if (animate) gsap.to(root, { '--ice': ACCENTS[c], duration: 0.8 }); else root.style.setProperty('--ice', ACCENTS[c]);
        print(`Accent set to ${c}. Look around the page.`, 'ok');
      } },
      stack: { d: 'what this site is built with', run: () => print('HTML, CSS and vanilla JavaScript.\nGSAP + ScrollTrigger + Flip for motion, Lenis for smooth scrolling,\nThree.js for the hero, and no frameworks or build step.') },
      whoami: { run: () => print('a visitor with good taste in portfolios') },
      date: { run: () => print(new Date().toString()) },
      echo: { run: (...a) => print(esc(a.join(' '))) },
      history: { d: 'commands you have typed', run: () => print(history.length ? history.map((h, i) => `${String(i + 1).padStart(3)}  ${esc(h)}`).join('\n') : 'no history yet', 'muted') },
      clear: { d: 'clear the screen', run: () => { out.innerHTML = ''; } },
      sudo: { run: () => print('Permission denied. Nice try, though.', 'err') },
      hello: { run: () => print('Hey! Type help to see what I can do.') },
    };
    const ALIASES = ['hi', 'ls', 'cls'];
    CMDS.hi = CMDS.hello; CMDS.ls = CMDS.projects; CMDS.cls = CMDS.clear;

    function run(raw) {
      const line = raw.trim();
      print(`<span class="cmd"><b>hammad@portfolio:~$</b> ${esc(line)}</span>`);
      if (!line) return;
      history.push(line); hIndex = history.length;
      const [name, ...args] = line.split(/\s+/);
      const cmd = CMDS[name.toLowerCase()];
      if (!cmd) { print(`command not found: ${esc(name)}. Type help to see what works.`, 'err'); return; }
      cmd.run(...args.map((a) => a.toLowerCase()).slice(0, 1).concat(args.slice(1)));
    }
    form.addEventListener('submit', (e) => { e.preventDefault(); run(input.value); input.value = ''; });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); if (hIndex > 0) input.value = history[--hIndex]; }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (hIndex < history.length - 1) input.value = history[++hIndex]; else { hIndex = history.length; input.value = ''; } }
      else if (e.key === 'Tab') {
        e.preventDefault();
        const v = input.value, parts = v.split(/\s+/);
        if (parts.length === 1) {
          const m = Object.keys(CMDS).filter((k) => k.startsWith(parts[0].toLowerCase()));
          if (m.length === 1) input.value = m[0] + ' '; else if (m.length) print(m.join('  '), 'muted');
        } else {
          const pool = parts[0] === 'goto' ? SECTIONS : parts[0] === 'accent' ? Object.keys(ACCENTS) : PROJECTS.map((p) => p.id);
          const m = pool.filter((k) => k.startsWith((parts[1] || '').toLowerCase()));
          if (m.length === 1) input.value = `${parts[0]} ${m[0]}`; else if (m.length) print(m.join('  '), 'muted');
        }
      }
    });
    $('#term').addEventListener('click', (e) => { if (!e.target.closest('button, a') && !getSelection().toString()) input.focus({ preventScroll: true }); });

    const CHIPS = ['help', 'about', 'projects', 'open abyss', 'skills backend', 'accent mint', 'contact', 'clear'];
    $('#termChips').innerHTML = CHIPS.map((c) => `<button type="button" data-cmd="${c}">${c}</button>`).join('');
    $('#termChips').addEventListener('click', (e) => { const b = e.target.closest('[data-cmd]'); if (b) typeAndRun(b.dataset.cmd); });

    let typing = false;
    function typeAndRun(cmd) {
      if (typing) return;
      if (reduced) { run(cmd); return; }
      typing = true; input.value = '';
      let i = 0;
      const t = setInterval(() => {
        input.value += cmd[i++];
        if (i >= cmd.length) { clearInterval(t); setTimeout(() => { run(cmd); input.value = ''; typing = false; }, 180); }
      }, 45);
    }
    print(`<span class="hi">Muhammad Hammad</span> — portfolio shell v1.0`);
    print('Type a command, or click one of the suggestions below.', 'muted');
    let greeted = false;
    new IntersectionObserver(([en]) => { if (en.isIntersecting && !greeted) { greeted = true; setTimeout(() => typeAndRun('help'), 500); } }, { threshold: 0.4 }).observe($('#term'));
  })();

  /* =========================================================
     Contact: copy email + compose via mail app
     ========================================================= */
  $('#copyEmail').addEventListener('click', async () => {
    const hint = $('#copyHint');
    try { await navigator.clipboard.writeText(SITE.email); hint.textContent = 'Email copied to your clipboard.'; }
    catch (e) { location.href = 'mailto:' + SITE.email; return; }
    if (animate) gsap.fromTo('#copyEmail', { scale: 0.96 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, .4)' });
    setTimeout(() => { hint.textContent = ''; }, 2600);
  });
  const form = $('#contactForm');
  const setError = (name, msg) => {
    const outEl = $(`[data-error-for="${name}"]`, form), field = form.elements[name];
    outEl.textContent = msg || ''; field.closest('.field').classList.toggle('has-error', !!msg);
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };
  ['name', 'email', 'message'].forEach((n) => form.elements[n].addEventListener('input', () => setError(n, '')));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = (n) => (form.elements[n].value || '').trim();
    const errs = {};
    if (v('name').length < 2) errs.name = 'Enter your name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) errs.email = 'Enter a valid email address so I can reply.';
    if (v('message').length < 10) errs.message = 'Add a few more details (at least 10 characters).';
    ['name', 'email', 'message'].forEach((n) => setError(n, errs[n]));
    const status = $('#formStatus');
    if (Object.keys(errs).length) {
      status.className = 'form-status is-error'; status.textContent = 'Check the highlighted fields and try again.';
      form.elements[Object.keys(errs)[0]].focus();
      if (animate) gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.6, ease: 'elastic.out(1, .3)' });
      return;
    }
    const type = (form.querySelector('input[name="type"]:checked') || {}).value || 'Not specified';
    const subject = `Project enquiry from ${v('name')}`;
    const bodyText = `Name: ${v('name')}\nEmail: ${v('email')}\nProject type: ${type}\n\n${v('message')}`;
    location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    status.className = 'form-status is-success';
    status.textContent = `Your email app should open with the message ready. If it doesn’t, write to ${SITE.email}.`;
  });
})();
