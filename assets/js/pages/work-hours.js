const loadingNode = document.querySelector("[data-testid='work-hours-loading']");
const errorNode = document.querySelector("[data-testid='work-hours-error']");
const listNode = document.querySelector("[data-testid='work-hours-list']");

// Intentionally points to a non-existent backend for training fallback behavior.
const WORK_HOURS_API_URL = "https://api.playwright-poligon.local/v1/work-hours";

function renderHours(items) {
  listNode.innerHTML = "";
  items.forEach((item) => {
    const row = document.createElement("li");
    row.textContent = `${item.day}: ${item.start} - ${item.end}`;
    listNode.appendChild(row);
  });
  listNode.hidden = false;
}

async function loadWorkHours() {
  loadingNode.hidden = false;
  errorNode.hidden = true;
  listNode.hidden = true;

  try {
    const response = await fetch(WORK_HOURS_API_URL, {
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const payload = await response.json();
    const items = Array.isArray(payload?.workHours) ? payload.workHours : [];

    if (items.length === 0) {
      throw new Error("Backend returned empty payload");
    }

    renderHours(items);
  } catch (error) {
    console.warn("Failed to load work hours from backend:", error);
    errorNode.hidden = false;
  } finally {
    loadingNode.hidden = true;
  }
}

loadWorkHours();
