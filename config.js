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
  price: 499000,
  currency: "đ",
  planNote: "Mở khóa trọn bộ công cụ: tạo PQR/WPQR, tính phạm vi qualify thợ, soạn WPS — dùng không giới hạn.",

  /* ---- Thông tin nhận tiền (VietQR) ---- */
  bankCode: "",
  accountNo: "",
  accountName: "",
  momo: "0937527670",

  /* ---- Liên hệ kích hoạt ---- */
  contactEmail: "dauthemy.oto@gmail.com",
  contactZalo: "0937527670",

  /* ---- Khóa sinh mã kích hoạt ---- */
  secret: "WELD-3x1-Th3My-2026-#kF9qLpZ",
  adminPass: "themy@admin",
  ownerPhone: "0937527670",
  ownerEmail: "dauthemy.oto@gmail.com",
  firebase: {
    apiKey: "AIzaSyCbC3eVpW_aRUwrKi7dAeEPeyQhivrdKo4",
    authDomain: "cswip-app.firebaseapp.com",
    projectId: "cswip-app",
    storageBucket: "cswip-app.firebasestorage.app",
    messagingSenderId: "432480985165",
    appId: "1:432480985165:web:9c6450277e0735fe84fc04"
  }
};
