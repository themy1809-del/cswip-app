/* ============================================================
   NGÂN HÀNG CÂU HỎI BỔ SUNG — soạn theo đề thi thật CSWIP 3.1
   (practice paper 296 câu + MCP 340 câu) & giáo trình WIS5.
   Tiếng Anh là chính (sát đề thật), kèm tiếng Việt.
   Định dạng: q/o/a/e = English ; qv/ov/ev = Tiếng Việt
   ============================================================ */
const BANK = [

/* --- Consumables / Hydrogen --- */
{c:"Consumables",q:"When 'H2 control' (hydrogen control) is specified for MMA welding, the electrode should be:",o:["Cellulosic","Iron oxide","Acid","Basic"],a:3,e:"Basic (low-hydrogen) electrodes give the lowest weld-metal hydrogen.",
 qv:"Khi yêu cầu 'kiểm soát H2' cho hàn MMA, loại que nên dùng là:",ov:["Cellulose","Oxit sắt","Axit","Basic (hydro thấp)"],ev:"Que basic cho hàm lượng hydro thấp nhất."},
{c:"Consumables",q:"You would recognise a hydrogen-controlled covered electrode with certainty from its:",o:["Colour","Length","Trade name","AWS / BS EN code letter"],a:3,e:"The classification code letter (e.g. B = basic) identifies it for certain.",
 qv:"Nhận biết chắc chắn que hàn kiểm soát hydro qua:",ov:["Màu sắc","Chiều dài","Tên thương mại","Mã phân loại AWS/BS EN"],ev:"Mã phân loại (vd chữ B = basic) mới xác định chắc chắn."},
{c:"Consumables",q:"Serious porosity appears in MMA welds on an open site. What would you investigate first?",o:["Electrode type","Power plant type","Electrode storage","Day temperature"],a:2,e:"Damp electrodes (poor storage) are the usual cause of porosity on site.",
 qv:"Mối hàn MMA ngoài công trường bị rỗ khí nặng, bạn kiểm tra trước tiên:",ov:["Loại que","Loại máy hàn","Cách bảo quản que","Nhiệt độ ngày"],ev:"Que bị ẩm (bảo quản kém) là nguyên nhân rỗ khí phổ biến tại hiện trường."},
{c:"Consumables",q:"An electrode classified E6013 (AWS A5.1) is a:",o:["Basic type","Cellulosic type","Rutile type","Iron-powder thick-coated"],a:2,e:"The '3' in E6013 indicates a rutile coating.",
 qv:"Que phân loại E6013 (AWS A5.1) là loại:",ov:["Basic","Cellulose","Rutile","Bột sắt vỏ dày"],ev:"Số '3' cuối E6013 cho biết vỏ bọc rutile."},
{c:"Consumables",q:"For a cross-country pipeline (10mm wall) needing high speed and deep penetration, which electrode?",o:["Basic covered","Cellulosic covered","Rutile covered","Iron-powder loaded"],a:1,e:"Cellulosic electrodes give deep penetration & high speed (typical for pipelines), accepting higher hydrogen.",
 qv:"Đường ống dài (thành 10mm) cần tốc độ cao & ngấu sâu, dùng que:",ov:["Basic","Cellulose","Rutile","Bột sắt"],ev:"Que cellulose cho ngấu sâu & tốc độ cao (hay dùng cho pipeline)."},

/* --- Materials / Metallurgy --- */
{c:"Materials",q:"Steel is changed from 0.15%C/0.6%Mn to 0.20%C/1.2%Mn. This most likely influences:",o:["Porosity","Cracking in the weld area","Undercut on fillets","Lack of root fusion"],a:1,e:"Higher carbon & manganese raise the carbon equivalent → greater cracking risk.",
 qv:"Thép đổi từ 0.15%C/0.6%Mn sang 0.20%C/1.2%Mn. Ảnh hưởng nhiều nhất tới:",ov:["Rỗ khí","Nứt vùng mối hàn","Cháy chân mối hàn góc","Không thấu chân"],ev:"C và Mn cao hơn → đương lượng carbon tăng → nguy cơ nứt cao hơn."},
{c:"Materials",q:"Which of these alloys is non-magnetic?",o:["4% Cr-Mo","12% Cr","Austenitic stainless steel","9% Ni steel"],a:2,e:"Austenitic stainless steel is non-magnetic — so MT cannot be used on it.",
 qv:"Hợp kim nào sau đây KHÔNG nhiễm từ?",ov:["4% Cr-Mo","12% Cr","Thép không gỉ austenit","Thép 9% Ni"],ev:"Thép austenit không nhiễm từ → không kiểm tra được bằng bột từ (MT)."},
{c:"Materials",q:"Which alloying element is added mainly to improve the toughness of steel?",o:["Chromium","Manganese","Sulphur","Carbon"],a:1,e:"Manganese improves toughness (and acts as a deoxidiser); sulphur harms it.",
 qv:"Nguyên tố hợp kim nào chủ yếu để tăng độ dai của thép?",ov:["Crom","Mangan","Lưu huỳnh","Carbon"],ev:"Mangan tăng độ dai (và khử oxy); lưu huỳnh làm giảm độ dai."},
{c:"Materials",q:"Pre-heating a carbon steel before MMA welding mainly reduces the risk of:",o:["Scattered porosity","Worm-hole porosity","Parent metal (HAZ) cracking","Lack of penetration"],a:2,e:"Preheat slows cooling, lets hydrogen escape → prevents HAZ hydrogen cracking.",
 qv:"Gia nhiệt trước cho thép carbon khi hàn MMA chủ yếu giảm nguy cơ:",ov:["Rỗ khí rải rác","Rỗ khí dạng giun","Nứt kim loại nền (HAZ)","Không thấu"],ev:"Tiền nhiệt làm chậm nguội, cho hydro thoát → chống nứt nguội HAZ."},
{c:"Materials",q:"The four factors that must all be present for hydrogen (cold) cracking are hydrogen, stress, low temperature and:",o:["High toughness","A susceptible (hard) microstructure","Low carbon","Argon shielding"],a:1,e:"Need H + tensile stress + hard/susceptible HAZ + low temperature together.",
 qv:"Bốn yếu tố cùng có để gây nứt nguội (hydro) là: hydro, ứng suất, nhiệt độ thấp và:",ov:["Độ dai cao","Tổ chức nhạy cảm (cứng)","Carbon thấp","Khí bảo vệ Argon"],ev:"Cần đồng thời: hydro + ứng suất kéo + HAZ cứng/nhạy cảm + nhiệt độ thấp."},

/* --- Processes --- */
{c:"Processes",q:"Which polarity is normally used for GTAW (TIG) welding of aluminium?",o:["AC","DC electrode negative","DC electrode positive","Polarity is irrelevant"],a:0,e:"AC is used for aluminium TIG — the positive half-cycle removes the oxide film.",
 qv:"Hàn TIG nhôm thường dùng phân cực nào?",ov:["Xoay chiều AC","DC điện cực âm","DC điện cực dương","Không quan trọng"],ev:"Nhôm hàn TIG dùng AC — nửa chu kỳ dương phá lớp oxit."},
{c:"Processes",q:"When MIG/MAG welding, wire feed speed is directly proportional to:",o:["Travel speed","Welding current","Arc length","Inductance"],a:1,e:"In MIG/MAG, increasing wire feed speed increases welding current.",
 qv:"Khi hàn MIG/MAG, tốc độ cấp dây tỉ lệ thuận với:",ov:["Tốc độ hàn","Dòng hàn","Chiều dài hồ quang","Độ tự cảm"],ev:"Tăng tốc độ cấp dây → tăng dòng hàn."},
{c:"Processes",q:"When TIG welding austenitic stainless steel pipe, argon backing (purge) gas is used to:",o:["Prevent root oxidation","Prevent under-bead cracking","Prevent porosity","Control penetration bead shape"],a:0,e:"Backing gas prevents oxidation ('sugaring') of the root on the inside.",
 qv:"Hàn TIG ống inox austenit, khí lót (purge) Argon dùng để:",ov:["Chống oxy hóa chân hàn","Chống nứt dưới mối","Chống rỗ khí","Kiểm soát hình dạng chân"],ev:"Khí lót chống oxy hóa (cháy đường) mặt trong chân mối hàn."},
{c:"Processes",q:"Which process uses the 'keyhole' technique of fusion?",o:["MMA","Plasma arc welding","Rutile FCAW","Oxy-acetylene"],a:1,e:"Plasma (and electron/laser beam) welding uses a keyhole through the joint.",
 qv:"Quá trình nào dùng kỹ thuật 'lỗ khóa' (keyhole)?",ov:["MMA","Hàn plasma","FCAW rutile","Hàn khí oxy-axetylen"],ev:"Hàn plasma (và chùm tia điện tử/laser) tạo lỗ khóa xuyên mối nối."},
{c:"Processes",q:"For submerged arc (SAW) butt welds, which would you be MOST critical of?",o:["The root gap tolerance","The colour of the flux","The reel size","The travel direction"],a:0,e:"SAW is a high-deposition blind process; tight root-gap control prevents burn-through/LoP.",
 qv:"Với mối hàn giáp mép bằng SAW, bạn khắt khe nhất với:",ov:["Dung sai khe hở chân","Màu của thuốc hàn","Kích thước cuộn","Hướng hàn"],ev:"SAW năng suất cao, hồ quang ẩn; phải kiểm soát chặt khe hở chân để tránh thủng/không thấu."},

/* --- Heat input --- */
{c:"Heat input",q:"Calculate the arc energy: 240A, 24V, travel speed 300 mm/min.",o:["≈0.6 kJ/mm","≈1.2 kJ/mm","≈2.4 kJ/mm","≈12 kJ/mm"],a:1,e:"(24×240)/(5 mm/s ×1000)=1.15≈1.2 kJ/mm. (300mm/min = 5mm/s)",
 qv:"Tính năng lượng hồ quang: 240A, 24V, tốc độ hàn 300 mm/phút.",ov:["≈0.6 kJ/mm","≈1.2 kJ/mm","≈2.4 kJ/mm","≈12 kJ/mm"],ev:"(24×240)/(5×1000)=1.15≈1.2 kJ/mm. (300mm/phút = 5mm/s)"},
{c:"Heat input",q:"The thermal efficiency factor for SAW (wire electrode) is:",o:["0.6","0.8","1.0","1.2"],a:2,e:"SAW=1.0; MMA/MIG/MAG/FCAW=0.8; TIG/Plasma=0.6.",
 qv:"Hệ số hiệu suất nhiệt của SAW (dây) là:",ov:["0.6","0.8","1.0","1.2"],ev:"SAW=1.0; MMA/MIG/MAG/FCAW=0.8; TIG/Plasma=0.6."},
{c:"Heat input",q:"Heat input is mainly influenced by:",o:["Electrode colour","Travel speed","Ambient temperature","Cable length"],a:1,e:"For given V and A, slower travel = higher heat input.",
 qv:"Nhiệt đầu vào chịu ảnh hưởng chủ yếu bởi:",ov:["Màu que","Tốc độ hàn","Nhiệt độ môi trường","Chiều dài cáp"],ev:"Với V, A cho trước, đi càng chậm → nhiệt đầu vào càng cao."},

/* --- Defects --- */
{c:"Defects",q:"Undercut at the weld toe is normally caused by:",o:["Current too low","Excessive current / travel speed / wrong angle","Damp electrode","Tight root gap"],a:1,e:"Too much heat at the toe (high current/fast travel/wrong angle) melts away the parent edge.",
 qv:"Cháy chân (undercut) ở mép mối hàn thường do:",ov:["Dòng quá thấp","Dòng cao / tốc độ nhanh / góc sai","Que ẩm","Khe hở chân hẹp"],ev:"Nhiệt quá lớn ở mép (dòng cao, đi nhanh, góc sai) làm chảy mất mép nền."},
{c:"Defects",q:"A crack in a completed weld:",o:["Is always acceptable up to 2mm","Must always be fully cut out and re-welded","May be repaired or cut out depending on specification","Can be left if internal"],a:2,e:"Action depends on the applicable specification/acceptance standard.",
 qv:"Vết nứt trên mối hàn hoàn thiện:",ov:["Luôn chấp nhận tới 2mm","Luôn phải cắt bỏ và hàn lại","Sửa hoặc cắt bỏ tùy theo đặc tả","Bỏ qua nếu nằm trong"],ev:"Cách xử lý tùy theo đặc tả/tiêu chuẩn chấp nhận áp dụng."},
{c:"Defects",q:"If the amperage is too low while welding a root bead, the likely result is:",o:["Lack of penetration / lack of fusion","Undercut","Excess penetration","Spatter only"],a:0,e:"Insufficient heat → poor root fusion and lack of penetration.",
 qv:"Nếu dòng quá thấp khi hàn lớp lót chân, hậu quả thường gặp:",ov:["Không thấu / không ngấu","Cháy chân","Thấu quá mức","Chỉ văng tóe"],ev:"Thiếu nhiệt → ngấu chân kém và không thấu."},
{c:"Defects",q:"Gas porosity in an MMA weld is most commonly caused by:",o:["Excess travel speed","Damp flux / contaminated surface","Low voltage","Too small an electrode"],a:1,e:"Moisture/contamination introduces gas trapped on solidification.",
 qv:"Rỗ khí trong mối hàn MMA thường do:",ov:["Tốc độ hàn quá nhanh","Thuốc ẩm / bề mặt bẩn","Điện áp thấp","Que quá nhỏ"],ev:"Ẩm/bẩn sinh khí bị kẹt khi đông đặc."},
{c:"Defects",q:"Tungsten inclusions can occur in which process?",o:["MMA","SAW","TIG (GTAW)","Oxy-fuel"],a:2,e:"Only TIG uses a tungsten electrode that can contaminate the weld.",
 qv:"Ngậm vonfram có thể xảy ra ở quá trình nào?",ov:["MMA","SAW","TIG (GTAW)","Hàn khí"],ev:"Chỉ TIG dùng điện cực vonfram nên mới ngậm vonfram."},
{c:"Defects",q:"Crater pipe (a shrinkage cavity at the end of a run) is especially a problem in:",o:["SAW","TIG, due to low heat input","MMA basic","MAG dip transfer"],a:1,e:"TIG's low heat input needs proper crater filling (current slope-out).",
 qv:"Lõm cuối đường hàn (crater pipe) là vấn đề đặc biệt ở:",ov:["SAW","TIG, do nhiệt đầu vào thấp","MMA basic","MAG dịch chuyển ngắn mạch"],ev:"TIG nhiệt thấp cần điền lõm đúng cách (giảm dòng từ từ)."},

/* --- Symbols / Terminology --- */
{c:"Symbols",q:"In BS EN ISO 2553, the number 111 at the tail of a weld-symbol reference line indicates:",o:["Welding process","Type of electrode","Welding position","Total weld length"],a:0,e:"Process numbers per ISO 4063: 111=MMA, 121=SAW, 131=MIG, 135=MAG, 141=TIG.",
 qv:"Theo BS EN ISO 2553, số 111 ở đuôi đường tham chiếu ký hiệu hàn chỉ:",ov:["Quá trình hàn","Loại que","Vị trí hàn","Tổng chiều dài mối hàn"],ev:"Mã quá trình theo ISO 4063: 111=MMA, 121=SAW, 131=MIG, 135=MAG, 141=TIG."},
{c:"Symbols",q:"In ISO 2553, a weld symbol placed BELOW the reference line means the weld is on:",o:["The arrow side","The other side","Both sides","All round"],a:0,e:"ISO: symbol below the solid line = arrow side. (AWS is opposite.)",
 qv:"Trong ISO 2553, ký hiệu đặt DƯỚI đường tham chiếu nghĩa là mối hàn ở:",ov:["Phía mũi tên","Phía đối diện","Cả hai phía","Hàn quanh"],ev:"ISO: dưới đường liền = phía mũi tên. (AWS thì ngược lại.)"},
{c:"Terminology",q:"A fillet weld with a design throat thickness of 8mm requires a minimum leg length of about:",o:["5.6mm","8.0mm","11.3mm","16mm"],a:2,e:"Leg = throat / 0.707 = 8 / 0.707 ≈ 11.3mm.",
 qv:"Mối hàn góc có chiều cao cổ tính toán 8mm cần cạnh tối thiểu khoảng:",ov:["5.6mm","8.0mm","11.3mm","16mm"],ev:"Cạnh = cổ / 0.707 = 8 / 0.707 ≈ 11.3mm."},
{c:"Terminology",q:"In UK practice (BS 499), the drawing dimension quoted for a fillet weld is normally the:",o:["Leg length","Actual throat thickness","Weld length","Reinforcement height"],a:0,e:"BS convention quotes the leg length 'z' for fillet welds.",
 qv:"Theo tập quán Anh (BS 499), kích thước ghi trên bản vẽ cho mối hàn góc thường là:",ov:["Chiều dài cạnh (leg)","Chiều cao cổ thực","Chiều dài mối hàn","Chiều cao lồi"],ev:"BS ghi theo chiều dài cạnh 'z' cho mối hàn góc."},
{c:"Terminology",q:"ISO 6947 welding position 'PF' is:",o:["Flat","Vertical-up","Vertical-down","Overhead"],a:1,e:"PF = vertical-up; PG = vertical-down; PA = flat; PC = horizontal.",
 qv:"Vị trí hàn 'PF' theo ISO 6947 là:",ov:["Hàn bằng","Hàn leo lên","Hàn tụt xuống","Hàn trần"],ev:"PF = leo lên; PG = tụt xuống; PA = bằng; PC = ngang."},

/* --- NDT --- */
{c:"NDT",q:"Which NDT method is best for detecting volumetric defects such as porosity and slag?",o:["Ultrasonic (UT)","Radiography (RT)","Magnetic particle (MT)","Dye penetrant (PT)"],a:1,e:"RT shows volumetric (3-D) defects clearly on film.",
 qv:"Phương pháp NDT nào tốt nhất để phát hiện khuyết tật thể tích như rỗ khí, xỉ?",ov:["Siêu âm (UT)","Chụp tia (RT)","Bột từ (MT)","Thẩm thấu (PT)"],ev:"RT hiện rõ khuyết tật thể tích (3 chiều) trên phim."},
{c:"NDT",q:"Which NDT method is best for detecting planar defects such as cracks and lack of fusion?",o:["Radiography (RT)","Ultrasonic (UT)","Dye penetrant (PT)","Visual (VT)"],a:1,e:"UT detects planar defects well and gives depth; RT can miss tight planar defects.",
 qv:"Phương pháp NDT nào tốt nhất phát hiện khuyết tật phẳng như nứt, không ngấu?",ov:["Chụp tia (RT)","Siêu âm (UT)","Thẩm thấu (PT)","Ngoại quan (VT)"],ev:"UT phát hiện tốt khuyết tật phẳng và đo được chiều sâu; RT dễ bỏ sót khuyết tật phẳng khít."},
{c:"NDT",q:"Magnetic particle inspection (MT) can only be used on:",o:["Any material","Aluminium","Ferromagnetic materials","Plastics"],a:2,e:"MT needs a ferromagnetic material (e.g. carbon steel).",
 qv:"Kiểm tra bột từ (MT) chỉ dùng được cho:",ov:["Mọi vật liệu","Nhôm","Vật liệu nhiễm từ","Nhựa"],ev:"MT cần vật liệu nhiễm từ (vd thép carbon)."},
{c:"NDT",q:"Dye penetrant testing (PT) detects:",o:["Sub-surface defects","Only surface-breaking defects","Defects 5mm deep","Internal porosity"],a:1,e:"PT only finds defects that break the surface.",
 qv:"Kiểm tra thẩm thấu (PT) phát hiện:",ov:["Khuyết tật dưới bề mặt","Chỉ khuyết tật hở bề mặt","Khuyết tật sâu 5mm","Rỗ khí bên trong"],ev:"PT chỉ tìm khuyết tật hở ra bề mặt."},
{c:"NDT",q:"Weld cap height (excess weld metal) is best measured:",o:["With a densitometer","With a weld profile/fillet gauge","By radiography","By ultrasonic"],a:1,e:"A weld gauge measures cap height and toe blend.",
 qv:"Chiều cao lồi mối hàn (cap) được đo tốt nhất bằng:",ov:["Máy đo mật độ phim","Dưỡng đo mối hàn","Chụp tia","Siêu âm"],ev:"Dưỡng đo mối hàn đo chiều cao lồi và độ chuyển tiếp mép."},

/* --- WPS/PQR/Qualification --- */
{c:"WPS/PQR",q:"A document that gives detailed welding instructions for the welder to follow is a:",o:["PQR","WPS","WPQ","Mill certificate"],a:1,e:"The WPS is the instruction; the PQR is the qualifying evidence.",
 qv:"Tài liệu chỉ dẫn chi tiết cho thợ hàn làm theo là:",ov:["PQR","WPS","WPQ","Chứng chỉ vật liệu"],ev:"WPS là chỉ dẫn; PQR là bằng chứng chứng nhận."},
{c:"WPS/PQR",q:"Procedure qualification (the test that proves a WPS) is carried out to:",o:["EN ISO 9606","EN ISO 15614","ISO 5817","ISO 6520"],a:1,e:"EN ISO 15614 = procedure qualification; EN ISO 9606 = welder qualification.",
 qv:"Chứng nhận quy trình hàn (thử chứng minh WPS) thực hiện theo:",ov:["EN ISO 9606","EN ISO 15614","ISO 5817","ISO 6520"],ev:"EN ISO 15614 = chứng nhận quy trình; EN ISO 9606 = chứng nhận thợ."},
{c:"WPS/PQR",q:"Changing an 'essential variable' on a qualified procedure requires:",o:["Nothing","Re-qualification of the procedure","Only a colour change","Lower current"],a:1,e:"Essential variables affect properties → re-qualify.",
 qv:"Thay đổi 'biến số thiết yếu' của quy trình đã chứng nhận đòi hỏi:",ov:["Không cần gì","Chứng nhận lại quy trình","Chỉ đổi màu","Giảm dòng"],ev:"Biến số thiết yếu ảnh hưởng cơ tính → phải chứng nhận lại."},
{c:"WPS/PQR",q:"You see MMA electrodes stripped of flux being used as TIG filler. You object because:",o:["It is too expensive","The wire would be too thick","The weld metal composition may be wrong","The wire is too short"],a:2,e:"Core wire composition differs from proper filler; it can give wrong chemistry/properties.",
 qv:"Bạn thấy lõi que MMA bóc thuốc đem làm que đắp TIG. Bạn phản đối vì:",ov:["Quá đắt","Dây quá dày","Thành phần kim loại đắp có thể sai","Dây quá ngắn"],ev:"Thành phần lõi que khác que đắp đúng chuẩn → hóa tính/cơ tính sai."},

/* --- Heat treatment --- */
{c:"Heat treatment",q:"Post-weld stress-relief (PWHT) soak temperature for C and C-Mn steels is typically about:",o:["~150°C","~350°C","~600°C","~950°C"],a:2,e:"WIS5: C and C-Mn steels need a soak temperature of ~600°C.",
 qv:"Nhiệt độ giữ nhiệt PWHT khử ứng suất cho thép C và C-Mn thường khoảng:",ov:["~150°C","~350°C","~600°C","~950°C"],ev:"WIS5: thép C và C-Mn cần giữ nhiệt ~600°C."},
{c:"Heat treatment",q:"The main purpose of preheat is to:",o:["Speed up welding","Slow the cooling rate and let hydrogen diffuse out","Improve appearance","Save gas"],a:1,e:"Slower cooling softens the HAZ and lets hydrogen escape → prevents cracking.",
 qv:"Mục đích chính của tiền nhiệt là:",ov:["Tăng tốc độ hàn","Làm chậm nguội & cho hydro khuếch tán ra","Đẹp mối hàn","Tiết kiệm khí"],ev:"Nguội chậm làm mềm HAZ và cho hydro thoát → chống nứt."},

/* --- Distortion / Stress --- */
{c:"Distortion",q:"Stress acting in the opposite direction to compressive stress is:",o:["Residual stress","Shear stress","Hoop stress","Tensile stress"],a:3,e:"Tensile stress is the opposite of compressive stress.",
 qv:"Ứng suất tác dụng ngược chiều với ứng suất nén là:",ov:["Ứng suất dư","Ứng suất cắt","Ứng suất vòng","Ứng suất kéo"],ev:"Ứng suất kéo ngược với ứng suất nén."},
{c:"Distortion",q:"Distortion may be affected by:",o:["Restraint","Heat input","Material thickness","All of the above"],a:3,e:"Restraint, heat input, material properties and thickness all affect distortion.",
 qv:"Biến dạng có thể bị ảnh hưởng bởi:",ov:["Mức kẹp chặt (restraint)","Nhiệt đầu vào","Chiều dày vật liệu","Tất cả các yếu tố trên"],ev:"Kẹp chặt, nhiệt đầu vào, cơ tính và chiều dày đều ảnh hưởng biến dạng."},

/* --- Inspector duties / Safety / Calibration --- */
{c:"Duties",q:"On an open site doing MMA welding, which welders most likely need continuous monitoring?",o:["Concrete shuttering teams","Pipe welding team","Plater welders","Plant maintenance welders"],a:1,e:"Pipe welds are usually the most critical (pressure/strength) → closest monitoring.",
 qv:"Hàn MMA ngoài công trường, nhóm thợ nào cần giám sát liên tục nhất?",ov:["Nhóm hàn cốp pha","Nhóm hàn ống","Thợ hàn kết cấu tấm","Thợ hàn bảo trì"],ev:"Mối hàn ống thường quan trọng nhất (chịu áp/chịu lực) → giám sát sát nhất."},
{c:"Safety",q:"'Arc eye' is caused by:",o:["Welding fume","Ultraviolet (UV) radiation from the arc","Noise","Electric shock"],a:1,e:"UV radiation damages the cornea, causing arc eye.",
 qv:"'Arc eye' (viêm giác mạc do hồ quang) gây ra bởi:",ov:["Khói hàn","Tia cực tím (UV) từ hồ quang","Tiếng ồn","Điện giật"],ev:"Tia UV làm tổn thương giác mạc, gây arc eye."},
{c:"Safety",q:"For safe MMA welding on an open construction site, the preferred power source is:",o:["Single-operator transformer","Multi-operator transformer","AC/DC composite unit","Diesel engine-driven generator"],a:3,e:"An engine-driven generator avoids mains-electrocution risk where no safe supply exists.",
 qv:"Để hàn MMA an toàn ngoài công trường, nguồn điện nên chọn:",ov:["Biến áp 1 thợ","Biến áp nhiều thợ","Tổ hợp AC/DC","Máy phát chạy động cơ diesel"],ev:"Máy phát chạy động cơ tránh nguy cơ điện giật từ lưới khi không có nguồn an toàn."},
{c:"Calibration",q:"Why must inspection measuring equipment be calibrated?",o:["For appearance","To ensure measurements are accurate and valid","To increase resale value","It is optional"],a:1,e:"Uncalibrated tools give invalid results; calibration must be traceable.",
 qv:"Vì sao thiết bị đo kiểm tra phải được hiệu chuẩn?",ov:["Cho đẹp","Đảm bảo kết quả đo chính xác & có giá trị","Tăng giá bán lại","Không bắt buộc"],ev:"Dụng cụ chưa hiệu chuẩn cho kết quả vô giá trị; hiệu chuẩn phải truy xuất được."},

/* --- Acceptance / Codes --- */
{c:"Codes",q:"The basis for accepting or rejecting a weld is:",o:["The inspector's opinion","The applicable (contract) standard","The welder's opinion","The cheapest option"],a:1,e:"Accept/reject is always per the applicable acceptance standard.",
 qv:"Cơ sở để chấp nhận hay loại bỏ mối hàn là:",ov:["Ý kiến thanh tra","Tiêu chuẩn áp dụng (hợp đồng)","Ý kiến thợ hàn","Phương án rẻ nhất"],ev:"Chấp nhận/loại bỏ luôn theo tiêu chuẩn chấp nhận áp dụng."},
{c:"Codes",q:"A code states excess weld metal h ≤ 1mm + 0.1b (max 5mm), b = cap width. Which is ACCEPTABLE?",o:["b=15, h=3.0","b=22, h=3.0","b=28, h=4.0","b=40, h=5.4"],a:1,e:"b=22 → limit=1+2.2=3.2mm; h=3.0 ≤ 3.2 → acceptable. Others exceed their limits.",
 qv:"Tiêu chuẩn quy định lồi h ≤ 1mm + 0.1b (tối đa 5mm), b = bề rộng cap. Trường hợp nào ĐẠT?",ov:["b=15, h=3.0","b=22, h=3.0","b=28, h=4.0","b=40, h=5.4"],ev:"b=22 → giới hạn=1+2.2=3.2mm; h=3.0 ≤ 3.2 → đạt. Các trường hợp khác đều vượt."},

];
