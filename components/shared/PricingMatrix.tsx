'use client';

const pricingRows = [
  { metric: "Monthly Cost", start: "$0", prod: "$50" },
  { metric: "Volume Cap", start: "1,500 Emails", prod: "Unlimited" },
  { metric: "Throttle Control", start: "1 req / min", prod: "30 req / min" },
  { metric: "Email Attachments", start: "Included", prod: "Included" },
  { metric: "SLA Guarantee", start: "Standard", prod: "99.99% Priority" },
];

export function PricingMatrix() {
  return (
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

      {pricingRows.map((row, i) => (
        <div key={i} className="grid grid-cols-3 divide-x divide-black border-b border-black hover:bg-black hover:text-white transition-all duration-150 group">
          <div className="p-6 font-mono text-xs uppercase font-bold group-hover:border-white/10">{row.metric}</div>
          <div className="p-6 font-black font-mono text-sm text-center">{row.start}</div>
          <div className="p-6 font-black font-mono text-sm text-center bg-black/5 group-hover:bg-transparent">{row.prod}</div>
        </div>
      ))}
    </div>
  );
}
