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
