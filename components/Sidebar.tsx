'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BarChart3, BookOpen, Home, LogOut, Settings, Info, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">ForenSkill</h1>
          <p className="text-sm text-muted-foreground mt-1">Forensics Platform</p>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-muted-foreground hover:text-foreground"
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
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-secondary text-secondary-foreground shadow-lg'
                  : 'text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border space-y-2">
        <Link
          href="/dashboard/settings"
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            pathname === '/dashboard/settings'
              ? 'bg-secondary text-secondary-foreground shadow-lg'
              : 'text-foreground hover:bg-muted/50'
          }`}
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>

        <Button
          variant="ghost"
          className="w-full justify-start text-foreground hover:bg-muted/50"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border text-foreground hover:bg-muted/50 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Desktop Fixed */}
      <aside className="hidden lg:flex h-screen w-64 bg-card border-r border-border flex-col fixed left-0 top-0 z-40">
        <NavContent />
      </aside>

      {/* Sidebar - Mobile Slide-out */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-screen w-64 bg-card border-r border-border flex flex-col z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
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
// import { BarChart3, BookOpen, Home, LogOut, Settings, Info, } from 'lucide-react';
// import LogoutButton from './Logout';

// const navItems = [
  // {
  //   label: 'Dashboard',
  //   href: '/dashboard',
  //   icon: Home,
  // },
  // {
  //   label: 'Assessment',
  //   href: '/assessment',
  //   icon: BookOpen,
  // },
  // {
  //   label: 'Results',
  //   href: '/results',
  //   icon: BarChart3,
  // },
  // {
  //   label: 'Recommendations',
  //   href: '/recommendations',
  //   icon: Info,
  // },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="h-screen w-64 bg-card border-r border-border flex flex-col fixed left-0 top-0">
//       {/* Logo Section */}
//       <div className="p-6 border-b border-border">
//         <h1 className="text-2xl font-bold text-primary">ForenSkill</h1>
//         <p className="text-sm text-muted-foreground mt-1">Forensics Platform</p>
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
//               className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
//                   ? 'bg-primary text-primary-foreground shadow-lg'
//                   : 'text-foreground hover:bg-muted/50'
//                 }`}
//             >
//               <Icon size={20} />
//               <span className="font-medium">{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Bottom Section */}
//       <div className="p-4 border-t border-border space-y-2">
//         <Link
//           href="/dashboard/settings"
//           className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${pathname === '/dashboard/settings'
//               ? 'bg-primary text-primary-foreground shadow-lg'
//               : 'text-foreground hover:bg-muted/50'
//             }`}
//         >
//           <Settings size={20} />
//           <span className="font-medium">Settings</span>
//         </Link>


//         <div className="mt-auto pt-6 border-t border-border">
//           <LogoutButton />
//         </div>
//       </div>
//     </aside>
//   );
// }
