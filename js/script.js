document.addEventListener('DOMContentLoaded', function() {
    // Cookie banner
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    
    if (cookieBanner && acceptCookies) {
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieBanner.style.display = 'flex';
        } else {
            cookieBanner.style.display = 'none';
        }
        
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }
    
    // Активная ссылка в навигации
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        if (currentLocation.includes(link.href)) {
            link.classList.add('active');
        }
    });

    // Аккордеон
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Закрыть все другие элементы
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключить активный элемент
            item.classList.toggle('active');
        });
    });

    // Анимация при прокрутке
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .highlight-box, .feature, .partner');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Запустить анимацию при загрузке и прокрутке
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запустить при загрузке

    // Funcionalidad para el menú móvil
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const dropdowns = document.querySelectorAll('.dropdown');
    const header = document.querySelector('header');
    
    // Variables para el control del scroll
    let lastScrollTop = 0;
    const scrollThreshold = 10;
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Añadir funcionalidad para los dropdowns en móvil
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        if (link) {
            link.addEventListener('click', function(e) {
                // Solo aplicar en vista móvil
                if (window.innerWidth <= 1500) {
                    e.preventDefault();
                    
                    // Cerrar otros dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('active');
                        }
                    });
                    
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('.mobile-menu-toggle')) {
            // Cerrar dropdowns en móvil
            if (window.innerWidth <= 1500) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
            
            // Cerrar menú principal
            if (!e.target.closest('nav') && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
    
    // Ajustar al redimensionar la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1500) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            
            // Reiniciar dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Funcionalidad para ocultar/mostrar header al hacer scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // No aplicar la lógica si estamos en la parte superior de la página
        if (scrollTop <= 50) {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            lastScrollTop = scrollTop;
            return;
        }
        
        // Verificar si el scroll ha superado el umbral
        if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) {
            return;
        }
        
        // Scroll hacia abajo: ocultar header
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            header.classList.remove('header-visible');
            header.classList.add('header-hidden');
        } 
        // Scroll hacia arriba: mostrar header
        else {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
        }
        
        lastScrollTop = scrollTop;
    });
});