'use client';

import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

export function UseStateLab() {
  const [count, setCount] = useState(0);
  const pricePerItem = 99;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
          Stateful Shopping Cart
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Notice how the component updates automatically whenever the count changes. This is the power of <code>useState</code>.
        </p>
      </div>

      <div className="bg-background/50 border border-border/50 rounded-2xl p-8 shadow-xl w-full max-w-sm">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h4 className="font-semibold text-lg">Premium Headphones</h4>
            <p className="text-muted-foreground text-sm">${pricePerItem} each</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        <div className="flex items-center justify-between bg-black/20 p-2 rounded-xl border border-white/5 mb-6">
          <button
            onClick={() => setCount(Math.max(0, count - 1))}
            disabled={count === 0}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Minus className="w-5 h-5 text-zinc-300" />
          </button>
          
          <div className="flex flex-col items-center justify-center w-16">
            <span className="text-3xl font-bold font-mono text-white">{count}</span>
          </div>

          <button
            onClick={() => setCount(count + 1)}
            className="p-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="pt-6 border-t border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-mono">${count * pricePerItem}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-mono text-emerald-400">{count > 0 ? 'Free' : '$0'}</span>
          </div>
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span className="font-mono text-white">${count * pricePerItem}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
