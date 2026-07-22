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

        // Animated stat counters (count up once, when scrolled into view)
        var statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length && 'IntersectionObserver' in window) {
            var animateStat = function (el) {
                var match = el.textContent.trim().match(/^([\d,]+)(.*)$/);
                if (!match) return;
                var target = parseInt(match[1].replace(/,/g, ''), 10);
                var suffix = match[2];
                var duration = 1600;
                var start = null;
                function step(timestamp) {
                    if (start === null) start = timestamp;
                    var progress = Math.min((timestamp - start) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(eased * target).toLocaleString() + suffix;
                    if (progress < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
            };
            var statsObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateStat(entry.target);
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });
            statNumbers.forEach(function (el) { statsObserver.observe(el); });
        }

        // Nav scroll-spy: highlight whichever homepage section is currently in view
        var navSpyLinks = document.querySelectorAll('header nav a[data-scroll-key]');
        if (navSpyLinks.length && 'IntersectionObserver' in window) {
            var spySections = ['home', 'products', 'projects', 'contact']
                .map(function (id) { return document.getElementById(id); })
                .filter(Boolean);
            if (spySections.length) {
                var setActiveSection = function (id) {
                    navSpyLinks.forEach(function (a) {
                        a.classList.toggle('active', a.dataset.scrollKey === id);
                    });
                };
                var spyObserver = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) setActiveSection(entry.target.id);
                    });
                }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
                spySections.forEach(function (section) { spyObserver.observe(section); });
            }
        }

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
