import AuthForm from '../AuthForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      <AuthForm type="register" />

      <div className="relative">
        <hr />
        <div className="relative flex justify-center text-sm mt-4">
          <span className="px-3 text-gray-200">Already have an account?</span>
        </div>
      </div>

      <Link href="/login" className="block">
        <button  className="w-full py-3 px-4 mt-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-400 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] disabled:opacity-50">
          Sign In
        </button>
      </Link>
    </>
  );
}
