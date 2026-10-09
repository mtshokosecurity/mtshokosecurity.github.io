(function () {
  'use strict';
  var d = document, w = window;
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header shadow */
  var header = d.querySelector('.site-header');
  function onScroll() { header.classList.toggle('solid', w.scrollY > 60); }

  /* mobile nav */
  var toggle = d.querySelector('.nav-toggle'), nav = d.getElementById('nav');
  function closeNav() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });

  /* parallax (transform based, works on iOS) */
  var layers = [].slice.call(d.querySelectorAll('[data-speed]'));
  var ticking = false;
  function parallax() {
    var vh = w.innerHeight;
    layers.forEach(function (el) {
      var host = el.parentElement.getBoundingClientRect();
      if (host.bottom < -300 || host.top > vh + 300) return;
      var speed = parseFloat(el.getAttribute('data-speed')) || 0;
      var offset = (host.top + host.height / 2 - vh / 2) * -speed;
      el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
    });
    ticking = false;
  }
  function requestTick() { if (!ticking) { ticking = true; w.requestAnimationFrame(parallax); } }
  w.addEventListener('scroll', function () { onScroll(); spy(); if (!reduce) requestTick(); }, { passive: true });
  w.addEventListener('resize', function () { if (!reduce) requestTick(); });

  /* scroll-spy */
  var links = [].slice.call(d.querySelectorAll('.nav a[href^="#"]'));
  var targets = links.map(function (a) { return d.querySelector(a.getAttribute('href')); });
  function spy() {
    var pos = w.scrollY + 160, cur = -1, best = -1;
    targets.forEach(function (t, i) {
      if (t && t.offsetTop <= pos && t.offsetTop > best) { best = t.offsetTop; cur = i; }
    });
    links.forEach(function (a, i) { a.classList.toggle('active', i === cur); });
  }

  onScroll(); spy();
  if (!reduce) parallax();

  /* reveal on scroll */
  var items = [].slice.call(d.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in w && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* count-up */
  var counters = [].slice.call(d.querySelectorAll('[data-count]'));
  if ('IntersectionObserver' in w && !reduce) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, end = +el.getAttribute('data-count'),
            suf = el.getAttribute('data-suffix') || '', t0 = null, dur = 1400;
        function step(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suf : '');
          if (p < 1) w.requestAnimationFrame(step);
        }
        w.requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  var yr = d.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
