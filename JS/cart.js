// 添加到购物车
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 检查是否已经在购物车中
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
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // 显示添加成功通知
    showToast('商品已添加到购物车');
}

// 打开购物车侧边栏
function openCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    if (!sidebar) {
        createCartSidebar();
        return;
    }
    
    sidebar.classList.add('active');
    loadCartItems();
}

// 创建购物车侧边栏
function createCartSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'cartSidebar';
    sidebar.className = 'cart-sidebar';
    sidebar.innerHTML = `
        <div class="cart-header">
            <h3>购物车</h3>
            <button class="close-cart">&times;</button>
        </div>
        <div class="cart-items"></div>
        <div class="cart-summary">
            <div class="cart-total">
                <span>总计:</span>
                <span class="total-price">¥0</span>
            </div>
            <button class="btn-checkout">结算</button>
        </div>
    `;
    
    document.body.appendChild(sidebar);
    
    // 关闭按钮事件
    sidebar.querySelector('.close-cart').addEventListener('click', function() {
        sidebar.classList.remove('active');
    });
    
    // 结算按钮事件
    sidebar.querySelector('.btn-checkout').addEventListener('click', function() {
        // 检测当前语言
        const currentLang = window.location.pathname.includes('-de.') ? 'de' :
                           window.location.pathname.includes('-en.') ? 'en' : 'zh';
        
        // 跳转到支付页面（根据语言）
        const paymentPages = {
            'en': 'payment-en.html',
            'de': 'payment-de.html'
        };
        
        window.location.href = paymentPages[currentLang] || 'payment-en.html';
    });
    
    // 点击外部关闭
    sidebar.addEventListener('click', function(e) {
        if (e.target === sidebar) {
            sidebar.classList.remove('active');
        }
    });
    
    return sidebar;
}

// 加载购物车商品
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemsContainer = document.querySelector('.cart-items');
    if (!itemsContainer) return;
    
    itemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p class="empty-cart">购物车是空的</p>';
        document.querySelector('.total-price').textContent = '¥0';
        return;
    }
    
    let total = 0;
    
    // 获取完整产品信息 (实际项目中应该从API获取)
    cart.forEach(item => {
        const product = getProductById(item.id);
        if (!product) return;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="item-info">
                <h4>${product.name}</h4>
                <p>¥${product.price} × ${item.quantity}</p>
                <div class="item-actions">
                    <button class="btn-quantity minus" data-id="${product.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn-quantity plus" data-id="${product.id}">+</button>
                    <button class="btn-remove" data-id="${product.id}">删除</button>
                </div>
            </div>
        `;
        itemsContainer.appendChild(itemElement);
        
        total += product.price * item.quantity;
    });
    
    document.querySelector('.total-price').textContent = `¥${total.toFixed(2)}`;
    
    // 添加数量调整和删除事件
    document.querySelectorAll('.btn-quantity').forEach(btn => {
        btn.addEventListener('click', function() {
            updateCartItem(this.dataset.id, this.classList.contains('minus') ? -1 : 1);
        });
    });
    
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            removeCartItem(this.dataset.id);
        });
    });
}

// 更新购物车商品数量
function updateCartItem(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        // 如果数量小于1，移除商品
        if (cart[itemIndex].quantity < 1) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        loadCartItems();
    }
}

// 移除购物车商品
function removeCartItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

// 显示通知
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}