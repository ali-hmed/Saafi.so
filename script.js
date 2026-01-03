document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // 3. Pricing Toggle Logic
    const billingToggle = document.getElementById('billing-toggle');
    const priceAmounts = document.querySelectorAll('.amount');

    if (billingToggle) {
        billingToggle.addEventListener('change', function () {
            priceAmounts.forEach(amount => {
                const monthly = amount.getAttribute('data-monthly');
                const yearly = amount.getAttribute('data-yearly');

                amount.style.opacity = '0';
                setTimeout(() => {
                    amount.innerText = this.checked ? yearly : monthly;
                    amount.style.opacity = '1';
                }, 200);
            });
        });
    }

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // 5. Reveal Animations on Scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = ['.hero-content', '.browser-mockup', '.feature-card', '.step', '.pricing-card', '.faq-item', '.cta-card', '.problem-card'];
    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal-hidden');
            revealObserver.observe(el);
        });
    });

    // 6. Realistic "Toast" Social Proof
    const toast = document.getElementById('notification-toast');
    const toastMsg = document.getElementById('toast-message');
    const names = ['Julie', 'Marcus', 'Elena', 'David', 'Sophie', 'Alex'];
    const actions = ['just upgraded to Pro', 'joined the waitlist', 'completed onboarding', 'issued an invoice'];

    function showRandomToast() {
        if (!toast || !toastMsg) return;
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        toastMsg.innerText = `${randomName} ${randomAction}!`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
    }
    setTimeout(showRandomToast, 3000);
    setInterval(showRandomToast, Math.random() * (30000 - 15000) + 15000);

    // 7. Parallax for Hero Elements
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
            heroImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    // 8. Form Interaction Simulation
    const heroEmailInput = document.getElementById('hero-email');
    const heroBtn = heroEmailInput?.nextElementSibling;

    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            const email = heroEmailInput.value;
            if (email.includes('@')) {
                heroBtn.innerText = 'Success! ✨';
                heroBtn.style.background = '#10b981';
                heroEmailInput.value = '';
                setTimeout(() => {
                    heroBtn.innerText = 'Get Early Access';
                    heroBtn.style.background = '';
                }, 3000);
            } else {
                heroEmailInput.style.borderColor = '#ef4444';
                setTimeout(() => { heroEmailInput.style.borderColor = ''; }, 2000);
            }
        });
    }

    // 9. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksList = document.getElementById('nav-links');

    if (menuToggle && navLinksList) {
        menuToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinksList.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // 10. Scroll Spy (Active Link Highlighting)
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });
});
