import { Movie, Theater, ConcessionItem, Showtime, Review, User } from '../types';

export const SEED_MOVIES: Movie[] = [
  {
    id: 'movie-1',
    title: 'Celestial Horizon',
    tagline: 'Beyond the edge of known spacetime, humanity finds its origins.',
    synopsis: 'When deep-space astronomical probes detect a repeating gravitational harmonic from a ringed super-planet at the fringe of the Perseus Arm, astronaut Commander Laura Vance leads an international exploratory crew to unravel a colossal cosmic artifact before an impending stellar collapse.',
    posterUrl: '/src/assets/images/poster_scifi_epic_1793121722076.jpg',
    bannerUrl: '/src/assets/images/poster_scifi_epic_1793121722076.jpg',
    rating: 4.9,
    voteCount: 14200,
    durationMinutes: 168,
    releaseDate: '2026-10-15',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    languages: ['English', 'French', 'Japanese'],
    formats: ['IMAX 3D', 'Dolby Cinema', 'Standard 2D'],
    ageRating: 'PG-13',
    director: 'Eliza Reed',
    cast: [
      { actor: 'Laura Vance', character: 'Commander Eliza Kane' },
      { actor: 'David Chen', character: 'Dr. Michael Thorne' },
      { actor: 'Kenji Sato', character: 'Navigator Ren Takahashi' },
      { actor: 'Helena Berg', character: 'Astrophysicist Astrid Vane' }
    ],
    trailerYoutubeId: 'd96cjJhvlMA',
    status: 'now_showing',
    featured: true
  },
  {
    id: 'movie-2',
    title: 'The Silent Echo',
    tagline: 'Some secrets are buried. Others walk among us.',
    synopsis: 'In the rain-drenched cobblestone alleys of 1960s Central Europe, an undercover intelligence operative uncovers a conspiracy buried inside an underground diplomatic radio intercept syndicate, where loyalties shift with every tape recording.',
    posterUrl: '/src/assets/images/poster_noir_espionage_1793121723786.jpg',
    bannerUrl: '/src/assets/images/poster_noir_espionage_1793121723786.jpg',
    rating: 4.7,
    voteCount: 9840,
    durationMinutes: 134,
    releaseDate: '2026-10-02',
    genres: ['Thriller', 'Crime', 'Drama'],
    languages: ['English', 'German'],
    formats: ['Dolby Cinema', 'Standard 2D'],
    ageRating: 'R',
    director: 'Antonio Larkin',
    cast: [
      { actor: 'Elias Vance', character: 'Agent Frank Mercer' },
      { actor: 'Isobel Reed', character: 'Elena Fischer' },
      { actor: 'Marcus Thorn', character: 'Director Walter Gross' }
    ],
    trailerYoutubeId: 'YoHD9XEInc0',
    status: 'now_showing',
    featured: false
  },
  {
    id: 'movie-3',
    title: 'The Aquamarine Odyssey',
    tagline: 'Lost realm of the deep abyss.',
    synopsis: 'Deep-ocean marine researchers descend into the mysterious Mariana Trench Abyss, discovering an ancient sunken civilization powered by bioluminescent hydro-thermal crystalline energy, watched over by sentient oceanic guardians.',
    posterUrl: '/src/assets/images/poster_fantasy_realm_1793121723447.jpg',
    bannerUrl: '/src/assets/images/poster_fantasy_realm_1793121723447.jpg',
    rating: 4.8,
    voteCount: 11350,
    durationMinutes: 146,
    releaseDate: '2026-09-24',
    genres: ['Adventure', 'Sci-Fi', 'Action'],
    languages: ['English', 'Spanish'],
    formats: ['IMAX 3D', '4DX', 'Dolby Cinema'],
    ageRating: 'PG-13',
    director: 'Sarah J. Reynolds',
    cast: [
      { actor: 'David Chen', character: 'Captain Lucas Rivera' },
      { actor: 'Eliza Reed', character: 'Marine Biologist Coralie' },
      { actor: 'Michael Bishop', character: 'Dr. Gregory Hayes' }
    ],
    trailerYoutubeId: '7TavVZMewpY',
    status: 'now_showing',
    featured: false
  },
  {
    id: 'movie-4',
    title: 'Velocity: Apex Sector',
    tagline: 'Defy gravity. Outrun the storm.',
    synopsis: 'In an autonomous neo-metropolis built above the cloud layer, an elite syndicate of experimental mag-lev pilots compete in high-altitude endurance races while battling corporate surveillance drones.',
    posterUrl: '/src/assets/images/poster_scifi_epic_1793121722076.jpg',
    bannerUrl: '/src/assets/images/poster_scifi_epic_1793121722076.jpg',
    rating: 4.6,
    voteCount: 7420,
    durationMinutes: 128,
    releaseDate: '2026-10-18',
    genres: ['Action', 'Sci-Fi'],
    languages: ['English', 'Korean'],
    formats: ['4DX', 'IMAX 3D', 'Standard 2D'],
    ageRating: 'PG-13',
    director: 'Julian Croft',
    cast: [
      { actor: 'Tora Lind', character: 'Jaxen Cruz' },
      { actor: 'Maya Lin', character: 'Vesper Wu' },
      { actor: 'Carlos Ortiz', character: 'Titan' }
    ],
    trailerYoutubeId: 'dQw4w9WgXcQ',
    status: 'now_showing',
    featured: false
  },
  {
    id: 'movie-5',
    title: 'The Cartographer of Dreams',
    tagline: 'Every memory leaves an imprint on the map.',
    synopsis: 'An elderly archival cartographer discovers an antique atlas whose hand-drawn topography shifts to depict the real-time subconscious dreams of the inhabitants of a remote coastal village.',
    posterUrl: '/src/assets/images/poster_noir_espionage_1793121723786.jpg',
    bannerUrl: '/src/assets/images/poster_noir_espionage_1793121723786.jpg',
    rating: 4.9,
    voteCount: 6100,
    durationMinutes: 119,
    releaseDate: '2026-11-12',
    genres: ['Drama', 'Adventure'],
    languages: ['English', 'Italian'],
    formats: ['Dolby Cinema', 'Standard 2D'],
    ageRating: 'PG',
    director: 'Clara Beaumont',
    cast: [
      { actor: 'Arthur Sterling', character: 'Ignatius Finch' },
      { actor: 'Sophie Marceau', character: 'Beatrice Vance' }
    ],
    trailerYoutubeId: 'L_LUpnjgPso',
    status: 'coming_soon',
    featured: false
  },
  {
    id: 'movie-6',
    title: 'Nebula Syndicate',
    tagline: 'When the galaxy calls, the outcasts answer.',
    synopsis: 'A ragtag crew of bounty hunters, cybernetically augmented engineers, and telepathic pilot navigators plan an audacious heist on an interstellar luxury spaceliner orbiting an unstable pulsar.',
    posterUrl: '/src/assets/images/poster_fantasy_realm_1793121723447.jpg',
    bannerUrl: '/src/assets/images/poster_fantasy_realm_1793121723447.jpg',
    rating: 4.7,
    voteCount: 5200,
    durationMinutes: 140,
    releaseDate: '2026-11-20',
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    languages: ['English'],
    formats: ['IMAX 3D', '4DX', 'Standard 2D'],
    ageRating: 'PG-13',
    director: 'Dexter Cole',
    cast: [
      { actor: 'Brock Sterling', character: 'Captain Zane' },
      { actor: 'Keira Woods', character: 'Nova' },
      { actor: 'Dmitri Petrov', character: 'Volk' }
    ],
    trailerYoutubeId: 'jNQXAC9IVRw',
    status: 'coming_soon',
    featured: false
  }
];

export const SEED_THEATERS: Theater[] = [
  {
    id: 'theater-1',
    name: 'IMovies Grand Luxe Cinema',
    location: 'Metropolis Central Plaza',
    address: '742 Broadway Avenue, Floor 4, Metropolis City',
    city: 'Metropolis',
    amenities: ['IMAX with Laser', 'Dolby Atmos 128-ch', 'Full VIP Recliner Loungers', 'Gourmet Bistro Service', 'Complimentary Valet'],
    screens: [
      { id: 'screen-1-1', theaterId: 'theater-1', name: 'Auditorium 1 - IMAX Laser', type: 'IMAX 3D', totalSeats: 120 },
      { id: 'screen-1-2', theaterId: 'theater-1', name: 'Auditorium 2 - Dolby Cinema', type: 'Dolby Cinema', totalSeats: 96 },
      { id: 'screen-1-3', theaterId: 'theater-1', name: 'Auditorium 3 - VIP Luxe Recliners', type: 'Standard 2D', totalSeats: 64 }
    ]
  },
  {
    id: 'theater-2',
    name: 'IMovies CyberHub Multiplex',
    location: 'Silicon District Hub',
    address: '108 Innovation Boulevard, Tech District',
    city: 'Silicon Bay',
    amenities: ['4DX Motion Seats', 'Dolby Atmos Sound', 'Laser Projector 4K', 'Self-Service Smart Concessions'],
    screens: [
      { id: 'screen-2-1', theaterId: 'theater-2', name: 'Screen 1 - 4DX Kinetic Experience', type: '4DX', totalSeats: 80 },
      { id: 'screen-2-2', theaterId: 'theater-2', name: 'Screen 2 - Dolby Atmos Premier', type: 'Dolby Cinema', totalSeats: 110 }
    ]
  },
  {
    id: 'theater-3',
    name: 'IMovies Starlight Pavilion',
    location: 'Marina Waterfront District',
    address: '22 Harbor Drive, Pier 7',
    city: 'Ocean Crest',
    amenities: ['Panoramic Curved Screen', 'VIP Cocktail Lounge', 'Reclining Leather Seats', 'In-Seat Dining Service'],
    screens: [
      { id: 'screen-3-1', theaterId: 'theater-3', name: 'Pavilion Screen A - IMAX 70mm', type: 'IMAX 3D', totalSeats: 120 },
      { id: 'screen-3-2', theaterId: 'theater-3', name: 'Pavilion Screen B - Classic Atmos', type: 'Standard 2D', totalSeats: 88 }
    ]
  }
];

export const SEED_CONCESSIONS: ConcessionItem[] = [
  {
    id: 'c-1',
    name: 'Truffle & Herb Gourmet Popcorn',
    category: 'Popcorn',
    description: 'Freshly popped jumbo organic corn tossed in Italian white truffle oil, sea salt & rosemary.',
    price: 8.50,
    badge: 'Chef Signature'
  },
  {
    id: 'c-2',
    name: 'Classic Buttered Theater Popcorn',
    category: 'Popcorn',
    description: 'Traditional warm golden popcorn drizzled with real clarified butter.',
    price: 6.50
  },
  {
    id: 'c-3',
    name: 'Artisan Loaded Nachos Supreme',
    category: 'Snacks',
    description: 'Warm crispy tortilla chips served with melted artisan cheddar cheese, jalapeños & salsa roja.',
    price: 9.00
  },
  {
    id: 'c-4',
    name: 'Pretzel Bites with Warm Queso Dip',
    category: 'Snacks',
    description: 'Bavarian-style salted pretzel bites baked fresh, served with smoked gouda queso.',
    price: 7.50
  },
  {
    id: 'c-5',
    name: 'Craft Fountain Soda (Large 32oz)',
    category: 'Beverages',
    description: 'Select from Kola Artisan, Blood Orange Fizz, Vintage Root Beer, or Zero-Sugar Lemon Lime.',
    price: 5.50
  },
  {
    id: 'c-6',
    name: 'Glacial Blue Raspberry Slushie',
    category: 'Beverages',
    description: 'Sub-zero frozen refreshment with natural fruit extracts and crisp berry burst.',
    price: 6.00
  },
  {
    id: 'c-7',
    name: 'The Premiere Combo for Two',
    category: 'Combos',
    description: '1 Large Truffle Popcorn + 2 Large Fountain Sodas + 1 Choice of Candy or Pretzel Bites.',
    price: 19.50,
    badge: 'Best Value'
  },
  {
    id: 'c-8',
    name: 'VIP Gold Class Tasting Platter',
    category: 'Combos',
    description: 'Artisan nachos, dual mini popcorns (caramel & savory cheddar), and two craft beverages.',
    price: 24.00,
    badge: 'Luxury Tier'
  }
];

export const INITIAL_USER: User = {
  id: 'usr-1',
  name: 'Alexander Cross',
  email: 'alex.cross@cinemafan.com',
  phone: '+1 (555) 382-9104',
  role: 'user',
  memberTier: 'VIP Platinum',
  rewardPoints: 1250
};

export const ADMIN_USER: User = {
  id: 'usr-admin',
  name: 'Elena Rostova (Admin)',
  email: 'admin@imovies.com',
  phone: '+1 (555) 900-0199',
  role: 'admin',
  memberTier: 'VIP Platinum',
  rewardPoints: 9999
};

export const SEED_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    movieId: 'movie-1',
    userId: 'usr-42',
    userName: 'Marcus Sterling',
    rating: 5,
    title: 'A transcendent cinema experience in IMAX',
    comment: 'The sound design alone during the celestial event sequence shook the entire theater. Eliza Reed has crafted an absolute masterpiece of hard science fiction that rivals 2001 and Interstellar.',
    createdAt: '2026-10-22',
    helpfulCount: 48,
    verifiedBooking: true
  },
  {
    id: 'rev-2',
    movieId: 'movie-1',
    userId: 'usr-58',
    userName: 'Claire Laurent',
    rating: 5,
    title: 'Unbelievable visual scale',
    comment: 'Booked row G in Dolby Cinema. The contrast ratio and colors of the planetary rings on the curved screen were breathtaking. Highly recommend securing center seats.',
    createdAt: '2026-10-24',
    helpfulCount: 31,
    verifiedBooking: true
  },
  {
    id: 'rev-3',
    movieId: 'movie-2',
    userId: 'usr-71',
    userName: 'Jonathan Meyer',
    rating: 5,
    title: 'Gripping from the first five minutes',
    comment: 'Atmospheric, gritty, and the tension never lets up. The lighting and jazz score in the night scenes make you feel like you are actually there in 1960s Europe.',
    createdAt: '2026-10-20',
    helpfulCount: 19,
    verifiedBooking: true
  }
];

// Helper to generate dates relative to current date
export const getScheduleDates = (): { label: string; dateStr: string; dayName: string }[] => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 6; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    dates.push({ label, dateStr, dayName });
  }
  return dates;
};

// Seed showtimes for today and upcoming days
export const generateSeedShowtimes = (): Showtime[] => {
  const dates = getScheduleDates();
  const times = ['10:30 AM', '01:45 PM', '05:15 PM', '08:30 PM', '11:00 PM'];
  const showtimes: Showtime[] = [];

  let count = 1;
  dates.forEach(d => {
    // For each now showing movie
    SEED_MOVIES.filter(m => m.status === 'now_showing').forEach(m => {
      SEED_THEATERS.forEach(t => {
        t.screens.forEach(s => {
          // Add 2-3 showtimes per screen per movie
          times.slice(0, 3).forEach((timeStr, idx) => {
            // Realistic pre-booked seats for occupancy demonstration
            const initialBooked = ['D4', 'D5', 'E6', 'E7', 'F7', 'F8', 'G5', 'H8', 'H9'];
            showtimes.push({
              id: `show-${count++}`,
              movieId: m.id,
              theaterId: t.id,
              screenId: s.id,
              date: d.dateStr,
              time: timeStr,
              format: s.type,
              pricing: {
                standard: s.type === 'IMAX 3D' ? 18.00 : s.type === '4DX' ? 20.00 : 15.00,
                premium: s.type === 'IMAX 3D' ? 22.00 : s.type === '4DX' ? 24.00 : 19.00,
                vip: s.type === 'IMAX 3D' ? 28.00 : s.type === '4DX' ? 30.00 : 25.00
              },
              bookedSeatIds: (idx % 2 === 0) ? initialBooked : ['C3', 'C4', 'E8', 'E9', 'G6']
            });
          });
        });
      });
    });
  });

  return showtimes;
};
