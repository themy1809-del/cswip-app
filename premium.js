/* ============================================================
   PREMIUM LAYER — đăng ký, kích hoạt, công cụ Premium
   (nạp SAU index.html để mở rộng các hàm có sẵn)
   ============================================================ */

/* ---------- helpers ---------- */
function _gv(id){var e=document.getElementById(id);return e?(''+e.value).trim():'';}
function _r1(x){return Math.round(x*10)/10;}
function _rng(a,b){return _r1(a)+' – '+_r1(b)+' mm';}
function _posLabel(p){var m={F:bili('Bằng','flat'),H:bili('Ngang','horiz'),V:bili('Đứng','vert'),OH:bili('Trần','overhead')};return m[p]?(p+' ('+m[p]+')'):p;}

/* ---------- WELDER QUALIFICATION DATA (verified) ---------- */
var ISO_BUTT_POS={'PA':['PA'],'PC':['PA','PC'],'PE':['PA','PC','PE'],'PF':['PA','PF'],'PG':['PG'],'PH':['PA','PE','PF'],'PJ':['PA','PE','PG'],'H-L045':['PA','PC','PE','PF'],'J-L045':['PA','PC','PE','PG']};
var ISO_FILLET_POS={'PA':['PA'],'PB':['PA','PB'],'PC':['PA','PB','PC'],'PD':['PA','PB','PC','PD','PE'],'PE':['PA','PB','PC','PD','PE'],'PF':['PA','PB','PF'],'PG':['PG'],'PH':['PA','PB','PC','PD','PE','PF'],'PJ':['PA','PB','PD','PE','PG']};
var ASME_GROOVE_PLATE={'1G':['F'],'2G':['F','H'],'3G':['F','V'],'4G':['F','OH'],'3G+4G':['F','V','OH']};
var ASME_GROOVE_PIPE={'1G':['F'],'2G':['F','H'],'5G':['F','V','OH'],'6G':['F','H','V','OH'],'2G+5G':['F','H','V','OH']};
var ASME_FILLET_PLATE={'1F':['F'],'2F':['F','H'],'3F':['F','H','V'],'4F':['F','H','OH'],'3F+4F':['F','H','V','OH']};
var ASME_FILLET_PIPE={'1F':['F'],'2F':['F','H'],'4F':['F','H','OH'],'5F':['F','H','V','OH']};

function buildQualPositions(){
  var sys=_gv('q_sys'),form=_gv('q_form'),weld=_gv('q_weld');
  var sel=document.getElementById('q_pos'); if(!sel)return;
  var opts=[];
  if(sys==='iso'){
    if(weld==='butt') opts=form==='pipe'?['PA','PC','PE','PF','PG','PH','PJ','H-L045','J-L045']:['PA','PC','PE','PF','PG'];
    else opts=form==='pipe'?['PA','PB','PC','PD','PE','PF','PG','PH','PJ']:['PA','PB','PC','PD','PE','PF','PG'];
  } else {
    if(weld==='butt') opts=form==='pipe'?['1G','2G','5G','6G','2G+5G']:['1G','2G','3G','4G','3G+4G'];
    else opts=form==='pipe'?['1F','2F','4F','5F']:['1F','2F','3F','4F','3F+4F'];
  }
  var cur=sel.value;
  sel.innerHTML=opts.map(function(o){return '<option '+(o===cur?'selected':'')+'>'+o+'</option>';}).join('');
  var dl=document.getElementById('q_dlbl'); if(dl)dl.style.display=(form==='pipe')?'':'none';
}
function calcQual(){
  var out=document.getElementById('qual_out'); if(!out)return;
  var sys=_gv('q_sys'),form=_gv('q_form'),weld=_gv('q_weld');
  var t=parseFloat(_gv('q_t'))||0, D=parseFloat(_gv('q_d'))||0, pos=_gv('q_pos');
  var thk='—',dia='—',posq='—',note='';
  var UNL=bili('không giới hạn','unlimited');
  if(sys==='iso'){
    if(weld==='butt'){
      if(t<3) thk=_rng(t,Math.max(3,2*t));
      else if(t<12) thk=_rng(3,2*t);
      else thk='3 mm → '+bili('không giới hạn (cần ≥3 lớp)','unlimited (needs ≥3 layers)');
    } else {
      if(t<3) thk=_rng(t,Math.max(3,2*t)); else thk='3 mm → '+UNL;
    }
    if(form==='pipe') dia = D<=25 ? _rng(D,2*D) : ('≥ '+_r1(Math.max(25,0.5*D))+' mm → '+UNL);
    var mapI=weld==='butt'?ISO_BUTT_POS:ISO_FILLET_POS;
    posq=(mapI[pos]||[pos]).join(', ');
    note=bili('Mỗi quá trình (ISO 4063) qualify riêng; 135↔138 và 121↔125 dùng lẫn. Hàn KHÔNG đệm lưng qualify CÓ đệm lưng (không ngược lại).','Each process qualifies itself; 135↔138 & 121↔125 interchangeable. No-backing qualifies with-backing, not vice-versa.');
  } else {
    if(t<12.7) thk=bili('không quy định min','no min')+' → '+_r1(2*t)+' mm (2t)';
    else thk=bili('không quy định min','no min')+' → '+bili('không giới hạn (≥3 lớp)','unlimited (≥3 layers)');
    if(form==='pipe'){
      if(D<25) dia=_r1(D)+' mm → '+UNL;
      else if(D<=73) dia='25 mm → '+UNL;
      else dia='73 mm (2⅞") → '+UNL;
    }
    var mapA=weld==='butt'?(form==='pipe'?ASME_GROOVE_PIPE:ASME_GROOVE_PLATE):(form==='pipe'?ASME_FILLET_PIPE:ASME_FILLET_PLATE);
    var arr=mapA[pos]||[]; posq=arr.length?arr.map(_posLabel).join(', '):'—';
    note=bili('Giới hạn đường kính chỉ áp dụng thợ tay/bán tự động. 6G hoặc 2G+5G phủ mọi vị trí. Thử GÓC không qualify mối giáp mép.','Diameter limits apply to manual/semi-auto only. 6G or 2G+5G covers all positions. A fillet test does NOT qualify groove.');
  }
  out.innerHTML='<b>'+bili('Phạm vi qualify','Qualified range')+' ('+(sys==='iso'?'ISO 9606-1':'ASME IX')+', '+(weld==='butt'?bili('giáp mép','butt'):bili('góc','fillet'))+'):</b>'+
    '<div style="margin-top:6px">📏 '+bili('Chiều dày','Thickness')+': <b>'+thk+'</b></div>'+
    (form==='pipe'?'<div>⭕ '+bili('Đường kính','Diameter')+': <b>'+dia+'</b></div>':'')+
    '<div>🧭 '+bili('Vị trí được hàn','Positions qualified')+': <b>'+posq+'</b></div>'+
    '<div class="muted" style="font-size:12px;margin-top:6px">'+note+'</div>';
}

/* ---------- PQR builder + range of approval ---------- */
function procThk(code,t,runs){
  if(code==='iso'){
    if(t<=3) return [0.7*t,2*t];
    if(runs==='single'){ if(t<=12) return [Math.max(3,0.5*t),1.3*t]; if(t<=100) return [0.5*t,1.1*t]; return [50,2*t]; }
    if(t<=12) return [3,2*t]; if(t<=100) return [0.5*t,2*t]; return [50,2*t];
  }
  if(t<1.5) return [t,2*t];
  if(t<38) return [t<9.5?1.5:4.8,2*t];
  if(t<=150) return [4.8,200];
  return [4.8,1.33*t];
}
function _wvP(id){var el=document.getElementById(id);var v=(el&&el.value||'').trim();return v||'—';}
function genPQR(){
  var code=_gv('p_code'), runs=_gv('p_runs'), form=_gv('p_form'), proc=_gv('p_proc');
  var t=parseFloat(_gv('p_t'))||0, D=parseFloat(_gv('p_d'))||0;
  var k=proc.indexOf('121')===0?1:proc.indexOf('141')===0?0.6:0.8;
  var a=parseFloat(_gv('p_amp')),v=parseFloat(_gv('p_volt')),s=parseFloat(_gv('p_spd'));
  var hi='—'; if(a>0&&v>0&&s>0) hi=((a*v*60*k)/(s*1000)).toFixed(2)+' kJ/mm (k='+k+')';
  var tr=procThk(code,t,runs); var thkRange=t>0?_rng(tr[0],tr[1]):'—';
  var diaRange='—';
  if(form==='pipe'&&D>0){ diaRange = code==='iso' ? (D<=25?_rng(0.5*D,2*D):('≥ '+_r1(0.5*D)+' mm')) : bili('không giới hạn theo đường kính (theo độ dày)','no diameter limit (governed by thickness)'); }
  var codeName=code==='iso'?'ISO 15614-1 (Level 2)':'ASME IX (QW-451.1)';
  var rows=[
    ['Công ty / Company',_wvP('p_co')],['Số PQR / PQR No.',_wvP('p_no')],['Tiêu chuẩn / Code',codeName],
    ['Quá trình / Process',_wvP('p_proc')],['Dạng mẫu / Coupon',form==='pipe'?'Pipe':'Plate'],['Số lớp / Runs',runs==='single'?'Single-run':'Multi-run'],
    ['Vật liệu nền / Base metal',_wvP('p_base')],['Chiều dày mẫu / Thickness (mm)',_wvP('p_t')],['Đường kính / Diameter (mm)',_wvP('p_d')],
    ['Que dây / Filler',_wvP('p_fill')],['Vị trí / Position',_wvP('p_pos')],
    ['Tiền nhiệt / Preheat (°C)',_wvP('p_pre')],['Interpass max (°C)',_wvP('p_inter')],['PWHT',_wvP('p_pwht')],
    ['Dòng / Amps (A)',_wvP('p_amp')],['Điện áp / Volts (V)',_wvP('p_volt')],['Tốc độ / Travel (mm/min)',_wvP('p_spd')],['Nhiệt đầu vào / Heat input',hi]
  ];
  var res=[
    ['Kéo / Tensile Rm (MPa)',_wvP('p_ts')+'  ('+bili('đứt tại','fracture')+': '+_wvP('p_tf')+')'],
    ['Uốn / Bend',_gv('p_bend')],['Va đập / Charpy (J)',_wvP('p_cv')],
    ['Độ cứng / Hardness (HV)',_wvP('p_hv')],['Macro',_gv('p_macro')],['VT/RT/UT',_gv('p_ndt')]
  ];
  var appr=[
    ['Phạm vi chiều dày / Thickness range',thkRange],
    ['Phạm vi đường kính / Diameter range',diaRange],
    ['Nhiệt đầu vào / Heat input',hi==='—'?'—':bili('±25% giá trị thử (impact: chỉ +25%; hardness: chỉ −25%)','±25% (impact: +25% only; hardness: −25% only)')],
    ['Tiền nhiệt / Preheat',code==='iso'?bili('tối thiểu = thử − 50°C','min = tested − 50°C'):bili('theo QW-406','per QW-406')],
    ['Interpass',code==='iso'?bili('tối đa = thử + 50°C (trừ nhóm 8/10/41-48)','max = tested + 50°C (except gp 8/10/41-48)'):bili('theo QW-407','per QW-407')]
  ];
  var today=new Date().toLocaleDateString('vi-VN');
  var tbl=function(title,arr){return '<div style="font-weight:700;margin:10px 0 4px;font-size:13px">'+title+'</div><table style="width:100%;border-collapse:collapse;font-size:12.5px">'+arr.map(function(r){return '<tr><td style="border:1px solid #bbb;padding:4px 7px;width:50%;color:#444">'+r[0]+'</td><td style="border:1px solid #bbb;padding:4px 7px;font-weight:600">'+r[1]+'</td></tr>';}).join('')+'</table>';};
  var doc='<div id="pqr_print" style="background:#fff;color:#111;border:1px solid #ccc;border-radius:8px;padding:16px">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #111;padding-bottom:6px;margin-bottom:6px"><b style="font-size:15px">PROCEDURE QUALIFICATION RECORD (PQR / WPQR)</b><span style="font-size:12px;color:#444">'+today+'</span></div>'
    +tbl('① THÔNG SỐ HÀN / WELDING PARAMETERS',rows)
    +tbl('② KẾT QUẢ THỬ / TEST RESULTS',res)
    +tbl('③ PHẠM VI PHÊ DUYỆT / RANGE OF APPROVAL ('+codeName+')',appr)
    +'<p style="font-size:11px;color:#666;margin-top:8px">Tham khảo theo '+codeName+' — phạm vi tính tự động; kỹ sư hàn (IWE/IWT) phải duyệt & ký. / Indicative; a welding engineer must approve & sign.</p></div>';
  document.getElementById('pqr_doc').innerHTML=doc;
  document.getElementById('p_print').style.display='';
}
function printPQR(){
  var el=document.getElementById('pqr_print'); if(!el)return;
  var w=window.open('','_blank'); if(!w){alert('Cho phép pop-up để in.');return;}
  w.document.write('<html><head><title>PQR</title><meta charset="utf-8"></head><body style="font-family:Arial,sans-serif;margin:16px">'+el.outerHTML+'</body></html>');
  w.document.close(); w.focus(); setTimeout(function(){w.print();},300);
}

/* ---------- premium tool HTML ---------- */
function premiumLockHTML(){
  return '<div class="card" style="border-color:rgba(255,122,51,.45)">'
    +'<h3>🔒 '+bili('Công cụ Premium','Premium tools')+' — '+CONFIG.premiumName+'</h3>'
    +'<p class="muted" style="font-size:13px">'+bili('Mở khóa công cụ chuyên sâu cho thanh tra/kỹ sư hàn:','Unlock pro tools for inspectors/engineers:')+'</p>'
    +'<ul class="lesson">'
    +'<li>👷 '+bili('<b>Tính phạm vi qualify thợ</b> — ISO 9606-1 & ASME IX: độ dày, đường kính, vị trí.','<b>Welder qualification range</b> — ISO 9606-1 & ASME IX.')+'</li>'
    +'<li>🧰 '+bili('<b>Tạo PQR/WPQR</b> — nhập kết quả thử, tự tính phạm vi phê duyệt, in hồ sơ.','<b>PQR/WPQR builder</b> — test results + auto range of approval, printable.')+'</li>'
    +'<li>📝 '+bili('<b>Tư vấn WPS</b> — gợi ý tiền nhiệt & nhiệt đầu vào (bản cơ bản đã có ở trên).','<b>WPS consulting</b> — preheat & heat-input hints.')+'</li>'
    +'</ul>'
    +'<div class="row" style="justify-content:flex-start;margin-top:6px"><button class="btn" onclick="go(\'profile\')">⭐ '+bili('Nâng cấp / Nhập mã','Upgrade / Enter code')+' ('+fmtPrice()+')</button></div>'
    +'<p class="muted" style="font-size:11px;margin-top:8px">'+bili('Tính theo tiêu chuẩn nhưng mang tính tham khảo — kỹ sư hàn phải duyệt hồ sơ cuối.','Per the standards but indicative — a welding engineer must approve final records.')+'</p>'
    +'</div>';
}
function premiumToolsHTML(){
  return '<div class="card" style="border-color:rgba(52,199,89,.35)">'
    +'<h3>⭐ '+bili('Công cụ Premium đã mở khóa','Premium tools unlocked')+'</h3>'
    +'<p class="muted" style="font-size:12px">'+bili('Theo ISO 9606-1 / ISO 15614-1 / ASME IX — THAM KHẢO; kỹ sư hàn phải duyệt.','Per ISO 9606-1 / ISO 15614-1 / ASME IX — indicative; engineer must approve.')+'</p></div>'
    +'<div class="card"><h3>👷 '+bili('Tính phạm vi qualify thợ hàn','Welder qualification range')+'</h3>'
    +'<div class="tool-grid">'
    +'<label>'+bili('Hệ tiêu chuẩn','System')+'<select id="q_sys" onchange="buildQualPositions();calcQual()"><option value="iso">ISO 9606-1</option><option value="asme">ASME IX</option></select></label>'
    +'<label>'+bili('Dạng mẫu','Coupon')+'<select id="q_form" onchange="buildQualPositions();calcQual()"><option value="plate">'+bili('Tấm','Plate')+'</option><option value="pipe">'+bili('Ống','Pipe')+'</option></select></label>'
    +'<label>'+bili('Loại mối hàn','Weld type')+'<select id="q_weld" onchange="buildQualPositions();calcQual()"><option value="butt">'+bili('Giáp mép (BW)','Butt')+'</option><option value="fillet">'+bili('Góc (FW)','Fillet')+'</option></select></label>'
    +'<label>'+bili('Chiều dày mẫu t','Test thk t')+' (mm)<input type="number" min="0" step="0.5" id="q_t" value="10" oninput="calcQual()"></label>'
    +'<label id="q_dlbl">'+bili('Đường kính ngoài D','Outside dia D')+' (mm)<input type="number" min="0" step="1" id="q_d" value="168" oninput="calcQual()"></label>'
    +'<label>'+bili('Vị trí thi','Test position')+'<select id="q_pos" onchange="calcQual()"></select></label>'
    +'</div><div id="qual_out" class="tool-out">—</div></div>'
    +'<div class="card"><h3>🧰 '+bili('Tạo PQR / WPQR','PQR / WPQR builder')+'</h3>'
    +'<p class="muted" style="font-size:12px">'+bili('Nhập thông số + kết quả thử → tự tính phạm vi phê duyệt & in hồ sơ.','Enter parameters + test results → auto range of approval & printable.')+'</p>'
    +'<div class="tool-grid">'
    +'<label>'+bili('Công ty','Company')+'<input id="p_co" placeholder="—"></label>'
    +'<label>'+bili('Số PQR','PQR No.')+'<input id="p_no" placeholder="PQR-001"></label>'
    +'<label>'+bili('Tiêu chuẩn','Code')+'<select id="p_code"><option value="iso">ISO 15614-1</option><option value="asme">ASME IX</option></select></label>'
    +'<label>'+bili('Quá trình','Process')+'<select id="p_proc"><option>111 MMA</option><option>135 MAG</option><option>136 FCAW</option><option>141 TIG</option><option>121 SAW</option></select></label>'
    +'<label>'+bili('Dạng mẫu','Coupon')+'<select id="p_form"><option value="plate">'+bili('Tấm','Plate')+'</option><option value="pipe">'+bili('Ống','Pipe')+'</option></select></label>'
    +'<label>'+bili('Số lớp','Runs')+'<select id="p_runs"><option value="multi">'+bili('Nhiều lớp','Multi-run')+'</option><option value="single">'+bili('Một lớp','Single-run')+'</option></select></label>'
    +'<label>'+bili('Vật liệu nền','Base metal')+'<input id="p_base" placeholder="S355 / P-No.1"></label>'
    +'<label>'+bili('Chiều dày t','Thickness t')+' (mm)<input id="p_t" value="12"></label>'
    +'<label>'+bili('Đường kính D','Diameter D')+' (mm)<input id="p_d" placeholder="—"></label>'
    +'<label>'+bili('Que/dây','Filler')+'<input id="p_fill" value="E7018 / FM1"></label>'
    +'<label>'+bili('Vị trí','Position')+'<input id="p_pos" value="PF / 3G"></label>'
    +'<label>'+bili('Tiền nhiệt','Preheat')+' (°C)<input id="p_pre" value="100"></label>'
    +'<label>Interpass max (°C)<input id="p_inter" value="250"></label>'
    +'<label>PWHT<input id="p_pwht" placeholder="—"></label>'
    +'<label>'+bili('Dòng','Amps')+' (A)<input id="p_amp" value="160"></label>'
    +'<label>'+bili('Điện áp','Volts')+' (V)<input id="p_volt" value="23"></label>'
    +'<label>'+bili('Tốc độ','Travel')+' (mm/'+bili('ph','min')+')<input id="p_spd" value="180"></label>'
    +'</div>'
    +'<h4 style="color:var(--accent2);font-size:13px;margin:12px 0 2px">'+bili('Kết quả thử (DT/NDT)','Test results')+'</h4>'
    +'<div class="tool-grid">'
    +'<label>'+bili('Kéo Rm','Tensile Rm')+' (MPa)<input id="p_ts" placeholder="≥510"></label>'
    +'<label>'+bili('Vị trí đứt','Fracture')+'<input id="p_tf" placeholder="Nền / Base"></label>'
    +'<label>'+bili('Uốn','Bend')+'<select id="p_bend"><option>'+bili('Đạt','Accept')+'</option><option>'+bili('Không đạt','Reject')+'</option></select></label>'
    +'<label>'+bili('Charpy','Charpy')+' (J)<input id="p_cv" placeholder="60 @ -20°C"></label>'
    +'<label>'+bili('Độ cứng max','Hardness max')+' (HV)<input id="p_hv" placeholder="≤350"></label>'
    +'<label>Macro<select id="p_macro"><option>'+bili('Đạt','Accept')+'</option><option>'+bili('Không đạt','Reject')+'</option></select></label>'
    +'<label>VT/RT/UT<select id="p_ndt"><option>'+bili('Đạt','Accept')+'</option><option>'+bili('Không đạt','Reject')+'</option></select></label>'
    +'</div>'
    +'<div class="row" style="margin-top:10px;gap:8px;justify-content:flex-start"><button class="btn" onclick="genPQR()">'+bili('Tạo PQR','Generate PQR')+'</button>'
    +'<button class="btn sec" id="p_print" onclick="printPQR()" style="display:none">🖨️ '+bili('In / Lưu PDF','Print / Save PDF')+'</button></div>'
    +'<div id="pqr_doc" style="margin-top:10px"></div></div>';
}

/* ---------- override renderTools (wrap) ---------- */
var _origRenderTools = (typeof renderTools==='function') ? renderTools : function(){};
renderTools = function(){
  _origRenderTools();
  var host=document.getElementById('v-tools'); if(!host)return;
  var div=document.createElement('div');
  div.innerHTML = isPremium() ? premiumToolsHTML() : premiumLockHTML();
  host.appendChild(div);
  if(isPremium()){ try{ buildQualPositions(); calcQual(); }catch(e){} }
};

/* ---------- profile premium card + history ---------- */
function examHistoryHTML(){
  var u=_curUser(); var h=(u.history&&u.history.length)?u.history:[];
  if(!h.length) return '<div class="card"><h3>📈 '+bili('Lịch sử thi thử','Mock-exam history')+'</h3><p class="muted" style="font-size:13px">'+bili('Chưa có lượt thi. Vào tab Quiz làm một đề có giờ để bắt đầu ghi điểm.','No attempts yet. Take a timed quiz to start logging scores.')+'</p></div>';
  return '<div class="card"><h3>📈 '+bili('Lịch sử thi thử','Mock-exam history')+'</h3>'
    +'<div class="tbl-wrap"><table class="deep-tbl"><thead><tr><th>'+bili('Ngày','Date')+'</th><th>'+bili('Bộ đề','Set')+'</th><th>'+bili('Điểm','Score')+'</th><th>%</th></tr></thead><tbody>'
    +h.map(function(r){return '<tr><td>'+r.d+'</td><td>'+(r.label||'-')+'</td><td>'+r.s+'/'+r.t+'</td><td style="color:'+(r.p>=70?'var(--green)':'var(--red)')+';font-weight:700">'+r.p+'%</td></tr>';}).join('')
    +'</tbody></table></div></div>';
}
function premiumCardHTML(){
  if(isPremium()){
    return '<div class="card" style="border-color:rgba(52,199,89,.4)">'
      +'<h3>⭐ '+CONFIG.premiumName+' — <span style="color:var(--green)">'+bili('Đã kích hoạt','Active')+'</span></h3>'
      +'<p class="muted" style="font-size:13px">'+bili('Hiệu lực','Valid')+': <b>'+premiumExpiryText()+'</b> · '+bili('cho','for')+' <b>'+_esc(_curUser().name)+'</b></p>'
      +'<p class="muted" style="font-size:13px;margin-top:6px">'+bili('Đã mở khóa toàn bộ công cụ Premium ở tab 🛠️ Công cụ.','All premium tools unlocked in the 🛠️ Tools tab.')+'</p></div>';
  }
  var qr=vietQRUrl();
  var momoBlock = CONFIG.momo ? '<div style="background:rgba(192,108,255,.1);border:1px solid rgba(192,108,255,.4);border-radius:10px;padding:10px;margin-top:10px;text-align:center"><b style="color:#c06cff">📲 MoMo</b><div style="font-size:20px;font-weight:800;margin-top:2px">'+CONFIG.momo+'</div><div class="muted" style="font-size:12px">'+bili('Mở MoMo → Chuyển tiền → nhập số trên → '+fmtPrice(),'MoMo → Transfer → number above → '+fmtPrice())+'</div></div>' : '';
  var bankBlock = qr ? '<div style="text-align:center;margin-top:10px"><img src="'+qr+'" alt="QR" style="width:200px;max-width:80%;border-radius:12px;background:#fff;padding:6px"><div class="muted" style="font-size:12px;margin-top:4px">'+bili('Quét QR chuyển khoản','Scan to pay')+' · '+CONFIG.bankCode+' '+CONFIG.accountNo+(CONFIG.accountName?' · '+CONFIG.accountName:'')+'</div></div>' : '';
  var contactBlock = '<p class="muted" style="font-size:12px;margin-top:8px">'+bili('Sau khi chuyển, gửi SĐT + biên lai để nhận mã','After paying, send your PHONE + receipt')+': <b>'+(CONFIG.contactEmail||'')+'</b>'+(CONFIG.contactZalo?' · Zalo/MoMo '+CONFIG.contactZalo:'')+'</p>';
  var pay = momoBlock + bankBlock + contactBlock;
  return '<div class="card" style="border-color:rgba(255,122,51,.45)">'
    +'<h3>⭐ '+CONFIG.premiumName+' — <span class="muted">'+bili('Nâng cấp','Upgrade')+'</span></h3>'
    +'<div style="font-size:24px;font-weight:800;color:var(--accent)">'+fmtPrice()+'</div>'
    +'<p class="muted" style="font-size:13px;margin-top:4px">'+CONFIG.planNote+'</p>'
    +'<ul class="lesson" style="margin-top:6px">'
    +'<li>👷 '+bili('Tính phạm vi qualify thợ (ISO 9606-1 & ASME IX)','Welder qualification range')+'</li>'
    +'<li>🧰 '+bili('Tạo PQR/WPQR có kết quả thử & phạm vi phê duyệt','PQR/WPQR with test results & range of approval')+'</li>'
    +'<li>📝 '+bili('Tư vấn WPS, gợi ý tiền nhiệt & nhiệt đầu vào','WPS consulting, preheat & heat-input hints')+'</li>'
    +'</ul>'
    +'<div class="row" style="justify-content:flex-start;margin-top:10px"><button class="btn" onclick="buyNow()">📩 '+bili('Mua ngay','Buy now')+' — '+fmtPrice()+'</button></div>'
    +'<div style="background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:12px;padding:12px;margin-top:10px">'
    +'<b style="font-size:14px">'+bili('Cách kích hoạt','How to activate')+'</b>'
    +'<ol class="muted" style="font-size:13px;margin:6px 0 0 18px;line-height:1.7">'
    +'<li>'+bili('Nhập đúng <b>Số điện thoại</b> ở trên (số bạn báo khi mua).','Enter your <b>phone</b> above (the one you gave when buying).')+'</li>'
    +'<li>'+bili('Chuyển khoản theo QR/thông tin bên dưới.','Pay via the QR/info below.')+'</li>'
    +'<li>'+bili('Gửi <b>SĐT</b> + biên lai cho người bán để nhận <b>mã</b>.','Send your <b>phone</b> + receipt to get a <b>code</b>.')+'</li>'
    +'<li>'+bili('Dán mã vào ô dưới rồi bấm Kích hoạt.','Paste the code and tap Activate.')+'</li></ol>'
    +pay
    +'<div class="tool-grid" style="margin-top:12px;grid-template-columns:1fr"><label>'+bili('Mã kích hoạt','Activation code')+'<input id="act_code" placeholder="CSWIP-L-XXXXXXX"></label></div>'
    +'<div class="row" style="justify-content:flex-start;margin-top:8px"><button class="btn" onclick="doActivate()">🔓 '+bili('Kích hoạt','Activate')+'</button></div>'
    +'<div id="act_msg" style="margin-top:8px;font-size:13px"></div>'
    +'</div></div>';
}
function doActivate(){
  var c=(document.getElementById('act_code')||{}).value||'';
  var r=applyCode(c);
  var m=document.getElementById('act_msg');
  if(m) m.innerHTML='<span style="color:'+(r.ok?'var(--green)':'var(--red)')+'">'+r.msg+'</span>';
  if(r.ok){ try{window.cloudSync&&window.cloudSync();}catch(e){} setTimeout(function(){renderProfile();},900); }
}
function buyNow(){
  var u=_curUser();
  var to=(CONFIG.contactEmail||'');
  var subj=encodeURIComponent('Mua '+(CONFIG.premiumName||'CSWIP PRO'));
  var body=encodeURIComponent('Toi muon mua goi '+(CONFIG.premiumName||'CSWIP PRO')+' ('+fmtPrice()+').\n'+
    'Ho ten cua toi (de tao ma kich hoat): '+((u.name)||'')+'\n'+
    'Da chuyen khoan: [dinh kem bien lai]\n');
  if(to) window.location.href='mailto:'+to+'?subject='+subj+'&body='+body;
  else alert('Chưa cấu hình liên hệ. / Contact not configured.');
}

/* ---------- override renderProfile ---------- */
renderProfile = function(){
  var s=_scoreStats(); var u=_curUser();
  document.getElementById('v-profile').innerHTML=
    '<div class="card"><h2>👤 '+bili('Hồ sơ học viên','Learner profile')+'</h2>'
    +'<p class="muted" style="font-size:13px">'+bili('Ghi tên để app chấm điểm theo bạn. Dữ liệu lưu trên máy bạn (riêng tư).','Enter your name so the app scores you. Stored privately on your device.')+'</p>'
    +'<div class="tool-grid">'
    +'<label>'+bili('Họ tên','Full name')+'<input id="u_name" value="'+_esc(u.name)+'" oninput="saveUserField(\'name\',this.value)"></label>'
    +'<label>'+bili('SĐT (kích hoạt)','Phone (activation)')+'<input id="u_phone" value="'+_esc(u.phone)+'" oninput="saveUserField(\'phone\',this.value)"></label>'
    +'<label>'+bili('Đơn vị','Company')+'<input id="u_org" value="'+_esc(u.org)+'" oninput="saveUserField(\'org\',this.value)"></label>'
    +'<label>Email<input id="u_email" value="'+_esc(u.email)+'" oninput="saveUserField(\'email\',this.value)"></label>'
    +'</div></div>'
    +'<div class="card"><h3>📊 '+bili('Bảng điểm','Scorecard')+'</h3>'
    +'<div class="score-grid">'
    +'<div class="score-cell"><b>'+s.done+'/'+s.total+'</b><span>'+bili('Chương xong','Chapters')+'</span></div>'
    +'<div class="score-cell"><b>'+s.correct+'/'+s.ans+'</b><span>'+bili('Quiz đúng/đã làm','Quiz correct/done')+'</span></div>'
    +'<div class="score-cell"><b style="color:'+(s.pct>=70?'var(--green)':'var(--accent)')+'">'+s.pct+'%</b><span>'+bili('Tỉ lệ đúng','Accuracy')+'</span></div>'
    +'</div>'
    +'<p class="muted" style="font-size:12px;margin-top:6px">'+(s.pct>=70?'✅ '+bili('Đạt mốc 70% (mô phỏng)','Meets the 70% mark (mock)'):bili('Cần ≥70% để đạt mốc thi.','Aim for ≥70%.'))+'</p>'
    +'<div class="row" style="margin-top:10px;gap:8px;justify-content:flex-start">'
    +'<button class="btn" onclick="printScorecard()">🖨️ '+bili('In bảng điểm','Print scorecard')+'</button>'
    +'<button class="btn sec" onclick="resetProgress()">'+bili('Đặt lại tiến độ','Reset progress')+'</button>'
    +'</div></div>'
    + examResultsHTML()
    + examHistoryHTML()
    + premiumCardHTML()
    + adminPanelHTML();
};

/* ---------- wrap renderQuiz to log mock-exam scores ---------- */
var _origRenderQuiz = (typeof renderQuiz==='function') ? renderQuiz : function(){};
renderQuiz = function(){
  var _justExam=null;
  try{
    var _atEnd=(typeof Qmode!=='undefined' && Qmode!=='menu' && typeof Qi!=='undefined' && Qi>=Qz.length && Qz.length);
    if(_atEnd && Qsource && !Qsource._logged){
      logExam(Qscore, Qz.length, Qsource.label||'Quiz'); Qsource._logged=true; try{window.cloudSync&&window.cloudSync();}catch(e){}
    }
    if(_atEnd && Qsource && Qsource._exam!==undefined && Qsource._exam!==null && !Qsource._examLogged){
      var _pct=Math.round(Qscore/Qz.length*100);
      recordChapExam(Qsource._exam, _pct, Qscore, Qz.length);
      Qsource._examLogged=true; _justExam={ci:Qsource._exam,pct:_pct};
      try{window.cloudSync&&window.cloudSync();}catch(e){}
    }
  }catch(e){}
  var _ret=_origRenderQuiz.apply(this, arguments);
  if(_justExam){ try{ _appendExamBanner(_justExam.ci, _justExam.pct); }catch(e){} }
  return _ret;
};

/* ================= FREEMIUM: Chương 1 FREE, chương 2+ cần PRO ================= */
/* ============== LỘ TRÌNH THI: đậu ≥70% chương trước + PRO mới mở chương sau ============== */
var PASS_MARK=70;
function examData(){ try{ return JSON.parse(localStorage.getItem('cswip_exam')||'{}'); }catch(e){ return {}; } }
function saveExamData(d){ try{ localStorage.setItem('cswip_exam', JSON.stringify(d)); }catch(e){} }
function chapResult(i){ var d=examData(); return d[i]||null; }
function chapPassed(i){ var e=chapResult(i); return !!(e && e.best>=PASS_MARK); }
function chaptersPassedCount(){ var d=examData(),n=0; for(var k in d){ if(d[k]&&d[k].best>=PASS_MARK) n++; } return n; }
function recordChapExam(ci,pct,correct,total){
  var d=examData(); var e=d[ci]||{best:0,attempts:0};
  e.attempts=(e.attempts||0)+1; e.last=pct; e.lastCorrect=correct; e.lastTotal=total;
  if(pct>(e.best||0)) e.best=pct;
  e.passed=e.best>=PASS_MARK; e.date=new Date().toISOString().slice(0,10);
  d[ci]=e; saveExamData(d);
}
/* Đề thi chương = câu của chương (sát bài học) + câu đề thật cùng chủ đề (nâng cao) */
var CHAP_CATS={0:['Duties'],1:['Processes','Heat input'],2:['Consumables'],3:['Symbols'],4:['Defects'],5:['DT'],6:['NDT'],7:['WPS/PQR'],8:['Materials'],9:['Heat treatment'],10:['Defects','Materials'],11:['Symbols','Codes'],12:['Codes'],13:['Equipment','Calculation'],14:['Safety'],15:['Terminology'],16:['Thermal cutting'],17:['In-service']};
function examPool(ci){
  var own=[]; try{ own=poolChapters().filter(function(q){ return q.id && q.id.indexOf('c'+ci+'-')===0; }); }catch(e){}
  var cats=CHAP_CATS[ci]||[]; var extra=[];
  if(cats.length){ try{ extra=poolAll().filter(function(q){ return q.id && q.id.charAt(0)!=='c' && q.cat && cats.indexOf(q.cat)>=0; }); }catch(e){} }
  try{ extra=shuffle(extra.slice()); }catch(e){}
  var target=18, pool=own.slice();
  var need=Math.max(0, target-pool.length);
  pool=pool.concat(extra.slice(0,need));
  if(pool.length>24) pool=pool.slice(0,24);
  try{ pool=shuffle(pool); }catch(e){}
  return pool;
}
function examChap(ci){
  if(typeof chapFree==='function' && !chapFree(ci)){ go('learn'); openChap(ci); return; }
  var pool=examPool(ci);
  if(!pool||!pool.length){ alert('Chương này chưa có câu hỏi thi.'); return; }
  go('quiz');
  var mins=Math.max(8, Math.round(pool.length*1.2));
  startSet(pool, mins*60, '📝 '+bili('Thi Chương ','Exam Ch.')+(ci+1));
  try{ if(Qsource) Qsource._exam=ci; }catch(e){}
}
function _appendExamBanner(ci, pct){
  var el=document.getElementById('v-quiz'); if(!el) return;
  var pass=pct>=PASS_MARK, nextI=ci+1, hasNext=nextI<DATA.chapters.length, msg;
  if(pass){
    msg='<div class="card" style="border-color:rgba(52,199,89,.55);text-align:center"><div style="font-size:36px">🎉</div><h3 style="color:var(--green)">'+bili('Đậu Chương '+(ci+1)+'!','Passed Chapter '+(ci+1)+'!')+'</h3>';
    if(hasNext){
      if(typeof isPremium==='function' && isPremium()) msg+='<p class="muted">'+bili('Đã mở Chương '+(nextI+1)+'. Học tiếp nhé!','Chapter '+(nextI+1)+' unlocked!')+'</p><button class="btn" onclick="go(\'learn\');openChap('+nextI+')">'+bili('Vào Chương ','Go to Ch ')+(nextI+1)+' →</button>';
      else msg+='<p class="muted">'+bili('Mở khóa PRO để học tiếp Chương '+(nextI+1)+' + toàn bộ.','Unlock PRO to continue.')+'</p>'+unlockBtn();
    } else { msg+='<p class="muted">'+bili('Bạn đã hoàn thành chương cuối! 👏','You finished the last chapter!')+'</p>'; }
    msg+='</div>';
  } else {
    msg='<div class="card" style="border-color:rgba(255,122,51,.5);text-align:center"><div style="font-size:36px">💪</div><h3>'+bili('Chưa đạt (cần ≥70%)','Not passed (need ≥70%)')+'</h3><p class="muted">'+bili('Ôn lại Chương '+(ci+1)+' rồi thi lại để mở chương sau.','Review and retry.')+'</p><button class="btn" onclick="examChap('+ci+')">🔁 '+bili('Thi lại','Retry')+'</button> <button class="btn sec" onclick="go(\'learn\');openChap('+ci+')">'+bili('Ôn lại chương','Review')+'</button></div>';
  }
  el.insertAdjacentHTML('beforeend', msg);
}
function examLockHTML(i){
  var prev=DATA.chapters[i-1], r=chapResult(i-1);
  return '<div class="card" style="border-color:rgba(76,168,255,.5);text-align:center"><div style="font-size:42px">🔐</div>'
   +'<h2 style="margin-top:6px">'+bili('Cần thi đậu chương trước','Pass the previous chapter')+'</h2>'
   +'<p class="muted" style="font-size:14px;margin-top:6px">'+bili('Bạn cần thi đậu (≥70%) Chương '+i+': <b>'+prev.vi+'</b> mới mở được chương này. Học theo lộ trình giúp chắc kiến thức, sát đề thi thật.','Pass Chapter '+i+' (≥70%) first.')+'</p>'
   +(r?('<p style="font-size:14px;margin-top:6px">'+bili('Điểm cao nhất','Best')+': <b style="color:'+(r.best>=PASS_MARK?'var(--green)':'var(--accent)')+'">'+r.best+'%</b></p>'):'')
   +'<div class="row" style="margin-top:12px;justify-content:center"><button class="btn" onclick="examChap('+(i-1)+')">📝 '+bili('Thi Chương ','Take Chapter ')+i+'</button></div></div>';
}
function examResultsHTML(){
  var d=examData(), rows='';
  for(var i=0;i<DATA.chapters.length;i++){ var r=d[i]; if(!r) continue; var pass=r.best>=PASS_MARK;
    rows+='<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px dashed var(--line);font-size:13px;gap:8px"><span>'+bili('Chương ','Ch ')+(i+1)+'. '+_esc(DATA.chapters[i].vi)+'</span><span style="color:'+(pass?'var(--green)':'var(--accent)')+';font-weight:700;white-space:nowrap">'+(pass?'✅ ':'⚠️ ')+r.best+'%</span></div>';
  }
  if(!rows) rows='<p class="muted" style="font-size:13px">'+bili('Chưa thi chương nào. Vào Bài học rồi bấm "Thi chương" để bắt đầu.','No chapter exams yet.')+'</p>';
  return '<div class="card"><h3>🎯 '+bili('Kết quả thi từng chương','Chapter exam results')+'</h3><p class="muted" style="font-size:12px">'+bili('Đã đậu ','Passed ')+'<b>'+chaptersPassedCount()+'/'+DATA.chapters.length+'</b> '+bili('chương (mốc 70%)','chapters (70%)')+'</p>'+rows+'</div>';
}
/* ===== Cổng chương: Ch1 free; Ch2+ cần PRO + đậu chương liền trước ===== */
function chapFree(i){ if(i===0) return true; if(!isPremium()) return false; return chapPassed(i-1); }
function chapLockReason(i){ if(chapFree(i)) return null; if(!isPremium()) return 'pro'; return 'exam'; }
function unlockBtn(){ return '<div class="row" style="margin-top:10px;justify-content:flex-start"><button class="btn" onclick="go(\'profile\')">⭐ '+bili('Mở khóa ngay','Unlock now')+' — '+fmtPrice()+'</button></div>'; }
function lockUpsellHTML(nextVi,nextEn){
  return '<div class="card" style="border-color:rgba(255,122,51,.55);text-align:center">'
   +'<div style="font-size:42px;line-height:1">🔒</div>'
   +'<h2 style="margin-top:6px">'+bili('Mở khóa để học tiếp','Unlock to continue')+'</h2>'
   +'<p class="muted" style="font-size:14px;margin-top:6px">'+bili('Chương 1 miễn phí 👏. Mở khóa <b>17 chương còn lại</b> + ngân hàng quiz đầy đủ + công cụ Pro (PQR, qualify thợ, WPS) với <b>'+(CONFIG.premiumName||'PRO')+'</b>.','Chapter 1 is free. Unlock the other 17 chapters + full quiz bank + Pro tools.')+'</p>'
   +(nextVi?'<p style="margin-top:8px;font-size:15px">'+bili('Tiếp theo','Up next')+': <b>'+nextVi+'</b> 🔓</p>':'')
   +'<div style="font-size:24px;font-weight:800;color:var(--accent);margin-top:8px">'+fmtPrice()+'</div>'
   +unlockBtn()+'</div>';
}
/* --- Bài học: list có khóa, chương 2+ mở ra màn nâng cấp --- */
openChap=function(i){ CURCHAP=i; renderLearn(); window.scrollTo(0,0); };
renderLearn=function(){
  var el=document.getElementById('v-learn');
  if(CURCHAP===null){
    el.innerHTML='<div class="card"><h2>📚 '+bili('Chương trình học','Syllabus')+'</h2>'
      +'<p class="muted">'+bili('Chương 1 học miễn phí. Hoàn thành rồi mở khóa toàn bộ để học tiếp.','Chapter 1 is free. Finish it, then unlock the rest.')+'</p></div>'
      +'<div class="chap-list">'+DATA.chapters.map(function(c,i){
        var free=chapFree(i), r=chapResult(i), num, sub, done='';
        if(!free){
          if(!isPremium()){ num='🔒'; sub='⭐ '+bili('Cần PRO','PRO'); }
          else { num='🔐'; sub=bili('Đậu Chương '+i+' để mở','Pass Ch '+i); }
        } else {
          num=(i+1);
          if(r && r.best>=PASS_MARK){ sub='✅ '+bili('Đậu ','Pass ')+r.best+'%'; done='✓'; }
          else if(r){ sub='⚠️ '+bili('Chưa đạt ','Below ')+r.best+'%'; }
          else { sub=c.lessons.length+' '+bili('mục','items')+' • '+c.quiz.length+' '+bili('câu thi','Q'); }
        }
        return '<div class="chap" onclick="openChap('+i+')"><div class="num">'+num+'</div>'
          +'<div class="meta"><b>'+bili(c.vi,c.en)+'</b><div class="muted" style="font-size:12px">'+sub+'</div></div>'
          +'<div class="done">'+done+'</div></div>';
      }).join('')+'</div>';
  } else {
    var c=DATA.chapters[CURCHAP];
    var back='<button class="back" onclick="CURCHAP=null;renderLearn()">← '+bili('Tất cả chương','All chapters')+'</button>';
    var _reason=chapLockReason(CURCHAP);
    if(_reason==='pro'){ el.innerHTML=back+lockUpsellHTML(c.vi,c.en); window.scrollTo(0,0); return; }
    if(_reason==='exam'){ el.innerHTML=back+examLockHTML(CURCHAP); window.scrollTo(0,0); return; }
    el.innerHTML=back+'<div class="card"><span class="pill">'+bili('Chương','Chapter')+' '+(CURCHAP+1)+'</span><h2>'+bili(c.vi,c.en)+'</h2>'
      +(c.intro?'<p class="muted" style="margin-top:8px">'+bili(c.intro.vi,c.intro.en)+'</p>':'')
      +'<ul class="lesson">'+c.lessons.map(function(L){return '<li>'+bili('<span class="term">'+L.t_vi+':</span> '+L.vi,(L.t_en?L.t_en+': ':'')+L.en)+'</li>';}).join('')+'</ul>'
      +(c.key?'<h3>🔑 '+bili('Điểm cần nhớ cho kỳ thi','Exam key points')+'</h3><ul class="lesson">'+c.key.map(function(k){return '<li>'+bili(k.vi,k.en)+'</li>';}).join('')+'</ul>':'')
      +(c.deep?'<h3>🔬 '+bili('Phân tích chuyên sâu','In-depth analysis')+'</h3><div class="deep-wrap">'+c.deep.map(function(b){return '<div class="deep-block"><h4>'+bili(b.h_vi,b.h_en)+'</h4>'+(b.body?b.body.map(function(p){return '<p class="deep-p">'+bili(p.vi,p.en)+'</p>';}).join(''):'')+(b.rows?'<ul class="lesson">'+b.rows.map(function(r){return '<li>'+bili(r.vi,r.en)+'</li>';}).join('')+'</ul>':'')+(b.table?'<div class="tbl-wrap"><table class="deep-tbl"><thead><tr>'+b.table.cols.map(function(col){return '<th>'+bili(col.vi,col.en)+'</th>';}).join('')+'</tr></thead><tbody>'+b.table.data.map(function(row){return '<tr>'+row.map(function(cell){return '<td>'+bili(cell.vi,cell.en)+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table></div>':'')+(b.foot?'<p class="muted deep-foot">'+bili(b.foot.vi,b.foot.en)+'</p>':'')+'</div>';}).join('')+'</div>':'')
      +'<div class="row" style="margin-top:16px;justify-content:flex-start;gap:8px;flex-wrap:wrap"><button class="btn '+(PROG[CURCHAP]?'sec':'')+'" onclick="toggleDone('+CURCHAP+')">'+(PROG[CURCHAP]?'✓ '+bili('Đã hoàn thành','Done'):bili('Đánh dấu hoàn thành','Mark done'))+'</button><button class="btn sec" onclick="go(\'quiz\');startChap('+CURCHAP+')">'+bili('Ôn quiz (hiện đáp án)','Practice')+'</button><button class="btn" onclick="examChap('+CURCHAP+')">📝 '+bili('Thi chương (chấm điểm)','Take exam')+'</button></div></div>'
      +(function(){ var r=chapResult(CURCHAP); if(!r) return ''; var p=r.best>=PASS_MARK; return '<div class="card" style="border-color:'+(p?'rgba(52,199,89,.5)':'rgba(255,122,51,.5)')+'"><b>'+(p?'✅ '+bili('Đã đậu chương này','Passed'):'⚠️ '+bili('Chưa đạt — thi lại để mở chương sau','Not passed yet'))+'</b><div class="muted" style="font-size:12px;margin-top:4px">'+bili('Điểm cao nhất','Best')+': '+r.best+'% · '+bili('gần nhất','last')+': '+(r.last||0)+'% · '+bili('số lần thi','attempts')+': '+(r.attempts||0)+'</div></div>'; })()
      +((!isPremium()&&CURCHAP===0)?'<div class="card" style="border-color:rgba(255,122,51,.55)"><h3>🎉 '+bili('Xong Chương 1! Còn 17 chương nữa','Chapter 1 done! 17 more')+'</h3><p class="muted" style="font-size:13px">'+bili('Chương 2 đang chờ — mở khóa để học tiếp toàn bộ + quiz đầy đủ + công cụ Pro.','Chapter 2 awaits — unlock to continue everything.')+'</p><div style="font-size:22px;font-weight:800;color:var(--accent)">'+fmtPrice()+'</div>'+unlockBtn()+'</div>':'');
  }
};
/* --- Flashcard: free chỉ Chương 1 --- */
buildFlash=function(){ FC=[]; DATA.chapters.forEach(function(c,ci){ if(isPremium()||ci===0){ c.lessons.forEach(function(L){ if(L.t_en)FC.push({q:L.t_en,a:L.t_vi+(L.vi?' — '+L.vi:''),c:c.vi}); }); } }); };
/* --- Quiz: free chỉ Chương 1; phần còn lại hiện màn nâng cấp --- */
function _quizLockView(){ var el=document.getElementById('v-quiz'); if(el) el.innerHTML=lockUpsellHTML('',''); }
(function(){
  var oChap=startChap,oCat=startCat,oFull=startFullMock,oReal=startReal,oCWI=startCWI,oTimed=startTimed;
  startChap=function(ci){ if(!chapFree(ci)){ _quizLockView(); return; } return oChap(ci); };
  startCat=function(c){ if(!isPremium()){ _quizLockView(); return; } return oCat(c); };
  startFullMock=function(){ if(!isPremium()){ _quizLockView(); return; } return oFull(); };
  startReal=function(){ if(!isPremium()){ _quizLockView(); return; } return oReal(); };
  startCWI=function(){ if(!isPremium()){ _quizLockView(); return; } return oCWI(); };
  startTimed=function(n,m){ if(!isPremium()){ _quizLockView(); return; } return oTimed(n,m); };
})();

/* ---------- first-run registration ---------- */
try{ maybeRegister(); }catch(e){}

/* ================= TRỢ LÝ HỎI ĐÁP NỔI (góc phải) ================= */
(function(){
  function aNorm(s){return (s||'').toString().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'d').toLowerCase();}
  function aEsc(s){return (s||'').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  var KB=[];
  try{
    DATA.chapters.forEach(function(c,ci){
      (c.lessons||[]).forEach(function(L){ KB.push({ci:ci,t:'lesson',term:(L.t_vi||'')+' / '+(L.t_en||''),vi:L.vi,en:L.en,text:aNorm((L.t_vi||'')+' '+(L.t_en||'')+' '+(L.vi||'')+' '+(L.en||''))}); });
      (c.key||[]).forEach(function(k){ KB.push({ci:ci,t:'key',term:'🔑 '+bili('Điểm cần nhớ','Key point'),vi:k.vi,en:k.en,text:aNorm((k.vi||'')+' '+(k.en||''))}); });
      (c.quiz||[]).forEach(function(q){ if(q&&q.exp) KB.push({ci:ci,t:'quiz',term:(q.vi||'')+' / '+(q.en||''),vi:q.exp.vi,en:q.exp.en,text:aNorm((q.vi||'')+' '+(q.en||'')+' '+(q.exp.vi||'')+' '+(q.exp.en||''))}); });
    });
  }catch(e){}
  function aSearch(query){
    var words=aNorm(query).split(/[^a-z0-9]+/).filter(function(w){return w.length>=2;});
    if(!words.length) return [];
    var scored=[];
    KB.forEach(function(it){ var s=0; words.forEach(function(w){ if(it.text.indexOf(w)>=0)s++; if(aNorm(it.term).indexOf(w)>=0)s++; }); if(s>0)scored.push({it:it,s:s}); });
    scored.sort(function(a,b){return b.s-a.s;});
    return scored.slice(0,3).map(function(x){return x.it;});
  }
  function chName(ci){ return (DATA.chapters[ci]&&DATA.chapters[ci].vi)||('Chương '+(ci+1)); }
  function answerHTML(query){
    var hits=aSearch(query);
    if(!hits.length) return '<div class="ai-bot">'+bili('Mình chưa thấy trong bài học 🤔. Bấm <b>Hỏi ChatGPT</b> bên dưới để hỏi sâu hơn nhé.','Not in the lessons. Tap <b>Ask ChatGPT</b> below for more.')+'</div>';
    return hits.map(function(it){
      var locked=(typeof chapFree==='function')?!chapFree(it.ci):false;
      var head='<div class="ai-src">📘 '+bili('Chương','Ch.')+' '+(it.ci+1)+' — '+aEsc(chName(it.ci))+(it.t==='quiz'?' · quiz':'')+'</div>';
      if(locked) return '<div class="ai-bot">'+head+'<div><b>'+aEsc(it.term)+'</b></div><div class="ai-lock">🔒 '+bili('Câu trả lời nằm trong chương PRO. Mở khóa để xem đầy đủ.','Answer is in a PRO chapter. Unlock to view.')+'</div><button class="ai-unlock" onclick="(document.getElementById(\'ai-panel\').classList.remove(\'on\'));go(\'profile\')">⭐ '+bili('Mở khóa','Unlock')+' '+fmtPrice()+'</button></div>';
      return '<div class="ai-bot">'+head+'<div style="font-weight:700;margin-bottom:3px">'+aEsc(it.term)+'</div><div>'+bili(aEsc(it.vi),aEsc(it.en))+'</div></div>';
    }).join('');
  }
  var css='#ai-fab{position:fixed;right:18px;bottom:18px;z-index:150;width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(135deg,#4ca8ff,#2f7fe0);color:#fff;font-size:24px;box-shadow:0 8px 24px rgba(76,168,255,.45);transition:.2s}'
   +'#ai-fab:hover{transform:scale(1.06)}'
   +'#ai-panel{position:fixed;right:18px;bottom:84px;z-index:150;width:min(370px,92vw);max-height:72vh;display:none;flex-direction:column;background:#0e1622;border:1px solid rgba(255,255,255,.14);border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.55);overflow:hidden}'
   +'#ai-panel.on{display:flex}'
   +'.ai-head{padding:12px 14px;background:linear-gradient(135deg,#1a2738,#101a26);font-weight:800;display:flex;justify-content:space-between;align-items:center;color:#eaeff7;font-size:15px}'
   +'.ai-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;font-size:14px;color:#eaeff7;line-height:1.5}'
   +'.ai-bot{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px 12px}'
   +'.ai-me{align-self:flex-end;background:linear-gradient(135deg,#4ca8ff,#2f7fe0);color:#06121f;border-radius:12px;padding:8px 12px;font-weight:600;max-width:85%}'
   +'.ai-src{font-size:11px;color:#94a3bb;margin-bottom:4px}'
   +'.ai-lock{color:#ffb15a;font-size:13px;margin-top:4px}'
   +'.ai-unlock{margin-top:7px;background:linear-gradient(135deg,#ff7a33,#ff5a1f);border:none;color:#1a1206;font-weight:700;border-radius:8px;padding:6px 11px;cursor:pointer;font-size:13px}'
   +'.ai-in{display:flex;gap:6px;padding:10px;border-top:1px solid rgba(255,255,255,.1)}'
   +'.ai-in input{flex:1;min-width:0;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:10px;color:#eaeff7;padding:9px;font-size:14px}'
   +'.ai-in button{background:#4ca8ff;border:none;color:#06121f;font-weight:700;border-radius:10px;padding:0 14px;cursor:pointer}'
   +'.ai-gpt{margin:0 10px 10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:#eaeff7;border-radius:10px;padding:9px;cursor:pointer;font-size:13px;font-weight:600}';
  function build(){
    if(document.getElementById('ai-fab')) return;
    var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
    var fab=document.createElement('button'); fab.id='ai-fab'; fab.innerHTML='💬'; fab.setAttribute('aria-label','Trợ lý hỏi đáp');
    var panel=document.createElement('div'); panel.id='ai-panel';
    panel.innerHTML='<div class="ai-head"><span>🤖 '+bili('Trợ lý CSWIP','CSWIP assistant')+'</span><span style="cursor:pointer;font-size:18px" id="ai-x">✕</span></div>'
      +'<div class="ai-msgs" id="ai-msgs"></div>'
      +'<button class="ai-gpt" id="ai-gpt">💬 '+bili('Hỏi sâu hơn với ChatGPT','Ask ChatGPT for more')+'</button>'
      +'<div class="ai-in"><input id="ai-q" placeholder="vd: undercut là gì? / e.g. undercut?"><button id="ai-send">'+bili('Gửi','Send')+'</button></div>';
    document.body.appendChild(fab); document.body.appendChild(panel);
    var msgs=panel.querySelector('#ai-msgs'); var lastQ='';
    function add(html,me){ var d=document.createElement('div'); if(me){d.className='ai-me'; d.textContent=html;} else {d.innerHTML=html;} msgs.appendChild(d); msgs.scrollTop=msgs.scrollHeight; }
    function greet(){ if(!msgs.children.length) add('<div class="ai-bot">'+bili('Chào bạn 👋 Hỏi mình thuật ngữ/khái niệm CSWIP bất kỳ (vd: <i>undercut là gì</i>, <i>nứt nguội</i>, <i>WPS là gì</i>, <i>tiền nhiệt</i>). Mình tra trong bài học cho bạn ngay.','Ask me any CSWIP term/concept and I will search the lessons for you.')+'</div>'); }
    function ask(){ var inp=panel.querySelector('#ai-q'); var q=(inp.value||'').trim(); if(!q)return; lastQ=q; add(q,true); inp.value=''; setTimeout(function(){ add(answerHTML(q)); },120); }
    fab.onclick=function(){ panel.classList.toggle('on'); greet(); var inp=panel.querySelector('#ai-q'); if(panel.classList.contains('on')&&inp) inp.focus(); };
    panel.querySelector('#ai-x').onclick=function(){ panel.classList.remove('on'); };
    panel.querySelector('#ai-send').onclick=ask;
    panel.querySelector('#ai-q').addEventListener('keydown',function(e){ if(e.key==='Enter')ask(); });
    panel.querySelector('#ai-gpt').onclick=function(){
      var q=lastQ||(panel.querySelector('#ai-q').value||'').trim()||'CSWIP 3.1';
      var p='Bạn là gia sư CSWIP 3.1 (Welding Inspector), trả lời song ngữ Việt–Anh, chính xác theo tiêu chuẩn TWI/ISO/ASME. Câu hỏi: '+q;
      try{ navigator.clipboard.writeText(p); }catch(e){}
      window.open('https://chatgpt.com/?q='+encodeURIComponent(p),'_blank');
    };
  }
  if(document.body) build(); else window.addEventListener('load',build);
})();


/* ================= TRANG TẠO MÃ TRONG APP (chủ shop) ================= */
function _isOwner(){
  try{ var u=_curUser(); var op=(typeof CONFIG!=='undefined'&&CONFIG.ownerPhone)?CONFIG.ownerPhone:'';
    if(op && u.phone && _normKey(u.phone)===_normKey(op)) return true; }catch(e){}
  return (location.hash||'').toLowerCase().indexOf('admin')>=0;
}
function adminPanelHTML(){
  if(!_isOwner()) return '';
  return '<div class="card" style="border-color:rgba(255,214,10,.35)"><h3>🔐 '+bili('Tạo mã kích hoạt (chủ shop)','Generate codes (owner)')+'</h3>'
   +'<p class="muted" style="font-size:12px">'+bili('Chỉ bạn thấy mục này. Nhập SĐT khách → tạo mã → gửi khách.','Owner-only. Enter customer phone → generate → send.')+'</p>'
   +'<div class="row" style="justify-content:flex-start;margin:2px 0 10px"><button class="btn sec" onclick="window.open(\'dashboard.html\',\'_blank\')">📊 '+bili('Xem học viên đang dùng (cloud)','View active learners')+'</button></div>'
   +'<div id="adm_gate"><div class="tool-grid" style="grid-template-columns:1fr"><label>'+bili('Mật khẩu admin','Admin password')+'<input id="adm_pass" type="password" placeholder="••••"></label></div><div class="row" style="justify-content:flex-start;margin-top:6px"><button class="btn sec" onclick="admUnlock()">'+bili('Mở','Open')+'</button></div></div>'
   +'<div id="adm_panel" style="display:none"><div class="tool-grid"><label>'+bili('SĐT khách','Customer phone')+'<input id="adm_phone" placeholder="09..." inputmode="tel" oninput="admGen()"></label><label>'+bili('Thời hạn','Validity')+'<select id="adm_exp" onchange="admGen()"><option value="L">'+bili('Vĩnh viễn','Lifetime')+'</option><option value="12">12 '+bili('tháng','mo')+'</option><option value="6">6 '+bili('tháng','mo')+'</option><option value="3">3 '+bili('tháng','mo')+'</option></select></label></div><div id="adm_out" class="tool-out" style="display:none"></div></div></div>';
}
function admUnlock(){ var p=(document.getElementById('adm_pass')||{}).value||''; if(p===CONFIG.adminPass){ document.getElementById('adm_gate').style.display='none'; document.getElementById('adm_panel').style.display=''; var ph=document.getElementById('adm_phone'); if(ph)ph.focus(); } else { alert('Sai mật khẩu / Wrong password'); } }
function _admExp(){ var v=(document.getElementById('adm_exp')||{}).value||'L'; if(v==='L')return 'L'; var n=parseInt(v,10); var d=new Date(); d.setMonth(d.getMonth()+n); return (''+d.getFullYear()).slice(-2)+('0'+(d.getMonth()+1)).slice(-2); }
function admGen(){
  var phone=(document.getElementById('adm_phone')||{}).value||''; var out=document.getElementById('adm_out'); if(!out)return;
  if(!phone.trim()){ out.style.display='none'; return; }
  var exp=_admExp(); var code=makeCode(phone,exp);
  var hsd=exp==='L'?bili('vĩnh viễn','lifetime'):('hết tháng '+exp.slice(2,4)+'/20'+exp.slice(0,2));
  out.style.display='';
  out.innerHTML='<div style="font-size:20px;font-weight:800;color:var(--yellow);word-break:break-all;text-align:center">'+code+'</div><div class="muted" style="font-size:12px;text-align:center">'+bili('cho SĐT','for')+' '+_esc(phone)+' · '+hsd+'</div><div class="row" style="justify-content:center;margin-top:6px"><button class="btn sec" onclick="admCopy(this,\''+code+'\')">📋 '+bili('Copy mã gửi khách','Copy code')+'</button></div>';
}
function admCopy(btn,c){ try{ navigator.clipboard.writeText(c); }catch(e){} var o=btn.textContent; btn.textContent='✓ Đã copy'; setTimeout(function(){btn.textContent=o;},1400); }


/* ================= THANH ĐIỀU HƯỚNG DƯỚI (mobile) — dễ vào bài học ================= */
(function(){
  function build(){
    if(document.getElementById('botnav')) return;
    if(!document.body){ return; }
    var items=[['home','🏠','Tổng quan'],['learn','📚','Bài học'],['flash','🃏','Thẻ'],['quiz','📝','Quiz'],['profile','👤','Hồ sơ']];
    var css='#botnav{display:none}'
      +'@media(max-width:860px){'
      +'#botnav{display:flex;position:fixed!important;left:0;right:0;bottom:0;top:auto!important;height:auto!important;z-index:120;background:rgba(11,15,23,.97);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,.1);border-bottom:none;overflow:visible;margin:0;padding:5px 4px;padding-bottom:calc(5px + env(safe-area-inset-bottom,0px));justify-content:space-around}'
      +'#botnav button{flex:1;background:none;border:none;color:#94a3bb;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:10.5px;font-weight:700;padding:5px 2px;cursor:pointer;border-radius:10px;line-height:1.15}'
      +'#botnav button .bi{font-size:20px;line-height:1}'
      +'#botnav button.on{color:#4ca8ff}'
      +'#ai-fab{bottom:78px!important}#ai-panel{bottom:144px!important;max-height:56vh!important}'
      +'main{padding-bottom:84px!important}'
      +'}';
    var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
    var bar=document.createElement('nav'); bar.id='botnav';
    bar.innerHTML=items.map(function(it){ return '<button data-bt="'+it[0]+'"><span class="bi">'+it[1]+'</span>'+it[2]+'</button>'; }).join('');
    document.body.appendChild(bar);
    function sync(){ var cur=(typeof CUR!=='undefined'&&CUR)?CUR:'home'; var bs=bar.querySelectorAll('button'); for(var i=0;i<bs.length;i++){ bs[i].classList.toggle('on', bs[i].getAttribute('data-bt')===cur); } }
    var bs=bar.querySelectorAll('button');
    for(var i=0;i<bs.length;i++){ (function(b){ b.onclick=function(){ try{ go(b.getAttribute('data-bt')); }catch(e){} }; })(bs[i]); }
    if(typeof window.go==='function' && !window._goWrapped){ var og=window.go; window.go=function(t){ og(t); try{sync();}catch(e){} }; window._goWrapped=true; }
    sync();
  }
  if(document.body) build(); else window.addEventListener('load', build);
})();
