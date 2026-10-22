(() => {
  const CDN = "https://cdn.jsdelivr.net/gh/qjy0126/kakobuysheetlink@main/";
  const AFF = "9v88f";

  const money = (n) =>
    Number(n || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const imgUrl = (path) => {
    const clean = String(path || "").replace(/^\.\//, "").replace(/^\//, "");
    if (/^https?:\/\//i.test(clean)) return clean;
    return CDN + clean;
  };

  const buyUrl = (sourceUrl) => {
    const raw = String(sourceUrl || "");
    const id = (raw.match(/itemID=(\d+)/i) || [])[1];
    if (id) {
      return `https://www.kakobuy.com/item/details?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D${id}&affcode=${AFF}`;
    }
    return `https://www.kakobuy.com/item/details?url=${encodeURIComponent(raw)}&affcode=${AFF}`;
  };

  // Site root that works under Live Server parent folder and /shoes or /finds subpaths
  const siteBase = () => {
    if (typeof window.SITE_BASE === "string" && window.SITE_BASE) {
      return window.SITE_BASE.endsWith("/") ? window.SITE_BASE : window.SITE_BASE + "/";
    }
    const path = location.pathname || "/";
    // /.../shoes/ or /.../finds/ → parent
    const sub = path.match(/^(.*\/)(shoes|finds)\/?/i);
    if (sub) return sub[1];
    // /.../item.html or /.../guide.html → directory
    if (/\.[a-z0-9]+$/i.test(path)) {
      return path.replace(/\/[^/]+$/, "/");
    }
    return path.endsWith("/") ? path : path.replace(/\/[^/]+$/, "/") || "/";
  };

  const itemPath = (id) =>
    `${siteBase()}item.html?id=${encodeURIComponent(id)}`;

  const escapeHtml = (s) =>
    String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const cardHtml = (p) => {
    const detail = itemPath(p.id);
    const buy = buyUrl(p.sourceUrl);
    const badge = p.trending
      ? `<span class="shop-badge"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5 14.7 9h6.8l-5.5 4.1 2.1 6.7L12 15.9 5.9 19.8l2.1-6.7L2.5 9h6.8L12 2.5Z"/></svg>Trending</span>`
      : "";
    return `
      <article class="shop-card">
        <a class="shop-media" href="${detail}">
          ${badge}
          <img src="${imgUrl(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy" decoding="async" />
        </a>
        <div class="shop-body">
          <h2 class="shop-title"><a href="${detail}">${escapeHtml(p.title)}</a></h2>
          <p class="shop-price"><b>¥${money(p.cny)}</b> <span>≈ $${money(p.usd)}</span></p>
          <a class="shop-buy" href="${buy}" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 5h1.8l1.3 10.2a1.8 1.8 0 0 0 1.8 1.5h8.7a1.8 1.8 0 0 0 1.8-1.5L20 8.2H7.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="19.2" r="1.2" fill="currentColor"/><circle cx="17" cy="19.2" r="1.2" fill="currentColor"/></svg>
            Buy Link
          </a>
        </div>
      </article>`;
  };

  window.KS = { CDN, AFF, money, imgUrl, buyUrl, itemPath, siteBase, escapeHtml, cardHtml };
})();
