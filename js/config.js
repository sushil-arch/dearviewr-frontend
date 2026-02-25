// ===============================
// DearViewr Frontend Config
// ===============================
// ================= CONFIG =================
const API_BASE = "https://dearviewr.in/api";

// ================= SHORTS API =================
async function getReels(limit = 10) {
    const res = await fetch(`${API_BASE}/api/shorts?limit=${limit}`);
    return await res.json();
}

// 🌐 API Base URL (Backend)
const API_BASE_URL = "https://dearviewr.in/api";

// 🎥 HLS Streaming Base URL
const HLS_BASE_URL = "https://dearviewr.in/hls";

// 🔐 LocalStorage Keys
const STORAGE_KEYS = {
    USER_ID: "dearviewr_user_id",
    TOKEN: "dearviewr_token" // future use (JWT)
};

// ===============================
// Helper Functions
// ===============================

// Get logged in user id
function getUserId() {
    return localStorage.getItem(STORAGE_KEYS.USER_ID);
}

// Save user id
function setUserId(userId) {
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
}

// Logout
function logout() {
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    window.location.href = "/login.html";
}

// Check login
function isLoggedIn() {
    return !!getUserId();
}

// Redirect if not logged in
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = "/login.html";
    }
}

// ===============================
// Fetch Wrapper
// ===============================
async function apiRequest(path, method = "GET", body = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, options);
    return response.json();
}
