'use client';

import { useState } from 'react';
import { Terminal, ShieldCheck, Zap } from 'lucide-react';

export function LivePreview() {
  const [status, setStatus] = useState('IDLE');
  const [response, setResponse] = useState<{ id: string; time: string } | null>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('PROCESSING');
    setResponse(null);
    setTimeout(() => {
      setStatus('SENT');
      setResponse({ id: 'msg_982kL90pXq', time: '142ms' });
    }, 1000);
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api-drift-spike.vercel.app/api';

  const curlSnippet = `curl -X POST ${apiUrl}/send-email \\
  -H "x-api-key: YOUR_USER_ID" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "user@client.io",
    "subject": "System Alert",
    "html": "<h1>Ready for Takeoff</h1>"
  }'`;

  return (
    <div className="bg-[#F8F8F8] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20 z-10">
        <div className="w-full max-w-lg bg-white border-2 border-black shadow-[16px_16px_0px_0px_#000]">
          <div className="border-b-2 border-black p-4 flex justify-between items-center bg-black text-white">
            <div className="flex items-center gap-3">
              <Terminal size={16} className="text-[#FF4400]" />
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest">PostgREST API Interactive</span>
            </div>
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full border border-white/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF4400]"></div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="space-y-3">
              <label className="block font-mono text-[10px] uppercase font-bold text-gray-400 tracking-widest">Recipient Endpoint</label>
              <input
                type="text"
                defaultValue="aathish@strucureo.works"
                className="w-full border-b border-black bg-transparent pb-3 font-mono text-sm font-bold focus:outline-none focus:border-[#FF4400] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block font-mono text-[10px] uppercase font-bold text-gray-400">Rate Class</label>
                <div className="px-3 py-2 border border-black text-[10px] font-mono font-bold uppercase bg-[#F4F4F4]">
                  30 req/min
                </div>
              </div>
              <div className="space-y-3">
                <label className="block font-mono text-[10px] uppercase font-bold text-gray-400">Security</label>
                <div className="flex items-center gap-2 px-3 py-2 border border-black text-[10px] font-mono font-bold uppercase bg-[#F4F4F4]">
                  <ShieldCheck size={12} className="text-green-600" /> AES-256
                </div>
              </div>
            </div>

            <button
              onClick={handleSend}
              disabled={status === 'PROCESSING'}
              className="w-full bg-[#FF4400] border-2 border-black py-5 font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all flex justify-center items-center gap-3 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 group"
            >
              {status === 'PROCESSING' ? 'Ignition Sequence...' : 'Dispatch Payload'}
              {status !== 'PROCESSING' && <Zap size={16} className="group-hover:scale-125 transition-transform" />}
            </button>

            {response && (
              <div className="border-2 border-black p-4 bg-[#F0FFF4] font-mono text-[11px] animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex justify-between border-b border-black/10 pb-3 mb-3">
                  <span className="font-bold text-green-700">HTTP/1.1 202 Accepted</span>
                  <span className="text-gray-400">{response.time}</span>
                </div>
                <div className="space-y-1 text-gray-600">
                  <div>ID: {response.id}</div>
                  <div>STATUS: DELIVERED // SMTP_SUCCESS</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CURL TERMINAL */}
      <div className="border-t-2 border-black bg-black text-white">
        <div className="p-3 bg-white/5 border-b border-white/10 flex justify-between items-center">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF4400]">Production Integration Sample</span>
          <span className="text-[9px] font-mono opacity-50 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> cURL / v7.8
          </span>
        </div>
        <div className="p-8 font-mono text-xs overflow-x-auto selection:bg-[#FF4400]/40">
          <pre className="text-[#F4F4F4] leading-relaxed">
            {curlSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}
