import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storage';
import { Movie, Theater, Showtime, Booking, Review, User, NotificationItem, BookingSeatItem, BookingConcessionItem, MovieStatus } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MovieFilters } from './components/MovieFilters';
import { MovieCard } from './components/MovieCard';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { SeatPicker } from './components/SeatPicker';
import { ConcessionsPicker } from './components/ConcessionsPicker';
import { CheckoutModal } from './components/CheckoutModal';
import { TicketPassModal } from './components/TicketPassModal';
import { BookingsView } from './components/BookingsView';
import { WatchlistView } from './components/WatchlistView';
import { TheatersView } from './components/TheatersView';
import { ConcessionsMenuView } from './components/ConcessionsMenuView';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { TrailerModal } from './components/TrailerModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { TechnicalDocsModal } from './components/TechnicalDocsModal';
import { Film, Sparkles } from 'lucide-react';

export default function App() {
  // State
  const [currentUser, setCurrentUser] = useState<User>(StorageService.getUser());
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Navigation
  const [activeTab, setActiveTab] = useState<string>('movies');

  // Movie Filters
  const [statusFilter, setStatusFilter] = useState<MovieStatus>('now_showing');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  // Modals & Flow
  const [detailsMovie, setDetailsMovie] = useState<Movie | null>(null);
  const [activeTrailer, setActiveTrailer] = useState<{ id: string; title: string } | null>(null);
  const [viewingTicket, setViewingTicket] = useState<Booking | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);

  // Active Booking Flow
  const [bookingFlow, setBookingFlow] = useState<{
    step: 'none' | 'seats' | 'concessions' | 'checkout';
    movie: Movie | null;
    theater: Theater | null;
    showtime: Showtime | null;
    selectedSeats: BookingSeatItem[];
    selectedConcessions: BookingConcessionItem[];
  }>({
    step: 'none',
    movie: null,
    theater: null,
    showtime: null,
    selectedSeats: [],
    selectedConcessions: []
  });

  // Load and sync from storage
  const refreshData = () => {
    StorageService.init();
    setMovies(StorageService.getMovies());
    setTheaters(StorageService.getTheaters());
    setShowtimes(StorageService.getShowtimes());
    setBookings(StorageService.getBookings());
    setWatchlist(StorageService.getWatchlist());
    setNotifications(StorageService.getNotifications());
    setCurrentUser(StorageService.getUser());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Filtered movies
  const filteredMovies = movies.filter((m) => {
    if (m.status !== statusFilter) return false;
    if (selectedGenre !== 'All' && !m.genres.includes(selectedGenre as any)) return false;
    if (selectedFormat !== 'All' && !m.formats.includes(selectedFormat as any)) return false;
    if (selectedLanguage !== 'All' && !m.languages.includes(selectedLanguage)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchDirector = m.director.toLowerCase().includes(q);
      const matchCast = m.cast.some(c => c.actor.toLowerCase().includes(q) || c.character.toLowerCase().includes(q));
      if (!matchTitle && !matchDirector && !matchCast) return false;
    }
    return true;
  });

  // Distinct filter options
  const allGenres = Array.from(new Set(movies.flatMap(m => m.genres))).sort();
  const allFormats = Array.from(new Set(movies.flatMap(m => m.formats))).sort();
  const allLanguages = Array.from(new Set(movies.flatMap(m => m.languages))).sort();

  // Watchlist toggle handler
  const handleToggleWatchlist = (movieId: string) => {
    StorageService.toggleWatchlist(movieId);
    setWatchlist(StorageService.getWatchlist());
  };

  // Start booking flow from MovieDetailsModal
  const handleSelectShowtime = (showtime: Showtime, theater: Theater, movie: Movie) => {
    setDetailsMovie(null);
    setBookingFlow({
      step: 'seats',
      movie,
      theater,
      showtime,
      selectedSeats: [],
      selectedConcessions: []
    });
  };

  // Step 1 -> 2: Seats confirmed
  const handleConfirmSeats = (seats: BookingSeatItem[]) => {
    setBookingFlow(prev => ({
      ...prev,
      selectedSeats: seats,
      step: 'concessions'
    }));
  };

  // Step 2 -> 3: Concessions confirmed
  const handleConfirmConcessions = (concessions: BookingConcessionItem[]) => {
    setBookingFlow(prev => ({
      ...prev,
      selectedConcessions: concessions,
      step: 'checkout'
    }));
  };

  // Step 3 -> Completed: Payment Success
  const handlePaymentSuccess = (booking: Booking) => {
    if (bookingFlow.showtime) {
      StorageService.createBooking(booking, bookingFlow.showtime.id);
    }
    refreshData();
    setBookingFlow({
      step: 'none',
      movie: null,
      theater: null,
      showtime: null,
      selectedSeats: [],
      selectedConcessions: []
    });
    setViewingTicket(booking);
  };

  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    StorageService.cancelBooking(bookingId);
    refreshData();
  };

  // Admin handlers
  const handleSaveMovie = (movie: Movie) => {
    StorageService.saveMovie(movie);
    refreshData();
  };

  const handleDeleteMovie = (movieId: string) => {
    StorageService.deleteMovie(movieId);
    refreshData();
  };

  const handleAddShowtime = (showtime: Showtime) => {
    StorageService.addShowtime(showtime);
    refreshData();
  };

  const handleDeleteShowtime = (showtimeId: string) => {
    StorageService.deleteShowtime(showtimeId);
    refreshData();
  };

  const handleUpdateUser = (user: User) => {
    StorageService.setUser(user);
    setCurrentUser(user);
  };

  const handleAddReview = (review: Review) => {
    StorageService.addReview(review);
    refreshData();
  };

  const handleMarkAllNotificationsRead = () => {
    StorageService.markAllNotificationsRead();
    setNotifications(StorageService.getNotifications());
  };

  const featuredMovie = movies.find(m => m.featured) || movies[0];
  const watchlistMovies = movies.filter(m => watchlist.includes(m.id));
  const userBookings = bookings.filter(b => b.userId === currentUser.id);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-amber-500 selection:text-neutral-950">
      {/* Top Bar Contract Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        unreadNotificationsCount={notifications.filter(n => !n.read).length}
        bookingsCount={userBookings.length}
        watchlistCount={watchlist.length}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'movies' && (
          <div>
            {/* Cinematic Hero Premiere Banner */}
            {featuredMovie && (
              <HeroBanner
                movie={featuredMovie}
                onSelectMovie={(m) => setDetailsMovie(m)}
                onWatchTrailer={(id, title) => setActiveTrailer({ id, title })}
                isWatchlisted={watchlist.includes(featuredMovie.id)}
                onToggleWatchlist={handleToggleWatchlist}
              />
            )}

            {/* Catalog & Filter Section */}
            <div id="movies-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
              <MovieFilters
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedFormat={selectedFormat}
                setSelectedFormat={setSelectedFormat}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                genres={allGenres}
                formats={allFormats}
                languages={allLanguages}
                totalResults={filteredMovies.length}
              />

              {/* Movies Grid */}
              {filteredMovies.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
                  <Film className="w-10 h-10 text-neutral-600 mx-auto" />
                  <h3 className="text-base font-bold text-white font-['Outfit']">No Films Match Your Filters</h3>
                  <p className="text-xs text-neutral-400">
                    Try clearing your search query or selecting "All Genres" and "All Cinema Formats".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedGenre('All');
                      setSelectedFormat('All');
                      setSelectedLanguage('All');
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors mt-2"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onSelectMovie={(m) => setDetailsMovie(m)}
                      onWatchTrailer={(id, title) => setActiveTrailer({ id, title })}
                      isWatchlisted={watchlist.includes(movie.id)}
                      onToggleWatchlist={handleToggleWatchlist}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'theaters' && (
          <TheatersView
            theaters={theaters}
            movies={movies}
            onSelectMovie={(m) => {
              setDetailsMovie(m);
              setActiveTab('movies');
            }}
          />
        )}

        {activeTab === 'concessions' && (
          <ConcessionsMenuView
            onBrowseMovies={() => setActiveTab('movies')}
          />
        )}

        {activeTab === 'bookings' && (
          <BookingsView
            bookings={userBookings}
            onViewTicket={(b) => setViewingTicket(b)}
            onCancelBooking={handleCancelBooking}
            onBrowseMovies={() => setActiveTab('movies')}
          />
        )}

        {activeTab === 'watchlist' && (
          <WatchlistView
            watchlistMovies={watchlistMovies}
            onSelectMovie={(m) => setDetailsMovie(m)}
            onRemoveFromWatchlist={handleToggleWatchlist}
            onBrowseMovies={() => setActiveTab('movies')}
          />
        )}

        {activeTab === 'admin' && currentUser.role === 'admin' && (
          <AdminDashboard
            movies={movies}
            theaters={theaters}
            showtimes={showtimes}
            bookings={bookings}
            onSaveMovie={handleSaveMovie}
            onDeleteMovie={handleDeleteMovie}
            onAddShowtime={handleAddShowtime}
            onDeleteShowtime={handleDeleteShowtime}
            onViewTicket={(b) => setViewingTicket(b)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-xs py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-neutral-950 font-extrabold text-xs">
              M
            </div>
            <span className="font-bold text-white font-['Outfit']">The IMovies Cinema Network</span>
            <span className="text-neutral-600">·</span>
            <span>Laser 4K · Dolby Atmos 128-ch · VIP Motorized Recliners</span>
          </div>

          <div className="flex items-center gap-6 text-neutral-400">
            <button onClick={() => setActiveTab('movies')} className="hover:text-white transition-colors">Movies</button>
            <button onClick={() => setActiveTab('theaters')} className="hover:text-white transition-colors">Cinemas</button>
            <button onClick={() => setActiveTab('concessions')} className="hover:text-white transition-colors">Concessions</button>
            <button 
              onClick={() => setIsDocsOpen(true)}
              className="text-amber-400 hover:text-amber-300 transition-colors font-medium flex items-center gap-1"
            >
              <span>Architecture & Docs</span>
            </button>
            <button 
              onClick={() => {
                if (currentUser.role === 'admin') {
                  setActiveTab('admin');
                } else {
                  handleUpdateUser(StorageService.getUser().role === 'admin' ? StorageService.getUser() : { ...currentUser, role: 'admin' });
                  setActiveTab('admin');
                }
              }} 
              className="text-rose-400 hover:text-rose-300 transition-colors font-semibold"
            >
              Admin Mode
            </button>
          </div>

          <span className="text-neutral-500 font-mono">
            &copy; 2026 The IMovies Inc. All rights reserved.
          </span>
        </div>
      </footer>

      {/* Technical Architecture & Documentation Viewer */}
      {isDocsOpen && (
        <TechnicalDocsModal onClose={() => setIsDocsOpen(false)} />
      )}

      {/* Movie Details & Showtime Selection Modal */}
      {detailsMovie && (
        <MovieDetailsModal
          movie={detailsMovie}
          theaters={theaters}
          showtimes={showtimes}
          reviews={StorageService.getReviewsForMovie(detailsMovie.id)}
          currentUser={currentUser}
          onClose={() => setDetailsMovie(null)}
          onSelectShowtime={handleSelectShowtime}
          onWatchTrailer={(id, title) => setActiveTrailer({ id, title })}
          isWatchlisted={watchlist.includes(detailsMovie.id)}
          onToggleWatchlist={handleToggleWatchlist}
          onAddReview={handleAddReview}
        />
      )}

      {/* Step 1: Seat Selection Modal */}
      {bookingFlow.step === 'seats' && bookingFlow.movie && bookingFlow.theater && bookingFlow.showtime && (
        <SeatPicker
          movie={bookingFlow.movie}
          theater={bookingFlow.theater}
          showtime={bookingFlow.showtime}
          onBack={() => setBookingFlow(prev => ({ ...prev, step: 'none' }))}
          onConfirmSeats={handleConfirmSeats}
        />
      )}

      {/* Step 2: Food & Beverage Concessions Modal */}
      {bookingFlow.step === 'concessions' && (
        <ConcessionsPicker
          onBack={() => setBookingFlow(prev => ({ ...prev, step: 'seats' }))}
          onConfirmConcessions={handleConfirmConcessions}
        />
      )}

      {/* Step 3: Checkout & Payment Modal */}
      {bookingFlow.step === 'checkout' && bookingFlow.movie && bookingFlow.theater && bookingFlow.showtime && (
        <CheckoutModal
          movie={bookingFlow.movie}
          theater={bookingFlow.theater}
          showtime={bookingFlow.showtime}
          seats={bookingFlow.selectedSeats}
          concessions={bookingFlow.selectedConcessions}
          currentUser={currentUser}
          onBack={() => setBookingFlow(prev => ({ ...prev, step: 'concessions' }))}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Digital Admission Ticket Pass Modal */}
      {viewingTicket && (
        <TicketPassModal
          booking={viewingTicket}
          onClose={() => setViewingTicket(null)}
          onViewMyBookings={() => {
            setViewingTicket(null);
            setActiveTab('bookings');
          }}
        />
      )}

      {/* Official HD Trailer Player Modal */}
      {activeTrailer && (
        <TrailerModal
          youtubeId={activeTrailer.id}
          movieTitle={activeTrailer.title}
          onClose={() => setActiveTrailer(null)}
        />
      )}

      {/* User Authentication & Account Modal */}
      {isAuthOpen && (
        <AuthModal
          currentUser={currentUser}
          onClose={() => setIsAuthOpen(false)}
          onUpdateUser={handleUpdateUser}
        />
      )}

      {/* Real-time Notifications Drawer */}
      {isNotificationsOpen && (
        <NotificationDrawer
          notifications={notifications}
          onClose={() => setIsNotificationsOpen(false)}
          onMarkAllRead={handleMarkAllNotificationsRead}
        />
      )}
    </div>
  );
}
