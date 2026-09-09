/* ============================================================
   DATA_EXTRA — Bài học bổ sung theo phân tích độ phủ đề thi
   (các chủ đề đề thi hỏi nhưng bài học gốc chưa dạy, 2026-09-09)
   Nạp NGAY SAU data.js — tự tìm chương theo tên EN rồi push lessons.
   ============================================================ */
(function(){
if (typeof DATA === 'undefined' || !DATA.chapters) return;
function ch(sub){ return DATA.chapters.find(function(c){ return (c.en||'').toLowerCase().indexOf(sub) !== -1; }); }
function add(c, arr){ if (c && c.lessons) c.lessons.push.apply(c.lessons, arr); }

/* --- Ch: Welding Processes — nguồn hàn & biến số MIG/MAG --- */
add(ch('processes'), [
{t_vi:"Nguồn hàn: biến áp / chỉnh lưu / inverter", t_en:"Power sources: transformer / rectifier / inverter",
 vi:"Biến áp (transformer) hạ điện áp lưới xuống điện áp hàn an toàn, cho ra AC. Chỉnh lưu (rectifier) thêm bộ diode để đổi AC→DC. Inverter nhẹ, hiệu suất cao, điều khiển chính xác. Đề hay hỏi: transformer cho AC, transformer-rectifier cho cả AC/DC.",
 en:"A transformer steps mains voltage down to a safe welding voltage (AC output). A rectifier converts AC to DC. Inverters are light, efficient, precise. Exam point: transformer = AC; transformer-rectifier = AC and DC."},
{t_vi:"Inductance (điện cảm) trong MIG/MAG", t_en:"Inductance in MIG/MAG dip transfer",
 vi:"Điện cảm làm chậm tốc độ tăng dòng khi ngắn mạch. TĂNG inductance → hồ quang mềm hơn, ít bắn tóe, vũng hàn lỏng hơn, bề mặt phẳng hơn. Giảm inductance → ngắn mạch nhanh, nhiều bắn tóe. Chỉ có ý nghĩa ở chế độ dip transfer.",
 en:"Inductance slows the rate of current rise during each short circuit. INCREASING inductance → smoother arc, less spatter, more fluid pool, flatter bead. Only significant in dip (short-circuit) transfer."},
{t_vi:"Run-out length (chiều dài đường hàn/1 que)", t_en:"Run-out length (ROL)",
 vi:"Chiều dài đường hàn đắp được từ một que hàn (hoặc một đoạn que quy định). Dùng để KIỂM SOÁT NHIỆT LƯỢNG khi không đo được dòng/tốc độ trực tiếp: ROL ngắn = đắp dày = nhiệt vào cao; ROL dài = nhiệt vào thấp. Một số WPS cũ ghi ROL thay cho travel speed.",
 en:"The length of weld deposited from one electrode (or a set electrode length). Used to CONTROL HEAT INPUT indirectly: short ROL = high heat input, long ROL = low heat input. Some WPSs specify ROL instead of travel speed."},
{t_vi:"Deposition rate (tốc độ đắp)", t_en:"Deposition rate",
 vi:"Khối lượng kim loại đắp được trong một đơn vị thời gian (kg/h). Thứ tự thường gặp: SAW > FCAW > MIG/MAG > MMA > TIG. Tăng dòng điện hoặc tăng phần dây nhô (stick-out) → tăng tốc độ đắp.",
 en:"Mass of weld metal deposited per unit time (kg/h). Typical ranking: SAW > FCAW > MIG/MAG > MMA > TIG. Higher current or longer electrode stick-out → higher deposition rate."}
]);

/* --- Ch: Consumables — đọc ký hiệu que hàn AWS --- */
add(ch('consumables'), [
{t_vi:"Đọc ký hiệu que AWS: E7018, E7016, E7010", t_en:"AWS electrode classification (E7018 etc.)",
 vi:"E = electrode; 70 = độ bền kéo tối thiểu 70 ksi (~485 MPa); số thứ 3: 1 = hàn mọi tư thế, 2 = chỉ sấp/ngang; số cuối: loại vỏ bọc + dòng điện — 0/1 = xenlulo (ngấu sâu), 2/3/4 = rutil, 5/6/8 = bazơ hydro thấp. VD: E7018 = 70 ksi, mọi tư thế, vỏ bazơ có bột sắt.",
 en:"E = electrode; 70 = min UTS 70 ksi (~485 MPa); 3rd digit: 1 = all positions, 2 = flat/HV only; last digit = coating/current — 0/1 cellulosic (deep penetration), 2/3/4 rutile, 5/6/8 basic low-hydrogen. E7018 = 70 ksi, all-positional, iron-powder basic."},
{t_vi:"Lưu lượng khí bảo vệ", t_en:"Shielding gas flow rate",
 vi:"MIG/MAG, TIG thường ~8–15 l/min tùy chụp khí và gió. Lưu lượng QUÁ THẤP → không khí lọt vào → rỗ khí. QUÁ CAO → cuộn xoáy hút không khí vào vũng hàn → cũng gây rỗ. Ngoài trời phải chắn gió (gió >~5 km/h thổi bay khí bảo vệ).",
 en:"Typically ~8–15 l/min. TOO LOW → air entrainment → porosity. TOO HIGH → turbulence draws air into the pool → also porosity. Outdoors, wind shielding is essential."}
]);

/* --- Ch: Destructive Testing — gối uốn --- */
add(ch('destructive'), [
{t_vi:"Gối uốn (former) trong thử uốn", t_en:"Bend test former",
 vi:"Mẫu uốn được ép quanh một gối uốn (former) có đường kính quy định — thường 4t (4 lần chiều dày mẫu) cho thép C-Mn, góc uốn 120–180°. Đường kính former nhỏ hơn = thử khắc nghiệt hơn. Sau uốn kiểm tra mặt chịu kéo: khuyết tật mở ra >3 mm thường bị loại.",
 en:"The bend specimen is bent around a FORMER of specified diameter — commonly 4t for C-Mn steel, through 120–180°. Smaller former = more severe test. After bending, inspect the tension face; openings >3 mm typically reject."}
]);

/* --- Ch: Heat Treatment — tôi & ram --- */
add(ch('heat treatment'), [
{t_vi:"Tôi (quenching) & Ram (tempering)", t_en:"Quenching & tempering",
 vi:"TÔI: nung lên vùng austenit rồi làm nguội NHANH (nước/dầu) → tạo mactenxit rất cứng nhưng giòn. RAM: nung lại 550–700°C sau tôi → giảm độ cứng, tăng độ dai. Thép Q&T (tôi + ram) có cơ tính cao; khi hàn phải cẩn thận vì nhiệt hàn có thể phá hỏng tổ chức đã ram (không PWHT quá nhiệt độ ram gốc).",
 en:"QUENCHING: heat into austenite range then cool FAST (water/oil) → hard but brittle martensite. TEMPERING: reheat to 550–700°C → restores toughness, lowers hardness. For Q&T steels, welding heat can degrade the tempered structure — PWHT must stay below the original tempering temperature."}
]);

/* --- Ch: Health & Safety — COSHH, khói kim loại --- */
add(ch('safety'), [
{t_vi:"COSHH — kiểm soát chất độc hại", t_en:"COSHH regulations",
 vi:"COSHH (Control of Substances Hazardous to Health — luật Anh) yêu cầu NGƯỜI SỬ DỤNG LAO ĐỘNG phải đánh giá rủi ro, kiểm soát phơi nhiễm (thông gió, hút khói, PPE), thông tin/huấn luyện người lao động về các chất độc hại — gồm khói hàn, thuốc hàn, dung môi tẩy.",
 en:"COSHH (UK) requires the EMPLOYER to assess risks, control exposure (ventilation, fume extraction, PPE) and inform/train workers about hazardous substances — including welding fume, fluxes and degreasing solvents."},
{t_vi:"Khói kim loại nguy hiểm: cadmium, kẽm, chì", t_en:"Toxic metal fumes: cadmium, zinc, lead",
 vi:"Hàn/cắt vật liệu mạ hoặc phủ sinh khói kim loại độc: CADMIUM (mạ chống gỉ) — rất độc, có thể tử vong; KẼM (thép mạ kẽm) — sốt khói kim loại; CHÌ (sơn cũ) — nhiễm độc tích lũy. Phải làm sạch lớp phủ trước khi hàn + hút khói cục bộ.",
 en:"Welding/cutting coated materials releases toxic fume: CADMIUM plating — highly toxic, can be fatal; ZINC (galvanised) — metal fume fever; LEAD paint — cumulative poisoning. Remove coatings before welding and use local fume extraction."}
]);

/* --- Ch: Terms — ký hiệu tư thế ISO --- */
add(ch('terms'), [
{t_vi:"Ký hiệu tư thế ISO 6947: PA→PG, J-L045, H-L045", t_en:"ISO 6947 position codes",
 vi:"PA = sấp (bằng); PB = góc ngang; PC = ngang; PD = góc trần; PE = trần; PF = hàn LEO (lên); PG = hàn TỤT (xuống). Ống nghiêng 45°: H-L045 = nghiêng hàn LÊN; J-L045 = nghiêng hàn XUỐNG. Đề WPS hay hỏi: 'all positions except PG and J-L045' nghĩa là loại các tư thế hàn tụt.",
 en:"PA flat; PB horizontal-vertical fillet; PC horizontal; PD overhead fillet; PE overhead; PF vertical UP; PG vertical DOWN. 45° inclined pipe: H-L045 = inclined upwards; J-L045 = inclined DOWNWARDS. 'All positions except PG and J-L045' = downward progressions excluded."}
]);

/* --- Ch: Codes & Docs — work pack --- */
add(ch('codes'), [
{t_vi:"Work pack (bộ hồ sơ công việc)", t_en:"Work pack",
 vi:"Bộ tài liệu phát cho một hạng mục hàn: bản vẽ, WPS áp dụng, chứng chỉ vật liệu, yêu cầu NDT, ITP, biểu mẫu nghiệm thu. Thanh tra hàn phải đối chiếu công việc thực tế với TOÀN BỘ work pack — đề thi CSWIP có nguyên phần 'Work Pack Exam' kiểm tra kỹ năng tra cứu này.",
 en:"The document set issued for a welding task: drawings, applicable WPSs, material certs, NDT requirements, ITP, acceptance forms. The inspector must verify the work against the WHOLE work pack — CSWIP has a dedicated Work Pack Exam testing this cross-referencing skill."}
]);
})();
