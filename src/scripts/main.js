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
        if (form) {
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
        }

        // ---- Image lightbox ------------------------------------------------
        // Click any content photo to view it full size.
        //
        // Built for the fact that most visitors never click an image: one
        // delegated listener covers every photo on the page regardless of how
        // many there are, and the overlay markup is not created until the first
        // click actually happens. A visitor who never opens an image pays for a
        // single event listener and nothing else.
        //
        // Keep this list in sync with the `cursor: zoom-in` rule in global.css.
        var ZOOMABLE = '.pgallery-item img, .pcolour img, .pfeature-photo img, ' +
            '.chart-panel img, .finish-photo img, .sealer-photo img, ' +
            '.project-image img, .aframe-media img, ' +
            '.blog-post-hero img, .blog-post-body img';

        var lb = null;        // overlay elements, created on first open
        var group = [];       // the set the arrows move through
        var index = 0;
        var lastFocused = null;

        function buildLightbox() {
            var el = document.createElement('div');
            el.className = 'lightbox';
            el.setAttribute('role', 'dialog');
            el.setAttribute('aria-modal', 'true');
            el.setAttribute('aria-label', 'Image viewer');
            el.innerHTML =
                '<button class="lightbox-btn lightbox-prev" aria-label="Previous image">‹</button>' +
                '<figure class="lightbox-figure">' +
                    '<img alt="" decoding="async" />' +
                    '<figcaption class="lightbox-caption"></figcaption>' +
                '</figure>' +
                '<button class="lightbox-btn lightbox-next" aria-label="Next image">›</button>' +
                '<button class="lightbox-btn lightbox-close" aria-label="Close image viewer">×</button>' +
                '<p class="lightbox-counter"></p>';
            document.body.appendChild(el);

            lb = {
                root: el,
                img: el.querySelector('.lightbox-figure img'),
                caption: el.querySelector('.lightbox-caption'),
                counter: el.querySelector('.lightbox-counter'),
                prev: el.querySelector('.lightbox-prev'),
                next: el.querySelector('.lightbox-next'),
                close: el.querySelector('.lightbox-close')
            };

            lb.close.addEventListener('click', closeLightbox);
            lb.prev.addEventListener('click', function () { step(-1); });
            lb.next.addEventListener('click', function () { step(1); });
            // Clicking the backdrop closes. Clicking the photo itself must not.
            el.addEventListener('click', function (e) {
                if (e.target === el || e.target.classList.contains('lightbox-figure')) closeLightbox();
            });
        }

        function show(i) {
            var source = group[i];
            index = i;
            // currentSrc is whatever the browser actually fetched, so the
            // lightbox reuses the cached bitmap rather than issuing a request.
            lb.img.src = source.currentSrc || source.src;
            lb.img.alt = source.alt || '';
            lb.caption.textContent = source.alt || '';
            var many = group.length > 1;
            lb.prev.hidden = !many;
            lb.next.hidden = !many;
            lb.counter.textContent = many ? (i + 1) + ' / ' + group.length : '';
            // Warm the neighbours so arrowing through a gallery is instant.
            if (many) {
                [group[(i + 1) % group.length], group[(i - 1 + group.length) % group.length]]
                    .forEach(function (n) { new Image().src = n.currentSrc || n.src; });
            }
        }

        function step(delta) {
            if (group.length > 1) show((index + delta + group.length) % group.length);
        }

        function openLightbox(img) {
            if (!lb) buildLightbox();
            // The arrows move within the surrounding section, so one product
            // gallery is a set and the blog body is a separate one. Hidden
            // images (an inactive colour-chart panel) are left out.
            var scope = img.closest('section, .blog-post-body') || document.body;
            group = Array.prototype.filter.call(
                scope.querySelectorAll(ZOOMABLE),
                function (n) { return n === img || n.offsetParent !== null; }
            );
            if (group.indexOf(img) === -1) group = [img];
            lastFocused = document.activeElement;
            show(group.indexOf(img));
            lockScroll(true);
            // Flush the pending styles so the transition has a state to move
            // from. requestAnimationFrame would do this too, but it is throttled
            // when the page is not actively rendering, which leaves the overlay
            // stuck at opacity 0 while still covering the page.
            void lb.root.offsetWidth;
            lb.root.classList.add('open');
            lb.close.focus();
        }

        function closeLightbox() {
            if (!lb) return;
            lb.root.classList.remove('open');
            lockScroll(false);
            if (lastFocused && lastFocused.focus) lastFocused.focus();
            // Release the decoded bitmap once the fade has finished.
            window.setTimeout(function () {
                if (!lb.root.classList.contains('open')) lb.img.removeAttribute('src');
            }, 300);
        }

        function lockScroll(on) {
            if (on) {
                // Pad by the scrollbar width, or the page jumps sideways as it
                // disappears.
                var gap = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.paddingRight = gap > 0 ? gap + 'px' : '';
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            }
        }

        function zoomableFrom(target) {
            if (!target || !target.closest) return null;
            var img = target.closest(ZOOMABLE);
            // Never hijack a photo that is already a link to somewhere else.
            return img && !img.closest('a') ? img : null;
        }

        document.addEventListener('click', function (e) {
            var img = zoomableFrom(e.target);
            if (!img) return;
            e.preventDefault();
            openLightbox(img);
        });

        // These photos are controls now, so they have to be reachable without a
        // mouse. Only the zoomable ones get a tab stop -- logos and card
        // thumbnails stay out of the tab order.
        document.querySelectorAll(ZOOMABLE).forEach(function (img) {
            if (img.closest('a')) return;
            img.tabIndex = 0;
            img.setAttribute('role', 'button');
        });

        document.addEventListener('keydown', function (e) {
            var open = lb && lb.root.classList.contains('open');

            if (!open) {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                var img = zoomableFrom(e.target);
                if (!img) return;
                e.preventDefault();
                openLightbox(img);
                return;
            }

            if (e.key === 'Escape') { closeLightbox(); }
            else if (e.key === 'ArrowRight') { step(1); }
            else if (e.key === 'ArrowLeft') { step(-1); }
            else if (e.key === 'Tab') {
                // Keep focus inside the dialog while it is open.
                var buttons = Array.prototype.filter.call(
                    lb.root.querySelectorAll('button'),
                    function (b) { return !b.hidden; }
                );
                var first = buttons[0];
                var last = buttons[buttons.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
    });
