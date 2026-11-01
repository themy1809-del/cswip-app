# CSWIP 3.1 — App ôn thi Welding Inspector (song ngữ Việt–Anh)

Web tĩnh (PWA, chạy offline) giúp ôn thi chứng chỉ **CSWIP 3.1 Welding Inspector** theo giáo trình WIS5 (TWI).
Bản chạy trực tiếp: https://themy1809-del.github.io/cswip-app/

## Cách học được thiết kế (nước rút nhưng phải hiểu bài)

| Tab | Dùng để | Ghi chú |
|---|---|---|
| 🏠 Tổng quan | Đếm ngược ngày thi, **mục tiêu cuối: tự trả lời hết 420 câu trắc nghiệm của bộ đề** (theo từng chương), **việc cần làm hôm nay**, điểm yếu, mức sẵn sàng, lịch sử học | Việc hằng ngày tự sinh theo số ngày còn lại và chỗ bạn yếu |
| 📗 Học gọn chương | **Một chương = một đường đi 8 bước**: mục tiêu → nghe giảng → mổ xẻ từng mục (ý chính, giảng giải, hình, đề hỏi gì, bẫy, số liệu) → mổ xẻ từng câu đề → **tự trả lời hết** (đoán trước, mở phương án sau; đúng 2 lần liên tiếp mới tính) → thi chương → câu sai → số liệu | Chương đang học được Tổng quan & việc hằng ngày bám theo, không học lan man |
| 🎙️ Giảng bài | **Thầy ảo dẫn từng slide**: hình mô phỏng hiện dần từng lớp → giảng từng đoạn → hỏi lại bằng câu đề thật kèm 🔍 mổ xẻ đề → bẫy đề → con số thuộc lòng → chốt thuật ngữ → 5 câu tổng kết | ▶ chạy tự động với giọng đọc tiếng Việt, ô "Hỏi thầy", nhớ tiến độ học dở |
| 📘 Học từ đề | **711 câu đề thật lật thành bài học**: Đề hỏi gì → Điều phải nhớ → Vì sao, xếp theo từng mục của 18 chương; gợi nhớ chủ động, bảng tóm tắt in được, kiểm tra lại bằng chính các câu đó | Câu sai vào Sổ câu sai & SRS |
| 📖 Tài liệu thi | Đề Work Pack, Leading Questions, WPS Rings, điền khuyết, bộ hỏi–đáp kinh nghiệm | Chọn đáp án tiếng Anh trước, xem dịch sau |
| 🎓 Thi thử | 3 phần bấm giờ như thi thật, cắm cờ, nộp bài, xem lại câu sai | Mốc đậu 70 % |
| 📝 Quiz & Ôn tập | Ôn ngắt quãng (SRS), luyện điểm yếu, theo chủ đề / chương, thi có giờ | |
| 📕 Sổ câu sai | Gom **mọi** câu sai ở mọi chế độ, kèm giải thích và đoạn bài học liên quan | Đúng lại 2 lần = "đã thuộc" |
| 📚 Bài học | 18 chương: 🎓 Giảng giải → tóm tắt → điểm cần nhớ → thẻ "Tôi hiểu bài này chưa?" | Mọi chương mở sẵn; thi chương để ghi điểm |
| 🃏 Flashcard | Thuật ngữ bài học + 502 từ điển, phát âm | |
| 🗓️ Lộ trình | Kế hoạch **từng ngày** tới ngày thi, ngày đã qua hiện kết quả thật | |
| 🛠️ Công cụ | CEV, heat input, fillet, tiền nhiệt, WPS/PQR, phạm vi qualify thợ, NCR | Tham khảo |
| 👤 Hồ sơ | Bảng điểm, huy hiệu, **sao lưu/khôi phục** | |

Trang phụ: `tuvung.html` (120 từ vựng đề thi), `hoc_demo.html` (bản thử "học dễ nhớ" chương 2).

## Cấu trúc mã nguồn

Tất cả là JS thuần, nạp theo thứ tự trong `index.html`. Các module sau **bọc (wrap)** hàm của module trước, không sửa trực tiếp.

| File | Vai trò |
|---|---|
| `index.html` | Khung giao diện, CSS, logic lõi (bài học, flashcard, quiz engine, công cụ, hồ sơ) |
| `config.js` | Giá, liên hệ, khóa sinh mã, Firebase |
| `data.js`, `data_extra.js` | 18 chương: `lessons`, `deep` (giảng giải), `key`, `quiz`, lộ trình & prompt AI |
| `bank.js`, `realbank.js`, `cwibank.js`, `cwibank_vi.js` | Ngân hàng câu hỏi (CSWIP + CWI tham khảo) |
| `thibank1–7.js`, `thi.js`, `mock.js` | Tài liệu thi & thi thử 3 phần (`thibank7.js`: Work Pack TWI 20 câu kèm hồ sơ, đáp án do trợ lý xác định từ hồ sơ) |
| `auth.js`, `premium.js`, `cloud.js` | Đăng ký, công cụ nâng cao (qualify thợ, PQR), thi chương, đồng bộ Firestore. Chế độ mở khóa PRO đã bỏ: `isPremium()` luôn true, `chapFree()` luôn true |
| `glossary.js`, `dich.js` | Từ điển 502 thuật ngữ, bôi đen → dịch |
| `map_thi.js`, `cswip_focus.js`, `img_book.js`, `nangcap.js` | Liên kết câu hỏi → bài học, tách CWI, hình sách (local), flashcard từ điển |
| `giangbai.js` | 🎙️ Giảng bài dạng slide (tự sinh từ `deep` + `lessons` + `key` + `quiz` + đề thật theo chủ đề) + 🔍 **mổ xẻ đề** dùng chung (`gbDissectHTML`): 12 kiểu "cách họ hỏi" kèm lời khuyên, từ phủ định, dịch, từ khó, và "cách nhận biết đáp án" thống kê từ chính bộ đề (All of the above, None/Both, từ tuyệt đối, phương án dài nhất, lặp từ khóa, cặp đối lập, số liệu) |
| `phantich.js` | 🔎 Phân tích bộ đề (tỉ trọng chương, mục hỏi nhiều, kiểu câu, độ phủ trọng tâm) + nút "Kiến thức bộ này" và hộp "Kiến thức bám sát" trong Tài liệu thi + huy hiệu "đề hỏi N lần" trong Bài học |
| `hocde.js` | 📘 Học từ đề thi: gom 510 câu Tài liệu thi + 206 câu ngân hàng thành điểm kiến thức theo chương/mục (THI_LESSON_MAP + khớp từ khóa); nút 🔍 mổ xẻ trong màn học |
| `chuong.js` | 📗 Học gọn chương: hub 18 chương, 8 bước tuyến tính, thẻ mổ xẻ mục & câu đề, bước ⑤ luyện "tự trả lời hết" (câu sai/đúng 1 lần quay lại trong phiên), tiến độ từng chương (`cswip_chuong`), "chương đang học" cho Tổng quan |
| `giangbai_data.js` | Lời thầy viết tay 18 chương: hình dung đời thường, bẫy đề, con số thuộc lòng, thần chú, ý giảng bổ sung |
| `img_book/` + `img_book.js` | 223 hình trích từ giáo trình WIS5 (chú thích Anh/Việt, gắn chương) + 14 trang Work Pack mẫu; thư viện & phóng to trong tab Bài học, slide ảnh thật trong Giảng bài |
| `workpack.js` | 📎 Hồ sơ Work Pack mẫu TWI (WPS, chứng chỉ thợ, bản vẽ): trình xem, cửa sổ nổi khi làm bài, 👨‍🏫 hướng dẫn đọc từng ô (khoanh đỏ trên ảnh thật, 19 bước) |
| `thuchanh.js` | 🔧 Thi thực hành: cách TWI chấm (3 câu/mẫu), bảng tiêu chí A/B/C cho 13 khuyết tật, ảnh thật, bài tập kết án có chấm |
| `giangbai_hinh.js` | Thư viện 37 hình SVG mô phỏng nhiều bước (vết nứt lan, bọt khí, tia RT, từ trường rò…) |
| `nuocrut.js` | Ôn thi nước rút: ngày thi, nhật ký học, sổ câu sai, mức sẵn sàng, Tổng quan & Lộ trình mới, menu, phím tắt, sao lưu |
| `theme.css` | Bảng màu dùng chung; **mặc định giao diện sáng nền trắng** (`body.light`), 🌙 Tối vẫn chọn được ở cuối thanh bên, lưu trong máy |
| `sw.js`, `manifest.json` | PWA: cache network-first, shortcut |
| `admin.html`, `dashboard.html` | Trang chủ shop: tạo mã, xem học viên |

## Bản quyền hình giáo trình

Thư mục `img_book/` chứa hình trích từ tài liệu WIS5 và phụ lục của TWI (© TWI Ltd), do chủ app cung cấp để **học tập cá nhân**. Không phân phối lại thương mại. Nếu cần hạn chế, chuyển repo sang private hoặc xóa thư mục này (app vẫn chạy, chỉ mất hình sách).

## Dữ liệu lưu trên máy (localStorage)

`cswip_prog`, `cswip_quiz`, `cswip_srs`, `cswip_user`, `cswip_game`, `cswip_exam`, `THIP`, `MOCKH`,
`cswip_log` (nhật ký ngày), `cswip_wrong` (sổ câu sai), `cswip_cat`, `cswip_seen`, `cswip_und` (hiểu bài), `cswip_teach` (tiến độ giảng bài), `cswip_tasks`, `cswip_exam_date`, `cswip_free`, `cswip_tts`, `cswip_chuong` (tiến độ học gọn chương), `cswip_mast` (chuỗi trả lời đúng liên tiếp từng câu — "tự trả lời được" khi ≥ 2).
Nút **Sao lưu** ở tab Hồ sơ xuất toàn bộ ra một file JSON.

## Chạy thử tại chỗ

```bash
python3 -m http.server 8765
```

Mở http://localhost:8765/ . Khi đổi tài nguyên tĩnh, tăng `CACHE` trong `sw.js`.

## Phím tắt

`1–4` / `A–D` chọn đáp án · `Enter` / `→` câu tiếp · `←` lùi · `Space` lật thẻ · `F` cắm cờ (thi thử).
