'use client';

import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { Terminal, AlertCircle, Play, Fingerprint } from 'lucide-react';

// Define the methods we want to expose to the parent
export interface SecureTerminalRef {
  focus: () => void;
  shake: () => void;
  showError: (message: string) => void;
  reset: () => void;
}

// Child Component
const SecureTerminal = forwardRef<SecureTerminalRef, {}>((props, ref) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // useImperativeHandle customizes the instance value that is exposed to parent components when using ref.
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    shake: () => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); // Remove class after animation
    },
    showError: (message: string) => {
      setErrorMsg(message);
    },
    reset: () => {
      if (inputRef.current) inputRef.current.value = '';
      setErrorMsg(null);
    }
  }));

  return (
    <div className={`transition-all duration-300 w-full ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
      {/* Adding a custom shake animation inside style just for the lab. Or we can rely on Tailwind if we add it, but let's use inline keyframes or manual offset for simplicity if tailwind doesn't have it, or define it in global CSS. Actually, since this is an interactive platform, let's use inline styles for the shake or standard tailwind utilities. */}
      {/* We can simulate shake by toggling a translate X back and forth but let's just use standard tailwind classes or a simple style tag */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
          75% { transform: translateX(-10px); }
        }
      `}} />
      
      <div className={`bg-zinc-950 border ${errorMsg ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-zinc-800'} rounded-xl p-4 font-mono w-full`}>
        <div className="flex items-center text-zinc-500 mb-3 text-xs uppercase tracking-wider space-x-2">
          <Terminal size={14} />
          <span>System.Core.Authentication</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-emerald-500">root@dev-edge:~$</span>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Enter authorization code..."
            className="bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-700 flex-1 min-w-0"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setErrorMsg(null);
              }
            }}
          />
        </div>
        
        {errorMsg && (
          <div className="mt-4 flex items-center space-x-2 text-red-400 text-sm bg-red-500/10 p-2 rounded-lg">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
});

SecureTerminal.displayName = 'SecureTerminal';

// Parent Component
export function AdvancedRefsLab() {
  const terminalRef = useRef<SecureTerminalRef>(null);

  const handleSimulateAuthentication = () => {
    // Parent component dictating child behavior without passing props (Command Pattern)
    terminalRef.current?.showError("ERR_INVALID_TOKEN: Authentication failed.");
    terminalRef.current?.shake();
  };

  const handleFocus = () => {
    terminalRef.current?.focus();
    terminalRef.current?.showError(""); // Clear error on focus
  };

  const handleReset = () => {
    terminalRef.current?.reset();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-2">
          Direct Component Control
        </h3>
        <p className="text-muted-foreground mx-auto max-w-lg">
          The buttons below belong to the Parent component. They directly trigger imperative commands (<code>shake</code>, <code>focus</code>, <code>showError</code>) on the Child component via <code>ref</code>.
        </p>
      </div>

      <div className="bg-background/50 border border-border/50 rounded-2xl p-8 shadow-xl w-full max-w-md">
        
        {/* Child Component Area */}
        <div className="mb-8">
          <SecureTerminal ref={terminalRef} />
        </div>

        {/* Parent Controls */}
        <div className="space-y-4 pt-6 border-t border-white/5">
          <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Parent Controls</h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleFocus}
              className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-zinc-200 py-3 px-4 rounded-xl transition-all"
            >
              <Terminal size={18} />
              <span>Focus Input</span>
            </button>

            <button
              onClick={handleSimulateAuthentication}
              className="flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-3 px-4 rounded-xl transition-all"
            >
              <AlertCircle size={18} />
              <span>Test Auth Error</span>
            </button>
            
            <button
              onClick={handleReset}
              className="col-span-2 flex items-center justify-center space-x-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 py-3 px-4 rounded-xl transition-all"
            >
              <Play size={18} />
              <span>Reset State</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
