import React from 'react';
import { Car, CloudRain, ShieldAlert, Building2, HeartPulse, ChevronRight } from 'lucide-react';

const DEPARTMENTS = [
  {
    id: 'traffic',
    title: 'Traffic & Road Safety',
    icon: Car,
    bgColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    iconBg: 'bg-blue-600',
    examples: ['Road accidents', 'Severe potholes', 'Traffic signals down', 'Illegal parking', 'Road obstructions']
  },
  {
    id: 'weather',
    title: 'Weather & Disaster',
    icon: CloudRain,
    bgColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    iconBg: 'bg-cyan-600',
    examples: ['Urban flooding', 'Storm damage', 'Waterlogging', 'Landslides', 'Drain overflow']
  },
  {
    id: 'crime',
    title: 'Crime & Public Safety',
    icon: ShieldAlert,
    bgColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    iconBg: 'bg-rose-600',
    examples: ['Theft & break-ins', 'Suspicious activity', 'Property vandalism', 'Public safety threats']
  },
  {
    id: 'government',
    title: 'Government Services',
    icon: Building2,
    bgColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    iconBg: 'bg-emerald-600',
    examples: ['Birth/caste certificates', 'Civic grievances', 'Welfare schemes', 'Municipal services']
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Medical',
    icon: HeartPulse,
    bgColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    iconBg: 'bg-violet-600',
    examples: ['Symptom guidance', 'Tele-health inquiry', 'Hospital navigation', 'Medical benefit programs']
  }
];

export default function DepartmentCards() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
          One Place. Multiple Public Services.
        </h2>
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Supported Public Service Departments
        </p>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          No matter how you describe your problem, Sociofy automatically routes your intent to the authorized department.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {DEPARTMENTS.map((dept) => {
          const Icon = dept.icon;
          return (
            <div
              key={dept.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-400 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl ${dept.iconBg} text-white flex items-center justify-center mb-4 shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {dept.title}
                </h3>
                <ul className="space-y-1.5 mb-4">
                  {dept.examples.map((ex, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
                <span>Auto-Classified</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
