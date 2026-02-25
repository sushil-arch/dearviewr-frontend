function startUpload() {
  const fileInput = document.getElementById("videoFile");
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const status = document.getElementById("status");
  const progressBar = document.getElementById("progressBar");

  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Login required");
    window.location.href = "/auth/login.html";
    return;
  }

  if (!fileInput.files.length) {
    alert("Select a file");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  formData.append("title", title);
  formData.append("description", desc);

  const xhr = new XMLHttpRequest();

  // 🔥 IMPORTANT: NEW ROUTE
  xhr.open("POST", "/api/upload/", true);

  // 🔐 VERY IMPORTANT (THIS WAS MISSING)
  xhr.setRequestHeader("Authorization", "Bearer " + token);

  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      const percent = (e.loaded / e.total) * 100;
      progressBar.style.width = percent + "%";
    }
  };

  xhr.onload = function () {
    if (xhr.status === 200) {
      status.innerHTML = "Upload successful ✅";
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      console.log(xhr.responseText);
      status.innerHTML = "Upload failed ❌";
    }
  };

  xhr.onerror = function () {
    status.innerHTML = "Upload failed ❌";
  };

  xhr.send(formData);
}
