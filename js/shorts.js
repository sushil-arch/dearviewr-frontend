const container = document.getElementById("shorts");
let players = [];

fetch("https://dearviewr.in/api/shorts?limit=10")
  .then(res => res.json())
  .then(videos => {
    videos.forEach((video, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "short";

      const videoEl = document.createElement("video");
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.preload = "metadata";

      const src = `https://dearviewr.in/${video.hls_path}`;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoEl);
      } else {
        videoEl.src = src;
      }

      wrapper.appendChild(videoEl);
      container.appendChild(wrapper);

      players.push(videoEl);
    });

    setupObserver();
  });

function setupObserver() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const video = entry.target.querySelector("video");
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.75 }
  );

  document.querySelectorAll(".short").forEach(el => observer.observe(el));
}
