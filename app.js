// Animación de partículas en el canvas
const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.vx = (Math.random() - 0.5) * 0.5;
  this.vy = (Math.random() - 0.5) * 0.5;
  this.radius = Math.random() * 3.7;
  this.color = Math.random() > 0.4 ? "#a020f0" : "white"; 

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };

  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    this.draw();
  };
}

let particles = [];
function initParticles() {
  particles = [];
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particles.push(new Particle(x, y));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => particle.update());
  requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();
window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

// Animación de proyectos al hacer scroll
const proyectos = document.querySelectorAll(".proyecto");

function animateOnScroll() {
  proyectos.forEach((proyecto) => {
    const rect = proyecto.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.8) {
      proyecto.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", animateOnScroll);
animateOnScroll();

// Control del carrusel
function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const dots = carousel.parentElement.querySelectorAll('.carousel-dot');
    let currentIndex = parseInt(carousel.getAttribute('data-index') || 0);
    
    // Actualizar índice
    currentIndex = (currentIndex + direction + 2) % 2; // Solo 2 imágenes
    
    // Mover las imágenes
    carousel.style.transform = `translateX(-${currentIndex * 50}%)`;
    
    // Actualizar dots
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Guardar el índice actual
    carousel.setAttribute('data-index', currentIndex);
}

// Click en los dots
document.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', function() {
        const carouselId = this.closest('.carousel').querySelector('.carousel-images').id;
        const targetIndex = parseInt(this.getAttribute('data-index'));
        const currentIndex = parseInt(document.getElementById(carouselId).getAttribute('data-index') || 0);
        moveCarousel(carouselId, targetIndex - currentIndex);
    });
});

// Inicializar carruseles
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel-images');
    carousels.forEach(carousel => {
        carousel.setAttribute('data-index', '0');
    });
});