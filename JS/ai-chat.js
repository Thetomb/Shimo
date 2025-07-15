/**
 * Shimo智能升降桌 - AI聊天助手
 * 支持中英德三语模式
 * 使用DeepSeek API提供智能对话服务
 */

// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const languageToggle = document.getElementById('languageToggle');
    const languageMenu = document.getElementById('languageMenu');

    // 根据当前HTML页面确定语言
    const currentPage = window.location.pathname;
    let currentLanguage = 'en'; // Default English
    if (currentPage.includes('-en')) {
        currentLanguage = 'en';
    } else if (currentPage.includes('-de')) {
        currentLanguage = 'de';
    }

    // API配置
    const API_CONFIG = {
        endpoint: 'https://api.siliconflow.cn/v1/chat/completions',
        apiKey: 'sk-ztuvhvasxwqbhzmvpboheheccypfwvzwzmkfnlzcbavcupmj',
        model: 'deepseek-ai/DeepSeek-R1'
    };

    // 语言配置
    const LANGUAGE_CONFIG = {
        zh: {
            title: 'AI聊天',
            placeholder: '请输入您的问题...',
            sendButton: '发送',
            welcomeMessage: '您好！我是Shimo智能助手，很高兴为您服务。我可以帮您选择合适的升降桌型号，解答产品功能与规格，或提供使用建议。请问有什么可以帮到您？',
            errorMessage: '抱歉，我暂时无法回应您的问题。请稍后再试或联系客服人员。',
            typingText: '正在输入...',
            quickReplies: [
                '我想了解产品型号',
                '价格和优惠信息',
                '安装和保修服务',
                '产品规格参数'
            ],
            systemPrompt: `You are Shimo's smart standing desk AI assistant, specializing in product consultation, recommendations and usage advice. Please answer in English.

Shimo产品系列包括:
1. Shimo Basic: ¥1299，基础电动升降功能，承重80kg，适合初次使用升降桌的用户
2. Shimo Pro: ¥1999，静音电机，承重120kg，4个记忆高度，防撞功能，USB充电端口，适合长时间办公的专业人士
3. Shimo Premium: ¥2699，双电机系统，承重150kg，APP控制，健康提醒，自动升降，隐藏式线缆管理，适合注重健康与效率的高要求用户
4. Shimo Custom: ¥3499起，全定制桌面，智能家居集成，高级材质选择，所有Premium功能，适合寻求独特设计和最高品质的用户

桌面尺寸选择：小型(120×60cm)、中型(140×70cm)、大型(160×80cm)、超大型(180×90cm)
高度调节范围：65cm-125cm
保修政策：整机3年保修，电机5年保修

请以专业、友好的态度回答用户关于产品的问题，提供合适的产品推荐，并根据用户需求给出使用建议。回答要简洁明了，突出产品优势。`
        },
        en: {
            title: 'AI Chat',
            placeholder: 'Enter your question...',
            sendButton: 'Send',
            welcomeMessage: 'Hello! I\'m the Shimo Smart Assistant, happy to help you. I can assist you in choosing the right standing desk model, answer questions about product features and specifications, or provide usage recommendations. How can I help you today?',
            errorMessage: 'Sorry, I\'m temporarily unable to respond to your question. Please try again later or contact our customer service.',
            typingText: 'Typing...',
            quickReplies: [
                'Tell me about product models',
                'Pricing and promotions',
                'Installation and warranty',
                'Product specifications'
            ],
            systemPrompt: `You are the AI assistant for Shimo Smart Standing Desks, specializing in product consultation, recommendations, and usage advice. Please respond in English.

Shimo Product Series:
1. Shimo Basic: \\$199, Basic electric height adjustment, 175 lbs capacity, suitable for first-time standing desk users
2. Shimo Pro: \\$299, Quiet motor, 265 lbs capacity, 4 memory heights, anti-collision, USB charging ports, ideal for professionals with long office hours
3. Shimo Premium: \\$399, Dual motor system, 330 lbs capacity, APP control, health reminders, automatic adjustment, hidden cable management, perfect for users who prioritize health and efficiency
4. Shimo Custom: Starting at \\$529, Fully customizable desktop, smart home integration, premium material options, all Premium features, designed for users seeking unique design and highest quality

Desktop Size Options: Small (47×24"), Medium (55×28"), Large (63×31"), Extra Large (71×35")
Height Adjustment Range: 26"-49"
Warranty Policy: 3-year full warranty, 5-year motor warranty

Please answer user questions about products with a professional and friendly attitude, provide suitable product recommendations, and give usage suggestions based on user needs. Keep answers concise and clear while highlighting product advantages.`
        },
        de: {
            title: 'KI-Chat',
            placeholder: 'Geben Sie Ihre Frage ein...',
            sendButton: 'Senden',
            welcomeMessage: 'Hallo! Ich bin der Shimo Smart Assistant und helfe Ihnen gerne weiter. Ich kann Ihnen bei der Auswahl des richtigen Stehschreibtisch-Modells helfen, Fragen zu Produktfunktionen und Spezifikationen beantworten oder Nutzungsempfehlungen geben. Wie kann ich Ihnen heute helfen?',
            errorMessage: 'Entschuldigung, ich kann Ihre Frage momentan nicht beantworten. Bitte versuchen Sie es später erneut oder kontaktieren Sie unseren Kundenservice.',
            typingText: 'Tippt...',
            quickReplies: [
                'Produktmodelle erfahren',
                'Preise und Angebote',
                'Installation und Garantie',
                'Produktspezifikationen'
            ],
            systemPrompt: `Sie sind der KI-Assistent für Shimo Smart Stehschreibtische und spezialisiert auf Produktberatung, Empfehlungen und Nutzungsberatung. Bitte antworten Sie auf Deutsch.

Shimo Produktserie:
1. Shimo Basic: 199€, Grundlegende elektrische Höhenverstellung, 80kg Tragkraft, geeignet für Erstnutzer von Stehschreibtischen
2. Shimo Pro: 299€, Leiser Motor, 120kg Tragkraft, 4 Speicherhöhen, Kollisionsschutz, USB-Ladeanschlüsse, ideal für Profis mit langen Bürozeiten
3. Shimo Premium: 399€, Dual-Motor-System, 150kg Tragkraft, APP-Steuerung, Gesundheitserinnerungen, automatische Verstellung, verstecktes Kabelmanagement, perfekt für Benutzer, die Gesundheit und Effizienz priorisieren
4. Shimo Custom: Ab 529€, Vollständig anpassbare Tischplatte, Smart-Home-Integration, Premium-Materialoptionen, alle Premium-Funktionen, entwickelt für Benutzer, die einzigartiges Design und höchste Qualität suchen

Tischplattengrößen: Klein (120×60cm), Mittel (140×70cm), Groß (160×80cm), Extra Groß (180×90cm)
Höhenverstellbereich: 65cm-125cm
Garantierichtlinie: 3 Jahre Vollgarantie, 5 Jahre Motorgarantie

Bitte beantworten Sie Benutzerfragen zu Produkten mit einer professionellen und freundlichen Haltung, geben Sie geeignete Produktempfehlungen und Nutzungsvorschläge basierend auf den Benutzerbedürfnissen. Halten Sie Antworten prägnant und klar, während Sie Produktvorteile hervorheben.`
        }
    };

    // 聊天历史记录 - 用于API上下文
    let chatHistory = [
        {
            role: "system",
            content: LANGUAGE_CONFIG[currentLanguage].systemPrompt
        }
    ];

    // 初始化语言下拉菜单
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            if (languageMenu.classList.contains('active')) {
                languageMenu.classList.remove('active');
            } else {
                languageMenu.classList.add('active');
            }
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

    // 初始欢迎消息
    setTimeout(() => {
        addMessage(LANGUAGE_CONFIG[currentLanguage].welcomeMessage, 'ai');
    }, 500);

    // 发送按钮点击事件
    if (sendButton) {
        sendButton.addEventListener('click', () => handleUserInput());
    }

    // 输入框回车事件
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleUserInput();
            }
        });
    }

    // 处理用户输入
    function handleUserInput() {
        const message = userInput.value.trim();
        
        if (message) {
            // 添加用户消息到聊天框
            addMessage(message, 'user');
            
            // 清空输入框并聚焦
            userInput.value = '';
            userInput.focus();
            
            // 显示AI正在输入的状态
            showTypingIndicator();
            
            // 添加用户消息到历史记录
            chatHistory.push({
                role: "user",
                content: message
            });
            
            // 调用API获取回复
            fetchAIResponse();
        }
    }

    // 显示"正在输入"指示器
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message ai typing-indicator';
        typingIndicator.id = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="message-bubble">
                <div class="typing-animation">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <span class="typing-text">${LANGUAGE_CONFIG[currentLanguage].typingText}</span>
            </div>
        `;
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // 移除"正在输入"指示器
    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
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
            removeTypingIndicator();

            // 将AI回复添加到聊天框
            addMessage(aiMessage, 'ai');

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

        } catch (error) {
            console.error('API request error:', error);
            
            // 移除"正在输入"指示器
            removeTypingIndicator();
            
            // 显示错误消息
            addMessage(LANGUAGE_CONFIG[currentLanguage].errorMessage, 'ai');
        }
    }

    // 添加消息到聊天框
    function addMessage(text, sender) {
        // 移除快捷回复按钮（如果存在）
        const quickRepliesElement = document.querySelector('.quick-replies');
        if (quickRepliesElement) {
            quickRepliesElement.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        // 将换行符转换为HTML换行
        const formattedText = text.replace(/\n/g, '<br>');
        
        // 添加时间戳 - 根据语言设置格式
        let timestamp;
        if (currentLanguage === 'zh') {
            timestamp = new Date().toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } else if (currentLanguage === 'de') {
            timestamp = new Date().toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } else {
            timestamp = new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        
        messageDiv.innerHTML = `
            <div class="message-bubble">
                <div class="message-content">${formattedText}</div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;
        
        chatBox.appendChild(messageDiv);
        
        // 滚动到底部
        chatBox.scrollTop = chatBox.scrollHeight;

        // 如果是AI消息，显示快捷回复按钮
        if (sender === 'ai') {
            setTimeout(() => {
                addQuickReplies();
            }, 500);
        }
    }

    // 添加快捷回复按钮
    function addQuickReplies() {
        const quickReplies = LANGUAGE_CONFIG[currentLanguage].quickReplies;

        const quickReplyContainer = document.createElement('div');
        quickReplyContainer.className = 'quick-replies';
        
        const replyButtons = quickReplies.map(reply => {
            return `<button class="quick-reply-btn" onclick="window.sendQuickReply('${reply}')">${reply}</button>`;
        }).join('');
        
        quickReplyContainer.innerHTML = replyButtons;
        chatBox.appendChild(quickReplyContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // 全局函数，用于快捷回复按钮调用
    window.sendQuickReply = function(message) {
        userInput.value = message;
        handleUserInput();
    };

    // 处理错误
    function handleError(error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addMessage(LANGUAGE_CONFIG[currentLanguage].errorMessage, 'ai');
    }
});
