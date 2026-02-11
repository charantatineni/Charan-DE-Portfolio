// ==========================================
// INTERSECTION OBSERVER - REVEAL ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Staggered animation for child elements
            const children = entry.target.querySelectorAll('[class*="card-delay"]');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all reveal sections
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => observer.observe(el));

// ==========================================
// RESUME MODAL
// ==========================================
const resumeBtn = document.getElementById('resumeBtn');
const resumeModal = document.getElementById('resumeModal');

function openResume() {
    if (!resumeModal) return;
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (resumeBtn) {
    resumeBtn.addEventListener('click', openResume);
}

if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
        if (e.target.dataset.close === 'true') closeResume();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeResume();
});

// ==========================================
// TYPEWRITER CONTACT LINKS (CODE BLOCK)
// ==========================================
const contactCode = document.getElementById('contact-code');
if (contactCode) {
    const template = `const CONTACT = {\n  mail: '[[MAIL]]',\n  linkedin: '[[LINKEDIN]]',\n  github: '[[GITHUB]]',\n  web: '[[WEB]]'\n};`;

    const rendered = template
        .replace('[[WEB]]', '<a href="https://tatineni.dev" target="_blank" rel="noopener">tatineni.dev</a>')
        .replace('[[MAIL]]', '<a href="mailto:charantatineni11@gmail.com">charantatineni11@gmail.com</a>')
        .replace('[[LINKEDIN]]', '<a href="https://linkedin.com/in/charantatineni" target="_blank" rel="noopener">linkedin.com/in/charantatineni</a>')
        .replace('[[GITHUB]]', '<a href="https://github.com/charantatineni" target="_blank" rel="noopener">github.com/charantatineni</a>');

    let i = 0;
    let typingStarted = false;

    function typeNext() {
        if (i <= template.length) {
            contactCode.textContent = template.slice(0, i);
            i += 1;
            setTimeout(typeNext, 14);
        } else {
            contactCode.innerHTML = rendered;
        }
    }

    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typingStarted) {
                typingStarted = true;
                typeNext();
            }
        });
    }, { threshold: 0.3 });

    codeObserver.observe(contactCode);
}

// Initialize card animations
const cardElements = document.querySelectorAll('[class*="card-delay"]');
cardElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
});

// ==========================================
// HOVER PHYSICS - ENHANCED INTERACTIONS
// ==========================================

// Experience Cards
const experienceCards = document.querySelectorAll('.experience-card');
experienceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        this._rect = this.getBoundingClientRect();
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this._rect;
        if (!rect) return;
        this._mx = e.clientX;
        this._my = e.clientY;
        if (this._raf) return;
        this._raf = requestAnimationFrame(() => {
            const x = this._mx - rect.left;
            const y = this._my - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            this._raf = null;
        });
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        this._rect = null;
    });
});

// Skill Categories
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.2s ease-out';
        this.classList.add('tilt-glow');
        this._rect = this.getBoundingClientRect();
    });
    
    category.addEventListener('mousemove', function(e) {
        const rect = this._rect;
        if (!rect) return;
        this._mx = e.clientX;
        this._my = e.clientY;
        if (this._raf) return;
        this._raf = requestAnimationFrame(() => {
            const x = this._mx - rect.left;
            const y = this._my - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            this._raf = null;
        });
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        this.classList.remove('tilt-glow');
        this._rect = null;
    });
});

// Contact Cards
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-icon');
        icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        icon.style.transform = 'rotate(10deg) scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.contact-icon');
        icon.style.transform = 'rotate(0deg) scale(1)';
    });
});

// ==========================================
// BUTTON INTERACTIONS
// ==========================================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 0, 0, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// TYPING EFFECT FOR CODE BLOCK (OPTIONAL)
// ==========================================
const codeBlock = document.querySelector('.code-block code');
if (codeBlock) {
    const originalText = codeBlock.textContent;
    codeBlock.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 15;
    
    // Only trigger typing when code block is visible
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && charIndex === 0) {
                typeText();
            }
        });
    }, { threshold: 0.5 });
    
    codeObserver.observe(codeBlock);
    
    function typeText() {
        if (charIndex < originalText.length) {
            codeBlock.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        }
    }
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations here
    });
});

// ==========================================
// EASTER EGG - KONAMI CODE
// ==========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Rainbow mode
    const body = document.body;
    const colors = ['#FF90E8', '#23A6F0', '#F9D72F', '#00E055'];
    let colorIndex = 0;
    
    const rainbowInterval = setInterval(() => {
        body.style.background = colors[colorIndex % colors.length];
        colorIndex++;
    }, 200);
    
    setTimeout(() => {
        clearInterval(rainbowInterval);
        body.style.background = '#FFFFFF';
    }, 3000);
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '🎉 DATA PIPELINE ACTIVATED! 🎉';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '3rem';
    message.style.fontFamily = 'Anton';
    message.style.color = '#000';
    message.style.background = '#F9D72F';
    message.style.padding = '2rem 4rem';
    message.style.border = '4px solid #000';
    message.style.zIndex = '10001';
    message.style.animation = 'bounce 0.5s ease infinite';
    
    document.body.appendChild(message);
    
    setTimeout(() => message.remove(), 3000);
}

// Add bounce animation for easter egg
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
    }
`;
document.head.appendChild(bounceStyle);

// ==========================================
// INITIALIZE
// ==========================================
console.log('%c⚡ PORTFOLIO INITIALIZED ⚡', 'font-size: 20px; font-weight: bold; color: #F9D72F; background: #000; padding: 10px;');
console.log('%cBuilt with Precision • Designed for Impact', 'font-size: 12px; color: #23A6F0;');
console.log('%c📊 Ready to process 1B+ records/week', 'font-size: 12px; color: #00E055;');
console.log('%c💼 Charan Tatineni - Data Engineer', 'font-size: 12px; color: #FF90E8;');
