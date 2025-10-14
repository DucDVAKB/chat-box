import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  vi: {
    translation: {
      chat: {
        title: 'Trò chuyện',
        placeholder: 'Nhập tin nhắn của bạn...',
        send: 'Gửi',
        typing: 'Đang nhập...',
        welcome: 'Xin chào! Tôi có thể giúp gì cho bạn?',
        error: 'Có lỗi xảy ra. Vui lòng thử lại.',
        close: 'Đóng',
        online: 'Trực tuyến'
      }
    }
  },
  en: {
    translation: {
      chat: {
        title: 'Chat',
        placeholder: 'Type your message...',
        send: 'Send',
        typing: 'Typing...',
        welcome: 'Hello! How can I help you?',
        error: 'Something went wrong. Please try again.',
        close: 'Close',
        online: 'Online'
      }
    }
  },
  jp: {
    translation: {
      chat: {
        title: 'チャット',
        placeholder: 'メッセージを入力してください...',
        send: '送信',
        typing: '入力中...',
        welcome: 'こんにちは！どのようにお手伝いしましょうか？',
        error: 'エラーが発生しました。もう一度お試しください。',
        close: '閉じる',
        online: 'オンライン'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
