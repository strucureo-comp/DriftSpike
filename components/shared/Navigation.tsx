'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';

  return (
    <>
      <nav className="border-b border-black sticky top-0 bg-white z-50">
        <div className="grid grid-cols-12 h-16 divide-x divide-black">
          <Link href="/" className="col-span-6 md:col-span-3 flex items-center px-4 md:px-6 cursor-pointer">
            <span className="text-lg md:text-xl font-bold tracking-tighter uppercase">DriftSpike®</span>
          </Link>

          <div className="hidden md:col-span-6 md:flex items-center justify-center space-x-12">
            {[
              { id: '/', label: 'Product' },
              { id: '/pricing', label: 'Pricing' },
              { id: '/docs', label: 'Docs' }
            ].map(item => (
              <Link
                key={item.id}
                href={item.id}
                className={`uppercase text-xs font-bold tracking-widest hover:text-[#FF4400] transition-colors ${pathname === item.id ? 'text-[#FF4400]' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="col-span-6 md:col-span-3 flex items-center justify-end">
            {isDashboard ? (
              <div className="flex h-full items-center px-6 gap-4">
                <span className="font-mono text-xs hidden md:inline">ADMIN</span>
                <div className="w-8 h-8 bg-black rounded-full text-white flex items-center justify-center font-bold">A</div>
              </div>
            ) : (
              <Link
                href="/auth"
                className="h-full px-8 border-l border-black hover:bg-black hover:text-white transition-colors uppercase text-xs font-bold tracking-widest flex items-center gap-2"
              >
                Start Free <ArrowRight size={14} />
              </Link>
            )}

            <button
              className="md:hidden h-full px-6 border-l border-black flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden border-b border-black bg-white">
          {[
            { id: '/', label: 'Product' },
            { id: '/docs', label: 'Docs' },
            { id: '/pricing', label: 'Pricing' },
            { id: '/status', label: 'Status' },
            { id: '/auth', label: 'Login' }
          ].map(item => (
            <Link
              key={item.id}
              href={item.id}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left p-4 border-b border-black/10 font-bold uppercase tracking-widest text-sm hover:bg-[#F4F4F4]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
