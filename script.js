// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Open mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuOverlay.style.display = 'block';
            setTimeout(() => {
                mobileMenu.classList.add('active');
            }, 10);
        });
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        setTimeout(() => {
            mobileMenuOverlay.style.display = 'none';
        }, 300);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Close menu when clicking menu links
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});

// Cart Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartModal = document.getElementById('cartModal');
    const cartModalClose = document.getElementById('cartModalClose');
    const continueShopping = document.getElementById('continueShopping');
    const cartModalMessage = document.getElementById('cartModalMessage');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // Course data for cart functionality
    const courseData = {
        'web-dev': 'Complete Web Development Bootcamp',
        'data-science': 'Data Science with Python',
        'ux-ui': 'UX/UI Design Masterclass',
        'web-dev-bootcamp': 'Complete Web Development Bootcamp',
        'python-masterclass': 'Python Programming Masterclass',
        'react-redux': 'React & Redux Complete Guide',
        'ux-ui-masterclass': 'UX/UI Design Masterclass',
        'graphic-design': 'Graphic Design Fundamentals',
        'digital-marketing': 'Digital Marketing Strategy',
        'entrepreneurship': 'Entrepreneurship Essentials',
        'data-science-python': 'Data Science with Python',
        'machine-learning': 'Machine Learning Fundamentals',
        'content-marketing': 'Content Marketing Mastery',
        'photography-fundamentals': 'Photography Fundamentals',
        'personal-finance': 'Personal Finance Management',
        'productivity': 'Productivity & Time Management',
        'aws-cloud': 'Cloud Computing with AWS',
        'yoga-beginners': 'Yoga for Beginners',
        'guitar-mastery': 'Guitar Mastery Course',
        'spanish-beginners': 'Spanish for Beginners',
        'online-teaching': 'Online Teaching Essentials'
    };

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const courseId = this.getAttribute('data-course');
            const courseName = courseData[courseId] || 'Course';
            
            // Update modal message
            if (cartModalMessage) {
                cartModalMessage.textContent = `"${courseName}" has been added to your cart!`;
            }
            
            // Show modal
            if (cartModal) {
                cartModal.classList.add('active');
            }
            
            // Add visual feedback
            this.style.background = '#28a745';
            this.textContent = 'Added!';
            
            setTimeout(() => {
                this.style.background = '';
                if (this.classList.contains('price-label')) {
                    this.textContent = this.textContent.replace('Added!', this.textContent.includes('$') ? this.textContent : '$' + this.textContent);
                } else {
                    this.textContent = 'Add to Cart';
                }
            }, 2000);
            
            // Store in localStorage (simple cart simulation)
            let cart = JSON.parse(localStorage.getItem('learnspace_cart') || '[]');
            if (!cart.includes(courseId)) {
                cart.push(courseId);
                localStorage.setItem('learnspace_cart', JSON.stringify(cart));
            }
        });
    });

    // Close cart modal
    function closeCartModal() {
        if (cartModal) {
            cartModal.classList.remove('active');
        }
    }

    if (cartModalClose) {
        cartModalClose.addEventListener('click', closeCartModal);
    }

    if (continueShopping) {
        continueShopping.addEventListener('click', closeCartModal);
    }

    // Close modal when clicking overlay
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                closeCartModal();
            }
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(11, 44, 93, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = '#0b2c5d';
            nav.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
});

// Course card animations on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe course cards and other elements
    const animatedElements = document.querySelectorAll('.course-card, .category-card, .testimonial-card, .card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Search functionality (basic implementation)
document.addEventListener('DOMContentLoaded', function() {
    // Add search functionality if search input exists
    const searchInput = document.querySelector('.search-input');
    const courseCards = document.querySelectorAll('.course-card, .card');
    
    if (searchInput && courseCards.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            courseCards.forEach(card => {
                const title = card.querySelector('.course-title, h2')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.description, p')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Form validation (if forms exist)
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff6b6b';
                    
                    // Remove error styling after user starts typing
                    field.addEventListener('input', function() {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
});

// Loading state for buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-btn, .login-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Skip if it's an add to cart button (handled separately)
            if (this.classList.contains('add-to-cart-btn')) {
                return;
            }
            
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading (remove this in production)
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 1500);
        });
    });
});

// Keyboard navigation support
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard support for custom elements
    const interactiveElements = document.querySelectorAll('.course-card, .category-card, .topic-btn');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Error handling for missing images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder or hide
            this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            this.style.display = 'block';
            this.alt = 'Course Image';
        });
    });
});

