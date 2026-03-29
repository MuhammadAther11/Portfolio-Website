import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { personalInfo, skills, projects, education } from '../lib/data';
import { cn } from '../lib/utils';
import gsap from 'gsap';

const getBotReply = (message: string) => {
  const text = message.toLowerCase();
  const contains = (keywords: string[]) => keywords.some(keyword => text.includes(keyword));

  if (contains(['hi', 'hello', 'hey', 'assalamu', 'salaam'])) {
    return "Hello! I'm Ather's portfolio assistant. Ask me about his skills, projects, education, or how to contact him.";
  }

  if (contains(['skill', 'skills', 'technology', 'tech', 'frontend', 'ai', 'tools'])) {
    return `Ather's skills include:\nFrontend: ${skills.frontend.join(', ')}\nAI: ${skills.ai.join(', ')}\nTools: ${skills.tools.join(', ')}`;
  }

  if (contains(['project', 'projects', 'work', 'portfolio'])) {
    return `Some of Ather's projects:\n${projects.map(project => `${project.title} — ${project.description}`).join('\n')}`;
  }

  if (contains(['education', 'school', 'university', 'degree', 'certificate', 'study'])) {
    return `Ather's education and certificates:\n${education.map(item => `${item.institution} — ${item.degree} (${item.period})`).join('\n')}`;
  }

  if (contains(['contact', 'email', 'message', 'reach', 'hire'])) {
    return `You can contact Ather at ${personalInfo.email}.\nLinkedIn: ${personalInfo.linkedin}\nGitHub: ${personalInfo.github}`;
  }

  if (contains(['location', 'karachi', 'pakistan'])) {
    return `Ather is based in ${personalInfo.location}.`;
  }

  if (contains(['about', 'summary', 'experience', 'what do you do', 'who are you'])) {
    return personalInfo.summary;
  }

  if (contains(['thanks', 'thank you', 'thank you very much', 'thx'])) {
    return 'You are welcome! Feel free to ask another question about Ather.';
  }

  return "I'm a portfolio chatbot. I can answer questions about Ather's skills, projects, education, location, and contact details. Please ask one of those.";
};

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

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const updatedMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const botText = getBotReply(userMessage);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
      setIsLoading(false);
    }, 300);
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
