document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.access_token) {
        // ✅ Save token
        localStorage.setItem("admin_token", data.access_token);
        localStorage.setItem("admin_role", data.role);

        // ✅ Redirect
        window.location.href = "/admin/dashboard.html";
      } else {
        document.getElementById("error").innerText = "Invalid login";
      }
    })
    .catch(() => {
      document.getElementById("error").innerText = "Invalid email or password";
    });
});
