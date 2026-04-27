'use client';

import React, { useState, useOptimistic, useTransition, useRef, useEffect } from 'react';
import { Send, CheckCircle2, Clock, MessageSquare, ShieldCheck, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string | number;
  text: string;
  status: 'sending' | 'sent';
  timestamp: Date;
}

// Simulated server action with artificial delay
const sendMessageToServer = async (text: string): Promise<Message> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay to see the "optimistic" state
  return {
    id: Math.random().toString(36).substring(7),
    text,
    status: 'sent',
    timestamp: new Date(),
  };
};

export function OptimisticUpdatesLab() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'initial', 
      text: "Welcome! Send a message to see Optimistic Updates in action. ⚡️", 
      status: 'sent',
      timestamp: new Date()
    }
  ]);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // useOptimistic provides a temporary "optimistic" version of our state
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessageText: string): Message[] => [
      ...state,
      {
        id: 'temp-' + Date.now(),
        text: newMessageText,
        status: 'sending',
        timestamp: new Date(),
      }
    ]
  );

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [optimisticMessages]);

  async function handleAction(formData: FormData) {
    const text = formData.get('message') as string;
    if (!text.trim()) return;

    // Reset the form immediately
    formRef.current?.reset();

    startTransition(async () => {
      // 1. Trigger the optimistic update immediately
      addOptimisticMessage(text);
      
      try {
        // 2. Perform the actual "server" operation
        const result = await sendMessageToServer(text);
        
        // 3. Once the server responds, update the real source of truth
        // React will then replace the optimistic state with this real state
        setMessages((prev) => [...prev, result]);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    });
  }

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto border border-zinc-800 rounded-2xl bg-black/40 overflow-hidden shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="bg-zinc-900/50 p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm leading-none">Secure Messenger</h3>
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Encrypted Node</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-full border border-zinc-700">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-zinc-400 font-medium">Server Online</span>
        </div>
      </div>

      {/* Message List */}
      <div 
        ref={scrollRef}
        className="h-[350px] overflow-y-auto p-6 space-y-4 custom-scrollbar"
      >
        {optimisticMessages.map((msg) => (
          <div 
            key={msg.id}
            className={cn(
              "flex flex-col max-w-[80%] group animate-in fade-in slide-in-from-bottom-2 duration-300",
              "ml-auto" // In this demo, all messages are from "user"
            )}
          >
            <div className={cn(
              "px-4 py-3 rounded-2xl text-sm shadow-lg",
              msg.status === 'sending' 
                ? "bg-zinc-800/50 border border-zinc-700 text-zinc-400 italic" 
                : "bg-emerald-600 text-white border border-emerald-500"
            )}>
              {msg.text}
            </div>
            <div className="flex items-center gap-2 mt-1 px-1">
              {msg.status === 'sending' ? (
                <>
                  <Clock className="w-3 h-3 text-zinc-500 animate-spin" />
                  <span className="text-[10px] text-zinc-500 font-medium italic">Encrypting & Sending...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] text-zinc-500 font-medium">
                    Delivered • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-900/50 border-t border-zinc-800">
        <form 
          ref={formRef}
          action={handleAction}
          className="flex items-center gap-3"
        >
          <div className="relative flex-1">
            <input
              type="text"
              name="message"
              placeholder="Type a secure message..."
              autoComplete="off"
              className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <User className="w-4 h-4 text-zinc-700" />
            </div>
          </div>
          <button
            type="submit"
            className="w-12 h-12 flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="mt-3 text-[10px] text-zinc-500 text-center flex items-center justify-center gap-1.5">
          <MessageSquare className="w-3 h-3" />
          Notice how the UI updates <span className="text-emerald-400 font-bold uppercase tracking-tighter">instantly</span> while the server takes 2 seconds to respond.
        </p>
      </div>
    </div>
  );
}
