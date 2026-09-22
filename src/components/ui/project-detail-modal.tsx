"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Code2, ShieldAlert, Cpu, Terminal, CheckCircle2, Lock } from "lucide-react";
import { playModalCloseSound, playClickSound } from "@/lib/sound-effects";

export interface ProjectDetail {
  id: string | number;
  title: string;
  subtitle?: string;
  badge?: string;
  tags?: string[];
  link?: string;
  githubUrl?: string;
  problem?: string;
  threatModel?: string;
  architecture?: string[];
  findings?: string[];
  tools?: string[];
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
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

  // Lock body scroll when modal is open
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

  if (!isOpen || !project) return null;

  const handleClose = () => {
    playModalCloseSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-3xl bg-[#080d1a] border border-blue-500/30 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(59,130,246,0.25)] overflow-hidden flex flex-col max-h-[90vh] my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Project Intelligence // {project.badge || "Security Dossier"}
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

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Main Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              {project.title}
            </h2>
            {project.subtitle && (
              <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1 rounded-lg bg-blue-500/15 text-blue-200 border border-blue-400/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Problem Statement */}
          {project.problem && (
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" /> Problem Addressed
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-200">
                {project.problem}
              </p>
            </div>
          )}

          {/* Threat Model & Attack Vectors */}
          {project.threatModel && (
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" /> Threat Model & Vectors
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {project.threatModel}
              </p>
            </div>
          )}

          {/* Technical Architecture */}
          {project.architecture && project.architecture.length > 0 && (
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" /> Technical Architecture
              </h3>
              <ul className="space-y-2">
                {project.architecture.map((step, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Security Findings & Mitigations */}
          {project.findings && project.findings.length > 0 && (
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Findings & Remediations
              </h3>
              <ul className="space-y-2">
                {project.findings.map((finding, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools & Environment */}
          {project.tools && project.tools.length > 0 && (
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" /> Environment & Toolchain
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-black/40 text-blue-300 border border-blue-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between gap-4">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            Close Details
          </button>

          <div className="flex items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300"
              >
                <Code2 className="w-4 h-4" />
                <span>View Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
