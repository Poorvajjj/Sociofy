import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, Sparkles, Eye, Volume2 } from 'lucide-react';

export default function Header({ highContrast, setHighContrast, largeText, setLargeText }) {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">SOCIOFY</span>
                <span className="bg-teal-500/20 text-teal-300 text-xs font-semibold px-2 py-0.5 rounded-full border border-teal-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-300" />
                  Gemini AI
                </span>
              </div>
              <p className="text-xs text-slate-300 hidden sm:block">From Human Intent to the Right Action.</p>
            </div>
          </div>

          {/* Right Action Controls: Emergency Callout & Accessibility */}
          <div className="flex items-center space-x-2 sm:space-x-3">

            {/* Accessibility Toggles */}
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
              <button
                onClick={() => setHighContrast(!highContrast)}
                title="Toggle High Contrast Mode"
                aria-label="Toggle High Contrast Mode"
                className={`p-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                  highContrast ? 'bg-teal-500 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Contrast</span>
              </button>

              <button
                onClick={() => setLargeText(!largeText)}
                title="Toggle Larger Text Size"
                aria-label="Toggle Larger Text Size"
                className={`p-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1 ${
                  largeText ? 'bg-teal-500 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span className="text-sm font-bold">A+</span>
                <span className="hidden md:inline">Text Size</span>
              </button>
            </div>

            {/* Emergency Hotline Direct Button */}
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-md shadow-red-900/30 transition-transform active:scale-95"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>EMERGENCY 112</span>
            </button>

          </div>
        </div>
      </div>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center space-x-3 text-red-600 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-6 h-6 text-red-600 animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Immediate Emergency Services</h3>
                <p className="text-xs text-red-600 font-semibold">Do not wait for AI if life or safety is in danger.</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4">
              If you are facing an active crime, severe medical emergency, fire hazard, or immediate danger to life, contact official emergency responders directly:
            </p>

            <div className="grid grid-cols-2 gap-2 mb-6">
              <a href="tel:112" className="bg-red-50 hover:bg-red-100 border border-red-200 p-3 rounded-xl text-center block">
                <div className="text-xl font-black text-red-700">112</div>
                <div className="text-xs font-semibold text-red-600">National Emergency</div>
              </a>
              <a href="tel:100" className="bg-blue-50 hover:bg-blue-100 border border-blue-200 p-3 rounded-xl text-center block">
                <div className="text-xl font-black text-blue-700">100</div>
                <div className="text-xs font-semibold text-blue-600">Police Helpline</div>
              </a>
              <a href="tel:108" className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 p-3 rounded-xl text-center block">
                <div className="text-xl font-black text-emerald-700">108</div>
                <div className="text-xs font-semibold text-emerald-600">Medical Ambulance</div>
              </a>
              <a href="tel:101" className="bg-amber-50 hover:bg-amber-100 border border-amber-200 p-3 rounded-xl text-center block">
                <div className="text-xl font-black text-amber-700">101</div>
                <div className="text-xs font-semibold text-amber-600">Fire & Rescue</div>
              </a>
            </div>

            <button
              onClick={() => setShowEmergencyModal(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-sm"
            >
              Return to Sociofy
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
