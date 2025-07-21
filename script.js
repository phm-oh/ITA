// DOM Content Loaded
document.addEventListener('DOMContentLoaded',async function() {
   await initializeApp();
    loadConfigData();
    
    // Initialize page-specific functions
    initializePageSpecific();
});

// Initialize page-specific functions
function initializePageSpecific() {
    // Show basic info by default on data disclosure page
    if (window.location.pathname.includes('data-disclosure.html')) {
        setTimeout(() => {
            toggleCategory('basic-info');
        }, 500);
    }
    
    // Setup contact form if exists
    setupContactForm();
}

// Load Configuration Data
function loadConfigData() {
    if (typeof CONFIG === 'undefined') {
        console.error('Config not loaded!');
        return;
    }

    // Update page title and meta
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
        pageTitle.textContent = CONFIG.WEBSITE.TITLE + ' - ' + CONFIG.ORGANIZATION.NAME;
    }
    
    // Update organization info
    updateOrganizationInfo();
    
    // Update contact information
    updateContactInfo();

    // Update footer
    updateFooterInfo();

    // Handle assessment scores - เฉพาะหน้า index
    if (window.location.pathname.includes('index.html') || 
        window.location.pathname === '/' || 
        window.location.pathname === '') {
        handleAssessmentDisplay();
    }
}

// Update Organization Information
function updateOrganizationInfo() {
    const orgElements = {
        'org-name': CONFIG.ORGANIZATION.NAME,
        'org-name-en': CONFIG.ORGANIZATION.NAME_EN,
        'org-display': CONFIG.ORGANIZATION.NAME,
        'main-org-name': CONFIG.ORGANIZATION.NAME,
        'main-org-name-en': CONFIG.ORGANIZATION.NAME_EN,
        'about-org-name': CONFIG.ORGANIZATION.NAME,
        'about-org-name-en': CONFIG.ORGANIZATION.NAME_EN,
        'contact-org-name': CONFIG.ORGANIZATION.NAME,
        'org-type': CONFIG.ORGANIZATION.TYPE,
        'org-ministry': CONFIG.ORGANIZATION.MINISTRY,
        'contact-org-type': CONFIG.ORGANIZATION.TYPE,
        'contact-ministry': CONFIG.ORGANIZATION.MINISTRY,
        'current-year': `ปีงบประมาณ ${CONFIG.ASSESSMENT.CURRENT_YEAR_BE}`,
        'preparation-year': `ปีงบประมาณ ${CONFIG.ASSESSMENT.CURRENT_YEAR_BE}`
    };

    Object.entries(orgElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element && value) {
            element.textContent = value;
        }
    });
}

// Update Contact Information
function updateContactInfo() {
    const contactElements = {
        'contact-address': CONFIG.CONTACT.ADDRESS,
        'contact-location': CONFIG.CONTACT.LOCATION,
        'contact-phone': CONFIG.CONTACT.PHONE,
        'contact-fax': CONFIG.CONTACT.FAX,
        'contact-email': CONFIG.CONTACT.EMAIL,
        'contact-email-library': CONFIG.CONTACT.EMAIL_LIBRARY,
        'contact-website': CONFIG.CONTACT.WEBSITE.replace('https://', ''),
        'about-address': CONFIG.CONTACT.ADDRESS,
        'about-location': CONFIG.CONTACT.LOCATION,
        'about-phone': CONFIG.CONTACT.PHONE,
        'about-fax': CONFIG.CONTACT.FAX,
        'about-email': CONFIG.CONTACT.EMAIL,
        'about-email-library': CONFIG.CONTACT.EMAIL_LIBRARY,
        'about-website': CONFIG.CONTACT.WEBSITE.replace('https://', '')
    };

    Object.entries(contactElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element && value) {
            if (element.tagName === 'A') {
                if (id.includes('email')) {
                    element.href = `mailto:${value}`;
                    element.textContent = value;
                } else if (id.includes('website')) {
                    element.href = 'https://' + value;
                    element.textContent = value;
                }
            } else {
                element.textContent = value;
            }
        }
    });

    // Update map links
    const mapLinks = ['google-map-link', 'about-google-map-link'];
    mapLinks.forEach(id => {
        const element = document.getElementById(id);
        if (element && CONFIG.CONTACT.GOOGLE_MAP) {
            element.href = CONFIG.CONTACT.GOOGLE_MAP;
        }
    });
}

// Update Footer Information
function updateFooterInfo() {
    const footerElements = {
        'footer-org-name': CONFIG.ORGANIZATION.NAME,
        'footer-phone': CONFIG.CONTACT.PHONE,
        'footer-email': CONFIG.CONTACT.EMAIL,
        'footer-year': CONFIG.ASSESSMENT.CURRENT_YEAR_BE,
        'footer-org': CONFIG.ORGANIZATION.NAME
    };

    Object.entries(footerElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element && value) {
            element.textContent = value;
        }
    });
}

// Handle Assessment Score Display
function handleAssessmentDisplay() {
    const hasBeenAssessed = CONFIG.ASSESSMENT.HAS_BEEN_ASSESSED;
    const scoreSection = document.getElementById('score-section');
    const noAssessmentSection = document.getElementById('no-assessment-section');

    // ตรวจสอบว่า elements มีอยู่จริงหรือไม่
    if (!scoreSection && !noAssessmentSection) {
        console.log('Assessment display elements not found, skipping assessment setup');
        return;
    }

    if (hasBeenAssessed) {
        // Show score section
        if (scoreSection) {
            scoreSection.style.display = 'block';
        }
        if (noAssessmentSection) {
            noAssessmentSection.style.display = 'none';
        }

        // Update score data
        const scoreYearTitle = document.getElementById('score-year-title');
        const totalScore = document.getElementById('total-score');
        const gradeDisplay = document.getElementById('grade-display');
        const gradeText = document.getElementById('grade-text');

        if (scoreYearTitle) {
            scoreYearTitle.textContent = `ผลการประเมิน ปีงบประมาณ ${CONFIG.ASSESSMENT.LAST_ASSESSED_YEAR}`;
        }
        if (totalScore) {
            totalScore.textContent = CONFIG.ASSESSMENT.SCORES.TOTAL_SCORE;
        }
        if (gradeDisplay) {
            gradeDisplay.textContent = CONFIG.ASSESSMENT.SCORES.GRADE;
        }
        if (gradeText) {
            gradeText.textContent = CONFIG.ASSESSMENT.SCORES.GRADE_TEXT;
        }

        // Setup counter animation for score
        setupCounterAnimation();
    } else {
        // Show no assessment section
        if (scoreSection) {
            scoreSection.style.display = 'none';
        }
        if (noAssessmentSection) {
            noAssessmentSection.style.display = 'block';
        }
    }
}

// Initialize Application
async function initializeApp() {

    await new Promise(resolve => setTimeout(resolve, 50));

//    await loadNavigation();
    setupNavigation();
    setupScrollAnimations();
    setupSmoothScrolling();
    addLoadingAnimations();
    setupAccessibility();
    setupErrorHandling();
    updateDynamicContent();
    setupCardHoverEffects();
    setupBackToTop();
    setupScrollProgress();
}

// Navigation Setup
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    // ตั้งค่า active menu ตาม URL ปัจจุบัน
    setActiveMenu();
    
    // Add click handlers เฉพาะ anchor links
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        
        // เฉพาะ anchor links (#) เท่านั้นที่ใส่ event listener
        if (href && href.startsWith('#')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all nav items
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Get target section
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    scrollToElement(targetSection);
                }
            });
        }
        // ลิงค์ .html ให้ทำงานปกติโดยไม่ใส่ event listener
    });
    
    // Update active nav on scroll - เฉพาะในหน้าที่มี sections
    if (document.querySelectorAll('section[id]').length > 0) {
        window.addEventListener('scroll', updateActiveNavOnScroll);
    }
}

// ตั้งค่า active menu ตาม URL ปัจจุบัน
function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        
        // ตรวจสอบว่าเป็นหน้าปัจจุบันหรือไม่
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            item.classList.add('active');
        }
        
        // กรณีพิเศษสำหรับหน้าเฉพาะ
        if (currentPage === 'about-ita.html' && href === 'about-ita.html') {
            item.classList.add('active');
        }
        if (currentPage === 'data-disclosure.html' && href === 'data-disclosure.html') {
            item.classList.add('active');
        }
        if (currentPage === 'about.html' && href === 'about.html') {
            item.classList.add('active');
        }
        if (currentPage === 'itas-system.html' && href === 'itas-system.html') {
            item.classList.add('active');
        }
        if (currentPage === 'contact.html' && href === 'contact.html') {
            item.classList.add('active');
        }
    });
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // ตรวจสอบว่าเป็น anchor link จริงๆ และไม่ใช่ลิงค์ไปหน้าอื่น
            if (href.startsWith('#') && href.length > 1 && !href.includes('.html')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    scrollToElement(targetElement);
                }
            }
        });
    });
}

// Update Active Navigation on Scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
}

// Scroll to Element with Animation
function scrollToElement(element) {
    const headerOffset = 80;
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - headerOffset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Counter Animation for Score
function setupCounterAnimation() {
    const scoreElement = document.querySelector('.score-number');
    if (!scoreElement || !CONFIG.ASSESSMENT.HAS_BEEN_ASSESSED) {
        return;
    }
    
    const targetScore = CONFIG.ASSESSMENT.SCORES.TOTAL_SCORE;
    let currentScore = 0;
    const increment = targetScore / 100;
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        scoreElement.textContent = currentScore.toFixed(2);
    }, 20);
}

// Data Disclosure Functions
function toggleCategory(categoryId) {
    const category = document.getElementById(categoryId);
    if (!category) return;
    
    const content = category.querySelector('.category-content');
    const icon = category.querySelector('.toggle-icon');
    
    if (!content || !icon) return;
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.textContent = '▲';
        category.classList.add('active');
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
        category.classList.remove('active');
    }
}

// Copy location functions
function copyLocation() {
    const location = 'CQ5H+XPQ ตำบล บ้านเลื่อม อำเภอเมืองอุดรธานี อุดรธานี 41000';
    if (navigator.clipboard) {
        navigator.clipboard.writeText(location).then(() => {
            alert('คัดลอกตำแหน่งเรียบร้อยแล้ว');
        }).catch(() => {
            fallbackCopyToClipboard(location);
        });
    } else {
        fallbackCopyToClipboard(location);
    }
}

function copyLocationAbout() {
    copyLocation(); // ใช้ function เดียวกัน
}

// Fallback function for copying to clipboard
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert('คัดลอกตำแหน่งเรียบร้อยแล้ว');
    } catch (err) {
        alert('ไม่สามารถคัดลอกได้ กรุณาคัดลอกด้วยตนเอง');
    }
    document.body.removeChild(textArea);
}

// Contact form setup
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('ระบบจะพัฒนาการส่งอีเมลในอนาคต ขณะนี้กรุณาติดต่อผ่านช่องทางอื่น');
        });
    }
}

// Scroll Animations
function setupScrollAnimations() {
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
    const animatableElements = document.querySelectorAll(
        '.feature-card, .indicator-item, .link-card, .score-display'
    );
    
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

// Add Loading Animations
function addLoadingAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .feature-card,
        .indicator-item,
        .link-card,
        .score-display {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .loading-shimmer {
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.4), 
                transparent
            );
            animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);
}

// Add accessibility features
function setupAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'ข้ามไปเนื้อหา';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #dc143c;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 9999;
        border-radius: 4px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Enhanced error handling
function setupErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        console.log('Config Status:', typeof CONFIG !== 'undefined' ? 'Loaded' : 'Not Loaded');
    });
    
    // Check if config is properly loaded
    setTimeout(() => {
        if (typeof CONFIG === 'undefined') {
            console.warn('⚠️ Config not loaded - using fallback values');
        } else {
            console.log('✅ Config loaded successfully');
            displayConfigInfo();
        }
    }, 1000);
}

// Add dynamic year updates
function updateDynamicContent() {
    const currentYear = new Date().getFullYear() + 543; // Convert to Buddhist Era
    
    // Update copyright year if different from config
    const footerYear = document.getElementById('footer-year');
    if (footerYear && CONFIG && CONFIG.ASSESSMENT.CURRENT_YEAR_BE !== currentYear.toString()) {
        // You might want to use current year for copyright
        // footerYear.textContent = currentYear;
    }
}

// Config Display Function for Development
function displayConfigInfo() {
    if (typeof CONFIG !== 'undefined') {
        console.log('🏛️ Organization:', CONFIG.ORGANIZATION.NAME);
        console.log('📞 Contact:', CONFIG.CONTACT.PHONE);
        console.log('📧 Email:', CONFIG.CONTACT.EMAIL);
        console.log('📊 Assessment Status:', CONFIG.ASSESSMENT.HAS_BEEN_ASSESSED ? 'Assessed' : 'Not Assessed');
        console.log('📅 Current Year:', CONFIG.ASSESSMENT.CURRENT_YEAR_BE);
    }
}

// Add hover effects to cards
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .link-card, .indicator-item, .component-card, .benefit-item, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Progress Bar on Scroll
function setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #dc143c, #8b0000);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Back to Top Button
function setupBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #dc143c, #8b0000);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(220, 20, 60, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Show loading screen with organization name
function showLoadingScreen() {
    // Try to get organization name from config, fallback if not available
    let orgName = 'วิทยาลัยอาชีวศึกษาอุดรธานี'; // Default fallback
    
    // Wait a bit for config to load, then try to get the name
    setTimeout(() => {
        if (typeof CONFIG !== 'undefined') {
            orgName = CONFIG.ORGANIZATION.NAME;
            const loadingOrgEl = document.querySelector('.loading-org');
            if (loadingOrgEl) {
                loadingOrgEl.textContent = orgName;
            }
        }
    }, 100);
    
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">ITA</div>
            <div class="loading-text">กำลังโหลด...</div>
            <div class="loading-org">${orgName}</div>
            <div class="loading-spinner"></div>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #dc143c, #8b0000);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        .loading-content {
            text-align: center;
        }
        
        .loading-logo {
            font-size: 4rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .loading-text {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }
        
        .loading-org {
            font-size: 1rem;
            margin-bottom: 2rem;
            opacity: 0.8;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .skip-link:focus {
            top: 6px !important;
        }
    `;
    
    document.head.appendChild(loadingStyles);
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
                loadingStyles.remove();
            }, 500);
        }, 1500);
    });
}

// Show loading screen
showLoadingScreen();

// Enhanced Performance Monitoring
function logPerformance() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page Load Time: ${loadTime}ms`);
            
            if (typeof CONFIG !== 'undefined') {
                console.log(`🏛️ Loaded for: ${CONFIG.ORGANIZATION.NAME}`);
                console.log(`📅 Assessment Year: ${CONFIG.ASSESSMENT.CURRENT_YEAR_BE}`);
            }
        }, 0);
    });
}


async function loadNavigation() {
    return new Promise(async (resolve) => {
        try {
            const response = await fetch('navmenu.html');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const navHTML = await response.text();
            const navContainer = document.getElementById('nav-container');
            
            if (navContainer) {
                navContainer.innerHTML = navHTML;
                setActiveMenu();
                resolve(true);
            }
        } catch (error) {
            console.error('Error loading navigation:', error);
            // Fallback navigation
            const navContainer = document.getElementById('nav-container');
            if (navContainer) {
                navContainer.innerHTML = `
                    <nav class="nav-bar">
                        <div class="container">
                            <div class="nav-menu">
                                <a href="index.html" class="nav-item">หน้าแรก</a>
                                <a href="about-ita.html" class="nav-item">เกี่ยวกับ ITA</a>
                                <a href="itas-system.html" class="nav-item">ระบบ ITAS</a>
                                <a href="data-disclosure.html" class="nav-item">เปิดเผยข้อมูล</a>
                                <a href="about.html" class="nav-item">ติดต่อ</a>
                            </div>
                        </div>
                    </nav>
                `;
                setActiveMenu();
            }
            resolve(false);
        }
    });
}







// Initialize performance monitoring
logPerformance();