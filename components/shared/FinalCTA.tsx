'use client';

import Link from 'next/link';

export function FinalCTA() {
  return (
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
  );
}
