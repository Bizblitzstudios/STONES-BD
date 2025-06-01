// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: function() {
                preloader.style.display = 'none';
                document.body.classList.remove('preload');
            }
        });
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Mega menu
    const megaMenus = document.querySelectorAll('.mega-menu');
    megaMenus.forEach(menu => {
        const link = menu.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                menu.classList.toggle('active');
                
                // Close other mega menus
                megaMenus.forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Hero slider
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelector('.slider-dots');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        let currentSlide = 0;
        let slideInterval;
        
        // Create dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dots.appendChild(dot);
        });
        
        // Start autoplay
        function startSlider() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }
        
        function prevSlide() {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        }
        
        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            document.querySelectorAll('.slider-dot')[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            document.querySelectorAll('.slider-dot')[currentSlide].classList.add('active');
            
            // Reset autoplay timer
            clearInterval(slideInterval);
            startSlider();
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Start the slider
        startSlider();
        
        // Pause on hover
        heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSlider.addEventListener('mouseleave', startSlider);
    }
    
    // Services tabs
    const tabs = document.querySelector('.services-tabs');
    if (tabs) {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding tab pane
                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Video play button
    const videoPlayBtn = document.querySelector('.video-play-button');
    if (videoPlayBtn) {
        videoPlayBtn.addEventListener('click', function() {
            const videoContainer = this.closest('.video-container');
            const videoIframe = document.createElement('iframe');
            
            videoIframe.setAttribute('src', 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1');
            videoIframe.setAttribute('frameborder', '0');
            videoIframe.setAttribute('allowfullscreen', '');
            videoIframe.style.width = '100%';
            videoIframe.style.height = '100%';
            
            const videoPoster = this.closest('.video-poster');
            videoPoster.innerHTML = '';
            videoPoster.appendChild(videoIframe);
        });
    }
    
    // Testimonials slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const testimonialDots = document.querySelector('.testimonial-dots');
        const testimonialPrev = document.querySelector('.testimonial-prev');
        const testimonialNext = document.querySelector('.testimonial-next');
        
        let currentTestimonial = 0;
        let testimonialInterval;
        
        // Create dots
        testimonialSlides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            testimonialDots.appendChild(dot);
        });
        
        // Start autoplay
        function startTestimonialSlider() {
            testimonialInterval = setInterval(nextTestimonial, 6000);
        }
        
        function nextTestimonial() {
            goToTestimonial((currentTestimonial + 1) % testimonialSlides.length);
        }
        
        function prevTestimonial() {
            goToTestimonial((currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length);
        }
        
        function goToTestimonial(index) {
            testimonialSlides[currentTestimonial].classList.remove('active');
            document.querySelectorAll('.testimonial-dot')[currentTestimonial].classList.remove('active');
            
            currentTestimonial = index;
            
            testimonialSlides[currentTestimonial].classList.add('active');
            document.querySelectorAll('.testimonial-dot')[currentTestimonial].classList.add('active');
            
            // Reset autoplay timer
            clearInterval(testimonialInterval);
            startTestimonialSlider();
        }
        
        // Event listeners
        if (testimonialNext) testimonialNext.addEventListener('click', nextTestimonial);
        if (testimonialPrev) testimonialPrev.addEventListener('click', prevTestimonial);
        
        // Start the slider
        startTestimonialSlider();
        
        // Pause on hover
        testimonialsSlider.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
        testimonialsSlider.addEventListener('mouseleave', startTestimonialSlider);
    }
    
    // Modal
    const modal = document.getElementById('requestQuoteModal');
    if (modal) {
        const modalTriggers = document.querySelectorAll('[data-modal="quote"]');
        const modalClose = document.querySelector('.modal-close');
        
        function openModal() {
            modal.classList.add('active');
            document.body.classList.add('no-scroll');
        }
        
        function closeModal() {
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', openModal);
        });
        
        if (modalClose) modalClose.addEventListener('click', closeModal);
        
        // Close when clicking outside modal content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--danger)';
                    isValid = false;
                    
                    // Add error message
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'This field is required';
                        errorMsg.style.color = 'var(--danger)';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.marginTop = '0.25rem';
                        field.after(errorMsg);
                    }
                } else {
                    field.style.borderColor = '';
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = this.querySelector('[required]:invalid');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize elements with AOS
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Stats counter animation
    const statsSection = document.querySelector('.stats-bar');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = document.querySelectorAll('.stat-number');
                    const speed = 200;
                    
                    counters.forEach(counter => {
                        const animate = () => {
                            const value = +counter.getAttribute('data-count');
                            const data = +counter.innerText;
                            const time = value / speed;
                            
                            if (data < value) {
                                counter.innerText = Math.ceil(data + time);
                                setTimeout(animate, 1);
                            } else {
                                counter.innerText = value;
                            }
                        };
                        
                        animate();
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                gsap.to(icon, {
                    rotationY: 180,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: function() {
                        gsap.to(icon, {
                            rotationY: 0,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                });
            }
        });
    });
    
    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.from(heroContent, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });
    }
    
    // Parallax effects
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.2;
        
        gsap.to(element, {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: element.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.style.display = 'none';
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Add CSS for scroll to top button
    const scrollToTopCSS = `
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            opacity: 0.7;
        }
        
        .scroll-to-top:hover {
            opacity: 1;
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
    `;
    
    const style = document.createElement('style');
    style.innerHTML = scrollToTopCSS;
    document.head.appendChild(style);
});
