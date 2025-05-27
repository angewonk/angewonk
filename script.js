// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');
const header = document.querySelector('.header');
let lastScroll = 0;

// Handle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling with mobile header height adjustment
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations with mobile optimization
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                entry.target.classList.add('fade-in');
            });
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Observe all sections and cards for fade-in animation
document.querySelectorAll('.section, .card').forEach((element) => {
    element.classList.add('fade-in-hidden');
    fadeInObserver.observe(element);
});

// Add active state to navigation links based on scroll position
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: `-${header.offsetHeight}px 0px 0px 0px`
});

// Observe all sections for navigation highlighting
document.querySelectorAll('section[id]').forEach((section) => {
    navObserver.observe(section);
});

// Header scroll behavior with touch optimization
let scrollTimeout;

window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove header background
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScroll = currentScroll;
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll progress bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-hidden');
    observer.observe(section);
});

// Add fade-in animation to cards
document.querySelectorAll('.card').forEach(card => {
    card.classList.add('fade-in-hidden');
    observer.observe(card);
});

// Header scroll behavior
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        header.classList.remove('header-hidden');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Typing animation for hero section
const typingTexts = document.querySelectorAll('.typing-text');
typingTexts.forEach((text, index) => {
    text.style.opacity = '1';
});

// Project card hover effects
document.querySelectorAll('.project-content').forEach(card => {
    const icon = card.querySelector('i');
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        icon.style.transform = `translate(${x/20}px, ${y/20}px) rotate(5deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        icon.style.transform = 'translate(0, 0) rotate(0)';
    });
});

// Certificate hover animation
document.querySelectorAll('.cert-list li a').forEach(cert => {
    cert.addEventListener('mouseenter', () => {
        cert.style.transform = 'translateX(10px)';
    });
    
    cert.addEventListener('mouseleave', () => {
        cert.style.transform = 'translateX(0)';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}); 