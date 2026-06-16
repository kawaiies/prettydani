// ===== 轮播图功能 =====
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// 切换到下一张/上一张
function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// 切换到指定幻灯片
function currentSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = n - 1;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// 自动轮播
let autoSlideInterval = setInterval(() => {
    changeSlide(1);
}, 5000);

// 鼠标悬停时暂停自动轮播
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
});

// ===== 倒计时功能 =====
function updateCountdown() {
    // 设置倒计时结束时间（2天18小时45分30秒后）
    let days = parseInt(document.getElementById('days').textContent);
    let hours = parseInt(document.getElementById('hours').textContent);
    let minutes = parseInt(document.getElementById('minutes').textContent);
    let seconds = parseInt(document.getElementById('seconds').textContent);

    // 转换为总秒数
    let totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;

    if (totalSeconds <= 0) {
        // 倒计时结束
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    // 减少1秒
    totalSeconds--;

    // 重新计算天、时、分、秒
    days = Math.floor(totalSeconds / (24 * 60 * 60));
    hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    seconds = totalSeconds % 60;

    // 更新显示
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// 每秒更新倒计时
setInterval(updateCountdown, 1000);

// ===== 移动端菜单切换 =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// 点击菜单项后关闭移动端菜单
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 968) {
            navMenu.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        }
    });
});

// ===== 加入购物车功能 =====
const addToCartButtons = document.querySelectorAll('.btn-add-cart');
const cartCount = document.querySelector('.cart-count');

let cartItems = parseInt(cartCount.textContent);

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 更新购物车数量
        cartItems++;
        cartCount.textContent = cartItems;
        
        // 添加动画效果
        button.textContent = '已添加 ✓';
        button.style.backgroundColor = '#4caf50';
        
        // 购物车图标动画
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
        
        // 2秒后恢复按钮状态
        setTimeout(() => {
            button.textContent = '加入购物车';
            button.style.backgroundColor = '';
        }, 2000);
    });
});

// ===== 滚动时导航栏样式变化 =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== 商品卡片悬停效果 =====
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== 页面加载完成后的初始化 =====
window.addEventListener('load', () => {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // 初始化倒计时显示
    updateCountdown();
});

// ===== 搜索功能 =====
const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        alert(`搜索: ${searchTerm}\n（此为演示功能，实际项目中会跳转到搜索结果页面）`);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// ===== 响应式处理 =====
window.addEventListener('resize', () => {
    // 窗口大小改变时，如果切换到桌面端，确保菜单正常显示
    if (window.innerWidth > 968) {
        navMenu.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    }
});

console.log('FashionHub 电商网站已加载完成！');
