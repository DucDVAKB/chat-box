import React from 'react';
import userIconDefault from '../../public/user-icon.png';
import botIconDefault from '../../public/bot-icon.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';



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

  // dùng import để bundler cung cấp đường dẫn chính xác sau build
  const userIconSrc = userIcon || userIconDefault;
  const botIconSrc = botIcon || botIconDefault;
  const fontSizeStyle = fontSize ? { fontSize: fontSize, lineHeight: fontSize } : {};

  return (
    <div className={`flex justify-start items-start ${message.isUser ? 'flex-row-reverse' : 'flex-row'} message-item gap-1`}>
      {showIcon && (
        <div className="flex items-center space-x-2 flex-shrink-0">
          <img src={message.isUser ? userIconSrc : botIconSrc} alt="Icon" className="w-9 h-9 rounded-full p-1 bg-gray-200" />
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
        <div
          className="overflowContainer overflow-x-auto text-sm pre-line leading-relaxed"
          style={fontSizeStyle}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeRaw]}
            components={{
              li: ({node, ...props}) => (
                <li style={fontSizeStyle} {...props} />
              ),
              p: ({node, ...props}) => (
                <p style={fontSizeStyle} {...props} />
              ),
              table: (props) => (
                <table className="customTable min-w-full border border-gray-400 border-collapse my-2" {...props} />
              ),
              th: (props) => (
                <th className="customTh border border-gray-400 px-1 py-1 font-semibold" {...props} />
              ),
              td: (props) => (
                <td className="customTd border border-gray-400 px-1 py-1" {...props} />
              ),
            }}
          >
            {message.text.trim()}
          </ReactMarkdown>
        </div>
        <p className={`
          text-xs mt-1.5 opacity-60
          ${message.isUser ? 'text-gray-700' : (theme === 'dark' ? 'text-white' : 'text-gray-600')}
        `}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
