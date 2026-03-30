import React from 'react';
import { type AgentResult, AgentStatus } from '../types';

interface Props {
  results: AgentResult[];
  isLoading: boolean;
}

export const AgentStatusTracker: React.FC<Props> = ({ results, isLoading }) => {
  const agents = [
    { id: 'file_type_agent', label: 'File Validation' },
    { id: 'extract_agent', label: 'Document Extraction' },
    { id: 'classify_agent', label: 'Classify Document' },
    { id: 'translate_agent', label: 'Translation' },
    { id: 'summarize_agent', label: 'Summarization' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-8">
      {agents.map((agent) => {
        const status = results.find(r => r.agent_name === agent.id)?.status || AgentStatus.PENDING;
        const isCurrent = isLoading && status === AgentStatus.PENDING;

        return (
          <div key={agent.id} className={`p-4 rounded-xl border transition-all ${
            status === AgentStatus.DONE ? 'bg-orange-50 border-orange-200' : 
            status === AgentStatus.ERROR ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                status === AgentStatus.DONE ? 'bg-orange-500' : 
                status === AgentStatus.ERROR ? 'bg-red-500' : 
                isCurrent ? 'bg-black animate-gemini' : 'bg-slate-300'
              }`} />
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">{agent.label}</span>
            </div>
            <p className="text-[10px] mt-1 text-slate-400 font-mono italic">
              {status === AgentStatus.DONE ? 'Completed' : isCurrent ? 'Processing...' : 'Waiting'}
            </p>
          </div>
        );
      })}
    </div>
  );
};