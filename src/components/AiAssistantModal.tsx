import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  CheckCircle2,
  RefreshCw,
  CornerDownLeft,
  Briefcase,
  Trophy,
  Code
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, EXPERIENCES_DATA, EDUCATION_DATA } from '../data/portfolioData';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectDemo?: (projectId: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  actionProjectId?: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenProjectDemo,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm Nishant's AI Portfolio Copilot. I'm trained on his complete engineering background, flagship projects (Ingrezy, Autobillr, Traceless), academic rank (#1 at DIET Satara), and freelance availability. How can I help you today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    { label: '🛒 What is Ingrezy?', query: 'Tell me about the Ingrezy project and how it works with quick commerce.' },
    { label: '🏆 DIET Satara Rank #1', query: 'Tell me about Nishant\'s academic achievements and ranking at DIET Satara.' },
    { label: '💼 Client Freelance Work', query: 'What real-world freelance projects has Nishant built?' },
    { label: '⚡ Core Tech Stack', query: 'What are Nishant\'s primary languages, frameworks, and AI skills?' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAnswer = (userQuery: string): { reply: string; actionProjectId?: string } => {
    const q = userQuery.toLowerCase();

    if (q.includes('ingrezy') || q.includes('recipe') || q.includes('swiggy') || q.includes('blinkit')) {
      return {
        reply: `Ingrezy is Nishant's major flagship project—a futuristic browser extension for quick-commerce apps like Swiggy Instamart, Blinkit / Eternal, and Flipkart Minutes.\n\nKey Concept: "Order an item, ingredients will deliver." When a user searches or selects a recipe (e.g. Paneer Butter Masala), Ingrezy decomposes it into required raw grocery ingredients, scales portions, and injects them directly into the quick-commerce cart with 1 click.`,
        actionProjectId: 'ingrezy',
      };
    }

    if (q.includes('autobillr') || q.includes('invoice') || q.includes('ocr') || q.includes('expense')) {
      return {
        reply: `Autobillr is an intelligent invoice data extraction & financial analytics tool built with Python, React, and MongoDB. It automates OCR extraction of vendor data, GST/tax rates, line items, and generates rich graphical company expense breakdown insights.`,
        actionProjectId: 'autobillr',
      };
    }

    if (q.includes('traceless') || q.includes('p2p') || q.includes('file sharing') || q.includes('webrtc')) {
      return {
        reply: `Traceless is a serverless, peer-to-peer (P2P) file-sharing platform using WebRTC data channels. It eliminates intermediate cloud servers entirely—files stream directly between browser peers with end-to-end encryption and zero cloud storage footprint.`,
        actionProjectId: 'traceless',
      };
    }

    if (q.includes('rank') || q.includes('diet') || q.includes('satara') || q.includes('education') || q.includes('gpa') || q.includes('gate')) {
      return {
        reply: `Nishant is pursuing his B.Tech in Computer Science & Engineering at DIET Satara (2023–2027) with a CGPA of 7.2.\n\nMajor Academic Milestone: He is ranked #1 out of 120 students across five consecutive semesters with a top-tier GPA, and is GATE 2026 Qualified with a score of 23.02. He also scored 65.67% in HSC (RJCK Khandala) specializing in Information Technology.`,
      };
    }

    if (q.includes('freelance') || q.includes('kalbhairav') || q.includes('bluewings') || q.includes('client')) {
      return {
        reply: `Nishant has actively delivered production freelance applications since Feb 2025:\n\n1. Kalbhairav Digitals: A commercial printing press web application for portfolio showcase and client inquiries.\n2. Bluewings Polymer: An official corporate website and technical specification catalog for a polymer manufacturing enterprise.\n\nHe handles end-to-end delivery from React/Next.js UI to hosting and SEO optimization.`,
      };
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('tech')) {
      return {
        reply: `Nishant's technical stack includes:\n• Languages: Python (experienced/MKCL certified), TypeScript, JavaScript (ES6+), C++, HTML5, CSS\n• Frontend: React.js, Next.js, Tailwind CSS, Bootstrap, SEO\n• Backend: Node.js, Cloudinary, MongoDB, Firebase\n• AI & Cloud: Gemini API, AWS Cloud, Google Cloud Platform, JWT/OAuth, Web3\n• Credentials: 24+ Google Developer Badges, 8 AICTE Certifications.`,
      };
    }

    if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('interview')) {
      return {
        reply: `You can reach Nishant directly:\n• Email: pisalnishant54@gmail.com\n• Phone: +91 9527133120\n• Portfolio: nishantpisal.com\n• Location: Satara / Pune, Maharashtra, India\n\nHe is open to full-time engineering roles, AI/full-stack internships, and high-impact freelance projects!`,
      };
    }

    return {
      reply: `Nishant Pisal is an AI Native Developer & Freelancer who ranked #1 out of 120 students in B.Tech CSE at DIET Satara. He specializes in Python, React, Next.js, Gemini API, and cloud architectures, with standout projects like Ingrezy, Autobillr, and Traceless. Feel free to ask about any specific project or credential!`,
    };
  };

  const handleSend = (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    const userMessage: Message = { role: 'user', content: queryText };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(queryText);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.reply,
          actionProjectId: response.actionProjectId,
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Nishant's AI Copilot</h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    Gemini Powered
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Trained on resume, projects & background</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 select-text">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-cyan-600 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-950/90 text-slate-200 border border-slate-800 rounded-tl-none'
                  }`}
                >
                  {m.content}

                  {m.actionProjectId && onOpenProjectDemo && (
                    <div className="mt-3 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenProjectDemo(m.actionProjectId!);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Launch Interactive {m.actionProjectId.toUpperCase()} Simulator</span>
                      </button>
                    </div>
                  )}
                </div>

                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-slate-400">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                </div>
                <span>Analyzing portfolio knowledge graph...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Prompts */}
          <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
            {presetQuestions.map((q) => (
              <button
                key={q.label}
                onClick={() => handleSend(q.query)}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about Nishant's skills, rank, projects..."
              className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
