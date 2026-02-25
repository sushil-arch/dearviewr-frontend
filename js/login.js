fetch(`${API_BASE}/api/auth/login`, {
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
    localStorage.setItem("token", data.access_token);
    window.location.href = "index.html";
});
