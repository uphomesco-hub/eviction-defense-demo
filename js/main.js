(function () {
  const routes = [
    { name: "cal", className: "view-cal" },
    { name: "pinterest", className: "view-pinterest" },
    { name: "superhuman", className: "view-superhuman" },
  ];
  const routeClasses = ["view-selector", ...routes.map((route) => route.className)];
  const themeKey = "eviction-demo-theme-v2";

  function routeFromHash() {
    const hash = window.location.hash.replace("#", "");
    if (hash === "selector") return "view-selector";
    const match = routes.find((route) => hash.startsWith(route.name));
    return match ? match.className : "view-cal";
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
    document.body.classList.remove(...routeClasses);
    document.body.classList.add(routeFromHash());
    closeMenus();
  }

  function setTheme(theme) {
    const isDark = theme !== "light";
    document.body.classList.toggle("theme-dark", isDark);
    document.body.classList.toggle("theme-light", !isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(isDark));
      const label = button.querySelector("[data-theme-label]");
      if (label) label.textContent = isDark ? "Dark on" : "Dark off";
    });
    window.localStorage.setItem(themeKey, isDark ? "dark" : "light");
  }

  function initialTheme() {
    return window.localStorage.getItem(themeKey) || "light";
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

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      setTheme(document.body.classList.contains("theme-dark") ? "light" : "dark");
    });
  });

  window.addEventListener("hashchange", updateView);
  setTheme(initialTheme());
  updateView();
})();
