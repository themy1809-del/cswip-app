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

/* ========== ĐỢT 3 (đối chiếu giáo trình 637 trang) ========== */

add(ch('processes'), [
{t_vi:"FCAW: dây tự bảo vệ vs dây dùng khí", t_en:"FCAW: self-shielded vs gas-shielded (Innershield/Outershield)",
 vi:"Dây lõi thuốc GAS-SHIELDED ('Outershield'): cần khí bảo vệ ngoài (CO2/hỗn hợp), cơ tính tốt, dùng trong xưởng. Dây SELF-SHIELDED ('Innershield'): thuốc trong lõi tự sinh khí + xỉ bảo vệ, KHÔNG cần chai khí → hợp công trường có gió; nhược: nhiều khói, ngoại quan kém hơn.",
 en:"GAS-SHIELDED flux-cored wire ('Outershield') needs external gas — better properties, shop use. SELF-SHIELDED wire ('Innershield') generates its own shielding from core ingredients — no gas bottle, ideal for windy site work; drawbacks: more fume, rougher appearance."},
{t_vi:"Các biến thể SAW & ưu điểm", t_en:"SAW variants & advantages",
 vi:"SAW ưu điểm: tốc độ đắp rất cao, ngấu sâu, không hồ quang hở (an toàn tia), ít khói, chất lượng đều. Biến thể tăng năng suất: TANDEM (2+ dây, 2 nguồn riêng), TWIN-WIRE (2 dây chung 1 nguồn), thêm bột sắt vào thuốc. Hạn chế: chủ yếu tư thế sấp/ngang, không nhìn thấy vũng hàn.",
 en:"SAW pros: very high deposition, deep penetration, no visible arc, little fume, consistent quality. Productivity variants: TANDEM (2+ wires, separate power sources), TWIN-WIRE (2 wires, one source), iron-powder flux additions. Limits: flat/horizontal mainly, pool not visible."},
{t_vi:"Kết thúc hồ quang & xử lý sự cố MMA", t_en:"Terminating the arc & MMA troubleshooting",
 vi:"Kết thúc đường hàn phải ĐIỀN ĐẦY HÕM CUỐI (dừng từ từ/quay ngược lại) — ngắt đột ngột gây crater pipe/nứt hõm. Sự cố MMA thường gặp: hồ quang thổi lệch (arc blow — do từ trường, đổi sang AC/dời kẹp mát), que dính (dòng thấp/hồ quang ngắn), bắn tóe nhiều (dòng cao/hồ quang dài/que ẩm).",
 en:"Always FILL THE CRATER when terminating (pause/step back) — abrupt stops cause crater pipes/cracks. Common MMA troubles: arc blow (magnetic — switch to AC or move the return clamp), electrode sticking (low current/short arc), heavy spatter (high current/long arc/damp electrodes)."}
]);

add(ch('materials'), [
{t_vi:"Weldability (tính hàn) là gì", t_en:"Weldability — definition",
 vi:"Khả năng của vật liệu được hàn bằng quy trình thông thường mà VẪN GIỮ được cơ tính và không nứt. Tính hàn giảm khi: C và CEV cao, chiều dày lớn (combined thickness — hiệu ứng nguội nhanh của tổng các đường thoát nhiệt), độ kìm hãm cao, tạp chất S/P cao. Thép HSLA cũng có thể nứt hydro trong KIM LOẠI HÀN chứ không chỉ HAZ.",
 en:"The ability of a material to be welded by normal processes and RETAIN its properties without cracking. Weldability drops with: higher C/CEV, greater combined thickness (more heat-sink paths = faster cooling), high restraint, high S/P. In HSLA steels hydrogen cracking can occur in the WELD METAL, not just the HAZ."}
]);

add(ch('equipment'), [
{t_vi:"Giám sát thông số hàn (PAMS)", t_en:"Monitoring welding parameters (PAMS)",
 vi:"Thanh tra kiểm tra thông số bằng: ampe kìm (tong tester) kẹp quanh cáp đo dòng, vôn kế đo càng gần hồ quang càng tốt, đồng hồ bấm giờ + thước đo tốc độ hàn, PAMS (thiết bị giám sát hồ quang di động) ghi đồng thời A/V/tốc độ. Thiết bị đo cũng phải được HIỆU CHUẨN định kỳ.",
 en:"Verify parameters with: tong tester (clamp meter) round the cable for current, voltmeter measured as near the arc as possible, stopwatch + rule for travel speed, or PAMS (Portable Arc Monitoring System) logging A/V/speed together. The measuring kit itself must be CALIBRATED."}
]);

add(ch('joint'), [
{t_vi:"Sai lệch gá lắp (set-up irregularities)", t_en:"Set-up irregularities",
 vi:"Kiểm tra TRƯỚC khi hàn: lệch mép (hi-lo), khe hở đáy sai (rộng → cháy thủng, hẹp → không thấu), góc vát sai, mặt đáy sai, đính hàn nứt/sai vị trí, bề mặt bẩn (dầu/gỉ/sơn), sai vật liệu. Phát hiện ở khâu fit-up rẻ hơn nhiều so với sửa sau khi hàn.",
 en:"Check at fit-up BEFORE welding: linear misalignment (hi-lo), wrong root gap (wide → burn-through, tight → lack of penetration), wrong bevel angle or root face, cracked/misplaced tacks, contamination (oil/rust/paint), wrong material. Catching these at fit-up is far cheaper than repairing welds."}
]);

/* --- Ch: Codes & Docs — work pack --- */
add(ch('codes'), [
{t_vi:"Work pack (bộ hồ sơ công việc)", t_en:"Work pack",
 vi:"Bộ tài liệu phát cho một hạng mục hàn: bản vẽ, WPS áp dụng, chứng chỉ vật liệu, yêu cầu NDT, ITP, biểu mẫu nghiệm thu. Thanh tra hàn phải đối chiếu công việc thực tế với TOÀN BỘ work pack — đề thi CSWIP có nguyên phần 'Work Pack Exam' kiểm tra kỹ năng tra cứu này.",
 en:"The document set issued for a welding task: drawings, applicable WPSs, material certs, NDT requirements, ITP, acceptance forms. The inspector must verify the work against the WHOLE work pack — CSWIP has a dedicated Work Pack Exam testing this cross-referencing skill."}
]);
/* ========== GIẢNG GIẢI THEO ĐỀ THI (đợt 1: Khuyết tật hàn) ==========
   Viết từ giáo trình 637 trang + đối chiếu cách 510 câu đề thật hay hỏi.
   Đẩy vào chapter.deep → hiện trong mục "Phân tích chuyên sâu". */
function deep(c, arr){ if (c){ c.deep = c.deep || []; c.deep.push.apply(c.deep, arr); } }

deep(ch('defects'), [
{h_vi:"🎓 Cách đề thi hỏi về khuyết tật — đọc phần này trước",
 h_en:"🎓 How the exam asks about defects — read this first",
 body:[
 {vi:"Đề CSWIP gần như không bao giờ hỏi 'undercut là gì'. Nó hỏi theo 4 kiểu: (1) nguyên nhân nào gây ra khuyết tật X, (2) khuyết tật nào sinh ra từ điều kiện Y, (3) phương pháp NDT nào tìm được X, (4) X thuộc loại phẳng hay khối. Vì vậy với MỖI khuyết tật, bạn chỉ cần thuộc đúng 4 ô: là gì — do đâu — tìm bằng gì — xếp loại gì. Thuộc đủ 4 ô của ~10 khuyết tật chính là làm được phần lớn câu hỏi chương này.",
  en:"CSWIP rarely asks 'what is undercut'. It asks 4 ways: (1) which cause produces defect X, (2) which defect results from condition Y, (3) which NDT method finds X, (4) is X planar or volumetric. For EACH defect memorise 4 boxes: what — cause — detection — classification."},
 {vi:"Quy tắc xếp loại phải thuộc lòng: khuyết tật PHẲNG (nứt mọi loại, không ngấu, không thấu) là nguy hiểm nhất vì tạo điểm tập trung ứng suất sắc — tìm bằng UT (trong lòng) hoặc MT/PT (bề mặt). Khuyết tật KHỐI (rỗ khí, ngậm xỉ, ngậm vonfram) tròn tù, ít nguy hiểm hơn — RT tìm rất giỏi. Đề đảo qua đảo lại đúng ý này.",
  en:"Classification rule to memorise: PLANAR defects (all cracks, lack of fusion, lack of penetration) are most dangerous — sharp stress raisers — found by UT (internal) or MT/PT (surface). VOLUMETRIC defects (porosity, slag, tungsten inclusions) are blunt — RT excels at finding them."}]},

{h_vi:"🎓 Nứt nguội do hydro (HICC) — con bài tủ của đề thi",
 h_en:"🎓 Hydrogen cold cracking — the exam's favourite",
 body:[
 {vi:"Hình dung: khi hàn, hydro (từ hơi ẩm trong vỏ que, gỉ, dầu mỡ) hòa tan vào vũng hàn nóng chảy. Khi kim loại nguội và co lại, hydro bị 'nhốt' bên trong và chui vào các khe nguyên tử. Nếu vùng đó lại CỨNG (mactenxit trong HAZ) và đang chịu ỨNG SUẤT co ngót, các nguyên tử hydro gom lại thành áp lực đủ xé kim loại ra — thường 24–72 GIỜ SAU khi hàn xong. Vì vậy nó còn tên 'nứt trễ' và NDT phải chờ ít nhất 24–48h với thép dễ nứt.",
  en:"Picture it: hydrogen (from moisture in coatings, rust, grease) dissolves into the molten pool. On cooling the metal contracts and traps hydrogen, which migrates into lattice gaps. If that region is HARD (HAZ martensite) and under shrinkage STRESS, hydrogen accumulates until it tears the metal — typically 24–72 HOURS after welding. Hence 'delayed cracking', and NDT must wait 24–48h on susceptible steels."},
 {vi:"Đề thi hỏi đi hỏi lại: cần đủ 4 YẾU TỐ đồng thời — (1) hydro, (2) tổ chức cứng nhạy cảm (CEV cao, nguội nhanh), (3) ứng suất, (4) nhiệt độ dưới ~300°C. Bỏ được MỘT yếu tố là hết nứt → đó chính là logic của mọi biện pháp phòng: que bazơ sấy khô (bớt hydro), gia nhiệt trước + nhiệt lượng đủ (nguội chậm → bớt cứng, hydro kịp thoát), trình tự hàn hợp lý (bớt ứng suất).",
  en:"The exam loops on this: FOUR factors must coexist — (1) hydrogen, (2) susceptible hard microstructure (high CEV, fast cooling), (3) stress, (4) temperature below ~300°C. Remove ONE and no cracking — which is exactly why every prevention works: baked basic electrodes (less H), preheat + adequate heat input (slower cooling → softer HAZ, H escapes), sensible weld sequence (less stress)."}],
 rows:[
 {vi:"Bẫy hay gặp: 'nứt xảy ra ở đâu?' → HAZ là kinh điển, nhưng thép HSLA hiện đại có thể nứt ngay TRONG kim loại hàn.",
  en:"Common trap: 'where does it occur?' → classically HAZ, but in modern HSLA steels it can occur IN the weld metal."},
 {vi:"'Preheat giảm thì sao?' → nguội nhanh hơn → HAZ cứng hơn + hydro không kịp thoát → nguy cơ nứt TĂNG. Câu này xuất hiện ở cả 3 bộ đề.",
  en:"'Preheat decreased?' → faster cooling → harder HAZ + trapped hydrogen → HIGHER risk. Appears in all three exam sets."}]},

{h_vi:"🎓 Nứt nóng / nứt kết tinh — nhớ bằng Mn/S",
 h_en:"🎓 Hot / solidification cracking — remember via Mn/S",
 body:[
 {vi:"Hình dung: kim loại đông đặc từ hai mép rãnh vào giữa tâm. Tạp chất điểm chảy thấp (chủ yếu LƯU HUỲNH tạo FeS) bị 'đẩy' vào giữa, tạo một màng lỏng mỏng nằm đúng TÂM mối hàn khi mọi thứ xung quanh đã cứng. Ứng suất co ngót kéo hai bên → màng lỏng bị xé → nứt DỌC GIỮA TÂM, thường hở ra bề mặt. Vì xảy ra lúc còn nóng nên gọi là nứt nóng.",
  en:"Picture solidification advancing from both fusion faces to the centreline. Low-melting impurities (mainly SULPHUR as FeS) get pushed ahead, leaving a thin liquid film at the CENTRELINE when everything else is solid. Shrinkage pulls both sides → the film tears → a LONGITUDINAL CENTRELINE crack, often surface-breaking."},
 {vi:"Yếu tố làm nặng thêm mà đề hay gài: hàn dòng cao tạo mối hàn SÂU-HẸP (tỷ lệ sâu/rộng lớn) → màng tạp chất càng tập trung giữa tâm; độ kìm hãm lớn; thép nhiều S/P (thép dễ cắt gọt!). Phòng: chọn vật liệu hàn đủ MANGAN (Mn 'bắt' S thành MnS vô hại — nhớ tỷ lệ Mn/S), giảm dòng, mối hàn rộng hơn sâu.",
  en:"Aggravators the exam loves: high current giving DEEP-NARROW beads (high depth/width ratio) concentrates the film; high restraint; high-S/P steels (free-machining!). Prevention: enough MANGANESE in consumables (Mn ties S up as harmless MnS — the Mn/S ratio), lower current, width ≥ depth."}]},

{h_vi:"🎓 Không ngấu (LOF) vs không thấu (LOP) — đề rất thích đánh tráo",
 h_en:"🎓 Lack of fusion vs lack of penetration — the exam swaps them",
 body:[
 {vi:"KHÔNG NGẤU (lack of fusion): kim loại đắp KHÔNG CHẢY DÍNH vào thành rãnh hoặc lớp trước — do nhiệt không đủ ngay tại chỗ đó: dòng thấp, hồ quang lệch khỏi mép, tốc độ quá nhanh, que quá to so với rãnh hẹp, hoặc vũng hàn 'chạy trước' hồ quang ở kiểu hàn tụt. Nằm ẨN trong lòng ở thành rãnh → RT khó thấy (phẳng, lệch tia) → UT là lựa chọn đúng.",
  en:"LACK OF FUSION: deposited metal FAILS TO FUSE with the sidewall or previous pass — local heat starvation: low current, arc off the joint face, excessive speed, oversized electrode in a narrow prep, or the pool flooding ahead of the arc in vertical-down. Hidden on the sidewall → poorly shown by RT (planar, mis-aligned) → UT is the right call."},
 {vi:"KHÔNG THẤU (incomplete/lack of penetration): đường hàn ĐÁY không xuyên hết chiều dày cần thiết — nhìn từ mặt sau thấy mép chưa chảy. Nguyên nhân nằm ở CHUẨN BỊ MÉP + thông số đáy: khe hở quá hẹp, mặt đáy quá dày, dòng đáy thấp, que quá to chọc không tới đáy. Mẹo phân biệt khi làm bài: cứ thấy 'root' + 'not penetrated/not fused at root' là LOP; thấy 'sidewall/inter-run' là LOF.",
  en:"LACK OF PENETRATION: the root run fails to penetrate the required depth. Causes live in JOINT PREP + root parameters: root gap too tight, root face too thick, low root current, electrode too large to reach the root. Exam tell: 'root not penetrated' → LOP; 'sidewall/inter-run' → LOF."}]},

{h_vi:"🎓 Undercut, rỗ khí, ngậm xỉ — bộ ba 'nguyên nhân nào?'",
 h_en:"🎓 Undercut, porosity, slag — the 'which cause?' trio",
 body:[
 {vi:"UNDERCUT (cháy chân): hồ quang KHOÉT kim loại mép ra mà kim loại đắp không điền lại kịp → rãnh khuyết chạy dọc chân mối hàn. Ba thủ phạm kinh điển: dòng/điện áp QUÁ CAO, tốc độ QUÁ NHANH, góc que sai (nghiêng khoét vào mép). Nhớ ngược: đắp chờm (overlap) là 'anh em đối nghịch' — dòng QUÁ THẤP, tốc độ QUÁ CHẬM, kim loại tràn phủ lên mà không ngấu.",
  en:"UNDERCUT: the arc GOUGES the parent metal at the toe and filler fails to refill it → a groove along the toe. Classic trio: current/voltage TOO HIGH, travel TOO FAST, wrong electrode angle. Mirror image: OVERLAP — current TOO LOW, travel TOO SLOW, metal rolls over without fusing."},
 {vi:"RỖ KHÍ: khí (chủ yếu nitơ/hydro từ không khí, hơi ẩm, dầu, sơn, mạ kẽm) hòa vào vũng hàn rồi không thoát kịp khi đông đặc. Mọi đáp án đúng đều quy về 'khí lọt vào': mất khí bảo vệ, gió, lưu lượng khí sai (thấp QUÁ hay cao QUÁ đều rỗ), que ẩm, bề mặt bẩn, hồ quang dài. NGẬM XỈ: xỉ lớp trước không gõ/mài sạch bị lớp sau phủ lên — đặc trưng của hàn NHIỀU LỚP bằng que/dây có xỉ (MMA, FCAW, SAW); TIG/MIG không có thuốc → không thể ngậm xỉ (bẫy kinh điển!).",
  en:"POROSITY: gas (air nitrogen/hydrogen, moisture, oil, paint, galvanising) dissolves in the pool and can't escape during freezing. Every correct answer reduces to 'gas got in': lost shielding, wind, wrong flow rate (too LOW or too HIGH), damp electrodes, dirty surface, long arc. SLAG INCLUSIONS: unremoved slag between passes — a MULTI-PASS defect of flux processes (MMA, FCAW, SAW); TIG/MIG have no flux → cannot give slag inclusions (classic trap!)."}]},

{h_vi:"🎓 Khuyết tật vùng đáy & hõm cuối — bộ câu hình vẽ",
 h_en:"🎓 Root-area & crater defects — the picture questions",
 body:[
 {vi:"Bốn khuyết tật đáy dễ lẫn nhau khi đề đưa hình: NGẤU QUÁ (excess penetration) — đáy lồi quá mức, do khe hở rộng/dòng cao; CHÁY THỦNG (burn-through) — thủng hẳn lỗ, phiên bản nặng của ngấu quá; LÕM ĐÁY (root concavity) — đáy hụt lõm vào trong nhưng vẫn ngấu, hay gặp khi hàn có lót khí/tư thế trần; HỤT ĐÁY (root suck-back) — co lõm do khí bảo vệ đáy hoặc kỹ thuật. CRATER PIPE: lỗ co ngót giữa HÕM CUỐI đường hàn do ngắt hồ quang đột ngột — phòng bằng cách điền đầy hõm/lùi que trước khi ngắt.",
  en:"Four root defects the picture questions mix up: EXCESS PENETRATION — bulging root from wide gap/high current; BURN-THROUGH — an actual hole, its severe extreme; ROOT CONCAVITY — a fused but sunken root, common with purge/overhead; SUCK-BACK — shrinkage-related concavity. CRATER PIPE: a shrinkage pipe in the END CRATER from abrupt arc extinction — prevent by filling the crater/stepping back before breaking the arc."}],
 foot:{vi:"Học xong 6 khối trên, quay lại tab Tài liệu thi lọc các câu về khuyết tật — bạn sẽ thấy hầu hết đáp án tự 'sáng' ra.",
       en:"After these 6 blocks, revisit the defect questions in the exam tab — most answers should now be obvious."}}
]);

/* ========== GIẢNG GIẢI đợt 2: Quá trình hàn ========== */
deep(ch('processes'), [
{h_vi:"🎓 Cách đề thi hỏi về quá trình hàn",
 h_en:"🎓 How the exam asks about processes",
 body:[
 {vi:"Chương này đề xoay quanh 4 nhóm câu: (1) đặc tính nguồn hàn — quá trình nào dùng CC, quá trình nào dùng CV; (2) cực tính — DCEP/DCEN/AC cho từng quá trình; (3) 'điều gì xảy ra nếu...' — thay đổi một biến số (dòng, áp, tốc độ, chiều dài hồ quang) thì mối hàn thay đổi thế nào; (4) chọn quá trình nào cho ứng dụng nào. Nắm 4 nhóm này là quét gần hết câu chương Processes.",
  en:"Four question groups: (1) power-source characteristic — which process uses CC vs CV; (2) polarity per process; (3) 'what happens if…' one variable changes; (4) which process suits which application. Master these and you cover nearly every Processes question."}]},

{h_vi:"🎓 CC vs CV — hiểu một lần là nhớ mãi",
 h_en:"🎓 CC vs CV — understand once, remember forever",
 body:[
 {vi:"Vì sao MMA và TIG dùng nguồn DÒNG KHÔNG ĐỔI (CC, đặc tính rơi)? Vì tay người run: chiều dài hồ quang dao động liên tục → điện áp dao động theo. Nguồn CC được thiết kế để khi áp thay đổi thì DÒNG gần như đứng yên — mà dòng quyết định độ ngấu và tốc độ chảy que. Kết quả: tay run nhưng mối hàn vẫn đều. Ngược lại MIG/MAG cấp dây bằng MÔ TƠ đều tăm tắp, thứ cần giữ ổn định là CHIỀU DÀI HỒ QUANG → dùng nguồn ÁP KHÔNG ĐỔI (CV): dây chìa ngắn lại → dòng tự vọt lên đốt dây nhanh hơn → hồ quang tự trở về chiều dài cũ. Đó chính là 'hồ quang tự điều chỉnh' (self-adjusting arc) — cụm từ đề rất hay hỏi.",
  en:"Why do MMA and TIG use CONSTANT CURRENT (drooping)? The human hand wobbles: arc length (and thus voltage) fluctuates. A CC source keeps CURRENT nearly unchanged as voltage swings — and current governs penetration and burn-off. Result: shaky hand, consistent weld. MIG/MAG instead feeds wire by MOTOR at constant speed; what must stay constant is ARC LENGTH → CONSTANT VOLTAGE source: stick-out shortens → current surges → wire burns faster → arc restores itself. That is the SELF-ADJUSTING ARC — an exam favourite phrase."}],
 rows:[
 {vi:"Bẫy: 'self-adjusting arc xảy ra với thiết bị nào?' → MIG/MAG trên nguồn CV. Không phải MMA, không phải TIG.",
  en:"Trap: 'self-adjusting arc occurs with?' → MIG/MAG on CV. Not MMA, not TIG."},
 {vi:"OCV (điện áp không tải) thuộc nhóm an toàn: là áp giữa hai cực khi CHƯA hàn, giúp mồi hồ quang; MMA thường 50–90V.",
  en:"OCV belongs with safety too: voltage across terminals BEFORE striking, enables arc initiation; typically 50–90V for MMA."}]},

{h_vi:"🎓 Cực tính — bảng nhớ 30 giây",
 h_en:"🎓 Polarity — the 30-second table",
 body:[
 {vi:"Quy tắc vật lý gốc: khoảng 2/3 nhiệt hồ quang DC tập trung ở CỰC DƯƠNG. Từ đó suy ra tất cả: TIG hàn thép dùng DCEN (điện cực âm → nhiệt dồn vào vật hàn, ngấu sâu, điện cực vonfram mát không chảy). TIG hàn NHÔM dùng AC (nửa chu kỳ EP phá màng oxit — 'làm sạch', nửa EN ngấu). MIG/MAG hầu như luôn DCEP (hồ quang ổn định, chuyển dịch giọt đều). MMA tùy que: que bazơ E7018 chạy DCEP ngấu tốt; que xenlulo chạy được cả hai. SAW dùng cả DC lẫn AC (AC chống thổi lệch hồ quang khi dòng lớn).",
  en:"Root physics: about two-thirds of DC arc heat concentrates at the POSITIVE pole. Everything follows: TIG on steel = DCEN (heat into the work, deep penetration, cool tungsten). TIG on ALUMINIUM = AC (EP half-cycle strips the oxide — 'cleaning action'; EN half penetrates). MIG/MAG = almost always DCEP (stable arc, even transfer). MMA depends on electrode: E7018 runs well DCEP; cellulosic runs both. SAW uses DC or AC (AC resists arc blow at high current)."}]},

{h_vi:"🎓 'Điều gì xảy ra nếu...' — bảng nhân quả biến số",
 h_en:"🎓 'What happens if…' — the cause-effect table",
 table:{cols:[{vi:"Thay đổi",en:"Change"},{vi:"Hệ quả lên mối hàn",en:"Effect on weld"}],
 data:[
 [{vi:"Tăng DÒNG điện",en:"Increase CURRENT"},{vi:"Ngấu sâu hơn, đắp nhanh hơn; quá cao → bắn tóe, cháy chân, nứt nóng (mối sâu-hẹp)",en:"Deeper penetration, faster deposition; too high → spatter, undercut, hot cracking (deep-narrow bead)"}],
 [{vi:"Tăng ÁP / kéo dài hồ quang",en:"Increase VOLTAGE / longer arc"},{vi:"Mối rộng và phẳng hơn, ngấu giảm; quá dài → mất khí bảo vệ, rỗ, bắn tóe",en:"Wider flatter bead, less penetration; too long → shielding lost, porosity, spatter"}],
 [{vi:"Tăng TỐC ĐỘ hàn",en:"Increase TRAVEL SPEED"},{vi:"Mối hẹp, ngấu giảm, dễ cháy chân; nhiệt lượng (HI) giảm → nguội nhanh → HAZ cứng",en:"Narrower bead, less penetration, undercut risk; heat input drops → faster cooling → harder HAZ"}],
 [{vi:"Giảm TỐC ĐỘ hàn",en:"Decrease TRAVEL SPEED"},{vi:"HI tăng → HAZ rộng, hạt thô, độ dai giảm; dễ đắp chờm",en:"Higher HI → wide HAZ, grain growth, lower toughness; overlap risk"}],
 [{vi:"Tăng phần dây nhô (stick-out) MIG",en:"Longer stick-out (MIG)"},{vi:"Điện trở tăng → dòng GIẢM → ngấu giảm (nhớ cho câu CTWD)",en:"More resistance → current DROPS → less penetration (CTWD questions)"}]]},
 rows:[
 {vi:"Công thức phải thuộc: HI (kJ/mm) = (U × I × 60) / (1000 × tốc độ mm/phút) × hệ số k (SAW 1.0; MMA/MIG 0.8; TIG 0.6).",
  en:"Formula to memorise: HI (kJ/mm) = (V × A × 60)/(1000 × travel mm/min) × k (SAW 1.0; MMA/MIG 0.8; TIG 0.6)."}]},

{h_vi:"🎓 Chọn quá trình nào? — logic một câu cho mỗi quá trình",
 h_en:"🎓 Which process? — one-line logic each",
 rows:[
 {vi:"MMA: 'con dao đa năng' — mọi tư thế, ngoài trời, thiết bị rẻ; chậm vì phải thay que + gõ xỉ.",
  en:"MMA: the all-rounder — all positions, outdoors, cheap kit; slow (electrode changes + slag)."},
 {vi:"TIG: chất lượng cao nhất, kiểm soát tốt nhất — lớp lót ống, tấm mỏng, inox/nhôm; chậm nhất, đòi hỏi thợ giỏi, kỵ gió.",
  en:"TIG: highest quality and control — root runs, thin sheet, stainless/aluminium; slowest, most skill, hates wind."},
 {vi:"MIG/MAG: năng suất trong xưởng, dễ tự động hóa; kỵ gió, rủi ro không ngấu ở chế độ dip nếu thông số sai.",
  en:"MIG/MAG: shop productivity, easy to mechanise; wind-sensitive, lack-of-fusion risk in dip mode with poor settings."},
 {vi:"FCAW tự bảo vệ: công trường có gió — không cần chai khí; nhiều khói.",
  en:"Self-shielded FCAW: windy site work — no gas bottle; heavy fume."},
 {vi:"SAW: tốc độ đắp vô địch, mối dài thẳng, tấm dày, chủ yếu tư thế sấp; không nhìn thấy vũng hàn nên phụ thuộc cữ dẫn.",
  en:"SAW: unbeatable deposition on long straight thick-plate seams, mainly flat; pool invisible so guidance-dependent."},
 {vi:"Electroslag: cực dày, một lượt thẳng đứng; hạt rất thô → thường phải thường hóa sau hàn.",
  en:"Electroslag: very thick sections, single vertical pass; very coarse grain → usually needs normalising."}]}
]);

/* ========== GIẢNG GIẢI đợt 2: Vật liệu hàn ========== */
deep(ch('consumables'), [
{h_vi:"🎓 Cách đề thi hỏi về vật liệu hàn",
 h_en:"🎓 How the exam asks about consumables",
 body:[
 {vi:"Bốn nhóm câu: (1) ba loại vỏ bọc que — đặc tính và khi nào dùng; (2) SẤY và bảo quản que (hỏi nhiều nhất!); (3) đọc ký hiệu que AWS/ISO; (4) khí bảo vệ — trơ hay hoạt tính, chọn khí nào cho vật liệu nào. Với thanh tra hàn, mọi câu đều quy về một mối lo duy nhất: HYDRO và NHIỄM BẨN lọt vào mối hàn.",
  en:"Four groups: (1) the three coating types — properties and use; (2) BAKING and storage (most asked!); (3) reading AWS/ISO designations; (4) shielding gases. For an inspector every answer reduces to one worry: HYDROGEN and CONTAMINATION entering the weld."}]},

{h_vi:"🎓 Ba loại vỏ bọc — ba tính cách",
 h_en:"🎓 Three coatings — three personalities",
 body:[
 {vi:"XENLULO (E6010/7010): vỏ chứa bột gỗ — cháy sinh nhiều HYDRO → hồ quang mạnh, NGẤU SÂU, đi tụt nhanh trên đường ống; đổi lại hydro cao → không được sấy khô kiệt (cần ~3–5% ẩm để hoạt động!) và không dùng nơi lo nứt hydro. RUTIL (E6013): vỏ TiO2 — 'que quốc dân', mồi dễ, hồ quang êm, xỉ tự bong, hợp hàn trang trí/kết cấu thường; cơ tính và hydro ở mức trung bình. BAZƠ (E7016/7018): vỏ CaCO3+CaF2 — HYDRO THẤP nhất, cơ tính và độ dai cao nhất, chống nứt tốt nhất → bắt buộc cho kết cấu quan trọng, thép dày, CEV cao; đổi lại khó hàn hơn và PHẢI quản lý sấy nghiêm ngặt.",
  en:"CELLULOSIC (E6010/7010): wood-flour coating — burns to hydrogen-rich gas → forceful arc, DEEP PENETRATION, fast stovepipe welding on pipelines; but high hydrogen → never bake dry (needs ~3–5% moisture to work!) and never where hydrogen cracking is a worry. RUTILE (E6013): TiO2 — the friendly all-purpose rod: easy strike, smooth arc, self-detaching slag; moderate properties. BASIC (E7016/7018): CaCO3+CaF2 — LOWEST hydrogen, best strength/toughness, best crack resistance → mandatory for critical structures, thick or high-CEV steel; harder to run and demands strict baking control."}],
 rows:[
 {vi:"Chu trình sấy que bazơ phải thuộc: SẤY 300–350°C / 1–2h → tủ GIỮ 120–150°C → ống QUIVER ~70°C bên người thợ → quá 4h ngoài trời phải sấy lại (tối đa ~3 lần tùy hãng). Que hút ẩm trở lại = nguồn hydro!",
  en:"Basic-electrode cycle by heart: BAKE 300–350°C/1–2h → HOLDING oven 120–150°C → heated QUIVER ~70°C at the welder → re-bake after ~4h exposure (limited re-bakes). A re-moistened electrode = a hydrogen source!"},
 {vi:"Bẫy: 'que nào KHÔNG được sấy khô hoàn toàn?' → xenlulo. 'Que nào cho kết cấu quan trọng?' → bazơ.",
  en:"Traps: 'which must NOT be fully dried?' → cellulosic. 'Which for critical work?' → basic."}]},

{h_vi:"🎓 Đọc ký hiệu que khi làm bài — AWS 10 giây, ISO 10 giây",
 h_en:"🎓 Decoding designations fast — AWS in 10s, ISO in 10s",
 body:[
 {vi:"AWS E7018: E = que hàn; 70 = độ bền KÉO tối thiểu 70 ksi (~485 MPa); 1 = mọi tư thế (2 = chỉ sấp/góc ngang); 8 = vỏ bazơ bột sắt, chạy AC/DCEP. ISO 2560-A E 35 4 B: 35 = giới hạn CHẢY tối thiểu 350 MPa; 4 = đạt 47J ở −40°C; B = bazơ. Bẫy lớn nhất mà đề khai thác: AWS đo theo ĐỘ BỀN KÉO (ksi), ISO đo theo GIỚI HẠN CHẢY (MPa) — đừng để hai hệ lẫn nhau. H5/H10/H15 sau ký hiệu = ml hydro/100g kim loại đắp (H5 = hydro rất thấp).",
  en:"AWS E7018: E = electrode; 70 = min TENSILE 70 ksi; 1 = all-positional; 8 = iron-powder basic, AC/DCEP. ISO 2560-A E 35 4 B: 35 = min YIELD 350 MPa; 4 = 47J at −40°C; B = basic. The big exam trap: AWS classifies by TENSILE (ksi), ISO by YIELD (MPa). H5/H10/H15 suffixes = ml hydrogen per 100 g deposit (H5 = very low)."}]},

{h_vi:"🎓 Khí bảo vệ — chọn theo một câu hỏi: 'có phản ứng không?'",
 h_en:"🎓 Shielding gases — one question: 'does it react?'",
 body:[
 {vi:"Khí TRƠ (argon, heli) không phản ứng với kim loại lỏng → bắt buộc cho TIG (bảo vệ cả vonfram) và cho nhôm/titan/inox TIG. Khí HOẠT TÍNH (CO2, hoặc Ar pha CO2/O2) phản ứng nhẹ → tốt cho MAG thép: thêm CO2 tăng ngấu và ổn định, nhưng CO2 THUẦN chỉ chạy được dip/globular (không spray được) và bắn tóe nhiều. Trộn heli vào argon → hồ quang nóng hơn (heli dẫn nhiệt tốt) — dùng cho nhôm dày. Nhớ nhanh: TIG = trơ tuyệt đối; MAG thép = Ar + 5–20% CO2; inox MAG = Ar + 1–2% O2/CO2 (không CO2 thuần — thấm cacbon).",
  en:"INERT gases (argon, helium) don't react → mandatory for TIG (protects tungsten too) and for Al/Ti/stainless TIG. ACTIVE gases (CO2 or Ar+CO2/O2) react mildly → good for MAG on steel: CO2 adds penetration and stability, but PURE CO2 cannot do spray transfer and spatters. Helium additions → hotter arc (high conductivity) for thick aluminium. Quick recall: TIG = purely inert; steel MAG = Ar + 5–20% CO2; stainless MAG = Ar + 1–2% O2/CO2 (never pure CO2 — carbon pickup)."}],
 foot:{vi:"Góc nhìn thanh tra: kiểm tra vật liệu hàn = đúng chủng loại theo WPS + chứng chỉ lô + tình trạng bảo quản/sấy + bề mặt dây sạch. Sai một trong bốn là có quyền dừng.",
       en:"Inspector's angle: consumable control = right classification per WPS + batch certificate + storage/baking condition + clean wire surface. Any one wrong justifies stopping."}}
]);

})();
