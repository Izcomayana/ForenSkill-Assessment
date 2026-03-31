import AuthForm from '../AuthForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      <AuthForm type="register" />

      <div className="relative">
        <hr />
        <div className="relative flex justify-center text-sm mt-4">
          <span className="px-3 text-gray-600">Already have an account?</span>
        </div>
      </div>

      <Link href="/login" className="block">
        <button className="w-full py-3 px-4 bg-secondary hover:bg-muted disabled:bg-muted/60 text-secondary-foreground font-semibold rounded-lg transition-all duration-200">
          Sign In
        </button>
      </Link>
    </>
  );
}
