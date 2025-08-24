// ===== GLOBAL VARIABLES =====
let currentTheme = 'light';
let currentLanguage = 'en';
let isMenuOpen = false;
let isChatOpen = false;

// ===== DOM ELEMENTS =====
const loadingScreen = document.getElementById('loading-screen');
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const languageToggle = document.getElementById('language-toggle');
const backToTop = document.getElementById('back-to-top');
const chatWidget = document.getElementById('chat-widget');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    handleLoadingScreen();
    initializeScrollEffects();
    initializeAnimations();
});

// ===== WEBSITE INITIALIZATION =====
function initializeWebsite() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeToggle();
    }

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        updateLanguageToggle();
    }

    // Initialize forms
    initializeForms();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize intersection observer for animations
    initializeIntersectionObserver();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Language toggle
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }

    // Scroll events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Service cards hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', handleServiceCardHover);
        card.addEventListener('mouseleave', handleServiceCardLeave);
    });

    // Doctor cards hover effects
    const doctorCards = document.querySelectorAll('.doctor-card');
    doctorCards.forEach(card => {
        card.addEventListener('mouseenter', handleDoctorCardHover);
        card.addEventListener('mouseleave', handleDoctorCardLeave);
    });
}

// ===== LOADING SCREEN =====
function handleLoadingScreen() {
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
}

// ===== NAVIGATION =====
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (navMenu && navToggle) {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    if (isMenuOpen) {
        isMenuOpen = false;
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// ===== THEME TOGGLE =====
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeToggle();
}

function updateThemeToggle() {
    const themeIcon = document.querySelector('.theme-toggle__icon');
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
}

// ===== LANGUAGE TOGGLE =====
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', currentLanguage);
    updateLanguageToggle();
    // Here you would implement actual language switching logic
}

function updateLanguageToggle() {
    const languageText = document.querySelector('.language-toggle__text');
    if (languageText) {
        languageText.textContent = currentLanguage === 'en' ? 'عربي' : 'English';
    }
}

// ===== SCROLL EFFECTS =====
function handleScroll() {
    const scrollY = window.scrollY;
    
    // Header scroll effect
    if (header) {
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Back to top button
    if (backToTop) {
        if (scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    }
    
    // Update active navigation link
    updateActiveNavLink();
}

function handleResize() {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                closeMobileMenu();
            }
        });
    });
}

function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== ACTIVE NAVIGATION =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== BOOKING MODAL =====
function openBookingModal(location = null) {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (location) {
            // Pre-select location if specified
            setTimeout(() => {
                selectLocation(location);
            }, 100);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function selectLocation(location) {
    closeModal('booking-modal');
    
    // Scroll to the appropriate booking form
    const targetForm = location === 'belladent' ? 'belladent-form' : 'hmrt-form';
    const formElement = document.getElementById(targetForm);
    
    if (formElement) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = formElement.offsetTop - headerHeight - 50;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Highlight the form briefly
        formElement.style.boxShadow = '0 0 20px rgba(0, 188, 212, 0.3)';
        setTimeout(() => {
            formElement.style.boxShadow = '';
        }, 2000);
    }
}

// ===== VIRTUAL CONSULTATION =====
function openVirtualConsultation() {
    // This would open a virtual consultation booking system
    alert('Virtual consultation booking will be available soon! Please call us directly for now.');
}

// ===== DOCTOR PROFILES =====
function openDoctorProfile(doctorId) {
    // This would open a detailed doctor profile modal
    alert(`Dr. ${getDoctorName(doctorId)} profile will be available soon!`);
}

function bookWithDoctor(doctorId) {
    // Pre-fill booking form with doctor selection
    openBookingModal();
    // Here you would pre-select the doctor in the booking form
}

function getDoctorName(doctorId) {
    const doctorNames = {
        'yarub': 'Yarub Al Shammary',
        'mays': 'Mays Aljbori',
        'khaled': 'Khaled Shbair',
        'abeer': 'Abeer Awni',
        'kamil': 'Kamil Kak Mohiddina',
        'mustafa': 'Mustafa Dogramaci'
    };
    return doctorNames[doctorId] || 'Doctor';
}

// ===== SERVICE INTERACTIONS =====
function bookService(serviceId) {
    openBookingModal();
    // Here you would pre-select the service in the booking form
}

function learnMore(serviceId) {
    // This would open detailed service information
    alert(`More information about ${getServiceName(serviceId)} will be available soon!`);
}

function getServiceName(serviceId) {
    const serviceNames = {
        'veneers': 'Dental Veneers',
        'digital-dentistry': 'Advanced Digital Dentistry',
        'botox': 'BOTOX in Dentistry',
        'orthodontics': 'Orthodontics (Braces)',
        'clear-aligners': 'Clear Aligners',
        'teeth-whitening': 'Teeth Whitening',
        'dental-implant': 'Dental Implants',
        'facial-pain': 'Facial Pain Treatment',
        'digital-xray': 'Digital X-ray'
    };
    return serviceNames[serviceId] || 'Service';
}

// ===== DIRECTIONS =====
function openDirections(location) {
    const addresses = {
        'belladent': 'Sheikh Zayed Road Al Safa 1 Matloob Building 207, Dubai',
        'hmrt': 'Al Nahda 1 Mai tower 1107, Dubai'
    };
    
    const address = addresses[location];
    if (address) {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(googleMapsUrl, '_blank');
    }
}

// ===== VIDEO PLAYER =====
function playVideo(videoId) {
    // This would open a video player modal
    alert('Video player will be available soon!');
}

// ===== CHAT WIDGET =====
function toggleChat() {
    isChatOpen = !isChatOpen;
    if (chatWidget) {
        chatWidget.classList.toggle('active');
    }
}

function startWhatsAppChat(location) {
    const phoneNumbers = {
        'bella': '971585881325',
        'hmrt': '971567790202'
    };
    
    const phoneNumber = phoneNumbers[location];
    if (phoneNumber) {
        const message = encodeURIComponent('Hello! I would like to book an appointment.');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }
    
    toggleChat();
}

function callEmergency() {
    window.open('tel:+971585881325', '_self');
    toggleChat();
}

// ===== FORM HANDLING =====
function initializeForms() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Add real-time validation
        const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<span class="spinner"></span> Booking...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Appointment request submitted successfully! We will contact you soon.', 'success');
        
        // Reset form
        form.reset();
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    clearFieldError({ target: field });
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    // Validate email
    else if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    // Validate phone
    else if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('.hero__text, .hero__image, .location-card, .award-card, .doctor-card, .service-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll('.feature, .stat, .payment-option');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

function initializeScrollEffects() {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// ===== CARD HOVER EFFECTS =====
function handleServiceCardHover(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(-10px) scale(1.02)';
}

function handleServiceCardLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0) scale(1)';
}

function handleDoctorCardHover(e) {
    const card = e.currentTarget;
    const overlay = card.querySelector('.doctor-card__overlay');
    if (overlay) {
        overlay.style.opacity = '1';
    }
}

function handleDoctorCardLeave(e) {
    const card = e.currentTarget;
    const overlay = card.querySelector('.doctor-card__overlay');
    if (overlay) {
        overlay.style.opacity = '0';
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send error reports to your analytics service here
});

// ===== PERFORMANCE OPTIMIZATION =====
// Optimize scroll and resize events
const optimizedScroll = throttle(handleScroll, 16);
const optimizedResize = debounce(handleResize, 250);

window.removeEventListener('scroll', handleScroll);
window.removeEventListener('resize', handleResize);
window.addEventListener('scroll', optimizedScroll);
window.addEventListener('resize', optimizedResize);

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
        
        if (isChatOpen) {
            toggleChat();
        }
        
        if (isMenuOpen) {
            closeMobileMenu();
        }
    }
    
    // Navigate with arrow keys in mobile menu
    if (isMenuOpen && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        const navLinks = document.querySelectorAll('.nav__link');
        const currentIndex = Array.from(navLinks).findIndex(link => link === document.activeElement);
        
        if (e.key === 'ArrowDown') {
            const nextIndex = (currentIndex + 1) % navLinks.length;
            navLinks[nextIndex].focus();
        } else {
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : navLinks.length - 1;
            navLinks[prevIndex].focus();
        }
    }
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.openBookingModal = openBookingModal;
window.closeModal = closeModal;
window.selectLocation = selectLocation;
window.openVirtualConsultation = openVirtualConsultation;
window.openDoctorProfile = openDoctorProfile;
window.bookWithDoctor = bookWithDoctor;
window.bookService = bookService;
window.learnMore = learnMore;
window.openDirections = openDirections;
window.playVideo = playVideo;
window.toggleChat = toggleChat;
window.startWhatsAppChat = startWhatsAppChat;
window.callEmergency = callEmergency;
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
