# Hướng dẫn sử dụng Chat Widget

## 🚀 Chạy dự án

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build widget
npm run build
```

## 📁 Cấu trúc dự án

```
chatbox-demo/
├── src/
│   ├── components/
│   │   ├── ChatWidget.tsx      # Component chính
│   │   ├── ChatBubble.tsx      # Icon chat bubble
│   │   ├── ChatPopup.tsx       # Popup chat
│   │   ├── MessageList.tsx     # Danh sách tin nhắn
│   │   ├── MessageItem.tsx     # Item tin nhắn
│   │   └── MessageInput.tsx    # Input gửi tin nhắn
│   ├── i18n/
│   │   └── index.ts            # Cấu hình đa ngôn ngữ
│   ├── App.tsx                 # Demo app
│   ├── embed.tsx               # Widget có thể nhúng
│   └── index.css               # Styles
├── dist/
│   └── chat-widget.umd.cjs    # File widget build
├── embed-demo.html          # Demo nhúng widget
└── README.md
```

## 🎯 Tính năng đã hoàn thành

✅ **Giao diện chat bubble** - Icon chat ở góc phải với animation
✅ **Popup chat** - Mở/đóng popup chat mượt mà  
✅ **Đa ngôn ngữ** - Hỗ trợ Tiếng Việt và English
✅ **Responsive** - Tối ưu cho mobile và desktop
✅ **Theme** - Hỗ trợ theme sáng/tối
✅ **API Integration** - Kết nối API để gửi/nhận tin nhắn
✅ **Widget nhúng** - Có thể nhúng vào website khác
✅ **Animation** - Hiệu ứng mượt mà với Tailwind CSS

## 🔧 Cách sử dụng

### 1. Trong React App

```tsx
import ChatWidget from './components/ChatWidget';

<ChatWidget 
  apiUrl="https://your-api.com/chat"
  language="vi"
  position="bottom-right"
  theme="light"
/>
```

### 2. Nhúng vào website khác

```html
<!-- Load React và ReactDOM -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Load Chat Widget -->
<script src="./dist/chat-widget.umd.cjs"></script>

<!-- Khởi tạo widget -->
<script>
window.initChatWidget({
  apiUrl: 'https://your-api.com/chat',
  language: 'vi',
  position: 'bottom-right',
  theme: 'light'
});
</script>
```

### 3. Sử dụng với data attributes

```html
<script 
  src="./dist/chat-widget.umd.cjs"
  data-chat-widget
  data-api-url="https://your-api.com/chat"
  data-language="vi"
  data-position="bottom-right"
  data-theme="light">
</script>
```

## 🌐 API Format

### Request
```json
POST /chat
{
  "message": "Tin nhắn của người dùng",
  "language": "vi"
}
```

### Response
```json
{
  "response": "Phản hồi từ bot"
}
```

## 🎨 Tùy chỉnh

### Thay đổi màu sắc
Chỉnh sửa `src/index.css`:

```css
.chat-bubble {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
}
```

### Thêm ngôn ngữ mới
Cập nhật `src/i18n/index.ts`:

```typescript
const resources = {
  vi: { /* Vietnamese */ },
  en: { /* English */ },
  fr: { /* French */ }
};
```

## 📱 Demo

1. Chạy `npm run dev` để xem demo React app
2. Mở `embed-demo.html` để xem demo nhúng widget
3. File `dist/chat-widget.umd.cjs` là widget có thể nhúng

## 🚀 Deploy

```bash
# Build widget
npm run build

# File widget sẽ được tạo ở dist/chat-widget.umd.cjs
# Upload file này lên CDN hoặc server của bạn
```

## 📞 Hỗ trợ

Nếu có vấn đề gì, hãy kiểm tra:
1. Console browser có lỗi không
2. API endpoint có hoạt động không  
3. File widget có load được không
4. React và ReactDOM có load trước widget không
