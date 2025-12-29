'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowRight, AlertCircle } from 'lucide-react';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'LOGIN') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }

      if (mode === 'LOGIN') {
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      if (err.message === 'Failed to fetch' || err.code === 'NETWORK_ERROR') {
        setError('Network connectivity issue. Please check your internet connection and verify that the Supabase URL in your configuration is correct.');
      } else {
        setError(err.message || 'An unexpected error occurred during authentication.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F4F4F4] p-4">
      <div className="w-full max-w-md bg-white border border-black shadow-[12px_12px_0px_0px_#FF4400]">
        <div className="border-b border-black p-6 text-center bg-black text-white">
          <h2 className="text-xl font-bold uppercase tracking-widest">
            {mode === 'LOGIN' ? 'System Access' : 'Create Account'}
          </h2>
        </div>
        <form onSubmit={handleAuth} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-500 p-4 flex items-center gap-3 text-red-700 text-sm font-mono">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          <div>
            <label className="block font-mono text-xs uppercase font-bold mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-black p-3 font-mono focus:outline-none focus:border-[#FF4400] focus:ring-1 focus:ring-[#FF4400]"
              placeholder="user@strucureo.works"
            />
          </div>
          <div>
            <label className="block font-mono text-xs uppercase font-bold mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-black p-3 font-mono focus:outline-none focus:border-[#FF4400] focus:ring-1 focus:ring-[#FF4400]"
              placeholder="••••••••"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-[#FF4400] border border-black py-4 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : (mode === 'LOGIN' ? 'Enter Dashboard' : 'Create Account')}
            {!loading && <ArrowRight size={16} />}
          </button>
          <div className="text-center space-y-4">
            <p className="font-mono text-xs text-gray-500">
              {mode === 'LOGIN' ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                type="button"
                onClick={() => setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
                className="text-black font-bold hover:underline"
              >
                {mode === 'LOGIN' ? 'Sign Up' : 'Login'}
              </button>
            </p>
            <span className="block font-mono text-xs text-gray-500 cursor-pointer hover:text-black hover:underline">Forgot Credentials?</span>
          </div>
        </form>
      </div>
    </div>
  );
}
