import React from 'react';
import { type TranslationResponse } from '../types';

interface Props {
  data: TranslationResponse | null; // ยอมรับค่า null เพื่อแสดงกรอบเปล่า
}

export const ResultDisplay: React.FC<Props> = ({ data }) => {
  // สไตล์พื้นฐานสำหรับ Skeleton
  const skeletonBase = "animate-pulse bg-slate-200 rounded-lg";

  return (
    <div className="space-y-16">
      
      {/* ส่วนที่ 1: ประเภทเอกสาร */}
      <section id="classification" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-[#FF7853] rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800">Document Type Classification</h3>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <p className="text-xs font-bold text-[#FF7853] uppercase tracking-widest mb-1">Detected Category</p>
            {data ? (
              <h4 className="text-4xl font-black text-slate-900 capitalize">{data.document_type}</h4>
            ) : (
              <div className={`h-10 w-48 ${skeletonBase}`}></div>
            )}
          </div>
          <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 text-center min-w-[140px]">
            <p className="text-xs text-slate-400 font-medium mb-1 uppercase">Confidence</p>
            {data ? (
              <p className="text-2xl font-mono font-bold text-slate-700">{(data.document_type_confidence * 100).toFixed(1)}%</p>
            ) : (
              <div className={`h-8 w-16 mx-auto ${skeletonBase}`}></div>
            )}
          </div>
        </div>
      </section>

      {/* ส่วนที่ 2: เนื้อหาและการแปล */}
      <section id="translation" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-[#FF7853] rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800">Extracted Text and Translation</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ฝั่งภาษาจีน */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm min-h-[200px]">
            <p className="text-[10px] font-bold text-[#FF7853] uppercase mb-4 tracking-wider">Original (Chinese)</p>
            {data ? (
              <p className="text-lg leading-loose text-slate-800 font-serif">{data.extracted_text}</p>
            ) : (
              <div className="space-y-3">
                <div className={`h-4 w-full ${skeletonBase}`}></div>
                <div className={`h-4 w-5/6 ${skeletonBase}`}></div>
                <div className={`h-4 w-4/6 ${skeletonBase}`}></div>
              </div>
            )}
          </div>
          {/* ฝั่งภาษาไทย */}
          <div className="bg-indigo-50/30 p-6 rounded-3xl border border-indigo-100 shadow-sm min-h-[200px]">
            <p className="text-[10px] font-bold text-[#FF7853] uppercase mb-4 tracking-wider">Translation (Thai)</p>
            {data ? (
              <p className="text-lg leading-loose text-slate-900">{data.translated_text}</p>
            ) : (
              <div className="space-y-3">
                <div className={`h-4 w-full ${skeletonBase} bg-indigo-100`}></div>
                <div className={`h-4 w-5/6 ${skeletonBase} bg-indigo-100`}></div>
                <div className={`h-4 w-4/6 ${skeletonBase} bg-indigo-100`}></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ส่วนที่ 3: พินอิน */}
      <section id="pinyin" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-[#FF7853] rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800">Pinyin Converting Result</h3>
        </div>
        <div className="bg-black p-8 rounded-3xl text-slate-300 font-mono text-sm leading-relaxed min-h-[100px] border border-slate-800 shadow-inner">
          {data ? (
            data.pinyin
          ) : (
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-800 rounded animate-pulse"></div>
              <div className="h-3 w-3/4 bg-slate-800 rounded animate-pulse"></div>
            </div>
          )}
        </div>
      </section>

      {/* ส่วนที่ 4: บทสรุป */}
      <section id="summary" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-[#FF7853] rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800">Summary</h3>
        </div>
        <div className="bg-black from-[#FF7853] to-blue-700 p-10 rounded-3xl text-white shadow-xl min-h-[140px]">
          {data ? (
            <p className="text-lg leading-loose text-slate-300">"{data.summary}"</p>
          ) : (
            <div className="space-y-3 opacity-20">
              <div className="h-6 w-full bg-white rounded animate-pulse"></div>
              <div className="h-6 w-4/5 bg-white rounded animate-pulse"></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};