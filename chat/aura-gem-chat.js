/*!
 * The Aura Gem chat widget · Built by Daniel Walsh Digital
 * One file, any website. Drop it in, set window.AuraGemConfig, done.
 *
 *   <script>
 *     window.AuraGemConfig = {
 *       business: "Tom's Taxi Shetland",
 *       subtitle: "AI Receptionist",
 *       showLabel: true,                       // "Meet Aura" under the gem (client sites)
 *       messages: ["Hello, I'm Aura 😊", "..."],
 *       actions: [{ label: "Call Tom", href: "tel:+44..." }],
 *       placeholder: "Live chat arriving soon"
 *     };
 *   </script>
 *   <script src="/aura-gem-chat.js" defer></script>
 *
 * Any element with the attribute data-open-aura will also open the chat.
 */
(function () {
  if (window.__auraGemLoaded) return; window.__auraGemLoaded = true;
  var C = Object.assign({
    business: '',
    subtitle: 'AI Receptionist',
    showLabel: true,
    label: 'Meet Aura',
    messages: ["Hello, I'm Aura 😊 Lovely to meet you."],
    actions: [],
    placeholder: 'Live chat arriving soon',
    credit: 'The Aura Gem · Built by <b>Daniel Walsh Digital</b>',
    gem: 'https://base44.app/api/apps/6a47d7798b4f7b93a4e99b11/files/mp/public/6a47d7798b4f7b93a4e99b11/e31f5c78b_aura_gem_cutout.png',
    avatar: 'https://base44.app/api/apps/6a47d7798b4f7b93a4e99b11/files/mp/public/6a47d7798b4f7b93a4e99b11/96f7de367_aura_avatar_circle.png',
    gold: '#C5A059',
    loadFonts: true
  }, window.AuraGemConfig || {});

  if (C.loadFonts) {
    var f = document.createElement('link'); f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500&family=Cormorant+Garamond:wght@500&display=swap';
    document.head.appendChild(f);
  }

  var css = '\
.ag-root{--ag-gold:' + C.gold + ';--ag-serif:"Cormorant Garamond",Georgia,serif;--ag-sans:"Archivo",system-ui,sans-serif;font-family:var(--ag-sans)}\
.ag-root *{box-sizing:border-box}\
.ag-launch{position:fixed;right:26px;bottom:26px;z-index:2147483000;display:flex;flex-direction:column;align-items:center;gap:12px;background:none;border:0;cursor:pointer;padding:0}\
.ag-gem{position:relative;width:64px;height:64px;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:transform .3s ease}\
.ag-launch:hover .ag-gem{transform:scale(1.08)}\
.ag-launch:focus-visible .ag-gem{outline:2px solid #2dd4bf;outline-offset:6px}\
.ag-gem::before{content:"";position:absolute;inset:-22%;border-radius:50%;background:radial-gradient(circle,rgba(45,212,191,.4) 0%,rgba(45,212,191,0) 70%);filter:blur(7px);animation:ag-glow 3.8s ease-in-out infinite;pointer-events:none}\
.ag-gem img{position:relative;z-index:1;width:56px;height:auto;filter:drop-shadow(0 0 5px rgba(45,212,191,.5))}\
.ag-ring{position:absolute;inset:-9px;z-index:2;border-radius:50%;pointer-events:none;background:conic-gradient(from 0deg,transparent 0deg,transparent 268deg,rgba(153,246,228,.35) 305deg,rgba(240,255,252,.95) 352deg,#fff 360deg);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 4px),#000 calc(100% - 4px));mask:radial-gradient(farthest-side,transparent calc(100% - 4px),#000 calc(100% - 4px));filter:drop-shadow(0 0 4px rgba(153,246,228,.85));animation:ag-spin 3.4s linear infinite}\
.ag-ring--p{inset:-14px;background:conic-gradient(from 0deg,#fff 0deg,rgba(192,132,252,.9) 40deg,rgba(147,51,234,.4) 80deg,transparent 98deg,transparent 360deg);filter:drop-shadow(0 0 4px rgba(168,85,247,.8));animation:ag-spin 6.2s linear infinite reverse}\
.ag-label{font-family:var(--ag-sans);font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#f4f2ee;background:rgba(15,15,14,.88);border:1px solid rgba(197,160,89,.45);padding:5px 11px;border-radius:999px;white-space:nowrap;box-shadow:0 6px 18px rgba(0,0,0,.35)}\
@keyframes ag-spin{to{transform:rotate(360deg)}}\
@keyframes ag-glow{0%,100%{opacity:.55}50%{opacity:.9}}\
.ag-panel{position:fixed;z-index:2147483001;right:24px;bottom:24px;width:400px;height:600px;max-height:calc(100vh - 48px);display:none;flex-direction:column;background:#0f0f0e;border:1px solid rgba(197,160,89,.28);border-radius:18px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 0 1px rgba(45,212,191,.06);color:#e7e4dc;text-align:left}\
.ag-panel.ag-open{display:flex;animation:ag-in .35s ease}\
@keyframes ag-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}\
.ag-head{display:flex;align-items:center;gap:14px;padding:18px 18px 16px;border-bottom:1px solid rgba(197,160,89,.18);background:radial-gradient(120% 140% at 0% 0%,rgba(45,212,191,.10),transparent 60%)}\
.ag-av{width:60px;height:60px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;background:radial-gradient(circle,rgba(45,212,191,.55),rgba(59,130,246,.35),transparent 70%);animation:ag-avg 3.2s ease-in-out infinite}\
.ag-av img{width:54px;height:54px;border-radius:50%;object-fit:cover;display:block}\
@keyframes ag-avg{0%,100%{box-shadow:0 0 10px rgba(45,212,191,.25)}50%{box-shadow:0 0 18px rgba(45,212,191,.55)}}\
.ag-name{font-family:var(--ag-serif);font-weight:500;font-size:24px;color:#f4f2ee;line-height:1}\
.ag-name span{color:var(--ag-gold)}\
.ag-sub{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:#9a968c;margin-top:6px}\
.ag-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#2dd4bf;margin-right:7px;box-shadow:0 0 8px #2dd4bf;vertical-align:1px}\
.ag-x{margin-left:auto;background:none;border:1px solid rgba(244,242,238,.14);color:#f4f2ee;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:18px;line-height:1}\
.ag-x:hover{border-color:var(--ag-gold);color:var(--ag-gold)}\
.ag-body{flex:1;overflow-y:auto;padding:22px 18px;display:flex;flex-direction:column;gap:14px}\
.ag-msg{display:flex;gap:10px;align-items:flex-start}\
.ag-msg img{width:30px;height:30px;border-radius:50%;object-fit:cover;margin-top:2px;box-shadow:0 0 8px rgba(45,212,191,.25)}\
.ag-bubble{background:#1a1a18;border:1px solid rgba(244,242,238,.07);color:#e7e4dc;font-size:14.5px;line-height:1.6;padding:12px 15px;border-radius:4px 14px 14px 14px;max-width:290px}\
.ag-actions{display:flex;flex-direction:column;gap:8px;padding-left:40px}\
.ag-actions a{display:block;text-align:center;padding:11px 14px;border:1px solid rgba(197,160,89,.35);color:#f4f2ee;font-size:11.5px;letter-spacing:.18em;text-transform:uppercase;border-radius:999px;text-decoration:none;transition:all .25s ease}\
.ag-actions a:hover{background:var(--ag-gold);border-color:var(--ag-gold);color:#111}\
.ag-foot{padding:14px 16px 16px;border-top:1px solid rgba(197,160,89,.14)}\
.ag-foot input{width:100%;background:#161615;border:1px solid rgba(244,242,238,.08);border-radius:999px;padding:12px 16px;color:#9a968c;font:inherit;font-size:13.5px}\
.ag-credit{text-align:center;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#6f6c63;margin-top:12px}\
.ag-credit b{color:var(--ag-gold);font-weight:500}\
@media (max-width:560px){.ag-panel{inset:0;width:100%;height:100%;max-height:none;border-radius:0;border:0}.ag-launch{right:18px;bottom:18px}}\
@media (prefers-reduced-motion:reduce){.ag-gem::before,.ag-ring,.ag-av{animation:none}}';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function mount() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var root = document.createElement('div'); root.className = 'ag-root';
    var msgs = C.messages.map(function (m) {
      return '<div class="ag-msg"><img src="' + C.avatar + '" alt="" aria-hidden="true"><div class="ag-bubble">' + esc(m) + '</div></div>';
    }).join('');
    var acts = C.actions.length ? '<div class="ag-actions">' + C.actions.map(function (a) {
      var ext = /^https?:/.test(a.href) ? ' target="_blank" rel="noopener"' : '';
      return '<a href="' + esc(a.href) + '"' + ext + ' data-ag-close-on-click="' + (a.href.charAt(0) === '#' ? '1' : '') + '">' + esc(a.label) + '</a>';
    }).join('') + '</div>' : '';
    root.innerHTML =
      '<button class="ag-launch" type="button" aria-label="Chat with Aura" data-open-aura>' +
        '<span class="ag-gem"><img src="' + C.gem + '" alt="" aria-hidden="true"><span class="ag-ring"></span><span class="ag-ring ag-ring--p"></span></span>' +
        (C.showLabel ? '<span class="ag-label">' + esc(C.label) + '</span>' : '') +
      '</button>' +
      '<section class="ag-panel" role="dialog" aria-modal="true" aria-label="Chat with Aura">' +
        '<div class="ag-head"><span class="ag-av"><img src="' + C.avatar + '" alt="Aura" width="54" height="54"></span>' +
        '<div><div class="ag-name">Aura <span>Gem</span></div><div class="ag-sub"><span class="ag-dot"></span>' + esc(C.subtitle) + '</div></div>' +
        '<button class="ag-x" type="button" aria-label="Close chat">&times;</button></div>' +
        '<div class="ag-body" aria-live="polite">' + msgs + acts + '</div>' +
        '<div class="ag-foot"><input type="text" placeholder="' + esc(C.placeholder) + '" disabled aria-label="Message Aura (coming soon)">' +
        '<div class="ag-credit">' + C.credit + '</div></div>' +
      '</section>';
    document.body.appendChild(root);
    var panel = root.querySelector('.ag-panel'), launch = root.querySelector('.ag-launch'), x = root.querySelector('.ag-x');
    function open() { panel.classList.add('ag-open'); launch.style.display = 'none'; x.focus(); }
    function close() { panel.classList.remove('ag-open'); launch.style.display = ''; }
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-open-aura]'); if (t) { e.preventDefault(); open(); }
      var a = e.target.closest && e.target.closest('[data-ag-close-on-click="1"]'); if (a) close();
    });
    x.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('ag-open')) { close(); launch.focus(); } });
    window.AuraGem = { open: open, close: close };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
