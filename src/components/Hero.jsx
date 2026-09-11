import React from 'react';
import { Mic, Image, MessageSquareText, ShieldAlert } from 'lucide-react';

export default function Hero({ largeText }) {
  return (
    <section className="bg-gradient-to-b from-slate-900 via-navy-900 to-slate-900 text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700 text-teal-300 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
          <ShieldAlert className="w-4 h-4 text-teal-400" />
          <span>Universal Citizen Intent & Public Service Bridge</span>
        </div>

        {/* Main Headline */}
        <h1 className={`font-extrabold tracking-tight text-white ${largeText ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-4xl lg:text-5xl'}`}>
          Tell us what happened.<br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
            We'll help you find the right next step.
          </span>
        </h1>

        {/* Subheading */}
        <p className={`text-slate-300 max-w-2xl mx-auto font-normal ${largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
          Describe your problem naturally by <strong className="text-white">typing</strong>, <strong className="text-white">speaking</strong>, or <strong className="text-white">uploading a photo</strong>. Gemini AI extracts the key facts, creates a professional report, and connects you directly to official government portals.
        </p>

        {/* Simple 3-step feature pill indicator */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
            <MessageSquareText className="w-4 h-4 text-teal-400" />
            <span>1. Describe naturally</span>
          </div>
          <span className="text-slate-600 font-bold hidden sm:inline">→</span>
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
            <Mic className="w-4 h-4 text-emerald-400" />
            <span>2. Gemini analyzes intent</span>
          </div>
          <span className="text-slate-600 font-bold hidden sm:inline">→</span>
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
            <Image className="w-4 h-4 text-cyan-400" />
            <span>3. Direct official action</span>
          </div>
        </div>

      </div>
    </section>
  );
}
