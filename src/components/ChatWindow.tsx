'use client';

import { useState, useRef, useEffect } from 'react';
import { DifyService, ChatMessage, StreamChunk, SuggestedQuestionsResponse } from '@/services/difyApi';
import { IoSend } from 'react-icons/io5';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { IoMdChatbubbles, IoMdClose } from 'react-icons/io';
import { FaLightbulb } from "react-icons/fa";

const difyService = new DifyService();

// Component for suggested questions
interface SuggestedQuestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ questions, onSelectQuestion }) => {
  if (!questions || questions.length === 0) return null;
  
  return (
    <div className="mt-3 space-y-2 animate__animated animate__fadeIn">
      <div className="flex items-center gap-1.5 text-xs text-yellow-700 mb-2">
        <FaLightbulb className="text-yellow-500" />
        <span>Domande suggerite</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(question)}
            className="px-3 py-1.5 text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-full transition-colors shadow-sm"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

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

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages');
      return savedMessages ? JSON.parse(savedMessages) : [WELCOME_MESSAGE];
    }
    return [WELCOME_MESSAGE];
  });
  const [conversationId, setConversationId] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('conversationId') || undefined;
    }
    return undefined;
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState<{[key: string]: 'like' | 'dislike'}>({});
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [lastMessageId, setLastMessageId] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, currentStreamingMessage, isOpen]);

  // Additional scrollToBottom with delay after opening
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(scrollToBottom, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Fetch suggested questions when lastMessageId changes
  useEffect(() => {
    const fetchSuggestedQuestions = async () => {
      if (lastMessageId && lastMessageId !== 'welcome') {
        try {
          const response = await difyService.getSuggestedQuestions(lastMessageId);
          if (response && response.data && response.data.length > 0) {
            setSuggestedQuestions(response.data);
          } else {
            setSuggestedQuestions([]);
          }
        } catch (error) {
          console.error('Error fetching suggested questions:', error);
          setSuggestedQuestions([]);
        }
      }
    };

    fetchSuggestedQuestions();
  }, [lastMessageId]);
  
  // Salva i messaggi nel localStorage quando cambiano
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Salva il conversationId nel localStorage quando cambia
  useEffect(() => {
    if (typeof window !== 'undefined' && conversationId) {
      localStorage.setItem('conversationId', conversationId);
    }
  }, [conversationId]);

  // Aggiungi la funzione openFormModal alla window
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).openFormModal = () => {
        // Dispatch dell'evento custom per aprire la modal
        const event = new CustomEvent('openFormModal');
        window.dispatchEvent(event);
      };
    }
    
    return () => {
      // Rimuovi la funzione quando il componente viene smontato
      if (typeof window !== 'undefined') {
        delete (window as any).openFormModal;
      }
    };
  }, []);

  // Effetto per mostrare il chatbot dopo 30 secondi
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(true);
    }, 30000); // 30 secondi

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setCurrentStreamingMessage('');
    setSuggestedQuestions([]);

    try {
      let assistantMessageId = '';
      let assistantMessage = '';

      await difyService.sendMessage(
        inputMessage,
        conversationId,
        (chunk: StreamChunk) => {
          if (!chunk) return;
          
          console.log('Received chunk in component:', chunk);
          
          if (chunk.event === 'message') {
            if (chunk.message_id) {
              assistantMessageId = chunk.message_id;
            }
            if (chunk.conversation_id) {
              setConversationId(chunk.conversation_id);
            }
          } else if (chunk.event === 'agent_message' && chunk.answer) {
            assistantMessage += chunk.answer;
            setCurrentStreamingMessage(assistantMessage);
          } else if (chunk.event === 'message_end') {
            if (assistantMessage) {
              const newMessageId = assistantMessageId || Date.now().toString();
              setMessages(prev => [...prev, {
                id: newMessageId,
                role: 'assistant',
                content: assistantMessage,
                created_at: new Date().toISOString(),
              }]);
              setCurrentStreamingMessage('');
              setLastMessageId(newMessageId);
            }
          } else if (chunk.event === 'error') {
            console.error('Error from Dify:', chunk);
            throw new Error(chunk.message || 'Error from Dify API');
          }
        }
      );
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Mi dispiace, si è verificato un errore. Riprova più tardi.',
        created_at: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId: string, rating: 'like' | 'dislike') => {
    try {
      await difyService.getFeedback(messageId, rating);
      setFeedbackGiven(prev => ({ ...prev, [messageId]: rating }));
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };
  
  const handleSelectSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const resetConversation = () => {
    setMessages([WELCOME_MESSAGE]);
    setConversationId(undefined);
    setSuggestedQuestions([]);
    setCurrentStreamingMessage('');
    setFeedbackGiven({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chatMessages');
      localStorage.removeItem('conversationId');
    }
  };

  const clearAllData = () => {
    resetConversation();
    setIsOpen(false);
  };

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
          {/* Header */}
          <div 
            className="px-4 py-3 rounded-t-xl flex items-center justify-between"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#000'
            }}
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <IoMdChatbubbles className="w-5 h-5" />
              Assistente Turismo Sicilia
            </h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={resetConversation}
                className="p-2 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Riavvia conversazione"
                title="Riavvia conversazione"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Chiudi chat"
              >
                <IoMdClose className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-4"
            style={{ background: 'linear-gradient(180deg, #fefefe 0%, #f9fafb 100%)' }}
          >
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
                  style={{
                    boxShadow: message.role === 'user' 
                      ? '0 4px 6px -1px rgba(250, 204, 21, 0.1), 0 2px 4px -1px rgba(250, 204, 21, 0.06)' 
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <p 
                    className="text-sm whitespace-pre-wrap leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  />
                  {message.role === 'assistant' && message.id !== 'welcome' && (
                    <div className="flex items-center space-x-2 mt-2 justify-end">
                      <button
                        onClick={() => handleFeedback(message.id, 'like')}
                        className={`p-1 rounded-full transition-colors ${
                          feedbackGiven[message.id] === 'like' 
                            ? 'text-green-500 bg-green-50' 
                            : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                        }`}
                        disabled={!!feedbackGiven[message.id]}
                        aria-label="Mi piace"
                      >
                        <FaRegThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, 'dislike')}
                        className={`p-1 rounded-full transition-colors ${
                          feedbackGiven[message.id] === 'dislike' 
                            ? 'text-red-500 bg-red-50' 
                            : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                        }`}
                        disabled={!!feedbackGiven[message.id]}
                        aria-label="Non mi piace"
                      >
                        <FaRegThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {currentStreamingMessage && (
              <div className="flex justify-start animate__animated animate__fadeIn animate__faster">
                <div className="max-w-[85%] p-3 rounded-2xl rounded-tl-none shadow-sm bg-white text-gray-800 border border-gray-100">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{currentStreamingMessage}</p>
                  <div className="flex mt-1">
                    <span className="inline-flex space-x-1">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
                      <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></span>
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 bg-white">
            {suggestedQuestions.length > 0 && (
              <div className="px-4 pt-3">
                <SuggestedQuestions 
                  questions={suggestedQuestions} 
                  onSelectQuestion={handleSelectSuggestedQuestion} 
                />
              </div>
            )}
            <form onSubmit={handleSendMessage} className="p-3">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Scrivi un messaggio..."
                  className="flex-1 p-3 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-sm placeholder-gray-500 shadow-inner"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 flex items-center justify-center shadow-md"
                  aria-label="Invia messaggio"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <IoSend className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
