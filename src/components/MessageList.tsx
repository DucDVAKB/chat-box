import React from 'react';
import MessageItem from './MessageItem';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  theme?: 'light' | 'dark';
  showIcon?: boolean;
  botIcon?: string;
  mainColor?: string;
  secondaryColor?: string;
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
  messagesEndRef?: React.RefObject<HTMLDivElement | null>;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isLoading, 
  theme = 'light', 
  showIcon = false, 
  botIcon = '', 
  mainColor = '', 
  secondaryColor = '', 
  userIcon = '', 
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
  messagesEndRef 
}) => {
  const colorStyle: React.CSSProperties = {
    ...(mainColor ? { "--scrollbar-color": mainColor } : {}),
    ...(secondaryColor ? { background: secondaryColor } : {})
  };
  return (
    <div className="message-container space-y-4 scroll-smooth custom-scrollbar" style={colorStyle}>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          theme={theme}
          showIcon={showIcon}
          botIcon={botIcon}
          userIcon={userIcon}
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
      ))}
      {isLoading && (
        <div className="flex items-start space-x-3 message-item">
          <div className="message-bubble bg-[#B8D4E8] rounded-2xl rounded-bl-md px-4 py-3 shadow-md">
            <div className="flex space-x-1.5">
              <div className="loading-dot w-1.5 h-1.5 bg-[#A7C7E7] rounded-full animate-bounce"></div>
              <div className="loading-dot w-1.5 h-1.5 bg-[#A7C7E7] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="loading-dot w-1.5 h-1.5 bg-[#A7C7E7] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
