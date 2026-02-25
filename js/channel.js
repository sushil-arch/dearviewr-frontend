const API_BASE = "https://dearviewr.in/api";

// get channel id from URL
const params = new URLSearchParams(window.location.search);
const channelId = params.get("id");

async function loadChannel() {
  if (!channelId) {
    alert("Channel not found");
    return;
  }

  // 1️⃣ Load channel info
  const res = await fetch(`${API_BASE}/channel/${channelId}`);
  const channel = await res.json();

  document.getElementById("channelName").innerText = channel.name;
  document.getElementById("channelDesc").innerText =
    channel.description || "No description";
  document.getElementById("subCount").innerText =
    (channel.subscribers || 0) + " subscribers";

  document.getElementById("channelLogo").src =
    channel.avatar || "https://via.placeholder.com/120";
}

async function loadVideos() {
  // 2️⃣ Load channel videos
  const res = await fetch(
    `${API_BASE}/videos?channel_id=${channelId}`
  );
  const data = await res.json();

  const grid = document.getElementById("videoGrid");
  grid.innerHTML = "";

  if (!data.videos || data.videos.length === 0) {
    grid.innerHTML = "<p>No videos yet</p>";
    return;
  }

  data.videos.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
      <img src="${video.thumbnail || 'https://via.placeholder.com/320x180'}">
      <h4>${video.title}</h4>
      <span>${video.views} views</span>
    `;

    card.onclick = () => {
      window.location.href = `watch.html?id=${video.id}`;
    };

    grid.appendChild(card);
  });
}

loadChannel();
loadVideos();
