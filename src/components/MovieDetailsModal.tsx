import React, { useState } from 'react';
import { X, Star, Clock, Calendar, MapPin, Play, Ticket, Bookmark, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { Movie, Theater, Showtime, Review, User } from '../types';
import { getScheduleDates } from '../data/seedData';

interface MovieDetailsModalProps {
  movie: Movie;
  theaters: Theater[];
  showtimes: Showtime[];
  reviews: Review[];
  currentUser: User;
  onClose: () => void;
  onSelectShowtime: (showtime: Showtime, theater: Theater, movie: Movie) => void;
  onWatchTrailer: (youtubeId: string, title: string) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (movieId: string) => void;
  onAddReview: (review: Review) => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  theaters,
  showtimes,
  reviews,
  currentUser,
  onClose,
  onSelectShowtime,
  onWatchTrailer,
  isWatchlisted,
  onToggleWatchlist,
  onAddReview
}) => {
  const dates = getScheduleDates();
  const [selectedDate, setSelectedDate] = useState<string>(dates[0].dateStr);
  const [activeTab, setActiveTab] = useState<'showtimes' | 'about' | 'reviews'>('showtimes');

  // Review form state
  const [newRating, setNewRating] = useState<number>(5);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  // Filter showtimes for selected date
  const dateShowtimes = showtimes.filter(s => s.movieId === movie.id && s.date === selectedDate);

  const hours = Math.floor(movie.durationMinutes / 60);
  const minutes = movie.durationMinutes % 60;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim()) return;

    const review: Review = {
      id: `rev-${Date.now()}`,
      movieId: movie.id,
      userId: currentUser.id,
      userName: currentUser.name,
      rating: newRating,
      title: newTitle.trim(),
      comment: newComment.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
      verifiedBooking: true
    };

    onAddReview(review);
    setNewTitle('');
    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-8 text-neutral-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Backdrop banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
          <img
            src={movie.bannerUrl}
            alt={movie.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter blur-xs"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/70 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors border border-neutral-700/60"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Quick trailer play button on banner */}
          <button
            onClick={() => onWatchTrailer(movie.trailerYoutubeId, movie.title)}
            className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-950/80 hover:bg-neutral-900 text-white border border-neutral-700 text-xs font-semibold backdrop-blur-sm transition-all shadow-lg"
          >
            <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Play Official Trailer</span>
          </button>

          {/* Banner bottom title overlay */}
          <div className="absolute bottom-4 left-4 sm:left-8 right-24 sm:right-64 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wider uppercase">
              <span>{movie.genres.join(' · ')}</span>
              <span className="text-neutral-500">·</span>
              <span>{movie.ageRating}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] line-clamp-1">
              {movie.title}
            </h2>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-neutral-800 px-4 sm:px-8 bg-neutral-950/50 shrink-0 gap-6">
          <button
            onClick={() => setActiveTab('showtimes')}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'showtimes'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Showtimes & Theaters
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'about'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Movie Info & Cast
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Reviews & Ratings
            <span className="text-xs bg-neutral-800 text-neutral-300 font-mono px-1.5 py-0.2 rounded">
              {reviews.length}
            </span>
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'showtimes' && (
            <div className="space-y-6">
              {/* Date selection strip */}
              <div>
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                  Select Screening Date
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {dates.map((d) => {
                    const isSelected = selectedDate === d.dateStr;
                    return (
                      <button
                        key={d.dateStr}
                        onClick={() => setSelectedDate(d.dateStr)}
                        className={`flex flex-col items-center justify-center min-w-[90px] py-2.5 px-3 rounded-xl border text-xs transition-all shrink-0 ${
                          isSelected
                            ? 'bg-amber-500 border-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/10'
                            : 'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                        }`}
                      >
                        <span className={`text-[11px] ${isSelected ? 'text-neutral-950' : 'text-neutral-400'}`}>
                          {d.dayName}
                        </span>
                        <span className="text-sm font-bold mt-0.5">{d.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multiplex Cinema list with showtimes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-semibold uppercase tracking-wider">Available Multiplexes & Formats</span>
                  <span>{theaters.length} Cinema Venues</span>
                </div>

                {theaters.map((theater) => {
                  const theaterShowtimes = dateShowtimes.filter(s => s.theaterId === theater.id);

                  return (
                    <div
                      key={theater.id}
                      className="p-5 rounded-xl bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700 transition-colors space-y-4"
                    >
                      {/* Theater details */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-white font-['Outfit']">
                              {theater.name}
                            </h4>
                            <span className="text-xs text-amber-400/90 font-medium">({theater.location})</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                            <span>{theater.address}</span>
                          </div>
                        </div>

                        {/* Amenities unboxed */}
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400">
                          {theater.amenities.slice(0, 3).map((a, i) => (
                            <React.Fragment key={a}>
                              {i > 0 && <span className="text-neutral-600">·</span>}
                              <span>{a}</span>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Showtimes buttons */}
                      {theaterShowtimes.length === 0 ? (
                        <div className="text-xs text-neutral-500 py-2 italic">
                          No scheduled screenings at this cinema for the selected date. Check other dates above.
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                          {theaterShowtimes.map((show) => {
                            const availableSeats = 120 - show.bookedSeatIds.length;
                            const isAlmostFull = availableSeats < 25;

                            return (
                              <button
                                key={show.id}
                                onClick={() => onSelectShowtime(show, theater, movie)}
                                className="group flex flex-col p-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/80 hover:bg-neutral-800/80 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                                    {show.time}
                                  </span>
                                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                                    {show.format}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2">
                                  <span className="font-mono text-neutral-300">from ${show.pricing.standard.toFixed(2)}</span>
                                  <span className={`text-[10px] ${isAlmostFull ? 'text-amber-400' : 'text-emerald-400'}`}>
                                    {availableSeats} seats
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              {/* Synopsis & Key stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      Synopsis
                    </h4>
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                      {movie.synopsis}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      Available Languages & Subtitles
                    </h4>
                    <p className="text-sm text-neutral-300">
                      Audio in {movie.languages.join(', ')} with Closed Captions (CC) & Assistive Audio listening available upon request.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3 text-xs">
                  <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] border-b border-neutral-800 pb-2">
                    Production Details
                  </h4>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Director</span>
                    <span className="font-medium text-white">{movie.director}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Runtime</span>
                    <span className="font-medium text-white">{hours}h {minutes}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Release Date</span>
                    <span className="font-medium text-white">{movie.releaseDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Rating</span>
                    <span className="font-medium text-white">{movie.ageRating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Sound Formats</span>
                    <span className="font-medium text-amber-400">Dolby Atmos · DTS:X</span>
                  </div>
                </div>
              </div>

              {/* Cast Members */}
              <div>
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Starring Cast
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {movie.cast.map((c) => (
                    <div
                      key={c.actor}
                      className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 flex flex-col gap-1"
                    >
                      <span className="text-sm font-bold text-white">{c.actor}</span>
                      <span className="text-xs text-neutral-400 italic">as {c.character}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Write a review box */}
              <div className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-4">
                <h4 className="text-sm font-bold text-white font-['Outfit'] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  Leave a Viewer Review
                </h4>

                {reviewSubmitted ? (
                  <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300">
                    Thank you! Your verified viewer review has been posted.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-400">Your Rating:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRating(star)}
                            className="p-1 text-neutral-500 hover:text-amber-400 transition-colors"
                          >
                            <Star className={`w-5 h-5 ${star <= newRating ? 'text-amber-400 fill-amber-400' : ''}`} />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400">{newRating}/5</span>
                    </div>

                    <input
                      type="text"
                      placeholder="Review Headline (e.g. An absolute cinematic marvel!)"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                    />

                    <textarea
                      placeholder="Share your thoughts about the film, sound design, visual effects, and performance..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                    />

                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Review</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Reviews List */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Verified Viewer Reviews ({reviews.length})
                </h4>

                {reviews.length === 0 ? (
                  <div className="text-xs text-neutral-500 italic py-4">
                    No reviews yet. Be the first to share your cinema experience!
                  </div>
                ) : (
                  reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-neutral-800 text-amber-400 font-bold text-xs flex items-center justify-center">
                            {rev.userName.charAt(0)}
                          </div>
                          <span className="text-xs font-semibold text-white">{rev.userName}</span>
                          {rev.verifiedBooking && (
                            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.2 rounded font-medium">
                              Verified Ticket
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-mono font-bold text-white">{rev.rating}</span>
                          <span className="text-neutral-500 text-[10px] ml-1">{rev.createdAt}</span>
                        </div>
                      </div>

                      <h5 className="text-sm font-bold text-neutral-200">{rev.title}</h5>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
