'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, ShieldCheck, Mail, Code, Terminal, Link as LucideLink } from 'lucide-react';
import { Ticker } from '@/components/shared/Ticker';

export default function Home() {
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
    <>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black border-b border-black min-h-[90vh]">
        {/* HERO SECTION */}
        <div className="flex flex-col justify-between p-6 md:p-12 lg:p-20 relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <div className="w-32 h-32 border-8 border-black rounded-full animate-spin-slow"></div>
          </div>

          <div className="space-y-4 mt-8 lg:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#FF4400] font-mono text-[10px] uppercase font-bold tracking-[0.2em]">
              <div className="w-1.5 h-1.5 bg-[#FF4400] animate-pulse"></div>
              Engine Phase 3.1 // Live
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-[110px] font-black uppercase leading-[0.8] tracking-tighter">
              High<br />Velocity<br />Email API
            </h1>
          </div>

          <div className="mt-12 lg:mt-auto">
            <p className="font-mono text-sm max-w-sm leading-relaxed border-l-2 border-[#FF4400] pl-6 mb-10 text-gray-800">
              The industrial-grade email engine built by <a href="https://www.strucureo.works" className="font-bold underline">Strucureo</a>.
              No bloat. No bullshit. Just sub-200ms delivery for production-scale applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth" className="bg-black text-white px-10 py-5 font-bold uppercase text-xs tracking-widest hover:bg-[#FF4400] transition-all transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3">
                Launch Dashboard <ArrowRight size={16} />
              </Link>
              <Link href="/docs" className="border border-black px-10 py-5 font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3">
                Documentation <Code size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* LIVE PREVIEW SECTION */}
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
      </div>

      <Ticker text="INDUSTRIAL STRENGTH EMAIL INFRASTRUCTURE  ///  SUB-SECOND GLOBAL DELIVERY  ///  ZERO LATENCY ENGINE  ///  BUILT FOR DEVELOPERS BY STRUCUREO" />

      {/* FEATURES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black border-b border-black">
        {[
          { icon: Zap, title: "Torque", desc: "Our engine executes sends with sub-200ms latency across global SMTP relays." },
          { icon: ShieldCheck, title: "Encryption", desc: "Military-grade data protection during every hop of the delivery lifecycle." },
          { icon: LucideLink, title: "Simplicity", desc: "A single POST request is all it takes to trigger complex delivery flows." },
        ].map((item, i) => (
          <div key={i} className="p-10 md:p-16 hover:bg-[#FAFAFA] transition-all group cursor-default">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-10 group-hover:bg-[#FF4400] group-hover:rotate-[360deg] transition-all duration-700">
              <item.icon size={24} strokeWidth={2} />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
            <p className="font-mono text-sm leading-relaxed text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* PRICING MATRIX */}
      <div id="pricing" className="border-b border-black">
        <div className="grid grid-cols-12 divide-x divide-black border-b border-black bg-black text-white">
          <div className="col-span-12 p-5 text-center">
            <span className="font-mono text-xs uppercase font-bold tracking-[0.3em]">Operational Cost & Rate Limits</span>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-black border-b border-black bg-[#F4F4F4]">
          <div className="p-6 font-bold uppercase tracking-widest text-[10px] text-gray-400">Specifications</div>
          <div className="p-6 font-bold uppercase tracking-widest text-[10px] text-gray-400 text-center">Starter Plan</div>
          <div className="p-6 font-bold uppercase tracking-widest text-[10px] text-[#FF4400] text-center bg-black/5">Production Tier</div>
        </div>

        {[
          { metric: "Monthly Cost", start: "$0", prod: "$50" },
          { metric: "Volume Cap", start: "1,500 Emails", prod: "Unlimited" },
          { metric: "Throttle Control", start: "1 req / min", prod: "30 req / min" },
          { metric: "Email Attachments", start: "Included", prod: "Included" },
          { metric: "SLA Guarantee", start: "Standard", prod: "99.99% Priority" },
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-3 divide-x divide-black border-b border-black hover:bg-black hover:text-white transition-all duration-150 group">
            <div className="p-6 font-mono text-xs uppercase font-bold group-hover:border-white/10">{row.metric}</div>
            <div className="p-6 font-black font-mono text-sm text-center">{row.start}</div>
            <div className="p-6 font-black font-mono text-sm text-center bg-black/5 group-hover:bg-transparent">{row.prod}</div>
          </div>
        ))}
      </div>

      {/* FINAL CTA */}
      <div className="py-24 px-8 text-center bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4400] opacity-[0.03] rounded-full blur-[100px] pointer-events-none"></div>
        <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 tracking-tighter max-w-4xl mx-auto">
          Ready to Fuel Your Infrastructure?
        </h2>
        <p className="font-mono text-sm text-gray-500 mb-12 max-w-xl mx-auto uppercase tracking-wide">
          Join hundreds of high-growth teams relying on DriftSpike for mission-critical communication.
        </p>
        <Link
          href="/auth"
          className="inline-block bg-[#FF4400] text-white px-16 py-6 font-bold uppercase text-sm tracking-widest hover:bg-black transition-all border-2 border-black shadow-[12px_12px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[8px_8px_0px_0px_#000]"
        >
          Get Started Now
        </Link>
      </div>

      <footer className="p-8 border-t border-black bg-black text-white flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-black text-2xl tracking-tighter">DRIFT SPIKE</div>
        <div className="flex gap-12 font-mono text-[10px] uppercase font-bold text-gray-500">
          <Link href="/docs" className="hover:text-[#FF4400]">Docs</Link>
          <Link href="/pricing" className="hover:text-[#FF4400]">Pricing</Link>
          <a href="https://www.strucureo.works" className="hover:text-[#FF4400]">Strucureo</a>
        </div>
        <div className="font-mono text-[10px] text-gray-600">
          © 2024 DRIFT SPIKE INFRASTRUCTURE
        </div>
      </footer>
    </>
  );
}
