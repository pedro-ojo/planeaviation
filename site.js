/* ============================================================
   site.js — header + footer compartilhados (vanilla, roda em file://)
   ============================================================ */
(function () {
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const LANG = `<select class="lang"><option>Português</option><option>English</option><option>Español</option></select>`;

  const navLinks = [
    { label: "Aeronaves Disponíveis", href: "aeronaves.html" },
    { label: "Universo Cirrus", href: "universo-cirrus.html" },
    { label: "Serviços Plane", href: "servicos.html" },
    { label: "Sobre", href: "sobre.html" },
    { label: "Contato", href: "contato.html" },
  ];
  const isActive = (href) => (href === page ? " active" : "");

  const navHTML = navLinks
    .map((l) => `<a href="${l.href}" class="${isActive(l.href).trim()}">${l.label}</a>`)
    .join("");

  /* ---------- HEADER ---------- */
  const header = `
  <header class="site">
    <div class="container">
      <div class="hd-row">
        <a href="index.html" class="logo">
          <span class="logo-mark"><span>PA</span></span>
          <span class="logo-name">Plane Aviation</span>
        </a>
        <nav class="nav">${navHTML}</nav>
        <div class="hd-actions">
          ${LANG}
          <a href="contato.html" class="btn btn-solid btn-xs">Falar com um Especialista</a>
        </div>
        <button class="hd-toggle" id="menuToggle" aria-label="Menu">
          <svg class="icon i-5" viewBox="0 0 24 24"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </div>
    <div class="mobile-nav" id="mobileNav">
      <nav>
        ${navHTML}
        ${LANG}
        <a href="contato.html" class="btn btn-solid btn-sm">Falar com um Especialista</a>
      </nav>
    </div>
  </header>`;

  /* ---------- FOOTER ---------- */
  const footerLinks = [
    { label: "Home", href: "index.html" },
    { label: "Aeronaves Disponíveis", href: "aeronaves.html" },
    { label: "Universo Cirrus", href: "universo-cirrus.html" },
    { label: "Configurador", href: "configurador.html" },
    { label: "Sobre a Plane", href: "sobre.html" },
    { label: "Serviços", href: "servicos.html" },
    { label: "News & Podcast", href: "news.html" },
    { label: "Vender seu Cirrus", href: "contato.html?motivo=vender" },
  ];

  const footer = `
  <footer class="site">
    <div class="container">
      <div class="f-grid">
        <div>
          <div class="f-logo">
            <span class="logo-mark"><span>PA</span></span>
            <span class="logo-name">Plane Aviation</span>
          </div>
          <div class="f-selo"><span>[ Cirrus Authorized Partner ]</span></div>
          <p class="f-desc">Representante exclusiva Cirrus Aircraft no Brasil desde 2003.</p>
        </div>
        <div class="f-col">
          <h4>Navegação</h4>
          <nav>
            ${footerLinks.map((l) => `<a href="${l.href}">${l.label}</a>`).join("")}
            <a href="contato.html" class="last">Fale com um Consultor</a>
          </nav>
        </div>
        <div class="f-col f-contact">
          <h4>Contato</h4>
          <p>Hangar Plane Aviation</p>
          <p>Aeroporto de Jundiaí — SP</p>
          <p>contato@planeaviation.com.br</p>
          <p>+55 (11) 9999-0000</p>
        </div>
        <div class="f-col f-news">
          <h4>Newsletter</h4>
          <p>Assine e receba novidades sobre a Cirrus e o mercado de aviação.</p>
          <div class="f-news-row">
            <input type="email" placeholder="Seu e-mail">
            <button>Assinar</button>
          </div>
        </div>
      </div>
      <div class="f-bottom">
        <p>© 2026 Plane Aviation. Todos os direitos reservados. [ Wireframe — Não é a versão final ]</p>
        <select><option>Português</option><option>English</option><option>Español</option></select>
      </div>
    </div>
  </footer>`;

  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;

  /* ---------- Menu mobile ---------- */
  const toggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (toggle && mobileNav) {
    let open = false;
    const MENU = '<svg class="icon i-5" viewBox="0 0 24 24"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
    const CLOSE = '<svg class="icon i-5" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    toggle.addEventListener("click", () => {
      open = !open;
      mobileNav.classList.toggle("open", open);
      toggle.innerHTML = open ? CLOSE : MENU;
    });
  }
})();
