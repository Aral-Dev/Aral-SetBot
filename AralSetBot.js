// ============================================
// Aral SetBot — Telegram Webhook Setter Panel
// Cloudflare Workers - Single File
// Theme: ARAL CF Design System
// ============================================

// ---------- صفحه HTML ----------
function renderPage() {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Aral SetBot — ست‌کننده وبهوک تلگرام</title>
<meta name="description" content="Aral SetBot؛ ست کردن خودکار وبهوک ربات تلگرام روی ورکر کلودفلر — سریع، امن و بدون دردسر.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect x='9' y='9' width='14' height='14' transform='rotate(45 16 16)' fill='%23ff4d00'/%3E%3C/svg%3E" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&amp;family=JetBrains+Mono:wght@400;700&amp;family=Vazirmatn:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}

  :root{
    --bg:#070707;
    --fire:#ff4d00;
    --fire-soft:rgba(255,77,0,.14);
    --neon:#00ff9d;
    --neon-soft:rgba(0,255,157,.06);
    --err:#ff5545;
    --txt:#e8e6e1;
    --body-txt:#c9c4bd;
    --mut:#8f8a83;
    --dim:#57534c;
    --panel:#12100e;
    --field:#0d0c0a;
    --glass:rgba(18,17,16,.62);
    --line:rgba(255,77,0,.25);
    --hairline:rgba(255,255,255,.07);
    --mono:'JetBrains Mono',monospace;
    --disp:'Orbitron',monospace;
    --fa:'Vazirmatn',sans-serif;
  }

  html{scroll-behavior:smooth}
  body{
    background:var(--bg);color:var(--txt);
    font-family:var(--fa);line-height:1.9;
    overflow-x:hidden;min-height:100vh;
    display:flex;align-items:center;justify-content:center;
    padding:26px 16px;
  }
  ::selection{background:var(--fire);color:#000}
  ::-webkit-scrollbar{width:10px;height:10px}
  ::-webkit-scrollbar-track{background:var(--bg)}
  ::-webkit-scrollbar-thumb{background:#1c1a18;border:1px solid rgba(255,255,255,.08)}
  ::-webkit-scrollbar-thumb:hover{background:var(--fire)}

  .bg-checker{
    position:fixed;inset:0;z-index:-4;
    background-image:
      linear-gradient(45deg,#0d0c0b 25%,transparent 25%),
      linear-gradient(-45deg,#0d0c0b 25%,transparent 25%),
      linear-gradient(45deg,transparent 75%,#0d0c0b 75%),
      linear-gradient(-45deg,transparent 75%,#0d0c0b 75%);
    background-size:42px 42px;
    background-position:0 0,0 21px,21px -21px,-21px 0;
    animation:checker 22s linear infinite;
    opacity:.5;
  }
  .bg-grid{
    position:fixed;inset:0;z-index:-3;
    background-image:
      linear-gradient(var(--line) 1px,transparent 1px),
      linear-gradient(90deg,var(--line) 1px,transparent 1px);
    background-size:64px 64px;
    -webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 30%,#000 30%,transparent 75%);
    mask-image:radial-gradient(ellipse 70% 60% at 50% 30%,#000 30%,transparent 75%);
  }
  .bg-scan{
    position:fixed;inset:0;z-index:-2;pointer-events:none;
    background:repeating-linear-gradient(0deg,transparent 0 3px,rgba(0,0,0,.12) 3px 4px);
  }
  .bg-beam{
    position:fixed;width:140vmax;height:140vmax;z-index:-2;
    pointer-events:none;opacity:.05;
    background:conic-gradient(from 0deg,transparent 0deg,var(--fire) 4deg,transparent 8deg);
    border-radius:50%;
    animation:radar 9s linear infinite;
  }
  @keyframes checker{to{background-position:42px 42px,42px 63px,63px 21px,21px 63px}}
  @keyframes radar{to{transform:rotate(360deg)}}
  @keyframes gl1{0%,92%{transform:none;opacity:0}93%{transform:translate(-3px,2px);opacity:.8}96%{transform:translate(3px,-2px);opacity:.8}100%{transform:none;opacity:0}}
  @keyframes gl2{0%,90%{transform:none;opacity:0}91%{transform:translate(3px,1px);opacity:.7}95%{transform:translate(-3px,-1px);opacity:.7}100%{transform:none;opacity:0}}

  #preloader{
    position:fixed;inset:0;z-index:100;background:var(--bg);
    display:flex;align-items:center;justify-content:center;flex-direction:column;gap:18px;
    transition:opacity .5s;
  }
  #preloader.off{opacity:0;pointer-events:none}
  .pre-glitch{
    font-family:var(--disp);font-weight:900;font-size:clamp(24px,5vw,44px);
    letter-spacing:.18em;color:var(--txt);position:relative;direction:ltr;
  }
  .pre-glitch::before,.pre-glitch::after{content:attr(data-text);position:absolute;inset:0}
  .pre-glitch::before{color:var(--fire);animation:gl1 2.1s infinite steps(1)}
  .pre-glitch::after{color:var(--neon);animation:gl2 1.7s infinite steps(1)}
  .pre-bar{width:180px;height:2px;background:rgba(255,255,255,.08);overflow:hidden}
  .pre-bar i{display:block;height:100%;width:40%;background:var(--fire);animation:loading 1.1s ease-in-out infinite}
  @keyframes loading{0%{transform:translateX(160%)}100%{transform:translateX(-260%)}}

  .wrap{width:100%;max-width:640px;position:relative;z-index:1}

  .glass{
    background:var(--glass);
    backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
    border:1px solid var(--hairline);
    clip-path:polygon(16px 0,100% 0,100% calc(100% - 16px),calc(100% - 16px) 100%,0 100%,0 16px);
  }
  .panel{padding:26px 24px 28px;position:relative}
  .panel::before{
    content:"";position:absolute;top:0;right:0;width:70px;height:2px;
    background:linear-gradient(90deg,var(--fire),transparent);
  }

  .topbar{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:13px 18px;margin-bottom:34px}
  .logo{font-family:var(--disp);font-weight:700;font-size:15px;letter-spacing:.12em;display:flex;align-items:center;gap:10px;direction:ltr}
  .logo b{color:var(--fire)}
  .logo-mark{width:10px;height:10px;background:var(--fire);box-shadow:0 0 12px var(--fire);transform:rotate(45deg);flex:none}
  .api-status{
    display:flex;align-items:center;gap:8px;font-family:var(--mono);font-size:10px;
    direction:ltr;border:1px solid var(--line);padding:4px 12px;
    background:rgba(0,0,0,.3);white-space:nowrap;user-select:none;
  }
  .api-status .api-dot{width:7px;height:7px;border-radius:50%;flex:none;background:var(--neon);box-shadow:0 0 10px var(--neon)}

  .hero{text-align:center;margin-bottom:32px}
  .hero h1{font-size:clamp(24px,5.5vw,38px);font-weight:800;position:relative;display:inline-block}
  .hero h1::before,.hero h1::after{content:attr(data-text);position:absolute;inset:0}
  .hero h1::before{color:var(--fire);animation:gl1 3.4s infinite steps(1)}
  .hero h1::after{color:var(--neon);animation:gl2 2.8s infinite steps(1)}
  .hero-sub{max-width:520px;margin:14px auto 0;color:var(--mut);font-size:13.5px}
  .hero-sub b{color:var(--txt)}

  .form-group{margin-bottom:18px}
  .field-label{font-size:12.5px;color:var(--mut);margin-bottom:7px;display:flex;align-items:center;justify-content:space-between;gap:10px}
  .field-label .badge-num{
    font-family:var(--disp);font-weight:700;font-size:11px;color:var(--fire);
    border:1px solid var(--line);background:var(--fire-soft);
    padding:1px 10px;letter-spacing:.06em;margin-left:8px;
  }
  .input-wrap{position:relative}
  .inp{
    width:100%;direction:ltr;text-align:left;
    background:var(--field);border:1px solid rgba(255,255,255,.12);color:var(--txt);
    font-family:var(--mono);font-size:13px;padding:12px 44px;outline:none;
    transition:border-color .2s, box-shadow .2s;
  }
  .inp::placeholder{color:var(--dim)}
  .inp:hover{border-color:rgba(255,255,255,.22)}
  .inp:focus{border-color:var(--fire);box-shadow:0 0 0 2px var(--fire-soft),0 0 24px rgba(255,77,0,.12)}
  .input-wrap .ico{
    position:absolute;left:14px;top:50%;transform:translateY(-50%);
    font-size:14px;opacity:.55;pointer-events:none;transition:opacity .2s,transform .2s;
  }
  .input-wrap:focus-within .ico{opacity:1;transform:translateY(-50%) scale(1.12)}
  .eye-btn{
    position:absolute;right:12px;top:50%;transform:translateY(-50%);
    background:none;border:none;cursor:pointer;color:var(--dim);
    font-size:15px;padding:4px;line-height:1;transition:color .2s;
  }
  .eye-btn:hover{color:var(--fire)}

  .btn{
    display:inline-flex;align-items:center;justify-content:center;gap:10px;cursor:pointer;
    width:100%;font-family:var(--fa);font-weight:800;font-size:14.5px;
    padding:14px 26px;margin-top:8px;border:1px solid var(--fire);
    color:#000;background:var(--fire);
    clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);
    transition:all .2s;
  }
  .btn:hover:not(:disabled){box-shadow:0 0 24px rgba(255,77,0,.55);transform:translateY(-1px)}
  .btn:active:not(:disabled){transform:translateY(1px)}
  .btn:disabled{opacity:.5;cursor:not-allowed}
  .spin{
    display:inline-block;width:15px;height:15px;
    border:2px solid rgba(0,0,0,.3);border-top-color:#000;border-radius:50%;
    animation:spin .7s linear infinite;
  }
  @keyframes spin{to{transform:rotate(360deg)}}

  .hint-box{
    background:var(--fire-soft);border:1px solid var(--line);
    padding:11px 14px;font-size:11.5px;color:#ffb888;line-height:1.9;
  }
  .hint-box .hb-title{font-weight:700;color:var(--fire);display:flex;align-items:center;gap:6px;margin-bottom:3px;font-size:12px}
  .hint-box code{font-family:var(--mono);background:rgba(0,0,0,.4);padding:1px 6px;direction:ltr;display:inline-block}
  .hint-note{font-size:11px;color:var(--dim);margin-top:5px}
  .hint-note b{color:var(--mut)}

  .result{margin-top:24px}
  .result.show{animation:slide-in .45s cubic-bezier(.2,.8,.3,1)}
  @keyframes slide-in{
    from{opacity:0;transform:translateY(16px) scale(.98)}
    to{opacity:1;transform:translateY(0) scale(1)}
  }
  .result-card{
    position:relative;padding:20px;
    background:linear-gradient(145deg,rgba(18,17,16,.95),rgba(10,9,8,.95));
    border:1px solid var(--hairline);
    clip-path:polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px);
  }
  .result-card.success{border-color:rgba(0,255,157,.4);box-shadow:0 0 26px rgba(0,255,157,.1)}
  .result-card.error{border-color:rgba(255,85,69,.45);box-shadow:0 0 26px rgba(255,85,69,.1)}
  .result-title{
    font-size:15px;font-weight:800;margin-bottom:14px;
    display:flex;align-items:center;gap:10px;padding-bottom:12px;
    border-bottom:1px dashed rgba(255,255,255,.1);
  }
  .result-title.success{color:var(--neon)}
  .result-title.error{color:var(--err)}
  .result-title .ico-big{
    width:32px;height:32px;flex:none;
    display:flex;align-items:center;justify-content:center;font-size:16px;
    background:var(--field);border:1px solid var(--hairline);
  }
  .info-row{
    display:flex;justify-content:space-between;align-items:center;gap:12px;
    padding:11px 0;font-size:12.5px;
    border-bottom:1px dashed rgba(255,255,255,.08);
  }
  .info-row .k{color:var(--mut);flex:none;display:flex;align-items:center;gap:6px}
  .info-row .v{
    color:var(--txt);font-weight:700;font-family:var(--mono);
    direction:ltr;text-align:left;font-size:11.5px;
    max-width:68%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
    background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.08);padding:3px 10px;
    user-select:all;
  }
  .steps{margin-top:16px}
  .steps h3{
    font-family:var(--mono);font-size:10.5px;color:var(--mut);
    margin-bottom:9px;font-weight:700;letter-spacing:.18em;direction:ltr;text-align:right;
  }
  .step{
    display:flex;align-items:center;gap:12px;
    padding:11px 14px;background:var(--field);
    border:1px solid rgba(255,255,255,.1);margin-bottom:7px;
    font-size:12px;transition:transform .15s,border-color .15s;
  }
  .step:hover{transform:translateX(-4px);border-color:var(--line)}
  .step .dot{
    width:24px;height:24px;flex:none;
    display:flex;align-items:center;justify-content:center;
    font-size:12px;font-weight:800;font-family:var(--mono);
    clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px);
  }
  .step.ok .dot{background:var(--neon);color:#000}
  .step.err .dot{background:var(--err);color:#fff}
  .step .name{flex:1;color:var(--body-txt);font-weight:700;direction:ltr;text-align:left;font-size:11.5px;font-family:var(--mono)}
  .step .status{font-size:12px;flex:none}
  .err-msg{
    margin-top:12px;padding:12px 14px;
    background:rgba(255,85,69,.07);border:1px solid rgba(255,85,69,.4);
    font-size:11.5px;color:#ffb0a8;direction:ltr;text-align:left;
    word-break:break-all;line-height:1.7;font-family:var(--mono);
  }
  .open-bot{
    display:flex;align-items:center;justify-content:center;gap:8px;
    margin-top:16px;padding:12px;
    background:var(--fire);color:#000;border:1px solid var(--fire);
    text-decoration:none;font-weight:800;font-size:13px;
    clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);
    transition:all .2s;
  }
  .open-bot:hover{box-shadow:0 0 22px rgba(255,77,0,.5);transform:translateY(-1px)}

  .links{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:22px}
  .links a{
    display:inline-flex;align-items:center;gap:6px;
    font-family:var(--mono);font-size:10.5px;text-decoration:none;
    direction:ltr;padding:5px 13px;transition:all .2s;
    background:var(--panel);border:1px solid rgba(255,255,255,.12);color:var(--body-txt);
    clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px);
    word-break:break-all;
  }
  .links a:hover{color:var(--fire);border-color:var(--fire);box-shadow:0 0 14px rgba(255,77,0,.25)}
  .links a.tg:hover{color:var(--neon);border-color:var(--neon);box-shadow:0 0 14px rgba(0,255,157,.25)}
  .foot{
    margin-top:20px;text-align:center;
    font-family:var(--mono);font-size:10px;color:var(--dim);
    letter-spacing:.22em;direction:ltr;
    display:flex;align-items:center;justify-content:center;gap:10px;
  }
  .foot .dot{width:6px;height:6px;background:var(--neon);box-shadow:0 0 8px var(--neon);border-radius:50%;animation:pulse 2s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
  .corner-mark{
    position:fixed;top:14px;left:14px;z-index:5;pointer-events:none;
    font-family:var(--disp);font-size:9px;letter-spacing:4px;
    color:rgba(255,77,0,.35);font-weight:700;direction:ltr;
  }
  .corner-mark-bottom{
    position:fixed;bottom:14px;right:14px;z-index:5;pointer-events:none;
    font-family:var(--disp);font-size:9px;letter-spacing:4px;
    color:rgba(0,255,157,.28);font-weight:700;direction:ltr;
  }

  @media(max-width:480px){
    body{padding:16px 10px}
    .panel{padding:20px 16px 22px}
    .topbar{padding:11px 14px}
    .inp{padding:12px 40px;font-size:12.5px}
    .info-row .v{max-width:60%}
  }
</style>
</head>
<body>

<div class="bg-checker"></div>
<div class="bg-grid"></div>
<div class="bg-scan"></div>
<div class="bg-beam" style="top:-70vmax;left:-20vmax"></div>

<div id="preloader">
  <div class="pre-glitch" data-text="ARAL SETBOT">ARAL SETBOT</div>
  <div class="pre-bar"><i></i></div>
</div>

<div class="corner-mark">ARAL SETBOT</div>
<div class="corner-mark-bottom">ARAL SETBOT</div>

<div class="wrap">

  <header class="topbar glass">
    <div class="logo"><span class="logo-mark"></span>ARAL<b>SETBOT</b></div>
    <div class="api-status" title="وبهوک‌سِتر آماده است"><span class="api-dot"></span><span>SYSTEM ONLINE</span></div>
  </header>

  <section class="hero">
    <h1 class="glitch" data-text="ست‌کننده وبهوک تلگرام">ست‌کننده وبهوک تلگرام</h1>
    <p class="hero-sub">
      توکن ربات و آدرس Worker خود را وارد کنید تا وبهوک <b>به‌صورت خودکار</b> ست، تأیید و ری‌استارت شود —
      <b>بدون ترمینال</b> و بدون دردسر.
    </p>
  </section>

  <main class="glass panel">

    <div class="form-group">
      <div class="field-label">
        <label for="token"><span class="badge-num">۰۱</span> توکن ربات تلگرام</label>
      </div>
      <div class="input-wrap">
        <span class="ico">🔑</span>
        <input type="password" id="token" class="inp" placeholder="123456789:AAH-xxxxxxxxxxxxxxxx" autocomplete="off" spellcheck="false">
        <button type="button" class="eye-btn" id="eyeBtn" onclick="toggleToken()" title="نمایش / مخفی‌کردن توکن">👁</button>
      </div>
      <p class="hint-note">💡 توکن را از <b>BotFather</b> دریافت کنید. فقط برای برقراری ارتباط استفاده می‌شود و ذخیره نمی‌گردد.</p>
    </div>

    <div class="form-group">
      <div class="field-label">
        <label for="url"><span class="badge-num">۰۲</span> آدرس Worker مقصد</label>
      </div>
      <div class="input-wrap">
        <span class="ico">🔗</span>
        <input type="url" id="url" class="inp" placeholder="https://my-bot.username.workers.dev" autocomplete="off" spellcheck="false">
      </div>
    </div>

    <div class="hint-box">
      <div class="hb-title"><span>▣</span><span>نکته:</span></div>
      آدرس ورکر باید با <code>https://</code> شروع شود. پس از ست شدن وبهوک، آپدیت‌های <code>message</code> و <code>callback_query</code> به‌صورت خودکار فعال و آپدیت‌های معلق پاک می‌شوند.
    </div>

    <button class="btn" id="submitBtn" onclick="submitForm()">🚀 ست کردن وبهوک</button>

    <div class="result" id="result"></div>
  </main>

  <div class="links">
    <a class="tg" href="https://t.me/AralDev" target="_blank" rel="noopener noreferrer">✈ t.me/AralDev</a>
    <a href="https://youtube.com/@Aral-Dev" target="_blank" rel="noopener noreferrer">▶ youtube.com/@Aral-Dev</a>
    <a href="https://github.com/Aral-Dev" target="_blank" rel="noopener noreferrer">⌥ github.com/Aral-Dev</a>
    <a href="https://aral.kdns.fr" target="_blank" rel="noopener noreferrer">◉ aral.kdns.fr</a>
  </div>

  <div class="foot">
    <span class="dot"></span>
    <span>ARAL&nbsp;SETBOT&nbsp;·&nbsp;TELEGRAM&nbsp;WEBHOOK&nbsp;SETTER</span>
  </div>
</div>

<script>
  // ---------- پری‌لودر ----------
  window.addEventListener('load', function () {
    var pre = document.getElementById('preloader');
    setTimeout(function () {
      pre.classList.add('off');
      setTimeout(function () { pre.remove(); }, 600);
    }, 550);
  });
  setTimeout(function () {
    var pre = document.getElementById('preloader');
    if (pre) { pre.classList.add('off'); setTimeout(function () { pre.remove(); }, 700); }
  }, 2600);

  // ---------- نمایش/مخفی توکن ----------
  function toggleToken() {
    var inp = document.getElementById('token');
    var btn = document.getElementById('eyeBtn');
    if (inp.type === 'text') {
      inp.type = 'password';
      btn.textContent = '\\uD83D\\uDC41';
    } else {
      inp.type = 'text';
      btn.textContent = '\\uD83D\\uDC48';
    }
  }

  // ---------- Escape برای جلوگیری از XSS ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---------- نمایش نتیجه ----------
  function showResult(data) {
    var box = document.getElementById('result');
    var ok = data.ok === true;
    var html = '';
    var steps = data.steps || [];
    var botInfo = data.botInfo || {};
    var finalUrl = data.finalUrl || '-';

    html += '<div class="result-card ' + (ok ? 'success' : 'error') + '">';
    html += '<div class="result-title ' + (ok ? 'success' : 'error') + '">';
    html += '<span class="ico-big">' + (ok ? '\\u2705' : '\\u26A0\\uFE0F') + '</span>';
    html += (ok ? 'وبهوک با موفقیت ست و تأیید شد' : 'خطا در ست کردن وبهوک');
    html += '</div>';

    html += '<div class="info-row"><span class="k">🤖 نام ربات</span>';
    html += '<span class="v">' + esc(botInfo.first_name || '-') + '</span></div>';

    html += '<div class="info-row"><span class="k">🏷️ یوزرنیم</span>';
    html += '<span class="v">' + (botInfo.username ? '@' + esc(botInfo.username) : '-') + '</span></div>';

    html += '<div class="info-row"><span class="k">🌐 آدرس نهایی وبهوک</span>';
    html += '<span class="v" title="' + esc(finalUrl) + '">' + esc(finalUrl) + '</span></div>';

    html += '<div class="steps"><h3>&#9656; DEPLOY STEPS</h3>';
    for (var i = 0; i < steps.length; i++) {
      var s = steps[i];
      var good = s.ok === true;
      html += '<div class="step ' + (good ? 'ok' : 'err') + '">';
      html += '<div class="dot">' + (good ? '\\u2713' : '\\u2717') + '</div>';
      html += '<div class="name">' + esc(s.name) + '</div>';
      html += '<div class="status">' + (good ? '\\u2705' : '\\u274C') + '</div>';
      html += '</div>';
    }
    html += '</div>';

    if (data.error) {
      html += '<div class="err-msg">\\u26A0\\uFE0F ' + esc(data.error) + '</div>';
    }

    if (botInfo.username) {
      html += '<a class="open-bot" href="https://t.me/' + esc(botInfo.username) + '" target="_blank" rel="noopener noreferrer">🚀 باز کردن ربات در تلگرام ↗</a>';
    }

    html += '</div>';
    box.innerHTML = html;
    box.classList.add('show');
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ---------- ارسال فرم ----------
  function submitForm() {
    var token = document.getElementById('token').value.trim();
    var url = document.getElementById('url').value.trim();
    var btn = document.getElementById('submitBtn');
    var httpsCheck = /^https:\\/\\//;

    if (!token) { alert('لطفاً توکن ربات را وارد کنید'); document.getElementById('token').focus(); return; }
    if (!url) { alert('لطفاً آدرس Worker را وارد کنید'); document.getElementById('url').focus(); return; }
    if (!httpsCheck.test(url)) { alert('آدرس Worker باید با https:// شروع شود'); document.getElementById('url').focus(); return; }

    btn.disabled = true;
    btn.innerHTML = '<span class="spin"></span> در حال ست کردن وبهوک...';

    fetch('/api/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token, url: url })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) { showResult(data); })
      .catch(function (err) { showResult({ ok: false, error: err.message, steps: [] }); })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = '\\uD83D\\uDE80 ست کردن وبهوک';
      });
  }

  // ---------- ارسال با Enter ----------
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && document.activeElement && document.activeElement.tagName === 'INPUT') {
      submitForm();
    }
  });
</script>
</body>
</html>`;
}

// ============================================
//              API: SETUP WEBHOOK
// ============================================

async function handleSetup(request) {
  try {
    const { token, url } = await request.json();

    if (!token || typeof token !== "string") {
      return jsonResponse({ ok: false, error: "توکن نامعتبر است", steps: [] });
    }
    if (!url || !/^https:\/\//.test(url)) {
      return jsonResponse({ ok: false, error: "آدرس Worker نامعتبر است (باید https باشد)", steps: [] });
    }

    const API = "https://api.telegram.org/bot" + token;
    const steps = [];

    // ---- مرحله 1: getMe ----
    let me;
    try {
      const res = await fetch(API + "/getMe");
      me = await res.json();
    } catch (e) {
      me = { ok: false, description: e.message };
    }
    steps.push({ name: "getMe", ok: me.ok === true });

    if (!me.ok) {
      return jsonResponse({
        ok: false,
        error: "توکن ربات اشتباه است یا ربات وجود ندارد",
        steps,
        botInfo: {},
      });
    }

    // ---- مرحله 2: setWebhook ----
    let setRes;
    try {
      const r = await fetch(API + "/setWebhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          allowed_updates: ["message", "callback_query"],
          drop_pending_updates: true,
          max_connections: 40,
        }),
      });
      setRes = await r.json();
    } catch (e) {
      setRes = { ok: false, description: e.message };
    }
    steps.push({ name: "setWebhook", ok: setRes.ok === true });

    if (!setRes.ok) {
      return jsonResponse({
        ok: false,
        error: "setWebhook ناموفق: " + (setRes.description || "نامشخص"),
        steps,
        botInfo: {
          first_name: me.result.first_name,
          username: me.result.username,
        },
      });
    }

    // ---- مرحله 3: getWebhookInfo ----
    let info;
    try {
      const r = await fetch(API + "/getWebhookInfo");
      info = await r.json();
    } catch (e) {
      info = { ok: false, description: e.message };
    }
    const finalUrl = (info && info.result && info.result.url) || "";
    const verified = finalUrl === url;
    steps.push({ name: "getWebhookInfo", ok: verified });

    return jsonResponse({
      ok: verified,
      error: verified ? null : 'تأیید نشد! URL فعلی: "' + finalUrl + '"',
      steps,
      botInfo: {
        first_name: me.result.first_name,
        username: me.result.username,
      },
      finalUrl,
    });
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: "خطای سرور: " + err.message,
      steps: [],
    });
  }
}

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

// ============================================
//              ENTRY POINT
// ============================================

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/setup" && request.method === "POST") {
      return handleSetup(request);
    }

    if (request.method === "GET") {
      return new Response(renderPage(), {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    return new Response("Method Not Allowed", { status: 405 });
  },
};