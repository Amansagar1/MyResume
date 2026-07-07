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
  title: "K. Aman Sagar | Full Stack MERN & PHP Developer Portfolio",
  description: "Professional portfolio and resume of K. Aman Sagar, a Full Stack Developer with 3 years of experience building scalable web applications, CRM systems, RBAC, and AI integrations using React, Next.js, Node.js, PHP, and MongoDB.",
  keywords: [
    "K. Aman Sagar", "Aman Sagar", "Full Stack Developer", "MERN Developer", "PHP Developer", "Node.js Developer", 
    "Next.js Developer", "React Developer", "AI Integration", "CRM Developer", 
    "Software Engineer Portfolio", "Bengaluru Developer", ".NET Developer"
  ],
  authors: [{ name: "K. Aman Sagar" }],
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
