document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("main-nav");
    const navLinks = nav.querySelectorAll("a");

    function closeMenu() {
        nav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
    }

    function openMenu() {
        nav.classList.add("open");
        menuToggle.classList.add("open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Cerrar menú");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.contains("open");
        isOpen ? closeMenu() : openMenu();
    });

    // Cierra el menú al seleccionar una opción.
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Cierra el menú al hacer clic fuera del encabezado.
    document.addEventListener("click", (event) => {
        if (
            window.innerWidth <= 719 &&
            nav.classList.contains("open") &&
            !event.target.closest("header")
        ) {
            closeMenu();
        }
    });

    // Si cambia a escritorio, restablece el estado del menú.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 719) {
            closeMenu();
        }
    });

    // Marca en el menú la sección visible.
    const sections = document.querySelectorAll("main section[id]");
    const linksById = {};

    navLinks.forEach(link => {
        const id = link.getAttribute("href");
        if (id && id.startsWith("#")) {
            linksById[id.substring(1)] = link;
        }
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && linksById[entry.target.id]) {
                    navLinks.forEach(link => link.classList.remove("active"));
                    linksById[entry.target.id].classList.add("active");
                }
            });
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));
});
