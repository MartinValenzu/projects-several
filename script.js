/* ========================================
   1. SELECCIONAR ELEMENTOS DEL HTML
======================================== */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contact-form");
const yearElement = document.getElementById("year");
const formFeedback = document.getElementById("form-feedback");

/* ========================================
   2. ABRIR Y CERRAR EL MENÚ MÓVIL
======================================== */
function closeMenu() {
  if (!menuToggle || !navMenu) return;

  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeMenu();
  });
}

/* ========================================
   3. ACTUALIZAR EL AÑO DEL PIE DE PÁGINA
======================================== */
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ========================================
   4. RESALTAR LA SECCIÓN VISIBLE
======================================== */
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${currentId}`;
          link.classList.toggle("active", isCurrent);
        });
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

/* ========================================
   5. PREPARAR UN MENSAJE DE CONTACTO
   No envía datos a un servidor.
======================================== */
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !correo || !mensaje) {
      formFeedback.textContent = "Por favor, completa todos los campos.";
      return;
    }

    const subject = encodeURIComponent(`Mensaje de ${nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`
    );

    formFeedback.textContent = "Se abrirá tu aplicación de correo para enviar el mensaje.";
    window.location.href = `mailto:tu-correo@ejemplo.com?subject=${subject}&body=${body}`;
  });
}

console.log("Portafolio cargado correctamente.");
