document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.innerText = "";

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      error.innerText = data.detail || "Login failed";
      return;
    }

    // ✅ SAVE TOKEN CORRECTLY
    localStorage.setItem("admin_token", data.access_token);
    localStorage.setItem("admin_role", data.role);

    // ✅ GO TO DASHBOARD
    window.location.href = "/admin/dashboard.html";

  } catch (err) {
    error.innerText = "Server / Network error";
  }
});
