// JavaScript do TecWiki - Carrossel e Funcionalidades

// Array com os itens do carrossel (cursos e nomes)
const carouselItems = [
    { title: "Administração", image: "img/administração.jpg" },
    { title: "Alimentos", image: "img/alimentos.png" },
    { title: "Biotecnologia", image: "img/biotecnologia.jpg" },
    { title: "Contabilidade", image: "img/contabilidade.jpg" },
    { title: "Desenvolvimento de Sistemas", image: "img/desenvolvimento de sistemas.jpg" },
    { title: "Edificações", image: "img/edificações.jpg" },
    { title: "Eletromecânica", image: "img/eletromecanica.jpg" },
    { title: "Enfermagem", image: "img/enfermagem (1).jpg" },
    { title: "Informática", image: "img/informatica.jpg" },
    { title: "Química", image: "img/quimica.jpg" },
    { title: "Saúde Bucal", image: "img/saude bocal.jpg" },
    { title: "Segurança do Trabalho", image: "img/segurança do trabalho.png" },
    { title: "Técnico em Eletrônica", image: "img/Técnico em Eletrônica.jpg" },
    { title: "Técnico em Eletrotécnica", image: "img/Técnico em Eletrotécnica.jpg" },
    { title: "Técnico em Mecânica", image: "img/Técnico em Mecânica.png" },
    { title: "Transações Imobiliárias", image: "img/Transações Imobiliárias.jpg" }
];

// Array com os dados das instituições (3 itens)
const institutions = [
    { name: "CEDUP Industrial Lages", image: "img/colegio (1).jpeg" },
    { name: "CEDUP Renato Ramos da Silva", image: "img/cedup.jpg" },
    { name: "IFSC (Instituto Federal de Santa Catarina)", image: "img/ifsc.jpg" }
];

// Variáveis globais
let currentIndex = 0;
let isAnimating = false;
let autoSlideInterval;

// Elementos do DOM
const titleElement = document.getElementById("carousel-title");
const imageElement = document.getElementById("carousel-image");
const dotLeft = document.getElementById("dot-left");
const dotActive = document.getElementById("dot-active");
const dotRight = document.getElementById("dot-right");
const institutionImage = document.getElementById("institution-image");

// Atualiza o carrossel com animações suaves
function updateCarousel() {
    if (isAnimating) return;
    
    isAnimating = true;
    const currentItem = carouselItems[currentIndex];
    
    // Animação de saída para título
    titleElement.classList.add("changing");
    
    // Animação de saída para imagem
    imageElement.classList.add("changing");
    
    setTimeout(() => {
        // Atualiza conteúdo
        titleElement.textContent = currentItem.title;
        imageElement.src = currentItem.image;
        imageElement.alt = currentItem.title;
        
        // Remove classes de animação
        titleElement.classList.remove("changing");
        imageElement.classList.remove("changing");
        
        // Atualiza outros elementos
        resetTimerAnimation();
        updateDots();
        updateInstitutions();
        
        isAnimating = false;
    }, 300);
}

// Atualiza os atributos dos dots
function updateDots() {
    const n = carouselItems.length;
    dotLeft.setAttribute("data-index", (currentIndex - 1 + n) % n);
    dotActive.setAttribute("data-index", currentIndex);
    dotRight.setAttribute("data-index", (currentIndex + 1) % n);
}

// Reinicia a animação do timer na bolinha ativa
function resetTimerAnimation() {
    dotActive.classList.remove("active-dot");
    void dotActive.offsetWidth;
    dotActive.classList.add("active-dot");
    
    // Reinicia o timer automático
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 3000);
}

// Avança para o próximo slide
function nextSlide() {
    if (isAnimating) return;
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
}

// Retorna para imagem anterior
function prevSlide() {
    if (isAnimating) return;
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

// Atualiza a seção de Instituições com animações
function updateInstitutions() {
    const instIndex = currentIndex % institutions.length;
    
    // Animação de saída para imagem da instituição
    institutionImage.classList.add("changing");
    
    setTimeout(() => {
        institutionImage.src = institutions[instIndex].image;
        institutionImage.alt = institutions[instIndex].name;
        institutionImage.classList.remove("changing");
    }, 300);

    // Atualiza o destaque nos nomes com animação
    const activeElements = document.querySelectorAll(".inst-name");
    activeElements.forEach(el => el.classList.remove("active-inst"));
    
    setTimeout(() => {
        const activeElement = document.getElementById("inst-" + (instIndex + 1));
        if (activeElement) {
            activeElement.classList.add("active-inst");
        }
    }, 150);
}

// Funcionalidade do menu mobile
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown > a');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    // Mobile dropdown functionality
    mobileDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent) {
                dropdownContent.classList.toggle('active');
                
                // Rotaciona a seta
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = dropdownContent.classList.contains('active') 
                        ? 'rotate(180deg)' 
                        : 'rotate(0deg)';
                }
            }
        });
    });
}

// Funcionalidade do submenu - navegar para curso específico
function initializeSubmenuNavigation() {
    const courseLinks = document.querySelectorAll('.submenu-section a[href="cursos.html"]');
    
    courseLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cursoNome = e.target.textContent.trim();
            const cursoIndex = carouselItems.findIndex(item => item.title === cursoNome);
            
            if (cursoIndex !== -1) {
                currentIndex = cursoIndex;
                updateCarousel();
                // Scroll suave para o carrossel
                setTimeout(() => {
                    document.querySelector('.containerImage').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }, 100);
            }
        });
    });
}

// Adiciona efeitos de hover melhorados nos itens do menu
function initializeMenuEffects() {
    const menuItems = document.querySelectorAll('nav ul li a');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Adiciona animações aos cursos na tabela
function initializeCourseTableEffects() {
    const courseItems = document.querySelectorAll('.divisaoCurso h3');
    
    courseItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (this.textContent.trim() !== '') {
                this.style.transform = 'translateY(-3px) scale(1.02)';
                this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Adiciona funcionalidade de clique para navegar para o curso
        item.addEventListener('click', function() {
            const cursoNome = this.textContent.trim();
            if (cursoNome !== '') {
                const cursoIndex = carouselItems.findIndex(item => item.title === cursoNome);
                if (cursoIndex !== -1) {
                    currentIndex = cursoIndex;
                    updateCarousel();
                    // Scroll suave para o carrossel
                    setTimeout(() => {
                        document.querySelector('.containerImage').scrollIntoView({ 
                            behavior: 'smooth' 
                        });
                    }, 100);
                }
            }
        });
    });
}

// Funcionalidade de pause no hover do carrossel
function initializeCarouselHover() {
    const carouselContainer = document.querySelector('.containerImage');
    
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', function() {
            autoSlideInterval = setInterval(nextSlide, 3000);
        });
    }
}

// Funcionalidade de touch/swipe para dispositivos móveis
function initializeTouchControls() {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    let startX = 0;
    let endX = 0;
    
    if (carouselWrapper) {
        carouselWrapper.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        carouselWrapper.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = startX - endX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    nextSlide(); // Swipe left - próximo slide
                } else {
                    prevSlide(); // Swipe right - slide anterior
                }
            }
        }
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    initializeMobileMenu();
    initializeSubmenuNavigation();
    initializeMenuEffects();
    initializeCourseTableEffects();
    initializeCarouselHover();
    initializeTouchControls();

    // Inicia o carrossel
    updateCarousel();
    
    // Inicia o timer automático
    autoSlideInterval = setInterval(nextSlide, 3000);
    
    // Adiciona suporte para navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'Escape') {
            // Fecha menu mobile se estiver aberto
            const mobileNav = document.querySelector('.mobile-nav');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
    
    // Funcionalidade para fechar dropdowns ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('.mobile-dropdown')) {
            // Fecha todos os dropdowns desktop
            const dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(dropdown => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
            });
            
            // Fecha todos os dropdowns mobile
            const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-content');
            mobileDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// Funções para controle manual do carrossel (chamadas pelos botões)
function goToSlide(index) {
    if (index >= 0 && index < carouselItems.length && !isAnimating) {
        currentIndex = index;
        updateCarousel();
    }
}

// Função para pausar/retomar o carrossel
function toggleAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    } else {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
}

// Função para ir para um curso específico (pode ser chamada externamente)
function goToCourse(courseName) {
    const courseIndex = carouselItems.findIndex(item => 
        item.title.toLowerCase() === courseName.toLowerCase()
    );
    
    if (courseIndex !== -1) {
        currentIndex = courseIndex;
        updateCarousel();
        document.querySelector('.containerImage').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

// Limpa intervalos quando a página for fechada
window.addEventListener('beforeunload', function() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
});

// Funcionalidade adicional para melhor performance
// Lazy loading das imagens do carrossel
function preloadImages() {
    carouselItems.forEach(item => {
        const img = new Image();
        img.src = item.image;
    });
    
    institutions.forEach(institution => {
        const img = new Image();
        img.src = institution.image;
    });
}

// Precarrega as imagens após o carregamento inicial
setTimeout(preloadImages, 1000);