fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email,
        password,
        name
    })
})
.then(() => window.location.href = "login.html");
