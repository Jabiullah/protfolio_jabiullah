// ==================== TAB NAVIGATION MODULE ====================
const TabNavigation = (function() {
    const navItems = document.querySelectorAll('.nav__item');
    const contentSections = document.querySelectorAll('.content');

    function switchTab(targetTab) {
        // Remove active state from all tabs
        navItems.forEach(item => {
            item.classList.remove('nav__item--active');
            // Update ARIA attribute
            item.setAttribute('aria-selected', 'false');
        });

        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('content--active');
        });

        // Activate selected tab
        const activeNavItem = document.querySelector(`[data-tab="${targetTab}"]`);
        const activeContent = document.getElementById(`${targetTab}-content`);

        if (activeNavItem && activeContent) {
            activeNavItem.classList.add('nav__item--active');
            activeNavItem.setAttribute('aria-selected', 'true');
            activeContent.classList.add('content--active');
        }
    }

    function init() {
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            });

            // Keyboard accessibility — use keydown (keypress is deprecated)
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const targetTab = this.getAttribute('data-tab');
                    switchTab(targetTab);
                }
            });
        });
    }

    // Expose switchTab publicly for other modules
    return { init, switchTab };
})();

// ==================== INTERNAL TAB LINK HANDLER ====================
const InternalTabLinks = (function() {
    function init() {
        const links = document.querySelectorAll('a[href^="#"][data-tab]');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetTab = this.getAttribute('data-tab');
                const targetId = this.getAttribute('data-target');

                if (!targetTab) return;

                // Switch the tab
                TabNavigation.switchTab(targetTab);

                // Scroll to specific element if targetId exists, else scroll to top of section
                let scrollTarget;
                if (targetId) {
                    scrollTarget = document.getElementById(targetId);
                } else {
                    scrollTarget = document.getElementById(targetTab + '-content');
                }

                if (scrollTarget) {
                    scrollTarget.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    return { init };
})();

// ==================== INITIALIZE APP ====================
document.addEventListener('DOMContentLoaded', function() {
    TabNavigation.init();
    InternalTabLinks.init();
});