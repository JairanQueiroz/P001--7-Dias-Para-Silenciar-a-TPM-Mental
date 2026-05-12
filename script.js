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

    // 5. Social Proof Notifications
    const names = ["Ana", "Beatriz", "Carla", "Daniela", "Eduarda", "Fernanda", "Gabriela", "Helena", "Isabela", "Julia", "Larissa", "Mariana", "Natalia", "Olivia", "Paula", "Renata", "Sofia", "Thais", "Vanessa", "Yasmin", "Camila", "Leticia", "Bruna", "Amanda"];
    const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre", "Salvador", "Fortaleza", "Brasília", "Recife", "Manaus", "Goiânia", "Belém", "Vitória", "Florianópolis"];
    
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);

    function showNotification() {
        const name = names[Math.floor(Math.random() * names.length)];
        
        const toast = document.createElement('div');
        toast.className = 'social-notification';
        toast.innerHTML = `
            <div class="icon"><iconify-icon icon="solar:cart-check-bold"></iconify-icon></div>
            <div class="content">
                <strong>${name}</strong>
                acabou de garantir o Protocolo!
            </div>
        `;
        
        notificationContainer.appendChild(toast);
        
        setTimeout(() => toast.classList.add('active'), 100);
        
        setTimeout(() => {
            toast.classList.remove('active');
            setTimeout(() => toast.remove(), 600);
        }, 5000);
    }

    // Initial delay then repeat
    setTimeout(() => {
        showNotification();
        setInterval(showNotification, 12000 + Math.random() * 10000);
    }, 4000);

    // 6. Online Counter
    const onlineCounter = document.createElement('div');
    onlineCounter.className = 'online-counter';
    let baseOnline = 10;
    onlineCounter.innerHTML = `
        <div class="online-dot"></div>
        <span><span id="online-number">${baseOnline}</span> pessoas online agora</span>
    `;
    document.body.appendChild(onlineCounter);

    const progressionInterval = setInterval(() => {
        if (baseOnline >= 51) {
            // Pequenas flutuações após chegar em 51
            const fluctuation = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
            baseOnline += fluctuation;
            if (baseOnline > 55) baseOnline = 51;
            if (baseOnline < 48) baseOnline = 51;
        } else {
            const increments = [3, 7, 10];
            const inc = increments[Math.floor(Math.random() * increments.length)];
            baseOnline += inc;
            if (baseOnline > 51) baseOnline = 51;
        }
        
        const numSpan = document.getElementById('online-number');
        if(numSpan) numSpan.textContent = baseOnline;
    }, 60000); // A cada 1 minuto
});
