/* ============================================================
   NANGCAP — (1) Flashcard 502 thuật ngữ từ điển + nút phát âm
             (2) Thẻ "Hôm nay học gì?" + đếm ngược ngày thi
   ============================================================ */
(function(){
'use strict';

/* ---------- (1) FLASHCARD: thêm bộ từ điển + phát âm ---------- */
function nSpeak(t){
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'en-GB'; u.rate = 0.92;
    speechSynthesis.speak(u);
  }catch(e){}
}
window.nSpeak = nSpeak;

const origBuild = window.buildFlash;
window.buildFlash = function(){
  origBuild();
  if (window.GLOSSARY){
    const have = new Set(FC.map(c => String(c.q).toLowerCase()));
    for (const k of Object.keys(GLOSSARY)){
      if (k.length < 3 || have.has(k)) continue;
      FC.push({q:k, a:GLOSSARY[k], c:'📖 Từ điển thuật ngữ'});
    }
  }
};

const origFlash = window.renderFlash;
window.renderFlash = function(){
  origFlash();
  const front = document.querySelector('#v-flash .flash-front');
  const card = FC[FCi];
  if (front && card){
    const b = document.createElement('button');
    b.textContent = '🔊';
    b.title = 'Đọc tiếng Anh';
    b.style.cssText = 'position:absolute;top:10px;right:12px;background:none;border:1px solid var(--line,#2a3550);color:var(--accent2,#4ca8ff);border-radius:10px;padding:4px 10px;font-size:16px;cursor:pointer';
    b.addEventListener('click', function(e){ e.stopPropagation(); nSpeak(card.q); });
    front.appendChild(b);
  }
};
if (typeof FC !== 'undefined' && FC.length){ FC.length = 0; } // ép build lại kèm từ điển

/* ---------- (2) HÔM NAY HỌC GÌ + ĐẾM NGƯỢC ---------- */
function examDate(){ const v = localStorage.getItem('cswip_exam_date'); return v ? new Date(v + 'T09:00:00') : null; }
window.setExamDate = function(v){ if(v){ localStorage.setItem('cswip_exam_date', v); renderAll(); } };
window.clearExamDate = function(){ localStorage.removeItem('cswip_exam_date'); renderAll(); };

function daysLeft(d){ return Math.ceil((d - new Date()) / 86400000); }

function todayPlan(days){
  /* Lộ trình 12 tuần tính ngược từ ngày thi (84 ngày). */
  if (days > 84) return {ph:'Chuẩn bị', vi:'Còn xa ngày thi — học nền tảng thoải mái: mỗi 2 ngày đọc 1 chương (🎓 trước, bài học sau) + làm quiz chương đó.'};
  const week = Math.ceil((85 - days) / 7); // tuần 1..12
  if (week <= 4){
    const chapOrder = [4,1,6,7,2,8,9,5,3,11,10,15,0,12,13,14,16,17];
    const dayInPhase = 28 - (days - 56);
    const ci = chapOrder[Math.min(Math.floor(dayInPhase/1.6), 17)];
    const cname = (typeof DATA!=='undefined' && DATA.chapters[ci]) ? DATA.chapters[ci].vi : '';
    return {ph:'Tuần '+week+'/12 — Nền tảng', vi:'Hôm nay: đọc chương "'+cname+'" (đọc mục 🎓 Giảng giải trước, bài học sau) rồi làm quiz chương này. Sai câu nào bấm "Ôn bài liên quan".'};
  }
  if (week <= 8) return {ph:'Tuần '+week+'/12 — Cày đề', vi:'Hôm nay: ~25 câu trong Tài liệu thi (chọn đáp án bằng tiếng Anh TRƯỚC, xem dịch sau). Chủ nhật thì chỉ mở 🧠 Học thông minh ôn câu sai.'};
  if (week <= 11) return {ph:'Tuần '+week+'/12 — Thi thử', vi:'Tuần này 2 đề thi thử bấm giờ (mục tiêu ≥70%). Hôm nay: 1 đề mock HOẶC luyện điểm yếu. Hạn chế dùng nút dịch — phòng thi không có.'};
  return {ph:'Tuần 12 — Chốt', vi:'Chỉ ôn câu từng sai + bảng thuộc lòng (tư thế PA–PG, ký hiệu que, chọn NDT). 2 ngày cuối KHÔNG học gì mới, ngủ đủ.'};
}

function injectToday(){
  const el = document.getElementById('v-home');
  if (!el || !el.classList.contains('on') || el.querySelector('#todayCard')) return;
  if (!el.firstChild) return;
  const d = examDate();
  const w = document.createElement('div');
  w.className = 'card'; w.id = 'todayCard';
  w.style.borderLeft = '3px solid var(--accent,#ff7a33)';
  if (!d){
    w.innerHTML = '<h2>🗓️ Ngày thi của bạn?</h2><p class="muted" style="margin:8px 0">Đặt ngày thi để app đếm ngược và gợi ý việc học mỗi ngày theo lộ trình 12 tuần.</p>'
      + '<input type="date" id="examDateInp" style="background:var(--panel2,#1b2334);border:1px solid var(--line,#2a3550);color:var(--txt,#eaeff7);border-radius:10px;padding:9px 12px;font-size:14px"> '
      + '<button class="btn" onclick="setExamDate(document.getElementById(\'examDateInp\').value)">Lưu</button>';
  } else {
    const days = daysLeft(d);
    const p = todayPlan(days);
    const dd = ('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear();
    w.innerHTML = '<div class="row" style="justify-content:space-between;align-items:center">'
      + '<h2>⏳ Còn <span style="color:var(--accent,#ff7a33)">'+days+'</span> ngày đến kỳ thi</h2>'
      + '<span class="pill">'+dd+'</span></div>'
      + '<p style="margin:8px 0 4px"><b style="color:var(--accent2,#4ca8ff)">'+p.ph+'</b></p>'
      + '<p style="line-height:1.6">'+p.vi+'</p>'
      + '<div class="row" style="margin-top:10px">'
      + '<button class="btn" onclick="go(\'thi\')">📖 Tài liệu thi</button>'
      + '<button class="btn sec" onclick="go(\'learn\')">📚 Bài học</button>'
      + '<button class="btn sec" onclick="go(\'quiz\')">🧠 Quiz</button>'
      + '<a href="#" onclick="clearExamDate();return false" style="margin-left:auto;font-size:11.5px;color:var(--muted,#94a3bb);align-self:center">đổi ngày thi</a>'
      + '</div>';
  }
  el.insertBefore(w, el.firstChild);
}
new MutationObserver(injectToday).observe(document.body, {childList:true, subtree:true});
injectToday();
})();
