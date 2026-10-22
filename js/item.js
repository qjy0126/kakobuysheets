(() => {
  const page = document.getElementById("item-page");
  const related = document.getElementById("related-grid");
  const shoes = Array.isArray(window.SHOES) ? window.SHOES : [];
  const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  const items = [...products, ...shoes.filter((s) => !products.some((p) => p.id === s.id))];
  const id = new URLSearchParams(location.search).get("id");
  const item = items.find((p) => p.id === id);
  const base = KS.siteBase ? KS.siteBase() : "/";
  const catLabels = {
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
    other: "Other Stuff",
  };

  if (!page) return;

  if (!item) {
    page.innerHTML = `
      <p class="shop-crumb"><a href="${base}">Home</a> / <a href="${base}finds/">All Products</a> / <span>Not found</span></p>
      <h1>Product not found</h1>
      <p class="item-lede">This find is missing or outdated. Browse all products instead.</p>
      <p><a class="btn btn-solid" href="${base}finds/">Back to All Products</a></p>`;
    return;
  }

  const buy = KS.buyUrl(item.sourceUrl);
  const img = KS.imgUrl(item.image);
  const cat = item.category || "shoes";
  const catLabel = catLabels[cat] || "Finds";
  const catHref = cat === "shoes" ? `${base}shoes/` : `${base}finds/`;
  document.title = `${item.title} | Kakobuysheets`;
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = `https://kakobuysheets.me/item.html?id=${encodeURIComponent(item.id)}`;

  page.innerHTML = `
    <p class="shop-crumb">
      <a href="${base}">Home</a> / <a href="${base}finds/">All Products</a> / <a href="${catHref}">${KS.escapeHtml(catLabel)}</a> / <span>${KS.escapeHtml(item.title)}</span>
    </p>
    <div class="item-layout">
      <div class="item-gallery">
        ${item.trending ? `<span class="shop-badge"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5 14.7 9h6.8l-5.5 4.1 2.1 6.7L12 15.9 5.9 19.8l2.1-6.7L2.5 9h6.8L12 2.5Z"/></svg>Trending</span>` : ""}
        <img src="${img}" alt="${KS.escapeHtml(item.title)}" id="item-main" />
      </div>
      <aside class="item-info">
        <div class="item-tags">
          <span class="tag">${KS.escapeHtml(catLabel)}</span>
          <span class="tag">Weidian</span>
          <span class="tag tag-qc">QC ready</span>
          ${item.trending ? `<span class="tag tag-hot">Hot</span>` : ""}
        </div>
        <h1>${KS.escapeHtml(item.title)}</h1>
        <p class="item-lede">Spreadsheet find with live Kakobuy checkout. Confirm seller details, sizing, and warehouse QC before shipping.</p>
        <div class="item-price-row">
          <p class="shop-price"><b>¥${KS.money(item.cny)}</b> <span>≈ $${KS.money(item.usd)}</span></p>
        </div>
        <div class="item-actions">
          <a class="shop-buy item-buy" href="${buy}" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 5h1.8l1.3 10.2a1.8 1.8 0 0 0 1.8 1.5h8.7a1.8 1.8 0 0 0 1.8-1.5L20 8.2H7.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="19.2" r="1.2" fill="currentColor"/><circle cx="17" cy="19.2" r="1.2" fill="currentColor"/></svg>
            Buy Link
          </a>
          <a class="btn btn-ghost" href="${base}finds/">All Products</a>
        </div>
      </aside>
    </div>`;

  if (related) {
    const others = items
      .filter((p) => p.id !== item.id && (!item.category || p.category === item.category))
      .slice(0, 4);
    const fallback = others.length ? others : items.filter((p) => p.id !== item.id).slice(0, 4);
    related.innerHTML = fallback.map(KS.cardHtml).join("");
  }
})();
