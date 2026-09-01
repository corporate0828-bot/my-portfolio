import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Send,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Full-Time Role / Freelance Inquiry',
    message: '',
  });
  const [formSent, setFormSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Freelance Calculator State
  const [projectType, setProjectType] = useState<'landing' | 'webapp' | 'ai-integration'>('webapp');
  const [timeline, setTimeline] = useState<'standard' | 'express'>('standard');

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    } catch (e) {}
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setFormSent(true);
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      } catch (e) {}
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Let's Build Something Exceptional
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Open for full-stack engineering opportunities, AI native developer positions, and high-impact freelance client projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Cards & Quick Connect */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Email Card */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono">Direct Email</span>
                    <h4 className="text-sm sm:text-base font-bold text-white">{PERSONAL_INFO.email}</h4>
                  </div>
                </div>

                <button
                  id="contact-copy-email-btn"
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy Email Address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
              >
                <span>Compose Direct Email</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Primary Phone Card */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono">Mobile / WhatsApp</span>
                    <h4 className="text-sm sm:text-base font-bold text-white font-mono">{PERSONAL_INFO.phone}</h4>
                  </div>
                </div>

                <button
                  id="contact-copy-phone-btn"
                  onClick={copyPhone}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy Phone Number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Directly</span>
                </a>
                <a
                  href={`https://wa.me/919527133120?text=Hi%20Nishant,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/50 text-emerald-300 text-xs font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Location & Response Note */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Based in <strong>Satara / Pune, Maharashtra</strong> (Available for Remote Worldwide & Onsite Relocation)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Typical response time: Under 2 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Message Dispatcher */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl relative">
              <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-1">
                Send Direct Message
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out the form below to reach Nishant directly regarding opportunities or inquiries.
              </p>

              {formSent ? (
                <div className="p-8 text-center space-y-3 bg-slate-950 rounded-xl border border-emerald-500/40">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Dispatched!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Nishant has received your notification and will follow up shortly at <span className="text-cyan-400 font-mono">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setFormSent(false);
                      setFormData({ name: '', email: '', subject: 'Full-Time Role / Freelance Inquiry', message: '' });
                    }}
                    className="mt-3 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 outline-none transition-colors"
                    >
                      <option value="Full-Time Role / Hiring">Full-Time Software Engineer Hiring</option>
                      <option value="AI Native / LLM Integration">AI / Gemini API Integration Project</option>
                      <option value="Freelance Web Application">Freelance Commercial Web Application</option>
                      <option value="General Collaboration">General Collaboration & Mentorship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Project Details / Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your requirements, timeline, or position details..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    id="contact-submit-form-btn"
                    type="submit"
                    disabled={isSending}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSending ? (
                      <span>Transmitting Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Message to Nishant</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
