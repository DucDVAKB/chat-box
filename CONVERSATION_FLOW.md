# Conversation Flow - Cách hoạt động của Conversation ID

## 📋 Tổng quan

Chat widget sử dụng `conversation_id` để duy trì ngữ cảnh cuộc trò chuyện giữa người dùng và chatbot. Mỗi cuộc hội thoại có một ID duy nhất được API trả về và được sử dụng cho các tin nhắn tiếp theo.

## 🔄 Luồng hoạt động

### **1. Tin nhắn đầu tiên (không có conversation_id)**

**Request gửi lên:**
```json
{
  "inputs": {},
  "query": "Xin chào",
  "response_mode": "blocking",
  "conversation_id": "",
  "user": "user-1234567890"
}
```

**Response nhận về:**
```json
{
  "event": "message",
  "task_id": "3ab5e955-e8aa-4afe-bfca-1ab7f4670d7d",
  "id": "d81e5c0c-f09a-4e7f-b556-7f060564012a",
  "message_id": "d81e5c0c-f09a-4e7f-b556-7f060564012a",
  "conversation_id": "360fb978-f2ea-4940-a5b5-7cb6b55c3053",
  "mode": "advanced-chat",
  "answer": "Xin chào! Tôi có thể giúp gì cho bạn?",
  "metadata": {
    "retriever_resources": [...],
    "usage": {...}
  },
  "created_at": 1760081704
}
```

**Widget lưu conversation_id:**
```typescript
if (data.conversation_id) {
  setConversationId(data.conversation_id);
  // conversation_id = "360fb978-f2ea-4940-a5b5-7cb6b55c3053"
}
```

---

### **2. Tin nhắn tiếp theo (có conversation_id)**

**Request gửi lên:**
```json
{
  "inputs": {},
  "query": "Cho tôi biết thêm thông tin",
  "response_mode": "blocking",
  "conversation_id": "360fb978-f2ea-4940-a5b5-7cb6b55c3053",
  "user": "user-1234567890"
}
```

**Response nhận về:**
```json
{
  "event": "message",
  "message_id": "a92f3c1d-8e4b-4f2a-9d5e-6c7b8a9d0e1f",
  "conversation_id": "360fb978-f2ea-4940-a5b5-7cb6b55c3053",
  "answer": "Đây là thông tin chi tiết...",
  ...
}
```

---

## 💻 Implementation trong ChatWidget

### **State Management:**

```typescript
const [conversationId, setConversationId] = useState(initialConversationId);
```

### **Gửi request với conversation_id:**

```typescript
const response = await fetch(apiUrl, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    inputs: {},
    query: text.trim(),
    response_mode: 'blocking',
    conversation_id: conversationId, // Sử dụng conversation_id đã lưu
    user: userId
  })
});
```

### **Lưu conversation_id từ response:**

```typescript
const data = await response.json();

// Lưu conversation_id từ response để sử dụng cho các request tiếp theo
if (data.conversation_id) {
  setConversationId(data.conversation_id);
  console.log('Conversation ID:', data.conversation_id);
}
```

---

## 🎯 Lợi ích của việc sử dụng conversation_id

1. **Duy trì ngữ cảnh:** Chatbot nhớ được nội dung cuộc trò chuyện trước đó
2. **Trả lời chính xác hơn:** Bot có thể tham chiếu đến các câu hỏi/câu trả lời trước
3. **Trải nghiệm tự nhiên:** Người dùng không cần lặp lại thông tin
4. **Theo dõi cuộc hội thoại:** Có thể xem lại lịch sử chat qua conversation_id

---

## 📊 Response Data Structure

### **Các trường quan trọng:**

| Field | Type | Description |
|-------|------|-------------|
| `conversation_id` | string | ID duy nhất của cuộc hội thoại |
| `message_id` | string | ID của tin nhắn hiện tại |
| `answer` | string | Câu trả lời từ chatbot |
| `metadata.retriever_resources` | array | Tài liệu tham khảo được sử dụng |
| `created_at` | number | Timestamp tạo tin nhắn |

### **Xử lý answer:**

```typescript
const botResponse = data.answer || data.message || data.response || 'Xin lỗi, tôi không thể trả lời ngay bây giờ.';
```

---

## 🔧 Cách sử dụng

### **1. Trong React App:**

```tsx
<ChatWidget 
  apiUrl=""
  apiKey=""
  language="vi"
  userId="user-123"
  conversationId="" // Để trống cho cuộc hội thoại mới
/>
```

### **2. Nhúng vào website:**

```javascript
window.initChatWidget({
  apiUrl: '',
  apiKey: '',
  language: 'vi',
  userId: 'user-123',
  conversationId: '' // Widget tự động quản lý conversation_id
});
```

---

## 🐛 Debug

Để theo dõi conversation_id, mở Console trong DevTools:

```
Conversation ID: 360fb978-f2ea-4940-a5b5-7cb6b55c3053
```

Mỗi khi có response mới, conversation_id sẽ được log ra console.

---

## 📝 Notes

- Conversation ID được tự động lưu sau tin nhắn đầu tiên
- Mỗi session chat có một conversation_id riêng
- Nếu refresh trang, conversation_id sẽ reset (bắt đầu cuộc hội thoại mới)
- Để tiếp tục cuộc hội thoại cũ, cần lưu conversation_id vào localStorage hoặc database
