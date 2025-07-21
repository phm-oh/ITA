// navloader.js - ไฟล์สำหรับโหลด navigation
async function loadNavigation() {
    try {
        const response = await fetch('navmenu.html');
        const navHTML = await response.text();
        
        // ใส่ navigation ลงในตำแหน่งที่กำหนด
        const navContainer = document.getElementById('nav-container');
        if (navContainer) {
            navContainer.innerHTML = navHTML;
            
            // ตั้งค่า active menu ตาม URL ปัจจุบัน
            setActiveMenu();
            
            // เรียกใช้ navigation setup
            if (typeof setupNavigation === 'function') {
                setupNavigation();
            }
        }
    } catch (error) {
        console.error('Error loading navigation:', error);
        // Fallback: แสดง navigation แบบพื้นฐาน
        showFallbackNav();
    }
}

// ตั้งค่า active menu ตาม URL
function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        
        // ตรวจสอบว่าเป็นหน้าปัจจุบันหรือไม่
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
}

// Navigation สำรอง
function showFallbackNav() {
    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        navContainer.innerHTML = `
            <nav class="nav-bar">
                <div class="container">
                    <div class="nav-menu">
                        <a href="index.html" class="nav-item">หน้าแรก</a>
                        <a href="about.html" class="nav-item">เกี่ยวกับองค์กร</a>
                        <a href="about-ita.html" class="nav-item">เกี่ยวกับ ITA</a>
                        <a href="itas-system.html" class="nav-item">ระบบ ITAS</a>
                        <a href="data-disclosure.html" class="nav-item">เปิดเผยข้อมูล</a>
                        <a href="about.html" class="nav-item">ติดต่อ</a>
                    </div>
                </div>
            </nav>
        `;
        setActiveMenu();
    }
}

// โหลดเมื่อ DOM พร้อม
document.addEventListener('DOMContentLoaded', function() {
    loadNavigation();
});