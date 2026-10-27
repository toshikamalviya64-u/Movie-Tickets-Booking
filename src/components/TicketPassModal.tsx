import React, { useState } from 'react';
import { X, Check, Printer, Calendar, Share2, Ticket, MapPin, Sparkles, Clock } from 'lucide-react';
import { Booking } from '../types';

interface TicketPassModalProps {
  booking: Booking;
  onClose: () => void;
  onViewMyBookings: () => void;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({
  booking,
  onClose,
  onViewMyBookings,
}) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `Cinema Ticket: ${booking.movieTitle} at ${booking.theaterName} (${booking.date} · ${booking.time}) - Ref: ${booking.bookingCode}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadCalendar = () => {
    // Generate simple ICS calendar invite
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//IMovies//Cinema Ticket//EN
BEGIN:VEVENT
SUMMARY:${booking.movieTitle} (${booking.format})
DESCRIPTION:Seats: ${booking.seats.map(s => s.id).join(', ')} at ${booking.theaterName}. Booking Ref: ${booking.bookingCode}
LOCATION:${booking.theaterName}, ${booking.theaterLocation}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${booking.bookingCode}_ticket.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-6 text-neutral-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/20 via-neutral-900 to-amber-500/20 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Admission Pass Ready · Enjoy the Show</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close ticket modal"
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Pass Body */}
        <div id="printable-ticket" className="p-6 sm:p-8 space-y-6">
          {/* Ticket Card with perforated border styling */}
          <div className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl border border-neutral-700/80 p-6 shadow-2xl overflow-hidden">
            {/* Top row: Brand & Booking Code */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-amber-500" />
                <span className="font-extrabold tracking-tight font-['Outfit'] text-base text-white">
                  The <span className="text-amber-500">IMovies</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 block uppercase font-mono">Booking Ref</span>
                <span className="font-mono font-bold text-amber-400 text-sm tracking-wider">
                  {booking.bookingCode}
                </span>
              </div>
            </div>

            {/* Movie Info */}
            <div className="pt-4 flex gap-4">
              <img
                src={booking.posterUrl}
                alt={booking.movieTitle}
                referrerPolicy="no-referrer"
                className="w-20 h-28 object-cover rounded-lg border border-neutral-800 shrink-0 shadow-md"
              />
              <div className="flex flex-col justify-center gap-1">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded w-fit font-mono">
                  {booking.format}
                </span>
                <h3 className="text-lg font-extrabold text-white font-['Outfit'] line-clamp-1">
                  {booking.movieTitle}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span className="line-clamp-1">{booking.theaterName}</span>
                </div>
              </div>
            </div>

            {/* Grid specs: Date, Time, Screen, Seats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-neutral-800/80 my-4 text-xs">
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Date</span>
                <span className="font-bold text-white">{booking.date}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Showtime</span>
                <span className="font-bold text-amber-400 font-mono">{booking.time}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Auditorium</span>
                <span className="font-bold text-white">{booking.screenName}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Seat Numbers</span>
                <span className="font-bold text-amber-400 font-mono">{booking.seats.map(s => s.id).join(', ')}</span>
              </div>
            </div>

            {/* Concessions note if any */}
            {booking.concessions && booking.concessions.length > 0 && (
              <div className="bg-neutral-950/60 p-3 rounded-lg border border-neutral-800 text-xs text-neutral-300 mb-4">
                <span className="text-amber-400 font-semibold block text-[11px] uppercase mb-1">
                  Concessions Express Pickup
                </span>
                <span>
                  {booking.concessions.map(c => `${c.quantity}x ${c.name}`).join(' · ')}
                </span>
              </div>
            )}

            {/* Perforated separator cutouts */}
            <div className="relative py-2 flex items-center justify-between">
              <div className="absolute -left-9 w-6 h-6 rounded-full bg-neutral-950 border-r border-neutral-700/80" />
              <div className="w-full border-t-2 border-dashed border-neutral-700/60" />
              <div className="absolute -right-9 w-6 h-6 rounded-full bg-neutral-950 border-l border-neutral-700/80" />
            </div>

            {/* Barcode & QR Code Section */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* High Contrast Scalable QR SVG */}
              <div className="p-2 bg-white rounded-lg shadow-inner">
                <svg viewBox="0 0 100 100" className="w-20 h-20 fill-black">
                  {/* Position detection markers */}
                  <rect x="0" y="0" width="30" height="30" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="10" y="10" width="10" height="10" />

                  <rect x="70" y="0" width="30" height="30" />
                  <rect x="75" y="5" width="20" height="20" fill="white" />
                  <rect x="80" y="10" width="10" height="10" />

                  <rect x="0" y="70" width="30" height="30" />
                  <rect x="5" y="75" width="20" height="20" fill="white" />
                  <rect x="10" y="80" width="10" height="10" />

                  {/* Matrix modules */}
                  <rect x="35" y="10" width="10" height="10" />
                  <rect x="50" y="20" width="10" height="10" />
                  <rect x="20" y="40" width="10" height="10" />
                  <rect x="40" y="40" width="20" height="20" />
                  <rect x="70" y="40" width="10" height="10" />
                  <rect x="40" y="70" width="10" height="10" />
                  <rect x="60" y="70" width="20" height="10" />
                  <rect x="80" y="80" width="10" height="10" />
                </svg>
              </div>

              {/* Barcode line mock */}
              <div className="flex-1 flex flex-col items-center sm:items-end gap-1">
                <div className="flex items-center gap-1 h-12 w-48 bg-white/10 p-1.5 rounded">
                  {[3,1,2,4,1,3,2,1,4,2,3,1,2,4,1,3,2,1,3,2,4,1].map((w, i) => (
                    <div key={i} className="h-full bg-neutral-200" style={{ width: `${w * 2}px` }} />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-neutral-500">
                  SCAN AT CINEMA AUDITORIUM SCANNER
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Pass</span>
            </button>

            <button
              onClick={handleDownloadCalendar}
              className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Add Event</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>

          {/* Footer Navigation */}
          <div className="pt-2 flex items-center justify-between border-t border-neutral-800/80">
            <button
              onClick={onClose}
              className="text-xs text-neutral-400 hover:text-white underline underline-offset-4"
            >
              Back to Movies
            </button>
            <button
              onClick={onViewMyBookings}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors"
            >
              View In My Tickets Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
