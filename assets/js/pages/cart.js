import { getCart, setCart } from "../state.js";

const cartList = document.querySelector("[data-testid='cart-list']");
const totalNode = document.querySelector("[data-testid='cart-total']");
const emptyState = document.querySelector("[data-testid='cart-empty-state']");
const checkoutBtn = document.querySelector("[data-testid='checkout-btn']");

const catalog = await fetch("./assets/data/products.json").then((r) => r.json());

function cartViewRows() {
  return getCart()
    .map((item) => {
      const product = catalog.find((p) => p.id === item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean);
}

function setQty(productId, qty) {
  const cart = getCart().map((item) =>
    item.productId === productId ? { ...item, qty: Math.max(1, qty) } : item
  );
  setCart(cart);
  render();
}

function removeItem(productId) {
  const cart = getCart().filter((x) => x.productId !== productId);
  setCart(cart);
  render();
}

function render() {
  const rows = cartViewRows();
  cartList.innerHTML = "";
  emptyState.hidden = rows.length > 0;
  checkoutBtn.disabled = rows.length === 0;

  let total = 0;
  rows.forEach(({ productId, qty, product }) => {
    const line = qty * product.price;
    total += line;
    const row = document.createElement("li");
    row.className = "cart-row";
    row.setAttribute("data-testid", `cart-item-${productId}`);
    row.innerHTML = `
      <div>
        <strong>${product.name}</strong>
        <p>${product.price.toLocaleString("ru-RU")} ₽</p>
      </div>
      <div>
        <label>
          Qty
          <input
            type="number"
            min="1"
            value="${qty}"
            data-testid="cart-item-qty-${productId}"
          />
        </label>
        <button type="button" data-testid="cart-item-remove-${productId}">Remove</button>
      </div>
    `;
    row
      .querySelector(`[data-testid='cart-item-qty-${productId}']`)
      .addEventListener("change", (e) => setQty(productId, Number(e.target.value || 1)));
    row
      .querySelector(`[data-testid='cart-item-remove-${productId}']`)
      .addEventListener("click", () => removeItem(productId));
    cartList.appendChild(row);
  });

  totalNode.textContent = `${total.toLocaleString("ru-RU")} ₽`;
  const badge = document.querySelector("[data-testid='cart-count-badge']");
  if (badge) badge.textContent = String(getCart().reduce((sum, item) => sum + item.qty, 0));
}

checkoutBtn.addEventListener("click", () => {
  alert("Checkout is simulated in this training app.");
});

render();
