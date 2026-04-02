import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Inter, Open_Sans, } from "next/font/google";
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const _openSans = Open_Sans({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "forenscore",
  description: "Digital Forensics Assessment Platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${_openSans.variable} ${_openSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
