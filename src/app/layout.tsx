import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SmokeBackground } from "@/components/ui/smoke-background";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mohammad Rehan — Cybersecurity Engineer & SOC Analyst Portfolio",
  description:
    "Official cybersecurity portfolio of Mohammad Rehan. B.Tech CSE (Cybersecurity) candidate specializing in Network Security, Vulnerability Assessment, Threat Detection, and SOC Operations.",
  keywords: [
    "Mohammad Rehan",
    "Cybersecurity Portfolio",
    "SOC Analyst",
    "Network Security",
    "Penetration Testing",
    "Vulnerability Assessment",
    "OWASP Top 10",
    "Burp Suite",
    "Nmap",
    "Wireshark",
    "Python Security",
    "Hyderabad Cybersecurity",
  ],
  authors: [{ name: "Mohammad Rehan", url: "https://github.com/mohd-rehan13" }],
  creator: "Mohammad Rehan",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mohammad Rehan Portfolio",
    title: "Mohammad Rehan — Cybersecurity Engineer & SOC Analyst Portfolio",
    description:
      "B.Tech CSE (Cybersecurity) candidate specializing in Network Security, Threat Hunting, Vulnerability Assessment, and SOC Operations.",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammad Rehan — Cybersecurity Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Rehan — Cybersecurity Engineer & SOC Analyst Portfolio",
    description:
      "Cybersecurity Intern Candidate specializing in Network Security, Threat Hunting, Vulnerability Assessment, and SOC Operations.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammad Rehan",
  jobTitle: "Cybersecurity Engineer & Security Researcher",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "DRK College of Engineering and Technology",
  },
  knowsAbout: [
    "Network Security",
    "Vulnerability Assessment",
    "Penetration Testing",
    "OWASP Top 10",
    "Python Security Scripting",
    "SOC Operations",
    "Burp Suite",
    "Wireshark",
    "Nmap",
  ],
  sameAs: [
    "https://github.com/mohd-rehan13",
    "https://www.linkedin.com/in/mohammad-rehan-543428376/",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased font-sans overflow-x-hidden w-full max-w-[100vw]`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col cursor-none font-sans overflow-x-hidden w-full max-w-[100vw] relative">
        <CustomCursor />
        <SmokeBackground />
        {children}
      </body>
    </html>
  );
}
