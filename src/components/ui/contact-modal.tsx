"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Send,
  Sparkles,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import {
  playModalCloseSound,
  playClickSound,
  playModalOpenSound,
} from "@/lib/sound-effects";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL_ADDRESS = "mohammadrehan1302@gmail.com";
const DEFAULT_SUBJECT = "Cybersecurity Opportunity / Inquiry — Mohammad Rehan";
const DEFAULT_BODY = `Hi Mohammad,

I came across your cybersecurity portfolio and would like to connect regarding an opportunity / collaboration.

Purpose: [Internship / Cybersecurity Role / Project Collaboration]

Message:
[Type your message here]

Best regards,
[Your Name]
[Your Organization / Contact Info]`;

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [body, setBody] = useState(DEFAULT_BODY);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        playModalCloseSound();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    playModalCloseSound();
    onClose();
  };

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  // 1. Direct Web Gmail Compose URL (100% reliable on Chrome/Edge/Firefox without desktop app)
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${encodedSubject}&body=${encodedBody}`;

  // 2. Outlook Web Compose URL
  const outlookWebUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL_ADDRESS}&subject=${encodedSubject}&body=${encodedBody}`;

  // 3. Native Desktop Mailto URL
  const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodedSubject}&body=${encodedBody}`;

  const handleCopy = () => {
    playClickSound();
    const fullText = `To: ${EMAIL_ADDRESS}\nSubject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl bg-[#080d1a] border border-blue-500/35 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(59,130,246,0.3)] overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in-95 duration-200">

        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Transmit Inquiry // Send Email to Mohammad Rehan
            </span>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">

          {/* Recipient Pill */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Direct Recipient
                </span>
                <span className="text-sm sm:text-base font-bold text-white truncate block">
                  {EMAIL_ADDRESS}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              title="Copy to clipboard"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-blue-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Subject Field */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Email Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/40 transition-all font-medium"
            />
          </div>

          {/* Body Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pre-Installed Ready-to-Send Message
              </label>
              <span className="text-[11px] text-blue-400 font-semibold">Editable</span>
            </div>
            <textarea
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/40 transition-all font-mono leading-relaxed resize-y"
            />
          </div>

          {/* Dispatch Actions */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Choose How to Open & Send:
            </span>

            {/* 1. Gmail Web (Most Popular & 100% Reliable in Browser) */}
            <a
              href={gmailWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm shadow-[0_0_30px_rgba(59,130,246,0.35)] border border-blue-300/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                {/* Google Gmail Icon */}
                <div className="p-2 rounded-xl bg-white/20">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-sm font-black">Open in Gmail Web (Recommended)</span>
                  <span className="block text-[11px] text-blue-100 font-normal">
                    Launches Gmail directly in your browser with message pre-loaded & ready to send
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-blue-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* 2. Secondary Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={outlookWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                data-cursor-minimal
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs font-bold transition-all group"
              >
                <span>Open in Outlook Web</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400" />
              </a>

              <a
                href={mailtoUrl}
                onClick={() => playClickSound()}
                data-cursor-minimal
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs font-bold transition-all group"
              >
                <span>Open Desktop Mail Client</span>
                <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Verified Direct Inbox • Mohammad Rehan
          </span>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white font-bold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
