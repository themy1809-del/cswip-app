/* ============================================================
   CLOUD SYNC (Firebase) — đồng bộ tiến độ học lên Firestore
   để chủ shop xem ở trang quản trị (dashboard.html).
   - Đăng nhập ẩn danh (anonymous) cho mọi khách.
   - Ghi users/{uid} = {phone,name,premium,progress,scores,lastActive}.
   - Tự bỏ qua nếu offline / chưa nạp được Firebase (app vẫn chạy bình thường).
   ============================================================ */
(function(){
  function ok(){ return typeof firebase!=='undefined' && typeof CONFIG!=='undefined' && CONFIG.firebase && CONFIG.firebase.apiKey; }
  if(!ok()){ window.cloudSync=function(){}; return; }
  try{ if(!firebase.apps.length) firebase.initializeApp(CONFIG.firebase); }catch(e){ window.cloudSync=function(){}; return; }
  var db, auth, ready=false, t=null;
  try{ db=firebase.firestore(); auth=firebase.auth(); }catch(e){ window.cloudSync=function(){}; return; }

  function snapshot(){
    var u={}, prog={}, qs={};
    try{ u=JSON.parse(localStorage.getItem('cswip_user')||'{}'); }catch(e){}
    try{ prog=JSON.parse(localStorage.getItem('cswip_prog')||'{}'); }catch(e){}
    try{ qs=JSON.parse(localStorage.getItem('cswip_quiz')||'{}'); }catch(e){}
    var done=0; for(var k in prog){ if(prog[k]) done++; }
    var passed=0; try{ var ex=JSON.parse(localStorage.getItem('cswip_exam')||'{}'); for(var ek in ex){ if(ex[ek]&&ex[ek].best>=70) passed++; } }catch(e){}
    var ans=0, correct=0; for(var q in qs){ ans++; if(qs[q]&&qs[q].correct) correct++; }
    var prem=false, exp='';
    try{ prem=(typeof isPremium==='function')?!!isPremium():false; }catch(e){}
    try{ exp=(typeof premiumExpiryText==='function')?premiumExpiryText():''; }catch(e){}
    var best=0; try{ (u.history||[]).forEach(function(h){ if(h.p>best)best=h.p; }); }catch(e){}
    return {
      uid: auth.currentUser?auth.currentUser.uid:'',
      phone: (u.phone||''), name: (u.name||''), email: (u.email||''), org: (u.org||''),
      premium: prem, premiumText: exp,
      chaptersDone: done, chaptersPassed: passed, quizDone: ans, quizCorrect: correct,
      accuracy: ans?Math.round(correct/ans*100):0,
      bestMock: best,
      exams: (u.history&&u.history.length)||0,
      lastActive: firebase.firestore.FieldValue.serverTimestamp()
    };
  }
  window.cloudSync=function(){
    if(!ready || !auth.currentUser) return;
    clearTimeout(t);
    t=setTimeout(function(){
      try{ db.collection('users').doc(auth.currentUser.uid).set(snapshot(), {merge:true}).catch(function(){}); }catch(e){}
    }, 1200);
  };
  auth.onAuthStateChanged(function(user){
    if(user){ ready=true; window.cloudSync(); }
  });
  auth.signInAnonymously().catch(function(){});

  // đồng bộ định kỳ + khi rời trang / ẩn tab
  setInterval(function(){ window.cloudSync(); }, 30000);
  document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden') window.cloudSync(); });
  window.addEventListener('beforeunload', function(){ try{ if(ready&&auth.currentUser) db.collection('users').doc(auth.currentUser.uid).set(snapshot(),{merge:true}); }catch(e){} });
})();
