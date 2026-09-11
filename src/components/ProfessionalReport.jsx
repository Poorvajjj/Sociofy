import React, { useState } from 'react';
import { FileText, Copy, Check, Edit3, Save } from 'lucide-react';

export default function ProfessionalReport({ reportText, onSaveReport }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(reportText || '');
  const [copied, setCopied] = useState(false);

  // Sync if parent updates text
  React.useEffect(() => {
    setCurrentText(reportText || '');
  }, [reportText]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSaveReport) {
      onSaveReport(currentText);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-teal-50 rounded-lg text-teal-700">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Professional Structured Report</h3>
            <p className="text-xs text-slate-500">Formally rewritten by Gemini for official submission</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-600" />
              <span>Edit Report</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              copied
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editable or Display Text Box */}
      {isEditing ? (
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Edit report details before sending or copying:
          </label>
          <textarea
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            rows={5}
            className="w-full p-3.5 text-sm font-sans bg-slate-50 border-2 border-teal-500 rounded-xl focus:outline-none text-slate-900 leading-relaxed"
          />
        </div>
      ) : (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif italic">
            "{currentText}"
          </p>
        </div>
      )}

      <p className="text-[11px] text-slate-400">
        Tip: Click <strong>"Copy Report"</strong> to paste this formatted text directly into the official portal application form.
      </p>

    </div>
  );
}
