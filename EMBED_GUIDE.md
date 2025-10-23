# 📦 Hướng dẫn nhúng Chat Widget vào website

## 🚀 Cách 1: Sử dụng file build (Khuyến nghị cho Local)

### **Bước 1: Build project**

```bash
npm run build
```

Sau khi build xong, file `chat-widget.umd.cjs` sẽ được tạo trong thư mục `dist/`

### **Bước 2: Tạo file HTML**

Tạo file `index.html` hoặc sử dụng file HTML có sẵn:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <h1>Website của tôi</h1>
    <p>Nội dung website...</p>

    <!-- Load Chat Widget CSS -->
    <link rel="stylesheet" href="./dist/chat-widget.css">
    
    <!-- Load Chat Widget JS (React đã được bundle vào) -->
    <script src="./dist/chat-widget.iife.js"></script>
    <script>
        window.initChatWidget({
            apiUrl: '',
            apiKey: '',
            language: 'vi',
            position: 'bottom-right',
            theme: 'light',
            userId: 'BaNaNe',
            conversationId: ''
        });
    </script>
</body>
</html>
```

**⚠️ LƯU Ý QUAN TRỌNG:** Phải load React và ReactDOM trước khi load chat widget!

### **Bước 3: Mở file HTML**

Có 2 cách:

**Cách 1: Mở trực tiếp file**
- Double click vào file `index.html`
- Hoặc kéo thả vào trình duyệt

**Cách 2: Dùng Live Server (Khuyến nghị)**
```bash
# Cài đặt live-server global
npm install -g live-server

# Chạy server
live-server
```

---

## 🌐 Cách 2: Sử dụng CDN (Cho production)

### **Bước 1: Upload file build lên CDN hoặc server**

Upload file `dist/chat-widget.umd.cjs` lên:
- CDN (jsDelivr, unpkg, etc.)
- Server của bạn
- GitHub Pages
- Netlify / Vercel

### **Bước 2: Nhúng vào HTML**

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
</head>
<body>
    <h1>Website của tôi</h1>

    <!-- Load React và ReactDOM từ CDN -->
    <script crossorigin src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>
    
    <!-- Load Chat Widget từ CDN hoặc server -->
    <script src="https://your-domain.com/chat-widget.umd.cjs"></script>
    <script>
        window.initChatWidget({
            apiUrl: '',
            apiKey: '',
            language: 'vi',
            position: 'bottom-right',
            theme: 'light',
            userId: 'user-' + Date.now()
        });
    </script>
</body>
</html>
```

---

## ⚙️ Cấu hình Widget

### **Tất cả các tùy chọn:**

```javascript
window.initChatWidget({
    // API Configuration
    apiUrl: '',  // Required: API endpoint
    apiKey: '',         // Required: API key
    
    // User Configuration
    userId: 'BaNaNe',                                 // Optional: User ID
    conversationId: '',                               // Optional: Conversation ID (để trống cho cuộc hội thoại mới)
    
    // UI Configuration
    language: 'vi',                                   // Optional: 'vi' | 'en' (default: 'vi')
    position: 'bottom-right',                         // Optional: 'bottom-right' | 'bottom-left' (default: 'bottom-right')
    theme: 'light',                                   // Optional: 'light' | 'dark' (default: 'light')
    
    // Container Configuration
    containerId: 'chat-widget-container'              // Optional: Custom container ID
});
```

### **Ví dụ cấu hình đơn giản:**

```javascript
// Cấu hình tối thiểu
window.initChatWidget({
    apiUrl: '',
    apiKey: ''
});
```

### **Ví dụ cấu hình đầy đủ:**

```javascript
// Cấu hình đầy đủ với theme dark
window.initChatWidget({
    apiUrl: '',
    apiKey: '',
    language: 'en',
    position: 'bottom-left',
    theme: 'dark',
    userId: 'user-12345',
    conversationId: ''
});
```

---

## 📁 Cấu trúc thư mục

### **Cho Local Development:**

```
my-website/
├── index.html
├── dist/
│   └── chat-widget.umd.cjs
└── assets/
    └── ...
```

### **Cho Production:**

```
my-website/
├── index.html
├── js/
│   └── chat-widget.umd.cjs
├── css/
│   └── styles.css
└── assets/
    └── ...
```

---

## 🎯 Demo Files

Project đã bao gồm các file demo:

1. **`demo-local.html`** - Demo đầy đủ với hướng dẫn
2. **`simple-demo.html`** - Demo đơn giản nhất
3. **`embed-demo.html`** - Demo với mock API

### **Cách chạy demo:**

```bash
# Cách 1: Mở trực tiếp
# Double click vào file demo-local.html

# Cách 2: Dùng live-server
npm install -g live-server
live-server --open=demo-local.html

# Cách 3: Dùng Python
python -m http.server 8000
# Mở http://localhost:8000/demo-local.html
```

---

## 🔧 Troubleshooting

### **1. Widget không hiển thị**

**Kiểm tra:**
- ✅ Đã load React và ReactDOM chưa? (QUAN TRỌNG!)
- ✅ Đường dẫn đến file `chat-widget.umd.cjs` có đúng không?
- ✅ File đã được build chưa? (`npm run build`)
- ✅ Console có báo lỗi gì không?

**Lỗi thường gặp:**
```
Error: React is not defined
Error: ReactDOM is not defined
```

**Giải pháp:**
```html
<!-- Phải load React TRƯỚC -->
<script crossorigin src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>

<!-- Sau đó mới load widget -->
<script src="./dist/chat-widget.umd.cjs"></script>
```

**Debug:**
```javascript
// Kiểm tra React đã load chưa
console.log('React:', typeof React);
console.log('ReactDOM:', typeof ReactDOM);

// Thêm log để debug
console.log('Loading chat widget...');
window.initChatWidget({...});
console.log('Chat widget loaded!');
```

### **2. CORS Error**

**Nguyên nhân:** Mở file HTML trực tiếp (`file://`)

**Giải pháp:** Dùng local server
```bash
# Option 1: Live Server
live-server

# Option 2: Python
python -m http.server 8000

# Option 3: Node.js http-server
npx http-server
```

### **3. API không kết nối được**

**Kiểm tra:**
- ✅ API URL có đúng không?
- ✅ API Key có hợp lệ không?
- ✅ Network tab trong DevTools có lỗi gì không?

**Debug:**
```javascript
// Mở Console để xem conversation_id
// Sẽ log: "Conversation ID: xxx-xxx-xxx"
```

### **4. Widget bị che khuất**

**Nguyên nhân:** z-index của các element khác cao hơn

**Giải pháp:**
```css
/* Thêm vào CSS của bạn */
.chat-widget-container {
    z-index: 9999 !important;
}
```

---

## 📱 Responsive

Widget tự động responsive trên mọi thiết bị:

- **Desktop:** Popup 360x450px ở góc màn hình
- **Mobile:** Full screen với UX tối ưu
- **Tablet:** Tự động điều chỉnh kích thước

---

## 🎨 Tùy chỉnh giao diện

### **Thay đổi màu sắc:**

Chỉnh sửa file `src/index.css`:

```css
/* Màu chat bubble */
.chat-bubble {
    background: #4C83BA; /* Màu xanh đậm */
}

/* Màu header */
.chat-header {
    background: #A7C7E7; /* Màu xanh pastel */
}

/* Màu tin nhắn user */
.bg-\[\#A7C7E7\] {
    background: #A7C7E7;
}

/* Màu tin nhắn bot */
.bg-\[\#F5E6D3\] {
    background: #F5E6D3;
}
```

Sau khi chỉnh sửa, build lại:
```bash
npm run build
```

---

## 📊 Monitoring

### **Theo dõi conversation:**

```javascript
// Widget tự động log conversation_id
// Mở Console để xem:
// "Conversation ID: 360fb978-f2ea-4940-a5b5-7cb6b55c3053"
```

### **Lưu conversation_id:**

```javascript
// Lưu vào localStorage để tiếp tục cuộc hội thoại
const savedConversationId = localStorage.getItem('conversationId');

window.initChatWidget({
    apiUrl: '...',
    apiKey: '...',
    conversationId: savedConversationId || ''
});

// Lắng nghe event để lưu conversation_id mới
// (Cần implement custom event trong widget)
```

---

## 🔒 Security

### **Best Practices:**

1. **Không hardcode API Key trong production**
   ```javascript
   // ❌ Không nên
   apiKey: 'app-1234657891234568798'
   
   // ✅ Nên dùng
   apiKey: process.env.CHAT_API_KEY
   ```

2. **Sử dụng HTTPS trong production**
   ```javascript
   apiUrl: 'https://your-api.com/v1/chat-messages'
   ```

3. **Validate user input**
   - Widget đã tự động trim và validate input
   - API nên có rate limiting

---

## 📞 Support

Nếu gặp vấn đề, hãy:
1. Kiểm tra Console trong DevTools
2. Kiểm tra Network tab để xem API request
3. Xem file `CONVERSATION_FLOW.md` để hiểu cách hoạt động
4. Chạy file demo để test

---

## ✅ Checklist

Trước khi deploy:

- [ ] Đã build project (`npm run build`)
- [ ] Đã test trên local
- [ ] API URL và API Key đã đúng
- [ ] Đã test trên mobile
- [ ] Đã kiểm tra CORS
- [ ] Đã tối ưu performance
- [ ] Đã test conversation flow

---

**Happy Coding! 🚀**
