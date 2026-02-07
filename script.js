
        document.addEventListener('DOMContentLoaded', () => {
            
            /* --- 1. Theme Toggle (Modo Oscuro/Claro) --- */
            const themeToggle = document.getElementById('themeToggle');
            const body = document.body;
            const savedTheme = localStorage.getItem('theme');
            
            if(savedTheme === 'light') {
                body.setAttribute('data-theme', 'light');
            }

            themeToggle.addEventListener('click', () => {
                if(body.getAttribute('data-theme') === 'light') {
                    body.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'dark');
                } else {
                    body.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                }
            });

            /* --- 2. Navegación Hamburguesa --- */
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('navLinks');

            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            window.closeMenu = () => {
                navLinks.classList.remove('active');
            };

            /* --- 3. Scroll Animations (Intersection Observer) --- */
            const revealElements = document.querySelectorAll('.reveal');
            
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15
            });

            revealElements.forEach(el => revealObserver.observe(el));

            /* --- 4. Scroll Progress Bar --- */
            window.addEventListener('scroll', () => {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (scrollTop / scrollHeight) * 100;
                document.getElementById('progressBar').style.width = scrolled + "%";

                // Back to Top visibility
                const backToTop = document.getElementById('backToTop');
                if(scrollTop > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }

                // Header Style
                const header = document.getElementById('header');
                if(scrollTop > 50) {
                    header.style.background = "rgba(15, 12, 41, 0.95)";
                    header.style.padding = "10px 0";
                } else {
                    header.style.background = "rgba(15, 12, 41, 0.7)";
                    header.style.padding = "15px 0";
                }

                // Parallax Hero Simple
                const heroBg = document.getElementById('heroBg');
                if(heroBg && scrollTop < window.innerHeight) {
                    heroBg.style.transform = `translateY(${scrollTop * 0.5}px)`;
                }
            });

            document.getElementById('backToTop').addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            /* --- 5. Comparison Toggle (Godot vs Unity) --- */
            window.toggleComparison = (engine) => {
                const buttons = document.querySelectorAll('.toggle-btn');
                const descText = document.getElementById('desc-text');
                const tbody = document.getElementById('comparison-table-body');

                buttons.forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');

                if(engine === 'godot') {
                    descText.textContent = "Godot es ligero, open source y excelente para 2D y 3D independiente.";
                    tbody.innerHTML = `
                        <tr><th>Costo</th><td>Gratis (MIT)</td></tr>
                        <tr><th>Idioma</th><td>GDScript (Similar a Python)</td></tr>
                        <tr><th>VR Support</th><td>Nativo (OpenXR)</td></tr>
                    `;
                } else {
                    descText.textContent = "Unity es el estándar de la industria, con un ecosistema de activos masivo.";
                    tbody.innerHTML = `
                        <tr><th>Costo</th><td>Gratis hasta $100k ganancia</td></tr>
                        <tr><th>Idioma</th><td>C#</td></tr>
                        <tr><th>VR Support</th><td>XR Interaction Toolkit</td></tr>
                    `;
                }
            };

            /* --- 6. Tabs Logic --- */
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');

            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active classes
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));

                    // Add active to clicked
                    btn.classList.add('active');
                    const targetId = btn.getAttribute('data-tab');
                    document.getElementById(targetId).classList.add('active');
                });
            });

            /* --- 7. Tips Filter --- */
            window.filterTips = (level, btn) => {
                const cards = document.querySelectorAll('.tip-card');
                
                // Update buttons
                const buttons = document.querySelectorAll('.filter-controls .btn');
                buttons.forEach(b => b.classList.remove('active')); // Assuming active style needed, or rely on CSS hover
                
                cards.forEach(card => {
                    if(level === 'all' || card.getAttribute('data-level') === level) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                    }
                });
            };

            /* --- 8. Carousel Logic --- */
            let currentSlide = 0;
            const track = document.getElementById('track');
            const slides = document.querySelectorAll('.carousel-slide');
            const totalSlides = slides.length;

            window.moveCarousel = (direction) => {
                currentSlide += direction;

                if(currentSlide < 0) {
                    currentSlide = totalSlides - 1;
                } else if(currentSlide >= totalSlides) {
                    currentSlide = 0;
                }

                const offset = -(currentSlide * 100);
                track.style.transform = `translateX(${offset}%)`;
            };

            // Autoplay Carousel
            setInterval(() => {
                moveCarousel(1);
            }, 5000);

            /* --- 9. Simulated Interactions --- */
            window.simulateDownload = (e, filename) => {
                e.preventDefault();
                alert(`Iniciando descarga simulada: ${filename}\n(En un entorno real, el PDF se descargaría aquí)`);
            };

            window.showDemoMsg = (title) => {
                alert(`Cargando demostración de: ${title}...\nRedirigiendo a reproductor de video.`);
            };

            /* --- 10. Newsletter Form --- */
            document.getElementById('newsletterForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const input = e.target.querySelector('input');
                if(input.value) {
                    alert(`¡Gracias! Te has suscrito con: ${input.value}`);
                    input.value = '';
                }
            });
        });
    