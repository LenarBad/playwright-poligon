import { setAuth } from "../state.js";

const form = document.querySelector("[data-testid='login-form']");
const emailInput = document.querySelector("[data-testid='login-email-input']");
const passwordInput = document.querySelector("[data-testid='login-password-input']");
const errorAlert = document.querySelector("[data-testid='login-error-alert']");
const successToast = document.querySelector("[data-testid='login-success-toast']");

const USER = {
  email: "student@example.com",
  password: "learning123",
  role: "student"
};

function showError(message) {
  errorAlert.textContent = message;
  errorAlert.hidden = false;
}

function clearMessages() {
  errorAlert.hidden = true;
  successToast.hidden = true;
  errorAlert.textContent = "";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessages();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !email.includes("@")) {
    showError("Введите корректный email.");
    return;
  }
  if (password.length < 6) {
    showError("Пароль должен быть не короче 6 символов.");
    return;
  }

  if (email !== USER.email || password !== USER.password) {
    showError("Неверный email или пароль.");
    return;
  }

  setAuth({ email: USER.email, role: USER.role, loggedIn: true });
  successToast.hidden = false;
  await new Promise((resolve) => setTimeout(resolve, 300));
  window.location.href = "./profile.html";
});
