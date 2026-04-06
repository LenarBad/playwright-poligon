import { getAuth, setAuth } from "../state.js";

const requiredBanner = document.querySelector("[data-testid='auth-required-banner']");
const profileCard = document.querySelector("[data-testid='profile-card']");
const profileEmail = document.querySelector("[data-testid='profile-email']");
const profileRole = document.querySelector("[data-testid='profile-role']");
const logoutBtn = document.querySelector("[data-testid='logout-btn']");

function render() {
  const auth = getAuth();
  if (!auth.loggedIn) {
    requiredBanner.hidden = false;
    profileCard.hidden = true;
    return;
  }
  requiredBanner.hidden = true;
  profileCard.hidden = false;
  profileEmail.textContent = auth.email;
  profileRole.textContent = auth.role;
}

logoutBtn.addEventListener("click", () => {
  setAuth({ email: "", role: "guest", loggedIn: false });
  window.location.href = "index.html";
});

render();
