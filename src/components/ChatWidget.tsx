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
  language?: 'vi' | 'en' | 'jp';
  position?: 'bottom-right' | 'bottom-left';
  theme?: 'light' | 'dark';
  userId?: string;
  conversationId?: string;
  welcomeMessage?: string;
  status?: boolean;
  title?: string;
  titleFontSize?: string;
  mainColor?: string;
  secondaryColor?: string;
  titleFontColor?: string;
  titleHeight?: string;
  subtitleFontSize?: string;
  subtitleFontColor?: string;
  showIcon?: boolean;
  botIcon?: string;
  userIcon?: string;
  chatboxWidth?: string;
  chatboxHeight?: string;
  fontSize?: string;
  positionLeft?: string;
  positionRight?: string;
  positionTop?: string;
  positionBottom?: string;
  timeFontSize?: string;
  timeFontColor?: string;
  timePosition?: 'left' | 'right';
  chatboxBackgroundUser?: string;
  chatboxBackgroundBot?: string;
  chatboxBackgroundDarkUser?: string;
  chatboxBackgroundDarkBot?: string;
  chatboxTextColorUser?: string;
  chatboxTextColorBot?: string;
  chatboxTextColorDarkUser?: string;
  chatboxTextColorDarkBot?: string;
  paddingChatbox?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  apiUrl = 'http://192.168.1.29/v1/chat-messages',
  apiKey = '',
  language = 'en',
  position = 'bottom-right',
  theme = 'light',
  userId = 'user-' + Date.now(),
  conversationId: initialConversationId = '',
  welcomeMessage = '',
  status = true,
  title = '',
  titleFontSize = '',
  mainColor = '',
  secondaryColor = '',
  titleFontColor = '',
  titleHeight = '',
  subtitleFontSize = '',
  subtitleFontColor = '',
  showIcon = false,
  botIcon = '',
  userIcon = '',
  chatboxWidth = '',
  chatboxHeight = '',
  fontSize = '',
  positionLeft = '',
  positionRight = '',
  positionTop = '',
  positionBottom = '',
  timeFontSize= '',
  timeFontColor= '',
  timePosition= 'right',
  chatboxBackgroundUser= '',
  chatboxBackgroundBot= '',
  chatboxBackgroundDarkUser= '',
  chatboxBackgroundDarkBot= '',
  chatboxTextColorUser= '',
  chatboxTextColorBot= '',
  chatboxTextColorDarkUser= '',
  chatboxTextColorDarkBot= '',
  paddingChatbox= '',
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
      const welcomeMessageData: Message = {
        id: 'welcome',
        text: welcomeMessage ? welcomeMessage : i18n.t('chat.welcome'),
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessageData]);
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
        text: i18n.t('chat.error'),
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
  const positionStyle = {
    ...(positionLeft ? { left: `${positionLeft}` } : {}),
    ...(positionRight ? { right: `${positionRight}` } : {}),
    ...(positionTop ? { top: `${positionTop}` } : {}),
    ...(positionBottom ? { bottom: `${positionBottom}` } : {}),
  };

  return (
    <div className={`chat-widget-container ${position === 'bottom-left' ? 'left-5' : 'right-5'}`} style={positionStyle}>
      <ChatBubble
        isOpen={isOpen}
        onClick={toggleChat}
        theme={theme}
        mainColor={mainColor}
      />
      {isOpen && (
        <ChatPopup
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
          onClose={() => setIsOpen(false)}
          refreshConversation={() => {
            setMessages([{
              id: 'welcome',
              text: welcomeMessage ? welcomeMessage : i18n.t('chat.welcome'),
              isUser: false,
              timestamp: new Date()
            }]);
            setConversationId('');
          }}
          theme={theme}
          status={status}
          title={title}
          titleFontSize={titleFontSize}
          mainColor={mainColor}
          secondaryColor={secondaryColor}
          titleFontColor={titleFontColor}
          titleHeight={titleHeight}
          subtitleFontSize={subtitleFontSize}
          subtitleFontColor={subtitleFontColor}
          showIcon={showIcon}
          botIcon={botIcon}
          userIcon={userIcon}
          chatboxWidth={chatboxWidth}
          chatboxHeight={chatboxHeight}
          fontSize={fontSize}
          timeFontSize={timeFontSize}
          timeFontColor={timeFontColor}
          timePosition={timePosition}
          chatboxBackgroundUser={chatboxBackgroundUser}
          chatboxBackgroundBot={chatboxBackgroundBot}
          chatboxBackgroundDarkUser={chatboxBackgroundDarkUser}
          chatboxBackgroundDarkBot={chatboxBackgroundDarkBot}
          chatboxTextColorUser={chatboxTextColorUser}
          chatboxTextColorBot={chatboxTextColorBot}
          chatboxTextColorDarkUser={chatboxTextColorDarkUser}
          chatboxTextColorDarkBot={chatboxTextColorDarkBot}
          paddingChatbox={paddingChatbox}
          position={position}
        />
      )}
    </div>
  );
};

export default ChatWidget;
