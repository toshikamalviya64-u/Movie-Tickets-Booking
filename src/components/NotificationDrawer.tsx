import React from 'react';
import { X, Bell, CheckCheck, Ticket, Sparkles, Clock } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationDrawerProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  notifications,
  onClose,
  onMarkAllRead,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-sm h-full bg-neutral-950 border-l border-neutral-800 shadow-2xl flex flex-col text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white font-['Outfit']">Notifications & Alerts</h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close notification drawer"
            className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mark read action */}
        <div className="px-4 py-2 border-b border-neutral-800/80 bg-neutral-900/30 flex items-center justify-between text-xs">
          <span className="text-neutral-400 font-mono">
            {notifications.filter(n => !n.read).length} unread
          </span>
          <button
            onClick={onMarkAllRead}
            className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500 italic">
              No notifications at this time.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-xl border text-xs transition-all space-y-1.5 ${
                  notif.read
                    ? 'bg-neutral-900/40 border-neutral-800/60 text-neutral-400'
                    : 'bg-neutral-900/90 border-amber-500/30 text-neutral-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    {notif.type === 'booking' && <Ticket className="w-3.5 h-3.5 text-amber-400" />}
                    {notif.type === 'reminder' && <Clock className="w-3.5 h-3.5 text-sky-400" />}
                    <span>{notif.title}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">{notif.timestamp}</span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  {notif.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
