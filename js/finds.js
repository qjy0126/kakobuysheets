(() => {
  const grid = document.getElementById("shop-grid");
  const count = document.getElementById("shop-count");
  const filters = document.getElementById("shop-filters");
  const items = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  const params = new URLSearchParams(location.search);
  const initialQ = String(params.get("q") || "").trim();

  if (!grid || !window.KS) return;

  const labels = {
    all: "All",
    shoes: "Shoes",
    "t-shirts": "T-Shirts",
    hoodies: "Hoodies",
    jackets: "Jackets",
    pants: "Pants/Shorts",
    headwear: "Headwear",
    sets: "Sets",
    underwear: "Underpants",
    jersey: "Jersey",
    accessories: "Accessories",
    other: "Other",
    glasses: "Glasses",
    watches: "Watches",
    perfume: "Perfume",
    bricks: "Bricks",
  };

  const order = [
    "all",
    "shoes",
    "t-shirts",
    "hoodies",
    "jackets",
    "pants",
    "headwear",
    "sets",
    "underwear",
    "jersey",
    "accessories",
    "glasses",
    "watches",
    "perfume",
    "bricks",
    "other",
  ];
  const present = new Set(items.map((p) => p.category).filter(Boolean));
  const cats = order.filter((c) => c === "all" || present.has(c));
  let active = "all";
  let query = initialQ.toLowerCase();
  let queryLabel = initialQ;

  document.querySelectorAll(".nav-search input[name='q']").forEach((input) => {
    if (initialQ) input.value = initialQ;
  });

  const matchQuery = (p) => {
    if (!query) return true;
    const hay = `${p.title || ""} ${p.category || ""} ${p.id || ""}`.toLowerCase();
    return query.split(/\s+/).filter(Boolean).every((part) => hay.includes(part));
  };

  const render = () => {
    let list = active === "all" ? items : items.filter((p) => p.category === active);
    list = list.filter(matchQuery);

    if (count) {
      if (query) {
        const scope = active === "all" ? "all categories" : labels[active] || active;
        count.textContent = `Showing ${list.length} results for “${queryLabel}” in ${scope}`;
      } else if (active === "all") {
        count.textContent = `Showing ${list.length} finds across all categories`;
      } else {
        count.textContent = `Showing ${list.length} ${labels[active] || active} finds`;
      }
    }

    grid.innerHTML = list.length
      ? list.map(KS.cardHtml).join("")
      : `<p class="shop-empty">No finds matched your search.</p>`;

    if (filters) {
      filters.querySelectorAll("button").forEach((btn) => {
        btn.classList.toggle("is-on", btn.dataset.cat === active);
      });
    }
  };

  if (filters) {
    filters.innerHTML = cats
      .map(
        (cat) =>
          `<button type="button" data-cat="${cat}">${KS.escapeHtml(labels[cat] || cat)}</button>`
      )
      .join("");
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-cat]");
      if (!btn) return;
      active = btn.dataset.cat;
      render();
    });
  }

  if (!items.length) {
    if (count) count.textContent = "No finds yet.";
    return;
  }

  render();
})();
