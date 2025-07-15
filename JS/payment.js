document.addEventListener('DOMContentLoaded', function() {

    
    // 地址项选择功能
    const addressItems = document.querySelectorAll('.address-item');
    
    addressItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有地址项的选中状态
            addressItems.forEach(addr => {
                addr.classList.remove('selected');
                const radioBtn = addr.querySelector('.radio-button');
                if (radioBtn) {
                    radioBtn.classList.remove('selected');
                }
            });
            
            // 设置当前点击项为选中状态
            this.classList.add('selected');
            const radioBtn = this.querySelector('.radio-button');
            if (radioBtn) {
                radioBtn.classList.add('selected');
            }
        });
    });
    
    // 支付方式选择功能
    const paymentMethods = document.querySelectorAll('.payment-method-item');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // 移除所有支付方式的选中状态
            paymentMethods.forEach(pm => {
                pm.classList.remove('selected');
                const radioBtn = pm.querySelector('.radio-button');
                if (radioBtn) {
                    radioBtn.classList.remove('selected');
                }
            });
            
            // 设置当前点击项为选中状态
            this.classList.add('selected');
            const radioBtn = this.querySelector('.radio-button');
            if (radioBtn) {
                radioBtn.classList.add('selected');
            }
        });
    });
    
    // 配送方式选择功能
    const deliveryMethods = document.querySelectorAll('.delivery-method-item');
    
    deliveryMethods.forEach(method => {
        method.addEventListener('click', function() {
            // 移除所有配送方式的选中状态
            deliveryMethods.forEach(dm => {
                dm.classList.remove('selected');
                const radioBtn = dm.querySelector('.radio-button');
                if (radioBtn) {
                    radioBtn.classList.remove('selected');
                }
            });
            
            // 设置当前点击项为选中状态
            this.classList.add('selected');
            const radioBtn = this.querySelector('.radio-button');
            if (radioBtn) {
                radioBtn.classList.add('selected');
            }
            
            // 更新配送费用和总价
            updateTotalPrice();
        });
    });
    
    // 订单留言字数统计
    const messageTextarea = document.querySelector('.order-message textarea');
    const messageCounter = document.querySelector('.message-counter');
    
    if (messageTextarea && messageCounter) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            messageCounter.textContent = `${length}/200`;
        });
    }
    
    // 更新总价格函数
    function updateTotalPrice() {
        // 检测当前页面的货币类型
        const subtotalElement = document.getElementById('subtotal');
        const subtotalText = subtotalElement.textContent;
        let currency = '$';
        let currencySymbol = '$';
        
        if (subtotalText.includes('£')) {
            currency = '£';
            currencySymbol = '£';
        } else if (subtotalText.includes('€')) {
            currency = '€';
            currencySymbol = '€';
        }
        
        const subtotal = parseFloat(subtotalText.replace(currency, '').replace(',', ''));
        const discount = parseFloat(document.getElementById('discount').textContent.replace('-' + currency, '').replace(',', ''));
        
        // 获取当前选中的配送方式
        const selectedDelivery = document.querySelector('.delivery-method-item.selected');
        let shippingCost = 0;
        
        if (selectedDelivery) {
            const shippingText = selectedDelivery.querySelector('.delivery-price').textContent;
            if (shippingText !== 'Free' && shippingText !== 'Kostenlos') {
                shippingCost = parseFloat(shippingText.replace(currency, '').replace(',', ''));
            }
        }
        
        // 更新配送费用显示
        const freeText = currency === '€' ? 'Kostenlos' : 'Free';
        document.getElementById('shipping').textContent = shippingCost === 0 ? currencySymbol + '0' : `${currencySymbol}${shippingCost}`;
        
        // 计算总价
        const total = subtotal + shippingCost - discount;
        
        // 更新总价显示
        const formattedTotal = currency === '$' ? total.toFixed(2) : total.toLocaleString('de-DE');
        document.getElementById('total').textContent = `${currencySymbol}${formattedTotal}`;
        document.querySelector('.total-price').textContent = `${currencySymbol}${formattedTotal}`;
    }
    
    // 返回上一页功能
    window.goBack = function() {
        window.history.back();
    };
    
    // 支付提交功能
    const submitPaymentBtn = document.querySelector('.submit-payment');
    const paymentSuccessModal = document.getElementById('paymentSuccessModal');
    const closeModalBtn = document.querySelector('.close-modal');
    
    if (submitPaymentBtn && paymentSuccessModal) {
        submitPaymentBtn.addEventListener('click', function() {
            // 验证表单数据
            if (validateForm()) {
                // 生成随机订单号
                const orderNumber = generateOrderNumber();
                document.getElementById('order-number').textContent = orderNumber;
                
                // 获取选中的支付方式
                const selectedPayment = document.querySelector('.payment-method-item.selected');
                const paymentMethod = selectedPayment ? selectedPayment.querySelector('.payment-name').textContent : 'Visa';
                
                // 获取总金额
                const totalAmount = document.querySelector('.total-price').textContent;
                
                // 保存订单信息到localStorage
                localStorage.setItem('orderNumber', orderNumber);
                localStorage.setItem('paymentMethod', paymentMethod);
                localStorage.setItem('totalAmount', totalAmount);
                
                // 显示支付成功弹窗
                paymentSuccessModal.style.display = 'flex';
            }
        });
    }
    
    if (closeModalBtn && paymentSuccessModal) {
        closeModalBtn.addEventListener('click', function() {
            paymentSuccessModal.style.display = 'none';
            // 支付成功后跳转到订单确认页面
            setTimeout(() => {
                // 检测当前页面语言并跳转到对应的订单确认页面
                const isGerman = document.documentElement.lang === 'de';
                const orderPage = isGerman ? 'order-confirmation-de.html' : 'order-confirmation-en.html';
                window.location.href = orderPage;
            }, 500);
        });
        
        // 点击弹窗外部关闭弹窗
        window.addEventListener('click', function(event) {
            if (event.target === paymentSuccessModal) {
                paymentSuccessModal.style.display = 'none';
                // 支付成功后跳转到订单确认页面
                setTimeout(() => {
                    // 检测当前页面语言并跳转到对应的订单确认页面
                    const isGerman = document.documentElement.lang === 'de';
                    const orderPage = isGerman ? 'order-confirmation-de.html' : 'order-confirmation-en.html';
                    window.location.href = orderPage;
                }, 500);
            }
        });
    }
    
    // 表单验证函数
    function validateForm() {
        // 检测当前页面语言
        const isGerman = document.documentElement.lang === 'de';
        
        // 检查是否选择了地址
        const selectedAddress = document.querySelector('.address-item.selected');
        if (!selectedAddress) {
            const message = isGerman ? 'Bitte wählen Sie eine Lieferadresse aus' : 'Please select a shipping address';
            alert(message);
            return false;
        }
        
        // 检查是否选择了支付方式
        const selectedPayment = document.querySelector('.payment-method-item.selected');
        if (!selectedPayment) {
            const message = isGerman ? 'Bitte wählen Sie eine Zahlungsmethode aus' : 'Please select a payment method';
            alert(message);
            return false;
        }
        
        // 检查是否选择了配送方式
        const selectedDelivery = document.querySelector('.delivery-method-item.selected');
        if (!selectedDelivery) {
            const message = isGerman ? 'Bitte wählen Sie eine Versandmethode aus' : 'Please select a delivery method';
            alert(message);
            return false;
        }
        
        // 如果选择了电子发票，检查邮箱是否填写
        const electronicInvoice = document.querySelector('input[name="invoice-type"]:checked');
        const electronicText = isGerman ? 'Elektronische Rechnung' : 'Electronic Invoice';
        if (electronicInvoice && electronicInvoice.nextElementSibling.textContent.trim() === electronicText) {
            const invoiceEmail = document.getElementById('invoice-email');
            if (!invoiceEmail.value || !isValidEmail(invoiceEmail.value)) {
                const message = isGerman ? 'Bitte geben Sie eine gültige E-Mail für den Empfang der elektronischen Rechnung ein' : 'Please enter a valid email for receiving electronic invoice';
                alert(message);
                invoiceEmail.focus();
                return false;
            }
        }
        
        return true;
    }
    
    // 邮箱验证函数
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 生成随机订单号
    function generateOrderNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        
        return `${year}${month}${day}${random}`;
    }
    
    // 添加新地址按钮功能
    const addAddressBtn = document.querySelector('.add-address-btn');
    
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', function() {
            // 这里可以实现打开添加地址表单或弹窗的逻辑
            alert('Add new address functionality will be implemented here');
        });
    }
    
    // 从localStorage加载订单信息
    loadOrderInfo();
    
    // 初始化页面加载时计算总价
    updateTotalPrice();
    
    // 加载订单信息函数
    function loadOrderInfo() {
        const orderInfo = localStorage.getItem('orderInfo');
        if (orderInfo) {
            try {
                const order = JSON.parse(orderInfo);
                
                // 更新产品信息
                if (order.productName) {
                    const productNameElement = document.getElementById('product-name');
                    if (productNameElement) productNameElement.textContent = order.productName;
                }
                
                if (order.productPrice) {
                    const productPriceElement = document.getElementById('product-price');
                    const subtotalElement = document.getElementById('subtotal');
                    if (productPriceElement) productPriceElement.textContent = order.productPrice;
                    if (subtotalElement) subtotalElement.textContent = order.productPrice;
                }
                
                if (order.quantity) {
                    const quantityElement = document.getElementById('product-quantity');
                    if (quantityElement) quantityElement.textContent = order.quantity;
                }
                
                // 更新产品规格信息
                if (order.color) {
                    const colorElement = document.querySelector('.spec-color');
                    if (colorElement) colorElement.textContent = order.color;
                }
                
                if (order.size) {
                    const sizeElement = document.querySelector('.spec-size');
                    if (sizeElement) sizeElement.textContent = order.size;
                }
                
                // 更新产品图片
                if (order.productImage) {
                    const imageElement = document.getElementById('product-image');
                    if (imageElement) imageElement.src = order.productImage;
                }
                
            } catch (e) {
                console.error('Error parsing order info:', e);
            }
        }
    }
});
