import React, { useState } from 'react';
import { 
  X, BookOpen, Database, Server, Layout, ArrowRight, Code, 
  Layers, CheckCircle2, Copy, Check, Terminal, FileCode2, GitBranch, Cpu
} from 'lucide-react';

interface TechnicalDocsModalProps {
  onClose: () => void;
}

export const TechnicalDocsModal: React.FC<TechnicalDocsModalProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<'architecture' | 'er' | 'mvc' | 'mongodb' | 'api' | 'setup'>('architecture');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-6 text-neutral-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-900/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                Project Documentation & Architecture
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                The IMovies — System Engineering Specification
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close documentation"
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 px-4 sm:px-6 py-2.5 border-b border-neutral-800 bg-neutral-900/40 overflow-x-auto shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveSection('architecture')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'architecture' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Architecture</span>
          </button>

          <button
            onClick={() => setActiveSection('er')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'er' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>ER-Diagram & Schema</span>
          </button>

          <button
            onClick={() => setActiveSection('mvc')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'mvc' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>MVC Pattern & User Flow</span>
          </button>

          <button
            onClick={() => setActiveSection('mongodb')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'mongodb' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>MongoDB Models</span>
          </button>

          <button
            onClick={() => setActiveSection('api')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'api' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>REST API Endpoints</span>
          </button>

          <button
            onClick={() => setActiveSection('setup')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'setup' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Setup & Execution Guide</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          {/* Architecture Section */}
          {activeSection === 'architecture' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit'] mb-2">
                  1. Technical Architecture Overview
                </h3>
                <p>
                  The IMovies is architected as a high-performance, asynchronous three-tier client-server application. It decouples the client user interface from the server business logic and data storage, providing high scalability, low latency, and real-time seat lock consistency.
                </p>
              </div>

              {/* Architectural Diagram */}
              <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                  3-Tier Architecture Diagram
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Presentation Tier */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <span className="text-[10px] text-amber-400 font-mono font-bold block">PRESENTATION TIER</span>
                    <h4 className="text-sm font-bold text-white">React.js + Tailwind CSS</h4>
                    <ul className="text-xs text-neutral-400 space-y-1 list-disc list-inside">
                      <li>Vite Bundler & Virtual DOM</li>
                      <li>Interactive SVG Curved Auditorium</li>
                      <li>Stateful Seat Lock & Price Matrix</li>
                      <li>Lucide Vector Cinema Iconography</li>
                    </ul>
                  </div>

                  {/* Application / Logic Tier */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <span className="text-[10px] text-sky-400 font-mono font-bold block">APPLICATION TIER</span>
                    <h4 className="text-sm font-bold text-white">Node.js + Express.js</h4>
                    <ul className="text-xs text-neutral-400 space-y-1 list-disc list-inside">
                      <li>RESTful API Endpoints (/api/v1)</li>
                      <li>JWT Authentication & Role Middleware</li>
                      <li>Seat Concurrency & Reservation Lock</li>
                      <li>Payment Gateway Processing Simulation</li>
                    </ul>
                  </div>

                  {/* Data Tier */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <span className="text-[10px] text-emerald-400 font-mono font-bold block">DATA TIER</span>
                    <h4 className="text-sm font-bold text-white">MongoDB (NoSQL) + Mongoose</h4>
                    <ul className="text-xs text-neutral-400 space-y-1 list-disc list-inside">
                      <li>Document Collections (Users, Movies)</li>
                      <li>Showtimes & Seat Occupancy Arrays</li>
                      <li>Bookings, Tickets & Concession Orders</li>
                      <li>BSON Indexing for Fast Querying</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Roles and Responsibilities */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white font-['Outfit']">Roles and Responsibilities Matrix</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <h5 className="font-bold text-amber-400 text-xs mb-1">Customer / Cinema Viewer</h5>
                    <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                      <li>Browse Now Showing and Upcoming movie listings.</li>
                      <li>Filter screenings by format (IMAX, Dolby Cinema, 4DX) and date.</li>
                      <li>Select specific tiered auditorium seats in real-time.</li>
                      <li>Add gourmet bistro items (Popcorn, Nachos, Sodas).</li>
                      <li>Complete checkout and obtain printable digital QR passes.</li>
                      <li>Manage personal Watchlist and post verified film reviews.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <h5 className="font-bold text-rose-400 text-xs mb-1">Cinema Administrator (Admin)</h5>
                    <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                      <li>Manage Movie Catalog: Add new releases, edit synopses, delete films.</li>
                      <li>Auditorium & Screen Management: Configure multiplex capacities.</li>
                      <li>Showtime Scheduling: Assign time slots and custom tier pricing.</li>
                      <li>Bookings Ledger: Inspect live orders, process cancellations/refunds.</li>
                      <li>Business Analytics: Real-time revenue, tickets sold, and occupancy rates.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ER Diagram Section */}
          {activeSection === 'er' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit'] mb-2">
                  2. Entity-Relationship (ER) Diagram
                </h3>
                <p>
                  The system models relationships between Users, Movies, Theaters, Screens, Showtimes, Bookings, Concessions, and Reviews. Below is the structural schema relational map.
                </p>
              </div>

              {/* Visual ER Entity Cards */}
              <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Movie Entity */}
                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs">
                    <div className="text-amber-400 font-bold border-b border-neutral-800 pb-1 mb-2">
                      ENTITY: Movie
                    </div>
                    <div className="space-y-1 text-neutral-400">
                      <div><span className="text-rose-400 font-bold">_id:</span> ObjectId [PK]</div>
                      <div>title: String</div>
                      <div>synopsis: String</div>
                      <div>genres: Array&lt;String&gt;</div>
                      <div>durationMinutes: Number</div>
                      <div>formats: Array&lt;String&gt;</div>
                      <div>rating: Number</div>
                      <div>status: Enum('now_showing', 'coming_soon')</div>
                    </div>
                  </div>

                  {/* Showtime Entity */}
                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs">
                    <div className="text-sky-400 font-bold border-b border-neutral-800 pb-1 mb-2">
                      ENTITY: Showtime
                    </div>
                    <div className="space-y-1 text-neutral-400">
                      <div><span className="text-rose-400 font-bold">_id:</span> ObjectId [PK]</div>
                      <div><span className="text-amber-400">movieId:</span> ObjectId [FK]</div>
                      <div><span className="text-amber-400">theaterId:</span> ObjectId [FK]</div>
                      <div><span className="text-amber-400">screenId:</span> ObjectId [FK]</div>
                      <div>date: String (YYYY-MM-DD)</div>
                      <div>time: String (HH:MM AM/PM)</div>
                      <div>pricing: Object (std, prem, vip)</div>
                      <div>bookedSeatIds: Array&lt;String&gt;</div>
                    </div>
                  </div>

                  {/* Booking Entity */}
                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs">
                    <div className="text-emerald-400 font-bold border-b border-neutral-800 pb-1 mb-2">
                      ENTITY: Booking
                    </div>
                    <div className="space-y-1 text-neutral-400">
                      <div><span className="text-rose-400 font-bold">_id:</span> ObjectId [PK]</div>
                      <div>bookingCode: String [Unique]</div>
                      <div><span className="text-amber-400">userId:</span> ObjectId [FK]</div>
                      <div><span className="text-amber-400">showtimeId:</span> ObjectId [FK]</div>
                      <div>seats: Array&lt;SeatItem&gt;</div>
                      <div>concessions: Array&lt;Item&gt;</div>
                      <div>totalAmount: Number</div>
                      <div>paymentStatus: String</div>
                      <div>bookedAt: Date</div>
                    </div>
                  </div>

                  {/* User Entity */}
                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs">
                    <div className="text-purple-400 font-bold border-b border-neutral-800 pb-1 mb-2">
                      ENTITY: User
                    </div>
                    <div className="space-y-1 text-neutral-400">
                      <div><span className="text-rose-400 font-bold">_id:</span> ObjectId [PK]</div>
                      <div>name: String</div>
                      <div>email: String [Unique]</div>
                      <div>passwordHash: String</div>
                      <div>role: Enum('user', 'admin')</div>
                      <div>rewardPoints: Number</div>
                      <div>watchlist: Array&lt;MovieId&gt;</div>
                    </div>
                  </div>

                  {/* Theater & Screen */}
                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs">
                    <div className="text-pink-400 font-bold border-b border-neutral-800 pb-1 mb-2">
                      ENTITY: Theater & Screen
                    </div>
                    <div className="space-y-1 text-neutral-400">
                      <div><span className="text-rose-400 font-bold">_id:</span> ObjectId [PK]</div>
                      <div>name: String</div>
                      <div>location: String</div>
                      <div>address: String</div>
                      <div>screens: Array&lt;Screen&gt;</div>
                      <div>amenities: Array&lt;String&gt;</div>
                    </div>
                  </div>

                  {/* Review Entity */}
                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs">
                    <div className="text-yellow-400 font-bold border-b border-neutral-800 pb-1 mb-2">
                      ENTITY: Review
                    </div>
                    <div className="space-y-1 text-neutral-400">
                      <div><span className="text-rose-400 font-bold">_id:</span> ObjectId [PK]</div>
                      <div><span className="text-amber-400">movieId:</span> ObjectId [FK]</div>
                      <div><span className="text-amber-400">userId:</span> ObjectId [FK]</div>
                      <div>rating: Number (1-5)</div>
                      <div>title: String</div>
                      <div>comment: String</div>
                      <div>verifiedBooking: Boolean</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 text-xs text-neutral-400">
                  <strong className="text-white">Cardinality:</strong> 
                  <span className="ml-2 font-mono text-amber-400">Movie (1) &mdash;&mdash;&lt; (M) Showtime</span> · 
                  <span className="ml-2 font-mono text-sky-400">Theater (1) &mdash;&mdash;&lt; (M) Screen</span> · 
                  <span className="ml-2 font-mono text-emerald-400">User (1) &mdash;&mdash;&lt; (M) Booking</span> · 
                  <span className="ml-2 font-mono text-yellow-400">Showtime (1) &mdash;&mdash;&lt; (M) Booking</span>
                </div>
              </div>
            </div>
          )}

          {/* MVC Pattern Section */}
          {activeSection === 'mvc' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit'] mb-2">
                  3. Model-View-Controller (MVC) Pattern & User Flow
                </h3>
                <p>
                  The IMovies implements the clean architectural separation of concerns through the Model-View-Controller paradigm:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold font-mono">
                    M
                  </div>
                  <h4 className="text-sm font-bold text-white">MODEL</h4>
                  <p className="text-xs text-neutral-400">
                    Defines the data schemas, validation rules, and business persistence logic using Mongoose & MongoDB collections (User, Movie, Showtime, Booking).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
                    V
                  </div>
                  <h4 className="text-sm font-bold text-white">VIEW</h4>
                  <p className="text-xs text-neutral-400">
                    Client-side React 19 single-page components (SeatPicker, MovieCard, CheckoutModal, TicketPassModal) rendering intuitive, responsive UI with real-time reactive updates.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold font-mono">
                    C
                  </div>
                  <h4 className="text-sm font-bold text-white">CONTROLLER</h4>
                  <p className="text-xs text-neutral-400">
                    Express route controllers (`movieController.js`, `bookingController.js`, `authController.js`) receiving HTTP requests, verifying JWT tokens, and responding with formatted JSON.
                  </p>
                </div>
              </div>

              {/* User Flow Stepper */}
              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <h4 className="text-sm font-bold text-white font-['Outfit']">End-to-End User Booking Flow</h4>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-center flex-1 w-full">
                    <span className="font-bold text-amber-400 block font-mono">1. DISCOVER</span>
                    <span className="text-neutral-400 text-[11px]">Browse Catalog & Trailers</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 hidden sm:block shrink-0" />
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-center flex-1 w-full">
                    <span className="font-bold text-amber-400 block font-mono">2. SHOWTIME</span>
                    <span className="text-neutral-400 text-[11px]">Pick Multiplex & Date</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 hidden sm:block shrink-0" />
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-center flex-1 w-full">
                    <span className="font-bold text-amber-400 block font-mono">3. SEAT MAP</span>
                    <span className="text-neutral-400 text-[11px]">Curved Screen Auditorium</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 hidden sm:block shrink-0" />
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-center flex-1 w-full">
                    <span className="font-bold text-amber-400 block font-mono">4. CONCESSIONS</span>
                    <span className="text-neutral-400 text-[11px]">Popcorn & Drink Combos</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 hidden sm:block shrink-0" />
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-center flex-1 w-full">
                    <span className="font-bold text-amber-400 block font-mono">5. PASS & QR</span>
                    <span className="text-neutral-400 text-[11px]">Instant Admission Issuance</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MongoDB Code & Schemas */}
          {activeSection === 'mongodb' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit'] mb-2">
                  4. MongoDB Connection & Mongoose Models
                </h3>
                <p>
                  Production Mongoose schemas configured for connection pooling, data indexing, and referential integrity.
                </p>
              </div>

              {/* Database Connection Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>db/connect.js</span>
                  <button
                    onClick={() => copyToClipboard(`const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/imovies', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Database connection error: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;`, 'connect')}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300"
                  >
                    {copiedKey === 'connect' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'connect' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 font-mono text-xs overflow-x-auto text-amber-200/90">
{`const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/imovies');
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Database connection error: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;`}
                </pre>
              </div>

              {/* Booking Schema */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>models/Booking.js</span>
                  <button
                    onClick={() => copyToClipboard(`const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingCode: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  seats: [{ id: String, row: String, col: Number, tier: String, price: Number }],
  concessions: [{ name: String, quantity: Number, price: Number }],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['completed', 'refunded'], default: 'completed' },
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);`, 'bookingModel')}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300"
                  >
                    {copiedKey === 'bookingModel' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'bookingModel' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 font-mono text-xs overflow-x-auto text-sky-200/90">
{`const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingCode: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  seats: [{ id: String, row: String, col: Number, tier: String, price: Number }],
  concessions: [{ name: String, quantity: Number, price: Number }],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['completed', 'refunded'], default: 'completed' },
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);`}
                </pre>
              </div>
            </div>
          )}

          {/* API Endpoints */}
          {activeSection === 'api' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit'] mb-2">
                  5. RESTful API Endpoints Specification
                </h3>
                <p>
                  Structured REST endpoints for user authentication, movies catalog, showtimes, seats lock, and bookings.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-950">
                      <th className="p-3 font-semibold">Method</th>
                      <th className="p-3 font-semibold">Endpoint</th>
                      <th className="p-3 font-semibold">Description</th>
                      <th className="p-3 font-semibold">Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 font-mono">
                    <tr>
                      <td className="p-3"><span className="text-emerald-400 font-bold">GET</span></td>
                      <td className="p-3 text-white">/api/v1/movies</td>
                      <td className="p-3 text-neutral-300 font-sans">List all now showing and upcoming movies</td>
                      <td className="p-3 text-neutral-500 font-sans">Public</td>
                    </tr>
                    <tr>
                      <td className="p-3"><span className="text-emerald-400 font-bold">GET</span></td>
                      <td className="p-3 text-white">/api/v1/movies/:id/showtimes</td>
                      <td className="p-3 text-neutral-300 font-sans">Get available dates, screens & showtimes</td>
                      <td className="p-3 text-neutral-500 font-sans">Public</td>
                    </tr>
                    <tr>
                      <td className="p-3"><span className="text-emerald-400 font-bold">GET</span></td>
                      <td className="p-3 text-white">/api/v1/showtimes/:id/seats</td>
                      <td className="p-3 text-neutral-300 font-sans">Fetch real-time seat occupancy status</td>
                      <td className="p-3 text-neutral-500 font-sans">Public</td>
                    </tr>
                    <tr>
                      <td className="p-3"><span className="text-sky-400 font-bold">POST</span></td>
                      <td className="p-3 text-white">/api/v1/bookings/reserve</td>
                      <td className="p-3 text-neutral-300 font-sans">Lock seats and generate booking transaction</td>
                      <td className="p-3 text-amber-400 font-sans">User JWT</td>
                    </tr>
                    <tr>
                      <td className="p-3"><span className="text-rose-400 font-bold">POST</span></td>
                      <td className="p-3 text-white">/api/v1/bookings/:id/cancel</td>
                      <td className="p-3 text-neutral-300 font-sans">Cancel booking and release auditorium seats</td>
                      <td className="p-3 text-amber-400 font-sans">User JWT</td>
                    </tr>
                    <tr>
                      <td className="p-3"><span className="text-sky-400 font-bold">POST</span></td>
                      <td className="p-3 text-white">/api/v1/admin/movies</td>
                      <td className="p-3 text-neutral-300 font-sans">Create new theatrical film release</td>
                      <td className="p-3 text-rose-400 font-sans">Admin Only</td>
                    </tr>
                    <tr>
                      <td className="p-3"><span className="text-sky-400 font-bold">POST</span></td>
                      <td className="p-3 text-white">/api/v1/admin/showtimes</td>
                      <td className="p-3 text-neutral-300 font-sans">Schedule auditorium screen & tier prices</td>
                      <td className="p-3 text-rose-400 font-sans">Admin Only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Setup & Execution Guide */}
          {activeSection === 'setup' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit'] mb-2">
                  6. Project Setup & Execution Steps
                </h3>
                <p>
                  Follow these step-by-step instructions to clone, configure, install dependencies, and run The IMovies application.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 font-bold text-xs flex items-center justify-center">1</span>
                    <h4 className="text-sm font-bold text-white">Install Node.js & Dependencies</h4>
                  </div>
                  <pre className="p-3 rounded-lg bg-neutral-950 font-mono text-xs text-amber-300">
npm install
                  </pre>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 font-bold text-xs flex items-center justify-center">2</span>
                    <h4 className="text-sm font-bold text-white">Start the Development Server</h4>
                  </div>
                  <pre className="p-3 rounded-lg bg-neutral-950 font-mono text-xs text-amber-300">
npm run dev
                  </pre>
                  <p className="text-xs text-neutral-400">
                    The Vite development server will spin up on <code className="text-amber-400">http://localhost:3000</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 font-bold text-xs flex items-center justify-center">3</span>
                    <h4 className="text-sm font-bold text-white">Build for Production Deployment</h4>
                  </div>
                  <pre className="p-3 rounded-lg bg-neutral-950 font-mono text-xs text-amber-300">
npm run build
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/60 flex items-center justify-between shrink-0">
          <span className="text-xs text-neutral-400 font-mono">
            The IMovies v1.0.0 · Comprehensive Engineering Reference
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
