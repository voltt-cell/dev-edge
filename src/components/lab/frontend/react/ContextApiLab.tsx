'use client';

import React, { useState, createContext, useContext } from 'react';
import { User, LogIn, LogOut, ShieldCheck, UserCircle } from 'lucide-react';

// 1. Create the Context
const AuthContext = createContext<{
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
} | undefined>(undefined);

// 2. Custom hook for easier access
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

// 3. Components demonstrating Context
function UserStatus() {
  const { user, logout } = useAuth();
  
  if (!user) return (
    <div className="flex items-center gap-3 text-white/40 italic text-sm">
      <UserCircle className="h-5 w-5" />
      Guest Session (No context data)
    </div>
  );

  return (
    <div className="flex items-center justify-between w-full bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg animate-in fade-in slide-in-from-top-1 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold">
          {user[0].toUpperCase()}
        </div>
        <div>
          <div className="text-xs text-white/40 uppercase tracking-tighter">Current User</div>
          <div className="text-sm font-bold text-white">{user}</div>
        </div>
      </div>
      <button 
        onClick={logout}
        className="text-[10px] uppercase font-bold text-red-400 hover:text-red-300 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}

function LoginForm() {
  const { user, login } = useAuth();
  const [name, setName] = useState('');

  if (user) return (
    <div className="flex flex-col items-center justify-center py-6 gap-2">
      <ShieldCheck className="h-12 w-12 text-emerald-400 mb-2 animate-bounce" />
      <p className="text-sm text-emerald-400/80 font-medium tracking-tight">Access Granted</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase tracking-wider text-white/40">Enter Username</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && name && login(name)}
            className="w-full bg-black/40 border border-white/10 rounded-md pl-10 pr-3 py-2 text-sm font-sans outline-none focus:border-emerald-500/50"
            placeholder="John Doe"
          />
        </div>
      </div>
      <button 
        onClick={() => name && login(name)}
        disabled={!name}
        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-30 disabled:hover:bg-emerald-500 text-black text-xs font-bold py-2.5 rounded-md transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
      >
        <LogIn className="h-4 w-4" />
        Initialize Auth Context
      </button>
    </div>
  );
}

export function ContextApiLab() {
  const [user, setUser] = useState<string | null>(null);

  const login = (name: string) => setUser(name);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <div className="flex flex-col gap-4 font-sans max-w-lg mx-auto w-full">
        {/* Header/Status Bar (Deeply Nested Demo) */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <UserStatus />
        </div>

        {/* Action Panel */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <LoginForm />
        </div>

        {/* Explain Pane */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] leading-relaxed text-white/40">
          <div className="text-emerald-500/60 mb-2">// Global state shared via Context:</div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
               <span className="text-purple-400">auth:</span>
               <span className={user ? 'text-emerald-400' : 'text-red-400'}>
                 {JSON.stringify({ authenticated: !!user, user: user || null })}
               </span>
            </div>
            <div className="italic">// {user ? 'Child components are receiving data from Provider' : 'Ready for authentication...'}</div>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
