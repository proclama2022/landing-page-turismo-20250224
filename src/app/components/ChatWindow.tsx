'use client';

import React, { useState, useEffect, useRef } from 'react';
import { IoMdClose, IoMdChatbubbles } from 'react-icons/io';
import { DifyService, ChatMessage, StreamChunk, SuggestedQuestionsResponse } from '@/services/difyApi';
import { IoSend } from 'react-icons/io5';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { FaLightbulb } from "react-icons/fa";

const difyService = new DifyService();

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Ciao! 👋 Sono l\'assistente virtuale del Bando Turismo Sicilia 2025. Posso aiutarti a:\n\n' +
          '• Verificare i requisiti di ammissibilità\n' +
          '• Capire gli investimenti finanziabili\n' +
          '• Calcolare il contributo ottenibile\n' +
          '• Conoscere scadenze e modalità di partecipazione\n\n' +
          'Come posso esserti utile oggi?',
  created_at: new Date().toISOString(),
};

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState<{[key: string]: 'like' | 'dislike'}>({});
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [lastMessageId, setLastMessageId] = useState<string>('');
  const [conversationId, setConversationId] = useState<string | undefined>();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Effetto per mostrare il chatbot dopo 30 secondi
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(true);
    }, 30000); // 30 secondi

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowInfo(false);
    localStorage.setItem('chatInteracted', 'true');
  };

  const handleChatButtonClick = () => {
    setIsOpen(!isOpen);
    setShowInfo(false);
    localStorage.setItem('chatInteracted', 'true');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showInfo && !isOpen && (
        <div className="chat-info-tooltip">
          <button 
            className="chat-info-close"
            onClick={handleClose}
            aria-label="Chiudi messaggio"
          >
            ×
          </button>
          <p>
            <strong>Hai domande sul Bando Turismo?</strong> Il nostro assistente virtuale è qui per aiutarti!
          </p>
        </div>
      )}

      {/* Chat button */}
      <button
        onClick={handleChatButtonClick}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-yellow-400 text-black shadow-xl hover:bg-yellow-500 flex items-center justify-center transition-all duration-300 transform ${isOpen ? 'rotate-180 scale-105' : 'animate__animated animate__pulse animate__infinite animate__slower'}`}
        aria-label={isOpen ? "Chiudi chat" : "Apri chat"}
        style={{boxShadow: '0 10px 25px -5px rgba(250, 204, 21, 0.5), 0 8px 10px -6px rgba(250, 204, 21, 0.3)'}}
      >
        {isOpen ? (
          <IoMdClose className="w-6 h-6 md:w-7 md:h-7" />
        ) : (
          <IoMdChatbubbles className="w-6 h-6 md:w-7 md:h-7" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] md:w-[400px] h-[80vh] md:h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-yellow-200 animate__animated animate__fadeInUp animate__faster"
          style={{
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div className="bg-yellow-400 px-4 py-3 flex items-center justify-between">
            <h3 className="text-black font-semibold">Assistente Bando Turismo</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-yellow-500 rounded-full transition-colors"
              aria-label="Chiudi chat"
            >
              <IoMdClose className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate__animated animate__fadeIn animate__faster`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'rounded-tr-none bg-gradient-to-br from-yellow-400 to-yellow-500 text-black font-medium shadow-md'
                      : 'rounded-tl-none bg-white text-gray-800 border border-gray-100 shadow-sm'
                  }`}
                >
                  <p 
                    className="text-sm whitespace-pre-wrap leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  />
                </div>
              </div>
            ))}
            {currentStreamingMessage && (
              <div className="flex justify-start animate__animated animate__fadeIn animate__faster">
                <div className="max-w-[85%] p-3 rounded-2xl rounded-tl-none bg-white text-gray-800 border border-gray-100 shadow-sm">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {currentStreamingMessage}
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-gray-100 bg-white p-3">
            <form onSubmit={(e) => {
              e.preventDefault();
              // Implementa qui la logica di invio messaggio
            }}>
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Scrivi un messaggio..."
                  className="flex-1 p-3 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="p-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors disabled:opacity-50"
                >
                  <IoSend className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow; 