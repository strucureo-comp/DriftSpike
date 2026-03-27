'use client';

import Link from 'next/link';
import { ArrowRight, Code } from 'lucide-react';

export function HeroSection() {
  return (
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
  );
}
