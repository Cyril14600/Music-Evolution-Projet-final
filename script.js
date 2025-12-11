/* ============================================
   MusicEvolution14 - JavaScript
   ============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // Lenis Smooth Scroll
    // ============================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor links smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target);
            }
        });
    });

    // ============================================
    // Loader
    // ============================================
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        });
    }

    // ============================================
    // Navigation
    // ============================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect on nav
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // Scroll Reveal Animations
    // ============================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // Testimonials Slider
    // ============================================
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 1;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.add('hidden'));
        testimonialDots.forEach(d => d.classList.remove('active'));

        const testimonial = document.getElementById(`testimonial-${index}`);
        if (testimonial) {
            testimonial.classList.remove('hidden');
        }

        const dot = document.querySelector(`.testimonial-dot[data-index="${index}"]`);
        if (dot) {
            dot.classList.add('active');
        }

        currentTestimonial = index;
    }

    function nextTestimonial() {
        let next = currentTestimonial + 1;
        if (next > testimonials.length) next = 1;
        showTestimonial(next);
    }

    // Auto-rotate testimonials
    if (testimonials.length > 0) {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    // Click handlers for dots
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            showTestimonial(parseInt(dot.dataset.index));
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
    });

    // ============================================
    // Gallery Filters (for galerie.html)
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            const filter = btn.dataset.filter;

            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ============================================
    // Lightbox
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item, .mini-gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // ============================================
    // Form Validation (for contact.html)
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--secondary-accent)';
                } else {
                    field.style.borderColor = 'var(--glass-border)';
                }
            });

            // Email validation
            const emailField = contactForm.querySelector('[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = 'var(--secondary-accent)';
                }
            }

            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.innerHTML = `
          <div class="card" style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
            <h3>Message envoyé !</h3>
            <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        `;
                contactForm.parentNode.replaceChild(successMsg, contactForm);
            }
        });
    }

    // ============================================
    // Testimonial Form (for temoignages.html)
    // ============================================
    const testimonialForm = document.getElementById('testimonialForm');

    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('testimonial-name').value;
            const event = document.getElementById('testimonial-event').value;
            const rating = document.querySelector('input[name="rating"]:checked');
            const message = document.getElementById('testimonial-message').value;

            if (name && event && rating && message) {
                // Create new testimonial card
                const stars = '★'.repeat(parseInt(rating.value));
                const newTestimonial = document.createElement('div');
                newTestimonial.className = 'testimonial-card reveal active';
                newTestimonial.innerHTML = `
          <div class="testimonial-stars">${stars}</div>
          <p class="testimonial-text">"${message}"</p>
          <div class="testimonial-author">
            <span class="testimonial-name">${name}</span>
            <span class="testimonial-event">${event}</span>
          </div>
        `;

                // Add to testimonials grid
                const testimonialGrid = document.querySelector('.testimonials-grid');
                if (testimonialGrid) {
                    testimonialGrid.prepend(newTestimonial);
                }

                // Reset form
                testimonialForm.reset();

                // Show success
                alert('Merci pour votre témoignage ! Il sera publié après validation.');
            }
        });
    }

    // ============================================
    // Parallax Effect (subtle)
    // ============================================
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }

    // ============================================
    // Active Nav Link
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ============================================
    // Fade In Animation Keyframe (add to CSS dynamically)
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
    document.head.appendChild(style);

});
