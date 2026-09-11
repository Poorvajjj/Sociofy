import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Users, 
  Car, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  HelpCircle,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import UrgencyBadge from './UrgencyBadge';
import ProfessionalReport from './ProfessionalReport';
import OfficialPortalButton from './OfficialPortalButton';
import { departmentLinks } from '../config/departmentLinks';

export default function AnalysisResult({ result, onStartNew, largeText }) {
  if (!result) return null;

  const {
    department = 'government',
    issue_type = 'Public Inquiry',
    confidence = 90,
    urgency = 'low',
    summary = '',
    professional_description = '',
    extracted_information = {},
    missing_information = [],
    recommended_action = '',
    safety_advice = '',
    official_portal_category = 'government',
    reasoning_summary = ''
  } = result;

  const [editedReport, setEditedReport] = useState(professional_description);
  const isEmergency = urgency?.toLowerCase() === 'emergency';
  const deptConfig = departmentLinks[department] || departmentLinks.government;

  return (
    <section id="analysis-result" className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-6">
      
      {/* Top Banner Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onStartNew}
          className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Start New Analysis</span>
        </button>

        <div className="flex items-center space-x-2 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span className="text-xs font-bold text-teal-800">AI Confidence: {confidence}%</span>
        </div>
      </div>

      {/* Emergency Alert Header (If Emergency) */}
      {isEmergency && (
        <div className="bg-red-600 text-white rounded-2xl p-5 shadow-xl border-2 border-red-400 animate-pulse space-y-3">
          <div className="flex items-center space-x-3">
            <PhoneCall className="w-8 h-8 text-white flex-shrink-0 animate-bounce" />
            <div>
              <h3 className="text-lg font-black uppercase tracking-wider">EMERGENCY SITUATION DETECTED</h3>
              <p className="text-xs text-red-100 font-semibold">Immediate human or emergency assistance is recommended.</p>
            </div>
          </div>
          <p className="text-sm font-medium text-red-50">
            Sociofy AI has flagged this incident as an active life or safety emergency. Please call official emergency responders immediately:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <a href="tel:112" className="bg-white text-red-700 font-black text-sm px-4 py-2 rounded-xl shadow hover:bg-red-50">
              Dial 112 (National Emergency)
            </a>
            <a href="tel:100" className="bg-white text-blue-700 font-black text-sm px-4 py-2 rounded-xl shadow hover:bg-blue-50">
              Dial 100 (Police)
            </a>
            <a href="tel:108" className="bg-white text-emerald-700 font-black text-sm px-4 py-2 rounded-xl shadow hover:bg-emerald-50">
              Dial 108 (Ambulance)
            </a>
          </div>
        </div>
      )}

      {/* Main Result Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
        
        {/* Department & Issue Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border ${deptConfig.badgeColor}`}>
                RECOMMENDED DEPARTMENT
              </span>
              <UrgencyBadge urgency={urgency} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 capitalize">
              {department} Department
            </h2>
            <p className="text-sm font-semibold text-teal-700 mt-1">
              Issue Category: <span className="text-slate-800">{issue_type}</span>
            </p>
          </div>
        </div>

        {/* AI Plain Language Summary */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-teal-600" />
            AI Assessment Summary
          </h3>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
            {summary}
          </p>
        </div>

        {/* AI Transparency Reasoning */}
        {reasoning_summary && (
          <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-200/80">
            <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-teal-700" />
              AI Transparency Note
            </h4>
            <p className="text-xs sm:text-sm text-teal-900 font-medium leading-relaxed">
              {reasoning_summary}
            </p>
          </div>
        )}

        {/* Professional Report Box with Edit & Copy */}
        <ProfessionalReport
          reportText={editedReport || professional_description}
          onSaveReport={(newText) => setEditedReport(newText)}
        />

        {/* Extracted Facts Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Information Extracted from Your Input
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Location</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {extracted_information.location || 'Not provided in description'}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-start space-x-3">
              <Clock className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Time / Date</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {extracted_information.date_time || 'Recent observation'}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-start space-x-3">
              <Users className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">People Involved</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {extracted_information.people_involved || 'N/A'}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-start space-x-3">
              <Car className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Vehicles / Infrastructure</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {extracted_information.vehicle_information || 'N/A'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Missing Info Callout */}
        {missing_information && missing_information.length > 0 && (
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Recommended Additional Details</span>
            </div>
            <p className="text-xs text-amber-800">
              Including these details when submitting your report on the official website will help authorities act faster:
            </p>
            <ul className="list-disc list-inside text-xs text-amber-900 font-medium space-y-0.5">
              {missing_information.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommended Action & Precautionary Safety Advice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-emerald-950 space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Suggested Next Step
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed">
              {recommended_action}
            </p>
          </div>

          {safety_advice && (
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-blue-950 space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Safety & Precautionary Advice
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed">
                {safety_advice}
              </p>
            </div>
          )}
        </div>

        {/* Official Portal Button */}
        <OfficialPortalButton category={official_portal_category || department} />

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 gap-3">
          <button
            onClick={onStartNew}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
          >
            Start Another Report
          </button>
          
          <p className="text-[11px] text-slate-400 text-center sm:text-right">
            Sociofy is an intent routing assistant. It does not replace emergency 112 services.
          </p>
        </div>

      </div>
    </section>
  );
}
