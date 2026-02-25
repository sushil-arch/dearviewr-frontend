async function login() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.detail || "Login failed");
    return;
  }

  localStorage.setItem("access_token", data.access_token);
  location.href = "/";
}

async function signup() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      role: "viewer"
    })
  });

  if (!res.ok) {
    const data = await res.json();
    alert(data.detail || "Signup failed");
    return;
  }

  location.href = "/auth/login.html";
}
