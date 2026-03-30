import React, { useState } from 'react';

interface Props {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export const FileUploader: React.FC<Props> = ({ onUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // กำหนดไฟล์ที่รองรับตาม Backend (PDF และรูปภาพต่างๆ)
  const ALLOWED_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/tiff',
    'image/bmp',
    'image/webp'
  ];
  const MAX_SIZE_MB = 20; //

  const validateAndUpload = (file: File) => {
    setError(null);

    // 1. ตรวจสอบประเภทไฟล์
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("File type not support, Please use PDF or image (JPG, PNG, WebP)");
      return;
    }

    // 2. ตรวจสอบขนาดไฟล์
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Large file type (Limited to no more than ${MAX_SIZE_MB}MB)`);
      return;
    }

    onUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative group flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl transition-all duration-300 ${dragActive ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 bg-white hover:border-[#FF7853]'
          } ${isLoading ? 'opacity-70 pointer-events-none' : 'cursor-pointer'}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleChange}
          accept=".pdf,image/*"
        />

        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 ${isLoading ? 'bg-[#FF7853] text-white animate-gemini' : 'bg-orange-50 text-[#FF7853] group-hover:scale-110'
            }`}>
            {isLoading ? (
              <svg className="w-10 h-10 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {isLoading ? 'Your document is being processed...' : 'Drag or upload File here'}
          </h3>
          <p className="text-slate-500 text-sm">
            Support PDF, JPG, PNG, WebP (max {MAX_SIZE_MB}MB)
          </p>
        </label>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};