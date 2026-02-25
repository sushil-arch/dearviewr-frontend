const token = localStorage.getItem("admin_token");
if (!token) location.href = "/admin/login.html";

// TEMP ROLE CHECK (replace with API later)
const role = localStorage.getItem("admin_role");
if (role !== "super_admin") {
  alert("Access denied");
  location.href = "/admin/dashboard.html";
}

function logout() {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_role");
  location.href = "/admin/login.html";
}

// MOCK DATA (replace with API)
document.getElementById("users").innerText = 128;
document.getElementById("creators").innerText = 24;
document.getElementById("videos").innerText = 356;
document.getElementById("jobs").innerText = 3;
