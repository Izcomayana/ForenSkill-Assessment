'use client';

import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      toast.success('Logged out successfully');

      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted/50 transition-all duration-200 text-sm text-red-400 hover:text-red-300"
    >
      Logout
    </Button>
  );
}