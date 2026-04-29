/* Shared LTR/RTL toggle for component cards.
   Markup contract:
     <html> must omit dir; body inherits.
     Elements with [data-en] / [data-ar] swap textContent.
     Toggle sets document.documentElement.dir.
     Persists in localStorage under 'noon.dir'.
*/
(function(){
  const KEY = 'noon.dir';
  const saved = localStorage.getItem(KEY) || 'ltr';

  const bar = document.createElement('div');
  bar.className = 'dir-toggle';
  bar.innerHTML = `
    <button data-dir="ltr">EN · LTR</button>
    <button data-dir="rtl">AR · RTL</button>
  `;
  const style = document.createElement('style');
  style.textContent = `
    .dir-toggle{position:fixed;top:12px;right:12px;display:flex;gap:0;background:#10172a;
      box-shadow:inset 0 0 0 1px rgba(232,228,220,.12);border-radius:3px;padding:2px;z-index:99;font-family:'JetBrains Mono',monospace}
    html[dir="rtl"] .dir-toggle{right:auto;left:12px}
    .dir-toggle button{background:transparent;border:0;color:rgba(232,228,220,.55);
      font:600 10px/1 'JetBrains Mono',monospace;letter-spacing:.08em;padding:7px 10px;cursor:pointer;border-radius:2px}
    .dir-toggle button.on{background:rgba(100,216,174,.14);color:#64D8AE}
  `;
  document.head.appendChild(style);

  function apply(dir){
    document.documentElement.dir = dir;
    document.documentElement.lang = dir === 'rtl' ? 'ar' : 'en';
    bar.querySelectorAll('button').forEach(b=>b.classList.toggle('on', b.dataset.dir===dir));
    document.querySelectorAll('[data-en]').forEach(el=>{
      const t = dir === 'rtl' ? el.dataset.ar : el.dataset.en;
      if (t != null) el.textContent = t;
    });
    // mirror icon wrappers tagged with .flip-rtl
    document.querySelectorAll('.flip-rtl').forEach(el=>{
      el.style.transform = dir === 'rtl' ? 'scaleX(-1)' : '';
    });
    localStorage.setItem(KEY, dir);
    // Let the card know font family for arabic content should swap
    document.body.classList.toggle('rtl', dir === 'rtl');
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    document.body.appendChild(bar);
    bar.addEventListener('click', e=>{
      const b = e.target.closest('button[data-dir]');
      if (b) apply(b.dataset.dir);
    });
    apply(saved);
  });
})();
