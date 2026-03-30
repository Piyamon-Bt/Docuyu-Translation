import React from 'react';
import { Navbar } from './components/Navbar';
import { FileUploader } from './components/FileUploader';
import { AgentStatusTracker } from './components/AgentStatus';
import { ResultDisplay } from './components/ResultDisplay';
import { useTranslation } from './hooks/useTranslation';

const App: React.FC = () => {
  const { translateFile, loading, result, error } = useTranslation();

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900">
      <Navbar />

      <main className="max-w-5xl mx-auto pt-32 px-6 pb-24">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Chinese Document Translator <br />
            <span className="text-[#FF7853]">
              Powered by Agentic AI
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Translate, Summaarize and Pinyin Converting
          </p>
        </div>

        {/* ส่วนอัปโหลดไฟล์ */}
        <div className="mb-12">
          <FileUploader 
            onUpload={translateFile} 
            isLoading={loading} 
          />
        </div>

        {/* ส่วนแสดงสถานะ Agent (แสดงเฉพาะตอนกำลังประมวลผลหรือมีข้อมูลแล้ว) */}
        {(loading || result) && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-sm font-bold text-[#FF7853] uppercase tracking-widest">Pipeline Status</h3>
              <div className="h-px flex-1 bg-[#FF7853]"></div>
            </div>
            <AgentStatusTracker 
              results={result?.agent_results || []} 
              isLoading={loading} 
            />
          </div>
        )}

        {/* ส่วนแสดงผลลัพธ์ (แสดงไว้ตลอดเวลาแต่จางลงถ้าไม่มีข้อมูล) */}
        <div className={`transition-all duration-700 ${!result ? 'opacity-30 grayscale blur-[1px]' : 'opacity-100 grayscale-0 blur-0'}`}>
          <div className="flex items-center gap-2 mb-8">
            <h3 className="text-sm font-bold text-[#FF7853] uppercase tracking-widest">Translation Results</h3>
            <div className="h-px flex-1 bg-[#FF7853]"></div>
          </div>
          <ResultDisplay data={result} />
        </div>
      </main>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-xs">
        <p>© 2024 Agentic AI Translation Project. Built with React & TypeScript.</p>
      </footer>
    </div>
  );
};

export default App;