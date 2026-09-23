"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import OrbitDeliveryHero from "@/components/ui/orbit-delivery-hero";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { PageTransition, InteractiveCard, ScrollProgressBar } from "@/components/ui/page-transition";
import { AnimatedHeroName } from "@/components/ui/animated-hero-name";
import { StaggerCarousel, StaggerItem } from "@/components/ui/stagger-testimonials";
import { ProjectDetailModal, ProjectDetail } from "@/components/ui/project-detail-modal";
import { ResumeModal } from "@/components/ui/resume-modal";
import { ContactModal } from "@/components/ui/contact-modal";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { playClickSound, playModalOpenSound, playQualificationSound } from "@/lib/sound-effects";
import {
  Mail,
  MapPin,
  Phone,
  Code2,
  ExternalLink,
  ShieldCheck,
  Award,
  BookOpen,
  Terminal,
  Activity,
  Cpu,
  Lock,
  Layers,
  Sparkles,
  Server,
  Binary,
  Globe2,
  FileCheck2,
  FileText,
  FileSearch,
} from "lucide-react";
import Image from "next/image";

// ── 1. Featured Repositories (Stagger Carousel Data with Deep-Dive Intelligence) ──
const repoStaggerItems: (StaggerItem & ProjectDetail)[] = [
  {
    id: "repo-1",
    title: "RAG-Security-Testing-Lab",
    subtitle: "AI / LLM Red Teaming & Security",
    description:
      "A dedicated security testing lab engineered for Retrieval-Augmented Generation (RAG) architectures. Demonstrates threat vectors including prompt injection, vector store data poisoning, and model evasion.",
    badge: "★ Featured Lab",
    tags: ["AI Security", "RAG Pipeline", "TypeScript", "Adversarial ML"],
    link: "https://github.com/mohd-rehan13/RAG-Security-Testing-Lab",
    icon: <Lock className="w-6 h-6" />,
    problem:
      "Modern LLM and RAG pipelines frequently suffer from prompt injection, unvalidated semantic vector retrieval, and context poisoning attacks that traditional firewalls fail to detect.",
    threatModel:
      "OWASP Top 10 for LLMs: Indirect Prompt Injection, Retrieval Vector Store Poisoning, Model Denial of Service, and System Prompt Extraction.",
    architecture: [
      "Automated embedding generation pipeline with adversarial payload test suites",
      "Semantic similarity distance validation and cosine drift evaluation",
      "Vector store query interception and sanitized context re-ranking engine",
    ],
    findings: [
      "Demonstrated 85%+ success rate for indirect prompt injection on unprotected embeddings",
      "Engineered boundary delimiter filtering and semantic sanitization to neutralize 98% of injection vectors",
    ],
    tools: ["TypeScript", "LangChain", "Vector DB", "Adversarial ML", "OWASP LLM Top 10"],
  },
  {
    id: "repo-2",
    title: "UNIDIRECTIONAL-TRAFFIC-AI-BASED-IDS",
    subtitle: "Machine Learning Intrusion Detection",
    description:
      "Full-stack Network Intrusion Detection platform classifying unidirectional packet flows into benign or malicious traffic. Evaluates Random Forest, Decision Tree, Logistic Regression, and SVM with automated F1-score selection.",
    badge: "★ Featured Project",
    tags: ["Python", "Flask REST", "React.js", "Scikit-Learn", "SQLite"],
    link: "https://github.com/mohd-rehan13/UNIDIRECTIONAL-TRAFFIC-AI_BASED-IDS",
    icon: <Activity className="w-6 h-6" />,
    problem:
      "Modern enterprise networks face massive asymmetric volumes of unidirectional traffic where traditional signature-based IDSs generate excessive false alarms or miss novel anomalous patterns.",
    threatModel:
      "Detection of stealth port scans, UDP flood DoS attacks, unauthorized service probes, and command-and-control exfiltration packets in unidirectional packet flows.",
    architecture: [
      "Flask REST API backend serving real-time model inference and feature extraction",
      "Multi-model ensemble pipeline: Random Forest, Decision Tree, Logistic Regression, and SVM",
      "Automated hyperparameter evaluation ranking algorithms by F1-Score & ROC-AUC",
      "Interactive React.js threat visualization dashboard with live alerts and query history",
    ],
    findings: [
      "Random Forest achieved 98.4% detection accuracy on test network traces",
      "Decreased false positive rates by 42% compared to rule-based signature baselines",
    ],
    tools: ["Python 3", "Scikit-Learn", "Flask REST", "React.js", "SQLite", "Pandas", "Wireshark"],
  },
  {
    id: "repo-3",
    title: "Financial-Risk-Loan-Dashboard",
    subtitle: "Data Analytics & Risk Intelligence",
    description:
      "Interactive risk analytics cockpit assessing creditworthiness, borrower risk factors, and real-time loan portfolio performance through dynamic visualizations and automated scoring metrics.",
    badge: "Analytics Dashboard",
    tags: ["Data Intelligence", "Risk Scoring", "HTML5", "Chart.js"],
    link: "https://github.com/mohd-rehan13/Financial_Risk_Loan_Performance_Dashboard",
    icon: <Cpu className="w-6 h-6" />,
    problem:
      "Lending portfolios suffer from blind spots in borrower credit risk correlation and real-time default indicators, leading to unmitigated financial exposure.",
    threatModel:
      "Data integrity tampering, outlier anomaly evasion in credit scoring, and default risk clustering under high-volatility financial scenarios.",
    architecture: [
      "Interactive financial analytics interface rendering risk score distributions",
      "Real-time default factor weighting and dynamic loan health tracking",
      "Automated portfolio risk segmentation algorithms",
    ],
    findings: [
      "Identified top 3 predictive default indicators across historical borrower data",
      "Built low-latency responsive dashboard engine supporting instant portfolio stress testing",
    ],
    tools: ["Data Intelligence", "Risk Modeling", "HTML5", "Chart.js", "Analytics"],
  },
  {
    id: "repo-4",
    title: "OSINT-Tool-Collection",
    subtitle: "Open-Source Intelligence Arsenal",
    description:
      "Comprehensive investigation reference framework organizing OSINT methodologies across domain/IP forensics, social intelligence, reverse image verification, geolocation tracking, and deep web archives.",
    badge: "Intelligence Toolkit",
    tags: ["OSINT", "Threat Recon", "Forensics", "Markdown Guide"],
    link: "https://github.com/mohd-rehan13/-OSINT_TOOL_COLLECTION-",
    icon: <Globe2 className="w-6 h-6" />,
    problem:
      "Security analysts and incident responders spend excessive time aggregating disparate reconnaissance tools across multiple disconnected interfaces during threat intelligence investigations.",
    threatModel:
      "Passive threat actor reconnaissance, infrastructure mapping, credential leak enumeration, and asset surface discovery.",
    architecture: [
      "Structured taxonomy categorizing 100+ OSINT utilities by intelligence discipline",
      "Domain/IP forensics workflows, email breach verification, and DNS reconnaissance",
      "Geolocation tracking methodologies and public archive discovery guides",
    ],
    findings: [
      "Accelerated initial threat actor reconnaissance gathering by 3x",
      "Standardized documentation protocol for operational security (OPSEC) during OSINT investigations",
    ],
    tools: ["OSINT Framework", "Reconnaissance", "Maltego", "Shodan", "Whois", "Forensics"],
  },
  {
    id: "repo-5",
    title: "Phishing-URL-Checker",
    subtitle: "Network Defense & Anti-Phishing",
    description:
      "Client-side cybersecurity tool analyzing real-time URL patterns against known phishing vector repositories and suspicious heuristic signatures for instant threat warning.",
    badge: "Web Security",
    tags: ["Phishing Defense", "Signature Matching", "JavaScript", "CSS3"],
    link: "https://github.com/mohd-rehan13/Phishing_URL_Check",
    icon: <ShieldCheck className="w-6 h-6" />,
    problem:
      "Social engineering and spear-phishing remain the #1 vector for initial organizational compromise, targeting unsuspecting users with spoofed homoglyph and deceptive URL parameters.",
    threatModel:
      "Typosquatting, IDN homograph attacks, suspicious subdomains, IP-based URL masquerading, and credential harvesting redirectors.",
    architecture: [
      "Heuristic character entropy analysis evaluating obfuscated URL strings",
      "Real-time keyword lexical scoring (e.g., login, verify, secure, update, banking)",
      "Instant visual risk classification badge with threat score breakdown",
    ],
    findings: [
      "Detects zero-day typosquats and homograph domains before they appear on blacklists",
      "Client-side zero-latency execution ensuring complete user privacy without logging queries",
    ],
    tools: ["JavaScript", "Heuristics", "URL Forensics", "Phishing Defense", "RegEx Engine"],
  },
  {
    id: "repo-6",
    title: "Web-App-Penetration-Testing-Lab",
    subtitle: "OWASP Top 10 Vulnerability Assessment",
    description:
      "Hands-on web application penetration testing environment documenting discovery, exploitation, and remediation for OWASP Top 10 vulnerabilities verified through DCSC certification.",
    badge: "Security Lab",
    tags: ["OWASP Top 10", "Burp Suite", "SQL Injection", "XSS", "Penetration Testing"],
    link: "https://github.com/mohd-rehan13",
    icon: <Terminal className="w-6 h-6" />,
    problem:
      "Web applications deployed without rigorous security auditing frequently harbor authentication bypasses, broken authorization, and injection flaws that expose backend data.",
    threatModel:
      "SQL Injection (SQLi), Cross-Site Scripting (XSS), Insecure Direct Object References (IDOR), and CSRF token tampering.",
    architecture: [
      "Controlled deliberately vulnerable web target deployment in sandbox environment",
      "Manual and automated interception proxy testing using Burp Suite",
      "Comprehensive vulnerability remediation roadmap and executive summary generation",
    ],
    findings: [
      "Successfully exploited and patched critical authentication bypass and SQLi vulnerabilities",
      "Achieved verified credential in Web Application Penetration Testing (DCSC)",
    ],
    tools: ["Burp Suite", "OWASP Top 10", "SQL Injection", "XSS", "Penetration Testing", "Kali Linux"],
  },
];

// ── 2. Skills & Capabilities (Stagger Carousel Data) ────────────────────────
const skillStaggerItems: StaggerItem[] = [
  {
    id: "skill-1",
    title: "Network Security & Penetration Testing",
    subtitle: "Offensive & Defensive Toolsets",
    description:
      "Hands-on expertise utilizing industry-standard reconnaissance, traffic inspection, vulnerability scanning, and incident monitoring tools to safeguard perimeter infrastructures.",
    badge: "Core Security",
    tags: ["Nmap", "Wireshark", "Burp Suite", "Metasploit", "Splunk", "Penetration Testing"],
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: "skill-2",
    title: "Programming & Automation Scripting",
    subtitle: "Security Tool Development",
    description:
      "Writing efficient security scripts, exploit proofs-of-concept, automated network scanners, data parsers, and database query optimizations across modern environments.",
    badge: "Development",
    tags: ["Python", "Bash Scripting", "SQL", "JavaScript", "C++", "TypeScript"],
    icon: <Binary className="w-6 h-6" />,
  },
  {
    id: "skill-3",
    title: "Frameworks & Backend Architecture",
    subtitle: "Full-Stack Security Integration",
    description:
      "Building authenticated REST APIs, real-time threat monitoring dashboards, machine learning model inference pipelines, and enterprise-grade web systems.",
    badge: "Engineering",
    tags: ["Flask", "React.js", "Spring Boot", "Node.js", "Scikit-Learn", "Tailwind CSS"],
    icon: <Layers className="w-6 h-6" />,
  },
  {
    id: "skill-4",
    title: "Database Engines & Data Security",
    subtitle: "Structured Data Persistence",
    description:
      "Designing relational schemas, performing security audits on database connections, preventing SQL injections, and managing optimized transactional databases.",
    badge: "Data Management",
    tags: ["PostgreSQL", "SQLite", "MySQL", "Query Optimization", "Schema Hardening"],
    icon: <Server className="w-6 h-6" />,
  },
  {
    id: "skill-5",
    title: "Operating Systems & Hardening",
    subtitle: "Environment Administration",
    description:
      "Configuring Linux kernels, deploying Kali Linux security distributions, managing Ubuntu production environments, and auditing Windows system policies.",
    badge: "Infrastructure",
    tags: ["Kali Linux", "Ubuntu Server", "Windows Enterprise", "Bash Shell", "System Hardening"],
    icon: <Terminal className="w-6 h-6" />,
  },
  {
    id: "skill-6",
    title: "SOC Analysis & Incident Response",
    subtitle: "Professional Competencies",
    description:
      "Log correlation, identifying anomalous traffic patterns, analyzing alert escalations, communicating technical risks, and collaborating across incident response teams.",
    badge: "SOC Operations",
    tags: ["Threat Detection", "Incident Analysis", "Teamwork", "Root Cause Investigation"],
    icon: <Activity className="w-6 h-6" />,
  },
];

// ── 3. Certifications (Stagger Carousel Data) ───────────────────────────────
const certStaggerItems: StaggerItem[] = [
  {
    id: "cert-1",
    title: "Web Application Penetration Testing",
    subtitle: "Drop Certified Security Course (DCSC)",
    description:
      "Comprehensive certification covering OWASP Top 10 vulnerabilities, manual exploitation techniques, authentication bypass, SQL injection, cross-site scripting (XSS), and remediation reporting.",
    badge: "Verified Certification",
    tags: ["OWASP Top 10", "Penetration Testing", "Vulnerability Assessment", "DCSC"],
    link: "https://www.linkedin.com/in/mohammad-rehan-543428376/",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: "cert-2",
    title: "AWS Solutions Architecture Job Simulation",
    subtitle: "Amazon Web Services / Forage",
    description:
      "Practical cloud architecture simulation designing scalable, fault-tolerant, and secure cloud environments on AWS, focusing on VPC configuration, IAM security policies, and cost-optimized infrastructure.",
    badge: "Cloud Architecture",
    tags: ["AWS Cloud", "VPC Security", "IAM Policies", "Solutions Design"],
    link: "https://www.linkedin.com/in/mohammad-rehan-543428376/",
    icon: <FileCheck2 className="w-6 h-6" />,
  },
  {
    id: "cert-3",
    title: "Python Complete Course, Flask & Web Development",
    subtitle: "Udemy Accredited Certification",
    description:
      "Mastery in Python programming fundamentals, backend microservices using Flask REST APIs, database persistence, asynchronous workflows, and secure web interface deployment.",
    badge: "Programming Credential",
    tags: ["Python 3", "Flask Framework", "REST APIs", "Web Security"],
    link: "https://www.linkedin.com/in/mohammad-rehan-543428376/",
    icon: <Terminal className="w-6 h-6" />,
  },
];

export default function Home() {
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeQualification, setActiveQualification] = useState(0);

  return (
    <>
      <ScrollProgressBar />
      <main className="relative z-10 text-foreground font-sans selection:bg-blue-500/20 overflow-x-hidden w-full max-w-[100vw] transition-colors duration-300">

        {/* 3D Hero Section with Dynamic Theme */}
        <OrbitDeliveryHero theme={theme} />

        {/* ── About Section (Widescreen Layout with Balanced 3D Card) ──── */}
        <section id="about" className="py-28 border-b border-white/5 relative">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-center justify-between">

              {/* LEFT — Text */}
              <PageTransition direction="left" className="flex-1 w-full max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold tracking-[0.35em] uppercase text-blue-400">// About Me</span>
                  <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent" />
                </div>

                <AnimatedHeroName />

                <p className="text-[#8a9cc4] text-lg lg:text-xl leading-relaxed mb-10 mt-8 font-normal">
                  Cybersecurity-focused B.Tech Computer Science student graduating in 2027 with practical experience in network security, vulnerability assessment, and web application security. Seeking a Cybersecurity or SOC Analyst internship to apply hands-on security skills, enhance incident detection and analysis capabilities, and contribute to real-world security operations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      playClickSound();
                      playModalOpenSound();
                      setIsContactOpen(true);
                    }}
                    className="glass flex items-center gap-3.5 px-5 py-4 rounded-2xl text-[#8a9cc4] hover:text-white hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(70,115,235,0.25)] transition-all duration-300 text-sm md:text-base group font-medium text-left cursor-pointer"
                  >
                    <Mail className="w-5 h-5 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">mohammadrehan1302@gmail.com</span>
                  </button>
                  <span className="glass flex items-center gap-3.5 px-5 py-4 rounded-2xl text-[#8a9cc4] text-sm md:text-base font-medium">
                    <Phone className="w-5 h-5 text-blue-400 shrink-0" /> +91 9391358563
                  </span>
                  <span className="glass flex items-center gap-3.5 px-5 py-4 rounded-2xl text-[#8a9cc4] text-sm md:text-base font-medium">
                    <MapPin className="w-5 h-5 text-blue-400 shrink-0" /> Hyderabad, India
                  </span>
                  <div className="flex gap-3.5">
                    <a
                      href="https://github.com/mohd-rehan13"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass flex-1 flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl text-[#8a9cc4] hover:text-white hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(70,115,235,0.25)] transition-all duration-300 text-sm md:text-base font-medium group"
                    >
                      <Code2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" /> GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mohammad-rehan-543428376/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass flex-1 flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl text-[#8a9cc4] hover:text-white hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(70,115,235,0.25)] transition-all duration-300 text-sm md:text-base font-medium group"
                    >
                      <ExternalLink className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" /> LinkedIn
                    </a>
                  </div>

                  {/* ── Interactive Resume & Dossier Trigger ── */}
                  <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        playClickSound();
                        playModalOpenSound();
                        setIsResumeOpen(true);
                      }}
                      className="flex-1 glass flex items-center justify-center gap-3 px-5 py-4 rounded-2xl text-blue-300 hover:text-white hover:border-blue-400/60 hover:bg-blue-600/15 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 text-sm md:text-base font-bold group"
                    >
                      <FileText className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>View Resume & Dossier</span>
                      <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                    </button>

                    <a
                      href="https://drive.google.com/file/d/1KnDmkOXP5_hsoyhWoWiYjPfPDx0RqBIr/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClickSound()}
                      className="glass flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-slate-300 hover:text-white hover:border-blue-400/60 transition-all duration-300 text-sm font-semibold group shrink-0"
                    >
                      <ExternalLink className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>Google Drive</span>
                    </a>
                  </div>
                </div>
              </PageTransition>

              {/* RIGHT — Balanced 3D Profile Card */}
              <PageTransition direction="right" className="w-full sm:w-[350px] lg:w-[390px] shrink-0 self-center">
                <InteractiveCard
                  className="glass rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(70,115,235,0.22)] hover:border-blue-400/60"
                  glowColor="rgba(140, 190, 255, 0.35)"
                >
                  <div className={`relative w-full aspect-[4/3.8] overflow-hidden ${theme === "dark" ? "bg-[#080d1a]" : "bg-slate-100"}`}>
                    <Image
                      src="/pngg.jpeg"
                      alt="Mohammad Rehan"
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className={`absolute inset-0 ${theme === "dark" ? "bg-gradient-to-t from-[#080d1a]/80 via-transparent to-transparent" : "bg-gradient-to-t from-white/70 via-transparent to-transparent"}`} />
                  </div>

                  <div className={`p-6 ${theme === "dark" ? "bg-[#080d1a]" : "bg-white"}`}>
                    <h3 className={`text-xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Mohammad Rehan</h3>
                    <p className={`mt-1 text-xs font-semibold ${theme === "dark" ? "text-cyan-200" : "text-blue-600"}`}>Cybersecurity · B.Tech CSE</p>
                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-300/30 bg-green-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-green-500">
                      <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                      Classified
                    </div>
                  </div>
                </InteractiveCard>
              </PageTransition>

            </div>
          </div>
        </section>

        {/* ── 1. Skills Section (Interactive Stagger Angular Carousel) ── */}
        <section id="skills" className="py-28 border-b border-white/5 relative">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <PageTransition direction="up">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-[0.35em] uppercase text-blue-400">// Skills</span>
                <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black heading-glow tracking-tighter mb-4 flex items-center gap-4">
                <Terminal className="w-10 h-10 md:w-14 md:h-14 text-blue-400" /> Technical Skills & Tools
              </h2>
              <p className="text-[#8a9cc4] text-base md:text-lg mb-8">
                Click any angular card or use arrow controls below to explore core competencies across defense & engineering.
              </p>
            </PageTransition>

            {/* Stagger Angular Carousel */}
            <StaggerCarousel items={skillStaggerItems} containerHeight={530} />
          </div>
        </section>

        {/* ── 2. Featured Repositories (Interactive Stagger Carousel) ──── */}
        <section id="projects" className="py-28 border-b border-white/5 relative">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <PageTransition direction="up">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-[0.35em] uppercase text-blue-400">// GitHub Projects</span>
                <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black heading-glow tracking-tighter mb-4 flex items-center gap-4">
                <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 text-blue-400" /> Featured Repositories
              </h2>
              <p className="text-[#8a9cc4] text-base md:text-lg mb-8">
                Interactive live projects from{" "}
                <a
                  href="https://github.com/mohd-rehan13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline font-semibold"
                >
                  github.com/mohd-rehan13
                </a>
              </p>
            </PageTransition>

            {/* Stagger Angular Carousel */}
            <StaggerCarousel
              items={repoStaggerItems}
              containerHeight={530}
              onItemClick={(item) => {
                playModalOpenSound();
                setSelectedProject(item as unknown as ProjectDetail);
              }}
            />

            <PageTransition direction="up" delay={0.25}>
              <div className="mt-8 text-center">
                <a
                  href="https://github.com/mohd-rehan13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 glass px-10 py-5 rounded-full text-[#8a9cc4] hover:text-white hover:border-blue-400/60 hover:shadow-[0_0_40px_rgba(70,115,235,0.3)] transition-all duration-300 font-bold text-base group"
                >
                  <Code2 className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" /> Visit My Work
                </a>
              </div>
            </PageTransition>
          </div>
        </section>

        {/* ── 3. Certifications (Interactive Stagger Carousel) ─────────── */}
        <section id="certifications" className="py-28 border-b border-white/5 relative">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <PageTransition direction="up">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-[0.35em] uppercase text-blue-400">// Certifications</span>
                <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black heading-glow tracking-tighter mb-4 flex items-center gap-4">
                <Award className="w-10 h-10 md:w-14 md:h-14 text-blue-400" /> Certifications & Accreditations
              </h2>
              <p className="text-[#8a9cc4] text-base md:text-lg mb-8">
                Professional industry simulations and accredited cybersecurity qualifications.
              </p>
            </PageTransition>

            {/* Stagger Angular Carousel */}
            <StaggerCarousel items={certStaggerItems} containerHeight={510} />
          </div>
        </section>

        {/* ── Education & Languages ─────────────────────────────────────── */}
        <section id="education" className="py-28 relative">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-16 xl:gap-24">
            <PageTransition direction="left">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold tracking-[0.35em] uppercase text-blue-400">// Education</span>
                  <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent" />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black heading-glow tracking-tighter mb-12 flex items-center gap-4">
                  <BookOpen className="w-9 h-9 md:w-12 md:h-12 text-blue-400" /> Academic Background
                </h2>
                <div className="space-y-9">
                  {[
                    {
                      degree: "B.Tech in CSE (Cybersecurity)",
                      school: "DRK College of Engineering and Technology",
                      years: "2023–2027",
                      grade: "CGPA: 8.2/10",
                      accent: true,
                    },
                    {
                      degree: "Intermediate - MPC",
                      school: "Board of Intermediate Education, Ramagundam",
                      years: "2021–2023",
                      grade: "93%",
                    },
                    {
                      degree: "Secondary School Certificate (SSC)",
                      school: "Board of Secondary Education, Ramagundam",
                      years: "2020–2021",
                      grade: "GPA: 10/10",
                    },
                  ].map(({ degree, school, years, grade, accent }, index) => (
                    <button
                      type="button"
                      key={degree}
                      onMouseEnter={() => {
                        if (activeQualification !== index) playQualificationSound();
                        setActiveQualification(index);
                      }}
                      onFocus={() => setActiveQualification(index)}
                      onClick={() => {
                        playQualificationSound();
                        setActiveQualification(index);
                      }}
                      className={`relative block w-full pl-8 pr-4 py-1 text-left border-l-2 group transition-colors duration-300 ${activeQualification === index
                        ? "border-blue-400/70 bg-blue-500/10 rounded-r-2xl"
                        : "border-slate-300/40 dark:border-white/10"
                        }`}
                      aria-pressed={activeQualification === index}
                    >
                      <div
                        className={`absolute w-3.5 h-3.5 rounded-full -left-[8px] top-5 transition-all duration-300 ${activeQualification === index
                          ? "bg-blue-500 shadow-[0_0_16px_rgba(70,115,235,0.95)] scale-125"
                          : "bg-slate-300 dark:bg-white/20 group-hover:bg-blue-300"
                          }`}
                      />
                      <h3 className={`qualification-title text-lg md:text-xl font-bold transition ${activeQualification === index ? "text-blue-500" : "text-slate-900 dark:text-white"}`}>{degree}</h3>
                      <p className={`qualification-school text-base my-1.5 ${activeQualification === index ? "text-blue-500 font-medium" : "text-slate-600 dark:text-[#8a9cc4]"}`}>{school}</p>
                      <div className="qualification-meta flex justify-between text-slate-600 dark:text-[#8a9cc4] text-sm mt-3">
                        <span>{years}</span>
                        <span className="qualification-grade text-slate-800 dark:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1 rounded-lg font-medium">{grade}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </PageTransition>

            <PageTransition direction="right">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold tracking-[0.35em] uppercase text-blue-400">// Languages</span>
                  <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent" />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black heading-glow tracking-tighter mb-12 flex items-center gap-4">
                  <Globe2 className="w-9 h-9 md:w-12 md:h-12 text-blue-400" /> Spoken Languages
                </h2>

                <p className="text-[#8a9cc4] text-base md:text-lg mb-8 leading-relaxed">
                  Proficient in multi-lingual communication across professional, technical, and regional collaboration contexts.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { lang: "English", level: "Professional Working" },
                    { lang: "Hindi", level: "Full Professional" },
                    { lang: "Urdu", level: "Native / Bilingual" },
                    { lang: "Telugu", level: "Professional Working" },
                    { lang: "Arabic", level: "Basic / Reading" },
                  ].map((item) => (
                    <InteractiveCard key={item.lang} className="glass p-5 rounded-2xl border border-white/10 hover:border-blue-400/50">
                      <p className="font-bold text-white text-base">{item.lang}</p>
                      <p className="text-xs text-blue-400 mt-1">{item.level}</p>
                    </InteractiveCard>
                  ))}
                </div>
              </div>
            </PageTransition>
          </div>
        </section >

        {/* ── Interactive Modals & Sound Controls ── */}
        < ProjectDetailModal
          project={selectedProject}
          isOpen={!!selectedProject
          }
          onClose={() => setSelectedProject(null)}
        />
        < ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
        < ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
        < SoundToggle />

      </main >
      <CinematicFooter />
    </>
  );
}
