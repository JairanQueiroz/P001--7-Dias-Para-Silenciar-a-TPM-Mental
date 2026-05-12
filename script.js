document.addEventListener('DOMContentLoaded', () => {

    // 1. Enter Animations (Reveal on Scroll)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.motion-enter, .hero-text-mask').forEach((el) => {
        observer.observe(el);
    });

    // Trigger Hero Immediately
    setTimeout(() => {
        document.querySelectorAll('.hero-text-mask').forEach(el => el.classList.add('active'));
        document.querySelectorAll('.motion-enter').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 300);

    // 2. Flashlight/Glow Logic
    const glowCards = document.querySelectorAll('.glow-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // 3. FAQ Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const activeHeader = document.querySelector('.accordion-header.active');
            if (activeHeader && activeHeader !== header) {
                activeHeader.classList.remove('active');
                activeHeader.nextElementSibling.style.maxHeight = null;
            }

            header.classList.toggle('active');
            const content = header.nextElementSibling;
            
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // 4. Countdown Logic
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    if(hoursSpan && minutesSpan && secondsSpan) {
        let totalSeconds = 2 * 3600 + 45 * 60 + 30; // 2h 45m 30s
        setInterval(() => {
            if (totalSeconds <= 0) return;
            totalSeconds--;
            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;
            hoursSpan.textContent = h.toString().padStart(2, '0');
            minutesSpan.textContent = m.toString().padStart(2, '0');
            secondsSpan.textContent = s.toString().padStart(2, '0');
        }, 1000);
    }
});
