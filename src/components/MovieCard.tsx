import React from 'react';
import { Star, Clock, Bookmark, Ticket, Play } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
  onWatchTrailer?: (youtubeId: string, title: string) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (movieId: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelectMovie,
  onWatchTrailer,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const hours = Math.floor(movie.durationMinutes / 60);
  const minutes = movie.durationMinutes % 60;

  return (
    <div className="group relative flex flex-col bg-neutral-900/60 rounded-xl overflow-hidden border border-neutral-800/80 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/50 transition-all duration-300">
      {/* Poster Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Watchlist Quick Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatchlist(movie.id);
          }}
          aria-label={isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
            isWatchlisted
              ? 'bg-amber-500 text-neutral-950 shadow-md'
              : 'bg-neutral-950/70 text-neutral-300 hover:text-white hover:bg-neutral-900/90'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isWatchlisted ? 'fill-neutral-950' : ''}`} />
        </button>

        {/* Quick Trailer Play Overlay Button */}
        {onWatchTrailer && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWatchTrailer(movie.trailerYoutubeId, movie.title);
            }}
            aria-label="Play trailer"
            className="absolute top-3 left-3 p-2 rounded-lg bg-neutral-950/70 backdrop-blur-md text-neutral-300 hover:text-amber-400 hover:bg-neutral-900/90 transition-all opacity-0 group-hover:opacity-100"
          >
            <Play className="w-4 h-4 fill-current" />
          </button>
        )}

        {/* Formats at bottom of poster */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
          <div className="flex items-center gap-1.5 font-mono text-amber-400 text-[11px] font-semibold bg-neutral-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-neutral-800">
            {movie.formats[0]}
          </div>
          <span className="text-[11px] text-neutral-400 bg-neutral-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-neutral-800">
            {movie.ageRating}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed inline metadata */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5">
            <span>{movie.genres.slice(0, 2).join(' / ')}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-500" />
              <span>{hours}h {minutes}m</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectMovie(movie)}
            className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer font-['Outfit']"
          >
            {movie.title}
          </h3>

          {/* Tagline / 1-line hook */}
          <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5 italic">
            "{movie.tagline}"
          </p>
        </div>

        {/* Footer info: Rating & Booking Action */}
        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-white font-mono">{movie.rating.toFixed(1)}</span>
            <span className="text-neutral-500 text-[11px] font-mono">({(movie.voteCount / 1000).toFixed(1)}k)</span>
          </div>

          <button
            onClick={() => onSelectMovie(movie)}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-neutral-950 border border-amber-500/30 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>{movie.status === 'now_showing' ? 'Book Seats' : 'View Details'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
