export const Ticker = ({ text }: { text: string }) => (
  <div className="overflow-hidden whitespace-nowrap border-y border-black bg-black py-3">
    <div className="animate-marquee inline-block text-white font-mono text-sm uppercase tracking-widest font-bold">
      {text} &nbsp;///&nbsp; {text} &nbsp;///&nbsp; {text} &nbsp;///&nbsp; {text} &nbsp;///&nbsp; {text}
    </div>
  </div>
);
