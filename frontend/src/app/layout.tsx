import type { Metadata } from "next";
import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://my-resume-amber-alpha.vercel.app"),
  title: "Kumar Aman Sagar | Full Stack & AI Application Engineer Portfolio",
  description: "Professional portfolio and resume of Kumar Aman Sagar, a Full Stack & AI Application Engineer with 3+ years of experience engineering scalable web applications, real-time AI agent integrations, RAG pipelines, micredrvices, and cloud deployments.",
  keywords: [
    "Kumar Aman Sagar", "Aman Sagar", "Full Stack & AI Application Engineer", "Full Stack Developer", "AI Engineer", 
    "RAG Pipelines", "LLM Orchestration", "Next.js", "React.js", "TypeScript", "Node.js", "Python", 
    "FastAPI", "Flask", "AWS ECS", "Docker", "Kubernetes", "Redis", "MongoDB", "PostgreSQL", "CI/CD"
  ],
  authors: [{ name: "Kumar Aman Sagar" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Kumar Aman Sagar | Full Stack & AI Application Engineer Portfolio",
    description: "Professional portfolio and resume of Kumar Aman Sagar, featuring AI agent integrations, RAG pipelines, scalable micredrvices, and full-stack web applications.",
    url: "https://my-resume-amber-alpha.vercel.app",
    siteName: "Kumar Aman Sagar Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Kumar Aman Sagar - Full Stack & AI Application Engineer Portfolio Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumar Aman Sagar | Full Stack & AI Application Engineer Portfolio",
    description: "Professional portfolio and resume of Kumar Aman Sagar. Specializing in AI agents, LLM orchestration, React, Next.js, Node.js, and Python.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-[#06060a] text-zinc-100 font-sans antialiased selection:bg-red-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
