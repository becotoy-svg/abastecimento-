@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0a0f1e;
  --surface: #111827;
  --surface2: #1a2235;
  --border: #1e2d47;
  --accent: #00d4ff;
  --accent2: #ff6b35;
  --text: #e8edf5;
  --muted: #6b7a99;
  --green: #00e5a0;
  --radius: 10px;
}

html { scroll-behavior: smooth; }

body {
  font-family: 'DM Mono', monospace;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  font-size: 13px;
}

::selection { background: var(--accent); color: var(--bg); }

/* scrollbar */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: var(--surface); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
