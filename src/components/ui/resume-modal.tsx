"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  Download,
  Printer,
  ExternalLink,
  ShieldCheck,
  Mail,
  Code2,
  Award,
  GraduationCap,
  Terminal,
  FileText,
  Eye,
} from "lucide-react";
import { playModalCloseSound, playClickSound } from "@/lib/sound-effects";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESUME_DRIVE_VIEW_URL =
  "https://drive.google.com/file/d/15IJakaGjz7NAZ0cXhL4y-lIMiNkvWu2G/view?usp=sharing";
const RESUME_DRIVE_PREVIEW_URL =
  "https://drive.google.com/file/d/15IJakaGjz7NAZ0cXhL4y-lIMiNkvWu2G/preview";
const RESUME_DRIVE_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=15IJakaGjz7NAZ0cXhL4y-lIMiNkvWu2G";

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"pdf" | "dossier">("pdf");

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

  // Lock body scroll when modal is active
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

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleClose = () => {
    playModalCloseSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-5xl bg-[#080d1a] border border-blue-500/30 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(59,130,246,0.25)] overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Curriculum Vitae // Mohammad Rehan
            </span>
          </div>

          {/* View Tab Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab("pdf");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "pdf"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Original PDF</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setActiveTab("dossier");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "dossier"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Structured Dossier</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={RESUME_DRIVE_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-blue-400/40 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href={RESUME_DRIVE_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Google Drive</span>
            </a>

            <button
              onClick={handlePrint}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-blue-400" />
              <span>Print</span>
            </button>

            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(92vh-75px)]">
          {activeTab === "pdf" ? (
            <div className="p-4 sm:p-6 flex flex-col items-center">
              <div className="w-full aspect-[8.5/11] max-h-[72vh] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl relative">
                <iframe
                  src={RESUME_DRIVE_PREVIEW_URL}
                  title="Mohammad Rehan Resume PDF"
                  className="w-full h-full border-0"
                  allow="autoplay"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
                <span>PDF not rendering in your browser?</span>
                <a
                  href={RESUME_DRIVE_VIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>Open directly in Google Drive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-10 space-y-8 print:p-0 print:bg-white print:text-black">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8 print:border-black/20">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white print:text-black mb-2">
                    MOHAMMAD REHAN
                  </h1>
                  <p className="text-blue-400 font-bold text-sm sm:text-base tracking-wide uppercase">
                    Cybersecurity Intern Candidate | Vulnerability Assessment & Web App Security
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Greater Hyderabad Area, India • B.Tech CSE (Cybersecurity) Class of 2027
                  </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="mailto:mohammadrehan1302@gmail.com"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-blue-400/40"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    mohammadrehan1302@gmail.com
                  </a>
                  <a
                    href="https://linkedin.com/in/mohammad-rehan-543428376"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-blue-400/40"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/mohd-rehan13"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-blue-400/40"
                  >
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> Professional Summary
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed print:text-black">
                  I build practical cybersecurity projects that turn security concepts into working tools and documented findings. Recently, I developed a Python-based phishing URL checker and tested a deliberately vulnerable web application against the OWASP Top 10 using Burp Suite — documenting vulnerabilities, their impact, and remediation steps. I have also performed network reconnaissance, service enumeration, and traffic analysis in controlled lab environments using Nmap and Wireshark. Comfortable with Python, Linux, Kali Linux, Nmap, Wireshark, Burp Suite, Bash, SQL, and Git/GitHub. Currently building toward SOC analysis, penetration testing, and structured vulnerability assessment.
                </p>
              </div>

              {/* Core Technical Competencies */}
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-blue-400" /> Technical Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-blue-300 block mb-1">Security & Pentesting</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      Network Security, Web App Security, OWASP Top 10, Penetration Testing, SOC Operations
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-cyan-300 block mb-1">Security Tools</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      Nmap, Wireshark, Burp Suite, Kali Linux, Ubuntu Server, Bash Shell, Git
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-indigo-300 block mb-1">Programming & Data</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      Python 3, Flask REST APIs, SQL, Bash Scripting, React.js, Scikit-Learn
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications & Simulations */}
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-blue-400" /> Industry Certifications & Simulations
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">Deloitte Australia — Cyber Job Simulation</h3>
                      <p className="text-xs text-slate-400">Practical cybersecurity simulation covering threat intelligence, incident management, and client defense.</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/30 shrink-0">
                      Deloitte Forage
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">AWS — Solutions Architecture Job Simulation</h3>
                      <p className="text-xs text-slate-400">Cloud architecture simulation focusing on VPC configuration, IAM security policies, and cost-effective infrastructure.</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/30 shrink-0">
                      AWS Forage
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">Python Complete Course, Flask Framework & Web Essentials</h3>
                      <p className="text-xs text-slate-400">Comprehensive credential in Python programming, Flask microservices, database schemas, and REST security.</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/30 shrink-0">
                      Udemy Accredited
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">Web Application Penetration Testing (DCSC)</h3>
                      <p className="text-xs text-slate-400">Drop Certified Security Course covering OWASP Top 10, exploitation techniques, authentication bypass, and report generation.</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/30 shrink-0">
                      Verified DCSC
                    </span>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 flex items-center gap-2 mb-3">
                  <GraduationCap className="w-4 h-4 text-blue-400" /> Education
                </h2>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-white">DRK College of Engineering and Technology</h3>
                    <span className="text-xs text-blue-400 font-bold">2023 – 2027</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Bachelor of Technology (B.Tech) in Computer Science and Engineering (Cyber Security)
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Current CGPA: 8.2 / 10</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-slate-400">
          <span>Official Candidate Profile • Mohammad Rehan</span>
          <a
            href={RESUME_DRIVE_VIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            className="flex items-center gap-1.5 text-blue-400 hover:text-white font-bold transition-colors"
          >
            <span>Open in Google Drive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
