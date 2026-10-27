export type MovieGenre = 
  | 'Action' 
  | 'Sci-Fi' 
  | 'Thriller' 
  | 'Adventure' 
  | 'Drama' 
  | 'Comedy' 
  | 'Animation' 
  | 'Horror' 
  | 'Crime';

export type MovieFormat = 'IMAX 3D' | 'Dolby Cinema' | '4DX' | 'Standard 2D';

export type MovieStatus = 'now_showing' | 'coming_soon';

export interface CastMember {
  actor: string;
  character: string;
}

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  posterUrl: string;
  bannerUrl: string;
  rating: number; // e.g. 4.8
  voteCount: number;
  durationMinutes: number;
  releaseDate: string;
  genres: MovieGenre[];
  languages: string[];
  formats: MovieFormat[];
  ageRating: string; // e.g. 'PG-13', 'R'
  director: string;
  cast: CastMember[];
  trailerYoutubeId: string;
  status: MovieStatus;
  featured?: boolean;
}

export interface Screen {
  id: string;
  theaterId: string;
  name: string;
  type: MovieFormat;
  totalSeats: number;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  address: string;
  city: string;
  amenities: string[];
  screens: Screen[];
}

export type SeatTier = 'standard' | 'premium' | 'vip';

export interface Seat {
  id: string;
  row: string;
  col: number;
  tier: SeatTier;
  price: number;
  isWheelchair?: boolean;
}

export interface Showtime {
  id: string;
  movieId: string;
  theaterId: string;
  screenId: string;
  date: string; // 'YYYY-MM-DD'
  time: string; // e.g. '11:00 AM'
  format: MovieFormat;
  pricing: {
    standard: number;
    premium: number;
    vip: number;
  };
  bookedSeatIds: string[];
}

export interface ConcessionItem {
  id: string;
  name: string;
  category: 'Popcorn' | 'Snacks' | 'Beverages' | 'Combos';
  description: string;
  price: number;
  badge?: string;
}

export interface BookingSeatItem {
  id: string;
  row: string;
  col: number;
  tier: SeatTier;
  price: number;
}

export interface BookingConcessionItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Booking {
  id: string;
  bookingCode: string; // e.g. IMV-49821
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  movieId: string;
  movieTitle: string;
  posterUrl: string;
  theaterId: string;
  theaterName: string;
  theaterLocation: string;
  screenName: string;
  date: string;
  time: string;
  format: MovieFormat;
  seats: BookingSeatItem[];
  concessions: BookingConcessionItem[];
  subtotal: number;
  convenienceFee: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'completed' | 'refunded';
  bookedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  memberTier: 'Standard' | 'Gold' | 'VIP Platinum';
  rewardPoints: number;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  createdAt: string;
  helpfulCount: number;
  verifiedBooking: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'reminder' | 'offer';
  timestamp: string;
  read: boolean;
}
