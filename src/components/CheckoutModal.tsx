import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, CreditCard, QrCode, Smartphone, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { Movie, Theater, Showtime, BookingSeatItem, BookingConcessionItem, User, Booking } from '../types';

interface CheckoutModalProps {
  movie: Movie;
  theater: Theater;
  showtime: Showtime;
  seats: BookingSeatItem[];
  concessions: BookingConcessionItem[];
  currentUser: User;
  onBack: () => void;
  onPaymentSuccess: (booking: Booking) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  movie,
  theater,
  showtime,
  seats,
  concessions,
  currentUser,
  onBack,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successState, setSuccessState] = useState<boolean>(false);

  // Form states
  const [userName, setUserName] = useState<string>(currentUser.name);
  const [userEmail, setUserEmail] = useState<string>(currentUser.email);
  const [userPhone, setUserPhone] = useState<string>(currentUser.phone || '+1 (555) 382-9104');

  // Card details
  const [cardNumber, setCardNumber] = useState<string>('4532 8920 4410 7821');
  const [cardHolder, setCardHolder] = useState<string>(currentUser.name.toUpperCase());
  const [cardExpiry, setCardExpiry] = useState<string>('09/28');
  const [cardCvv, setCardCvv] = useState<string>('482');

  // Math
  const seatsSubtotal = seats.reduce((acc, s) => acc + s.price, 0);
  const concessionsSubtotal = concessions.reduce((acc, c) => acc + (c.price * c.quantity), 0);
  const subtotal = seatsSubtotal + concessionsSubtotal;
  const convenienceFee = seats.length * 1.50;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const grandTotal = Number((subtotal + convenienceFee + tax).toFixed(2));

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setSuccessState(true);

      const bookingCode = `IMV-${Math.floor(10000 + Math.random() * 90000)}`;
      const bookingData: Booking = {
        id: `bk-${Date.now()}`,
        bookingCode,
        userId: currentUser.id,
        userName,
        userEmail,
        userPhone,
        movieId: movie.id,
        movieTitle: movie.title,
        posterUrl: movie.posterUrl,
        theaterId: theater.id,
        theaterName: theater.name,
        theaterLocation: theater.location,
        screenName: showtime.format,
        date: showtime.date,
        time: showtime.time,
        format: showtime.format,
        seats,
        concessions,
        subtotal,
        convenienceFee,
        tax,
        total: grandTotal,
        paymentMethod: paymentMethod === 'card' 
          ? `Visa/Mastercard (••• ${cardNumber.slice(-4)})` 
          : paymentMethod === 'upi' 
          ? 'UPI Instant Pay' 
          : 'Apple Pay / Digital Wallet',
        paymentStatus: 'completed',
        bookedAt: new Date().toISOString()
      };

      setTimeout(() => {
        onPaymentSuccess(bookingData);
      }, 700);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-4 text-neutral-100 flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-800 bg-neutral-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <button
              disabled={isProcessing}
              onClick={onBack}
              aria-label="Back to concessions"
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Step 3 of 3</span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
                Secure Checkout & Instant Ticket Issuance
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Contact details & Payment methods */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Information */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
              <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Booking Contact (E-Ticket & SMS Updates)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-neutral-400 block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Mobile Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Select Payment Method
              </h3>

              {/* Method Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'wallet'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Apple / Google</span>
                </button>
              </div>

              {/* Payment Details per method */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4532 8920 4410 7821"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Expiration Date</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Security Code (CVV)</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        placeholder="•••"
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white font-mono uppercase focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-neutral-300">
                    Dynamic merchant QR code will be generated upon confirmation, or enter your VPA / UPI ID:
                  </p>
                  <input
                    type="text"
                    defaultValue="alexander@okaxis"
                    placeholder="username@upi"
                    className="w-full max-w-xs mx-auto px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white text-center font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-neutral-300">
                    Biometric authentication will pop up to authorize ${grandTotal.toFixed(2)} via Apple Pay / Google Wallet.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-4">
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800 pb-2">
                Order Summary
              </h3>

              {/* Movie & Theater */}
              <div className="flex gap-3">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  className="w-14 h-20 object-cover rounded-lg border border-neutral-800 shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-white font-['Outfit']">{movie.title}</h4>
                  <span className="text-xs text-amber-400 font-mono mt-0.5">{showtime.format}</span>
                  <span className="text-xs text-neutral-400 mt-1">{theater.name}</span>
                  <span className="text-[11px] text-neutral-500">{showtime.date} · {showtime.time}</span>
                </div>
              </div>

              {/* Seats itemization */}
              <div className="border-t border-neutral-800/80 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-300 font-medium">
                  <span>Seats ({seats.map(s => s.id).join(', ')})</span>
                  <span className="font-mono">${seatsSubtotal.toFixed(2)}</span>
                </div>
                {seats.map(s => (
                  <div key={s.id} className="flex justify-between text-[11px] text-neutral-500 pl-2">
                    <span>Seat {s.id} ({s.tier.toUpperCase()})</span>
                    <span className="font-mono">${s.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Snacks itemization */}
              {concessions.length > 0 && (
                <div className="border-t border-neutral-800/80 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-neutral-300 font-medium">
                    <span>Concessions & Snacks</span>
                    <span className="font-mono">${concessionsSubtotal.toFixed(2)}</span>
                  </div>
                  {concessions.map(c => (
                    <div key={c.id} className="flex justify-between text-[11px] text-neutral-500 pl-2">
                      <span>{c.quantity}x {c.name}</span>
                      <span className="font-mono">${(c.price * c.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Taxes and fees */}
              <div className="border-t border-neutral-800/80 pt-3 space-y-1.5 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Booking Convenience Fee</span>
                  <span className="font-mono">${convenienceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>City Entertainment Tax (8%)</span>
                  <span className="font-mono">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="border-t border-neutral-800 pt-3 flex items-center justify-between text-sm sm:text-base">
                <span className="font-bold text-white">Grand Total</span>
                <span className="font-extrabold text-amber-400 font-mono text-xl sm:text-2xl">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              disabled={isProcessing}
              onClick={handlePay}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-extrabold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : successState ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-neutral-950" />
                  <span>Approved! Generating Pass...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay ${grandTotal.toFixed(2)} & Get Tickets</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
