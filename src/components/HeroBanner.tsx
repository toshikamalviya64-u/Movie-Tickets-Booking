import React from 'react';
import { Star, Clock, Play, Ticket, Bookmark } from 'lucide-react';
import { Movie } from '../types';

interface HeroBannerProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
  onWatchTrailer: (youtubeId: string, title: string) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (movieId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  movie,
  onSelectMovie,
  onWatchTrailer,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const hours = Math.floor(movie.durationMinutes / 60);
  const minutes = movie.durationMinutes % 60;

  return (
    <section className="relative w-full overflow-hidden border-b border-neutral-800 bg-neutral-950">
      {/* Ambient background glow & backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.bannerUrl}
          alt={movie.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter blur-3xl opacity-25 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Info Column */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {/* Clean unboxed metadata kicker */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-400 font-medium tracking-wide">
              <span className="text-amber-400 uppercase tracking-wider font-semibold">Featured Premiere</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>{movie.formats.join(' / ')}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>{movie.ageRating}</span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-['Outfit'] leading-tight max-w-3xl">
                {movie.title}
              </h1>
              <p className="mt-2 text-base sm:text-lg text-amber-200/90 font-medium italic">
                "{movie.tagline}"
              </p>
            </div>

            {/* Synopsis */}
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl line-clamp-3">
              {movie.synopsis}
            </p>

            {/* Quantitative Specs & Proof */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-neutral-300 pt-1">
              <div className="flex items-center gap-1.5 font-medium">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold text-white font-mono">{movie.rating.toFixed(1)}</span>
                <span className="text-neutral-500 font-mono">({(movie.voteCount).toLocaleString()} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>{hours}h {minutes}m</span>
              </div>
              <div className="text-neutral-400">
                <span>{movie.genres.join(' · ')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectMovie(movie)}
                className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <Ticket className="w-4 h-4" />
                <span>Book Seats & Showtimes</span>
              </button>

              <button
                onClick={() => onWatchTrailer(movie.trailerYoutubeId, movie.title)}
                className="px-5 py-3 rounded-lg border border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 hover:border-neutral-600 text-neutral-200 font-medium text-sm transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Watch Trailer</span>
              </button>

              <button
                onClick={() => onToggleWatchlist(movie.id)}
                aria-label={isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
                className={`p-3 rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isWatchlisted
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                    : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Poster Showcase Column */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group max-w-[280px] sm:max-w-[320px] rounded-xl overflow-hidden shadow-2xl shadow-black border border-neutral-800">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300 bg-neutral-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-neutral-800/80">
                <span className="font-semibold text-white">Director: {movie.director}</span>
                <span className="font-mono text-amber-400 font-medium">IMAX 3D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
