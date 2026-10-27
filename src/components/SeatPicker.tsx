import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Info, Armchair, Accessibility } from 'lucide-react';
import { Movie, Theater, Showtime, BookingSeatItem, SeatTier } from '../types';

interface SeatPickerProps {
  movie: Movie;
  theater: Theater;
  showtime: Showtime;
  onBack: () => void;
  onConfirmSeats: (seats: BookingSeatItem[]) => void;
}

export const SeatPicker: React.FC<SeatPickerProps> = ({
  movie,
  theater,
  showtime,
  onBack,
  onConfirmSeats,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<BookingSeatItem[]>([]);
  const maxSeats = 8;

  // Auditorium Row Layout
  // VIP Rows: H, I, J
  // Premium Rows: D, E, F, G
  // Standard Rows: A, B, C
  const rows = [
    { row: 'J', tier: 'vip' as SeatTier, price: showtime.pricing.vip },
    { row: 'I', tier: 'vip' as SeatTier, price: showtime.pricing.vip },
    { row: 'H', tier: 'vip' as SeatTier, price: showtime.pricing.vip },
    { row: 'G', tier: 'premium' as SeatTier, price: showtime.pricing.premium },
    { row: 'F', tier: 'premium' as SeatTier, price: showtime.pricing.premium },
    { row: 'E', tier: 'premium' as SeatTier, price: showtime.pricing.premium },
    { row: 'D', tier: 'premium' as SeatTier, price: showtime.pricing.premium },
    { row: 'C', tier: 'standard' as SeatTier, price: showtime.pricing.standard },
    { row: 'B', tier: 'standard' as SeatTier, price: showtime.pricing.standard },
    { row: 'A', tier: 'standard' as SeatTier, price: showtime.pricing.standard },
  ];

  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const isBooked = (seatId: string) => showtime.bookedSeatIds.includes(seatId);
  const isSelected = (seatId: string) => selectedSeats.some(s => s.id === seatId);

  const toggleSeat = (row: string, col: number, tier: SeatTier, price: number) => {
    const seatId = `${row}${col}`;
    if (isBooked(seatId)) return;

    if (isSelected(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s.id !== seatId));
    } else {
      if (selectedSeats.length >= maxSeats) {
        alert(`You can select a maximum of ${maxSeats} seats per booking.`);
        return;
      }
      setSelectedSeats(prev => [...prev, { id: seatId, row, col, tier, price }]);
    }
  };

  const totalPrice = selectedSeats.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-4 text-neutral-100 flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-800 bg-neutral-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              aria-label="Back to showtimes"
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="font-semibold text-amber-400 font-['Outfit']">{movie.title}</span>
                <span className="text-neutral-600">·</span>
                <span>{theater.name}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-300 font-mono">{showtime.date} ({showtime.time})</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
                Select Your Seats · {showtime.format}
              </h2>
            </div>
          </div>

          <button
            onClick={onBack}
            aria-label="Close seat picker"
            className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-3 px-4 border-b border-neutral-800/80 bg-neutral-900/30 text-xs text-neutral-400 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-neutral-800 border border-neutral-700" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-500 shadow-sm shadow-amber-500/50" />
            <span className="text-white font-medium">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-neutral-900 border border-neutral-800 opacity-40 cursor-not-allowed" />
            <span>Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-indigo-950 border border-indigo-700 flex items-center justify-center">
              <Accessibility className="w-2.5 h-2.5 text-indigo-300" />
            </div>
            <span>Accessible</span>
          </div>
        </div>

        {/* Seat Map Viewport */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 flex flex-col items-center">
          {/* Curved Cinema Screen SVG */}
          <div className="w-full max-w-2xl mb-10 flex flex-col items-center">
            <svg viewBox="0 0 600 60" className="w-full h-12 text-amber-500/30">
              <defs>
                <linearGradient id="screenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 20 45 Q 300 5 580 45"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="filter drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]"
              />
              <path
                d="M 20 45 Q 300 5 580 45 L 580 58 Q 300 20 20 58 Z"
                fill="url(#screenGlow)"
              />
            </svg>
            <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase mt-1">
              Curved Screen · Panavision 70mm Eyes Front
            </span>
          </div>

          {/* Seat Grid */}
          <div className="w-full max-w-3xl overflow-x-auto pb-4 flex flex-col items-center">
            <div className="space-y-2.5 min-w-[580px]">
              {rows.map(({ row, tier, price }) => (
                <div key={row} className="flex items-center gap-2 sm:gap-3 justify-center">
                  {/* Row Label (Left) */}
                  <span className="w-5 text-xs font-mono font-bold text-neutral-500 text-center">
                    {row}
                  </span>

                  {/* Seat Row */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {cols.map((col) => {
                      const seatId = `${row}${col}`;
                      const booked = isBooked(seatId);
                      const selected = isSelected(seatId);
                      const isWheelchair = (row === 'A' && (col === 1 || col === 14));
                      const isAisleGap = col === 7;

                      return (
                        <React.Fragment key={col}>
                          <button
                            type="button"
                            disabled={booked}
                            onClick={() => toggleSeat(row, col, tier, price)}
                            title={`${seatId} - ${tier.toUpperCase()} ($${price.toFixed(2)})`}
                            className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-t-lg rounded-b-sm flex items-center justify-center text-[10px] font-mono transition-all duration-150 ${
                              booked
                                ? 'bg-neutral-900 border border-neutral-800 text-neutral-600 opacity-40 cursor-not-allowed'
                                : selected
                                ? 'bg-amber-500 text-neutral-950 font-bold scale-105 shadow-md shadow-amber-500/40 ring-2 ring-amber-300'
                                : tier === 'vip'
                                ? 'bg-neutral-800/90 border border-amber-500/40 text-neutral-300 hover:bg-neutral-700 hover:border-amber-400'
                                : tier === 'premium'
                                ? 'bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700'
                                : 'bg-neutral-800/70 border border-neutral-700 text-neutral-400 hover:bg-neutral-700'
                            }`}
                          >
                            {isWheelchair && !selected && !booked ? (
                              <Accessibility className="w-3.5 h-3.5 text-indigo-400" />
                            ) : (
                              col
                            )}
                          </button>

                          {/* Aisle Spacer */}
                          {isAisleGap && <div className="w-4 sm:w-8" />}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Row Label (Right) */}
                  <span className="w-5 text-xs font-mono font-bold text-neutral-500 text-center">
                    {row}
                  </span>
                </div>
              ))}
            </div>

            {/* Tier Price Labels */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-4 border-t border-neutral-800/80 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span>VIP Recliner (Rows H-J): <strong className="text-white font-mono">${showtime.pricing.vip.toFixed(2)}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                <span>Premium Center (Rows D-G): <strong className="text-white font-mono">${showtime.pricing.premium.toFixed(2)}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                <span>Standard (Rows A-C): <strong className="text-white font-mono">${showtime.pricing.standard.toFixed(2)}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Booking Summary Tray */}
        <div className="p-4 sm:p-6 border-t border-neutral-800 bg-neutral-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-neutral-400">
              Selected Seats ({selectedSeats.length} of {maxSeats} max):
            </span>
            <div className="flex flex-wrap items-center gap-1.5 min-h-[28px]">
              {selectedSeats.length === 0 ? (
                <span className="text-xs text-neutral-500 italic">No seats selected yet. Click any available seat above.</span>
              ) : (
                selectedSeats.map(s => (
                  <span
                    key={s.id}
                    className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-semibold text-xs"
                  >
                    {s.id} (${s.price})
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-6">
            <div className="text-right">
              <span className="text-[11px] text-neutral-400 block">Total Seat Price</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              onClick={() => onConfirmSeats(selectedSeats)}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-neutral-950 font-bold text-sm transition-all duration-200 flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Continue to Snacks</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
