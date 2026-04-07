import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alfian | Portfolio",
  description:
    "A modern, elegant web developer portfolio showing premium projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col selection:bg-white selection:text-black">
        {/* Subtle background radial gradient for elegance */}
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.05] to-black" />

        {/* Navigation Navbar placeholder */}
        <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <span className="font-semibold text-lg tracking-tight">
              ALFIAN SAFRUDIN
            </span>
            <div className="flex gap-6 text-sm text-muted-foreground font-medium">
              <a href="#work" className="hover:text-white transition-colors">
                Work
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </nav>

        <main className="flex-1 w-full max-w-7xl mx-auto pt-20 px-6">
          {children}
        </main>

        <footer className="w-full py-12 text-center text-muted-foreground text-sm border-t border-white/5 mt-20">
          <p>© {new Date().getFullYear()} Alfian. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
