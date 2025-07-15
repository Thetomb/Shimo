/**
 * DeskRise智能升降桌 - AI聊天助手
 * 提供产品咨询、推荐和使用建议
 */

// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // 聊天上下文 - 用于记忆对话历史
    let chatContext = {
        lastTopic: null,
        askedAboutPrice: false,
        mentionedHeight: false,
        preferredModel: null,
        userBudget: null,
        conversationStage: 'greeting' // greeting, inquiry, recommendation, followup
    };

    // 产品数据库
    const products = {
        basic: {
            name: "DeskRise Basic",
            price: 1299,
            features: ["电动高度调节", "承重80kg", "2个记忆高度"],
            bestFor: "初次尝试升降桌的用户"
        },
        pro: {
            name: "DeskRise Pro",
            price: 1999,
            features: ["静音电机", "承重120kg", "4个记忆高度", "防撞功能", "USB充电端口"],
            bestFor: "长时间办公的专业人士"
        },
        premium: {
            name: "DeskRise Premium",
            price: 2699,
            features: ["双电机系统", "承重150kg", "APP控制", "健康提醒", "自动升降", "隐藏式线缆管理"],
            bestFor: "注重健康与效率的高要求用户"
        },
        custom: {
            name: "DeskRise Custom",
            price: 3499,
            features: ["全定制桌面", "智能家居集成", "高级材质选择", "所有Premium功能"],
            bestFor: "寻求独特设计和最高品质的用户"
        }
    };

    // 初始欢迎消息
    setTimeout(() => {
        addMessage('您好！我是DeskRise智能助手，很高兴为您服务。我可以帮您：\n1. 选择合适的升降桌型号\n2. 解答产品功能与规格\n3. 提供使用建议与保养知识\n\n请问有什么可以帮到您？', 'ai');
    }, 500);

    // 发送按钮点击事件
    sendButton.addEventListener('click', () => handleUserInput());

    // 输入框回车事件
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

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
            
            // 处理用户消息并获取响应
            processUserMessage(message);
        }
    }

    // 显示"正在输入"指示器
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message ai';
        typingIndicator.id = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="typing">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // 移除"正在输入"指示器
    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            chatBox.removeChild(indicator);
        }
    }

    // 处理用户消息并生成回复
    function processUserMessage(message) {
        // 模拟思考时间 - 使交互更自然
        const thinkingTime = 800 + Math.random() * 1500;
        
        setTimeout(() => {
            // 分析用户消息并生成回复
            const response = generateResponse(message);
            
            // 移除"正在输入"指示器
            removeTypingIndicator();
            
            // 如果回复是数组，则逐条显示
            if (Array.isArray(response)) {
                displaySequentialMessages(response);
            } else {
                // 添加AI回复
                addMessage(response, 'ai');
            }
        }, thinkingTime);
    }

    // 逐条显示消息
    function displaySequentialMessages(messages, index = 0) {
        if (index < messages.length) {
            addMessage(messages[index], 'ai');
            
            // 添加延迟，模拟分段发送的效果
            setTimeout(() => {
                displaySequentialMessages(messages, index + 1);
            }, 1000);
        }
    }

    // 添加消息到聊天框
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        // 将换行符转换为HTML换行
        const formattedText = text.replace(/\n/g, '<br>');
        
        messageDiv.innerHTML = `<div class="message-content">${formattedText}</div>`;
        chatBox.appendChild(messageDiv);
        
        // 滚动到底部
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // 生成回复
    function generateResponse(userMessage) {
        const lowercaseMessage = userMessage.toLowerCase();
        
        // 更新上下文 - 提取关键信息
        updateContext(lowercaseMessage);
        
        // 如果是问候语
        if (isGreeting(lowercaseMessage)) {
            return getGreetingResponse();
        }
        
        // 预算相关查询
        if (hasBudgetQuery(lowercaseMessage)) {
            return getBudgetResponse(lowercaseMessage);
        }
        
        // 产品推荐查询
        if (hasRecommendationQuery(lowercaseMessage)) {
            return getRecommendationResponse(lowercaseMessage);
        }
        
        // 规格与功能查询
        if (hasSpecsQuery(lowercaseMessage)) {
            return getSpecsResponse(lowercaseMessage);
        }
        
        // 售后与保修查询
        if (hasWarrantyQuery(lowercaseMessage)) {
            return getWarrantyResponse();
        }
        
        // 使用建议查询
        if (hasUsageAdviceQuery(lowercaseMessage)) {
            return getUsageAdviceResponse();
        }
        
        // 如果以上都不匹配，则返回通用回复
        return getGenericResponse(lowercaseMessage);
    }

    // 更新对话上下文
    function updateContext(message) {
        // 识别用户提到的预算
        const budgetMatch = message.match(/预算.{0,10}(\d+)/);
        if (budgetMatch) {
            chatContext.userBudget = parseInt(budgetMatch[1]);
        }
        
        // 记录用户是否询问价格
        if (message.includes('价格') || message.includes('多少钱') || message.includes('费用')) {
            chatContext.askedAboutPrice = true;
        }
        
        // 记录用户身高偏好
        if (message.includes('身高') || message.match(/高.{0,5}\d+/)) {
            chatContext.mentionedHeight = true;
        }
        
        // 识别感兴趣的型号
        if (message.includes('basic') || message.includes('基础') || message.includes('入门')) {
            chatContext.preferredModel = 'basic';
        } else if (message.includes('pro') || message.includes('专业')) {
            chatContext.preferredModel = 'pro';
        } else if (message.includes('premium') || message.includes('高级')) {
            chatContext.preferredModel = 'premium';
        } else if (message.includes('custom') || message.includes('定制')) {
            chatContext.preferredModel = 'custom';
        }
        
        // 判断对话阶段
        if (chatContext.conversationStage === 'greeting') {
            chatContext.conversationStage = 'inquiry';
        } else if (chatContext.conversationStage === 'inquiry' && 
                  (chatContext.preferredModel || chatContext.userBudget)) {
            chatContext.conversationStage = 'recommendation';
        }
        
        // 识别当前话题
        if (message.includes('价格') || message.includes('预算')) {
            chatContext.lastTopic = 'price';
        } else if (message.includes('型号') || message.includes('推荐')) {
            chatContext.lastTopic = 'model';
        } else if (message.includes('规格') || message.includes('尺寸')) {
            chatContext.lastTopic = 'specs';
        } else if (message.includes('功能') || message.includes('特点')) {
            chatContext.lastTopic = 'features';
        } else if (message.includes('保修') || message.includes('售后')) {
            chatContext.lastTopic = 'warranty';
        }
    }

    // 检查是否是问候语
    function isGreeting(message) {
        const greetings = ['你好', '您好', '早上好', '下午好', '晚上好', 'hi', 'hello', '嗨'];
        return greetings.some(greeting => message.includes(greeting));
    }

    // 检查是否询问预算相关
    function hasBudgetQuery(message) {
        return message.includes('价格') || 
               message.includes('多少钱') || 
               message.includes('费用') ||
               message.includes('便宜') ||
               message.includes('贵') ||
               message.includes('预算');
    }

    // 检查是否询问产品推荐
    function hasRecommendationQuery(message) {
        return message.includes('推荐') || 
               message.includes('哪款') || 
               message.includes('选择') ||
               message.includes('建议买') ||
               message.includes('适合我') ||
               message.includes('哪个好');
    }

    // 检查是否询问规格与功能
    function hasSpecsQuery(message) {
        return message.includes('规格') || 
               message.includes('尺寸') || 
               message.includes('大小') ||
               message.includes('功能') ||
               message.includes('特点') ||
               message.includes('材质') ||
               message.includes('高度') ||
               message.includes('重量');
    }

    // 检查是否询问售后与保修
    function hasWarrantyQuery(message) {
        return message.includes('保修') || 
               message.includes('质保') || 
               message.includes('售后') ||
               message.includes('维修') ||
               message.includes('坏了') ||
               message.includes('故障');
    }

    // 检查是否询问使用建议
    function hasUsageAdviceQuery(message) {
        return message.includes('使用') || 
               message.includes('建议') || 
               message.includes('如何') ||
               message.includes('操作') ||
               message.includes('设置');
    }

    // 获取问候语回复
    function getGreetingResponse() {
        const greetings = [
            '您好！很高兴为您服务。请问您想了解DeskRise智能升降桌的哪些信息呢？',
            '您好！我是DeskRise的智能助手。您是想了解我们的产品，还是需要使用建议呢？',
            '您好！欢迎咨询DeskRise智能升降桌。请问您是为家庭办公还是公司使用寻找解决方案？'
        ];
        
        return randomChoice(greetings);
    }

    // 获取预算相关回复
    function getBudgetResponse(message) {
        if (message.includes('最便宜') || message.includes('便宜')) {
            return `我们最经济实惠的选择是${products.basic.name}，价格为¥${products.basic.price}。它提供基本的电动高度调节功能，适合初次尝试升降桌的用户。您对这款产品感兴趣吗？`;
        }
        
        if (message.includes('最贵') || message.includes('高端')) {
            return `我们最高端的选择是${products.custom.name}，价格为¥${products.custom.price}。它提供全定制服务和最全面的功能，包括${products.custom.features.slice(0, 3).join('、')}等。您需要了解更多高端型号的信息吗？`;
        }
        
        // 如果用户提到了具体预算
        if (chatContext.userBudget) {
            if (chatContext.userBudget < 1500) {
                return `以您${chatContext.userBudget}元的预算，我推荐${products.basic.name}（¥${products.basic.price}）。它是我们的入门级产品，提供基础的升降功能和稳定性，非常适合首次使用升降桌的用户。`;
            } else if (chatContext.userBudget < 2500) {
                return `以您${chatContext.userBudget}元的预算，我推荐${products.pro.name}（¥${products.pro.price}）。它提供更强的承重能力和更多实用功能，如${products.pro.features.slice(0, 3).join('、')}，非常适合日常办公使用。`;
            } else {
                return `以您${chatContext.userBudget}元的预算，您可以选择${products.premium.name}（¥${products.premium.price}）或${products.custom.name}（¥${products.custom.price}）。这些高端型号提供最佳体验和全面功能，包括${products.premium.features.slice(0, 3).join('、')}等。您更注重哪方面的功能呢？`;
            }
        }
        
        // 一般价格信息
        return [
            `DeskRise智能升降桌有多个价位区间的产品：`,
            `基础款（${products.basic.name}）：¥${products.basic.price}，适合${products.basic.bestFor}`,
            `专业款（${products.pro.name}）：¥${products.pro.price}，适合${products.pro.bestFor}`,
            `高级款（${products.premium.name}）：¥${products.premium.price}，适合${products.premium.bestFor}`,
            `定制款（${products.custom.name}）：¥${products.custom.price}起，适合${products.custom.bestFor}`,
            `您有特定的预算范围或使用需求吗？我可以据此为您推荐最合适的型号。`
        ];
    }

    // 获取产品推荐回复
    function getRecommendationResponse(message) {
        // 如果用户提到了特定使用场景
        if (message.includes('家庭') || message.includes('家里')) {
            return `对于家庭使用，我推荐${products.pro.name}。它兼顾了性价比和功能性，${products.pro.features.slice(0, 3).join('、')}等功能能满足家庭办公和学习的需求。桌面可选多种颜色和材质，轻松融入家庭环境。`;
        }
        
        if (message.includes('公司') || message.includes('办公室') || message.includes('工作')) {
            return `对于办公环境，${products.premium.name}是理想选择。它的${products.premium.features.slice(0, 3).join('、')}等功能可以提高工作效率，同时APP控制和健康提醒功能有助于保持良好的工作状态。我们也提供企业批量采购方案。`;
        }
        
        if (message.includes('设计') || message.includes('创意') || message.includes('独特')) {
            return `对于注重设计感的用户，${products.custom.name}允许您定制独特的桌面材质、颜色和形状。您可以选择实木、大理石纹、玻璃等多种材质，打造专属于您的工作空间。`;
        }
        
        // 基于用户已表达的偏好
        if (chatContext.preferredModel) {
            const model = products[chatContext.preferredModel];
            return `${model.name}是不错的选择。它的价格是¥${model.price}，主要特点包括${model.features.join('、')}。它特别适合${model.bestFor}。您需要了解更多关于这款产品的信息吗？`;
        }
        
        // 如��有预算信息但没有明确型号偏好
        if (chatContext.userBudget) {
            return getBudgetResponse(message);
        }
        
        // 通用推荐回复
        return [
            `DeskRise提供多种型号的智能升降桌，针对不同需求和预算：`,
            `1. ${products.basic.name}：入门级选择，简单实用，价格亲民（¥${products.basic.price}）`,
            `2. ${products.pro.name}：我们最畅销的型号，性价比高，功能全面（¥${products.pro.price}）`,
            `3. ${products.premium.name}：高端体验，集成智能功能，提供健康管理（¥${products.premium.price}）`,
            `4. ${products.custom.name}：全定制服务，独特设计，顶级品质（¥${products.custom.price}起）`,
            `您有特定的使用场景或预算考虑吗？这样我可以给您更精准的推荐。`
        ];
    }

    // 获取规格与功能回复
    function getSpecsResponse(message) {
        // 针对特定型号的规格查询
        if (chatContext.preferredModel) {
            const model = products[chatContext.preferredModel];
            return `${model.name}的主要特点包括${model.features.join('、')}。桌面尺寸有120cm×60cm、140cm×70cm和160cm×80cm可选。高度调节范围为65cm-125cm，可满足不同身高用户需求。最大承重为${model.name.includes('Basic') ? '80kg' : model.name.includes('Pro') ? '120kg' : '150kg'}。`;
        }
        
        // 针对特定方面的查询
        if (message.includes('高度')) {
            return `DeskRise所有型号的升降桌高度调节范围为65cm-125cm，可通过电动控制精确调节，满足从150cm到200cm不同身高用户的需求。我们的控制面板支持记忆高度设置，让您轻松切换常用高度。`;
        }
        
        if (message.includes('尺寸') || message.includes('大小')) {
            return `DeskRise升降桌提供多种桌面尺寸：小型(120cm×60cm)、中型(140cm×70cm)、大型(160cm×80cm)和超大型(180cm×90cm)。您可以根据空间大小和使用需求选择合适的尺寸。所有型号的承重能力都足以支撑多台显示器和电脑设备。`;
        }
        
        if (message.includes('材质')) {
            return `DeskRise升降桌的桌面材质有多种选择：环保E1级实木板、高密度纤维板、竹木复合板等。高端型号还提供实木边缘处理和防刮涂层。桌腿框架采用优质碳钢制造，表面经过防锈处理和高温烤漆工艺，确保结实耐用。`;
        }
        
        if (message.includes('功能') || message.includes('特点')) {
            return [
                `DeskRise智能升降桌的核心功能包括：`,
                `1. 电动高度调节：静音马达，平稳升降`,
                `2. 记忆高度设置：一键调节到预设高度`,
                `3. 防撞保护：遇阻自动停止并回退`,
                `4. 数字显示控制面板：直观显示当前高度`,
                `5. 智能APP控制：远程调节和设置（Premium和Custom型号）`,
                `6. 健康提醒：定时提示站立/坐下（Premium和Custom型号）`,
                `7. 线缆管理系统：保持桌面整洁`,
                `8. USB充电端口：方便为设备充电（Pro以上型号）`,
                `不同型号包含的功能有所不同，您对哪些功能特别感兴趣？`
            ];
        }
        
        // 通用规格回复
        return [
            `DeskRise智能升降桌的基本规格如下：`,
            `• 高度调节范围：65cm-125cm`,
            `• 桌面尺寸：小型(120×60cm)、中型(140×70cm)、大型(160×80cm)、超大型(180×90cm)`,
            `• 承重能力：Basic 80kg, Pro 120kg, Premium/Custom 150kg`,
            `• 升降速度：25mm/秒`,
            `• 噪音水平：<50分贝`,
            `• 电机：静音直流电机，寿命>10000次循环`,
            `• 控制方式：触控面板，高端型号支持APP控制`,
            `• 电源要求：220V-240V`,
            `您需要了解更详细的某方面规格吗？`
        ];
    }

    // 获取售后与保修回复
    function getWarrantyResponse() {
        return [
            `DeskRise智能升降桌的售后与保修政策如下：`,
            `• 整机保修期：3年`,
            `• 电机保修期：5年`,
            `• 保修范围：非人为因素导致的产品故障`,
            `• 售后服务：7×24小时客服支持，工作日技术支持`,
            `• 维修服务：保修期内免费上门维修（一线城市），其他地区可选择寄修`,
            `• 退换政策：7天无理由退换，30天内产品质量问题免费更换`,
            `• 延保服务：可选购额外2年延长保修`,
            `如有任何产品问题，可拨打我们的服务热线400-888-XXXX或通过官网在线客服联系我们。`
        ];
    }

    // 获取使用建议回复
    function getUsageAdviceResponse() {
        return [
            `使用DeskRise智能升降桌的建议：`,
            `1. 健康使用：建议每45-60分钟切换一次坐姿和站姿，避免长时间保持同一姿势`,
            `2. 高度设置：坐姿时，手肘应与桌面平行；站姿时，手臂自然下垂，手肘弯曲成90度与桌面平行`,
            `3. 显示器位置：屏幕顶部应与眼睛平行或略低，距离眼睛约一臂长`,
            `4. 负重分布：重物尽量放在桌子中央，避免集中在边缘`,
            `5. 定期维护：每3-6个月检查紧固件，确保稳固`,
            `6. 清洁保养：使用微湿的软布擦拭，避免使用含酒精或强溶剂的清洁剂`,
            `7. 使用防护垫：建议在桌面上使用桌垫，保护桌面并提供更舒适的使用体验`,
            `您有任何特定的使用问题需要解答吗？`
        ];
    }

    // 获取通用回复
    function getGenericResponse(message) {
        // 如果有上下文，基于上下文给出回复
        if (chatContext.lastTopic === 'price') {
            return `关于价格，您是想了解具体型号的价格，还是希望根据预算为您推荐合适的选择呢？`;
        }
        
        if (chatContext.lastTopic === 'model') {
            return `在选择型号时，您更注重哪些方面呢？是预算、功能、尺寸还是设计风格？了解您的偏好可以帮助我给出更精准的建议。`;
        }
        
        if (chatContext.lastTopic === 'specs') {
            return `关于产品规格，您想了解桌面尺寸、高度范围、承重能力还是其他具体参数呢？`;
        }
        
        if (chatContext.lastTopic === 'features') {
            return `DeskRise的不同型号具有各自的特色功能。您对哪些功能特别感兴趣？比如记忆高度、防撞功能、APP控制或健康提醒等？`;
        }
        
        if (chatContext.lastTopic === 'warranty') {
            return `关于售后服务，您是想了解保修期限、保修范围，还是维修流程呢？`;
        }
        
        // 尝试引导用户提供更多信息
        if (message.length < 10) {
            return `您想了解DeskRise智能升降桌的哪些方面呢？例如产品型号、价格、功能特点、使用建议或售后服务等。我可以为您提供详细信息。`;
        }
        
        // 默认回复
        const defaultResponses = [
            `感谢您的咨询。作为DeskRise智能升降桌的虚拟助手，我可以提供产品信息、使用建议和购买指导。请问您有什么具体问题呢？`,
            `我理解您对DeskRise产品感兴趣。您是想了解我们的产品系列、具体型号还是使用建议呢？我很乐意为您提供更多信息。`,
            `DeskRise致力于提供高品质的智能升降桌解决方案。您是首次了解升降桌，还是已经有使用经验呢？这样我可以提供更适合您的信息。`
        ];
        
        return randomChoice(defaultResponses);
    }

    // 从数组中随机选择一项
    function randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
});
