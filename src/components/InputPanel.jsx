import React, { useState } from 'react';
import { Sparkles, MessageSquareText, Mic, Image, Loader2, RefreshCw, MapPin, X, Check, AlertCircle } from 'lucide-react';
import VoiceInput from './VoiceInput';
import ImageUpload from './ImageUpload';
import DemoExamples from './DemoExamples';

export default function InputPanel({ onAnalyze, isLoading, largeText }) {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMimeType, setImageMimeType] = useState('image/jpeg');

  // Live Location states
  const [liveLocation, setLiveLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle'); // idle | detecting | success | error
  const [locationError, setLocationError] = useState('');

  const handleGetLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      setLocationStatus('error');
      return;
    }

    setLocationStatus('detecting');
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);
        let placeName = `GPS Coordinates (${lat}°, ${lon}°)`;

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          if (res.ok) {
            const geoData = await res.json();
            if (geoData && geoData.display_name) {
              placeName = `${geoData.display_name} (${lat}°, ${lon}°)`;
            }
          }
        } catch (e) {
          console.warn('[Geolocation] Reverse geocoding fallback used:', e);
        }

        setLiveLocation(placeName);
        setLocationStatus('success');
      },
      (err) => {
        console.error('[Geolocation] Geolocation error:', err);
        setLocationStatus('error');
        if (err.code === 1) {
          setLocationError('Location permission denied. Please enable location access in browser.');
        } else {
          setLocationError('Could not retrieve current location.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const removeLocation = () => {
    setLiveLocation(null);
    setLocationStatus('idle');
    setLocationError('');
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if ((!text || text.trim() === '') && !imageBase64 && !liveLocation) {
      alert('Please enter a description, speak your issue, detect live location, or upload a photo to analyze.');
      return;
    }
    onAnalyze({ text: text.trim(), imageBase64, mimeType: imageMimeType, liveLocation });
  };

  const handleSelectDemo = (demoPrompt) => {
    setText(demoPrompt);
    // Auto trigger analysis for snappy UX
    onAnalyze({ text: demoPrompt, imageBase64: null, mimeType: 'image/jpeg', liveLocation });
  };

  const clearInput = () => {
    setText('');
    setImagePreview(null);
    setImageBase64(null);
    setLiveLocation(null);
    setLocationStatus('idle');
    setLocationError('');
  };

  return (
    <div className="max-w-4xl mx-auto -mt-6 px-4 sm:px-6 z-10 relative">
      <div className="bg-slate-900 rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-800 text-white">
        
        {/* Header line */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MessageSquareText className="w-5 h-5 text-teal-400" />
            <h2 className={`font-bold text-white ${largeText ? 'text-xl' : 'text-base sm:text-lg'}`}>
              What happened? Describe in your own words...
            </h2>
          </div>
          {(text || imagePreview || liveLocation) && (
            <button
              onClick={clearInput}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Main Textarea */}
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tell us what happened... (e.g. 'There is a huge pothole near my college and vehicles are struggling to pass safely', 'My street is flooded after heavy rain', or 'I saw someone breaking into a car')"
              rows={4}
              disabled={isLoading}
              className={`w-full p-4 rounded-2xl bg-slate-800/90 text-white placeholder-slate-400 border-2 border-slate-700 focus:border-teal-500 focus:outline-none transition-all shadow-inner leading-relaxed ${
                largeText ? 'text-lg' : 'text-base'
              }`}
            />
          </div>

          {/* Live Location Active Badge */}
          {liveLocation && (
            <div className="flex items-center justify-between bg-teal-950/80 border border-teal-500/40 p-3 rounded-xl text-xs text-teal-300">
              <div className="flex items-center space-x-2 truncate">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 animate-bounce" />
                <span className="font-semibold text-white">Live Location Attached:</span>
                <span className="truncate text-teal-200">{liveLocation}</span>
              </div>
              <button
                type="button"
                onClick={removeLocation}
                className="text-slate-400 hover:text-white p-1 rounded-md"
                title="Remove Live Location"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Location Error alert */}
          {locationError && (
            <div className="flex items-center space-x-1.5 text-xs text-rose-400 bg-rose-950/50 p-2.5 rounded-xl border border-rose-800">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{locationError}</span>
            </div>
          )}

          {/* Input Method Buttons Bar: Voice, Photo, Live GPS Location */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60">
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Voice Speech Component */}
              <VoiceInput onTranscriptChange={setText} currentText={text} />

              <span className="text-slate-600 font-bold text-xs hidden sm:inline">|</span>

              {/* Photo Upload Component */}
              <ImageUpload
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                setImageBase64={setImageBase64}
                setImageMimeType={setImageMimeType}
              />

              <span className="text-slate-600 font-bold text-xs hidden sm:inline">|</span>

              {/* Live Geolocation Button */}
              <button
                type="button"
                onClick={handleGetLiveLocation}
                disabled={locationStatus === 'detecting'}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm cursor-pointer ${
                  locationStatus === 'success'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                }`}
              >
                {locationStatus === 'detecting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                    <span>Detecting GPS...</span>
                  </>
                ) : locationStatus === 'success' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>GPS Location Saved</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 text-rose-600" />
                    <span>Use Current Location</span>
                  </>
                )}
              </button>

            </div>

            {/* Main Action Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (!text.trim() && !imageBase64 && !liveLocation)}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-base flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg cursor-pointer ${
                isLoading || (!text.trim() && !imageBase64 && !liveLocation)
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-teal-500/25 active:scale-95'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                  <span>Analyzing with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Analyze with Gemini</span>
                </>
              )}
            </button>
          </div>

        </form>

        {/* Loading Progress Feedback */}
        {isLoading && (
          <div className="mt-4 p-4 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-200 flex items-center space-x-3 animate-pulse">
            <Loader2 className="w-5 h-5 animate-spin text-teal-400 flex-shrink-0" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-teal-300">Gemini AI is processing your input...</span>
              <p className="text-teal-400/80">Identifying category, assessing urgency, location mapping, and preparing report.</p>
            </div>
          </div>
        )}

        {/* Ready-to-test Demo Scenarios */}
        <DemoExamples onSelectDemo={handleSelectDemo} />

      </div>
    </div>
  );
}
