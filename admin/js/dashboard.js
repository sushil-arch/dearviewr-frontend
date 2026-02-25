const token = localStorage.getItem("admin_token");
if (!token) location.href = "/admin/login.html";

// LOGOUT
document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("admin_token");
  location.href = "/admin/login.html";
};

// LOAD KPI
async function loadKPI() {
  const res = await fetch("/api/admin/dashboard/kpi", {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  if (!res.ok) {
    alert("Failed to load dashboard data");
    return;
  }

  const data = await res.json();

  document.getElementById("kVideos").innerText = data.total_videos;
  document.getElementById("kViews").innerText = data.total_views;
  document.getElementById("kCreators").innerText = data.creators;
  document.getElementById("kProcessing").innerText = data.processing;
}

loadKPI();

// ================= REALTIME ADMIN NOTIFICATION =================

const notifCount = document.getElementById("notifCount");
let notificationCounter = 0;

function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;

  toast.style.position = "fixed";
  toast.style.top = "70px";
  toast.style.right = "20px";
  toast.style.background = "#111";
  toast.style.color = "#fff";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 0 10px rgba(0,0,0,0.6)";
  toast.style.zIndex = "9999";
  toast.style.fontSize = "14px";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

if (token) {
  const ws = new WebSocket(
    "wss://dearviewr.in/api/ws/admin/notifications?token=" + token
  );

  ws.onmessage = function(event) {
    notificationCounter++;
    notifCount.innerText = notificationCounter;
    notifCount.style.display = "inline-block";
    showToast(event.data);
  };

  ws.onerror = function() {
    console.log("WebSocket error");
  };
}

// ================= ADMIN LIVE CHAT =================

const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendChat = document.getElementById("sendChat");

if (token && chatBox) {

  const chatSocket = new WebSocket(
    "wss://dearviewr.in/api/ws/admin/chat?token=" + token
  );

  chatSocket.onmessage = function(event) {
    const msg = document.createElement("div");
    msg.innerText = event.data;
    msg.style.marginBottom = "5px";
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  sendChat.onclick = function() {
    const message = chatInput.value.trim();
    if (!message) return;

    chatSocket.send(message);
    chatInput.value = "";
  };
}
