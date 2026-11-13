/* =========================================================
   Prime Star Quiro — configurações e interações
   ========================================================= */

/*
 * CONFIGURAÇÃO DE CONTATO — edite aqui.
 * ATENÇÃO: o número abaixo é o telefone cadastrado da empresa.
 * Confirme com a clínica se ele atende pelo WhatsApp ANTES do lançamento.
 * Formato: 55 + DDD + número, somente dígitos.
 */
const CONFIG = {
  whatsapp: "5511945524905", // TODO: validar se é WhatsApp de atendimento
  mensagemWhatsapp: "Olá! Conheci a Prime Star Quiro pelo site e gostaria de saber mais sobre os atendimentos e agendamentos.",
  telefoneExibicao: "(11) 94552-4905",
  telefoneLink: "+5511945524905",
  email: "primestarquiro@gmail.com",
  enderecoMapa: "Avenida Sapopemba, 12847, Jardim Adutora, São Paulo - SP, 03989-010",

  // Mostra a faixa "Proposta demonstrativa" no topo. Use false na versão final.
  modoDemonstracao: true,
};

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Links de contato a partir do CONFIG */
  const waUrl = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.mensagemWhatsapp);
  document.querySelectorAll("[data-whatsapp]").forEach((a) => (a.href = waUrl));

  document.querySelectorAll("[data-phone]").forEach((a) => {
    a.href = "tel:" + CONFIG.telefoneLink;
    a.textContent = CONFIG.telefoneExibicao;
  });

  document.querySelectorAll("[data-email]").forEach((a) => {
    a.href = "mailto:" + CONFIG.email;
    a.textContent = CONFIG.email;
  });

  const mapsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(CONFIG.enderecoMapa);
  document.querySelectorAll("[data-maps]").forEach((a) => (a.href = mapsUrl));

  /* Faixa de demonstração */
  const demoBar = document.getElementById("demo-bar");
  if (demoBar && !CONFIG.modoDemonstracao) demoBar.hidden = true;

  /* Ano no rodapé */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* Cabeçalho com fundo ao rolar */
  const header = document.getElementById("site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menu mobile */
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Fechar menu" : "Abrir menu";
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  /* Revelação ao rolar, com pequeno escalonamento entre irmãos */
  const reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const siblings = Array.from(el.parentElement.querySelectorAll(":scope > .reveal"));
          el.style.setProperty("--d", Math.min(siblings.indexOf(el), 5) * 0.08 + "s");
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* Profundidade discreta no hero (somente com mouse) */
  const visual = document.getElementById("hero-visual");
  const hero = document.getElementById("inicio");
  if (visual && hero && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    let raf = null;
    hero.addEventListener("mousemove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        visual.style.setProperty("--px", (x * -18).toFixed(1) + "px");
        visual.style.setProperty("--py", (y * -14).toFixed(1) + "px");
        raf = null;
      });
    });
    hero.addEventListener("mouseleave", () => {
      visual.style.setProperty("--px", "0px");
      visual.style.setProperty("--py", "0px");
    });
  }
})();
