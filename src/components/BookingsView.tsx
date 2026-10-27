import React, { useState } from 'react';
import { Ticket, Calendar, Clock, MapPin, QrCode, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { Booking } from '../types';

interface BookingsViewProps {
  bookings: Booking[];
  onViewTicket: (booking: Booking) => void;
  onCancelBooking: (bookingId: string) => void;
  onBrowseMovies: () => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  bookings,
  onViewTicket,
  onCancelBooking,
  onBrowseMovies,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'refunded'>('all');

  const filteredBookings = bookings.filter(b => {
    if (filter === 'active') return b.paymentStatus === 'completed';
    if (filter === 'refunded') return b.paymentStatus === 'refunded';
    return true;
  });

  const activeCount = bookings.filter(b => b.paymentStatus === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Ticket Wallet</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            My Cinema Reservations
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Access your admission passes, contactless barcodes, and booking receipts.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              filter === 'all' ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            All ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              filter === 'active' ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setFilter('refunded')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              filter === 'refunded' ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Refunded ({bookings.length - activeCount})
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-['Outfit']">No Reservations Found</h3>
            <p className="text-xs text-neutral-400 mt-1">
              {filter === 'all' 
                ? "You haven't reserved any cinema tickets yet. Explore now showing blockbusters!"
                : `You have no ${filter} reservations.`}
            </p>
          </div>
          <button
            onClick={onBrowseMovies}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors"
          >
            Explore Now Showing Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((b) => {
            const isRefunded = b.paymentStatus === 'refunded';

            return (
              <div
                key={b.id}
                className={`relative rounded-2xl border transition-all p-5 flex flex-col justify-between gap-4 ${
                  isRefunded
                    ? 'bg-neutral-950/60 border-neutral-800/60 opacity-60'
                    : 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-700 shadow-xl shadow-black/40'
                }`}
              >
                {/* Header info */}
                <div className="flex gap-4">
                  <img
                    src={b.posterUrl}
                    alt={b.movieTitle}
                    referrerPolicy="no-referrer"
                    className="w-20 h-28 object-cover rounded-xl border border-neutral-800 shrink-0"
                  />
                  <div className="flex flex-col justify-center flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        {b.bookingCode}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          isRefunded
                            ? 'bg-neutral-800 text-neutral-400'
                            : 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                        }`}
                      >
                        {isRefunded ? 'Refunded' : 'Confirmed'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white font-['Outfit'] mt-1 line-clamp-1">
                      {b.movieTitle}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span className="line-clamp-1">{b.theaterName}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-neutral-300 mt-2 font-mono">
                      <span>{b.date}</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-amber-400 font-bold">{b.time}</span>
                    </div>
                  </div>
                </div>

                {/* Specs: Seats & Concessions */}
                <div className="bg-neutral-950/80 rounded-xl p-3 border border-neutral-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase">Reserved Seats</span>
                    <span className="font-mono font-bold text-white">{b.seats.map(s => s.id).join(', ')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-500 block uppercase">Total Amount</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">${b.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  {!isRefunded ? (
                    <>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to cancel booking ${b.bookingCode}? Seats will be released back to the auditorium.`)) {
                            onCancelBooking(b.id);
                          }
                        }}
                        className="text-xs text-neutral-500 hover:text-rose-400 transition-colors flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Cancel & Refund</span>
                      </button>

                      <button
                        onClick={() => onViewTicket(b)}
                        className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/10"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>View Ticket Pass</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-neutral-500 italic">
                      This reservation was cancelled. Refund credited to {b.paymentMethod}.
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
