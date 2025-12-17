/* ============================================
   MusicEvolution14 - JavaScript
   ============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // Inject Header & Footer (DRY Principle)
    // ============================================
    function injectComponents() {
        // Header Injection
        const nav = document.getElementById('nav');
        if (nav) {
            nav.innerHTML = `
    <div class="container nav-container">
      <a href="index.html" class="nav-logo">
        <img src="logo.webp" alt="MusicEvolution14 Logo">
        <span>MusicEvolution<span class="text-accent">14</span></span>
      </a>

      <ul class="nav-menu" id="navMenu">
        <li><a href="index.html" class="nav-link">Accueil</a></li>
        <li><a href="prestations.html" class="nav-link">Prestations</a></li>
        <li><a href="locations.html" class="nav-link">Locations</a></li>
        <li><a href="galerie.html" class="nav-link">Galerie</a></li>
        <li><a href="about.html" class="nav-link">Qui sommes-nous</a></li>
        <li><a href="temoignages.html" class="nav-link">Témoignages</a></li>
        <li><a href="contact.html" class="nav-link nav-cta"><span class="btn btn-primary">Contact</span></a></li>
      </ul>

      <button class="nav-toggle" id="navToggle" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
            `;
        }

        // Footer Injection
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="logo.webp" alt="MusicEvolution14" loading="lazy">
            <span>MusicEvolution<span class="text-accent">14</span></span>
          </div>
          <p>Animation musicale et décoration événementielle sur mesure en Basse-Normandie. Transformez vos rêves en
            réalité.</p>
          <div class="social-links">
            <a href="https://www.facebook.com/MusicEvolution14/?locale=fr_FR" class="social-link" target="_blank" rel="noopener" aria-label="Facebook">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://instagram.com" class="social-link" target="_blank" rel="noopener" aria-label="Instagram">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor"
                  stroke-width="2" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor"
                  stroke-width="2" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2" />
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">Navigation</h4>
          <ul class="footer-links">
            <li><a href="index.html" class="footer-link">Accueil</a></li>
            <li><a href="prestations.html" class="footer-link">Prestations</a></li>
            <li><a href="locations.html" class="footer-link">Locations</a></li>
            <li><a href="galerie.html" class="footer-link">Galerie</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">Infos</h4>
          <ul class="footer-links">
            <li><a href="about.html" class="footer-link">Qui sommes-nous</a></li>
            <li><a href="temoignages.html" class="footer-link">Témoignages</a></li>
            <li><a href="contact.html" class="footer-link">Contact</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">Contact</h4>
          <ul class="footer-links">
            <li><span class="footer-link">📍 Livry, Calvados (14)</span></li>
            <li><a href="tel:+33659949229" class="footer-link">📞 06 59 94 92 29</a></li>
            <li><a href="mailto:musicevolution144@gmail.com" class="footer-link">✉️ musicevolution144@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2025 MusicEvolution14. Tous droits réservés. <span style="margin: 0 10px;">|</span> <a href="mentions-legales.html" class="footer-link">Mentions Légales</a></p>
      </div>
    </div>
            `;
        }

        // Scroll to Top Button Injection
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-to-top';
        scrollTopBtn.innerHTML = '↑';
        scrollTopBtn.setAttribute('aria-label', 'Retour en haut');
        document.body.appendChild(scrollTopBtn);

        // Scroll to Top Logic
        scrollTopBtn.addEventListener('click', () => {
            if (typeof lenis !== 'undefined') {
                lenis.scrollTo(0);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Toggle Visibility on Scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
    }

    // Call Component Injection immediately
    injectComponents();


    // ============================================
    // Lenis Smooth Scroll
    // ============================================
    const lenis = new Lenis({
        duration: 0.8, // Reduced from 1.2 for faster response
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
    // Scroll effect on nav
    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (lastScrollY > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                ticking = false;
            });

            ticking = true;
        }
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
    const testimonials = document.querySelectorAll('.testimonials-slider .testimonial-card');
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
    // Gallery Filters & Lightbox (Advanced)
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxThumbnails = document.querySelector('.lightbox-thumbnails');

    let currentGalleryImages = []; // Stores currently visible images
    let currentIndex = 0;

    // Filter Logic
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
                    item.classList.add('visible'); // Marker for selector
                } else {
                    item.style.display = 'none';
                    item.classList.remove('visible');
                }
            });
        });
    });

    // Collect currently visible images
    function updateGalleryList() {
        let items = Array.from(document.querySelectorAll('.gallery-item'));

        // If no gallery items, check for mini-gallery items (Homepage)
        if (items.length === 0) {
            items = Array.from(document.querySelectorAll('.mini-gallery-item'));
        }

        // Filter visible items (check display style and if parent is hidden)
        const visibleItems = items.filter(item => {
            const style = window.getComputedStyle(item);
            return style.display !== 'none' && style.visibility !== 'hidden' && item.offsetParent !== null;
        });

        currentGalleryImages = visibleItems.map(item => {
            const img = item.querySelector('img');
            return {
                src: img.src,
                alt: img.alt
            };
        });

        // Regenerate thumbnails
        renderThumbnails();
    }

    // Render Thumbnails
    function renderThumbnails() {
        if (!lightboxThumbnails) return;
        lightboxThumbnails.innerHTML = '';

        currentGalleryImages.forEach((img, index) => {
            const thumb = document.createElement('img');
            thumb.src = img.src;
            thumb.alt = img.alt;
            thumb.classList.add('lightbox-thumbnail');
            if (index === currentIndex) thumb.classList.add('active');

            thumb.addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(index);
            });

            lightboxThumbnails.appendChild(thumb);
        });
    }

    function showImage(index) {
        if (currentGalleryImages.length === 0) return;

        // Loop interactions
        if (index < 0) index = currentGalleryImages.length - 1;
        if (index >= currentGalleryImages.length) index = 0;

        currentIndex = index;
        const imgData = currentGalleryImages[currentIndex];

        lightboxImg.src = imgData.src;
        lightboxImg.alt = imgData.alt;

        // Update thumbnails active state
        const thumbs = document.querySelectorAll('.lightbox-thumbnail');
        thumbs.forEach((t, i) => {
            if (i === currentIndex) {
                t.classList.add('active');
                t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                t.classList.remove('active');
            }
        });
    }

    // Open Lightbox
    document.querySelectorAll('.gallery-item, .mini-gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            // Refresh list in case filter changed
            updateGalleryList();

            const imgClicked = item.querySelector('img');
            // Find index in current list
            const index = currentGalleryImages.findIndex(img => img.src === imgClicked.src);

            if (index !== -1 && lightbox) {
                showImage(index);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    // Close Lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Lightbox Click Handler (Event Delegation)
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            // Close if clicked on background
            if (e.target === lightbox) {
                closeLightbox();
                return;
            }

            // Navigation: Prev
            if (e.target.matches('.lightbox-prev') || e.target.closest('.lightbox-prev')) {
                e.stopPropagation();
                showImage(currentIndex - 1);
                return;
            }

            // Navigation: Next
            if (e.target.matches('.lightbox-next') || e.target.closest('.lightbox-next')) {
                e.stopPropagation();
                showImage(currentIndex + 1);
                return;
            }
        });
    }

    // Keyboard Support
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });

    // ============================================
    // Form Validation (for contact.html)
    // ============================================
    // ============================================
    // Contact Form Handling (Standard submission for activation)
    // ============================================
    // The form in contact.html uses action="https://formsubmit.co/musicevolution144@gmail.com"

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default redirection

            // 1. Loading State
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Envoi en cours...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            if (formMessage) formMessage.style.display = 'none';

            // 2. Prepare Data
            const formData = new FormData(contactForm);

            // 3. Send Request via Fetch
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    return response.text().then(text => {
                        console.log('FormSubmit Raw Response:', text); // CRITICAL DEBUG LOG

                        try {
                            const data = JSON.parse(text);
                            if (response.ok) {
                                return data; // Request success
                            } else {
                                throw new Error(data.message || 'Erreur FormSubmit');
                            }
                        } catch (e) {
                            // If JSON parse fails but status is 200, it might be a success HTML page
                            if (response.ok) {
                                console.warn('Réponse non-JSON mais statut OK. On considère comme succès.');
                                return { success: true };
                            }
                            throw new Error('Réponse invalide (HTML probable - vérifier Console pour Raw Response)');
                        }
                    });
                })
                .then(data => {
                    // 4. Success State
                    console.log('Succès confirmé:', data);
                    contactForm.reset();
                    submitBtn.style.display = 'none';

                    if (formMessage) {
                        formMessage.style.display = 'block';
                        formMessage.style.color = 'var(--primary-accent)';
                        formMessage.innerHTML = `
                        <strong>Merci ! Votre message a bien été envoyé.</strong><br>
                        Un e-mail de confirmation vient de vous être envoyé.<br>
                        Nous vous répondrons sous 24h à 48h.
                    `;
                    }
                })
                .catch(error => {
                    // 6. Network/Logic Error State
                    console.error('Erreur finale:', error);
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';

                    if (formMessage) {
                        formMessage.style.display = 'block';
                        formMessage.style.color = '#ff4444'; // Red error
                        formMessage.innerText = "Une erreur est survenue. Vérifiez la console pour plus de détails.";
                    }
                });
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
            const lastname = document.getElementById('testimonial-lastname').value;
            const email = document.getElementById('testimonial-email').value; // Collected but not displayed publicly for privacy
            const date = document.getElementById('testimonial-date').value;
            const event = document.getElementById('testimonial-event').value;
            const rating = document.querySelector('input[name="rating"]:checked');
            const message = document.getElementById('testimonial-message').value;

            if (name && lastname && email && date && event && rating && message) {
                // Create new testimonial card
                const stars = '★'.repeat(parseInt(rating.value));
                // Format date roughly or just use as is
                const eventDate = new Date(date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

                const newTestimonial = document.createElement('div');
                newTestimonial.className = 'testimonial-card reveal active';
                newTestimonial.innerHTML = `
          <div class="testimonial-stars">${stars}</div>
          <p class="testimonial-text">"${message}"</p>
          <div class="testimonial-author">
            <span class="testimonial-name">${name} ${lastname}</span>
            <span class="testimonial-event">${event} - ${eventDate}</span>
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

    // ============================================
    // FAQ Accordion (for contact.html)
    // ============================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');

            // Toggle current item
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });



});
