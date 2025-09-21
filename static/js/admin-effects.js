// Professional Admin Panel JavaScript Effects

document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles
    createParticles();
    
    // Initialize animations
    initializeAnimations();
    
    // Mobile menu toggle
    initializeMobileMenu();
    
    // Form enhancements
    enhanceForms();
    
    // Table enhancements
    enhanceTables();
});

// Create floating particles background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and forms
    document.querySelectorAll('.stat-card, .form-card, .table-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 768 && sidebar) {
        // Create mobile menu button
        const menuButton = document.createElement('button');
        menuButton.className = 'btn btn-primary mobile-menu-btn';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(menuButton);
        
        // Hide sidebar initially on mobile
        sidebar.style.cssText = `
            position: fixed;
            left: -100%;
            top: 0;
            height: 100vh;
            width: 280px;
            z-index: 999;
            transition: left 0.3s ease;
            overflow-y: auto;
        `;
        
        // Toggle sidebar
        menuButton.addEventListener('click', function() {
            const isOpen = sidebar.style.left === '0px';
            sidebar.style.left = isOpen ? '-100%' : '0px';
            menuButton.innerHTML = isOpen ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !menuButton.contains(e.target)) {
                sidebar.style.left = '-100%';
                menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Enhance forms with animations
function enhanceForms() {
    // Add floating labels
    document.querySelectorAll('.form-control').forEach(input => {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            label.style.cssText = `
                position: absolute;
                top: 50%;
                left: 20px;
                transform: translateY(-50%);
                transition: all 0.3s ease;
                pointer-events: none;
                color: #718096;
                background: white;
                padding: 0 5px;
            `;
            
            input.parentElement.style.position = 'relative';
            
            function updateLabel() {
                if (input.value || input === document.activeElement) {
                    label.style.top = '0';
                    label.style.fontSize = '12px';
                    label.style.color = '#667eea';
                } else {
                    label.style.top = '50%';
                    label.style.fontSize = '16px';
                    label.style.color = '#718096';
                }
            }
            
            input.addEventListener('focus', updateLabel);
            input.addEventListener('blur', updateLabel);
            input.addEventListener('input', updateLabel);
            updateLabel();
        }
    });
    
    // Add loading state to buttons
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading"></span> Processing...';
                submitBtn.disabled = true;
                
                // Re-enable after 3 seconds (fallback)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });
}

// Enhance tables
function enhanceTables() {
    document.querySelectorAll('.table tbody tr').forEach((row, index) => {
        row.style.animationDelay = (index * 0.1) + 's';
        row.classList.add('fade-in-row');
    });
    
    // Add search functionality if search input exists
    const searchInput = document.querySelector('#tableSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.table tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                    row.style.animation = 'fadeInUp 0.3s ease-out';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

// Smooth page transitions
function smoothTransition(url) {
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Add click effects to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        e.target.style.position = 'relative';
        e.target.style.overflow = 'hidden';
        e.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fade-in-row {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .fade-in-row {
        animation: fade-in-row 0.5s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Auto-hide alerts
document.querySelectorAll('.alert').forEach(alert => {
    setTimeout(() => {
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-20px)';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
});

// Responsive table wrapper
document.querySelectorAll('.table').forEach(table => {
    if (!table.closest('.table-responsive')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    }
});