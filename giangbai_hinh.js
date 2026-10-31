/* ============================================================
   GIANGBAI_HINH — Thư viện hình minh họa & mô phỏng (SVG vẽ tay)
   cho bài giảng từng bước. Mỗi hình = nhiều BƯỚC; mỗi bước thêm
   một lớp hình + một câu chú thích → "mô phỏng từng tí một".
   Dùng bởi giangbai.js (slide) và tab Bài học (hình đầy đủ).
   Không dùng hình sách (bản quyền TWI).
   ============================================================ */
(function(){
'use strict';
var PL = '#3d4a5c', PL2 = '#2c3645', WM = '#ff8a3d', WM2 = '#ffd166', HAZ = '#8a5a2b', TX = '#e6edf3', MU = '#8b98a8', BL = '#58a6ff', GR = '#3fb950', RD = '#f85149', YL = '#ffd166', PU = '#c06cff';

/* ---------- helpers ---------- */
function R(x, y, w, h, f, extra){ return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (f || PL) + '" rx="2" ' + (extra || '') + '/>'; }
function T(x, y, t, c, sz, a, extra){ return '<text x="' + x + '" y="' + y + '" fill="' + (c || TX) + '" font-size="' + (sz || 13) + '" text-anchor="' + (a || 'start') + '" font-family="Inter,system-ui,sans-serif" ' + (extra || '') + '>' + t + '</text>'; }
function L(x1, y1, x2, y2, c, w, extra){ return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || MU) + '" stroke-width="' + (w || 1.5) + '" ' + (extra || '') + '/>'; }
function A(x1, y1, x2, y2, c, w){ var ang = Math.atan2(y2 - y1, x2 - x1), s = 7; var p1 = (x2 - s * Math.cos(ang - 0.45)) + ',' + (y2 - s * Math.sin(ang - 0.45)), p2 = (x2 - s * Math.cos(ang + 0.45)) + ',' + (y2 - s * Math.sin(ang + 0.45)); return L(x1, y1, x2, y2, c, w) + '<polygon points="' + x2 + ',' + y2 + ' ' + p1 + ' ' + p2 + '" fill="' + (c || MU) + '"/>'; }
function PATH(d, f, s, w, extra){ return '<path d="' + d + '" fill="' + (f || 'none') + '" stroke="' + (s || 'none') + '" stroke-width="' + (w || 1.5) + '" ' + (extra || '') + '/>'; }
function C(x, y, r, f, extra){ return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + f + '" ' + (extra || '') + '/>'; }
function LBL(x, y, tx, ty, text, c){ return A(tx, ty, x, y, c || MU, 1.2) + T(tx + (tx < x ? -4 : 4), ty + 4, text, c || TX, 12, tx < x ? 'end' : 'start'); }
function DRAW(d, c, w){ return PATH(d, 'none', c, w || 2.5, 'class="gbf-draw" stroke-linecap="round" stroke-linejoin="round"'); }
function BEAD(cx, top, w, h){ return PATH('M' + (cx - w / 2) + ' ' + top + ' Q' + cx + ' ' + (top - h * 2) + ' ' + (cx + w / 2) + ' ' + top + 'Z', WM); }
/* mặt cắt giáp mép chữ V đã hàn */
function VWELD(cx, y, t, cap){ var top = y, bot = y + t; var d = 'M' + (cx - t * 0.7) + ' ' + top + ' L' + (cx - 3) + ' ' + (bot - 3) + ' L' + (cx - 3) + ' ' + bot + ' L' + (cx + 3) + ' ' + bot + ' L' + (cx + 3) + ' ' + (bot - 3) + ' L' + (cx + t * 0.7) + ' ' + top + (cap ? ' Q' + cx + ' ' + (top - 16) + ' ' + (cx - t * 0.7) + ' ' + top : '') + 'Z'; return PATH(d, WM); }
function PLATES(cx, y, t, gap, w){ return R(cx - w - gap / 2, y, w, t) + R(cx + gap / 2, y, w, t); }
function F(t, steps){ return {t:t, steps:steps}; }

var G = {};

/* ===== 1. Vùng mối hàn & thuật ngữ ===== */
G['weld-zones'] = F('Mặt cắt mối hàn giáp mép — tên gọi từng vùng', [
 {svg: PLATES(320, 120, 60, 0, 230) + T(90, 210, 'kim loại nền (parent metal)', MU), cap:'Bắt đầu từ hai tấm thép đặt sát nhau — đây là <b>kim loại nền</b> (parent/base metal).'},
 {svg: PATH('M265 120 L317 180 L323 180 L375 120 Z', '#1b2334') + PATH('M265 120 L317 180 L323 180 L375 120 Q320 100 265 120Z', WM) + T(320, 150, 'weld metal', '#1a1206', 12, 'middle'), cap:'Hồ quang nung chảy mép hai tấm và que hàn thành một khối: <b>kim loại mối hàn</b> (weld metal). Nó là hợp kim pha trộn giữa que và nền (pha loãng — dilution).'},
 {svg: PATH('M265 120 L317 180 L323 180 L375 120', 'none', YL, 2.5, 'stroke-dasharray="4 3"') + PATH('M240 120 L310 180 L330 180 L400 120', 'none', HAZ, 10, 'opacity=".6"') + LBL(268, 150, 160, 95, 'đường chảy (fusion line)', YL) + LBL(395, 140, 500, 95, 'HAZ — vùng ảnh hưởng nhiệt', '#d9a066'), cap:'Ranh giới giữa phần đã chảy và chưa chảy là <b>đường chảy</b>. Sát bên ngoài là <b>HAZ</b>: không chảy nhưng bị nung nóng rồi nguội nhanh → tổ chức thay đổi. Đây là nơi hay cứng và nứt nhất.'},
 {svg: LBL(265, 118, 150, 60, 'ngón/chân mối hàn (toe)', BL) + LBL(320, 104, 320, 55, 'mặt (face)', BL) + LBL(320, 181, 320, 240, 'gốc/chân (root)', BL) + LBL(330, 108, 470, 60, 'kim loại đắp thừa (excess weld metal)', GR), cap:'Tên các vị trí: <b>toe</b> = chỗ mặt mối hàn gặp tấm (nơi tập trung ứng suất, hay cháy chân & nứt mỏi), <b>face</b> = mặt trên, <b>root</b> = đáy. Phần nhô lên gọi là <b>excess weld metal</b> — đề KHÔNG dùng từ "reinforcement".'},
 {svg: PATH('M305 180 Q320 192 335 180', 'none', WM2, 3) + LBL(320, 188, 440, 235, 'ngấu chân (root penetration bead)', WM2), cap:'Phía dưới, nếu hàn một phía, kim loại chảy xuyên qua tạo <b>ngấu chân</b>. Thiếu nó = không thấu (LOP); nhiều quá = ngấu quá mức (excess penetration).'}
]);

/* ===== 2. Mối hàn góc — cạnh & cổ ===== */
G['fillet-throat'] = F('Mối hàn góc — cạnh z, cổ a, cổ thực', [
 {svg: R(120, 60, 50, 170) + R(170, 180, 300, 50) + T(300, 250, 'mối nối chữ T (T-joint) hàn bằng mối hàn GÓC (fillet weld)', MU, 12, 'middle'), cap:'Mối nối chữ T. Nhớ: <b>mối nối</b> (joint) là cách hai tấm gặp nhau; <b>mối hàn</b> (weld) là kiểu hàn. Chữ T có thể hàn góc hoặc vát giáp mép.'},
 {svg: PATH('M170 110 L170 180 L240 180 Z', WM), cap:'Mối hàn góc lý tưởng có tiết diện tam giác vuông cân — gọi là góc <b>mitre</b> (mặt phẳng 45°).'},
 {svg: L(165, 110, 165, 180, BL, 2) + T(150, 148, 'z', BL, 16, 'middle') + L(170, 185, 240, 185, BL, 2) + T(205, 203, 'z', BL, 16, 'middle') + T(430, 90, 'z = cạnh (leg length)', BL, 13), cap:'<b>Cạnh z</b> (leg) đo từ gốc góc đến ngón (toe) trên mỗi tấm. ISO ghi "z6" = cạnh 6 mm.'},
 {svg: L(170, 180, 205, 145, GR, 2.5) + T(195, 138, 'a', GR, 16, 'middle') + T(430, 115, 'a = cổ thiết kế (design throat) = 0,7 z', GR, 13), cap:'<b>Cổ a</b> (throat) là đường vuông góc từ gốc tới mặt mối hàn — chỗ mỏng nhất, chịu lực. a = 0,7 z; z = 1,4 a. Đề cho a5 → z ≈ 7 mm.'},
 {svg: PATH('M170 110 Q215 125 240 180', 'none', WM2, 3) + L(170, 180, 155, 165, GR, 1.5, 'stroke-dasharray="3 2"') + PATH('M150 160 L170 180 L190 200', 'none', 'none') + C(158, 168, 3, YL) + L(158, 168, 218, 150, YL, 2) + T(430, 140, 'cổ thực (actual throat): tính cả ngấu vào gốc', YL, 13) + T(430, 162, 'phần lồi KHÔNG được tính vào cổ', RD, 12), cap:'Mặt lồi (convex) thêm kim loại nhưng <b>không tăng cổ thiết kế</b>, lại tạo góc toe sắc → tập trung ứng suất, mỏi. <b>Cổ thực</b> tính thêm phần ngấu sâu vào gốc (chỉ thấy khi cắt macro).'}
]);

/* ===== 3. Tư thế hàn tấm ===== */
G['positions'] = F('Tư thế hàn ISO 6947 — tấm', [
 {svg: R(40, 150, 110, 14) + BEAD(95, 150, 30, 8) + A(70, 120, 125, 120, BL) + T(95, 195, 'PA (1G/1F) — bằng', TX, 13, 'middle') + T(95, 212, 'hàn từ trên xuống, dễ nhất', MU, 11, 'middle'), cap:'<b>PA</b> — tấm nằm ngang, hàn từ phía trên. Vũng hàn được trọng lực "giữ" → dễ nhất, năng suất cao nhất.'},
 {svg: R(200, 95, 14, 110) + PATH('M214 150 L228 150 Q232 142 228 136 L214 136Z', WM) + A(200, 70, 260, 70, BL) + T(240, 230, 'PC (2G) — ngang', TX, 13, 'middle') + T(240, 247, 'trọng lực kéo xuống mép dưới → cháy chân mép trên', MU, 10.5, 'middle'), cap:'<b>PC</b> — tấm đứng, đường hàn chạy ngang. Kim loại lỏng bị kéo xệ xuống → mép trên dễ <b>cháy chân (undercut)</b>, mép dưới dễ tràn (overlap). Đề hay hỏi "undercut nhiều nhất ở PC".'},
 {svg: R(340, 95, 14, 110) + PATH('M354 150 L368 150 Q372 142 368 136 L354 136Z', WM) + A(400, 190, 400, 110, GR, 2) + T(420, 150, 'PF (3G up)', GR, 13) + A(470, 110, 470, 190, RD, 2) + T(488, 150, 'PG (3G down)', RD, 13) + T(430, 230, 'đứng: PF lên — PG xuống', TX, 13, 'middle'), cap:'Tấm đứng, đường hàn chạy dọc: <b>PF</b> hàn lên (ngấu tốt, chậm, que basic), <b>PG</b> hàn xuống (nhanh, que cellulosic đường ống, dễ ngậm xỉ/LOF nếu không khéo).'},
 {svg: R(560, 60, 110, 14) + PATH('M545 74 Q560 90 575 74Z', WM, 'none') + PATH('M545 74 L575 74 Q560 88 545 74Z', WM) + A(590, 110, 590, 85, BL) + T(615, 110, 'PE (4G) — trần', TX, 13, 'middle') + T(615, 127, 'khó nhất, hồ quang ngắn', MU, 11, 'middle'), cap:'<b>PE</b> — hàn ngửa dưới tấm. Trọng lực chống lại thợ → hồ quang ngắn, dòng thấp hơn, lớp mỏng. Góc tương ứng: PB (ngang-đứng góc) và PD (trần góc).'}
]);

/* ===== 4. Tư thế ống ===== */
G['pipe-positions'] = F('Tư thế hàn ống — PH/PJ và H-L045/J-L045', [
 {svg: '<ellipse cx="120" cy="150" rx="18" ry="60" fill="' + PL + '"/>' + R(120, 90, 150, 120, PL) + '<ellipse cx="270" cy="150" rx="18" ry="60" fill="' + PL2 + '"/>' + PATH('M195 90 A18 60 0 0 1 195 210', 'none', WM, 5) + T(195, 240, 'ống NẰM NGANG, cố định (5G)', TX, 13, 'middle'), cap:'Ống đặt nằm ngang, <b>không xoay</b> → thợ phải đi vòng quanh: đáy là trần (PE), hông là đứng (PF/PG), đỉnh là bằng (PA). Một mối hàn chứa mọi tư thế.'},
 {svg: A(230, 190, 230, 110, GR, 2) + T(240, 150, 'PH = hàn LÊN (5G up)', GR, 12) + A(160, 110, 160, 190, RD, 2) + T(150, 150, 'PJ = hàn XUỐNG', RD, 12, 'end'), cap:'<b>PH</b> — từ đáy hàn lên hai bên tới đỉnh (vertical-up). <b>PJ</b> — từ đỉnh hàn xuống (vertical-down, đường ống cellulosic).'},
 {svg: '<g transform="rotate(-45 480 150)">' + '<ellipse cx="400" cy="150" rx="14" ry="48" fill="' + PL + '"/>' + R(400, 102, 160, 96, PL) + '<ellipse cx="560" cy="150" rx="14" ry="48" fill="' + PL2 + '"/>' + PATH('M480 102 A14 48 0 0 1 480 198', 'none', WM, 5) + '</g>' + T(480, 250, 'ống NGHIÊNG 45°, cố định (6G)', TX, 13, 'middle'), cap:'Ống nghiêng 45° cố định — tư thế khó nhất, "qualify được tất cả".'},
 {svg: A(530, 200, 560, 110, GR, 2) + T(575, 150, 'H-L045 = lên', GR, 12) + A(430, 110, 400, 200, RD, 2) + T(395, 150, 'J-L045 = xuống', RD, 12, 'end'), cap:'<b>H-L045</b>: hàn lên (H như "Hill" — leo dốc). <b>J-L045</b>: hàn xuống. Đề Work Pack cực hay hỏi "J-L045 là tiến theo hướng nào?" → <b>xuống</b>.'}
]);

/* ===== 5. Chuẩn bị mép ===== */
G['joint-preps'] = F('Chuẩn bị mép hàn — 4 kích thước quyết định', [
 {svg: PLATES(130, 110, 50, 3, 70) + T(130, 190, 'mép vuông (square)', TX, 12, 'middle') + T(130, 206, 't ≤ ~3–6 mm', MU, 11, 'middle'), cap:'Tấm mỏng: không cần vát, chỉ để <b>khe hở</b> nhỏ — mép <b>vuông</b>. Dày hơn thì hồ quang không xuyên hết → phải vát.'},
 {svg: PATH('M250 110 L292 110 L310 155 L310 160 L300 160 L300 110Z', 'none') + PATH('M230 110 L292 110 L306 152 L306 160 L230 160Z', PL) + PATH('M400 110 L338 110 L324 152 L324 160 L400 160Z', PL) + T(315, 190, 'chữ V đơn (single-V)', TX, 12, 'middle'), cap:'<b>Chữ V đơn</b>: phổ biến nhất cho 6–20 mm, cắt bằng oxy dễ. Nhược: nhiều kim loại đắp một phía → <b>biến dạng góc</b>.'},
 {svg: L(292, 110, 306, 152, YL, 2) + L(292, 110, 292, 152, YL, 1, 'stroke-dasharray="3 2"') + PATH('M292 128 A18 18 0 0 1 298 128', 'none', YL, 1.5) + T(275, 128, 'β', YL, 13) + T(315, 100, 'α', YL, 13, 'middle') + PATH('M300 100 A20 20 0 0 1 330 100', 'none', YL, 1.5) + L(306, 152, 306, 160, GR, 3) + T(280, 165, 'root face', GR, 11, 'end') + L(306, 165, 324, 165, BL, 2) + T(315, 180, 'gap', BL, 11, 'middle'), cap:'4 kích thước: <b>góc vát β</b> (bevel, một bên) · <b>góc rãnh α</b> (included = 2β) · <b>mặt chân</b> (root face — "vai đỡ" chống cháy thủng) · <b>khe hở chân</b> (root gap — lối vào cho ngấu). Hẹp/dày quá → không thấu; rộng/mỏng quá → cháy thủng.'},
 {svg: PATH('M450 110 L490 110 L490 135 Q490 152 475 152 L475 160 L450 160Z', PL) + PATH('M560 110 L520 110 L520 135 Q520 152 535 152 L535 160 L560 160Z', PL) + T(505, 190, 'chữ U (hoặc J)', TX, 12, 'middle') + T(505, 206, 'dày >20 mm: ít đắp, tốn gia công', MU, 10.5, 'middle'), cap:'<b>Chữ U/J</b>: thành gần đứng (5–15°), đáy tròn → ít kim loại đắp cho tấm dày, ít biến dạng, nhưng phải phay/gia công (đắt). J = vát một phía.'},
 {svg: PATH('M590 110 L630 110 L616 132 L616 138 L630 160 L590 160Z', PL) + PATH('M660 110 L634 110 L648 132 L648 138 L634 160 L660 160Z', PL) + T(625, 190, 'chữ X (double-V)', TX, 12, 'middle') + T(625, 206, 'hai phía, cân đối, ít biến dạng', MU, 10.5, 'middle'), cap:'<b>Double-V (X)</b>: chia kim loại đắp hai phía → co ngót cân bằng, ít biến dạng góc nhất; cần tiếp cận hai phía và <b>dũi chân</b> (back-gouge) trước khi hàn mặt sau.'}
]);

/* ===== 6. Ký hiệu ISO vs AWS ===== */
G['symbol-iso-aws'] = F('Ký hiệu hàn — ISO 2553 (hai đường) vs AWS A2.4 (một đường)', [
 {svg: L(60, 130, 260, 130, TX, 2) + L(60, 142, 260, 142, TX, 2, 'stroke-dasharray="7 5"') + L(60, 130, 30, 180, TX, 2) + '<polygon points="30,180 38,170 44,178" fill="' + TX + '"/>' + T(160, 100, 'ISO 2553', BL, 15, 'middle', 'font-weight="700"') + T(275, 134, 'đường liền = PHÍA MŨI TÊN', GR, 11) + T(275, 150, 'đường đứt = PHÍA BÊN KIA', RD, 11), cap:'<b>ISO</b>: đường tham chiếu <b>liền</b> + đường <b>đứt</b>. Ký hiệu đặt trên đường liền = hàn <b>phía mũi tên</b>; trên đường đứt = hàn <b>phía đối diện</b>.'},
 {svg: PATH('M150 130 L150 112 L168 130Z', 'none', GR, 2) + T(120, 124, 'a5', GR, 12, 'end'), cap:'Ví dụ: tam giác (góc) trên đường liền, "a5" bên trái → mối hàn <b>góc cổ 5 mm ở phía mũi tên</b>. Ký hiệu nằm trên đường đứt → phía kia.'},
 {svg: L(380, 130, 580, 130, TX, 2) + L(380, 130, 350, 180, TX, 2) + '<polygon points="350,180 358,170 364,178" fill="' + TX + '"/>' + T(480, 100, 'AWS A2.4', YL, 15, 'middle', 'font-weight="700"') + T(595, 150, 'DƯỚI đường = arrow side', GR, 11) + T(595, 118, 'TRÊN đường = other side', RD, 11) + PATH('M470 130 L470 148 L488 130Z', 'none', GR, 2) + T(445, 145, '1/4', GR, 12, 'end'), cap:'<b>AWS</b>: chỉ một đường. Ký hiệu <b>dưới</b> đường = phía mũi tên; <b>trên</b> = phía kia. Kích thước ghi cạnh (leg) theo inch. Người quen ISO rất hay đọc ngược — bẫy số 1.'},
 {svg: C(60, 130, 6, 'none', 'stroke="' + PU + '" stroke-width="2"') + PATH('M72 120 L72 100 L88 105 L72 110', PU, PU, 1.5) + T(60, 205, 'vòng = hàn vòng quanh · cờ = hàn hiện trường', PU, 11) + L(255, 130, 265, 120, MU, 1.5) + L(255, 130, 265, 140, MU, 1.5) + T(285, 128, 'đuôi: 111 / ISO 5817-C / WPS-01', MU, 11) + T(300, 160, '', MU), cap:'Ký hiệu phụ tại chỗ gãy: <b>vòng tròn</b> = hàn vòng quanh (weld all round), <b>cờ</b> = hàn tại hiện trường (site weld). <b>Đuôi</b> ghi quá trình (ISO 4063), mức chất lượng (ISO 5817), WPS.'}
]);

/* ===== 7. Nứt nguội do hydro (mô phỏng 4 yếu tố) ===== */
G['hicc'] = F('Nứt nguội do hydro (HICC) — 4 yếu tố phải cùng có mặt', [
 {svg: PLATES(320, 120, 70, 0, 240) + VWELD(320, 120, 70, true) + PATH('M255 120 L317 190 L323 190 L385 120', 'none', HAZ, 14, 'opacity=".7"') + T(320, 235, 'mối hàn thép C-Mn dày, vừa hàn xong', MU, 12, 'middle'), cap:'Một mối hàn thép dày vừa xong. Trông lành lặn. Nhưng bên trong HAZ đang có 4 điều cùng xảy ra…'},
 {svg: C(300, 150, 3, BL, 'class="gbf-h"') + C(330, 165, 3, BL, 'class="gbf-h" style="animation-delay:.4s"') + C(312, 178, 3, BL, 'class="gbf-h" style="animation-delay:.8s"') + C(345, 150, 3, BL, 'class="gbf-h" style="animation-delay:1.2s"') + T(60, 60, '① HYDRO', BL, 14, 'start', 'font-weight="700"') + T(60, 78, 'từ ẩm/que ướt/gỉ/dầu → tan vào kim loại', MU, 11) + T(60, 92, '>15 ml/100 g là nguy hiểm', MU, 11), cap:'<b>① Hydro</b>: hơi ẩm trong vỏ que, gỉ, dầu mỡ phân ly trong hồ quang → nguyên tử H tan vào kim loại lỏng. Khi nguội, H bị "nhốt" và <b>khuếch tán</b> về vùng ứng suất cao.'},
 {svg: PATH('M258 128 L300 180 M268 125 L310 180 M278 122 L318 182', 'none', '#5a3a1a', 3) + T(60, 120, '② TỔ CHỨC NHẠY CẢM', '#d9a066', 14, 'start', 'font-weight="700"') + T(60, 138, 'HAZ nguội nhanh → mactenxit cứng >400 HV', MU, 11) + T(60, 152, 'thép CEV cao / tấm dày / không tiền nhiệt', MU, 11), cap:'<b>② Tổ chức nhạy cảm</b>: HAZ nguội quá nhanh (tấm dày hút nhiệt, không tiền nhiệt, CEV cao) → <b>mactenxit</b> cứng giòn >~400 HV. Hydro trong mactenxit không có chỗ "thở".'},
 {svg: A(200, 155, 240, 155, RD, 2.5) + A(440, 155, 400, 155, RD, 2.5) + T(60, 180, '③ ỨNG SUẤT', RD, 14, 'start', 'font-weight="700"') + T(60, 198, 'co ngót + ràng buộc → kéo ≈ giới hạn chảy', MU, 11) + T(480, 60, '④ NHIỆT ĐỘ < 300 °C', YL, 14, 'start', 'font-weight="700"') + T(480, 78, 'nứt xảy ra khi đã nguội — "nứt nguội"', MU, 11) + T(480, 92, 'xuất hiện trễ: giờ → 48–72 h', MU, 11), cap:'<b>③ Ứng suất kéo</b> từ co ngót & ràng buộc (≥0,5 giới hạn chảy). <b>④ Nhiệt độ thấp</b> <~300 °C — ở nhiệt cao H còn thoát được. Đủ 4 yếu tố…'},
 {svg: DRAW('M262 128 L272 146 L266 160 L280 176 L276 190', RD, 3) + T(320, 60, 'NỨT!', RD, 22, 'middle', 'font-weight="800"') + T(480, 120, 'Phòng ngừa = bỏ 1 yếu tố:', GR, 13, 'start', 'font-weight="700"') + T(480, 138, '• que basic sấy khô (↓H)', GR, 11) + T(480, 152, '• tiền nhiệt / giữ nhiệt sau hàn (↓cứng, H thoát)', GR, 11) + T(480, 166, '• PWHT, ít ràng buộc (↓ứng suất)', GR, 11) + T(480, 180, '• NDT sau ≥48 h mới kết luận', GR, 11), cap:'…vết nứt sinh ra ở HAZ (toe/underbead) hoặc kim loại hàn, <b>sau khi thanh tra đã về nhà</b>. Vì vậy: que basic, tiền nhiệt, giữ nhiệt sau hàn, và <b>chờ 48 h rồi mới NDT</b> thép dễ nứt. Bỏ bất kỳ 1 yếu tố nào → hết nứt.'}
]);

/* ===== 8. Nứt nóng / kết tinh ===== */
G['solid-crack'] = F('Nứt kết tinh (nứt nóng) — tâm mối hàn khi đang đông', [
 {svg: PLATES(220, 120, 60, 0, 170) + PATH('M165 120 L217 180 L223 180 L275 120Z', '#5a2d10') + T(220, 215, 'vũng hàn đang nguội', MU, 12, 'middle'), cap:'Kim loại hàn đông đặc <b>từ thành rãnh vào tâm</b> (chỗ lạnh trước). Hạt tinh thể mọc dạng cột hướng vào giữa.'},
 {svg: PATH('M170 122 L215 150 M175 135 L215 158 M180 150 L215 166 M270 122 L225 150 M265 135 L225 158 M260 150 L225 166', 'none', WM2, 1.5) + T(60, 80, 'hạt cột (columnar grains)', WM2, 12), cap:'Hai "mặt trận" hạt gặp nhau ở tâm. Tạp chất nóng chảy thấp (<b>lưu huỳnh S, phốt pho P</b>) bị đẩy đi trước mặt trận → dồn hết về đường tâm thành màng lỏng mỏng.'},
 {svg: DRAW('M220 125 L221 145 L219 165 L220 178', RD, 3) + A(150, 150, 185, 150, RD, 2) + A(290, 150, 255, 150, RD, 2) + T(60, 105, 'co ngót kéo hai bên →', RD, 12) + T(60, 122, 'màng lỏng ở tâm bị xé → nứt tâm', RD, 12), cap:'Khi phần rắn co lại kéo hai bên, <b>màng lỏng ở tâm bị xé</b> → <b>nứt tâm dọc</b> (centreline crack). Xảy ra ở nhiệt cao, lúc đang đông → gọi là "nứt nóng".'},
 {svg: PLATES(470, 110, 80, 0, 110) + PATH('M450 110 L467 190 L473 190 L490 110Z', WM) + T(470, 215, 'sâu-hẹp (SAW/MAG spray)', RD, 11, 'middle') + T(470, 230, 'tỷ lệ sâu/rộng lớn → NGUY HIỂM', RD, 11, 'middle') + PATH('M585 110 L615 160 L625 160 L655 110Z', WM) + R(560, 110, 25, 50) + R(655, 110, 25, 50) + T(620, 215, 'rộng-nông', GR, 11, 'middle') + T(620, 230, 'tâm đông sau cùng ở mặt → an toàn', GR, 11, 'middle'), cap:'Hình dạng đường hàn quyết định: <b>sâu-hẹp</b> (dòng cao, tốc độ cao) → hạt gặp nhau ở giữa chiều sâu, không thoát được → nứt. <b>Rộng-nông</b> → đông sau cùng ở mặt thoáng → an toàn. Phòng: Mn/S cao, giảm pha loãng, giảm dòng/tốc độ, lấp đầy hõm cuối (tránh crater crack).'}
]);

/* ===== 9. LOF vs LOP ===== */
G['lof-lop'] = F('Không ngấu (LOF) vs không thấu (LOP)', [
 {svg: PLATES(320, 110, 70, 4, 220) + PATH('M258 110 L318 176 L322 176 L382 110 Q320 95 258 110Z', WM) + T(320, 225, 'mối hàn chữ V nhiều lớp', MU, 12, 'middle'), cap:'Một mối hàn giáp mép nhiều lớp. Ba chỗ "không liền" có thể xảy ra — đề thích đánh tráo tên.'},
 {svg: PATH('M270 125 L300 158', 'none', RD, 4, 'stroke-dasharray="5 3" class="gbf-pulse"') + LBL(285, 141, 120, 80, 'LOF thành bên (sidewall)', RD), cap:'<b>Không ngấu thành bên</b> (lack of sidewall fusion): kim loại đắp không hòa với vách rãnh — do hồ quang lệch, dòng thấp, tốc độ cao, <b>MAG dip</b>, góc rãnh hẹp. Phẳng, nguy hiểm, RT khó thấy.'},
 {svg: PATH('M300 150 Q320 158 340 150', 'none', RD, 4, 'stroke-dasharray="5 3" class="gbf-pulse"') + LBL(320, 154, 520, 80, 'LOF giữa lớp (inter-run)', RD), cap:'<b>Không ngấu giữa các lớp</b> (inter-run fusion): lớp sau không hòa với lớp trước — do xỉ/oxit chưa làm sạch, dòng thấp. Vẫn là LOF.'},
 {svg: PATH('M312 176 L328 176', 'none', RD, 5, 'class="gbf-pulse"') + LBL(320, 178, 520, 230, 'LOP — không thấu chân (root)', YL), cap:'<b>Không thấu</b> (lack of root penetration / incomplete root penetration): kim loại không xuyên hết <b>chân</b> — do khe hở hẹp, mặt chân dày, dòng thấp, que to. Đề: "khuyết tật ở chân mối hàn một phía" → <b>LOP</b>, không phải LOF.'},
 {svg: PATH('M370 118 L395 150 Q405 160 385 158 Q375 150 370 118Z', WM) + L(385, 155, 400, 160, RD, 2) + T(430, 165, 'overlap / cold lap: tràn mà không dính', RD, 11), cap:'Họ hàng: <b>overlap/cold lap</b> — kim loại tràn lên bề mặt nền mà không hòa tan (dòng thấp, tốc độ chậm, que to). Cũng là "không ngấu" ở bề mặt, tạo khe sắc.'}
]);

/* ===== 10. Khuyết tật biên dạng ===== */
G['profile-defects'] = F('Khuyết tật hình dạng — undercut, lồi quá, lệch mép', [
 {svg: PLATES(160, 130, 40, 0, 110) + VWELD(160, 130, 40, true) + PATH('M130 130 Q133 136 137 130', 'none', '#0a0e17', 4) + PATH('M183 130 Q187 136 190 130', 'none', '#0a0e17', 4) + C(133, 132, 6, 'none', 'stroke="' + RD + '" stroke-width="1.5"') + T(160, 200, 'cháy chân (undercut)', RD, 12, 'middle'), cap:'<b>Undercut</b>: rãnh khuyết ở toe, nơi hồ quang khoét nền mà không lấp lại — dòng cao, tốc độ nhanh, hồ quang dài, góc que sai, tư thế PC. Tạo khía → mỏi. Đo sâu bằng dưỡng.'},
 {svg: PLATES(330, 130, 40, 0, 110) + PATH('M302 130 L327 168 L333 168 L358 130 Q330 85 302 130Z', WM) + L(302, 130, 358, 130, MU, 1, 'stroke-dasharray="2 2"') + A(380, 100, 362, 112, RD) + T(385, 104, 'lồi quá cao', RD, 11) + T(330, 200, 'excess weld metal', TX, 12, 'middle'), cap:'<b>Kim loại đắp thừa quá mức</b>: góc toe nhọn → tập trung ứng suất, tốn que, không thêm bền. Nguyên nhân: tốc độ chậm, que to, dòng thấp, nhiều lớp phủ.'},
 {svg: R(440, 135, 80, 40) + R(530, 125, 80, 40) + L(520, 135, 530, 125, YL, 2) + A(620, 150, 610, 150, YL) + L(610, 125, 610, 135, YL, 2) + T(640, 140, 'hi-lo', YL, 12) + T(525, 200, 'lệch mép (misalignment)', YL, 12, 'middle'), cap:'<b>Lệch mép</b> (linear misalignment, hi-lo): hai tấm không cùng mặt → tiết diện giảm, sinh uốn, lớp lót khó ngấu. Kiểm <b>trước khi hàn</b> (fit-up) bằng dưỡng hi-lo. Thuộc nhóm 500 ISO 6520.'},
 {svg: PATH('M320 168 Q330 190 340 168', WM2) + T(330, 215, 'ngấu quá mức (excess penetration)', WM2, 11, 'middle') + PATH('M140 170 Q160 176 180 170', 'none', '#0a0e17', 5) + T(160, 218, 'lõm chân (root concavity)', MU, 11, 'middle'), cap:'Ở chân: <b>ngấu quá mức</b> (khe hở rộng, dòng cao) cản dòng chảy trong ống; <b>lõm chân</b> (suck-back) do khe hở rộng + nhiệt cao làm chân xệ. Cả hai đều có giới hạn trong ISO 5817.'}
]);

/* ===== 11. Rỗ khí & ngậm xỉ (mô phỏng) ===== */
G['porosity-slag'] = F('Rỗ khí & ngậm xỉ — khí sinh ra từ đâu, xỉ kẹt ở đâu', [
 {svg: PLATES(220, 130, 60, 0, 170) + PATH('M180 130 L217 190 L223 190 L260 130 Q220 112 180 130Z', WM) + T(220, 225, 'vũng hàn đang nguội', MU, 12, 'middle'), cap:'Vũng hàn 1500 °C hòa tan khí (H₂, N₂, CO) rất tốt. Khi đông, độ hòa tan giảm đột ngột → khí thoát ra thành <b>bọt</b>.'},
 {svg: C(205, 175, 3, '#0a0e17', 'class="gbf-rise"') + C(222, 168, 2.5, '#0a0e17', 'class="gbf-rise" style="animation-delay:.5s"') + C(236, 160, 3.5, '#0a0e17', 'class="gbf-rise" style="animation-delay:1s"') + C(214, 150, 2.5, '#0a0e17', 'class="gbf-rise" style="animation-delay:1.5s"') + T(60, 70, 'nguồn khí:', BL, 13, 'start', 'font-weight="700"') + T(60, 88, '• ẩm, gỉ, dầu, sơn trên mép', MU, 11) + T(60, 102, '• que ẩm / khí bảo vệ kém (gió, lưu lượng sai)', MU, 11) + T(60, 116, '• hồ quang dài (điện áp cao) → không khí lọt', MU, 11), cap:'Bọt nổi lên; nếu kim loại đông trước khi bọt thoát → <b>rỗ khí</b> (porosity): rải rác, chùm (cluster), thẳng hàng (linear — thường ở chân, kèm LOF), ống dài (wormhole/piping).'},
 {svg: C(230, 140, 4, '#0a0e17') + C(240, 150, 3, '#0a0e17') + C(226, 155, 3.5, '#0a0e17') + PATH('M200 160 L200 175 Q203 178 206 175 L206 160Z', '#0a0e17') + T(300, 150, '← wormhole', MU, 11) + T(300, 135, '← cluster', MU, 11), cap:'Rỗ là khuyết tật <b>khối</b> (tròn) → ít nguy hiểm hơn phẳng, RT bắt rất tốt. Phòng: làm sạch mép, sấy que, che gió, hồ quang ngắn, khí đúng lưu lượng, dây có Si/Mn khử oxy.'},
 {svg: PLATES(500, 130, 60, 0, 120) + PATH('M460 130 L497 190 L503 190 L540 130 Q500 112 460 130Z', WM) + PATH('M478 150 Q490 158 500 150 Q510 158 522 150', 'none', '#2a2a2a', 5) + PATH('M470 142 L482 150', 'none', '#2a2a2a', 6) + T(500, 225, 'ngậm xỉ (slag inclusion)', '#bbb', 12, 'middle'), cap:'<b>Ngậm xỉ</b>: xỉ của lớp trước <b>không được gõ/mài sạch</b>, hoặc kẹt ở thành rãnh hẹp, hoặc dòng thấp làm xỉ chảy trước vũng. Đi kèm LOF. Chỉ có ở quá trình có xỉ (MMA, FCAW, SAW) — MAG dây đặc/TIG không ngậm xỉ (TIG có thể ngậm <b>vonfram</b>).'}
]);

/* ===== 12. Lamellar tearing ===== */
G['lamellar'] = F('Lamellar tearing — nứt bậc thang trong tấm nền', [
 {svg: R(120, 60, 60, 170) + R(180, 170, 260, 50) + PATH('M180 110 L180 170 L240 170Z', WM) + PATH('M190 110 L190 170 M190 170 L240 160Z', 'none') + T(300, 245, 'mối nối chữ T, mối hàn góc lớn', MU, 12, 'middle'), cap:'Mối nối chữ T với mối hàn lớn. Tấm đứng được hàn vào mặt tấm ngang.'},
 {svg: PATH('M190 185 L420 185 M200 195 L430 195 M185 205 L415 205', 'none', '#111', 2.5, 'stroke-dasharray="14 6"') + T(460, 190, 'tạp chất phi kim dẹt (MnS, silicat)', '#bbb', 11) + T(460, 205, 'nằm song song mặt tấm — do cán', '#bbb', 11), cap:'Thép tấm cán có <b>tạp chất phi kim dẹt</b> xếp lớp song song bề mặt. Theo chiều dày, tấm "yếu" như gỗ dán bị kéo tách lớp (STRA thấp).'},
 {svg: A(300, 240, 300, 215, RD, 2.5) + A(210, 140, 210, 160, RD, 2) + T(315, 235, 'co ngót kéo THEO CHIỀU DÀY tấm', RD, 12), cap:'Mối hàn co lại <b>kéo tấm ngang theo chiều dày</b> (through-thickness strain). Các lớp tạp chất mở ra…'},
 {svg: DRAW('M195 185 L235 185 L238 195 L290 195 L293 205 L350 205', RD, 3) + T(460, 120, 'LAMELLAR TEARING', RD, 14, 'start', 'font-weight="700"') + T(460, 138, 'bậc thang, trong NỀN, dưới mối hàn', MU, 11) + T(460, 160, 'Phòng: thép Z35 (STRA ≥35%),', GR, 11) + T(460, 174, 'buttering lớp đệm, đổi thiết kế mối nối,', GR, 11) + T(460, 188, 'giảm kim loại đắp/ràng buộc', GR, 11), cap:'…tạo vết <b>bậc thang</b> (terrace + shear walls) nằm trong <b>kim loại nền</b>, ngay dưới HAZ. Phòng: dùng thép <b>Z</b> (thử STRA theo chiều dày), <b>buttering</b> (đắp lớp đệm dẻo lên tấm trước), thiết kế tránh kéo theo chiều dày, UT tấm trước hàn.'}
]);

/* ===== 13. Hồ quang MMA ===== */
G['arc-mma'] = F('Que hàn MMA — cái gì che vũng hàn?', [
 {svg: R(60, 200, 560, 30, PL) + R(300, 40, 18, 120, '#9aa6b5') + R(296, 40, 26, 112, '#6b5a3a') + T(340, 70, 'vỏ thuốc (flux covering)', '#d9a066', 12) + T(340, 110, 'lõi que (core wire)', '#9aa6b5', 12), cap:'Que hàn = <b>lõi thép</b> dẫn điện và cung cấp kim loại + <b>vỏ thuốc</b>. Vỏ thuốc là thứ quyết định "tính cách" que (rutile/basic/cellulosic).'},
 {svg: PATH('M300 160 L318 160 L309 190Z', YL, 'none', 0, 'class="gbf-flicker"') + PATH('M290 200 Q309 185 328 200Z', WM) + T(340, 150, 'hồ quang ~6000 °C', YL, 12) + T(340, 190, 'vũng hàn', WM, 12), cap:'Hồ quang điện nung chảy đầu que và nền thành <b>vũng hàn</b>. Giọt kim loại chuyển qua hồ quang vào vũng.'},
 {svg: '<ellipse cx="309" cy="178" rx="48" ry="26" fill="' + BL + '" opacity=".15" stroke="' + BL + '" stroke-dasharray="4 3"/>' + T(150, 150, 'khí bảo vệ (CO₂, H₂, hơi)', BL, 12, 'end') + A(155, 150, 262, 170, BL, 1.2), cap:'Vỏ thuốc cháy sinh <b>khí</b> bao quanh hồ quang → đẩy không khí (O₂, N₂) ra xa. Đây là "cái vung đậy nồi" #1. Hồ quang dài quá → vung hở → rỗ khí.'},
 {svg: PATH('M240 200 Q270 186 300 196 L300 200Z', '#2a2a2a') + T(150, 205, 'xỉ (slag) nổi lên phủ bề mặt', '#bbb', 12, 'end') + A(155, 205, 245, 196, '#bbb', 1.2), cap:'Thuốc chảy thành <b>xỉ</b> nhẹ hơn, nổi lên phủ đường hàn khi nguội — "cái vung" #2: chống oxy hóa, làm nguội chậm, tạo hình bề mặt. Phải <b>gõ sạch</b> trước lớp sau, nếu không → ngậm xỉ.'},
 {svg: T(60, 70, 'vỏ thuốc còn: khử oxy (Si, Mn), thêm hợp kim,', MU, 11) + T(60, 84, 'ổn định hồ quang (K, Na), bột sắt tăng năng suất.', MU, 11) + T(60, 104, 'Basic: CaCO₃/CaF₂ → H thấp, nhưng hút ẩm → phải SẤY', GR, 11) + T(60, 118, 'Cellulosic: xenlulo → H₂ nhiều → ngấu sâu, không sấy nóng', RD, 11), cap:'Ngoài che chắn, vỏ thuốc còn <b>khử oxy, thêm hợp kim, ổn định hồ quang</b>. Hiểu vậy là trả lời được hầu hết câu "vỏ thuốc có tác dụng gì / vì sao que basic phải sấy / vì sao cellulosic ngấu sâu".'}
]);

/* ===== 14. CC vs CV ===== */
G['cc-cv'] = F('Nguồn hàn CC (dốc) vs CV (phẳng)', [
 {svg: L(60, 220, 300, 220, MU) + L(60, 220, 60, 50, MU) + T(300, 240, 'I (dòng)', MU, 11, 'end') + T(50, 50, 'U', MU, 11, 'end') + PATH('M70 60 Q200 90 280 215', 'none', BL, 3) + T(180, 60, 'CC — drooping (MMA, TIG)', BL, 12, 'middle', 'font-weight="700"'), cap:'Nguồn <b>dòng không đổi (CC)</b> có đặc tuyến <b>dốc</b>: điện áp đổi nhiều nhưng dòng gần như không đổi.'},
 {svg: L(60, 150, 300, 150, YL, 1, 'stroke-dasharray="3 2"') + L(60, 125, 300, 125, YL, 1, 'stroke-dasharray="3 2"') + C(178, 150, 4, YL) + C(165, 125, 4, YL) + T(305, 140, 'tay run: hồ quang dài/ngắn', YL, 11) + T(305, 154, '→ U đổi nhiều, I đổi RẤT ÍT', YL, 11), cap:'Thợ hàn tay run → chiều dài hồ quang đổi → điện áp đổi, nhưng <b>dòng hầu như giữ nguyên</b> → tốc độ chảy que ổn định. Vì vậy MMA/TIG (điều khiển bằng tay) dùng CC.'},
 {svg: L(360, 220, 620, 220, MU) + L(360, 220, 360, 50, MU) + PATH('M370 120 L600 140', 'none', GR, 3) + T(490, 60, 'CV — flat (MIG/MAG, SAW dây nhỏ)', GR, 12, 'middle', 'font-weight="700"'), cap:'Nguồn <b>điện áp không đổi (CV)</b> có đặc tuyến <b>phẳng</b>: điện áp giữ nguyên, dòng thay đổi rất nhiều theo tải.'},
 {svg: L(420, 50, 420, 220, YL, 1, 'stroke-dasharray="3 2"') + L(560, 50, 560, 220, YL, 1, 'stroke-dasharray="3 2"') + C(420, 124, 4, YL) + C(560, 136, 4, YL) + T(490, 240, 'U gần như không đổi → I đổi mạnh', YL, 11, 'middle') + T(490, 185, 'hồ quang ngắn lại → I tăng vọt → dây chảy nhanh hơn', MU, 10.5, 'middle') + T(490, 200, '→ hồ quang TỰ về chiều dài cũ (self-adjusting)', GR, 10.5, 'middle'), cap:'Dây cấp liên tục với tốc độ cố định. Nếu hồ quang ngắn lại → dòng tăng vọt → dây chảy nhanh hơn → hồ quang <b>tự dài ra</b> về cũ. Gọi là <b>hồ quang tự điều chỉnh</b> — thợ chỉ cần giữ súng. Tầm với (stick-out) dài → điện trở tăng → dòng GIẢM.'}
]);

/* ===== 15. Cực tính ===== */
G['polarity'] = F('Cực tính DC — nhiệt dồn về đâu?', [
 {svg: R(60, 200, 240, 24, PL) + R(170, 60, 14, 110, '#9aa6b5') + PATH('M170 170 L184 170 L177 200Z', YL, 'none', 0, 'class="gbf-flicker"') + T(177, 45, 'DC− (điện cực âm, DCEN)', BL, 13, 'middle', 'font-weight="700"'), cap:'Trong hồ quang DC, electron bay từ cực âm (catot) sang cực dương (anot) và đập vào anot → <b>anot nóng hơn (~2/3 nhiệt)</b>.'},
 {svg: A(172, 160, 165, 195, BL, 1.5) + A(182, 160, 189, 195, BL, 1.5) + T(60, 120, 'e⁻ đập vào VẬT HÀN', BL, 12) + T(60, 136, '→ 2/3 nhiệt vào nền: ngấu sâu', BL, 12) + T(60, 152, '→ điện cực mát: TIG thép dùng DC−', GR, 12), cap:'<b>DC−</b> (điện cực âm): electron đập vào <b>vật hàn</b> → vật hàn nhận ~2/3 nhiệt, điện cực mát. Lý tưởng cho <b>TIG thép/inox</b> (giữ đầu vonfram), và MAG ngấu sâu.'},
 {svg: R(380, 200, 240, 24, PL) + R(490, 60, 14, 110, '#9aa6b5') + PATH('M490 170 L504 170 L497 200Z', YL, 'none', 0, 'class="gbf-flicker"') + T(497, 45, 'DC+ (điện cực dương, DCEP)', RD, 13, 'middle', 'font-weight="700"') + A(488, 195, 494, 160, RD, 1.5) + A(506, 195, 500, 160, RD, 1.5) + T(390, 120, 'e⁻ đập vào ĐIỆN CỰC', RD, 12) + T(390, 136, '→ que nóng, chảy nhanh (đắp ↑), ngấu ↓', RD, 12), cap:'<b>DC+</b>: electron đập vào <b>điện cực</b> → que nóng, chảy nhanh hơn, ngấu nông hơn. Ion dương đập vào nền phá lớp oxit (làm sạch). TIG DC+ sẽ cháy vonfram → không dùng cho thép.'},
 {svg: T(60, 245, 'MMA que basic: thường DC+ (hồ quang ổn định, ít rỗ, cơ tính tốt). Đổi sang DC−: ngấu giảm, đắp tăng nhẹ.', YL, 11) + T(390, 160, 'AC: nửa chu kỳ mỗi chiều', PU, 12) + T(390, 176, '→ TIG nhôm: nửa + làm sạch oxit, nửa − làm mát điện cực', PU, 11), cap:'Tóm lại: TIG thép <b>DC−</b> · TIG nhôm <b>AC</b> (cần nửa chu kỳ dương phá oxit Al₂O₃) · MMA basic <b>DC+</b> · MAG dây đặc <b>DC+</b>. Đề hỏi "đổi cực tính thì ngấu thế nào" → nhớ "nhiệt dồn về anot".'}
]);

/* ===== 16. Chuyển dịch kim loại MIG/MAG ===== */
G['mig-transfer'] = F('MIG/MAG — 3 chế độ chuyển dịch kim loại', [
 {svg: R(40, 210, 180, 20, PL) + R(125, 60, 8, 110, '#9aa6b5') + C(129, 178, 9, WM) + PATH('M120 187 L138 187 L129 210Z', WM, 'none') + T(130, 250, 'DIP (ngắn mạch)', BL, 13, 'middle', 'font-weight="700"') + T(130, 40, '< ~200 A · < ~22 V', MU, 11, 'middle'), cap:'<b>Dip / short-circuit</b>: dây chạm vào vũng → ngắn mạch → chảy đứt → hồ quang lại (50–200 lần/giây). Nhiệt thấp → hàn <b>mỏng, mọi tư thế, lớp lót</b>; nhược: bắn tóe, <b>LOF</b> trên tấm dày.'},
 {svg: R(230, 210, 180, 20, PL) + R(315, 60, 8, 100, '#9aa6b5') + C(319, 175, 12, WM) + PATH('M305 195 L333 195 L319 210Z', YL, 'none', 0, 'class="gbf-flicker"') + T(320, 250, 'GLOBULAR (giọt lớn)', YL, 13, 'middle', 'font-weight="700"') + T(320, 40, 'trung gian · CO₂ 100%', MU, 11, 'middle'), cap:'<b>Globular</b>: giọt to hơn đường kính dây, rơi lộn xộn → <b>bắn tóe nhiều</b>, hồ quang không ổn — vùng cần tránh (CO₂ 100% hay rơi vào đây).'},
 {svg: R(420, 210, 180, 20, PL) + R(505, 60, 8, 90, '#9aa6b5') + C(509, 160, 2.5, WM) + C(509, 172, 2.5, WM) + C(509, 184, 2.5, WM) + C(509, 196, 2.5, WM) + PATH('M490 175 L528 175 L509 210Z', YL, 'none', 0, 'class="gbf-flicker"') + T(510, 250, 'SPRAY (phun)', GR, 13, 'middle', 'font-weight="700"') + T(510, 40, '> ~24–26 V · Ar-rich · dòng cao', MU, 11, 'middle'), cap:'<b>Spray</b>: giọt li ti bay thẳng, hồ quang êm, <b>ngấu sâu, đắp nhanh</b>, ít bắn tóe. Cần Ar + ≤20% CO₂ và dòng/áp cao → vũng lỏng lớn → chỉ <b>PA/PB/PC</b>, không hàn lớp lót hở gốc/tư thế đứng-trần.'},
 {svg: T(60, 100, 'Pulsed: xung dòng cao–thấp → spray ở dòng trung bình thấp → mọi tư thế, nhôm/inox.', PU, 11) + T(60, 118, 'Đề: "chế độ nào rủi ro LOF nhất?" → dip. "Chế độ nào không hàn trần?" → spray.', MU, 11), cap:'<b>Pulsed</b>: điện tử tạo xung → được spray ở dòng trung bình thấp → hàn mọi tư thế, nhôm/inox đẹp. Đề thường hỏi: dip = LOF; spray = không trần; CO₂ = ngấu sâu + bắn tóe.'}
]);

/* ===== 17. SAW ===== */
G['saw'] = F('SAW — hồ quang chìm dưới thuốc', [
 {svg: R(60, 200, 560, 26, PL) + R(300, 50, 10, 100, '#9aa6b5') + R(260, 40, 90, 30, '#5a4a30') + T(305, 32, 'phễu thuốc (flux hopper)', '#d9a066', 11, 'middle'), cap:'Dây hàn liên tục (Ø2–5 mm) chạy xuống qua ống tiếp điện; phía trước, phễu rải một <b>lớp thuốc hạt</b> dày lên mối nối.'},
 {svg: PATH('M200 200 Q305 150 420 200Z', '#5a4a30') + T(150, 170, 'thuốc hạt phủ kín', '#d9a066', 12, 'end') + A(155, 170, 230, 185, '#d9a066', 1.2), cap:'Hồ quang cháy <b>chìm dưới lớp thuốc</b> → không thấy hồ quang, không tia UV, không bắn tóe, không cần kính hàn. Thuốc chảy một phần thành xỉ che vũng.'},
 {svg: PATH('M300 150 L310 150 L305 200Z', YL, 'none', 0, 'class="gbf-flicker"') + PATH('M270 200 Q305 180 340 200Z', WM) + T(460, 120, 'dòng 300–1000+ A', TX, 12) + T(460, 136, 'đắp nhanh, ngấu rất sâu', TX, 12) + T(460, 152, 'k = 1,0 (không mất nhiệt)', TX, 12), cap:'Dòng rất lớn → <b>năng suất cao nhất</b> trong các quá trình thông thường, ngấu sâu, hệ số nhiệt k = 1,0 (thuốc giữ nhiệt). Dùng cho tấm dày, mối hàn dài thẳng, bồn, dầm.'},
 {svg: T(60, 80, 'Nhược: chỉ PA/PB (thuốc rơi), không nhìn thấy vũng → cần rãnh dẫn/đồ gá,', RD, 11) + T(60, 96, 'heat input cao → hạt thô/độ dai giảm, mối hàn sâu-hẹp → nứt kết tinh;', RD, 11) + T(60, 112, 'thuốc kết tụ hút ẩm → sấy như que basic.', RD, 11), cap:'Nhược điểm = câu hỏi đề: chỉ hàn <b>bằng/ngang-đứng góc</b>; không thấy vũng → phụ thuộc gá lắp; heat input cao → hạt thô, nguy cơ <b>nứt kết tinh</b> ở đường hàn sâu-hẹp; thuốc kết tụ <b>hút ẩm</b>.'}
]);

/* ===== 18. Heat input ===== */
G['heat-input'] = F('Nhiệt đầu vào — công thức và hệ quả', [
 {svg: T(320, 90, 'HI (kJ/mm) =', TX, 20, 'middle') + T(320, 130, 'U (V) × I (A) × 60', YL, 20, 'middle') + L(200, 140, 440, 140, TX, 2) + T(320, 165, 'v (mm/phút) × 1000', YL, 20, 'middle') + T(320, 205, '× k (hệ số nhiệt)', GR, 16, 'middle'), cap:'<b>Nhiệt đầu vào</b> = năng lượng điện rót vào mỗi mm đường hàn. Tăng U hoặc I → tăng; <b>tăng tốc độ v → GIẢM</b>. Đề cho v theo mm/giây thì bỏ số 60.'},
 {svg: T(60, 245, 'k: SAW 1,0 · MMA/MIG/MAG/FCAW 0,8 · TIG/plasma 0,6 (EN 1011-1). "Arc energy" = chưa nhân k.', GR, 11.5), cap:'Một phần năng lượng mất ra môi trường, nên nhân hệ số <b>k</b>. SAW giữ nhiệt tốt nhất (1,0), TIG mất nhiều nhất (0,6). Ví dụ: 24 V × 150 A × 60 / (250 × 1000) = 0,86 kJ/mm → × 0,8 = 0,69 kJ/mm.'},
 {svg: R(60, 60, 170, 20, PL) + BEAD(145, 60, 110, 18) + T(145, 45, 'HI CAO', RD, 12, 'middle', 'font-weight="700"') + T(145, 100, 'rộng, nguội chậm', MU, 10.5, 'middle') + T(145, 114, 'hạt thô, độ dai ↓, biến dạng ↑', RD, 10.5, 'middle') + T(145, 128, 'nhưng cứng ↓ → ít nứt H', GR, 10.5, 'middle'), cap:'<b>HI cao</b> → vũng lớn, nguội chậm → <b>hạt thô, độ dai giảm, biến dạng nhiều</b>, nhưng ít mactenxit → <b>ít nứt hydro</b>. Giới hạn trên khi có yêu cầu va đập.'},
 {svg: R(430, 60, 170, 20, PL) + BEAD(515, 60, 50, 10) + T(515, 45, 'HI THẤP', BL, 12, 'middle', 'font-weight="700"') + T(515, 100, 'hẹp, nguội nhanh', MU, 10.5, 'middle') + T(515, 114, 'cứng ↑ → nứt hydro ↑', RD, 10.5, 'middle') + T(515, 128, 'ít biến dạng, hạt mịn, dễ LOF', GR, 10.5, 'middle'), cap:'<b>HI thấp</b> → nguội nhanh → <b>cứng, nguy cơ nứt hydro</b>, dễ LOF, nhưng hạt mịn, ít biến dạng. Giới hạn dưới khi có yêu cầu độ cứng. Thanh tra kiểm HI qua U, I, v (hoặc ROL — chiều dài đường hàn/que).'}
]);

/* ===== 19. HAZ & tổ chức ===== */
G['haz-regions'] = F('HAZ — nhiệt độ đỉnh quyết định tổ chức', [
 {svg: R(60, 150, 560, 50, PL) + PATH('M280 150 L320 200 L360 150 Q320 135 280 150Z', WM) + T(60, 240, 'càng xa mối hàn, nhiệt độ đỉnh càng thấp →', MU, 12), cap:'Mỗi điểm trong HAZ trải qua một <b>nhiệt độ đỉnh</b> khác nhau tùy khoảng cách tới đường chảy. Nhiệt độ đỉnh → tổ chức → cơ tính.'},
 {svg: PATH('M360 150 L380 200 L360 200Z', '#a34a1a', 'none') + PATH('M380 150 L400 200 L380 200 L360 200Z', '#b8753a') + T(372, 120, 'CG', '#ffb37a', 11, 'middle') + T(372, 108, '>1100 °C', MU, 9, 'middle') + T(430, 60, 'CGHAZ — hạt thô (coarse grain)', '#ffb37a', 12) + T(430, 76, 'cứng nhất, dai kém nhất → chỗ nứt H', RD, 11), cap:'Sát đường chảy (<b>>1100 °C</b>): austenit lớn hạt → <b>CGHAZ hạt thô</b>. Nguội nhanh ra mactenxit → <b>cứng nhất, độ dai kém nhất</b>. Nơi đo độ cứng, nơi nứt nguội thích.'},
 {svg: PATH('M400 150 L420 200 L400 200 L380 200Z', '#c9975a') + T(405, 120, 'FG', '#f0c890', 11, 'middle') + T(405, 108, '900–1100', MU, 9, 'middle') + T(430, 100, 'FGHAZ — tái kết tinh hạt mịn', '#f0c890', 12) + T(430, 116, 'tổ chức tốt nhất (như thường hóa)', GR, 11), cap:'Xa hơn (<b>900–1100 °C</b>): vừa qua A3, hạt tái kết tinh nhỏ mịn → <b>FGHAZ</b> — độ dai thậm chí tốt hơn nền (giống thường hóa).'},
 {svg: PATH('M420 150 L440 200 L420 200Z', '#d9b78a') + PATH('M440 150 L470 200 L440 200Z', '#5a6a7c') + T(432, 120, 'IC', '#e8d0b0', 11, 'middle') + T(458, 120, 'SC', '#9aa6b5', 11, 'middle') + T(430, 140, 'ICHAZ 723–900 °C: chuyển biến một phần', '#e8d0b0', 11) + T(430, 156, 'SCHAZ <723 °C: ram/ổn định, mềm nhẹ', '#9aa6b5', 11), cap:'<b>ICHAZ</b> (723–900 °C): chỉ một phần thành austenit → hỗn hợp. <b>SCHAZ</b> (<723 °C): không chuyển pha, chỉ bị <b>ram</b> → có thể hơi mềm hơn nền. Nhớ chuỗi từ trong ra: <b>CG → FG → IC → SC</b>.'}
]);

/* ===== 20. Nguội nhanh / chậm ===== */
G['cooling-micro'] = F('Tốc độ nguội quyết định tổ chức', [
 {svg: R(80, 80, 200, 130, PL2) + T(180, 60, 'NGUỘI CHẬM', GR, 14, 'middle', 'font-weight="700"') + T(180, 235, 'tiền nhiệt, HI cao, tấm mỏng', MU, 11, 'middle'), cap:'Cùng một thép, nung lên austenit. Nếu <b>nguội chậm</b> (tiền nhiệt, heat input cao)…'},
 {svg: PATH('M90 90 L130 90 L130 130 L90 130Z M135 95 L185 95 L185 135 L135 135Z M90 140 L140 140 L140 200 L90 200Z M150 145 L265 145 L265 200 L150 200Z M190 90 L265 90 L265 135 L190 135Z', '#7a8a9c', TX, 1) + PATH('M152 150 L262 150 M152 160 L262 160 M152 170 L262 170 M152 180 L262 180 M152 190 L262 190', 'none', '#333', 2) + T(180, 115, 'ferit + peclit', TX, 12, 'middle') + T(300, 140, 'mềm, dẻo, dai', GR, 12), cap:'…carbon có thời gian khuếch tán → <b>ferit + peclit</b> (lớp xen kẽ): <b>mềm, dẻo, dễ gia công</b>, hydro thoát được. Đây là tổ chức "bình thường" của thép C-Mn.'},
 {svg: R(380, 80, 200, 130, PL2) + T(480, 60, 'NGUỘI NHANH (tôi)', RD, 14, 'middle', 'font-weight="700"') + T(480, 235, 'không tiền nhiệt, HI thấp, tấm dày, CEV cao', MU, 11, 'middle'), cap:'Nếu <b>nguội nhanh</b> (tấm dày hút nhiệt, không tiền nhiệt, heat input thấp, thép CEV cao)…'},
 {svg: PATH('M390 100 L470 140 M400 180 L480 110 M440 90 L520 160 M470 200 L560 120 M500 90 L570 170 M390 150 L450 200', 'none', '#e0e6ee', 3, 'stroke-linecap="round"') + T(480, 115, 'mactenxit (kim)', TX, 12, 'middle', 'font-weight="700"') + T(600, 140, 'rất cứng (>400 HV),', RD, 12) + T(600, 156, 'giòn, nhốt hydro → nứt', RD, 12), cap:'…carbon bị "kẹt" trong mạng → <b>mactenxit</b> dạng kim: <b>rất cứng, giòn</b>, hydro không thoát → nứt nguội. Vì vậy mọi biện pháp của chương này đều nhắm vào <b>làm nguội chậm lại</b>: tiền nhiệt, HI đủ, PWHT ram mềm.'}
]);

/* ===== 21. PWHT cycle ===== */
G['pwht-cycle'] = F('Chu trình PWHT — thanh tra soi gì trên biểu đồ', [
 {svg: L(60, 220, 600, 220, MU) + L(60, 220, 60, 50, MU) + T(600, 240, 'thời gian', MU, 11, 'end') + T(45, 50, '°C', MU, 11, 'end') + L(60, 68, 600, 68, RD, 1, 'stroke-dasharray="5 3"') + T(605, 72, 'A1 ≈ 723 °C — KHÔNG vượt', RD, 11), cap:'Biểu đồ nhiệt độ – thời gian. Lằn ranh đỏ là <b>A1 ≈ 723 °C</b>: PWHT giải phóng ứng suất luôn ở <b>dưới</b> A1 (nếu vượt sẽ chuyển pha → là thường hóa/ủ, không phải PWHT).'},
 {svg: DRAW('M60 215 L120 200 L220 110', BL, 3) + T(140, 170, 'nâng nhiệt có kiểm soát', BL, 11) + T(140, 184, '(trên ~300–400 °C, ≤ X °C/h theo t)', MU, 10), cap:'<b>Nâng nhiệt</b> từ từ (quá nhanh → chênh nhiệt → biến dạng/nứt). Tốc độ kiểm soát khi vượt ~300–400 °C.'},
 {svg: DRAW('M220 110 L420 110', YL, 3) + T(320, 98, 'giữ nhiệt 550–650 °C', YL, 12, 'middle') + T(320, 128, '~1 h / 25 mm (min 1 h)', MU, 11, 'middle'), cap:'<b>Giữ nhiệt (soak)</b> 550–650 °C cho thép C-Mn, thời gian theo chiều dày (~1 h/25 mm). Lúc này ứng suất dư "chảy" bớt (giới hạn chảy giảm ở nhiệt cao) và mactenxit được <b>ram</b> mềm.'},
 {svg: DRAW('M420 110 L540 200 L600 215', GR, 3) + T(520, 170, 'hạ nhiệt kiểm soát', GR, 11) + T(60, 250, 'Thanh tra kiểm: số & vị trí cặp nhiệt điện · máy ghi hiệu chuẩn · tốc độ nâng/hạ · thời gian giữ · đỡ chi tiết · độ cứng sau PWHT', TX, 10.5), cap:'<b>Hạ nhiệt</b> cũng kiểm soát tới ~300–400 °C rồi mới nguội tĩnh. Thanh tra <b>đọc biểu đồ</b>, không nghe kể: cặp nhiệt điện đủ & đúng chỗ, máy ghi có tem hiệu chuẩn, chi tiết được kê đỡ (tránh võng), độ cứng sau PWHT đạt.'}
]);

/* ===== 22. Đo tiền nhiệt ===== */
G['preheat-measure'] = F('Tiền nhiệt — đo ở đâu, khi nào', [
 {svg: PLATES(320, 140, 40, 6, 220) + PATH('M300 60 L340 60 L330 100 L310 100Z', '#6b7a8c') + PATH('M312 100 L328 100 L320 135Z', YL, 'none', 0, 'class="gbf-flicker"') + T(320, 50, 'mỏ nung (torch)', MU, 11, 'middle'), cap:'Mỏ nung hơ dọc mối nối. Câu hỏi: đo nhiệt độ <b>ở đâu</b> để biết tấm đã đủ ấm?'},
 {svg: C(330, 138, 7, RD, 'opacity=".6"') + T(345, 125, '✗ ngay chỗ vừa hơ: ảo', RD, 11), cap:'Đo <b>ngay chỗ vừa hơ</b> → đọc được 150 °C nhưng chỉ là bề mặt; lòng tấm vẫn lạnh → tốc độ nguội vẫn nhanh.'},
 {svg: L(323, 180, 400, 180, GR, 1.5, 'stroke-dasharray="3 2"') + A(323, 192, 400, 192, GR, 1.5) + T(362, 208, '≥ 75 mm (hoặc 4t)', GR, 11, 'middle') + C(400, 182, 6, GR) + T(410, 170, '✓ đo cách mép, phía ĐỐI DIỆN nguồn nhiệt', GR, 11) + T(410, 186, 'trước MỖI đường hàn (ISO 13916)', GR, 11), cap:'Đo <b>cách mép ≥75 mm</b> (hoặc 4t, lấy nhỏ hơn — ISO 13916), <b>phía đối diện</b> nguồn nhiệt nếu tiếp cận được, <b>ngay trước mỗi đường hàn</b>. Đạt ở đó = cả chiều dày đã ấm.'},
 {svg: T(60, 240, 'Dụng cụ: bút nhiệt (tempilstik — đổi trạng thái ở ngưỡng, dùng 2 bút kẹp khoảng) · nhiệt kế tiếp xúc · cặp nhiệt điện · hồng ngoại (cần hệ số phát xạ).', TX, 10.5) + T(60, 70, 'Interpass max: đo ngay trước lớp tiếp theo, ở mối hàn — C-Mn ~250 °C, inox/duplex ~150 °C', YL, 11), cap:'<b>Interpass</b> (nhiệt độ giữa các lớp) là <b>trần</b>: đo trên kim loại hàn ngay trước lớp kế. Dụng cụ: bút nhiệt chỉ biết "đạt ngưỡng hay chưa"; nhiệt kế tiếp xúc/cặp nhiệt điện cho số đo.'}
]);

/* ===== 23. Biến dạng ===== */
G['distortion'] = F('Biến dạng — một nguyên nhân, nhiều biểu hiện', [
 {svg: R(60, 140, 220, 16, PL) + PATH('M150 140 L170 140 Q160 120 150 140Z', WM) + A(120, 170, 150, 170, RD, 2) + A(230, 170, 200, 170, RD, 2) + T(170, 195, 'mối hàn nguội → CO LẠI', RD, 12, 'middle') + T(170, 211, 'co ngang + co dọc', MU, 11, 'middle'), cap:'Mọi biến dạng đều từ một gốc: kim loại hàn nóng <b>co lại khi nguội</b> và kéo tấm theo — co <b>ngang</b> (transverse) và co <b>dọc</b> (longitudinal).'},
 {svg: PATH('M340 150 L430 142 L520 150', 'none', PL, 16) + PATH('M420 134 L440 134 Q430 118 420 134Z', WM) + T(430, 195, 'biến dạng GÓC (angular)', YL, 12, 'middle') + T(430, 211, 'chữ V một phía co nhiều ở mặt → gập lên', MU, 10.5, 'middle'), cap:'<b>Biến dạng góc</b>: rãnh V một phía rộng trên hẹp dưới → mặt co nhiều hơn chân → hai tấm <b>gập lên</b>. Đây là kiểu đề hỏi nhiều nhất. Giải pháp: double-V, pre-set ngược, hàn luân phiên hai phía.'},
 {svg: PATH('M60 80 Q170 50 280 80', 'none', PL, 12) + T(170, 40, 'cong dọc (bowing) — mối hàn lệch trục trung hòa', MU, 10.5, 'middle') + PATH('M340 70 Q380 60 420 70 Q460 80 500 70 Q540 60 580 70', 'none', PL, 6) + T(460, 45, 'oằn tấm mỏng (buckling)', MU, 10.5, 'middle'), cap:'<b>Cong dọc</b> khi mối hàn nằm lệch trục trung hòa (dầm chữ T); <b>oằn/lượn sóng</b> ở tấm mỏng do ứng suất nén dư; <b>xoắn</b> khi hàn không đối xứng.'},
 {svg: T(60, 240, 'Giảm: ít kim loại đắp (góc hẹp, X thay V) · cân đối hai phía · back-step / skip · pre-set, pre-bend · gá kẹp (nhưng ↑ ứng suất dư) · HI thấp vừa đủ', GR, 10.5) + T(60, 256, 'Sửa: nắn cơ học hoặc hơ nhiệt cục bộ (flame straightening). PWHT giảm ỨNG SUẤT DƯ, không nắn biến dạng.', YL, 10.5), cap:'Biện pháp theo ưu tiên: <b>thiết kế</b> (ít đắp, đối xứng) → <b>trình tự</b> (back-step, skip, luân phiên) → <b>pre-set/gá</b>. Kẹp cứng giảm biến dạng nhưng <b>tăng ứng suất dư</b>. Đã méo thì nắn cơ/nhiệt; PWHT không nắn được.'}
]);

/* ===== 24. RT ===== */
G['ndt-rt'] = F('RT — vì sao thấy rỗ mà mù vết nứt lệch tia', [
 {svg: C(320, 50, 10, PU) + T(340, 55, 'nguồn (X-ray / Ir-192)', PU, 11) + PLATES(320, 140, 36, 0, 200) + VWELD(320, 140, 36, true) + R(100, 200, 440, 10, '#222') + T(320, 228, 'phim (film)', '#bbb', 11, 'middle'), cap:'Nguồn phát tia <b>xuyên qua</b> mối hàn xuống phim. Chỗ kim loại dày/đặc hấp thụ nhiều → phim sáng; chỗ rỗng → tia qua nhiều → phim <b>đen</b>.'},
 {svg: PATH('M320 60 L200 200 M320 60 L260 200 M320 60 L320 200 M320 60 L380 200 M320 60 L440 200', 'none', PU, 1, 'opacity=".6" class="gbf-beam"') + C(300, 155, 5, '#0a0e17') + R(296, 203, 10, 4, '#000') + T(140, 100, 'rỗ khí: khối rỗng', GR, 11) + T(140, 114, '→ vệt đen rõ trên phim ✓', GR, 11), cap:'<b>Rỗ khí, ngậm xỉ</b> (khuyết tật <b>khối</b>) làm giảm chiều dày hấp thụ rõ rệt → <b>vệt đen</b> dễ thấy. RT là vua của khuyết tật thể tích.'},
 {svg: L(340, 145, 348, 172, RD, 3) + T(480, 100, 'vết nứt nghiêng so với tia:', RD, 11) + T(480, 114, 'chiều dày hấp thụ gần như không đổi', RD, 11) + T(480, 128, '→ phim KHÔNG thấy ✗', RD, 11), cap:'Vết nứt/LOF là khuyết tật <b>phẳng</b>: nếu <b>nghiêng so với tia</b>, tổng chiều dày kim loại tia đi qua gần như không đổi → không có tương phản → <b>bỏ sót</b>. Chỉ khi mặt nứt <b>song song với tia</b> mới thấy một đường đen mảnh.'},
 {svg: R(230, 136, 30, 3, '#ccc') + T(245, 128, 'IQI', '#ccc', 10, 'middle') + T(60, 245, 'IQI (dây/bậc) chứng minh ĐỘ NHẠY phim (~2% t) — không phải đo khuyết tật · mật độ phim 2,0–4,0 · X-ray: nét hơn, tắt được · gamma: cơ động, luôn phát → an toàn bức xạ, cách ly', TX, 10.5), cap:'<b>IQI</b> đặt trên vật chứng minh phim đủ nhạy (nhìn thấy dây ~2% chiều dày). Thanh tra xem phim kiểm <b>mật độ</b> (2,0–4,0), IQI, nhãn/vị trí, rồi mới đánh giá chỉ thị. RT cần tiếp cận hai phía, cách ly khu vực, có <b>phim lưu</b>.'}
]);

/* ===== 25. UT ===== */
G['ndt-ut'] = F('UT — đầu dò góc bắt khuyết tật phẳng', [
 {svg: PLATES(320, 130, 50, 0, 240) + VWELD(320, 130, 50, true) + PATH('M160 130 L200 130 L190 112 L170 112Z', '#9aa6b5') + T(180, 100, 'đầu dò góc 60°', BL, 11, 'middle') + T(180, 150, 'couplant', MU, 10, 'middle'), cap:'Đầu dò góc (45/60/70°) đặt trên tấm, qua lớp <b>couplant</b> (gel) để sóng vào thép. Sóng ngang đi xiên vào mối hàn.'},
 {svg: DRAW('M185 130 L270 180 L330 142', BL, 2) + T(300, 200, 'sóng phản xạ đáy → vào thành rãnh', BL, 11, 'middle'), cap:'Sóng đi xiên, <b>phản xạ ở mặt đáy</b> rồi đập vào thành rãnh/mối hàn (kỹ thuật nửa bước/cả bước nhảy — half/full skip).'},
 {svg: L(290, 140, 310, 165, RD, 4) + DRAW('M330 142 L300 152 L185 130', GR, 2) + T(470, 80, 'LOF thành bên vuông góc chùm tia', RD, 11) + T(470, 94, '→ phản xạ mạnh về đầu dò ✓', GR, 11) + T(470, 108, 'RT sẽ bỏ sót chính khuyết tật này', MU, 10.5), cap:'Gặp <b>mặt phẳng vuông góc chùm tia</b> (LOF thành bên, nứt) → <b>phản xạ mạnh</b> về đầu dò → xung cao trên màn. Đây chính là khuyết tật RT bỏ sót → UT và RT <b>bổ sung</b> nhau.'},
 {svg: L(450, 180, 620, 180, MU) + L(450, 180, 450, 120, MU) + PATH('M452 180 L470 180 L474 150 L478 180 L520 180 L526 128 L532 180 L600 180', 'none', GR, 1.5) + T(474, 145, 'xung phát', MU, 9, 'middle') + T(528, 122, 'khuyết tật', RD, 9, 'middle') + T(60, 245, 'Ưu: một phía, đo được độ sâu/chiều dày, nhạy khuyết tật phẳng, an toàn. Nhược: cần tay nghề, bề mặt tốt, couplant, khó tấm mỏng <8 mm & inox hạt thô, không phim lưu (trừ TOFD/PAUT). Chuẩn: khối V1/V2.', TX, 10) , cap:'Màn hình A-scan: vị trí xung = <b>khoảng cách</b>, chiều cao = độ phản xạ. UT đo được <b>độ sâu</b>, một phía, an toàn — nhưng <b>phụ thuộc người dò</b>, cần bề mặt tốt, khó với tấm mỏng và inox austenit (hạt thô tán xạ). Hiệu chuẩn mỗi ca bằng khối V1/V2.'}
]);

/* ===== 26. MT ===== */
G['ndt-mt'] = F('MT — từ trường rò ở vết nứt', [
 {svg: R(60, 160, 520, 40, PL) + PATH('M200 100 L200 160 M440 100 L440 160 M200 100 L440 100', 'none', '#9aa6b5', 14, 'stroke-linecap="round"') + T(320, 80, 'gông từ (yoke) — AC cho bề mặt', TX, 12, 'middle') + T(200, 220, 'N', RD, 14, 'middle', 'font-weight="700"') + T(440, 220, 'S', BL, 14, 'middle', 'font-weight="700"'), cap:'Gông từ đặt hai chân lên tấm thép → sinh <b>từ trường</b> chạy trong tấm từ cực này sang cực kia (chỉ với vật liệu <b>từ tính</b>: thép C-Mn, hợp kim thấp — KHÔNG inox austenit/nhôm).'},
 {svg: PATH('M205 175 L435 175 M205 185 L435 185 M205 195 L435 195', 'none', YL, 1.2, 'stroke-dasharray="6 4" class="gbf-flow"') + T(320, 250, 'đường sức từ chạy ngầm trong tấm', YL, 11, 'middle'), cap:'Bình thường đường sức chạy ngầm bên trong, không ra ngoài.'},
 {svg: L(320, 160, 320, 176, RD, 3) + PATH('M312 175 Q320 150 328 175', 'none', YL, 1.5) + PATH('M308 185 Q320 145 332 185', 'none', YL, 1.5) + T(345, 150, 'nứt VUÔNG GÓC đường sức → từ trường RÒ ra ngoài', RD, 11), cap:'Gặp vết nứt <b>vuông góc</b> đường sức (không khí dẫn từ kém) → đường sức <b>rò ra ngoài</b> bề mặt tạo hai cực nhỏ ngay mép vết nứt.'},
 {svg: C(314, 158, 2, '#ddd') + C(320, 156, 2, '#ddd') + C(326, 158, 2, '#ddd') + C(317, 154, 1.5, '#ddd') + C(323, 154, 1.5, '#ddd') + T(60, 120, 'bột từ (khô/ướt, huỳnh quang) bị hút → vạch chỉ thị', '#ddd', 11) + T(60, 136, 'Nứt SONG SONG đường sức → không rò → phải từ hóa 2 hướng vuông góc', RD, 11) + T(60, 60, 'Bắt bề mặt + sát dưới bề mặt (vài mm) · nhanh, rẻ · cần khử từ sau · kiểm cường độ trường bằng chỉ thị (Burmah Castrol)', MU, 10.5), cap:'<b>Bột từ</b> rắc lên bị hút vào chỗ rò → <b>vạch chỉ thị</b> ngay tại vết nứt. Nứt <b>song song</b> đường sức không rò → vì vậy luôn từ hóa <b>hai hướng vuông góc</b>. Chỉ bắt bề mặt & sát dưới bề mặt; nhanh hơn PT, nhưng chỉ cho thép từ tính.'}
]);

/* ===== 27. PT ===== */
G['ndt-pt'] = F('PT — 4 bước thẩm thấu', [
 {svg: R(60, 150, 120, 40, PL) + L(120, 150, 122, 168, '#0a0e17', 2) + T(120, 215, '① làm sạch', TX, 12, 'middle') + T(120, 231, 'dầu, sơn, cặn làm bịt vết', MU, 10, 'middle'), cap:'<b>① Làm sạch</b>: vết nứt phải <b>hở ra bề mặt</b> và không bị bịt bởi dầu, sơn, vảy mài (mài bết làm che vết nứt!). PT dùng cho <b>mọi vật liệu không xốp</b>: inox, nhôm, đồng, nhựa.'},
 {svg: R(200, 150, 120, 40, PL) + R(200, 144, 120, 6, RD) + L(260, 150, 262, 168, RD, 2.5) + T(260, 215, '② thẩm thấu (dwell)', RD, 12, 'middle') + T(260, 231, '5–30 phút, mao dẫn kéo vào vết', MU, 10, 'middle'), cap:'<b>② Phun chất thẩm thấu</b> (đỏ hoặc huỳnh quang) và chờ <b>dwell</b> 5–30 phút: mao dẫn kéo chất lỏng vào khe hở rất nhỏ.'},
 {svg: R(340, 150, 120, 40, PL) + L(400, 150, 402, 168, RD, 2.5) + T(400, 215, '③ lau sạch bề mặt', TX, 12, 'middle') + T(400, 231, 'lau, không xối — tránh rửa trôi vết', MU, 10, 'middle'), cap:'<b>③ Lau bỏ phần thừa</b> trên bề mặt bằng khăn ẩm dung môi (hoặc rửa nước với loại rửa được) — <b>không xịt dung môi trực tiếp</b> kẻo rửa trôi chất trong vết.'},
 {svg: R(480, 150, 120, 40, PL) + R(480, 144, 120, 6, '#eee') + PATH('M532 144 Q540 136 548 144 L546 150 L534 150Z', RD, 'none', 0, 'class="gbf-pulse"') + T(540, 215, '④ hiện màu (developer)', GR, 12, 'middle') + T(540, 231, 'bột trắng hút ngược → vệt đỏ loang', MU, 10, 'middle') + T(60, 80, 'Chỉ bắt khuyết tật HỞ bề mặt · nhiệt độ 10–50 °C · chậm hơn MT · không dùng cho vật liệu xốp · đọc kết quả 10–30 phút sau hiện màu', MU, 10.5), cap:'<b>④ Phun chất hiện màu</b> (bột trắng mịn) hút chất thẩm thấu từ trong vết lên → <b>vệt đỏ loang</b> rộng hơn vết thật. Đọc sau 10–30 phút. PT chỉ thấy khuyết tật <b>hở bề mặt</b>; chậm hơn MT nhưng không kén vật liệu.'}
]);

/* ===== 28. Các bài thử phá hủy ===== */
G['dt-tests'] = F('Thử phá hủy — mỗi bài một câu hỏi', [
 {svg: R(60, 130, 50, 30, PL) + PATH('M110 130 L160 138 L160 152 L110 160Z', PL) + R(160, 130, 50, 30, PL) + L(135, 130, 135, 160, WM, 6) + A(60, 145, 30, 145, RD, 2) + A(210, 145, 240, 145, RD, 2) + T(135, 190, 'KÉO ngang (transverse tensile)', TX, 11, 'middle') + T(135, 205, 'bền kéo + vị trí đứt', MU, 10, 'middle'), cap:'<b>Kéo ngang</b>: mối hàn ở giữa mẫu, kéo đứt → <b>bền kéo</b> (phải ≥ min nền) và <b>vị trí đứt</b>. Muốn giới hạn chảy/giãn dài kim loại mối hàn → mẫu <b>all-weld dọc</b>.'},
 {svg: PATH('M300 170 Q360 90 420 170', 'none', PL, 10) + C(360, 150, 22, 'none', 'stroke="' + BL + '" stroke-width="2" stroke-dasharray="4 3"') + T(360, 200, 'UỐN 180° (bend)', TX, 11, 'middle') + T(360, 215, 'gối 4t · mặt/chân/cạnh', MU, 10, 'middle') + T(360, 115, 'kiểm độ lành & dẻo', MU, 10, 'middle'), cap:'<b>Uốn</b> 180° quanh gối ~4t: lộ <b>LOF, LOP, rỗ</b> (nứt mở > 3 mm = hỏng). Uốn <b>mặt/chân</b> cho tấm mỏng; <b>cạnh</b> (side) cho t > 12 mm vì soi được cả tiết diện.'},
 {svg: R(470, 140, 55, 10, PL) + PATH('M495 140 L500 146 L505 140Z', '#0a0e17') + PATH('M497 60 L497 120', 'none', MU, 2) + C(497, 60, 4, MU) + PATH('M497 60 L540 100', 'none', YL, 2, 'class="gbf-swing"') + T(497, 190, 'CHARPY (va đập)', TX, 11, 'middle') + T(497, 205, '10×10×55, rãnh V 2 mm, J @ °C', MU, 10, 'middle'), cap:'<b>Charpy V</b>: búa lắc đập gãy mẫu có rãnh V → năng lượng hấp thụ (<b>J</b>) ở nhiệt độ thử. Đo <b>độ dai</b> (toughness) — khả năng chịu va đập/khía ở nhiệt độ thấp. 27 J ở −20 °C là yêu cầu điển hình.'},
 {svg: R(560, 130, 70, 30, PL) + PATH('M590 130 L600 142 L610 130Z', '#0a0e17') + T(595, 190, 'ĐỘ CỨNG Vickers HV10', TX, 11, 'middle') + T(595, 205, 'đo nền–HAZ–WM, HAZ cao nhất', MU, 10, 'middle') + T(60, 250, 'MACRO: cắt, mài, tẩm thực (nital) → ngấu, số lớp, HAZ, khuyết tật. Nick-break/fillet fracture: bẻ gãy nhìn mặt gãy (định tính). CTOD: độ dai phá hủy cho đánh giá khuyết tật cho phép.', TX, 10), cap:'<b>Độ cứng Vickers</b> (vết kim cương nhỏ) đo ngang qua nền–HAZ–mối hàn; <b>CGHAZ cứng nhất</b>; giới hạn (vd 380/320 HV10) để chặn nứt hydro. <b>Macro</b>: cắt – mài – tẩm thực xem ngấu, lớp, HAZ, khuyết tật. Mỗi bài thử trả lời một câu hỏi — không bài nào thừa.'}
]);

/* ===== 29. Chuỗi WPS ===== */
G['wps-chain'] = F('pWPS → PQR → WPS → thợ hàn', [
 {svg: R(40, 110, 110, 60, '#1b2a3d', 'stroke="' + BL + '"') + T(95, 135, 'pWPS', BL, 15, 'middle', 'font-weight="700"') + T(95, 155, 'quy trình SƠ BỘ', MU, 10, 'middle') + T(95, 195, 'kỹ sư hàn đề xuất', MU, 10.5, 'middle'), cap:'<b>pWPS</b> (preliminary WPS): kỹ sư hàn đề xuất các thông số dự kiến — chưa được chứng minh.'},
 {svg: A(150, 140, 190, 140, MU) + R(190, 110, 110, 60, '#2d2410', 'stroke="' + WM + '"') + T(245, 135, 'MỐI HÀN THỬ', WM, 13, 'middle', 'font-weight="700"') + T(245, 155, 'có chứng kiến', MU, 10, 'middle') + T(245, 195, 'DT + NDT đầy đủ', MU, 10.5, 'middle'), cap:'Hàn <b>mối hàn thử</b> theo pWPS, <b>có giám sát/chứng kiến</b> (examiner/thanh tra bên thứ ba), rồi đem thử <b>NDT + DT</b> (kéo, uốn, Charpy, độ cứng, macro).'},
 {svg: A(300, 140, 340, 140, MU) + R(340, 110, 110, 60, '#10301b', 'stroke="' + GR + '"') + T(395, 135, 'PQR / WPQR', GR, 14, 'middle', 'font-weight="700"') + T(395, 155, 'BẢN GHI kết quả', MU, 10, 'middle') + T(395, 195, 'không sửa · là bằng chứng', MU, 10.5, 'middle'), cap:'Kết quả đạt → lập <b>PQR/WPQR</b> (Procedure Qualification Record): <b>bản ghi</b> thực tế đã hàn & đã thử. Là <b>bằng chứng</b>, không sửa, không phát cho thợ.'},
 {svg: A(450, 140, 490, 140, MU) + R(490, 110, 110, 60, '#2a1a3d', 'stroke="' + PU + '"') + T(545, 135, 'WPS', PU, 15, 'middle', 'font-weight="700"') + T(545, 155, 'HƯỚNG DẪN cho thợ', MU, 10, 'middle') + T(545, 195, 'trong PHẠM VI PQR', MU, 10.5, 'middle') + T(320, 60, '1 PQR có thể "chống lưng" nhiều WPS · đổi biến số THIẾT YẾU → qualify lại', YL, 11, 'middle'), cap:'Từ PQR viết <b>WPS</b> phát cho xưởng: dải thông số cho phép phải nằm trong <b>phạm vi</b> PQR đã chứng minh (chiều dày, vật liệu, que, tư thế, tiền nhiệt, heat input…). Đổi <b>biến số thiết yếu</b> → phải làm lại từ đầu.'},
 {svg: R(190, 215, 260, 36, '#1b2334', 'stroke="' + MU + '"') + T(320, 238, 'WPQ thợ hàn (ISO 9606-1 / ASME IX) — tay nghề, không cơ tính', TX, 11, 'middle'), cap:'Riêng <b>chứng chỉ thợ hàn</b> (WPQ): thợ hàn theo WPS đã duyệt → VT + uốn/gãy/RT → chứng minh <b>tay nghề</b> (độ lành), không cần Charpy. Hiệu lực ISO 9606-1: 2 năm, xác nhận 6 tháng.'}
]);

/* ===== 30. Mặt gãy ===== */
G['fracture-faces'] = F('Đọc mặt gãy — ba dấu vân tay', [
 {svg: R(60, 90, 160, 110, PL2, 'stroke="' + MU + '"') + PATH('M80 110 Q140 118 200 110 M75 130 Q140 140 205 130 M72 150 Q140 162 208 150 M72 170 Q140 182 208 170', 'none', '#aab', 1.2) + C(140, 100, 4, RD) + R(80, 182, 120, 14, '#555') + T(140, 225, 'MỎI (fatigue)', TX, 12, 'middle', 'font-weight="700"') + T(140, 240, 'vân vỏ sò + vùng gãy cuối thô', MU, 10, 'middle'), cap:'<b>Mỏi</b>: vết nứt lan dần qua hàng nghìn chu kỳ → <b>vân vỏ sò (beach marks)</b> mịn tỏa từ <b>điểm khởi đầu</b> (toe, undercut, lỗ, khía); vùng gãy cuối cùng thô, nhỏ. Tải thấp hơn giới hạn chảy vẫn gãy.'},
 {svg: R(240, 90, 160, 110, PL2, 'stroke="' + MU + '"') + PATH('M260 145 L300 125 L340 145 L380 125 M260 165 L300 145 L340 165 L380 145 M260 125 L300 105 L340 125 L380 105', 'none', '#ddd', 1.5) + A(395, 145, 375, 145, RD, 2) + T(320, 225, 'GIÒN (brittle)', TX, 12, 'middle', 'font-weight="700"') + T(320, 240, 'chevron chỉ VỀ điểm khởi phát', MU, 10, 'middle'), cap:'<b>Giòn</b>: gãy đột ngột, mặt phẳng lấp lánh (hạt), gần như <b>không biến dạng</b>; <b>vân chữ V (chevron)</b> chỉ ngược về điểm khởi phát. Xảy ra ở nhiệt độ thấp, thép dày/hạt thô/độ dai thấp, có khía + ứng suất kéo (ứng suất dư không PWHT!).'},
 {svg: PATH('M440 90 L560 90 L545 140 L560 200 L440 200 L455 140Z', PL2, MU, 1) + PATH('M455 140 L470 128 L530 128 L545 140 L530 152 L470 152Z', '#777') + T(500, 225, 'DẺO (ductile)', TX, 12, 'middle', 'font-weight="700"') + T(500, 240, 'thắt lại, mép xé 45°, mặt xơ xám', MU, 10, 'middle'), cap:'<b>Dẻo</b>: vật liệu <b>thắt lại</b> rồi mới đứt, mép có <b>shear lip 45°</b>, mặt xơ xám (cup-and-cone). Quá tải vượt bền kéo. Là kiểu gãy "lành" nhất vì báo trước.'},
 {svg: T(60, 60, 'Rão (creep): nhiệt cao + lâu → lỗ rỗng biên hạt · SCC: ứng suất kéo + môi trường (Cl⁻ với inox) → nứt phân nhánh · Hydro: nứt nguội trễ', YL, 10.5), cap:'Khác: <b>rão</b> (nhiệt độ cao, thời gian dài), <b>ăn mòn ứng suất</b> (nứt phân nhánh, clorua với inox austenit), <b>hydro</b>. Nguyên tắc: <b>đọc mặt gãy → tìm nguyên nhân → mới sửa</b>, nếu không vết nứt quay lại.'}
]);

/* ===== 31. Cắt oxy ===== */
G['oxy-cut'] = F('Cắt oxy — đốt sắt chứ không nấu chảy', [
 {svg: R(60, 170, 560, 40, PL) + PATH('M300 60 L340 60 L335 130 L305 130Z', '#6b7a8c') + PATH('M308 130 L318 130 L313 168Z', YL, 'none', 0, 'class="gbf-flicker"') + PATH('M322 130 L332 130 L327 168Z', YL, 'none', 0, 'class="gbf-flicker"') + T(320, 45, 'mỏ cắt: ngọn lửa nung + tia oxy', MU, 11, 'middle'), cap:'<b>Ngọn lửa nung</b> (oxy-axetylen, trung tính) nung thép tới <b>~870–900 °C</b> — nhiệt độ bắt cháy, vẫn <b>dưới</b> điểm chảy (~1500 °C). Thép đỏ, chưa chảy.'},
 {svg: PATH('M317 130 L323 130 L320 210Z', BL, 'none', 0, 'class="gbf-pulse"') + T(360, 150, 'tia OXY tinh khiết', BL, 11) + T(360, 164, 'Fe + O₂ → FeO + NHIỆT (tỏa nhiệt)', WM, 11), cap:'Bóp cò → <b>tia oxy tinh khiết</b> thổi vào chỗ đỏ: sắt <b>cháy</b> thành oxit sắt (phản ứng <b>tỏa nhiệt</b> tự duy trì). Oxit sắt chảy ở ~1370 °C — thấp hơn thép — nên lỏng và bị thổi bay.'},
 {svg: R(316, 170, 8, 40, '#0a0e17') + PATH('M324 175 L328 200 M326 172 L330 198', 'none', MU, 1) + T(360, 190, 'rãnh cắt (kerf) + vết rãnh (drag lines)', MU, 11) + T(60, 240, 'Mép cắt: oxit, lớp cứng mỏng (nguội nhanh), khía → MÀI sạch trước hàn; thép CEV cao: MT mép', RD, 10.5), cap:'Kim loại bay đi tạo <b>rãnh cắt</b> với <b>vết kéo (drag lines)</b>. Mép còn oxit, lớp <b>tôi cứng mỏng</b> và khía → <b>mài sáng</b> trước khi hàn; thép dễ tôi: MT mép.'},
 {svg: T(60, 70, 'Điều kiện cắt được: ① T bắt cháy < T chảy ② oxit chảy ở T thấp hơn kim loại', GR, 11) + T(60, 88, 'Thép C-Mn ✓ · Inox ✗ (Cr₂O₃ ~2000 °C) · Nhôm ✗ (Al₂O₃ ~2050 °C) · Gang ✗ · Đồng ✗ (tản nhiệt)', RD, 11) + T(60, 106, '→ dùng PLASMA (mọi kim loại dẫn điện) hoặc cắt bột/laser', BL, 11), cap:'Vì sao <b>inox, nhôm không cắt oxy được</b>: lớp oxit của chúng chảy ở ~2000 °C — <b>cao hơn</b> kim loại → oxit "đóng vảy", không bay. Dùng <b>plasma</b> (hồ quang khí ion hóa, cắt mọi kim loại dẫn điện) — mép plasma có thể dính nitrua → cũng mài.'}
]);

/* ===== 32. Arc-air gouging ===== */
G['arc-air'] = F('Dũi hồ quang-khí nén (arc-air)', [
 {svg: R(60, 170, 560, 40, PL) + PATH('M240 60 L265 60 L300 160 L285 165Z', '#222', '#c87533', 2) + T(230, 50, 'điện cực THAN bọc đồng, DC+', TX, 11) + PATH('M290 160 L300 160 L305 175Z', YL, 'none', 0, 'class="gbf-flicker"'), cap:'Điện cực <b>than (graphite) bọc đồng</b>, thường <b>DC+</b>, dòng lớn → hồ quang nung chảy kim loại cục bộ.'},
 {svg: PATH('M250 100 L300 150', 'none', BL, 4, 'class="gbf-pulse"') + A(300, 150, 340, 175, BL, 2) + T(260, 90, 'khí nén 5–7 bar thổi dọc điện cực', BL, 11) + PATH('M300 170 Q330 165 360 172 L360 178 Q330 185 300 178Z', WM, 'none') + T(380, 185, 'kim loại lỏng bị thổi bay', WM, 11), cap:'<b>Khí nén</b> thổi theo điện cực đẩy kim loại lỏng ra khỏi rãnh → tạo <b>rãnh dũi</b> nhanh, dùng để mở chân (back-gouge) double-V hoặc đào bỏ khuyết tật.'},
 {svg: PATH('M300 170 Q320 190 345 170', 'none', '#111', 4) + T(60, 240, 'Rãnh còn: CACBON từ điện cực + oxit + lớp cứng → MÀI bỏ 1–2 mm trước khi hàn; ồn, khói, bắn tóe → PPE; MT/PT xác nhận hết khuyết tật', RD, 10.5), cap:'Nhược: để lại <b>cacbon</b> trên thành rãnh (từ điện cực) + lớp cứng → <b>phải mài bỏ 1–2 mm</b> trước khi hàn, nếu không vùng cứng/nứt. Sau khi đào bỏ khuyết tật → <b>MT/PT xác nhận</b> đã hết rồi mới hàn lại.'}
]);

/* ===== 33. Argon trong không gian kín ===== */
G['argon-confined'] = F('Ngạt argon trong bồn kín — tai nạn không báo trước', [
 {svg: PATH('M100 60 L540 60 L540 230 L100 230Z', 'none', MU, 3) + R(300, 40, 40, 20, PL) + T(320, 35, 'cửa người chui', MU, 10, 'middle') + T(320, 110, 'bồn / ống lớn đang hàn TIG có khí bảo vệ chân', TX, 12, 'middle'), cap:'Hàn TIG inox trong bồn/ống lớn cần <b>khí bảo vệ chân</b> (purge) bằng argon chảy liên tục.'},
 {svg: R(104, 150, 432, 76, BL, 'opacity=".25" class="gbf-fill"') + T(320, 200, 'ARGON nặng hơn không khí (1,38×) → dồn xuống ĐÁY', BL, 12, 'middle', 'font-weight="700"'), cap:'Argon <b>nặng hơn không khí</b> → tích dần ở <b>đáy</b>, đẩy oxy lên. Không màu, không mùi, <b>không độc</b> — chỉ <b>chiếm chỗ oxy</b>.'},
 {svg: C(200, 200, 10, '#e0b090') + R(195, 210, 10, 18, '#445') + T(230, 205, 'thợ cúi xuống làm việc: O₂ < 16% → choáng, ngất sau vài hơi', RD, 11), cap:'Phản xạ thở của người do CO₂ điều khiển, <b>không</b> do thiếu O₂ → không thấy ngạt, chỉ choáng rồi ngất. Người vào cứu không có khí thở cũng ngã theo — tai nạn kép.'},
 {svg: T(60, 250, 'Phòng: giấy phép không gian kín · đo O₂ ≥19,5% trước & liên tục · thông gió cưỡng bức · người canh + dây cứu · bình khí để NGOÀI · tắt khí khi dừng · thanh tra DỪNG việc nếu thiếu', GR, 10.5) + T(560, 90, 'Heli: NHẸ hơn', YL, 11, 'end') + T(560, 104, '→ tích trên đỉnh', YL, 11, 'end'), cap:'Biện pháp: <b>giấy phép</b> làm việc kín → <b>đo khí</b> (O₂ ≥ 19,5%) trước và liên tục → <b>thông gió cưỡng bức</b> → <b>người canh</b> ngoài với dây cứu → bình khí <b>để ngoài</b>. Ngược lại, <b>heli nhẹ hơn</b> không khí → tích trên đỉnh.'}
]);

/* ===== 34. Thanh tra trước–trong–sau ===== */
G['inspector-timeline'] = F('Thanh tra hàn — trước, trong, sau', [
 {svg: L(60, 150, 600, 150, MU, 3) + C(140, 150, 10, BL) + C(330, 150, 10, WM) + C(520, 150, 10, GR) + T(140, 125, 'TRƯỚC', BL, 14, 'middle', 'font-weight="700"') + T(330, 125, 'TRONG', WM, 14, 'middle', 'font-weight="700"') + T(520, 125, 'SAU', GR, 14, 'middle', 'font-weight="700"'), cap:'Công việc thanh tra chia ba thì. Đề luôn hỏi "việc X thuộc thì nào?" — nhớ logic: <b>chưa có hồ quang / đang có hồ quang / đã nguội</b>.'},
 {svg: T(140, 175, 'WPS duyệt · chứng chỉ thợ', BL, 10.5, 'middle') + T(140, 189, 'vật liệu & que (cert, bảo quản)', BL, 10.5, 'middle') + T(140, 203, 'vát mép, khe hở, lệch mép, sạch', BL, 10.5, 'middle') + T(140, 217, 'tiền nhiệt · thiết bị hiệu chuẩn', BL, 10.5, 'middle') + T(140, 231, 'an toàn · bản vẽ/ký hiệu', BL, 10.5, 'middle'), cap:'<b>TRƯỚC</b>: mọi thứ có thể kiểm khi chưa hàn — hồ sơ (WPS, chứng chỉ, cert vật liệu), <b>lắp ghép</b> (fit-up: khe hở, mặt chân, lệch mép, sạch), que đúng & đã sấy, <b>tiền nhiệt</b>, thiết bị có tem, an toàn.'},
 {svg: T(330, 175, 'dòng, áp, tốc độ → heat input', WM, 10.5, 'middle') + T(330, 189, 'interpass · cực tính', WM, 10.5, 'middle') + T(330, 203, 'trình tự, kỹ thuật, ROL', WM, 10.5, 'middle') + T(330, 217, 'làm sạch giữa lớp · que đúng', WM, 10.5, 'middle') + T(330, 231, 'thợ đúng chứng chỉ đang hàn', WM, 10.5, 'middle'), cap:'<b>TRONG</b>: các thông số <b>đang thay đổi theo thời gian thực</b> — dòng/áp/tốc độ (heat input), interpass, cực tính, trình tự lớp, làm sạch xỉ giữa lớp, đúng thợ đúng que. PWHT <b>không</b> ở đây.'},
 {svg: T(520, 175, 'VT ngoại quan & kích thước', GR, 10.5, 'middle') + T(520, 189, 'NDT theo spec (chờ 48 h nếu cần)', GR, 10.5, 'middle') + T(520, 203, 'PWHT & biểu đồ', GR, 10.5, 'middle') + T(520, 217, 'hồ sơ, đánh dấu, báo cáo', GR, 10.5, 'middle') + T(520, 231, 'sửa chữa (nếu có) & NDT lại', GR, 10.5, 'middle'), cap:'<b>SAU</b>: VT + đo kích thước (dưỡng), NDT theo spec (đợi 48 h với thép dễ nứt H), <b>PWHT</b>, hồ sơ & báo cáo, theo dõi sửa chữa. Việc "đo kích thước mối hàn" là SAU — bẫy kinh điển.'}
]);

/* ===== 35. Đường cong Charpy ===== */
G['charpy-curve'] = F('Đường cong chuyển tiếp dẻo–giòn', [
 {svg: L(80, 220, 600, 220, MU) + L(80, 220, 80, 50, MU) + T(600, 240, 'nhiệt độ →', MU, 11, 'end') + T(70, 50, 'J', MU, 11, 'end') + PATH('M90 205 Q250 200 320 135 Q390 70 580 65', 'none', BL, 3), cap:'Thử Charpy ở nhiều nhiệt độ rồi nối lại: thép C-Mn (mạng BCC) có <b>đường cong chữ S</b> — nóng thì dai, lạnh thì giòn.'},
 {svg: R(90, 60, 180, 150, RD, 'opacity=".08"') + T(180, 80, 'vùng GIÒN (thềm dưới)', RD, 11, 'middle') + R(400, 60, 190, 150, GR, 'opacity=".08"') + T(495, 80, 'vùng DẺO (thềm trên)', GR, 11, 'middle') + T(335, 240, 'vùng chuyển tiếp', YL, 11, 'middle'), cap:'<b>Thềm dưới</b>: năng lượng thấp, gãy giòn (mặt hạt, chevron). <b>Thềm trên</b>: năng lượng cao, gãy dẻo (xơ). Ở giữa là vùng <b>chuyển tiếp</b> dốc — vài độ C làm đổi hẳn tính chất.'},
 {svg: L(80, 180, 600, 180, YL, 1.5, 'stroke-dasharray="6 4"') + T(90, 174, '27 J', YL, 11) + L(258, 180, 258, 220, YL, 1.5, 'stroke-dasharray="3 3"') + T(258, 236, 'T₂₇', YL, 11, 'middle') + T(400, 170, 'spec: "27 J ở −20 °C" = tại −20 °C phải ≥ 27 J', TX, 10.5), cap:'Yêu cầu "<b>27 J ở −20 °C</b>" nghĩa là tại nhiệt độ thiết kế thấp nhất, 3 mẫu phải đạt trung bình ≥ 27 J. Bỏ nhiệt độ thì con số vô nghĩa. Thiết kế lạnh hơn → cần thép/que có đường cong dịch sang trái (Ni, hạt mịn).'},
 {svg: PATH('M90 210 Q250 205 320 170 Q390 120 580 110', 'none', RD, 2, 'stroke-dasharray="5 3"') + T(470, 130, 'hạt thô / HI cao / HAZ thô: cong dịch PHẢI, giòn hơn', RD, 10.5) + T(60, 252, 'Inox austenit (FCC) & nhôm: KHÔNG có chuyển tiếp — dai cả ở rất lạnh → dùng cho LNG, cryogenic', GR, 10.5), cap:'Hạt thô, heat input cao, thép dày làm đường cong <b>dịch sang phải</b> (giòn ở nhiệt độ cao hơn) → đó là lý do giới hạn heat input khi có yêu cầu va đập. <b>Inox austenit, nhôm (FCC)</b> không có chuyển tiếp → dùng cho nhiệt độ rất thấp.'}
]);

/* ===== 36. CEV ===== */
G['cev'] = F('Carbon tương đương — ai làm thép khó hàn', [
 {svg: T(320, 90, 'CEV = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15', YL, 19, 'middle', 'font-weight="700"') + T(320, 115, '(công thức IIW, dùng cho thép C-Mn & hợp kim thấp)', MU, 11, 'middle'), cap:'<b>CEV</b> quy mọi nguyên tố về "sức mạnh tôi cứng" của carbon. C đứng một mình (hệ số 1) → ảnh hưởng mạnh nhất; Mn chia 6; Cr-Mo-V chia 5; Ni-Cu chia 15 (yếu nhất).'},
 {svg: R(100, 150, 60, 60, RD) + T(130, 185, 'C', '#fff', 16, 'middle', 'font-weight="700"') + R(180, 180, 60, 30, WM) + T(210, 200, 'Mn/6', '#1a1206', 12, 'middle') + R(260, 186, 60, 24, YL) + T(290, 203, 'Cr Mo V /5', '#1a1206', 10, 'middle') + R(340, 200, 60, 10, GR) + T(370, 225, 'Ni Cu /15', GR, 10, 'middle') + T(430, 180, 'ví dụ: C 0,18 · Mn 1,4 · Cr 0,1', TX, 11) + T(430, 196, '= 0,18 + 0,233 + 0,02 = 0,43', TX, 11), cap:'Ví dụ thép S355: C 0,18 + Mn 1,4/6 (0,233) + Cr 0,1/5 (0,02) ≈ <b>0,43</b>. Đề cho bảng thành phần và bắt tính — nhớ chia đúng mẫu số.'},
 {svg: L(100, 245, 600, 245, MU, 2) + R(100, 238, 150, 14, GR, 'opacity=".5"') + R(250, 238, 60, 14, YL, 'opacity=".5"') + R(310, 238, 290, 14, RD, 'opacity=".5"') + T(175, 232, '<0,40 dễ hàn', GR, 10.5, 'middle') + T(280, 232, '0,40–0,45', YL, 10.5, 'middle') + T(455, 232, '>0,45 tiền nhiệt + hydro thấp bắt buộc', RD, 10.5, 'middle'), cap:'Ngưỡng tham khảo: <b><0,40</b> dễ hàn, thường không cần tiền nhiệt; <b>0,40–0,45</b> cân nhắc tiền nhiệt (~100 °C) & kiểm soát hydro; <b>>0,45</b> tiền nhiệt cao hơn, que basic, có thể PWHT. Kèm chiều dày tổ hợp & mức hydro để tra bảng (EN 1011-2).'}
]);

/* ===== 37. Dưỡng hàn ===== */
G['gauges'] = F('Dưỡng hàn đo gì', [
 {svg: R(60, 160, 240, 20, PL) + BEAD(180, 160, 70, 14) + L(140, 160, 140, 130, BL, 2) + L(140, 130, 220, 130, BL, 2) + L(180, 130, 180, 136, BL, 2) + T(180, 120, 'dưỡng đa năng (Cambridge/TWI)', BL, 11, 'middle') + T(180, 205, 'chiều cao đắp thừa · sâu cháy chân (kim tựa)', MU, 10.5, 'middle'), cap:'<b>Dưỡng đa năng</b> (Cambridge, TWI multi-purpose): kim trượt đo <b>chiều cao kim loại đắp thừa</b>, <b>độ sâu cháy chân</b>, góc vát, lệch mép, khe hở.'},
 {svg: R(340, 100, 40, 90) + R(380, 170, 160, 20) + PATH('M380 130 L380 170 L420 170Z', WM) + PATH('M378 128 L378 172 L422 172 L378 128', 'none', GR, 2) + T(470, 120, 'dưỡng góc: cạnh z, cổ a', GR, 11) + T(470, 136, '(cổ dùng dưỡng cổ / thước lược)', MU, 10), cap:'<b>Dưỡng góc</b> (fillet gauge) kiểm <b>cạnh</b> và <b>cổ</b> mối hàn góc theo bộ kích thước; cổ thực chỉ biết chính xác khi cắt macro.'},
 {svg: R(60, 60, 100, 14) + R(170, 54, 100, 14) + L(160, 60, 170, 54, YL, 2) + T(165, 40, 'hi-lo gauge: lệch mép', YL, 11, 'middle') + T(400, 60, 'thước lá/cặp: chiều dài, chiều dày · thước đo góc vát · bút nhiệt/nhiệt kế · đèn ≥350 lux · lúp 2–5×, gương', MU, 10) + T(400, 76, 'kẹp dòng (tong) đo A gần hồ quang · vôn kế đo sát hồ quang · tất cả có TEM hiệu chuẩn', MU, 10), cap:'<b>Hi-lo gauge</b> đo lệch mép trước hàn. Cộng thêm thước, đo góc, bút nhiệt, đèn ≥350 lux, lúp, gương soi chân ống, kẹp dòng & vôn kế. Nguyên tắc: thiết bị <b>không tem hiệu chuẩn = số đo không có giá trị</b>.'}
]);

/* ---------- CSS mô phỏng ---------- */
var css = document.createElement('style');
css.textContent = [
'.gbf{width:100%;height:auto;display:block;background:#0f1622;border:1px solid rgba(255,255,255,.08);border-radius:14px}',
'@keyframes gbfDraw{from{stroke-dashoffset:600}to{stroke-dashoffset:0}}',
'.gbf-draw{stroke-dasharray:600;animation:gbfDraw 1.6s ease forwards}',
'@keyframes gbfFlicker{0%,100%{opacity:1}50%{opacity:.55}}',
'.gbf-flicker{animation:gbfFlicker .35s infinite}',
'@keyframes gbfRise{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-28px);opacity:0}}',
'.gbf-rise{animation:gbfRise 2.2s infinite ease-in}',
'@keyframes gbfPulse{0%,100%{opacity:1}50%{opacity:.35}}',
'.gbf-pulse{animation:gbfPulse 1.1s infinite}',
'@keyframes gbfH{0%{transform:translate(0,0)}50%{transform:translate(6px,-5px)}100%{transform:translate(0,0)}}',
'.gbf-h{animation:gbfH 1.8s infinite ease-in-out}',
'@keyframes gbfBeam{from{stroke-dashoffset:40}to{stroke-dashoffset:0}}',
'.gbf-beam{stroke-dasharray:6 4;animation:gbfBeam 1.2s linear infinite}',
'@keyframes gbfFlow{from{stroke-dashoffset:20}to{stroke-dashoffset:0}}',
'.gbf-flow{animation:gbfFlow 1s linear infinite}',
'@keyframes gbfSwing{0%,100%{transform:rotate(-30deg)}50%{transform:rotate(30deg)}}',
'.gbf-swing{transform-origin:497px 60px;animation:gbfSwing 1.6s ease-in-out infinite}',
'@keyframes gbfFill{from{transform:scaleY(0)}to{transform:scaleY(1)}}',
'.gbf-fill{transform-origin:50% 100%;animation:gbfFill 2.5s ease-out forwards}',
'@media(prefers-reduced-motion:reduce){.gbf-draw,.gbf-flicker,.gbf-rise,.gbf-pulse,.gbf-h,.gbf-beam,.gbf-flow,.gbf-swing,.gbf-fill{animation:none}}'
].join('\n');
document.head.appendChild(css);

/* ---------- API ---------- */
function render(key, upto){
  var f = G[key]; if (!f) return '';
  var n = f.steps.length; if (upto == null || upto >= n) upto = n - 1;
  var inner = ''; for (var i = 0; i <= upto; i++) inner += f.steps[i].svg;
  return '<svg class="gbf" viewBox="0 0 680 262" role="img" aria-label="' + f.t.replace(/"/g, '') + '">' + inner + '</svg>';
}
/* gắn hình vào ý giảng theo từ khóa tiêu đề (vi+en) và chương */
var MAP = [
 {ci:[0], re:/trước.*trong.*sau|duties|nhiệm vụ|quyền hạn|before|during|after/i, fig:'inspector-timeline'},
 {ci:[1], re:/cc vs cv|cc.*cv|constant|dốc|phẳng/i, fig:'cc-cv'},
 {ci:[1], re:/cực tính|polarity/i, fig:'polarity'},
 {ci:[1], re:/gmaw|mig|mag|dip|spray|dạng sóng/i, fig:'mig-transfer'},
 {ci:[1], re:/saw|hồ quang chìm/i, fig:'saw'},
 {ci:[1], re:/vật lý hồ quang|arc physics|so sánh|chọn quá trình|cách đề thi/i, fig:'arc-mma'},
 {ci:[1, 10], re:/điều gì xảy ra|biến số|variable|nhiệt đầu vào|heat input/i, fig:'heat-input'},
 {ci:[2], re:/vỏ bọc|covering|luyện kim của vật liệu|flux|cách đề thi/i, fig:'arc-mma'},
 {ci:[3], re:/ký hiệu|symbol/i, fig:'symbol-iso-aws'},
 {ci:[4], re:/hydro|hicc|nứt nguội/i, fig:'hicc'},
 {ci:[4], re:/nứt nóng|kết tinh|solidification|4 họ nứt|crack families/i, fig:'solid-crack'},
 {ci:[4], re:/lof|lop|không ngấu|không thấu|fusion|penetration/i, fig:'lof-lop'},
 {ci:[4], re:/undercut|rỗ|porosity|ngậm xỉ|slag/i, fig:'porosity-slag'},
 {ci:[4], re:/đáy|hõm|root|phẳng vs khối|planar/i, fig:'profile-defects'},
 {ci:[4], re:/bản đồ|map|rca|nguyên nhân gốc|cách đề thi/i, fig:'lof-lop'},
 {ci:[5], re:/charpy|27 ?j|chuyển tiếp|transition/i, fig:'charpy-curve'},
 {ci:[5], re:/mẫu thử|khung|cứng|uốn|ctod|cơ tính|đối chiếu/i, fig:'dt-tests'},
 {ci:[6], re:/rt|phóng xạ|radiograph/i, fig:'ndt-rt'},
 {ci:[6], re:/ut.*mt.*pt|siêu âm|ultrason/i, fig:'ndt-ut'},
 {ci:[6], re:/ma trận|matrix|logic|lọc|chọn/i, fig:'ndt-mt'},
 {ci:[7], re:/pwps|pqr|wps|xương sống|lòng vòng|biến số|quy trình vs|thợ hàn/i, fig:'wps-chain'},
 {ci:[8], re:/mactenxit|martensit|nguội nhanh/i, fig:'cooling-micro'},
 {ci:[8], re:/lamellar/i, fig:'lamellar'},
 {ci:[8], re:/tổ chức tế vi|microstructure|haz/i, fig:'haz-regions'},
 {ci:[8], re:/weld decay|inox|stainless/i, fig:'haz-regions'},
 {ci:[9], re:/pwht/i, fig:'pwht-cycle'},
 {ci:[9], re:/preheat|tiền nhiệt|interpass/i, fig:'preheat-measure'},
 {ci:[9], re:/nhiệt luyện|năm kiểu|hai lưỡi|heat treatment/i, fig:'pwht-cycle'},
 {ci:[10], re:/biến dạng|distortion|co ngót|ứng suất dư|residual/i, fig:'distortion'},
 {ci:[11], re:/rãnh|mép|prep|kích thước|joint|mối nối/i, fig:'joint-preps'},
 {ci:[12], re:/code|standard|spec|tài liệu|phân cấp|hồ sơ/i, fig:'inspector-timeline'},
 {ci:[13], re:/hiệu chuẩn|calibr|đo lường|sai số|dưỡng/i, fig:'gauges'},
 {ci:[14], re:/argon|ngạt|kín|an toàn|safety|mối nguy/i, fig:'argon-confined'},
 {ci:[15], re:/tư thế|position/i, fig:'positions'},
 {ci:[15], re:/thuật ngữ|terminology|bản đồ|đọc được/i, fig:'weld-zones'},
 {ci:[16], re:/oxy|cắt/i, fig:'oxy-cut'},
 {ci:[16], re:/dũi|goug|mép cắt/i, fig:'arc-air'},
 {ci:[17], re:/mặt gãy|phá hủy|fracture|failure|hỏng/i, fig:'fracture-faces'},
 {ci:[17], re:/sửa|repair|quay lại/i, fig:'fracture-faces'}
];
var CHAPTER_FIGS = {0:['inspector-timeline'], 1:['arc-mma', 'cc-cv', 'polarity', 'mig-transfer', 'saw'], 2:['arc-mma'], 3:['symbol-iso-aws'], 4:['hicc', 'solid-crack', 'lof-lop', 'profile-defects', 'porosity-slag', 'lamellar'], 5:['dt-tests', 'charpy-curve'], 6:['ndt-rt', 'ndt-ut', 'ndt-mt', 'ndt-pt'], 7:['wps-chain'], 8:['haz-regions', 'cooling-micro', 'cev', 'lamellar'], 9:['pwht-cycle', 'preheat-measure'], 10:['heat-input', 'distortion'], 11:['joint-preps', 'fillet-throat'], 12:['inspector-timeline'], 13:['gauges'], 14:['argon-confined'], 15:['weld-zones', 'fillet-throat', 'positions', 'pipe-positions'], 16:['oxy-cut', 'arc-air'], 17:['fracture-faces']};
var used = {};
function figForBlock(ci, block, bi){
  var title = String((block.h_vi || '') + ' ' + (block.h_en || '')).replace(/<[^>]+>/g, '');
  for (var i = 0; i < MAP.length; i++){ var m = MAP[i]; if (m.ci.indexOf(ci) >= 0 && m.re.test(title)) return m.fig; }
  return null;
}
/* phân phối hình chưa dùng của chương cho các ý chưa có hình */
function assign(ci, deep){
  var out = [], usedHere = {};
  deep.forEach(function(b, bi){ var f = figForBlock(ci, b, bi); if (f && !usedHere[f]){ usedHere[f] = 1; out[bi] = f; } else out[bi] = null; });
  var pool = (CHAPTER_FIGS[ci] || []).filter(function(f){ return !usedHere[f]; });
  deep.forEach(function(b, bi){ if (!out[bi] && pool.length) out[bi] = pool.shift(); });
  return out;
}
window.GB_FIG = {lib:G, render:render, assign:assign, chapterFigs:CHAPTER_FIGS, steps:function(k){ return G[k] ? G[k].steps.length : 0; }, title:function(k){ return G[k] ? G[k].t : ''; }, cap:function(k, i){ return G[k] && G[k].steps[i] ? G[k].steps[i].cap : ''; }};
})();
