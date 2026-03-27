'use client';

import { Zap, ShieldCheck, Link as LucideLink } from 'lucide-react';

const features = [
  { icon: Zap, title: "Torque", desc: "Our engine executes sends with sub-200ms latency across global SMTP relays." },
  { icon: ShieldCheck, title: "Encryption", desc: "Military-grade data protection during every hop of the delivery lifecycle." },
  { icon: LucideLink, title: "Simplicity", desc: "A single POST request is all it takes to trigger complex delivery flows." },
];

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black border-b border-black">
      {features.map((item, i) => (
        <div key={i} className="p-10 md:p-16 hover:bg-[#FAFAFA] transition-all group cursor-default">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-10 group-hover:bg-[#FF4400] group-hover:rotate-[360deg] transition-all duration-700">
            <item.icon size={24} strokeWidth={2} />
          </div>
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
          <p className="font-mono text-sm leading-relaxed text-gray-500">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
