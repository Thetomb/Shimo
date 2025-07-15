// ================ 聊天机器人功能 ================
document.addEventListener('DOMContentLoaded', function() {
    // 聊天机器人核心变量和配置
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const quickButtons = document.querySelectorAll('.quick-btn');
    const typingIndicator = document.querySelector('.typing-indicator');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageToggle = document.getElementById('languageToggle');
    const languageMenu = document.getElementById('languageMenu');
    const languageOptions = document.querySelectorAll('.lang-btn');
    
    // 如果关键元素不存在，提前返回
    if (!languageToggle || !languageMenu) {
        console.error('语言切换器DOM元素未找到');
        return;
    }
    
    // 自动检测当前页面语言
    function detectCurrentLanguage() {
        const htmlLang = document.documentElement.lang;
        const pathname = window.location.pathname;
        const savedLang = localStorage.getItem('preferredLanguage');
        
        // 优先使用用户保存的语言偏好
        if (savedLang && (savedLang === 'en' || savedLang === 'de')) {
            return savedLang;
        }
        
        // 根据URL路径判断
        if (pathname.includes('-de.html')) {
            return 'de';
        } else if (pathname.includes('-en.html')) {
            return 'en';
        }
        
        // 根据HTML lang属性判断
        if (htmlLang === 'de') {
            return 'de';
        } else {
            return 'en'; // 默认英语，不再依赖浏览器语言
        }
    }
    
    let currentLanguage = detectCurrentLanguage();
    

    
    // 多语言配置
    const translations = {
        en: {
            placeholder: 'Enter your needs or questions...',
            sendButton: 'Send',
            quickOptions: {
                office: 'Office Use',
                home: 'Home Office',
                gaming: 'Gaming & Entertainment'
            },
            quickMessages: {
                office: 'I mainly use it in the office, what kind of standing desk do I need?',
                home: 'I work from home, what standing desk do you recommend?',
                gaming: 'I need a standing desk suitable for gaming and entertainment'
            },
            actions: {
                browseAll: 'Browse All Products',
                aiRecommend: 'AI Smart Recommendation'
            },
            errorMessage: 'Sorry, I cannot respond to your question at the moment. Please try again later or contact customer service.'
        },
        de: {
            placeholder: 'Geben Sie Ihre Bedürfnisse oder Fragen ein...',
            sendButton: 'Senden',
            quickOptions: {
                office: 'Büronutzung',
                home: 'Heimbüro',
                gaming: 'Gaming & Unterhaltung'
            },
            quickMessages: {
                office: 'Ich benutze es hauptsächlich im Büro, welchen Stehschreibtisch brauche ich?',
                home: 'Ich arbeite von zu Hause aus, welchen Stehschreibtisch empfehlen Sie?',
                gaming: 'Ich brauche einen Stehschreibtisch für Gaming und Unterhaltung'
            },
            actions: {
                browseAll: 'Alle Produkte durchsuchen',
                aiRecommend: 'KI-Empfehlung'
            },
            errorMessage: 'Entschuldigung, ich kann Ihre Frage momentan nicht beantworten. Bitte versuchen Sie es später erneut oder kontaktieren Sie den Kundendienst.'
        }
    };
    
    // 系统提示模板（多语言）
    const systemPrompts = {
        en: `You are the AI assistant for Shimo Smart Standing Desks, specializing in product consultation, recommendations, and usage advice. Please respond in English.

Shimo product line includes:
1. S-DESK PRO Smart Edition: £319 (original £367), dual-motor system, 4 memory presets, anti-collision protection, silent design, 80kg weight capacity, suitable for office use
2. S-DESK EXECUTIVE Premium Business Edition: £511, walnut solid wood desktop, wireless charging area, LED light strip, APP control, suitable for high-end business and gaming
3. S-DESK HOME Edition: £159 (original £191), single motor, cable management system, minimalist design, easy installation, 120cm width suitable for small spaces

Please respond to user questions about products in a professional and friendly manner, provide appropriate product recommendations, and give usage suggestions based on user needs. Answers should be concise and highlight product advantages. Use emoji to increase friendliness.`,
        
        de: `Sie sind der KI-Assistent für Shimo Smart-Stehschreibtische und spezialisieren sich auf Produktberatung, Empfehlungen und Nutzungshinweise. Bitte antworten Sie auf Deutsch.

Die Shimo-Produktlinie umfasst:
1. S-DESK PRO Smart Edition: €369 (Original €419), Doppelmotor-System, 4 Speicherplätze, Kollisionsschutz, geräuscharmes Design, 80kg Tragfähigkeit, geeignet für Büronutzung
2. S-DESK EXECUTIVE Premium Business Edition: €599, Walnuss-Massivholzplatte, kabelloser Ladebereich, LED-Lichtleiste, APP-Steuerung, geeignet für gehobene Business- und Gaming-Anwendungen
3. S-DESK HOME Edition: €179 (Original €219), Einzelmotor, Kabelmanagement-System, minimalistisches Design, einfache Installation, 120cm Breite geeignet für kleine Räume

Bitte beantworten Sie Benutzerfragen zu Produkten auf professionelle und freundliche Weise, geben Sie geeignete Produktempfehlungen und Nutzungsvorschläge basierend auf den Bedürfnissen des Benutzers. Antworten sollten präzise sein und die Produktvorteile hervorheben. Verwenden Sie Emojis, um die Freundlichkeit zu erhöhen.`
    };
    
    // API配置
    const API_CONFIG = {
        endpoint: 'https://api.siliconflow.cn/v1/chat/completions',
        apiKey: 'sk-ztuvhvasxwqbhzmvpboheheccypfwvzwzmkfnlzcbavcupmj',
        model: 'deepseek-ai/DeepSeek-R1'
    };
    
    // 聊天历史记录 - 用于API上下文
    let chatHistory = [
        {
            role: "system",
            content: systemPrompts[currentLanguage]
        }
    ];
    
    // 更新UI语言
    function updateUILanguage() {
        // 更新占位符文本
        chatInput.placeholder = translations[currentLanguage].placeholder;
        
        // 更新快速选项按钮
        quickButtons.forEach(button => {
            const option = button.dataset.option;
            button.textContent = translations[currentLanguage].quickOptions[option];
        });
        
        // 更新操作按钮
        const actionButtons = document.querySelectorAll('.action-btn');
        if (actionButtons.length >= 2) {
            actionButtons[0].textContent = translations[currentLanguage].actions.browseAll;
            actionButtons[1].textContent = translations[currentLanguage].actions.aiRecommend;
        }
        
        // 更新发送按钮（如果有文本内容）
        if (sendBtn.querySelector('span')) {
            sendBtn.querySelector('span').textContent = translations[currentLanguage].sendButton;
        }
    }
    
    // 切换语言
    function switchLanguage(lang) {
        if (currentLanguage === lang) return; // 如果是当前语言，不做任何操作
        
        currentLanguage = lang;
        
        // 更新系统提示
        chatHistory[0] = {
            role: "system",
            content: systemPrompts[lang]
        };
        
        // 如果有历史对话，添加语言切换提示
        if (chatHistory.length > 1) {
            chatHistory.push({
                role: "system",
                content: `User switched to ${lang === 'en' ? 'English' : 'German'} interface, please respond in ${lang === 'en' ? 'English' : 'German'}.`
            });
        }
        
        // 更新UI语言
        updateUILanguage();
        
        // 更新语言选项状态
        updateLanguageOptionState();
        
        // 保存用户语言偏好
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // 更新语言选项状态
    function updateLanguageOptionState() {
        languageOptions.forEach(option => {
            if (option.dataset.lang === currentLanguage) {
                option.classList.add('active');
                // 根据当前语言设置按钮显示文本
                const displayText = currentLanguage === 'en' ? 'English' : 'Deutsch';
                languageToggle.querySelector('span').textContent = displayText;
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    // 点击语言选择器显示/隐藏选项
    languageToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        languageMenu.classList.toggle('show');
        languageToggle.classList.toggle('active');
    });
    
    // 点击页面其他区域关闭下拉菜单
    document.addEventListener('click', function() {
        languageMenu.classList.remove('show');
        languageToggle.classList.remove('active');
    });
    
    // 防止下拉菜单内部点击事件冒泡
    languageMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // 点击语言选项切换语言
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            
            // 关闭下拉菜单
            languageMenu.classList.remove('show');
            languageToggle.classList.remove('active');
            
            // 如果点击的是当前语言，不做任何操作
            if (lang === currentLanguage) {
                return;
            }
            
            // 跳转到对应语言的页面
            const currentPath = window.location.pathname;
            let targetPath;
            
            if (lang === 'de') {
                // 切换到德语页面
                if (currentPath.includes('-en.html')) {
                    targetPath = currentPath.replace('-en.html', '-de.html');
                } else if (currentPath.includes('.html') && !currentPath.includes('-de.html')) {
                    targetPath = currentPath.replace('.html', '-de.html');
                } else {
                    targetPath = 'landing-de.html';
                }
            } else {
                // 切换到英语页面
                if (currentPath.includes('-de.html')) {
                    targetPath = currentPath.replace('-de.html', '-en.html');
                } else if (currentPath.includes('.html') && !currentPath.includes('-en.html')) {
                    targetPath = currentPath.replace('.html', '-en.html');
                } else {
                    targetPath = 'landing-en.html';
                }
            }
            
            // 保存语言偏好
            localStorage.setItem('preferredLanguage', lang);
            
            // 跳转到目标页面
            window.location.href = targetPath;
        });
    });
    
    // 处理发送消息
    function sendMessage(message) {
        if (!message.trim()) return;
        
        // 禁用发送按钮
        sendBtn.disabled = true;
        
        // 添加用户消息
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user-message';
        userMessageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatMessages.insertBefore(userMessageDiv, typingIndicator);
        
        // 清空输入框
        chatInput.value = '';
        
        // 滚动到底部
        scrollToBottom();
        
        // 显示输入中指示器
        showTypingIndicator();
        
        // 添加用户消息到历史记录
        chatHistory.push({
            role: "user",
            content: message
        });
        
        // 调用API获取回复
        fetchAIResponse();
    }
    
    // 显示输入中指示器
    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
        scrollToBottom();
    }
    
    // 隐藏输入中指示器
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }
    
    // 滚动到底部
    function scrollToBottom() {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }
    
    // 从API获取AI回复
    async function fetchAIResponse() {
        try {
            const response = await fetch(API_CONFIG.endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_CONFIG.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: API_CONFIG.model,
                    messages: chatHistory,
                    stream: false,
                    max_tokens: 800,
                    temperature: 0.7,
                    top_p: 0.7,
                    top_k: 50,
                    frequency_penalty: 0.5
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = data.choices[0].message.content;

            // 移除"正在输入"指示器
            hideTypingIndicator();

            // 将AI回复添加到聊天框
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'message bot-message';
            
            // 将换行符转换为HTML换行
            const formattedMessage = aiMessage.replace(/\n/g, '<br>');
            
            botMessageDiv.innerHTML = `
                <div class="message-content">
                    ${formattedMessage}
                </div>
            `;
            chatMessages.insertBefore(botMessageDiv, typingIndicator);
            
            // 滚动到底部
            scrollToBottom();

            // 将AI回复添加到历史记录
            chatHistory.push({
                role: "assistant",
                content: aiMessage
            });

            // 如果历史记录太长，清理一部分以节省token
            if (chatHistory.length > 12) {
                // 保留system提示和最近的对话
                const systemMessage = chatHistory[0];
                chatHistory = [systemMessage, ...chatHistory.slice(-11)];
            }
            
            // 启用发送按钮
            sendBtn.disabled = false;

        } catch (error) {
            console.error('API request error:', error);
            
            // 移除"正在输入"指示器
            hideTypingIndicator();
            
            // 显示错误消息
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'message bot-message';
            botMessageDiv.innerHTML = `
                <div class="message-content">
                    <p>${translations[currentLanguage].errorMessage}</p>
                </div>
            `;
            chatMessages.insertBefore(botMessageDiv, typingIndicator);
            
            // 滚动到底部
            scrollToBottom();
            
            // 启用发送按钮
            sendBtn.disabled = false;
        }
    }
    
    // 发送按钮点击事件
    sendBtn.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            sendMessage(message);
        }
    });
    
    // 回车发送消息
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !sendBtn.disabled) {
            const message = chatInput.value.trim();
            if (message) {
                sendMessage(message);
            }
        }
    });
    
    // 快捷选项点击事件
    quickButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除其他按钮的激活状态
            quickButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的激活状态
            this.classList.add('active');
            
            const option = this.dataset.option;
            const message = translations[currentLanguage].quickMessages[option];
            
            chatInput.value = message;
            sendMessage(message);
        });
    });
    
    // 产品卡片按钮事件
    document.querySelectorAll('.card-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 简单的点击反馈
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 这里可以添加实际的购买/收藏逻辑
            const action = this.textContent;
            console.log(`用户点击了: ${action}`);
        });
    });
    
    // 检查是否有保存的语言偏好
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['zh', 'en', 'de'].includes(savedLanguage)) {
        currentLanguage = savedLanguage;
        chatHistory[0].content = systemPrompts[currentLanguage];
    }
    
    // 初始化UI语言
    updateUILanguage();
    
    // 初始化语言选项状态
    updateLanguageOptionState();
    
    // 初始化时滚动到底部
    scrollToBottom();

    // ================ 着陆页功能 ================
    initScrollEffects();
    initNavigation();
    initAnimations();
    initInteractiveElements();
    initCounterAnimations();
    initParallaxEffects();
    initPageLoadAnimations();
    initMouseTracking();
    initProductCards();
    
    // 滚动效果
    function initScrollEffects() {
        const nav = document.querySelector('.landing-nav');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        window.addEventListener('scroll', throttle(() => {
            const scrollY = window.scrollY;
            
            // 导航栏背景透明度
            if (nav) {
                const opacity = Math.min(scrollY / 100, 1);
                nav.style.background = `rgba(255, 255, 255, ${0.95 * opacity})`;
            }
            
            // 滚动指示器淡出
            if (scrollIndicator) {
                const opacity = Math.max(1 - scrollY / 300, 0);
                scrollIndicator.style.opacity = opacity;
            }
        }, 16));
    }
    
    // 导航功能
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    
    // 动画效果
    function initAnimations() {
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
        const animateElements = document.querySelectorAll(
            '.feature-card, .testimonial-card, .section-header'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
        
        // 添加CSS动画类
        const style = document.createElement('style');
        style.textContent = `
            .feature-card, .testimonial-card, .section-header {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 交互元素
    function initInteractiveElements() {
        // 3D桌子悬停效果
        const desk3D = document.querySelector('.desk-3d');
        if (desk3D) {
            desk3D.addEventListener('mouseenter', function() {
                this.style.transform = 'perspective(800px) rotateX(10deg) rotateY(-10deg) scale(1.05)';
            });
            
            desk3D.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(800px) rotateX(15deg) rotateY(-15deg)';
            });
        }
        
        // 控制面板交互
        const btnUp = document.querySelector('.btn-up');
        const btnDown = document.querySelector('.btn-down');
        const panelDisplay = document.querySelector('.panel-display');
        const deskLegs = document.querySelectorAll('.leg');
        
        let currentHeight = 75; // 默认高度 (cm)
        
        if (btnUp && btnDown && panelDisplay) {
            function updateDisplay() {
                panelDisplay.textContent = `${currentHeight}cm`;
            }
            
            function animateHeight(newHeight) {
                const heightDiff = newHeight - currentHeight;
                const scale = 1 + (heightDiff * 0.01); // 高度变化转换为缩放
                
                deskLegs.forEach(leg => {
                    leg.style.transform = `scaleY(${scale})`;
                    leg.style.transformOrigin = 'bottom';
                });
                
                setTimeout(() => {
                    deskLegs.forEach(leg => {
                        leg.style.transform = 'scaleY(1)';
                    });
                }, 300);
            }
            
            btnUp.addEventListener('click', function() {
                if (currentHeight < 120) {
                    currentHeight += 5;
                    updateDisplay();
                    animateHeight(currentHeight);
                    this.style.background = '#10b981';
                    setTimeout(() => {
                        this.style.background = '#374151';
                    }, 200);
                }
            });
            
            btnDown.addEventListener('click', function() {
                if (currentHeight > 60) {
                    currentHeight -= 5;
                    updateDisplay();
                    animateHeight(currentHeight);
                    this.style.background = '#ef4444';
                    setTimeout(() => {
                        this.style.background = '#374151';
                    }, 200);
                }
            });
            
            updateDisplay();
        }
        
        // 按钮悬停效果增强
        const buttons = document.querySelectorAll('.btn-primary-large, .btn-secondary-large, .btn-cta-primary, .btn-cta-secondary');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = this.style.transform.replace('translateY(-3px)', '') + ' translateY(-3px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' translateY(-3px)', '');
            });
        });
    }
    
    // 高度变化动画
    function animateHeightChange(legs, scale) {
        legs.forEach((leg, index) => {
            setTimeout(() => {
                leg.style.transform = `scaleY(${scale})`;
                leg.style.transformOrigin = 'bottom';
                leg.style.transition = 'transform 0.3s ease';
            }, index * 50);
        });
    }
    
    // 数字计数动画
    function initCounterAnimations() {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, observerOptions);
        
        const counters = document.querySelectorAll('.stat-number, .highlight-number');
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    function animateCounter(element) {
        const text = element.textContent;
        const hasPercent = text.includes('%');
        const hasPlus = text.includes('+');
        const isSpecial = text.includes('/'); // 处理 24/7 这样的特殊情况
        
        if (isSpecial) {
            // 对于 24/7 这样的文本，直接显示
            return;
        }
        
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        if (isNaN(number)) return;
        
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            let displayText = Math.floor(current).toString();
            if (hasPercent) displayText += '%';
            if (hasPlus) displayText += '+';
            
            element.textContent = displayText;
        }, duration / steps);
    }
    
    // 视差效果
    function initParallaxEffects() {
        const floatingElements = document.querySelectorAll('.float-element');
        const featureBubbles = document.querySelectorAll('.feature-bubble');
        
        window.addEventListener('scroll', throttle(() => {
            const scrollY = window.scrollY;
            
            floatingElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            featureBubbles.forEach((bubble, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrollY * speed);
                bubble.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));
    }
    
    // 页面加载动画
    function initPageLoadAnimations() {
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (heroVisual) {
            heroVisual.style.opacity = '0';
            heroVisual.style.transform = 'translateX(30px)';
            
            setTimeout(() => {
                heroVisual.style.transition = 'all 0.8s ease';
                heroVisual.style.opacity = '1';
                heroVisual.style.transform = 'translateX(0)';
            }, 600);
        }
    }
    
    // 鼠标跟踪效果
    function initMouseTracking() {
        const desk3D = document.querySelector('.desk-3d');
        if (!desk3D) return;
        
        const container = desk3D.closest('.hero-visual');
        if (!container) return;
        
        container.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (mouseY / rect.height) * -10;
            const rotateY = (mouseX / rect.width) * 10;
            
            desk3D.style.transform = `perspective(800px) rotateX(${15 + rotateX}deg) rotateY(${-15 + rotateY}deg)`;
        });
        
        container.addEventListener('mouseleave', function() {
            desk3D.style.transform = 'perspective(800px) rotateX(15deg) rotateY(-15deg)';
        });
    }
    
    // 性能优化：节流函数
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // 产品卡片交互功能
    function initProductCards() {
        const productCards = document.querySelectorAll('.preview-card');
        productCards.forEach(card => {
            card.addEventListener('click', function() {
                const productName = this.querySelector('.card-title')?.textContent || '产品';
                const productType = this.dataset.product;
                
                // 添加点击效果
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // 根据产品类型跳转到相应页面
                switch(productType) {
                    case 'basic':
                        window.location.href = 'basic-products.html';
                        break;
                    case 'smart':
                        window.location.href = 'smart-products.html';
                        break;
                    case 'premium':
                        window.location.href = 'premium-products.html';
                        break;
                    default:
                        window.location.href = 'products.html';
                }
            });
        });
    }
    
    // 错误处理
    window.addEventListener('error', function(e) {
        console.warn('Landing page script error:', e.error);
    });
    
    // 初始化语言设置
    function initializeLanguage() {
        // 更新UI语言
        updateUILanguage();
        // 更新语言选项状态
        updateLanguageOptionState();
    }
    
    // 页面加载完成后初始化
    initializeLanguage();
});