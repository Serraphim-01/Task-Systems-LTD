"use client";

import './globals.css';
import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { LoadingScreen } from '@/components/loading-screen';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading time

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Task Systems Limited - Leading ICT Solutions Provider</title>
        <meta name="description" content="Task Systems Limited is an indigenous system integration company founded in 1987, providing cutting-edge ICT solutions across Nigeria and Sub-Saharan Africa." />
        <meta name="keywords" content="ICT solutions, system integration, enterprise solutions, digital transformation, Nigeria, Africa" />
        <meta name="author" content="Task Systems Limited" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                <Navbar />
                <main className="min-h-screen">
                  {children}
                </main>
                <Footer />
              </>
            )}
          </AnimatePresence>
        </ThemeProvider>
      </body>
    </html>
  );
}