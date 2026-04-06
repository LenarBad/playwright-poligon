const STORAGE_KEYS = {
  auth: "ta_auth",
  cart: "ta_cart",
  ui: "ta_ui"
};

const DEFAULTS = {
  auth: { email: "", role: "guest", loggedIn: false },
  cart: [],
  ui: { query: "", category: "all", sort: "relevance", inStockOnly: false }
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getAuth() {
  return readJSON(STORAGE_KEYS.auth, DEFAULTS.auth);
}

export function setAuth(auth) {
  writeJSON(STORAGE_KEYS.auth, auth);
}

export function getCart() {
  return readJSON(STORAGE_KEYS.cart, DEFAULTS.cart);
}

export function setCart(cartItems) {
  writeJSON(STORAGE_KEYS.cart, cartItems);
}

export function getUIState() {
  return readJSON(STORAGE_KEYS.ui, DEFAULTS.ui);
}

export function setUIState(uiState) {
  writeJSON(STORAGE_KEYS.ui, uiState);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

window.__TA_VERSION__ = "1.0.0";
