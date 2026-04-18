const API_BASE = "/api";

const token = localStorage.getItem("token");
const currentPage = window.location.pathname.split("/").pop();

if (!token && currentPage !== "login.html" && currentPage !== "register.html") {
  window.location.href = "/login.html";
}

document.addEventListener("DOMContentLoaded", () => {
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

  document.getElementById("logoutProfileBtn")?.addEventListener("click", logout);

  if (currentPage === "profile.html") {
    loadProfile();
    document.getElementById("changePasswordBtn")?.addEventListener("click", changePassword);
    document.getElementById("deleteAccountBtn")?.addEventListener("click", deleteAccount);
  }
});

async function loadCounts() {
  try {
    const response = await fetch(`${API_BASE}/analytics`);
    const data = await response.json();
    const stats = data.stats || {};

    animateCount("totalDisasters", stats.totalDisasters || 0);
    animateCount("countriesCount", stats.countriesCount || 0);
    animateCount("agenciesCount", 60);
    animateCount("totalDamage", stats.totalDamage || 0, true);
  } catch (error) {
    console.error("Error loading stats:", error);

    animateCount("totalDisasters", 120);
    animateCount("countriesCount", 45);
    animateCount("agenciesCount", 60);
    animateCount("totalDamage", 5200000000, true);
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

    if (isCurrency) {
      el.textContent = "$" + (start / 1000000000).toFixed(1) + "B";
    } else {
      el.textContent = start;
    }
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
  const currentPassword = document.getElementById("currentPassword").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const messageEl = document.getElementById("profileMessage");

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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
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
    console.error("Change password error:", error);
    messageEl.textContent = "Server error while changing password.";
    messageEl.style.color = "red";
  }
}

async function deleteAccount() {
  const messageEl = document.getElementById("profileMessage");
  const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.");

  if (!confirmed) return;

  try {
    const response = await fetch(`${API_BASE}/delete-account`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      messageEl.textContent = data.error || "Failed to delete account.";
      messageEl.style.color = "red";
      return;
    }

    alert(data.message || "Account deleted successfully.");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/register.html";
  } catch (error) {
    console.error("Delete account error:", error);
    messageEl.textContent = "Server error while deleting account.";
    messageEl.style.color = "red";
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login.html";
}