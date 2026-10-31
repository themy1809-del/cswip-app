/* ============================================================
   PHANTICH — 🔎 Phân tích bộ đề & học bám sát đề
   Tính trực tiếp từ HOCDE.points (711 điểm kiến thức rút từ đề):
   1) Thẻ "Đề thi ra ở đâu?" (đầu tab 📘 Học từ đề & 📖 Tài liệu thi):
      tỉ trọng theo chương, mục hỏi nhiều nhất, kiểu câu (phủ định, số
      liệu, WPS, "all of the above"), độ phủ trọng tâm của bạn.
   2) Tab 📖 Tài liệu thi: mỗi bộ đề có nút "📘 Kiến thức bộ này" (học
      các điểm kiến thức của bộ, xếp theo chương → mục); khi làm/lật thẻ
      xong hiện "📚 Kiến thức bám sát" = đoạn bài học gốc + nút học từ đề.
   3) Tab 📚 Bài học: huy hiệu "đề hỏi N lần" cạnh từng mục; danh sách
      chương hiện số câu đề thật. Giảng bài: số câu đề trong danh sách.
   Nạp SAU hocde.js, TRƯỚC nuocrut.js.
   ============================================================ */
(function(){
'use strict';
if (typeof DATA === 'undefined' || !window.HOCDE) return;
var P = HOCDE.points;
function esc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function mapKey(q){ return String(q).toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 60); }
var BYQ = {}; P.forEach(function(p){ BYQ[mapKey(p.q)] = p; });
function LS(k, d){ try{ var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } }

/* ---------- thống kê ---------- */
function stats(){
  var byCh = DATA.chapters.map(function(c, ci){ return {ci:ci, vi:c.vi, n:(HOCDE.byChapter[ci] || []).length}; }).sort(function(a, b){ return b.n - a.n; });
  var groups = []; DATA.chapters.forEach(function(c, ci){ HOCDE.groups(ci).forEach(function(g){ if (g.L) groups.push({ci:ci, ch:c.vi, li:g.li, title:g.title, en:g.en, n:g.pts.length, first:g.pts[0]}); }); });
  groups.sort(function(a, b){ return b.n - a.n; });
  var neg = P.filter(function(p){ return /\b(not|except|least|never|incorrect|false)\b/i.test(p.q); }).length;
  var wps = P.filter(function(p){ return /\bwps|drawing|work ?pack/i.test(p.q); }).length;
  var num = P.filter(function(p){ return /\d/.test(p.ans); }).length;
  var aota = P.filter(function(p){ return /^all of the above/i.test(p.ans); }).length;
  var hp = LS('cswip_hocde', {}); var learned = 0; Object.keys(hp).forEach(function(k){ if (/^\d+$/.test(k)) learned += Object.keys(hp[k].k || {}).length; });
  var top4 = byCh.slice(0, 4); var top4n = top4.reduce(function(a, x){ return a + x.n; }, 0); var top4k = top4.reduce(function(a, x){ return a + Object.keys((hp[x.ci] || {}).k || {}).length; }, 0);
  return {total:P.length, byCh:byCh, groups:groups, neg:neg, wps:wps, num:num, aota:aota, learned:learned, top4:top4, top4n:top4n, top4k:top4k, hp:hp};
}
function barColor(p){ return p >= 10 ? 'var(--red)' : p >= 6 ? 'var(--accent)' : 'var(--accent2)'; }

/* ---------- thẻ phân tích ---------- */
function analysisHTML(compact){
  var s = stats();
  var h = '<div class="card" id="pt-card" style="border-left:3px solid var(--yellow)"><h3 style="margin:0">🔎 Đề thi ra ở đâu? — phân tích ' + s.total + ' câu đề thật</h3>'
    + '<p class="muted" style="font-size:13px;margin-top:4px;line-height:1.55">Tính từ toàn bộ Tài liệu thi + ngân hàng đề CSWIP đã số hóa. Học theo tỉ trọng này là <b>bám sát đề</b>: chương nào nhiều câu học trước, mục nào hỏi lặp phải thuộc.</p>'
    + '<div class="nr-grid" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr));margin-top:10px">'
    + '<div class="nr-stat"><b style="color:var(--accent)">' + Math.round(s.top4n / s.total * 100) + '%</b><span>đề nằm ở 4 chương đầu bảng</span></div>'
    + '<div class="nr-stat"><b>' + s.num + '</b><span>câu đáp án là con số (' + Math.round(s.num / s.total * 100) + '%) → thuộc bảng số</span></div>'
    + '<div class="nr-stat"><b>' + s.wps + '</b><span>câu đọc WPS / bản vẽ → tập đọc hồ sơ</span></div>'
    + '<div class="nr-stat"><b>' + s.neg + '</b><span>câu phủ định NOT/EXCEPT → gạch chân từ khóa</span></div>'
    + '<div class="nr-stat"><b style="color:var(--green)">' + s.learned + '<small style="font-size:12px;color:var(--muted)">/' + s.total + '</small></b><span>điểm kiến thức bạn đã nắm · trọng tâm 4 chương: ' + s.top4k + '/' + s.top4n + '</span></div>'
    + '</div>';
  h += '<h4 style="margin:14px 0 6px;font-size:14px;color:var(--accent2)">Tỉ trọng theo chương <span class="muted" style="font-weight:400;font-size:12px">(bấm để học từ đề chương đó)</span></h4>';
  var maxN = s.byCh[0].n || 1;
  h += s.byCh.slice(0, compact ? 8 : 18).map(function(x){ var pct = Math.round(x.n / s.total * 100); var k = Object.keys((s.hp[x.ci] || {}).k || {}).length; return '<div class="nr-weak" style="cursor:pointer" onclick="hdStart(' + x.ci + ')"><div class="nm"><div>' + esc(x.vi) + ' <span class="muted" style="font-size:11.5px">' + x.n + ' câu · ' + pct + '%' + (k ? ' · nắm ' + k : '') + '</span></div><div class="nr-bar"><i style="width:' + Math.round(x.n / maxN * 100) + '%;background:' + barColor(pct) + '"></i></div></div><div class="pc" style="color:' + barColor(pct) + '">' + pct + '%</div></div>'; }).join('');
  h += '<h4 style="margin:14px 0 6px;font-size:14px;color:var(--accent2)">Mục bị hỏi nhiều nhất <span class="muted" style="font-weight:400;font-size:12px">(bấm để học đúng mục)</span></h4><div style="display:flex;flex-wrap:wrap;gap:6px">';
  h += s.groups.slice(0, compact ? 10 : 18).map(function(g){ var i = (HOCDE.byChapter[g.ci] || []).indexOf(g.first); return '<button class="nr-chip" style="color:var(--txt)" onclick="hdStart(' + g.ci + ');setTimeout(function(){hdJump(' + i + ')},50)"><b style="color:var(--accent)">' + g.n + '×</b> ' + esc(g.title) + ' <span class="muted">· ' + esc(g.ch.split(' (')[0].slice(0, 18)) + '</span></button>'; }).join('') + '</div>';
  h += '<details class="nr-more" style="margin-top:12px"><summary>👨‍🏫 Nhận định của thầy từ bộ đề (bấm mở)</summary><ul class="lesson" style="margin-top:8px">'
    + '<li><b>Thứ tự học đúng tỉ trọng:</b> ' + s.top4.map(function(x){ return esc(x.vi.split(' (')[0]); }).join(' → ') + '. Bốn chương này chiếm ' + Math.round(s.top4n / s.total * 100) + '% đề — đậu hay rớt quyết định ở đây.</li>'
    + '<li><b>Kiến thức hỏi lặp đi lặp lại</b> (thuộc như bảng cửu chương): chọn phương pháp NDT theo loại khuyết tật & vật liệu; inox austenit & weld decay; đọc ký hiệu que ISO 2560-A / AWS E7018; phạm vi qualify thợ ISO 9606-1; tôi & ram; công thức heat input và hệ quả cao/thấp; nguyên lý MPI; tiền nhiệt đo ở đâu, khi nào.</li>'
    + '<li><b>' + s.num + ' câu có đáp án là con số</b>: nhiệt độ sấy que, H5/H10/H15, 27 J, 4t uốn, 350/380 HV, 723 °C, 550–650 °C PWHT, 75 mm đo tiền nhiệt, lux VT, OCV… → dùng bước "🔢 Phải thuộc" trong 🎙️ Giảng bài mỗi chương.</li>'
    + '<li><b>' + s.wps + ' câu bắt đọc WPS/bản vẽ</b>: đề Work Pack không hỏi lý thuyết suông mà hỏi "theo WPS này thì…". Tập đọc ở 📎 Hồ sơ Work Pack mẫu: tìm ô dữ liệu đúng trước khi đọc câu hỏi.</li>'
    + '<li><b>"All of the above" là đáp án đúng ' + s.aota + ' lần</b> trong bộ này: khi thấy 3 phương án đều hợp lý, đừng cố loại — đó thường là câu "gom".</li>'
    + '<li><b>' + s.neg + ' câu phủ định</b> (NOT, EXCEPT, LEAST): đọc lại câu với từ đó; sai ở đây là sai oan.</li>'
    + '<li><b>Câu chuỗi "with reference to the previous answer"</b> (Leading Questions): sai câu đầu là mất cả câu sau → với câu đầu phải chắc 100%, nên 📘 Học từ đề đã ghép ngữ cảnh câu trước cho bạn.</li>'
    + '</ul></details></div>';
  return h;
}
window.ptAnalysisHTML = analysisHTML;

/* ---------- chèn vào các tab ---------- */
function injectHocde(){
  var el = document.getElementById('v-hocde'); if (!el || !el.classList.contains('on')) return;
  var first = el.querySelector('.hd-wrap > .card'); if (!first || el.querySelector('#pt-card')) return;
  if (!/Học từ đề thi/.test(first.textContent)) return; // chỉ ở màn danh sách
  first.insertAdjacentHTML('afterend', analysisHTML(false));
}
function injectThi(){
  var el = document.getElementById('v-thi'); if (!el || !el.classList.contains('on')) return;
  var cards = el.querySelectorAll('.thi-card');
  // a) menu: thẻ phân tích + nút kiến thức bộ này
  var mh2 = cards.length ? cards[0].querySelector('h2') : null; var isMenu = !!(mh2 && /^📖/.test(mh2.textContent.trim()));
  if (isMenu && !el.querySelector('#pt-card')){
    var d = document.createElement('div'); d.innerHTML = analysisHTML(true); var card = d.firstChild; card.className = 'thi-card'; card.style.borderLeft = '3px solid var(--yellow)';
    (el.querySelector('#wp-card') || cards[0]).insertAdjacentElement('afterend', card);
  }
  cards.forEach(function(c){
    if (c.querySelector('.pt-setbtn')) return;
    var row = c.querySelector('.thi-row'); var b = row && row.querySelector('button[onclick*="THI.learn"]'); if (!b) return;
    var m = /THI\.learn\('([^']+)'\)/.exec(b.getAttribute('onclick')); if (!m) return;
    var label = ({wp1:'Work Pack 1', wp2:'Work Pack 2', wptwi:'Work Pack TWI', lead:'Leading Q', ring:'WPS Rings', fb:'Điền khuyết', dd:'Kéo-thả', c21:'Hỏi đáp 2.1', c22:'Kinh nghiệm 2.2', c23:'Hỏi đáp 2.3'})[m[1]]; if (!label) return;
    var n = P.filter(function(p){ return p.src === label; }).length; if (!n) return;
    var nb = document.createElement('button'); nb.className = 'btn sec pt-setbtn'; nb.innerHTML = '📘 Kiến thức bộ này (' + n + ')'; nb.title = 'Học các điểm kiến thức của bộ đề này, xếp theo chương → mục bài học';
    nb.onclick = function(){ hdStartSet(label); }; row.appendChild(nb);
  });
  // b) đang học/làm: kiến thức bám sát dưới câu đã trả lời / đã lật
  cards.forEach(function(c){
    var qEl = c.querySelector('.thi-q'); if (!qEl || c.querySelector('.pt-ctx')) return;
    var answered = c.querySelector('.thi-opt.ok, .thi-opt.bad, .thi-a'); if (!answered) return;
    var p = BYQ[mapKey(qEl.textContent)]; if (!p) return;
    var L = p.li >= 0 ? DATA.chapters[p.ci].lessons[p.li] : null; var ch = DATA.chapters[p.ci];
    var box = document.createElement('div'); box.className = 'pt-ctx';
    box.style.cssText = 'margin-top:10px;padding:10px 12px;border-radius:12px;background:rgba(52,199,89,.07);border:1px solid rgba(52,199,89,.3);font-size:13.5px;line-height:1.55';
    box.innerHTML = '📚 <b style="color:var(--green)">Kiến thức bám sát</b> <span class="thi-muted">· ' + esc(ch.vi) + (L ? ' → ' + esc(L.t_vi) : '') + '</span>'
      + (L ? '<div style="margin-top:4px"><b>' + esc(L.t_vi) + (L.t_en ? ' (' + esc(L.t_en) + ')' : '') + ':</b> ' + esc(L.vi) + '</div>' : '<div class="thi-muted" style="margin-top:4px">Điểm này nằm ngoài tóm tắt chương — nhớ như kiến thức bổ sung của đề.</div>')
      + '<div class="thi-row" style="margin-top:8px"><button class="btn sec" style="padding:7px 12px;font-size:12.5px" onclick="hdJumpTo(' + JSON.stringify(p.id).replace(/"/g, '&quot;') + ')">📘 Học mục này từ đề</button>' + (window.gbStart ? '<button class="btn ghost" style="padding:7px 12px;font-size:12.5px" onclick="gbStart(' + p.ci + ')">🎙️ Nghe giảng chương</button>' : '') + '</div>';
    var exp = c.querySelector('.thi-exp'); var link = c.querySelector('.thi-lessonlink');
    (link || exp || answered.parentNode === c ? c : c).appendChild(box);
  });
}
function injectLearn(){
  var el = document.getElementById('v-learn'); if (!el || !el.classList.contains('on')) return;
  if (typeof CURCHAP === 'undefined') return;
  if (CURCHAP === null){
    el.querySelectorAll('.chap').forEach(function(card, ci){ if (card.querySelector('.pt-b')) return; var n = (HOCDE.byChapter[ci] || []).length; var m = card.querySelector('.meta .muted'); if (!m || !n) return; m.insertAdjacentHTML('beforeend', ' · <span class="pt-b" style="color:var(--yellow)">🎯 đề ' + n + ' câu</span>'); });
    return;
  }
  if (el.querySelector('.pt-li')) return;
  var pts = HOCDE.byChapter[CURCHAP] || []; if (!pts.length) return;
  var cnt = {}; pts.forEach(function(p){ if (p.li >= 0) cnt[p.li] = (cnt[p.li] || 0) + 1; });
  var lists = el.querySelectorAll('ul.lesson'); var target = null;
  lists.forEach(function(ul){ if (target) return; var c = DATA.chapters[CURCHAP]; var first = ul.querySelector('li .term'); if (first && c.lessons[0] && first.textContent.indexOf(c.lessons[0].t_vi) === 0) target = ul; });
  if (!target) return;
  target.querySelectorAll(':scope > li').forEach(function(li, idx){ var n = cnt[idx]; if (!n) return; var first = pts.findIndex(function(p){ return p.li === idx; }); li.insertAdjacentHTML('beforeend', ' <button class="pt-li" title="Đề thi đã hỏi mục này ' + n + ' lần — bấm để học từ đề" onclick="hdStart(' + CURCHAP + ');setTimeout(function(){hdJump(' + first + ')},50)" style="background:rgba(255,214,10,.12);border:1px solid rgba(255,214,10,.4);color:var(--yellow);border-radius:10px;padding:1px 8px;font-size:11px;cursor:pointer;font-family:inherit;margin-left:6px">🎯 đề ' + n + '×</button>'); });
}
function injectTeach(){
  var el = document.getElementById('v-teach'); if (!el || !el.classList.contains('on')) return;
  el.querySelectorAll('.gb-list .chap').forEach(function(card){ if (card.querySelector('.pt-b')) return; var oc = card.getAttribute('onclick') || ''; var m = /gbStart\((\d+)\)/.exec(oc); if (!m) return; var n = (HOCDE.byChapter[+m[1]] || []).length; var mu = card.querySelector('.meta .muted'); if (mu && n) mu.insertAdjacentHTML('beforeend', ' · <span class="pt-b" style="color:var(--yellow)">🎯 đề ' + n + ' câu</span>'); });
}
new MutationObserver(function(){ try{ injectHocde(); injectThi(); injectLearn(); injectTeach(); }catch(e){} }).observe(document.body, {childList:true, subtree:true});
try{ injectHocde(); injectThi(); injectLearn(); injectTeach(); }catch(e){}
})();
