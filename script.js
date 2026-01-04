/* ================================================
   LIONEL LUBIN - PREMIUM FITNESS COACHING WEBSITE
   JAVASCRIPT - INTERACTIVE FEATURES
   ================================================ */

/**
 * Initialize all JavaScript functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeButtons();
    initializeEmailForm();
    initializeScrollReveal();
    initializeScrollAnimation();
});

/* ================================================
   NAVIGATION MENU
   ================================================ */

/**
 * Initialize navigation functionality
 * - Hamburger menu toggle
 * - Active nav link styling
 * - Navbar shadow on scroll
 * - Mobile menu closing
 */
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    const navbar = document.getElementById('navbar');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Add scroll listener for navbar styling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Prevent scrolling when mobile menu is open
    navMenu.addEventListener('click', function(e) {
        if (e.target !== navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ================================================
   BUTTON HANDLERS
   ================================================ */

/**
 * Initialize all button click handlers
 * - CTA buttons with data-action attributes
 * - Smooth scroll to sections
 * - External link handling
 */
function initializeButtons() {
    const buttons = document.querySelectorAll('[data-action]');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');

            // Map actions to their respective handlers
            switch(action) {
                case 'skool':
                    handleSkoolCTA();
                    break;
                case 'coaching':
                    smoothScroll('#coaching');
                    break;
                case 'training':
                    handleTrainingCTA();
                    break;
                case 'nutrition':
                    handleNutritionCTA();
                    break;
                case 'courses':
                    smoothScroll('#courses');
                    break;
                case 'course1':
                case 'course2':
                case 'course3':
                    handleCoursePurchase(action);
                    break;
                case 'shop':
                    handleShopCTA();
                    break;
                default:
                    console.log('Action not recognized:', action);
            }
        });
    });
}

/**
 * Handle Skool Community CTA
 * In production, this would redirect to Skool community link
 */
function handleSkoolCTA() {
    console.log('Skool Community CTA clicked');
    // Placeholder - Replace with actual Skool community URL
    const skoolURL = '#'; // Replace with: https://skool.com/lionel
    
    // For demo purposes, show alert
    showNotification('🎯 Redirecting to Skool Community...', 'info');
    
    // In production:
    // window.location.href = skoolURL;
}

/**
 * Handle Training CTA
 */
function handleTrainingCTA() {
    console.log('Personal Training CTA clicked');
    smoothScroll('#coaching');
    showNotification('📧 Training inquiry form would be here', 'info');
}

/**
 * Handle Nutrition CTA
 */
function handleNutritionCTA() {
    console.log('Nutrition Coaching CTA clicked');
    smoothScroll('#coaching');
    showNotification('📧 Nutrition inquiry form would be here', 'info');
}

/**
 * Handle Course Purchase
 * @param {string} courseId - The course identifier
 */
function handleCoursePurchase(courseId) {
    console.log('Course purchase:', courseId);
    showNotification('🎓 Redirecting to course checkout...', 'info');
    // In production, integrate with payment processor (Stripe, Gumroad, etc.)
}

/**
 * Handle Shop BRANDED LLC CTA
 */
function handleShopCTA() {
    console.log('Shop BRANDED LLC CTA clicked');
    showNotification('🛍️ Shop feature coming soon!', 'info');
    // In production: window.location.href = 'https://shop.brandedllc.com';
}

/* ================================================
   EMAIL FORM SUBMISSION
   ================================================ */

/**
 * Initialize email form functionality
 */
function initializeEmailForm() {
    const emailForm = document.getElementById('emailForm');

    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEmailSubmission(this);
        });
    }
}

/**
 * Handle email form submission
 * @param {HTMLFormElement} form - The form element
 */
function handleEmailSubmission(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    // Basic email validation
    if (!isValidEmail(email)) {
        showNotification('❌ Please enter a valid email address', 'error');
        return;
    }

    // Show success message
    showNotification('✅ Thanks for subscribing! Check your email.', 'success');

    // Clear form
    emailInput.value = '';

    // In production, send email to backend/email service
    console.log('Email submitted:', email);
    submitEmailToBackend(email);
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Submit email to backend
 * @param {string} email - Email address
 */
function submitEmailToBackend(email) {
    // Placeholder for backend integration
    // In production, this would send data to your API
    /*
    fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
    */
}

/* ================================================
   SCROLL REVEAL ANIMATION
   ================================================ */

/**
 * Initialize scroll reveal animation
 * Elements with .reveal class fade in as they enter viewport
 */
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.service-card, .course-card, .testimonial-card, .apparel-card'
    );

    // Add reveal class to all elements
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    // Create intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Initialize scroll animations for hero and section headers
 */
function initializeScrollAnimation() {
    // Animate hero content
    animateHeroOnLoad();

    // Animate section headers on scroll
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('reveal');
    });

    const observerOptions = {
        threshold: 0.3,
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    sectionHeaders.forEach(header => observer.observe(header));
}

/**
 * Animate hero section on page load
 */
function animateHeroOnLoad() {
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        // Hero content is already animated via CSS
        // This function can be extended for additional effects
    }
}

/* ================================================
   SMOOTH SCROLLING
   ================================================ */

/**
 * Smooth scroll to a target element
 * @param {string} selector - CSS selector of target element
 */
function smoothScroll(selector) {
    const target = document.querySelector(selector);
    
    if (target) {
        const offsetTop = target.offsetTop - 100; // Account for sticky nav
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

/* ================================================
   NOTIFICATION SYSTEM
   ================================================ */

/**
 * Show a temporary notification message
 * @param {string} message - Message to display
 * @param {string} type - Notification type: 'info', 'success', 'error'
 * @param {number} duration - Duration in milliseconds
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles if not already defined
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                bottom: 24px;
                right: 24px;
                padding: 16px 24px;
                border-radius: 8px;
                font-weight: 500;
                z-index: 9999;
                animation: slideIn 0.3s ease-out;
                max-width: 90%;
            }

            .notification-info {
                background-color: #2196F3;
                color: white;
            }

            .notification-success {
                background-color: #4CAF50;
                color: white;
            }

            .notification-error {
                background-color: #FF6B35;
                color: white;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            @media (max-width: 480px) {
                .notification {
                    bottom: 16px;
                    right: 16px;
                    left: 16px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Auto-remove after duration
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

/* ================================================
   UTILITY FUNCTIONS
   ================================================ */

/**
 * Throttle function - limits how often a function can be called
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Debounce function - delays function execution
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, delay) {
    let timeout;
    return function() {
        const args = arguments;
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

/* ================================================
   ANALYTICS & TRACKING
   ================================================ */

/**
 * Track button clicks for analytics
 * In production, integrate with Google Analytics or similar
 */
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    
    // Example Google Analytics integration:
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    */
}

/* ================================================
   PERFORMANCE OPTIMIZATION
   ================================================ */

/**
 * Lazy load images (placeholder for future implementation)
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

/* ================================================
   ACCESSIBILITY ENHANCEMENTS
   ================================================ */

/**
 * Enhance keyboard navigation
 */
function initializeKeyboardNav() {
    document.addEventListener('keydown', function(e) {
        // Skip to main content with '/' key
        if (e.key === '/') {
            e.preventDefault();
            const mainContent = document.querySelector('main') || document.querySelector('section');
            if (mainContent) {
                mainContent.focus();
            }
        }
    });
}

/* ================================================
   MOBILE DETECTION
   ================================================ */

/**
 * Detect if user is on mobile device
 * @returns {boolean} - True if mobile
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/* ================================================
   DARK MODE DETECTION
   ================================================ */

/**
 * Detect system dark mode preference
 * @returns {boolean} - True if dark mode preferred
 */
function prefersDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/* ================================================
   INITIALIZATION
   ================================================ */

// Log initialization
console.log('Lionel Lubin - Premium Fitness Coaching Website');
console.log('Initialized successfully');

// Track page view
trackEvent('page_view', {
    page_title: document.title,
    page_path: window.location.pathname
});
