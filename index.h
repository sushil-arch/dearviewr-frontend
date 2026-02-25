 <!DOCTYPE html>
<html lang="en">
<head>
  <!-- ✅ MUST: UTF-8 encoding -->
  <meta charset="UTF-8" />

  <!-- Mobile first -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>DearViewr</title>

  <!-- CSS -->
<link rel="stylesheet" href="/css/home.css">
  <!-- PWA (later use) -->
  <meta name="theme-color" content="#000000" />
</head>

<body class="home dark">

  <!-- TOP BAR -->
  <header class="topbar">
    <div class="logo">
      📺 <b>DearViewr</b>
    </div>

    <div class="top-actions">
      <button class="icon-btn">＋</button>
      <button class="icon-btn heart">❤</button>
    </div>
  </header>

  <!-- STORIES -->
  <section class="stories">
    <div class="story add">＋</div>
    <div class="story"></div>
    <div class="story"></div>
    <div class="story"></div>
    <div class="story"></div>
  </section>

  <!-- FEED -->
  <main class="feed">
    <div class="reel-skeleton">Loading reels…</div>
  </main>

  <!-- BOTTOM NAV -->
  <nav class="bottom-nav">
    <span class="active">🏠</span>
    <span>🔍</span>
    <span>🎬</span>
    <span>❤</span>
    <span>👤</span>
  </nav>

  <!-- JS -->
  <script src="/js/feed.js"></script>
</body>
</html>
