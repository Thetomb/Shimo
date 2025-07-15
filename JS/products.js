// products.js - 多语言产品页面功能

document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('productsGrid');
    const applyFiltersButton = document.getElementById('applyFilters');
    const priceFilter = document.getElementById('priceFilter');
    const materialFilter = document.getElementById('materialFilter');
    const colorFilter = document.getElementById('colorFilter');
    const paginationButtons = document.querySelectorAll('.page-btn');
    const loadingIndicator = document.getElementById('loadingIndicator');

    let currentPage = 1;
    const productsPerPage = 6; // 每页显示的产品数量
    let products = []; // 存储所有产品数据
    let currentLanguage = getCurrentLanguage(); // 获取当前语言

    // 语言配置
    const languageConfig = {
        'zh': {
            currency: '¥',
            priceMultiplier: 1,
            locale: 'zh-CN'
        },
        'en': {
            currency: '£',
            priceMultiplier: 0.11, // CNY to GBP
            locale: 'en-GB'
        },
        'de': {
            currency: '€',
            priceMultiplier: 0.13, // CNY to EUR
            locale: 'de-DE'
        }
    };

    // 多语言文本
    const translations = {
        'zh': {
            viewDetails: '查看详情',
            price: '价格',
            material: '材质',
            color: '颜色',
            loading: '加载中...',
            noProducts: '没有找到符合条件的产品',
            page: '第',
            pageOf: '页，共',
            totalPages: '页',
            materials: {
                wood: '木质',
                metal: '金属',
                bamboo: '竹制',
                glass: '玻璃'
            },
            colors: {
                natural: '原木色',
                black: '黑色',
                white: '白色',
                gray: '灰色'
            }
        },
        'en': {
            viewDetails: 'View Details',
            price: 'Price',
            material: 'Material',
            color: 'Color',
            loading: 'Loading...',
            noProducts: 'No products found matching your criteria',
            page: 'Page',
            pageOf: 'of',
            totalPages: 'pages',
            materials: {
                wood: 'Wood',
                metal: 'Metal',
                bamboo: 'Bamboo',
                glass: 'Glass'
            },
            colors: {
                natural: 'Natural',
                black: 'Black',
                white: 'White',
                gray: 'Gray'
            }
        },
        'de': {
            viewDetails: 'Details ansehen',
            price: 'Preis',
            material: 'Material',
            color: 'Farbe',
            loading: 'Wird geladen...',
            noProducts: 'Keine Produkte gefunden, die Ihren Kriterien entsprechen',
            page: 'Seite',
            pageOf: 'von',
            totalPages: 'Seiten',
            materials: {
                wood: 'Holz',
                metal: 'Metall',
                bamboo: 'Bambus',
                glass: 'Glas'
            },
            colors: {
                natural: 'Natur',
                black: 'Schwarz',
                white: 'Weiß',
                gray: 'Grau'
            }
        }
    };

    // 产品数据（多语言）
    const productData = {
        'zh': [
            { 
                id: 'p001',
                name: "L型升降桌", 
                price: 3899, 
                material: "wood", 
                color: "white",
                image: "picture/kuan.png",
                features: ["宽敞", "电脑接线", "防撞保护"]
            },
            { 
                id: 'p002',
                name: "多功能升降桌", 
                price: 3499, 
                material: "wood", 
                color: "white",
                image: "picture/duo.png",
                features: ["美观", "记忆位置", "多功能"]
            },
            { 
                id: 'p003',
                name: "可移动式升降桌", 
                price: 2499, 
                material: "metal", 
                color: "natural",
                image: "picture/gao.png",
                features: ["环保材质", "静音设计", "可移动"]
            },
            { 
                id: 'p004',
                name: "站立式升降桌", 
                price: 2999, 
                material: "wood", 
                color: "white",
                image: "picture/3.png",
                features: ["木制", "极简设计", "易清洁"]
            },
            { 
                id: 'p005',
                name: "加宽电脑桌", 
                price: 1999, 
                material: "wood", 
                color: "white",
                image: "picture/nao.png",
                features: ["宽敞", "可扩展", "性价比高"]
            },
            { 
                id: 'p006',
                name: "加宽电脑桌-升级版", 
                price: 4999, 
                material: "wood", 
                color: "black",
                image: "picture/kuan2.png",
                features: ["顶级原木", "宽敞", "稳定结构"]
            }
        ],
        'en': [
            { 
                id: 'p001',
                name: "L-shaped Standing Desk", 
                price: 3899, 
                material: "wood", 
                color: "white",
                image: "picture/kuan.png",
                features: ["Spacious", "Computer Cable Management", "Anti-collision Protection"]
            },
            { 
                id: 'p002',
                name: "Multi-functional Standing Desk", 
                price: 3499, 
                material: "wood", 
                color: "white",
                image: "picture/duo.png",
                features: ["Aesthetic", "Memory Position", "Multi-functional"]
            },
            { 
                id: 'p003',
                name: "Movable Standing Desk", 
                price: 2499, 
                material: "metal", 
                color: "natural",
                image: "picture/gao.png",
                features: ["Eco-friendly Material", "Silent Design", "Movable"]
            },
            { 
                id: 'p004',
                name: "Standing Desk", 
                price: 2999, 
                material: "wood", 
                color: "white",
                image: "picture/3.png",
                features: ["Wooden", "Minimalist Design", "Easy to Clean"]
            },
            { 
                id: 'p005',
                name: "Wide Computer Desk", 
                price: 1999, 
                material: "wood", 
                color: "white",
                image: "picture/nao.png",
                features: ["Spacious", "Expandable", "High Value for Money"]
            },
            { 
                id: 'p006',
                name: "Wide Computer Desk - Premium Version", 
                price: 4999, 
                material: "wood", 
                color: "black",
                image: "picture/kuan2.png",
                features: ["Premium Wood", "Spacious", "Stable Structure"]
            }
        ],
        'de': [
            { 
                id: 'p001',
                name: "L-förmiger Stehschreibtisch", 
                price: 3999, 
                material: "wood", 
                color: "white",
                image: "picture/kuan.png",
                features: ["Geräumig", "Computerkabelmanagement", "Aufprallschutz"]
            },
            { 
                id: 'p002',
                name: "Multifunktionaler Stehschreibtisch", 
                price: 3499, 
                material: "wood", 
                color: "white",
                image: "picture/duo.png",
                features: ["Ästhetisch", "Speicherposition", "Multifunktional"]
            },
            { 
                id: 'p003',
                name: "Beweglicher Stehschreibtisch", 
                price: 2499, 
                material: "metal", 
                color: "natural",
                image: "picture/gao.png",
                features: ["Umweltfreundliches Material", "Geräuscharmes Design", "Beweglich"]
            },
            { 
                id: 'p004',
                name: "Stehschreibtisch", 
                price: 2999, 
                material: "wood", 
                color: "white",
                image: "picture/3.png",
                features: ["Aus Holz", "Minimalistisches Design", "Leicht zu reinigen"]
            },
            { 
                id: 'p005',
                name: "Breiter Computertisch", 
                price: 1999, 
                material: "wood", 
                color: "white",
                image: "picture/nao.png",
                features: ["Geräumig", "Erweiterbar", "Gutes Preis-Leistungs-Verhältnis"]
            },
            { 
                id: 'p006',
                name: "Breiter Computertisch - Premium-Version", 
                price: 4999, 
                material: "wood", 
                color: "black",
                image: "picture/kuan2.png",
                features: ["Hochwertiges Holz", "Geräumig", "Stabile Struktur"]
            }
        ]
    };


    // 获取当前语言
    function getCurrentLanguage() {
        const path = window.location.pathname;
        if (path.includes('-de.')) {
            return 'de';
        } else if (path.includes('-en.')) {
            return 'en';
        } else {
            return 'zh';
        }
    }

    // 格式化价格
    function formatPrice(price, language = currentLanguage) {
        const config = languageConfig[language];
        const convertedPrice = Math.round(price * config.priceMultiplier * 100) / 100;
        
        if (language === 'de') {
            return `${convertedPrice.toFixed(2).replace('.', ',')} ${config.currency}`;
        } else {
            return `${config.currency}${convertedPrice.toFixed(2)}`;
        }
    }

    // 获取翻译文本
    function t(key, subKey = null) {
        const langTexts = translations[currentLanguage] || translations['zh'];
        if (subKey) {
            return langTexts[key] && langTexts[key][subKey] ? langTexts[key][subKey] : key;
        }
        return langTexts[key] || key;
    }

    // 模拟产品数据加载
    function loadProducts() {
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
            loadingIndicator.textContent = t('loading');
        }
        
        setTimeout(() => {
            products = productData[currentLanguage] || productData['zh'];
            displayProducts();
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }, 1000);
    }

    // 显示产品
    function displayProducts() {
        if (!productsGrid) return;
        
        productsGrid.innerHTML = '';
        const filteredProducts = filterProducts();
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

        if (productsToDisplay.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <p>${t('noProducts')}</p>
                </div>
            `;
            return;
        }

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">${formatPrice(product.price)}</p>
                    <div class="product-details">
                        <p><strong>${t('material')}:</strong> ${t('materials', product.material)}</p>
                        <p><strong>${t('color')}:</strong> ${t('colors', product.color)}</p>
                    </div>
                    <div class="product-features">
                        ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                    <div class="product-actions">
                        <button class="btn-primary view-details" data-product-id="${product.id}">
                            ${t('viewDetails')}
                        </button>
                        <button class="btn-secondary add-to-cart" data-product-id="${product.id}">
                            ${currentLanguage === 'zh' ? '加入购物车' : 
                              currentLanguage === 'en' ? 'Add to Cart' : 'In den Warenkorb'}
                        </button>
                        <button class="btn-outline buy-now" data-product-id="${product.id}">
                            ${currentLanguage === 'zh' ? '立即购买' : 
                              currentLanguage === 'en' ? 'Buy Now' : 'Jetzt kaufen'}
                        </button>
                    </div>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });

        // 添加产品卡片点击事件
        addProductCardEvents();
        updatePagination(filteredProducts.length);
    }

    // 添加产品卡片事件
    function addProductCardEvents() {
        const viewDetailsButtons = document.querySelectorAll('.view-details');
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        const buyNowButtons = document.querySelectorAll('.buy-now');

        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.productId;
                const baseUrl = currentLanguage === 'de' ? 'product-detail-de.html' : 
                               currentLanguage === 'en' ? 'product-detail-en.html' : 
                               'product-detail-de.html';
                window.location.href = `${baseUrl}`;
            });
        });

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.productId;
                addToCart(productId);
            });
        });

        buyNowButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.productId;
                buyNow(productId);
            });
        });
    }

    // 添加到购物车功能
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            // 这里可以添加购物车逻辑
            const message = currentLanguage === 'zh' ? '已添加到购物车' : 
                           currentLanguage === 'en' ? 'Added to cart' : 
                           'Zum Warenkorb hinzugefügt';
            
            // 显示成功消息
            showNotification(message, 'success');
        }
    }

    // 立即购买功能
    function buyNow(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const orderItem = {
                productId: product.id,
                name: product.name,
                color: product.color,
                colorName: t('colors', product.color),
                size: '140x70', // 默认尺寸
                quantity: 1,
                price: product.price,
                currency: languageConfig[currentLanguage].currency,
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

    // 显示通知
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 筛选产品
    function filterProducts() {
        if (!priceFilter || !materialFilter || !colorFilter) return products;
        
        const priceRange = priceFilter.value;
        const material = materialFilter.value;
        const color = colorFilter.value;

        return products.filter(product => {
            const priceMatch = priceRange === 'all' || 
                (priceRange === '0-1000' && product.price <= 1000) ||
                (priceRange === '1000-2000' && product.price > 1000 && product.price <= 2000) ||
                (priceRange === '2000-3000' && product.price > 2000 && product.price <= 3000) ||
                (priceRange === '3000+' && product.price > 3000);
            const materialMatch = material === 'all' || product.material === material;
            const colorMatch = color === 'all' || product.color === color;

            return priceMatch && materialMatch && colorMatch;
        });
    }

    // 更新分页信息
    function updatePagination(totalProducts) {
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        const totalPagesElement = document.getElementById('totalPages');
        const currentPageElement = document.getElementById('currentPage');
        
        if (totalPagesElement) {
            totalPagesElement.textContent = totalPages;
        }
        if (currentPageElement) {
            currentPageElement.textContent = currentPage;
        }

        // 更新分页按钮状态
        paginationButtons.forEach(button => {
            if (button.dataset.page === 'prev') {
                button.disabled = currentPage <= 1;
            } else if (button.dataset.page === 'next') {
                button.disabled = currentPage >= totalPages;
            }
        });
    }

    // 应用筛选器
    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', () => {
            currentPage = 1;
            displayProducts();
        });
    }

    // 分页按钮事件
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filteredProducts = filterProducts();
            const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
            
            if (button.dataset.page === 'prev' && currentPage > 1) {
                currentPage--;
            } else if (button.dataset.page === 'next' && currentPage < totalPages) {
                currentPage++;
            }
            displayProducts();
        });
    });

    // 语言切换监听
    window.addEventListener('languageChanged', function(e) {
        currentLanguage = e.detail.language;
        loadProducts();
    });

    // 初始化产品
    loadProducts();
});
