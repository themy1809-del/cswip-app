/* ============================================================
   GIANGBAI_DATA — Lời thầy giảng viết tay cho 18 chương
   (dùng bởi giangbai.js). Mỗi chương:
     story   : hình dung cả chương bằng chuyện đời thường (đọc ở mở đầu)
     traps   : bẫy đề thi hay gặp (bước "Bẫy đề")
     numbers : con số / bảng phải thuộc (bước "Thuộc lòng")
     mnemonic: câu thần chú ghi nhớ (bước kết thúc)
     ideas   : ý giảng bổ sung cho chương còn mỏng — được GẮN THÊM vào
               DATA.chapters[ci].deep nên tab Bài học cũng thấy.
   Nội dung bám WIS5 (TWI) & ISO/EN liên quan; con số ghi theo yêu cầu
   phổ biến nhất trong đề — luôn đối chiếu spec dự án khi làm thật.
   ============================================================ */
(function(){
'use strict';
var X = {};

/* ---------- 0. Vai trò & nhiệm vụ Thanh tra Hàn ---------- */
X[0] = {
 story: 'Hãy hình dung thanh tra hàn như <b>trọng tài bóng đá</b>. Trọng tài không đá bóng (không hàn, không sửa mối hàn), không tự đặt ra luật (không tự quyết chấp nhận/nhân nhượng), nhưng <b>biết luật thuộc lòng</b> (tiêu chuẩn, WPS), <b>quan sát mọi lúc</b> (trước – trong – sau khi hàn) và <b>ghi biên bản</b> không thiên vị. Mắt trọng tài phải tốt (thị lực kiểm tra định kỳ), và quyết định dựa trên <b>bằng chứng</b> chứ không phải cảm tính.',
 traps: [
  'Đề hỏi "ai quyết định nhân nhượng (concession) cho khuyết tật vượt chuẩn?" — là <b>khách hàng/thiết kế</b>, KHÔNG phải thanh tra. Thanh tra chỉ báo cáo và đề xuất.',
  'Đề liệt kê việc "trong khi hàn" nhưng trộn PWHT hoặc kiểm tra kích thước mối hàn vào — hai việc đó là <b>SAU khi hàn</b>. Loại ngay đáp án có PWHT/kích thước cuối cùng.',
  '"Thanh tra có được sửa mối hàn không?" — <b>Không</b>. Sửa là việc của thợ hàn theo quy trình sửa được duyệt.',
  'Thị lực: đề hỏi tần suất kiểm tra → <b>mỗi 12 tháng</b>, thị lực gần (Jaeger J1 ở ~300 mm) + phân biệt màu.',
  'Hồ sơ vật liệu: chứng chỉ 3.1 theo <b>EN 10204</b> do nhà sản xuất độc lập với bộ phận sản xuất cấp; 3.2 có thêm bên thứ ba chứng kiến.'
 ],
 numbers: [
  'Thị lực: kiểm tra <b>12 tháng/lần</b>, gần J1 @ 300 mm, test màu.',
  'EN 10204 chứng chỉ vật liệu: <b>2.1</b> (tuyên bố phù hợp, không kết quả thử) · <b>2.2</b> (có kết quả thử không đặc thù) · <b>3.1</b> (kết quả thử của chính lô, bộ phận độc lập trong nhà máy) · <b>3.2</b> (3.1 + bên thứ ba/khách chứng kiến).',
  'Trước hàn kiểm: WPS duyệt chưa · chứng chỉ thợ · vật liệu & que đúng cấp · vát mép, khe hở, lệch mép · làm sạch · tiền nhiệt · thiết bị đã hiệu chuẩn.',
  'Trong hàn kiểm: dòng, áp, tốc độ (→ heat input) · interpass · trình tự · làm sạch giữa lớp · que đúng & bảo quản.',
  'Sau hàn kiểm: ngoại quan & kích thước · NDT theo spec · PWHT · hồ sơ · đánh dấu mối hàn/thợ.'
 ],
 mnemonic: '"Trọng tài không đá bóng": thanh tra KIỂM – GHI – BÁO, không HÀN – không SỬA – không QUYẾT nhân nhượng.',
 ideas: [
  {h_vi:'🎓 Ba đức tính và "đừng tin, hãy kiểm"', h_en:'Three qualities and "verify, don\'t trust"',
   body:[
    {vi:'Đề thi luôn xoay quanh ba phẩm chất: <b>trung thực</b> (honesty), <b>công bằng/không thiên vị</b> (impartiality), <b>kiến thức</b> (knowledge). Một thanh tra giỏi kỹ thuật nhưng "nể" tổ trưởng mà bỏ qua lỗi thì vô dụng với khách hàng — vì khách hàng trả tiền để có <b>đôi mắt độc lập</b>.', en:'The exam circles three qualities: honesty, impartiality and knowledge — the client pays for an independent pair of eyes.'},
    {vi:'Nguyên tắc làm việc: <b>mọi thứ phải chứng minh được bằng hồ sơ</b>. Thợ nói "tôi có chứng chỉ 6G" → xin xem bản gốc và kiểm tra còn hạn, đúng quá trình, đúng vật liệu, đúng phạm vi. Que nói "basic" → xem nhãn hộp, nhiệt độ tủ sấy, phiếu lô. Không có bằng chứng = coi như chưa đạt.', en:'Everything must be provable by records: certificates in date and in range, consumable batch and baking records. No evidence = not accepted.'},
    {vi:'Khi phát hiện không phù hợp: <b>ghi nhận → báo cáo (NCR) → đề xuất</b>; quyết định xử lý (sửa, loại, nhân nhượng) thuộc về bên có thẩm quyền theo hợp đồng (khách hàng/kỹ sư thiết kế). Thanh tra có quyền <b>dừng công việc không an toàn</b> hoặc sai quy trình, nhưng không tự ý "cho qua".', en:'On a non-conformance: record → report (NCR) → recommend; disposition belongs to the contractual authority. The inspector may stop unsafe or non-compliant work but never waives requirements alone.'}
   ]}
 ]
};

/* ---------- 1. Quá trình hàn ---------- */
X[1] = {
 story: 'Hãy coi 4 quá trình hàn như <b>4 cách nấu ăn</b>. MMA (que hàn) là <b>nấu bếp củi</b>: linh hoạt, mang đi đâu cũng được, mọi tư thế, nhưng chậm và phải thay que liên tục (dừng – nối → dễ lỗi ở chỗ nối). TIG là <b>đầu bếp tỉa hoa</b>: đẹp, sạch, kiểm soát tuyệt đối nhưng chậm và đắt — dùng cho lớp lót, ống inox, hàng mỏng. MIG/MAG là <b>bếp gas có dây cấp tự động</b>: nhanh, bán tự động, nhưng gió thổi là hỏng (khí bảo vệ bay) và chế độ "dip" thì dễ thiếu ngấu. SAW là <b>nồi áp suất công nghiệp</b>: hồ quang chìm dưới thuốc, dòng cực lớn, đắp cực nhanh, nhưng chỉ nằm ngang/bằng và không nhìn thấy vũng hàn.',
 traps: [
  'CC hay CV? Que hàn/TIG dùng nguồn <b>dòng không đổi (CC – drooping)</b>: tay run làm đổi chiều dài hồ quang → điện áp đổi, dòng gần như không đổi. MIG/MAG/SAW dây nhỏ dùng <b>điện áp không đổi (CV – flat)</b>: hồ quang tự điều chỉnh (self-adjusting) qua tốc độ chảy dây.',
  'Cực tính TIG: thép dùng <b>DC- (điện cực âm)</b> vì ~2/3 nhiệt vào vật hàn, điện cực mát. Nhôm dùng <b>AC</b> để có nửa chu kỳ làm sạch oxit. DC+ ở TIG làm cháy điện cực — đáp án "DC+ cho TIG thép" là sai.',
  'MMA que basic thường chạy <b>DC+</b> (ngấu sâu, ít rỗ). Đề hỏi "đổi DC+ sang DC- ở MMA thì sao?" → ngấu GIẢM, tốc độ chảy que tăng nhẹ.',
  'MIG/MAG: chế độ <b>dip (ngắn mạch)</b> dùng dòng/áp thấp → hàn mỏng, mọi tư thế, nhưng <b>rủi ro thiếu ngấu (LOF)</b> cao nhất. Chế độ <b>spray</b> dòng/áp cao, chỉ bằng/ngang, ngấu tốt, không dùng cho lớp lót hở gốc.',
  'Khí 100% CO₂: ngấu sâu hơn nhưng <b>bắn tóe nhiều</b>, chỉ dip/globular; không spray được. Hỗn hợp Ar + 5–20% CO₂ mới spray được.',
  'SAW: không thấy vũng hàn → không hàn được tư thế đứng/trần; thuốc <b>kết tụ (agglomerated)</b> hút ẩm → phải sấy như que basic; thuốc <b>nóng chảy (fused)</b> không hút ẩm nhưng không thêm được hợp kim.',
  'Đề hỏi "tầm với điện cực (stick-out/CTWD) tăng ở MAG CV thì sao?" → điện trở dây tăng → <b>dòng giảm</b> → ngấu giảm, đắp tăng nhẹ.'
 ],
 numbers: [
  'Mã ISO 4063: <b>111</b> MMA · <b>121</b> SAW dây · <b>131</b> MIG · <b>135</b> MAG · <b>136</b> FCAW khí · <b>141</b> TIG · <b>311</b> oxy-axetylen.',
  'MMA: OCV ~<b>50–90 V</b> (an toàn <80 V DC khi hở), điện áp hồ quang ~20–35 V, dòng ~ 30–40 A/mm đường kính que (que Ø3.2 ≈ 90–130 A).',
  'TIG: điện cực W 2% Thori (đầu đỏ) cho DC; Zirconi (trắng) cho AC nhôm; Lanthan/Ceri dùng cả hai. Khí: argon tinh khiết 99.99%; thường cần <b>khí bảo vệ chân (purge)</b> cho inox.',
  'MIG/MAG: dip < ~200 A & < ~22 V; spray > ~24–26 V với Ar-rich; dây Ø0.8–1.6 mm; tốc độ cấp dây quyết định dòng (CV).',
  'SAW: dòng 300–1000+ A, hệ số nhiệt k = 1,0; MMA/MIG/MAG/FCAW k = 0,8; TIG k = 0,6 (EN 1011-1).',
  'Năng suất đắp: SAW > FCAW > MAG > MMA > TIG.'
 ],
 mnemonic: '"Que-TIG rơi dốc, Dây phẳng tự chỉnh": MMA/TIG = CC (drooping) · MIG/MAG/SAW dây nhỏ = CV (flat, self-adjusting). TIG thép DC-, nhôm AC; MMA basic DC+.'
};

/* ---------- 2. Vật liệu hàn ---------- */
X[2] = {
 story: 'Que hàn như <b>viên thuốc bọc vỏ</b>: lõi (core wire) là thép, còn <b>vỏ thuốc</b> mới quyết định tính cách. <b>Rutile</b> như thuốc cảm thông thường — dễ dùng, mồi dễ, bề mặt đẹp, nhưng nhiều hydro nên không dùng cho thép dày/thép hợp kim. <b>Basic (kiềm)</b> như thuốc kê đơn — cơ tính và độ dai cao nhất, hydro thấp nhất, nhưng khó dùng, hồ quang ngắn, và phải <b>sấy & bảo quản nghiêm ngặt</b> (ẩm = hydro = nứt nguội). <b>Cellulosic</b> như thuốc mạnh của dân đường ống — ngấu sâu, hàn đứng từ trên xuống nhanh, nhưng hydro rất cao và <b>cấm sấy nóng</b> (sấy làm cháy mất xenlulo).',
 traps: [
  'Que basic đã sấy nhưng để ngoài quá lâu → hút ẩm lại → phải sấy lại (số lần sấy lại theo nhà sản xuất, thường 1 lần). Đề hỏi "que basic rơi xuống nước thì?" → <b>loại bỏ</b>.',
  'Que cellulosic <b>KHÔNG sấy</b> ở nhiệt độ cao — chỉ bảo quản khô, vì hơi nước trong vỏ là nguồn tạo hydro để hồ quang ngấu sâu (có chủ đích).',
  'Ký hiệu AWS E7018: <b>70</b> = 70 ksi (~490 MPa) bền kéo tối thiểu — đề hay bẫy "yield" hay "N/mm² 700". <b>1</b> = mọi tư thế; <b>8</b> = basic hydro thấp + bột sắt, DC+/AC.',
  'ISO 2560-A: E 42 4 B — <b>42</b> = giới hạn chảy min 420 MPa, <b>4</b> = 47 J ở −40 °C, <b>B</b> = basic. Đừng nhầm 42 với bền kéo.',
  'Khí trơ vs hoạt tính: Argon/Heli = <b>MIG (131)</b>; có CO₂/O₂ = <b>MAG (135)</b>. CO₂ "trơ" là sai — nó phân ly và oxy hóa.',
  'Dây hàn đặc MAG phải có <b>Si, Mn khử oxy</b> (ví dụ G3Si1/ER70S-6) vì khí hoạt tính tạo oxy trong vũng; thiếu khử oxy → rỗ khí.',
  'Thuốc SAW kết tụ (agglomerated) <b>hút ẩm</b> → sấy & giữ nóng; thuốc nóng chảy (fused) không hút ẩm.'
 ],
 numbers: [
  'Sấy que basic: ~<b>300–350 °C / 1–2 h</b> (theo nhà SX) → giữ tủ <b>~150 °C</b> → ống đựng cầm tay (quiver) <b>70–150 °C</b> → thời gian ngoài tủ thường ≤ <b>4 h</b>.',
  'Thang hydro: <b>H5</b> (≤5 ml/100 g), <b>H10</b>, <b>H15</b> — basic sấy tốt đạt H5; rutile ~H15–H25; cellulosic >H25.',
  'AWS A5.1: E6010 cellulosic (DC+), E6013 rutile, E7016 basic (ít bột sắt, hàn gốc tốt), E7018 basic bột sắt, E7024 rutile bột sắt (chỉ bằng/ngang, năng suất cao).',
  'Dây MAG: ER70S-6 / G 42 3 C1 3Si1 — chữ cuối = thành phần khử oxy.',
  'Khí hỗn hợp phổ biến thép: Ar + 5–20% CO₂ (spray được); Ar + 2% O₂; inox: Ar + 2% O₂ hoặc Ar/He/CO₂ thấp; nhôm: Ar hoặc Ar/He.'
 ],
 mnemonic: '"Ru dễ – Ba dai – Xen sâu": Rutile dễ dùng · Basic dai, ít hydro, phải sấy · Cellulosic ngấu sâu, nhiều hydro, không sấy nóng.'
};

/* ---------- 3. Ký hiệu mối hàn & bản vẽ ---------- */
X[3] = {
 story: 'Ký hiệu hàn là <b>tin nhắn viết tắt</b> giữa người thiết kế và thợ hàn. Mũi tên là "ngón tay chỉ": chỉ vào đúng mối nối. Đường tham chiếu là "dòng tin nhắn". Vấn đề là có <b>hai ngôn ngữ</b>: ISO 2553 (châu Âu) viết bằng <b>hai dòng</b> — dòng liền cho phía mũi tên, <b>dòng đứt</b> cho phía bên kia; AWS A2.4 (Mỹ) viết <b>một dòng</b> — <b>dưới</b> dòng là phía mũi tên, <b>trên</b> dòng là phía bên kia. Đọc nhầm ngôn ngữ = hàn nhầm phía.',
 traps: [
  'ISO: ký hiệu đặt trên <b>đường liền</b> = phía mũi tên; trên <b>đường đứt</b> = phía bên kia. Đề cho hình ký hiệu nằm trên đường đứt → hàn phía đối diện mũi tên.',
  'AWS: không có đường đứt; <b>phía dưới</b> đường tham chiếu = arrow side. Người quen ISO rất hay đọc ngược.',
  'Kích thước góc ISO: <b>a</b> = chiều cao cổ (throat), <b>z</b> = cạnh (leg); a ≈ 0,7 z. Đề cho "a5" mà hỏi cạnh → ≈ 7 mm. AWS ghi cạnh (leg) trực tiếp.',
  'Mép vát một phía (bevel/J): mũi tên <b>gãy khúc</b> chỉ vào tấm được vát. Đề hỏi "tấm nào vát?" → tấm mà mũi tên chỉ.',
  'Ký hiệu phụ: vòng tròn tại chỗ gãy = <b>hàn vòng quanh</b>; cờ = <b>hàn tại hiện trường (site/field weld)</b>; đường thẳng trên ký hiệu = <b>mài phẳng (flush)</b>; cung lồi/lõm = biên dạng.',
  'Đuôi (tail) chứa thông tin bổ sung: quá trình (ví dụ 111), mức chất lượng (ISO 5817 B/C/D), WPS. Không ghi đuôi = không có yêu cầu thêm.',
  'Hàn ngắt quãng ISO: <b>n × l (e)</b> = số đoạn × chiều dài (khoảng cách); AWS ghi <b>chiều dài – bước (pitch)</b> tính tâm-đến-tâm. Bước ≠ khoảng cách.'
 ],
 numbers: [
  'ISO 2553: đường liền = arrow side · đường đứt = other side · ký hiệu đối xứng (double-V, X) → bỏ đường đứt.',
  'AWS A2.4: dưới đường = arrow side · trên đường = other side · ký hiệu giữa (both sides).',
  'Góc: a (throat) = 0,7 z (leg); z = 1,4 a. Cổ thiết kế ≠ cổ thực (cổ thực kể cả ngấu).',
  'Ký hiệu cơ bản: ‖ (square), V, ½V bevel, U, J, Y (V có root face), ∆ góc, O điểm, ─ đường/seam, M = lót vĩnh viễn, MR = lót tháo bỏ (ISO).',
  'Số quá trình trong đuôi theo ISO 4063; mức chất lượng theo ISO 5817 B/C/D; tư thế theo ISO 6947.'
 ],
 mnemonic: '"ISO đứt – AWS dưới": ISO phía bên kia nằm trên đường ĐỨT; AWS phía mũi tên nằm DƯỚI đường. a là cổ, z là cạnh, a = 0,7 z.',
 ideas: [
  {h_vi:'🎓 Quy trình đọc một ký hiệu lạ trong 30 giây', h_en:'A 30-second routine to read any unfamiliar symbol',
   body:[
    {vi:'Bước 1 — <b>Ngôn ngữ nào?</b> Có đường đứt → ISO; không đường đứt mà ký hiệu lệch trên/dưới → AWS. Bước 2 — <b>Mũi tên chỉ vào đâu, có gãy khúc không?</b> Gãy khúc = tấm được vát. Bước 3 — <b>Ký hiệu cơ bản</b>: hình gì (V, ½V, U, J, góc). Bước 4 — <b>Kích thước</b>: bên trái ký hiệu = kích thước tiết diện (a/z/s), bên phải = chiều dài/ngắt quãng. Bước 5 — <b>Ký hiệu phụ & đuôi</b>: vòng quanh, hiện trường, biên dạng, quá trình, mức chất lượng.', en:'1 which standard (dashed line = ISO) · 2 arrow and break · 3 basic symbol · 4 dimensions left (cross-section) / right (length) · 5 supplementary symbols and tail.'},
    {vi:'Đề Work Pack hay cho bản vẽ kèm WPS rồi hỏi "mối hàn này có đúng ký hiệu không?". Cách làm: đọc ký hiệu ra <b>câu tiếng Việt đầy đủ</b> ("góc cạnh 6 mm, hai phía, hàn hiện trường, quá trình 135") rồi so với WPS/tiêu chí chấp nhận. Đừng so bằng mắt hình vẽ.', en:'Translate the symbol into a full sentence, then compare it with the WPS and acceptance criteria.'}
   ]}
 ]
};

/* ---------- 4. Khuyết tật ---------- */
X[4] = {
 story: 'Khuyết tật mối hàn giống <b>bệnh của bệnh nhân</b>: bác sĩ giỏi không học thuộc tên bệnh mà học <b>cơ chế</b>: nguyên nhân → biểu hiện → cách phát hiện → cách phòng. Mỗi khuyết tật trong đề đều hỏi theo 4 ô đó. <b>Nứt</b> là "ung thư" (phẳng, sắc, lan ra, luôn bị loại); <b>rỗ khí, ngậm xỉ</b> là "sỏi" (thể tích, tròn, tùy mức chấp nhận); <b>không ngấu/không thấu</b> là "khớp không liền" (phẳng, rất nguy hiểm nhưng khó thấy bằng RT nếu lệch hướng tia). Và <b>nứt nguội do hydro</b> là căn bệnh được hỏi nhiều nhất trong toàn bộ kỳ thi.',
 traps: [
  'HICC cần <b>đủ 4 yếu tố</b>: hydro (>~15 ml/100 g) · ứng suất (>~0,5 giới hạn chảy) · tổ chức nhạy cảm (mactenxit, >~400 HV) · nhiệt độ <~300 °C. Bỏ 1 yếu tố là hết nứt → đó là logic của tiền nhiệt (giảm hydro & độ cứng), que basic (giảm hydro), PWHT/giữ nhiệt sau hàn (hydro thoát).',
  'Nứt nguội xuất hiện <b>chậm</b> (giờ đến 48–72 h sau hàn) → NDT cuối phải <b>đợi ≥48 h</b> cho thép dễ nứt. Đề hỏi "khi nào NDT thép C-Mn dày?" → sau 48 h (hoặc theo spec).',
  'Nứt nóng/kết tinh: tại <b>tâm mối hàn</b>, khi kim loại đang đông; do S, P, pha lỏng biên hạt; mối hàn <b>sâu-hẹp</b> (tỷ lệ sâu/rộng lớn, SAW/MAG spray) và pha loãng cao. Khắc phục: Mn/S cao, giảm pha loãng, hình dạng đường hàn rộng hơn.',
  'LOF (không ngấu – lack of fusion) là <b>thành bên/giữa lớp</b> không liền; LOP (không thấu – lack of penetration/incomplete root penetration) là <b>chân</b> không ngấu hết. Đề thích đánh tráo: "khuyết tật ở chân mối hàn giáp mép một phía" → LOP.',
  'Undercut (cháy chân) xảy ra nhiều nhất ở tư thế <b>PC (ngang)</b> và lớp phủ hàn nóng (dòng cao, tốc độ nhanh, góc que sai, hồ quang dài).',
  'Rỗ khí: nguồn khí = ẩm/dầu/gỉ, khí bảo vệ kém (gió, lưu lượng sai), hồ quang dài (điện áp cao), que ẩm. Rỗ <b>ống (wormhole)</b> kéo dài, rỗ <b>bề mặt lỗ</b> ở chân khi hàn lớp lót trên lót có ẩm.',
  'Lamellar tearing: trong <b>vật liệu nền</b>, song song bề mặt tấm, dạng bậc thang, do tạp chất phi kim dẹt + ứng suất theo chiều dày (mối hàn góc/chữ T lớn). Phòng: thép Z (Z35), buttering, thiết kế mối nối tránh kéo theo chiều dày.',
  'Khuyết tật <b>phẳng</b> (nứt, LOF, LOP) nguy hiểm hơn <b>khối</b> (rỗ, xỉ) vì tập trung ứng suất → mỏi. RT dễ bỏ sót khuyết tật phẳng lệch hướng tia; UT bắt tốt.'
 ],
 numbers: [
  'ISO 6520-1 nhóm: <b>100</b> nứt · <b>200</b> rỗ/lỗ · <b>300</b> ngậm (xỉ, W, Cu) · <b>400</b> không ngấu/không thấu · <b>500</b> sai hình dạng (undercut, lồi quá, lệch mép, tràn) · <b>600</b> khác (bắn tóe, vết mồi hồ quang).',
  'HICC: H > 15 ml/100 g · σ > 0,5 Re · > 400 HV (mactenxit) · T < 300 °C · xuất hiện trễ tới 48–72 h.',
  'Nứt kết tinh: tỷ lệ sâu/rộng > ~2 nguy hiểm; S + P cao, Mn/S thấp; dừng hồ quang đột ngột → nứt hõm cuối (crater crack).',
  'Lamellar tearing: STRA (độ thắt theo chiều dày) thấp < ~20%; thép Z35 có STRA ≥35%.',
  'Mức chấp nhận ISO 5817: <b>B</b> nghiêm ngặt · <b>C</b> trung bình · <b>D</b> vừa phải; nứt KHÔNG được chấp nhận ở mọi mức.',
  'Vết mồi hồ quang (arc strike) và bắn tóe là khuyết tật (600) — không "vô hại".'
 ],
 mnemonic: '"Hy-Sờ-Mác-Lạnh" = 4 yếu tố nứt nguội: Hydro – Stress – Mactenxit – nhiệt độ Lạnh (<300 °C). Bỏ một cái là hết nứt.'
};

/* ---------- 5. DT ---------- */
X[5] = {
 story: 'Thử phá hủy là <b>khám sức khỏe toàn diện</b> cho mối hàn mẫu, mỗi bài thử trả lời đúng một câu: <b>Kéo</b> — "khỏe bao nhiêu?" (bền kéo), <b>Uốn</b> — "dẻo không, có khe nứt ngầm không?" (độ lành ngấu), <b>Charpy</b> — "lạnh có giòn không?" (độ dai va đập theo nhiệt độ), <b>Độ cứng</b> — "có bị tôi cứng quá, dễ nứt hydro không?", <b>Macro</b> — "bên trong hình dáng thế nào, ngấu tới đâu?". Mẫu hàn qualify (PQR/thợ) chính là "bệnh nhân" phải đi đủ các bài khám này.',
 traps: [
  'Thử kéo <b>ngang (transverse)</b> mối hàn → chỉ cho bền kéo và vị trí đứt (đứt ở nền hay mối hàn); muốn giới hạn chảy & giãn dài của kim loại mối hàn phải lấy mẫu <b>toàn kim loại hàn dọc (all-weld)</b>.',
  'Uốn <b>mặt/chân (face/root)</b> cho tấm mỏng; tấm dày (>~12 mm) dùng uốn <b>cạnh (side bend)</b> vì kiểm được toàn tiết diện. Uốn chân kiểm chân (LOP), uốn mặt kiểm mặt.',
  'Charpy: mẫu 10×10×55 mm, rãnh V 2 mm, 3 mẫu/vị trí, ghi <b>J</b> và <b>nhiệt độ thử</b>. Đề hỏi "ý nghĩa 27 J ở −20 °C" → yêu cầu độ dai tối thiểu tại nhiệt độ thiết kế; bỏ nhiệt độ = vô nghĩa.',
  'Độ cứng mối hàn thường dùng <b>Vickers HV10/HV5</b> (vết nhỏ, đo được HAZ hẹp). Vị trí cứng nhất = <b>CGHAZ</b> sát đường chảy. Brinell vết to không đo HAZ được.',
  'Macro: mài, đánh bóng, tẩm thực (nital cho thép C-Mn) → thấy số lớp, ngấu, HAZ, khuyết tật; <b>micro</b> phóng đại lớn để xem tổ chức tế vi. Đề hỏi "macro dùng để làm gì?" → chứng minh ngấu và không có khuyết tật nội.',
  'Fillet fracture / nick-break: bẻ gãy để nhìn mặt gãy tìm LOF, rỗ, xỉ — thử <b>định tính</b>, không cho con số cơ tính.',
  'CTOD/độ dai phá hủy: dùng khi cần đánh giá <b>kích thước khuyết tật cho phép (fitness-for-purpose)</b>, không phải thử thường quy PQR.'
 ],
 numbers: [
  'Charpy: 10×10×55 mm, rãnh V sâu 2 mm, 3 mẫu/vị trí, yêu cầu phổ biến <b>27 J</b> (hoặc 40 J) ở nhiệt độ thiết kế; đường cong chuyển tiếp dẻo–giòn.',
  'Uốn: góc <b>180°</b>, đường kính gối uốn thường <b>4 t</b>; chấp nhận khi không vết nứt mở > <b>3 mm</b> (ISO 5173/15614 tham khảo).',
  'Độ cứng ISO 15614-1 (thép nhóm 1–3): tối đa <b>380 HV10</b> không PWHT, <b>320 HV10</b> có PWHT (tham khảo, theo bảng tiêu chuẩn).',
  'Kéo ngang: bền kéo ≥ min của vật liệu nền; đứt ở nền = đạt; đứt trong mối hàn vẫn có thể đạt nếu ≥ Rm min.',
  'Hardness scale: HV (Vickers kim cương tháp), HB (Brinell bi), HRC (Rockwell nón). Macro: tẩm thực nital 2–10%.'
 ],
 mnemonic: '"Kéo khỏe – Uốn dẻo – Charpy lạnh – Cứng hydro – Macro nhìn": mỗi bài thử một câu hỏi, không có bài nào thừa.'
};

/* ---------- 6. NDT ---------- */
X[6] = {
 story: 'NDT là <b>5 bác sĩ chẩn đoán</b> với 5 máy khác nhau. <b>VT</b> (mắt thường + đèn + dưỡng) là bác sĩ gia đình: rẻ, làm trước tiên, tìm được 80% vấn đề bề mặt. <b>PT</b> (thẩm thấu) là "bôi thuốc nhuộm": vào mọi vật liệu không xốp nhưng chỉ bắt vết <b>hở ra bề mặt</b>. <b>MT</b> (bột từ) là "nam châm rắc mạt sắt": chỉ cho <b>thép từ tính</b>, bắt bề mặt và sát dưới bề mặt, nhanh hơn PT. <b>RT</b> là chụp X-quang: thấy <b>bên trong</b>, có phim lưu, nhưng khuyết tật phẳng (nứt, LOF) phải <b>song song tia</b> mới thấy, cần tiếp cận hai phía và có phóng xạ. <b>UT</b> là siêu âm: bắt khuyết tật <b>phẳng</b> rất tốt, đo được chiều sâu, một phía, nhưng phụ thuộc tay nghề, bề mặt và khó với tấm mỏng/hạt thô.',
 traps: [
  '"Khuyết tật nào RT dễ bỏ sót?" → <b>nứt, LOF phẳng lệch hướng tia</b>; RT bắt tốt rỗ, xỉ (thể tích). "Khuyết tật nào UT bắt tốt nhất?" → <b>phẳng vuông góc chùm tia</b> (LOF thành bên, nứt).',
  'MT chỉ dùng cho <b>ferromagnetic</b> (thép C-Mn, thép hợp kim thấp, ferritic/martensitic SS) — <b>không</b> dùng cho inox austenitic, nhôm, đồng. PT dùng được cho tất cả vật liệu không xốp.',
  'MT: khuyết tật phải <b>vuông góc</b> với đường sức từ mới thấy → luôn từ hóa <b>2 hướng</b> (90°). Gông AC bắt bề mặt tốt nhất; DC/HWDC sâu hơn một chút.',
  'PT: khuyết tật bị <b>bịt kín</b> (mài bết, sơn, cát phun) → PT không thấy. Thời gian thẩm thấu (dwell) 5–30 phút, lau thừa đúng cách rồi mới hiện màu.',
  'RT: tia X (máy, tắt được, độ nét tốt hơn) vs gamma (Ir-192/Co-60/Se-75, nguồn luôn phát, cơ động). <b>IQI</b> (penetrameter) chứng minh <b>độ nhạy phim</b>, không phải đo khuyết tật. Mật độ phim quá thấp/cao → không đánh giá được.',
  'UT: cần <b>couplant</b>, đầu dò góc (45/60/70°) cho mối hàn, đầu dò thẳng 0° cho tấm/tách lớp; hiệu chuẩn bằng khối chuẩn V1/V2. Không có bản ghi vĩnh viễn (trừ TOFD/phased array).',
  'Thứ tự khôn ngoan: <b>VT trước mọi NDT khác</b> — rẻ nhất, và bề mặt xấu làm hỏng kết quả PT/MT/UT.'
 ],
 numbers: [
  'VT (ISO 17637): ánh sáng ≥ <b>350 lux</b> (khuyến nghị 500), góc nhìn ≥ 30°, khoảng cách ≤ 600 mm.',
  'MT: 2 hướng từ hóa vuông góc; gông AC – bề mặt; cường độ trường kiểm bằng dải Burmah Castrol/chỉ thị từ thông.',
  'PT: dwell ~5–30 phút (theo vật liệu/nhiệt độ 10–50 °C); hiện màu (developer) 10–30 phút; dung môi/ nước rửa đúng loại.',
  'RT: IQI dây (ISO 19232) độ nhạy ~<b>2%</b> chiều dày; mật độ phim thường <b>2,0–4,0</b> (ISO 17636 lớp A ≥2,0; lớp B ≥2,3); Ir-192 dùng ~10–75 mm thép; Co-60 dày hơn; Se-75 mỏng hơn.',
  'UT: tần số 2–5 MHz; đầu dò góc 45/60/70°; tấm mỏng < ~8 mm khó; hạt thô (inox austenit) tán xạ mạnh.',
  'Khả năng: VT/PT – bề mặt hở · MT – bề mặt + sát dưới · RT – thể tích bên trong (rỗ, xỉ) · UT – phẳng bên trong (LOF, nứt) + đo chiều dày.'
 ],
 mnemonic: '"Mắt – Màu – Từ – Phim – Âm": VT trước tiên · PT mọi vật liệu, chỉ bề mặt · MT chỉ thép từ, hai hướng · RT thấy khối, mù khuyết tật phẳng lệch tia · UT thấy phẳng, cần couplant & tay nghề.',
 ideas: [
  {h_vi:'🎓 Chọn NDT bằng 3 câu hỏi', h_en:'Choosing NDT with three questions',
   body:[
    {vi:'<b>Câu 1: Khuyết tật ở đâu?</b> Hở bề mặt → VT/PT/MT. Bên trong → RT/UT. <b>Câu 2: Vật liệu gì?</b> Thép từ tính → MT được; inox austenit/nhôm → PT (không MT), UT khó với inox hạt thô. <b>Câu 3: Khuyết tật dạng gì?</b> Khối (rỗ, xỉ) → RT; phẳng (nứt, LOF) → UT (hoặc RT chỉ khi tia song song khe). Trả lời 3 câu là ra đáp án hầu hết câu NDT trong đề.', en:'Where is the flaw (surface/internal)? What material (magnetic?)? What shape (volumetric → RT, planar → UT)?'},
    {vi:'Thêm yếu tố thực tế đề hay lồng: <b>tiếp cận</b> (RT cần hai phía; UT một phía), <b>an toàn</b> (RT phải cách ly khu vực), <b>bản ghi</b> (RT có phim; UT thủ công không), <b>chiều dày</b> (UT yếu với tấm mỏng; RT yếu với tấm rất dày), <b>chi phí/tốc độ</b> (MT nhanh hơn PT; VT rẻ nhất).', en:'Access (RT two sides, UT one side), safety, permanent record, thickness and cost are the usual extra discriminators.'}
   ]}
 ]
};

/* ---------- 7. WPS/PQR/Thợ ---------- */
X[7] = {
 story: 'Nghĩ về <b>công thức nấu ăn của nhà hàng</b>. <b>pWPS</b> là công thức nháp đầu bếp trưởng đề xuất. Nấu thử một mâm dưới sự chứng kiến của giám khảo, đem đi <b>kiểm nghiệm</b> (DT/NDT) → biên bản kết quả là <b>PQR/WPQR</b>: bằng chứng "công thức này ra món đạt". Từ bằng chứng đó mới viết <b>WPS</b> chính thức phát cho bếp — và WPS chỉ được phép dao động trong <b>phạm vi</b> PQR đã chứng minh. Còn <b>chứng chỉ thợ hàn</b> là chuyện khác: chứng minh <b>người nấu</b> theo được công thức (tay nghề), không phải công thức đúng.',
 traps: [
  'PQR là <b>bản ghi kết quả</b> (record) — không sửa đổi; WPS là <b>hướng dẫn</b> cho thợ — có thể viết nhiều WPS từ một PQR. Đề hỏi "tài liệu thợ hàn dùng khi hàn?" → <b>WPS</b>, không phải PQR.',
  'Biến số thiết yếu (essential variable) = đổi thì phải <b>qualify lại</b> vì ảnh hưởng cơ tính: quá trình, nhóm vật liệu, chiều dày ngoài phạm vi, loại que (ví dụ rutile → basic), <b>giảm</b> tiền nhiệt, <b>tăng</b> interpass, thêm/bớt PWHT, tăng heat input quá giới hạn (khi có thử va đập), cực tính.',
  'Qualify quy trình kiểm <b>cơ tính</b> (kéo, uốn, va đập, độ cứng, macro); qualify thợ chủ yếu kiểm <b>độ lành & tay nghề</b> (VT + uốn/gãy hoặc RT/UT, macro với góc). Đề hỏi "test thợ có cần Charpy không?" → không.',
  'ISO 9606-1: chứng chỉ thợ có hiệu lực <b>2 năm</b> nếu được xác nhận <b>6 tháng/lần</b> (thợ vẫn hàn trong phạm vi); 3 cách gia hạn (thử lại, kiểm 2 mối hàn sản xuất/6 tháng, hệ thống chất lượng). ASME IX: ngưng hàn quá trình đó <b>6 tháng</b> → mất hiệu lực.',
  'Phạm vi chiều dày ISO 15614-1 với giáp mép: thử t trong 3–12 mm → qualify <b>3 → 2t</b>; t >12 → <b>0,5t → 2t</b> (nhiều lớp). Đề hỏi "thử 10 mm qualify tới?" → 20 mm.',
  'Vị trí: qualify thợ ở PF (đứng lên) phủ PA, PF; PG riêng; <b>H-L045</b> (ống nghiêng, hàn lên) phủ hầu hết vị trí; <b>J-L045</b> là hàn xuống. Nhớ: J = xuống, H = lên.',
  'Không đệm lưng (ss nb) qualify <b>cả có đệm</b>; có đệm không qualify không đệm.'
 ],
 numbers: [
  'Chuỗi: pWPS → mối hàn thử (chứng kiến) → DT/NDT → WPQR (ISO 15614-1) / PQR (ASME IX) → WPS → WPQ thợ (ISO 9606-1 / ASME IX).',
  'ISO 15614-1 heat input: +25% khi có yêu cầu va đập; −25% khi có yêu cầu độ cứng (tham khảo).',
  'ISO 9606-1: hiệu lực 2 năm · xác nhận 6 tháng · thép nhóm theo ISO/TR 15608; que: nhóm A (acid/rutile), B (basic), C (cellulosic), R, RA, RB…',
  'ASME IX: mỗi biến số có bảng QW-25x; qualify thợ theo QW-452 (chiều dày: t ≤ 2t khi t <13 mm; ≥13 mm → không giới hạn), QW-461 vị trí; 6G phủ mọi vị trí.',
  'Thanh tra kiểm WPS tại công trường: số WPS/PQR tham chiếu, quá trình, vật liệu, que (cấp + đường kính), tiền nhiệt/interpass, dòng/áp/tốc độ (hoặc ROL), vị trí, kỹ thuật, PWHT.'
 ],
 mnemonic: '"Nháp – Thử – Ghi – Dùng": pWPS (nháp) → test (thử) → PQR (ghi, không sửa) → WPS (dùng). Thợ = tay nghề, không = cơ tính.'
};

/* ---------- 8. Vật liệu & luyện kim ---------- */
X[8] = {
 story: 'Thép như <b>cục đất sét có thể nung thành nhiều thứ</b>: nung đỏ (austenit, >~723 °C), để <b>nguội chậm</b> ra "gốm mềm dẻo" (ferit + peclit); <b>nguội nhanh</b> (tôi) ra "thủy tinh cứng giòn" (mactenxit). Hàn chính là <b>nung + làm nguội cục bộ không kiểm soát</b> → vùng HAZ sát đường chảy bị nung lên hạt thô rồi nguội nhanh → cứng & giòn nhất, chính là chỗ nứt nguội thích ở. Độ "dễ tôi cứng" của thép đọc qua <b>carbon tương đương CEV</b>: C và hợp kim càng cao, càng dễ ra mactenxit, càng cần tiền nhiệt.',
 traps: [
  'Hạt <b>thô</b> → độ dai giảm; hạt <b>mịn</b> → dai & bền hơn. Heat input cao / tốc độ nguội chậm → hạt thô HAZ; heat input thấp → nguội nhanh → cứng (mactenxit). Đề bẫy hai chiều: cao thì mất dai, thấp thì cứng nứt.',
  'Vùng HAZ cứng nhất: <b>CGHAZ</b> (hạt thô, sát đường chảy). Vùng độ dai tốt nhất: FGHAZ (tái kết tinh hạt mịn).',
  'CEV = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15 (IIW). CEV < ~0,40 → dễ hàn; càng cao càng cần tiền nhiệt/kiểm soát hydro. Đề thường cho thành phần và bắt tính.',
  'Mn: tăng bền, khử oxy và <b>khóa S thành MnS</b> (chống nứt nóng). S, P: tạp chất, gây nứt nóng/giòn. Si, Al: khử oxy (thép lặng – killed). Ni: tăng độ dai nhiệt độ thấp. Cr: cứng, chống ăn mòn. Mo: bền nhiệt/creep. V, Nb, Ti: làm mịn hạt.',
  'Thép sôi (rimming) <b>không nên hàn</b> (nhiều oxy → rỗ, phân tầng); thép lặng (killed, Si/Al) đồng nhất, hàn tốt. Thép Z (Z35) chống lamellar tearing.',
  'Inox austenit (304/316): <b>không từ tính</b>, không tôi cứng được, giãn nở nhiệt lớn (biến dạng nhiều), dẫn nhiệt kém; rủi ro <b>weld decay</b> (450–850 °C tạo cacbit crom biên hạt → ăn mòn). Phòng: cấp L (C thấp), ổn định hóa Ti/Nb (321/347), heat input thấp, interpass ≤150 °C.',
  'Duplex: ~50% ferit/50% austenit; heat input phải trong <b>cửa sổ</b> (quá thấp → ferit cao giòn; quá cao → pha sigma). Hàn duplex không được tiền nhiệt.'
 ],
 numbers: [
  'Điểm tới hạn: A1 ≈ <b>723 °C</b> (ferit+peclit → austenit bắt đầu), A3 phụ thuộc %C; thép C-Mn thường hóa khoảng 880–920 °C.',
  'CEV (IIW) = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15; ngưỡng tham khảo: <0,40 tốt; 0,40–0,45 cân nhắc tiền nhiệt ~100 °C; >0,45 tiền nhiệt + hydro thấp bắt buộc.',
  'Thép nhóm ISO/TR 15608: nhóm 1 (Re ≤ 460 MPa C-Mn), nhóm 2–3 bền cao, nhóm 8 austenit, nhóm 10 duplex.',
  'Weld decay/sensitisation inox: 450–850 °C; cấp L: C ≤ 0,03%; 321 ổn định Ti, 347 ổn định Nb.',
  'HAZ C-Mn: CGHAZ (>1100 °C) · FGHAZ (900–1100) · ICHAZ (723–900) · SCHAZ (<723).'
 ],
 mnemonic: '"Nhanh thì cứng, chậm thì thô": nguội nhanh → mactenxit cứng (nứt hydro); nguội chậm/heat input cao → hạt thô (mất dai). CEV cao → tiền nhiệt.'
};

/* ---------- 9. Xử lý nhiệt ---------- */
X[9] = {
 story: 'Xử lý nhiệt là <b>mát-xa cho thép</b>. <b>Tiền nhiệt</b> là làm ấm cơ trước khi tập: thép ấm → nguội chậm hơn → ít mactenxit, hydro có thời gian thoát, bớt sốc nhiệt. <b>PWHT</b> là mát-xa sau tập: nung lên ~600 °C (dưới A1) giữ vài giờ rồi nguội chậm → <b>giải phóng ứng suất dư</b>, <b>ram mềm</b> HAZ cứng, đuổi nốt hydro. Còn <b>thường hóa</b> (normalising) là "khởi động lại hệ thống": nung quá A3 rồi nguội không khí → hạt mịn đồng đều. Thanh tra phải soi <b>nhiệt độ – thời gian – tốc độ</b> trên biểu đồ, không nghe kể.',
 traps: [
  'PWHT thép C-Mn ở <b>550–650 °C</b> (dưới A1 ≈ 723 °C) — đề cho "900 °C" là thường hóa, không phải PWHT giải phóng ứng suất.',
  'Tiền nhiệt đo <b>ở đâu?</b> Trên bề mặt vật hàn, cách mép rãnh một khoảng (thường ≥75 mm hoặc 4t, theo ISO 13916/WPS), phía <b>đối diện</b> nguồn nhiệt nếu có thể, trước khi hàn <b>mỗi</b> đường. Dụng cụ: bút nhiệt (thermal chalk), nhiệt kế tiếp xúc, cặp nhiệt điện. Không đo ngay chỗ vừa hơ.',
  'Interpass max là <b>nhiệt độ trần</b>: inox austenit/duplex ~150 °C để giữ độ dai/chống sigma; thép C-Mn thường 250 °C. Đo ngay trước đường hàn tiếp theo.',
  'Mục đích tiền nhiệt: <b>giảm tốc độ nguội</b> (→ ít cứng), <b>hydro thoát</b>, <b>giảm ứng suất co ngót</b>, làm khô ẩm. Không phải để "tăng ngấu".',
  'PWHT còn làm <b>giảm bền/độ cứng</b> và có thể làm giảm độ dai nếu quá lâu/quá nhiệt (ram quá); thép Cr-Mo-V có nguy cơ <b>nứt ram (reheat cracking)</b>. Đề hỏi "PWHT có hại gì?" → mất bền, nứt ram, biến dạng nếu đỡ kém.',
  'Thanh tra kiểm PWHT: số lượng & vị trí cặp nhiệt điện, <b>tốc độ nâng/hạ</b> (trên ~300–400 °C mới kiểm soát), thời gian giữ theo chiều dày, biểu đồ ghi liên tục, hiệu chuẩn máy ghi, độ cứng sau PWHT.',
  'Ủ hoàn toàn (annealing) nguội trong lò → mềm nhất; thường hóa nguội không khí → hạt mịn, bền hơn ủ; tôi + ram (Q&T) → bền cao; <b>giải phóng ứng suất</b> không đổi tổ chức.'
 ],
 numbers: [
  'PWHT thép C-Mn: <b>550–650 °C</b>, giữ ~<b>1 h/25 mm</b> chiều dày (min 1 h) theo spec; tốc độ nâng/hạ kiểm soát trên ~400 °C; nguội tĩnh trong không khí dưới đó.',
  'A1 ≈ 723 °C; thường hóa ~880–920 °C nguội không khí; ủ hoàn toàn nguội trong lò.',
  'Tiền nhiệt đo cách mép ≥ 75 mm (hoặc 4 t, lấy nhỏ hơn; ISO 13916) · đo trước MỖI đường hàn · phía đối diện nguồn nhiệt.',
  'Interpass max phổ biến: C-Mn 250 °C · inox austenit & duplex 150 °C · theo WPS.',
  'Bút nhiệt (tempilstik) đổi trạng thái ở nhiệt độ định sẵn — dùng 2 bút (dưới & trên) để kẹp khoảng.'
 ],
 mnemonic: '"Ấm trước – Mát sau – Dưới A1": tiền nhiệt làm nguội chậm; PWHT 550–650 °C giải phóng ứng suất & ram mềm; không bao giờ vượt A1.'
};

/* ---------- 10. Biến dạng & ứng suất dư ---------- */
X[10] = {
 story: 'Mối hàn khi nguội giống <b>sợi dây chun kéo căng được dán vào tấm</b>: kim loại nóng co lại nhưng bị tấm lạnh xung quanh giữ → trong mối hàn sinh <b>ứng suất kéo xấp xỉ giới hạn chảy</b> (ứng suất dư). Nếu tấm mỏng/không kẹp → tấm <b>cong theo</b> (biến dạng). Nếu kẹp cứng → tấm không cong nhưng <b>ứng suất dư cao</b> hơn. Đó là cái bập bênh: <b>chống biến dạng thì tăng ứng suất dư, và ngược lại</b>. Heat input là "lượng dây chun": càng nhiều nhiệt, càng co nhiều.',
 traps: [
  'Kẹp chặt (restraint) <b>giảm biến dạng nhưng tăng ứng suất dư</b> → tăng nguy cơ nứt (đặc biệt HICC). Đề hỏi "kẹp chặt có hại gì?" → ứng suất dư/nứt.',
  'Góc rãnh rộng, một phía V đơn → nhiều kim loại đắp → <b>biến dạng góc</b> lớn. Double-V/X cân đối hai phía → ít biến dạng góc nhất (hàn luân phiên).',
  'Heat input công thức: HI (kJ/mm) = <b>U × I × 60 / (v mm/phút × 1000)</b> × k. Đề cho mm/giây thì bỏ 60. Nhớ nhân hệ số k nếu hỏi "heat input" theo EN 1011; "arc energy" không có k.',
  'Heat input cao → biến dạng nhiều, hạt thô, giảm độ dai, <b>nhưng</b> nguội chậm → ít cứng → giảm nứt hydro. Heat input thấp → ngược lại. Đề hay hỏi "tăng tốc độ hàn thì heat input?" → <b>giảm</b>.',
  'Kỹ thuật giảm biến dạng: hàn <b>lùi từng đoạn (back-step)</b>, <b>nhảy cóc (skip)</b>, cân đối hai phía, <b>đặt trước góc nghịch (presetting)</b>, uốn trước, ít lớp/ít kim loại đắp, kẹp đồ gá. Không phải "tăng dòng cho nhanh".',
  'Sửa biến dạng: cơ (ép, nắn) hoặc nhiệt cục bộ (hơ nóng chỗ cần co). PWHT làm <b>giảm ứng suất dư</b> chứ không "nắn" biến dạng.',
  'Run-out length (ROL): chiều dài đường hàn từ một que — dùng để tính tốc độ hàn khi không có đồng hồ: ROL ngắn = tốc độ chậm = heat input cao.'
 ],
 numbers: [
  'HI (kJ/mm) = U(V) × I(A) × 60 / (v (mm/phút) × 1000) × k; k: SAW 1,0 · MMA/MIG/MAG/FCAW 0,8 · TIG/plasma 0,6.',
  'Ví dụ: 24 V × 150 A × 60 / (250 × 1000) = 0,864 kJ/mm (arc energy) → × 0,8 = 0,69 kJ/mm (MMA).',
  'Ứng suất dư dọc ≈ <b>giới hạn chảy</b> của vật liệu; PWHT 550–650 °C giảm đáng kể.',
  '5 kiểu biến dạng: co dọc · co ngang · <b>góc</b> · cong vênh (bowing/dishing) · oằn (buckling) tấm mỏng · xoắn.',
  'Biện pháp theo thứ tự ưu tiên: thiết kế (ít kim loại đắp, đối xứng) → trình tự (back-step, skip, cân đối) → gá/kẹp/pre-set → sửa sau.'
 ],
 mnemonic: '"Nóng nhiều co nhiều – Kẹp chặt thì nứt": heat input ↑ → biến dạng ↑; restraint ↑ → ứng suất dư ↑. HI = U·I·60/(v·1000)·k.',
 ideas: [
  {h_vi:'🎓 Vì sao mối hàn luôn co — và vì sao không thể chống hoàn toàn', h_en:'Why welds always shrink — and why it cannot be fully prevented',
   body:[
    {vi:'Kim loại hàn nóng chảy ở ~1500 °C rồi nguội về 20 °C. Khi nguội nó <b>muốn co</b> theo mọi hướng, nhưng đã dính chặt vào tấm nguội xung quanh. Tấm không cho co → mối hàn bị <b>kéo căng</b> đúng bằng mức nó muốn co nhưng không được → ứng suất đạt tới giới hạn chảy (vì vượt chảy thì kim loại chảy dẻo chứ không kéo thêm). Đây là lý do <b>ứng suất dư ≈ giới hạn chảy</b> bất kể bạn hàn khéo thế nào.', en:'Hot weld metal wants to shrink on cooling but is held by the cold plate → tensile residual stress up to yield; this happens regardless of skill.'},
    {vi:'Bạn chỉ chọn được <b>cho nó co ở đâu</b>: cho tấm tự do → tấm cong (biến dạng) nhưng ứng suất xả bớt; kẹp cứng → tấm thẳng nhưng ứng suất ở lại trong mối hàn. Vì vậy câu trả lời "đúng" trong đề luôn là <b>cân bằng</b>: giảm lượng nhiệt/kim loại đắp, bố trí đối xứng và trình tự hợp lý trước khi nghĩ đến kẹp cứng.', en:'You only choose where the shrinkage goes: free plate distorts, restrained plate keeps the stress. Exam answers favour less heat, symmetry and sequence before heavy restraint.'}
   ]}
 ]
};

/* ---------- 11. Thiết kế & chuẩn bị mối nối ---------- */
X[11] = {
 story: 'Chuẩn bị mép hàn như <b>đào rãnh để đổ bê tông</b>: rãnh phải đủ rộng để "cái xẻng" (que/đầu dò) với tới đáy (ngấu chân), nhưng rộng quá thì tốn vật liệu đắp và co nhiều (biến dạng). <b>Khe hở chân (root gap)</b> là lối vào cho hồ quang ngấu; <b>mặt chân (root face)</b> là "vai đỡ" để không cháy thủng; <b>góc vát</b> là độ dốc thành rãnh. Tấm mỏng thì hàn mép vuông, tấm vừa thì chữ V, tấm dày thì <b>U/J</b> (thành dốc đứng, ít đắp nhưng tốn gia công) hoặc <b>X</b> (hai phía, cân đối, ít biến dạng).',
 traps: [
  'Khe hở chân <b>quá hẹp</b> → không thấu (LOP); <b>quá rộng</b> → cháy thủng, ngấu quá mức, tốn que. Mặt chân <b>quá dày</b> → không thấu; <b>quá mỏng</b> → cháy thủng.',
  'Góc vát (bevel angle) là góc <b>một bên</b>; góc rãnh (included angle) là góc <b>tổng</b>. Chữ V 60° included = bevel 30° mỗi bên; chữ ½V (bevel) có included = bevel. Đề bẫy: "mép J có bán kính, góc nhỏ 5–15°".',
  'Rãnh U/J: tốn gia công nhưng <b>ít kim loại đắp</b> cho tấm dày (>~20 mm) → ít biến dạng, ít thời gian hàn. Chữ V: dễ gia công (cắt nhiệt) nhưng đắp nhiều khi dày.',
  'Double-V (X): cần <b>tiếp cận hai phía</b>, phải dũi/mài chân (back gouge) trước khi hàn phía sau trừ khi có WPS qualified không dũi. Đề hỏi "hàn lớp lót rồi làm gì?" → kiểm/dũi chân phía sau.',
  'Mối hàn góc: cổ thiết kế (design throat) a; cổ thực (actual throat) đo tới chân ngấu; <b>cạnh (leg) z</b>; lồi quá nhiều → tập trung ứng suất ở chân, không thêm độ bền. Góc lõm chịu mỏi tốt hơn.',
  'Lệch mép (hi-lo/misalignment) & lệch góc: kiểm trước hàn; lệch mép làm giảm tiết diện hiệu dụng và sinh uốn → đề xếp vào khuyết tật nhóm 500 (ISO 6520).',
  'Backing: đệm lót tạm (gốm, đồng – không chảy vào) vs vĩnh viễn (thép – thành một phần mối nối, gây khe hở ăn mòn/mỏi). Hàn không đệm → qualify cả có đệm.'
 ],
 numbers: [
  'Chữ V đơn thép C-Mn MMA điển hình: góc rãnh <b>60–70°</b> (bevel 30–35°), khe hở chân <b>2–4 mm</b>, mặt chân <b>1–3 mm</b>.',
  'Mép vuông (square): không vát, tới ~3–6 mm (hàn một/hai phía) tùy quá trình.',
  'Chữ U/J: góc 5–15° mỗi bên, bán kính chân ~5–8 mm, cho tấm dày >~20 mm.',
  'Góc: a ≈ 0,7 z; z ≈ 1,4 a; góc mitre 45° là "chuẩn"; lồi quá lớn không được tính thêm cổ.',
  'Dung sai lắp ghép kiểm trước hàn: khe hở, mặt chân, góc, lệch mép (thường ≤10% t hoặc ≤3 mm theo ISO 5817 mức).'
 ],
 mnemonic: '"Hẹp thì không thấu – Rộng thì thủng – Dày thì U/X": khe hở & mặt chân quyết định chân; chiều dày quyết định hình rãnh.'
};

/* ---------- 12. Tiêu chuẩn, quy phạm & hồ sơ ---------- */
X[12] = {
 story: 'Tài liệu kỹ thuật xếp như <b>luật – nghị định – hợp đồng</b>. <b>Code</b> (quy phạm) là luật: bắt buộc khi hợp đồng/pháp luật viện dẫn (ASME, API, BS). <b>Standard</b> (tiêu chuẩn) là nghị định hướng dẫn cách làm chuẩn (ISO, EN) — bắt buộc khi được viện dẫn. <b>Specification</b> (chỉ dẫn kỹ thuật) là hợp đồng riêng của dự án: chi tiết hơn và có thể <b>khắt khe hơn</b> tiêu chuẩn. Khi mâu thuẫn, thanh tra làm theo <b>tài liệu áp dụng của hợp đồng</b>, không theo kinh nghiệm cá nhân. Và <b>hồ sơ</b> là bằng chứng — không có hồ sơ coi như chưa làm.',
 traps: [
  'Đề hỏi "thanh tra chấp nhận/loại theo cái gì?" → theo <b>tiêu chuẩn/spec áp dụng của hợp đồng</b> — không theo ý kiến, không theo "thường thì vẫn được".',
  'ISO 5817 là <b>mức chất lượng khuyết tật</b> (B/C/D) cho thép; ISO 6520-1 là <b>phân loại/đặt tên</b> khuyết tật (mã 100–600). Đừng lẫn: 6520 không nói đạt/không đạt.',
  'ISO 15614-1 = qualify <b>quy trình</b>; ISO 9606-1 = qualify <b>thợ</b>; ISO 14731 = <b>điều phối hàn</b> (welding coordinator); ISO 3834 = <b>yêu cầu chất lượng</b> của nhà máy hàn (3834-2 toàn diện, -3 tiêu chuẩn, -4 cơ bản).',
  'EN 10204: 3.1 do nhà sản xuất (bộ phận độc lập với sản xuất) ký; 3.2 có thêm bên thứ ba/khách. 2.2 có kết quả thử nhưng <b>không đặc thù</b> cho lô; 2.1 chỉ tuyên bố.',
  'Mức ISO 5817: <b>B</b> stringent (nghiêm ngặt nhất) — đề đảo ngược "D nghiêm ngặt nhất" là bẫy.',
  'Khi spec dự án yêu cầu khắt khe hơn tiêu chuẩn → áp dụng <b>spec</b>; khi spec im lặng → về tiêu chuẩn viện dẫn; không bao giờ "lỏng hơn tiêu chuẩn".',
  'Truy xuất nguồn gốc (traceability): số nhiệt luyện (heat number) trên vật liệu phải khớp chứng chỉ; đóng dấu cứng sắc nhọn không khuyến khích (tập trung ứng suất) → dùng dấu "low-stress"/sơn.'
 ],
 numbers: [
  'ISO 5817: mức B (nghiêm ngặt), C (trung bình), D (vừa phải). ISO 6520-1: 100 nứt · 200 rỗ · 300 ngậm · 400 không ngấu/thấu · 500 hình dạng · 600 khác.',
  'ISO 15614-1 (WPQR) · ISO 9606-1 (thợ thép) · ISO 14732 (thợ vận hành máy) · ISO 14731 (điều phối) · ISO 3834-2/3/4 (chất lượng) · ISO 17637 (VT) · ISO 17636 (RT) · ISO 17640 (UT) · ISO 17638 (MT) · ISO 3452 (PT) · ISO 6947 (tư thế) · ISO 4063 (mã quá trình) · ISO 2553 (ký hiệu).',
  'ASME IX (qualify) · ASME VIII (bình áp lực) · ASME B31.3 (đường ống công nghệ) · AWS D1.1 (kết cấu thép) · API 1104 (đường ống dẫn).',
  'EN 10204: 2.1 · 2.2 · 3.1 · 3.2.',
  'Hồ sơ tối thiểu một gói hàn: WPS/PQR, chứng chỉ thợ, chứng chỉ vật liệu & que, bản vẽ/ký hiệu, báo cáo VT/NDT, biểu đồ PWHT, hiệu chuẩn, NCR & xử lý, bản đồ mối hàn (weld map).'
 ],
 mnemonic: '"Luật – Chuẩn – Hợp đồng": Code bắt buộc · Standard cách làm · Spec của dự án (khắt khe hơn thì theo spec). 5817 = mức, 6520 = tên.',
 ideas: [
  {h_vi:'🎓 Đọc một yêu cầu kỹ thuật như thanh tra — 4 câu hỏi', h_en:'Reading a specification like an inspector — four questions',
   body:[
    {vi:'Trước mỗi mối hàn hãy trả lời: <b>(1) Tài liệu nào áp dụng?</b> (code/standard/spec, phiên bản năm nào — phiên bản sai là lỗi hay gặp). <b>(2) Mức chấp nhận nào?</b> (ISO 5817 B/C/D hay bảng riêng của spec). <b>(3) Kiểm tra bằng gì, bao nhiêu %?</b> (VT 100%, RT/UT 10%…). <b>(4) Ai ký duyệt, ai giữ hồ sơ?</b> Không trả lời được 4 câu thì chưa đủ điều kiện bắt đầu kiểm tra.', en:'Which document and edition applies? Which acceptance level? Which NDT and what extent? Who approves and who keeps the records?'},
    {vi:'Bẫy thực tế đề hay đưa: WPS tham chiếu tiêu chuẩn <b>phiên bản cũ</b> hoặc PQR ghi vật liệu <b>khác nhóm</b> với bản vẽ — đó là lý do thanh tra phải <b>đối chiếu chéo</b> WPS ↔ PQR ↔ bản vẽ ↔ chứng chỉ vật liệu trước khi cho hàn.', en:'Typical exam traps: outdated standard edition on the WPS, or PQR material group not matching the drawing — cross-check WPS, PQR, drawing and material certificates.'}
   ]}
 ]
};

/* ---------- 13. Thiết bị đo & hiệu chuẩn ---------- */
X[13] = {
 story: 'Dụng cụ đo chưa hiệu chuẩn như <b>cân chợ bị chỉnh</b>: mọi số bạn đọc đều có thể sai mà bạn không biết. Hiệu chuẩn là đem cân đi so với <b>quả cân chuẩn có nguồn gốc</b> (truy xuất tới chuẩn quốc gia), ghi sai số, dán tem và hẹn ngày so lại. Với hàn: ampe kế/vôn kế trên máy, kẹp dòng, nhiệt kế, dưỡng hàn, thước — tất cả phải có <b>tem hiệu chuẩn còn hạn</b>, nếu không, kết luận "đúng WPS" của bạn vô giá trị.',
 traps: [
  'Đo dòng ở đâu? Bằng <b>kẹp dòng (tong tester)</b> trên cáp que/dây <b>gần hồ quang</b>; đo điện áp <b>càng gần hồ quang càng tốt</b> (giữa kìm/súng và vật hàn), không đọc đồng hồ trên máy đặt xa vì sụt áp trên cáp.',
  'Đồng hồ máy hàn hiện số ≠ đã hiệu chuẩn. Hiệu chuẩn/kiểm định máy hàn theo <b>BS 7570 / EN 50504</b> (cấp standard ±10%, precision ±2,5%).',
  'Dưỡng hàn đa năng (Cambridge/TWI) đo: góc vát, lệch mép, <b>cạnh & cổ góc</b>, chiều cao lồi, <b>độ sâu cháy chân</b>, khe hở. Thước lá/thước cặp đo chiều dài/chiều dày. Đo cổ góc thực phải dùng dưỡng cổ (throat gauge) hoặc cắt macro.',
  'Nhiệt độ tiền nhiệt/interpass: bút nhiệt (tempilstik) chỉ cho biết <b>đạt hay chưa đạt một ngưỡng</b>; nhiệt kế tiếp xúc/cặp nhiệt điện cho con số. Bút hồng ngoại không tiếp xúc cần hệ số phát xạ đúng.',
  'Chu kỳ hiệu chuẩn theo <b>hệ thống chất lượng/spec</b> (thường 12 tháng cho đồng hồ điện, kiểm tra trước ca cho dưỡng). Thiết bị quá hạn tem → kết quả đo trong giai đoạn đó <b>bị nghi ngờ</b>, phải đánh giá lại.',
  'Đèn kiểm tra VT: ≥350 lux tại bề mặt; mắt cách ≤600 mm, góc ≥30°. Kính lúp 2–5×, gương kiểm tra chân ống, đèn pin góc — đều là "thiết bị" trong đề.',
  'Hiệu chuẩn ≠ kiểm tra chức năng: hiệu chuẩn so với chuẩn và ghi sai số; "validation/verification" xác nhận máy cho ra thông số đúng trong dung sai.'
 ],
 numbers: [
  'BS 7570 / EN 50504: cấp <b>standard ±10%</b>, cấp <b>precision ±2,5%</b> cho máy hàn.',
  'VT: ≥ 350 lux (khuyến nghị 500), khoảng cách ≤ 600 mm, góc ≥ 30°.',
  'Chu kỳ phổ biến: đồng hồ điện/kẹp dòng 12 tháng · nhiệt kế 12 tháng · dưỡng: kiểm trước khi dùng + định kỳ · máy UT: kiểm chuẩn khối V1/V2 mỗi ca.',
  'Dưỡng hàn đo được: góc vát, lệch mép (hi-lo), khe hở, cạnh z, cổ a, chiều cao lồi, sâu cháy chân (bằng kim tựa).',
  'Hồ sơ hiệu chuẩn: số hiệu thiết bị, chuẩn so sánh (truy xuất), kết quả/sai số, ngày, hạn, người thực hiện.'
 ],
 mnemonic: '"Không tem – không tin": đo dòng bằng kẹp gần hồ quang, đo áp sát hồ quang; mọi thiết bị phải có tem hiệu chuẩn còn hạn và truy xuất chuẩn.',
 ideas: [
  {h_vi:'🎓 Sai số lọt vào đâu khi "đo đúng WPS"', h_en:'Where error creeps in when "measuring to the WPS"',
   body:[
    {vi:'Thanh tra đọc 150 A trên máy hàn, WPS cho 140–160 A → kết luận "đạt". Nhưng cáp dài 30 m, đồng hồ máy chưa hiệu chuẩn sai +12%, và thợ đổi tầm với dây: dòng thật tại hồ quang có thể chỉ 125 A — <b>ngoài WPS</b>, ngấu kém. Đó là lý do đề luôn nhấn: đo bằng <b>thiết bị hiệu chuẩn, tại vị trí sát hồ quang</b>, đo điện áp giữa đầu kìm và vật hàn.', en:'Panel meters, long cables and stick-out changes can hide an out-of-WPS arc current — measure with a calibrated clamp meter near the arc, voltage between torch and work.'},
    {vi:'Tương tự với tiền nhiệt: hơ ngay rãnh rồi đo tại chỗ sẽ thấy "đủ 100 °C", nhưng cách 75 mm vật mới 40 °C → tốc độ nguội vẫn nhanh. Quy tắc: <b>đo đúng vị trí quy định, đúng thời điểm</b> (ngay trước mỗi đường hàn), ghi lại.', en:'Preheat measured at the heated groove lies; measure at the specified distance and time, and record it.'}
   ]}
 ]
};

/* ---------- 14. An toàn ---------- */
X[14] = {
 story: 'Hãy ghép <b>mỗi mối nguy với một tai nạn cụ thể</b> — đề thi làm đúng như vậy. <b>Điện</b>: giật khi OCV cao, găng ướt, đứng trong nước. <b>Bức xạ hồ quang</b>: "đau mắt hàn" (arc eye, UV) và bỏng da. <b>Khói & khí</b>: ozon (TIG/MIG nhôm, inox), crom hóa trị 6 (inox), kẽm (mạ kẽm – sốt khói kim loại), CO; <b>argon nặng hơn không khí</b> dồn xuống đáy bồn → ngạt trong không gian kín không mùi không báo trước. <b>Lửa/nổ</b>: axetylen, dầu mỡ gặp oxy, bình đổ. <b>Nhiệt</b>: xỉ bắn, chi tiết nóng. Thanh tra có <b>quyền và nghĩa vụ dừng việc</b> khi thấy nguy hiểm.',
 traps: [
  'OCV MMA 50–90 V; môi trường ẩm/kín dùng thiết bị giảm áp (VRD) → OCV an toàn ~ <b>≤ 25–48 V</b> tùy quy định. Điện giật chết người ngay ở vài chục mA.',
  'Argon <b>nặng hơn</b> không khí → tích ở đáy; heli <b>nhẹ hơn</b> → tích trên đỉnh. Trong không gian kín phải đo <b>oxy</b> (≥19,5%), thông gió cưỡng bức, người canh ngoài, giấy phép làm việc (permit to work).',
  'Ozon (O₃) sinh nhiều nhất khi <b>TIG/MIG nhôm, inox</b> (tia UV mạnh + Ar); hơi kẽm từ thép mạ → sốt khói kim loại; crom VI từ inox → ung thư phổi — cần hút khói tại nguồn (LEV), không chỉ quạt thổi.',
  'Bình khí: oxy không được dính dầu mỡ (cháy nổ); axetylen không dùng quá 15 psi (~1 bar) áp làm việc, van <b>chặn lửa tạt (flashback arrestor)</b> cả hai phía; bình đứng, xích giữ, nắp van khi vận chuyển.',
  'Kính hàn: cấp lọc (shade) theo dòng — MMA ~ shade 10–12, MIG/MAG 10–14, TIG 9–13 (càng cao dòng càng đậm). Kính trắng đi kèm cho người quan sát/thanh tra gần hồ quang.',
  'Tiếp địa (earth return) kẹp sát vật hàn — dòng chạy qua kết cấu/ổ trục/cáp cẩu gây hỏng và cháy; không dùng ống dẫn khí làm đường về.',
  'Đề hỏi "ai chịu trách nhiệm an toàn?" → <b>mọi người</b> (employer & employee), thanh tra phải <b>dừng</b> công việc không an toàn và báo cáo.'
 ],
 numbers: [
  'OCV MMA 50–90 V; VRD giảm khi không hàn; dòng gây rung tim ~30–50 mA; môi trường dẫn điện cao: DC & ≤ 48 V OCV (tham khảo).',
  'Không gian kín: O₂ ≥ 19,5%; đo khí trước & liên tục; argon nặng hơn không khí (1,38), heli nhẹ hơn.',
  'Axetylen: áp làm việc ≤ 1 bar (15 psi); flashback arrestor; bình đứng; oxy sạch dầu.',
  'Kính lọc hồ quang shade ~9–14 theo dòng/quá trình; UV gây arc eye sau vài giờ (đau cát trong mắt).',
  'Khói nguy hiểm: O₃ (TIG/MIG Al/SS), Cr⁶⁺ (inox), ZnO (mạ kẽm), Mn, CO (CO₂ MAG), NOₓ, F (que basic).'
 ],
 mnemonic: '"Điện – Sáng – Khói – Lửa – Nóng – Kín": 6 nhóm mối nguy; mỗi nhóm nhớ 1 tai nạn & 1 biện pháp. Argon chìm, heli nổi, thanh tra được dừng việc.',
 ideas: [
  {h_vi:'🎓 Vì sao ngạt argon chết người mà không ai kịp kêu', h_en:'Why argon asphyxiation kills silently',
   body:[
    {vi:'Argon <b>không màu, không mùi, không độc</b> — nó chỉ <b>chiếm chỗ của oxy</b>. Khi O₂ tụt dưới ~16% người ta không thấy khó thở (phản xạ thở do CO₂ điều khiển, không do thiếu O₂), chỉ choáng rồi ngất trong vài hơi thở. Trong bồn/ống đang hàn TIG có khí bảo vệ chân, argon dồn xuống đáy. Người cứu nhảy xuống không có khí thở cũng chết theo — đây là kịch bản tai nạn kép kinh điển.', en:'Argon displaces oxygen without warning; low O₂ causes no breathlessness. Rescuers without air become second victims.'},
    {vi:'Biện pháp theo thứ tự: <b>giấy phép</b> làm việc kín → <b>đo khí</b> trước và liên tục → <b>thông gió cưỡng bức</b> → <b>người canh</b> bên ngoài có dây cứu → <b>bình khí để ngoài</b>, chỉ kéo ống vào → tắt khí khi dừng. Thanh tra thấy thiếu một khâu phải <b>dừng công việc</b>.', en:'Permit → gas test → forced ventilation → attendant with rescue line → cylinders outside → stop the job if any link is missing.'}
   ]}
 ]
};

/* ---------- 15. Thuật ngữ & định nghĩa ---------- */
X[15] = {
 story: 'Thuật ngữ là <b>bản đồ của mối hàn</b>. Nhìn một mặt cắt: ở giữa là <b>kim loại mối hàn</b> (weld metal), ranh giới chảy là <b>đường chảy</b> (fusion line/boundary), bên ngoài là <b>HAZ</b> rồi <b>kim loại nền</b>. Phía trên là <b>mặt</b> (face) và <b>chân/ngón</b> (toe) — chỗ chuyển tiếp; phía dưới là <b>gốc</b> (root). Phần nhô lên gọi là <b>kim loại đắp thừa</b> (excess weld metal — đề KHÔNG dùng "reinforcement" vì nó không gia cố gì). Tư thế hàn là "địa chỉ trên bản đồ": PA bằng, PC ngang, PF đứng lên, PG đứng xuống, PE trần…',
 traps: [
  '<b>Mối nối (joint)</b> ≠ <b>mối hàn (weld)</b>: butt/T/lap/corner/edge là kiểu mối nối; butt weld (giáp mép) và fillet weld (góc) là kiểu mối hàn. Mối nối chữ T có thể hàn bằng mối hàn góc hoặc giáp mép (vát).',
  '"Reinforcement" là từ <b>sai</b> theo ISO — dùng <b>excess weld metal</b>; thừa cao gây tập trung ứng suất ở toe, không tăng bền.',
  'Cổ góc: <b>design throat</b> (thiết kế, a) vs <b>actual throat</b> (thực, tới chân ngấu) vs <b>effective throat</b>. Mối hàn góc lồi: cổ tính tới mặt phẳng nối hai toe, phần lồi không tính.',
  'Tư thế ISO 6947: PA bằng · PB ngang-đứng (góc) · PC ngang (giáp mép) · PD trần-ngang (góc) · PE trần · PF đứng <b>lên</b> · PG đứng <b>xuống</b> · PH ống cố định hàn lên · PJ ống hàn xuống · H-L045 ống nghiêng 45° hàn lên · J-L045 hàn xuống. ASME: 1G/2G/3G/4G tấm; 5G ống nằm ngang cố định; 6G ống nghiêng 45°; 1F–4F góc.',
  '<b>Run/pass</b> (một đường hàn) · <b>layer</b> (một lớp có thể nhiều pass) · <b>root run, hot pass, fill, cap</b>. "Weave" là lắc ngang; "stringer" đi thẳng.',
  'Mức cơ giới: <b>manual</b> (MMA, TIG tay) · <b>semi-automatic/partly mechanised</b> (MIG/MAG tay cầm súng, dây tự cấp) · <b>mechanised</b> (SAW xe chạy, người chỉnh) · <b>automatic</b> (không can thiệp). Đề hỏi "MIG/MAG là gì?" → bán tự động.',
  '<b>Penetration</b> (độ ngấu – depth of fusion) vs <b>fusion</b> (sự hòa tan); <b>dilution</b> (pha loãng) = tỷ lệ kim loại nền trong kim loại mối hàn; <b>heat input</b> vs <b>arc energy</b>.'
 ],
 numbers: [
  'Vùng: weld metal · fusion line/boundary · HAZ · parent metal · toe · root · face · excess weld metal · root penetration bead.',
  'Mối nối: butt · T · lap · corner · edge · cruciform. Mối hàn: butt weld · fillet weld · plug/slot · spot/seam · edge weld.',
  'ISO 6947: PA, PB, PC, PD, PE, PF, PG, PH, PJ, H-L045, J-L045. ASME: 1G 2G 3G 4G (tấm) · 1G 2G 5G 6G 6GR (ống) · 1F 2F 3F 4F (góc tấm) · 1F 2F 4F 5F (góc ống).',
  'Góc: leg z · design throat a = 0,7 z · actual throat · mitre/convex/concave · toe angle.',
  'Cơ giới hóa: manual · semi-automatic · mechanised · automatic (ISO 857/TR 25901).'
 ],
 mnemonic: '"PA bằng – PC ngang – PE trần – PF lên – PG xuống": nhớ 5 tư thế gốc rồi suy ra PB/PD cho góc, PH/PJ cho ống. J = xuống, H = lên.'
};

/* ---------- 16. Cắt nhiệt & dũi ---------- */
X[16] = {
 story: 'Cắt oxy không phải "nung chảy" mà là <b>đốt cháy sắt</b>: nung thép lên nhiệt độ bắt cháy (~870–900 °C, dưới điểm chảy), rồi thổi oxy tinh khiết → sắt <b>cháy thành oxit sắt lỏng</b> (phản ứng tỏa nhiệt) và bị thổi bay. Nó chỉ hoạt động khi <b>oxit chảy ở nhiệt độ thấp hơn kim loại</b> — đúng với thép carbon. Với inox (oxit crom chảy ~2000 °C) và nhôm (oxit nhôm ~2050 °C) thì lớp oxit "đóng vảy" không bay → không cắt được → phải dùng <b>plasma</b> (hồ quang khí ion hóa, cắt mọi kim loại dẫn điện). <b>Dũi hồ quang-khí nén</b> (arc-air) là "nấu chảy rồi thổi": điện cực than DC+, khí nén thổi kim loại lỏng đi — dùng để mở rãnh chân, cắt bỏ khuyết tật.',
 traps: [
  'Điều kiện cắt oxy: <b>nhiệt độ bắt cháy < nhiệt độ chảy</b> và <b>oxit chảy < kim loại chảy</b> → thép C-Mn đạt; inox, nhôm, gang, đồng <b>không</b> cắt oxy được (phải plasma hoặc cắt bột).',
  'Mép cắt oxy có <b>HAZ và lớp bị tôi cứng/cacbon hóa</b> mỏng, cùng vết rãnh (drag lines) → trước khi hàn thường phải <b>mài sạch</b>; mép cắt plasma có thể có <b>nitrua</b> bề mặt (plasma khí nitơ) gây rỗ → mài.',
  'Arc-air gouging dùng điện cực <b>than bọc đồng, DC+</b>, dòng lớn, khí nén 5–7 bar; nguy cơ để lại <b>cacbon</b> trên bề mặt rãnh → phải mài bỏ ~1–2 mm trước khi hàn; ồn & khói → PPE.',
  'Vì sao "cắt nhiệt là bẫy chất lượng trước mối hàn"? Vì <b>khuyết tật mép</b> (cháy xém, lệch góc, oxit, cacbon) trở thành khuyết tật mối hàn (LOF, rỗ, nứt) nếu không kiểm trước hàn.',
  'Cắt oxy dùng <b>3 ngọn lửa nung + 1 tia oxy cắt</b>; ngọn lửa trung tính cho nung; áp oxy cắt phụ thuộc chiều dày. Lửa tạt (flashback) → cần van chặn lửa.',
  'Plasma: dùng được cho <b>mọi kim loại dẫn điện</b>, nhanh với tấm mỏng/inox/nhôm, HAZ hẹp hơn oxy; nhược: tiếng ồn, tia UV, khói, mép hơi xiên (bevel) và tốn điện cực/đầu phun.',
  'Dũi để sửa khuyết tật: sau dũi phải <b>MT/PT xác nhận đã hết</b> khuyết tật rồi mới hàn lại.'
 ],
 numbers: [
  'Cắt oxy: thép nung tới ~870–900 °C (bắt cháy) < điểm chảy ~1500 °C; oxit sắt chảy ~1370 °C; phản ứng tỏa nhiệt duy trì cắt.',
  'Không cắt oxy: inox (Cr₂O₃ ~2000+ °C), nhôm (Al₂O₃ ~2050 °C), gang (C cao), đồng (dẫn nhiệt lớn).',
  'Arc-air: điện cực than bọc Cu, DC+, 300–1500 A tùy đường kính; khí nén 5–7 bar; mài bỏ 1–2 mm sau dũi.',
  'Plasma: hồ quang thắt trong khí (N₂, Ar/H₂, không khí) tới >20 000 °C; cắt mọi kim loại dẫn điện.',
  'Kiểm mép cắt trước hàn: thẳng, đúng góc vát, không xỉ dính, mài sạch lớp oxit/cacbon, không nứt (MT nếu thép dễ tôi).'
 ],
 mnemonic: '"Oxy đốt sắt – Plasma chảy tất – Than thổi bay": cắt oxy chỉ cho thép C-Mn; plasma cho mọi kim loại dẫn điện; arc-air dũi phải mài bỏ cacbon.',
 ideas: [
  {h_vi:'🎓 Mép cắt — nơi khuyết tật mối hàn bắt đầu', h_en:'The cut edge — where weld defects begin',
   body:[
    {vi:'Thanh tra giỏi kiểm mép <b>trước</b> khi thợ hàn đến. Mép cắt oxy để lại ba thứ: <b>lớp oxit/vảy</b> (→ rỗ, ngậm xỉ nếu không mài), <b>lớp cứng mỏng</b> do nguội nhanh (→ nứt nguội ở thép CEV cao), và <b>rãnh/khía</b> (notch → tập trung ứng suất, khe chứa ẩm). Mép dũi arc-air thêm <b>cacbon</b> từ điện cực than (→ vùng cứng, nứt). Vì vậy quy định phổ biến: mài sáng kim loại ≥1–2 mm, kiểm góc vát & mặt chân bằng dưỡng, với thép dễ tôi thì MT mép sau cắt.', en:'Oxy-cut edges leave oxide, a thin hardened layer and notches; arc-air leaves carbon pick-up. Grind to bright metal, gauge the prep, MT hardenable steels.'},
    {vi:'Đề hay hỏi "vì sao dũi chân (back-gouge) rồi vẫn phải mài?" → bỏ cacbon và oxit; "vì sao mép plasma cần mài?" → nitrua/oxit gây rỗ; "mép cắt oxy thép dày có thể nứt vì?" → tôi cứng cục bộ + hydro ẩm.', en:'Grinding after gouging removes carbon and oxide; plasma edges carry nitrides; thick oxy-cut edges can harden and crack.'}
   ]}
 ]
};

/* ---------- 17. Phá hủy khi vận hành & hàn sửa ---------- */
X[17] = {
 story: 'Mặt gãy là <b>hiện trường vụ án</b>, và mỗi kiểu phá hủy để lại dấu vân tay riêng. <b>Mỏi</b> (fatigue): vết nứt lan dần qua hàng nghìn chu kỳ, để lại <b>vân vỏ sò (beach marks)</b> mịn, bắt đầu từ chỗ tập trung ứng suất (toe, lỗ, khía) và vùng gãy cuối thô; <b>giòn</b> (brittle): gãy đột ngột, mặt phẳng lấp lánh, <b>vân chữ V (chevron)</b> chỉ ngược về điểm khởi đầu, gần như không biến dạng, hay ở nhiệt độ thấp; <b>dẻo</b> (ductile): thắt lại, mép xé 45°, mặt xơ xám; <b>rão</b> (creep): nhiệt cao lâu ngày, biến dạng chậm, lỗ rỗng biên hạt. Hàn sửa là "phẫu thuật": phải <b>biết nguyên nhân</b> trước khi vá, nếu không vết nứt quay lại.',
 traps: [
  'Chevron (vân chữ V) <b>chỉ về điểm khởi phát</b> — không chỉ hướng lan. Beach marks là mỏi; chevron là giòn. Đề cho mô tả mặt gãy → nhận dạng kiểu phá hủy.',
  'Mỏi bắt đầu ở <b>tập trung ứng suất</b>: chân mối hàn (toe), cháy chân, lồi quá cao, lệch mép, vết mồi hồ quang. Giảm mỏi: <b>mài mịn chuyển tiếp toe</b>, biên dạng lõm, loại bỏ khuyết tật phẳng, không được "đắp thêm cho khỏe".',
  'Gãy giòn cần: <b>khía/khuyết tật + ứng suất kéo + vật liệu độ dai thấp (nhiệt độ thấp, hạt thô, dày)</b>. Charpy thấp & ứng suất dư cao (không PWHT) là tổ hợp nguy hiểm.',
  'Hàn sửa <b>khó hơn hàn mới</b>: vật liệu đã qua vận hành (bẩn, nhiễm, ăn mòn, có H/hydro-carbon), ràng buộc cao → ứng suất dư lớn → tiền nhiệt cao hơn, que basic bắt buộc, nguy cơ HICC cao; cần <b>WPS sửa chữa riêng</b> được duyệt và giới hạn số lần sửa.',
  'Quy trình sửa: xác định bằng NDT → <b>đào bỏ (mài/dũi) toàn bộ</b> → <b>MT/PT xác nhận hết khuyết tật</b> → chuẩn bị rãnh (hình dạng dễ hàn, không quá sâu-hẹp) → hàn theo WPS sửa → NDT lại <b>cả vùng lân cận</b> → ghi hồ sơ.',
  'Chi phí sửa gấp ~<b>10 lần</b> hàn mới; nhiều lần sửa tại một chỗ làm HAZ tích lũy, độ dai giảm → spec thường giới hạn <b>2 lần</b> sửa cùng vị trí.',
  'Ăn mòn ứng suất (SCC) = ứng suất kéo + môi trường đặc thù (clorua với inox austenit, H₂S với thép) → nứt phân nhánh; không phải mỏi.'
 ],
 numbers: [
  'Dấu hiệu: mỏi – beach marks + vùng gãy cuối thô · giòn – chevron, phẳng, lấp lánh, ít biến dạng · dẻo – thắt, shear lip 45°, xơ xám · rão – nhiệt cao, lỗ rỗng biên hạt · SCC – nứt phân nhánh.',
  'Mỏi: khởi tại toe/khuyết tật bề mặt; cải thiện bằng mài toe, TIG dressing, hammer peening, biên dạng lõm.',
  'Sửa chữa: đào bỏ → MT/PT (100%) → rãnh góc mở ≥ 10–15° thành, đáy tròn → hàn WPS sửa (tiền nhiệt ≥ WPS gốc) → NDT vùng sửa + 50–100 mm lân cận.',
  'Giới hạn sửa phổ biến: ≤ 2 lần tại cùng vị trí; chi phí ≈ 10× hàn mới.',
  'Gãy giòn: nhiệt độ dưới chuyển tiếp Charpy; thép dày, hạt thô, ứng suất dư cao, tốc độ tải cao.'
 ],
 mnemonic: '"Sò là mỏi – V là giòn – Thắt là dẻo": đọc mặt gãy trước, tìm nguyên nhân, rồi mới sửa. Sửa phải đào sạch, MT xác nhận, WPS riêng, NDT lại.',
 ideas: [
  {h_vi:'🎓 Vì sao vết nứt quay lại đúng chỗ cũ sau khi sửa', h_en:'Why cracks come back at the same spot after repair',
   body:[
    {vi:'Ba lý do kinh điển: <b>(1) chưa đào hết</b> — đáy vết nứt còn sót vài mm, hàn phủ lên nó thành "nứt chôn"; <b>(2) chưa trị nguyên nhân</b> — mỏi do rung, lệch mép, tập trung ứng suất vẫn còn thì vật liệu mới cũng nứt; <b>(3) sửa làm tình hình xấu hơn</b> — rãnh sửa sâu-hẹp, ràng buộc lớn, không tiền nhiệt → HICC ngay trong mối hàn sửa. Vì vậy quy trình sửa luôn có <b>MT/PT sau đào</b> và <b>WPS sửa riêng</b> khắt khe hơn.', en:'Repairs fail when excavation is incomplete, the root cause (vibration, misalignment, stress raiser) persists, or the repair itself is high-restraint and under-preheated.'},
    {vi:'Thanh tra trong hàn sửa: xem <b>báo cáo NDT trước</b> để biết kích thước & vị trí, chứng kiến <b>đào + MT/PT</b>, kiểm rãnh sửa bằng dưỡng, kiểm tiền nhiệt & que basic, NDT sau sửa mở rộng ra vùng lân cận, và ghi "vị trí này đã sửa lần thứ mấy".', en:'Inspector: review prior NDT, witness excavation and MT/PT, gauge the repair groove, check preheat and basic electrodes, extend NDT to adjacent areas, log the repair count.'}
   ]}
 ]
};

/* ---------- gắn ý giảng bổ sung vào DATA để tab Bài học cũng thấy ---------- */
try{
  if (typeof DATA !== 'undefined' && DATA.chapters){
    Object.keys(X).forEach(function(ci){
      var c = DATA.chapters[ci]; if (!c || !X[ci].ideas) return;
      c.deep = c.deep || [];
      X[ci].ideas.forEach(function(b){ if (!c.deep.some(function(d){ return d.h_vi === b.h_vi; })) c.deep.push(b); });
    });
  }
}catch(e){}
window.GB_EXTRA = X;
})();
