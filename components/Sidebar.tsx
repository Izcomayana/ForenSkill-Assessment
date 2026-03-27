'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BookOpen, Home, LogOut, Settings, Trophy, User } from 'lucide-react';

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
    label: 'Progress',
    href: '/progress',
    icon: Trophy,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-card border-r border-border flex flex-col fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">ForenSkill</h1>
        <p className="text-sm text-muted-foreground mt-1">Forensics Platform</p>
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
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg'
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
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            pathname === '/dashboard/settings'
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'text-foreground hover:bg-muted/50'
          }`}
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>

        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted/50 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
