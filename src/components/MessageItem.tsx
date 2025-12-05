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

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  theme = 'light',
  showIcon = false,
  botIcon = '',
  userIcon = '',
  fontSize = '',
  timeFontSize = '',
  timeFontColor = '',
  timePosition = 'right',
  chatboxBackgroundUser = '',
  chatboxBackgroundBot = '',
  chatboxBackgroundDarkUser = '',
  chatboxBackgroundDarkBot = '',
  chatboxTextColorUser = '',
  chatboxTextColorBot = '',
  chatboxTextColorDarkUser = '',
  chatboxTextColorDarkBot = '',
  paddingChatbox = '',
}) => {
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
  const textAlignUser: React.CSSProperties['textAlign'] = timePosition === 'left' ? 'left' : 'right';
  const textAlignBot: React.CSSProperties['textAlign'] = timePosition === 'left' ? 'right' : 'left';

  const timeStyle: React.CSSProperties = {
    ...(timeFontSize ? { fontSize: timeFontSize } : {}),
    ...(timeFontColor ? { color: timeFontColor } : {}),
    textAlign: textAlignUser,
  };

  const timeStyleBot: React.CSSProperties = {
    ...(timeFontSize ? { fontSize: timeFontSize } : {}),
    ...(timeFontColor ? { color: timeFontColor } : {}),
    textAlign: textAlignBot,
  };
  const isUser = message.isUser;
  const isDark = theme === 'dark';
  const chatboxStyle = {
    // Background
    ...(isUser
      ? (isDark
        ? (chatboxBackgroundDarkUser ? { backgroundColor: chatboxBackgroundDarkUser } : {})
        : (chatboxBackgroundUser ? { backgroundColor: chatboxBackgroundUser } : {})
      )
      : (isDark
        ? (chatboxBackgroundDarkBot ? { backgroundColor: chatboxBackgroundDarkBot } : {})
        : (chatboxBackgroundBot ? { backgroundColor: chatboxBackgroundBot } : {})
      )
    ),

    // Text color
    ...(isUser
      ? (isDark
        ? (chatboxTextColorDarkUser ? { color: chatboxTextColorDarkUser } : {})
        : (chatboxTextColorUser ? { color: chatboxTextColorUser } : {})
      )
      : (isDark
        ? (chatboxTextColorDarkBot ? { color: chatboxTextColorDarkBot } : {})
        : (chatboxTextColorBot ? { color: chatboxTextColorBot } : {})
      )
    ),

    // Padding
    ...(paddingChatbox ? { padding: paddingChatbox } : {})
  };

  return (
    <div className={`flex justify-start items-start ${message.isUser ? 'flex-row-reverse' : 'flex-row'} message-item gap-1 w-full`}>
      {showIcon && (
        <div className="flex items-center space-x-2 flex-shrink-0">
          <img src={message.isUser ? userIconSrc : botIconSrc} alt="Icon" className="w-9 h-9 rounded-full p-1 bg-gray-200" />
        </div>
      )}
      <div className="w-full">
        <div className={`
        messenge-context flex-1 w-full px-2 py-3 rounded-2xl
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
      `} style={chatboxStyle}>
          <div
            className="overflowContainer overflow-x-auto text-sm pre-line leading-relaxed"
            style={fontSizeStyle}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeRaw]}
              components={{
                li: ({ node, ...props }) => (
                  <li style={fontSizeStyle} {...props} />
                ),
                p: ({ node, ...props }) => (
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
        </div><p className={`
          text-xs time
          ${message.isUser ? 'text-gray-700' : (theme === 'dark' ? 'text-white' : 'text-gray-600')}
        `} style={message.isUser ? timeStyle : timeStyleBot}>
          {formatTime(message.timestamp)}
        </p></div>
    </div>
  );
};

export default MessageItem;
