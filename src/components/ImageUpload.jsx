import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, X, ShieldAlert, Check } from 'lucide-react';

export default function ImageUpload({ imagePreview, setImagePreview, setImageBase64, setImageMimeType }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be less than 10MB.');
      return;
    }

    setImageMimeType(file.type);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImagePreview(base64String);
      setImageBase64(base64String);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    setImageMimeType('image/jpeg');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="sociofy-image-input"
      />

      {!imagePreview ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-all duration-200 shadow-sm cursor-pointer"
        >
          <Camera className="w-4 h-4 text-slate-600" />
          <span>Upload / Capture Photo</span>
        </button>
      ) : (
        <div className="relative group rounded-xl overflow-hidden border-2 border-teal-500 shadow-md max-w-xs w-full bg-slate-900 p-2">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
            <img
              src={imagePreview}
              alt="Uploaded civic evidence preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-transform active:scale-95"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-teal-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-teal-400" />
              Photo attached for Gemini Vision
            </span>
            <button
              type="button"
              onClick={removeImage}
              className="text-xs text-slate-400 underline hover:text-slate-200"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {/* Privacy note */}
      <div className="mt-2 text-center">
        <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
          <ShieldAlert className="w-3 h-3 text-slate-400" />
          Privacy: Photos are processed strictly for analysis and never stored permanently.
        </p>
      </div>
    </div>
  );
}
