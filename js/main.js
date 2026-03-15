/* ============================================
   EDITORIAL BRUTALISM — Main JavaScript
   GSAP Animations, Cursor, Theme, Interactions
   ============================================ */

(function () {
    'use strict';

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (e) {
            // localStorage unavailable
        }
    }

    function loadTheme() {
        try {
            const saved = localStorage.getItem('portfolio-theme');
            if (saved) {
                setTheme(saved);
            }
        } catch (e) {
            // localStorage unavailable
        }
    }

    loadTheme();

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const current = html.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // --- Custom Cursor ---
    const cursor = document.getElementById('cursorFollower');
    const cursorLabel = document.getElementById('cursorLabel');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    if (cursor && window.innerWidth > 640) {
        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            cursorX += dx * 0.15;
            cursorY += dy * 0.15;
            cursor.style.transform = 'translate(' + cursorX + 'px, ' + cursorY + 'px) translate(-50%, -50%)';
            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        // Expand cursor on interactive elements
        const interactiveElements = document.querySelectorAll('[data-cursor]');
        interactiveElements.forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                cursor.classList.remove('pointer');
                cursor.classList.add('expanded');
                if (cursorLabel) {
                    cursorLabel.textContent = el.getAttribute('data-cursor');
                }
            });
            el.addEventListener('mouseleave', function () {
                cursor.classList.remove('expanded');
                if (cursorLabel) {
                    cursorLabel.textContent = '';
                }
            });
        });

        // Scale cursor on links and buttons
        var allLinks = document.querySelectorAll('a:not([data-cursor]), button:not([data-cursor])');
        allLinks.forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                cursor.classList.add('pointer');
            });
            el.addEventListener('mouseleave', function () {
                cursor.classList.remove('pointer');
            });
        });
    }

    // --- GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero title animation
    var heroLines = document.querySelectorAll('[data-animate="hero"] .hero-line, h1[data-animate="hero"] .hero-line');
    if (heroLines.length > 0) {
        gsap.fromTo(heroLines,
            { y: '100%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out',
                delay: 0.3
            }
        );
    }

    // Hero sub-elements
    var heroSubs = document.querySelectorAll('[data-animate="hero-sub"]');
    if (heroSubs.length > 0) {
        gsap.fromTo(heroSubs,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.8
            }
        );
    }

    // Direct hero title (non-nested lines)
    var directHero = document.querySelectorAll('[data-animate="hero"]:not(:has(.hero-line))');
    if (directHero.length > 0) {
        gsap.fromTo(directHero,
            { y: '100%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out',
                delay: 0.3
            }
        );
    }

    // Scroll reveal animations
    var revealElements = document.querySelectorAll('[data-animate="reveal"]');
    revealElements.forEach(function (el) {
        gsap.fromTo(el,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    end: 'top 20%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Project card animations
    var projectCards = document.querySelectorAll('[data-animate="project"]');
    projectCards.forEach(function (card, i) {
        gsap.fromTo(card,
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                delay: i * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Parallax on project card images
    var cardImages = document.querySelectorAll('.project-card-image:not(.project-card-image--manipal)');
    cardImages.forEach(function (img) {
        gsap.to(img, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // Content image reveal with clipping mask
    var contentImages = document.querySelectorAll('.content-image-container');
    contentImages.forEach(function (container) {
        gsap.fromTo(container,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Stat numbers — count up
    var statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(function (stat) {
        var text = stat.textContent;
        var hasAccent = stat.querySelector('.accent');

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            once: true,
            onEnter: function () {
                gsap.fromTo(stat,
                    { scale: 0.5, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }
                );
            }
        });
    });

    // Next project section hover spring
    var nextProject = document.querySelector('.next-project-link');
    if (nextProject) {
        nextProject.addEventListener('mouseenter', function () {
            gsap.to(nextProject, {
                scale: 1.05,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            });
        });
        nextProject.addEventListener('mouseleave', function () {
            gsap.to(nextProject, {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    }

    // --- Marquee speed control on hover ---
    var marqueeTrack = document.querySelector('.marquee-track');
    var marqueeSection = document.querySelector('.marquee-section');
    if (marqueeTrack && marqueeSection) {
        marqueeSection.addEventListener('mouseenter', function () {
            marqueeTrack.style.animationDuration = '40s';
        });
        marqueeSection.addEventListener('mouseleave', function () {
            marqueeTrack.style.animationDuration = '20s';
        });
    }

    // --- Physics-based hover on project cards ---
    var projectCardsPhysics = document.querySelectorAll('.project-card');
    projectCardsPhysics.forEach(function (card) {
        var bounds;

        card.addEventListener('mouseenter', function () {
            bounds = card.getBoundingClientRect();
        });

        card.addEventListener('mousemove', function (e) {
            if (!bounds) return;
            var x = e.clientX - bounds.left;
            var y = e.clientY - bounds.top;
            var cx = bounds.width / 2;
            var cy = bounds.height / 2;

            var rotateX = ((y - cy) / cy) * -5;
            var rotateY = ((x - cx) / cx) * 5;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function () {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });

    // --- Disable unavailable case-study cards while keeping href for later ---
    var unavailableProjectCards = document.querySelectorAll('.project-card--unavailable');
    unavailableProjectCards.forEach(function (card) {
        card.addEventListener('click', function (event) {
            event.preventDefault();
        });
    });

    // --- Directory item hover with physics ---
    var directoryItems = document.querySelectorAll('.directory-item');
    directoryItems.forEach(function (item) {
        if (item.classList.contains('directory-item--unavailable')) {
            return;
        }

        item.addEventListener('mouseenter', function () {
            gsap.to(item, {
                x: 12,
                duration: 0.4,
                ease: 'elastic.out(1, 0.6)'
            });
        });
        item.addEventListener('mouseleave', function () {
            gsap.to(item, {
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // --- Disable unavailable archive directory items while keeping href for later ---
    var unavailableDirectoryItems = document.querySelectorAll('.directory-item--unavailable');
    unavailableDirectoryItems.forEach(function (item) {
        item.addEventListener('click', function (event) {
            event.preventDefault();
        });
    });

    // --- Skill tag hover physics ---
    var skillTags = document.querySelectorAll('.skill-tags span');
    skillTags.forEach(function (tag) {
        tag.addEventListener('mouseenter', function () {
            gsap.to(tag, {
                scale: 1.05,
                duration: 0.3,
                ease: 'elastic.out(1, 0.5)'
            });
        });
        tag.addEventListener('mouseleave', function () {
            gsap.to(tag, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // --- Copy email functionality ---
    var copyEmailBtn = document.getElementById('copyEmail');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function () {
            var email = copyEmailBtn.getAttribute('data-email');
            if (navigator.clipboard && email) {
                navigator.clipboard.writeText(email).then(function () {
                    copyEmailBtn.classList.add('copied');
                    setTimeout(function () {
                        copyEmailBtn.classList.remove('copied');
                    }, 2000);
                });
            }
        });
    }

    // --- Nav scroll behavior ---
    var nav = document.querySelector('.nav');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
        var currentScroll = window.scrollY;

        if (currentScroll > 100) {
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.background = html.getAttribute('data-theme') === 'dark'
                ? 'rgba(10, 10, 10, 0.9)'
                : 'rgba(244, 244, 240, 0.9)';
        } else {
            nav.style.backdropFilter = 'none';
            nav.style.background = '';
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // --- Page entrance animation ---
    gsap.fromTo('body',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );

    // --- Experience row stagger reveal ---
    var experienceRows = document.querySelectorAll('.experience-row');
    experienceRows.forEach(function (row, i) {
        gsap.fromTo(row,
            { x: -40, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // --- Footer CTA spring animation ---
    var footerCta = document.querySelector('.footer-cta');
    if (footerCta) {
        footerCta.addEventListener('mouseenter', function () {
            gsap.to(footerCta, {
                x: -8,
                y: -8,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
        footerCta.addEventListener('mouseleave', function () {
            gsap.to(footerCta, {
                x: 0,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    }

    // --- Scroll progress indicator on nav ---
    var scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:var(--color-primary);z-index:10001;transition:none;width:0%;';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var percent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = percent + '%';
    }, { passive: true });

})();
