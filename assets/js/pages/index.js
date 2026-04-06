import { getCart, getUIState, setCart, setUIState } from "../state.js";

const productsRoot = document.querySelector("[data-testid='products-grid']");
const spinner = document.querySelector("[data-testid='loading-spinner']");
const emptyState = document.querySelector("[data-testid='empty-state']");
const searchInput = document.querySelector("[data-testid='search-input']");
const categorySelect = document.querySelector("[data-testid='category-select']");
const sortSelect = document.querySelector("[data-testid='sort-select']");
const stockCheckbox = document.querySelector("[data-testid='in-stock-checkbox']");
const applyBtn = document.querySelector("[data-testid='apply-filters-btn']");

let products = [];

function money(value) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

function loadUIFilters() {
  const ui = getUIState();
  searchInput.value = ui.query;
  categorySelect.value = ui.category;
  sortSelect.value = ui.sort;
  stockCheckbox.checked = ui.inStockOnly;
}

function saveUIFilters() {
  setUIState({
    query: searchInput.value.trim(),
    category: categorySelect.value,
    sort: sortSelect.value,
    inStockOnly: stockCheckbox.checked
  });
}

function applyFilters(source) {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const sort = sortSelect.value;
  const inStockOnly = stockCheckbox.checked;

  let list = source.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(query);
    const matchesCategory = category === "all" || item.category === category;
    const matchesStock = !inStockOnly || item.inStock;
    return matchesQuery && matchesCategory && matchesStock;
  });

  if (sort === "price_asc") list = list.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") list = list.sort((a, b) => b.price - a.price);
  if (sort === "name_asc") list = list.sort((a, b) => a.name.localeCompare(b.name));

  return list;
}

function addToCart(productId) {
  const cart = getCart();
  const existing = cart.find((x) => x.productId === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ productId, qty: 1 });
  }
  setCart(cart);
  const badge = document.querySelector("[data-testid='cart-count-badge']");
  if (badge) badge.textContent = String(cart.reduce((s, x) => s + x.qty, 0));
}

function render(list) {
  productsRoot.innerHTML = "";
  emptyState.hidden = list.length > 0;
  list.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("data-testid", `product-card-${item.id}`);
    card.innerHTML = `
      <h3 data-testid="product-name-${item.id}">${item.name}</h3>
      <p>${item.category}</p>
      <p data-testid="product-price-${item.id}">${money(item.price)}</p>
      <p>${item.inStock ? "In stock" : "Out of stock"}</p>
      <button type="button" data-testid="add-to-cart-${item.id}" ${item.inStock ? "" : "disabled"}>
        Add to cart
      </button>
    `;
    const button = card.querySelector(`[data-testid="add-to-cart-${item.id}"]`);
    button.addEventListener("click", () => addToCart(item.id));
    productsRoot.appendChild(card);
  });
}

async function loadProducts() {
  spinner.hidden = false;
  const response = await fetch("./assets/data/products.json");
  const data = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 400));
  spinner.hidden = true;
  products = data;
  render(applyFilters(products));
}

applyBtn.addEventListener("click", () => {
  saveUIFilters();
  render(applyFilters(products));
});

loadUIFilters();
loadProducts();
