import React from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageItemProps {
  message: Message;
  theme?: 'light' | 'dark';
  showIcon?: boolean;
  botIcon?: string;
  userIcon?: string;
  fontSize?: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, theme = 'light', showIcon = false, botIcon = '', userIcon = '', fontSize = '' }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  const userIconDefault = `user-icon.png`;
  const botIconDefault = `bot-icon.png`;
  const fontSizeStyle = fontSize ? { fontSize: fontSize } : {};

  return (
    <div className={`flex justify-start items-start ${message.isUser ? 'flex-row-reverse' : 'flex-row'} message-item gap-1`}>
      {showIcon && (
        <div className="flex items-center space-x-2 flex-shrink-0">
          <img src={message.isUser ? (userIcon ? userIcon : userIconDefault) : (botIcon ? botIcon : botIconDefault )} alt="Icon" className="w-9 h-9 rounded-full p-1 bg-gray-200" />
        </div>
      )}
      <div className={`
        messenge-context flex-1 max-w-xs lg:max-w-md px-2 py-3 rounded-2xl
        ${message.isUser 
          ? (theme === 'dark' 
              ? 'bg-[#B8D4E8] text-gray-800' 
              : 'bg-[#A7C7E7] text-gray-800')
          : (theme === 'dark' 
              ? 'bg-gray-700 text-white' 
              : 'bg-[#F5E6D3] text-gray-800')
        }
        ${message.isUser ? 'rounded-br-md' : 'rounded-bl-md'}
        shadow-md hover:shadow-lg transition-shadow duration-200
      `}>
        <p className="text-sm whitespace-pre-wrap leading-relaxed" style={fontSizeStyle}>{message.text}</p>
        <p className={`
          text-xs mt-1.5 opacity-60
          ${message.isUser ? 'text-gray-700' : 'text-gray-600'}
        `}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
