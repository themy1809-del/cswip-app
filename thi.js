/* ============================================================
   TAB "TÀI LIỆU THI" — Học thuộc (lật thẻ) + Luyện tập (trắc nghiệm)
   Chạm vào thẻ để xem đáp án; nút 💡 Giải nghĩa dịch & giải thích tiếng Việt.
   ============================================================ */
(function(){
  var SETS=[];
  ['THI_WP1','THI_WP2','THI_LEAD','THI_RING','THI_FB','THI_DD','THI_C21','THI_C22','THI_C23'].forEach(function(k){ if(window[k]) SETS.push(window[k]); });
  if(!SETS.length) return;

  var P={}; try{ P=JSON.parse(localStorage.getItem('THIP')||'{}'); }catch(e){}
  function saveP(){ try{ localStorage.setItem('THIP',JSON.stringify(P)); }catch(e){} }
  function st(id){ if(!P[id])P[id]={i:0,right:0,wrong:0,done:0}; return P[id]; }
  function pro(){ return (typeof isPremium==='function')?isPremium():true; }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }

  var MODE='menu', SET=null, IDX=0, FLIP=false, EXP=false, QORD=null, QI=0, QANS=null, QRIGHT=0, QWRONG=[];

  /* ---------- đăng ký tab ---------- */
  function addTab(){
    if(document.getElementById('v-thi')) return;
    var main=document.querySelector('#v-home')&&document.querySelector('#v-home').parentNode;
    if(!main) return;
    var d=document.createElement('div'); d.id='v-thi'; d.className='view'; main.appendChild(d);
    if(typeof TABS!=='undefined'&&typeof buildNav==='function'){
      var has=false; for(var i=0;i<TABS.length;i++) if(TABS[i][0]==='thi') has=true;
      if(!has){ TABS.splice(4,0,['thi','📖 Tài liệu thi']); buildNav(); if(typeof CUR!=='undefined') { var bs=document.querySelectorAll('#nav button'); for(var j=0;j<bs.length;j++) bs[j].classList.toggle('on',bs[j].dataset.t===CUR); } }
    }
    if(typeof renderAll==='function' && !window._thiWrapped){
      var orig=window.renderAll; window.renderAll=function(){ orig(); try{ if(typeof CUR!=='undefined'&&CUR==='thi') renderThi(); }catch(e){} };
      window._thiWrapped=true;
    }
    var css='.thi-card{background:var(--card,#151c2c);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:16px;margin-bottom:12px}'
      +'.thi-flash{min-height:190px;border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:18px;cursor:pointer;background:rgba(255,255,255,.03)}'
      +'.thi-q{font-size:16px;font-weight:700;line-height:1.45}'
      +'.thi-a{margin-top:12px;padding-top:12px;border-top:1px dashed rgba(255,255,255,.2);color:#7ee787;font-weight:700;line-height:1.45}'
      +'.thi-exp{margin-top:10px;background:rgba(76,168,255,.08);border:1px solid rgba(76,168,255,.25);border-radius:12px;padding:12px;font-size:14px;line-height:1.55}'
      +'.thi-exp .vq{color:#ffd166;font-weight:700}.thi-exp .va{margin-top:6px;color:#dbe7ff}.thi-exp .nn{margin-top:6px;color:#ff9f7f;font-size:12.5px}'
      +'.thi-opt{display:block;width:100%;text-align:left;margin-top:8px;padding:11px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:inherit;font-size:14.5px;cursor:pointer;line-height:1.4}'
      +'.thi-opt.ok{border-color:#2ea043;background:rgba(46,160,67,.18)}'
      +'.thi-opt.bad{border-color:#f85149;background:rgba(248,81,73,.16)}'
      +'.thi-muted{color:#94a3bb;font-size:12.5px}'
      +'.thi-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}'
      +'.thi-tag{font-size:11px;background:rgba(255,255,255,.08);padding:2px 8px;border-radius:99px;margin-left:6px}';
    var s=document.createElement('style'); s.textContent=css; document.head.appendChild(s);
  }

  /* ---------- MENU ---------- */
  function menu(){
    var el=document.getElementById('v-thi'); if(!el)return;
    var total=0; SETS.forEach(function(s){ total+=s.items.length; });
    var h='<div class="thi-card"><h2>📖 '+((typeof bili==='function')?bili('Tài liệu thi tháng 9 — học thuộc & luyện tập','September exam pack'):'Tài liệu thi')+'</h2>'
      +'<p class="thi-muted" style="margin-top:6px">Số hóa từ bộ tài liệu bạn cung cấp ('+total+' mục): đề Work Pack có đáp án gốc, Leading Questions, WPS Rings, điền khuyết và toàn bộ ghi chú kinh nghiệm thi. Chạm thẻ để xem đáp án, chạm 💡 để xem dịch & giải nghĩa từng câu.</p>'
      +(pro()?'':'<p class="thi-muted" style="margin-top:6px">🔒 Bản miễn phí xem 5 mục đầu mỗi phần — mở khóa PRO để học toàn bộ.</p>')
      +'</div>';
    SETS.forEach(function(s){
      var p=st(s.id);
      var mcq=s.type==='mcq';
      h+='<div class="thi-card"><div style="display:flex;align-items:center;gap:10px"><div style="font-size:26px">'+s.icon+'</div><div style="flex:1"><b>'+esc(s.vi)+'</b><span class="thi-tag">'+s.items.length+' câu</span>'
        +(mcq?'<span class="thi-tag">trắc nghiệm</span>':'<span class="thi-tag">hỏi–đáp</span>')
        +(p.done?('<div class="thi-muted">Luyện đúng '+p.right+' / sai '+p.wrong+'</div>'):'')
        +'</div></div>'
        +'<div class="thi-row">'
        +'<button class="btn" onclick="THI.learn(\''+s.id+'\')">🃏 Học thuộc</button>'
        +(mcq?'<button class="btn sec" onclick="THI.quiz(\''+s.id+'\')">📝 Làm bài</button>':'')
        +'</div></div>';
    });
    el.innerHTML=h;
  }

  function getSet(id){ for(var i=0;i<SETS.length;i++) if(SETS[i].id===id) return SETS[i]; return null; }
  function lim(s){ return pro()? s.items.length : Math.min(5,s.items.length); }
  function lockCard(){ return '<div class="thi-card" style="text-align:center"><p>🔒 Hết phần xem thử. Mở khóa <b>PRO</b> để học trọn bộ tài liệu thi.</p><div class="thi-row" style="justify-content:center"><button class="btn" onclick="go(\'profile\')">⭐ Mở khóa PRO</button></div></div>'; }

  /* ---------- HỌC THUỘC ---------- */
  function learn(id){ SET=getSet(id); if(!SET)return; MODE='learn'; IDX=Math.min(st(id).i,lim(SET)-1); FLIP=false; EXP=false; render(); }
  function renderLearn(){
    var el=document.getElementById('v-thi'), n=lim(SET), it=SET.items[IDX];
    var locked = IDX>=n;
    var optHtml='';
    if(SET.type==='mcq'&&it.o){ optHtml=it.o.map(function(o,i){ var cls=(FLIP&&i===it.a)?' ok':''; return '<div class="thi-opt'+cls+'" style="cursor:default">'+String.fromCharCode(97+i)+') '+esc(o)+(FLIP&&i===it.a?' ✓':'')+'</div>'; }).join(''); }
    var ans = SET.type==='mcq' ? (String.fromCharCode(97+it.a)+') '+it.o[it.a]) : it.a;
    var h='<div class="thi-card"><button class="back" onclick="THI.back()">← Danh sách</button>'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px"><b>'+SET.icon+' '+esc(SET.vi)+'</b><span class="thi-muted">'+(IDX+1)+' / '+n+(pro()?'':' (thử)')+'</span></div></div>';
    if(locked){ h+=lockCard(); el.innerHTML=h; return; }
    h+='<div class="thi-card">'
      +'<div class="thi-flash" onclick="THI.flip()">'
      +'<div class="thi-q">'+esc(it.q)+'</div>'
      +optHtml
      +(FLIP?('<div class="thi-a">✅ '+esc(ans)+'</div>'):'<div class="thi-muted" style="margin-top:12px">👆 Chạm để xem đáp án</div>')
      +'</div>'
      +(FLIP?('<div class="thi-row"><button class="btn sec" onclick="THI.exp()">💡 '+(EXP?'Ẩn giải nghĩa':'Giải nghĩa (VI)')+'</button></div>'):'')
      +(EXP&&FLIP?expBox(it):'')
      +'<div class="thi-row">'
      +'<button class="btn sec" onclick="THI.mv(-1)">← Trước</button>'
      +'<button class="btn sec" onclick="THI.shuffle()">🔀 Trộn</button>'
      +'<button class="btn" onclick="THI.mv(1)">Sau →</button>'
      +'</div></div>';
    el.innerHTML=h; window.scrollTo(0,0);
  }
  function expBox(it){
    var h='<div class="thi-exp">';
    if(it.vq) h+='<div class="vq">🇻🇳 '+esc(it.vq)+'</div>';
    if(it.va) h+='<div class="va">'+esc(it.va)+'</div>';
    if(it.n)  h+='<div class="nn">⚠️ '+esc(it.n)+'</div>';
    return h+'</div>';
  }

  /* ---------- LÀM BÀI ---------- */
  function quiz(id){ SET=getSet(id); if(!SET||SET.type!=='mcq')return; MODE='quiz';
    var n=lim(SET); QORD=[]; for(var i=0;i<n;i++)QORD.push(i);
    for(var j=QORD.length-1;j>0;j--){ var k=Math.floor(Math.random()*(j+1)); var t=QORD[j];QORD[j]=QORD[k];QORD[k]=t; }
    QI=0; QANS=null; QRIGHT=0; QWRONG=[]; EXP=false; render(); }
  function renderQuizThi(){
    var el=document.getElementById('v-thi');
    var h='<div class="thi-card"><button class="back" onclick="THI.back()">← Danh sách</button>'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px"><b>'+SET.icon+' '+esc(SET.vi)+'</b><span class="thi-muted">Câu '+(Math.min(QI+1,QORD.length))+' / '+QORD.length+' · ✅ '+QRIGHT+'</span></div></div>';
    if(QI>=QORD.length){
      var pc=Math.round(QRIGHT/QORD.length*100);
      var p=st(SET.id); p.done=(p.done||0)+1; p.right+=QRIGHT; p.wrong+=QWRONG.length; saveP();
      h+='<div class="thi-card" style="text-align:center"><h2>'+(pc>=70?'🎉':'💪')+' '+pc+'%</h2>'
        +'<p class="thi-muted">Đúng '+QRIGHT+'/'+QORD.length+' — '+(pc>=70?'ĐẠT mốc 70% như đề thật!':'Chưa đạt 70%, luyện tiếp nhé!')+'</p>'
        +'<div class="thi-row" style="justify-content:center">'
        +(QWRONG.length?'<button class="btn" onclick="THI.retryWrong()">🔁 Làm lại '+QWRONG.length+' câu sai</button>':'')
        +'<button class="btn sec" onclick="THI.quiz(\''+SET.id+'\')">Làm lại từ đầu</button>'
        +'<button class="btn sec" onclick="THI.back()">Về danh sách</button>'
        +'</div></div>';
      el.innerHTML=h; window.scrollTo(0,0); return;
    }
    var it=SET.items[QORD[QI]];
    h+='<div class="thi-card"><div class="thi-q">'+esc(it.q)+'</div>'
      +it.o.map(function(o,i){
        var cls='';
        if(QANS!==null){ if(i===it.a)cls=' ok'; else if(i===QANS)cls=' bad'; }
        return '<button class="thi-opt'+cls+'" '+(QANS===null?('onclick="THI.pick('+i+')"'):'disabled')+'>'+String.fromCharCode(97+i)+') '+esc(o)+'</button>';
      }).join('')
      +(QANS!==null?('<div class="thi-row"><button class="btn sec" onclick="THI.exp()">💡 '+(EXP?'Ẩn giải nghĩa':'Giải nghĩa (VI)')+'</button><button class="btn" onclick="THI.next()">'+(QI+1>=QORD.length?'Xem kết quả':'Câu tiếp')+' →</button></div>'):'')
      +(EXP&&QANS!==null?expBox(it):'')
      +'</div>';
    el.innerHTML=h; window.scrollTo(0,0);
  }

  /* ---------- API ---------- */
  window.THI={
    learn:learn, quiz:quiz,
    back:function(){ MODE='menu'; render(); },
    flip:function(){ FLIP=!FLIP; if(!FLIP)EXP=false; render(); },
    exp:function(){ EXP=!EXP; render(); },
    mv:function(d){ var n=lim(SET); IDX=(IDX+d+n)%n; FLIP=false; EXP=false; st(SET.id).i=IDX; saveP(); render(); },
    shuffle:function(){ var n=lim(SET); IDX=Math.floor(Math.random()*n); FLIP=false; EXP=false; render(); },
    pick:function(i){ if(QANS!==null)return; QANS=i; var it=SET.items[QORD[QI]]; if(i===it.a)QRIGHT++; else QWRONG.push(QORD[QI]); render(); },
    next:function(){ QI++; QANS=null; EXP=false; render(); },
    retryWrong:function(){ QORD=QWRONG.slice(); QWRONG=[]; QI=0; QANS=null; QRIGHT=0; EXP=false; render(); }
  };
  function render(){ if(MODE==='menu')menu(); else if(MODE==='learn')renderLearn(); else renderQuizThi(); }
  window.renderThi=render;

  if(document.body) addTab(); else window.addEventListener('load', addTab);
})();
