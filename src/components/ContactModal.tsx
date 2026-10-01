import React, { useState, useEffect } from 'react';
import { X, Mail, Check, Copy, Send, Sparkles, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics.ts';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [projectType, setProjectType] = useState<'long' | 'vertical' | 'retainer'>('long');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    channelUrl: '',
    budget: '$1,000 - $3,000',
    notes: '',
  });

  const editorEmail = 'business1144999@gmail.com';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerHaptic('light');
        onClose();
      }
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    triggerHaptic('success');
    navigator.clipboard.writeText(editorEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic('success');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#141418] border border-white/10 shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#18181f]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">Let’s Elevate Your Channel</h3>
              <p className="text-xs text-zinc-400">Available for select long-form & vertical retainers</p>
            </div>
          </div>

          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-white">Inquiry Received!</h4>
              <p className="text-sm text-zinc-300 max-w-sm mx-auto">
                Thank you! I review all channel inquiries and reply within 12–24 hours with a custom edit test or retainer proposal.
              </p>
              <button
                onClick={() => {
                  triggerHaptic('light');
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-amber-400 text-black font-bold text-xs"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Project Type Tabs */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                  What type of editing do you need?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'long', label: 'Long Form Video' },
                    { id: 'vertical', label: 'Vertical Reels Pack' },
                    { id: 'retainer', label: 'Monthly Retainer' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        triggerHaptic('selection');
                        setProjectType(t.id as typeof projectType);
                      }}
                      className={`py-2 px-2 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                        projectType === t.id
                          ? 'bg-amber-500 text-black border-amber-500 font-bold shadow-md shadow-amber-500/20'
                          : 'bg-[#18181f] text-zinc-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Your Name / Creator Alias</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@creator.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Channel / Brand Link */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1">YouTube / TikTok / IG Link</label>
                <input
                  type="text"
                  placeholder="https://youtube.com/@yourchannel"
                  value={formData.channelUrl}
                  onChange={(e) => setFormData({ ...formData, channelUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Estimated Monthly Budget</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#18181f] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="$500 - $1,500">$500 – $1,500 (1-3 Videos / Short Pack)</option>
                  <option value="$1,500 - $3,500">$1,500 – $3,500 (Standard Retainer)</option>
                  <option value="$3,500 - $7,000">$3,500 – $7,000 (Full-time Dedicated / High Scale)</option>
                  <option value="$7,000+">$7,000+ (Multi-channel Network)</option>
                </select>
              </div>

              {/* Direct Email Fast Track */}
              <div className="pt-2 flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 text-xs">
                <div className="flex items-center gap-2 text-zinc-400 truncate">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{editorEmail}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center gap-1.5 text-[11px] font-medium transition-colors cursor-pointer shrink-0"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Project Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
