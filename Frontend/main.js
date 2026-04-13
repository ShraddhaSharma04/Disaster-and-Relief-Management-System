const API_BASE = "http://localhost:3000/api";

// Check login on every page except login.html
const token = localStorage.getItem("token");
const currentPage = window.location.pathname.split("/").pop();

if (!token && currentPage !== "login.html") {
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

  document.getElementById("logoutBtn")?.addEventListener("click", logout);
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

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login.html";
}