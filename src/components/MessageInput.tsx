import React from 'react';
import { useTranslation } from 'react-i18next';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (text: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  placeholder: string;
  disabled?: boolean;
  theme?: 'light' | 'dark';
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  onKeyPress,
  placeholder,
  disabled = false,
  theme = 'light'
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={`
            w-full px-4 py-3 border-2 rounded-xl resize-none
            focus:outline-none focus:ring-2 focus:ring-[#A7C7E7] focus:border-transparent
            transition-all duration-200 mt-[6px]
            ${theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          style={{ minHeight: '44px', maxHeight: '120px' }}
        />
      </div>
      <button
        onClick={() => onSend(value)}
        disabled={disabled || !value.trim()}
        className={`
          p-3 rounded-xl transition-all duration-200 shadow-md flex-shrink-0 h-[44px] w-[44px] flex items-center justify-center
          ${disabled || !value.trim()
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
            : theme === 'dark'
            ? 'bg-[#B8D4E8] hover:bg-[#A7C7E7] text-gray-800 hover:shadow-lg hover:scale-105 active:scale-95'
            : 'bg-[#A7C7E7] hover:bg-[#8FB5D6] text-gray-800 hover:shadow-lg hover:scale-105 active:scale-95'
          }
        `}
        aria-label={t('chat.send')}
      >
        <svg 
          className="w-5 h-5 rotate-90" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
          />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
