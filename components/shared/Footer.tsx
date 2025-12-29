import Link from 'next/link';

export const Footer = () => (
  <footer className="bg-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-black">
    <div>
      <span className="text-2xl font-black tracking-tighter uppercase block mb-4">DriftSpike®</span>
      <div className="flex flex-col gap-1 font-mono text-xs text-gray-500">
        <span>A PRODUCT OF <a href="https://www.strucureo.works" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">STRUCUREO</a></span>
        <span>© 2024 STRUCUREO.</span>
        <span>ALL RIGHTS RESERVED.</span>
      </div>
    </div>
    <div className="flex gap-8">
      {[
        { name: 'Twitter', url: '#' },
        { name: 'GitHub', url: '#' },
        { name: 'Status', url: '/status' },
        { name: 'Legal', url: '#' }
      ].map(link => (
        <Link key={link.name} href={link.url} className="font-bold uppercase text-xs tracking-widest hover:text-[#FF4400] transition-colors">
          {link.name}
        </Link>
      ))}
    </div>
  </footer>
);
