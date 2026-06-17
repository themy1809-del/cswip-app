/* ============================================================
   CẤU HÌNH APP — SỬA CÁC GIÁ TRỊ TRONG NÀY THEO BẠN
   (Edit these values to your own info)
   ============================================================
   ⚠️ LƯU Ý BẢO MẬT: đây là web tĩnh nên 'secret' & 'adminPass'
   nằm trong mã nguồn công khai. Mức bảo vệ này hợp cho bản thử
   nghiệm/giá rẻ. Muốn bảo mật thật (chống làm giả mã) cần backend
   (Firebase/Supabase) — nhắn để nâng cấp.
   ============================================================ */
const CONFIG = {

  /* ---- Giá & nội dung gói Premium ---- */
  premiumName: "CSWIP 3.1 PRO",
  price: 499000,                 // số tiền (VND). Đổi theo bạn.
  currency: "đ",
  planNote: "Mở khóa trọn bộ công cụ: tạo PQR/WPQR, tính phạm vi qualify thợ, soạn WPS — dùng không giới hạn.",

  /* ---- Thông tin nhận tiền (để tạo mã QR chuyển khoản VietQR) ----
     bankCode: mã ngân hàng VietQR, ví dụ: VCB, TCB, MB, ACB, BIDV,
     VietinBank, VPB, TPBank, Sacombank, VIB, MSB, OCB, SHB, HDBank...
     accountNo: số tài khoản. accountName: tên chủ tài khoản (IN HOA, không dấu).
     Để TRỐNG nếu chưa muốn dùng QR — app sẽ hiện thông tin liên hệ thay thế. */
  bankCode: "",                  // VD: "VCB"
  accountNo: "",                 // VD: "0123456789"
  accountName: "",               // VD: "NGUYEN VAN A"
  momo: "0937527670",                      // số MoMo (tùy chọn)

  /* ---- Liên hệ kích hoạt ---- */
  contactEmail: "dauthemy.oto@gmail.com",
  contactZalo: "0937527670",               // số Zalo/điện thoại (tùy chọn)

  /* ---- Khóa sinh mã kích hoạt ---- */
  secret: "WELD-3x1-Th3My-2026-#kF9qLpZ",  // ĐỔI thành chuỗi bí mật của riêng bạn
  adminPass: "themy@admin",
  ownerPhone: "0937527670"   // SĐT chủ shop: tự hiện trang tạo mã trong app                 // mật khẩu mở trang tạo mã (admin.html)
};
