import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Plus, Minus, Popcorn, Check } from 'lucide-react';
import { ConcessionItem, BookingConcessionItem } from '../types';
import { SEED_CONCESSIONS } from '../data/seedData';

interface ConcessionsPickerProps {
  onBack: () => void;
  onConfirmConcessions: (items: BookingConcessionItem[]) => void;
}

export const ConcessionsPicker: React.FC<ConcessionsPickerProps> = ({
  onBack,
  onConfirmConcessions,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories = ['All', 'Combos', 'Popcorn', 'Snacks', 'Beverages'];

  const filteredItems = selectedCategory === 'All'
    ? SEED_CONCESSIONS
    : SEED_CONCESSIONS.filter(c => c.category === selectedCategory);

  const updateQuantity = (itemId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[itemId] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: updated };
    });
  };

  const selectedItems: BookingConcessionItem[] = Object.entries(quantities).map(([id, qty]) => {
    const item = SEED_CONCESSIONS.find(c => c.id === id)!;
    return {
      id: item.id,
      name: item.name,
      quantity: qty,
      price: item.price
    };
  });

  const subtotal = selectedItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-4 text-neutral-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-800 bg-neutral-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              aria-label="Back to seat selection"
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Step 2 of 3</span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
                Elevate Your Cinema Experience · Gourmet Concessions
              </h2>
            </div>
          </div>

          <button
            onClick={() => onConfirmConcessions([])}
            className="text-xs text-neutral-400 hover:text-white underline underline-offset-4"
          >
            Skip Snacks
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-neutral-800 bg-neutral-900/30 overflow-x-auto shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const qty = quantities[item.id] || 0;

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white font-['Outfit']">{item.name}</h3>
                    {item.badge && (
                      <span className="text-[10px] font-semibold text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                  <span className="text-base font-bold text-white font-mono">
                    ${item.price.toFixed(2)}
                  </span>

                  {qty === 0 ? (
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3.5 py-1.5 bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-neutral-950 border border-amber-500/50 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-neutral-800 rounded text-neutral-300 hover:text-white transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-bold text-amber-400 text-xs px-1">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-neutral-800 rounded text-neutral-300 hover:text-white transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-neutral-800 bg-neutral-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-xs text-neutral-400 block">
              Snacks Added: {selectedItems.reduce((acc, curr) => acc + curr.quantity, 0)} items
            </span>
            <span className="text-lg sm:text-xl font-bold text-white font-mono">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onConfirmConcessions([])}
              className="px-4 py-2.5 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold transition-colors"
            >
              Skip Snacks
            </button>
            <button
              onClick={() => onConfirmConcessions(selectedItems)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Continue to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
