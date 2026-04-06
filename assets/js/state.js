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

function normalizeAuth(auth) {
  const email = typeof auth?.email === "string" ? auth.email : "";
  const role = typeof auth?.role === "string" ? auth.role : "guest";
  const explicitLoggedIn = auth?.loggedIn === true;
  const inferredLoggedIn = email.trim().length > 0 && role !== "guest";
  return {
    email,
    role,
    loggedIn: explicitLoggedIn || inferredLoggedIn
  };
}

export function getAuth() {
  const raw = readJSON(STORAGE_KEYS.auth, DEFAULTS.auth);
  return normalizeAuth(raw);
}

export function setAuth(auth) {
  writeJSON(STORAGE_KEYS.auth, normalizeAuth(auth));
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
