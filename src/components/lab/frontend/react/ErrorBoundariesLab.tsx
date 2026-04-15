'use client';

import React, { Component, useState } from 'react';
import { RefreshCw, AlertTriangle, Bug } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-xl flex flex-col items-center justify-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-red-500" />
          <h3 className="text-lg font-bold text-red-100 mt-2">Component Crashed</h3>
          <p className="text-xs text-red-300/80 max-w-sm text-center">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button 
            onClick={this.resetError}
            className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 border border-slate-700"
          >
            <RefreshCw className="w-4 h-4" /> Remount Component
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function BuggyProfile({ name }: { name: string }) {
  const [crashed, setCrashed] = useState(false);
  
  if (crashed) {
    // This will be caught by the nearest Error Boundary
    throw new Error(`CRASH: Could not load user profile for ${name}`);
  }

  return (
    <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-xl flex flex-col items-center h-full">
      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 border border-emerald-500/40">
        <span className="text-2xl font-bold text-emerald-400">{name[0]}</span>
      </div>
      <h4 className="text-lg text-emerald-100 font-bold mb-1">{name}'s Profile</h4>
      <p className="text-xs text-emerald-400/60 mb-6">Working perfectly</p>
      
      <div className="mt-auto">
        <button 
          onClick={() => setCrashed(true)}
          className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-xs px-4 py-2 rounded-lg flex items-center gap-2 transition-colors focus:ring-2 focus:ring-red-500/50 outline-none"
        >
          <Bug className="w-3 h-3" /> Throw Error
        </button>
      </div>
    </div>
  );
}

export function ErrorBoundariesLab() {
  return (
    <div className="flex flex-col gap-6 w-full text-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
        {/* Protected Subtree */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Protected by Boundary
            </span>
          </div>
          
          <div className="border border-dashed border-emerald-500/30 rounded-2xl p-4 bg-slate-900/40 relative">
            <ErrorBoundary>
                <BuggyProfile name="Alex" />
            </ErrorBoundary>
          </div>
        </div>

        {/* Regular Subtree */}
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center px-1">
            <span className="text-sm font-semibold text-blue-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span> Normal Component
            </span>
          </div>
          <div className="border border-dashed border-blue-500/30 rounded-2xl p-4 bg-slate-900/40">
             {/* If you crash this one, it might crash the whole NextJS page if not caught above */}
             <BuggyProfile name="Sarah" />
          </div>
        </div>

      </div>

      <div className="p-4 mt-6 bg-yellow-500/10 border-l-4 border-l-yellow-500 border-yellow-500/20 rounded-xl relative overflow-hidden group">
        <p className="text-sm text-yellow-200/80 leading-relaxed font-mono">
          <strong className="text-yellow-400">Next.js Dev-Mode Notice: </strong> 
          If you "Throw Error" while running this App in development mode locally, you will still see the Next.js Red Error Overlay pop up.
          <br/><br/>
          Simply close it (click the 'X' or press Escape) to reveal the custom Error Boundary underneath! In a real production deployment, the Next.js overlay is stripped out, and users only see the custom fallback UI.
        </p>
      </div>
    </div>
  );
}
