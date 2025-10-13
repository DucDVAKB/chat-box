import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ChatBubble from './ChatBubble';
import ChatPopup from './ChatPopup';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWidgetProps {
  apiUrl?: string;
  apiKey?: string;
  language?: 'vi' | 'en';
  position?: 'bottom-right' | 'bottom-left';
  theme?: 'light' | 'dark';
  userId?: string;
  conversationId?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  apiUrl = 'http://192.168.1.29/v1/chat-messages',
  apiKey = '',
  language = 'vi',
  position = 'bottom-right',
  theme = 'light',
  userId = 'user-' + Date.now(),
  conversationId: initialConversationId = ''
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(initialConversationId);

  // Set language
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Add welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Thêm Authorization header nếu có apiKey
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          inputs: {},
          query: text.trim(),
          response_mode: 'blocking',
          conversation_id: conversationId,
          user: userId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Lưu conversation_id từ response để sử dụng cho các request tiếp theo
      if (data.conversation_id) {
        setConversationId(data.conversation_id);
        console.log('Conversation ID:', data.conversation_id);
      }
      
      // Xử lý response từ API
      const botResponse = data.answer || data.message || data.response || 'Xin lỗi, tôi không thể trả lời ngay bây giờ.';
      
      const botMessage: Message = {
        id: data.message_id || (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Có lỗi xảy ra. Vui lòng thử lại.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chat-widget-container ${position === 'bottom-left' ? 'left-5' : 'right-5'}`}>
      <ChatBubble 
        isOpen={isOpen} 
        onClick={toggleChat}
        theme={theme}
      />
      {isOpen && (
        <ChatPopup
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
          onClose={() => setIsOpen(false)}
          theme={theme}
        />
      )}
    </div>
  );
};

export default ChatWidget;
