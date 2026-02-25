const token = localStorage.getItem("access_token");

if (!token) {
  location.href = "/auth/login.html";
}

// 🔓 Logout
function logout() {
  localStorage.removeItem("access_token");
  location.href = "/";
}

// 🎬 Become Creator
function becomeCreator() {
  location.href = "/creator/login.html";
}
