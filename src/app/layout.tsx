import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Powered Growth Partner for Marketing, Technology & Analytics | Digital Curd",
  description: "DigitalCurd helps businesses grow with AI solutions, digital marketing, ecommerce, modern web engineering, and analytics—built as one connected growth system.",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="/css/menu-v9.css" />
        <link rel="stylesheet" href="/css/index-v10.css" />
        <link rel="stylesheet" href="/css/dev-style.css" />
      </head>
      <body className="home wp-singular page-template page-template-page-templates page-template-tpl-home-v10 page-template-page-templatestpl-home-v10-php page page-id-29326 no-sidebar" id="themeAdd" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
