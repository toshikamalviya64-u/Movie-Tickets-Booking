import React, { useState } from 'react';
import { 
  BarChart3, Film, Building2, Calendar, Ticket, Plus, Trash2, Edit3, 
  CheckCircle2, DollarSign, Users, TrendingUp, Search, Eye
} from 'lucide-react';
import { Movie, Theater, Showtime, Booking, MovieGenre, MovieFormat } from '../types';

interface AdminDashboardProps {
  movies: Movie[];
  theaters: Theater[];
  showtimes: Showtime[];
  bookings: Booking[];
  onSaveMovie: (movie: Movie) => void;
  onDeleteMovie: (movieId: string) => void;
  onAddShowtime: (showtime: Showtime) => void;
  onDeleteShowtime: (showtimeId: string) => void;
  onViewTicket: (booking: Booking) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  movies,
  theaters,
  showtimes,
  bookings,
  onSaveMovie,
  onDeleteMovie,
  onAddShowtime,
  onDeleteShowtime,
  onViewTicket,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'movies' | 'showtimes' | 'bookings'>('overview');

  // Search & filter in bookings
  const [bookingSearch, setBookingSearch] = useState('');

  // Add Movie Form state
  const [isAddingMovie, setIsAddingMovie] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [newDirector, setNewDirector] = useState('');
  const [newDuration, setNewDuration] = useState(130);
  const [newAgeRating, setNewAgeRating] = useState('PG-13');
  const [newGenres, setNewGenres] = useState<MovieGenre[]>(['Action', 'Sci-Fi']);
  const [newFormats, setNewFormats] = useState<MovieFormat[]>(['IMAX 3D', 'Dolby Cinema']);

  // Schedule Showtime Form state
  const [isSchedulingShow, setIsSchedulingShow] = useState(false);
  const [schedMovieId, setSchedMovieId] = useState(movies[0]?.id || '');
  const [schedTheaterId, setSchedTheaterId] = useState(theaters[0]?.id || '');
  const [schedDate, setSchedDate] = useState(new Date().toISOString().split('T')[0]);
  const [schedTime, setSchedTime] = useState('07:30 PM');
  const [schedFormat, setSchedFormat] = useState<MovieFormat>('IMAX 3D');
  const [schedStdPrice, setSchedStdPrice] = useState(16.00);
  const [schedPremPrice, setSchedPremPrice] = useState(20.00);
  const [schedVipPrice, setSchedVipPrice] = useState(26.00);

  // Computed metrics
  const totalRevenue = bookings.filter(b => b.paymentStatus === 'completed').reduce((acc, curr) => acc + curr.total, 0);
  const totalTickets = bookings.filter(b => b.paymentStatus === 'completed').reduce((acc, curr) => acc + curr.seats.length, 0);
  const occupancyRate = 68.4; // Average percentage

  const handleCreateMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const movie: Movie = {
      id: `movie-${Date.now()}`,
      title: newTitle.trim(),
      tagline: newTagline.trim() || 'A premier cinematic spectacle.',
      synopsis: newSynopsis.trim() || 'An enthralling cinematic journey created for theatrical presentation.',
      posterUrl: '/src/assets/images/poster_scifi_epic_1793121722076.jpg',
      bannerUrl: '/src/assets/images/poster_scifi_epic_1793121722076.jpg',
      rating: 4.8,
      voteCount: 150,
      durationMinutes: Number(newDuration),
      releaseDate: new Date().toISOString().split('T')[0],
      genres: newGenres,
      languages: ['English'],
      formats: newFormats,
      ageRating: newAgeRating,
      director: newDirector.trim() || 'Renowned Filmmaker',
      cast: [
        { actor: 'Lead Actor', character: 'Protagonist' },
        { actor: 'Supporting Lead', character: 'Allied Operative' }
      ],
      trailerYoutubeId: 'd96cjJhvlMA',
      status: 'now_showing',
      featured: false
    };

    onSaveMovie(movie);
    setIsAddingMovie(false);
    setNewTitle('');
    setNewTagline('');
    setNewSynopsis('');
  };

  const handleCreateShowtime = (e: React.FormEvent) => {
    e.preventDefault();
    const theater = theaters.find(t => t.id === schedTheaterId);
    const screen = theater?.screens[0];

    const showtime: Showtime = {
      id: `show-${Date.now()}`,
      movieId: schedMovieId,
      theaterId: schedTheaterId,
      screenId: screen ? screen.id : 'screen-1-1',
      date: schedDate,
      time: schedTime,
      format: schedFormat,
      pricing: {
        standard: Number(schedStdPrice),
        premium: Number(schedPremPrice),
        vip: Number(schedVipPrice)
      },
      bookedSeatIds: []
    };

    onAddShowtime(showtime);
    setIsSchedulingShow(false);
  };

  const filteredBookings = bookings.filter(b => 
    b.bookingCode.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    b.userName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    b.movieTitle.toLowerCase().includes(bookingSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider font-mono">
            Administration & Operations Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            Cinema Management System
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Manage movie listings, auditorium screens, scheduled screenings, customer bookings, and financial analytics.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg overflow-x-auto self-start md:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview' ? 'bg-rose-500 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('movies')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'movies' ? 'bg-rose-500 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Movies ({movies.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('showtimes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'showtimes' ? 'bg-rose-500 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Showtimes ({showtimes.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'bookings' ? 'bg-rose-500 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Bookings ({bookings.length})</span>
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* 4-KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-xs font-semibold uppercase">Total Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">+18.4% vs last week</span>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-xs font-semibold uppercase">Tickets Reserved</span>
                <Ticket className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
                {totalTickets} seats
              </div>
              <span className="text-[11px] text-neutral-400 font-mono">{bookings.length} individual orders</span>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-xs font-semibold uppercase">Avg Occupancy</span>
                <TrendingUp className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
                {occupancyRate}%
              </div>
              <span className="text-[11px] text-sky-400 font-medium">High weekend peak</span>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-xs font-semibold uppercase">Multiplex Screens</span>
                <Building2 className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
                {theaters.reduce((acc, t) => acc + t.screens.length, 0)} Screens
              </div>
              <span className="text-[11px] text-neutral-400">{theaters.length} cinema locations</span>
            </div>
          </div>

          {/* Quick Actions & Recent Bookings preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  Recent Ticket Transactions
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400">
                      <th className="py-2 font-semibold">Booking ID</th>
                      <th className="py-2 font-semibold">Customer</th>
                      <th className="py-2 font-semibold">Movie</th>
                      <th className="py-2 font-semibold">Seats</th>
                      <th className="py-2 font-semibold">Amount</th>
                      <th className="py-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {bookings.slice(0, 5).map(b => (
                      <tr key={b.id} className="hover:bg-neutral-800/30">
                        <td className="py-3 font-mono font-bold text-amber-400">{b.bookingCode}</td>
                        <td className="py-3 text-white">{b.userName}</td>
                        <td className="py-3 text-neutral-300 line-clamp-1">{b.movieTitle}</td>
                        <td className="py-3 font-mono text-neutral-400">{b.seats.map(s => s.id).join(', ')}</td>
                        <td className="py-3 font-mono text-white font-bold">${b.total.toFixed(2)}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            b.paymentStatus === 'completed'
                              ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}>
                            {b.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Admin Shortcuts */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h3 className="text-base font-bold text-white font-['Outfit']">
                Operational Shortcuts
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setActiveTab('movies');
                    setIsAddingMovie(true);
                  }}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-rose-500/60 transition-all text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <Film className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold text-white">Add New Movie</span>
                  </div>
                  <Plus className="w-4 h-4 text-neutral-400" />
                </button>

                <button
                  onClick={() => {
                    setActiveTab('showtimes');
                    setIsSchedulingShow(true);
                  }}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-rose-500/60 transition-all text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold text-white">Schedule Showtimes</span>
                  </div>
                  <Plus className="w-4 h-4 text-neutral-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Movies Management Tab */}
      {activeTab === 'movies' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white font-['Outfit']">Movie Catalog Management</h2>
              <p className="text-xs text-neutral-400">Add new theatrical releases or modify existing titles.</p>
            </div>
            <button
              onClick={() => setIsAddingMovie(!isAddingMovie)}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingMovie ? 'Cancel' : 'Add New Movie'}</span>
            </button>
          </div>

          {/* Add Movie Form */}
          {isAddingMovie && (
            <form onSubmit={handleCreateMovie} className="p-6 rounded-2xl bg-neutral-900 border border-rose-500/40 space-y-4">
              <h3 className="text-sm font-bold text-white font-['Outfit']">Add New Theatrical Movie</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Movie Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quantum Vanguard"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Director</label>
                  <input
                    type="text"
                    placeholder="e.g. Christopher Nolan"
                    value={newDirector}
                    onChange={e => setNewDirector(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-neutral-400 block mb-1">Tagline</label>
                  <input
                    type="text"
                    placeholder="A gripping 1-sentence tagline..."
                    value={newTagline}
                    onChange={e => setNewTagline(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-neutral-400 block mb-1">Synopsis</label>
                  <textarea
                    rows={3}
                    placeholder="Official plot synopsis..."
                    value={newSynopsis}
                    onChange={e => setNewSynopsis(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    min={60}
                    max={240}
                    value={newDuration}
                    onChange={e => setNewDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Age Rating</label>
                  <select
                    value={newAgeRating}
                    onChange={e => setNewAgeRating(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="G">G (General)</option>
                    <option value="PG">PG (Parental Guidance)</option>
                    <option value="PG-13">PG-13</option>
                    <option value="R">R (Restricted)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Save Movie to Catalog
              </button>
            </form>
          )}

          {/* Movies List Table */}
          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-950/60">
                  <th className="p-3 font-semibold">Film</th>
                  <th className="p-3 font-semibold">Director</th>
                  <th className="p-3 font-semibold">Genres</th>
                  <th className="p-3 font-semibold">Formats</th>
                  <th className="p-3 font-semibold">Runtime</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {movies.map(m => (
                  <tr key={m.id} className="hover:bg-neutral-800/30">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={m.posterUrl}
                          alt={m.title}
                          referrerPolicy="no-referrer"
                          className="w-8 h-12 object-cover rounded border border-neutral-800 shrink-0"
                        />
                        <span className="font-bold text-white font-['Outfit']">{m.title}</span>
                      </div>
                    </td>
                    <td className="p-3 text-neutral-300">{m.director}</td>
                    <td className="p-3 text-neutral-400">{m.genres.join(', ')}</td>
                    <td className="p-3 font-mono text-amber-400">{m.formats.join(', ')}</td>
                    <td className="p-3 text-neutral-300 font-mono">{m.durationMinutes}m</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        m.status === 'now_showing'
                          ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {m.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${m.title}? This cannot be undone.`)) {
                            onDeleteMovie(m.id);
                          }
                        }}
                        className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                        title="Delete movie"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Showtimes Scheduler Tab */}
      {activeTab === 'showtimes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white font-['Outfit']">Showtime Scheduling</h2>
              <p className="text-xs text-neutral-400">Schedule screen slots and assign ticket pricing tiers.</p>
            </div>
            <button
              onClick={() => setIsSchedulingShow(!isSchedulingShow)}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{isSchedulingShow ? 'Cancel' : 'Schedule New Showtime'}</span>
            </button>
          </div>

          {/* Schedule Form */}
          {isSchedulingShow && (
            <form onSubmit={handleCreateShowtime} className="p-6 rounded-2xl bg-neutral-900 border border-rose-500/40 space-y-4">
              <h3 className="text-sm font-bold text-white font-['Outfit']">Add New Showtime Slot</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Movie</label>
                  <select
                    value={schedMovieId}
                    onChange={e => setSchedMovieId(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                  >
                    {movies.map(m => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Theater Venue</label>
                  <select
                    value={schedTheaterId}
                    onChange={e => setSchedTheaterId(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                  >
                    {theaters.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Auditorium Format</label>
                  <select
                    value={schedFormat}
                    onChange={e => setSchedFormat(e.target.value as MovieFormat)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="IMAX 3D">IMAX 3D</option>
                    <option value="Dolby Cinema">Dolby Cinema</option>
                    <option value="4DX">4DX Kinetic</option>
                    <option value="Standard 2D">Standard 2D</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={schedDate}
                    onChange={e => setSchedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 07:30 PM"
                    value={schedTime}
                    onChange={e => setSchedTime(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Standard / Premium / VIP Price ($)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.5"
                      value={schedStdPrice}
                      onChange={e => setSchedStdPrice(Number(e.target.value))}
                      className="w-1/3 px-2 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                      placeholder="Std"
                    />
                    <input
                      type="number"
                      step="0.5"
                      value={schedPremPrice}
                      onChange={e => setSchedPremPrice(Number(e.target.value))}
                      className="w-1/3 px-2 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                      placeholder="Prem"
                    />
                    <input
                      type="number"
                      step="0.5"
                      value={schedVipPrice}
                      onChange={e => setSchedVipPrice(Number(e.target.value))}
                      className="w-1/3 px-2 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                      placeholder="VIP"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Confirm Showtime Schedule
              </button>
            </form>
          )}

          {/* Showtimes Table */}
          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60 max-h-[500px]">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-neutral-950 z-10">
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="p-3 font-semibold">Movie</th>
                  <th className="p-3 font-semibold">Theater</th>
                  <th className="p-3 font-semibold">Date & Time</th>
                  <th className="p-3 font-semibold">Format</th>
                  <th className="p-3 font-semibold">Tiers (Std / Prem / VIP)</th>
                  <th className="p-3 font-semibold">Booked Seats</th>
                  <th className="p-3 font-semibold text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {showtimes.slice(0, 30).map(s => {
                  const m = movies.find(m => m.id === s.movieId);
                  const t = theaters.find(t => t.id === s.theaterId);

                  return (
                    <tr key={s.id} className="hover:bg-neutral-800/30">
                      <td className="p-3 font-bold text-white">{m?.title || s.movieId}</td>
                      <td className="p-3 text-neutral-300">{t?.name || s.theaterId}</td>
                      <td className="p-3 font-mono text-amber-400">{s.date} · {s.time}</td>
                      <td className="p-3 font-mono text-white">{s.format}</td>
                      <td className="p-3 font-mono text-neutral-300">
                        ${s.pricing.standard} / ${s.pricing.premium} / ${s.pricing.vip}
                      </td>
                      <td className="p-3 font-mono text-neutral-400">{s.bookedSeatIds.length} booked</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onDeleteShowtime(s.id)}
                          className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bookings Ledger Tab */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white font-['Outfit']">Customer Bookings Ledger</h2>
              <p className="text-xs text-neutral-400">Live feed of all customer transactions, tickets, and payment receipts.</p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search booking code, customer..."
                value={bookingSearch}
                onChange={e => setBookingSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-950/60">
                  <th className="p-3 font-semibold">Booking ID</th>
                  <th className="p-3 font-semibold">Customer</th>
                  <th className="p-3 font-semibold">Contact</th>
                  <th className="p-3 font-semibold">Movie & Venue</th>
                  <th className="p-3 font-semibold">Seats</th>
                  <th className="p-3 font-semibold">Payment</th>
                  <th className="p-3 font-semibold">Total</th>
                  <th className="p-3 font-semibold text-right">Pass</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {filteredBookings.map(b => (
                  <tr key={b.id} className="hover:bg-neutral-800/30">
                    <td className="p-3 font-mono font-bold text-amber-400">{b.bookingCode}</td>
                    <td className="p-3 font-semibold text-white">{b.userName}</td>
                    <td className="p-3 text-neutral-400 font-mono text-[11px]">{b.userEmail}</td>
                    <td className="p-3">
                      <span className="font-bold text-neutral-200 block">{b.movieTitle}</span>
                      <span className="text-[11px] text-neutral-500">{b.theaterName}</span>
                    </td>
                    <td className="p-3 font-mono text-neutral-300">{b.seats.map(s => s.id).join(', ')}</td>
                    <td className="p-3 text-neutral-400">{b.paymentMethod}</td>
                    <td className="p-3 font-mono font-bold text-white">${b.total.toFixed(2)}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onViewTicket(b)}
                        className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-semibold transition-colors flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Pass</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
