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

/* ========== ĐỢT 2 (vá nốt 8% câu hỏi còn thiếu nền) ========== */

/* --- Ch: Processes — hồ quang, TIG, CTWD --- */
add(ch('processes'), [
{t_vi:"Kéo dài hồ quang — hậu quả", t_en:"Lengthening the arc — effects",
 vi:"Hồ quang dài hơn → điện áp TĂNG, dòng giảm nhẹ → hồ quang kém ổn định, khí bảo vệ kém (không khí lọt vào), nhiều bắn tóe, dễ rỗ khí, mối hàn rộng và phẳng hơn, ngấu giảm. Đề rất hay hỏi: 'lengthening the arc' → tăng voltage.",
 en:"Longer arc → voltage INCREASES, slight current drop → unstable arc, poorer gas shielding (air entrainment), more spatter, porosity risk, wider flatter bead, less penetration. Exam favourite: lengthening arc → higher arc voltage."},
{t_vi:"TIG: pre-flow, post-flow, mồi HF vs quẹt", t_en:"TIG: pre-flow, post-flow, HF vs scratch start",
 vi:"PRE-FLOW: xả khí trước khi mồi để đuổi không khí khỏi chụp khí. POST-FLOW: duy trì khí sau khi tắt hồ quang để bảo vệ vũng hàn và ĐIỆN CỰC đang nguội (chống oxy hóa vonfram). Mồi HF (cao tần): không chạm — không ngậm vonfram; nhược điểm: nhiễu điện tử thiết bị xung quanh. Mồi quẹt (scratch): dễ ngậm vonfram vào mối hàn.",
 en:"PRE-FLOW purges air from the nozzle before arc start. POST-FLOW shields the cooling pool AND tungsten after arc stop (prevents oxidation). HF start: no touch — no tungsten inclusion; drawback: electrical interference. Scratch start risks tungsten inclusion."},
{t_vi:"CTWD — khoảng cách bép tới vật hàn", t_en:"CTWD (contact tip to work distance)",
 vi:"MIG/MAG: khoảng cách từ bép tiếp điện đến bề mặt vật hàn = phần dây nhô + chiều dài hồ quang. CTWD TĂNG → điện trở dây tăng → dòng GIẢM → ngấu giảm; CTWD giảm → dòng tăng. Đây là cách máy CV tự điều chỉnh.",
 en:"MIG/MAG: distance from contact tip to workpiece = stick-out + arc length. Longer CTWD → more wire resistance → current DROPS → less penetration; shorter CTWD → current rises. This is how the self-adjusting CV arc works."},
{t_vi:"Hàn autogenous (không dây phụ)", t_en:"Autogenous weld",
 vi:"Mối hàn TIG/plasma/laser KHÔNG dùng kim loại điền đầy — chỉ nung chảy hai mép và để tự liền. Chỉ phù hợp tấm mỏng; rủi ro lõm bề mặt và nứt kết tinh cao hơn vì không có kim loại bù.",
 en:"A fusion weld made WITHOUT filler metal (TIG/plasma/laser) — the edges melt and fuse. Thin sections only; higher risk of underfill and solidification cracking as no filler compensates."}
]);

/* --- Ch: Consumables — ISO 2560, ISO 14175 --- */
add(ch('consumables'), [
{t_vi:"Đọc ký hiệu que ISO 2560-A: E 35 4 B", t_en:"ISO 2560-A electrode designation (E 35 4 B)",
 vi:"E = que hàn hồ quang tay; 35 = giới hạn chảy tối thiểu 350 MPa; số tiếp = độ dai va đập: 4 nghĩa là đạt 47J ở −40°C (0=+20°C, 2=−20°C, 4=−40°C, 6=−60°C); chữ cuối = vỏ bọc: A=axit, C=xenlulo, R=rutil, RR=rutil dày, B=bazơ. Khác AWS: AWS E70xx tính theo độ bền kéo (ksi), ISO tính theo giới hạn chảy (MPa).",
 en:"E = MMA electrode; 35 = min yield 350 MPa; next digit = impact toughness temperature for 47J (4 = −40°C); final letter = covering: A acid, C cellulosic, R rutile, RR thick rutile, B basic. Note: AWS classifies by UTS in ksi; ISO by YIELD in MPa."},
{t_vi:"Ký hiệu khí bảo vệ ISO 14175", t_en:"ISO 14175 shielding gas groups",
 vi:"Nhóm I = khí trơ (I1 argon, I2 heli, I3 Ar+He — VD 'I3 ArHe'); nhóm M1/M2/M3 = hỗn hợp oxy hóa nhẹ→mạnh (Ar + CO2/O2, VD M12 = Ar + 0,5–5% CO2, có thể thêm He → 'M12 HeArC'); C = CO2 thuần; R = khử (có H2). Argon là khí TRƠ vì lớp vỏ điện tử ngoài cùng đã bão hòa — không phản ứng hóa học với kim loại nóng chảy.",
 en:"Group I = inert (I1 Ar, I2 He, I3 Ar+He); M1–M3 = increasingly oxidising mixtures (M12 = Ar + 0.5–5% CO2, may contain He); C = pure CO2; R = reducing. Argon is INERT because its outer electron shell is full — it cannot react with the molten metal."},
{t_vi:"Khí cho hàn trần & vật liệu đặc biệt", t_en:"Gas choice: overhead & stainless",
 vi:"Hàn trần thường ưu tiên hỗn hợp giàu ARGON (nặng hơn không khí nhưng cho hồ quang ổn định, vũng hàn nhỏ dễ khống chế). Thép không gỉ: TIG dùng Ar; MAG dùng Ar + 1–2% O2/CO2 (không dùng CO2 thuần — tăng cacbon). NDT tối ưu cho inox austenit: PT (thấm màu) + RT/UT — KHÔNG dùng MPI vì austenit không nhiễm từ.",
 en:"Overhead welding favours argon-rich mixtures (stable arc, small controllable pool). Stainless: TIG pure Ar; MAG Ar + 1–2% O2/CO2 (never pure CO2 — carbon pickup). For austenitic stainless, use PT + RT/UT — MPI is impossible (non-magnetic austenite)."}
]);

/* --- Ch: NDT — nguyên lý MPI, MT vs PT, RT vs UT --- */
add(ch('non-destructive'), [
{t_vi:"Nguyên lý MPI: rò rỉ từ thông", t_en:"MPI principle: magnetic flux leakage",
 vi:"Từ hóa chi tiết → khuyết tật NẰM NGANG đường sức từ làm từ thông 'rò' ra bề mặt → bột từ bám vào chỗ rò tạo chỉ thị. Chỉ dùng cho vật liệu SẮT TỪ (thép ferit); phát hiện khuyết tật bề mặt và ngay sát bề mặt. Khuyết tật song song đường sức → không hiện → phải từ hóa 2 hướng.",
 en:"Magnetise the part → a defect ACROSS the flux lines causes flux LEAKAGE at the surface → magnetic particles gather at the leak. Ferromagnetic materials only; finds surface and slightly sub-surface defects. Defects parallel to flux don't show → magnetise in two directions."},
{t_vi:"MT vs PT — chọn cái nào?", t_en:"MT vs PT — which to choose?",
 vi:"Trên thép sắt từ, MT thường NHANH và NHẠY hơn PT với nứt hẹp (kể cả nứt bị bịt nhẹ bề mặt), ít phụ thuộc làm sạch. PT 'phổ dụng' hơn vì dùng được cho MỌI vật liệu không xốp (inox austenit, nhôm, đồng) nhưng chỉ thấy khuyết tật HỞ ra bề mặt và cần bề mặt rất sạch.",
 en:"On ferritic steel, MT is faster and more sensitive to tight cracks (even slightly bridged ones) and tolerates surface condition better. PT is more UNIVERSAL — any non-porous material (austenitic SS, aluminium) — but only shows defects OPEN to the surface and needs a very clean surface."},
{t_vi:"RT vs UT — ưu nhược điểm", t_en:"RT vs UT — pros & cons",
 vi:"RT: cho ảnh lưu hồ sơ, giỏi khuyết tật KHỐI (rỗ, ngậm xỉ); NHƯỢC: nguy hiểm phóng xạ, kém với khuyết tật PHẲNG (nứt, không ngấu) nếu không thẳng hướng tia, khó đo chiều sâu khuyết tật, chậm và đắt. UT: giỏi khuyết tật phẳng, đo được độ sâu, an toàn; nhược: phụ thuộc tay nghề, khó với vật liệu hạt thô/mỏng, hồ sơ kém trực quan (trừ PAUT).",
 en:"RT: permanent image record, good for VOLUMETRIC defects; CONS: radiation hazard, poor for PLANAR defects unless aligned with the beam, no depth sizing, slow, costly. UT: excellent for planar defects, gives depth, safe; cons: operator-dependent, hard on coarse-grain/thin material, poorer record (unless PAUT)."},
{t_vi:"RT không phát hiện được gì?", t_en:"What RT misses",
 vi:"Khuyết tật phẳng vuông góc chiều dày nhưng LỆCH hướng tia: nứt mảnh, không ngấu thành rãnh, tách lớp (lamination — nằm ngang, gần như vô hình với RT). Ghi nhớ: lamination → dùng UT; nứt bề mặt → MT/PT.",
 en:"Planar defects mis-aligned with the beam: tight cracks, lack of sidewall fusion, and LAMINATIONS (lying parallel to the plate surface — nearly invisible to RT). Remember: laminations → UT; surface cracks → MT/PT."}
]);

/* --- Ch: Metallurgy — hot shortness, nguyên tố hợp kim --- */
add(ch('materials'), [
{t_vi:"Hot shortness (giòn nóng)", t_en:"Hot shortness",
 vi:"Hiện tượng kim loại bị GIÒN Ở NHIỆT ĐỘ CAO do tạp chất điểm chảy thấp (chủ yếu LƯU HUỲNH tạo FeS) nằm ở biên hạt — khi kết tinh, màng lỏng này bị ứng suất co ngót xé ra → nứt kết tinh (nứt nóng). Mangan 'giải cứu' bằng cách tạo MnS vô hại; vì thế tỷ lệ Mn/S quan trọng.",
 en:"Brittleness AT HIGH TEMPERATURE caused by low-melting-point impurity films (mainly sulphur as FeS) at grain boundaries — shrinkage stress tears the liquid film → solidification (hot) cracking. Manganese counters it by forming harmless MnS; hence the Mn/S ratio matters."},
{t_vi:"Tác dụng các nguyên tố hợp kim", t_en:"Alloying elements & their effects",
 vi:"C: tăng bền/cứng, tăng nguy cơ nứt nguội. Mn: bền + dai, khử S. Si: khử oxy. Cr: chống ăn mòn, chịu nhiệt (≥12% → không gỉ). Ni: tăng độ dai (nhất là nhiệt độ thấp), ổn định austenit. Mo: bền nhiệt, chống dão, chống rỗ ăn mòn. V/Nb/Ti: làm mịn hạt. S, P: tạp chất có hại (giòn nóng, giòn nguội).",
 en:"C: strength/hardness but cold-crack risk. Mn: strength + toughness, ties up S. Si: deoxidiser. Cr: corrosion & heat resistance (≥12% → stainless). Ni: toughness (esp. low temp), austenite stabiliser. Mo: creep & pitting resistance. V/Nb/Ti: grain refiners. S, P: harmful impurities."}
]);

/* --- Ch: Joint design — J-groove, mối hàn hỗn hợp --- */
add(ch('joint'), [
{t_vi:"Rãnh chữ J & góc vát điển hình", t_en:"J-groove geometry",
 vi:"Rãnh J: vát một phía dạng cong, góc vát nhỏ (thường 10–20°/phía) + bán kính đáy ~5–10 mm → tốn ít kim loại đắp hơn chữ V ở tấm dày, nhưng gia công đắt (phải phay). So sánh: V đơn thường 60–70° góc rãnh (30–35°/phía); U đôi/J dùng cho tấm dày để giảm co ngót và vật liệu hàn.",
 en:"J-prep: curved single-side bevel, small bevel angle (typically 10–20°) + root radius ~5–10 mm → less weld metal than a V on thick plate, but costly machining. Compare: single-V included angle usually 60–70°; U/J preps suit thick sections to cut shrinkage and consumables."},
{t_vi:"Mối hàn hỗn hợp (compound weld)", t_en:"Compound weld",
 vi:"Mối hàn kết hợp GIÁP MỐI + GÓC trên cùng một liên kết — điển hình: liên kết chữ T ngấu hoàn toàn có vát mép, sau đó phủ thêm lớp hàn góc hai bên. Chiều cao tính toán lấy theo tiết diện tổng.",
 en:"A weld combining BUTT + FILLET in one joint — typically a bevelled full-penetration T-joint finished with fillet reinforcement each side. Design throat considers the combined section."}
]);

/* --- Ch: Thermal cutting — dũi hồ quang khí nén --- */
add(ch('cutting'), [
{t_vi:"Dũi carbon khí nén: dòng & nguyên lý", t_en:"Air-arc gouging: current & principle",
 vi:"Dùng điện cực CARBON (bọc đồng) + hồ quang nung chảy kim loại, KHÍ NÉN thổi bay kim loại lỏng. Dòng: DC điện cực DƯƠNG (DCEP) — electron đi từ vật hàn vào điện cực, ion dương bắn vào vật hàn tạo nhiệt tập trung. Sau dũi trên thép hợp kim/C cao phải MÀI sạch lớp thấm cacbon trước khi hàn.",
 en:"A copper-coated CARBON electrode melts the metal; COMPRESSED AIR blows it away. Current: DC electrode POSITIVE (DCEP). After gouging alloy/high-C steel, GRIND off the carburised layer before welding."}
]);

/* --- Ch: Heat treatment — giảm preheat --- */
add(ch('heat treatment'), [
{t_vi:"Giảm preheat thì sao?", t_en:"Effect of decreasing preheat",
 vi:"Preheat giảm → tốc độ nguội TĂNG → HAZ cứng hơn (dễ tạo mactenxit) + hydro ít thời gian thoát ra → nguy cơ NỨT NGUỘI DO HYDRO tăng mạnh. Đây là đáp án chuẩn cho mọi câu 'preheat decreased/what happens'.",
 en:"Lower preheat → FASTER cooling → harder HAZ (martensite risk) + less time for hydrogen to escape → much higher risk of HYDROGEN COLD CRACKING. Standard answer for every 'preheat decreased' question."}
]);

/* --- Ch: Codes & Docs — work pack --- */
add(ch('codes'), [
{t_vi:"Work pack (bộ hồ sơ công việc)", t_en:"Work pack",
 vi:"Bộ tài liệu phát cho một hạng mục hàn: bản vẽ, WPS áp dụng, chứng chỉ vật liệu, yêu cầu NDT, ITP, biểu mẫu nghiệm thu. Thanh tra hàn phải đối chiếu công việc thực tế với TOÀN BỘ work pack — đề thi CSWIP có nguyên phần 'Work Pack Exam' kiểm tra kỹ năng tra cứu này.",
 en:"The document set issued for a welding task: drawings, applicable WPSs, material certs, NDT requirements, ITP, acceptance forms. The inspector must verify the work against the WHOLE work pack — CSWIP has a dedicated Work Pack Exam testing this cross-referencing skill."}
]);
})();
