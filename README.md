# Chat Widget Demo

Một chat widget có thể nhúng vào website với React + Vite + Tailwind CSS, hỗ trợ đa ngôn ngữ và có thể tùy chỉnh.

## Tính năng

- 🎨 Giao diện chat bubble đẹp mắt ở góc phải
- 🌍 Hỗ trợ đa ngôn ngữ (Tiếng Việt & English)
- 📱 Responsive design cho mobile
- 🎨 Theme sáng/tối
- 🔌 Dễ dàng nhúng vào website khác
- ⚡ Tích hợp API để gửi/nhận tin nhắn
- 🎭 Animation mượt mà

## Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd chatbox-demo

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

## Sử dụng

### 1. Sử dụng trong React App

```tsx
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      <ChatWidget 
        apiUrl="https://your-api.com/chat"
        language="vi"
        position="bottom-right"
        theme="light"
      />
    </div>
  );
}
```

### 2. Nhúng vào website khác

#### Cách 1: Sử dụng script tag

```html
<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
</head>
<body>
  <!-- Your website content -->
  
  <!-- Chat Widget -->
  <script 
    src="path/to/chat-widget.umd.js"
    data-chat-widget
    data-api-url="https://your-api.com/chat"
    data-language="vi"
    data-position="bottom-right"
    data-theme="light">
  </script>
</body>
</html>
```

#### Cách 2: Sử dụng JavaScript API

```html
<script src="path/to/chat-widget.umd.js"></script>
<script>
  window.initChatWidget({
    apiUrl: 'https://your-api.com/chat',
    language: 'vi',
    position: 'bottom-right',
    theme: 'light'
  });
</script>
```

## API Configuration

### ChatWidget Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiUrl` | string | `'https://api.example.com/chat'` | URL của API endpoint |
| `language` | `'vi' \| 'en'` | `'vi'` | Ngôn ngữ hiển thị |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Vị trí chat bubble |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme giao diện |

### API Endpoint Format

API endpoint cần nhận POST request với format:

```json
{
  "message": "Tin nhắn của người dùng",
  "language": "vi"
}
```

Và trả về response:

```json
{
  "response": "Phản hồi từ bot"
}
```

## Tùy chỉnh

### Thay đổi màu sắc

Chỉnh sửa file `src/index.css` để thay đổi màu sắc:

```css
.chat-bubble {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
}
```

### Thêm ngôn ngữ mới

1. Cập nhật file `src/i18n/index.ts`:

```typescript
const resources = {
  vi: { /* Vietnamese translations */ },
  en: { /* English translations */ },
  fr: { /* French translations */ }
};
```

2. Cập nhật type definition trong ChatWidget:

```typescript
language?: 'vi' | 'en' | 'fr';
```

## Development

```bash
# Chạy development server
npm run dev

# Build widget
npm run build

# Preview build
npm run preview
```

## License

MIT License