// Language Configuration
const languages = {
    en: {
        currency: '£',
        currencyMultiplier: 0.8,
        priceRanges: {
            'basic': '£319-£559',
            'pro': '£559-£799',
            'premium': '£799-£1,199',
            'custom': '£1,199+'
        },
        navbar: {
            home: 'Home',
            landing: 'Landing',
            products: 'Products',
            aiRecommend: 'AI Recommend',
            about: 'About Us',
            contact: 'Contact'
        },
        footer: {
            description: 'Shimo is committed to creating healthy and comfortable work environments through innovative technology, providing professional smart desk solutions to improve office experience.',
            quickLinks: 'Quick Links',
            aboutUs: 'About Us',
            contactUs: 'Contact Us',
            links: {
                products: 'Product Series',
                aiRecommend: 'AI Recommend',
                blog: 'Healthy Office Blog',
                faq: 'FAQ',
                warranty: 'Warranty Policy',
                company: 'Company Profile',
                team: 'Our Team',
                careers: 'Join Us',
                news: 'News'
            },
            address: '',
            copyright: '© 2024 Shimo Smart Technology Co., Ltd. All rights reserved.'
        }
    },
    de: {
        navbar: {
            home: 'Startseite',
            landing: 'Landingseite',
            products: 'Produkte',
            aiRecommend: 'KI-Empfehlung',
            about: 'Über uns',
            contact: 'Kontakt'
        },
        footer: {
            description: 'Shimo ist bestrebt, durch innovative Technologie gesunde und komfortable Arbeitsumgebungen zu schaffen und professionelle intelligente Schreibtischlösungen anzubieten, um das Büroerlebnis zu verbessern.',
            quickLinks: 'Schnelllinks',
            aboutUs: 'Über uns',
            contactUs: 'Kontakt',
            links: {
                products: 'Produktserie',
                aiRecommend: 'KI-Empfehlung',
                blog: 'Gesundes Büro Blog',
                faq: 'Häufige Fragen',
                warranty: 'Garantierichtlinie',
                company: 'Unternehmensprofil',
                team: 'Unser Team',
                careers: 'Karriere',
                news: 'Nachrichten'
            },
            address: 'Zhangjiang Hi-Tech Park, Pudong New Area, Shanghai',
            copyright: '© 2024 Shimo Smart Technology Co., Ltd. Alle Rechte vorbehalten.'
        }
    }
};

// Get Current Language
function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('-de.html')) {
        return 'de';
    } else {
        return 'en'; // Default to English
    }
}

// Get Text for Current Language
function getText(key) {
    const lang = getCurrentLanguage();
    const keys = key.split('.');
    let text = languages[lang];
    
    for (const k of keys) {
        text = text[k];
        if (!text) break;
    }
    
    return text || key;
}

document.addEventListener('DOMContentLoaded', function() {
    // 加载导航栏
    loadNavbar();
    
    // 加载页脚
    loadFooter();
    
    // 初始化语言切换器
    initLanguageSwitcher();
    
    // 监听滚动事件，添加导航栏阴影
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar && window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 自动检测浏览器语言并提示
    detectLanguage();
});

// Get Page Link (Based on Current Language)
function getPageLink(pageName) {
    const currentLang = getCurrentLanguage();
    if (currentLang === 'de') {
        return `${pageName}-de.html`;
    } else {
        return `${pageName}-en.html`; // Default to English
    }
}

// Load Navbar
function loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        const homeLink = getPageLink('index');
        const landingLink = getPageLink('landing');
        const productsLink = getPageLink('products');
        const aiRecommendLink = getPageLink('ai-recommend');
        const aboutLink = getPageLink('about');
        const contactLink = getPageLink('contact');
        const cartLink = getPageLink('cart');
        
        navbarContainer.innerHTML = `
            <nav class="navbar">
                <div class="container nav-container">
                    <a href="${homeLink}" class="logo">
                        <img src="picture/logo.jpg" alt="Shimo company logo with modern typography in blue and white colors" />
                    </a>
                    <button class="mobile-menu-btn" id="mobileMenuBtn">
                        <i class="fas fa-bars"></i>
                    </button>
                    <ul class="nav-links">
                        <li><a href="${homeLink}">${getText('navbar.home')}</a></li>
                        <li><a href="${landingLink}">${getText('navbar.landing')}</a></li>
                        <li><a href="${productsLink}">${getText('navbar.products')}</a></li>
                        <li><a href="${aiRecommendLink}">${getText('navbar.aiRecommend')}</a></li>
                        <li><a href="${aboutLink}">${getText('navbar.about')}</a></li>
                        <li><a href="${contactLink}">${getText('navbar.contact')}</a></li>
                        <li class="social-nav-links">
                            <a href="https://www.instagram.com/shimo_official" target="_blank" class="social-nav-link" title="Instagram">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.youtube.com/@shimo_official" target="_blank" class="social-nav-link" title="YouTube">
                                <i class="fab fa-youtube"></i>
                            </a>
                            <a href="https://www.tiktok.com/@shimo_official" target="_blank" class="social-nav-link" title="TikTok">
                                <i class="fab fa-tiktok"></i>
                            </a>
                            <a href="https://www.facebook.com/shimo_official" target="_blank" class="social-nav-link" title="Facebook">
                                <i class="fab fa-facebook"></i>
                            </a>
                            <a href="https://twitter.com/shimo_official" target="_blank" class="social-nav-link" title="Twitter">
                                <i class="fab fa-twitter"></i>
                            </a>
                        </li>
                        <li><a href="${cartLink}"><i class="fas fa-shopping-cart"></i></a></li>
                    </ul>
                </div>
            </nav>
        `;

        // 移动端菜单切换
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                document.querySelector('.navbar').classList.toggle('mobile-menu-open');
            });
        }
    }
}

// Load Footer
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        const productsLink = getPageLink('products');
        const aiRecommendLink = getPageLink('ai-recommend');
        const blogLink = getPageLink('blog');
        const faqLink = getPageLink('faq');
        const warrantyLink = getPageLink('warranty');
        const aboutLink = getPageLink('about');
        const teamLink = getPageLink('team');
        const careersLink = getPageLink('careers');
        const newsLink = getPageLink('news');
        
        footerContainer.innerHTML = `
            <footer class="footer">
                <div class="footer-content">
                    <div class="footer-about">
                        <div class="footer-logo">Shimo</div>
                        <p>${getText('footer.description')}</p>
                    </div>
                    <div class="footer-links">
                        <h4>${getText('footer.quickLinks')}</h4>
                        <ul>
                            <li><a href="${productsLink}">${getText('footer.links.products')}</a></li>
                            <li><a href="${aiRecommendLink}">${getText('footer.links.aiRecommend')}</a></li>
                            <li><a href="${blogLink}">${getText('footer.links.blog')}</a></li>
                            <li><a href="${faqLink}">${getText('footer.links.faq')}</a></li>
                            <li><a href="${warrantyLink}">${getText('footer.links.warranty')}</a></li>
                        </ul>
                    </div>
                    <div class="footer-links">
                        <h4>${getText('footer.aboutUs')}</h4>
                        <ul>
                            <li><a href="${aboutLink}">${getText('footer.links.company')}</a></li>
                            <li><a href="${teamLink}">${getText('footer.links.team')}</a></li>
                            <li><a href="${careersLink}">${getText('footer.links.careers')}</a></li>
                            <li><a href="${newsLink}">${getText('footer.links.news')}</a></li>
                        </ul>
                    </div>
                    <div class="footer-contact">
                        <h4>${getText('footer.contactUs')}</h4>
                        <div class="contact-item">
                            <span class="contact-icon"><i class="fas fa-map-marker-alt"></i></span>
                            <span>${getText('')}</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon"><i class="fas fa-phone"></i></span>
                            <span>+21 (0) 987654321</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon"><i class="fas fa-envelope"></i></span>
                            <span>hello@domain.com</span>
                        </div>
                        <div class="social-links">
                            <a href="#" class="social-link"><i class="fab fa-weibo"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-weixin"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-tiktok"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom container">
                    <p>${getText('footer.copyright')}</p>
                </div>
            </footer>
        `;
    }
}

// Initialize Language Switcher
function initLanguageSwitcher() {
    const languageToggle = document.getElementById('languageToggle');
    const languageMenu = document.getElementById('languageMenu');
    
    if (!languageToggle || !languageMenu) return;
    
    // Update current language display
    const currentLang = getCurrentLanguage();
    const toggleText = languageToggle.querySelector('span');
    if (toggleText) {
        const langNames = {
            'en': 'English',
            'de': 'Deutsch'
        };
        toggleText.textContent = langNames[currentLang];
    }
    
    // Update active state
    const langButtons = languageMenu.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        const btnLang = btn.getAttribute('data-lang');
        if (btnLang === currentLang) {
            btn.classList.add('active');
        }
    });
    
    // Click to toggle dropdown menu
    languageToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        languageMenu.classList.toggle('show');
        languageToggle.classList.toggle('active');
    });
    
    // Click elsewhere to close dropdown menu
    document.addEventListener('click', function() {
        languageMenu.classList.remove('show');
        languageToggle.classList.remove('active');
    });
    
    // Prevent dropdown menu internal click event bubbling
    languageMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Add language switch event listeners
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetLang = this.getAttribute('data-lang');
            switchToLanguage(targetLang);
        });
    });
}

// Floating chat button click event
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatFloatButton');
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            const chatLink = getPageLink('ai-chat');
            window.location.href = chatLink;
        });
    }
});

// Auto-detect Browser Language and Prompt
function detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    const currentLang = getCurrentLanguage();
    
    // If user browser is German but current page is not German, prompt to switch
    if (userLang.startsWith('de') && currentLang !== 'de') {
        const switchLanguage = confirm("Möchten Sie zu Deutsch wechseln?");
        if (switchLanguage) {
            switchToLanguage('de');
        }
    }
    // For all other languages, default to English (no prompt needed)
}

// Switch Language
function switchToLanguage(targetLang) {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    let basePage;
    let targetPage;
    
    // Get base page name (remove language suffix)
    if (currentPage.includes('-de.html')) {
        basePage = currentPage.replace('-de.html', '');
    } else if (currentPage.includes('-en.html')) {
        basePage = currentPage.replace('-en.html', '');
    } else {
        basePage = currentPage.replace('.html', '');
    }
    
    // Build target page name
    if (targetLang === 'de') {
        targetPage = `${basePage}-de.html`;
    } else {
        targetPage = `${basePage}-en.html`; // 明确使用-en.html后缀
    }
    
    // If target page is same as current page, no need to redirect
    if (targetPage === currentPage) {
        return;
    }
    
    // Save language preference
    localStorage.setItem('preferredLanguage', targetLang);
    
    // Build new URL
    const newPath = currentPath.replace(currentPage, targetPage);
    window.location.href = newPath;
}

// Export functions for other scripts
window.ShimoUtils = {
    getCurrentLanguage,
    getText,
    switchToLanguage,
    getPageLink
};
