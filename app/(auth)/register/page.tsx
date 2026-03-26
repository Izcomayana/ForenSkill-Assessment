import AuthForm from '../AuthForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      <AuthForm type="register" />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-slate-800/50 backdrop-blur text-slate-400">Already have an account?</span>
        </div>
      </div>

      <Link href="/login" className="block">
        <button className="w-full py-3 px-4 border border-slate-600 hover:border-slate-500 bg-slate-700/20 hover:bg-slate-700/40 text-slate-200 font-semibold rounded-lg transition-all duration-200">
          Sign In
        </button>
      </Link>
    </>
  );
}
