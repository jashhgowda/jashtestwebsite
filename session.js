(function () {
  const TIMEOUT_MS  = 20 * 60 * 1000;
  const WARNING_MS  = 19 * 60 * 1000;
  const WARN_SECS   = 60;
  let warnTimer, logoutTimer, countdownInterval, warningActive = false;

  function injectModal() {
    const s = document.createElement('style');
    s.textContent = `
      #st-overlay { position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.75);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 0.3s; }
      #st-overlay.show { opacity:1;pointer-events:all; }
      #st-modal { background:#141414;border:1px solid #2a2a2a;border-radius:14px;padding:44px 40px;width:min(420px,92vw);text-align:center;box-shadow:0 40px 80px rgba(0,0,0,0.6);transform:translateY(20px);transition:transform 0.3s;font-family:'DM Sans',sans-serif; }
      #st-overlay.show #st-modal { transform:translateY(0); }
      #st-icon { font-size:2.2rem;margin-bottom:18px; }
      #st-title { font-family:'DM Serif Display',serif;font-size:1.6rem;color:#f0ede6;margin-bottom:10px; }
      #st-body { font-size:13px;color:#555;line-height:1.7;margin-bottom:28px; }
      #st-body strong { color:#f5a142; }
      #st-ring-wrap { display:flex;justify-content:center;margin-bottom:28px; }
      #st-ring { position:relative;width:72px;height:72px; }
      #st-ring svg { transform:rotate(-90deg); }
      .st-rbg { fill:none;stroke:#222;stroke-width:4; }
      .st-rfill { fill:none;stroke:#f5a142;stroke-width:4;stroke-linecap:round;stroke-dasharray:207;stroke-dashoffset:0;transition:stroke-dashoffset 1s linear; }
      #st-rnum { position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:1.4rem;color:#f5a142; }
      #st-stay { width:100%;background:#c8f542;color:#0d0d0d;border:none;border-radius:8px;padding:13px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;margin-bottom:10px; }
      #st-stay:hover { background:#9ec42e; }
      #st-out { width:100%;background:transparent;color:#555;border:1px solid #2a2a2a;border-radius:8px;padding:12px;font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer; }
      #st-out:hover { border-color:#ff5c5c;color:#ff5c5c; }
    `;
    document.head.appendChild(s);
    const o = document.createElement('div');
    o.id = 'st-overlay';
    o.setAttribute('data-testid','session-timeout-modal');
    o.innerHTML = `<div id="st-modal"><div id="st-icon">⏱️</div><div id="st-title">Still there?</div><div id="st-body">Your session will expire due to inactivity.<br/>Logged out in <strong><span id="st-count">${WARN_SECS}</span> seconds</strong>.</div><div id="st-ring-wrap"><div id="st-ring"><svg viewBox="0 0 72 72" width="72" height="72"><circle class="st-rbg" cx="36" cy="36" r="33"/><circle class="st-rfill" id="st-rfill" cx="36" cy="36" r="33"/></svg><div id="st-rnum">${WARN_SECS}</div></div></div><button id="st-stay" onclick="window.__stayIn()">Keep me logged in</button><button id="st-out" onclick="window.__doLogout('Manual logout')">Log out now</button></div>`;
    document.body.appendChild(o);
  }

  function showWarning() {
    warningActive = true;
    document.getElementById('st-overlay').classList.add('show');
    let rem = WARN_SECS;
    const circ = 2 * Math.PI * 33;
    const ring = document.getElementById('st-rfill');
    ring.style.strokeDashoffset = 0;
    countdownInterval = setInterval(() => {
      rem--;
      document.getElementById('st-count').textContent = rem;
      document.getElementById('st-rnum').textContent  = rem;
      ring.style.strokeDashoffset = circ * (1 - rem / WARN_SECS);
      if (rem <= 0) clearInterval(countdownInterval);
    }, 1000);
  }

  function hideWarning() {
    warningActive = false;
    document.getElementById('st-overlay').classList.remove('show');
    if (countdownInterval) clearInterval(countdownInterval);
  }

  window.__doLogout = function(reason) {
    hideWarning(); clearTimers();
    const u = JSON.parse(sessionStorage.getItem('user') || '{}');
    sessionStorage.setItem('lastUser', u.email || '—');
    sessionStorage.setItem('logoutReason', reason || 'Manual logout');
    sessionStorage.removeItem('user');
    window.location.href = 'logout.html';
  };

  window.__stayIn = function() { hideWarning(); resetTimers(); };

  function clearTimers() {
    clearTimeout(warnTimer); clearTimeout(logoutTimer);
    if (countdownInterval) clearInterval(countdownInterval);
  }

  function resetTimers() {
    clearTimers();
    warnTimer   = setTimeout(showWarning, WARNING_MS);
    logoutTimer = setTimeout(() => window.__doLogout('Session timed out'), TIMEOUT_MS);
  }

  ['mousemove','keydown','click','scroll','touchstart'].forEach(ev => {
    document.addEventListener(ev, () => { if (!warningActive) resetTimers(); }, { passive: true });
  });

  window.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('user')) { window.location.href = 'index.html'; return; }
    injectModal(); resetTimers();
  });
})();
