import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Systems Limited - Leading ICT Solutions Provider',
  description: 'Task Systems Limited is an indigenous system integration company founded in 1987, providing cutting-edge ICT solutions across Nigeria and Sub-Saharan Africa.',
  keywords: 'ICT solutions, system integration, enterprise solutions, digital transformation, Nigeria, Africa',
  authors: [{ name: 'Task Systems Limited' }],
  openGraph: {
    title: 'Task Systems Limited - Leading ICT Solutions Provider',
    description: 'Over 30 years of excellence in providing ICT solutions across Nigeria and Sub-Saharan Africa.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}