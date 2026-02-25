const token = localStorage.getItem("admin_token");
if (!token) location.href = "/admin/login.html";

document.getElementById("uploadForm").onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  document.getElementById("status").innerText = "Uploading...";

  const res = await fetch("/api/upload/short", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const data = await res.json();

  if (res.ok && data.status === "ok") {
    document.getElementById("status").innerHTML =
      `<div class="alert alert-success">
        ✅ Uploaded successfully<br>
        Video ID: <b>${data.video_id}</b>
      </div>`;
    e.target.reset();
  } else {
    document.getElementById("status").innerHTML =
      `<div class="alert alert-danger">
        ❌ ${data.detail || "Upload failed"}
      </div>`;
  }
};
