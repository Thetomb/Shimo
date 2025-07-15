// 地理位置个性化系统

// 地区配置数据
const GEO_CONFIG = {
    CN: {
        name: '中国',
        currency: 'CNY',
        currencySymbol: '¥',
        language: 'zh-CN',
        timezone: 'Asia/Shanghai',
        dateFormat: 'YYYY年MM月DD日',
        numberFormat: 'zh-CN',
        specialOffers: {
            springFestival: {
                active: true,
                discount: 15,
                period: '2024-02-01 to 2024-02-29'
            },
            singleDay: {
                active: true,
                discount: 20,
                period: '2024-11-11'
            }
        },
        localFeatures: {
            payment: ['支付宝', '微信支付', '银联卡'],
            shipping: '全国包邮，48小时送达',
            support: '7x24小时中文客服',
            warranty: '3年全国联保'
        },
        content: {
            heroTitle: 'AI驱动的智能升降桌',
            heroSubtitle: '让工作更健康，让生活更智能',
            heroDescription: '采用先进AI算法，自动调节最适合您的工作高度，有效缓解久坐疲劳，提升工作效率。',
            features: {
                ai: {
                    title: 'AI智能推荐',
                    description: '基于您的身高、工作习惯和健康数据，AI算法自动推荐最佳桌面高度，让您始终保持最舒适的工作姿态。'
                },
                health: {
                    title: '健康办公理念',
                    description: '科学的站坐交替提醒，配合人体工学设计，有效预防颈椎病、腰椎病等职业病，让健康成为工作的一部分。'
                },
                control: {
                    title: '智能控制系统',
                    description: '一键式操作，记忆多种高度设置，支持手机APP远程控制，让高度调节变得简单便捷。'
                }
            },
            testimonials: [
                {
                    name: '张先生',
                    title: '软件工程师',
                    content: '使用这款智能升降桌3个月了，腰痛问题明显改善，工作效率也提升了不少。AI推荐的高度确实很准确！',
                    rating: 5
                },
                {
                    name: '李女士',
                    title: '设计师',
                    content: '桌子的升降非常平稳，几乎没有噪音。最喜欢的是可以保存多个高度设置，家人都能找到适合自己的高度。',
                    rating: 5
                },
                {
                    name: '王总',
                    title: '创业者',
                    content: '作为经常加班的人，这张桌子真的是救星。站立办公让我精神更集中，久坐的疲劳感大大减少。',
                    rating: 5
                }
            ],
            cta: {
                title: '立即体验智能办公',
                subtitle: '30天无理由退换，让您放心选择',
                primaryButton: '立即购买',
                secondaryButton: '了解更多'
            },
            guarantee: [
                '30天无理由退换',
                '全国免费配送',
                '专业安装服务',
                '3年质量保证'
            ],
            pricing: {
                original: 3999,
                current: 2999,
                currency: '¥'
            }
        }
    },
    
    GB: {
        name: 'United Kingdom',
        currency: 'GBP',
        currencySymbol: '£',
        language: 'en-GB',
        timezone: 'Europe/London',
        dateFormat: 'DD/MM/YYYY',
        numberFormat: 'en-GB',
        priceMultiplier: 0.11,
        specialOffers: {
            blackFriday: {
                active: true,
                discount: 25,
                period: '2024-11-24 to 2024-11-30'
            },
            newYear: {
                active: true,
                discount: 15,
                period: '2024-01-01 to 2024-01-15'
            }
        },
        localFeatures: {
            payment: ['PayPal', 'Visa', 'Mastercard', 'Apple Pay'],
            shipping: 'Free delivery across UK, 2-3 working days',
            support: '24/7 English customer support',
            warranty: '3-year UK warranty'
        },
        content: {
            heroTitle: 'AI-Powered Smart Standing Desk',
            heroSubtitle: 'Revolutionise Your Workspace',
            heroDescription: 'Advanced AI algorithms automatically adjust to your optimal working height, reducing fatigue and boosting productivity.',
            features: {
                ai: {
                    title: 'AI Smart Recommendations',
                    description: 'Based on your height, work habits, and health data, our AI algorithm automatically recommends the perfect desk height for maximum comfort.'
                },
                health: {
                    title: 'Healthy Office Concept',
                    description: 'Scientific sit-stand reminders combined with ergonomic design effectively prevent neck and back problems, making health part of your work routine.'
                },
                control: {
                    title: 'Intelligent Control System',
                    description: 'One-touch operation with memory settings for multiple heights. Control remotely via smartphone app for ultimate convenience.'
                }
            },
            testimonials: [
                {
                    name: 'James Smith',
                    title: 'Software Developer',
                    content: 'Been using this smart desk for 3 months now. My back pain has significantly improved and my productivity has increased. The AI height recommendations are spot on!',
                    rating: 5
                },
                {
                    name: 'Sarah Johnson',
                    title: 'Graphic Designer',
                    content: 'The desk moves so smoothly and quietly. Love that I can save multiple height settings - perfect for when my partner uses it too.',
                    rating: 5
                },
                {
                    name: 'Michael Brown',
                    title: 'Entrepreneur',
                    content: 'As someone who works long hours, this desk has been a game-changer. Standing while working keeps me more focused and less fatigued.',
                    rating: 5
                }
            ],
            cta: {
                title: 'Experience Smart Working Today',
                subtitle: '30-day money-back guarantee for your peace of mind',
                primaryButton: 'Buy Now',
                secondaryButton: 'Learn More'
            },
            guarantee: [
                '30-day money-back guarantee',
                'Free UK delivery',
                'Professional installation',
                '3-year warranty'
            ],
            pricing: {
                original: 899,
                current: 699,
                currency: '£'
            }
        }
    },
    
    US: {
        name: 'United States',
        currency: 'USD',
        currencySymbol: '$',
        language: 'en-US',
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        numberFormat: 'en-US',
        priceMultiplier: 0.14,
        specialOffers: {
            blackFriday: {
                active: true,
                discount: 25,
                period: '2024-11-24 to 2024-11-30'
            },
            independenceDay: {
                active: true,
                discount: 20,
                period: '2024-07-04'
            }
        },
        localFeatures: {
            payment: ['PayPal', 'Visa', 'Mastercard', 'Apple Pay', 'Google Pay'],
            shipping: 'Free shipping across US, 2-3 business days',
            support: '24/7 English customer support',
            warranty: '3-year US warranty'
        },
        content: {
            heroTitle: 'AI-Powered Smart Standing Desk',
            heroSubtitle: 'Transform Your Workspace',
            heroDescription: 'Advanced AI algorithms automatically adjust to your optimal working height, reducing fatigue and boosting productivity.',
            features: {
                ai: {
                    title: 'AI Smart Recommendations',
                    description: 'Based on your height, work habits, and health data, our AI algorithm automatically recommends the perfect desk height for maximum comfort.'
                },
                health: {
                    title: 'Healthy Office Concept',
                    description: 'Scientific sit-stand reminders combined with ergonomic design effectively prevent neck and back problems, making health part of your work routine.'
                },
                control: {
                    title: 'Intelligent Control System',
                    description: 'One-touch operation with memory settings for multiple heights. Control remotely via smartphone app for ultimate convenience.'
                }
            },
            testimonials: [
                {
                    name: 'John Smith',
                    title: 'Software Engineer',
                    content: 'Been using this smart desk for 3 months now. My back pain has significantly improved and my productivity has increased. The AI height recommendations are spot on!',
                    rating: 5
                },
                {
                    name: 'Emily Johnson',
                    title: 'UX Designer',
                    content: 'The desk moves so smoothly and quietly. Love that I can save multiple height settings - perfect for when my husband uses it too.',
                    rating: 5
                },
                {
                    name: 'Michael Brown',
                    title: 'Startup Founder',
                    content: 'As someone who works long hours, this desk has been a game-changer. Standing while working keeps me more focused and less fatigued.',
                    rating: 5
                }
            ],
            cta: {
                title: 'Experience Smart Working Today',
                subtitle: '30-day money-back guarantee for your peace of mind',
                primaryButton: 'Buy Now',
                secondaryButton: 'Learn More'
            },
            guarantee: [
                '30-day money-back guarantee',
                'Free US shipping',
                'Professional installation',
                '3-year warranty'
            ],
            pricing: {
                original: 1299,
                current: 999,
                currency: '$'
            }
        }
    },
    
    DE: {
        name: 'Deutschland',
        currency: 'EUR',
        currencySymbol: '€',
        language: 'de-DE',
        timezone: 'Europe/Berlin',
        dateFormat: 'DD.MM.YYYY',
        numberFormat: 'de-DE',
        priceMultiplier: 0.85,
        specialOffers: {
            oktoberfest: {
                active: true,
                discount: 20,
                period: '2024-09-16 to 2024-10-03'
            },
            christmas: {
                active: true,
                discount: 18,
                period: '2024-12-01 to 2024-12-25'
            }
        },
        localFeatures: {
            payment: ['SEPA', 'PayPal', 'Kreditkarte', 'Sofortüberweisung'],
            shipping: 'Kostenloser Versand in Deutschland, 2-3 Werktage',
            support: '24/7 deutscher Kundensupport',
            warranty: '3 Jahre deutsche Garantie'
        },
        content: {
            heroTitle: 'KI-gesteuerter intelligenter Stehschreibtisch',
            heroSubtitle: 'Revolutionieren Sie Ihren Arbeitsplatz',
            heroDescription: 'Fortschrittliche KI-Algorithmen passen sich automatisch an Ihre optimale Arbeitshöhe an und reduzieren Ermüdung bei gleichzeitiger Steigerung der Produktivität.',
            features: {
                ai: {
                    title: 'KI-Smart-Empfehlungen',
                    description: 'Basierend auf Ihrer Körpergröße, Ihren Arbeitsgewohnheiten und Gesundheitsdaten empfiehlt unser KI-Algorithmus automatisch die perfekte Tischhöhe für maximalen Komfort.'
                },
                health: {
                    title: 'Gesundes Bürokonzept',
                    description: 'Wissenschaftliche Sitz-Steh-Erinnerungen kombiniert mit ergonomischem Design verhindern effektiv Nacken- und Rückenprobleme und machen Gesundheit zu einem Teil Ihrer Arbeitsroutine.'
                },
                control: {
                    title: 'Intelligentes Steuerungssystem',
                    description: 'Ein-Knopf-Bedienung mit Speichereinstellungen für mehrere Höhen. Fernsteuerung über Smartphone-App für ultimativen Komfort.'
                }
            },
            testimonials: [
                {
                    name: 'Hans Müller',
                    title: 'Software-Entwickler',
                    content: 'Ich benutze diesen intelligenten Schreibtisch seit 3 Monaten. Meine Rückenschmerzen haben sich deutlich verbessert und meine Produktivität ist gestiegen. Die KI-Höhenempfehlungen sind genau richtig!',
                    rating: 5
                },
                {
                    name: 'Anna Schmidt',
                    title: 'Grafikdesignerin',
                    content: 'Der Tisch bewegt sich so sanft und leise. Ich liebe es, dass ich mehrere Höheneinstellungen speichern kann - perfekt, wenn mein Partner ihn auch benutzt.',
                    rating: 5
                },
                {
                    name: 'Thomas Weber',
                    title: 'Unternehmer',
                    content: 'Als jemand, der lange arbeitet, war dieser Schreibtisch ein Wendepunkt. Das Stehen während der Arbeit hält mich konzentrierter und weniger müde.',
                    rating: 5
                }
            ],
            cta: {
                title: 'Erleben Sie heute intelligentes Arbeiten',
                subtitle: '30 Tage Geld-zurück-Garantie für Ihre Sicherheit',
                primaryButton: 'Jetzt kaufen',
                secondaryButton: 'Mehr erfahren'
            },
            guarantee: [
                '30 Tage Geld-zurück-Garantie',
                'Kostenlose Lieferung in Deutschland',
                'Professionelle Installation',
                '3 Jahre Garantie'
            ],
            pricing: {
                original: 899,
                current: 699,
                currency: '€'
            }
        }
    }
};

// 地理位置个性化类
class GeoPersonalization {
    constructor() {
        this.currentRegion = 'CN'; // 默认地区
        this.detectedRegion = null;
        this.init();
    }
    
    async init() {
        try {
            await this.detectRegion();
            this.applyRegionConfig();
            this.createRegionSwitcher();
            this.updateDateTime();
            this.checkSpecialOffers();
            
            // 每分钟更新一次时间
            setInterval(() => this.updateDateTime(), 60000);
        } catch (error) {
            console.warn('Geo-personalization initialization failed:', error);
            this.applyRegionConfig(); // 使用默认配置
        }
    }
    
    async detectRegion() {
        // 1. 检查本地存储
        const savedRegion = localStorage.getItem('preferred-region');
        if (savedRegion && GEO_CONFIG[savedRegion]) {
            this.currentRegion = savedRegion;
            return;
        }
        
        // 2. 基于浏览器语言检测
        const browserLang = navigator.language || navigator.languages[0];
        if (browserLang.startsWith('zh')) {
            this.currentRegion = 'CN';
        } else if (browserLang.startsWith('en-GB') || browserLang.startsWith('en-UK')) {
            this.currentRegion = 'GB';
        } else if (browserLang.startsWith('de')) {
            this.currentRegion = 'DE';
        }
        
        // 3. IP地理定位（备用）
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            const countryCode = data.country_code;
            
            if (countryCode === 'CN') {
                this.currentRegion = 'CN';
            } else if (countryCode === 'GB') {
                this.currentRegion = 'GB';
            } else if (countryCode === 'DE') {
                this.currentRegion = 'DE';
            }
            
            this.detectedRegion = countryCode;
        } catch (error) {
            // 备用IP检测API
            try {
                const response = await fetch('https://api.country.is/');
                const data = await response.json();
                const countryCode = data.country;
                
                if (GEO_CONFIG[countryCode]) {
                    this.currentRegion = countryCode;
                    this.detectedRegion = countryCode;
                }
            } catch (fallbackError) {
                console.warn('IP geolocation failed, using default region');
            }
        }
    }
    
    applyRegionConfig() {
        const config = GEO_CONFIG[this.currentRegion];
        if (!config) return;
        
        // 更新页面语言
        document.documentElement.lang = config.language;
        
        // 更新英雄区域
        this.updateHeroSection(config.content);
        
        // 更新特性区域
        this.updateFeaturesSection(config.content.features);
        
        // 更新用户见证
        this.updateTestimonialsSection(config.content.testimonials);
        
        // 更新CTA区域
        this.updateCTASection(config.content.cta, config.content.guarantee);
        
        // 更新价格显示
        this.updatePricing(config.content.pricing);
        
        // 更新本地化特性
        this.updateLocalFeatures(config.localFeatures);
        
        // 更新页面标题和描述
        this.updatePageMeta(config.content);
        
        // 触发自定义事件
        window.dispatchEvent(new CustomEvent('regionChanged', {
            detail: { region: this.currentRegion, config }
        }));
    }
    
    updateHeroSection(content) {
        const elements = {
            '.hero-title': content.heroTitle,
            '.hero-badge .badge-text': content.heroSubtitle,
            '.hero-description': content.heroDescription
        };
        
        this.updateElements(elements);
    }
    
    updateFeaturesSection(features) {
        Object.keys(features).forEach(key => {
            const feature = features[key];
            const featureCard = document.querySelector(`[data-feature="${key}"]`);
            if (featureCard) {
                const title = featureCard.querySelector('.feature-title');
                const description = featureCard.querySelector('.feature-description');
                if (title) title.textContent = feature.title;
                if (description) description.textContent = feature.description;
            }
        });
    }
    
    updateTestimonialsSection(testimonials) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonials.forEach((testimonial, index) => {
            if (testimonialCards[index]) {
                const card = testimonialCards[index];
                const name = card.querySelector('.author-name');
                const title = card.querySelector('.author-title');
                const content = card.querySelector('.testimonial-text');
                const avatar = card.querySelector('.author-avatar');
                
                if (name) name.textContent = testimonial.name;
                if (title) title.textContent = testimonial.title;
                if (content) content.textContent = testimonial.content;
                if (avatar) avatar.textContent = testimonial.name.charAt(0);
                
                // 更新星级评分
                const stars = card.querySelector('.stars');
                if (stars) {
                    stars.innerHTML = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
                }
            }
        });
    }
    
    updateCTASection(cta, guarantee) {
        const elements = {
            '.cta-title': cta.title,
            '.cta-description': cta.subtitle,
            '.btn-cta-primary': cta.primaryButton,
            '.btn-cta-secondary': cta.secondaryButton
        };
        
        this.updateElements(elements);
        
        // 更新保障信息
        const guaranteeItems = document.querySelectorAll('.guarantee-item');
        guarantee.forEach((item, index) => {
            if (guaranteeItems[index]) {
                const textNode = this.getTextNode(guaranteeItems[index]);
                if (textNode) textNode.textContent = item;
            }
        });
    }
    
    updatePageMeta(content) {
        document.title = content.heroTitle;
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = content.heroDescription;
    }
    
    getTextNode(element) {
        for (let node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                return node;
            }
        }
        return null;
    }
    
    updateElements(elements) {
        Object.keys(elements).forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = elements[selector];
            }
        });
    }
    
    updateLocalFeatures(features) {
        // 更新支付方式
        const paymentElement = document.querySelector('[data-local="payment"]');
        if (paymentElement) {
            paymentElement.textContent = features.payment.join(', ');
        }
        
        // 更新配送信息
        const shippingElement = document.querySelector('[data-local="shipping"]');
        if (shippingElement) {
            shippingElement.textContent = features.shipping;
        }
        
        // 更新客服信息
        const supportElement = document.querySelector('[data-local="support"]');
        if (supportElement) {
            supportElement.textContent = features.support;
        }
        
        // 更新保修信息
        const warrantyElement = document.querySelector('[data-local="warranty"]');
        if (warrantyElement) {
            warrantyElement.textContent = features.warranty;
        }
    }
    
    checkSpecialOffers() {
        const config = GEO_CONFIG[this.currentRegion];
        const now = new Date();
        
        Object.keys(config.specialOffers).forEach(offerKey => {
            const offer = config.specialOffers[offerKey];
            if (offer.active && this.isOfferValid(offer.period, now)) {
                this.showSpecialOffer(offer);
            }
        });
    }
    
    isOfferValid(period, now) {
        if (period.includes('to')) {
            const [start, end] = period.split(' to ');
            const startDate = new Date(start);
            const endDate = new Date(end);
            return now >= startDate && now <= endDate;
        } else {
            const offerDate = new Date(period);
            return now.toDateString() === offerDate.toDateString();
        }
    }
    
    showSpecialOffer(offer) {
        // 检查是否已经显示过这个优惠
        if (localStorage.getItem(`offer-shown-${offer.period}`)) {
            return;
        }
        
        // 创建优惠横幅
        const banner = document.createElement('div');
        banner.className = 'special-offer-banner';
        banner.innerHTML = `
            <div class="offer-content">
                <span class="offer-text">🎉 特别优惠：立减${offer.discount}%！</span>
                <button class="offer-close">×</button>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .special-offer-banner {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #ff6b6b, #ee5a24);
                color: white;
                padding: 12px 20px;
                text-align: center;
                z-index: 10000;
                animation: slideDown 0.5s ease;
            }
            
            .offer-content {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 20px;
            }
            
            .offer-text {
                font-weight: 600;
            }
            
            .offer-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @keyframes slideDown {
                from { transform: translateY(-100%); }
                to { transform: translateY(0); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.insertBefore(banner, document.body.firstChild);
        
        // 调整页面内容位置
        document.body.style.paddingTop = '50px';
        
        // 关闭按钮事件
        banner.querySelector('.offer-close').addEventListener('click', () => {
            banner.remove();
            document.body.style.paddingTop = '0';
            localStorage.setItem(`offer-shown-${offer.period}`, 'true');
        });
        
        // 5秒后自动关闭
        setTimeout(() => {
            if (banner.parentNode) {
                banner.remove();
                document.body.style.paddingTop = '0';
                localStorage.setItem(`offer-shown-${offer.period}`, 'true');
            }
        }, 5000);
    }
    
    updateDateTime() {
        const config = GEO_CONFIG[this.currentRegion];
        const now = new Date();
        
        // 更新本地时间显示
        const timeElements = document.querySelectorAll('[data-local-time]');
        timeElements.forEach(element => {
            const formatter = new Intl.DateTimeFormat(config.language, {
                timeZone: config.timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            element.textContent = formatter.format(now);
        });
        
        // 更新日期显示
        const dateElements = document.querySelectorAll('[data-local-date]');
        dateElements.forEach(element => {
            const formatter = new Intl.DateTimeFormat(config.language, {
                timeZone: config.timezone,
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            element.textContent = formatter.format(now);
        });
    }
    
    updatePricing(pricing) {
        const priceElements = document.querySelectorAll('[data-price]');
        priceElements.forEach(element => {
            const priceType = element.getAttribute('data-price');
            if (pricing[priceType]) {
                element.textContent = `${pricing.currency}${pricing[priceType]}`;
            }
        });
    }
    
    createRegionSwitcher() {
        // 检查是否已经存在切换器
        if (document.querySelector('.region-switcher')) return;
        
        const switcher = document.createElement('div');
        switcher.className = 'region-switcher';
        switcher.innerHTML = `
            <div class="switcher-trigger">
                <span class="current-region">${this.currentRegion}</span>
                <span class="switcher-arrow">▼</span>
            </div>
            <div class="switcher-dropdown">
                <div class="switcher-option" data-region="CN">🇨🇳 中国</div>
                <div class="switcher-option" data-region="GB">🇬🇧 UK</div>
                <div class="switcher-option" data-region="DE">🇩🇪 Deutschland</div>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .region-switcher {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 1000;
                font-family: inherit;
            }
            
            .switcher-trigger {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 8px 12px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
            }
            
            .switcher-trigger:hover {
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            }
            
            .current-region {
                font-weight: 600;
                color: #2563eb;
            }
            
            .switcher-arrow {
                font-size: 12px;
                color: #6b7280;
                transition: transform 0.3s ease;
            }
            
            .switcher-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                min-width: 150px;
            }
            
            .region-switcher.open .switcher-dropdown {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .region-switcher.open .switcher-arrow {
                transform: rotate(180deg);
            }
            
            .switcher-option {
                padding: 10px 15px;
                cursor: pointer;
                transition: background 0.2s ease;
                border-bottom: 1px solid #f3f4f6;
            }
            
            .switcher-option:last-child {
                border-bottom: none;
            }
            
            .switcher-option:hover {
                background: #f8fafc;
            }
            
            .switcher-option.active {
                background: #eff6ff;
                color: #2563eb;
                font-weight: 600;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(switcher);
        
        // 设置当前选中的地区
        const currentOption = switcher.querySelector(`[data-region="${this.currentRegion}"]`);
        if (currentOption) {
            currentOption.classList.add('active');
        }
        
        // 切换器事件
        const trigger = switcher.querySelector('.switcher-trigger');
        const dropdown = switcher.querySelector('.switcher-dropdown');
        const options = switcher.querySelectorAll('.switcher-option');
        
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            switcher.classList.toggle('open');
        });
        
        // 点击外部关闭
        document.addEventListener('click', () => {
            switcher.classList.remove('open');
        });
        
        // 地区选择事件
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const region = option.getAttribute('data-region');
                this.switchRegion(region);
                switcher.classList.remove('open');
            });
        });
    }
    
    switchRegion(region) {
        if (region === this.currentRegion) return;
        
        // 更新当前地区
        this.currentRegion = region;
        
        // 保存到本地存储
        localStorage.setItem('preferred-region', region);
        
        // 应用新配置
        this.applyRegionConfig();
        
        // 更新切换器显示
        const switcher = document.querySelector('.region-switcher');
        if (switcher) {
            const currentRegionSpan = switcher.querySelector('.current-region');
            const options = switcher.querySelectorAll('.switcher-option');
            
            if (currentRegionSpan) {
                currentRegionSpan.textContent = region;
            }
            
            options.forEach(option => {
                option.classList.remove('active');
                if (option.getAttribute('data-region') === region) {
                    option.classList.add('active');
                }
            });
        }
        
        // 添加切换动画
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0.7';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        }, 150);
    }
}

// 初始化地理位置个性化
let geoPersonalization;

document.addEventListener('DOMContentLoaded', () => {
    geoPersonalization = new GeoPersonalization();
});

// 导出类和配置（如果需要在其他脚本中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GeoPersonalization, GEO_CONFIG };
} else {
    window.GeoPersonalization = GeoPersonalization;
    window.GEO_CONFIG = GEO_CONFIG;
}