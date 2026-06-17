/* ============================================================
   ĐĂNG KÝ + MÃ KÍCH HOẠT PREMIUM (offline)
   - Mã gắn theo SỐ ĐIỆN THOẠI (chống nhầm tên/dấu) + hạn dùng.
   - makeCode() dùng ở trang tạo mã; checkCode() ở app để kiểm.
   ============================================================ */

/* Chuẩn hóa SĐT: chỉ giữ chữ số, bỏ +84/0 ở đầu để mọi cách gõ khớp nhau */
function _normKey(k){
  var d=(k||'').toString().replace(/\D/g,'');
  if(d.indexOf('84')===0 && d.length>=11) d=d.slice(2);
  if(d.indexOf('0')===0) d=d.slice(1);
  return d;
}
function _authHash(s){
  var secret=(typeof CONFIG!=='undefined' && CONFIG.secret)?CONFIG.secret:'default-secret';
  var x=s+'::'+secret, h=5381>>>0;
  for(var r=0;r<3;r++){ for(var i=0;i<x.length;i++){ h=((h<<5)+h+x.charCodeAt(i)+r)>>>0; } }
  return h.toString(36).toUpperCase();
}
/* exp: 'L' (vĩnh viễn) hoặc 'YYMM' */
function makeCode(key, exp){
  exp=(exp||'L').toString().toUpperCase();
  var sig=('0000000'+_authHash(_normKey(key)+'|'+exp)).slice(-7);
  return ('CSWIP-'+exp+'-'+sig).toUpperCase();
}
function checkCode(key, code){
  var c=(code||'').toString().trim().toUpperCase().replace(/\s+/g,'');
  var m=c.match(/^CSWIP-([A-Z0-9]+)-([A-Z0-9]{7})$/);
  if(!m) return {ok:false,reason:'format'};
  var exp=m[1];
  if(makeCode(key,exp)!==c) return {ok:false,reason:'mismatch'};
  if(exp!=='L'){
    if(!/^\d{4}$/.test(exp)) return {ok:false,reason:'format'};
    var y=2000+parseInt(exp.slice(0,2),10), mo=parseInt(exp.slice(2,4),10);
    if(mo<1||mo>12) return {ok:false,reason:'format'};
    if(new Date()>=new Date(y,mo,1)) return {ok:false,reason:'expired',exp:exp};
  }
  return {ok:true,exp:exp};
}
function _curUser(){ try{ return JSON.parse(localStorage.getItem('cswip_user')||'{}'); }catch(e){ return {}; } }
function isPremium(){
  var u=_curUser();
  if(!u.phone || !u.code) return false;
  return checkCode(u.phone, u.code).ok===true;
}
function premiumExpiryText(){
  var u=_curUser(); if(!u.phone||!u.code) return '';
  var r=checkCode(u.phone,u.code); if(!r.ok) return '';
  if(r.exp==='L') return 'vĩnh viễn / lifetime';
  return 'đến hết tháng '+r.exp.slice(2,4)+'/20'+r.exp.slice(0,2);
}
function applyCode(code){
  var u=_curUser();
  if(!u.phone) return {ok:false,msg:'Bạn cần nhập SỐ ĐIỆN THOẠI ở trên trước khi kích hoạt. / Enter your phone first.'};
  var r=checkCode(u.phone,code);
  if(r.ok){
    u.code=(code||'').trim().toUpperCase().replace(/\s+/g,'');
    localStorage.setItem('cswip_user',JSON.stringify(u));
    try{ USER=u; }catch(e){}
    return {ok:true,msg:'✅ Kích hoạt thành công! / Activated! ('+premiumExpiryText()+')'};
  }
  if(r.reason==='expired') return {ok:false,msg:'❌ Mã đã HẾT HẠN. / Code expired.'};
  if(r.reason==='mismatch') return {ok:false,msg:'❌ Mã không khớp SỐ ĐIỆN THOẠI của bạn. Kiểm tra lại số đã nhập. / Code does not match your phone.'};
  return {ok:false,msg:'❌ Mã sai định dạng. / Invalid code format.'};
}

/* ---------- QR thanh toán (VietQR) ---------- */
function vietQRUrl(){
  if(!CONFIG.bankCode || !CONFIG.accountNo) return '';
  var info=encodeURIComponent('CSWIP PRO '+((_curUser().phone)||''));
  var url='https://img.vietqr.io/image/'+encodeURIComponent(CONFIG.bankCode)+'-'+encodeURIComponent(CONFIG.accountNo)+'-compact2.png?amount='+encodeURIComponent(CONFIG.price||'')+'&addInfo='+info;
  if(CONFIG.accountName) url+='&accountName='+encodeURIComponent(CONFIG.accountName);
  return url;
}
function fmtPrice(){ try{ return (CONFIG.price||0).toLocaleString('vi-VN')+(CONFIG.currency||'đ'); }catch(e){ return (CONFIG.price||0)+(CONFIG.currency||'đ'); } }

/* ---------- Đăng ký lần đầu (tên để chấm điểm + SĐT để kích hoạt) ---------- */
function maybeRegister(){ if(_curUser().name) return; showRegister(false); }
function showRegister(force){
  if(document.getElementById('reg-overlay')) return;
  var u=_curUser();
  var ov=document.createElement('div'); ov.id='reg-overlay';
  ov.style.cssText='position:fixed;inset:0;z-index:200;background:rgba(3,6,12,.78);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:18px';
  ov.innerHTML=
    '<div style="max-width:420px;width:100%;background:linear-gradient(180deg,#16203024,#0e1622);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:22px;box-shadow:0 20px 60px rgba(0,0,0,.5)">'+
      '<div style="font-size:20px;font-weight:800;margin-bottom:4px">👋 Chào mừng tới CSWIP 3.1</div>'+
      '<div style="color:#94a3bb;font-size:13px;margin-bottom:14px">Nhập tên & SĐT để app chấm điểm và (khi mua) kích hoạt cho bạn. Lưu riêng trên máy bạn.</div>'+
      '<label style="font-size:12px;color:#94a3bb">Họ tên / Full name *</label>'+
      '<input id="reg-name" value="'+(u.name||'').replace(/"/g,'&quot;')+'" placeholder="Nguyễn Văn A" style="width:100%;margin:5px 0 10px;padding:11px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#eaeff7;font-size:15px">'+
      '<label style="font-size:12px;color:#94a3bb">Số điện thoại / Phone (để kích hoạt)</label>'+
      '<input id="reg-phone" value="'+(u.phone||'').replace(/"/g,'&quot;')+'" placeholder="09..." inputmode="tel" style="width:100%;margin:5px 0 16px;padding:11px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#eaeff7;font-size:15px">'+
      '<button onclick="submitRegister()" style="width:100%;padding:13px;border:none;border-radius:12px;background:linear-gradient(135deg,#4ca8ff,#2f7fe0);color:#06121f;font-weight:800;font-size:15px;cursor:pointer">Bắt đầu học →</button>'+
      (force?'<button onclick="(function(){var e=document.getElementById(\'reg-overlay\');if(e)e.remove();})()" style="width:100%;margin-top:8px;padding:10px;border:1px solid rgba(255,255,255,.14);border-radius:12px;background:none;color:#94a3bb;cursor:pointer">Đóng</button>':'')+
    '</div>';
  document.body.appendChild(ov);
  var inp=document.getElementById('reg-name'); if(inp) inp.focus();
}
function submitRegister(){
  var name=(document.getElementById('reg-name')||{}).value||'';
  if(!name.trim()){ alert('Vui lòng nhập họ tên. / Please enter your name.'); return; }
  var u=_curUser();
  u.name=name.trim();
  u.phone=(document.getElementById('reg-phone')||{}).value||'';
  localStorage.setItem('cswip_user',JSON.stringify(u));
  try{ USER=u; }catch(e){}
  var e=document.getElementById('reg-overlay'); if(e) e.remove();
  try{ renderAll(); }catch(err){}
}
function logExam(score,total,label){
  var u=_curUser();
  var hist=(u.history&&u.history.slice)?u.history:[];
  hist.unshift({d:new Date().toISOString().slice(0,10),s:score,t:total,p:total?Math.round(score/total*100):0,label:label||''});
  u.history=hist.slice(0,30);
  localStorage.setItem('cswip_user',JSON.stringify(u));
  try{ USER=u; }catch(e){}
}
