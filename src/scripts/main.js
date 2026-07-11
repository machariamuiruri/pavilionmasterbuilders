document.addEventListener('DOMContentLoaded', function () {
        // Mobile hamburger menu
        var navToggle = document.getElementById('nav-toggle');
        var navMenu = document.getElementById('nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function () {
                var open = navMenu.classList.toggle('open');
                navToggle.classList.toggle('open', open);
                navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
            // close the menu after tapping any link or button inside it
            navMenu.querySelectorAll('a, button').forEach(function (el) {
                el.addEventListener('click', function () {
                    navMenu.classList.remove('open');
                    navToggle.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Colour-chart tabs
        document.querySelectorAll('.chart-tab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                document.querySelectorAll('.chart-tab').forEach(function (t) { t.classList.remove('active'); });
                document.querySelectorAll('.chart-panel').forEach(function (p) { p.classList.remove('active'); });
                tab.classList.add('active');
                var panel = document.getElementById('chart-' + tab.dataset.chart);
                if (panel) panel.classList.add('active');
            });
        });

        // Web3Forms contact form (AJAX submit, no page reload)
        var form = document.getElementById('pmb-contact-form');
        if (!form) return;
        var status = document.getElementById('form-status');
        var btn = document.getElementById('form-submit');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            status.className = 'form-status';
            var original = btn.textContent;
            btn.disabled = true; btn.textContent = 'Sending...';
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form)
            })
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (data.success) {
                    status.textContent = 'Thank you! Your message has been sent — our team will be in touch shortly.';
                    status.className = 'form-status success show';
                    form.reset();
                } else {
                    status.textContent = data.message || 'Something went wrong. Please try again or call us directly.';
                    status.className = 'form-status error show';
                }
            })
            .catch(function () {
                status.textContent = 'Network error. Please try again, or reach us on WhatsApp.';
                status.className = 'form-status error show';
            })
            .finally(function () { btn.disabled = false; btn.textContent = original; });
        });
    });
