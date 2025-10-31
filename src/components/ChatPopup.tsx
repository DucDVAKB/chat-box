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
  status?: boolean;
  title?: string;
  showIcon?: boolean;
  botIcon?: string;
  userIcon?: string;
  chatboxWidth?: string;
  chatboxHeight?: string;
  fontSize?: string;
}

const ChatPopup: React.FC<ChatPopupProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onClose,
  refreshConversation,
  theme = 'light',
  status = true,
  title = '',
  showIcon = false,
  botIcon = '',
  userIcon = '',
  chatboxWidth = '',
  chatboxHeight = '',
  fontSize = '',
}) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    ...(chatboxWidth ? { width: `${chatboxWidth}` } : {}),
    ...(chatboxHeight ? { height: `${chatboxHeight}` } : {})
  };

  return (
    <div className={`
      chat-popup animate-slide-up
      ${theme === 'dark' ? 'dark-theme text-white' : 'bg-white text-gray-900'}
      flex flex-col justify-between h-full
    `} style={chatboxStyle}>
      {/* Header */}
      <div className={`
        chat-header
        flex items-center justify-between p-4 shadow-md
      `}>
        <div className="flex items-center space-x-3 gap-2">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-white/30">
            <svg className="w-8 h-8 p-0 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex ">
            <h3 className="font-semibold text-base text-white m-0">{title ? title : t('chat.title')}</h3>
            {status && (<div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-xs text-white/90">{t('chat.online')}</p>
            </div>)}
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
        messages={messages}
        isLoading={isLoading}
        theme={theme}
        showIcon={showIcon}
        botIcon={botIcon}
        userIcon={userIcon}
        messagesEndRef={messagesEndRef}
        fontSize={fontSize}
      />

      {/* Input */}
      <div className={`
        chat-input px-4 border-t backdrop-blur-sm
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
