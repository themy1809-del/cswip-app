/* ============================================================
   IMG_BOOK — Hình trích từ giáo trình WIS5 (TWI) gắn vào app
   Dữ liệu: img_book/manifest.js → window.BOOK_FIGS (223 hình có chú
   thích Anh + Việt, gắn chương) và window.BOOK_WP (14 trang Work Pack).
   - Tab Bài học: dưới mỗi ý Giảng giải hiện hình sách liên quan; cuối
     chương có thư viện toàn bộ hình của chương, chạm để phóng to.
   - API dùng chung: BOOK.forChapter(ci), BOOK.match(ci, text, n),
     BOOK.img(fig, cls), BOOK.zoom(idx).
   Hình thuộc bản quyền TWI — chỉ dùng cho học tập cá nhân.
   ============================================================ */
(function(){
'use strict';
var FIGS = window.BOOK_FIGS || [];
var BASE = 'img_book/';
function esc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
var STOP = {the:1, of:1, and:1, to:1, in:1, a:1, is:1, for:1, on:1, with:1, which:1, what:1, be:1, are:1, that:1, this:1, by:1, an:1, or:1, as:1, at:1, from:1, it:1, weld:1, welds:1, welding:1, welded:1, typical:1, example:1, examples:1, diagram:1, using:1, used:1, during:1, after:1, before:1, between:1, two:1, type:1, types:1, method:1, methods:1, effect:1, increasing:1, applied:1, some:1, low:1, steel:1, steels:1};
function words(s){ return String(s || '').toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9\- ]/g, ' ').split(/\s+/).filter(function(w){ return w.length >= 3 && !STOP[w]; }); }
FIGS.forEach(function(f, i){ f.i = i; f.w2 = words(f.cap); });

var css = document.createElement('style');
css.textContent = [
'.bk-fig{background:#fff;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.1)}',
'.bk-fig img{display:block;width:100%;height:auto;cursor:zoom-in}',
'.bk-cap{font-size:12.5px;color:var(--muted,#94a3bb);margin-top:5px;line-height:1.5}',
'.bk-cap b{color:var(--txt,#eaeff7);font-weight:600}',
'.bk-cap .pg{font-size:11px;opacity:.8}',
'.bk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;margin-top:10px}',
'.bk-grid .bk-fig img{height:150px;object-fit:contain;background:#fff}',
'.bk-sec{margin-top:14px}',
'.bk-sec summary{cursor:pointer;font-weight:700;color:var(--accent2,#4ca8ff);list-style:none}',
'.bk-sec summary::-webkit-details-marker{display:none}',
'.bk-inline{margin:8px 0 12px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}',
'.bk-zoom{position:fixed;inset:0;background:rgba(0,0,0,.93);z-index:10001;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px;cursor:zoom-out}',
'.bk-zoom img{max-width:98vw;max-height:78vh;background:#fff;border-radius:8px;object-fit:contain}',
'.bk-zoom .zc{color:#eaeff7;font-size:14px;margin-top:10px;max-width:760px;text-align:center;line-height:1.5}',
'.bk-zoom .zc small{display:block;color:#94a3bb;font-size:12px;margin-top:3px}',
'.bk-zoom .zn{display:flex;gap:10px;margin-top:10px}',
'.bk-zoom .zn button{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;border-radius:10px;padding:8px 14px;cursor:pointer;font-size:14px}'
].join('\n');
document.head.appendChild(css);

function img(f, cls, lazy){ return '<figure class="bk-fig ' + (cls || '') + '" style="margin:0"><img src="' + BASE + f.f + '" alt="' + esc(f.cap) + '" ' + (lazy === false ? '' : 'loading="lazy"') + ' onclick="BOOK.zoom(' + f.i + ')"></figure>'; }
function cap(f){ return '<div class="bk-cap"><b>' + esc(f.vi || f.cap) + '</b>' + (f.vi ? ' <span style="opacity:.8">— ' + esc(f.cap) + '</span>' : '') + ' <span class="pg">· WIS5 tr.' + f.p + ' (' + esc(f.n.replace(/^T/, 'Bảng ')) + ')</span></div>'; }
function forChapter(ci){ return FIGS.filter(function(f){ return f.ch.indexOf(ci) >= 0; }); }
function match(ci, text, n, exclude){
  var qw = words(text); if (!qw.length) return [];
  var set = {}; qw.forEach(function(w){ set[w] = 1; });
  var pool = ci == null ? FIGS : forChapter(ci);
  var sc = pool.map(function(f){ var s = 0; f.w2.forEach(function(w){ if (set[w]) s++; }); return {f:f, s:s / Math.sqrt(f.w2.length + 2)}; }).filter(function(x){ return x.s > 0 && !(exclude && exclude[x.f.i]); });
  sc.sort(function(a, b){ return b.s - a.s; });
  return sc.slice(0, n || 3).map(function(x){ return x.f; });
}
var ZLIST = null, ZI = 0;
function zoomShow(){
  var f = ZLIST[ZI]; if (!f) return;
  var o = document.getElementById('bk-zoom'); if (!o){ o = document.createElement('div'); o.id = 'bk-zoom'; o.className = 'bk-zoom'; o.addEventListener('click', function(e){ if (e.target.tagName !== 'BUTTON') o.remove(); }); document.body.appendChild(o); }
  o.innerHTML = '<img src="' + BASE + f.f + '" alt=""><div class="zc">' + esc(f.vi || f.cap) + '<small>' + esc(f.cap) + ' · WIS5 trang ' + f.p + '</small></div>'
    + '<div class="zn"><button onclick="BOOK.zoomMove(-1)">← Trước</button><span style="color:#94a3bb;align-self:center;font-size:13px">' + (ZI + 1) + '/' + ZLIST.length + '</span><button onclick="BOOK.zoomMove(1)">Sau →</button><button onclick="document.getElementById(\'bk-zoom\').remove()">✕ Đóng</button></div>';
}
function zoom(i, list){
  ZLIST = list || null;
  if (!ZLIST){ var f = FIGS[i]; ZLIST = f ? forChapter(f.ch[0]) : FIGS; if (!ZLIST.length) ZLIST = [f]; }
  ZI = Math.max(0, ZLIST.findIndex(function(x){ return x.i === i; })); zoomShow();
}
document.addEventListener('keydown', function(e){ var o = document.getElementById('bk-zoom'); if (!o) return; if (e.key === 'Escape') o.remove(); if (e.key === 'ArrowRight') BOOK.zoomMove(1); if (e.key === 'ArrowLeft') BOOK.zoomMove(-1); });
window.BOOK = {figs:FIGS, forChapter:forChapter, match:match, img:img, cap:cap, zoom:zoom, zoomMove:function(d){ if (!ZLIST) return; ZI = (ZI + d + ZLIST.length) % ZLIST.length; zoomShow(); }, words:words};

/* ---------- Tab Bài học: hình dưới mỗi ý + thư viện cuối chương ---------- */
function inject(){
  var el = document.getElementById('v-learn');
  if (!el || !el.classList.contains('on')) return;
  if (typeof CURCHAP === 'undefined' || CURCHAP === null) return;
  if (!FIGS.length || el.querySelector('.bk-sec')) return;
  var c = DATA.chapters[CURCHAP]; var all = forChapter(CURCHAP); if (!all.length) return;
  var used = {};
  el.querySelectorAll('.deep-block').forEach(function(bl, bi){
    var b = (c.deep || [])[bi]; if (!b) return;
    var text = (b.h_en || '') + ' ' + (b.body || []).map(function(p){ return p.en || ''; }).join(' ') + ' ' + (b.rows || []).map(function(r){ return r.en || ''; }).join(' ');
    var fs = match(CURCHAP, text, 2, used); if (!fs.length) return;
    fs.forEach(function(f){ used[f.i] = 1; });
    var d = document.createElement('div'); d.className = 'bk-inline';
    d.innerHTML = fs.map(function(f){ return '<div>' + img(f) + cap(f) + '</div>'; }).join('');
    var anchor = bl.querySelector('.gb-learnfig') || bl.querySelector('h4');
    if (anchor) anchor.insertAdjacentElement('afterend', d); else bl.appendChild(d);
  });
  var det = document.createElement('details'); det.className = 'card bk-sec';
  det.innerHTML = '<summary>📷 Toàn bộ hình trong giáo trình WIS5 cho chương này (' + all.length + ') — chạm để mở</summary><p class="muted" style="font-size:12.5px;margin-top:6px">Ảnh thật & hình vẽ trích từ TWI WIS5, có chú thích tiếng Việt. Chạm hình để phóng to, dùng ←/→ để lật.</p><div class="bk-grid">' + all.map(function(f){ return '<div>' + img(f) + cap(f) + '</div>'; }).join('') + '</div>';
  el.appendChild(det);
}
new MutationObserver(function(){ try{ inject(); }catch(e){} }).observe(document.body, {childList:true, subtree:true});
inject();
})();
