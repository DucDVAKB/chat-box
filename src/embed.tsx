import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './components/ChatWidget';
import './i18n';
import './index.css'; // Import CSS để bundle vào
import './App.css'; // Import CSS để bundle vào

// Widget configuration interface
interface WidgetConfig {
  apiUrl?: string;
  apiKey?: string;
  language?: 'vi' | 'en' | 'jp';
  position?: 'bottom-right' | 'bottom-left';
  theme?: 'light' | 'dark';
  containerId?: string;
  userId?: string;
  conversationId?: string;
  title?: string;
  status?: boolean;
  welcomeMessage?: string;
  showIcon?: boolean;
  botIcon?: string;
  userIcon?: string;
  fontSize?: string;
  chatboxWidth?: string;
  chatboxHeight?: string;
  color?: string;
  positionLeft?: string;
  positionRight?: string;
  positionTop?: string;
  positionBottom?: string;
}

// Global function to initialize the chat widget
declare global {
  interface Window {
    initChatWidget: (config?: WidgetConfig) => void;
  }
}

const initChatWidget = (config: WidgetConfig = {}) => {
  const {
    apiUrl = 'http://192.168.1.29/v1/chat-messages',
    apiKey = '',
    language = 'vi',
    position = 'bottom-right',
    theme = 'light',
    containerId = 'chat-widget-container',
    userId = 'user-' + Date.now(),
    conversationId = '',
    welcomeMessage = '',
    status = true,
    title = '',
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
  } = config;

  // Check if container already exists
  let container = document.getElementById(containerId);
  
  if (!container) {
    // Create container if it doesn't exist
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
  }

  // Clear existing content
  container.innerHTML = '';

  // Create React root and render widget
  const root = ReactDOM.createRoot(container);
  root.render(
    React.createElement(ChatWidget, {
      apiUrl,
      apiKey,
      language,
      position,
      theme,
      userId,
      conversationId,
      welcomeMessage,
      status,
      title,
      showIcon,
      botIcon,
      userIcon,
      chatboxWidth,
      chatboxHeight,
      fontSize,
      positionLeft,
      positionRight,
      positionTop,
      positionBottom,

    })
  );
};

// Make function available globally IMMEDIATELY
if (typeof window !== 'undefined') {
  (window as any).initChatWidget = initChatWidget;
  console.log('[ChatWidget] initChatWidget exposed to window');
  
  // Auto-initialize if script is loaded with data attributes
  if (typeof document !== 'undefined') {
    const checkAndInit = () => {
      const script = document.querySelector('script[data-chat-widget]');
      if (script) {
        const config: WidgetConfig = {
          apiUrl: script.getAttribute('data-api-url') || undefined,
          apiKey: script.getAttribute('data-api-key') || undefined,
          language: (script.getAttribute('data-language') as 'vi' | 'en' | 'jp') || 'vi',
          position: (script.getAttribute('data-position') as 'bottom-right' | 'bottom-left') || 'bottom-right',
          theme: (script.getAttribute('data-theme') as 'light' | 'dark') || 'light',
          userId: script.getAttribute('data-user-id') || undefined,
          conversationId: script.getAttribute('data-conversation-id') || undefined,
          welcomeMessage: script.getAttribute('data-wecome-message') || undefined,
          status: script.getAttribute('data-status') === 'true' || true,
          title: script.getAttribute('data-title') || undefined,
          showIcon: script.getAttribute('data-show-icon') === 'true' || false,
          botIcon: script.getAttribute('data-bot-icon') || undefined,
          userIcon: script.getAttribute('data-user-icon') || undefined,
          chatboxWidth: script.getAttribute('data-chatbox-width') || undefined,
          chatboxHeight: script.getAttribute('data-chatbox-height') || undefined,
          fontSize: script.getAttribute('data-font-size') || undefined,
          positionLeft: script.getAttribute('data-position-left') || undefined,
          positionRight: script.getAttribute('data-position-right') || undefined,
          positionTop: script.getAttribute('data-position-top') || undefined,
          positionBottom: script.getAttribute('data-position-bottom') || undefined,
        };
        initChatWidget(config);
      }
    };
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkAndInit);
    } else {
      checkAndInit();
    }
  }
}

// Export as default for UMD
export default initChatWidget;
