import React from 'react';
import { Car, CloudRain, ShieldAlert, FileText, HeartPulse, Sparkles } from 'lucide-react';

export const DEMO_SCENARIOS = [
  {
    id: 'pothole',
    title: 'Report a Pothole',
    category: 'Traffic',
    icon: Car,
    color: 'hover:border-blue-400 hover:bg-blue-50/50 text-blue-700',
    badge: 'bg-blue-100 text-blue-800',
    prompt: 'There is a huge pothole near my college road and two-wheeler vehicles are struggling to pass safely. Yesterday a bike lost control because of it.'
  },
  {
    id: 'flooding',
    title: 'Report Flooding',
    category: 'Weather / Disaster',
    icon: CloudRain,
    color: 'hover:border-cyan-400 hover:bg-cyan-50/50 text-cyan-700',
    badge: 'bg-cyan-100 text-cyan-800',
    prompt: 'My residential street is severely flooded after heavy rain today and people are unable to cross the road or leave their homes due to clogged drains.'
  },
  {
    id: 'suspicious',
    title: 'Report Suspicious Activity',
    category: 'Crime & Safety',
    icon: ShieldAlert,
    color: 'hover:border-rose-400 hover:bg-rose-50/50 text-rose-700',
    badge: 'bg-rose-100 text-rose-800',
    prompt: 'I saw an unknown individual trying to break into a parked vehicle on 4th Main Street around 15 minutes ago.'
  },
  {
    id: 'government',
    title: 'Ask About Service',
    category: 'Government',
    icon: FileText,
    color: 'hover:border-emerald-400 hover:bg-emerald-50/50 text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-800',
    prompt: 'I want to apply for a birth certificate and pension scheme for my elderly relative, but I do not know which official government portal to use or what documents are needed.'
  },
  {
    id: 'health',
    title: 'Describe Health Concern',
    category: 'Healthcare',
    icon: HeartPulse,
    color: 'hover:border-violet-400 hover:bg-violet-50/50 text-violet-700',
    badge: 'bg-violet-100 text-violet-800',
    prompt: 'I have been feeling sick for 2 days with a high fever, throat pain, and fatigue. I need to know where to find certified tele-health consultation.'
  }
];

export default function DemoExamples({ onSelectDemo }) {
  return (
    <div className="mt-6 bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-slate-800 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Quick Demo Examples (Click to Test Instantly)
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">Try these real-world citizen scenarios</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {DEMO_SCENARIOS.map((demo) => {
          const Icon = demo.icon;
          return (
            <button
              key={demo.id}
              onClick={() => onSelectDemo(demo.prompt)}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-teal-500/50 p-3 rounded-xl text-left transition-all duration-200 group flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${demo.badge}`}>
                  {demo.category}
                </span>
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-teal-400 transition-colors" />
              </div>
              <p className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                {demo.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
