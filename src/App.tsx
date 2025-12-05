import ChatWidget from './components/ChatWidget';
import './i18n';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Demo Chat Widget
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Tính năng Chat Widget
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>Giao diện chat bubble ở góc phải</li>
              <li>Hỗ trợ đa ngôn ngữ (Tiếng Việt & English)</li>
              <li>Tích hợp API để gửi/nhận tin nhắn</li>
              <li>Responsive design cho mobile</li>
              <li>Có thể nhúng vào website khác</li>
              <li>Theme sáng/tối</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Hướng dẫn sử dụng
            </h3>
            <p className="text-blue-700">
              Click vào icon chat ở góc phải để bắt đầu trò chuyện. 
              Widget này có thể được nhúng vào bất kỳ website nào.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget 
        apiUrl="http://192.168.1.29/v1/chat-messages"
        apiKey="app-vvUMFFFEbmcCL2qwxeEYZ0AU"
        language="en"
        position="bottom-right"
        theme="light"
        userId="BaNaNe"
        conversationId=""
        welcomeMessage="Konnichiwa! Watashi wa AKB48 no chatbot desu. Go shitsumon ga arimasu ka?"
        title="AKB Chatbot"
        showIcon={true}
        fontSize="15px"
        chatboxWidth='500px'
        chatboxHeight='399px'
        titleHeight='55px'
        titleFontSize='15px'
        timeFontSize='20px'
        timeFontColor='white'
        timePosition='left'
        paddingChatbox='10px'
        mainColor='#ff4a4a'
        secondaryColor='violet'
        titleFontColor='white'
        subtitleFontColor='black'
        chatboxBackgroundBot='blueviolet'
        chatboxBackgroundUser='#61ffea'
        chatboxTextColorBot='white'
        chatboxTextColorUser='black'
      />
    </div>
  );
}

export default App
