document.getElementById('year').textContent = new Date().getFullYear();

// Hero screenshot carousel
const carousel = document.getElementById('heroCarousel');
const caption = document.getElementById('heroCaption');
const captions = [
  'Tus mapas, disponibles aunque no haya cobertura.',
  'Navega con confianza, incluso sin señal.',
  'El sistema de coordenadas que usa Colombia.',
  'Exporta cualquier capa a KML o Shapefile en dos toques.'
];
if (carousel) {
  const slides = carousel.querySelectorAll('.shot-slide');
  const dots = carousel.querySelectorAll('.dot');
  let current = 0;

  setInterval(() => {
    const next = (current + 1) % slides.length;
    slides[current].classList.add('is-leaving');
    slides[current].classList.remove('is-active');
    slides[next].classList.add('is-active');
    dots[current].classList.remove('is-active');
    dots[next].classList.add('is-active');
    setTimeout(() => slides[current].classList.remove('is-leaving'), 1000);

    if (caption) {
      caption.classList.add('is-fading');
      setTimeout(() => {
        caption.textContent = captions[next];
        caption.classList.remove('is-fading');
      }, 350);
    }

    current = next;
  }, 3600);
}

// Flow track: curved route line + dot walking along the real path
const flowTrack = document.getElementById('flowTrack');
const flowPath = document.getElementById('flowPath');
const flowDot = document.getElementById('flowDot');
if (flowTrack && flowPath && flowDot) {
  const len = flowPath.getTotalLength();
  const pins = Array.from(flowTrack.querySelectorAll('.flow-pin'));

  // Find, for each pin, the fraction of the path length where the dot is closest to it
  const pinThresholds = pins.map(pin => {
    const target = { x: parseFloat(pin.dataset.x), y: parseFloat(pin.dataset.y) };
    const steps = 400;
    let best = 0, bestDist = Infinity;
    for (let i = 0; i <= steps; i++) {
      const l = (i / steps) * len;
      const p = flowPath.getPointAtLength(l);
      const d = (p.x - target.x) ** 2 + (p.y - target.y) ** 2;
      if (d < bestDist) { bestDist = d; best = l / len; }
    }
    return best;
  });

  const io2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        io2.unobserve(entry.target);

        let start = null;
        const duration = 7000;
        let lastProgress = 1;
        function animateDot(ts) {
          if (!start) start = ts;
          const elapsed = (ts - start) % duration;
          const progress = elapsed / duration;

          if (progress < lastProgress) {
            pins.forEach(p => p.classList.remove('is-dropped'));
          }
          pins.forEach((pin, i) => {
            if (progress >= pinThresholds[i]) pin.classList.add('is-dropped');
          });
          lastProgress = progress;

          const point = flowPath.getPointAtLength(progress * len);
          flowDot.style.left = (point.x / 1200 * 100) + '%';
          flowDot.style.top = (point.y / 130 * 100) + '%';
          requestAnimationFrame(animateDot);
        }
        setTimeout(() => requestAnimationFrame(animateDot), 600);
      }
    });
  }, { threshold: 0.2 });
  io2.observe(flowTrack);
}

// Coordinate chips: cycle highlight + sync readout text
const chipList = document.getElementById('chipList');
const coordReadout = document.getElementById('coordReadout');
if (chipList && coordReadout) {
  const chips = chipList.querySelectorAll('.chip');
  let chipIndex = 0;
  chips[0].classList.add('is-active');

  setInterval(() => {
    chips[chipIndex].classList.remove('is-active');
    chipIndex = (chipIndex + 1) % chips.length;
    chips[chipIndex].classList.add('is-active');
    coordReadout.textContent = chips[chipIndex].dataset.coord;
  }, 2200);
}

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => io.observe(el));

// Smooth-scroll offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const headerH = document.querySelector('header.site').offsetHeight;
        const y = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});
