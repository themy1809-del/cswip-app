/* ============================================================
   IMG_BOOK — Gallery hình từ giáo trình "CSWIP Welding Inspector
   Notes" (637 tr) gắn vào từng chương trong tab Bài học.
   CHỈ DÙNG BẢN LOCAL (hình sách có bản quyền TWI — không đẩy
   thư mục img_book/ và file này lên GitHub công khai).
   ============================================================ */
(function(){
'use strict';
/* chương (index trong DATA.chapters) → [trang đầu, trang cuối] */
const RANGES = {
  11:[25,48],   // Thiết kế & chuẩn bị mối ghép — joint preps
  15:[49,60],   // Thuật ngữ & tư thế hàn — positions
  4:[61,108],   // Khuyết tật hàn — imperfections
  3:[181,216],  // Ký hiệu hàn — ISO 2553 symbols
  6:[409,468],  // NDT — RT/UT/MT/PT
  8:[565,600]   // Luyện kim & nứt — cracks, weldability
};
const css=document.createElement('style');
css.textContent='.bk-sec{margin-top:16px;border:1px solid var(--line,#2a3550);border-radius:14px;overflow:hidden}'
 +'.bk-sec summary{cursor:pointer;padding:12px 16px;font-weight:700;background:var(--panel2,#1b2334);list-style:none}'
 +'.bk-sec summary::before{content:"🖼 "}'
 +'.bk-grid{display:grid;grid-template-columns:1fr;gap:10px;padding:12px}'
 +'@media(min-width:700px){.bk-grid{grid-template-columns:1fr 1fr}}'
 +'.bk-grid img{width:100%;border-radius:8px;cursor:zoom-in;background:#fff}'
 +'.bk-zoom{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:10001;display:flex;align-items:center;justify-content:center;cursor:zoom-out}'
 +'.bk-zoom img{max-width:98vw;max-height:98vh;background:#fff;border-radius:6px}';
document.head.appendChild(css);

function pad(n){ return ('00'+n).slice(-3); }

function zoom(src){
  const o=document.createElement('div'); o.className='bk-zoom';
  o.innerHTML='<img src="'+src+'">';
  o.addEventListener('click',function(){o.remove();});
  document.body.appendChild(o);
}

function inject(){
  const el=document.getElementById('v-learn');
  if(!el || !el.classList.contains('on')) return;
  if(typeof CURCHAP==='undefined' || CURCHAP===null) return;
  const r=RANGES[CURCHAP]; if(!r) return;
  if(el.querySelector('.bk-sec')) return;
  const probe=new Image();
  probe.onload=function(){
    if(el.querySelector('.bk-sec')) return;
    const d=document.createElement('details'); d.className='bk-sec';
    let h='<summary>Hình từ giáo trình (trang '+r[0]+'–'+r[1]+' — chạm để mở/đóng)</summary><div class="bk-grid">';
    for(let p=r[0];p<=r[1];p++) h+='<img loading="lazy" src="img_book/bk-'+pad(p)+'.jpg" alt="trang '+p+'">';
    h+='</div>';
    d.innerHTML=h;
    d.addEventListener('click',function(e){ if(e.target.tagName==='IMG'){ e.preventDefault(); zoom(e.target.src); } });
    el.appendChild(d);
  };
  probe.src='img_book/bk-'+pad(r[0])+'.jpg';
}
new MutationObserver(inject).observe(document.body,{childList:true,subtree:true});
inject();
})();
