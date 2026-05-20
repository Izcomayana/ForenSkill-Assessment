'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { toast } from 'sonner';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { SpinnerCustom } from "@/components/ui/spinner"

export default function AuthForm({ type }: { type: 'login' | 'register' }) {
  const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

  const isRegister = type === 'register';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (isRegister) {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: formData.name,
          email: formData.email,
          createdAt: new Date(),
        });

        toast.success("Account created successfully 🎉");

        router.push("/dashboard");

      } else {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        toast.success("Login successful 👋");

        router.push("/dashboard");
      }

    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name - Register Only */}
      {isRegister && (
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
            Full Name
          </label>
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-[#F8FAF8] border border-gray-200 rounded-xl text-gray-700 placeholder-muted-foreground focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all hover:border-green-300"
            />
          </div>
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
          Email Address
        </label>
        <div className="relative group">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-[#F8FAF8] border border-gray-200 rounded-xl text-gray-700 placeholder-muted-foreground focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all hover:border-green-300"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
          Password
        </label>
        <div className="relative group">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-[#F8FAF8] border border-gray-200 rounded-xl text-gray-700 placeholder-muted-foreground focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all hover:border-green-300"
          />
                    <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Confirm Password - Register Only */}
      {isRegister && (
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
            Confirm Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-[#F8FAF8] border border-gray-200 rounded-xl text-gray-700 placeholder-muted-foreground focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all hover:border-green-300"
            />
                      <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] disabled:opacity-50"
      >
        {loading ? (
          <>
            <SpinnerCustom />
            <span>{isRegister ? 'Creating Account...' : 'Signing In...'}</span>
          </>
        ) : (
          <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
        )}
      </button>

      {/* Security Note */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        Your information is secure and encrypted
      </p>
    </form>
  );
}
