import React from 'react';
import { AlertTriangle, AlertCircle, Info, ShieldAlert } from 'lucide-react';

export default function UrgencyBadge({ urgency }) {
  const level = (urgency || 'low').toLowerCase();

  switch (level) {
    case 'emergency':
      return (
        <span className="inline-flex items-center space-x-1.5 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md shadow-red-500/30 animate-pulse border border-red-400">
          <ShieldAlert className="w-4 h-4 text-white" />
          <span className="uppercase tracking-wider">EMERGENCY — IMMEDIATE THREAT</span>
        </span>
      );
    case 'high':
      return (
        <span className="inline-flex items-center space-x-1.5 bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-full border border-amber-400">
          <AlertTriangle className="w-3.5 h-3.5 text-slate-950" />
          <span className="uppercase tracking-wider">HIGH URGENCY</span>
        </span>
      );
    case 'medium':
      return (
        <span className="inline-flex items-center space-x-1.5 bg-yellow-400 text-yellow-950 font-bold text-xs px-3 py-1 rounded-full border border-yellow-300">
          <AlertCircle className="w-3.5 h-3.5 text-yellow-950" />
          <span className="uppercase tracking-wider">MEDIUM URGENCY</span>
        </span>
      );
    case 'low':
    default:
      return (
        <span className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-900 font-semibold text-xs px-3 py-1 rounded-full border border-blue-200">
          <Info className="w-3.5 h-3.5 text-blue-700" />
          <span className="uppercase tracking-wider">LOW URGENCY</span>
        </span>
      );
  }
}
