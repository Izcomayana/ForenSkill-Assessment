'use client';

import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#151922] relative overflow-hidden px-4">

      <div className="w-full max-w-md relative my-10 z-10">

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-[32px] shadow-sm p-8 sm:p-10">

          {/* Header */}
          <div className="text-center mb-8 ">
            {/* <Image src={forenscore} width={100} height={100} alt='forenscor-logo' className='mx-auto'/> */}

            <Link href="/" className="inline-block group">
              <div className="flex items-center justify-center gap-3 mb-4">

                {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">F</span>
                </div> */}

                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-gray-900">foren</span>
                  <span className="text-green-500">score</span>
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

