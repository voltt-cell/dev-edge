import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev-Edge | Master Modern Web Development",
  description: "Master frontend, backend, and system design through interactive, high-performance labs. Premium developer education with real-world scenarios.",
  keywords: ["React", "Next.js", "Web Development", "Frontend", "Backend", "System Design", "Interactive Labs"],
  authors: [{ name: "Dev-Edge Team" }],
  openGraph: {
    title: "Dev-Edge | Master Modern Web Development",
    description: "Premium interactive labs for mastering web development.",
    url: "https://dev-edge.com",
    siteName: "Dev-Edge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev-Edge | Master Modern Web Development",
    description: "Premium interactive labs for mastering web development.",
  },
  icons: {
    icon: "/icon.svg",
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
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
