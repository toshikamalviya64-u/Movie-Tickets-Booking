import React from 'react';
import { Film, Ticket, Bookmark, Bell, Shield, User as UserIcon, Popcorn, Building2, BookOpen } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: User;
  onOpenAuth: () => void;
  onOpenNotifications: () => void;
  onOpenDocs: () => void;
  unreadNotificationsCount: number;
  bookingsCount: number;
  watchlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onOpenNotifications,
  onOpenDocs,
  unreadNotificationsCount,
  bookingsCount,
  watchlistCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => setActiveTab('movies')}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <Film className="w-5 h-5 text-neutral-950" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-['Outfit'] whitespace-nowrap shrink-0">
            The <span className="text-amber-500">IMovies</span>
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <button
            onClick={() => setActiveTab('movies')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'movies' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Movies
            {activeTab === 'movies' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('theaters')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'theaters' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Cinemas
            {activeTab === 'theaters' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('concessions')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'concessions' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Concessions
            {activeTab === 'concessions' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'bookings' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            My Tickets
            {bookingsCount > 0 && (
              <span className="text-xs bg-neutral-800 text-amber-400 font-mono px-1.5 py-0.2 rounded-md">
                {bookingsCount}
              </span>
            )}
            {activeTab === 'bookings' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('watchlist')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'watchlist' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Watchlist
            {watchlistCount > 0 && (
              <span className="text-xs bg-neutral-800 text-amber-400 font-mono px-1.5 py-0.2 rounded-md">
                {watchlistCount}
              </span>
            )}
            {activeTab === 'watchlist' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          {currentUser.role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-medium ${
                activeTab === 'admin' ? 'font-bold' : ''
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Portal
              {activeTab === 'admin' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-500 rounded-full" />
              )}
            </button>
          )}
        </nav>

        {/* Zone 3: 1 primary action or group */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Docs & Architecture Trigger */}
          <button
            onClick={onOpenDocs}
            title="Technical Architecture & Project Docs"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Docs</span>
          </button>

          {/* Notifications button */}
          <button
            onClick={onOpenNotifications}
            aria-label="View notifications"
            className="relative p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/80 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-neutral-950" />
            )}
          </button>

          {/* User Account / Profile action */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 hover:border-neutral-700 transition-colors text-xs font-medium text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <span className="hidden sm:inline-block max-w-[120px] truncate">
              {currentUser.name}
            </span>
            {currentUser.role === 'admin' && (
              <span className="text-[10px] text-rose-400 font-semibold bg-rose-950/60 border border-rose-800/50 px-1.5 py-0.5 rounded">
                ADMIN
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav strip */}
      <div className="md:hidden flex items-center justify-around border-t border-neutral-800/80 px-2 py-2 text-xs text-neutral-400 bg-neutral-950">
        <button
          onClick={() => setActiveTab('movies')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'movies' ? 'text-amber-400 font-semibold' : ''}`}
        >
          <Film className="w-4 h-4" />
          <span>Movies</span>
        </button>
        <button
          onClick={() => setActiveTab('theaters')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'theaters' ? 'text-amber-400 font-semibold' : ''}`}
        >
          <Building2 className="w-4 h-4" />
          <span>Cinemas</span>
        </button>
        <button
          onClick={() => setActiveTab('concessions')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'concessions' ? 'text-amber-400 font-semibold' : ''}`}
        >
          <Popcorn className="w-4 h-4" />
          <span>Snacks</span>
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'bookings' ? 'text-amber-400 font-semibold' : ''}`}
        >
          <Ticket className="w-4 h-4" />
          <span>Tickets</span>
        </button>
        <button
          onClick={() => setActiveTab('watchlist')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'watchlist' ? 'text-amber-400 font-semibold' : ''}`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved</span>
        </button>
        {currentUser.role === 'admin' && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex flex-col items-center gap-1 text-rose-400 ${activeTab === 'admin' ? 'font-bold' : ''}`}
          >
            <Shield className="w-4 h-4" />
            <span>Admin</span>
          </button>
        )}
      </div>
    </header>
  );
};
