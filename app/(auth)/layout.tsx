'use client';

import Link from 'next/link';

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

      <div className="w-full max-w-md relative z-10">

        {/* Card */}
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-8 sm:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block group">
              <div className="flex items-center justify-center gap-3 mb-4">

                {/* Logo */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">F</span>
                </div>

                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-white">Foren</span>
                  <span className="text-blue-400">Skill</span>
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




// 'use client';

// import Link from 'next/link';

// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
//       {/* Subtle geometric pattern background */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.03) 49%, rgba(255, 255, 255, 0.03) 51%, transparent 52%), 
//                              linear-gradient(-45deg, transparent 48%, rgba(255, 255, 255, 0.03) 49%, rgba(255, 255, 255, 0.03) 51%, transparent 52%)`,
//           backgroundSize: '60px 60px'
//         }}></div>
//       </div>

//       {/* Minimal accent light effects */}
//       <div className="absolute top-40 -right-20 w-60 h-60 bg-white rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
//       <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>

//       <div className="w-full max-w-md relative z-10">
//         {/* Card container */}
//         <div className="bg-card border border-border rounded-2xl shadow-lg p-8 sm:p-10 backdrop-blur-sm bg-opacity-50">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <Link href="/" className="inline-block group">
//               <div className="flex items-center justify-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-muted transition-colors duration-200">
//                   <span className="text-card-foreground font-bold text-lg">F</span>
//                 </div>
//                 <span className="text-2xl font-bold text-foreground">ForenSkill</span>
//               </div>
//             </Link>
//             <p className="text-sm text-muted-foreground font-medium">
//               Digital Forensics Skill Assessment Platform
//             </p>
//           </div>

//           {/* Divider line */}
//           <div className="h-px bg-border mb-8"></div>

//           {/* Form content */}
//           <div className="space-y-6">
//             {children}
//           </div>
//         </div>

//         {/* Footer info */}
//         <div className="text-center mt-8 text-xs text-muted-foreground">
//           <p>Advanced forensic training for professionals</p>
//         </div>
//       </div>
//     </div>
//   );
// }
