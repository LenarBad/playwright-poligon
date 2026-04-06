import { getAuth, getCartCount, setAuth } from "./state.js";

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
  const auth = getAuth();

  const cartBadge = document.querySelector("[data-testid='cart-count-badge']");
  if (cartBadge) {
    cartBadge.textContent = String(getCartCount());
  }

  const authBadge = document.querySelector("[data-testid='auth-status-badge']");
  if (authBadge) {
    authBadge.textContent = auth.loggedIn ? `Logged in: ${auth.email}` : "Guest";

    let headerAvatar = document.querySelector("[data-testid='header-avatar']");
    if (!headerAvatar) {
      headerAvatar = document.createElement("img");
      headerAvatar.setAttribute("data-testid", "header-avatar");
      headerAvatar.className = "header-avatar";
      headerAvatar.alt = "User avatar";
      headerAvatar.src = "./assets/images/profile_picture.png";
      authBadge.insertAdjacentElement("beforebegin", headerAvatar);
    }
    headerAvatar.hidden = !auth.loggedIn;
  }

  const authNav = document.querySelector("[data-nav-auth]");
  if (authNav) {
    if (auth.loggedIn) {
      authNav.textContent = "Logout";
      authNav.setAttribute("href", "#");
      authNav.onclick = (e) => {
        e.preventDefault();
        setAuth({ email: "", role: "guest", loggedIn: false });
        window.location.href = "index.html";
      };
    } else {
      authNav.textContent = "Login";
      authNav.setAttribute("href", "login.html");
      authNav.onclick = null;
    }
  }
}

setActiveNav();
renderHeaderState();
