import React from 'react';
import { X } from 'lucide-react';

interface TrailerModalProps {
  youtubeId: string;
  movieTitle: string;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  youtubeId,
  movieTitle,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden">
      <div 
        className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl text-neutral-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <span className="text-sm font-bold text-white font-['Outfit']">
            Official Trailer · {movieTitle}
          </span>
          <button
            onClick={onClose}
            aria-label="Close trailer"
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={`${movieTitle} Official Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
