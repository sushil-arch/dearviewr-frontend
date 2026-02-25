const API_BASE = "https://dearviewr.in/api";

const params = new URLSearchParams(window.location.search);
const videoId = params.get("id");

const videoEl = document.getElementById("player");

async function loadVideo() {
  if (!videoId) {
    alert("Video not found");
    return;
  }

  // 1️⃣ Get signed HLS stream URL
  const streamRes = await fetch(`${API_BASE}/get-stream-url?video_id=${videoId}`);
  const streamData = await streamRes.json();

  // 2️⃣ Get video metadata (title/desc)
  const metaRes = await fetch(`${API_BASE}/video/${videoId}`);
  const meta = await metaRes.json();

  document.getElementById("video-title").innerText = meta.title || "Untitled";
  document.getElementById("video-desc").innerText = meta.description || "";

  const hlsUrl = streamData.stream_url;

  // 3️⃣ Play with HLS.js
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(hlsUrl);
    hls.attachMedia(videoEl);
  } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
    videoEl.src = hlsUrl;
  }
}

loadVideo();
