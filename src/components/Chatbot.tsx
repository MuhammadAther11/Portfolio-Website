import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { personalInfo, skills, projects } from '../lib/data';
import { cn } from '../lib/utils';
import gsap from 'gsap';

const SYSTEM_PROMPT = `You are an AI assistant for Muhammad Ather Ali's portfolio website.
Ather is a Frontend Developer and Agentic AI Builder from Karachi, Pakistan.
Your goal is to answer questions about Ather's skills, projects, and education.
Skills: ${JSON.stringify(skills)}
Projects: ${JSON.stringify(projects)}
Contact: ${JSON.stringify(personalInfo)}

Be professional, friendly, and concise. If a user wants to leave a message or contact Ather, tell them they can type their message here and you will help them send it.
If they say something like "I want to send an email" or "contact Ather", ask for their name, email, and message.
Once you have all three (Name, Email, Message), tell them you are sending it.`;

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm Ather's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(chatWindowRef.current,
        { scale: 0.8, opacity: 0, y: 20, transformOrigin: "bottom right" },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the server-side API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
          systemPrompt: SYSTEM_PROMPT
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response from AI');
      }

      const botText = data.response || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);

      // Check if the AI is trying to send an email (heuristic)
      if (botText.toLowerCase().includes("sending") && (botText.toLowerCase().includes("email") || botText.toLowerCase().includes("message"))) {
        const lastFew = messages.slice(-5).map(m => m.text).join(' ');
        const emailMatch = lastFew.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

        if (emailMatch) {
          await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: "Chatbot User",
              email: emailMatch[0],
              message: userMessage
            })
          });
        }
      }

    } catch (error: any) {
      console.error("Chatbot error:", error);
      const errorMessage = error.message || "Oops, I'm having some trouble connecting. Please try again later!";
      setMessages(prev => [...prev, { role: 'bot', text: `Error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatWindowRef}
          className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-bg-secondary border border-bg-accent rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 bg-accent-cyan flex justify-between items-center text-bg-primary">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-bold">Ather's AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-bg-primary/20 p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-primary/50">
            {messages.map((m, i) => (
              <div key={i} className={cn(
                "max-w-[80%] p-3 rounded-2xl text-sm",
                m.role === 'user' 
                  ? "bg-accent-cyan text-bg-primary ml-auto rounded-tr-none" 
                  : "bg-bg-accent/20 text-text-primary mr-auto rounded-tl-none"
              )}>
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-bg-accent/20 text-text-primary mr-auto rounded-2xl rounded-tl-none p-3 max-w-[80%] flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs">Thinking...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-bg-accent bg-bg-secondary">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-bg-primary border border-bg-accent rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent-cyan"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-accent-cyan text-bg-primary rounded-full hover:bg-accent-glow transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110",
          isOpen ? "bg-bg-secondary text-accent-cyan border border-accent-cyan" : "bg-accent-cyan text-bg-primary"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};
