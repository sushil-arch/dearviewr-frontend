const token = localStorage.getItem("admin_token");
if (!token) {
  window.location.href = "/admin/login.html";
}

fetch(`${API}/reels?limit=50`, {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => {
    let html = "";
    data.forEach(v => {
      html += `
        <div class="card mb-2 p-2">
          <strong>${v.title}</strong><br>
          Views: ${v.views || 0}
        </div>`;
    });
    document.getElementById("videos").innerHTML = html;
  })
  .catch(err => {
    console.error(err);
    alert("Failed to load videos");
  });
