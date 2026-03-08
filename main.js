// API Base URL
const API_BASE = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
  loadCounts();

  document.getElementById('btnDisasters')?.addEventListener('click', () => {
    window.location.href = '/disasters.html';
  });
  document.getElementById('btnAnalytics')?.addEventListener('click', () => {
    window.location.href = '/analytics.html';
  });
  document.getElementById('btnSearch')?.addEventListener('click', () => {
    window.location.href = '/search.html';
  });
  document.getElementById('btnDashboard')?.addEventListener('click', () => {
    window.location.href = '/';
  });
});

async function loadCounts() {
  try {
    const response = await fetch(`${API_BASE}/analytics`);
    const data = await response.json();
    const stats = data.stats || {};

    animateCount('totalDisasters', stats.totalDisasters || 0);
    animateCount('countriesCount', stats.countriesCount || 0);
    animateCount('agenciesCount', 60);
    animateCount('totalDamage', stats.totalDamage || 0, true);
  } catch (error) {
    console.error('Error loading stats:', error);
    // Fallback to default values
    animateCount('totalDisasters', 120);
    animateCount('countriesCount', 45);
    animateCount('agenciesCount', 60);
    animateCount('totalDamage', 5200000000, true);
  }
}

function animateCount(id, target, isCurrency = false) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const duration = 1000;
  const stepTime = Math.abs(Math.floor(duration / target)) || 20;
  const counter = setInterval(() => {
    start += Math.ceil(target / (duration / stepTime));
    if (start >= target) {
      start = target;
      clearInterval(counter);
    }
    if (isCurrency) {
      el.textContent = '$' + (start / 1000000000).toFixed(1) + 'B';
    } else {
      el.textContent = start;
    }
  }, stepTime);
}
