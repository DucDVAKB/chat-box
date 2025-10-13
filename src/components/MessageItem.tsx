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
}

const MessageItem: React.FC<MessageItemProps> = ({ message, theme = 'light' }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} message-item`}>
      <div className={`
        max-w-xs lg:max-w-md px-4 py-3 rounded-2xl
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
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
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
