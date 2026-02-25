const token = localStorage.getItem("admin_token");
if (!token) location.href = "/admin/login.html";

const table = document.getElementById("adminTable");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.onclick = () => {
  localStorage.removeItem("admin_token");
  location.href = "/admin/login.html";
};

async function loadAdmins() {
  const res = await fetch("/api/admin/users/", {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  if (!res.ok) {
    table.innerHTML = "<tr><td colspan='3'>Access denied</td></tr>";
    return;
  }

  const users = await res.json();
  table.innerHTML = "";

  users.forEach(u => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${u.email}</td>
      <td>
        <select class="role-select" data-id="${u.id}">
          <option value="admin" ${u.role === "admin" ? "selected" : ""}>Admin</option>
          <option value="assistant_super_admin" ${u.role === "assistant_super_admin" ? "selected" : ""}>
            Assistant Super Admin
          </option>
        </select>
      </td>
      <td>
        <button class="btn danger small" data-del="${u.id}">Delete</button>
      </td>
    `;

    table.appendChild(tr);
  });

  bindActions();
}

function bindActions() {
  document.querySelectorAll(".role-select").forEach(sel => {
    sel.onchange = async () => {
      const userId = sel.dataset.id;
      const role = sel.value;

      await fetch(`/api/admin/users/${userId}/role?new_role=${role}`, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + token
        }
      });

      alert("Role updated");
    };
  });

  document.querySelectorAll("[data-del]").forEach(btn => {
    btn.onclick = async () => {
      if (!confirm("Delete this admin?")) return;

      const id = btn.dataset.del;
      await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token
        }
      });

      loadAdmins();
    };
  });
}

loadAdmins();

const addBtn = document.getElementById("addAdminBtn");
const msg = document.getElementById("addMsg");

addBtn.onclick = async () => {
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;
  const role = document.getElementById("newRole").value;

  if (!email || !password) {
    msg.innerText = "Email & password required";
    return;
  }

  const res = await fetch("/api/admin/users/create", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password, role })
  });

  const data = await res.json();

  if (!res.ok) {
    msg.innerText = data.detail || "Failed";
    return;
  }

  msg.innerText = "✅ Admin added successfully";
  document.getElementById("newEmail").value = "";
  document.getElementById("newPassword").value = "";

  loadAdmins(); // refresh table
};
