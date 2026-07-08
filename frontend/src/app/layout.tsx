import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://my-resume-amber-alpha.vercel.app"),
  title: "K. Aman Sagar | Full Stack MERN & PHP Developer Portfolio",
  description: "Professional portfolio and resume of K. Aman Sagar, a Full Stack Developer with 3 years of experience building scalable web applications, CRM systems, RBAC, and AI integrations using React, Next.js, Node.js, PHP, and MongoDB.",
  keywords: [
    "K. Aman Sagar", "Aman Sagar", "Full Stack Developer", "MERN Developer", "PHP Developer", "Node.js Developer", 
    "Next.js Developer", "React Developer", "AI Integration", "CRM Developer", 
    "Software Engineer Portfolio", "Bengaluru Developer", ".NET Developer"
  ],
  authors: [{ name: "K. Aman Sagar" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "K. Aman Sagar | Full Stack MERN & PHP Developer Portfolio",
    description: "Professional portfolio and resume of K. Aman Sagar, featuring CRM systems, RBAC, performance optimization, and AI integrations built with React, Next.js, Node.js, PHP, and MongoDB.",
    url: "https://my-resume-amber-alpha.vercel.app",
    siteName: "K. Aman Sagar Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "K. Aman Sagar - Full Stack MERN & PHP Developer Portfolio Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K. Aman Sagar | Full Stack MERN & PHP Developer Portfolio",
    description: "Professional portfolio and resume of K. Aman Sagar. Specializing in React, Next.js, Node.js, PHP, and MongoDB.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-teal-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
