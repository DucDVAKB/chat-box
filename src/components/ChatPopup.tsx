import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatPopupProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onClose: () => void;
  refreshConversation: () => void;
  theme?: 'light' | 'dark';
  subtitle?: string;
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
  position?: 'bottom-right' | 'bottom-left';
}

const ChatPopup: React.FC<ChatPopupProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onClose,
  refreshConversation,
  theme = 'light',
  subtitle = '',
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
  position = 'bottom-right',
}) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // State và refs cho resize
  const [width, setWidth] = useState(() => {
    if (chatboxWidth) {
      const numValue = parseInt(chatboxWidth);
      return isNaN(numValue) ? 400 : numValue;
    }
    return 400;
  });
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Effect để khởi tạo width từ prop
  useEffect(() => {
    if (chatboxWidth) {
      const numValue = parseInt(chatboxWidth);
      if (!isNaN(numValue)) {
        setWidth(numValue);
      }
    }
  }, [chatboxWidth]);

  // Handlers cho resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !chatboxRef.current) return;
      
      let newWidth: number;
      const deltaX = e.clientX - startX;
      
      // Nếu chat box ở góc phải, resize từ bên trái
      // Kéo sang trái (deltaX < 0) → tăng độ rộng
      // Kéo sang phải (deltaX > 0) → giảm độ rộng
      if (position === 'bottom-right') {
        newWidth = startWidth - deltaX;
      } else {
        // Nếu chat box ở góc trái, resize từ bên phải
        // Kéo sang phải (deltaX > 0) → tăng độ rộng
        // Kéo sang trái (deltaX < 0) → giảm độ rộng
        newWidth = startWidth + deltaX;
      }
      
      // Giới hạn độ rộng tối thiểu và tối đa
      const minWidth = 399;
      const maxWidth = window.innerWidth - 50;
      
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      } else if (newWidth < minWidth) {
        setWidth(minWidth);
      } else if (newWidth > maxWidth) {
        setWidth(maxWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (chatboxRef.current) {
      setStartX(e.clientX);
      setStartWidth(width);
      setIsResizing(true);
    }
  };

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      onSendMessage(text);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };
  const chatboxStyle = {
    width: `${width}px`,
    ...(chatboxHeight ? { height: `${chatboxHeight}` } : {}),
    ...(secondaryColor ? { background: `${secondaryColor}` } : {}),
    position: 'relative' as const
  };

  const titleStyle = {
    ...(mainColor ? { background: `${mainColor}` } : {}),
    ...(titleHeight ? { height: `${titleHeight}` } : {}),
  };
  const titleTextStyle = {
    ...(titleFontSize ? { fontSize: `${titleFontSize}` } : {}),
    ...(titleFontColor ? { color: `${titleFontColor}` } : {}),
  };
    const subtitleTextStyle = {
    ...(subtitleFontSize ? { fontSize: `${subtitleFontSize}` } : {}),
    ...(subtitleFontColor ? { color: `${subtitleFontColor}` } : {}),
  };
  

  return (
    <div 
      ref={chatboxRef}
      className={`
        chat-popup animate-slide-up
        ${theme === 'dark' ? 'dark-theme text-white' : 'bg-white text-gray-900'}
        flex flex-col justify-between h-full
      `} 
      style={chatboxStyle}
    >
      {/* Resize Handle - Đặt ở phía đối diện với góc màn hình */}
      <div
        ref={resizeHandleRef}
        onMouseDown={handleResizeStart}
        className={`
          absolute top-0 w-1 h-full cursor-ew-resize z-50
          hover:bg-blue-400/50 transition-colors duration-200
          ${isResizing ? 'bg-blue-100' : 'bg-transparent'}
          ${position === 'bottom-right' ? 'left-0' : 'right-0'}
        `}
        style={{
          touchAction: 'none'
        }}
        title="Kéo để thay đổi độ rộng"
      />
      {/* Header */}
      <div className={`
        chat-header
        flex items-center justify-between p-4 shadow-md
      `} style={titleStyle}>
        <div className="flex items-center space-x-3 gap-2">
          <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-white/30">
            <svg className="w-4 h-4 p-0 text-white" fill="currentColor" viewBox="0 0 20 20" style={titleTextStyle}>
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-base text-white m-0 title"  style={titleTextStyle}>{title ? title : t('chat.title')}</h3>
            <div className="flex items-center space-x-1 m-0 subtitle">
              <p className="text-xs text-white/90" style={subtitleTextStyle}>{subtitle ? subtitle : t('chat.subtitle')}</p>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={refreshConversation}
            className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 text-white"
            aria-label={t('chat.close')}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={titleTextStyle}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114.9-2M20 14a8 8 0 01-14.9 2"
              />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 text-white"
            aria-label={t('chat.close')}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={titleTextStyle}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <MessageList
        mainColor={mainColor}
        secondaryColor={secondaryColor}
        messages={messages}
        isLoading={isLoading}
        theme={theme}
        showIcon={showIcon}
        botIcon={botIcon}
        userIcon={userIcon}
        messagesEndRef={messagesEndRef}
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
      />

      {/* Input */}
      <div className={`
        chat-input px-4 backdrop-blur-sm
        ${theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'}
      `}>
        <MessageInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          onKeyPress={handleKeyPress}
          placeholder={t('chat.placeholder')}
          disabled={isLoading}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default ChatPopup;
