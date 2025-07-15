// premium-products.js - 高端款产品页面专用脚本（多语言支持）

// 当前语言设置
let currentLanguage = 'en'; // Default English
const languages = {
    en: { name: 'English', dir: 'ltr' },
    de: { name: 'Deutsch', dir: 'ltr' }
};

// 初始化语言
function initLanguage() {
    // 从localStorage或URL参数获取语言设置
    const savedLang = localStorage.getItem('premiumLanguage');
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    if (langParam && languageMap[langParam]) {
        currentLanguage = langParam;
    } else if (savedLang && languageMap[savedLang]) {
        currentLanguage = savedLang;
    }
    
    // 应用语言设置
    applyLanguageSettings();
}

// 应用语言设置
function applyLanguageSettings() {
    // 保存到localStorage
    localStorage.setItem('premiumLanguage', currentLanguage);
    
    // 设置文档方向
    document.documentElement.dir = languageMap[currentLanguage].dir;
    
    // 更新语言切换按钮
    updateLanguageSwitcher();
    
    // 重新渲染内容
    renderAllContent();
}

// 更新语言切换按钮
function updateLanguageSwitcher() {
    const switcher = document.getElementById('languageSwitcher');
    if (!switcher) return;
    
    switcher.innerHTML = Object.entries(languageMap).map(([code, lang]) => `
        <button class="lang-btn ${currentLanguage === code ? 'active' : ''}" 
                data-lang="${code}">
            ${lang.name}
        </button>
    `).join('');
    
    // 绑定事件
    switcher.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLanguage = btn.dataset.lang;
            applyLanguageSettings();
        });
    });
}

// 多语言文本映射
const translations = {
    en: {
        currency: '£',
        currencyMultiplier: 0.8,
        productCount: "Found {count} products",
        filterResults: "Filter applied, found {count} products",
        addToCart: "Add to Cart",
        outOfStock: "Out of Stock",
        viewDetails: "View Details",
        quickView: "Quick View",
        priceFilter: "Price Range",
        materialFilter: "Material",
        featureFilter: "Special Features",
        applyFilters: "Apply Filters",
        all: "All",
        priceRanges: {
            '2000-3000': "£1600-2400",
            '3000-4000': "£2400-3200",
            '4000+': "£3200+"
        },
        materials: {
            'solid-wood': "Solid Wood",
            'marble': "Marble",
            'carbon-fiber': "Carbon Fiber",
            'tempered-glass': "Tempered Glass"
        },
        features: {
            'memory': "Memory Function",
            'anti-collision': "Anti-collision",
            'usb': "USB Charging",
            'cable-management': "Cable Management"
        },
        badges: {
            'new': "New",
            'bestseller': "Bestseller",
            'limited': "Limited"
        },
        comboTitle: "Recommended Accessories",
        reviewsTitle: "Customer Reviews",
        loadMoreReviews: "Load More Reviews",
        reviewHelpful: "Helpful",
        reviewProduct: "Product: ",
        notification: {
            added: "{name} added to cart",
            outOfStock: "This product is out of stock",
            notFound: "Product not found"
        }
    },
    de: {
        currency: '€',
        currencyMultiplier: 0.9,
        productCount: "{count} Produkte gefunden",
        filterResults: "Filter angewendet, {count} Produkte gefunden",
        addToCart: "In den Warenkorb",
        outOfStock: "Nicht vorrätig",
        viewDetails: "Details anzeigen",
        quickView: "Schnellansicht",
        priceFilter: "Preisspanne",
        materialFilter: "Material",
        featureFilter: "Besondere Funktionen",
        applyFilters: "Filter anwenden",
        all: "Alle",
        priceRanges: {
            '2000-3000': "€1800-2700",
            '3000-4000': "€2700-3600",
            '4000+': "€3600+"
        },
        materials: {
            'solid-wood': "Massivholz",
            'marble': "Marmor",
            'carbon-fiber': "Kohlefaser",
            'tempered-glass': "Glas"
        },
        features: {
            'memory': "Speicherfunktion",
            'anti-collision': "Kollisionsschutz",
            'usb': "USB-Ladung",
            'cable-management': "Kabelmanagement"
        },
        badges: {
            'new': "Neu",
            'bestseller': "Bestseller",
            'limited': "Limitiert"
        },
        comboTitle: "Empfohlenes Zubehör",
        reviewsTitle: "Kundenbewertungen",
        loadMoreReviews: "Mehr Bewertungen laden",
        reviewHelpful: "Hilfreich",
        reviewProduct: "Produkt: ",
        notification: {
            added: "{name} wurde in den Warenkorb gelegt",
            outOfStock: "Dieses Produkt ist nicht vorrätig",
            notFound: "Produkt nicht gefunden"
        }
    }
};

// 获取翻译文本
function t(key, params = {}) {
    const langTranslations = translations[currentLanguage] || translations.en;
    let text = langTranslations[key] || key;
    
    // 处理带参数的翻译
    Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, paramValue);
    });
    
    return text;
}

// 多语言产品数据
const premiumProductsData = [
    {
        id: 'p001',
        name: {
            en: 'Business Elite Electric Desk',
            de: 'Business Elite Elektrischer Schreibtisch'
        },
        price: 3499,
        originalPrice: 3999,
        image: 'images/products/premium-desk-1.jpg',
        badge: {
            en: 'Bestseller',
            de: 'Bestseller'
        },
        material: 'solid-wood',
        features: {
            en: ['Premium solid wood desktop', 'Dual motor drive', '4 memory positions'],
            de: ['Premium Massivholz-Tischplatte', 'Dual-Motor-Antrieb', '4 Speicherpositionen']
        },
        specialFeatures: ['memory', 'anti-collision'],
        description: {
            en: 'Imported oak desktop, dual-motor silent drive, supports 4 memory positions',
            de: 'Importierte Eichenholz-Tischplatte, leiser Dual-Motor-Antrieb, unterstützt 4 Speicherpositionen'
        },
        rating: 4.8,
        reviews: 156,
        inStock: true
    }
    // Additional products would follow the same pattern
];

// 推荐搭配产品数据
const comboProducts = [
    {
        id: 'a001',
        name: {
            en: 'Premium Ergonomic Chair',
            de: 'Premium Ergonomischer Stuhl'
        },
        price: 2499,
        image: 'images/accessories/ergonomic-chair.jpg',
        description: {
            en: 'German imported gas lift, genuine leather, 12-hour comfort experience',
            de: 'Deutsche Gasdruckfeder, Echtleder, 12-Stunden-Komforterlebnis'
        }
    }
    // Additional accessories would follow the same pattern
];

// 客户评价数据
const premiumReviews = [
    {
        id: 'r001',
        userName: 'Mr. Zhang',
        avatar: 'images/avatars/user1.jpg',
        rating: 5,
        date: '2024-03-15',
        productName: {
            en: 'Business Elite Electric Desk',
            de: 'Business Elite Elektrischer Schreibtisch'
        },
        content: {
            en: 'I have been using the Business Elite Electric Desk for a month...',
            de: 'Ich verwende den Business Elite Elektrischer Schreibtisch seit einem Monat...'
        },
        helpful: 23
    }
    // Additional reviews would follow the same pattern
];

// 当前筛选状态
let currentFilters = {
    price: 'all',
    material: 'all',
    feature: 'all'
};

// 当前页码
let currentPage = 1;
const productsPerPage = 6;

// 初始化高端款产品页面
function loadPremiumProducts() {
    initLanguage(); // 初始化语言设置
    renderProducts(premiumProductsData);
    updateProductCount(premiumProductsData.length);
    initComboSlider();
    initPremiumFilters();
    renderReviews();
}

// 渲染产品列表
function renderProducts(products) {
    const container = document.getElementById('premiumProductsGrid');
    if (!container) return;

    // 分页处理
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    container.innerHTML = paginatedProducts.map(product => {
        const name = product.name[currentLanguage] || product.name.en;
        const badgeText = product.badge ? product.badge[currentLanguage] || product.badge.en : '';
        const badgeClass = badgeText === t('badges.new') ? 'new' : 
                          badgeText === t('badges.bestseller') ? 'bestseller' : 
                          badgeText === t('badges.limited') ? 'limited' : '';
        
        const features = product.features[currentLanguage] || product.features.en;
        const description = product.description[currentLanguage] || product.description.en;
        
        return `
        <div class="product-card ${!product.inStock ? 'out-of-stock' : ''}" data-product-id="${product.id}">
            ${badgeText ? `<div class="product-badge ${badgeClass}">${badgeText}</div>` : ''}
            ${!product.inStock ? `<div class="product-badge out-of-stock-badge">${t('outOfStock')}</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${name}" loading="lazy">
                <div class="product-overlay">
                    <button class="quick-view-btn" onclick="quickViewProduct('${product.id}')">${t('quickView')}</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-text">${product.rating} (${product.reviews}${t('reviewCountSuffix')})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">¥${product.price.toLocaleString()}</span>
                    ${product.originalPrice ? `<span class="original-price">¥${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-features">
                    ${features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <div class="product-actions">
                    <a href="product-detail.html?id=${product.id}" class="btn-secondary">${t('viewDetails')}</a>
                    <button class="btn-primary add-to-cart" 
                            data-product-id="${product.id}" 
                            ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? t('addToCart') : t('outOfStock')}
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');

    // 更新分页
    updatePagination(products.length);

    // 重新绑定事件
    bindProductEvents();
}

// 初始化筛选器
function initPremiumFilters() {
    const priceFilter = document.getElementById('priceFilter');
    const materialFilter = document.getElementById('materialFilter');
    const featureFilter = document.getElementById('featureFilter');
    const applyButton = document.getElementById('applyFilters');
    
    // 更新筛选器标签
    if (priceFilter) {
        priceFilter.innerHTML = `
            <option value="all">${t('all')}</option>
            <option value="2000-3000">${t('priceRanges.2000-3000')}</option>
            <option value="3000-4000">${t('priceRanges.3000-4000')}</option>
            <option value="4000+">${t('priceRanges.4000+')}</option>
        `;
    }
    
    if (materialFilter) {
        materialFilter.innerHTML = `
            <option value="all">${t('all')}</option>
            <option value="solid-wood">${t('materials.solid-wood')}</option>
            <option value="marble">${t('materials.marble')}</option>
            <option value="carbon-fiber">${t('materials.carbon-fiber')}</option>
            <option value="tempered-glass">${t('materials.tempered-glass')}</option>
        `;
    }
    
    if (featureFilter) {
        featureFilter.innerHTML = `
            <option value="all">${t('all')}</option>
            <option value="memory">${t('features.memory')}</option>
            <option value="anti-collision">${t('features.anti-collision')}</option>
            <option value="usb">${t('features.usb')}</option>
            <option value="cable-management">${t('features.cable-management')}</option>
        `;
    }
    
    // 更新筛选器标题
    const priceLabel = document.querySelector('label[for="priceFilter"]');
    const materialLabel = document.querySelector('label[for="materialFilter"]');
    const featureLabel = document.querySelector('label[for="featureFilter"]');
    
    if (priceLabel) priceLabel.textContent = t('priceFilter');
    if (materialLabel) materialLabel.textContent = t('materialFilter');
    if (featureLabel) featureLabel.textContent = t('featureFilter');
    
    if (applyButton) {
        applyButton.textContent = t('applyFilters');
        applyButton.addEventListener('click', applyFilters);
    }

    // 监听筛选器变化
    [priceFilter, materialFilter, featureFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', () => {
                // 实时筛选（可选）
                // applyFilters();
            });
        }
    });
}

// 更新产品数量显示
function updateProductCount(count) {
    const countElement = document.querySelector('.products-count');
    if (countElement) {
        countElement.textContent = t('productCount', { count });
    }
}

// 显示筛选结果
function showFilterResults(count) {
    // 创建临时提示
    const toast = document.createElement('div');
    toast.className = 'filter-toast';
    toast.textContent = t('filterResults', { count });
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// 初始化推荐搭配滑块
function initComboSlider() {
    const container = document.querySelector('.combo-section');
    if (!container) return;
    
    // 更新标题
    const title = container.querySelector('h2');
    if (title) title.textContent = t('comboTitle');
    
    const slider = container.querySelector('.combo-slider');
    if (!slider) return;

    // 渲染推荐搭配产品
    slider.innerHTML = comboProducts.map(product => {
        const name = product.name[currentLanguage] || product.name.cn;
        const description = product.description[currentLanguage] || product.description.cn;
        
        return `
        <div class="combo-item">
            <div class="combo-image">
                <img src="${product.image}" alt="${name}" loading="lazy">
            </div>
            <div class="combo-info">
                <h4>${name}</h4>
                <p class="combo-description">${description}</p>
                <p class="combo-price">¥${product.price.toLocaleString()}</p>
                <button class="btn-secondary add-to-cart" data-product-id="${product.id}">
                    ${t('addToCart')}
                </button>
            </div>
        </div>
        `;
    }).join('');

    // 如果产品数量多，可以添加滑动功能
    if (comboProducts.length > 4) {
        addSliderControls(slider);
    }
}

// 渲染评价
function renderReviews() {
    const container = document.querySelector('.reviews-section');
    if (!container) return;
    
    // 更新标题
    const title = container.querySelector('h2');
    if (title) title.textContent = t('reviewsTitle');
    
    const loadMoreBtn = document.getElementById('loadMoreReviews');
    if (loadMoreBtn) loadMoreBtn.textContent = t('loadMoreReviews');
    
    const reviewsContainer = container.querySelector('.reviews-container');
    if (!reviewsContainer) return;
    
    // 只显示前2条评价
    const reviewsToShow = premiumReviews.slice(0, 2);
    
    reviewsContainer.innerHTML = reviewsToShow.map(review => {
        const productName = review.productName[currentLanguage] || review.productName.cn;
        const content = review.content[currentLanguage] || review.content.cn;
        
        return `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <img src="${review.avatar}" alt="用户头像" class="reviewer-avatar">
                    <div>
                        <h4 class="reviewer-name">${review.userName}</h4>
                        <div class="rating">
                            ${generateStars(review.rating)}
                        </div>
                    </div>
                </div>
                <span class="review-date">${review.date}</span>
            </div>
            <p class="review-text">${content}</p>
            <div class="review-product">${t('reviewProduct')}${productName}</div>
            <div class="review-actions">
                <button class="helpful-btn" data-review-id="${review.id}">
                    ${t('reviewHelpful')} (${review.helpful})
                </button>
            </div>
        </div>
        `;
    }).join('');
    
    // 绑定事件
    bindProductEvents();
}

// 快速预览产品
function quickViewProduct(productId) {
    const product = premiumProductsData.find(p => p.id === productId);
    if (!product) return;

    const name = product.name[currentLanguage] || product.name.cn;
    const features = product.features[currentLanguage] || product.features.cn;
    const description = product.description[currentLanguage] || product.description.cn;
    const badgeText = product.badge ? product.badge[currentLanguage] || product.badge.cn : '';
    
    // 创建快速预览模态框
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${name}">
                </div>
                <div class="quick-view-info">
                    <h3>${name}</h3>
                    <div class="product-rating">
                        <div class="stars">${generateStars(product.rating)}</div>
                        <span>${product.rating} (${product.reviews}${t('reviewCountSuffix')})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">¥${product.price.toLocaleString()}</span>
                        ${product.originalPrice ? `<span class="original-price">¥${product.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <p class="product-description">${description}</p>
                    <div class="product-features">
                        ${features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                    <div class="quick-view-actions">
                        <button class="btn-primary add-to-cart" data-product-id="${product.id}">
                            ${t('addToCart')}
                        </button>
                        <a href="product-detail.html?id=${product.id}" class="btn-secondary">
                            ${t('viewDetails')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // 显示模态框
    setTimeout(() => modal.classList.add('show'), 10);
    
    // 绑定关闭事件
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => document.body.removeChild(modal), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => document.body.removeChild(modal), 300);
        }
    });

    // 绑定购物车事件
    bindProductEvents(modal);
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// 重新渲染所有内容
function renderAllContent() {
    const filteredProducts = filterProducts(premiumProductsData, currentFilters);
    renderProducts(filteredProducts);
    updateProductCount(filteredProducts.length);
    initComboSlider();
    initPremiumFilters();
    renderReviews();
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 在HTML中添加语言切换器（如果不存在）
    if (!document.getElementById('languageSwitcher')) {
        const header = document.querySelector('header');
        if (header) {
            const switcher = document.createElement('div');
            switcher.id = 'languageSwitcher';
            switcher.className = 'language-switcher';
            header.appendChild(switcher);
        }
    }
    
    loadPremiumProducts();
    
    // 绑定产品事件
    bindProductEvents();
});

// 立即购买功能
function buyNow(productId) {
    const product = premiumProductsData.find(p => p.id === productId);
    if (product) {
        const name = product.name[currentLanguage] || product.name.cn;
        const orderItem = {
            productId: product.id,
            name: name,
            color: product.color || 'default',
            colorName: product.color || 'Default',
            size: '140x70', // 默认尺寸
            quantity: 1,
            price: product.price,
            currency: t('currency'),
            language: currentLanguage,
            image: product.image
        };
        
        // 保存订单信息到本地存储
        localStorage.setItem('immediateOrder', JSON.stringify([orderItem]));
        
        // 跳转到支付页面（根据语言）
        const paymentPages = {
            'en': 'payment-en.html',
            'de': 'payment-de.html'
        };
        
        window.location.href = paymentPages[currentLanguage] || 'payment-en.html';
    }
}

// 绑定产品事件
function bindProductEvents(container = document) {
    // 绑定加入购物车事件
    container.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.dataset.productId;
            addToCart(productId);
        });
    });
    
    // 绑定立即购买事件
    container.querySelectorAll('.buy-now').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.dataset.productId;
            buyNow(productId);
        });
    });
    
    // 绑定快速预览事件
    container.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.dataset.productId;
            quickViewProduct(productId);
        });
    });
}

// 导出函数供其他脚本使用
window.premiumProducts = {
    loadPremiumProducts,
    initPremiumFilters,
    initComboSlider,
    loadMoreReviews,
    addToCart,
    buyNow,
    quickViewProduct,
    bindProductEvents
};