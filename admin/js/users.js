const token = localStorage.getItem("admin_token");
if (!token) location.href = "/admin/login.html";

fetch(`${API}/admin/users`, {
  headers: {
    "Authorization": "Bearer " + token
  }
})
.then(res => res.json())
.then(users => {
  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = "";

  users.forEach(u => {
    tbody.innerHTML += `
      <tr>
        <td>${u.email}</td>
        <td>
          <select onchange="changeRole('${u.id}', this.value)">
            <option ${u.role==="viewer"?"selected":""}>viewer</option>
            <option ${u.role==="creator"?"selected":""}>creator</option>
            <option ${u.role==="admin"?"selected":""}>admin</option>
            <option ${u.role==="super_admin"?"selected":""}>super_admin</option>
          </select>
        </td>
        <td>
          <button class="btn danger">Suspend</button>
        </td>
      </tr>
    `;
  });
});

function changeRole(userId, role) {
  fetch(`${API}/admin/users/${userId}/role?role=${role}`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  .then(() => alert("Role updated"));
}
