
const TOAST_CONFIG = {
    success: {
        cssClass: 'toast--success',
        icon: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
               </svg>`
    },
    error: {
        cssClass: 'toast--error',
        icon: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
               </svg>`
    },
    info: {
        cssClass: 'toast--info',
        icon: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
               </svg>`
    }
};

function getToastContainer() {
    let c = document.getElementById('toast-container');
    if (!c) {
        c = document.createElement('div');
        c.id = 'toast-container';
        document.body.appendChild(c);
    }
    return c;
}

window.showToast = function (message, type = 'info') {
    const config = TOAST_CONFIG[type] || TOAST_CONFIG.info;
    const container = getToastContainer();

    const toast = document.createElement('div');
    toast.className = `toast ${config.cssClass}`;
    toast.innerHTML = `
        <span class="toast__icon">${config.icon}</span>
        <p class="toast__message">${message}</p>
        <button class="toast__close" aria-label="Dismiss">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>`;

    toast.querySelector('.toast__close').addEventListener('click', () => dismissToast(toast));
    container.appendChild(toast);

    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('toast--visible')));
    toast._timer = setTimeout(() => dismissToast(toast), 3500);
};

function dismissToast(toast) {
    clearTimeout(toast._timer);
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
}


// 2. SCROLL animation
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('reveal');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


// INIT
document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
});
