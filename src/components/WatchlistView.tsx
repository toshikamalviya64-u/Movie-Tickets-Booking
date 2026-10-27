import React from 'react';
import { Bookmark, Clock, Star, Ticket, Trash2 } from 'lucide-react';
import { Movie } from '../types';

interface WatchlistViewProps {
  watchlistMovies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onRemoveFromWatchlist: (movieId: string) => void;
  onBrowseMovies: () => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  watchlistMovies,
  onSelectMovie,
  onRemoveFromWatchlist,
  onBrowseMovies,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="border-b border-neutral-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">My Collection</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            Saved Movies & Upcoming Releases
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Keep track of titles you want to experience on the big screen.
          </p>
        </div>

        <div className="text-xs font-mono text-neutral-400">
          {watchlistMovies.length} {watchlistMovies.length === 1 ? 'title saved' : 'titles saved'}
        </div>
      </div>

      {watchlistMovies.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-['Outfit']">Your Watchlist is Empty</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Click the bookmark icon on any film card to save it for quick booking later.
            </p>
          </div>
          <button
            onClick={onBrowseMovies}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors"
          >
            Browse Cinema Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlistMovies.map((movie) => {
            const hours = Math.floor(movie.durationMinutes / 60);
            const minutes = movie.durationMinutes % 60;

            return (
              <div
                key={movie.id}
                className="group relative bg-neutral-900/70 rounded-2xl border border-neutral-800 hover:border-neutral-700 p-4 flex gap-4 transition-all shadow-lg hover:shadow-black/50"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  className="w-24 h-36 object-cover rounded-xl border border-neutral-800 shrink-0"
                />

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-amber-400 uppercase font-mono font-semibold">
                        {movie.status === 'now_showing' ? 'Now In Theaters' : 'Coming Soon'}
                      </span>
                      <button
                        onClick={() => onRemoveFromWatchlist(movie.id)}
                        aria-label="Remove from watchlist"
                        className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 
                      onClick={() => onSelectMovie(movie)}
                      className="text-base font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer font-['Outfit'] mt-1 line-clamp-1"
                    >
                      {movie.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                      {movie.synopsis}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{hours}h {minutes}m</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-mono font-bold text-white">{movie.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectMovie(movie)}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>{movie.status === 'now_showing' ? 'Book Tickets' : 'View Showtimes'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
