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
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState<{[key: string]: 'like' | 'dislike'}>({});
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [lastMessageId, setLastMessageId] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset conversation function
  const resetConversation = () => {
    setMessages([WELCOME_MESSAGE]);
    setConversationId(undefined);
    setSuggestedQuestions([]);
    setCurrentStreamingMessage('');
    setFeedbackGiven({});
  };

  // ... rest of the existing code until the return statement ...

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-yellow-400 text-black shadow-xl hover:bg-yellow-500 flex items-center justify-center transition-all duration-300 transform ${isOpen ? 'rotate-180 scale-105' : 'animate__animated animate__pulse animate__infinite animate__slower'}`}
        aria-label={isOpen ? "Chiudi chat" : "Apri chat"}
        style={{boxShadow: '0 10px 25px -5px rgba(250, 204, 21, 0.5), 0 8px 10px -6px rgba(250, 204, 21, 0.3)'}}
      >
        {isOpen ? (
          <IoMdClose className="w-7 h-7" />
        ) : (
          <IoMdChatbubbles className="w-7 h-7" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          className="absolute bottom-24 right-0 w-96 sm:w-[400px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-yellow-200 animate__animated animate__fadeInUp animate__faster"
          style={{ 
            maxWidth: 'calc(100vw - 2rem)',
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

          {/* Rest of the existing chat window code */}
          
        </div>
      )}
    </div>
  );
} 