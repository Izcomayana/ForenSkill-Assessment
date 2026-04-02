'use client';

import Link from 'next/link';
import forenscore from "@/public/forenscore.png"
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">

      {/* 🔥 Gradient background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      {/* 🔲 Grid overlay (for tech feel) */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="w-full max-w-md relative my-10 z-10">

        {/* Card */}
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-8 sm:p-10">

          {/* Header */}
          <div className="text-center mb-8 ">
            {/* <Image src={forenscore} width={100} height={100} alt='forenscor-logo' className='mx-auto'/> */}

            <Link href="/" className="inline-block group">
              <div className="flex items-center justify-center gap-3 mb-4">

                {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">F</span>
                </div> */}

                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-white">foren</span>
                  <span className="text-blue-400">score</span>
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground">
              Digital Forensics Assessment Platform
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mb-8" />

          {/* Form */}
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          Secure • Analytical • Intelligent
        </div>
      </div>
    </div>
  );
}

