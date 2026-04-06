import { ensureSeedState, getAuth, getCartCount, resetState } from "./state.js";

function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.getAttribute("href") === path) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function renderHeaderState() {
  const cartBadge = document.querySelector("[data-testid='cart-count-badge']");
  if (cartBadge) {
    cartBadge.textContent = String(getCartCount());
  }

  const authBadge = document.querySelector("[data-testid='auth-status-badge']");
  if (authBadge) {
    const auth = getAuth();
    authBadge.textContent = auth.loggedIn ? `Logged in: ${auth.email}` : "Guest";
  }
}

function bindResetButton() {
  const resetBtn = document.querySelector("[data-testid='reset-state-btn']");
  if (!resetBtn) return;
  resetBtn.addEventListener("click", () => {
    resetState();
    renderHeaderState();
    window.location.reload();
  });
}

ensureSeedState();
setActiveNav();
renderHeaderState();
bindResetButton();
