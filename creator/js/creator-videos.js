const token = localStorage.getItem("access_token");

if (!token) {
  location.href = "/creator/login.html";
}

fetch("/api/creator/videos", {
  headers: {
    Authorization: "Bearer " + token
  }
})
.then(res => res.json())
.then(data => {
  const list = document.getElementById("list");

  // Empty state
  if (!data.videos || data.videos.length === 0) {
    list.innerHTML = `
      <p style="padding:16px;opacity:.6">
        No videos uploaded yet
      </p>
    `;
    return;
  }

  data.videos.forEach(v => {
    const div = document.createElement("div");
    div.className = "video";

    let statusColor = "processing";
    if (v.status === "ready") statusColor = "ready";
    if (v.status === "failed") statusColor = "failed";

    div.innerHTML = `
      <div class="title">${v.title}</div>

      <div class="meta">
        ${new Date(v.created_at).toLocaleString()}
        • ${v.play_source.toUpperCase()}
      </div>

      <div class="status ${statusColor}">
        ${v.status.toUpperCase()}
      </div>
    `;

    // ▶️ Click to play (optional but powerful)
    div.onclick = () => {
      window.location.href = `/player.html?id=${v.id}`;
    };

    list.appendChild(div);
  });
})
.catch(err => {
  document.getElementById("list").innerHTML =
    "<p style='padding:16px;color:red'>Failed to load videos</p>";
});
