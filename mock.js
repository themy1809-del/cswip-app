/* ============================================================
   TAB "THI THỬ" — mô phỏng kỳ thi CSWIP 3.1 (2026): 3 phần
   Phần 1: 80 câu / 120 phút · Phần 2: 40 câu / 90 phút · Phần 3: 24 câu / 90 phút
   Mỗi lần thi rút đề NGẪU NHIÊN từ ngân hàng "Tài liệu thi" — thi lại vô hạn.
   Có đồng hồ đếm ngược, tô cờ xem lại, nộp bài, chấm 70%, lưu lịch sử điểm.
   ============================================================ */
(function(){
  function pool(names){ var out=[]; names.forEach(function(k){ var s=window[k]; if(s&&s.items) s.items.forEach(function(it){ if(it.o&&typeof it.a==='number') out.push(it); }); }); return out; }
  function P1(){ return pool(['THI_LEAD','THI_RING','THI_FB']); }
  function P2(){ return pool(['THI_WP1','THI_WP2']); }
  function P3(){ return pool(['THI_WP1','THI_WP2','THI_LEAD','THI_RING','THI_FB']); }

  var PAPERS=[
    {id:'p1', icon:'1️⃣', vi:'Phần 1 — Lý thuyết tổng quát', n:80, min:120, pool:P1, note:'Leading Questions + WPS Rings + điền khuyết'},
    {id:'p2', icon:'2️⃣', vi:'Phần 2 — Work Pack (WPS/bản vẽ)', n:40, min:90, pool:P2, note:'Rút từ 2 đề Work Pack thật có đáp án'},
    {id:'p3', icon:'3️⃣', vi:'Phần 3 — Tổng hợp', n:24, min:90, pool:P3, note:'Trộn toàn bộ ngân hàng (mô phỏng phần 3)'}
  ];

  var H=[]; try{ H=JSON.parse(localStorage.getItem('MOCKH')||'[]'); }catch(e){}
  function saveH(){ try{ localStorage.setItem('MOCKH',JSON.stringify(H.slice(-50))); }catch(e){} }
  function pro(){ return (typeof isPremium==='function')?isPremium():true; }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }

  var MODE='menu', PAPER=null, QS=[], ANS=[], FLAG=[], QI=0, LEFT=0, TIMER=null, RESULT=null, REVIEW=false;

  function addTab(){
    if(document.getElementById('v-mock')) return;
    var main=document.querySelector('#v-home')&&document.querySelector('#v-home').parentNode;
    if(!main) return;
    var d=document.createElement('div'); d.id='v-mock'; d.className='view'; main.appendChild(d);
    if(typeof TABS!=='undefined'&&typeof buildNav==='function'){
      var has=false,pos=4; for(var i=0;i<TABS.length;i++){ if(TABS[i][0]==='mock')has=true; if(TABS[i][0]==='thi')pos=i+1; }
      if(!has){ TABS.splice(pos,0,['mock','🎓 Thi thử']); buildNav(); var bs=document.querySelectorAll('#nav button'); for(var j=0;j<bs.length;j++) bs[j].classList.toggle('on',bs[j].dataset.t===(typeof CUR!=='undefined'?CUR:'home')); }
    }
    if(typeof renderAll==='function' && !window._mockWrapped){
      var orig=window.renderAll; window.renderAll=function(){ orig(); try{ if(typeof CUR!=='undefined'&&CUR==='mock') renderMock(); }catch(e){} };
      window._mockWrapped=true;
    }
    var css='.mk-card{background:var(--card,#151c2c);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:16px;margin-bottom:12px}'
      +'.mk-timer{position:sticky;top:0;z-index:50;display:flex;justify-content:space-between;align-items:center;background:rgba(11,15,23,.97);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:10px 14px;margin-bottom:12px}'
      +'.mk-timer b.warn{color:#f85149}'
      +'.mk-q{font-size:16px;font-weight:700;line-height:1.45}'
      +'.mk-opt{display:block;width:100%;text-align:left;margin-top:8px;padding:11px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:inherit;font-size:14.5px;cursor:pointer;line-height:1.4}'
      +'.mk-opt.sel{border-color:#4ca8ff;background:rgba(76,168,255,.16)}'
      +'.mk-opt.ok{border-color:#2ea043;background:rgba(46,160,67,.18)}'
      +'.mk-opt.bad{border-color:#f85149;background:rgba(248,81,73,.16)}'
      +'.mk-grid{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}'
      +'.mk-cell{width:38px;height:34px;border-radius:9px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:inherit;font-size:12.5px;font-weight:700;cursor:pointer}'
      +'.mk-cell.done{background:rgba(76,168,255,.22);border-color:#4ca8ff}'
      +'.mk-cell.flag{background:rgba(255,209,102,.22);border-color:#ffd166}'
      +'.mk-cell.cur{outline:2px solid #fff}'
      +'.mk-muted{color:#94a3bb;font-size:12.5px}'
      +'.mk-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}'
      +'.mk-exp{margin-top:10px;background:rgba(76,168,255,.08);border:1px solid rgba(76,168,255,.25);border-radius:12px;padding:12px;font-size:14px;line-height:1.55}'
      +'.mk-exp .vq{color:#ffd166;font-weight:700}.mk-exp .va{margin-top:6px;color:#dbe7ff}.mk-exp .nn{margin-top:6px;color:#ff9f7f;font-size:12.5px}';
    var s=document.createElement('style'); s.textContent=css; document.head.appendChild(s);
    setInterval(function(){ if(TIMER&&typeof CUR!=='undefined'&&CUR!=='mock'&&MODE!=='exam'){ } },5000);
  }

  function fmt(sec){ var m=Math.floor(sec/60),s=sec%60; return (m<10?'0':'')+m+':'+(s<10?'0':'')+s; }

  /* ---------- MENU ---------- */
  function menu(){
    var el=document.getElementById('v-mock'); if(!el)return;
    var h='<div class="mk-card"><h2>🎓 Thi thử CSWIP 3.1 — như thi thật 2026</h2>'
      +'<p class="mk-muted" style="margin-top:6px">Kỳ thi 2026 gồm 3 phần: <b>80 câu/120′ · 40 câu/90′ · 24 câu/90′</b>. Mỗi lần bấm thi, app rút đề <b>ngẫu nhiên mới</b> từ ngân hàng tài liệu — thi đi thi lại thoải mái. Có đồng hồ đếm ngược, hết giờ tự nộp; đậu từ <b>70%</b>. Nộp xong xem lại từng câu sai kèm giải nghĩa tiếng Việt.</p>'
      +(pro()?'':'<p class="mk-muted">🔒 Bản miễn phí: mỗi phần rút gọn 8 câu / 12 phút. Mở khóa PRO để thi bản đầy đủ.</p>')+'</div>';
    PAPERS.forEach(function(p){
      var bank=p.pool().length;
      var best=null,count=0;
      H.forEach(function(x){ if(x.id===p.id){ count++; if(best===null||x.pc>best)best=x.pc; } });
      h+='<div class="mk-card"><div style="display:flex;align-items:center;gap:10px"><div style="font-size:26px">'+p.icon+'</div><div style="flex:1"><b>'+esc(p.vi)+'</b>'
        +'<div class="mk-muted">'+p.n+' câu · '+p.min+' phút · ngân hàng '+bank+' câu ('+esc(p.note)+')'
        +(count?(' · đã thi '+count+' lần · cao nhất <b style="color:'+(best>=70?'#7ee787':'#ffd166')+'">'+best+'%</b>'):'')+'</div></div></div>'
        +'<div class="mk-row"><button class="btn" onclick="MOCK.start(\''+p.id+'\')">▶️ Vào thi</button></div></div>';
    });
    if(H.length){
      h+='<div class="mk-card"><b>📜 Lịch sử thi ('+H.length+' lần gần nhất)</b>';
      H.slice().reverse().slice(0,12).forEach(function(x){
        var p=PAPERS.filter(function(q){return q.id===x.id})[0];
        h+='<div class="mk-muted" style="margin-top:6px;border-top:1px dashed rgba(255,255,255,.1);padding-top:6px">'+(p?p.icon:'')+' '+esc(x.d)+' — <b style="color:'+(x.pc>=70?'#7ee787':'#f85149')+'">'+x.pc+'%</b> ('+x.r+'/'+x.n+') '+(x.pc>=70?'✅ ĐẬU':'❌ Rớt')+'</div>';
      });
      h+='<div class="mk-row"><button class="btn sec" onclick="MOCK.clearH()">🗑 Xóa lịch sử</button></div></div>';
    }
    el.innerHTML=h;
  }

  /* ---------- EXAM ---------- */
  function start(id){
    PAPER=PAPERS.filter(function(p){return p.id===id})[0]; if(!PAPER)return;
    var bank=PAPER.pool().slice();
    for(var j=bank.length-1;j>0;j--){ var k=Math.floor(Math.random()*(j+1)); var t=bank[j];bank[j]=bank[k];bank[k]=t; }
    var n=pro()?Math.min(PAPER.n,bank.length):8;
    var min=pro()?PAPER.min:12;
    QS=bank.slice(0,n); ANS=new Array(n).fill(null); FLAG=new Array(n).fill(false);
    QI=0; LEFT=min*60; RESULT=null; REVIEW=false; MODE='exam';
    if(TIMER)clearInterval(TIMER);
    TIMER=setInterval(function(){
      if(typeof CUR!=='undefined'&&CUR!=='mock'){ return; }
      if(MODE!=='exam'){ clearInterval(TIMER);TIMER=null;return; }
      LEFT--;
      var t=document.getElementById('mk-left');
      if(t){ t.textContent=fmt(LEFT); t.className=LEFT<=300?'warn':''; }
      if(LEFT<=0){ submit(true); }
    },1000);
    render();
  }
  function answered(){ var c=0; ANS.forEach(function(a){ if(a!==null)c++; }); return c; }
  function renderExam(){
    var el=document.getElementById('v-mock'); var it=QS[QI];
    var h='<div class="mk-timer"><span><b>'+PAPER.icon+'</b> Câu <b>'+(QI+1)+'/'+QS.length+'</b> · đã làm '+answered()+'</span><span>⏱ <b id="mk-left" class="'+(LEFT<=300?'warn':'')+'">'+fmt(LEFT)+'</b></span></div>';
    h+='<div class="mk-card"><div class="mk-q">'+esc(it.q)+'</div>'
      +it.o.map(function(o,i){ return '<button class="mk-opt'+(ANS[QI]===i?' sel':'')+'" onclick="MOCK.pick('+i+')">'+String.fromCharCode(97+i)+') '+esc(o)+'</button>'; }).join('')
      +'<div class="mk-row">'
      +'<button class="btn sec" onclick="MOCK.mv(-1)">← Trước</button>'
      +'<button class="btn sec" onclick="MOCK.flag()">'+(FLAG[QI]?'🚩 Bỏ cờ':'🏳️ Cắm cờ xem lại')+'</button>'
      +'<button class="btn" onclick="MOCK.mv(1)">Sau →</button>'
      +'</div></div>';
    h+='<div class="mk-card"><b>Bảng câu hỏi</b> <span class="mk-muted">(xanh = đã làm · vàng = cắm cờ)</span><div class="mk-grid">'
      +QS.map(function(_,i){ var c='mk-cell'+(ANS[i]!==null?' done':'')+(FLAG[i]?' flag':'')+(i===QI?' cur':''); return '<button class="'+c+'" onclick="MOCK.jump('+i+')">'+(i+1)+'</button>'; }).join('')
      +'</div>'
      +'<div class="mk-row"><button class="btn" style="background:#2ea043" onclick="MOCK.submitAsk()">📤 NỘP BÀI</button><button class="btn sec" onclick="MOCK.quit()">Thoát (hủy bài)</button></div></div>';
    el.innerHTML=h;
  }

  function submit(auto){
    if(MODE!=='exam')return;
    if(TIMER){clearInterval(TIMER);TIMER=null;}
    var r=0; var wrong=[];
    QS.forEach(function(it,i){ if(ANS[i]===it.a)r++; else wrong.push(i); });
    var pc=Math.round(r/QS.length*100);
    RESULT={r:r,pc:pc,wrong:wrong,auto:!!auto};
    var d=new Date(); var ds=d.getDate()+'/'+(d.getMonth()+1)+' '+d.getHours()+':'+(d.getMinutes()<10?'0':'')+d.getMinutes();
    H.push({id:PAPER.id,pc:pc,r:r,n:QS.length,d:ds}); saveH();
    try{ if(typeof cloudLogQuiz==='function') cloudLogQuiz('mock-'+PAPER.id,pc); }catch(e){}
    MODE='result'; REVIEW=false; render(); }
  function renderResult(){
    var el=document.getElementById('v-mock'); var R=RESULT;
    var h='<div class="mk-card" style="text-align:center"><h2>'+(R.pc>=70?'🎉 ĐẬU':'💪 Chưa đậu')+' — '+R.pc+'%</h2>'
      +'<p class="mk-muted">'+PAPER.vi+' · đúng '+R.r+'/'+QS.length+' · mốc đậu 70%'+(R.auto?' · (hết giờ, tự nộp)':'')+'</p>'
      +'<div class="mk-row" style="justify-content:center">'
      +'<button class="btn" onclick="MOCK.start(\''+PAPER.id+'\')">🔁 Thi lại (đề mới)</button>'
      +(R.wrong.length?'<button class="btn sec" onclick="MOCK.review()">🔍 Xem '+R.wrong.length+' câu sai</button>':'')
      +'<button class="btn sec" onclick="MOCK.back()">Về danh sách</button>'
      +'</div></div>';
    if(REVIEW){
      R.wrong.forEach(function(i){
        var it=QS[i];
        h+='<div class="mk-card"><div class="mk-q">Câu '+(i+1)+'. '+esc(it.q)+'</div>'
          +it.o.map(function(o,oi){ var c=''; if(oi===it.a)c=' ok'; else if(oi===ANS[i])c=' bad'; return '<div class="mk-opt'+c+'" style="cursor:default">'+String.fromCharCode(97+oi)+') '+esc(o)+(oi===it.a?' ✓':(oi===ANS[i]?' ✗ (bạn chọn)':''))+'</div>'; }).join('')
          +'<div class="mk-exp">'+(it.vq?'<div class="vq">🇻🇳 '+esc(it.vq)+'</div>':'')+(it.va?'<div class="va">'+esc(it.va)+'</div>':'')+(it.n?'<div class="nn">⚠️ '+esc(it.n)+'</div>':'')+'</div></div>';
      });
    }
    el.innerHTML=h; if(!REVIEW)window.scrollTo(0,0);
  }

  window.MOCK={
    start:start,
    pick:function(i){ ANS[QI]=i; if(QI<QS.length-1){QI++;} render(); },
    mv:function(d){ QI=Math.max(0,Math.min(QS.length-1,QI+d)); render(); window.scrollTo(0,0); },
    jump:function(i){ QI=i; render(); window.scrollTo(0,0); },
    flag:function(){ FLAG[QI]=!FLAG[QI]; render(); },
    submitAsk:function(){ var left=QS.length-answered(); if(left>0&&!confirm('Còn '+left+' câu chưa làm. Nộp bài luôn?'))return; submit(false); },
    quit:function(){ if(!confirm('Thoát sẽ hủy bài thi này?'))return; if(TIMER){clearInterval(TIMER);TIMER=null;} MODE='menu'; render(); },
    review:function(){ REVIEW=!REVIEW; render(); },
    back:function(){ MODE='menu'; render(); },
    clearH:function(){ if(!confirm('Xóa toàn bộ lịch sử thi thử?'))return; H=[]; saveH(); render(); }
  };
  function render(){ if(MODE==='menu')menu(); else if(MODE==='exam')renderExam(); else renderResult(); }
  window.renderMock=render;

  if(document.body) addTab(); else window.addEventListener('load', addTab);
})();
