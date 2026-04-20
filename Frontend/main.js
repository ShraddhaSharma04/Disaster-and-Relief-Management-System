const API_BASE = "/api";

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const publicPages = ["login.html", "register.html", ""];

function hasToken() {
  return !!localStorage.getItem("token");
}

function protectPage() {
  const page = window.location.pathname.split("/").pop() || "";

  if (!hasToken() && !publicPages.includes(page)) {
    window.location.replace("/login.html");
    return;
  }

  if (hasToken() && (page === "login.html" || page === "register.html" || page === "")) {
    window.location.replace("/index.html");
  }
}

protectPage();

window.addEventListener("pageshow", () => {
  protectPage();
});

window.addEventListener("popstate", () => {
  protectPage();
});

document.addEventListener("DOMContentLoaded", () => {
  protectPage();

  loadCounts();

  document.getElementById("btnDisasters")?.addEventListener("click", () => {
    window.location.href = "/disasters.html";
  });

  document.getElementById("btnAnalytics")?.addEventListener("click", () => {
    window.location.href = "/analytics.html";
  });

  document.getElementById("btnSearch")?.addEventListener("click", () => {
    window.location.href = "/search.html";
  });

  document.getElementById("btnDashboard")?.addEventListener("click", () => {
    window.location.href = "/index.html";
  });

  document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });

  document.getElementById("logoutProfileBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });

  if (currentPage === "profile.html") {
    loadProfile();
    document.getElementById("changePasswordBtn")?.addEventListener("click", changePassword);
    document.getElementById("deleteAccountBtn")?.addEventListener("click", deleteAccount);
  }
});

async function loadCounts() {
  const totalDisastersEl = document.getElementById("totalDisasters");
  const countriesCountEl = document.getElementById("countriesCount");
  const agenciesCountEl = document.getElementById("agenciesCount");
  const totalDamageEl = document.getElementById("totalDamage");

  if (!totalDisastersEl && !countriesCountEl && !agenciesCountEl && !totalDamageEl) return;

  try {
    const response = await fetch(`${API_BASE}/analytics`, {
      headers: { "Cache-Control": "no-cache" }
    });
    const data = await response.json();
    const stats = data.stats || {};

    animateCount("totalDisasters", stats.totalDisasters || 0);
    animateCount("countriesCount", stats.countriesCount || 0);
    animateCount("agenciesCount", 60);
    animateCount("totalDamage", stats.totalDamage || 0, true);
  } catch (error) {
    console.error("Error loading stats:", error);
  }
}

function animateCount(id, target, isCurrency = false) {
  const el = document.getElementById(id);
  if (!el) return;

  let start = 0;
  const duration = 1000;
  const safeTarget = Number(target) || 0;
  const stepTime = safeTarget > 0 ? Math.max(Math.floor(duration / safeTarget), 20) : 20;

  const counter = setInterval(() => {
    start += Math.ceil(safeTarget / (duration / stepTime));

    if (start >= safeTarget) {
      start = safeTarget;
      clearInterval(counter);
    }

    el.textContent = isCurrency
      ? "$" + (start / 1000000000).toFixed(1) + "B"
      : start;
  }, stepTime);
}

function loadProfile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const nameInput = document.getElementById("profileName");
  const emailInput = document.getElementById("profileEmail");

  if (nameInput) nameInput.value = user.name || "";
  if (emailInput) emailInput.value = user.email || "";
}

async function changePassword() {
  const currentPassword = document.getElementById("currentPassword")?.value.trim();
  const newPassword = document.getElementById("newPassword")?.value.trim();
  const messageEl = document.getElementById("profileMessage");

  if (!messageEl) return;

  if (!currentPassword || !newPassword) {
    messageEl.textContent = "Please fill both password fields.";
    messageEl.style.color = "red";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });

    const data = await response.json();

    if (!response.ok) {
      messageEl.textContent = data.error || "Failed to change password.";
      messageEl.style.color = "red";
      return;
    }

    messageEl.textContent = data.message || "Password changed successfully.";
    messageEl.style.color = "green";

    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
  } catch (error) {
    messageEl.textContent = "Server error while changing password.";
    messageEl.style.color = "red";
  }
}

async function deleteAccount() {
  const messageEl = document.getElementById("profileMessage");
  if (!messageEl) return;

  const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.");
  if (!confirmed) return;

  try {
    const response = await fetch(`${API_BASE}/delete-account`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      messageEl.textContent = data.error || "Failed to delete account.";
      messageEl.style.color = "red";
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/register.html");
  } catch (error) {
    messageEl.textContent = "Server error while deleting account.";
    messageEl.style.color = "red";
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.clear();
  window.location.replace("/login.html");
}