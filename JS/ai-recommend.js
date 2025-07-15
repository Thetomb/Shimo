/**
 * Shimo AI推荐系统
 * 支持中英文双语模式
 */

// 语言配置
const LANGUAGE_CONFIG = {
    zh: {
        // 表单步骤标题
        stepTitles: {
            1: '基本信息',
            2: '使用习惯', 
            3: '办公环境',
            4: '预算与需求',
            5: '特殊需求'
        },
        // 按钮文本
        buttons: {
            next: '下一步',
            prev: '上一步',
            submit: '获取推荐',
            viewDetails: '查看详情',
            addToCart: '加入购物车',
            saveRecommendation: '保存推荐结果',
            startNewRecommendation: '重新进行推荐'
        },
        // 验证消息
        validation: {
            required: '请填写所有必填选项',
            selectOption: '请至少选择一个选项',
            selectFeature: '请至少选择一个特性'
        },
        // 分析页面
        analyzing: {
            title: 'AI正在分析您的需求...',
            description: '正在考虑多种因素，为您找到最佳升降桌方案'
        },
        // 推荐结果
        results: {
            title: '您的个性化推荐',
            description: '基于您提供的信息，我们为您精选了以下最适合的升降桌产品',
            matchDegree: '匹配度',
            matchText: '这款产品非常符合您的需求',
            whyRecommend: '为什么推荐这款产品',
            otherRecommendations: '其他推荐',
            recommendedAccessories: '推荐配件'
        },
        // 产品信息
        products: {
            main: {
                name: '智能健康管家升降桌',
                price: '¥3,899',
                reasons: [
                    '适合您的身高范围，提供最佳人体工学体验',
                    '符合您长时间工作的习惯，健康提醒功能帮助您养成站立工作习惯',
                    '桌面尺寸适合您的工作空间',
                    '在您的预算范围内提供最佳性价比',
                    '具备您重视的稳定性和静音特性'
                ]
            },
            alternatives: [
                { name: 'AI智能助手升降桌', price: '¥4,299', match: '92%' },
                { name: '商务精英款升降桌', price: '¥3,499', match: '85%' },
                { name: '经典稳重款升降桌', price: '¥2,499', match: '78%' }
            ]
        },
        // 配件信息
        accessories: [
            {
                name: '人体工学椅',
                description: '完美配合您的升降桌，提供全天候舒适支撑',
                price: '¥1,299'
            },
            {
                name: '显示器支架',
                description: '灵活调节显示器高度和角度，减轻颈部压力',
                price: '¥399'
            },
            {
                name: '线缆管理套装',
                description: '保持桌面整洁，避免线缆缠绕和损坏',
                price: '¥199'
            }
        ]
    },
    en: {
        // 表单步骤标题
        stepTitles: {
            1: 'Basic Information',
            2: 'Usage Habits',
            3: 'Office Environment', 
            4: 'Budget & Requirements',
            5: 'Special Needs'
        },
        // 按钮文本
        buttons: {
            next: 'Next',
            prev: 'Previous',
            submit: 'Get Recommendation',
            viewDetails: 'View Details',
            addToCart: 'Add to Cart',
            saveRecommendation: 'Save Recommendation',
            startNewRecommendation: 'Start New Recommendation'
        },
        // 验证消息
        validation: {
            required: 'Please fill in all required fields',
            selectOption: 'Please select at least one option',
            selectFeature: 'Please select at least one feature'
        },
        // 分析页面
        analyzing: {
            title: 'AI is analyzing your needs...',
            description: 'Considering multiple factors to find the best standing desk solution for you'
        },
        // 推荐结果
        results: {
            title: 'Your Personalized Recommendation',
            description: 'Based on the information you provided, we have selected the most suitable standing desk products for you',
            matchDegree: 'Match Degree',
            matchText: 'This product perfectly fits your needs',
            whyRecommend: 'Why we recommend this product',
            otherRecommendations: 'Other Recommendations',
            recommendedAccessories: 'Recommended Accessories'
        },
        // 产品信息

        
        // 配件信息
        accessories: [
            {
                name: 'Ergonomic Chair',
                description: 'Perfect match for your standing desk, providing all-day comfort support',
                price: '£159'
            },
            {
                name: 'Monitor Arm',
                description: 'Flexibly adjust monitor height and angle, reduce neck strain',
                price: '£47'
            },
            {
                name: 'Cable Management Kit',
                description: 'Keep desktop tidy, prevent cable tangling and damage',
                price: '£23'
            }
        ]
    },
    de: {
        // 表单步骤标题
        stepTitles: {
            1: 'Grundinformationen',
            2: 'Nutzungsgewohnheiten',
            3: 'Büroumgebung',
            4: 'Budget & Anforderungen',
            5: 'Besondere Bedürfnisse'
        },
        // 按钮文本
        buttons: {
            next: 'Weiter',
            prev: 'Zurück',
            submit: 'Empfehlung erhalten',
            viewDetails: 'Details anzeigen',
            addToCart: 'In den Warenkorb',
            saveRecommendation: 'Empfehlung speichern',
            startNewRecommendation: 'Neue Empfehlung starten'
        },
        // 验证消息
        validation: {
            required: 'Bitte füllen Sie alle Pflichtfelder aus',
            selectOption: 'Bitte wählen Sie mindestens eine Option',
            selectFeature: 'Bitte wählen Sie mindestens ein Merkmal'
        },
        // 分析页面
        analyzing: {
            title: 'KI analysiert Ihre Bedürfnisse...',
            description: 'Berücksichtigung mehrerer Faktoren, um die beste Steh-Sitz-Schreibtischlösung für Sie zu finden'
        },
        // 推荐结果
        results: {
            title: 'Ihre persönliche Empfehlung',
            description: 'Basierend auf Ihren Angaben haben wir die passendsten Steh-Sitz-Schreibtische für Sie ausgewählt',
            matchDegree: 'Übereinstimmungsgrad',
            matchText: 'Dieses Produkt passt perfekt zu Ihren Bedürfnissen',
            whyRecommend: 'Warum wir dieses Produkt empfehlen',
            otherRecommendations: 'Weitere Empfehlungen',
            recommendedAccessories: 'Empfohlenes Zubehör'
        },
        // 产品信息
        products: {

            alternatives: [
                { name: 'KI-Smart-Assistent Steh-Sitz-Schreibtisch', price: '€659', match: '92%' },
                { name: 'Business Elite Steh-Sitz-Schreibtisch', price: '€539', match: '85%' },
                { name: 'Klassischer stabiler Steh-Sitz-Schreibtisch', price: '€389', match: '78%' }
            ]
        },
        // 配件信息
        accessories: [
            {
                name: 'Ergonomischer Stuhl',
                description: 'Perfekte Ergänzung zu Ihrem Steh-Sitz-Schreibtisch für ganztägigen Komfort',
                price: '€199'
            },
            {
                name: 'Monitor-Halterung',
                description: 'Flexible Einstellung der Monitorhöhe und -winkel, reduziert Nackenbelastung',
                price: '€59'
            },
            {
                name: 'Kabelmanagement-Set',
                description: 'Hält den Schreibtisch ordentlich, verhindert Kabelgewirr und Beschädigungen',
                price: '€29'
            }
        ]
    }
};

// 全局变量
let currentLanguage = 'zh';
let currentStep = 0;
let formData = {};

// 初始化AI推荐表单
function initAiRecommendForm() {
    // 检测当前页面语言
    detectLanguage();
    
    // 获取DOM元素
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const progress = document.querySelector('.progress');
    const progressSteps = document.querySelectorAll('.step');
    const languageToggle = document.getElementById('languageToggle');
    const languageMenu = document.getElementById('languageMenu');

    // 初始化显示
    showStep(currentStep);
    updateLanguage();

    // 语言切换事件
    const languageLinks = document.querySelectorAll('#languageMenu a');
    if (languageLinks) {
        languageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // 如果在同一页面切换语言而不是跳转
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    currentLanguage = this.getAttribute('data-lang');
                    updateLanguage();
                    languageMenu.classList.remove('active');
                }
            });
        });
    }

    // 点击页面其他地方关闭语言菜单
    document.addEventListener('click', function(event) {
        if (languageMenu && languageToggle) {
            if (!languageToggle.contains(event.target) && !languageMenu.contains(event.target)) {
                languageMenu.classList.remove('active');
            }
        }
    });

    // 下一步按钮事件
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                saveStepData(currentStep);
                currentStep++;
                showStep(currentStep);
                updateProgress();
            }
        });
    });

    // 上一步按钮事件
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
                updateProgress();
            }
        });
    });

    // 表单提交事件
    const form = document.getElementById('aiRecommendForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateStep(currentStep)) {
                saveStepData(currentStep);
                analyzeInput();
            }
        });
    }

    // 保存推荐结果按钮
    const saveBtn = document.getElementById('saveRecommendation');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveRecommendation);
    }

    // 重新推荐按钮
    const newRecommendBtn = document.getElementById('startNewRecommendation');
    if (newRecommendBtn) {
        newRecommendBtn.addEventListener('click', startNewRecommendation);
    }

    // 加入购物车按钮事件
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.getAttribute('data-product-id') || 'main-product';
            addToCart(productId);
        }
    });

    // 检测语言
    function detectLanguage() {
        const currentPage = window.location.pathname;
        if (currentPage.includes('-en')) {
            currentLanguage = 'en';
        } else if (currentPage.includes('-de')) {
            currentLanguage = 'de';
        } else {
            currentLanguage = 'zh';
        }
    }


    // 显示指定步骤
    function showStep(step) {
        const formSteps = document.querySelectorAll('.form-step');
        formSteps.forEach((formStep, index) => {
            formStep.style.display = index === step ? 'block' : 'none';
            formStep.classList.toggle('active', index === step);
        });

        // 控制导航按钮显示
        const formNav = document.querySelector('.form-nav');
        if (formNav) {
            formNav.style.display = step === formSteps.length - 1 ? 'flex' : 'flex';
        }

        const prevBtn = document.querySelector('.prev-btn');
        if (prevBtn) {
            prevBtn.style.display = step === 0 ? 'none' : 'inline-block';
        }
    }

    // 更新进度条
    function updateProgress() {
        const formSteps = document.querySelectorAll('.form-step');
        const percentage = ((currentStep + 1) / formSteps.length) * 100;
        if (progress) {
            progress.style.width = percentage + '%';
        }
        
        const progressSteps = document.querySelectorAll('.step');
        progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index <= currentStep);
        });
    }

    // 验证当前步骤
    function validateStep(step) {
        const currentFormStep = document.querySelector(`.form-step[data-step="${step + 1}"]`);
        if (!currentFormStep) return true;

        const texts = LANGUAGE_CONFIG[currentLanguage];
        
        // 验证必填输入框
        const requiredInputs = currentFormStep.querySelectorAll('input[required], textarea[required]');
        for (let input of requiredInputs) {
            if (input.type === 'radio') {
                const group = currentFormStep.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = Array.from(group).some(radio => radio.checked);
                if (!isChecked) {
                    alert(texts.validation.selectOption);
                    return false;
                }
            } else if (input.type === 'checkbox') {
                // 对于复选框组，检查是否至少选择了一个
                const group = currentFormStep.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = Array.from(group).some(checkbox => checkbox.checked);
                if (!isChecked && input.hasAttribute('required')) {
                    alert(texts.validation.selectFeature);
                    return false;
                }
            } else if (!input.value.trim()) {
                alert(texts.validation.required);
                input.focus();
                return false;
            }
        }

        // 特殊验证：第4步的特性选择
        if (step === 3) { // 第4步（索引为3）
            const features = currentFormStep.querySelectorAll('input[name="features"]:checked');
            if (features.length === 0) {
                alert(texts.validation.selectFeature);
                return false;
            }
        }

        return true;
    }

    // 保存步骤数据
    function saveStepData(step) {
        const currentFormStep = document.querySelector(`.form-step[data-step="${step + 1}"]`);
        if (!currentFormStep) return;

        const inputs = currentFormStep.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                if (input.checked) {
                    if (!formData[input.name]) {
                        formData[input.name] = [];
                    }
                    if (input.type === 'radio') {
                        formData[input.name] = input.value;
                    } else {
                        formData[input.name].push(input.value);
                    }
                }
            } else {
                formData[input.name] = input.value;
            }
        });
    }

    // 分析用户输入
    function analyzeInput() {
        // 隐藏表单，显示分析界面
        document.querySelector('.ai-recommend-section').style.display = 'none';
        document.querySelector('.ai-analyzing').style.display = 'block';

        // 启动分析动画
        startAnalyzingAnimation();

        // 模拟分析过程
        setTimeout(() => {
            displayRecommendation();
        }, 3000);
    }

    // 启动分析动画
    function startAnalyzingAnimation() {
        const analyzingBar = document.querySelector('.analyzing-bar');
        if (analyzingBar) {
            analyzingBar.style.width = '0%';
            setTimeout(() => {
                analyzingBar.style.transition = 'width 3s ease-in-out';
                analyzingBar.style.width = '100%';
            }, 100);
        }
    }

    // 显示推荐结果
    function displayRecommendation() {
        document.querySelector('.ai-analyzing').style.display = 'none';
        document.querySelector('.recommendation-results').style.display = 'block';

        // 根据用户数据生成推荐
        generateRecommendation();
        
        // 滚动到结果区域
        document.querySelector('.recommendation-results').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    // 生成推荐内容
    function generateRecommendation() {
        const texts = LANGUAGE_CONFIG[currentLanguage];
        const recommendation = calculateRecommendation(formData);

        // 更新主推荐产品
        updateMainRecommendation(recommendation, texts);
        
        // 更新替代推荐
        updateAlternativeRecommendations(texts);
        
        // 更新推荐配件
        updateRecommendedAccessories(texts);
    }

    // 计算推荐结果
    function calculateRecommendation(data) {
        // 基于用户数据的推荐算法
        let score = 0;
        let reasons = [];
        let productType = 'smart';
        
        const texts = LANGUAGE_CONFIG[currentLanguage];

        // 根据身高推荐
        if (data.height) {
            const height = parseInt(data.height);
            if (height >= 160 && height <= 185) {
                score += 20;
                reasons.push(texts.products.main.reasons[0]);
            }
        }

        // 根据工作时间推荐
        if (data.sittingHours === 'more8' || data.sittingHours === '6to8') {
            score += 25;
            reasons.push(texts.products.main.reasons[1]);
        }

        // 根据桌面空间推荐
        if (data.deskWidth && data.deskDepth) {
            score += 20;
            reasons.push(texts.products.main.reasons[2]);
        }

        // 根据预算推荐
        if (data.budget === '3000to5000' || data.budget === '2000to3000') {
            score += 15;
            reasons.push(texts.products.main.reasons[3]);
        }

        // 根据重视特性推荐
        if (data.features && (data.features.includes('stability') || data.features.includes('noise'))) {
            score += 20;
            reasons.push(texts.products.main.reasons[4]);
        }

        return {
            score: Math.min(score, 98),
            reasons: reasons,
            productType: productType
        };
    }

    // 更新主推荐产品
    function updateMainRecommendation(recommendation, texts) {
        const matchPercentage = document.querySelector('.match-percentage');
        const productName = document.getElementById('recommendedProductName');
        const productPrice = document.getElementById('recommendedProductPrice');
        const reasonsList = document.getElementById('recommendationReasons');

        if (matchPercentage) {
            matchPercentage.textContent = recommendation.score + '%';
        }

        if (productName) {
            productName.textContent = texts.products.main.name;
        }

        if (productPrice) {
            productPrice.textContent = texts.products.main.price;
        }

        if (reasonsList) {
            reasonsList.innerHTML = '';
            recommendation.reasons.forEach(reason => {
                const li = document.createElement('li');
                li.textContent = reason;
                reasonsList.appendChild(li);
            });
        }
    }

    // 更新替代推荐
    function updateAlternativeRecommendations(texts) {
        const altProductsGrid = document.querySelector('.alt-products-grid');
        if (!altProductsGrid) return;

        altProductsGrid.innerHTML = '';
        
        texts.products.alternatives.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'alt-product-card';
            productCard.innerHTML = `
                <div class="alt-match">${product.match}</div>
                <img src="images/products/smart-desk-${index + 1}.jpg" alt="${product.name}">
                <h4>${product.name}</h4>
                <p class="alt-price">${product.price}</p>
                <a href="product-detail-en.html" class="btn-text">${texts.buttons.viewDetails}</a>
            `;
            altProductsGrid.appendChild(productCard);
        });
    }

    // 更新推荐配件
    function updateRecommendedAccessories(texts) {
        const accessoriesGrid = document.querySelector('.accessories-grid');
        if (!accessoriesGrid) return;

        accessoriesGrid.innerHTML = '';
        
        texts.accessories.forEach((accessory, index) => {
            const accessoryCard = document.createElement('div');
            accessoryCard.className = 'accessory-card';
            accessoryCard.innerHTML = `
                <img src="images/accessories/accessory-${index + 1}.jpg" alt="${accessory.name}">
                <h4>${accessory.name}</h4>
                <p class="accessory-description">${accessory.description}</p>
                <p class="accessory-price">${accessory.price}</p>
                <button class="btn-secondary add-to-cart" data-product-id="a00${index + 1}">${texts.buttons.addToCart}</button>
            `;
            accessoriesGrid.appendChild(accessoryCard);
        });
    }

    // 更新语言
    function updateLanguage() {
        const texts = LANGUAGE_CONFIG[currentLanguage];
        
        // 更新按钮文本
        const nextBtns = document.querySelectorAll('.next-btn');
        const prevBtns = document.querySelectorAll('.prev-btn');
        const submitBtn = document.querySelector('button[type="submit"]');
        
        nextBtns.forEach(btn => {
            btn.textContent = texts.buttons.next;
        });
        
        prevBtns.forEach(btn => {
            btn.textContent = texts.buttons.prev;
        });
        
        if (submitBtn) {
            submitBtn.textContent = texts.buttons.submit;
        }

        // 更新步骤标题
        const stepTitles = document.querySelectorAll('.form-step h2');
        stepTitles.forEach((title, index) => {
            if (texts.stepTitles[index + 1]) {
                title.textContent = texts.stepTitles[index + 1];
            }
        });
    }

    // 保存推荐结果
    function saveRecommendation() {
        const recommendationData = {
            timestamp: new Date().toISOString(),
            formData: formData,
            language: currentLanguage
        };

        // 保存到本地存储
        localStorage.setItem('aiRecommendation', JSON.stringify(recommendationData));
        
        // 显示保存成功消息
        const texts = LANGUAGE_CONFIG[currentLanguage];
        alert(currentLanguage === 'zh' ? '推荐结果已保存！' : 'Recommendation saved successfully!');
    }

    // 开始新的推荐
    function startNewRecommendation() {
        // 重置表单数据
        currentStep = 0;
        formData = {};
        
        // 重置表单
        const form = document.getElementById('aiRecommendForm');
        if (form) {
            form.reset();
        }
        
        // 显示表单，隐藏结果
        document.querySelector('.ai-recommend-section').style.display = 'block';
        document.querySelector('.recommendation-results').style.display = 'none';
        document.querySelector('.ai-analyzing').style.display = 'none';
        
        // 显示第一步
        showStep(0);
        updateProgress();
        
        // 滚动到表单顶部
        document.querySelector('.ai-recommend-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    // 加入购物车
    function addToCart(productId) {
        // 获取购物车数据
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // 检查产品是否已在购物车中
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }
        
        // 保存到本地存储
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // 显示成功消息
        if (!message) {
            const messages = {
                'zh': '已加入购物车！',
                'en': 'Added to cart!',
                'de': 'Zum Warenkorb hinzugefügt!'
            };
            message = messages[currentLanguage] || messages['en'];
        }
        
        // 更新购物车图标数量（如果存在）
        updateCartCount();
    }

    // 显示通知
    function showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 更新购物车数量
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.style.display = totalItems > 0 ? 'block' : 'none';
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initAiRecommendForm();
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(style);

// 导出函数供其他模块使用
window.AiRecommend = {
    init: initAiRecommendForm,
    addToCart: function(productId) {
        // 外部调用加入购物车功能
        const event = new CustomEvent('addToCart', { detail: { productId } });
        document.dispatchEvent(event);
    },
    getRecommendationData: function() {
        return JSON.parse(localStorage.getItem('aiRecommendation'));
    },
    clearRecommendationData: function() {
        localStorage.removeItem('aiRecommendation');
    }
};
