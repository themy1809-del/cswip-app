/* ============================================================
   TAB "TÀI LIỆU THI" — Học thuộc (lật thẻ) + Luyện tập (trắc nghiệm)
   Chạm vào thẻ để xem đáp án; nút 💡 Giải nghĩa dịch & giải thích tiếng Việt.
   ============================================================ */
(function(){
  var SETS=[];
  ['THI_WP1','THI_WP2','THI_WPTWI','THI_HW','THI_HWDD','THI_HOQ','THI_HOS','THI_HOD','THI_LEAD','THI_RING','THI_FB','THI_DD','THI_C21','THI_C22','THI_C23'].forEach(function(k){ if(window[k]) SETS.push(window[k]); });
  if(!SETS.length) return;

  var P={}; try{ P=JSON.parse(localStorage.getItem('THIP')||'{}'); }catch(e){}
  function saveP(){ try{ localStorage.setItem('THIP',JSON.stringify(P)); }catch(e){} }
  function st(id){ if(!P[id])P[id]={i:0,right:0,wrong:0,done:0}; return P[id]; }
  function pro(){ return (typeof isPremium==='function')?isPremium():true; }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }

  var MODE='menu', SET=null, IDX=0, FLIP=false, EXP=false, QORD=null, QI=0, QANS=null, QRIGHT=0, QWRONG=[], MSEL={};
  function isMS(){ return SET&&SET.type==='ms'; }
  function quizable(s){ return s.type==='mcq'||s.type==='ms'; }
  function ansText(it){ if(SET.type==='mcq') return String.fromCharCode(97+it.a)+') '+it.o[it.a]; if(SET.type==='ms') return it.a.map(function(k){ return String.fromCharCode(97+k)+') '+it.o[k]; }).join(' · '); return it.a; }
  function imgHtml(it){ return it.img?'<div style="margin:8px 0"><img src="'+it.img+'" alt="" style="max-width:100%;border-radius:10px;border:1px solid var(--line);background:#fff"></div>':''; }
  function ovHtml(it,i){ return (it.ov&&it.ov[i])?'<span style="display:block;font-size:12.5px;color:var(--muted);margin-top:2px">🇻🇳 '+esc(it.ov[i])+'</span>':''; }
  function isOk(it,i){ return SET.type==='ms'? it.a.indexOf(i)>=0 : i===it.a; }

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
    var css='.thi-card{background:var(--card,#1b2435);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:16px;margin-bottom:12px}'
      +'.thi-flash{min-height:190px;border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:18px;cursor:pointer;background:rgba(255,255,255,.03)}'
      +'.thi-q{font-size:16px;font-weight:700;line-height:1.45}'
      +'.thi-a{margin-top:12px;padding-top:12px;border-top:1px dashed rgba(255,255,255,.2);color:#7ee787;font-weight:700;line-height:1.45}'
      +'.thi-exp{margin-top:10px;background:rgba(76,168,255,.08);border:1px solid rgba(76,168,255,.25);border-radius:12px;padding:12px;font-size:14px;line-height:1.55}'
      +'.thi-exp .vq{color:#ffd166;font-weight:700}.thi-exp .va{margin-top:6px;color:#dbe7ff}.thi-exp .nn{margin-top:6px;color:#ff9f7f;font-size:12.5px}'
      +'.thi-opt{display:block;width:100%;text-align:left;margin-top:8px;padding:11px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:inherit;font-size:14.5px;cursor:pointer;line-height:1.4}'
      +'.thi-opt.ok{border-color:#2ea043;background:rgba(46,160,67,.18)}'
      +'.thi-opt.bad{border-color:#f85149;background:rgba(248,81,73,.16)}'
      +'.thi-opt.sel{border-color:var(--accent2);background:rgba(93,177,255,.14)}.thi-opt.miss{border-style:dashed}'
      +'.thi-grp{border-left:4px solid var(--accent);background:linear-gradient(90deg,rgba(255,138,68,.08),transparent 60%)}'
      +'.thi-exams{display:inline-block}.thi-exams summary{list-style:none;cursor:pointer}.thi-exams summary::-webkit-details-marker{display:none}.thi-exams[open]{display:block;width:100%}'
      +'.thi-grid{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px;max-height:96px;overflow:auto}.thi-grid button{width:34px;height:30px;border-radius:7px;border:1px solid var(--line);background:none;color:inherit;font-size:12px;cursor:pointer}.thi-grid button.done{background:rgba(93,177,255,.18);border-color:var(--accent2)}.thi-grid button.flag{background:rgba(255,216,77,.3);border-color:#e3b400}.thi-grid button.cur{outline:2px solid var(--accent)}'
      +'.thi-muted{color:var(--muted,#94a3bb);font-size:12.5px}'
      +'.thi-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}'
      +'.thi-tag{font-size:11px;background:rgba(255,255,255,.08);padding:2px 8px;border-radius:99px;margin-left:6px}';
    var s=document.createElement('style'); s.textContent=css; document.head.appendChild(s);
  }

  /* ---------- MENU ---------- */
  /* ---------- NHÓM THEO CẤU TRÚC BÀI THI CSWIP 3.1 ---------- */
  var GROUPS=[
    {id:'lt', icon:'📘', vi:'PHẦN 1 — LÝ THUYẾT TỔNG QUÁT', sub:'Trắc nghiệm 4 phương án, kéo–thả nhiều đáp án, điền khuyết — toàn tiếng Anh, câu chuỗi "with reference to the previous question". Nhịp 45 giây/câu như quiz TWI.', sets:['hoq','hw','hwdd','hos','lead','ring','fb','dd']},
    {id:'wp', icon:'📎', vi:'PHẦN 2 — WORK PACK (đọc hồ sơ)', sub:'Câu hỏi dựa trên WPS, WPQR, chứng chỉ thợ hàn, bản vẽ — mở hồ sơ bên cạnh khi làm, tìm đúng ô dữ liệu.', sets:['wptwi','wp1','wp2']},
    {id:'th', icon:'🔧', vi:'PHẦN 3 — THỰC HÀNH (nhận dạng & kết án khuyết tật)', sub:'Nhìn mẫu/ảnh → gọi đúng tên khuyết tật tiếng Anh → đo → so tiêu chí → kết luận.', sets:['hod']},
    {id:'kn', icon:'💬', vi:'KINH NGHIỆM THI — hỏi–đáp ôn nhanh', sub:'Câu hỏi–đáp từ người đã thi: lật thẻ, tự trả lời trước khi lật.', sets:['c21','c22','c23']}
  ];
  /* đề "thi như thật": giữ thứ tự như bài thật, bấm giờ */
  function byPrefix(ids,pre){ var out=[]; ids.forEach(function(id){ var s=getSet(id); if(s) s.items.forEach(function(it,i){ if(String(it.q).indexOf(pre)===0) out.push({s:s,i:i}); }); }); return out; }
  function allOf(id,n,rand){ var s=getSet(id); if(!s) return []; var out=s.items.map(function(_,i){ return {s:s,i:i}; }); if(rand){ for(var j=out.length-1;j>0;j--){ var k=Math.floor(Math.random()*(j+1)); var t=out[j]; out[j]=out[k]; out[k]=t; } } return n?out.slice(0,n):out; }
  var EXAMS=[
    {id:'hoq', g:'lt', vi:'Quiz đầu khóa TWI — 30 câu', sec:45, pick:function(){ return allOf('hoq'); }},
    {id:'hw1', g:'lt', vi:'Homework Paper 1 — 49 câu', sec:45, pick:function(){ return byPrefix(['hw','hwdd'],'P1-'); }},
    {id:'hw2', g:'lt', vi:'Homework Paper 2 — 51 câu', sec:45, pick:function(){ return byPrefix(['hw','hwdd'],'P2-'); }},
    {id:'hw3', g:'lt', vi:'Homework Paper 3 — 50 câu', sec:45, pick:function(){ return byPrefix(['hw','hwdd'],'P3-'); }},
    {id:'hos', g:'lt', vi:'Ôn chương Handout — 40 câu ngẫu nhiên', sec:45, pick:function(){ return allOf('hos',40,true); }},
    {id:'lead', g:'lt', vi:'Leading Questions — trọn bộ', sec:45, pick:function(){ return allOf('lead'); }},
    {id:'wptwi', g:'wp', vi:'Work Pack TWI — 20 câu', sec:90, pick:function(){ return allOf('wptwi'); }},
    {id:'wp1', g:'wp', vi:'Work Pack 1 — 31 câu', sec:90, pick:function(){ return allOf('wp1'); }},
    {id:'wp2', g:'wp', vi:'Work Pack 2 — 40 câu', sec:90, pick:function(){ return allOf('wp2'); }}
  ];
  function mst(id){ try{ return window.NR&&NR.mastStreak?NR.mastStreak(id):0; }catch(e){ return 0; } }
  function setMast(s){ if(!quizable(s)) return null; var m=0; s.items.forEach(function(_,i){ if(mst('t:'+s.id+':'+i)>=2) m++; }); return {m:m,n:s.items.length}; }
  function bar(m,n,col){ var p=n?Math.round(m/n*100):0; return '<div style="height:7px;border-radius:5px;background:rgba(127,127,127,.18);overflow:hidden;margin-top:5px"><i style="display:block;height:100%;width:'+p+'%;background:'+(col||'linear-gradient(90deg,var(--accent2),var(--green))')+'"></i></div>'; }
  function menu(){
    var el=document.getElementById('v-thi'); if(!el)return;
    var total=0, qm=0, qn=0; SETS.forEach(function(s){ total+=s.items.length; var x=setMast(s); if(x){ qm+=x.m; qn+=x.n; } });
    var h='<div class="thi-card"><h2>📖 '+((typeof bili==='function')?bili('Tài liệu thi — học chắc, thi sát đề','Exam pack — master & sit like the real exam'):'Tài liệu thi')+'</h2>'
      +'<p class="thi-muted" style="margin-top:6px;line-height:1.6">'+total+' câu từ bộ tài liệu TWI bạn gửi, xếp theo đúng các phần của bài thi CSWIP 3.1. Mỗi bộ có 3 cách học: <b>🎯 Học chắc</b> (chỉ câu chưa chắc, tự trả lời trước, đúng 2 lần liên tiếp mới tính), <b>⏱ Thi như thật</b> (bấm giờ, chỉ tiếng Anh, không hiện đáp án tới khi nộp) và <b>🃏 Học thuộc</b> (lật thẻ). Sau mỗi câu có nút <b>📖 Đọc trong sách</b> mở đúng mục giáo trình.</p>'
      +'<div style="margin-top:8px"><b>'+qm+'</b><span class="thi-muted"> / '+qn+' câu trắc nghiệm đã tự trả lời được</span>'+bar(qm,qn)+'</div>'
      +'<div class="thi-muted" style="margin-top:8px;line-height:1.6"><b>Thứ tự khuyên dùng:</b> ① Quiz đầu khóa để biết mình đang ở đâu → ② Học chắc Homework + Handout ôn chương song song với chương đang học → ③ Work Pack: xem hướng dẫn đọc hồ sơ rồi Học chắc Work Pack TWI → WP1 → WP2 → ④ 15 ảnh khuyết tật + thi thực hành → ⑤ mỗi tuần 1 đề Thi như thật (mốc đậu 70%, nhắm ≥80%).</div>'
      +'</div>';
    var used={};
    GROUPS.forEach(function(g){
      var gs=g.sets.map(getSet).filter(Boolean); gs.forEach(function(s){ used[s.id]=1; }); if(!gs.length) return;
      var gm=0, gn=0; gs.forEach(function(s){ var x=setMast(s); if(x){ gm+=x.m; gn+=x.n; } });
      var ex=EXAMS.filter(function(e){ return e.g===g.id && getSet(e.id.replace(/^hw\d$/,'hw'))!==null; });
      h+='<div class="thi-card thi-grp" id="grp-'+g.id+'"><div style="font-size:15px;font-weight:800;letter-spacing:.3px">'+g.icon+' '+g.vi+'</div><div class="thi-muted" style="margin-top:4px;line-height:1.55">'+g.sub+'</div>'
        +(gn?'<div style="margin-top:6px;font-size:13px"><b>'+gm+'</b>/'+gn+' câu đã chắc'+bar(gm,gn)+'</div>':'')
        +'<div class="thi-row">'+(gn?'<button class="btn" onclick="THI.drillGroup(\''+g.id+'\')">🎯 Học chắc cả phần</button>':'')
        +(ex.length?'<details class="thi-exams"><summary class="btn sec" style="display:inline-block">⏱ Thi như thật ▾</summary><div class="thi-row" style="margin-top:6px">'+ex.map(function(e){ var best=bestOf(e.id); return '<button class="btn sec" onclick="THI.exam(\''+e.id+'\')">'+esc(e.vi)+(best!=null?' · '+best+'%':'')+'</button>'; }).join('')+'</div></details>':'')
        +'</div></div>';
      gs.forEach(function(s){ h+=setCard(s); });
    });
    SETS.forEach(function(s){ if(!used[s.id]) h+=setCard(s); });
    el.innerHTML=h;
  }
  function setCard(s){
    var p=st(s.id), mcq=quizable(s), x=setMast(s);
    return '<div class="thi-card"><div style="display:flex;align-items:center;gap:10px"><div style="font-size:26px">'+s.icon+'</div><div style="flex:1"><b>'+esc(s.vi)+'</b><span class="thi-tag">'+s.items.length+' câu</span>'
      +(s.type==='ms'?'<span class="thi-tag">nhiều đáp án</span>':mcq?'<span class="thi-tag">trắc nghiệm</span>':'<span class="thi-tag">hỏi–đáp</span>')
      +(x?'<div class="thi-muted">🎯 Tự trả lời được '+x.m+'/'+x.n+(p.done?' · luyện đúng '+p.right+' / sai '+p.wrong:'')+'</div>'+bar(x.m,x.n):(p.done?('<div class="thi-muted">Luyện đúng '+p.right+' / sai '+p.wrong+'</div>'):''))
      +'</div></div>'
      +'<div class="thi-row">'
      +(s.type==='mcq'?'<button class="btn" onclick="THI.drill(\''+s.id+'\')">🎯 Học chắc</button>':'')
      +'<button class="btn'+(s.type==='mcq'?' sec':'')+'" onclick="THI.learn(\''+s.id+'\')">🃏 Học thuộc</button>'
      +(mcq?'<button class="btn sec" onclick="THI.quiz(\''+s.id+'\')">📝 Làm bài</button>':'')
      +'</div></div>';
  }

  /* ---------- 🎯 HỌC CHẮC: dùng engine "tự trả lời" của Học gọn chương ---------- */
  var BYTEXT=null;
  function hdLookup(q){ if(!window.HOCDE) return null; if(!BYTEXT){ BYTEXT={}; HOCDE.points.forEach(function(p){ BYTEXT[String(p.q).toLowerCase().replace(/\s+/g,' ').trim()]=p; }); } return BYTEXT[String(q).toLowerCase().replace(/\s+/g,' ').trim()]||null; }
  function toPoints(sets){
    var pts=[];
    sets.forEach(function(s){ if(!s||s.type!=='mcq') return; var prev=null;
      s.items.forEach(function(it,i){ if(!it.o||typeof it.a!=='number') return;
        var h=hdLookup(it.q), ctx=null; if(prev&&/reference to the (previous|above)|previous answer|referring to the previous/i.test(it.q)) ctx={q:prev.q, ans:prev.o[prev.a], vq:prev.vq||''}; prev=it;
        pts.push({id:'t:'+s.id+':'+i, ci:(typeof it.c==='number')?it.c:(h?h.ci:0), li:h?h.li:-1, src:s.vi, mcq:true, q:it.q, vq:it.vq||'', opts:it.o, optsVi:it.ov||null, img:it.img||null, a:it.a, ans:it.o[it.a], why:(it.va||'')+(it.n?' ⚠️ '+it.n:''), cat:s.vi, ctx:ctx});
      }); });
    return pts;
  }
  function drill(id){ var s=getSet(id); if(!s||!window.chDrillPoints) return; chDrillPoints(s.vi, toPoints([s])); }
  function drillGroup(gid){ var g=GROUPS.filter(function(x){ return x.id===gid; })[0]; if(!g||!window.chDrillPoints) return; chDrillPoints(g.vi, toPoints(g.sets.map(getSet))); }

  /* ---------- ⏱ THI NHƯ THẬT ---------- */
  var EX=null, EXT=null;
  var EH={}; try{ EH=JSON.parse(localStorage.getItem('cswip_thiexam')||'{}'); }catch(e){}
  function bestOf(id){ var r=EH[id]; return r?r.best:null; }
  function exam(id){
    var def=EXAMS.filter(function(e){ return e.id===id; })[0]; if(!def) return;
    var list=def.pick(); if(!list.length) return;
    SET=list[0].s; MODE='exam'; EX={def:def, list:list, ans:{}, flag:{}, cur:0, t0:Date.now(), end:Date.now()+list.length*def.sec*1000, done:false};
    if(EXT) clearInterval(EXT); EXT=setInterval(tick,1000); render(); window.scrollTo(0,0);
  }
  function tick(){ if(!EX||EX.done||MODE!=='exam'){ clearInterval(EXT); EXT=null; return; } var left=Math.max(0,EX.end-Date.now()); var el=document.getElementById('thi-timer'); if(el){ el.textContent=fmt(left); el.style.color=left<120000?'var(--red)':''; } if(left<=0) submitExam(true); }
  function fmt(ms){ var t=Math.round(ms/1000); return Math.floor(t/60)+':'+('0'+(t%60)).slice(-2); }
  function exItem(k){ var r=EX.list[k]; return r.s.items[r.i]; }
  function exIsMS(k){ return EX.list[k].s.type==='ms'; }
  function exAnswered(k){ var a=EX.ans[k]; return exIsMS(k)? !!(a&&Object.keys(a).some(function(x){ return a[x]; })) : a!=null; }
  function exRight(k){ var it=exItem(k), a=EX.ans[k]; if(exIsMS(k)){ a=a||{}; return it.o.every(function(_,i){ return !!a[i]===(it.a.indexOf(i)>=0); }); } return a===it.a; }
  function renderExam(){
    var el=document.getElementById('v-thi'), n=EX.list.length;
    if(EX.done){ el.innerHTML=examResult(); window.scrollTo(0,0); return; }
    var k=EX.cur, it=exItem(k), ms=exIsMS(k), a=EX.ans[k], done=0; for(var j=0;j<n;j++) if(exAnswered(j)) done++;
    var h='<div class="thi-card" style="position:sticky;top:0;z-index:5"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><b>⏱ '+esc(EX.def.vi)+'</b><span style="font-size:20px;font-weight:800" id="thi-timer">'+fmt(EX.end-Date.now())+'</span></div>'
      +'<div class="thi-muted">Câu '+(k+1)+'/'+n+' · đã trả lời '+done+' · '+EX.def.sec+' giây/câu · chỉ tiếng Anh như đề thật</div>'
      +'<div class="thi-grid">'+EX.list.map(function(_,j){ return '<button class="'+(j===k?'cur ':'')+(exAnswered(j)?'done ':'')+(EX.flag[j]?'flag':'')+'" onclick="THI.exGo('+j+')">'+(j+1)+'</button>'; }).join('')+'</div></div>';
    h+='<div class="thi-card"><div class="thi-q">'+esc(it.q)+'</div>'+imgHtml(it)
      +(ms?'<div class="thi-muted" style="margin-top:6px">☑️ Có thể nhiều đáp án đúng — chọn tất cả</div>':'')
      +it.o.map(function(o,i){ var on=ms?!!(a&&a[i]):a===i; return '<button class="thi-opt'+(on?' sel':'')+'" onclick="THI.exPick('+i+')">'+(ms?(on?'☑️ ':'⬜ '):'')+String.fromCharCode(97+i)+') '+esc(o)+'</button>'; }).join('')
      +'<div class="thi-row"><button class="btn sec" onclick="THI.exGo('+(k-1)+')" '+(k?'':'disabled')+'>← Trước</button><button class="btn sec" onclick="THI.exFlag()">'+(EX.flag[k]?'🚩 Bỏ cờ':'🚩 Cắm cờ')+'</button>'
      +(k<n-1?'<button class="btn" onclick="THI.exGo('+(k+1)+')">Sau →</button>':'')+'<button class="btn'+(k<n-1?' ghost':'')+'" onclick="THI.exSubmit()">📤 Nộp bài</button></div></div>';
    el.innerHTML=h;
  }
  function submitExam(auto){
    if(!EX||EX.done) return; var n=EX.list.length, miss=0; for(var j=0;j<n;j++) if(!exAnswered(j)) miss++;
    if(!auto&&miss&&!confirm('Còn '+miss+' câu chưa trả lời. Nộp bài?')) return;
    EX.done=true; EX.used=Date.now()-EX.t0; if(EXT){ clearInterval(EXT); EXT=null; }
    var right=0; for(var k=0;k<n;k++){ var r=EX.list[k], it=exItem(k), ok=exRight(k); if(ok) right++;
      try{ if(window.NR&&NR.record&&exAnswered(k)){ var pick=exIsMS(k)?(ok?it.a[0]:+Object.keys(EX.ans[k]).filter(function(x){ return EX.ans[k][x]; })[0]):EX.ans[k];
        NR.record({id:'t:'+r.s.id+':'+r.i, qe:it.q, qv:it.vq||'', oe:it.o, ov:it.ov||[], a:exIsMS(k)?it.a[0]:it.a, ee:'', ev:(exIsMS(k)?'Đáp án đúng: '+it.a.map(function(x){ return it.o[x]; }).join(' · ')+'. ':'')+(it.va||'')+(it.n?' ⚠️ '+it.n:''), cat:r.s.vi, src:'Thi như thật — '+EX.def.vi, lesson:null}, pick, ok, {thi:true, game:true}); } }catch(e){} }
    EX.right=right; var pc=Math.round(right/n*100); var rec=EH[EX.def.id]||{best:0,n:0,last:[]}; rec.best=Math.max(rec.best,pc); rec.n++; rec.last=(rec.last||[]).concat([pc]).slice(-5); EH[EX.def.id]=rec; try{ localStorage.setItem('cswip_thiexam',JSON.stringify(EH)); }catch(e){}
    render();
  }
  function examResult(){
    var n=EX.list.length, pc=Math.round(EX.right/n*100), pass=pc>=70;
    var byCh={}; for(var k=0;k<n;k++){ var it=exItem(k), c=(typeof it.c==='number')?it.c:-1; if(c<0){ var hp=hdLookup(it.q); c=hp?hp.ci:-1; } if(c<0) continue; byCh[c]=byCh[c]||{n:0,k:0}; byCh[c].n++; if(exRight(k)) byCh[c].k++; }
    var weak=Object.keys(byCh).map(function(c){ return {c:+c, n:byCh[c].n, k:byCh[c].k, p:Math.round(byCh[c].k/byCh[c].n*100)}; }).filter(function(x){ return x.p<70; }).sort(function(a,b){ return a.p-b.p; });
    var h='<div class="thi-card" style="text-align:center"><h2>'+(pass?'🎉 ĐẠT':'💪 Chưa đạt')+' — '+pc+'%</h2><div class="thi-muted">Đúng '+EX.right+'/'+n+' · thời gian '+fmt(EX.used)+' / '+fmt(n*EX.def.sec*1000)+' · mốc đậu 70% (nhắm ≥80%)</div>'
      +(weak.length&&typeof DATA!=='undefined'?'<div style="text-align:left;margin-top:10px"><b>Chương cần vá:</b> '+weak.map(function(x){ return '<button class="btn sec" style="margin:4px 4px 0 0" onclick="chStart('+x.c+',4)">📗 '+esc(DATA.chapters[x.c].vi)+' '+x.k+'/'+x.n+'</button>'; }).join('')+'</div>':'')
      +'<div class="thi-row" style="justify-content:center"><button class="btn" onclick="THI.exDrillWrong()">🎯 Học chắc các câu sai</button><button class="btn sec" onclick="THI.exam(\''+EX.def.id+'\')">🔁 Thi lại</button><button class="btn sec" onclick="THI.back()">← Tài liệu thi</button></div></div>';
    h+='<div class="thi-card"><h3 style="margin:0 0 6px">Xem lại câu sai (có dịch chuyên ngành)</h3>';
    var any=false;
    for(var k=0;k<n;k++){ if(exRight(k)) continue; any=true; var it=exItem(k), ms=exIsMS(k), a=EX.ans[k];
      var yours=ms?Object.keys(a||{}).filter(function(x){ return a[x]; }).map(function(x){ return String.fromCharCode(97+ +x); }).join(', '):(a!=null?String.fromCharCode(97+a):'—');
      h+='<div style="padding:10px 0;border-bottom:1px dashed var(--line)"><div class="thi-q" style="font-size:14.5px">'+(k+1)+'. '+esc(it.q)+'</div>'+(it.vq?'<div class="thi-muted">🇻🇳 '+esc(it.vq)+'</div>':'')
        +it.o.map(function(o,i){ var ok=ms?it.a.indexOf(i)>=0:i===it.a, mine=ms?!!(a&&a[i]):a===i; return '<div class="thi-opt'+(ok?' ok':mine?' bad':'')+'" style="cursor:default;padding:7px 10px;margin-top:5px">'+String.fromCharCode(97+i)+') '+esc(o)+(ok?' ✓':'')+ovHtml(it,i)+'</div>'; }).join('')
        +'<div class="thi-muted" style="margin-top:4px">Bạn chọn: '+yours+'</div>'+((it.va||it.n)?expBox(it):'')+bookBtn(it)+'</div>'; }
    if(!any) h+='<p style="color:var(--green)">Không sai câu nào 🎉</p>';
    return h+'</div>';
  }
  function bookBtn(it){ if(!window.sachFind) return ''; var id=null; try{ id=sachFind(it.q+' '+(Array.isArray(it.a)?it.a.map(function(k){ return it.o[k]; }).join(' '):(it.o?it.o[it.a]:it.a)), typeof it.c==='number'?it.c:null); }catch(e){} return id?'<div class="thi-row" style="margin-top:6px"><button class="btn sec" style="padding:7px 12px;font-size:12.5px" onclick="sachOpen(\''+id+'\')">📖 Đọc trong sách: mục '+id+'</button></div>':''; }

  /* ---------- MENU (giữ tên cũ cho module khác) ---------- */
  function getSet(id){ for(var i=0;i<SETS.length;i++) if(SETS[i].id===id) return SETS[i]; return null; }
  function lim(s){ return pro()? s.items.length : Math.min(5,s.items.length); }
  function lockCard(){ return '<div class="thi-card" style="text-align:center"><p>🔒 Hết phần xem thử. Mở khóa <b>PRO</b> để học trọn bộ tài liệu thi.</p><div class="thi-row" style="justify-content:center"><button class="btn" onclick="go(\'profile\')">⭐ Mở khóa PRO</button></div></div>'; }

  /* ---------- HỌC THUỘC ---------- */
  function learn(id){ SET=getSet(id); if(!SET)return; MODE='learn'; IDX=Math.min(st(id).i,lim(SET)-1); FLIP=false; EXP=false; render(); }
  function renderLearn(){
    var el=document.getElementById('v-thi'), n=lim(SET), it=SET.items[IDX];
    var locked = IDX>=n;
    var optHtml='';
    if(quizable(SET)&&it.o){ optHtml=(isMS()?'<div class="thi-muted" style="margin-top:6px">☑️ Có thể nhiều đáp án đúng</div>':'')+it.o.map(function(o,i){ var ok=FLIP&&isOk(it,i); return '<div class="thi-opt'+(ok?' ok':'')+'" style="cursor:default">'+String.fromCharCode(97+i)+') '+esc(o)+(ok?' ✓':'')+(FLIP?ovHtml(it,i):'')+'</div>'; }).join(''); }
    var ans = ansText(it);
    var h='<div class="thi-card"><button class="back" onclick="THI.back()">← Danh sách</button>'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px"><b>'+SET.icon+' '+esc(SET.vi)+'</b><span class="thi-muted">'+(IDX+1)+' / '+n+(pro()?'':' (thử)')+'</span></div></div>';
    if(locked){ h+=lockCard(); el.innerHTML=h; return; }
    h+='<div class="thi-card">'
      +'<div class="thi-flash" onclick="THI.flip()">'
      +'<div class="thi-q">'+esc(it.q)+'</div>'
      +imgHtml(it)
      +optHtml
      +(FLIP?('<div class="thi-a">✅ '+esc(ans)+'</div>'):'<div class="thi-muted" style="margin-top:12px">👆 Chạm để xem đáp án</div>')
      +'</div>'
      +(FLIP?('<div class="thi-row"><button class="btn sec" onclick="THI.exp()">💡 '+(EXP?'Ẩn giải nghĩa':'Giải nghĩa (VI)')+'</button></div>'):'')
      +(EXP&&FLIP?expBox(it):'')+(FLIP?bookBtn(it):'')
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
  function quiz(id){ SET=getSet(id); if(!SET||!quizable(SET))return; MODE='quiz'; MSEL={};
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
    h+='<div class="thi-card"><div class="thi-q">'+esc(it.q)+'</div>'+imgHtml(it)
      +(isMS()?'<div class="thi-muted" style="margin-top:6px">☑️ Chọn TẤT CẢ đáp án đúng rồi bấm Kiểm tra (đề thật dạng kéo–thả)</div>':'')
      +it.o.map(function(o,i){
        var cls='';
        if(isMS()){
          if(QANS!==null){ if(isOk(it,i)) cls=MSEL[i]?' ok':' ok miss'; else if(MSEL[i]) cls=' bad'; }
          else if(MSEL[i]) cls=' sel';
          return '<button class="thi-opt'+cls+'" '+(QANS===null?('onclick="THI.tog('+i+')"'):'disabled')+'>'+(QANS===null?(MSEL[i]?'☑️ ':'⬜ '):(isOk(it,i)?'✓ ':(MSEL[i]?'✗ ':'')))+String.fromCharCode(97+i)+') '+esc(o)+(QANS!==null?ovHtml(it,i):'')+'</button>';
        }
        if(QANS!==null){ if(i===it.a)cls=' ok'; else if(i===QANS)cls=' bad'; }
        return '<button class="thi-opt'+cls+'" '+(QANS===null?('onclick="THI.pick('+i+')"'):'disabled')+'>'+String.fromCharCode(97+i)+') '+esc(o)+(QANS!==null?ovHtml(it,i):'')+'</button>';
      }).join('')
      +(isMS()&&QANS===null?'<div class="thi-row"><button class="btn" onclick="THI.check()">Kiểm tra</button></div>':'')
      +(isMS()&&QANS!==null?'<div class="thi-muted" style="margin-top:8px">'+(QANS===1?'✅ Đúng đủ':'❌ Chưa đúng — đáp án: '+esc(ansText(it)))+'</div>':'')
      +(QANS!==null?('<div class="thi-row"><button class="btn sec" onclick="THI.exp()">💡 '+(EXP?'Ẩn giải nghĩa':'Giải nghĩa (VI)')+'</button><button class="btn" onclick="THI.next()">'+(QI+1>=QORD.length?'Xem kết quả':'Câu tiếp')+' →</button></div>'):'')
      +(EXP&&QANS!==null?expBox(it):'')+(QANS!==null?bookBtn(it):'')
      +'</div>';
    el.innerHTML=h; window.scrollTo(0,0);
  }

  /* ---------- API ---------- */
  window.THI={
    learn:learn, quiz:quiz, drill:drill, drillGroup:drillGroup, exam:exam,
    exPick:function(i){ if(!EX||EX.done)return; var k=EX.cur; if(exIsMS(k)){ var a=EX.ans[k]||{}; a[i]=!a[i]; EX.ans[k]=a; } else EX.ans[k]=i; render(); },
    exGo:function(k){ if(!EX||k<0||k>=EX.list.length)return; EX.cur=k; render(); window.scrollTo(0,0); },
    exFlag:function(){ if(!EX)return; EX.flag[EX.cur]=!EX.flag[EX.cur]; render(); },
    exSubmit:function(){ submitExam(false); },
    exDrillWrong:function(){ if(!EX||!window.chDrillPoints)return; var bySet={}; var pts=[]; EX.list.forEach(function(r,k){ if(exRight(k)||r.s.type!=='mcq') return; var p=toPoints([r.s]).filter(function(x){ return x.id==='t:'+r.s.id+':'+r.i; })[0]; if(p) pts.push(p); }); if(!pts.length){ if(typeof toast==='function') toast('Không có câu trắc nghiệm sai để luyện'); return; } chDrillPoints('Câu sai — '+EX.def.vi, pts, true); },
    back:function(){ if(MODE==='exam'&&EX&&!EX.done&&!confirm('Thoát bài thi? Bài làm sẽ không được chấm.'))return; MODE='menu'; EX=null; render(); },
    flip:function(){ FLIP=!FLIP; if(!FLIP)EXP=false; render(); },
    exp:function(){ EXP=!EXP; render(); },
    mv:function(d){ var n=lim(SET); IDX=(IDX+d+n)%n; FLIP=false; EXP=false; st(SET.id).i=IDX; saveP(); render(); },
    shuffle:function(){ var n=lim(SET); IDX=Math.floor(Math.random()*n); FLIP=false; EXP=false; render(); },
    pick:function(i){ if(QANS!==null)return; QANS=i; var it=SET.items[QORD[QI]]; if(i===it.a)QRIGHT++; else QWRONG.push(QORD[QI]); render(); },
    next:function(){ QI++; QANS=null; MSEL={}; EXP=false; render(); },
    tog:function(i){ if(QANS!==null)return; MSEL[i]=!MSEL[i]; render(); },
    check:function(){ if(QANS!==null)return; var it=SET.items[QORD[QI]]; var ok=it.o.every(function(_,i){ return !!MSEL[i]===isOk(it,i); }); QANS=ok?1:0; if(ok)QRIGHT++; else QWRONG.push(QORD[QI]); try{ if(window.NR&&NR.record){ var pick=-1; for(var k in MSEL) if(MSEL[k]){ pick=+k; break; } NR.record({id:'t:'+SET.id+':'+QORD[QI], qe:it.q, qv:it.vq||'', oe:it.o, ov:it.ov||[], a:it.a[0], ee:'', ev:'Đáp án đúng: '+ansText(it)+'. '+(it.va||'')+(it.n?' ⚠️ '+it.n:''), cat:SET.vi, src:'Tài liệu thi — '+SET.vi, lesson:null}, ok?it.a[0]:pick, ok, {thi:true, game:true}); } }catch(e){} render(); },
    retryWrong:function(){ QORD=QWRONG.slice(); QWRONG=[]; QI=0; QANS=null; MSEL={}; QRIGHT=0; EXP=false; render(); }
  };
  function render(){ if(MODE!=='exam'&&EXT){ clearInterval(EXT); EXT=null; } if(MODE==='menu')menu(); else if(MODE==='learn')renderLearn(); else if(MODE==='exam')renderExam(); else renderQuizThi(); }
  window.renderThi=render;

  if(document.body) addTab(); else window.addEventListener('load', addTab);
})();
