'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BarChart3, BookOpen, Home, LogOut, Settings, Info, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoutButton from './Logout';
import forenscore from "@/public/forenscore.png"
import Image from 'next/image';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Assessment',
    href: '/assessment',
    icon: BookOpen,
  },
  {
    label: 'Results',
    href: '/results',
    icon: BarChart3,
  },
  {
    label: 'Recommendations',
    href: '/recommendations',
    icon: Info,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const NavContent = () => (
    <>
      {/* Logo Section */}
      <div className="p-6 border-b border-secondary/30 bg-background flex items-center justify-between">
        {/* <Image src={forenscore} width={200} height={200} alt='forenscor-logo' className='mx-auto' /> */}
        <div>
          <div className="flex items-center justify-center gap-3">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">F</span>
            </div> */}

            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">foren</span>
              <span className="text-blue-400">score</span>
            </span>
          </div>
          {/* <p className="text-xs text-muted-foreground mt-1 font-medium">Forensics Platform</p> */}
        </div>
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-muted-foreground hover:text-secondary transition-colors duration-200"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${isActive
                ? 'bg-gradient-to-r from-secondary to-accent text-foreground shadow-lg shadow-secondary/30'
                : 'text-foreground hover:bg-secondary/20 hover:text-secondary'
                }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              <Icon size={20} className="relative z-10" />
              <span className="font-medium relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-secondary/30 space-y-2">
        <LogoutButton />
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gradient-to-br from-secondary/30 to-accent/20 border border-secondary/50 text-secondary hover:border-secondary/80 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 z-30 transition-opacity backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Desktop Fixed */}
      <aside className="hidden lg:flex h-screen w-64 bg-background border-r border-secondary/30 flex-col fixed left-0 top-0 z-40">
        <NavContent />
      </aside>

      {/* Sidebar - Mobile Slide-out */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-screen w-64 bg-background border-r border-secondary/30 flex flex-col z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <NavContent />
      </aside>
    </>
  );
}



// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useState } from 'react';
// import { BarChart3, BookOpen, Home, LogOut, Settings, Info, Menu, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import LogoutButton from './Logout';

// const navItems = [
//   {
//     label: 'Dashboard',
//     href: '/dashboard',
//     icon: Home,
//   },
//   {
//     label: 'Assessment',
//     href: '/assessment',
//     icon: BookOpen,
//   },
//   {
//     label: 'Results',
//     href: '/results',
//     icon: BarChart3,
//   },
//   {
//     label: 'Recommendations',
//     href: '/recommendations',
//     icon: Info,
//   },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);

//   const NavContent = () => (
//     <>
//       {/* Logo Section */}
//       <div className="p-6 border-b border-secondary/30 bg-background flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">ForenSkill</h1>
//           <p className="text-xs text-muted-foreground mt-1 font-medium">Forensics Platform</p>
//         </div>
//         {/* Close button for mobile */}
//         <button
//           onClick={() => setIsOpen(false)}
//           className="lg:hidden text-muted-foreground hover:text-secondary transition-colors duration-200"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto p-4 space-y-2">
//         {navItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.href;

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               onClick={() => setIsOpen(false)}
//               className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
//                 isActive
//                   ? 'bg-gradient-to-r from-secondary to-accent text-foreground shadow-lg shadow-secondary/30'
//                   : 'text-foreground hover:bg-secondary/20 hover:text-secondary'
//               }`}
//             >
//               {isActive && (
//                 <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               )}
//               <Icon size={20} className="relative z-10" />
//               <span className="font-medium relative z-10">{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Bottom Section */}
//       <div className="p-4 border-t border-secondary/30 space-y-2">
//           <LogoutButton />
//       </div>
//     </>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gradient-to-br from-secondary/30 to-accent/20 border border-secondary/50 text-secondary hover:border-secondary/80 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300"
//       >
//         <Menu size={24} />
//       </button>

//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black/70 z-30 transition-opacity backdrop-blur-sm"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar - Desktop Fixed */}
//       <aside className="hidden lg:flex h-screen w-64 bg-background border-r border-secondary/30 flex-col fixed left-0 top-0 z-40">
//         <NavContent />
//       </aside>

//       {/* Sidebar - Mobile Slide-out */}
//       <aside
//         className={`lg:hidden fixed top-0 left-0 h-screen w-64 bg-background border-r border-secondary/30 flex flex-col z-40 transition-transform duration-300 ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <NavContent />
//       </aside>
//     </>
//   );
// }

