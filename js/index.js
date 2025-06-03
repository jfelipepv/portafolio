document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("open");

    // Bloquear scroll si el menú está abierto
    if (navLinks.classList.contains("active")) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  });

  // Cerrar el menú al hacer clic en un enlace
  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });
});

// Selecciona todos los elementos con la clase fade-in
const elements = document.querySelectorAll('.fade-in');

// Configuración del Intersection Observer
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Añade la clase visible cuando el elemento entre en el viewport
        entry.target.classList.add('visible');
        // Opcional: Deja de observar después de activar la animación
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2 // El 20% del elemento debe ser visible para activarse
  }
);

// Observa cada elemento
elements.forEach(el => observer.observe(el));


const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.dot');
  const cards = document.querySelectorAll('.certificate-card');

  function setActiveDot(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      const scrollX = cards[index].offsetLeft - track.offsetLeft;
      track.scrollTo({ left: scrollX, behavior: 'smooth' });
      setActiveDot(index);
    });
  });

  track.addEventListener('scroll', () => {
    const scrollLeft = track.scrollLeft;
    let activeIndex = 0;
    cards.forEach((card, index) => {
      const cardLeft = card.offsetLeft - track.offsetLeft;
      if (cardLeft - scrollLeft < card.offsetWidth / 2) {
        activeIndex = index;
      }
    });
    setActiveDot(activeIndex);
  });