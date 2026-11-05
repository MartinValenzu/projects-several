

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contact-form");
const yearElement = document.getElementById("year");
const formFeedback = document.getElementById("form-feedback");

// Menú de navegación
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
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );
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

// Año automático
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Navegación según la sección visible
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navLinks.forEach((link) => {
          const isCurrent =
            link.getAttribute("href") === `#${currentId}`;

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

// Formulario de contacto con Formspree
if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    const originalText = submitButton
      ? submitButton.innerHTML
      : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    if (formFeedback) {
      formFeedback.textContent = "";
    }

    try {
      const response = await fetch(
        "https://formspree.io/f/mwllznbb",
        {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            Accept: "application/json"
          }
        }
      );

      if (response.ok) {
        if (formFeedback) {
          formFeedback.textContent =
            "¡Mensaje enviado correctamente! Gracias por contactarme.";
        }

        contactForm.reset();
      } else {
        if (formFeedback) {
          formFeedback.textContent =
            "No se pudo enviar el mensaje. Verifica el formulario e inténtalo nuevamente.";
        }
      }
    } catch (error) {
      if (formFeedback) {
        formFeedback.textContent =
          "Error de conexión. Comprueba tu Internet e inténtalo nuevamente.";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }
    }
  });
}

console.log("Portafolio cargado correctamente.");

