'use client';

import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Decorative grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(148, 163, 184, .05) 25%, rgba(148, 163, 184, .05) 26%, transparent 27%, transparent 74%, rgba(148, 163, 184, .05) 75%, rgba(148, 163, 184, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(148, 163, 184, .05) 25%, rgba(148, 163, 184, .05) 26%, transparent 27%, transparent 74%, rgba(148, 163, 184, .05) 75%, rgba(148, 163, 184, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating accent elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Card container */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-2xl font-bold text-white">ForenSkill</span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 font-medium">
              Digital Forensics Skill Assessment Platform
            </p>
          </div>

          {/* Form content */}
          <div className="space-y-6">
            {children}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-8 text-xs text-slate-400">
          <p>Advanced forensic training for professionals</p>
        </div>
      </div>
    </div>
  );
}



// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        
//         {/* Logo / Title */}
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-bold">ForenSkill</h1>
//           <p className="text-sm text-gray-500">
//             Digital Forensics Skill Assessment
//           </p>
//         </div>

//         {children}
//       </div>
//     </div>
//   );
// }