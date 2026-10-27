import React from 'react';
import { Building2, MapPin, Sparkles, Film, ArrowRight } from 'lucide-react';
import { Theater, Movie } from '../types';

interface TheatersViewProps {
  theaters: Theater[];
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const TheatersView: React.FC<TheatersViewProps> = ({
  theaters,
  movies,
  onSelectMovie,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Cinemas & Multiplexes</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
          Experience World-Class Auditorium Sound & Visuals
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Explore our premier flagship venues, equipped with IMAX Laser 70mm, Dolby Atmos 128-channel spatial sound, and luxury motorized recliner seating.
        </p>
      </div>

      {/* Theaters List */}
      <div className="space-y-6">
        {theaters.map((theater) => (
          <div
            key={theater.id}
            className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all space-y-6 shadow-xl"
          >
            {/* Venue overview */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-neutral-800/80 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                      {theater.name}
                    </h2>
                    <span className="text-xs text-neutral-400 font-medium">
                      {theater.location} · {theater.city}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-300 pl-13">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{theater.address}</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap items-center gap-2 max-w-md">
                {theater.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 font-medium"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Screens & Auditoriums */}
            <div>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                Auditorium Screens in this Cinema ({theater.screens.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {theater.screens.map((screen) => (
                  <div
                    key={screen.id}
                    className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-['Outfit']">
                          {screen.name}
                        </span>
                        <span className="text-[10px] font-mono text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded">
                          {screen.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Capacity: {screen.totalSeats} motorized plush stadium seats
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px]">
                      <span className="text-neutral-500">Live Ticketing</span>
                      <span className="text-emerald-400 font-medium">Online Availability</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Now Showing at this theater */}
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                Now Screening at {theater.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {movies.filter(m => m.status === 'now_showing').slice(0, 4).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onSelectMovie(m)}
                    className="group text-left p-2 rounded-xl bg-neutral-950/50 border border-neutral-800 hover:border-amber-500/60 transition-all flex flex-col gap-2"
                  >
                    <img
                      src={m.posterUrl}
                      alt={m.title}
                      referrerPolicy="no-referrer"
                      className="w-full aspect-[3/4] object-cover rounded-lg group-hover:scale-102 transition-transform"
                    />
                    <div className="w-full">
                      <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 block">
                        {m.title}
                      </span>
                      <span className="text-[10px] text-neutral-400 block font-mono">
                        {m.formats[0]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
