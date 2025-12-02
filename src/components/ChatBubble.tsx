import React from 'react';

interface ChatBubbleProps {
  isOpen: boolean;
  onClick: () => void;
  theme?: 'light' | 'dark';
  mainColor?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ isOpen, onClick, theme = 'light', mainColor='' }) => {
  const colorStyle = {...(mainColor ? { background: mainColor } : {})};
  return (
    <button
      onClick={onClick}
      className={`
        chat-bubble flex items-center justify-center cursor-pointer
        ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-500 hover:bg-blue-600'}
        ${isOpen ? 'animate-bounce-in' : 'animate-fade-in'}
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-blue-300
      `}
      style={colorStyle}
      aria-label="Mở chat"
    >
      {isOpen ? (
        <svg 
          className="w-6 h-6 text-white" 
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
      ) : (
        <svg 
          className="w-6 h-6 text-white" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" 
            clipRule="evenodd" 
          />
        </svg>
      )}
    </button>
  );
};

export default ChatBubble;
