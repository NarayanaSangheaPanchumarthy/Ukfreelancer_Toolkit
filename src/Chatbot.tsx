import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are a helpful and polite assistant for the UK Freelancer Toolkit app.
Your sole purpose is to answer questions about the UK Freelancer Toolkit application and its features. 
The application provides browser-based tools for freelancers, including:
- Invoices: Create and download professional invoices.
- Quotes: Generate project quotes and estimates.
- VAT Calculator: Quick math for standard, reduced, and zero-rated VAT.
- Tax Estimator: Rough estimates for income tax and National Insurance based on profit.
- Receipts: Generate simple PDF receipts.
- Templates: Reusable business templates.
- Consultation Booking: Book 1-on-1 consultations.

IMPORTANT RULES:
1. ONLY answer questions about the application and its features.
2. DO NOT provide general tax advice, legal advice, or external information not related to the app's functionality.
3. If the user asks general-knowledge questions, code generation, logic puzzles, or anything outside the app, politely decline and state that you can only help with the UK Freelancer Toolkit.
4. Keep your answers concise, clear, and direct.`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am the UK Freelancer Toolkit assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Create chat session ref so we can maintain history
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (!chatRef.current) {
      chatRef.current = ai.chats.create({
        model: "gemini-3.1-flash-lite",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
         chatRef.current = ai.chats.create({
          model: "gemini-3.1-flash-lite",
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });
      }
      
      const response = await chatRef.current.sendMessage({ message: userMessage });
      const responseText = response.text || "I'm sorry, I couldn't process that.";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Sorry, I'm having trouble connecting right now. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 bg-[#1a1f24] hover:bg-black text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 z-50 flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-[90vw] sm:w-[400px] h-[500px] max-h-[80vh] bg-white border border-slate-200 shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden flex-shrink-0 animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-[#1a1f24] text-white p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-sm tracking-wide">Toolkit Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 min-h-0">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-200'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-slate-700" />}
                </div>
                <div 
                  className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                  }`}
                >
                  {msg.role === 'user' ? (
                    msg.text
                  ) : (
                    <div className="prose prose-sm prose-slate max-w-none">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-200">
                  <Bot className="w-4 h-4 text-slate-700" />
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-sm flex items-center text-slate-500 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-200 flex-shrink-0">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the toolkit..."
                disabled={isLoading}
                className="flex-1 border border-slate-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
