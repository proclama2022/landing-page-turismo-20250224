'use client';

import { useEffect, useState } from 'react';

const DifyChat = () => {
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    // Configurazione del chatbot
    const script = document.createElement('script');
    script.innerHTML = `
      window.difyChatbotConfig = {
        token: 'y2gqAr3Jku0auMBL',
        baseUrl: 'https://dify-e9toe-u35360.vm.elestio.app'
      }
    `;
    document.head.appendChild(script);

    // Caricamento dello script del chatbot
    const chatbotScript = document.createElement('script');
    chatbotScript.src = 'https://dify-e9toe-u35360.vm.elestio.app/embed.min.js';
    chatbotScript.id = 'y2gqAr3Jku0auMBL';
    chatbotScript.defer = true;
    document.body.appendChild(chatbotScript);

    // Stili personalizzati
    const style = document.createElement('style');
    style.textContent = `
      .chat-info-tooltip {
        position: fixed;
        bottom: 100px;
        right: 20px;
        background-color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        max-width: 250px;
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
        border: 2px solid #EAB308;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .chat-info-tooltip p {
        margin: 0;
        font-size: 0.95rem;
        color: #1a1a1a;
        line-height: 1.4;
      }

      .chat-info-close {
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: #EAB308;
        border: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        color: black;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      #dify-chatbot-bubble-button {
        background-color: #EAB308 !important;
        transform: scale(1.1) !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
      }
      #dify-chatbot-bubble-button:hover {
        background-color: #CA8A04 !important;
        transform: scale(1.15) !important;
      }
      #dify-chatbot-bubble-window {
        width: 20rem !important;
        height: 32rem !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        border-radius: 12px !important;
        bottom: 80px !important;
      }
      .dify-chatbot-header {
        background-color: #EAB308 !important;
        color: black !important;
      }
      .dify-chatbot-message-actions button {
        background-color: #EAB308 !important;
        color: black !important;
        font-size: 0.9rem !important;
        padding: 0.4rem 0.8rem !important;
      }
      .dify-chatbot-message-actions button:hover {
        background-color: #CA8A04 !important;
      }
      .dify-chatbot-send-button {
        background-color: #EAB308 !important;
      }
      .dify-chatbot-send-button:hover {
        background-color: #CA8A04 !important;
      }
      .dify-chatbot-window {
        background-color: white !important;
      }
      .dify-chatbot-header-title {
        color: black !important;
      }
      .dify-chatbot-input {
        border-color: #EAB308 !important;
      }
      .dify-chatbot-input:focus {
        border-color: #CA8A04 !important;
        box-shadow: 0 0 0 2px rgba(234, 179, 8, 0.2) !important;
      }
      .dify-chatbot-message.assistant {
        background-color: rgba(234, 179, 8, 0.1) !important;
      }
      .dify-chatbot-try-ask button {
        color: #EAB308 !important;
      }
      .dify-chatbot-try-ask button:hover {
        color: #CA8A04 !important;
      }
      [class*="dify"] [style*="rgb(37, 99, 235)"],
      [class*="dify"] [style*="rgb(59, 130, 246)"],
      [class*="dify"] [style*="rgb(96, 165, 250)"] {
        background-color: #EAB308 !important;
        border-color: #EAB308 !important;
        color: black !important;
      }
    `;
    document.head.appendChild(style);

    // Timer per aprire il chatbot dopo 10 secondi
    const timer = setTimeout(() => {
      const bubbleButton = document.querySelector('#dify-chatbot-bubble-button');
      if (bubbleButton) {
        (bubbleButton as HTMLElement).click();
      }
    }, 10000);

    return () => {
      // Pulizia
      clearTimeout(timer);
      document.head.removeChild(script);
      if (chatbotScript.parentNode) {
        chatbotScript.parentNode.removeChild(chatbotScript);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <>
      {showInfo && (
        <div className="chat-info-tooltip">
          <button 
            className="chat-info-close"
            onClick={() => setShowInfo(false)}
            aria-label="Chiudi messaggio"
          >
            ×
          </button>
          <p>
            <strong>Hai domande sul Bando Turismo?</strong> Il nostro assistente virtuale è qui per aiutarti! Clicca sull'icona della chat per ricevere risposte immediate su requisiti, scadenze e modalità di partecipazione.
          </p>
        </div>
      )}
    </>
  );
};

export default DifyChat; 