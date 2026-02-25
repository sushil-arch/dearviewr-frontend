const container = document.getElementById("reels");

fetch("/api/reels")
  .then(res => res.json())
  .then(data => {
    container.innerHTML = "";

    data.reels.forEach(r => {
      const reel = document.createElement("div");
      reel.className = "reel";

      reel.innerHTML = `
        <video src="${r.hls}"
               autoplay
               muted
               loop
               playsinline></video>
      `;

      container.appendChild(reel);
    });
  })
  .catch(() => {
    container.innerHTML = "<div class='loader'>Failed to load reels</div>";
  });

/* Auto play / pause on scroll */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const video = entry.target.querySelector("video");
      if (entry.isIntersecting) video.play();
      else video.pause();
    });
  },
  { threshold: 0.7 }
);

setTimeout(() => {
  document.querySelectorAll(".reel").forEach(r => observer.observe(r));
}, 1000);

// ===============================
// ➕ CREATE POST BUTTON HANDLER
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const createBtn = document.getElementById("createPostBtn");

  if (!createBtn) {
    console.warn("Create post button not found");
    return;
  }

  createBtn.addEventListener("click", () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      // 🔐 login required
      window.location.href = "/auth/login.html";
      return;
    }

    // ✅ logged in → upload page
    window.location.href = "/creator/upload.html";
  });
});
