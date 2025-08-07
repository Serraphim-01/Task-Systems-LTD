// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "@/app/client-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Task Systems — Enterprise ICT Solutions",
    template: "%s | Task Systems",
  },
  description: "Empowering African businesses with ICT solutions since 1987.",
  keywords: [
    "ICT Nigeria",
    "system integration",
    "enterprise solutions",
    "digital transformation",
  ],
  authors: [{ name: "Task Systems Limited" }],
  creator: "Task Systems Limited",
  publisher: "Task Systems Limited",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://tasksystems.com",
    siteName: "Task Systems LTD",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Task Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tasksystems",
    creator: "@tasksystems",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}