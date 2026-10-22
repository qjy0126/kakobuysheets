(() => {
  const grid = document.getElementById("shop-grid");
  const count = document.getElementById("shop-count");
  const items = Array.isArray(window.SHOES) ? window.SHOES : [];

  if (!grid || !window.KS) return;

  if (!items.length) {
    if (count) count.textContent = "No shoe finds yet.";
    return;
  }

  if (count) count.textContent = `Showing ${items.length} shoe finds`;
  grid.innerHTML = items.map(KS.cardHtml).join("");
})();
