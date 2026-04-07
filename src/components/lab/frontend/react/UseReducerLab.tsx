'use client';

import React, { useReducer } from 'react';
import { Minus, Plus, Trash2, Tag, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discountCode: string;
  discountAmount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'APPLY_DISCOUNT'; payload: string }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [
    { id: '1', name: 'Mechanical Keyboard', price: 129, quantity: 1 }
  ],
  discountCode: '',
  discountAmount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i)
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.quantity) } : i)
      };
    case 'APPLY_DISCOUNT': {
      const code = action.payload.toUpperCase();
      let discount = 0;
      if (code === 'DEV20') discount = 20;
      if (code === 'REACT50') discount = 50;
      return { ...state, discountCode: action.payload, discountAmount: discount };
    }
    case 'CLEAR_CART':
      return { ...initialState, items: [] };
    default:
      return state;
  }
}

export function UseReducerLab() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const subtotal = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = Math.max(0, subtotal - state.discountAmount);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
          Complex State with useReducer
        </h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          When state gets complex with interdependent values (like items in a cart, subtotal, and discounts), <code>useReducer</code> provides predictable state transitions through actions.
        </p>
      </div>

      <div className="bg-background/50 border border-border/50 rounded-3xl p-6 md:p-8 shadow-xl w-full max-w-2xl grid md:grid-cols-2 gap-8">
        
        {/* Left Column: Cart Items */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" /> Your Cart
            </h4>
            <button 
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              className="text-xs text-muted-foreground hover:text-red-400 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {state.items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground bg-white/5 rounded-xl border border-dashed border-white/10">
                Cart is empty
              </div>
            ) : (
              state.items.map(item => (
                <div key={item.id} className="flex flex-col gap-3 bg-black/20 border border-white/5 p-4 rounded-xl">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">{item.name}</span>
                    <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })} className="text-muted-foreground hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-mono text-emerald-400">${item.price}</div>
                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1 border border-white/5">
                      <button 
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                        className="p-1 hover:bg-white/10 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                        className="p-1 hover:bg-white/10 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => dispatch({ type: 'ADD_ITEM', payload: { id: Math.random().toString(), name: 'Wireless Mouse', price: 59 } })}
            className="w-full py-3 border border-dashed border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-colors font-medium text-sm"
          >
            + Add &quot;Wireless Mouse&quot;
          </button>
        </div>

        {/* Right Column: Checkout Summary */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col h-full">
          <h4 className="font-semibold text-lg mb-6">Order Summary</h4>
          
          <div className="space-y-4 mb-8 flex-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-mono">${subtotal}</span>
            </div>
            
            {state.discountAmount > 0 && (
              <div className="flex justify-between text-sm text-emerald-400 font-medium">
                <span>Discount ({state.discountCode.toUpperCase()})</span>
                <span className="font-mono">-${state.discountAmount}</span>
              </div>
            )}
            
            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="font-mono">${total}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-auto">
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Promo Code (Try DEV20)"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors uppercase font-mono"
                onChange={(e) => dispatch({ type: 'APPLY_DISCOUNT', payload: e.target.value })}
              />
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-4 rounded-xl transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
