'use client'
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  // Render modal to document.body using createPortal
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl max-w-sm w-full mx-4 animate-in zoom-in-95 duration-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export function ReactPortalsLab() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 border border-zinc-800 rounded-xl bg-zinc-950/50">
      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-xl font-bold text-emerald-400">React Portals Demo</h3>
        <p className="text-sm text-zinc-400">
          Click the button below to open a modal. Although the component is rendered deep inside this lab component, <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300">createPortal</code> mounts it directly to <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300">document.body</code>.
        </p>
      </div>

      <div className="p-6 border border-dashed border-zinc-700 bg-zinc-900/50 rounded-xl">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
        >
          <ExternalLink className="h-4 w-4" />
          Open Portal Modal
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Hello from the Portal! 🚪</h2>
          <p className="text-zinc-300 text-sm">
            I am physically rendered outside of my parent component's DOM hierarchy, directly in the <code className="text-emerald-400">document.body</code>. This solves `z-index` and `overflow: hidden` issues associated with regular modals!
          </p>
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-zinc-700"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
