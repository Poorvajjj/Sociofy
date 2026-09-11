import React from 'react';
import { ShieldCheck, Heart, AlertCircle, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">SOCIOFY</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "From Human Intent to the Right Action."
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              An AI-powered universal bridge empowering citizens to turn everyday messy problems into structured reports and connect directly to official government portals.
            </p>
          </div>

          {/* Emergency Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              National Emergency Helplines
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>National Emergency Number:</span>
                <strong className="text-red-400 font-bold">112</strong>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Police Control Room:</span>
                <strong className="text-blue-400 font-bold">100</strong>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Medical Ambulance:</span>
                <strong className="text-emerald-400 font-bold">108</strong>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Women Helpline:</span>
                <strong className="text-pink-400 font-bold">1091</strong>
              </li>
            </ul>
          </div>

          {/* Privacy & Medical Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              Privacy & Legal Notice
            </h4>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-[11px] leading-relaxed text-slate-300 space-y-2">
              <p>
                <strong>Privacy Notice:</strong> Your input is used strictly to understand your request and suggest the appropriate next step. We do not permanently store uploaded photos or sensitive personal identity data.
              </p>
              <p className="text-amber-300/90">
                <strong>Healthcare Disclaimer:</strong> Sociofy does not replace a doctor or emergency medical service. For acute symptoms, consult a licensed physician or visit an emergency room immediately.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Sociofy. Built for Societal Impact.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Powered by Gemini AI Engine</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
