/**
 * Chat Widget Loader
 * Wrapper để load UMD bundle và expose function ra global scope
 */

(function() {
    console.log('[Loader] Starting chat widget loader...');
    
    // Load UMD file
    const script = document.createElement('script');
    script.src = './dist/chat-widget.umd.cjs';
    
    script.onload = function() {
        console.log('[Loader] UMD file loaded');
        console.log('[Loader] typeof ChatWidget:', typeof ChatWidget);
        console.log('[Loader] typeof window.initChatWidget:', typeof window.initChatWidget);
        
        // Đợi một chút để UMD code chạy xong
        setTimeout(() => {
            console.log('[Loader] After delay - typeof window.initChatWidget:', typeof window.initChatWidget);
            
            if (typeof window.initChatWidget === 'function') {
                console.log('[Loader] ✅ window.initChatWidget available!');
                window.dispatchEvent(new Event('chatWidgetReady'));
            } else {
                console.error('[Loader] ❌ window.initChatWidget not found!');
                console.log('[Loader] Available globals:', Object.keys(window).filter(k => k.includes('Chat') || k.includes('init')));
            }
        }, 100);
    };
    
    script.onerror = function() {
        console.error('[Loader] Failed to load UMD file');
    };
    
    document.head.appendChild(script);
})();
