import React, { useState } from 'react';
import { Popcorn, Sparkles, Plus, Check } from 'lucide-react';
import { SEED_CONCESSIONS } from '../data/seedData';

interface ConcessionsMenuViewProps {
  onBrowseMovies: () => void;
}

export const ConcessionsMenuView: React.FC<ConcessionsMenuViewProps> = ({
  onBrowseMovies,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Combos', 'Popcorn', 'Snacks', 'Beverages'];

  const filtered = activeCategory === 'All' 
    ? SEED_CONCESSIONS 
    : SEED_CONCESSIONS.filter(c => c.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Bistro & Concessions</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            Cinema Dining & Handcrafted Treats
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Order in advance with your movie tickets for instant express pickup or in-seat auditorium delivery.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between gap-4 group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs text-amber-400 uppercase font-mono font-medium">
                  {item.category}
                </span>
                {item.badge && (
                  <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/80 border border-amber-800/80 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white font-['Outfit'] group-hover:text-amber-400 transition-colors">
                {item.name}
              </h3>

              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-lg font-bold text-white font-mono">
                ${item.price.toFixed(2)}
              </span>

              <button
                onClick={onBrowseMovies}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <span>Add with Tickets</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
