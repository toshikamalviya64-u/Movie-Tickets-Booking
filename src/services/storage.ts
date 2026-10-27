import { Movie, Theater, Showtime, Booking, Review, User, NotificationItem } from '../types';
import { SEED_MOVIES, SEED_THEATERS, generateSeedShowtimes, INITIAL_USER, SEED_REVIEWS } from '../data/seedData';

const STORAGE_KEYS = {
  MOVIES: 'imovies_movies_v1',
  THEATERS: 'imovies_theaters_v1',
  SHOWTIMES: 'imovies_showtimes_v1',
  BOOKINGS: 'imovies_bookings_v1',
  REVIEWS: 'imovies_reviews_v1',
  WATCHLIST: 'imovies_watchlist_v1',
  USER: 'imovies_current_user_v1',
  NOTIFICATIONS: 'imovies_notifications_v1',
};

// Safe JSON parser
function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

// Initializer
export const StorageService = {
  // Initialize storage if empty
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.MOVIES)) {
      safeSet(STORAGE_KEYS.MOVIES, SEED_MOVIES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.THEATERS)) {
      safeSet(STORAGE_KEYS.THEATERS, SEED_THEATERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SHOWTIMES)) {
      safeSet(STORAGE_KEYS.SHOWTIMES, generateSeedShowtimes());
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER)) {
      safeSet(STORAGE_KEYS.USER, INITIAL_USER);
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
      safeSet(STORAGE_KEYS.REVIEWS, SEED_REVIEWS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.WATCHLIST)) {
      safeSet(STORAGE_KEYS.WATCHLIST, ['movie-1', 'movie-5']);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      // Seed 1 active booking for demo enjoyment
      const initialBookings: Booking[] = [
        {
          id: 'bk-1001',
          bookingCode: 'IMV-83921',
          userId: INITIAL_USER.id,
          userName: INITIAL_USER.name,
          userEmail: INITIAL_USER.email,
          userPhone: INITIAL_USER.phone,
          movieId: 'movie-1',
          movieTitle: 'Celestial Horizon',
          posterUrl: '/src/assets/images/poster_scifi_epic_1793121722076.jpg',
          theaterId: 'theater-1',
          theaterName: 'IMovies Grand Luxe Cinema',
          theaterLocation: 'Metropolis Central Plaza',
          screenName: 'Auditorium 1 - IMAX Laser',
          date: new Date().toISOString().split('T')[0],
          time: '08:30 PM',
          format: 'IMAX 3D',
          seats: [
            { id: 'F7', row: 'F', col: 7, tier: 'premium', price: 22.00 },
            { id: 'F8', row: 'F', col: 8, tier: 'premium', price: 22.00 }
          ],
          concessions: [
            { id: 'c-1', name: 'Truffle & Herb Gourmet Popcorn', quantity: 1, price: 8.50 },
            { id: 'c-5', name: 'Craft Fountain Soda (Large 32oz)', quantity: 2, price: 5.50 }
          ],
          subtotal: 63.50,
          convenienceFee: 3.50,
          tax: 4.80,
          total: 71.80,
          paymentMethod: 'Mastercard (••• 4022)',
          paymentStatus: 'completed',
          bookedAt: new Date(Date.now() - 3600000 * 4).toISOString()
        }
      ];
      safeSet(STORAGE_KEYS.BOOKINGS, initialBookings);
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      const initialNotifs: NotificationItem[] = [
        {
          id: 'notif-1',
          title: 'Booking Confirmed!',
          message: 'Your seats F7, F8 for Celestial Horizon are confirmed at IMovies Grand Luxe Cinema.',
          type: 'booking',
          timestamp: 'Just now',
          read: false
        },
        {
          id: 'notif-2',
          title: 'IMAX Laser Experience Ready',
          message: 'Auditorium doors open 20 minutes prior to showtime. Concessions express pickup available.',
          type: 'reminder',
          timestamp: '2 hours ago',
          read: true
        }
      ];
      safeSet(STORAGE_KEYS.NOTIFICATIONS, initialNotifs);
    }
  },

  // Movies
  getMovies: (): Movie[] => {
    return safeGet<Movie[]>(STORAGE_KEYS.MOVIES, SEED_MOVIES);
  },
  getMovieById: (id: string): Movie | undefined => {
    return StorageService.getMovies().find(m => m.id === id);
  },
  saveMovie: (movie: Movie): void => {
    const movies = StorageService.getMovies();
    const idx = movies.findIndex(m => m.id === movie.id);
    if (idx >= 0) {
      movies[idx] = movie;
    } else {
      movies.unshift(movie);
    }
    safeSet(STORAGE_KEYS.MOVIES, movies);
  },
  deleteMovie: (id: string): void => {
    const movies = StorageService.getMovies().filter(m => m.id !== id);
    safeSet(STORAGE_KEYS.MOVIES, movies);
  },

  // Theaters
  getTheaters: (): Theater[] => {
    return safeGet<Theater[]>(STORAGE_KEYS.THEATERS, SEED_THEATERS);
  },
  getTheaterById: (id: string): Theater | undefined => {
    return StorageService.getTheaters().find(t => t.id === id);
  },

  // Showtimes
  getShowtimes: (): Showtime[] => {
    return safeGet<Showtime[]>(STORAGE_KEYS.SHOWTIMES, []);
  },
  getShowtimesForMovie: (movieId: string, dateStr: string): Showtime[] => {
    return StorageService.getShowtimes().filter(s => s.movieId === movieId && s.date === dateStr);
  },
  getShowtimeById: (id: string): Showtime | undefined => {
    return StorageService.getShowtimes().find(s => s.id === id);
  },
  addShowtime: (showtime: Showtime): void => {
    const list = StorageService.getShowtimes();
    list.push(showtime);
    safeSet(STORAGE_KEYS.SHOWTIMES, list);
  },
  deleteShowtime: (id: string): void => {
    const list = StorageService.getShowtimes().filter(s => s.id !== id);
    safeSet(STORAGE_KEYS.SHOWTIMES, list);
  },

  // Bookings
  getBookings: (): Booking[] => {
    return safeGet<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
  },
  getUserBookings: (userId: string): Booking[] => {
    return StorageService.getBookings().filter(b => b.userId === userId);
  },
  createBooking: (newBooking: Booking, showtimeId: string): Booking => {
    const bookings = StorageService.getBookings();
    bookings.unshift(newBooking);
    safeSet(STORAGE_KEYS.BOOKINGS, bookings);

    // Update booked seats on showtime
    const showtimes = StorageService.getShowtimes();
    const show = showtimes.find(s => s.id === showtimeId);
    if (show) {
      const seatIds = newBooking.seats.map(s => s.id);
      show.bookedSeatIds = [...new Set([...show.bookedSeatIds, ...seatIds])];
      safeSet(STORAGE_KEYS.SHOWTIMES, showtimes);
    }

    // Add confirmation notification
    StorageService.addNotification({
      id: `notif-${Date.now()}`,
      title: 'Tickets Confirmed!',
      message: `${newBooking.movieTitle} (${newBooking.seats.map(s => s.id).join(', ')}) at ${newBooking.theaterName}`,
      type: 'booking',
      timestamp: 'Just now',
      read: false
    });

    return newBooking;
  },
  cancelBooking: (bookingId: string): boolean => {
    const bookings = StorageService.getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return false;

    booking.paymentStatus = 'refunded';
    safeSet(STORAGE_KEYS.BOOKINGS, bookings);

    // Release seats on showtime if matched
    const showtimes = StorageService.getShowtimes();
    const show = showtimes.find(s => 
      s.movieId === booking.movieId && 
      s.theaterId === booking.theaterId && 
      s.date === booking.date && 
      s.time === booking.time
    );
    if (show) {
      const cancelledSeatIds = new Set(booking.seats.map(s => s.id));
      show.bookedSeatIds = show.bookedSeatIds.filter(id => !cancelledSeatIds.has(id));
      safeSet(STORAGE_KEYS.SHOWTIMES, showtimes);
    }

    StorageService.addNotification({
      id: `notif-${Date.now()}`,
      title: 'Booking Cancelled',
      message: `Reservation ${booking.bookingCode} was cancelled. Refund processed to original payment method.`,
      type: 'booking',
      timestamp: 'Just now',
      read: false
    });

    return true;
  },

  // Watchlist
  getWatchlist: (): string[] => {
    return safeGet<string[]>(STORAGE_KEYS.WATCHLIST, []);
  },
  toggleWatchlist: (movieId: string): boolean => {
    let list = StorageService.getWatchlist();
    let isAdded = false;
    if (list.includes(movieId)) {
      list = list.filter(id => id !== movieId);
      isAdded = false;
    } else {
      list.push(movieId);
      isAdded = true;
    }
    safeSet(STORAGE_KEYS.WATCHLIST, list);
    return isAdded;
  },

  // Reviews
  getReviewsForMovie: (movieId: string): Review[] => {
    return safeGet<Review[]>(STORAGE_KEYS.REVIEWS, SEED_REVIEWS).filter(r => r.movieId === movieId);
  },
  addReview: (review: Review): void => {
    const reviews = safeGet<Review[]>(STORAGE_KEYS.REVIEWS, SEED_REVIEWS);
    reviews.unshift(review);
    safeSet(STORAGE_KEYS.REVIEWS, reviews);
  },

  // Notifications
  getNotifications: (): NotificationItem[] => {
    return safeGet<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, []);
  },
  addNotification: (item: NotificationItem): void => {
    const list = StorageService.getNotifications();
    list.unshift(item);
    safeSet(STORAGE_KEYS.NOTIFICATIONS, list);
  },
  markAllNotificationsRead: (): void => {
    const list = StorageService.getNotifications().map(n => ({ ...n, read: true }));
    safeSet(STORAGE_KEYS.NOTIFICATIONS, list);
  },

  // Current User
  getUser: (): User => {
    return safeGet<User>(STORAGE_KEYS.USER, INITIAL_USER);
  },
  setUser: (user: User): void => {
    safeSet(STORAGE_KEYS.USER, user);
  }
};
