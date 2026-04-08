/* ============================================================
   CUET Book World — main.js (Raw CSS Edition)
   Centralised script — handles ALL pages
   Features:
     1.  Toast notification system
     2.  Auto active-link detection
     3.  Navbar glass effect on scroll
     4.  Mobile menu toggle (with outside-click close)
     5.  Scroll-reveal animations (IntersectionObserver)
     6.  Scroll-to-top button
     7.  Scroll progress bar
     8.  Page entrance fade-in
     9.  Button ripple effect
    10.  Typed text animation  (add data-typed='["w1","w2"]' to any element)
    11.  Stats counter animation (add data-count="500" data-suffix="+" to element)
    12.  Smart navbar: hide on scroll-down, show on scroll-up
    13.  Keyboard shortcut: '/' to focus ebook search
   ============================================================ */


/* ── 1. TOAST SYSTEM ─────────────────────────────────────── */
const TOAST_CONFIG = {
    success: {
        cssClass: 'toast--success',
        icon: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
               </svg>`
    },
    error: {
        cssClass: 'toast--error',
        icon: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
               </svg>`
    },
    info: {
        cssClass: 'toast--info',
        icon: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
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

    // Trigger entrance (double rAF so CSS transition fires)
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('toast--visible')));

    const timer = setTimeout(() => dismissToast(toast), 3500);
    toast._timer = timer;
};

function dismissToast(toast) {
    clearTimeout(toast._timer);
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
}


/* ── 2. ACTIVE NAV LINK ──────────────────────────────────── */
function setActiveLinks() {
    let page = window.location.pathname.split('/').pop() || 'index.html';
    if (page === '') page = 'index.html';

    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === page);
    });
}


/* ── 3. NAVBAR GLASS EFFECT ON SCROLL ────────────────────── */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function update() {
        if (window.scrollY > 10) {
            navbar.classList.add('glass-nav', 'py-3');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('glass-nav', 'py-3');
            navbar.classList.add('py-4');
        }
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
}


/* ── 4. MOBILE MENU TOGGLE ───────────────────────────────── */
const ICON_MENU  = `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
const ICON_CLOSE = `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;

function initMobileMenu() {
    const btn  = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    let isOpen = false;

    function open() {
        isOpen = true;
        menu.classList.remove('hidden');
        void menu.offsetWidth;           // force reflow → triggers CSS transition
        menu.classList.add('open');
        btn.innerHTML = ICON_CLOSE;
        btn.style.color = 'var(--color-brand-600)';
    }

    function close() {
        isOpen = false;
        menu.classList.remove('open');
        btn.innerHTML = ICON_MENU;
        btn.style.color = '';
        setTimeout(() => { if (!isOpen) menu.classList.add('hidden'); }, 310);
    }

    btn.addEventListener('click', () => isOpen ? close() : open());

    // Close when clicking a link inside the menu
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (isOpen && !btn.contains(e.target) && !menu.contains(e.target)) close();
    });
}


/* ── 5. SCROLL-REVEAL ANIMATIONS ────────────────────────── */
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


/* ── 6. SCROLL-TO-TOP BUTTON ─────────────────────────────── */
function initScrollToTop() {
    const btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.className = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/>
                     </svg>`;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    window.addEventListener('scroll', () => {
        btn.classList.toggle('scroll-top-btn--visible', window.scrollY > 400);
    }, { passive: true });
}


/* ── 7. SCROLL PROGRESS BAR ──────────────────────────────── */
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    bar.className = 'scroll-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
    }, { passive: true });
}


/* ── 8. PAGE ENTRANCE FADE-IN ────────────────────────────── */
function initPageEntrance() {
    document.body.classList.add('page-entering');
    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('page-entered')));
}


/* ── 9. BUTTON RIPPLE EFFECT ─────────────────────────────── */
function initRipple() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest(
            'button, .btn-primary, .btn-primary-block, .btn-issue, .btn-submit, .btn-emerald, .btn-save'
        );
        if (!btn) return;

        const rect   = btn.getBoundingClientRect();
        const size   = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;

        if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    });
}


/* ── 10. TYPED TEXT ANIMATION ─────────────────────────────── */
function initTyped() {
    const el = document.querySelector('[data-typed]');
    if (!el) return;

    let words;
    try { words = JSON.parse(el.dataset.typed); }
    catch { return; }

    let wi = 0, ci = 0, deleting = false;

    function tick() {
        const word = words[wi];
        el.textContent = word.slice(0, deleting ? --ci : ++ci);

        if (!deleting && ci === word.length) {
            deleting = true;
            setTimeout(tick, 1800);
            return;
        }
        if (deleting && ci === 0) {
            deleting = false;
            wi = (wi + 1) % words.length;
        }
        setTimeout(tick, deleting ? 55 : 100);
    }
    tick();
}


/* ── 11. STATS COUNTER ANIMATION ─────────────────────────── */
function initCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            const target   = parseInt(el.dataset.count, 10);
            const suffix   = el.dataset.suffix || '';
            const duration = 1800;
            const start    = performance.now();

            function step(now) {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);   // ease-out cubic
                el.textContent = Math.round(eased * target) + suffix;
                if (t < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            observer.disconnect();
        }, { threshold: 0.5 });
        observer.observe(el);
    });
}


/* ── 12. SMART NAVBAR: HIDE ON SCROLL DOWN ───────────────── */
function initSmartNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastY = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        // Only hide after scrolled past navbar height & scrolling DOWN
        navbar.classList.toggle('navbar--hidden', y > lastY && y > 100);
        lastY = y;
    }, { passive: true });
}


/* ── 13. KEYBOARD SHORTCUTS ──────────────────────────────── */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        const active = document.activeElement;
        const inInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT');

        // '/' → focus search on ebook page
        if (e.key === '/' && !inInput) {
            const search = document.getElementById('searchInput');
            if (search) {
                e.preventDefault();
                search.focus();
                showToast('Tip: type to search, press Esc to clear focus', 'info');
            }
        }

        // 'Escape' → blur any focused input
        if (e.key === 'Escape' && inInput) active.blur();

        // 'Home' → scroll to top
        if (e.key === 'Home' && !inInput) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}


/* ── INIT: RUN EVERYTHING ON DOM READY ──────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    initPageEntrance();
    initNavbarScroll();
    initMobileMenu();
    setActiveLinks();
    initRevealAnimations();
    initScrollToTop();
    initScrollProgress();
    initSmartNavbar();
    initRipple();
    initTyped();
    initCounters();
    initKeyboardShortcuts();
});
