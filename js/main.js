(function () {
  const routes = [
    { name: "pinterest", className: "view-pinterest" },
    { name: "superhuman", className: "view-superhuman" },
  ];

  function routeFromHash() {
    const hash = window.location.hash.replace("#", "");
    const match = routes.find((route) => hash.startsWith(route.name));
    return match ? match.className : "view-selector";
  }

  function closeMenus() {
    document.querySelectorAll(".nav-links.is-open").forEach((menu) => {
      menu.classList.remove("is-open");
    });
    document.querySelectorAll("[data-menu-toggle]").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  }

  function updateView() {
    document.body.classList.remove("view-selector", "view-pinterest", "view-superhuman");
    document.body.classList.add(routeFromHash());
    closeMenus();
  }

  document.querySelectorAll("[data-menu-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const menu = document.getElementById(button.dataset.menuToggle);
      if (!menu) return;
      const isOpen = menu.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenus);
  });

  window.addEventListener("hashchange", updateView);
  updateView();
})();
