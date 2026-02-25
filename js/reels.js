document.addEventListener("DOMContentLoaded", () => {

  const feed = document.getElementById("reels");
  if (!feed) return;

  async function loadReels() {

    try {

      const res = await fetch("/api/reels");
      const data = await res.json();

      feed.innerHTML = "";

      if (!data.reels || data.reels.length === 0) {
        feed.innerHTML = "<p style='text-align:center'>No reels available</p>";
        return;
      }

      data.reels.forEach((r) => {

        const wrapper = document.createElement("div");
        wrapper.className = "reel-item";

        // ================= VIDEO =================

        const video = document.createElement("video");
        video.style.pointerEvents = "none";
        video.muted = true;
        video.autoplay = false;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
        video.preload = "auto";

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(r.hls);
          hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = r.hls;
        }

        // ================= UI OVERLAY =================

        const gradient = document.createElement("div");
        gradient.className = "reel-gradient";
        gradient.style.pointerEvents = "none";

        const info = document.createElement("div");
        info.className = "reel-info";
        info.innerHTML = `
          <div class="reel-username">@${r.username || "user"}</div>
          <div class="reel-caption">${r.caption || "Awesome reel 🔥"}</div>
        `;

        // ================= ACTIONS (RIGHT SIDE) =================

        const actions = document.createElement("div");
        actions.className = "reel-actions";

        // ❤️ LIKE
        const likeItem = document.createElement("div");
        likeItem.style.display = "flex";
        likeItem.style.flexDirection = "column";
        likeItem.style.alignItems = "center";
        likeItem.style.cursor = "pointer";

        const likeIcon = document.createElement("div");
        likeIcon.innerHTML = "❤";
        likeIcon.style.fontSize = "24px";
        likeIcon.style.color = "white";

        const likeCount = document.createElement("div");
        likeCount.innerText = r.like_count || 0;
        likeCount.style.fontSize = "13px";

        likeItem.appendChild(likeIcon);
        likeItem.appendChild(likeCount);

        likeItem.onclick = async () => {

          const token = localStorage.getItem("access_token");
          if (!token) {
            window.location.href = "/auth/login.html";
            return;
          }

          try {

            const res = await fetch(`/api/like/${r.video_id}`, {
              method: "POST",
              headers: {
                "Authorization": "Bearer " + token
              }
            });

            const data = await res.json();

            likeIcon.style.color = data.liked ? "red" : "white";
            likeCount.innerText = data.count;

          } catch (err) {
            console.error("Like error:", err);
          }
        };

        // 💬 COMMENT
        const commentItem = document.createElement("div");
        commentItem.innerHTML = "💬";

        // ↗ SHARE
        const shareItem = document.createElement("div");
        shareItem.innerHTML = "↗";

        actions.appendChild(likeItem);
        actions.appendChild(commentItem);
        actions.appendChild(shareItem);

        // ================= APPEND =================

        wrapper.appendChild(video);
        wrapper.appendChild(gradient);
        wrapper.appendChild(info);
        wrapper.appendChild(actions);

        feed.appendChild(wrapper);

      });

      setupAutoPlay();

    } catch (err) {
      feed.innerHTML = "<p style='color:red'>Failed to load reels</p>";
      console.error(err);
    }
  }

  // ================= AUTOPLAY =================

  function setupAutoPlay() {

    const videos = document.querySelectorAll("video");

    const observer = new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        const video = entry.target;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }

      });

    }, { threshold: 0.6 });

    videos.forEach(video => observer.observe(video));
  }

  loadReels();

});
