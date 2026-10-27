import React, { useState } from 'react';
import { X, User as UserIcon, Shield, Sparkles, LogIn, UserPlus, LogOut, Award } from 'lucide-react';
import { User } from '../types';
import { INITIAL_USER, ADMIN_USER } from '../data/seedData';

interface AuthModalProps {
  currentUser: User;
  onClose: () => void;
  onUpdateUser: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  onClose,
  onUpdateUser,
}) => {
  const [mode, setMode] = useState<'profile' | 'login' | 'register'>('profile');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase().includes('admin')) {
      onUpdateUser(ADMIN_USER);
      setFeedback('Logged in as Cinema Administrator.');
    } else {
      const user: User = {
        id: `usr-${Date.now()}`,
        name: name || email.split('@')[0],
        email,
        phone: phone || '+1 (555) 234-5678',
        role: 'user',
        memberTier: 'Standard',
        rewardPoints: 100
      };
      onUpdateUser(user);
      setFeedback('Logged in successfully.');
    }
    setTimeout(() => onClose(), 800);
  };

  const handleQuickSwitch = (target: 'user' | 'admin') => {
    if (target === 'admin') {
      onUpdateUser(ADMIN_USER);
    } else {
      onUpdateUser(INITIAL_USER);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-6 text-neutral-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <UserIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Outfit']">
                {mode === 'profile' ? 'Account Profile' : mode === 'login' ? 'Cinema Member Sign In' : 'Create Free Account'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close auth modal"
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {feedback && (
            <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300">
              {feedback}
            </div>
          )}

          {mode === 'profile' && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="p-5 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-700 text-neutral-950 font-extrabold text-lg flex items-center justify-center shadow-lg">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-['Outfit']">{currentUser.name}</h3>
                      <p className="text-xs text-neutral-400">{currentUser.email}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    currentUser.role === 'admin'
                      ? 'bg-rose-950/80 border border-rose-800 text-rose-300'
                      : 'bg-amber-500/10 border border-amber-500/40 text-amber-400'
                  }`}>
                    {currentUser.role === 'admin' ? 'SYSTEM ADMIN' : currentUser.memberTier}
                  </span>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Loyalty Points:</span>
                  </div>
                  <span className="font-mono font-bold text-white text-sm tabular-nums">
                    {currentUser.rewardPoints} pts
                  </span>
                </div>
              </div>

              {/* Quick switch between Demo Profiles */}
              <div className="space-y-2">
                <span className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider block">
                  Quick Role Switcher (One-Click Demo)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickSwitch('user')}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      currentUser.role === 'user'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span className="block font-bold">Alexander Cross</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">Customer / Viewer</span>
                  </button>

                  <button
                    onClick={() => handleQuickSwitch('admin')}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      currentUser.role === 'admin'
                        ? 'border-rose-500 bg-rose-500/10 text-rose-300'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span className="block font-bold">Elena Rostova</span>
                    <span className="text-[10px] text-rose-400 block mt-0.5">Admin & Theater Mgr</span>
                  </button>
                </div>
              </div>

              {/* Action toggles */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-xs">
                <button
                  onClick={() => setMode('login')}
                  className="text-amber-400 hover:text-amber-300 font-semibold"
                >
                  Sign In to Another Account
                </button>

                <button
                  onClick={() => {
                    onUpdateUser({
                      id: 'usr-guest',
                      name: 'Guest Viewer',
                      email: 'guest@imovies.com',
                      phone: '+1 (555) 000-0000',
                      role: 'user',
                      memberTier: 'Standard',
                      rewardPoints: 0
                    });
                    onClose();
                  }}
                  className="text-neutral-500 hover:text-neutral-300 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {(mode === 'login' || mode === 'register') && (
            <form onSubmit={handleLogin} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {mode === 'register' && (
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors shadow-md shadow-amber-500/20"
              >
                {mode === 'login' ? 'Sign In & Access Bookings' : 'Register Account'}
              </button>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="hover:text-amber-400 underline underline-offset-4"
                >
                  {mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('profile')}
                  className="hover:text-white"
                >
                  Back
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
