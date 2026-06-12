/* ============================================================
   CSWIP 3.1 — NỘI DUNG HỌC SONG NGỮ (VI + EN)
   Biên soạn theo syllabus TWI/CSWIP Welding Inspector.
   t_vi/t_en = thuật ngữ (dùng cho flashcard) ; vi/en = giải thích
   ============================================================ */
const DATA = {chapters:[

/* 1 ===================================================== */
{vi:"Vai trò & nhiệm vụ Thanh tra Hàn", en:"Duties of the Welding Inspector",
 intro:{vi:"Hiểu rõ trách nhiệm, phẩm chất và phạm vi công việc của một thanh tra hàn trước/trong/sau khi hàn.",en:"Understand the inspector's responsibilities before, during and after welding."},
 lessons:[
  {t_vi:"Thanh tra hàn",t_en:"Welding Inspector",vi:"Người kiểm tra mối hàn có phù hợp với tiêu chuẩn/quy phạm áp dụng hay không.",en:"Verifies welds comply with the applicable code/standard."},
  {t_vi:"Phẩm chất cần có",t_en:"Inspector qualities",vi:"Trung thực, công bằng, kiến thức tốt, thị lực đạt yêu cầu, ghi chép rõ ràng.",en:"Honest, fair, knowledgeable, good eyesight, accurate records."},
  {t_vi:"Trước khi hàn",t_en:"Before welding",vi:"Kiểm tra WPS, vật liệu, que/dây hàn, vát mép, khe hở, làm sạch, thiết bị, chứng chỉ thợ hàn.",en:"Check WPS, materials, consumables, joint prep, gap, cleanliness, equipment, welder certs."},
  {t_vi:"Trong khi hàn",t_en:"During welding",vi:"Theo dõi dòng/điện áp, tốc độ, nhiệt độ tiền nhiệt & interpass, trình tự hàn, làm sạch giữa các lớp.",en:"Monitor current/voltage, travel speed, preheat & interpass temp, sequence, interpass cleaning."},
  {t_vi:"Sau khi hàn",t_en:"After welding",vi:"Kiểm tra ngoại quan, kích thước mối hàn, khuyết tật, PWHT, NDT, lập hồ sơ.",en:"Visual & dimensional check, defects, PWHT, NDT, documentation."},
  {t_vi:"Thị lực",t_en:"Eyesight test",vi:"Phải kiểm tra thị lực gần (Jaeger/Times Roman) ít nhất 12 tháng/lần.",en:"Near-vision test (Jaeger) required at least every 12 months."},
  {t_vi:"QA và QC",t_en:"QA vs QC",vi:"QA (đảm bảo chất lượng) = hệ thống, quy trình, thủ tục để phòng ngừa lỗi. QC (kiểm soát chất lượng) = hoạt động kiểm tra cụ thể (đo, thử, NDT) để phát hiện lỗi. Thanh tra hàn là một phần của QC.",en:"QA = the management system and procedures that prevent defects. QC = the actual inspection/testing activities that detect defects. The welding inspector is part of QC."},
  {t_vi:"Code – Standard – Specification",t_en:"Code / Standard / Specification",vi:"Code: tài liệu bắt buộc theo luật/hợp đồng (vd ASME, API). Standard: yêu cầu kỹ thuật thống nhất (ISO, BS EN). Specification: yêu cầu chi tiết riêng của dự án/khách hàng — thường nghiêm hơn standard.",en:"Code: mandatory by law/contract (ASME, API). Standard: agreed technical requirements (ISO, BS EN). Specification: detailed project/client requirements — often stricter than the standard."},
  {t_vi:"ITP – Kế hoạch kiểm tra & thử",t_en:"ITP (Inspection & Test Plan)",vi:"Liệt kê mọi bước kiểm tra theo trình tự sản xuất, ai thực hiện, ai chứng kiến. Các mức can thiệp: H (Hold – dừng chờ), W (Witness – chứng kiến), R (Review – xem hồ sơ), M (Monitor – giám sát ngẫu nhiên).",en:"Lists every inspection step in production order with intervention levels: H (Hold point – work stops until inspected), W (Witness), R (Review documents), M (Monitor randomly)."},
  {t_vi:"Điểm dừng (Hold point)",t_en:"Hold point",vi:"Công việc KHÔNG được tiếp tục khi chưa có mặt bên kiểm tra và ký xác nhận. Vượt hold point là vi phạm nghiêm trọng hệ thống chất lượng.",en:"Work must NOT proceed past a hold point until the inspector has attended and signed off. Skipping a hold point is a serious quality violation."},
  {t_vi:"NCR – Báo cáo không phù hợp",t_en:"NCR (Non-Conformance Report)",vi:"Lập khi sản phẩm/quy trình không đạt yêu cầu quy định. Ghi rõ: hạng mục, yêu cầu, thực tế, đề xuất xử lý (sửa, làm lại, nhân nhượng, loại bỏ).",en:"Raised when product/process fails specified requirements. States: item, requirement, actual condition, disposition (repair, rework, concession, reject)."},
  {t_vi:"Nhân nhượng (Concession)",t_en:"Concession / waiver",vi:"Văn bản cho phép chấp nhận một sai lệch cụ thể so với spec — phải được khách hàng/bên thiết kế phê duyệt, thanh tra không tự quyết định.",en:"Formal permission to accept a specific deviation from spec — approved by client/design authority, never decided by the inspector alone."},
  {t_vi:"Truy xuất vật liệu",t_en:"Material traceability",vi:"Đối chiếu số mẻ (heat number) trên vật liệu với chứng chỉ vật liệu. Chứng chỉ EN 10204 loại 3.1: kết quả thử thật của mẻ, do bộ phận độc lập của nhà máy xác nhận.",en:"Match heat numbers on material to the mill certificate. EN 10204 type 3.1: actual test results for the heat, validated by the maker's independent department."},
  {t_vi:"Báo cáo kiểm tra",t_en:"Inspection report contents",vi:"Phải có: hạng mục/mối hàn, tiêu chuẩn áp dụng, dụng cụ đo, kết quả, đạt/không đạt, ngày, tên & chữ ký người kiểm tra. Ghi sự thật quan sát được, không suy diễn.",en:"Must include: item/weld ID, applicable standard, equipment used, results, accept/reject, date, inspector name & signature. Record facts observed, not opinions."},
  {t_vi:"Các cấp CSWIP",t_en:"CSWIP levels",vi:"3.0 Visual Welding Inspector (kiểm tra ngoại quan cơ bản); 3.1 Welding Inspector (kiểm tra toàn diện, đọc hiểu WPS/NDT report); 3.2 Senior Welding Inspector (giám sát, duyệt hồ sơ, audit).",en:"3.0 Visual Welding Inspector (basic visual); 3.1 Welding Inspector (full inspection, reads WPS/NDT reports); 3.2 Senior Welding Inspector (supervision, document approval, audits)."},
  {t_vi:"Kiểm tra chứng chỉ thợ hàn",t_en:"Checking welder approval",vi:"Trước khi hàn: chứng chỉ đúng quá trình hàn, vật liệu, chiều dày, đường kính, vị trí hàn; còn hiệu lực; đúng người (đối chiếu ID).",en:"Before welding: certificate covers the process, material, thickness, diameter and position; still valid; identity matches the welder."},
 ],
 key:[
  {vi:"Thanh tra KHÔNG được sửa mối hàn — chỉ kiểm tra và báo cáo.",en:"The inspector does not repair welds — only inspects and reports."},
  {vi:"Mọi quyết định chấp nhận/loại bỏ phải dựa trên tiêu chuẩn áp dụng, không theo cảm tính.",en:"Accept/reject decisions are based on the applicable standard, not opinion."},
  {vi:"Thanh tra làm việc theo TIÊU CHUẨN ÁP DỤNG của hợp đồng — không theo tiêu chuẩn mình thích hay kinh nghiệm cá nhân.",en:"The inspector works to the contract's APPLICABLE standard — not personal preference or experience."},
 ],
 quiz:[
  {vi:"Nhiệm vụ chính của thanh tra hàn là gì?",en:"What is the inspector's main duty?",
   opts:[{vi:"Tự sửa mối hàn lỗi",en:"Repair defective welds"},{vi:"Kiểm tra sự phù hợp với tiêu chuẩn",en:"Verify compliance with the standard"},{vi:"Quyết định giá vật tư",en:"Decide material price"},{vi:"Đào tạo thợ hàn",en:"Train welders"}],ans:1,
   exp:{vi:"Thanh tra kiểm tra và báo cáo theo tiêu chuẩn, không tự sửa.",en:"Inspectors verify & report against the standard; they do not repair."}},
  {vi:"Kiểm tra nào KHÔNG thuộc giai đoạn 'trước khi hàn'?",en:"Which is NOT a 'before welding' check?",
   opts:[{vi:"Kiểm tra vát mép & khe hở",en:"Joint prep & gap"},{vi:"Kiểm tra chứng chỉ thợ hàn",en:"Welder certification"},{vi:"Đo kích thước mối hàn hoàn thiện",en:"Measure finished weld size"},{vi:"Kiểm tra que hàn",en:"Check consumables"}],ans:2,
   exp:{vi:"Đo mối hàn hoàn thiện là việc sau khi hàn.",en:"Measuring the finished weld is an after-welding task."}},
  {vi:"Tần suất tối thiểu kiểm tra thị lực của thanh tra?",en:"Minimum eyesight test frequency?",
   opts:[{vi:"5 năm/lần",en:"Every 5 years"},{vi:"12 tháng/lần",en:"Every 12 months"},{vi:"1 tháng/lần",en:"Every month"},{vi:"Không cần",en:"Not required"}],ans:1,
   exp:{vi:"Thị lực gần phải kiểm tra ít nhất mỗi 12 tháng.",en:"Near vision must be tested at least every 12 months."}},
  {vi:"Trong ITP, điểm 'H' (Hold) nghĩa là gì?",en:"In an ITP, what does a Hold point mean?",
   opts:[{vi:"Kiểm tra nếu rảnh",en:"Inspect if available"},{vi:"Dừng công việc đến khi được kiểm tra & ký xác nhận",en:"Work stops until inspected and signed off"},{vi:"Chỉ xem hồ sơ",en:"Review documents only"},{vi:"Giám sát ngẫu nhiên",en:"Random monitoring"}],ans:1,
   exp:{vi:"Hold point = bắt buộc dừng, không được vượt qua khi chưa kiểm tra.",en:"Hold = mandatory stop; work may not proceed uninspected."}},
  {vi:"Chứng chỉ vật liệu EN 10204 loại 3.1 là gì?",en:"What is an EN 10204 type 3.1 certificate?",
   opts:[{vi:"Tuyên bố chung không có kết quả thử",en:"General statement, no test results"},{vi:"Kết quả thử thật của mẻ, xác nhận bởi bộ phận độc lập của nhà máy",en:"Actual heat test results validated by maker's independent dept"},{vi:"Giấy bảo hành",en:"A warranty"},{vi:"Hóa đơn mua hàng",en:"A purchase invoice"}],ans:1,
   exp:{vi:"3.1 = kết quả thử cụ thể của mẻ vật liệu, có xác nhận độc lập trong nhà máy.",en:"3.1 = specific heat test results, independently validated within the mill."}},
  {vi:"QC khác QA ở điểm nào?",en:"How does QC differ from QA?",
   opts:[{vi:"QC là hệ thống phòng ngừa, QA là kiểm tra",en:"QC prevents, QA inspects"},{vi:"QC là hoạt động kiểm tra phát hiện lỗi; QA là hệ thống phòng ngừa lỗi",en:"QC = inspection that detects; QA = system that prevents"},{vi:"Giống hệt nhau",en:"They are identical"},{vi:"QA chỉ dành cho NDT",en:"QA is only for NDT"}],ans:1,
   exp:{vi:"QA = hệ thống/quy trình; QC = kiểm tra/thử cụ thể. Thanh tra thuộc QC.",en:"QA = system/procedures; QC = the actual inspection. Inspectors do QC."}},
  {vi:"Ai có quyền chấp nhận một sai lệch (concession) so với spec?",en:"Who can approve a concession against the spec?",
   opts:[{vi:"Thợ hàn",en:"The welder"},{vi:"Thanh tra hàn tự quyết",en:"The inspector alone"},{vi:"Khách hàng / bên thiết kế",en:"Client / design authority"},{vi:"Đốc công",en:"The foreman"}],ans:2,
   exp:{vi:"Thanh tra chỉ báo cáo; quyền nhân nhượng thuộc khách hàng/bên thiết kế.",en:"The inspector reports; concessions are granted by client/design authority."}},
 ]},

/* 2 ===================================================== */
{vi:"Quá trình hàn (Welding Processes)", en:"Welding Processes",
 intro:{vi:"Bốn quá trình hàn hồ quang chính trong kỳ thi: MMA, MIG/MAG, TIG, SAW.",en:"Four key arc processes: MMA, MIG/MAG, TIG, SAW."},
 lessons:[
  {t_vi:"MMA / SMAW",t_en:"MMA (SMAW)",vi:"Hàn hồ quang que bọc thuốc. Que tan tạo kim loại đắp + xỉ bảo vệ. Linh hoạt, rẻ, dùng ngoài trời tốt.",en:"Manual Metal Arc / Shielded Metal Arc Welding. Flux-coated electrode; slag shielding. Versatile, cheap, good outdoors."},
  {t_vi:"MIG/MAG / GMAW",t_en:"MIG/MAG (GMAW)",vi:"Dây hàn liên tục + khí bảo vệ (MIG: khí trơ Ar/He; MAG: khí hoạt tính CO2). Năng suất cao.",en:"Continuous wire + shielding gas (MIG=inert, MAG=active CO2). High productivity."},
  {t_vi:"TIG / GTAW",t_en:"TIG (GTAW)",vi:"Điện cực vonfram không tan + khí trơ. Que đắp riêng. Chất lượng cao, dùng cho lớp lót/inox/nhôm.",en:"Non-consumable tungsten + inert gas; separate filler. High quality, root runs, stainless, aluminium."},
  {t_vi:"SAW",t_en:"SAW",vi:"Hàn hồ quang dưới lớp thuốc. Hồ quang ẩn dưới thuốc hạt. Năng suất rất cao, tự động, mối dài thẳng.",en:"Submerged Arc Welding. Arc under granular flux. Very high deposition, automatic, long straight seams."},
  {t_vi:"Khí bảo vệ",t_en:"Shielding gas",vi:"Bảo vệ vũng hàn khỏi oxy/nitơ khí quyển. Ar, He, CO2 hoặc hỗn hợp.",en:"Protects the weld pool from atmospheric O2/N2. Ar, He, CO2 or mixes."},
  {t_vi:"Phân cực",t_en:"Polarity",vi:"DCEP (cực dương ở điện cực) nóng điện cực hơn; DCEN nóng vật hàn hơn; AC dùng cho nhôm (TIG).",en:"DCEP heats electrode more; DCEN heats work more; AC for aluminium (TIG)."},
  {t_vi:"Đặc tính nguồn hàn CC vs CV",t_en:"CC vs CV power source",vi:"CC (dòng không đổi, đặc tính dốc): MMA & TIG — chiều dài hồ quang thay đổi ít ảnh hưởng dòng. CV (áp không đổi, đặc tính phẳng): MIG/MAG & SAW dây nhỏ — giữ điện áp, dòng tự thay đổi theo tầm với.",en:"CC (constant current, drooping): MMA & TIG — arc length changes barely affect current. CV (constant voltage, flat): MIG/MAG & thin-wire SAW — voltage held, current self-adjusts."},
  {t_vi:"Hồ quang tự điều chỉnh",t_en:"Self-adjusting arc",vi:"Với nguồn CV (MIG/MAG): nếu khoảng cách mỏ–vật giảm, dòng tăng → dây chảy nhanh hơn → hồ quang tự trở về chiều dài cũ.",en:"With CV (MIG/MAG): if stick-out shortens, current rises, wire burns off faster, and the arc returns to its set length automatically."},
  {t_vi:"Điện áp không tải (OCV)",t_en:"Open Circuit Voltage",vi:"Điện áp giữa hai cực khi chưa gây hồ quang, thường 50–90 V. Cần đủ cao để mồi hồ quang nhưng giới hạn vì an toàn điện giật.",en:"Voltage before the arc is struck, typically 50–90 V. High enough to strike the arc, limited for electric-shock safety."},
  {t_vi:"Điện áp ↔ chiều dài hồ quang",t_en:"Arc voltage vs arc length",vi:"Hồ quang càng dài điện áp càng cao. Hồ quang quá dài → bắn tóe, rỗ khí, mất bảo vệ; quá ngắn → dính que, ngấu kém.",en:"Longer arc = higher voltage. Too long: spatter, porosity, loss of shielding. Too short: sticking, poor fusion."},
  {t_vi:"Chuyển dịch kim loại: dip",t_en:"Dip (short-circuit) transfer",vi:"Dòng & áp thấp; dây chạm vũng hàn rồi đứt thành giọt (ngắn mạch ~50–200 lần/giây). Nhiệt thấp → tốt cho tấm mỏng & hàn mọi vị trí, nhưng dễ thiếu ngấu trên tấm dày.",en:"Low current & voltage; wire short-circuits into the pool (~50–200 times/s). Low heat — good for thin sheet and all positions, but risks lack of fusion on thick material."},
  {t_vi:"Chuyển dịch spray & globular",t_en:"Spray & globular transfer",vi:"Spray: dòng/áp cao, giọt mịn bay qua hồ quang, ngấu sâu, chỉ hàn bằng/ngang (vũng lớn). Globular: trung gian, giọt to rơi không đều, nhiều bắn tóe — nên tránh.",en:"Spray: high current/voltage, fine droplets, deep fusion, flat/horizontal only. Globular: intermediate, large irregular drops, heavy spatter — avoided."},
  {t_vi:"Chuyển dịch xung (pulsed)",t_en:"Pulsed transfer",vi:"Dòng nền thấp + xung cao chu kỳ: được dạng spray ở dòng trung bình thấp → hàn được mọi vị trí, ít bắn tóe, kiểm soát nhiệt tốt.",en:"Low background + high pulse current: spray-like transfer at low average current — all-positional, low spatter, good heat control."},
  {t_vi:"FCAW – dây lõi thuốc",t_en:"FCAW (flux-cored wire)",vi:"Dây ống chứa thuốc bên trong. Loại có khí bảo vệ (136) và tự bảo vệ (114). Năng suất cao hơn dây đặc, chịu gió tốt hơn, nhưng có xỉ phải làm sạch.",en:"Tubular wire with internal flux. Gas-shielded (136) or self-shielded (114). Higher deposition than solid wire, better wind tolerance, but slag must be removed."},
  {t_vi:"Chu kỳ tải (duty cycle)",t_en:"Duty cycle",vi:"% thời gian máy hàn được phép hàn liên tục trong chu kỳ 10 phút ở dòng định mức (vd 60% @ 300A = hàn 6 phút, nghỉ 4 phút). Vượt quá gây quá nhiệt máy.",en:"% of a 10-minute cycle the set can weld at rated current (60% @ 300A = weld 6 min, rest 4). Exceeding it overheats the machine."},
  {t_vi:"Điện cực vonfram (TIG)",t_en:"Tungsten electrodes",vi:"DC (thép, inox): vonfram thori/ceri/lantan, mài nhọn. AC (nhôm, magie): vonfram nguyên chất/zirconi, đầu tròn. Nhiễm vonfram vào mối hàn = khuyết tật.",en:"DC (steel, stainless): thoriated/ceriated/lanthanated, ground to a point. AC (aluminium, Mg): pure/zirconiated, balled end. Tungsten in the weld = a defect."},
  {t_vi:"Gas lens & thổi khí lưng (TIG)",t_en:"Gas lens & back purging",vi:"Gas lens làm dòng khí phẳng đều, vươn dài điện cực, bảo vệ tốt hơn. Back purge: thổi khí trơ mặt sau lớp lót (inox/titan) chống oxy hóa chân mối hàn.",en:"A gas lens gives laminar gas flow and better shielding. Back purging floods the root side with inert gas (stainless/titanium) to prevent root oxidation."},
  {t_vi:"Mã quá trình ISO 4063",t_en:"ISO 4063 process numbers",vi:"111 = MMA; 121/12 = SAW; 131 = MIG; 135 = MAG; 136 = FCAW có khí; 141 = TIG; 311 = hàn khí oxy-axetylen. Mã này ghi ở đuôi ký hiệu mối hàn & trong WPS.",en:"111 MMA; 121 SAW; 131 MIG; 135 MAG; 136 gas-shielded FCAW; 141 TIG; 311 oxy-acetylene. Used in weld symbol tails and WPS."},
  {t_vi:"Khuyết tật đặc trưng từng quá trình",t_en:"Typical defects per process",vi:"MMA: ngậm xỉ, rỗ (que ẩm). MIG/MAG dip: thiếu ngấu, bắn tóe. TIG: ngậm vonfram, oxy hóa chân. SAW: nứt nóng giữa mối (tỷ lệ sâu/rộng lớn), ngậm xỉ.",en:"MMA: slag inclusions, porosity (damp rods). MIG/MAG dip: lack of fusion, spatter. TIG: tungsten inclusions, root oxidation. SAW: centreline solidification cracking (high depth/width), slag."},
 ],
 key:[
  {vi:"TIG cho chất lượng cao nhất nhưng năng suất thấp; SAW năng suất cao nhất nhưng chỉ hàn bằng/ngang.",en:"TIG = highest quality, low output; SAW = highest output but flat/horizontal only."},
  {vi:"MMA bảo vệ bằng xỉ → dùng được ngoài gió; MIG/MAG bảo vệ bằng khí → dễ bị gió thổi bay.",en:"MMA slag-shielded (wind-tolerant); MIG/MAG gas-shielded (wind blows shielding away)."},
  {vi:"MMA & TIG dùng nguồn CC (dốc); MIG/MAG & SAW dây nhỏ dùng nguồn CV (phẳng) — câu hỏi rất hay gặp trong đề.",en:"MMA & TIG use CC (drooping); MIG/MAG & thin-wire SAW use CV (flat) — a favourite exam question."},
 ],
 quiz:[
  {vi:"Quá trình nào dùng điện cực vonfram KHÔNG tan?",en:"Which uses a non-consumable tungsten electrode?",
   opts:[{vi:"MMA",en:"MMA"},{vi:"TIG",en:"TIG"},{vi:"MIG",en:"MIG"},{vi:"SAW",en:"SAW"}],ans:1,
   exp:{vi:"TIG/GTAW dùng điện cực vonfram không tan, que đắp riêng.",en:"TIG uses a non-consumable tungsten electrode."}},
  {vi:"Quá trình nào năng suất đắp cao nhất, hồ quang ẩn dưới thuốc?",en:"Highest deposition, arc hidden under flux?",
   opts:[{vi:"TIG",en:"TIG"},{vi:"MMA",en:"MMA"},{vi:"SAW",en:"SAW"},{vi:"MIG",en:"MIG"}],ans:2,
   exp:{vi:"SAW — hàn dưới lớp thuốc, năng suất rất cao.",en:"SAW — submerged under flux, very high output."}},
  {vi:"MAG dùng khí bảo vệ loại nào?",en:"MAG uses which shielding gas type?",
   opts:[{vi:"Khí trơ (Ar)",en:"Inert (Ar)"},{vi:"Khí hoạt tính (CO2)",en:"Active (CO2)"},{vi:"Không khí",en:"Air"},{vi:"Không dùng khí",en:"No gas"}],ans:1,
   exp:{vi:"MAG = Metal Active Gas, dùng khí hoạt tính CO2 hoặc hỗn hợp.",en:"MAG = active gas (CO2/mixes)."}},
  {vi:"Chế độ chuyển dịch nào phù hợp nhất cho tấm mỏng và hàn mọi vị trí?",en:"Which transfer mode suits thin sheet and all positions?",
   opts:[{vi:"Spray",en:"Spray"},{vi:"Globular",en:"Globular"},{vi:"Dip (ngắn mạch)",en:"Dip (short-circuit)"},{vi:"Không có",en:"None"}],ans:2,
   exp:{vi:"Dip có nhiệt thấp, vũng nhỏ → tấm mỏng & mọi vị trí; nhược điểm là dễ thiếu ngấu trên tấm dày.",en:"Dip = low heat, small pool — thin sheet & positional; risk of lack of fusion on thick material."}},
  {vi:"Mã 135 theo ISO 4063 là quá trình nào?",en:"ISO 4063 process 135 is?",
   opts:[{vi:"MMA",en:"MMA"},{vi:"MAG",en:"MAG"},{vi:"TIG",en:"TIG"},{vi:"SAW",en:"SAW"}],ans:1,
   exp:{vi:"135 = MAG (dây đặc, khí hoạt tính). 111 MMA, 141 TIG, 121 SAW.",en:"135 = MAG. 111 MMA, 141 TIG, 121 SAW."}},
  {vi:"Nguồn hàn cho MMA có đặc tính gì?",en:"What characteristic does an MMA power source have?",
   opts:[{vi:"Điện áp không đổi (phẳng)",en:"Constant voltage (flat)"},{vi:"Dòng không đổi (dốc)",en:"Constant current (drooping)"},{vi:"Cả hai",en:"Both"},{vi:"Không cần nguồn",en:"No source needed"}],ans:1,
   exp:{vi:"MMA & TIG dùng đặc tính dốc (CC) — dòng ổn định khi chiều dài hồ quang dao động do hàn tay.",en:"MMA & TIG use drooping (CC) — current stays stable as hand-held arc length varies."}},
  {vi:"Hiện tượng 'hồ quang tự điều chỉnh' xảy ra với thiết bị nào?",en:"The self-adjusting arc occurs with which equipment?",
   opts:[{vi:"MMA nguồn CC",en:"MMA on CC"},{vi:"MIG/MAG nguồn CV",en:"MIG/MAG on CV"},{vi:"TIG nguồn CC",en:"TIG on CC"},{vi:"Hàn khí",en:"Gas welding"}],ans:1,
   exp:{vi:"Nguồn CV + dây cấp liên tục → dòng tự thay đổi giữ chiều dài hồ quang không đổi.",en:"CV source + continuous wire feed self-corrects arc length."}},
 ]},

/* 3 ===================================================== */
{vi:"Vật liệu hàn (Consumables)", en:"Welding Consumables",
 intro:{vi:"Que hàn, dây hàn, thuốc, khí và cách bảo quản — yếu tố ảnh hưởng trực tiếp chất lượng.",en:"Electrodes, wires, fluxes, gases and storage."},
 lessons:[
  {t_vi:"Que hàn bọc thuốc",t_en:"Covered electrode",vi:"Lõi kim loại + lớp thuốc bọc (rutile, basic, cellulose). Thuốc tạo khí + xỉ bảo vệ.",en:"Metal core + flux coating (rutile, basic, cellulosic) producing gas + slag."},
  {t_vi:"Que basic (hydro thấp)",t_en:"Basic / low-hydrogen",vi:"Cho mối hàn dẻo, ít hydro → chống nứt nguội. Phải sấy & giữ trong tủ ấm.",en:"Tough, low-hydrogen deposit → resists hydrogen cracking. Must be baked & held in ovens."},
  {t_vi:"Que rutile",t_en:"Rutile electrode",vi:"Dễ hàn, hồ quang êm, ngoại quan đẹp nhưng cơ tính & chống nứt kém hơn basic.",en:"Easy to run, smooth arc, good appearance; lower toughness than basic."},
  {t_vi:"Sấy & bảo quản que",t_en:"Baking/storage",vi:"Que basic ẩm → hydro → nứt. Sấy theo khuyến cáo NSX, giữ tủ ấm, dùng túi giữ nhiệt khi mang ra hiện trường.",en:"Damp basic rods absorb hydrogen → cracking. Bake per maker, hold in quivers."},
  {t_vi:"Dây hàn đặc / lõi thuốc",t_en:"Solid / flux-cored wire",vi:"Dùng cho MIG/MAG & FCAW; lõi thuốc tự tạo xỉ, năng suất cao.",en:"For MIG/MAG & FCAW; flux-cored self-shields and increases output."},
  {t_vi:"Truy xuất nguồn gốc",t_en:"Traceability",vi:"Vật liệu hàn phải có mác, lô, chứng chỉ phù hợp WPS.",en:"Consumables must carry grade, batch & certificate matching the WPS."},
  {t_vi:"Que cellulosic",t_en:"Cellulosic electrodes",vi:"Vỏ bọc nhiều cellulose → hồ quang mạnh, ngấu SÂU, hàn tụt nhanh (stovepipe) cho lớp lót ống dẫn. Hydro RẤT CAO — không được sấy, dễ nứt nguội nếu dùng sai chỗ. Ví dụ E6010.",en:"High-cellulose coating: fierce, DEEP-penetrating arc, fast vertical-down (stovepipe) pipeline roots. VERY high hydrogen — never baked; cold-crack risk if misused. E.g. E6010."},
  {t_vi:"Giải mã AWS E7018",t_en:"Decoding AWS E7018",vi:"E = que hàn điện; 70 = bền kéo tối thiểu 70 ksi (~490 MPa); 1 = hàn mọi vị trí; 8 = vỏ basic ít hydro, bột sắt, dùng AC/DC+. E6013: 60 ksi, mọi vị trí, rutile.",en:"E = electrode; 70 = 70 ksi (~490 MPa) min tensile; 1 = all positions; 8 = basic low-hydrogen, iron powder, AC/DC+. E6013: 60 ksi, all-positional, rutile."},
  {t_vi:"Sấy & giữ que basic (con số thi)",t_en:"Baking & holding basic electrodes",vi:"Sấy 300–350°C trong 1–2 giờ → tủ giữ 120–150°C → ống đựng giữ nhiệt cạnh thợ ~70°C. Thời gian phơi ngoài tối đa ~4 giờ rồi phải sấy lại (số lần sấy lại có giới hạn).",en:"Bake 300–350°C for 1–2 h, holding oven 120–150°C, heated quiver ~70°C at the workplace. Max ~4 h atmospheric exposure, then re-bake (limited re-bakes)."},
  {t_vi:"Que đóng gói chân không",t_en:"Vacuum-packed electrodes",vi:"Que basic đóng gói chân không dùng ngay không cần sấy nếu bao còn nguyên vẹn — kiểm tra hạn & tình trạng bao trước khi cấp phát.",en:"Vacuum-packed basics can be used straight from an intact pack without baking — check pack integrity and expiry before issue."},
  {t_vi:"Thuốc SAW: nung chảy vs thiêu kết",t_en:"SAW flux: fused vs agglomerated",vi:"Fused (nung chảy): hạt bóng, KHÔNG hút ẩm, bền nhưng không thêm được hợp kim. Agglomerated (thiêu kết): thêm được hợp kim & khử oxy, cho mối hàn dai hơn nhưng HÚT ẨM — phải sấy & bảo quản như que basic.",en:"Fused: glassy, NON-hygroscopic, robust, cannot add alloys. Agglomerated: can add alloys/deoxidants, better toughness, but HYGROSCOPIC — store and dry like basic electrodes."},
  {t_vi:"Khí bảo vệ ảnh hưởng mối hàn",t_en:"Shielding gas effects",vi:"CO2 100%: ngấu sâu, rẻ, nhiều bắn tóe, chỉ dip/globular. Ar + 5–20% CO2: hồ quang êm, được spray. Thêm He: nóng hơn, nhanh hơn (vật liệu dày, nhôm). Lưu lượng quá cao gây cuốn khí → rỗ.",en:"100% CO2: deep penetration, cheap, heavy spatter, dip/globular only. Ar + 5–20% CO2: smooth arc, allows spray. He additions: hotter, faster (thick sections, aluminium). Excess flow causes turbulence and porosity."},
  {t_vi:"Độ tinh khiết & điểm sương khí",t_en:"Gas purity & dew point",vi:"Khí bảo vệ phải khô (điểm sương thấp) và tinh khiết; hơi ẩm trong khí = nguồn hydro & rỗ khí. Kiểm tra ống dẫn khí không rò, không đọng nước.",en:"Shielding gas must be dry (low dew point) and pure; moisture in gas = hydrogen source and porosity. Check hoses for leaks and condensation."},
  {t_vi:"Dây hàn TIG/MIG",t_en:"Filler wires",vi:"Dây MIG mạ đồng chống gỉ & tăng tiếp điện — vỏ mạ bong gây kẹt bép. Que đắp TIG phải đúng mã vật liệu, sạch dầu mỡ/oxide; cầm bằng găng sạch với vật liệu nhạy (inox, titan).",en:"MIG wire is copper-coated for rust protection and contact; flaking coating clogs tips. TIG fillers must match the material grade and be free of oil/oxide; handle sensitive alloys with clean gloves."},
  {t_vi:"Kiểm soát vật liệu hàn tại công trường",t_en:"Site control of consumables",vi:"Cấp phát theo WPS (đúng mã, đúng kích cỡ), ghi sổ cấp phát, thu hồi que thừa cuối ca, que ướt/hỏng vỏ phải loại bỏ. Mỗi lô có chứng chỉ mẻ (batch certificate).",en:"Issue per WPS (correct class & size), log issues, return unused rods at shift end, scrap damp/damaged rods. Every batch has a batch certificate."},
 ],
 key:[
  {vi:"Hydro + ứng suất + tổ chức cứng (HAZ) + nhiệt độ thấp = nứt nguội (hydrogen cracking). Que basic giảm hydro.",en:"Hydrogen + stress + hard HAZ + low temp = hydrogen cracking. Basic rods reduce H."},
  {vi:"Hydro trong vỏ que: cellulosic CAO NHẤT, rutile trung bình, basic THẤP NHẤT (khi sấy đúng) — basic là lựa chọn cho thép dày/ứng suất cao.",en:"Coating hydrogen: cellulosic HIGHEST, rutile medium, basic LOWEST (when baked) — basics for thick/high-restraint steel."},
 ],
 quiz:[
  {vi:"Loại que nào chống nứt nguội tốt nhất?",en:"Which electrode best resists hydrogen cracking?",
   opts:[{vi:"Rutile",en:"Rutile"},{vi:"Cellulose",en:"Cellulosic"},{vi:"Basic (hydro thấp)",en:"Basic (low-H)"},{vi:"Que đồng",en:"Copper"}],ans:2,
   exp:{vi:"Que basic cho hàm lượng hydro thấp → chống nứt nguội.",en:"Basic = low hydrogen → resists hydrogen cracking."}},
  {vi:"Vì sao phải sấy que basic trước khi dùng?",en:"Why bake basic electrodes?",
   opts:[{vi:"Cho đẹp hơn",en:"For appearance"},{vi:"Loại bỏ ẩm/hydro",en:"Remove moisture/hydrogen"},{vi:"Tăng tốc độ hàn",en:"Faster welding"},{vi:"Giảm giá",en:"Lower cost"}],ans:1,
   exp:{vi:"Ẩm sinh hydro gây nứt; sấy để loại ẩm.",en:"Moisture introduces hydrogen → cracking."}},
  {vi:"Nhiệt độ sấy điển hình cho que basic trước khi dùng?",en:"Typical baking temperature for basic electrodes?",
   opts:[{vi:"70–100°C",en:"70–100°C"},{vi:"120–150°C",en:"120–150°C"},{vi:"300–350°C",en:"300–350°C"},{vi:"500–600°C",en:"500–600°C"}],ans:2,
   exp:{vi:"Sấy 300–350°C (1–2h); 120–150°C là tủ GIỮ, ~70°C là ống đựng giữ nhiệt.",en:"Bake at 300–350°C; 120–150°C is the holding oven, ~70°C the quiver."}},
  {vi:"Số '1' trong E7018 nghĩa là gì?",en:"What does the '1' in E7018 mean?",
   opts:[{vi:"Bền kéo 1 ksi",en:"1 ksi tensile"},{vi:"Hàn được mọi vị trí",en:"Usable in all positions"},{vi:"Chỉ hàn bằng",en:"Flat only"},{vi:"1 lớp vỏ bọc",en:"One coating layer"}],ans:1,
   exp:{vi:"E-70-1-8: 70 ksi; 1 = mọi vị trí; 8 = basic ít hydro bột sắt.",en:"E-70-1-8: 70 ksi; 1 = all positions; 8 = basic low-hydrogen iron powder."}},
  {vi:"Que nào cho ngấu sâu nhất, hay dùng hàn lớp lót ống tụt xuống?",en:"Which electrode gives deepest penetration, used for pipeline vertical-down roots?",
   opts:[{vi:"Rutile (E6013)",en:"Rutile (E6013)"},{vi:"Basic (E7018)",en:"Basic (E7018)"},{vi:"Cellulosic (E6010)",en:"Cellulosic (E6010)"},{vi:"Bột sắt năng suất cao",en:"Iron-powder high recovery"}],ans:2,
   exp:{vi:"Cellulosic: hồ quang mạnh, ngấu sâu, kỹ thuật stovepipe — nhưng hydro rất cao.",en:"Cellulosic: fierce deep arc, stovepipe technique — but very high hydrogen."}},
  {vi:"Loại thuốc SAW nào hút ẩm và phải bảo quản như que basic?",en:"Which SAW flux is hygroscopic and stored like basic electrodes?",
   opts:[{vi:"Nung chảy (fused)",en:"Fused"},{vi:"Thiêu kết (agglomerated)",en:"Agglomerated"},{vi:"Cả hai",en:"Both"},{vi:"Không loại nào",en:"Neither"}],ans:1,
   exp:{vi:"Agglomerated hút ẩm (cần sấy); fused dạng thủy tinh không hút ẩm.",en:"Agglomerated is hygroscopic; fused is glassy and is not."}},
 ]},

/* 4 ===================================================== */
{vi:"Ký hiệu mối hàn & bản vẽ", en:"Welding Symbols & Drawings",
 intro:{vi:"Đọc ký hiệu hàn theo ISO 2553 / AWS A2.4 trên bản vẽ.",en:"Reading weld symbols (ISO 2553 / AWS A2.4)."},
 lessons:[
  {t_vi:"Đường tham chiếu",t_en:"Reference line",vi:"Đường ngang mang thông tin mối hàn; mũi tên chỉ vị trí mối hàn.",en:"Horizontal line carrying weld info; arrow points to the joint."},
  {t_vi:"Ký hiệu phía mũi tên",t_en:"Arrow side",vi:"Ký hiệu ĐẶT DƯỚI đường tham chiếu (ISO) = mối hàn phía mũi tên.",en:"Symbol BELOW the reference line (ISO) = arrow-side weld."},
  {t_vi:"Ký hiệu phía kia",t_en:"Other side",vi:"Ký hiệu ĐẶT TRÊN đường tham chiếu (ISO) = phía đối diện mũi tên.",en:"Symbol ABOVE the line (ISO) = other side."},
  {t_vi:"Mối hàn góc",t_en:"Fillet weld",vi:"Ký hiệu tam giác; kèm chiều cao chân 'a' hoặc cạnh 'z'.",en:"Triangle symbol; with throat 'a' or leg 'z'."},
  {t_vi:"Mối hàn giáp mép",t_en:"Butt weld",vi:"Ký hiệu theo kiểu vát: chữ V, U, J, vát đơn... kèm góc & khe hở.",en:"Symbol by prep type: V, U, J, bevel, with angle & gap."},
  {t_vi:"Hàn quanh / tại hiện trường",t_en:"Weld all-round / field weld",vi:"Vòng tròn tại giao điểm = hàn quanh; cờ = hàn tại công trường.",en:"Circle = weld all-round; flag = field weld."},
  {t_vi:"ISO 2553 vs AWS A2.4",t_en:"ISO 2553 vs AWS A2.4",vi:"ISO (hệ châu Âu cũ): có thêm đường đứt nét (identification line) — ký hiệu đặt trên đường đứt nét = phía bên kia. AWS: chỉ một đường liền, ký hiệu DƯỚI đường = phía mũi tên, TRÊN đường = phía bên kia.",en:"ISO system may use a dashed identification line — symbol on the dashed line = other side. AWS: single solid line; symbol BELOW = arrow side, ABOVE = other side."},
  {t_vi:"Ký hiệu vát mép cơ bản",t_en:"Basic preparation symbols",vi:"I (vuông, không vát); V đơn; HV (bevel – vát một bên); U; J; V kép = X; bevel kép = K. Mép vát chỉ một bên (HV, J): mũi tên gãy chỉ vào tấm được vát.",en:"Square (I); single-V; single-bevel (HV); U; J; double-V = X; double-bevel = K. For one-sided preps, a broken arrow points at the prepared member."},
  {t_vi:"Kích thước mối hàn góc: a và z",t_en:"Fillet sizing: a vs z",vi:"z = cạnh (leg); a = chiều cao cổ thiết kế (design throat). Quan hệ mối hàn cân: a ≈ 0,7z (z ≈ 1,4a). Vd z10 ↔ a7. Ghi TRƯỚC ký hiệu theo ISO: a5△ hoặc z7△.",en:"z = leg; a = design throat. Mitre fillet: a ≈ 0.7z (z ≈ 1.4a), e.g. z10 ↔ a7. ISO writes the size before the symbol: a5 or z7."},
  {t_vi:"Mối hàn ngắt quãng",t_en:"Intermittent welds",vi:"Ghi n × l (e): n đoạn, mỗi đoạn dài l, khoảng trống e. So le hai phía (staggered) có ký hiệu riêng (Z giữa hai tam giác). Đọc kỹ khoảng cách là hở hay bước (pitch).",en:"Noted n × l (e): n welds of length l with gap e. Staggered both-sides has its own symbol. Check whether the figure is the clear gap or the pitch."},
  {t_vi:"Ký hiệu bổ sung bề mặt",t_en:"Supplementary contour symbols",vi:"Phẳng (flush – gạch ngang), lồi (convex – cung lồi), lõm (concave – cung lõm), chân mối hàn được mài chuyển tiếp mượt (toes blended). Có thể kèm phương pháp gia công (G = mài, M = gia công cơ).",en:"Flush (straight bar), convex, concave, toes blended smoothly. May carry finishing method letters (G = grind, M = machine)."},
  {t_vi:"Tấm lót: M và MR",t_en:"Backing: M and MR",vi:"M = tấm lót giữ lại vĩnh viễn; MR = tấm lót tháo bỏ sau khi hàn. Lót gốm (ceramic backing) dùng cho hàn một phía năng suất cao.",en:"M = permanent backing; MR = removable backing. Ceramic backing supports high-productivity single-sided welding."},
  {t_vi:"Hàn chu vi & hàn tại công trường",t_en:"Weld all round & site weld",vi:"Vòng tròn tại gãy mũi tên = hàn hết chu vi. Cờ = hàn tại công trường (field weld). Hai ký hiệu có thể dùng đồng thời.",en:"Circle at the arrow break = weld all round. Flag = site/field weld. Both can appear together."},
  {t_vi:"Thông tin ở đuôi (tail)",t_en:"Tail information",vi:"Đuôi rẽ nhánh chứa: mã quá trình ISO 4063 (vd 111, 135, 141), cấp chất lượng (ISO 5817-B), WPS, hoặc ghi chú NDT. Không có thông tin thì bỏ đuôi.",en:"The forked tail holds: ISO 4063 process number, quality level (ISO 5817-B), WPS reference or NDT notes. Omitted if empty."},
  {t_vi:"Mối hàn lỗ & điểm",t_en:"Plug, slot & spot welds",vi:"Plug/slot: hàn lấp lỗ tròn/rãnh trên tấm chồng. Spot (điểm) & seam (đường liền) thường cho hàn điện trở tấm mỏng; ký hiệu vòng tròn/hai vạch song song.",en:"Plug/slot fill holes in lapped plates. Spot and seam welds (resistance welding of sheet) use circle / parallel-line symbols."},
  {t_vi:"Đọc bản vẽ: thông tin cần tìm",t_en:"Reading a drawing",vi:"Thanh tra cần xác định: kiểu mối nối, kích thước & loại mối hàn, vị trí hàn, WPS áp dụng, yêu cầu NDT, dung sai, vật liệu (mã & chiều dày), các mối hàn tại xưởng vs công trường.",en:"Identify: joint type, weld type & size, position, applicable WPS, NDT requirements, tolerances, material grade & thickness, shop vs site welds."},
 ],
 key:[
  {vi:"ISO 2553 và AWS A2.4 ĐẶT NGƯỢC nhau về vị trí 'arrow side'. Phải biết đang dùng hệ nào!",en:"ISO and AWS place arrow-side oppositely — know which system applies!"},
  {vi:"Mẹo thi: a = cổ, z = cạnh, a ≈ 0,7z. Đề rất hay hỏi đổi giữa a và z.",en:"Exam tip: a = throat, z = leg, a ≈ 0.7z. Converting a ↔ z is a favourite question."},
 ],
 quiz:[
  {vi:"Trong ISO 2553, ký hiệu đặt DƯỚI đường tham chiếu nghĩa là gì?",en:"In ISO 2553, a symbol BELOW the reference line means?",
   opts:[{vi:"Phía mũi tên",en:"Arrow side"},{vi:"Phía đối diện",en:"Other side"},{vi:"Hàn quanh",en:"All round"},{vi:"Hàn hiện trường",en:"Field weld"}],ans:0,
   exp:{vi:"ISO: dưới đường = phía mũi tên.",en:"ISO: below line = arrow side."}},
  {vi:"Vòng tròn tại giao điểm mũi tên–đường tham chiếu nghĩa là?",en:"A circle at the arrow/line junction means?",
   opts:[{vi:"Hàn hiện trường",en:"Field weld"},{vi:"Hàn quanh chu vi",en:"Weld all round"},{vi:"Mài phẳng",en:"Grind flush"},{vi:"Kiểm tra NDT",en:"NDT required"}],ans:1,
   exp:{vi:"Vòng tròn = hàn quanh (all-round).",en:"Circle = weld all-round."}},
  {vi:"Mối hàn góc ghi z10, chiều cao cổ thiết kế xấp xỉ bao nhiêu?",en:"A fillet marked z10 has a design throat of about?",
   opts:[{vi:"10 mm",en:"10 mm"},{vi:"7 mm",en:"7 mm"},{vi:"14 mm",en:"14 mm"},{vi:"5 mm",en:"5 mm"}],ans:1,
   exp:{vi:"a ≈ 0,7 × z = 0,7 × 10 = 7 mm.",en:"a ≈ 0.7 × z = 7 mm."}},
  {vi:"Ký hiệu chữ X trên bản vẽ thể hiện kiểu vát nào?",en:"An X symbol represents which preparation?",
   opts:[{vi:"V đơn",en:"Single-V"},{vi:"V kép (hai phía)",en:"Double-V"},{vi:"U đơn",en:"Single-U"},{vi:"Không vát",en:"Square edge"}],ans:1,
   exp:{vi:"X = double-V: vát chữ V cả hai phía, giảm biến dạng góc & lượng kim loại đắp trên tấm dày.",en:"X = double-V, both sides — less distortion and filler on thick plate."}},
  {vi:"Ký hiệu M trong ô lót mối hàn nghĩa là gì?",en:"What does M mean on a backing symbol?",
   opts:[{vi:"Lót tháo bỏ được",en:"Removable backing"},{vi:"Lót giữ lại vĩnh viễn",en:"Permanent backing"},{vi:"Mài phẳng",en:"Grind flush"},{vi:"Hàn máy",en:"Machine weld"}],ans:1,
   exp:{vi:"M = lót vĩnh viễn; MR = lót tháo bỏ sau hàn.",en:"M = permanent; MR = removable."}},
  {vi:"Trong hệ AWS, ký hiệu nằm DƯỚI đường tham chiếu nghĩa là?",en:"In AWS, a symbol BELOW the reference line means?",
   opts:[{vi:"Hàn phía mũi tên",en:"Weld on arrow side"},{vi:"Hàn phía bên kia",en:"Weld on other side"},{vi:"Hàn cả hai phía",en:"Both sides"},{vi:"Không hàn",en:"No weld"}],ans:0,
   exp:{vi:"AWS: dưới đường = phía mũi tên; trên đường = phía bên kia.",en:"AWS: below = arrow side; above = other side."}},
 ]},

/* 5 ===================================================== */
{vi:"Khuyết tật mối hàn & nguyên nhân", en:"Weld Defects & Imperfections",
 intro:{vi:"Phân loại khuyết tật theo ISO 6520, nguyên nhân & cách phòng tránh — chương trọng tâm thi.",en:"ISO 6520 imperfections, causes & prevention — a core exam topic."},
 lessons:[
  {t_vi:"Phân loại ISO 6520",t_en:"ISO 6520-1 groups",vi:"Khuyết tật chia 6 nhóm: 1-Nứt, 2-Rỗ/lỗ khí, 3-Ngậm rắn (xỉ/vonfram), 4-Thiếu ngấu/thấu, 5-Sai hình dạng, 6-Khuyết tật khác.",en:"6 groups: 1-cracks, 2-cavities, 3-solid inclusions, 4-lack of fusion/penetration, 5-imperfect shape, 6-miscellaneous."},
  {t_vi:"Nứt",t_en:"Cracks",vi:"Nguy hiểm nhất. Nứt nóng (solidification) & nứt nguội (hydrogen/HAZ). Hầu hết tiêu chuẩn KHÔNG cho phép.",en:"Most serious. Hot (solidification) & cold (hydrogen/HAZ) cracks. Usually not allowed."},
  {t_vi:"Rỗ khí",t_en:"Porosity",vi:"Bọt khí kẹt do bẩn, ẩm, mất khí bảo vệ. Dạng đơn, chùm, hoặc đường.",en:"Gas trapped from contamination/loss of shielding. Isolated, cluster or linear."},
  {t_vi:"Ngậm xỉ",t_en:"Slag inclusion",vi:"Xỉ không nổi hết, kẹt lại — do làm sạch giữa lớp kém, dòng thấp.",en:"Slag not removed between runs; low current."},
  {t_vi:"Không ngấu",t_en:"Lack of fusion",vi:"Kim loại đắp không nóng chảy với kim loại nền/lớp trước. Do dòng thấp, tốc độ nhanh.",en:"Deposited metal not fused with parent/previous run; low heat, fast travel."},
  {t_vi:"Không thấu chân",t_en:"Lack of penetration",vi:"Chân mối hàn không điền đầy — khe hở nhỏ, góc vát hẹp, dòng thấp.",en:"Root not filled — tight gap, narrow angle, low current."},
  {t_vi:"Cháy chân (undercut)",t_en:"Undercut",vi:"Rãnh lõm ở mép mối hàn do dòng cao/tốc độ nhanh/góc que sai.",en:"Groove at weld toe; high current, fast travel, wrong angle."},
  {t_vi:"Chảy tràn (overlap)",t_en:"Overlap",vi:"Kim loại đắp tràn lên bề mặt không nóng chảy — dòng thấp, tốc độ chậm.",en:"Metal flows over unfused surface; low current, slow travel."},
  {t_vi:"Lẹm/khuyết chân",t_en:"Root concavity",vi:"Chân mối hàn bị lõm — khe hở rộng, dòng quá cao khi hàn lót.",en:"Root underfilled/concave; wide gap, excessive root current."},
  {t_vi:"Vảy hàn / văng tóe",t_en:"Spatter",vi:"Hạt kim loại bắn ra ngoài — dòng cao, hồ quang dài.",en:"Stray metal droplets; high current, long arc."},
  {t_vi:"Nứt nguội do hydro: 4 điều kiện",t_en:"Hydrogen (cold) cracking: 4 factors",vi:"Xảy ra khi ĐỦ 4 yếu tố: (1) hydro > ~15 ml/100g kim loại đắp; (2) tổ chức nhạy cảm, độ cứng ≥ ~350 HV; (3) ứng suất kéo (co ngót/kẹp chặt); (4) nhiệt độ < ~300°C. Loại bỏ MỘT yếu tố là tránh được nứt.",en:"Needs ALL four: (1) hydrogen > ~15 ml/100g weld metal; (2) susceptible microstructure ≥ ~350 HV; (3) tensile stress (restraint/shrinkage); (4) temperature below ~300°C. Remove ONE factor and cracking is prevented."},
  {t_vi:"Phòng nứt nguội",t_en:"Preventing cold cracking",vi:"Que basic sấy đúng, tiền nhiệt & duy trì interpass, nhiệt đầu vào đủ, hàn đính đủ dài, PWHT/hydrogen soak khi cần, tránh hàn khi ẩm ướt. Nứt có thể xuất hiện TRỄ 48–72h → NDT cuối nên chờ.",en:"Baked basics, preheat & interpass control, adequate heat input, proper tack length, PWHT/hydrogen soak, no welding on damp joints. Cracks can appear 48–72 h LATER — delay final NDT."},
  {t_vi:"Nứt nóng (solidification)",t_en:"Solidification (hot) cracking",vi:"Nứt giữa tâm mối hàn khi đông đặc. Nguyên nhân: lưu huỳnh/phốt-pho cao (tạo màng FeS nóng chảy thấp), tỷ lệ sâu/rộng lớn (SAW), pha loãng từ vật liệu bẩn. Phòng: thép sạch, Mn đủ, giảm dòng, dạng mối hàn hợp lý.",en:"Centreline cracking during solidification. Causes: high S/P (low-melting FeS films), high depth/width ratio (SAW), dilution from contaminated plate. Prevent: clean steel, adequate Mn, lower current, correct bead shape."},
  {t_vi:"Rách lớp (lamellar tearing)",t_en:"Lamellar tearing",vi:"Nứt bậc thang trong VẬT LIỆU CƠ BẢN dưới mối hàn, do ứng suất kéo theo chiều DÀY tấm + tạp chất dạng dải (MnS). Gặp ở mối T/góc bị kẹp chặt. Phòng: thép chất lượng Z (Z25/Z35), đổi thiết kế mối nối, lớp đệm (buttering).",en:"Step-like cracking in the PARENT metal below the weld: through-thickness strain + planar MnS inclusions. Found at restrained T/corner joints. Prevent: Z-grade plate (Z25/Z35), redesign the joint, buttering layers."},
  {t_vi:"Nứt tái nung (reheat)",t_en:"Reheat cracking",vi:"Xuất hiện trong HAZ hạt thô khi PWHT hoặc vận hành nhiệt độ cao, ở thép hợp kim Cr-Mo-V. Phòng: kiểm soát hạt, mài chân mối hàn trước PWHT, quy trình nhiệt đúng.",en:"Occurs in coarse-grained HAZ during PWHT or high-temperature service, in Cr-Mo-V steels. Prevent: grain control, toe grinding before PWHT, correct heat-treatment procedure."},
  {t_vi:"Phân loại rỗ khí",t_en:"Porosity types",vi:"Rỗ phân tán đều; rỗ cụm (cluster – thường tại điểm ngắt/mồi lại); rỗ ống/giun (wormhole – khí bị kẹt kéo dài); rỗ bề mặt; crater pipe (lõm co ngót tại hõm kết thúc). Nguyên nhân chung: khí bị kẹt — ẩm, dầu mỡ, sơn, mất khí bảo vệ, hồ quang quá dài.",en:"Uniform; cluster (often at stop/starts); wormhole/piping (elongated trapped gas); surface pores; crater pipe (shrinkage at an unfilled crater). Causes: moisture, oil, paint, primer, lost shielding, long arc."},
  {t_vi:"Ngậm vonfram & đồng",t_en:"Tungsten & copper inclusions",vi:"Vonfram (TIG): điện cực chạm vũng hàn/dòng quá cao — đốm SÁNG trên phim RT (kim loại nặng). Đồng: từ bép tiếp điện hoặc tấm lót đồng — nguy hiểm vì đồng gây nứt.",en:"Tungsten (TIG): electrode dipped or current too high — shows BRIGHT on radiographs (dense metal). Copper: from contact tip or copper backing — dangerous, copper promotes cracking."},
  {t_vi:"Cháy thủng & chảy xệ",t_en:"Burn-through & excess penetration",vi:"Cháy thủng (burn-through): thủng lớp lót do dòng cao/khe hở rộng/mặt đáy mỏng. Đâm xuyên quá mức (excess penetration): chân lồi quá tiêu chuẩn. Lõm chân (root concavity): lớp lót bị hút lõm — thường do khe hở lớn, hàn trần.",en:"Burn-through: hole in the root from high current/wide gap/thin root face. Excess penetration: root proud beyond limits. Root concavity: sucked-back root, often from wide gaps or overhead welding."},
  {t_vi:"Vết mồi hồ quang (arc strike)",t_en:"Arc strikes (stray arcing)",vi:"Mồi hồ quang ngoài rãnh hàn tạo điểm tôi cứng giòn (martensite cục bộ) → có thể nứt. Là khuyết tật phải xử lý (mài kiểm tra MT/PT), không được bỏ qua.",en:"Striking the arc outside the groove creates small hard brittle (martensitic) spots that may crack. A defect: grind out and verify with MT/PT — never ignore."},
  {t_vi:"Lệch mép (hi-lo)",t_en:"Misalignment (hi-lo)",vi:"Hai mép lệch nhau (linear misalignment) làm giảm tiết diện chịu lực & tạo điểm tập trung ứng suất. Đo bằng dưỡng hi-lo TRƯỚC khi hàn; tiêu chuẩn giới hạn theo % chiều dày.",en:"Linear misalignment of the two edges reduces effective section and concentrates stress. Measured with a hi-lo gauge BEFORE welding; limits set as % of thickness."},
  {t_vi:"Khuyết tật hình dạng khác",t_en:"Other profile imperfections",vi:"Cap quá lồi (excess reinforcement), góc chân mối hàn quá dốc, bề mặt nhấp nhô (irregular ripples), bắn tóe bám, vết mài quá sâu (làm mỏng vật liệu), đường hàn không thẳng (linear misalignment of runs).",en:"Excess cap reinforcement, sharp toe angles, irregular ripples, adherent spatter, excessive grinding (under-thickness), poorly aligned runs."},
  {t_vi:"Khuyết tật theo RT: nhận dạng",t_en:"Defect appearance on radiographs",vi:"Rỗ khí: chấm TỐI tròn. Xỉ: vệt tối lởm chởm dọc rìa. Thiếu ngấu thành: đường tối thẳng lệch tâm. Thiếu thấu: đường tối thẳng ngay giữa. Vonfram: đốm SÁNG. Nứt: đường tối mảnh ngoằn ngoèo.",en:"Porosity: round DARK spots. Slag: irregular dark lines along the edges. Lack of sidewall fusion: straight dark line off-centre. Incomplete root penetration: straight dark central line. Tungsten: BRIGHT spot. Crack: fine wandering dark line."},
 ],
 key:[
  {vi:"Nứt = khuyết tật phẳng (planar) nguy hiểm nhất vì gây tập trung ứng suất → phá hủy.",en:"Cracks are planar defects — worst, cause stress concentration → failure."},
  {vi:"Undercut & lack of fusion là khuyết tật bề mặt/mép thường gặp; nhớ rõ nguyên nhân.",en:"Undercut & lack of fusion are common; memorise causes."},
  {vi:"Học thuộc 4 điều kiện nứt nguội (H2 – độ cứng/tổ chức – ứng suất – nhiệt độ <300°C) và cách phá từng điều kiện. Đây là chủ đề CHẮC CHẮN có trong đề.",en:"Memorise the 4 cold-cracking factors (hydrogen – hard microstructure – stress – temp <300°C) and how to remove each. Guaranteed exam topic."},
  {vi:"Nứt nóng: yếu tố Lưu huỳnh (S). Nứt nguội: Hydro. Rách lớp: tạp chất MnS + ứng suất theo chiều dày. Đừng nhầm lẫn ba loại này.",en:"Hot cracking: sulphur. Cold cracking: hydrogen. Lamellar tearing: MnS inclusions + through-thickness strain. Do not mix them up."},
 ],
 quiz:[
  {vi:"Khuyết tật nào được coi là nghiêm trọng nhất?",en:"Which is the most serious defect?",
   opts:[{vi:"Văng tóe",en:"Spatter"},{vi:"Rỗ khí đơn lẻ",en:"Isolated porosity"},{vi:"Nứt",en:"Crack"},{vi:"Vảy hàn",en:"Spatter"}],ans:2,
   exp:{vi:"Nứt là khuyết tật phẳng nguy hiểm nhất.",en:"Cracks are the most serious (planar)."}},
  {vi:"Nguyên nhân phổ biến của cháy chân (undercut)?",en:"Common cause of undercut?",
   opts:[{vi:"Dòng quá thấp",en:"Current too low"},{vi:"Dòng cao / tốc độ nhanh / góc sai",en:"High current/fast travel/wrong angle"},{vi:"Que quá khô",en:"Rod too dry"},{vi:"Khe hở quá hẹp",en:"Gap too tight"}],ans:1,
   exp:{vi:"Undercut do nhiệt quá lớn ở mép: dòng cao, tốc độ nhanh, góc sai.",en:"Undercut = too much heat at toe."}},
  {vi:"Rỗ khí (porosity) thường do?",en:"Porosity is usually caused by?",
   opts:[{vi:"Bẩn/ẩm/mất khí bảo vệ",en:"Contamination/moisture/loss of shielding"},{vi:"Dòng quá thấp",en:"Low current"},{vi:"Góc vát rộng",en:"Wide bevel"},{vi:"Hàn quá chậm",en:"Slow travel"}],ans:0,
   exp:{vi:"Khí kẹt do bẩn, ẩm hoặc mất khí bảo vệ.",en:"Trapped gas from contamination/loss of shielding."}},
  {vi:"Không ngấu (lack of fusion) khác không thấu (lack of penetration) ở điểm nào?",en:"Lack of fusion vs lack of penetration?",
   opts:[{vi:"Giống hệt nhau",en:"They are identical"},{vi:"Không ngấu: không chảy dính; không thấu: chân không điền đầy",en:"LoF=no fusion bond; LoP=root not filled"},{vi:"Cả hai chỉ ở bề mặt",en:"Both surface only"},{vi:"Cả hai là nứt",en:"Both are cracks"}],ans:1,
   exp:{vi:"Không ngấu là thiếu liên kết nóng chảy; không thấu là chân mối hàn không điền đủ.",en:"LoF = missing fusion; LoP = root not filled."}},
  {vi:"Yếu tố nào KHÔNG phải điều kiện gây nứt nguội do hydro?",en:"Which is NOT a hydrogen cold-cracking factor?",
   opts:[{vi:"Hydro khuếch tán cao",en:"High diffusible hydrogen"},{vi:"Tổ chức cứng ≥350 HV",en:"Hard microstructure ≥350 HV"},{vi:"Hàm lượng lưu huỳnh cao",en:"High sulphur content"},{vi:"Ứng suất kéo lớn",en:"High tensile stress"}],ans:2,
   exp:{vi:"Lưu huỳnh gây NỨT NÓNG; 4 yếu tố nứt nguội là H2, tổ chức cứng, ứng suất, nhiệt độ thấp.",en:"Sulphur causes HOT cracking; the four cold factors are H2, hard structure, stress, low temperature."}},
  {vi:"Rách lớp (lamellar tearing) xảy ra ở đâu?",en:"Where does lamellar tearing occur?",
   opts:[{vi:"Giữa tâm kim loại mối hàn",en:"Weld metal centreline"},{vi:"Trong vật liệu cơ bản dưới mối hàn, dạng bậc thang",en:"In parent metal below the weld, step-like"},{vi:"Trên bề mặt cap",en:"On the cap surface"},{vi:"Trong que hàn",en:"In the electrode"}],ans:1,
   exp:{vi:"Rách lớp nằm trong tấm thép (ứng suất theo chiều dày + MnS dạng dải), không phải trong mối hàn.",en:"It lies in the plate (through-thickness strain + planar MnS), not in the weld."}},
  {vi:"Trên phim RT, ngậm vonfram hiện ra thế nào?",en:"How does a tungsten inclusion appear on a radiograph?",
   opts:[{vi:"Đốm tối tròn",en:"Round dark spot"},{vi:"Đốm sáng",en:"Bright (light) spot"},{vi:"Đường tối giữa mối hàn",en:"Dark central line"},{vi:"Không thấy được",en:"Invisible"}],ans:1,
   exp:{vi:"Vonfram đặc hơn thép → cản tia nhiều → đốm SÁNG trên phim.",en:"Tungsten is denser than steel — absorbs more radiation — bright spot."}},
  {vi:"Vì sao NDT cuối cùng nên thực hiện sau 48–72 giờ với thép dễ nứt nguội?",en:"Why delay final NDT 48–72 h on crack-sensitive steels?",
   opts:[{vi:"Cho mối hàn nguội để dễ chụp",en:"Weld cools for easier filming"},{vi:"Nứt hydro có thể xuất hiện trễ",en:"Hydrogen cracks can appear late"},{vi:"Tiết kiệm phim",en:"Saves film"},{vi:"Không có lý do",en:"No reason"}],ans:1,
   exp:{vi:"Nứt nguội là loại nứt TRỄ — có thể hình thành nhiều giờ tới vài ngày sau khi hàn.",en:"Cold cracking is DELAYED — it can form hours to days after welding."}},
 ]},

/* 6 ===================================================== */
{vi:"Kiểm tra phá hủy (DT)", en:"Destructive Testing",
 intro:{vi:"Các phép thử phá hủy để xác định cơ tính & chất lượng mối hàn.",en:"Destructive tests for mechanical properties & soundness."},
 lessons:[
  {t_vi:"Thử kéo",t_en:"Tensile test",vi:"Xác định giới hạn bền, giới hạn chảy, độ giãn dài.",en:"Determines UTS, yield strength, elongation."},
  {t_vi:"Thử uốn",t_en:"Bend test",vi:"Uốn mặt/chân/cạnh để phát hiện không ngấu, nứt — đánh giá độ dẻo.",en:"Face/root/side bend reveals fusion/ductility defects."},
  {t_vi:"Thử va đập",t_en:"Impact (Charpy) test",vi:"Đo độ dai (năng lượng hấp thụ) ở nhiệt độ quy định, có khía V.",en:"Charpy V-notch measures toughness (absorbed energy) at set temperature."},
  {t_vi:"Thử độ cứng",t_en:"Hardness test",vi:"Vickers/Brinell/Rockwell; HAZ quá cứng → nguy cơ nứt.",en:"Vickers/Brinell/Rockwell; over-hard HAZ → cracking risk."},
  {t_vi:"Thử macro",t_en:"Macro test",vi:"Cắt ngang, mài, tẩm thực (etch) để xem mặt cắt: ngấu, lớp hàn, khuyết tật.",en:"Sectioned, polished, etched to reveal fusion, runs, defects."},
  {t_vi:"Thử nứt góc",t_en:"Fillet fracture test",vi:"Bẻ gãy mối hàn góc để lộ mặt gãy bên trong.",en:"Breaking a fillet to expose the internal fracture face."},
  {t_vi:"Kéo ngang vs kéo toàn kim loại hàn",t_en:"Transverse vs all-weld tensile",vi:"Kéo ngang mối hàn (transverse): mẫu vuông góc mối hàn, kiểm tra mối nối có bền bằng vật liệu cơ bản không (vị trí đứt quan trọng). Kéo dọc toàn kim loại hàn (all-weld): mẫu lấy hoàn toàn trong kim loại đắp, đo bền kéo, giới hạn chảy, độ giãn dài của riêng kim loại hàn.",en:"Transverse: specimen across the joint — does the joint match parent strength (fracture location matters). All-weld-metal: machined wholly from deposit — gives the weld metal's own UTS, yield and elongation."},
  {t_vi:"Thử uốn: 3 kiểu",t_en:"Bend tests: root, face, side",vi:"Uốn chân (root bend): chân mối hàn chịu kéo — lộ khuyết tật chân. Uốn mặt (face bend): mặt cap chịu kéo. Uốn cạnh (side bend): cho tấm DÀY (thường ≥12 mm) — lộ thiếu ngấu thành vát. Đạt khi không có vết nứt quá giới hạn (vd 3 mm).",en:"Root bend: root in tension — reveals root defects. Face bend: cap in tension. Side bend: for THICK plate (typically ≥12 mm) — reveals lack of sidewall fusion. Pass if no defect exceeds the limit (e.g. 3 mm)."},
  {t_vi:"Charpy: kích thước & cách đọc",t_en:"Charpy V-notch details",vi:"Mẫu chuẩn 10×10×55 mm, rãnh V sâu 2 mm. Kết quả đo bằng Joule, thử ở nhiệt độ quy định (vd −20°C, −40°C). Thép C-Mn có vùng chuyển tiếp dẻo–giòn; mặt gãy dẻo xám xơ, giòn sáng phẳng.",en:"Standard specimen 10×10×55 mm, 2 mm deep V-notch. Energy in joules at a specified temperature (e.g. −20°C). C-Mn steels show a ductile–brittle transition; ductile fracture is dull/fibrous, brittle is bright/flat."},
  {t_vi:"Thử độ cứng: HV là chuẩn",t_en:"Hardness testing",vi:"Vickers (HV10) phổ biến nhất cho khảo sát mối hàn: dãy điểm đo qua kim loại hàn – HAZ – vật liệu cơ bản. Điểm cứng nhất thường ở HAZ sát đường chảy. Giới hạn điển hình thép C-Mn ~350 HV (dịch vụ chua/sour: thấp hơn, ~248 HV).",en:"Vickers (HV10) is standard for weld surveys: traverse across weld–HAZ–parent. Hardest point is usually the HAZ near the fusion line. Typical C-Mn limit ~350 HV (sour service lower, ~248 HV)."},
  {t_vi:"Macro & micro",t_en:"Macro vs micro examination",vi:"Macro: mặt cắt mài + tẩm thực, soi ≤ ~×10 — xem hình học mối hàn, ngấu, khuyết tật, số lớp. Micro: mài bóng, soi ×100–×1000 — xem tổ chức tế vi (pha, hạt, tạp chất nhỏ).",en:"Macro: ground & etched section at ≤ ~×10 — geometry, fusion, defects, run sequence. Micro: polished, ×100–×1000 — microstructure (phases, grains, fine inclusions)."},
  {t_vi:"Thử STRA (chiều dày Z)",t_en:"Through-thickness (STRA / Z) test",vi:"Kéo theo chiều DÀY tấm để đo độ thắt tiết diện (STRA %). Đánh giá khả năng chống rách lớp: Z25 = STRA ≥25%, Z35 ≥35%. Yêu cầu cho mối T kẹp chặt tấm dày.",en:"Tensile test through the plate thickness measuring reduction of area (STRA %). Rates resistance to lamellar tearing: Z25 = ≥25% STRA, Z35 ≥35%. Specified for restrained T-joints in thick plate."},
  {t_vi:"Thử gãy nick-break",t_en:"Nick-break test",vi:"Cắt rãnh mồi hai bên mẫu rồi bẻ gãy qua mối hàn — quan sát mặt gãy tìm rỗ, xỉ, thiếu ngấu bên trong. Đơn giản, hay dùng cho ống (API 1104).",en:"Notched specimen broken through the weld; fracture faces examined for porosity, slag, lack of fusion. Simple; common in pipeline work (API 1104)."},
  {t_vi:"CTOD (độ dai phá hủy)",t_en:"CTOD fracture toughness",vi:"Đo độ mở miệng vết nứt mồi sẵn trước khi lan — đánh giá độ dai phá hủy của vùng cụ thể (HAZ, kim loại hàn) ở nhiệt độ thiết kế. Dùng cho kết cấu quan trọng (giàn khoan, cầu).",en:"Measures crack-tip opening of a fatigue pre-cracked specimen — fracture toughness of a specific zone (HAZ, weld metal) at design temperature. For critical structures (offshore, bridges)."},
 ],
 key:[
  {vi:"DT phá hủy mẫu → chỉ dùng cho mẫu thử/PQR, không dùng cho sản phẩm thật.",en:"DT destroys the sample → used for PQR/coupons, not production parts."},
  {vi:"Charpy = độ dai; Tensile = độ bền; Bend = độ dẻo/độ ngấu; Macro = mặt cắt.",en:"Charpy=toughness, Tensile=strength, Bend=ductility/fusion, Macro=section."},
  {vi:"DT cho kết quả ĐỊNH LƯỢNG (MPa, J, HV, %) để duyệt WPS/PQR; NDT chỉ tìm khuyết tật không phá mẫu. Hai nhóm bổ trợ nhau.",en:"DT gives QUANTITATIVE values (MPa, J, HV, %) for procedure qualification; NDT finds defects non-destructively. They complement each other."},
 ],
 quiz:[
  {vi:"Phép thử nào đo độ dai va đập?",en:"Which test measures impact toughness?",
   opts:[{vi:"Thử kéo",en:"Tensile"},{vi:"Charpy",en:"Charpy"},{vi:"Macro",en:"Macro"},{vi:"Thử cứng",en:"Hardness"}],ans:1,
   exp:{vi:"Charpy V-notch đo năng lượng hấp thụ = độ dai.",en:"Charpy measures toughness."}},
  {vi:"Thử macro dùng để?",en:"Macro test is used to?",
   opts:[{vi:"Đo giới hạn bền",en:"Measure UTS"},{vi:"Xem mặt cắt: độ ngấu, khuyết tật",en:"View section: fusion, defects"},{vi:"Đo độ giãn dài",en:"Measure elongation"},{vi:"Đo độ dai",en:"Measure toughness"}],ans:1,
   exp:{vi:"Macro cho thấy mặt cắt mối hàn sau khi tẩm thực.",en:"Macro reveals the etched cross-section."}},
  {vi:"Mẫu Charpy tiêu chuẩn có kích thước nào?",en:"Standard Charpy specimen size?",
   opts:[{vi:"10×10×55 mm, rãnh V 2 mm",en:"10×10×55 mm, 2 mm V-notch"},{vi:"20×20×100 mm",en:"20×20×100 mm"},{vi:"5×5×25 mm",en:"5×5×25 mm"},{vi:"Tùy ý",en:"Any size"}],ans:0,
   exp:{vi:"Mẫu chuẩn 10×10×55 mm với rãnh V sâu 2 mm, kết quả tính bằng Joule.",en:"10×10×55 mm with a 2 mm deep V-notch; result in joules."}},
  {vi:"Tấm dày 30 mm nên dùng kiểu uốn nào?",en:"Best bend test for 30 mm plate?",
   opts:[{vi:"Uốn chân",en:"Root bend"},{vi:"Uốn mặt",en:"Face bend"},{vi:"Uốn cạnh (side bend)",en:"Side bend"},{vi:"Không uốn được",en:"Cannot bend"}],ans:2,
   exp:{vi:"Tấm dày (≥ ~12 mm) dùng side bend — cắt lát ngang, lộ thiếu ngấu thành vát.",en:"Thick plate uses side bends — slices tested sideways reveal sidewall fusion defects."}},
  {vi:"Vị trí thường CỨNG NHẤT trên mặt cắt mối hàn thép C-Mn?",en:"Usually the hardest location across a C-Mn weld?",
   opts:[{vi:"Tâm kim loại hàn",en:"Weld centre"},{vi:"HAZ sát đường chảy",en:"HAZ next to the fusion line"},{vi:"Vật liệu cơ bản xa mối hàn",en:"Parent metal far away"},{vi:"Bề mặt cap",en:"Cap surface"}],ans:1,
   exp:{vi:"HAZ hạt thô sát đường chảy nguội nhanh nhất → cứng nhất (nguy cơ nứt nguội).",en:"The coarse-grained HAZ at the fusion line cools fastest — hardest (cold-crack risk)."}},
  {vi:"Thử STRA / chất lượng Z dùng để đánh giá nguy cơ nào?",en:"STRA / Z-grade testing assesses which risk?",
   opts:[{vi:"Nứt nóng",en:"Hot cracking"},{vi:"Rách lớp (lamellar tearing)",en:"Lamellar tearing"},{vi:"Rỗ khí",en:"Porosity"},{vi:"Mỏi",en:"Fatigue"}],ans:1,
   exp:{vi:"STRA đo độ dẻo theo chiều dày tấm — chống rách lớp (Z25/Z35).",en:"STRA measures through-thickness ductility — lamellar tearing resistance (Z25/Z35)."}},
 ]},

/* 7 ===================================================== */
{vi:"Kiểm tra không phá hủy (NDT)", en:"Non-Destructive Testing",
 intro:{vi:"4 phương pháp NDT bề mặt & thể tích: VT, PT, MT, RT, UT — ưu/nhược & ứng dụng.",en:"Surface & volumetric NDT: VT, PT, MT, RT, UT."},
 lessons:[
  {t_vi:"Kiểm tra ngoại quan",t_en:"Visual (VT)",vi:"Rẻ nhất, làm đầu tiên. Chỉ thấy khuyết tật bề mặt. Cần ánh sáng, dưỡng đo, thước.",en:"Cheapest, done first. Surface only. Needs light, gauges."},
  {t_vi:"Thẩm thấu chất lỏng",t_en:"Dye Penetrant (PT)",vi:"Phát hiện khuyết tật HỞ BỀ MẶT trên mọi vật liệu (kể cả không từ tính). Không thấy khuyết tật dưới bề mặt.",en:"Detects surface-breaking defects on any material. Surface only."},
  {t_vi:"Bột từ",t_en:"Magnetic Particle (MT)",vi:"Phát hiện khuyết tật bề mặt & ngay dưới bề mặt — CHỈ vật liệu nhiễm từ (thép C).",en:"Surface & slightly sub-surface; ferromagnetic materials only."},
  {t_vi:"Chụp tia X/gamma",t_en:"Radiography (RT)",vi:"Phát hiện khuyết tật THỂ TÍCH (rỗ, ngậm xỉ). Có phim lưu. Kém với khuyết tật phẳng song song tia. Rủi ro bức xạ.",en:"Volumetric defects (porosity, slag). Permanent film. Poor for planar defects; radiation hazard."},
  {t_vi:"Siêu âm",t_en:"Ultrasonic (UT)",vi:"Phát hiện khuyết tật phẳng (nứt, không ngấu) & đo chiều sâu. Không có phim (trừ TOFD/PAUT). Cần thợ tay nghề cao.",en:"Detects planar defects (cracks, LoF) & depth. No film (unless TOFD/PAUT). Skill-dependent."},
  {t_vi:"Chọn phương pháp NDT",t_en:"Choosing the NDT method",vi:"Khuyết tật BỀ MẶT: VT, PT, MT. Khuyết tật BÊN TRONG: RT, UT. Khuyết tật PHẲNG (nứt, thiếu ngấu): UT tốt nhất; khuyết tật KHỐI (rỗ, xỉ): RT tốt nhất. Vật liệu không nhiễm từ (inox austenit, nhôm): không dùng MT → dùng PT.",en:"SURFACE defects: VT, PT, MT. INTERNAL: RT, UT. PLANAR (cracks, lack of fusion): UT best; VOLUMETRIC (porosity, slag): RT best. Non-magnetic materials (austenitic stainless, aluminium): no MT — use PT."},
  {t_vi:"RT: nguồn tia & độ nhạy",t_en:"RT: sources & sensitivity",vi:"Tia X (máy phát, chất lượng ảnh tốt hơn, cần điện) hoặc tia gamma (đồng vị Ir-192, Co-60 cho dày — cơ động, không cần điện, ảnh kém hơn). Độ nhạy kiểm bằng IQI (dây/lỗ), yêu cầu thường ~2% chiều dày.",en:"X-rays (set, better definition, needs power) or gamma (Ir-192; Co-60 for thick — portable, no power, lower definition). Sensitivity proven with an IQI (wire/hole), typically ~2% of thickness."},
  {t_vi:"RT: ưu nhược",t_en:"RT pros & cons",vi:"Ưu: hình ảnh lưu trữ lâu dài, tốt với khuyết tật khối, kiểm cả hai phía. Nhược: NGUY HIỂM phóng xạ (kiểm soát khu vực), kém với khuyết tật phẳng lệch hướng tia, kém với mối T/góc, cần tiếp cận hai phía, tốn kém.",en:"Pros: permanent record, good for volumetric defects. Cons: RADIATION hazard (controlled areas), poor for planar defects misaligned with the beam, poor for T/corner joints, needs two-sided access, costly."},
  {t_vi:"UT: nguyên lý & đầu dò",t_en:"UT: principle & probes",vi:"Sóng siêu âm (1–6 MHz) phản xạ tại bất liên tục. Đầu dò thẳng 0° (đo chiều dày, tách lớp) & đầu dò góc 45/60/70° (quét mối hàn). Cần chất tiếp âm (couplant), bề mặt sạch, người vận hành tay nghề cao.",en:"Ultrasound (1–6 MHz) reflects at discontinuities. 0° probe (thickness, laminations) and angle probes 45/60/70° (weld scanning). Needs couplant, clean surface and a skilled operator."},
  {t_vi:"UT: ưu nhược",t_en:"UT pros & cons",vi:"Ưu: RẤT tốt cho khuyết tật phẳng, đo được độ sâu, chỉ cần một phía, không phóng xạ, kiểm được tấm dày. Nhược: phụ thuộc kỹ năng, khó với hạt thô (inox austenit), khó vật mỏng <8 mm, bản ghi truyền thống hạn chế (trừ phased array/TOFD).",en:"Pros: EXCELLENT for planar defects, gives depth, one-side access, no radiation, thick sections. Cons: operator-dependent, poor on coarse grains (austenitic), difficult below ~8 mm, limited record (unless phased array/TOFD)."},
  {t_vi:"MT: chi tiết kỹ thuật",t_en:"MT details",vi:"Chỉ vật liệu SẮT TỪ. Từ hóa bằng gông (yoke), que điện (prods – cẩn thận vết mồi hồ quang) hoặc cuộn dây. Khuyết tật vuông góc đường sức hiện rõ nhất → từ hóa 2 hướng vuông góc. Mực từ đen + nền trắng, hoặc mực huỳnh quang + đèn UV (nhạy hơn).",en:"FERROMAGNETIC materials only. Magnetise with yoke, prods (beware arc strikes) or coils. Defects at right angles to flux show best — magnetise in 2 perpendicular directions. Black ink on white contrast paint, or fluorescent ink under UV (more sensitive)."},
  {t_vi:"PT: quy trình 5 bước",t_en:"PT: the 5 steps",vi:"(1) Làm sạch & khô; (2) phun thấm đỏ/huỳnh quang, chờ thấm 5–20 phút; (3) lau sạch chất thấm thừa (không xối nước mạnh); (4) phun hiện trắng mỏng; (5) đánh giá chỉ thị sau thời gian hiện. Dùng được mọi vật liệu KHÔNG xốp; chỉ tìm khuyết tật HỞ ra bề mặt.",en:"(1) Clean & dry; (2) apply red/fluorescent penetrant, dwell 5–20 min; (3) remove excess (no flushing); (4) thin white developer; (5) evaluate after development time. Any NON-porous material; only finds defects OPEN to the surface."},
  {t_vi:"VT: điều kiện quan sát",t_en:"VT: viewing conditions",vi:"Theo ISO 17637: ánh sáng tối thiểu 350 lux (khuyến nghị 500 lux), mắt cách bề mặt ≤600 mm, góc nhìn ≥30°. Dụng cụ hỗ trợ: gương, kính lúp ×2–×5, đèn, borescope cho mặt trong ống.",en:"Per ISO 17637: minimum 350 lux (500 recommended), eye within 600 mm of the surface, viewing angle ≥30°. Aids: mirrors, ×2–×5 magnifiers, lamps, borescopes for pipe bores."},
  {t_vi:"Chứng chỉ nhân viên NDT",t_en:"NDT personnel qualification",vi:"ISO 9712 (hoặc SNT-TC-1A): Level 1 thao tác theo hướng dẫn; Level 2 thiết lập, thực hiện & ĐÁNH GIÁ kết quả theo tiêu chuẩn; Level 3 xây dựng quy trình, phê duyệt. Thanh tra hàn cần biết đọc báo cáo NDT.",en:"ISO 9712 (or SNT-TC-1A): Level 1 operates per instruction; Level 2 sets up, tests and INTERPRETS to standards; Level 3 writes procedures, approves. Welding inspectors must be able to read NDT reports."},
  {t_vi:"Bản chất chỉ thị: thật / giả / không liên quan",t_en:"Relevant, non-relevant & false indications",vi:"Chỉ thị giả: do thao tác (mực đọng, vệt lau). Không liên quan: do hình học (rãnh, mép). Liên quan: từ bất liên tục thật — phải đánh giá theo tiêu chuẩn chấp nhận trước khi kết luận đạt/loại.",en:"False: from technique (ink pooling, wipe marks). Non-relevant: from geometry (grooves, edges). Relevant: from real discontinuities — must be evaluated against acceptance criteria."},
 ],
 key:[
  {vi:"RT tốt cho khuyết tật thể tích; UT tốt cho khuyết tật phẳng (nứt). Bổ sung cho nhau.",en:"RT for volumetric; UT for planar (cracks). Complementary."},
  {vi:"PT cho mọi vật liệu; MT chỉ cho vật liệu nhiễm từ nhưng thấy được dưới bề mặt nông.",en:"PT any material (surface only); MT ferromagnetic only (sub-surface a little)."},
  {vi:"Câu thần chú: PHẲNG → UT, KHỐI → RT, bề mặt sắt từ → MT, bề mặt không nhiễm từ → PT.",en:"Mantra: PLANAR → UT, VOLUMETRIC → RT, magnetic surface → MT, non-magnetic surface → PT."},
 ],
 quiz:[
  {vi:"Phương pháp NDT nào tốt nhất để tìm khuyết tật THỂ TÍCH như rỗ khí?",en:"Best NDT for volumetric defects like porosity?",
   opts:[{vi:"UT",en:"UT"},{vi:"RT (chụp phim)",en:"RT"},{vi:"MT",en:"MT"},{vi:"PT",en:"PT"}],ans:1,
   exp:{vi:"RT phát hiện tốt khuyết tật thể tích.",en:"RT excels at volumetric defects."}},
  {vi:"Phương pháp nào tốt nhất để tìm nứt phẳng và đo chiều sâu?",en:"Best for planar cracks & depth?",
   opts:[{vi:"RT",en:"RT"},{vi:"UT",en:"UT"},{vi:"VT",en:"VT"},{vi:"PT",en:"PT"}],ans:1,
   exp:{vi:"UT phát hiện khuyết tật phẳng và xác định chiều sâu.",en:"UT finds planar defects and depth."}},
  {vi:"MT chỉ dùng được cho vật liệu nào?",en:"MT works only on which materials?",
   opts:[{vi:"Mọi vật liệu",en:"Any material"},{vi:"Nhôm",en:"Aluminium"},{vi:"Vật liệu nhiễm từ (thép C)",en:"Ferromagnetic (C-steel)"},{vi:"Nhựa",en:"Plastics"}],ans:2,
   exp:{vi:"MT cần vật liệu nhiễm từ.",en:"MT needs ferromagnetic material."}},
  {vi:"PT có thể phát hiện khuyết tật ở đâu?",en:"PT detects defects where?",
   opts:[{vi:"Sâu bên trong",en:"Deep internal"},{vi:"Chỉ hở bề mặt",en:"Surface-breaking only"},{vi:"Dưới bề mặt 5mm",en:"5mm sub-surface"},{vi:"Mọi vị trí",en:"Anywhere"}],ans:1,
   exp:{vi:"PT chỉ phát hiện khuyết tật hở ra bề mặt.",en:"PT = surface-breaking only."}},
  {vi:"Phương pháp nào phát hiện tốt nhất thiếu ngấu thành vát nằm sâu bên trong?",en:"Best method for subsurface lack of sidewall fusion?",
   opts:[{vi:"RT",en:"RT"},{vi:"UT",en:"UT"},{vi:"MT",en:"MT"},{vi:"PT",en:"PT"}],ans:1,
   exp:{vi:"Khuyết tật phẳng phản xạ sóng âm tốt → UT; RT dễ bỏ sót nếu lệch hướng tia.",en:"Planar defects reflect sound well — UT; RT misses them if misoriented."}},
  {vi:"IQI đặt trên phim RT để làm gì?",en:"What is the IQI on a radiograph for?",
   opts:[{vi:"Đo chiều dày vật",en:"Measure thickness"},{vi:"Chứng minh độ nhạy/chất lượng ảnh đạt yêu cầu",en:"Prove image sensitivity/quality"},{vi:"Đếm khuyết tật",en:"Count defects"},{vi:"Trang trí",en:"Decoration"}],ans:1,
   exp:{vi:"IQI (dây/lỗ) xác nhận kỹ thuật chụp đủ nhạy, thường ~2% chiều dày.",en:"The IQI proves technique sensitivity, typically ~2% of thickness."}},
  {vi:"Vì sao MT phải từ hóa theo HAI hướng vuông góc?",en:"Why magnetise in TWO perpendicular directions for MT?",
   opts:[{vi:"Cho nhanh",en:"It is faster"},{vi:"Khuyết tật song song đường sức khó hiện",en:"Defects parallel to the flux may not show"},{vi:"Tiết kiệm mực",en:"Saves ink"},{vi:"Không cần thiết",en:"Unnecessary"}],ans:1,
   exp:{vi:"Khuyết tật hiện rõ nhất khi VUÔNG GÓC đường sức → cần 2 hướng để phủ mọi phương khuyết tật.",en:"Indications show best at right angles to flux — two shots cover all orientations."}},
  {vi:"PT KHÔNG phát hiện được loại khuyết tật nào?",en:"PT canNOT detect which defect?",
   opts:[{vi:"Nứt hở bề mặt",en:"Surface-breaking crack"},{vi:"Rỗ khí nằm hoàn toàn bên trong",en:"Fully subsurface porosity"},{vi:"Rỗ hở bề mặt",en:"Surface pore"},{vi:"Nứt chân mối hàn hở",en:"Open toe crack"}],ans:1,
   exp:{vi:"PT chỉ tìm khuyết tật HỞ ra bề mặt — không thấy khuyết tật nằm kín bên trong.",en:"PT only finds defects OPEN to the surface."}},
 ]},

/* 8 ===================================================== */
{vi:"WPS / PQR / Chứng nhận thợ hàn", en:"WPS / PQR / Welder Qualification",
 intro:{vi:"Hệ thống tài liệu đảm bảo quy trình hàn & thợ hàn đạt yêu cầu.",en:"Documents ensuring procedure & welder are qualified."},
 lessons:[
  {t_vi:"WPS",t_en:"WPS",vi:"Welding Procedure Specification — chỉ dẫn hàn: vật liệu, que, dòng, vị trí, tiền nhiệt... cho thợ làm theo.",en:"Welding Procedure Specification — instructions the welder follows."},
  {t_vi:"PQR / WPQR",t_en:"PQR",vi:"Procedure Qualification Record — bằng chứng đã hàn & thử nghiệm chứng minh WPS cho mối hàn đạt.",en:"Record proving the WPS produces an acceptable weld via testing."},
  {t_vi:"WPQ / chứng nhận thợ",t_en:"Welder Qualification",vi:"Chứng minh THỢ có kỹ năng làm theo WPS (thử mẫu + kiểm tra).",en:"Proves the WELDER can follow the WPS (test piece + testing)."},
  {t_vi:"Biến số thiết yếu",t_en:"Essential variables",vi:"Thay đổi → ảnh hưởng cơ tính → phải làm lại chứng nhận (vd: quá trình, vật liệu nhóm, tiền nhiệt, vị trí).",en:"Changes affecting properties → re-qualification (process, material group, preheat, position)."},
  {t_vi:"Biến số không thiết yếu",t_en:"Non-essential variables",vi:"Thay đổi không cần làm lại chứng nhận, chỉ cần cập nhật WPS.",en:"Changes needing only a WPS update."},
  {t_vi:"Phạm vi chấp nhận",t_en:"Range of approval",vi:"Mỗi chứng nhận chỉ phủ một khoảng (chiều dày, đường kính, vị trí...) nhất định.",en:"Each qualification covers a defined range (thickness, diameter, position)."},
  {t_vi:"Tiêu chuẩn áp dụng",t_en:"Key standards",vi:"Chứng nhận QUY TRÌNH hàn theo EN ISO 15614; chứng nhận THỢ hàn theo EN ISO 9606. (ASME dùng Section IX).",en:"Procedure qualification to EN ISO 15614; welder qualification to EN ISO 9606. (ASME = Section IX)."},
  {t_vi:"Trình tự pWPS → PQR → WPS",t_en:"pWPS → PQR → WPS sequence",vi:"(1) Soạn pWPS (quy trình sơ bộ); (2) hàn mẫu thử theo pWPS có giám sát; (3) thử DT/NDT mẫu → đạt thì lập PQR/WPQR (hồ sơ chất lượng quy trình); (4) từ PQR viết WPS sản xuất trong phạm vi phê duyệt.",en:"(1) Draft a pWPS; (2) weld the test piece to it under supervision; (3) NDT + destructive tests recorded in the PQR/WPQR; (4) production WPS written within the qualified range."},
  {t_vi:"ISO 15614-1 vs ASME IX",t_en:"ISO 15614-1 vs ASME IX",vi:"Hai hệ tiêu chuẩn phê duyệt quy trình phổ biến. ISO 15614-1: quy định thử cụ thể (kéo ngang, uốn, Charpy khi yêu cầu, macro, độ cứng). ASME IX: dùng QW-variables, thường không bắt buộc độ cứng/Charpy trừ khi code yêu cầu. Phải biết dự án dùng hệ nào.",en:"The two common qualification regimes. ISO 15614-1 prescribes tests (transverse tensile, bends, Charpy when required, macro, hardness). ASME IX uses QW variables; hardness/Charpy only when the construction code demands. Know which system the project uses."},
  {t_vi:"Mẫu thử PQR phải thử gì (ISO 15614-1)",t_en:"PQR test piece examination",vi:"Mối giáp mép điển hình: VT + RT hoặc UT + PT/MT bề mặt; 2 kéo ngang; 2 uốn chân + 2 uốn mặt (hoặc 4 uốn cạnh nếu dày); Charpy (khi t ≥ 12 mm hoặc theo yêu cầu); độ cứng; 1 macro.",en:"Typical butt joint: VT + RT or UT + surface PT/MT; 2 transverse tensiles; 2 root + 2 face bends (or 4 side bends if thick); Charpy (t ≥ 12 mm or when specified); hardness survey; 1 macro."},
  {t_vi:"Biến số thiết yếu: ví dụ cụ thể",t_en:"Essential variables: examples",vi:"Thay đổi NGOÀI phạm vi phải phê duyệt lại: quá trình hàn, nhóm vật liệu, chiều dày/đường kính ngoài dải, loại que (vd rutile→basic), tiền nhiệt giảm, nhiệt đầu vào tăng quá mức, bỏ/thêm PWHT, đổi vị trí hàn (tùy hệ).",en:"Changes beyond range force requalification: process, material group, thickness/diameter outside range, consumable type (rutile→basic), reduced preheat, increased heat input beyond limits, adding/removing PWHT, position (system-dependent)."},
  {t_vi:"Phê duyệt thợ hàn ISO 9606-1",t_en:"Welder qualification (ISO 9606-1)",vi:"Thử tay nghề theo WPS: VT + RT/UT hoặc uốn/gãy. Chứng chỉ ghi rõ phạm vi: quá trình, vật liệu, que, chiều dày, đường kính, vị trí. Vị trí khó phủ vị trí dễ (vd PF phủ PA).",en:"Skill test to a WPS: VT + RT/UT or bend/fracture tests. Certificate states range: process, material, consumable, thickness, diameter, position. Harder positions qualify easier ones (PF covers PA)."},
  {t_vi:"Hiệu lực & gia hạn chứng chỉ thợ",t_en:"Welder certificate validity",vi:"ISO 9606-1: hiệu lực ban đầu thường 2 năm (hoặc 3 năm tùy phương án), với điều kiện được XÁC NHẬN 6 THÁNG/LẦN rằng thợ vẫn hàn trong phạm vi. Gián đoạn quá 6 tháng → chứng chỉ hết hiệu lực. Nghi ngờ tay nghề → thử lại bất kỳ lúc nào.",en:"ISO 9606-1: initial validity typically 2 (or 3) years PROVIDED employment within range is CONFIRMED EVERY 6 MONTHS. A break exceeding 6 months invalidates it. Doubt about skill = retest any time."},
  {t_vi:"6G / 6GR và mã vị trí thi",t_en:"6G / 6GR test positions",vi:"ASME: 1G bằng, 2G ngang, 5G ống cố định trục ngang, 6G ống nghiêng 45° (phủ mọi vị trí). ISO dùng PA/PC/PF/PG/H-L045. Thi 6G một lần phủ được hầu hết vị trí sản xuất.",en:"ASME: 1G flat, 2G horizontal, 5G fixed horizontal pipe, 6G pipe at 45° (covers all positions). ISO uses PA/PC/PF/PG/H-L045. One 6G test covers nearly all production positions."},
  {t_vi:"Kiểm soát tài liệu & phiên bản",t_en:"Document control",vi:"WPS phải có sẵn tại vị trí hàn, đúng PHIÊN BẢN mới nhất được duyệt. Thanh tra đối chiếu: WPS ↔ PQR đỡ sau nó ↔ chứng chỉ thợ ↔ vật liệu & que thực tế. Sai một mắt xích = không phù hợp.",en:"The WPS must be at the workstation, latest approved REVISION. The inspector cross-checks WPS ↔ supporting PQR ↔ welder certificates ↔ actual material & consumables. One broken link = non-conformance."},
 ],
 key:[
  {vi:"WPS = chỉ dẫn (cách làm). PQR = bằng chứng (đã chứng minh). WPQ = thợ đạt.",en:"WPS = instruction; PQR = proof; WPQ = welder qualified."},
  {vi:"Thay đổi BIẾN SỐ THIẾT YẾU → phải qualify lại. Đây là câu hỏi thi rất hay gặp.",en:"Changing an essential variable → re-qualify. Common exam question."},
  {vi:"PQR là HỒ SƠ (đã xảy ra, không sửa được); WPS là HƯỚNG DẪN (viết từ PQR, có dải thông số). Thợ hàn thi theo WPS; quy trình thi bằng pWPS.",en:"The PQR is a RECORD (fixed, historical); the WPS is an INSTRUCTION (ranges, written from the PQR). Welders test to a WPS; procedures are tested from a pWPS."},
 ],
 quiz:[
  {vi:"Tài liệu nào là CHỈ DẪN cho thợ hàn làm theo?",en:"Which document is the welder's instruction?",
   opts:[{vi:"PQR",en:"PQR"},{vi:"WPS",en:"WPS"},{vi:"NDT report",en:"NDT report"},{vi:"Mill cert",en:"Mill cert"}],ans:1,
   exp:{vi:"WPS là chỉ dẫn hàn.",en:"WPS is the welding instruction."}},
  {vi:"PQR dùng để làm gì?",en:"What is the PQR for?",
   opts:[{vi:"Chứng minh WPS tạo mối hàn đạt",en:"Prove the WPS gives acceptable welds"},{vi:"Báo giá",en:"Quote price"},{vi:"Hướng dẫn an toàn",en:"Safety guide"},{vi:"Lịch bảo trì",en:"Maintenance log"}],ans:0,
   exp:{vi:"PQR ghi lại bằng chứng thử nghiệm chứng minh WPS.",en:"PQR records the test evidence qualifying the WPS."}},
  {vi:"Khi thay đổi một 'biến số thiết yếu' thì sao?",en:"If an essential variable changes?",
   opts:[{vi:"Không cần làm gì",en:"Nothing"},{vi:"Phải qualify lại",en:"Must re-qualify"},{vi:"Chỉ đổi màu sơn",en:"Repaint"},{vi:"Giảm dòng",en:"Lower current"}],ans:1,
   exp:{vi:"Biến số thiết yếu thay đổi → phải làm lại chứng nhận.",en:"Essential variable change → re-qualification."}},
  {vi:"Chứng nhận THỢ hàn (welder qualification) theo tiêu chuẩn nào?",en:"Welder qualification is to which standard?",
   opts:[{vi:"EN ISO 15614",en:"EN ISO 15614"},{vi:"EN ISO 9606",en:"EN ISO 9606"},{vi:"ISO 5817",en:"ISO 5817"},{vi:"ISO 6520",en:"ISO 6520"}],ans:1,
   exp:{vi:"Thợ hàn: EN ISO 9606. Quy trình: EN ISO 15614.",en:"Welder = EN ISO 9606; procedure = EN ISO 15614."}},
  {vi:"Chứng chỉ thợ hàn ISO 9606-1 cần được xác nhận định kỳ bao lâu?",en:"How often must an ISO 9606-1 welder certificate be confirmed?",
   opts:[{vi:"Mỗi tháng",en:"Monthly"},{vi:"6 tháng/lần",en:"Every 6 months"},{vi:"5 năm/lần",en:"Every 5 years"},{vi:"Không cần",en:"Never"}],ans:1,
   exp:{vi:"Người có thẩm quyền xác nhận 6 tháng/lần rằng thợ vẫn hàn trong phạm vi chứng chỉ.",en:"Continuous employment within range must be confirmed every 6 months."}},
  {vi:"Tài liệu nào là HỒ SƠ không được chỉnh sửa sau khi thử?",en:"Which document is a fixed record after testing?",
   opts:[{vi:"WPS",en:"WPS"},{vi:"pWPS",en:"pWPS"},{vi:"PQR",en:"PQR"},{vi:"ITP",en:"ITP"}],ans:2,
   exp:{vi:"PQR ghi lại đúng những gì đã hàn & kết quả thử — là hồ sơ lịch sử.",en:"The PQR records exactly what was welded and tested — a historical record."}},
  {vi:"Vị trí thi 6G của ống nghĩa là gì?",en:"What is the 6G pipe test position?",
   opts:[{vi:"Ống quay trục ngang",en:"Rotating horizontal pipe"},{vi:"Ống cố định nghiêng 45°",en:"Fixed pipe inclined at 45°"},{vi:"Ống thẳng đứng",en:"Vertical pipe"},{vi:"Tấm hàn trần",en:"Overhead plate"}],ans:1,
   exp:{vi:"6G = ống cố định nghiêng 45° — bao trùm mọi vị trí hàn, là bài thi giá trị nhất.",en:"6G = fixed 45° inclined pipe — covers all positions."}},
  {vi:"Đổi que từ rutile sang basic trên WPS đã duyệt thì sao?",en:"Changing rutile to basic electrodes on a qualified WPS?",
   opts:[{vi:"Không sao, hàn tiếp",en:"No issue, carry on"},{vi:"Là biến số thiết yếu — thường phải phê duyệt lại",en:"An essential variable — usually requires requalification"},{vi:"Chỉ cần báo miệng",en:"Just mention it verbally"},{vi:"Thợ tự quyết",en:"Welder decides"}],ans:1,
   exp:{vi:"Loại vỏ que là biến số thiết yếu trong hầu hết hệ tiêu chuẩn.",en:"Coating type is an essential variable in most systems."}},
 ]},

/* 9 ===================================================== */
{vi:"Vật liệu & Luyện kim", en:"Materials & Metallurgy",
 intro:{vi:"Tổ chức thép, vùng ảnh hưởng nhiệt, đương lượng carbon, các loại nứt.",en:"Steel structure, HAZ, carbon equivalent, cracking."},
 lessons:[
  {t_vi:"Vùng ảnh hưởng nhiệt",t_en:"HAZ",vi:"Heat Affected Zone — vùng kim loại nền bị thay đổi tổ chức do nhiệt hàn, không nóng chảy. Dễ cứng & nứt.",en:"Parent metal altered by heat but not melted; can harden & crack."},
  {t_vi:"Đương lượng carbon",t_en:"Carbon Equivalent (CE)",vi:"Công thức ước tính khả năng nứt: CE cao → khó hàn, cần tiền nhiệt. CE>0.4 thường cần tiền nhiệt.",en:"Estimates hardenability/crack risk; high CE → preheat needed (often >0.4)."},
  {t_vi:"Nứt nguội (hydro)",t_en:"Hydrogen (cold) cracking",vi:"Cần đồng thời: hydro + ứng suất + tổ chức cứng + nhiệt độ thấp. Xảy ra trong HAZ, sau khi nguội (chậm).",en:"Needs hydrogen + stress + hard microstructure + low temp. In HAZ, delayed."},
  {t_vi:"Nứt nóng (kết tinh)",t_en:"Solidification (hot) cracking",vi:"Khi vũng hàn đông đặc; do tạp chất S, P, hình dạng mối hàn sâu hẹp.",en:"During solidification; impurities (S,P), deep narrow bead."},
  {t_vi:"Nứt lớp (lamellar)",t_en:"Lamellar tearing",vi:"Nứt bậc thang song song bề mặt cán, do tạp chất + ứng suất theo chiều dày.",en:"Step-like tears parallel to rolling, through-thickness stress + inclusions."},
  {t_vi:"Phân nhóm vật liệu",t_en:"Material groups",vi:"Thép nhóm theo ISO/TR 15608 để quản lý chứng nhận quy trình.",en:"Grouped (ISO/TR 15608) for procedure qualification control."},
  {t_vi:"Thang hydro",t_en:"Hydrogen scale",vi:"Hàm lượng hydro tính bằng ml/100g kim loại đắp. H5 = 5ml/100g. Mức >15ml/100g là HYDRO CAO → nguy cơ nứt lớn.",en:"H content in ml/100g deposited metal. H5 = 5ml/100g. >15ml/100g = HIGH hydrogen → high crack risk."},
  {t_vi:"Bốn tổ chức cơ bản của thép",t_en:"Basic steel microstructures",vi:"Ferrite: mềm, dẻo. Pearlite: ferrite + cementite xen lớp, nguội chậm. Bainite: nguội trung bình, bền & dai khá. Martensite: nguội RẤT nhanh — cứng, GIÒN, nhạy nứt hydro. Tốc độ nguội quyết định tổ chức HAZ.",en:"Ferrite: soft, ductile. Pearlite: layered ferrite+cementite, slow cooling. Bainite: intermediate cooling, good strength/toughness. Martensite: VERY fast cooling — hard, BRITTLE, hydrogen-crack sensitive. Cooling rate decides the HAZ structure."},
  {t_vi:"Các vùng của HAZ",t_en:"HAZ sub-zones",vi:"Sát đường chảy → ra ngoài: vùng hạt thô CGHAZ (nóng >1100°C — hạt lớn, dai kém nhất, cứng nhất); vùng hạt mịn FGHAZ (tái kết tinh ~900–1100°C — tính chất tốt); vùng tới hạn một phần (727–900°C); vùng ram. CGHAZ là nơi nguy hiểm nhất.",en:"From fusion line outward: coarse-grained CGHAZ (>1100°C — large grains, worst toughness, hardest); fine-grained FGHAZ (~900–1100°C recrystallised — good properties); intercritical (727–900°C); subcritical/tempered. The CGHAZ is the danger zone."},
  {t_vi:"Công thức CE (IIW)",t_en:"Carbon equivalent formula (IIW)",vi:"CE = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15. CE < 0,40: dễ hàn. CE 0,40–0,45: cân nhắc tiền nhiệt. CE > 0,45: BẮT BUỘC biện pháp (tiền nhiệt, que basic, kiểm soát nhiệt đầu vào).",en:"CE = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15. CE < 0.40: readily weldable. 0.40–0.45: consider preheat. > 0.45: precautions MANDATORY (preheat, basic consumables, heat-input control)."},
  {t_vi:"Tốc độ nguội & t8/5",t_en:"Cooling rate & t8/5",vi:"t8/5 = thời gian nguội từ 800°C xuống 500°C — khoảng quyết định tổ chức. t8/5 ngắn (tấm dày, nhiệt đầu vào thấp, không tiền nhiệt) → martensite. t8/5 dài → tổ chức mềm hơn nhưng hạt thô & dai giảm nếu quá dài.",en:"t8/5 = cooling time from 800°C to 500°C — the structure-deciding window. Short t8/5 (thick plate, low heat input, no preheat) → martensite. Very long t8/5 → softer but coarse grains and reduced toughness."},
  {t_vi:"Yếu tố ảnh hưởng độ thấm tôi HAZ",t_en:"What controls HAZ hardening",vi:"(1) Thành phần hóa học (C & CE cao → dễ tôi cứng); (2) tốc độ nguội: chiều dày & dạng mối nối (mối T 3 đường thoát nhiệt), nhiệt đầu vào, tiền nhiệt, nhiệt độ môi trường.",en:"(1) Chemistry (higher C & CE → more hardenable); (2) cooling rate: thickness & joint type (T-joint = 3 heat paths), heat input, preheat, ambient temperature."},
  {t_vi:"Inox austenit & weld decay",t_en:"Austenitic stainless & sensitisation",vi:"304/316 không nhiễm từ, không tôi cứng nhưng: giữ 450–850°C → Cr kết tủa carbide ở biên hạt (sensitisation/weld decay) → ăn mòn giữa hạt. Phòng: loại C thấp (304L/316L) hoặc ổn định Ti/Nb (321/347), hạn chế nhiệt đầu vào.",en:"304/316: non-magnetic, non-hardening, BUT holding at 450–850°C precipitates Cr-carbides at grain boundaries (sensitisation/weld decay) → intergranular corrosion. Prevent: low-C grades (304L/316L) or stabilised (321/347), limit heat input."},
  {t_vi:"Inox: giãn nở & biến dạng",t_en:"Stainless: expansion & distortion",vi:"Austenit giãn nở nhiệt ~1,5 lần thép carbon, dẫn nhiệt kém → biến dạng NHIỀU hơn. Cần nhiệt đầu vào thấp, hàn phân đoạn, kẹp gá tốt. Ferrite content trong kim loại hàn (3–10 FN) chống nứt nóng.",en:"Austenitics expand ~1.5× more than C-steel with poor conductivity → MORE distortion. Use low heat input, balanced sequences, good fixturing. Weld-metal ferrite (3–10 FN) resists hot cracking."},
  {t_vi:"Thép duplex (khái quát)",t_en:"Duplex stainless overview",vi:"~50% austenit + 50% ferrit: bền cao, chống ăn mòn clorua tốt. Hàn phải kiểm soát nhiệt đầu vào & nguội trong dải cho phép để giữ cân bằng pha; nguội quá nhanh → quá nhiều ferrit (giòn), giữ nhiệt lâu → pha sigma giòn.",en:"~50/50 austenite/ferrite: high strength, chloride-corrosion resistant. Welding needs controlled heat input/cooling to keep phase balance; too fast → excess ferrite (brittle), prolonged heat → brittle sigma phase."},
  {t_vi:"Thép lặng (killed steel)",t_en:"Killed steels & deoxidation",vi:"Thép khử oxy hoàn toàn bằng Si/Al trước khi đúc — ít rỗ, tổ chức đồng đều, hạt mịn (Al còn làm nhỏ hạt). Thép sôi (rimming) cũ: nhiều tạp & phân tầng — tránh cho kết cấu hàn quan trọng.",en:"Fully deoxidised with Si/Al before casting — sound, uniform, fine-grained (Al also refines grains). Old rimming steels: segregation and inclusions — avoid for critical welded work."},
  {t_vi:"Độ dai & nhiệt độ chuyển tiếp",t_en:"Toughness & transition temperature",vi:"Thép ferrit chuyển từ dẻo sang GIÒN khi nhiệt độ giảm (đường cong Charpy). Kết cấu lạnh (Bắc Cực, LNG) cần thép hạt mịn, Ni cao, hoặc austenit (không có chuyển tiếp). Hàn làm thô hạt → tăng nhiệt độ chuyển tiếp tại HAZ.",en:"Ferritic steels turn BRITTLE as temperature drops (Charpy transition curve). Cold service needs fine-grained or Ni steels, or austenitics (no transition). Welding coarsens grains, raising the HAZ transition temperature."},
 ],
 key:[
  {vi:"Nhớ 4 yếu tố nứt nguội: HYDRO + ỨNG SUẤT + TỔ CHỨC CỨNG + NHIỆT ĐỘ THẤP. Bỏ 1 yếu tố → không nứt.",en:"4 factors for hydrogen cracking — remove one to prevent it."},
  {vi:"Tiền nhiệt làm chậm nguội → giảm độ cứng HAZ → giảm nứt nguội & cho hydro thoát ra.",en:"Preheat slows cooling → softer HAZ, hydrogen escapes → less cracking."},
  {vi:"Chuỗi nhân quả phải thuộc: nguội nhanh → martensite → cứng ≥350HV → + hydro + ứng suất → nứt nguội. Mọi biện pháp (tiền nhiệt, nhiệt đầu vào, CE) đều nhằm cắt chuỗi này.",en:"Memorise the chain: fast cooling → martensite → ≥350HV → + hydrogen + stress → cold cracking. Preheat, heat input and CE limits all break this chain."},
 ],
 quiz:[
  {vi:"HAZ là gì?",en:"What is the HAZ?",
   opts:[{vi:"Kim loại đắp",en:"Deposited metal"},{vi:"Vùng nền đổi tổ chức do nhiệt, không nóng chảy",en:"Parent metal altered by heat, not melted"},{vi:"Lớp xỉ",en:"Slag layer"},{vi:"Khí bảo vệ",en:"Shielding gas"}],ans:1,
   exp:{vi:"HAZ = vùng nền bị nhiệt làm thay đổi tổ chức nhưng không chảy.",en:"HAZ = heat-altered, unmelted parent metal."}},
  {vi:"Yếu tố nào KHÔNG cần cho nứt nguội (hydro)?",en:"Which is NOT needed for hydrogen cracking?",
   opts:[{vi:"Hydro",en:"Hydrogen"},{vi:"Ứng suất",en:"Stress"},{vi:"Tổ chức cứng",en:"Hard structure"},{vi:"Nhiệt độ cao",en:"High temperature"}],ans:3,
   exp:{vi:"Nứt nguội xảy ra ở nhiệt độ THẤP, không phải cao.",en:"Cold cracking needs LOW temperature."}},
  {vi:"Đương lượng carbon (CE) cao cho biết điều gì?",en:"High carbon equivalent indicates?",
   opts:[{vi:"Dễ hàn hơn",en:"Easier to weld"},{vi:"Cần tiền nhiệt, dễ nứt hơn",en:"Needs preheat, more crack-prone"},{vi:"Giá rẻ hơn",en:"Cheaper"},{vi:"Nhẹ hơn",en:"Lighter"}],ans:1,
   exp:{vi:"CE cao → khó hàn, dễ nứt → cần tiền nhiệt.",en:"High CE → harder to weld, preheat needed."}},
  {vi:"Mức hydro nào được coi là 'hydro cao'? (WIS5)",en:"Which hydrogen level is 'high'? (WIS5)",
   opts:[{vi:"> 5 ml/100g",en:"> 5 ml/100g"},{vi:"> 10 ml/100g",en:"> 10 ml/100g"},{vi:"> 15 ml/100g",en:"> 15 ml/100g"},{vi:"> 3 ml/100g",en:"> 3 ml/100g"}],ans:2,
   exp:{vi:">15 ml/100g kim loại đắp = hydro cao → nguy cơ nứt nguội lớn.",en:">15 ml/100g = high hydrogen → high cold-crack risk."}},
  {vi:"Tổ chức nào hình thành khi HAZ nguội rất nhanh?",en:"Which structure forms when the HAZ cools very fast?",
   opts:[{vi:"Pearlite",en:"Pearlite"},{vi:"Ferrite",en:"Ferrite"},{vi:"Martensite",en:"Martensite"},{vi:"Austenite ổn định",en:"Stable austenite"}],ans:2,
   exp:{vi:"Nguội nhanh không kịp khuếch tán carbon → martensite cứng, giòn, nhạy nứt hydro.",en:"Rapid cooling traps carbon — hard, brittle, crack-sensitive martensite."}},
  {vi:"Theo công thức IIW, nguyên tố nào chia cho 6?",en:"In the IIW CE formula, which element is divided by 6?",
   opts:[{vi:"Carbon",en:"Carbon"},{vi:"Mangan",en:"Manganese"},{vi:"Crom",en:"Chromium"},{vi:"Niken",en:"Nickel"}],ans:1,
   exp:{vi:"CE = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15.",en:"CE = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15."}},
  {vi:"Weld decay (sensitisation) ở inox austenit xảy ra trong dải nhiệt nào?",en:"Sensitisation of austenitic stainless occurs in which range?",
   opts:[{vi:"100–250°C",en:"100–250°C"},{vi:"450–850°C",en:"450–850°C"},{vi:"1200–1400°C",en:"1200–1400°C"},{vi:"Dưới 0°C",en:"Below 0°C"}],ans:1,
   exp:{vi:"450–850°C: Cr kết tủa carbide tại biên hạt → ăn mòn giữa hạt. Dùng 304L/316L hoặc 321/347.",en:"450–850°C: Cr-carbide precipitation → intergranular corrosion. Use L-grades or stabilised grades."}},
  {vi:"Vùng nào của HAZ có độ dai KÉM nhất?",en:"Which HAZ zone has the worst toughness?",
   opts:[{vi:"Vùng hạt mịn",en:"Fine-grained zone"},{vi:"Vùng hạt thô sát đường chảy",en:"Coarse-grained zone at the fusion line"},{vi:"Vùng ram",en:"Tempered zone"},{vi:"Vật liệu cơ bản",en:"Parent metal"}],ans:1,
   exp:{vi:"CGHAZ bị nung >1100°C, hạt lớn → dai kém nhất, cứng nhất.",en:"The CGHAZ is heated >1100°C; coarse grains — worst toughness."}},
 ]},

/* 10 ===================================================== */
{vi:"Xử lý nhiệt (Heat Treatment)", en:"Heat Treatment",
 intro:{vi:"Tiền nhiệt, nhiệt interpass và xử lý nhiệt sau hàn (PWHT).",en:"Preheat, interpass and PWHT."},
 lessons:[
  {t_vi:"Tiền nhiệt",t_en:"Preheat",vi:"Nung vật trước/khi hàn để giảm tốc nguội, cho hydro thoát, giảm nứt. Phụ thuộc CE, chiều dày, hydro.",en:"Heating before welding to slow cooling, release hydrogen, reduce cracking."},
  {t_vi:"Nhiệt interpass",t_en:"Interpass temperature",vi:"Nhiệt độ duy trì giữa các lớp; quá cao → giảm cơ tính, quá thấp → nứt.",en:"Temp maintained between runs; too high lowers properties, too low cracks."},
  {t_vi:"PWHT (khử ứng suất)",t_en:"PWHT / stress relief",vi:"Nung sau hàn (vd 580–620°C cho thép C) để giảm ứng suất dư & độ cứng. Giữ nhiệt theo chiều dày, nguội chậm.",en:"Post-weld heating to relieve residual stress & hardness; soak per thickness, slow cool."},
  {t_vi:"Tốc độ gia/giảm nhiệt",t_en:"Heating/cooling rate",vi:"Kiểm soát để tránh sốc nhiệt & ứng suất mới; ghi biểu đồ nhiệt.",en:"Controlled to avoid thermal shock; chart recorded."},
  {t_vi:"Kiểm soát nhiệt",t_en:"Temperature control",vi:"Đo bằng bút nhiệt (temp-indicating crayon), cặp nhiệt (thermocouple), đồng hồ hồng ngoại.",en:"Crayons, thermocouples, infrared/contact pyrometers."},
  {t_vi:"Vì sao tiền nhiệt?",t_en:"Why preheat?",vi:"(1) Giảm tốc độ nguội → tránh martensite; (2) tăng thoát hydro (khuếch tán nhanh hơn khi ấm); (3) đuổi hơi ẩm bề mặt; (4) giảm chênh nhiệt → giảm ứng suất co ngót. Tiền nhiệt chọn theo CE, chiều dày tổ hợp, nhiệt đầu vào & mức hydro của que.",en:"(1) Slows cooling — avoids martensite; (2) helps hydrogen escape; (3) drives off surface moisture; (4) reduces thermal gradients and shrinkage stress. Selected from CE, combined thickness, heat input and consumable hydrogen scale."},
  {t_vi:"Đo & vị trí đo tiền nhiệt",t_en:"Measuring preheat",vi:"Đo bằng bút nhiệt, cặp nhiệt tiếp xúc hoặc hỏa kế. Đo ở mặt ĐỐI DIỆN nguồn nhiệt khi có thể, hoặc chờ 2 phút sau khi ngừng nung (cho đều nhiệt); vị trí đo cách mép rãnh ~75 mm (hoặc 4× chiều dày tới 50 mm tùy tiêu chuẩn).",en:"Use temp-indicating crayons, contact thermocouples or pyrometers. Measure on the face OPPOSITE the heat source where possible, or wait ~2 min after heating stops; typically ~75 mm from the joint edge (or 4× thickness up to 50 mm, code-dependent)."},
  {t_vi:"Interpass tối đa — vì sao?",t_en:"Why a maximum interpass?",vi:"Interpass tối thiểu = duy trì hiệu quả tiền nhiệt. Interpass TỐI ĐA để bảo toàn cơ tính: quá nóng → hạt thô, giảm dai, giảm bền (đặc biệt thép TMCP, inox, duplex). Đo ngay trước khi hàn lớp tiếp theo, tại mép rãnh.",en:"Minimum interpass keeps preheat benefits. MAXIMUM interpass protects properties: overheating coarsens grains and cuts toughness/strength (critical for TMCP steels, stainless, duplex). Measure at the groove edge just before the next run."},
  {t_vi:"PWHT thép C-Mn: con số thi",t_en:"PWHT numbers for C-Mn steel",vi:"Giữ ở ~580–620°C; thời gian giữ thường 1 giờ cho mỗi 25 mm chiều dày (tối thiểu theo code); khống chế tốc độ nung & nguội (vd ≤ 220°C/h chia cho chiều dày inch, theo code); dưới ~300–400°C có thể nung/nguội tự do.",en:"Soak at ~580–620°C; holding commonly 1 hour per 25 mm thickness (code minimums apply); controlled heating/cooling rates per code; below ~300–400°C heating/cooling may be unrestricted."},
  {t_vi:"PWHT làm được gì?",t_en:"What PWHT achieves",vi:"Giảm ứng suất dư (~70–90%), RAM mềm vùng cứng (giảm HV), thoát thêm hydro, ổn định kích thước khi gia công, tăng chống nứt ăn mòn ứng suất. Không xóa được khuyết tật có sẵn!",en:"Relieves residual stress (~70–90%), TEMPERS hard zones (lower HV), releases more hydrogen, gives dimensional stability for machining, improves SCC resistance. It does NOT remove existing defects!"},
  {t_vi:"Kiểm soát PWHT bằng biểu đồ",t_en:"PWHT charts & thermocouples",vi:"Cặp nhiệt gắn trực tiếp vùng đại diện (số lượng theo kích thước), ghi biểu đồ nhiệt liên tục. Thanh tra xem xét biểu đồ: tốc độ nung, nhiệt & thời gian giữ, tốc độ nguội đúng quy trình → lưu hồ sơ.",en:"Thermocouples attached at representative locations, continuous chart recording. The inspector reviews the chart — heating rate, soak temp & time, cooling rate — and files it."},
  {t_vi:"Các nhiệt luyện khác",t_en:"Other heat treatments",vi:"Thường hóa (normalising ~900°C, nguội không khí): hạt mịn, dai tốt. Ủ (annealing, nguội theo lò): mềm nhất. Tôi + ram (Q&T): bền cao + dai. Hydrogen soak/bake-out: giữ 200–300°C vài giờ để đuổi hydro trước/sau hàn sửa.",en:"Normalising (~900°C, air cool): fine grains, good toughness. Annealing (furnace cool): softest. Quench & temper: high strength + toughness. Hydrogen soak/bake-out: hold 200–300°C for hours to drive off hydrogen before/after repairs."},
  {t_vi:"PWHT cục bộ",t_en:"Local PWHT",vi:"Khi không đưa được vào lò: nung điện trở/cảm ứng quanh mối hàn. Phải đảm bảo dải nung (soak band) đủ rộng mỗi bên mối hàn, gradient nhiệt kiểm soát, cách nhiệt tốt — nếu không tạo ứng suất MỚI.",en:"When furnace treatment is impossible: resistance/induction heating around the weld. The soak band must extend adequately each side with controlled gradients and insulation — otherwise NEW stresses are introduced."},
 ],
 key:[
  {vi:"Tiền nhiệt = TRƯỚC/khi hàn (chống nứt nguội). PWHT = SAU hàn (khử ứng suất dư).",en:"Preheat = before (anti-crack). PWHT = after (stress relief)."},
  {vi:"Con số vàng: PWHT C-Mn ~580–620°C, giữ 1h/25mm. Tiền nhiệt chọn theo CE + chiều dày tổ hợp + hydro que + nhiệt đầu vào.",en:"Golden numbers: C-Mn PWHT ~580–620°C, 1 h per 25 mm. Preheat from CE + combined thickness + hydrogen scale + heat input."},
 ],
 quiz:[
  {vi:"Mục đích chính của tiền nhiệt?",en:"Main purpose of preheat?",
   opts:[{vi:"Tăng tốc độ hàn",en:"Faster welding"},{vi:"Giảm tốc nguội & cho hydro thoát → chống nứt",en:"Slow cooling/release H → prevent cracking"},{vi:"Làm đẹp mối hàn",en:"Better appearance"},{vi:"Tiết kiệm khí",en:"Save gas"}],ans:1,
   exp:{vi:"Tiền nhiệt làm chậm nguội, cho hydro thoát → chống nứt nguội.",en:"Preheat slows cooling & releases hydrogen."}},
  {vi:"PWHT khử ứng suất cho thép carbon thường ở khoảng nhiệt nào?",en:"PWHT stress relief for C-steel is typically?",
   opts:[{vi:"100–150°C",en:"100–150°C"},{vi:"580–620°C",en:"580–620°C"},{vi:"1000–1100°C",en:"1000–1100°C"},{vi:"Nhiệt độ phòng",en:"Room temp"}],ans:1,
   exp:{vi:"Khử ứng suất thép C thường ~580–620°C.",en:"~580–620°C for C-steel stress relief."}},
  {vi:"Nhiệt độ PWHT điển hình cho thép C-Mn?",en:"Typical PWHT temperature for C-Mn steel?",
   opts:[{vi:"300–350°C",en:"300–350°C"},{vi:"580–620°C",en:"580–620°C"},{vi:"900–950°C",en:"900–950°C"},{vi:"1100°C",en:"1100°C"}],ans:1,
   exp:{vi:"~580–620°C, dưới điểm tới hạn — chỉ ram & khử ứng suất, không thay đổi pha.",en:"~580–620°C, below the critical point — tempers and relieves stress without phase change."}},
  {vi:"PWHT KHÔNG làm được điều gì sau đây?",en:"Which of these can PWHT NOT do?",
   opts:[{vi:"Giảm ứng suất dư",en:"Reduce residual stress"},{vi:"Giảm độ cứng HAZ",en:"Soften the HAZ"},{vi:"Loại bỏ vết nứt có sẵn",en:"Remove an existing crack"},{vi:"Đuổi bớt hydro",en:"Release hydrogen"}],ans:2,
   exp:{vi:"PWHT không sửa được khuyết tật — nứt phải được loại bỏ & hàn sửa trước.",en:"PWHT cannot repair defects — cracks must be excavated and repaired first."}},
  {vi:"Nhiệt độ interpass được đo khi nào, ở đâu?",en:"When and where is interpass temperature measured?",
   opts:[{vi:"Sau khi hàn xong toàn bộ, giữa mối hàn",en:"After the whole weld, mid-weld"},{vi:"Ngay trước lớp tiếp theo, tại mép rãnh hàn",en:"Just before the next run, at the groove edge"},{vi:"Bất kỳ lúc nào, xa mối hàn",en:"Anytime, far away"},{vi:"Không cần đo",en:"Not measured"}],ans:1,
   exp:{vi:"Đo ngay trước khi hàn lớp kế, tại vật liệu sát rãnh — so với giới hạn min/max của WPS.",en:"Measured immediately before the next pass at the joint — against WPS min/max."}},
  {vi:"Mục đích của 'hydrogen soak' 200–300°C là gì?",en:"What is a 200–300°C hydrogen soak for?",
   opts:[{vi:"Tăng độ cứng",en:"Increase hardness"},{vi:"Đuổi hydro khuếch tán ra khỏi mối hàn",en:"Drive diffusible hydrogen out of the weld"},{vi:"Tạo lớp oxide đẹp",en:"Create oxide colour"},{vi:"Làm nguội nhanh",en:"Speed cooling"}],ans:1,
   exp:{vi:"Giữ ấm vài giờ giúp hydro thoát ra — giảm mạnh nguy cơ nứt nguội trễ.",en:"Holding warm for hours lets hydrogen escape — slashes delayed cracking risk."}},
 ]},

/* 11 ===================================================== */
{vi:"Biến dạng & Ứng suất dư", en:"Distortion & Residual Stress",
 intro:{vi:"Nguyên nhân biến dạng và cách kiểm soát.",en:"Causes of distortion and control."},
 lessons:[
  {t_vi:"Biến dạng",t_en:"Distortion",vi:"Co ngót không đều khi nguội gây cong/vênh. Dạng: co dọc, co ngang, góc, vênh.",en:"Uneven shrinkage on cooling: longitudinal, transverse, angular, buckling."},
  {t_vi:"Ứng suất dư",t_en:"Residual stress",vi:"Ứng suất còn lại trong kết cấu sau hàn dù không tải; có thể gây nứt/biến dạng.",en:"Locked-in stress after welding even without load."},
  {t_vi:"Kiểm soát biến dạng",t_en:"Distortion control",vi:"Đồ gá, hàn đính, trình tự hàn (back-step/skip), cân bằng nhiệt, giảm nhiệt đầu vào.",en:"Jigs, tacks, welding sequence (back-step/skip), balancing, low heat input."},
  {t_vi:"Định vị trước",t_en:"Pre-setting",vi:"Đặt nghiêng trước theo hướng ngược biến dạng dự kiến.",en:"Pre-angling parts opposite to expected distortion."},
  {t_vi:"Năng lượng hồ quang",t_en:"Arc energy (kJ/mm)",vi:"= (Điện áp × Dòng)/(Tốc độ hàn mm/s × 1000). Ví dụ WIS5: 24V, 240A, 300mm/phút → ≈1.2 kJ/mm.",en:"=(V×A)/(travel mm/s ×1000). WIS5 example: 24V,240A,300mm/min → ≈1.2 kJ/mm."},
  {t_vi:"Nhiệt đầu vào",t_en:"Heat input",vi:"= Năng lượng hồ quang × hệ số hiệu suất nhiệt. SAW=1.0; MMA, MIG/MAG, FCAW=0.8; TIG & Plasma=0.6. Nhiệt cao → biến dạng & HAZ rộng.",en:"= Arc energy × thermal efficiency factor. SAW=1.0; MMA/MIG/MAG/FCAW=0.8; TIG/Plasma=0.6."},
  {t_vi:"Ảnh hưởng tư thế hàn",t_en:"Position vs heat input",vi:"Hàn leo (vertical-up) cho nhiệt đầu vào cao nhất (phải lắc, đi chậm); hàn tụt (vertical-down) cho nhiệt thấp nhất.",en:"Vertical-up = highest heat input; vertical-down = lowest."},
  {t_vi:"5 dạng biến dạng",t_en:"Five distortion types",vi:"Co ngang (transverse), co dọc (longitudinal), biến dạng GÓC (angular — phổ biến nhất ở V đơn & mối góc), cong dọc (bowing), oằn/lượn sóng (buckling — tấm mỏng). Nguyên nhân gốc: kim loại nóng chảy co khi nguội mà bị cản trở.",en:"Transverse shrinkage, longitudinal shrinkage, ANGULAR distortion (most common with single-V and fillets), bowing, buckling (thin sheet). Root cause: cooling weld metal contracts against restraint."},
  {t_vi:"Yếu tố tăng biến dạng",t_en:"What increases distortion",vi:"Nhiều kim loại đắp (vát quá rộng), nhiệt đầu vào cao, nhiều lớp mỏng (góc xoay cộng dồn), hàn một phía không cân, trình tự sai, tấm mỏng, vật liệu giãn nở lớn (inox).",en:"Excess weld metal (over-wide preps), high heat input, many thin runs (cumulative angular pull), unbalanced one-sided welding, poor sequence, thin plate, high-expansion materials (stainless)."},
  {t_vi:"Chống biến dạng: thiết kế & trình tự",t_en:"Distortion control measures",vi:"Giảm kim loại đắp (V kép, góc vát nhỏ nhất đủ thao tác), hàn ĐỐI XỨNG hai phía, đặt mối hàn gần trục trung hòa, hàn phân đoạn lùi (back-step), hàn nhảy cóc (skip), kẹp gá/đồ gá cứng, đặt nghiêng trước (pre-set) để co về đúng vị trí.",en:"Less weld metal (double-V, minimum workable angle), BALANCED double-sided welding, welds near the neutral axis, back-step and skip sequences, clamps/strongbacks, pre-setting so shrinkage pulls parts true."},
  {t_vi:"Kẹp chặt: cái giá phải trả",t_en:"Restraint: the trade-off",vi:"Kẹp càng cứng → biến dạng càng ít NHƯNG ứng suất dư càng CAO → tăng nguy cơ nứt (nguội, rách lớp). Kết cấu kẹp chặt + thép dày = cần tiền nhiệt & que ít hydro.",en:"More restraint = less distortion BUT higher residual stress — greater cracking risk (cold cracking, lamellar tearing). High restraint + thick steel = preheat and low-hydrogen consumables."},
  {t_vi:"Sửa biến dạng sau hàn",t_en:"Correcting distortion",vi:"Cơ học: ép, nắn, búa (cẩn thận biến cứng). Nhiệt: hơ nóng cục bộ điểm/đường/chữ V (flame straightening) — nung mặt LỒI cho co kéo phẳng lại; khống chế nhiệt độ (vd ≤650°C thép C-Mn) tránh hỏng cơ tính.",en:"Mechanical: pressing, jacking, hammering (beware work-hardening). Thermal: local spot/line/wedge heating on the CONVEX side so contraction pulls it straight; limit temperature (≤650°C for C-Mn) to protect properties."},
  {t_vi:"Tính arc energy (kJ/mm)",t_en:"Calculating arc energy",vi:"AE = (U × I) / (v × 1000), với v = tốc độ hàn mm/s. Vd: 24 V, 200 A, 240 mm/phút (= 4 mm/s): AE = 24×200/(4×1000) = 1,2 kJ/mm. Nhớ ĐỔI mm/phút sang mm/giây (chia 60)!",en:"AE = (U × I) / (v × 1000), v in mm/s. E.g. 24 V, 200 A, 240 mm/min (= 4 mm/s): AE = 24×200/(4×1000) = 1.2 kJ/mm. Remember to CONVERT mm/min to mm/s (divide by 60)!"},
  {t_vi:"Heat input = k × AE",t_en:"Heat input & efficiency factor k",vi:"Theo ISO/TR 17671: HI = k × AE. Hệ số hiệu suất nhiệt k: SAW = 1,0; MMA & MIG/MAG/FCAW = 0,8; TIG & plasma = 0,6. Vd AE 1,2 kJ/mm bằng TIG → HI = 0,72 kJ/mm.",en:"Per ISO/TR 17671: HI = k × AE. Thermal efficiency k: SAW = 1.0; MMA & MIG/MAG/FCAW = 0.8; TIG & plasma = 0.6. E.g. 1.2 kJ/mm by TIG → HI = 0.72 kJ/mm."},
  {t_vi:"Nhiệt đầu vào: cao & thấp đều hại",t_en:"Heat input: both extremes hurt",vi:"QUÁ CAO: hạt thô, giảm dai, HAZ rộng, biến dạng nhiều, hại thép TMCP/duplex. QUÁ THẤP: nguội nhanh → cứng, nứt nguội, thiếu ngấu. WPS cho dải cho phép — thanh tra kiểm tra V, A, tốc độ thực tế.",en:"TOO HIGH: coarse grains, lower toughness, wide HAZ, distortion; bad for TMCP/duplex. TOO LOW: fast cooling — hardening, cold cracks, lack of fusion. The WPS gives a window — the inspector checks actual V, A and travel speed."},
 ],
 key:[
  {vi:"Nhiệt đầu vào cao → HAZ rộng, hạt thô, biến dạng nhiều. Cần kiểm soát.",en:"High heat input → wide HAZ, coarse grain, more distortion."},
  {vi:"NHỚ hệ số hiệu suất nhiệt: SAW 1.0 / MMA-MIG-MAG-FCAW 0.8 / TIG-Plasma 0.6 — câu hỏi thi rất hay gặp.",en:"Memorise thermal efficiency factors: SAW 1.0 / MMA-MIG-MAG-FCAW 0.8 / TIG-Plasma 0.6."},
  {vi:"Thuộc lòng k: SAW 1,0 — MMA/MIG/MAG 0,8 — TIG 0,6. Và nhớ đổi tốc độ về mm/s trước khi tính. Đề thi RẤT hay cho bài tính này.",en:"Memorise k: SAW 1.0 — MMA/MIG/MAG 0.8 — TIG 0.6. Convert speed to mm/s first. This calculation is a perennial exam question."},
 ],
 quiz:[
  {vi:"Cách nào KHÔNG giúp giảm biến dạng?",en:"Which does NOT reduce distortion?",
   opts:[{vi:"Dùng đồ gá",en:"Use jigs"},{vi:"Trình tự back-step",en:"Back-step sequence"},{vi:"Tăng mạnh nhiệt đầu vào",en:"Greatly increase heat input"},{vi:"Định vị trước (pre-set)",en:"Pre-setting"}],ans:2,
   exp:{vi:"Tăng nhiệt đầu vào làm biến dạng NHIỀU hơn.",en:"More heat input = more distortion."}},
  {vi:"Ứng suất dư là gì?",en:"What is residual stress?",
   opts:[{vi:"Ứng suất khi có tải",en:"Stress under load"},{vi:"Ứng suất còn lại sau hàn dù không tải",en:"Locked-in stress after welding, no load"},{vi:"Lực kéo của cần cẩu",en:"Crane force"},{vi:"Áp suất khí",en:"Gas pressure"}],ans:1,
   exp:{vi:"Ứng suất dư tồn tại trong vật sau hàn dù không có tải ngoài.",en:"Residual stress remains without external load."}},
  {vi:"Hệ số hiệu suất nhiệt của hàn TIG là bao nhiêu? (theo WIS5)",en:"Thermal efficiency factor for TIG? (WIS5)",
   opts:[{vi:"1.0",en:"1.0"},{vi:"0.8",en:"0.8"},{vi:"0.6",en:"0.6"},{vi:"0.4",en:"0.4"}],ans:2,
   exp:{vi:"TIG & Plasma = 0.6; MMA/MIG/MAG/FCAW = 0.8; SAW = 1.0.",en:"TIG/Plasma=0.6; MMA/MIG/MAG/FCAW=0.8; SAW=1.0."}},
  {vi:"Tư thế hàn nào thường cho nhiệt đầu vào cao nhất?",en:"Which position gives the highest heat input?",
   opts:[{vi:"Hàn tụt (vertical-down)",en:"Vertical-down"},{vi:"Hàn leo (vertical-up)",en:"Vertical-up"},{vi:"Hàn ngang",en:"Horizontal"},{vi:"Hàn trần",en:"Overhead"}],ans:1,
   exp:{vi:"Hàn leo phải lắc que & đi chậm → nhiệt đầu vào cao nhất.",en:"Vertical-up weaves & travels slowly → highest heat input."}},
  {vi:"Hàn 25 V, 240 A, tốc độ 300 mm/phút. Arc energy là bao nhiêu?",en:"Welding at 25 V, 240 A, 300 mm/min. Arc energy?",
   opts:[{vi:"0,02 kJ/mm",en:"0.02 kJ/mm"},{vi:"1,2 kJ/mm",en:"1.2 kJ/mm"},{vi:"2,0 kJ/mm",en:"2.0 kJ/mm"},{vi:"20 kJ/mm",en:"20 kJ/mm"}],ans:1,
   exp:{vi:"300 mm/phút = 5 mm/s. AE = 25×240/(5×1000) = 1,2 kJ/mm.",en:"300 mm/min = 5 mm/s. AE = 25×240/(5×1000) = 1.2 kJ/mm."}},
  {vi:"Hệ số hiệu suất nhiệt k của TIG là bao nhiêu?",en:"Thermal efficiency factor k for TIG?",
   opts:[{vi:"1,0",en:"1.0"},{vi:"0,8",en:"0.8"},{vi:"0,6",en:"0.6"},{vi:"0,4",en:"0.4"}],ans:2,
   exp:{vi:"TIG/plasma k=0,6; MMA/MIG/MAG k=0,8; SAW k=1,0.",en:"TIG/plasma 0.6; MMA/MIG/MAG 0.8; SAW 1.0."}},
  {vi:"Kẹp gá thật chặt khi hàn sẽ dẫn đến điều gì?",en:"Heavily restraining a joint during welding leads to?",
   opts:[{vi:"Hết cả biến dạng lẫn ứng suất",en:"No distortion and no stress"},{vi:"Ít biến dạng nhưng ứng suất dư cao hơn",en:"Less distortion but higher residual stress"},{vi:"Nhiều biến dạng hơn",en:"More distortion"},{vi:"Mối hàn đẹp hơn",en:"A nicer weld"}],ans:1,
   exp:{vi:"Kẹp chặt ngăn co tự do → biến dạng giảm nhưng ứng suất tích tụ → nguy cơ nứt tăng.",en:"Restraint stops free shrinkage — stress builds up, raising cracking risk."}},
  {vi:"Kiểu biến dạng phổ biến nhất ở mối hàn V đơn một phía?",en:"Most common distortion at a one-sided single-V butt?",
   opts:[{vi:"Oằn tấm",en:"Buckling"},{vi:"Biến dạng góc",en:"Angular distortion"},{vi:"Co dọc",en:"Longitudinal shrinkage"},{vi:"Không biến dạng",en:"None"}],ans:1,
   exp:{vi:"V đơn co không đối xứng theo chiều dày → hai mép kéo lên (biến dạng góc).",en:"Single-V shrinks unevenly through thickness — the edges rotate upward."}},
 ]},

/* 12 ===================================================== */
{vi:"Thiết kế & chuẩn bị mối nối", en:"Joint Design & Preparation",
 intro:{vi:"Các kiểu mối nối, kiểu vát mép và thuật ngữ kích thước.",en:"Joint types, weld preps and dimensional terms."},
 lessons:[
  {t_vi:"Kiểu mối nối",t_en:"Joint types",vi:"Giáp mép (butt), góc (fillet/T), chồng (lap), góc cạnh (corner), nối biên (edge).",en:"Butt, fillet/T, lap, corner, edge joints."},
  {t_vi:"Kiểu vát mép",t_en:"Weld preparations",vi:"Vát V, vát đôi V (X), U, J, vát đơn (bevel), vuông (square).",en:"Single-V, double-V (X), U, J, single bevel, square edge."},
  {t_vi:"Góc vát",t_en:"Bevel/included angle",vi:"Góc mở để que tiếp cận chân; nhỏ quá → không thấu, lớn quá → tốn vật liệu/biến dạng.",en:"Opening for access; too small=LoP, too large=more filler/distortion."},
  {t_vi:"Mặt chân / khe hở chân",t_en:"Root face / root gap",vi:"Root face (mặt cùn) & root gap (khe hở) kiểm soát độ thấu chân.",en:"Root face & root gap control root penetration."},
  {t_vi:"Chiều cao chân hàn góc",t_en:"Fillet leg / throat",vi:"Cạnh (leg) z và chiều cao tính toán (design throat) a của mối hàn góc.",en:"Leg length z and design throat a of a fillet."},
  {t_vi:"Lồi/lõm",t_en:"Reinforcement",vi:"Phần đắp lồi quá mặt; quá cao gây tập trung ứng suất ở chân mối hàn.",en:"Excess weld metal/cap height; too high = toe stress concentration."},
  {t_vi:"5 kiểu mối nối cơ bản",t_en:"Five basic joint types",vi:"Giáp mép (butt), chữ T (tee), chồng (lap), góc (corner), mép (edge). Joint = cấu hình ghép; trên mỗi joint có thể dùng nhiều kiểu mối hàn (butt weld, fillet weld, plug...).",en:"Butt, tee, lap, corner, edge. The joint is the configuration; different weld types (butt weld, fillet, plug...) can be applied to it."},
  {t_vi:"Bộ thuật ngữ vát mép",t_en:"Weld preparation terms",vi:"Góc vát (bevel angle – một mép), góc rãnh (included angle – tổng hai mép), mặt đáy (root face – chống cháy thủng), khe đáy (root gap – đảm bảo ngấu), bán kính rãnh (root radius – cho U/J). Mỗi thông số có dung sai trong WPS.",en:"Bevel angle (one edge), included angle (both edges), root face (resists burn-through), root gap (ensures penetration), root radius (U/J preps). Each has a WPS tolerance."},
  {t_vi:"V đơn 60°: vì sao?",t_en:"Why 60° for a single-V?",vi:"Included angle điển hình V đơn (MMA): 60° tấm, 60–70° ống — đủ rộng cho que & ngấu thành, không quá rộng gây tốn que & biến dạng. Bevel mỗi bên 30–35°. Root face & gap điển hình 1,5–3 mm (tùy WPS).",en:"Typical single-V included angle (MMA): 60° plate, 60–75° pipe — wide enough for electrode access and sidewall fusion, not so wide as to waste filler and distort. ~30–35° per side. Root face & gap typically 1.5–3 mm (per WPS)."},
  {t_vi:"V kép, U, J: khi nào dùng",t_en:"Double-V, U and J preps",vi:"V kép (X): tấm dày hàn được hai phía — giảm ~50% kim loại đắp & cân bằng biến dạng góc. U: tấm RẤT dày — ít kim loại đắp hơn V nhưng gia công đắt (phải bào/phay). J/bevel kép tương tự cho mối T thấu hoàn toàn.",en:"Double-V (X): thick plate with two-sided access — about half the filler and balanced angular pull. U: very thick — least filler but costly machining. J/double-bevel similarly for full-penetration T-joints."},
  {t_vi:"Cổ mối hàn góc: 3 loại",t_en:"Fillet throats: three kinds",vi:"Cổ thiết kế a (design throat); cổ thực tế (actual throat – tới bề mặt thật); cổ hiệu dụng (effective throat – tính cả phần ngấu sâu nếu được phép). Phần LỒI không được tính vào cổ chịu lực.",en:"Design throat a; actual throat (to the real surface); effective throat (may credit deep penetration when allowed). CONVEXITY does not count toward the load-bearing throat."},
  {t_vi:"Mối hàn góc sâu ngấu",t_en:"Deep-penetration fillets",vi:"Quá trình ngấu sâu (SAW, MAG spray) tạo phần ngấu vượt điểm chân lý thuyết → cổ thực lớn hơn. Một số tiêu chuẩn cho phép tính thêm (ký hiệu s kèm a) nếu quy trình chứng minh được độ ngấu ổn định.",en:"Deep-penetration processes (SAW, spray MAG) fuse beyond the theoretical root point, enlarging the throat. Some codes credit this (s with a) if the procedure proves consistent penetration."},
  {t_vi:"Thấu hoàn toàn vs một phần",t_en:"Full vs partial penetration",vi:"Full pen: mối hàn chiếm toàn bộ chiều dày — cho kết cấu chịu mỏi/áp lực. Partial pen: chỉ một phần — rẻ hơn nhưng có khe chưa hàn (gây tập trung ứng suất, khó NDT, bẫy ăn mòn). Thiết kế quyết định, thanh tra kiểm đúng prep.",en:"Full penetration: weld through the whole thickness — fatigue/pressure-critical work. Partial: cheaper but leaves an unfused land (stress raiser, NDT-unfriendly, corrosion trap). Design decides; the inspector verifies the prep."},
  {t_vi:"Tiếp cận & vị trí: ảnh hưởng thiết kế",t_en:"Access & position in design",vi:"Thiết kế tốt phải cho: mỏ/que tiếp cận được rãnh (góc nghiêng đủ), không gian cho NDT sau hàn, ưu tiên hàn ở vị trí bằng (xoay được), tránh chồng chéo nhiều mối hàn gần nhau (giao thoa HAZ & ứng suất).",en:"Good design allows: torch/electrode access to the root, room for later NDT, welding in the flat position where possible (rotation), and avoids clustered welds (overlapping HAZ and stress)."},
  {t_vi:"Chuẩn bị mép: phương pháp & kiểm tra",t_en:"Edge preparation & checks",vi:"Cắt khí + mài, gia công cơ, cắt plasma/laser. Thanh tra kiểm trước khi gá: góc, root face/gap đúng WPS (dưỡng đo), bề mặt sạch (không gỉ, sơn, dầu, vảy cắt), không tách lớp ở mép, độ thẳng mép.",en:"Flame cut + grind, machining, plasma/laser. Pre-fit-up checks: angles, root face/gap to WPS (gauges), surfaces clean (no rust, paint, oil, cutting dross), no laminations at the edge, edge straightness."},
 ],
 key:[
  {vi:"Khe hở chân & mặt chân quyết định độ thấu. Góc vát quyết định khả năng tiếp cận.",en:"Root gap/face = penetration; bevel angle = access."},
  {vi:"Phân biệt chắc: JOINT (butt/T/lap/corner/edge) ≠ WELD (butt weld/fillet weld). Mối T có thể hàn fillet HOẶC butt weld thấu hoàn toàn.",en:"Keep separate: JOINT (butt/T/lap/corner/edge) ≠ WELD (butt or fillet weld). A T-joint can take a fillet OR a full-pen butt weld."},
 ],
 quiz:[
  {vi:"Kiểu vát nào tốn ít kim loại đắp hơn cho tấm dày?",en:"Which prep saves filler on thick plate?",
   opts:[{vi:"Vát đơn V",en:"Single-V"},{vi:"Vát đôi V (X) / U",en:"Double-V (X) / U"},{vi:"Vuông",en:"Square"},{vi:"Không vát",en:"No prep"}],ans:1,
   exp:{vi:"Vát đôi/U giảm thể tích cần đắp & cân bằng biến dạng.",en:"Double-V/U reduce filler volume & balance distortion."}},
  {vi:"Khe hở chân (root gap) ảnh hưởng chủ yếu đến?",en:"Root gap mainly affects?",
   opts:[{vi:"Màu mối hàn",en:"Weld colour"},{vi:"Độ thấu chân",en:"Root penetration"},{vi:"Giá khí",en:"Gas cost"},{vi:"Độ cứng que",en:"Rod hardness"}],ans:1,
   exp:{vi:"Khe hở chân kiểm soát độ thấu chân.",en:"Root gap controls root penetration."}},
  {vi:"Ưu điểm chính của vát V kép so với V đơn trên tấm dày?",en:"Main advantage of a double-V over a single-V on thick plate?",
   opts:[{vi:"Không cần thợ giỏi",en:"Needs less skill"},{vi:"Ít kim loại đắp hơn & cân bằng biến dạng góc",en:"Less filler and balanced angular distortion"},{vi:"Không cần NDT",en:"No NDT needed"},{vi:"Hàn được một phía",en:"One-sided welding"}],ans:1,
   exp:{vi:"V kép chia rãnh hai phía → giảm ~nửa kim loại đắp, co kéo hai phía tự cân bằng.",en:"Splitting the groove halves the filler and balances shrinkage."}},
  {vi:"Mặt đáy (root face) để làm gì?",en:"What is the root face for?",
   opts:[{vi:"Trang trí",en:"Decoration"},{vi:"Chống cháy thủng khi hàn lớp lót",en:"Resists burn-through on the root run"},{vi:"Tăng tốc độ hàn",en:"Faster welding"},{vi:"Đỡ tấm lót",en:"Holds backing"}],ans:1,
   exp:{vi:"Root face dày hơn → khó cháy thủng nhưng cần năng lượng ngấu hơn; cân bằng với root gap.",en:"A thicker root face resists burn-through but needs more energy to fuse — balanced against the gap."}},
  {vi:"Phần lồi (convexity) của mối hàn góc có được tính vào cổ chịu lực không?",en:"Does fillet convexity count toward the load-bearing throat?",
   opts:[{vi:"Có, toàn bộ",en:"Yes, fully"},{vi:"Không",en:"No"},{vi:"Tính một nửa",en:"Half of it"},{vi:"Tùy thợ hàn",en:"Welder decides"}],ans:1,
   exp:{vi:"Cổ tính đến tam giác nội tiếp; phần lồi thừa không tăng khả năng chịu lực.",en:"Throat is the inscribed triangle; excess convexity adds no strength."}},
  {vi:"Góc rãnh (included angle) điển hình của V đơn hàn MMA trên tấm?",en:"Typical included angle for a single-V MMA butt on plate?",
   opts:[{vi:"10°",en:"10°"},{vi:"30°",en:"30°"},{vi:"60°",en:"60°"},{vi:"120°",en:"120°"}],ans:2,
   exp:{vi:"~60° (30° mỗi bên) — đủ tiếp cận & ngấu thành, không quá tốn que.",en:"~60° (30° per side) — access and fusion without wasting filler."}},
 ]},

/* 13 ===================================================== */
{vi:"Tiêu chuẩn, quy phạm & hồ sơ", en:"Codes, Standards & Documentation",
 intro:{vi:"Phân biệt tiêu chuẩn/quy phạm và hệ thống hồ sơ chất lượng.",en:"Codes vs standards and quality records."},
 lessons:[
  {t_vi:"Quy phạm (code)",t_en:"Code",vi:"Bộ quy tắc bắt buộc cho một ứng dụng (vd ASME IX, AWS D1.1).",en:"Mandatory rules for an application (ASME IX, AWS D1.1)."},
  {t_vi:"Tiêu chuẩn (standard)",t_en:"Standard",vi:"Tài liệu kỹ thuật đồng thuận (vd ISO 5817 mức chấp nhận khuyết tật).",en:"Consensus technical document (ISO 5817 acceptance levels)."},
  {t_vi:"ISO 5817",t_en:"ISO 5817",vi:"Mức chất lượng B (cao), C, D cho khuyết tật mối hàn thép.",en:"Quality levels B (high), C, D for steel weld imperfections."},
  {t_vi:"Tiêu chuẩn áp dụng",t_en:"Applicable standard",vi:"Tiêu chuẩn được nêu trong hợp đồng/đặc tả → cơ sở chấp nhận/loại bỏ.",en:"The contract-specified standard = basis for accept/reject."},
  {t_vi:"Hồ sơ chất lượng",t_en:"Quality records",vi:"WPS, PQR, chứng chỉ thợ, mill cert, báo cáo NDT, biểu đồ PWHT, nhật ký hàn.",en:"WPS, PQR, welder certs, mill certs, NDT reports, PWHT charts, weld log."},
  {t_vi:"Truy xuất nguồn gốc",t_en:"Traceability",vi:"Liên kết vật liệu–thợ–quy trình–mối hàn để truy ngược khi có sự cố.",en:"Linking material–welder–procedure–weld for traceback."},
  {t_vi:"ISO 5817: ba mức chất lượng",t_en:"ISO 5817 quality levels",vi:"Mức B (nghiêm ngặt nhất – kết cấu quan trọng/mỏi), C (trung bình), D (lỏng nhất). Mỗi khuyết tật (theo ISO 6520-1) có giới hạn kích thước riêng cho từng mức. Hợp đồng/spec quy định mức áp dụng.",en:"Level B (most stringent — critical/fatigue work), C (intermediate), D (least). Each imperfection (per ISO 6520-1) has size limits for each level. The contract/spec states which level applies."},
  {t_vi:"ISO 6520 vs ISO 5817",t_en:"ISO 6520 vs ISO 5817",vi:"ISO 6520-1: PHÂN LOẠI & đánh số khuyết tật (nhóm 1 nứt, 2 rỗ, 3 ngậm rắn, 4 thiếu ngấu/thấu, 5 sai hình dạng, 6 khác). ISO 5817: mức CHẤP NHẬN cho các khuyết tật đó. Một bên gọi tên — một bên phán đạt/loại.",en:"ISO 6520-1 CLASSIFIES and numbers imperfections (group 1 cracks, 2 cavities, 3 solid inclusions, 4 lack of fusion/penetration, 5 shape, 6 misc). ISO 5817 sets ACCEPTANCE limits for them. One names — the other judges."},
  {t_vi:"Bản đồ tiêu chuẩn hay gặp",t_en:"Common standards map",vi:"ISO 15614 (phê duyệt quy trình), ISO 9606 (thợ hàn), ISO 17637 (VT), ISO 17636 (RT), ISO 17640 (UT), ISO 5817 (chấp nhận), ASME IX (quy trình/thợ – hệ Mỹ), ASME B31.3 (đường ống công nghệ), API 1104 (pipeline), AWS D1.1 (kết cấu thép).",en:"ISO 15614 (procedures), ISO 9606 (welders), ISO 17637 (VT), ISO 17636 (RT), ISO 17640 (UT), ISO 5817 (acceptance), ASME IX (US procedures/welders), ASME B31.3 (process piping), API 1104 (pipelines), AWS D1.1 (structural steel)."},
  {t_vi:"Thứ bậc tài liệu dự án",t_en:"Document hierarchy",vi:"Hợp đồng & spec dự án ĐỨNG TRÊN tiêu chuẩn chung (spec có thể nghiêm hơn code). Trình tự tra cứu: spec dự án → code áp dụng → tiêu chuẩn được viện dẫn → WPS. Mâu thuẫn giữa tài liệu phải nêu ra bằng văn bản, không tự suy diễn.",en:"Contract and project spec SIT ABOVE general standards (a spec may exceed the code). Look-up order: project spec → applicable code → referenced standards → WPS. Conflicts must be raised formally in writing, never assumed."},
  {t_vi:"Hồ sơ phải lưu (quality records)",t_en:"Records to retain",vi:"Chứng chỉ vật liệu & que (mẻ), WPS/PQR, chứng chỉ thợ & NDT op, báo cáo VT/NDT, biểu đồ PWHT, báo cáo hiệu chuẩn, NCR & concession, sơ đồ vị trí mối hàn (weld map), as-built. Lưu theo thời hạn hợp đồng/luật (thường nhiều năm).",en:"Material & consumable certs (heats/batches), WPS/PQR, welder & NDT certs, VT/NDT reports, PWHT charts, calibration certs, NCRs & concessions, weld maps, as-built records. Kept per contract/legal retention (often years)."},
  {t_vi:"Weld map & truy xuất mối hàn",t_en:"Weld maps & traceability",vi:"Mỗi mối hàn có số hiệu duy nhất trên sơ đồ: gắn với thợ hàn (số đóng/stencil), WPS, mẻ vật liệu, báo cáo NDT, sửa chữa (R1, R2). Nhìn weld map phải truy ra toàn bộ lịch sử mối hàn.",en:"Every weld has a unique number on the map, linked to the welder (stamp), WPS, material heats, NDT reports and repairs (R1, R2). The full history of any weld must be traceable from the map."},
  {t_vi:"Kiểm soát sửa chữa (repair)",t_en:"Repair control",vi:"Khuyết tật vượt giới hạn → NCR → quy trình sửa được DUYỆT (đục/mài hết khuyết tật, xác nhận sạch bằng MT/PT, hàn lại theo WPS sửa chữa, NDT lại 100%). Số lần sửa cùng vị trí thường bị giới hạn (vd 2 lần) vì nhiệt lặp làm xấu HAZ.",en:"Out-of-limit defect → NCR → APPROVED repair procedure (excavate fully, prove clean by MT/PT, reweld to a repair WPS, 100% re-NDT). Repeat repairs at one location are usually limited (e.g. twice) — repeated cycles degrade the HAZ."},
 ],
 key:[
  {vi:"Quyết định chấp nhận luôn dựa trên 'tiêu chuẩn áp dụng' nêu trong hợp đồng — không phải ý kiến cá nhân.",en:"Accept/reject is per the applicable (contract) standard, never personal opinion."},
  {vi:"ISO 5817 mức B-C-D: B nghiêm nhất. Spec dự án có thể NGHIÊM HƠN tiêu chuẩn — luôn đọc spec trước.",en:"ISO 5817 B-C-D: B is strictest. The project spec can be TIGHTER than the standard — read the spec first."},
 ],
 quiz:[
  {vi:"Cơ sở để chấp nhận hay loại bỏ một mối hàn là?",en:"Basis for accepting/rejecting a weld?",
   opts:[{vi:"Ý kiến thanh tra",en:"Inspector opinion"},{vi:"Tiêu chuẩn áp dụng trong hợp đồng",en:"The applicable contract standard"},{vi:"Ý kiến thợ hàn",en:"Welder opinion"},{vi:"Giá thành",en:"Cost"}],ans:1,
   exp:{vi:"Luôn theo tiêu chuẩn áp dụng.",en:"Always per the applicable standard."}},
  {vi:"ISO 5817 quy định gì?",en:"ISO 5817 specifies?",
   opts:[{vi:"Quy trình NDT",en:"NDT procedure"},{vi:"Mức chấp nhận khuyết tật (B,C,D)",en:"Imperfection acceptance levels (B,C,D)"},{vi:"Giá vật tư",en:"Material price"},{vi:"An toàn điện",en:"Electrical safety"}],ans:1,
   exp:{vi:"ISO 5817 cho mức chất lượng B/C/D của khuyết tật mối hàn.",en:"ISO 5817 = quality levels for weld imperfections."}},
  {vi:"Theo ISO 5817, mức chất lượng nào nghiêm ngặt nhất?",en:"Which ISO 5817 level is most stringent?",
   opts:[{vi:"Mức D",en:"Level D"},{vi:"Mức C",en:"Level C"},{vi:"Mức B",en:"Level B"},{vi:"Mức A",en:"Level A"}],ans:2,
   exp:{vi:"B nghiêm nhất, rồi C, D. (Không có mức A trong 5817.)",en:"B strictest, then C, then D. (There is no level A.)"}},
  {vi:"Tiêu chuẩn nào PHÂN LOẠI khuyết tật mối hàn?",en:"Which standard CLASSIFIES weld imperfections?",
   opts:[{vi:"ISO 5817",en:"ISO 5817"},{vi:"ISO 6520-1",en:"ISO 6520-1"},{vi:"ISO 9606",en:"ISO 9606"},{vi:"ISO 15614",en:"ISO 15614"}],ans:1,
   exp:{vi:"6520-1 đặt tên & đánh số khuyết tật; 5817 cho giới hạn chấp nhận.",en:"6520-1 names and numbers them; 5817 gives acceptance limits."}},
  {vi:"Spec dự án yêu cầu nghiêm hơn tiêu chuẩn chung — làm theo cái nào?",en:"The project spec is tighter than the general standard — which governs?",
   opts:[{vi:"Tiêu chuẩn chung",en:"The general standard"},{vi:"Spec dự án",en:"The project spec"},{vi:"Cái nào dễ hơn",en:"The easier one"},{vi:"Tự thanh tra chọn",en:"Inspector's choice"}],ans:1,
   exp:{vi:"Tài liệu hợp đồng/spec đứng trên tiêu chuẩn chung khi nghiêm hơn.",en:"Contract documents govern when more stringent."}},
  {vi:"Trước khi hàn sửa vùng đã đục khuyết tật, cần làm gì?",en:"Before rewelding an excavated defect, you must?",
   opts:[{vi:"Hàn ngay cho nhanh",en:"Weld immediately"},{vi:"Xác nhận đã sạch khuyết tật bằng MT/PT",en:"Prove the excavation clean by MT/PT"},{vi:"Sơn lại",en:"Repaint"},{vi:"Đổi thợ hàn",en:"Change welder"}],ans:1,
   exp:{vi:"Phải chứng minh khuyết tật đã loại bỏ HẾT trước khi hàn lại, nếu không nứt còn sót sẽ lan tiếp.",en:"Full removal must be proven before rewelding, or remaining cracks propagate."}},
 ]},

/* 14 ===================================================== */
{vi:"Thiết bị đo & hiệu chuẩn", en:"Inspection Equipment & Calibration",
 intro:{vi:"Dụng cụ đo mối hàn và yêu cầu hiệu chuẩn.",en:"Weld gauges and calibration."},
 lessons:[
  {t_vi:"Dưỡng đo mối hàn",t_en:"Weld gauge",vi:"Đo chiều cao chân, cạnh hàn góc, lồi, cháy chân (vd dưỡng cầu vồng, V-WAC).",en:"Measures cap height, fillet leg, undercut (e.g. multi/V-WAC gauges)."},
  {t_vi:"Thước cặp / dưỡng",t_en:"Calipers/templates",vi:"Đo khe hở, lệch mép (misalignment/hi-lo), kích thước vát.",en:"Measure gap, hi-lo misalignment, prep dimensions."},
  {t_vi:"Đo nhiệt",t_en:"Temperature gauges",vi:"Bút nhiệt, cặp nhiệt, đồng hồ tiếp xúc đo tiền nhiệt/interpass.",en:"Crayons, thermocouples, contact thermometers."},
  {t_vi:"Hiệu chuẩn",t_en:"Calibration",vi:"Thiết bị đo phải được hiệu chuẩn định kỳ, có tem & truy xuất chuẩn quốc gia.",en:"Equipment calibrated periodically, labelled, traceable to national standards."},
  {t_vi:"Ánh sáng kiểm tra",t_en:"Lighting",vi:"Cường độ sáng tối thiểu (~500 lux) cho kiểm tra ngoại quan.",en:"Minimum illumination (~500 lux) for VT."},
  {t_vi:"Dưỡng đa năng Cambridge",t_en:"Cambridge multi-purpose gauge",vi:"Một dụng cụ đo được: góc vát, lệch mép (hi-lo), độ lồi cap, độ sâu undercut, chiều cao chân (root penetration), cạnh & cổ mối hàn góc. Là dưỡng phổ biến nhất của thanh tra CSWIP.",en:"One tool measures: prep angle, misalignment (hi-lo), cap height, undercut depth, root penetration, fillet leg and throat. The CSWIP inspector's standard gauge."},
  {t_vi:"Các dưỡng khác",t_en:"Other gauges",vi:"Hi-lo gauge: lệch mép trong/ngoài ống trước & sau hàn. Fillet gauge bộ lá: kiểm nhanh z/a theo cữ. TWI gauge, thước lá đo khe hở, thước đo sâu vernier cho undercut. Tất cả phải đọc được tới độ chia phù hợp tiêu chí.",en:"Hi-lo gauge: pipe internal/external misalignment before and after welding. Blade-type fillet gauges: quick go/no-go of z/a. TWI gauge, feeler gauges for gaps, depth verniers for undercut. Resolution must suit the acceptance criteria."},
  {t_vi:"Đo dòng & áp thực tế",t_en:"Measuring actual current & voltage",vi:"Ampe kìm (tong tester) kẹp quanh cáp hàn đo dòng. Điện áp HỒ QUANG đo càng gần hồ quang càng tốt (giữa kẹp mát & mỏ/kìm hàn) — đo tại đồng hồ máy sẽ sai do sụt áp trên cáp dài.",en:"A tong tester clipped round the welding cable reads current. ARC voltage should be measured as close to the arc as practicable (work clamp to torch) — machine meters mis-read because of cable voltage drop."},
  {t_vi:"Hiệu chuẩn vs kiểm định thiết bị hàn",t_en:"Calibration vs validation",vi:"Hiệu chuẩn (calibration): so dụng cụ đo với chuẩn truy xuất quốc gia, có chứng chỉ & tem hạn. Kiểm định máy hàn (validation, BS 7570): xác nhận đồng hồ máy hàn chỉ đúng trong dung sai. Thanh tra kiểm tem hạn TRƯỚC khi tin số đo.",en:"Calibration: comparing an instrument against nationally traceable standards, with certificate and due-date label. Welding-machine validation (BS 7570): confirming machine meters read within tolerance. Check labels and due dates BEFORE trusting readings."},
  {t_vi:"Chu kỳ hiệu chuẩn & xử lý quá hạn",t_en:"Calibration intervals & out-of-cal",vi:"Chu kỳ thường 6–12 tháng (theo hệ thống chất lượng). Dụng cụ quá hạn/rơi hỏng: DÁN NHÃN loại, không dùng. Nếu phát hiện dụng cụ sai sau khi đã dùng → đánh giá lại các kết quả đã đo bằng nó (có thể phải kiểm lại).",en:"Typically 6–12 months per the quality system. Overdue or dropped instruments: LABEL and quarantine. If an instrument is later found inaccurate, all results taken with it must be re-assessed (possible re-inspection)."},
  {t_vi:"Đo nhiệt độ",t_en:"Temperature measurement tools",vi:"Bút nhiệt (crayon – nóng chảy ở nhiệt định trước, rẻ, ±5–10°C), cặp nhiệt tiếp xúc (chính xác, ghi liên tục cho PWHT), hỏa kế hồng ngoại (không chạm — cẩn thận độ phát xạ bề mặt). Dùng cho tiền nhiệt, interpass, PWHT.",en:"Temp-indicating crayons (melt at set temps, cheap), contact thermocouples (accurate, chartable for PWHT), infrared pyrometers (non-contact — beware surface emissivity). Used for preheat, interpass and PWHT."},
  {t_vi:"Đồng hồ khí & lưu lượng",t_en:"Gas regulators & flowmeters",vi:"Kiểm: đúng loại khí, đồng hồ áp & lưu lượng kế hoạt động, lưu lượng đúng WPS (vd 10–18 l/phút TIG/MIG), ống không rò/gãy gập. Lưu lượng sai → rỗ khí hoặc cuốn khí.",en:"Check: correct gas, working regulator and flowmeter, flow per WPS (e.g. 10–18 l/min TIG/MIG), hoses sound. Wrong flow → porosity or turbulence."},
 ],
 key:[
  {vi:"Dụng cụ chưa hiệu chuẩn → kết quả đo không có giá trị. Luôn kiểm tra tem hiệu chuẩn.",en:"Uncalibrated tools = invalid results. Always check calibration."},
  {vi:"Số đo chỉ có giá trị khi dụng cụ CÒN HẠN hiệu chuẩn & truy xuất chuẩn quốc gia. Điện áp hồ quang đo gần hồ quang, không tin đồng hồ máy.",en:"A reading is only valid from an in-date, traceably calibrated instrument. Measure arc voltage near the arc, not at the machine meter."},
 ],
 quiz:[
  {vi:"Vì sao thiết bị đo phải được hiệu chuẩn?",en:"Why must measuring tools be calibrated?",
   opts:[{vi:"Cho đẹp",en:"Appearance"},{vi:"Đảm bảo kết quả đo chính xác & có giá trị",en:"Ensure accurate, valid results"},{vi:"Để bán lại",en:"Resale"},{vi:"Không cần thiết",en:"Not needed"}],ans:1,
   exp:{vi:"Hiệu chuẩn đảm bảo độ chính xác và tính pháp lý của kết quả.",en:"Calibration ensures accuracy & validity."}},
  {vi:"Dụng cụ nào đo lệch mép (hi-lo) và cháy chân?",en:"Which measures hi-lo and undercut?",
   opts:[{vi:"Bút nhiệt",en:"Temp crayon"},{vi:"Dưỡng đo mối hàn",en:"Weld gauge"},{vi:"Máy siêu âm",en:"UT machine"},{vi:"Đồng hồ áp",en:"Pressure gauge"}],ans:1,
   exp:{vi:"Dưỡng đo mối hàn (vd V-WAC) đo lệch mép, cháy chân, lồi.",en:"Weld gauges measure hi-lo, undercut, cap."}},
  {vi:"Điện áp hồ quang nên được đo ở đâu?",en:"Where should arc voltage be measured?",
   opts:[{vi:"Tại đồng hồ trên máy hàn",en:"At the machine meter"},{vi:"Càng gần hồ quang càng tốt",en:"As close to the arc as practicable"},{vi:"Tại tủ điện nguồn",en:"At the mains board"},{vi:"Không cần đo",en:"No need"}],ans:1,
   exp:{vi:"Sụt áp trên cáp dài làm đồng hồ máy chỉ sai — đo giữa mỏ hàn & kẹp mát gần mối hàn.",en:"Cable voltage drop falsifies the machine meter — measure near the arc."}},
  {vi:"Dưỡng hi-lo dùng để kiểm tra gì?",en:"A hi-lo gauge checks?",
   opts:[{vi:"Độ cứng",en:"Hardness"},{vi:"Lệch mép hai chi tiết",en:"Misalignment of the two parts"},{vi:"Dòng hàn",en:"Current"},{vi:"Độ ẩm que",en:"Rod moisture"}],ans:1,
   exp:{vi:"Hi-lo đo lệch mép (linear misalignment) trong/ngoài, đặc biệt khi gá ống.",en:"It measures linear misalignment, especially at pipe fit-up."}},
  {vi:"Phát hiện thước đo quá hạn hiệu chuẩn đã dùng tuần trước, xử lý thế nào?",en:"A gauge used last week is found out of calibration. Action?",
   opts:[{vi:"Bỏ qua, số chắc vẫn đúng",en:"Ignore it"},{vi:"Loại dụng cụ & đánh giá lại các kết quả đã đo",en:"Quarantine it and re-assess past results"},{vi:"Tiếp tục dùng đến cuối tháng",en:"Use it till month-end"},{vi:"Chỉ cần lau sạch",en:"Just clean it"}],ans:1,
   exp:{vi:"Kết quả từ dụng cụ sai chuẩn không tin được — phải xem xét/kiểm tra lại.",en:"Readings from an out-of-cal tool are unreliable — past results must be reviewed."}},
 ]},

/* 15 ===================================================== */
{vi:"An toàn trong hàn", en:"Health & Safety in Welding",
 intro:{vi:"Mối nguy và biện pháp an toàn khi hàn.",en:"Welding hazards and controls."},
 lessons:[
  {t_vi:"Điện giật",t_en:"Electric shock",vi:"Nguy cơ chính; cách điện tốt, nối đất, tránh ẩm ướt, kiểm tra cáp.",en:"Main hazard; insulation, earthing, dry conditions, cable checks."},
  {t_vi:"Bức xạ hồ quang",t_en:"Arc radiation",vi:"Tia UV/IR gây bỏng mắt (arc eye) & da. Dùng kính lọc đúng số, che chắn.",en:"UV/IR causes arc-eye & skin burns; correct filter shade, screens."},
  {t_vi:"Khói & khí hàn",t_en:"Fume & gases",vi:"Hít khói kim loại độc (Mn, Cr, Ni, ozone). Cần thông gió/hút khói (LEV), khẩu trang.",en:"Toxic metal fume (Mn, Cr, Ni, ozone); use LEV/ventilation, RPE."},
  {t_vi:"Cháy nổ",t_en:"Fire/explosion",vi:"Tia lửa, văng tóe, khí nén. Dọn vật cháy, giấy phép làm việc nóng (hot work permit).",en:"Sparks, spatter, gas cylinders; clear combustibles, hot-work permit."},
  {t_vi:"Không gian hạn chế",t_en:"Confined space",vi:"Thiếu oxy/tích khí. Cần kiểm tra khí, thông gió, giám sát, giấy phép.",en:"Oxygen deficiency/gas buildup; gas test, ventilation, permit, attendant."},
  {t_vi:"PPE",t_en:"PPE",vi:"Mặt nạ hàn, găng, áo da, giày bảo hộ, nút tai.",en:"Welding helmet, gloves, leathers, safety boots, ear protection."},
  {t_vi:"Giấy phép làm việc nóng",t_en:"Hot work permit",vi:"Hàn/cắt ngoài xưởng quy định phải có hot work permit: nêu phạm vi, thời hạn, biện pháp (dọn vật cháy bán kính ~10 m, người canh lửa, bình chữa cháy, kiểm tra lại sau khi xong 30–60 phút vì lửa âm ỉ).",en:"Welding/cutting outside designated shops needs a permit: scope, duration, controls (clear combustibles ~10 m, fire watch, extinguishers, re-check 30–60 min after finishing for smouldering)."},
  {t_vi:"An toàn chai khí",t_en:"Gas cylinder safety",vi:"Chai đứng & xích cố định, van có nắp khi vận chuyển, tránh nắng/nhiệt, oxy KHÔNG ĐƯỢC dính dầu mỡ (tự bốc cháy), axetylen không nằm ngang & áp làm việc <1,5 bar, van chống cháy ngược (flashback arrestor) trên cả hai đường.",en:"Upright and chained, valve caps for transport, away from heat. Oxygen must NEVER meet oil/grease (spontaneous fire); acetylene never horizontal, working pressure <1.5 bar; flashback arrestors on both lines."},
  {t_vi:"Không gian hạn chế: khí",t_en:"Confined spaces: gas hazards",vi:"Nguy cơ: thiếu oxy (argon/CO2 NẶNG hơn không khí, tích đáy bồn), khí độc. Bắt buộc: đo khí trước & trong khi làm, thông gió cưỡng bức, người trực ngoài, dây cứu hộ, KHÔNG BAO GIỜ thông gió bằng oxy.",en:"Risks: oxygen depletion (argon/CO2 are HEAVIER than air, pooling in tank bottoms), toxic gases. Mandatory: gas testing before/during, forced ventilation, standby attendant, rescue line, and NEVER ventilate with oxygen."},
  {t_vi:"Khói hàn nguy hiểm đặc biệt",t_en:"Specific fume hazards",vi:"Inox/hợp kim Cr: Cr6+ (ung thư) — cần LEV tốt/mặt nạ cấp khí. Mạ kẽm: sốt khói kim loại. Hơi dung môi clo hóa (tẩy dầu) gặp tia UV hồ quang → khí PHOSGENE độc — cấm tẩy dầu gần chỗ hàn. TIG nhôm sinh nhiều OZONE.",en:"Stainless/Cr alloys: hexavalent chromium (carcinogen) — good LEV/air-fed RPE. Galvanised: metal-fume fever. Chlorinated solvent vapours + arc UV → toxic PHOSGENE — no degreasing near welding. TIG on aluminium makes much OZONE."},
  {t_vi:"Kính lọc hồ quang",t_en:"Filter shades",vi:"Số kính theo quá trình & dòng: MMA ~ shade 9–13, MIG ~10–14, TIG ~10–14 (dòng càng cao số càng lớn). Người phụ/canh lửa cũng cần kính bảo vệ. Arc eye: đau như cát trong mắt sau vài giờ — báo y tế.",en:"Shade by process & current: MMA ~9–13, MIG ~10–14, TIG ~10–14 (higher current = darker). Assistants and fire watch need eye protection too. Arc eye feels like sand in the eyes hours later — seek first aid."},
  {t_vi:"Điện: HF & môi trường ướt",t_en:"Electrical: HF & wet conditions",vi:"Nguy cơ điện giật cao nhất khi: thay que tay trần, đổ mồ hôi/ướt, không gian chật chạm vật hàn. Biện pháp: găng khô, lót cách điện, OCV giới hạn, ngắt nguồn khi thay phụ kiện; TIG mồi HF gây giật phản xạ — cẩn thận trên cao.",en:"Shock risk peaks: changing electrodes bare-handed, sweat/wet, cramped contact with the work. Controls: dry gloves, insulating mats, limited OCV, isolate before maintenance; HF TIG starts cause reflex jerks — care at height."},
  {t_vi:"Tiếng ồn & việc trên cao",t_en:"Noise & working at height",vi:"Mài/gouging/plasma vượt 85 dB(A) → nút/chụp tai. Trên cao: sàn thao tác, dây an toàn, che chắn tia lửa rơi xuống người bên dưới, không để cáp hàn tạo nguy cơ vấp ngã.",en:"Grinding/gouging/plasma exceed 85 dB(A) — hearing protection. At height: platforms, harnesses, shield falling sparks from people below, manage cables against trips."},
 ],
 key:[
  {vi:"Trước hàn trong không gian hạn chế: kiểm tra khí + thông gió + giấy phép + người giám sát.",en:"Confined space: gas test + ventilation + permit + attendant."},
  {vi:"Ba phản xạ an toàn của thanh tra: (1) khí trơ nặng hơn không khí — bồn kín là bẫy ngạt; (2) oxy + dầu mỡ = cháy; (3) dung môi clo + UV = phosgene.",en:"Three reflexes: (1) inert gases are heavier than air — closed tanks are asphyxiation traps; (2) oxygen + oil = fire; (3) chlorinated solvent + UV = phosgene."},
 ],
 quiz:[
  {vi:"'Arc eye' do tác nhân nào gây ra?",en:"'Arc eye' is caused by?",
   opts:[{vi:"Khói hàn",en:"Fume"},{vi:"Tia cực tím (UV) từ hồ quang",en:"UV radiation from the arc"},{vi:"Tiếng ồn",en:"Noise"},{vi:"Điện giật",en:"Electric shock"}],ans:1,
   exp:{vi:"Bức xạ UV gây viêm giác mạc (arc eye).",en:"UV radiation causes arc-eye."}},
  {vi:"Biện pháp chính chống khói hàn độc?",en:"Main control for welding fume?",
   opts:[{vi:"Đeo kính",en:"Wear glasses"},{vi:"Thông gió/hút khói cục bộ (LEV) + RPE",en:"Ventilation/LEV + RPE"},{vi:"Hàn nhanh hơn",en:"Weld faster"},{vi:"Tăng dòng",en:"Increase current"}],ans:1,
   exp:{vi:"Hút khói cục bộ + thiết bị bảo vệ hô hấp.",en:"LEV + respiratory protection."}},
  {vi:"Vì sao hàn TIG trong bồn kín dùng argon đặc biệt nguy hiểm?",en:"Why is TIG welding with argon in a closed tank especially dangerous?",
   opts:[{vi:"Argon dễ cháy",en:"Argon is flammable"},{vi:"Argon nặng hơn không khí, tích tụ gây ngạt không dấu hiệu",en:"Argon is heavier than air and silently displaces oxygen"},{vi:"Argon ăn mòn da",en:"Argon burns skin"},{vi:"Không nguy hiểm",en:"It is not dangerous"}],ans:1,
   exp:{vi:"Argon không mùi, nặng hơn không khí — chiếm chỗ oxy ở đáy bồn, gây ngất rồi tử vong rất nhanh.",en:"Odourless, heavier than air — it pools and displaces oxygen, causing rapid collapse."}},
  {vi:"Tẩy dầu bằng dung môi clo hóa gần chỗ hàn tạo ra khí gì?",en:"Chlorinated degreaser near welding arcs creates which gas?",
   opts:[{vi:"Ozone",en:"Ozone"},{vi:"Phosgene",en:"Phosgene"},{vi:"Argon",en:"Argon"},{vi:"Heli",en:"Helium"}],ans:1,
   exp:{vi:"Tia UV phân hủy hơi dung môi clo → phosgene cực độc. Cấm tẩy dầu cạnh hồ quang.",en:"Arc UV breaks down the vapours into highly toxic phosgene."}},
  {vi:"Van chống cháy ngược (flashback arrestor) lắp ở đâu?",en:"Where are flashback arrestors fitted?",
   opts:[{vi:"Chỉ đường oxy",en:"Oxygen line only"},{vi:"Chỉ đường axetylen",en:"Acetylene line only"},{vi:"Cả hai đường khí",en:"Both gas lines"},{vi:"Không cần",en:"Not needed"}],ans:2,
   exp:{vi:"Lắp cả hai đường (oxy & nhiên liệu) để chặn ngọn lửa cháy ngược về chai.",en:"Both lines, to stop a flame travelling back to the cylinders."}},
 ]},

/* 16 ===== WIS5 §2: Thuật ngữ & định nghĩa ===================== */
{vi:"Thuật ngữ & định nghĩa mối hàn", en:"Terms and Definitions",
 intro:{vi:"Theo WIS5 mục 2 — thuật ngữ chuẩn về mối hàn, mối nối, các bộ phận mối hàn, vị trí hàn. Nền tảng để hiểu mọi chương khác.",en:"WIS5 section 2 — standard weld/joint/position terminology."},
 lessons:[
  {t_vi:"Mối hàn vs mối nối",t_en:"Weld vs Joint",vi:"Mối hàn (weld) = liên kết do nóng chảy; mối nối (joint) = cấu hình các chi tiết được ghép (giáp mép, chữ T, chồng, góc).",en:"A weld is the fused union; a joint is the configuration (butt, T, lap, corner)."},
  {t_vi:"Các bộ phận mối hàn",t_en:"Parts of a weld",vi:"Chân (root), mặt (face), mép (toe), kim loại đắp lồi (excess weld metal/cap), vùng ảnh hưởng nhiệt (HAZ).",en:"Root, face, toe, excess weld metal (cap), HAZ."},
  {t_vi:"Chiều dày cổ mối hàn góc",t_en:"Throat thickness",vi:"Cổ tính toán (design throat) a và cổ thực tế (actual throat); cạnh (leg) z. Kích thước mối hàn góc ghi theo a hoặc z.",en:"Design throat a and actual throat; leg length z. Fillet size given as a or z."},
  {t_vi:"Mối hàn giáp mép thấu hoàn toàn/một phần",t_en:"Full/partial penetration",vi:"Thấu hoàn toàn (full penetration) điền hết chiều dày; thấu một phần (partial) chỉ một phần chiều dày.",en:"Full penetration fills whole thickness; partial penetration only part."},
  {t_vi:"Góc rãnh / mặt cùn / khe hở chân",t_en:"Included angle/root face/gap",vi:"Góc rãnh (included angle), góc vát (bevel angle), mặt cùn (root face), khe hở chân (root gap) — kiểm soát độ thấu & khả năng tiếp cận.",en:"Included angle, bevel angle, root face, root gap — control penetration & access."},
  {t_vi:"Vị trí hàn",t_en:"Welding positions",vi:"PA bằng (flat), PB ngang góc, PC ngang (horizontal), PF leo lên (vertical-up), PG tụt xuống (vertical-down), PE/PD trần (overhead).",en:"PA flat, PB horizontal-vertical, PC horizontal, PF vertical-up, PG vertical-down, PE/PD overhead."},
  {t_vi:"Lắc que (weaving)",t_en:"Weaving",vi:"Dao động ngang để tạo bề rộng mối hàn; lắc nhiều → nhiệt đầu vào cao hơn.",en:"Side-to-side motion to widen the bead; more weave = higher heat input."},
  {t_vi:"Các lớp hàn theo thứ tự",t_en:"Weld runs in order",vi:"Lớp lót (root run) → lớp nóng (hot pass – đắp ngay sau lót, tránh nứt lót) → các lớp điền đầy (fill) → lớp phủ (cap/cover). Lớp đỡ phía sau: backing run; lớp bịt kín: sealing run.",en:"Root run → hot pass (laid promptly to protect the root) → filling runs → capping run. From the rear: backing run; a sealing run closes the reverse side."},
  {t_vi:"Stringer vs weave",t_en:"Stringer beads vs weaving",vi:"Stringer: đường thẳng không lắc — nhiệt đầu vào thấp, kiểm soát tốt. Weave: lắc ngang — phủ rộng, nhiệt cao hơn, dễ undercut nếu lắc quá; nhiều WPS giới hạn bề rộng lắc (vd ≤ 3× đường kính lõi que).",en:"Stringer: straight, no oscillation — lower heat input, better control. Weave: side-to-side — wider coverage, more heat, undercut risk; many WPS limit weave width (e.g. ≤ 3× core wire diameter)."},
  {t_vi:"Góc mỏ/que: work & travel angle",t_en:"Work angle & travel angle",vi:"Work angle: góc nghiêng so với bề mặt (fillet thường ~45° giữa hai tấm). Travel angle: nghiêng theo hướng đi — kéo (drag/backhand, ngấu sâu hơn) hoặc đẩy (push/forehand, bảo vệ khí tốt hơn, MIG).",en:"Work angle: tilt relative to the surfaces (fillets ~45° between plates). Travel angle: lean along the direction — drag/backhand (deeper penetration) or push/forehand (better gas coverage, MIG)."},
  {t_vi:"Mã vị trí ISO ↔ ASME",t_en:"ISO vs ASME position codes",vi:"PA=1G/1F bằng; PB=2F góc ngang; PC=2G ngang; PD=4F; PE=4G trần; PF leo lên (3G up/5G up); PG tụt xuống (3G down/5G down); H-L045=6G ống nghiêng 45° lên. Thuộc cả hai hệ vì đề trộn lẫn.",en:"PA=1G/1F flat; PB=2F horizontal fillet; PC=2G horizontal; PD=4F; PE=4G overhead; PF vertical-up (3G/5G up); PG vertical-down; H-L045=6G inclined pipe uphill. Know both systems — exams mix them."},
  {t_vi:"Hàn tay – cơ giới – tự động",t_en:"Manual, mechanised, automatic",vi:"Manual: thợ cầm & điều khiển hoàn toàn (MMA, TIG). Partly mechanised: máy cấp dây, thợ cầm mỏ (MIG). Mechanised: mỏ trên xe/giá, thợ chỉnh trong khi hàn (SAW xe). Automatic: chạy theo chương trình, không cần chỉnh tay.",en:"Manual: welder holds and controls everything (MMA, TIG). Partly mechanised: machine feeds wire, welder holds the torch (MIG). Mechanised: torch carried by carriage, operator adjusts during welding (tractor SAW). Automatic: programmed, no manual adjustment."},
  {t_vi:"Cạnh, mitre & dạng mối hàn góc",t_en:"Fillet shapes: mitre, convex, concave",vi:"Mitre: mặt phẳng 45°, a=0,7z. Lồi (convex): cổ thực lớn hơn nhưng chân mối hàn gấp khúc → tập trung ứng suất. Lõm (concave): chuyển tiếp mượt (tốt cho mỏi) nhưng cổ NHỎ hơn cạnh đo được.",en:"Mitre: flat 45° face, a=0.7z. Convex: bigger actual throat but sharper toe angles — stress concentration. Concave: smooth blending (good for fatigue) but the throat is SMALLER than the measured leg suggests."},
  {t_vi:"Đường chảy & ranh giới",t_en:"Fusion line & boundaries",vi:"Fusion line (đường chảy): ranh giới kim loại nóng chảy/không chảy. Weld junction; weld boundary. HAZ nằm NGOÀI đường chảy trong vật liệu cơ bản — không bị nóng chảy nhưng bị biến đổi tổ chức.",en:"Fusion line: boundary between melted and unmelted metal. The HAZ lies OUTSIDE it in the parent metal — not melted, but structurally altered."},
  {t_vi:"Từ vựng đo mối hàn",t_en:"Weld measurement vocabulary",vi:"Excess weld metal (phần lồi cap — từ chuẩn thay cho reinforcement vì KHÔNG làm bền thêm), toe (chân/mép), root (gốc), face (bề mặt), width (bề rộng cap), leg length, design/actual/effective throat.",en:"Excess weld metal (preferred over reinforcement — it adds no strength), toe, root, face, weld width, leg length, design/actual/effective throat."},
 ],
 key:[
  {vi:"Phân biệt rõ: 'weld' (mối hàn) khác 'joint' (mối nối). Đề hay đánh lừa chỗ này.",en:"Distinguish weld vs joint — a common exam trap."},
  {vi:"Nhớ mã vị trí hàn ISO 6947: PA, PB, PC, PF (leo lên), PG (tụt xuống).",en:"Memorise ISO 6947 position codes: PA, PB, PC, PF (up), PG (down)."},
  {vi:"PF (leo lên) và PG (tụt xuống) là cặp dễ nhầm nhất trong đề — PF = Climb (lên), PG = Gravity (xuống).",en:"PF (up) vs PG (down) is the classic mix-up — think PF = climb, PG = gravity."},
 ],
 quiz:[
  {vi:"Sự khác nhau giữa 'weld' và 'joint' là gì?",en:"Difference between a weld and a joint?",
   opts:[{vi:"Giống nhau hoàn toàn",en:"They are the same"},{vi:"Weld là liên kết nóng chảy; joint là cấu hình ghép nối",en:"Weld = fused union; joint = configuration of parts"},{vi:"Joint chỉ dùng cho ống",en:"Joint is only for pipes"},{vi:"Weld chỉ là phần xỉ",en:"Weld is just the slag"}],ans:1,
   exp:{vi:"Joint là kiểu ghép (butt/T/lap...); weld là phần kim loại liên kết do nóng chảy.",en:"Joint = arrangement; weld = the fused metal union."}},
  {vi:"Mã vị trí hàn 'PF' theo ISO 6947 nghĩa là gì?",en:"ISO 6947 position 'PF' means?",
   opts:[{vi:"Hàn bằng",en:"Flat"},{vi:"Hàn leo lên (vertical-up)",en:"Vertical-up"},{vi:"Hàn tụt xuống",en:"Vertical-down"},{vi:"Hàn trần",en:"Overhead"}],ans:1,
   exp:{vi:"PF = hàn leo lên; PG = hàn tụt xuống.",en:"PF = vertical-up; PG = vertical-down."}},
  {vi:"Kích thước mối hàn góc thường được ghi theo?",en:"Fillet weld size is usually given by?",
   opts:[{vi:"Màu sắc",en:"Colour"},{vi:"Cạnh (leg, z) hoặc cổ (throat, a)",en:"Leg (z) or throat (a)"},{vi:"Khối lượng que",en:"Rod weight"},{vi:"Dòng hàn",en:"Current"}],ans:1,
   exp:{vi:"Mối hàn góc ghi theo cạnh z hoặc chiều cao cổ a.",en:"Fillet size = leg z or throat a."}},
  {vi:"Lớp 'hot pass' được hàn khi nào?",en:"When is the hot pass deposited?",
   opts:[{vi:"Trước lớp lót",en:"Before the root"},{vi:"Ngay sau lớp lót",en:"Promptly after the root run"},{vi:"Sau lớp phủ",en:"After the cap"},{vi:"Chỉ khi sửa chữa",en:"Only for repairs"}],ans:1,
   exp:{vi:"Hot pass đắp sớm sau lót để gia cố lớp lót mỏng, giảm nguy cơ nứt.",en:"Laid promptly to reinforce the thin root and reduce cracking risk."}},
  {vi:"Mã PE (ISO 6947) tương ứng vị trí nào?",en:"ISO 6947 position PE corresponds to?",
   opts:[{vi:"Hàn bằng",en:"Flat"},{vi:"Hàn ngang",en:"Horizontal"},{vi:"Hàn trần",en:"Overhead"},{vi:"Hàn leo",en:"Vertical-up"}],ans:2,
   exp:{vi:"PE = overhead (4G). PA bằng, PC ngang, PF leo lên, PG tụt.",en:"PE = overhead (4G). PA flat, PC horizontal, PF up, PG down."}},
  {vi:"Vì sao mối hàn góc LÕM tốt cho tải mỏi nhưng vẫn cần thận trọng?",en:"Why is a concave fillet good for fatigue yet needs care?",
   opts:[{vi:"Vì xấu",en:"It looks bad"},{vi:"Chuyển tiếp chân mượt nhưng cổ thực nhỏ hơn cạnh đo",en:"Smooth toes but the throat is smaller than the leg suggests"},{vi:"Tốn que hơn",en:"Uses more rod"},{vi:"Không cần thận trọng",en:"No care needed"}],ans:1,
   exp:{vi:"Lõm giảm tập trung ứng suất tại chân, nhưng phải kiểm cổ a còn đạt thiết kế.",en:"Concavity smooths the toes, but verify the throat still meets design."}},
  {vi:"Kỹ thuật hàn 'kéo' (drag/backhand) cho đặc điểm gì?",en:"The drag (backhand) technique gives?",
   opts:[{vi:"Ngấu sâu hơn",en:"Deeper penetration"},{vi:"Ngấu nông hơn",en:"Shallower penetration"},{vi:"Không hồ quang",en:"No arc"},{vi:"Chỉ dùng cho nhôm",en:"Aluminium only"}],ans:0,
   exp:{vi:"Kéo (mỏ nghiêng ngược hướng đi) tập trung hồ quang vào vũng → ngấu sâu; đẩy cho bảo vệ khí tốt & mối phẳng hơn.",en:"Dragging focuses the arc into the pool — deeper penetration; pushing gives flatter beads and better gas cover."}},
 ]},

/* 17 ===================================================== */
{vi:"Cắt nhiệt & Dũi hồ quang", en:"Thermal Cutting & Gouging",
 intro:{vi:"Cắt oxy-khí cháy, plasma, laser và dũi than hồ quang — nguyên lý, ứng dụng & ảnh hưởng đến mép cắt.",en:"Oxy-fuel, plasma, laser cutting and arc-air gouging — principles, uses and edge effects."},
 lessons:[
  {t_vi:"Nguyên lý cắt oxy-khí cháy",t_en:"Oxy-fuel cutting principle",vi:"Là quá trình OXY HÓA, không phải nóng chảy: ngọn lửa nung thép tới nhiệt độ bắt cháy ~850°C (đỏ anh đào), rồi tia oxy áp cao ĐỐT CHÁY sắt thành oxide lỏng và thổi bay khỏi rãnh cắt.",en:"An OXIDATION process, not melting: the flame preheats steel to ~850°C ignition temperature (cherry red), then a high-pressure oxygen jet BURNS the iron to liquid oxide and blows it from the kerf."},
  {t_vi:"Điều kiện vật liệu cắt được",t_en:"Conditions for oxy-fuel cutting",vi:"Oxide phải nóng chảy THẤP HƠN kim loại nền — đúng với thép C-Mn. Inox (Cr2O3) & nhôm (Al2O3) có oxide chịu lửa cao hơn nền → KHÔNG cắt oxy được, phải dùng plasma. Gang khó cắt (graphit cản cháy).",en:"The oxide must melt BELOW the parent metal — true for C-Mn steel. Stainless (Cr2O3) and aluminium (Al2O3) have refractory oxides — oxy-fuel CANNOT cut them; use plasma. Cast iron cuts poorly (graphite interferes)."},
  {t_vi:"Khí cháy: axetylen & thay thế",t_en:"Fuel gases",vi:"Axetylen + oxy cho ngọn lửa nóng nhất (~3150°C), mồi nhanh, cắt mỏng chính xác. Propan rẻ, nhiệt thấp hơn, ngọn lửa nung chậm hơn nhưng cắt tấm dày kinh tế. Propylen/MAPP trung gian.",en:"Acetylene + oxygen gives the hottest flame (~3150°C), fast starts, precise thin cuts. Propane is cheaper with a cooler flame — slower preheat but economical on thick plate. Propylene/MAPP in between."},
  {t_vi:"Ba kiểu ngọn lửa",t_en:"Flame settings",vi:"Trung hòa (neutral – tỷ lệ O2:C2H2 ≈ 1:1): dùng cho cắt & hàn khí thông thường. Oxy hóa (thừa O2 – nhọn, rít): nóng hơn, dùng cho đồng thau. Carbur hóa (thừa axetylen – có lông trắng): thấm carbon, dùng hardfacing/hàn nhôm.",en:"Neutral (O2:C2H2 ≈ 1:1): normal cutting and welding. Oxidising (excess O2 — short hissing cone): hotter, for brass. Carburising (excess acetylene — feathery plume): adds carbon, for hardfacing/aluminium."},
  {t_vi:"Chất lượng mép cắt oxy",t_en:"Cut edge quality",vi:"Mép cắt tốt: vạch kéo (drag lines) gần thẳng đứng & đều, mép trên sắc, ít xỉ bám đáy. Lỗi: tốc độ quá nhanh → drag lines cong mạnh, không đứt chân; nung quá → mép trên tròn chảy; oxy bẩn/thấp áp → xỉ bám nhiều.",en:"Good edge: near-vertical, even drag lines, sharp top edge, little bottom dross. Faults: too fast — heavily swept drag lines, loss of cut; overheating — melted rounded top edge; poor oxygen purity/pressure — heavy adherent dross."},
  {t_vi:"Ảnh hưởng luyện kim của cắt nhiệt",t_en:"Metallurgical effects of cutting",vi:"Mép cắt có HAZ mỏng + lớp cứng (nguội nhanh, thấm nhẹ carbon) → với thép CE cao hoặc trước khi hàn chất lượng cao: MÀI bỏ lớp bề mặt, kiểm tra nứt mép (MT), đôi khi cần tiền nhiệt khi cắt như khi hàn.",en:"Cut edges carry a thin HAZ and hardened skin (fast cooling, slight carbon pickup). For high-CE steels or quality welds: GRIND the surface layer, check edges for cracks (MT), sometimes preheat for cutting as for welding."},
  {t_vi:"Cắt plasma",t_en:"Plasma cutting",vi:"Hồ quang thắt trong vòi phun + khí tốc độ cao tạo plasma ~20.000°C NÓNG CHẢY và thổi kim loại — cắt được MỌI kim loại dẫn điện (inox, nhôm). Nhanh, HAZ hẹp, nhưng mép hơi côn & ồn, nhiều khói.",en:"A constricted arc with high-velocity gas forms ~20,000°C plasma that MELTS and ejects metal — cuts ANY conductive metal (stainless, aluminium). Fast, narrow HAZ, but slightly tapered kerf, noisy and fumy."},
  {t_vi:"Dũi than hồ quang (arc-air)",t_en:"Air-carbon arc gouging",vi:"Điện cực than bọc đồng (DCEP) nóng chảy kim loại, khí nén thổi bay → tạo rãnh chữ U: moi khuyết tật, moi đáy mối hàn (back-gouging), cắt thô. Nhanh & rẻ nhưng ồn, bắn tóe, và để lại lớp THẤM CARBON cứng.",en:"Copper-coated carbon electrode (DCEP) melts the metal; compressed air blasts it away — U-grooves for defect removal, back-gouging and rough cutting. Fast and cheap but noisy, spattery, and leaves a hard CARBON-ENRICHED skin."},
  {t_vi:"Sau dũi than: bắt buộc làm gì",t_en:"After arc-air gouging",vi:"MÀI sạch toàn bộ bề mặt rãnh để loại lớp thấm carbon & vết than sót (gây nứt/cứng khi hàn đè lên), rồi kiểm tra MT/PT xác nhận hết khuyết tật trước khi hàn. Với thép nhạy: tiền nhiệt khi dũi.",en:"GRIND the groove to remove the carburised skin and any carbon deposits (cracking/hardness risk if welded over), then MT/PT to prove the defect is out before rewelding. Preheat sensitive steels for gouging."},
  {t_vi:"Dũi bằng que & plasma",t_en:"Other gouging methods",vi:"Que dũi chuyên dụng (MMA gouging electrode): tiện, không cần khí nén, cho không gian hẹp. Plasma gouging: sạch hơn than, ít thấm carbon — tốt cho inox. Oxy-gouging cho thép carbon tấm dày.",en:"MMA gouging electrodes: handy, no air supply, confined spaces. Plasma gouging: cleaner, no carbon pickup — good for stainless. Oxygen gouging for thick carbon steel."},
  {t_vi:"An toàn cắt & dũi",t_en:"Cutting & gouging safety",vi:"Như hàn cộng thêm: tiếng ồn rất lớn (dũi than >100 dB), tia lửa bắn xa hàng mét (giấy phép làm việc nóng, che chắn), xỉ nóng rơi xuống dưới, áp khí nén, và chai khí (flashback arrestor, oxy tránh dầu mỡ).",en:"As for welding plus: extreme noise (gouging >100 dB), sparks travelling metres (hot-work permit, screens), falling hot dross, compressed-air hazards, and cylinder care (flashback arrestors; oxygen away from oil)."},
 ],
 key:[
  {vi:"Cắt oxy = quá trình OXY HÓA (chỉ thép C-Mn); plasma = NÓNG CHẢY (mọi kim loại dẫn điện). Sau dũi than PHẢI mài sạch lớp thấm carbon.",en:"Oxy-fuel = OXIDATION (C-Mn steel only); plasma = MELTING (any conductive metal). Always grind off the carburised skin after arc-air gouging."},
 ],
 quiz:[
  {vi:"Vì sao không cắt được inox & nhôm bằng oxy-khí cháy?",en:"Why can stainless and aluminium not be oxy-fuel cut?",
   opts:[{vi:"Chúng quá mỏng",en:"Too thin"},{vi:"Oxide của chúng chịu lửa, nóng chảy cao hơn kim loại nền",en:"Their refractory oxides melt above the parent metal"},{vi:"Chúng không dẫn nhiệt",en:"No heat conduction"},{vi:"Giá quá đắt",en:"Too expensive"}],ans:1,
   exp:{vi:"Cr2O3/Al2O3 nóng chảy cao hơn nền → oxide rắn chặn quá trình cháy; phải dùng plasma.",en:"Cr2O3/Al2O3 melt above the base metal, blocking oxidation — use plasma instead."}},
  {vi:"Cắt oxy-khí cháy thực chất là quá trình gì?",en:"Oxy-fuel cutting is essentially what process?",
   opts:[{vi:"Nóng chảy kim loại",en:"Melting"},{vi:"Oxy hóa (đốt cháy) sắt",en:"Oxidation (burning) of iron"},{vi:"Bay hơi",en:"Vaporisation"},{vi:"Mài cơ học",en:"Mechanical abrasion"}],ans:1,
   exp:{vi:"Nung tới ~850°C rồi tia oxy đốt cháy sắt thành oxide và thổi bay — không phải nóng chảy.",en:"Preheat to ~850°C, then the oxygen jet burns iron to oxide — not melting."}},
  {vi:"Sau khi dũi than hồ quang, trước khi hàn lại phải làm gì?",en:"After arc-air gouging, before rewelding you must?",
   opts:[{vi:"Hàn ngay khi còn nóng",en:"Weld while hot"},{vi:"Mài bỏ lớp thấm carbon rồi kiểm tra MT/PT",en:"Grind off the carburised layer then MT/PT"},{vi:"Sơn lót",en:"Apply primer"},{vi:"Không cần gì",en:"Nothing"}],ans:1,
   exp:{vi:"Lớp thấm carbon cứng & vết than sót gây nứt nếu hàn đè — mài sạch và xác nhận bằng MT/PT.",en:"The hard carburised skin and stray carbon cause cracking if welded over — grind and verify."}},
  {vi:"Ngọn lửa carbur hóa (thừa axetylen) nhận biết thế nào?",en:"How is a carburising flame recognised?",
   opts:[{vi:"Nhân nhọn, tiếng rít",en:"Short hissing cone"},{vi:"Có chùm lông trắng quanh nhân",en:"A feathery white plume around the cone"},{vi:"Không có nhân",en:"No cone"},{vi:"Màu xanh hoàn toàn",en:"Entirely blue"}],ans:1,
   exp:{vi:"Thừa axetylen tạo 'lông' trắng; ngọn oxy hóa nhân ngắn nhọn & rít; trung hòa nhân rõ không lông.",en:"Excess acetylene shows a feather; oxidising is short and hissing; neutral has a clean cone."}},
 ]},

/* 18 ===================================================== */
{vi:"Phá hủy khi vận hành & Hàn sửa chữa", en:"In-Service Failure & Repair Welding",
 intro:{vi:"Nhận dạng gãy mỏi, gãy giòn, gãy dẻo và quy trình hàn sửa chữa đúng cách.",en:"Recognising fatigue, brittle and ductile fractures, and running a proper weld repair."},
 lessons:[
  {t_vi:"Gãy mỏi: cơ chế",t_en:"Fatigue failure mechanism",vi:"Tải LẶP (dù dưới giới hạn chảy) làm nứt khởi phát tại điểm TẬP TRUNG ỨNG SUẤT — chân mối hàn, undercut, lỗ, vết mồi hồ quang — rồi lan từ từ qua tiết diện đến khi phần còn lại gãy đột ngột.",en:"CYCLIC loads (even below yield) start cracks at STRESS CONCENTRATIONS — weld toes, undercut, holes, arc strikes — which grow slowly across the section until final sudden fracture."},
  {t_vi:"Nhận dạng mặt gãy mỏi",t_en:"Fatigue fracture appearance",vi:"Mặt gãy NHẴN, phẳng, vuông góc ứng suất, có vân sò/vân bãi biển (beach marks) đồng tâm từ điểm khởi phát + vùng gãy nhanh nhám cuối cùng. Vân sò = dấu vết các đợt dừng/chạy của vết nứt.",en:"SMOOTH flat surface at right angles to the stress, with concentric beach marks radiating from the origin plus a final rough fast-fracture zone. Beach marks record crack arrest/restart cycles."},
  {t_vi:"Chống mỏi cho mối hàn",t_en:"Improving fatigue life",vi:"Hình dạng quyết định: chân mối hàn chuyển tiếp mượt (mài chân, hàn TIG dressing), không undercut/lồi quá, mài phẳng cap khi cần, full-pen thay partial-pen, tránh đặt mối hàn vào vùng ứng suất cao của thiết kế.",en:"Geometry rules: smooth blended toes (toe grinding, TIG dressing), no undercut or excess convexity, cap ground flush where required, full instead of partial penetration, keep welds out of design hot-spots."},
  {t_vi:"Gãy giòn: điều kiện",t_en:"Brittle fracture conditions",vi:"Xảy ra ĐỘT NGỘT, không biến dạng trước, lan cực nhanh. Bộ ba điều kiện: nhiệt độ THẤP (dưới chuyển tiếp), khuyết tật/vết khía sắc, ứng suất kéo (kể cả ứng suất dư). Thép dày & hạt thô càng nhạy.",en:"SUDDEN, no prior deformation, near-instant propagation. The trio: LOW temperature (below transition), a sharp notch/defect, and tensile stress (including residual). Thick, coarse-grained steel is most at risk."},
  {t_vi:"Nhận dạng mặt gãy giòn & dẻo",t_en:"Brittle vs ductile appearance",vi:"Giòn: mặt phẳng SÁNG lấp lánh (tinh thể), có vân chữ V (chevron) CHỈ NGƯỢC về điểm khởi phát, mép không co thắt. Dẻo: xám xơ, mờ, biến dạng & thắt tiết diện rõ, mép cắt nghiêng 45°.",en:"Brittle: flat BRIGHT crystalline surface, chevron marks POINTING BACK to the origin, no contraction. Ductile: dull grey fibrous surface, obvious deformation and necking, 45° shear lips."},
  {t_vi:"Phòng gãy giòn",t_en:"Preventing brittle fracture",vi:"Chọn thép đủ độ dai ở nhiệt độ thiết kế (Charpy), hạn chế khuyết tật phẳng (NDT nghiêm), PWHT giảm ứng suất dư, tránh vết khía thiết kế, kiểm soát hạt thô HAZ (nhiệt đầu vào), thử áp lực ở nhiệt độ đủ ấm.",en:"Steel tough enough at design temperature (Charpy), strict NDT for planar defects, PWHT to cut residual stress, avoid design notches, control HAZ grain growth (heat input), pressure-test warm enough."},
  {t_vi:"Ăn mòn liên quan mối hàn",t_en:"Weld-related corrosion",vi:"Mối hàn là pin điện hóa nhỏ (thành phần khác nền). Các dạng: ăn mòn giữa hạt (weld decay inox), ăn mòn khe (dưới xỉ/lệch mép), nứt ăn mòn ứng suất SCC (ứng suất dư + môi trường, vd clorua với inox; H2S với thép — giới hạn 248HV).",en:"A weld is a small galvanic cell (composition differs from parent). Forms: intergranular (stainless weld decay), crevice (under slag/misalignment), stress-corrosion cracking SCC (residual stress + environment — chlorides on stainless; H2S sour service, hence 248HV limits)."},
  {t_vi:"Quy trình sửa chữa: các bước",t_en:"Repair sequence",vi:"(1) NCR & xác định nguyên nhân; (2) quy trình sửa được DUYỆT; (3) định vị & moi khuyết tật (dũi/mài); (4) MT/PT xác nhận sạch; (5) hàn lại theo WPS SỬA CHỮA bởi thợ đạt chuẩn; (6) NDT lại 100% + các kiểm tra ban đầu; (7) cập nhật hồ sơ (R1...).",en:"(1) NCR and root cause; (2) APPROVED repair procedure; (3) locate and excavate (gouge/grind); (4) MT/PT to prove clean; (5) reweld to a REPAIR WPS by qualified welders; (6) 100% re-NDT plus original tests; (7) update records (R1...)."},
  {t_vi:"Vì sao hàn sửa khó hơn hàn mới",t_en:"Why repairs are harder",vi:"Rãnh moi hẹp & sâu (khó thao tác, dễ thiếu ngấu), độ KẸP CHẶT rất cao (chi tiết xung quanh đã cứng vững → nguy cơ nứt), vật liệu có thể đã nhiễm bẩn/thấm hydro khi vận hành, thường phải tiền nhiệt cao hơn & PWHT lại.",en:"Excavations are narrow and deep (poor access, fusion risk), restraint is VERY high (surrounding structure is rigid — cracking risk), in-service material may be contaminated or hydrogen-charged, and higher preheat plus repeat PWHT are often needed."},
  {t_vi:"Sửa chữa trên thiết bị đang vận hành",t_en:"In-service / on-stream repairs",vi:"Hàn lên thiết bị chứa môi chất (hot tapping, vá ống sống) là việc RỦI RO CAO: cần phân tích riêng (cháy thủng do thành mỏng, nứt hydro do môi chất làm nguội nhanh, cháy nổ). Chỉ làm theo quy trình chuyên biệt & phê duyệt đặc biệt.",en:"Welding on live equipment (hot tapping, in-service patches) is HIGH RISK: burn-through on thinned walls, hydrogen cracking from rapid product-cooling, fire/explosion. Only under specialist procedures and approvals."},
  {t_vi:"Giới hạn số lần sửa",t_en:"Repair attempt limits",vi:"Nhiều code/spec giới hạn sửa cùng một vị trí (thường tối đa 2 lần) vì chu trình nhiệt lặp làm thô hạt, tăng cứng & tăng biến dạng. Quá giới hạn → cắt bỏ đoạn, thay mới.",en:"Many codes/specs limit repairs at the same spot (commonly two attempts) — repeated thermal cycles coarsen grain, harden and distort. Beyond the limit: cut out and replace."},
 ],
 key:[
  {vi:"Đọc mặt gãy: vân sò = MỎI; chevron sáng = GIÒN (chữ V chỉ về điểm khởi phát); xơ xám + thắt = DẺO. Câu nhận dạng mặt gãy gần như chắc chắn có trong đề.",en:"Read the surface: beach marks = FATIGUE; bright chevrons = BRITTLE (V points to origin); dull fibrous + necking = DUCTILE. Fracture-face ID is near-guaranteed in the exam."},
  {vi:"Sửa chữa = hàn trong điều kiện KHÓ hơn: kẹp chặt cao, rãnh hẹp, vật liệu cũ — nên kiểm soát (tiền nhiệt, hydro, NDT) phải NGHIÊM hơn hàn mới.",en:"Repairs are welding under WORSE conditions — high restraint, narrow grooves, aged material — so controls must be TIGHTER than new work."},
 ],
 quiz:[
  {vi:"Mặt gãy có vân sò (beach marks) đồng tâm cho biết dạng phá hủy nào?",en:"Concentric beach marks on a fracture face indicate?",
   opts:[{vi:"Gãy giòn",en:"Brittle fracture"},{vi:"Gãy mỏi",en:"Fatigue"},{vi:"Gãy dẻo",en:"Ductile failure"},{vi:"Ăn mòn",en:"Corrosion"}],ans:1,
   exp:{vi:"Vân sò ghi lại các đợt lan/dừng của vết nứt mỏi, tỏa từ điểm khởi phát.",en:"Beach marks record crack growth cycles radiating from the fatigue origin."}},
  {vi:"Vân chữ V (chevron) trên mặt gãy giòn chỉ về đâu?",en:"Chevron marks on a brittle fracture point toward?",
   opts:[{vi:"Hướng nứt lan tới",en:"Where the crack is going"},{vi:"Điểm khởi phát vết nứt",en:"The fracture origin"},{vi:"Vị trí tải lớn nhất",en:"The maximum load point"},{vi:"Không có ý nghĩa",en:"Nothing"}],ans:1,
   exp:{vi:"Chevron luôn chỉ NGƯỢC về điểm khởi phát — dùng để truy nguồn gốc phá hủy.",en:"Chevrons point BACK to the origin — used to trace the initiation site."}},
  {vi:"Nứt mỏi của kết cấu hàn thường khởi phát ở đâu?",en:"Where do fatigue cracks in welded structures usually start?",
   opts:[{vi:"Giữa vật liệu cơ bản",en:"Mid parent metal"},{vi:"Tại điểm tập trung ứng suất như chân mối hàn, undercut",en:"At stress raisers like weld toes and undercut"},{vi:"Trong que hàn",en:"In the electrode"},{vi:"Tại tem tên máy",en:"At the nameplate"}],ans:1,
   exp:{vi:"Chân mối hàn & khuyết tật bề mặt là nơi tập trung ứng suất — cải thiện bằng mài chân/TIG dressing.",en:"Toes and surface flaws concentrate stress — improved by toe grinding/TIG dressing."}},
  {vi:"Vì sao mối hàn sửa chữa dễ nứt hơn mối hàn mới?",en:"Why is a repair weld more crack-prone than new work?",
   opts:[{vi:"Que sửa chữa kém hơn",en:"Repair rods are worse"},{vi:"Độ kẹp chặt cao, rãnh hẹp khó hàn, vật liệu có thể đã suy biến",en:"High restraint, narrow access, possibly degraded material"},{vi:"Thợ sửa kém hơn",en:"Repair welders are worse"},{vi:"Không đúng, dễ hơn",en:"It is actually easier"}],ans:1,
   exp:{vi:"Kết cấu xung quanh cứng vững → ứng suất co ngót rất cao; rãnh moi sâu hẹp dễ thiếu ngấu.",en:"Rigid surroundings give high shrinkage stress; deep narrow grooves invite fusion defects."}},
  {vi:"Bộ ba điều kiện của gãy giòn là gì?",en:"The brittle-fracture trio is?",
   opts:[{vi:"Nhiệt cao + rung + ồn",en:"Heat + vibration + noise"},{vi:"Nhiệt độ thấp + vết khía sắc + ứng suất kéo",en:"Low temperature + sharp notch + tensile stress"},{vi:"Hydro + xỉ + rỗ",en:"Hydrogen + slag + porosity"},{vi:"Dòng cao + áp cao + tốc độ cao",en:"High amps + volts + speed"}],ans:1,
   exp:{vi:"Dưới nhiệt độ chuyển tiếp + khuyết tật sắc + ứng suất kéo (kể cả dư) → gãy giòn lan tức thời.",en:"Below transition temperature + sharp defect + tensile (incl. residual) stress → instant brittle fracture."}},
 ]},

]};

/* ============================================================
   LO TRINH HOC  (PLAN)
   ============================================================ */
DATA.planHTML = `
<div class="card">
  <h2>🗓️ Lộ trình ôn thi CSWIP 3.1 — đến tháng 12/2026</h2>
  <p class="muted">Còn ~6 tháng. Học đều mỗi ngày 60–90 phút hơn là dồn cuối kỳ. Mỗi tuần: học 1–2 chương + làm quiz + 30 phút với AI gia sư.</p>
  <div class="warn">⚠️ Lưu ý: CSWIP 3.1 yêu cầu <b>kinh nghiệm thanh tra hàn tối thiểu</b> và phải <b>đăng ký qua trung tâm được TWI phê duyệt</b>. App giúp ôn lý thuyết; phần thực hành (plate/pipe/macro) cần luyện trên mẫu thật tại khóa học.</div>
</div>
<div class="card">
  <h3>Giai đoạn 1 — Nền tảng (Tháng 6–7)</h3>
  <div class="timeline">
    <div class="tl"><b>Tuần 1–2:</b> Ch.16 Thuật ngữ & định nghĩa + Ch.1 Vai trò thanh tra. Học thuộc thuật ngữ Anh–Việt qua flashcard.</div>
    <div class="tl"><b>Tuần 3–4:</b> Ch.2 Quá trình hàn + Ch.3 Vật liệu hàn.</div>
    <div class="tl"><b>Tuần 5–6:</b> Ch.4 Ký hiệu mối hàn + Ch.5 Khuyết tật (TRỌNG TÂM — học kỹ nguyên nhân & cách phòng).</div>
  </div>
</div>
<div class="card">
  <h3>Giai đoạn 2 — Kiểm tra & Quy trình (Tháng 8–9)</h3>
  <div class="timeline">
    <div class="tl"><b>Tuần 7–8:</b> Ch.6 Thử phá hủy + Ch.7 NDT (VT/PT/MT/RT/UT). Nhớ rõ phương pháp nào cho khuyết tật nào.</div>
    <div class="tl"><b>Tuần 9–10:</b> Ch.8 WPS/PQR/WPQ — phân biệt rõ 3 tài liệu & biến số thiết yếu.</div>
    <div class="tl"><b>Tuần 11–12:</b> Ch.9 Luyện kim + Ch.10 Xử lý nhiệt. Nắm chắc 4 yếu tố nứt nguội.</div>
  </div>
</div>
<div class="card">
  <h3>Giai đoạn 3 — Hoàn thiện (Tháng 10–11)</h3>
  <div class="timeline">
    <div class="tl"><b>Tuần 13–14:</b> Ch.11 Biến dạng/Nhiệt đầu vào + Ch.12 Thiết kế mối nối + Ch.13 Tiêu chuẩn.</div>
    <div class="tl"><b>Tuần 15–16:</b> Ch.14 Thiết bị/hiệu chuẩn + Ch.15 An toàn + Ch.17 Cắt nhiệt & dũi + Ch.18 Phá hủy & sửa chữa. Bắt đầu thi thử tổng hợp.</div>
    <div class="tl"><b>Tuần 17–20:</b> THI THỬ mỗi ngày (Quiz → Thi thử tổng hợp). Mục tiêu ổn định ≥80%. Dùng AI giám khảo ra đề mới.</div>
  </div>
</div>
<div class="card">
  <h3>Tuần cuối trước thi (Tháng 12)</h3>
  <div class="timeline">
    <div class="tl"><b>Ôn lỗ hổng:</b> Chỉ làm lại các câu/chương từng sai.</div>
    <div class="tl"><b>Thực hành:</b> Luyện đo mẫu thật, đọc macro, nhận diện khuyết tật trên ảnh.</div>
    <div class="tl"><b>Trước ngày thi:</b> Ngủ đủ, mang đủ dụng cụ (kính, dưỡng đo, máy tính), đọc kỹ đề, quản lý thời gian.</div>
  </div>
</div>
<div class="card">
  <h3>📌 Mẹo phòng thi</h3>
  <ul class="lesson">
    <li>Đọc câu hỏi 2 lần, để ý chữ "KHÔNG / NGOẠI TRỪ / LUÔN LUÔN".</li>
    <li>Loại trừ đáp án sai trước, không bỏ trống câu nào (không bị trừ điểm câu sai).</li>
    <li>Quản lý thời gian: ~1 phút/câu, đánh dấu câu khó quay lại sau.</li>
    <li>Phần thực hành: đo cẩn thận, ghi đúng đơn vị, đối chiếu tiêu chuẩn áp dụng.</li>
  </ul>
</div>`;

/* ============================================================
   AI GIA SU + GIAM KHAO  (TUTOR)
   ============================================================ */
DATA.tutorHTML = `
<div class="card">
  <h2>🤖 AI Gia sư & Giám khảo CSWIP 3.1</h2>
  <p class="muted">Copy prompt dưới đây, dán vào <b>Claude</b> hoặc <b>ChatGPT</b>. Nó vừa dạy bạn, vừa dịch chuẩn thuật ngữ Anh–Việt, vừa ra đề & chấm thi thử.</p>
</div>
<div class="card">
  <h3>① Prompt GIA SƯ (dạy + dịch chuẩn)</h3>
  <button class="btn" onclick="copyPrompt('p1')">📋 Copy prompt</button>
  <pre id="p1" style="white-space:pre-wrap;background:#0a121b;border:1px solid var(--line);border-radius:10px;padding:14px;margin-top:10px;font-size:13px;line-height:1.5">Bạn là gia sư chuyên luyện thi chứng chỉ CSWIP 3.1 Welding Inspector (TWI), bám theo giáo trình WIS5. Học viên người Việt, đang ôn để thi vào tháng 12.

NHIỆM VỤ:
- Dạy tôi từng chủ đề: thuật ngữ & định nghĩa, vai trò thanh tra, quá trình hàn (MMA/MIG/MAG/TIG/SAW), vật liệu hàn, ký hiệu mối hàn, khuyết tật & nguyên nhân, DT, NDT (VT/PT/MT/RT/UT), WPS/PQR/WPQ, luyện kim & HAZ, xử lý nhiệt, biến dạng & nhiệt đầu vào, thiết kế mối nối, tiêu chuẩn (ISO 5817, ISO 6520, ISO 15614, ISO 9606, ASME IX), hiệu chuẩn, an toàn.
- Giải thích bằng tiếng Việt dễ hiểu NHƯNG luôn kèm thuật ngữ tiếng Anh chuẩn trong ngoặc, vì đề thi bằng tiếng Anh.
- Khi tôi đưa một đoạn tiếng Anh, dịch sang tiếng Việt CHÍNH XÁC theo nghĩa kỹ thuật hàn và giải thích thuật ngữ.

QUY TẮC:
1. Mỗi buổi tập trung 1 chủ đề: tóm tắt ngắn rồi 3–5 điểm cốt lõi hay ra thi.
2. Luôn song ngữ: [Tiếng Việt] (English term).
3. Sau mỗi chủ đề, hỏi tôi 3 câu kiểm tra, chờ tôi trả lời rồi mới chữa.
4. Nếu tôi sai, giải thích lại nhẹ nhàng kèm ví dụ thực tế công trường.
5. Dùng ví dụ, hình dung, so sánh để tôi dễ nhớ.

Bắt đầu bằng cách hỏi tôi muốn học chủ đề nào trước, hoặc đề xuất lộ trình.</pre>
</div>
<div class="card">
  <h3>② Prompt GIÁM KHẢO (ra đề + chấm thi thử)</h3>
  <button class="btn" onclick="copyPrompt('p2')">📋 Copy prompt</button>
  <pre id="p2" style="white-space:pre-wrap;background:#0a121b;border:1px solid var(--line);border-radius:10px;padding:14px;margin-top:10px;font-size:13px;line-height:1.5">Bạn là giám khảo mô phỏng kỳ thi CSWIP 3.1 Welding Inspector (TWI). Ra đề thi thử trắc nghiệm GIỐNG ĐỀ THẬT và chấm điểm cho tôi.

YÊU CẦU RA ĐỀ:
- Mỗi lượt 20 câu trắc nghiệm 4 đáp án (A/B/C/D), độ khó tương đương đề CSWIP 3.1 thật.
- Phủ đều: quá trình hàn, khuyết tật, NDT, DT, WPS/PQR, luyện kim/HAZ, xử lý nhiệt, ký hiệu hàn, tiêu chuẩn, an toàn, hiệu chuẩn.
- Mỗi câu SONG NGỮ: câu hỏi và đáp án tiếng Anh, kèm bản dịch tiếng Việt ngay dưới.
- KHÔNG hiện đáp án cho đến khi tôi trả lời xong cả 20 câu.

CÁCH CHẤM:
- Sau khi tôi gửi đáp án (vd: 1B 2C 3A...), chấm theo thang %, mốc đậu 70%.
- Liệt kê câu sai, giải thích đáp án đúng bằng song ngữ, chỉ ra tôi yếu chủ đề nào.
- Đề xuất nên ôn lại chương nào và cho thi lại bộ mới khi tôi sẵn sàng.

Bắt đầu bằng việc hỏi tôi muốn thi TỔNG HỢP hay theo CHỦ ĐỀ, rồi ra đề ngay.</pre>
</div>
<div class="card">
  <h3>③ Prompt DỊCH THUẬT (tài liệu Anh → Việt chuẩn)</h3>
  <button class="btn" onclick="copyPrompt('p3')">📋 Copy prompt</button>
  <pre id="p3" style="white-space:pre-wrap;background:#0a121b;border:1px solid var(--line);border-radius:10px;padding:14px;margin-top:10px;font-size:13px;line-height:1.5">Bạn là chuyên gia dịch thuật kỹ thuật hàn (welding) Anh–Việt, hỗ trợ học viên ôn CSWIP 3.1.

Khi tôi dán một đoạn tiếng Anh (tài liệu, slide, câu hỏi thi):
1. Dịch sang tiếng Việt CHÍNH XÁC theo nghĩa kỹ thuật, giữ nguyên thuật ngữ chuẩn ngành (không dịch word-by-word).
2. Trình bày 2 dòng: [câu tiếng Anh] → [câu tiếng Việt].
3. Liệt kê thuật ngữ chuyên ngành kèm giải thích ngắn (vd: Lack of fusion = không ngấu; HAZ = vùng ảnh hưởng nhiệt).
4. Giải nghĩa đầy đủ mọi viết tắt (WPS, PQR, NDT, PWHT, HAZ, RT, UT, MT, PT...).
5. Giữ nguyên con số, đơn vị, mã tiêu chuẩn.

Sẵn sàng nhận đoạn tiếng Anh đầu tiên của tôi.</pre>
</div>
<div class="card">
  <h3>💡 Dùng kết hợp</h3>
  <ul class="lesson">
    <li>Học chương trong app → mở AI Gia sư (prompt ①) hỏi sâu phần chưa rõ.</li>
    <li>Cuối tuần → AI Giám khảo (prompt ②) thi thử 20 câu, xem mình yếu đâu.</li>
    <li>Gặp tài liệu tiếng Anh khó → AI Dịch thuật (prompt ③) dịch chuẩn.</li>
  </ul>
</div>`;
