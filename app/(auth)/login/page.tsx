"use client"

import { useAuth } from '@/context/AuthContext';
import AuthForm from '../AuthForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
      const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);
  
  return (
    <>
      <AuthForm type="login" />

      <div className="relative">
        <hr />
        <div className="relative flex justify-center text-sm mt-4">
          <span className="px-3 text-gray-600">New to ForenSkill?</span>
        </div>
      </div>

      <Link href="/register" className="block">
        <button className="w-full py-3 px-4 bg-secondary hover:bg-muted disabled:bg-muted/60 text-secondary-foreground font-semibold rounded-lg transition-all duration-200">
          Create an Account
        </button>
      </Link>
    </>
  );
}


// "use client"

// import { useAuth } from '@/context/AuthContext';
// import AuthForm from '../AuthForm';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function LoginPage() {
  //   const { user, loading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!loading && user) {
  //     router.push('/dashboard');
  //   }
  // }, [user, loading, router]);
  
//   return (
//     <>
//       <AuthForm type="login" />

//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-slate-600"></div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-3 bg-slate-800/50 backdrop-blur text-slate-400">New to ForenSkill?</span>
//         </div>
//       </div>

//       <Link href="/register" className="block">
//         <button className="w-full py-3 px-4 border border-slate-600 hover:border-slate-500 bg-slate-700/20 hover:bg-slate-700/40 text-slate-200 font-semibold rounded-lg transition-all duration-200">
//           Create an Account
//         </button>
//       </Link>
//     </>
//   );
// }