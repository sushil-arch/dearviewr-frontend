const videoId = new URLSearchParams(window.location.search).get("id");
const player = document.getElementById("player");

let currentSource = null;

async function loadVideo() {
  const res = await fetch(`/api/video/${videoId}/play`);
  const data = await res.json();

  if (data.source !== currentSource) {
    const currentTime = player.currentTime || 0;

    player.src = data.play_url;
    player.load();

    player.onloadedmetadata = () => {
      player.currentTime = currentTime;
      player.play();
    };

    currentSource = data.source;
    console.log("🔁 Switched to:", currentSource);
  }
}

// 🔁 poll every 5 sec
setInterval(loadVideo, 5000);

// initial load
loadVideo();
