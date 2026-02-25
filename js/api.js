const API_BASE = "https://dearviewr.in/api";

async function getReels(limit = 5) {
  const res = await fetch(`${API_BASE}/reels?limit=${limit}`);
  return res.json();
}
