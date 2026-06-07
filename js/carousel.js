// Hero Carousel Implementation
class HeroCarousel {
  constructor(containerId, slidesData) {
    this.container = document.getElementById(containerId);
    this.slidesData = slidesData;
    this.currentIndex = 0;
    this.interval = null;
    this.init();
  }

  init() {
    if (!this.container) return;

    // Create carousel structure
    this.createCarousel();
    
    // Start auto-play
    this.startAutoPlay();
    
    // Add event listeners
    this.addEventListeners();
  }

  createCarousel() {
    // Create slides
    this.slidesData.forEach((slide, index) => {
      const slideElement = document.createElement('div');
      slideElement.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
      
      // Check if slide has content (title, subtitle, etc.) or just image
      if (slide.title) {
        slideElement.innerHTML = `
          <img src="${slide.src}" alt="${slide.title}">
          <div class="carousel-content">
            <h4>${slide.subtitle || 'Impulsa Mujer'}</h4>
            <h1>${slide.title}</h1>
            <p>${slide.description || ''}</p>
            <div class="carousel-buttons">
              <a href="${slide.buttonLink || '#contact'}" class="btn btn-primary">${slide.button || 'Únete Ahora'}</a>
              ${slide.secondaryButton ? `<a href="${slide.secondaryButtonLink || '#about'}" class="btn btn-secondary">${slide.secondaryButton}</a>` : ''}
            </div>
          </div>
        `;
      } else {
        // Image only slide
        slideElement.innerHTML = `<img src="${slide.src}" alt="Slide ${index + 1}">`;
      }
      
      this.container.appendChild(slideElement);
    });

    // Create navigation dots
    const navContainer = document.createElement('div');
    navContainer.className = 'carousel-nav';
    this.slidesData.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = `carousel-nav-dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => this.goToSlide(index));
      navContainer.appendChild(dot);
    });
    this.container.appendChild(navContainer);

    // Create navigation arrows
    const prevArrow = document.createElement('div');
    prevArrow.className = 'carousel-arrow prev';
    prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevArrow.addEventListener('click', () => this.prev());
    this.container.appendChild(prevArrow);

    const nextArrow = document.createElement('div');
    nextArrow.className = 'carousel-arrow next';
    nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextArrow.addEventListener('click', () => this.next());
    this.container.appendChild(nextArrow);

    // Store references
    this.slides = this.container.querySelectorAll('.carousel-slide');
    this.dots = this.container.querySelectorAll('.carousel-nav-dot');
  }

  goToSlide(index) {
    // Remove active class from current slide and dot
    this.slides[this.currentIndex].classList.remove('active');
    this.dots[this.currentIndex].classList.remove('active');

    // Update index
    this.currentIndex = index;

    // Add active class to new slide and dot
    this.slides[this.currentIndex].classList.add('active');
    this.dots[this.currentIndex].classList.add('active');

    // Reset auto-play timer
    this.resetAutoPlay();
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % this.slidesData.length;
    this.goToSlide(nextIndex);
  }

  prev() {
    const prevIndex = (this.currentIndex - 1 + this.slidesData.length) % this.slidesData.length;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.interval = setInterval(() => {
      this.next();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoPlay() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  addEventListeners() {
    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container.addEventListener('mouseleave', () => this.startAutoPlay());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    });

    this.handleSwipe = (start, end) => {
      const swipeThreshold = 50;
      const diff = start - end;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    };
  }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Define slide data for small carousel (images only)
  const slideData = [
    {
      src: "img/carousel/emprendedora7.png"
    },
    {
      src: "img/carousel/emprendedora5.png"
    },
    {
      src: "img/carousel/emprendedora6.png"
    },
    {
      src: "img/carousel/emprendedora8.png"
    },
    {
      src: "img/carousel/emprendedora9.png"
    }
  ];

  // Initialize small carousel for hero image
  new HeroCarousel('hero-carousel-small', slideData);
});
