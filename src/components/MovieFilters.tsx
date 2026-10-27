import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { MovieStatus } from '../types';

interface MovieFiltersProps {
  statusFilter: MovieStatus;
  setStatusFilter: (status: MovieStatus) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  selectedFormat: string;
  setSelectedFormat: (format: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  genres: string[];
  formats: string[];
  languages: string[];
  totalResults: number;
}

export const MovieFilters: React.FC<MovieFiltersProps> = ({
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  selectedFormat,
  setSelectedFormat,
  selectedLanguage,
  setSelectedLanguage,
  genres,
  formats,
  languages,
  totalResults
}) => {
  const hasActiveFilters = searchQuery !== '' || selectedGenre !== 'All' || selectedFormat !== 'All' || selectedLanguage !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedFormat('All');
    setSelectedLanguage('All');
  };

  return (
    <div className="w-full space-y-4">
      {/* Top row: Status Segmented Control + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Segmented Control for Now Showing / Coming Soon */}
        <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg w-fit">
          <button
            onClick={() => setStatusFilter('now_showing')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
              statusFilter === 'now_showing'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Now Showing
          </button>
          <button
            onClick={() => setStatusFilter('coming_soon')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
              statusFilter === 'coming_soon'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Coming Soon
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by film title, director, or cast..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 bg-neutral-900/90 border border-neutral-800 focus:border-amber-500/80 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Second row: Dropdown filters & clear action */}
      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
        <div className="flex items-center gap-1.5 text-neutral-400 mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="font-medium">Filter:</span>
        </div>

        {/* Genre select */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 text-neutral-200 px-3 py-1.5 rounded-lg focus:border-amber-500 focus:outline-none cursor-pointer"
        >
          <option value="All">All Genres</option>
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        {/* Format select */}
        <select
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 text-neutral-200 px-3 py-1.5 rounded-lg focus:border-amber-500 focus:outline-none cursor-pointer"
        >
          <option value="All">All Cinema Formats</option>
          {formats.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        {/* Language select */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 text-neutral-200 px-3 py-1.5 rounded-lg focus:border-amber-500 focus:outline-none cursor-pointer"
        >
          <option value="All">All Languages</option>
          {languages.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-amber-400 hover:text-amber-300 font-medium ml-auto flex items-center gap-1 underline underline-offset-4 decoration-amber-400/40"
          >
            Clear filters
          </button>
        )}

        <div className="ml-auto text-neutral-500 font-mono text-xs">
          {totalResults} {totalResults === 1 ? 'film found' : 'films found'}
        </div>
      </div>
    </div>
  );
};
