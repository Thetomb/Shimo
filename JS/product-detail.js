// 产品详情页功能 - 多语言版本
class ProductDetail {
    constructor() {
        this.currentProduct = null;
        this.selectedColor = 'black';
        this.selectedSize = '140x70';
        this.quantity = 1;
        this.currentRating = 0;
        this.currentLanguage = this.getCurrentLanguage();
        
        this.init();
    }
    
    // 获取当前语言
    getCurrentLanguage() {
        const path = window.location.pathname;
        if (path.includes('-de.')) {
            return 'de';
        } else {
            return 'en';
        }
    }
    
    // 语言配置
    getLanguageConfig() {
        return {
            'en': {
                currency: '£',
                priceMultiplier: 0.11,
                locale: 'en-GB',
                dateFormat: 'DD/MM/YYYY'
            },
            'de': {
                currency: '€',
                priceMultiplier: 0.13,
                locale: 'de-DE',
                dateFormat: 'DD.MM.YYYY'
            }
        };
    }
    
    // 多语言文本
    getTranslations() {
        return {
            'en': {
                addToCart: 'Add to Cart',
                buyNow: 'Buy Now',
                quantity: 'Quantity',
                color: 'Color',
                size: 'Size',
                description: 'Description',
                specifications: 'Specifications',
                reviews: 'Reviews',
                qa: 'Q&A',
                shareProduct: 'Share Product',
                submitReview: 'Submit Review',
                submitQuestion: 'Submit Question',
                reviewTitle: 'Review Title',
                reviewContent: 'Review Content',
                questionContent: 'Question Content',
                contactInfo: 'Contact Info (Optional)',
                rating: 'Rating',
                addedToCart: 'Product added to cart!',
                reviewSubmitted: 'Review submitted successfully!',
                questionSubmitted: 'Question submitted successfully, we will reply soon!',
                fillAllFields: 'Please fill in all review information!',
                enterQuestion: 'Please enter your question!',
                wechatShare: 'Please open the link in WeChat to share',
                goBack: 'Go Back',
                colors: {
                    black: 'Classic Black',
                    white: 'Pure White',
                    wood: 'Natural Wood'
                },
                sizes: {
                    '120x60': '120×60cm',
                    '140x70': '140×70cm',
                    '160x80': '160×80cm'
                },
                specs: {
                    name: 'Product Name',
                    model: 'Model',
                    material: 'Desktop Material',
                    frame: 'Frame Material',
                    height: 'Height Range',
                    weight: 'Max Load',
                    motor: 'Drive System',
                    control: 'Control Method',
                    power: 'Power Specification',
                    netweight: 'Net Weight',
                    package: 'Package Dimensions'
                }
            },
            'de': {
                addToCart: 'In den Warenkorb',
                buyNow: 'Jetzt kaufen',
                quantity: 'Menge',
                color: 'Farbe',
                size: 'Größe',
                description: 'Beschreibung',
                specifications: 'Spezifikationen',
                reviews: 'Bewertungen',
                qa: 'Fragen & Antworten',
                shareProduct: 'Produkt teilen',
                submitReview: 'Bewertung abgeben',
                submitQuestion: 'Frage stellen',
                reviewTitle: 'Bewertungstitel',
                reviewContent: 'Bewertungsinhalt',
                questionContent: 'Frage',
                contactInfo: 'Kontaktdaten (Optional)',
                rating: 'Bewertung',
                addedToCart: 'Produkt wurde zum Warenkorb hinzugefügt!',
                reviewSubmitted: 'Bewertung erfolgreich eingereicht!',
                questionSubmitted: 'Frage erfolgreich eingereicht, wir werden bald antworten!',
                fillAllFields: 'Bitte füllen Sie alle Bewertungsfelder aus!',
                enterQuestion: 'Bitte geben Sie Ihre Frage ein!',
                wechatShare: 'Bitte öffnen Sie den Link in WeChat zum Teilen',
                goBack: 'Zurück',
                colors: {
                    black: 'Klassisches Schwarz',
                    white: 'Reines Weiß',
                    wood: 'Naturholz'
                },
                sizes: {
                    '120x60': '120×60cm',
                    '140x70': '140×70cm',
                    '160x80': '160×80cm'
                },
                specs: {
                    name: 'Produktname',
                    model: 'Modell',
                    material: 'Tischplattenmaterial',
                    frame: 'Rahmenmaterial',
                    height: 'Höhenbereich',
                    weight: 'Max. Belastung',
                    motor: 'Antriebssystem',
                    control: 'Steuerungsmethode',
                    power: 'Stromspezifikation',
                    netweight: 'Nettogewicht',
                    package: 'Verpackungsmaße'
                }
            }
        };
    }
    
    // 获取翻译文本
    t(key, subKey = null) {
        const translations = this.getTranslations();
        const langTexts = translations[this.currentLanguage] || translations['zh'];
        
        if (subKey) {
            return langTexts[key] && langTexts[key][subKey] ? langTexts[key][subKey] : key;
        }
        return langTexts[key] || key;
    }
    
    // 格式化价格
    formatPrice(price) {
        const config = this.getLanguageConfig()[this.currentLanguage];
        const convertedPrice = Math.round(price * config.priceMultiplier * 100) / 100;
        
        if (this.currentLanguage === 'de') {
            return `${convertedPrice.toFixed(2).replace('.', ',')} ${config.currency}`;
        } else if (this.currentLanguage === 'en') {
            return `${config.currency}${convertedPrice.toFixed(2)}`;
        } else {
            return `${config.currency}${convertedPrice.toLocaleString()}`;
        }
    }
    
    // 格式化日期
    formatDate(date) {
        const config = this.getLanguageConfig()[this.currentLanguage];
        const dateObj = new Date(date);
        
        switch (this.currentLanguage) {
            case 'de':
                return dateObj.toLocaleDateString('de-DE');
            case 'en':
                return dateObj.toLocaleDateString('en-US');
            default:
                return dateObj.toLocaleDateString('zh-CN');
        }
    }
    
    init() {
        this.loadProductData();
        this.initImageGallery();
        this.initColorSelection();
        this.initSizeSelection();
        this.initQuantitySelector();
        this.initTabs();
        this.initFAQ();
        this.initRatingInput();
        this.initEventListeners();
        this.updateUITexts();
    }
    
    // 更新界面文本
    updateUITexts() {
        // 更新按钮文本
        const addToCartBtn = document.querySelector('.add-to-cart');
        if (addToCartBtn) addToCartBtn.textContent = this.t('addToCart');
        
        const buyNowBtn = document.querySelector('.buy-now');
        if (buyNowBtn) buyNowBtn.textContent = this.t('buyNow');
        
        // 更新标签文本
        const quantityLabel = document.querySelector('.quantity-label');
        if (quantityLabel) quantityLabel.textContent = this.t('quantity');
        
        const colorLabel = document.querySelector('.color-label');
        if (colorLabel) colorLabel.textContent = this.t('color');
        
        const sizeLabel = document.querySelector('.size-label');
        if (sizeLabel) sizeLabel.textContent = this.t('size');
        
        // 更新标签页文本
        const tabLabels = {
            'description-tab': this.t('description'),
            'specs-tab': this.t('specifications'),
            'reviews-tab': this.t('reviews'),
            'qa-tab': this.t('qa')
        };
        
        Object.keys(tabLabels).forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = tabLabels[id];
        });
        
        // 更新表单文本
        const reviewTitleInput = document.getElementById('review-title');
        if (reviewTitleInput) reviewTitleInput.placeholder = this.t('reviewTitle');
        
        const reviewTextInput = document.getElementById('review-text');
        if (reviewTextInput) reviewTextInput.placeholder = this.t('reviewContent');
        
        const questionTextInput = document.getElementById('question-text');
        if (questionTextInput) questionTextInput.placeholder = this.t('questionContent');
        
        const questionContactInput = document.getElementById('question-contact');
        if (questionContactInput) questionContactInput.placeholder = this.t('contactInfo');
        
        // 更新提交按钮
        const submitReviewBtn = document.querySelector('.submit-review');
        if (submitReviewBtn) submitReviewBtn.textContent = this.t('submitReview');
        
        const submitQuestionBtn = document.querySelector('.submit-question');
        if (submitQuestionBtn) submitQuestionBtn.textContent = this.t('submitQuestion');
    }
    
    // 加载产品数据
    loadProductData() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || '101';
        
        // 多语言产品数据
        const products = {
            'en': {
                '101': {
                    id: '101',
                    name: 'Shimo Smart Standing Desk Pro Max',
                    sku: 'DR-SM-2023',
                    category: 'Smart Series',
                    price: 3999,
                    originalPrice: 4599,
                    images: [
                        'picture/1000.png',
                        'picture/1001.png',
                        'picture/1010.png',
                        'picture/1011.png'
                    ],
                    colors: [
                        { id: 'black', name: 'Classic Black', color: '#333' },
                        { id: 'white', name: 'Pure White', color: '#f5f5f5' },
                        { id: 'wood', name: 'Natural Wood', color: '#d2b48c' }
                    ],
                    sizes: [
                        { id: '120x60', name: '120×60cm' },
                        { id: '140x70', name: '140×70cm' },
                        { id: '160x80', name: '160×80cm' }
                    ],
                    description: `
                        <p>The Shimo Smart Standing Desk Pro Max is our flagship product, combining the latest ergonomic design with smart technology.</p>
                        <ul>
                            <li>Smart Height Memory: Store 4 frequently used height settings</li>
                            <li>Ultra-quiet Motor: Noise level below 40 decibels during operation</li>
                            <li>Anti-collision Protection: Automatically stops when encountering obstacles</li>
                            <li>USB Charging Ports: Desktop integrated with 3 USB fast charging ports</li>
                        </ul>
                    `,
                    specs: {
                        name: 'Shimo Smart Standing Desk Pro Max',
                        model: 'DR-SM-2023',
                        material: 'FSC Certified Solid Wood',
                        frame: 'Aviation Grade Aluminum Alloy',
                        height: '60-125cm',
                        weight: '120kg',
                        motor: 'Dual Motor Drive',
                        control: 'Touch Panel/Mobile APP/Voice Control',
                        power: '220V 50Hz',
                        netweight: '45kg',
                        package: '165×85×15cm'
                    }
                }
            },
            'de': {
                '101': {
                    id: '101',
                    name: 'Shimo Smart Stehschreibtisch Pro Max',
                    sku: 'DR-SM-2023',
                    category: 'Smart Serie',
                    price: 3999,
                    originalPrice: 4599,
                    images: [
                        'picture/1000.png',
                        'picture/1001.png',
                        'picture/1010.png',
                        'picture/1011.png'
                    ],
                    colors: [
                        { id: 'black', name: 'Klassisches Schwarz', color: '#333' },
                        { id: 'white', name: 'Reines Weiß', color: '#f5f5f5' },
                        { id: 'wood', name: 'Naturholz', color: '#d2b48c' }
                    ],
                    sizes: [
                        { id: '120x60', name: '120×60cm' },
                        { id: '140x70', name: '140×70cm' },
                        { id: '160x80', name: '160×80cm' }
                    ],
                    description: `
                        <p>Der Shimo Smart Stehschreibtisch Pro Max ist unser Flaggschiff-Produkt, das neuestes ergonomisches Design mit intelligenter Technologie kombiniert.</p>
                        <ul>
                            <li>Intelligenter Höhenspeicher: Speichert 4 häufig verwendete Höheneinstellungen</li>
                            <li>Ultra-leiser Motor: Geräuschpegel unter 40 Dezibel während des Betriebs</li>
                            <li>Anti-Kollisions-Schutz: Stoppt automatisch bei Hindernissen</li>
                            <li>USB-Ladeanschlüsse: Tischplatte mit 3 integrierten USB-Schnellladeanschlüssen</li>
                        </ul>
                    `,
                    specs: {
                        name: 'Shimo Smart Stehschreibtisch Pro Max',
                        model: 'DR-SM-2023',
                        material: 'FSC-zertifiziertes Massivholz',
                        frame: 'Luftfahrt-Aluminiumlegierung',
                        height: '60-125cm',
                        weight: '120kg',
                        motor: 'Dual-Motor-Antrieb',
                        control: 'Touch-Panel/Mobile APP/Sprachsteuerung',
                        power: '220V 50Hz',
                        netweight: '45kg',
                        package: '165×85×15cm'
                    }
                }
            }
        };
        
        const langProducts = products[this.currentLanguage] || products['zh'];
        this.currentProduct = langProducts[productId];
        this.updateProductDisplay();
    }
    
    // 更新产品显示
    updateProductDisplay() {
        if (!this.currentProduct) return;
        
        // 更新面包屑
        const categoryBreadcrumb = document.getElementById('product-category-breadcrumb');
        if (categoryBreadcrumb) categoryBreadcrumb.textContent = this.currentProduct.category;
        
        const nameBreadcrumb = document.getElementById('product-name-breadcrumb');
        if (nameBreadcrumb) nameBreadcrumb.textContent = this.currentProduct.name;
        
        // 更新产品信息
        const productTitle = document.getElementById('product-title');
        if (productTitle) productTitle.textContent = this.currentProduct.name;
        
        const productSku = document.getElementById('product-sku');
        if (productSku) productSku.textContent = this.currentProduct.sku;
        
        const productPrice = document.getElementById('product-price');
        if (productPrice) productPrice.textContent = this.formatPrice(this.currentProduct.price);
        
        // 更新主图
        const mainImage = document.getElementById('main-product-image');
        if (mainImage) {
            mainImage.src = this.currentProduct.images[0];
            mainImage.alt = this.getImageAlt(0);
        }
        
        // 更新缩略图
        const thumbnails = document.querySelectorAll('.thumbnail img');
        thumbnails.forEach((img, index) => {
            if (this.currentProduct.images[index]) {
                img.src = this.currentProduct.images[index];
                img.alt = this.getImageAlt(index + 1);
            }
        });
        
        // 更新产品描述
        const productDescription = document.getElementById('product-description');
        if (productDescription) {
            productDescription.innerHTML = this.currentProduct.description;
        }
        
        // 更新规格参数
        Object.keys(this.currentProduct.specs).forEach(key => {
            const element = document.getElementById(`spec-${key}`);
            if (element) {
                element.textContent = this.currentProduct.specs[key];
            }
        });
        
        // 更新颜色和尺寸选项
        this.updateColorOptions();
        this.updateSizeOptions();
    }
    
    // 获取图片alt文本
    getImageAlt(index) {
        const alts = {
            'en': {
                0: 'Shimo Smart Standing Desk Pro Max main image, showing modern minimalist office desk design with electric height adjustment and LED control panel',
                default: `Shimo Smart Standing Desk product detail image ${index}, showing different angles and functional features`
            },
            'de': {
                0: 'Shimo Smart Stehschreibtisch Pro Max Hauptbild, zeigt modernes minimalistisches Bürotisch-Design mit elektrischer Höhenverstellung und LED-Bedienfeld',
                default: `Shimo Smart Stehschreibtisch Produktdetailbild ${index}, zeigt verschiedene Winkel und Funktionsmerkmale`
            }
        };
        
        const langAlts = alts[this.currentLanguage] || alts['en'];
        return langAlts[index] || langAlts.default;
    }
    
    // 更新颜色选项
    updateColorOptions() {
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach((option, index) => {
            if (this.currentProduct.colors[index]) {
                const colorData = this.currentProduct.colors[index];
                option.dataset.color = colorData.id;
                
                const colorName = option.querySelector('.color-name');
                if (colorName) {
                    colorName.textContent = colorData.name;
                }
            }
        });
    }
    
    // 更新尺寸选项
    updateSizeOptions() {
        const sizeOptions = document.querySelectorAll('.size-option');
        sizeOptions.forEach((option, index) => {
            if (this.currentProduct.sizes[index]) {
                const sizeData = this.currentProduct.sizes[index];
                option.dataset.size = sizeData.id;
                option.textContent = sizeData.name;
            }
        });
    }
    
    // 初始化图片画廊
    initImageGallery() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('main-product-image');
        
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
                if (this.currentProduct && this.currentProduct.images[index]) {
                    mainImage.src = this.currentProduct.images[index];
                    mainImage.alt = this.getImageAlt(index + 1);
                }
            });
        });
    }
    
    // 初始化颜色选择
    initColorSelection() {
        const colorOptions = document.querySelectorAll('.color-option');
        
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                this.selectedColor = option.dataset.color;
                this.updatePrice();
            });
        });
    }
    
    // 初始化尺寸选择
    initSizeSelection() {
        const sizeOptions = document.querySelectorAll('.size-option');
        
        sizeOptions.forEach(option => {
            option.addEventListener('click', () => {
                sizeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                this.selectedSize = option.dataset.size;
                this.updatePrice();
            });
        });
    }
    
    // 初始化数量选择器
    initQuantitySelector() {
        const quantityInput = document.querySelector('.quantity-input');
        const minusBtn = document.querySelector('.quantity-btn.minus');
        const plusBtn = document.querySelector('.quantity-btn.plus');
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                if (this.quantity > 1) {
                    this.quantity--;
                    if (quantityInput) quantityInput.value = this.quantity;
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                if (this.quantity < 10) {
                    this.quantity++;
                    if (quantityInput) quantityInput.value = this.quantity;
                }
            });
        }
        
        if (quantityInput) {
            quantityInput.addEventListener('change', (e) => {
                const value = parseInt(e.target.value);
                if (value >= 1 && value <= 10) {
                    this.quantity = value;
                } else {
                    e.target.value = this.quantity;
                }
            });
        }
    }
    
    // 初始化标签页
    initTabs() {
        const tabNavItems = document.querySelectorAll('.tab-nav li');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabNavItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetTab = item.dataset.tab;
                
                tabNavItems.forEach(nav => nav.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                item.classList.add('active');
                const targetPane = document.getElementById(targetTab);
                if (targetPane) targetPane.classList.add('active');
            });
        });
    }
    
    // 初始化FAQ
    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    item.classList.toggle('active');
                });
            }
        });
    }
    
    // 初始化评分输入
    initRatingInput() {
        const stars = document.querySelectorAll('.rating-input .star');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                this.currentRating = index + 1;
                this.updateStarDisplay();
            });
            
            star.addEventListener('mouseenter', () => {
                this.highlightStars(index + 1);
            });
        });
        
        const ratingInput = document.querySelector('.rating-input');
        if (ratingInput) {
            ratingInput.addEventListener('mouseleave', () => {
                this.updateStarDisplay();
            });
        }
    }
    
    // 更新星星显示
    updateStarDisplay() {
        const stars = document.querySelectorAll('.rating-input .star');
        stars.forEach((star, index) => {
            if (index < this.currentRating) {
                star.classList.add('active');
                star.textContent = '★';
            } else {
                star.classList.remove('active');
                star.textContent = '☆';
            }
        });
    }
    
    // 高亮星星
    highlightStars(count) {
        const stars = document.querySelectorAll('.rating-input .star');
        stars.forEach((star, index) => {
            if (index < count) {
                star.textContent = '★';
            } else {
                star.textContent = '☆';
            }
        });
    }
    
    // 更新价格
    updatePrice() {
        let basePrice = this.currentProduct.price;
        let adjustedPrice = basePrice;
                // 尺寸价格调整
        if (this.selectedSize === '160x80') {
            adjustedPrice += 500;
        } else if (this.selectedSize === '120x60') {
            adjustedPrice -= 200;
        }
        
        // 颜色价格调整
        if (this.selectedColor === 'wood') {
            adjustedPrice += 300;
        }
        
        const productPrice = document.getElementById('product-price');
        if (productPrice) {
            productPrice.textContent = this.formatPrice(adjustedPrice);
        }
    }
    
    // 初始化事件监听器
    initEventListeners() {
        // 加入购物车按钮
        const addToCartBtn = document.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                this.addToCart();
            });
        }
        
        // 立即购买按钮
        const buyNowBtn = document.querySelector('.buy-now');
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', () => {
                this.buyNow();
            });
        }
        
        // 评价表单提交
        const reviewForm = document.querySelector('.review-form');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitReview();
            });
        }
        
        // 问题表单提交
        const questionForm = document.querySelector('.question-form');
        if (questionForm) {
            questionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitQuestion();
            });
        }
        
        // 语言切换监听
        window.addEventListener('languageChanged', (e) => {
            this.currentLanguage = e.detail.language;
            this.loadProductData();
            this.updateUITexts();
        });
        
        // 分享功能
        this.initShareButtons();
    }
    
    // 初始化分享按钮
    initShareButtons() {
        const shareButtons = document.querySelectorAll('.share-icon');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = button.classList.contains('wechat') ? 'wechat' : 
                                button.classList.contains('weibo') ? 'weibo' : 
                                button.classList.contains('twitter') ? 'twitter' :
                                button.classList.contains('facebook') ? 'facebook' : 'qq';
                this.shareProduct(platform);
            });
        });
    }
    
    // 加入购物车
    addToCart() {
        const cartItem = {
            productId: this.currentProduct.id,
            name: this.currentProduct.name,
            color: this.selectedColor,
            colorName: this.getColorName(this.selectedColor),
            size: this.selectedSize,
            quantity: this.quantity,
            price: this.getCurrentPrice(),
            currency: this.getLanguageConfig()[this.currentLanguage].currency,
            language: this.currentLanguage,
            image: this.currentProduct.images[0]
        };
        
        // 获取现有购物车数据
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // 检查是否已存在相同配置的商品
        const existingItemIndex = cart.findIndex(item => 
            item.productId === cartItem.productId && 
            item.color === cartItem.color && 
            item.size === cartItem.size &&
            item.language === cartItem.language
        );
        
        if (existingItemIndex >= 0) {
            // 如果已存在，增加数量
            cart[existingItemIndex].quantity += cartItem.quantity;
        } else {
            // 如果不存在，添加新项目
            cart.push(cartItem);
        }
        
        // 保存到本地存储
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // 显示成功消息
        this.showMessage(this.t('addedToCart'), 'success');
        
        // 更新购物车图标数量
        this.updateCartCount();
        
        // 触发购物车更新事件
        window.dispatchEvent(new CustomEvent('cartUpdated', { 
            detail: { 
                count: this.getTotalCartItems(),
                item: cartItem 
            } 
        }));
    }
    
    // 获取颜色名称
    getColorName(colorId) {
        const color = this.currentProduct.colors.find(c => c.id === colorId);
        return color ? color.name : colorId;
    }
    
    // 立即购买
    buyNow() {
        const orderItem = {
            productId: this.currentProduct.id,
            name: this.currentProduct.name,
            color: this.selectedColor,
            colorName: this.getColorName(this.selectedColor),
            size: this.selectedSize,
            quantity: this.quantity,
            price: this.getCurrentPrice(),
            currency: this.getLanguageConfig()[this.currentLanguage].currency,
            language: this.currentLanguage,
            image: this.currentProduct.images[0]
        };
        
        // 保存订单信息到本地存储
        localStorage.setItem('immediateOrder', JSON.stringify([orderItem]));
        
        // 跳转到支付页面（根据语言）
        const paymentPages = {
                'en': 'payment-en.html',
                'de': 'payment-de.html'
            };
            
            window.location.href = paymentPages[this.currentLanguage] || 'payment-en.html';
    }
    
    // 获取当前价格
    getCurrentPrice() {
        let basePrice = this.currentProduct.price;
        let adjustedPrice = basePrice;
        
        if (this.selectedSize === '160x80') {
            adjustedPrice += 500;
        } else if (this.selectedSize === '120x60') {
            adjustedPrice -= 200;
        }
        
        if (this.selectedColor === 'wood') {
            adjustedPrice += 300;
        }
        
        return adjustedPrice;
    }
    
    // 获取购物车总商品数
    getTotalCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    // 提交评价
    submitReview() {
        const title = document.getElementById('review-title')?.value.trim();
        const text = document.getElementById('review-text')?.value.trim();
        
        if (!title || !text || this.currentRating === 0) {
            this.showMessage(this.t('fillAllFields'), 'error');
            return;
        }
        
        const review = {
            productId: this.currentProduct.id,
            rating: this.currentRating,
            title: title,
            text: text,
            date: new Date().toISOString(),
            language: this.currentLanguage,
            formattedDate: this.formatDate(new Date())
        };
        
        // 保存到本地存储（实际项目中应该发送到服务器）
        let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.unshift(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        
        // 显示成功消息
        this.showMessage(this.t('reviewSubmitted'), 'success');
        
        // 清空表单
        const reviewTitle = document.getElementById('review-title');
        const reviewText = document.getElementById('review-text');
        if (reviewTitle) reviewTitle.value = '';
        if (reviewText) reviewText.value = '';
        this.currentRating = 0;
        this.updateStarDisplay();
        
        // 刷新评价列表
        this.loadReviews();
    }
    
    // 加载评价
    loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        const productReviews = reviews.filter(review => 
            review.productId === this.currentProduct.id && 
            review.language === this.currentLanguage
        );
        
        const reviewsContainer = document.getElementById('reviews-list');
        if (reviewsContainer) {
            if (productReviews.length === 0) {
                reviewsContainer.innerHTML = `
                    <div class="no-reviews">
                        <p>${this.currentLanguage === 'zh' ? '暂无评价' : 
                            this.currentLanguage === 'en' ? 'No reviews yet' : 
                            'Noch keine Bewertungen'}</p>
                    </div>
                `;
            } else {
                reviewsContainer.innerHTML = productReviews.map(review => `
                    <div class="review-item">
                        <div class="review-header">
                            <div class="review-rating">
                                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                            </div>
                            <div class="review-date">${review.formattedDate}</div>
                        </div>
                        <h4 class="review-title">${review.title}</h4>
                        <p class="review-text">${review.text}</p>
                    </div>
                `).join('');
            }
        }
    }
    
    // 提交问题
    submitQuestion() {
        const questionText = document.getElementById('question-text')?.value.trim();
        const contact = document.getElementById('question-contact')?.value.trim();
        
        if (!questionText) {
            this.showMessage(this.t('enterQuestion'), 'error');
            return;
        }
        
        const question = {
            productId: this.currentProduct.id,
            question: questionText,
            contact: contact,
            date: new Date().toISOString(),
            language: this.currentLanguage,
            formattedDate: this.formatDate(new Date()),
            answered: false
        };
        
        // 保存到本地存储（实际项目中应该发送到服务器）
        let questions = JSON.parse(localStorage.getItem('questions') || '[]');
        questions.unshift(question);
        localStorage.setItem('questions', JSON.stringify(questions));
        
        // 显示成功消息
        this.showMessage(this.t('questionSubmitted'), 'success');
        
        // 清空表单
        const questionTextEl = document.getElementById('question-text');
        const contactEl = document.getElementById('question-contact');
        if (questionTextEl) questionTextEl.value = '';
        if (contactEl) contactEl.value = '';
        
        // 刷新问答列表
        this.loadQuestions();
    }
    
    // 加载问答
    loadQuestions() {
        const questions = JSON.parse(localStorage.getItem('questions') || '[]');
        const productQuestions = questions.filter(q => 
            q.productId === this.currentProduct.id && 
            q.language === this.currentLanguage
        );
        
        const questionsContainer = document.getElementById('questions-list');
        if (questionsContainer) {
            if (productQuestions.length === 0) {
                questionsContainer.innerHTML = `
                    <div class="no-questions">
                        <p>${this.currentLanguage === 'zh' ? '暂无问答' : 
                            this.currentLanguage === 'en' ? 'No questions yet' : 
                            'Noch keine Fragen'}</p>
                    </div>
                `;
            } else {
                questionsContainer.innerHTML = productQuestions.map(q => `
                    <div class="qa-item">
                        <div class="question">
                            <strong>Q:</strong> ${q.question}
                            <small class="qa-date">${q.formattedDate}</small>
                        </div>
                        ${q.answered ? `
                            <div class="answer">
                                <strong>A:</strong> ${q.answer || (
                                    this.currentLanguage === 'zh' ? '我们会尽快为您回复' :
                                    this.currentLanguage === 'en' ? 'We will reply to you soon' :
                                    'Wir werden Ihnen bald antworten'
                                )}
                            </div>
                        ` : `
                            <div class="answer-pending">
                                ${this.currentLanguage === 'zh' ? '等待回复中...' :
                                  this.currentLanguage === 'en' ? 'Waiting for reply...' :
                                  'Warten auf Antwort...'}
                            </div>
                        `}
                    </div>
                `).join('');
            }
        }
    }
    
    // 分享产品
    shareProduct(platform) {
        const url = window.location.href;
        const title = this.currentProduct.name;
        const price = this.formatPrice(this.getCurrentPrice());
        const description = `${title} - ${this.currentLanguage === 'zh' ? '仅售' : 
                            this.currentLanguage === 'en' ? 'Only' : 
                            'Nur'} ${price}`;
        
        switch(platform) {
            case 'wechat':
                this.showMessage(this.t('wechatShare'), 'info');
                break;
            case 'weibo':
                const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(description)}`;
                window.open(weiboUrl, '_blank');
                break;
            case 'qq':
                const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
                window.open(qqUrl, '_blank');
                break;
            case 'twitter':
                const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(description)}`;
                window.open(twitterUrl, '_blank');
                break;
            case 'facebook':
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                window.open(facebookUrl, '_blank');
                break;
        }
    }
    
    // 显示消息
    showMessage(message, type = 'info') {
        // 创建消息元素
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        
        // 添加样式
        Object.assign(messageEl.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '6px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10000',
            maxWidth: '400px',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        });
        
        // 设置背景色
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        messageEl.style.backgroundColor = colors[type] || colors.info;
        
        // 添加关闭按钮
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 5px;
            right: 10px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
        `;
        closeBtn.addEventListener('click', () => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(messageEl)) {
                    document.body.removeChild(messageEl);
                }
            }, 300);
        });
        messageEl.appendChild(closeBtn);
        
        // 添加到页面
        document.body.appendChild(messageEl);
        
        // 显示动画
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(messageEl)) {
                    document.body.removeChild(messageEl);
                }
            }, 300);
        }, 5000);
    }
    
    // 更新购物车数量
    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // 更新购物车图标数量（如果存在）
        const cartCountElements = document.querySelectorAll('.cart-count, .cart-badge');
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.style.display = totalItems > 0 ? 'block' : 'none';
        });
    }
    
    // 初始化相关产品推荐
    initRelatedProducts() {
        // 模拟相关产品数据
        const relatedProducts = [
            { 
                id: '102', 
                name: this.currentLanguage === 'zh' ? 'Shimo 经典升降桌' :
                      this.currentLanguage === 'en' ? 'Shimo Classic Standing Desk' :
                      'Shimo Klassischer Stehschreibtisch',
                price: 2499,
                image: 'https://placehold.co/300x200'
            },
            { 
                id: '103', 
                name: this.currentLanguage === 'zh' ? 'Shimo 紧凑型升降桌' :
                      this.currentLanguage === 'en' ? 'Shimo Compact Standing Desk' :
                      'Shimo Kompakter Stehschreibtisch',
                price: 1899,
                image: 'https://placehold.co/300x200'
            }
        ];
        
        const relatedContainer = document.getElementById('related-products');
        if (relatedContainer) {
            relatedContainer.innerHTML = relatedProducts.map(product => `
                <div class="related-product">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <h4>${product.name}</h4>
                    <p class="related-price">${this.formatPrice(product.price)}</p>
                    <button class="btn-outline view-product" data-product-id="${product.id}">
                        ${this.currentLanguage === 'zh' ? '查看详情' :
                          this.currentLanguage === 'en' ? 'View Details' :
                          'Details ansehen'}
                    </button>
                </div>
            `).join('');
            
            // 添加点击事件
            relatedContainer.querySelectorAll('.view-product').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.dataset.productId;
                    const baseUrl = this.currentLanguage === 'zh' ? 'product-detail.html' :
                                   this.currentLanguage === 'en' ? 'product-detail-en.html' :
                                   'product-detail-de.html';
                    window.location.href = `${baseUrl}?id=${productId}`;
                });
            });
        }
    }
}

// 返回功能
function goBack() {
    // 检查是否有浏览历史
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // 如果没有历史记录，返回产品列表页
        const productListPages = {
            'zh': 'products.html',
            'en': 'products-en.html',
            'de': 'products-de.html'
        };
        
        // 检测当前语言
        const currentLang = window.location.pathname.includes('-de.') ? 'de' :
                           window.location.pathname.includes('-en.') ? 'en' : 'zh';
        
        window.location.href = productListPages[currentLang] || 'products.html';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.productDetailInstance = new ProductDetail();
    
    // 初始化相关产品
    setTimeout(() => {
        window.productDetailInstance.initRelatedProducts();
        window.productDetailInstance.loadReviews();
        window.productDetailInstance.loadQuestions();
        window.productDetailInstance.updateCartCount();
    }, 500);
});

// 语言切换功能
function switchLanguage(language) {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('?')[0];
    const params = new URLSearchParams(window.location.search);
    
    let newUrl;
    if (language === 'zh') {
        newUrl = baseUrl.replace(/-en\.html|-de\.html/, '.html');
    } else if (language === 'en') {
        newUrl = baseUrl.replace(/\.html|-de\.html/, '-en.html');
    } else if (language === 'de') {
        newUrl = baseUrl.replace(/\.html|-en\.html/, '-de.html');
    }
    
    // 保持URL参数
    if (params.toString()) {
        newUrl += '?' + params.toString();
    }
    
    window.location.href = newUrl;
}

// 导出类和函数以供其他脚本使用
window.ProductDetail = ProductDetail;
window.goBack = goBack;
window.switchLanguage = switchLanguage;

// 购物车同步功能
window.addEventListener('storage', (e) => {
    if (e.key === 'cart' && window.productDetailInstance) {
        window.productDetailInstance.updateCartCount();
    }
});

// 键盘快捷键支持
document.addEventListener('keydown', (e) => {
    // Esc键关闭所有消息
    if (e.key === 'Escape') {
        document.querySelectorAll('.message').forEach(msg => {
            msg.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(msg)) {
                    document.body.removeChild(msg);
                }
            }, 300);
        });
    }
    
    // Alt + B 返回
    if (e.altKey && e.key === 'b') {
        e.preventDefault();
        goBack();
    }
});
