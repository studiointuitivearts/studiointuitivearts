import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { LogIn, Loader2 } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError('Ongeldige inloggegevens. Controleer je e-mail en wachtwoord.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-brand-cream rounded-3xl shadow-xl p-8 border border-brand-green/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-brand-green" size={32} />
          </div>
          <h2 className="text-3xl font-serif">Admin Login</h2>
          <p className="text-brand-dark/60 mt-2">Log in om de website te beheren</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brand-dark/70 mb-2">E-mailadres</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-green/10 focus:ring-2 focus:ring-brand-green outline-none bg-white transition-all"
              placeholder="naam@voorbeeld.nl"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark/70 mb-2">Wachtwoord</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-brand-green/10 focus:ring-2 focus:ring-brand-green outline-none bg-white transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-green text-white py-4 rounded-xl font-medium hover:bg-brand-green/90 transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Inloggen'}
          </button>
        </form>
      </div>
    </div>
  );
}
