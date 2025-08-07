"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LoadingScreen } from "@/components/loading-screen";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // 🌐 Hidden developer claim
    if (typeof window !== "undefined") {
      window.__SERRAPHIM = "c2VycmFwaGltOjpkZXZlbG9wZXItY2xhaW06OjIwMjU=";
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
