// Theme Management for Admin Panel
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.createControls();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.updateThemeIcon();
    }

    createControls() {
        // Theme Toggle - bottom right for admin
        const themeToggle = document.createElement('button');
        themeToggle.className = 'btn btn-outline-secondary btn-sm theme-toggle-btn';
        themeToggle.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1050; border-radius: 50%; width: 50px; height: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);';
        themeToggle.innerHTML = `<i class="fas fa-${this.currentTheme === 'light' ? 'moon' : 'sun'}"></i>`;
        themeToggle.onclick = () => this.toggleTheme();
        document.body.appendChild(themeToggle);
    }

    updateThemeIcon() {
        const themeToggle = document.querySelector('.theme-toggle-btn i');
        if (themeToggle) {
            themeToggle.className = `fas fa-${this.currentTheme === 'light' ? 'moon' : 'sun'}`;
        }
    }
}

// Initialize Theme Manager
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});