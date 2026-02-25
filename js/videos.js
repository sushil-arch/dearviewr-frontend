fetch(`${API}/reels?limit=50`)
  .then(r => r.json())
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
  });
