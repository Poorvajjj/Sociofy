import React from 'react';
import { ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { departmentLinks } from '../config/departmentLinks';

export default function OfficialPortalButton({ category = 'government' }) {
  const portal = departmentLinks[category] || departmentLinks.government;

  return (
    <div className="bg-gradient-to-r from-teal-900 via-navy-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-teal-500/30">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Info text */}
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Verified Public Destination
            </span>
          </div>
          <h4 className="text-lg font-bold text-white">
            {portal.name}
          </h4>
          <p className="text-xs text-slate-300">
            {portal.description}
          </p>
          <div className="inline-block text-[11px] font-mono text-teal-300 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
            Destination Domain: {portal.domain}
          </div>
        </div>

        {/* Action CTA Button */}
        <a
          href={portal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-base px-6 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 flex items-center justify-center space-x-2 transition-all duration-200 group flex-shrink-0"
        >
          <span>Open Official Portal</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>

      </div>
    </div>
  );
}
