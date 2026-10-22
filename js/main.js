(() => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const findsBase = (() => {
    const path = location.pathname || "/";
    if (/\/(finds|shoes)(\/|$)/i.test(path)) return "/finds/";
    if (/\/kakobuysheets\.me\//i.test(path)) return "finds/";
    return "/finds/";
  })();

  const popular = [
    "Jordan 4",
    "Nike",
    "Amiri",
    "Balenciaga",
    "Chrome Hearts",
    "Moncler",
    "Stone Island",
    "LV",
    "Dior",
    "Yeezy",
  ];

  const categories = [
    { slug: "shoes", label: "Shoes" },
    { slug: "t-shirts", label: "T-Shirts" },
    { slug: "hoodies", label: "Hoodies" },
    { slug: "jackets", label: "Jackets" },
    { slug: "pants", label: "Pants/Shorts" },
    { slug: "accessories", label: "Accessories" },
    { slug: "watches", label: "Watches" },
    { slug: "jersey", label: "Jersey" },
  ];

  const ensureModal = () => {
    let modal = document.getElementById("search-modal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "search-modal";
    modal.className = "search-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="search-modal-backdrop" data-close="1"></div>
      <div class="search-modal-panel" role="dialog" aria-modal="true" aria-label="Search finds">
        <form class="search-modal-form" action="${findsBase}" method="get">
          <label class="search-modal-field">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.8"/><path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            <input type="search" name="q" id="search-modal-input" placeholder="Search reps, brands, items…" autocomplete="off" />
            <button type="button" class="search-esc" data-close="1" aria-label="Close search">Esc</button>
          </label>
        </form>
        <div class="search-modal-section">
          <p class="search-modal-label">Popular</p>
          <div class="search-popular">
            ${popular
              .map(
                (term) =>
                  `<a href="${findsBase}?q=${encodeURIComponent(term)}">${term}</a>`
              )
              .join("")}
          </div>
        </div>
        <div class="search-modal-section">
          <p class="search-modal-label">Categories</p>
          <div class="search-cats">
            ${categories
              .map(
                (c) =>
                  `<a href="${findsBase}?q=${encodeURIComponent(c.label)}" data-cat="${c.slug}">
                    <span class="search-cat-ico" aria-hidden="true"></span>
                    <span>${c.label}</span>
                  </a>`
              )
              .join("")}
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    return modal;
  };

  const openSearch = (seed = "") => {
    const modal = ensureModal();
    const input = modal.querySelector("#search-modal-input");
    modal.hidden = false;
    document.body.classList.add("search-open");
    if (input) {
      input.value = seed || "";
      requestAnimationFrame(() => input.focus());
    }
  };

  const closeSearch = () => {
    const modal = document.getElementById("search-modal");
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("search-open");
  };

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) {
      closeSearch();
      return;
    }
    const trigger = e.target.closest(".nav-search, [data-open-search]");
    if (!trigger) return;
    e.preventDefault();
    const seed = trigger.querySelector("input")?.value || "";
    if (nav) {
      nav.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    }
    openSearch(seed);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearch();
    }
  });

  // Convert existing search forms into open triggers (keep look, stop native submit)
  document.querySelectorAll("form.nav-search").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      openSearch(form.querySelector("input")?.value || "");
    });
  });
})();
