// Contact Us Page JavaScript Functions - Multilingual Version (English, German)

// 获取当前页面语言
function getCurrentLanguage() {
    // 从URL或HTML lang属性中获取当前语言
    const htmlLang = document.documentElement.lang;
    if (htmlLang.includes('de')) {
        return 'de';
    } else if (htmlLang.includes('en')) {
        return 'en';
    } else {
        return 'en'; // Default to English
    }
}

// 多语言验证消息
const validationMessages = {
    zh: {
        required: '此字段为必填项',
        name: {
            required: '请输入您的姓名',
            minLength: '姓名长度至少为2个字符'
        },
        email: {
            required: '请输入您的电子邮箱',
            invalid: '请输入有效的邮箱地址'
        },
        phone: {
            invalid: '请输入有效的手机号码'
        },
        subject: {
            required: '请选择咨询主题'
        },
        message: {
            required: '请输入留言内容',
            minLength: '留言内容至少需要10个字符'
        },
        verification: {
            required: '请输入验证码',
            invalid: '验证码不正确'
        },
        privacy: {
            required: '请阅读并同意隐私政策'
        },
        submitting: '提交中...',
        submit: '提交留言',
        success: {
            title: '提交成功！',
            message: '感谢您的留言，我们将在1个工作日内回复您。',
            button: '确定'
        }
    },
    en: {
        required: 'This field is required',
        name: {
            required: 'Please enter your name',
            minLength: 'Name must be at least 2 characters'
        },
        email: {
            required: 'Please enter your email address',
            invalid: 'Please enter a valid email address'
        },
        phone: {
            invalid: 'Please enter a valid phone number'
        },
        subject: {
            required: 'Please select a subject'
        },
        message: {
            required: 'Please enter your message',
            minLength: 'Message must be at least 10 characters'
        },
        verification: {
            required: 'Please enter the verification code',
            invalid: 'Verification code is incorrect'
        },
        privacy: {
            required: 'Please read and agree to the privacy policy'
        },
        submitting: 'Submitting...',
        submit: 'Submit Message',
        success: {
            title: 'Submission Successful!',
            message: 'Thank you for your message. We will respond within 1 business day.',
            button: 'OK'
        }
    },
    de: {
        required: 'Dieses Feld ist erforderlich',
        name: {
            required: 'Name ist erforderlich',
            minLength: 'Name muss mindestens 2 Zeichen lang sein'
        },
        email: {
            required: 'E-Mail ist erforderlich',
            invalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
        },
        phone: {
            invalid: 'Bitte geben Sie eine gültige Telefonnummer ein'
        },
        subject: {
            required: 'Bitte wählen Sie einen Betreff aus'
        },
        message: {
            required: 'Nachricht ist erforderlich',
            minLength: 'Nachricht muss mindestens 10 Zeichen lang sein'
        },
        verification: {
            required: 'Bestätigungscode ist erforderlich',
            invalid: 'Bestätigungscode ist nicht korrekt'
        },
        privacy: {
            required: 'Sie müssen den Datenschutzrichtlinien zustimmen'
        },
        submitting: 'Wird gesendet...',
        submit: 'Anfrage absenden',
        success: {
            title: 'Erfolgreich gesendet!',
            message: 'Vielen Dank für Ihre Nachricht. Wir werden innerhalb eines Werktages antworten.',
            button: 'OK'
        }
    }
};

// 门店地图坐标 - 多语言版本
const storeCoordinates = {
    zh: {
        beijing: { lat: 39.9042, lng: 116.4074, name: '北京旗舰店' },
        tianjin: { lat: 39.3434, lng: 117.3616, name: '天津店' },
        shanghai: { lat: 31.2304, lng: 121.4737, name: '上海旗舰店' },
        hangzhou: { lat: 30.2741, lng: 120.1551, name: '杭州店' },
        nanjing: { lat: 32.0603, lng: 118.7969, name: '南京店' },
        guangzhou: { lat: 23.1291, lng: 113.2644, name: '广州旗舰店' },
        shenzhen: { lat: 22.5431, lng: 114.0579, name: '深圳店' },
        chengdu: { lat: 30.5728, lng: 104.0668, name: '成都店' },
        xian: { lat: 34.3416, lng: 108.9398, name: '西安店' }
    },
    en: {
        beijing: { lat: 39.9042, lng: 116.4074, name: 'Beijing Flagship Store' },
        tianjin: { lat: 39.3434, lng: 117.3616, name: 'Tianjin Store' },
        shanghai: { lat: 31.2304, lng: 121.4737, name: 'Shanghai Flagship Store' },
        hangzhou: { lat: 30.2741, lng: 120.1551, name: 'Hangzhou Store' },
        nanjing: { lat: 32.0603, lng: 118.7969, name: 'Nanjing Store' },
        guangzhou: { lat: 23.1291, lng: 113.2644, name: 'Guangzhou Flagship Store' },
        shenzhen: { lat: 22.5431, lng: 114.0579, name: 'Shenzhen Store' },
        chengdu: { lat: 30.5728, lng: 104.0668, name: 'Chengdu Store' },
        xian: { lat: 34.3416, lng: 108.9398, name: "Xi'an Store" }
    },
    de: {
        berlin: { lat: 52.5200, lng: 13.4050, name: 'Berlin Flagship-Store' },
        hamburg: { lat: 53.5511, lng: 9.9937, name: 'Hamburg Store' },
        dresden: { lat: 51.0504, lng: 13.7373, name: 'Dresden Store' },
        leipzig: { lat: 51.3397, lng: 12.3731, name: 'Leipzig Store' },
        muenchen: { lat: 48.1351, lng: 11.5820, name: 'München Flagship-Store' },
        stuttgart: { lat: 48.7758, lng: 9.1829, name: 'Stuttgart Store' },
        koeln: { lat: 50.9375, lng: 6.9603, name: 'Köln Store' },
        duesseldorf: { lat: 51.2277, lng: 6.7735, name: 'Düsseldorf Store' }
    }
};

// 营业时间提示 - 多语言版本
const businessHoursText = {
    zh: {
        outside: '当前为非营业时间。',
        currentTime: '当前时间：',
        hours: '营业时间：周一至周日 9:00-21:00'
    },
    en: {
        outside: 'Outside business hours.',
        currentTime: 'Current time: ',
        hours: 'Business hours: Mon-Sun 9:00-21:00'
    },
    de: {
        outside: 'Außerhalb der Geschäftszeiten.',
        currentTime: 'Aktuelle Zeit in Deutschland: ',
        hours: 'Geschäftszeiten: Mo-Fr 9:00-18:00, Sa 10:00-16:00'
    }
};

// 地图提示文本 - 多语言版本
const mapAlertText = {
    zh: store => `正在为您打开${store.name}的地图位置...`,
    en: store => `Opening map location for ${store.name}...`,
    de: store => `Karte für ${store.name} wird geöffnet...`
};

// FAQ折叠功能
function initFaqToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 关闭所有其他FAQ项
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前项状态
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// 门店地图和标签页切换
function initStoreMap() {
    const storeTabs = document.querySelectorAll('.store-tab');
    const storePanels = document.querySelectorAll('.store-panel');
    
    storeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const region = tab.dataset.region;
            
            // 更新标签页状态
            storeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 更新面板显示
            storePanels.forEach(panel => {
                if (panel.dataset.region === region) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
    
    // 查看地图功能
    const viewMapLinks = document.querySelectorAll('.view-map');
    viewMapLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const store = link.dataset.store;
            openStoreMap(store);
        });
    });
}

// 打开门店地图
function openStoreMap(store) {
    const lang = getCurrentLanguage();
    const storeList = storeCoordinates[lang] || storeCoordinates.zh;
    
    const storeInfo = storeList[store];
    if (storeInfo) {
        const alertMessage = mapAlertText[lang](storeInfo);
        alert(alertMessage);
        
        // 实际项目中可以这样使用：
        // if (lang === 'zh') {
        //     window.open(`https://map.baidu.com/?q=${storeInfo.name}&c=1`);
        // } else {
        //     window.open(`https://maps.google.com/?q=${storeInfo.lat},${storeInfo.lng}`);
        // }
    }
}

// 联系表单验证和提交
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    const lang = getCurrentLanguage();
    const messages = validationMessages[lang] || validationMessages.zh;
    
    // 实时验证
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });
    
    // 表单提交
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // 验证码刷新
    const refreshCodeLink = document.querySelector('.refresh-code');
    if (refreshCodeLink) {
        refreshCodeLink.addEventListener('click', (e) => {
            e.preventDefault();
            refreshVerificationCode();
        });
    }
    
    // 如果是德国网站，添加营业时间提示
    if (lang === 'de') {
        addBusinessHoursNotice();
    }
}

// 添加营业时间提示（德国特有）
function addBusinessHoursNotice() {
    const contactForm = document.querySelector('.contact-form-container');
    if (!contactForm) return;
    
    const noticeDiv = document.createElement('div');
    noticeDiv.className = 'business-hours-notice';
    contactForm.prepend(noticeDiv);
    
    // 初始显示
    updateBusinessHoursNotice();
    
    // 每分钟更新一次
    setInterval(updateBusinessHoursNotice, 60000);
}

// 更新营业时间提示
function updateBusinessHoursNotice() {
    const noticeContainer = document.querySelector('.business-hours-notice');
    if (!noticeContainer) return;
    
    const lang = getCurrentLanguage();
    const businessHours = checkBusinessHours(lang);
    const texts = businessHoursText[lang];
    
    if (!businessHours.isBusinessHours) {
        noticeContainer.innerHTML = `
            <div class="notice-content">
                <i class="icon-clock"></i>
                <span>${texts.outside} ${texts.currentTime}${businessHours.localTime}</span>
                <small>${texts.hours}</small>
            </div>
        `;
        noticeContainer.style.display = 'block';
    } else {
        noticeContainer.style.display = 'none';
    }
}

// 检查营业时间
function checkBusinessHours(lang) {
    let now = new Date();
    let localTime;
    let hour = now.getHours();
    let day = now.getDay(); // 0 = 周日, 1 = 周一, 等等
    let isBusinessHours = false;
    
    if (lang === 'de') {
        // 德国时区
        const germanTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Berlin"}));
        hour = germanTime.getHours();
        day = germanTime.getDay();
        localTime = germanTime.toLocaleString('de-DE');
        
        // 德国营业时间：周一到周五 9:00-18:00，周六 10:00-16:00，周日休息
        if (day >= 1 && day <= 5) { // 周一到周五
            isBusinessHours = hour >= 9 && hour < 18;
        } else if (day === 6) { // 周六
            isBusinessHours = hour >= 10 && hour < 16;
        }
    } else {
        // 中国/其他地区营业时间：周一到周日 9:00-21:00
        localTime = now.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US');
        isBusinessHours = hour >= 9 && hour < 21;
    }
    
    return {
        isBusinessHours,
        localTime
    };
}

// 验证单个字段
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const lang = getCurrentLanguage();
    const messages = validationMessages[lang] || validationMessages.zh;
    
    let isValid = true;
    let errorMessage = '';
    
    // 必填字段验证
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = messages[fieldName]?.required || messages.required;
    }
    
    // 特定字段验证
    if (value) {
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = messages.name.minLength;
                }
                break;
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = messages.email.invalid;
                }
                break;
            case 'phone':
                if (!isValidPhone(value, lang)) {
                    isValid = false;
                    errorMessage = messages.phone.invalid;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = messages.message.minLength;
                }
                break;
            case 'verification':
                if (!isValidVerificationCode(value)) {
                    isValid = false;
                    errorMessage = messages.verification.invalid;
                }
                break;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// 验证整个表单
function validateForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    const lang = getCurrentLanguage();
    const messages = validationMessages[lang] || validationMessages.zh;
    
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // 验证隐私政策同意
    const privacyCheckbox = form.querySelector('input[name="privacy"]');
    if (!privacyCheckbox.checked) {
        showFieldError(privacyCheckbox, messages.privacy.required);
        isValid = false;
    }
    
    return isValid;
}

// 显示字段错误
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// 清除字段错误
function clearFieldError(field) {
    field.classList.remove('error');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// 邮箱验证
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 手机号验证 - 根据不同国家/地区
function isValidPhone(phone, lang) {
    if (!phone) return true; // 如果为空则不验证（非必填）
    
    // 清理电话号码中的空格、破折号等
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    if (lang === 'de') {
        // 德国手机号格式验证
        const germanMobileRegex = /^(\+49|0)[1-9][0-9]{8,11}$/;
        return germanMobileRegex.test(cleanPhone);
    } else if (lang === 'en') {
        // 国际格式手机号验证 (更宽松)
        const internationalPhoneRegex = /^\+?[0-9]{7,15}$/;
        return internationalPhoneRegex.test(cleanPhone);
    } else {
        // 中国手机号验证
        const chinesePhoneRegex = /^1[3-9]\d{9}$/;
        return chinesePhoneRegex.test(cleanPhone);
    }
}

// 验证码验证（模拟）
function isValidVerificationCode(code) {
    // 这里应该与后端验证，现在只是模拟
    return code.length === 4;
}

// 刷新验证码
function refreshVerificationCode() {
    const verificationImg = document.querySelector('.verification-code img');
    if (verificationImg) {
        // 添加时间戳防止缓存
        const timestamp = new Date().getTime();
        verificationImg.src = `images/verification-code.jpg?t=${timestamp}`;
        
        // 添加刷新动画
        verificationImg.style.opacity = '0.5';
        setTimeout(() => {
            verificationImg.style.opacity = '1';
        }, 300);
    }
}

// 提交表单
function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    
    const lang = getCurrentLanguage();
    const messages = validationMessages[lang] || validationMessages.zh;
    
    // 显示提交状态
    submitBtn.disabled = true;
    submitBtn.textContent = messages.submitting;
    
    // 模拟提交过程
    setTimeout(() => {
        // 这里应该是真实的API调用
        console.log('表单数据:', Object.fromEntries(formData));
        
        // 显示成功消息
        showSuccessMessage();
        
        // 重置表单
        form.reset();
        
        // 恢复按钮状态
        submitBtn.disabled = false;
        submitBtn.textContent = messages.submit;
    }, 2000);
}

// 显示成功消息
function showSuccessMessage() {
    const lang = getCurrentLanguage();
    const messages = validationMessages[lang] || validationMessages.zh;
    const success = messages.success;
    
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="success-content">
            <h3>${success.title}</h3>
            <p>${success.message}</p>
            <button onclick="this.parentElement.parentElement.remove()">${success.button}</button>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // 3秒后自动关闭
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

// 页面滚动时的动画效果
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        // 如果浏览器不支持IntersectionObserver，则跳过动画
        return;
    }
    
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
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.info-item, .faq-item, .store-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}



// 添加样式
function addStyles() {
    const styles = `
        .success-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .success-content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .success-content h3 {
            color: #27ae60;
            margin-bottom: 1rem;
        }
        
        .success-content p {
            color: #666;
            margin-bottom: 1.5rem;
        }
        
        .success-content button {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
        }
        
        .success-content button:hover {
            background: #5a6fd8;
        }
        
        .field-error {
            color: #e74c3c;
            font-size: 0.9rem;
            margin-top: 0.5rem;
        }
        
        .error {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
        }
        
        .info-item,
        .faq-item,
        .store-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .info-item.animate-in,
        .faq-item.animate-in,
        .store-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .business-hours-notice {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            display: none;
        }
        
        .notice-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-direction: column;
            text-align: center;
        }
        
        .notice-content i {
            color: #856404;
        }
        
        .notice-content span {
            color: #856404;
            font-weight: 500;
        }
        
        .notice-content small {
            color: #6c757d;
            font-size: 0.875rem;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    // 添加样式
    addStyles();
    
    // 初始化各功能
    initFaqToggle();
    initStoreMap();
    initContactForm();
    initScrollAnimations();
});

// 导出函数供其他模块使用
window.ShimoContact = {
    init: function() {
        initFaqToggle();
        initStoreMap();
        initContactForm();
        initScrollAnimations();
    },
    validateForm,
    submitForm,
    getCurrentLanguage
};
