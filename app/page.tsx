'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Check, 
  Server,
  ChevronRight,
  Mail,
  ShieldCheck,
  Activity,
  ArrowRightLeft,
  Lock,
  Plus,
  Minus
} from 'lucide-react';
import Link from 'next/link';

// --- Animation Variants ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// --- Components ---

const BentoCard = ({ title, subtitle, tag, children }: { title: string; subtitle: string; tag: string; children: React.ReactNode }) => (
  <motion.div 
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    className="bg-white rounded-3xl p-8 border border-gray-100 flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-500"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="text-xs font-semibold text-gray-400 tracking-wider uppercase">{tag}</div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
      />
    </div>
    <div className="flex-grow flex items-center justify-center mb-10 mt-2">
      {children}
    </div>
    <div>
      <h3 className="text-[1.35rem] font-semibold text-gray-900 mb-2 leading-tight">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{subtitle}</p>
    </div>
  </motion.div>
);

const SecurityCard = ({ title, content, icon: Icon }: { title: string; content: string; icon: React.ElementType }) => (
  <motion.div 
    variants={fadeUp}
    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex flex-col hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow"
  >
    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
      <Icon size={20} />
    </div>
    <h4 className="font-semibold text-gray-900 text-base mb-2">{title}</h4>
    <p className="text-gray-500 text-sm leading-relaxed">{content}</p>
  </motion.div>
);

const PlanFeature = ({ children, included = true }: { children: React.ReactNode; included?: boolean }) => (
  <li className={`flex items-start gap-3 text-sm mb-4 ${included ? 'text-gray-600' : 'text-gray-300'}`}>
    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${included ? 'bg-blue-50' : 'bg-gray-50'}`}>
      {included && <Check size={12} className="text-blue-500" />}
    </div>
    <span className="leading-tight">{children}</span>
  </li>
);

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-5">
      <button 
        className="w-full flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-semibold text-gray-900 text-lg">{question}</h4>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          {isOpen ? <Minus size={20} className="text-gray-400" /> : <Plus size={20} className="text-gray-400" />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-gray-500 leading-relaxed pr-8 pb-2">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Page ---

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fcfcfd]/80 backdrop-blur-md border-b border-gray-100/50">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-gray-900">
             <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center shadow-sm transform rotate-3">
               <Mail size={14} className="text-white transform -rotate-3" />
             </div>
             DriftSpike
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="mailto:support@strucureo.com" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="mailto:support@strucureo.com" className="hover:text-gray-900 transition-colors">How it works</a>
            <a href="mailto:support@strucureo.com" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="mailto:support@strucureo.com" className="hover:text-gray-900 transition-colors">FAQ</a>
          </div>
          <motion.a 
            href="mailto:support@strucureo.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-full shadow-sm transition-colors hidden sm:block flex items-center text-center"
          >
            A product by Strucureo
          </motion.a>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-40 pb-16 px-6 text-center max-w-[900px] mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-400/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-8">
            <Server size={14} /> Managed Infrastructure
          </div>
          
          <h1 className="text-5xl md:text-[4.5rem] font-medium tracking-tight text-gray-900 mb-6 leading-[1.05]">
            Your own private <br className="hidden md:block" /> mail infrastructure.
          </h1>
          
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            No limits. No per-email fees. Fully managed.<br/>
            DriftSpike gives you a dedicated SMTP server and REST API — so you can send unlimited emails from your own domain, without touching your Microsoft 365 or Google Workspace setup.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a 
              href="mailto:support@strucureo.com" 
              className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-white bg-blue-500 hover:bg-blue-600 shadow-[0_4px_20px_rgba(59,130,246,0.4)] transition-colors flex items-center justify-center text-lg"
            >
              Get started for $10/mo
            </a>
            <a 
              href="mailto:support@strucureo.com" 
              className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-lg"
            >
              See how it works <ChevronRight size={18} className="text-gray-400" />
            </a>
          </div>
          
          <p className="text-sm text-gray-400 font-medium">
            Cancel anytime <span className="mx-2">·</span> No setup fee <span className="mx-2">·</span> Onboarding included
          </p>
        </motion.div>
      </section>

      {/* --- Social Proof Bar --- */}
      <motion.section 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="py-6 border-y border-gray-100 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-[1000px] mx-auto px-6 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-gray-400">
          <span className="flex items-center gap-2">Works alongside M365</span>
          <span className="hidden md:block w-1 h-1 rounded-full bg-gray-300"></span>
          <span className="flex items-center gap-2">Google Workspace</span>
          <span className="hidden md:block w-1 h-1 rounded-full bg-gray-300"></span>
          <span className="flex items-center gap-2">Any platform</span>
          <span className="hidden md:block w-1 h-1 rounded-full bg-gray-300"></span>
          <span className="flex items-center gap-2">Any email volume</span>
          <span className="hidden md:block w-1 h-1 rounded-full bg-gray-300"></span>
          <span className="flex items-center gap-2 text-gray-500">Managed by Strucureo</span>
        </div>
      </motion.section>

      {/* --- Feature Bento Grid --- */}
      <section id="features" className="max-w-[1100px] mx-auto px-6 pt-24 pb-24">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-[2.5rem] md:text-4xl font-medium text-gray-900 tracking-tight">Why teams choose DriftSpike</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Bento 1: Unlimited */}
          <BentoCard 
            tag="Flat Pricing" 
            title="Unlimited sending, zero per-email cost" 
            subtitle="Send 100 or 100,000 emails a month. Your cost never changes. No surprise bills, no volume caps, ever."
          >
            <div className="w-full max-w-sm flex flex-col gap-6">
               <div className="flex items-end gap-3 h-24 border-b-2 border-dashed border-blue-200 pb-1 relative">
                 <div className="absolute top-4 left-0 w-full text-xs text-gray-400 font-medium flex items-center gap-2">
                   <span>Cost</span>
                   <div className="flex-grow h-px bg-gray-200"></div>
                 </div>
                 {[0.2, 0.4, 0.7, 1].map((height, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     whileInView={{ height: `${height * 100}%` }}
                     transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                     className={`w-1/4 rounded-t-md relative z-10 ${i === 3 ? 'bg-blue-100' : 'bg-gray-100'}`}
                   >
                     {i === 3 && <div className="absolute inset-x-0 bottom-0 h-full bg-blue-500 rounded-t-md shadow-[0_0_15px_rgba(59,130,246,0.4)]"></div>}
                   </motion.div>
                 ))}
                 
                 <motion.div 
                   initial={{ width: 0, opacity: 0 }}
                   whileInView={{ width: '100%', opacity: 1 }}
                   transition={{ duration: 1, delay: 0.8 }}
                   className="absolute top-[40%] left-0 h-1 bg-blue-600 rounded-full z-20 shadow-sm flex items-center justify-end pr-2"
                 >
                   <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm -mt-6">$10/mo</span>
                 </motion.div>
               </div>
               <div className="flex justify-between text-xs text-gray-400 font-medium px-2">
                 <span>1k emails</span>
                 <span className="text-blue-500 font-bold">100k+ emails</span>
               </div>
            </div>
          </BentoCard>

          {/* Bento 2: Private VPS */}
          <BentoCard 
            tag="Isolation" 
            title="Your own private infrastructure" 
            subtitle="Every client gets a dedicated VPS — your own Postfix SMTP server. No shared pools, no data exposure, no neighbours affecting deliverability."
          >
            <div className="relative w-56 h-56 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-50 rounded-2xl border border-blue-100 transform rotate-3 scale-105"></div>
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 0 }}
                className="absolute inset-0 bg-white rounded-2xl border border-gray-100 shadow-xl transform -rotate-2 flex flex-col p-4 transition-transform duration-300"
              >
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Server size={16} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-800">VPS-DEDICATED</span>
                  </div>
                  <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></motion.div>
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="h-2 bg-gray-100 rounded-full w-3/4"></div>
                  <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
                  <div className="h-2 bg-gray-100 rounded-full w-5/6"></div>
                  <div className="h-2 bg-blue-50 rounded-full w-full mt-6 flex overflow-hidden">
                    <motion.div 
                      initial={{ width: '0%' }}
                      whileInView={{ width: '15%' }}
                      animate={{ width: ['15%', '25%', '15%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">Resources: Healthy</span>
                </div>
              </motion.div>
            </div>
          </BentoCard>

          {/* Bento 3: REST API */}
          <BentoCard 
            tag="Integration" 
            title="REST API, dead simple" 
            subtitle="One POST request with your API key. Plug it into any app, platform, or internal tool in minutes. Supports all email types."
          >
            <div className="w-full max-w-sm bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-gray-800 scale-105">
              <div className="flex items-center px-4 py-2 bg-[#2d2d2d] border-b border-gray-700 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                <span className="ml-2 text-[10px] text-gray-400 font-mono">POST /v1/send</span>
              </div>
              <div className="p-4 text-[13px] font-mono leading-relaxed relative">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <div className="text-blue-400">curl <span className="text-gray-300">-X POST https://api.driftspike.com/v1/send</span></div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <div className="text-gray-300 pl-4">-H <span className="text-green-300">&quot;Authorization: Bearer ds_key_...&quot;</span></div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <div className="text-gray-300 pl-4">-d <span className="text-yellow-300">&apos;{`{`}&quot;to&quot;: &quot;user@app.com&quot;, &quot;subject&quot;: &quot;Welcome&quot;{`}`}&apos;</span></div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.0 }}>
                  <div className="mt-4 text-gray-500">{`// Response`}</div>
                  <div className="text-green-400">{`{`} &quot;status&quot;: &quot;queued&quot;, &quot;id&quot;: &quot;msg_123&quot; {`}`}</div>
                </motion.div>
                <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="absolute bottom-4 left-[260px] w-2 h-4 bg-gray-400"></motion.div>
              </div>
            </div>
          </BentoCard>

          {/* Bento 4: Existing Mailbox */}
          <BentoCard 
            tag="Split Routing" 
            title="Works with your existing mailbox" 
            subtitle="Keep reading and replying from Microsoft 365 or Google Workspace. DriftSpike handles outbound sending only — your inbox stays exactly where it is."
          >
            <div className="w-full max-w-sm flex flex-col gap-4">
              <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3 shadow-sm relative">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-gray-100 text-[10px] font-bold px-1.5 py-0.5 rounded text-gray-500 border border-gray-200 transform -rotate-90 origin-left">IN</div>
                <div className="ml-4 text-sm font-medium text-gray-700">Incoming Mail</div>
                <motion.div animate={{ x: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <ArrowRightLeft size={16} className="text-gray-400 mx-2" />
                </motion.div>
                <div className="bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-100">Google / M365</div>
              </div>
              
              <div className="flex items-center justify-between bg-blue-50/50 border border-blue-100 rounded-xl p-3 shadow-sm relative overflow-hidden">
                <motion.div 
                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[200%] -left-[100%]"
                   animate={{ left: ['-100%', '100%'] }}
                   transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-blue-100 text-[10px] font-bold px-1.5 py-0.5 rounded text-blue-600 border border-blue-200 transform -rotate-90 origin-left">OUT</div>
                <div className="ml-4 text-sm font-medium text-gray-900 relative z-10">App Notifications</div>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="relative z-10">
                  <ArrowRightLeft size={16} className="text-blue-400 mx-2" />
                </motion.div>
                <div className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm relative z-10">DriftSpike VPS</div>
              </div>
            </div>
          </BentoCard>

          {/* Bento 5: Inbox Delivery */}
          <BentoCard 
            tag="Deliverability" 
            title="Inbox delivery, not spam folder" 
            subtitle="SPF, DKIM, and DMARC are configured for you. Every email is signed, verified, and routed directly — no middleman, no blacklist risk."
          >
            <div className="w-full max-w-[280px] flex flex-col gap-3 scale-110">
               {['SPF Record', 'DKIM Signature', 'DMARC Policy'].map((item, i) => (
                 <motion.div 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-3 shadow-sm"
                 >
                   <span className="font-mono text-xs font-semibold text-gray-600">{item}</span>
                   <div className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded">
                     <ShieldCheck size={14}/> PASS
                   </div>
                 </motion.div>
               ))}
            </div>
          </BentoCard>

          {/* Bento 6: Fully Managed */}
          <BentoCard 
            tag="Operations" 
            title="Fully managed by Strucureo" 
            subtitle="Server uptime, security patches, DKIM rotation, IP monitoring, SSL renewal — all handled by the Strucureo team. You send emails. We handle everything else."
          >
            <div className="w-full max-w-sm flex items-center justify-center">
              <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl transform translate-x-4 translate-y-4"></div>
                <div className="absolute inset-2 bg-blue-400/10 rounded-full blur-xl"></div>
                
                <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-[0_4px_12px_rgba(59,130,246,0.15)]" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="85" fill="none" stroke="#f4f7fc" strokeWidth="12" />
                  <motion.circle 
                    cx="100" cy="100" r="85" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="12" 
                    strokeLinecap="round"
                    strokeDasharray="534" 
                    initial={{ strokeDashoffset: 534 }}
                    whileInView={{ strokeDashoffset: 20 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>

                <div className="text-center relative z-10 flex flex-col items-center">
                  <motion.div 
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }}
                    className="flex items-baseline text-gray-900 mt-2"
                  >
                    <span className="text-[3.25rem] font-bold tracking-tight leading-none">99.9</span>
                    <span className="text-3xl font-bold ml-0.5 leading-none">%</span>
                  </motion.div>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mt-1">Uptime</span>
                </div>
              </div>
            </div>
          </BentoCard>

        </div>
      </section>

      {/* --- Private Safe Area (Security) --- */}
      <section className="py-24 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-[2.5rem] md:text-4xl font-medium text-gray-900 tracking-tight mb-4">Your data never leaves your server</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Private safe area infrastructure built for scale and security.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <SecurityCard icon={Server} title="Fully on your VPS" content="No third-party access — email content never passes through AWS, Google, or any external provider." />
            <SecurityCard icon={Lock} title="API key isolation" content="Each client gets their own scoped key. One key cannot access another client's data or logs." />
            <SecurityCard icon={ShieldCheck} title="TLS everywhere" content="All traffic encrypted in transit on port 587. HTTPS strictly enforced on the API layer." />
            <SecurityCard icon={Activity} title="Managed security" content="Server patching, DKIM rotation, IP monitoring, and blacklist checks handled entirely by our team." />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 text-center">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              DriftSpike is a product of <span className="text-gray-900 font-bold">Strucureo</span> — a managed infrastructure team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- How it Works Section --- */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <h2 className="text-[2.5rem] md:text-4xl font-medium text-gray-900 tracking-tight mb-4">Up and running in under 24 hours.</h2>
            <p className="text-gray-500 text-lg">No server knowledge required. The Strucureo team handles the entire setup — you just start sending.</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative border-l border-blue-100 ml-3 md:ml-6 space-y-12 pb-12">
            
            {[
              {
                title: "Pick your plan",
                desc: "Choose the plan that fits your volume and number of domains. Not sure? Start with Standard — it covers most teams and works alongside any existing mailbox."
              },
              {
                title: "Strucureo sets up your infrastructure",
                desc: "The Strucureo team provisions your dedicated VPS and installs the full mail stack — Postfix, OpenDKIM, SpamAssassin, TLS, and Fail2Ban. Your server is private, isolated, and configured for inbox delivery from day one. No action needed on your end."
              },
              {
                title: "DNS takes 5 minutes",
                desc: "Strucureo will give you exactly three DNS records to add in Cloudflare — or wherever your domain lives. SPF, DKIM, and DMARC. That's it. If you're on Standard or above, we configure split routing so your M365 or Google inbox keeps working normally."
              },
              {
                title: "Get your API key",
                desc: "You'll receive your API key via your Strucureo dashboard. Plug it into your app, tool, or platform. Send your first email with a single POST request."
              }
            ].map((step, index) => (
              <motion.div key={index} variants={fadeUp} className="relative pl-8 md:pl-12">
                <div className="absolute left-[-16px] top-0 w-8 h-8 rounded-full bg-blue-50 border-2 border-blue-500 flex items-center justify-center text-blue-600 font-bold text-sm bg-white">{index + 1}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}

            <motion.div variants={fadeUp} className="relative pl-8 md:pl-12">
              <div className="absolute left-[-16px] top-0 w-8 h-8 rounded-full bg-blue-50 border-2 border-blue-500 flex items-center justify-center text-blue-600 font-bold text-sm bg-white">5</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Send, track, scale</h3>
              <p className="text-gray-500 leading-relaxed mb-6">Every email is logged with timestamp, recipient, status, and message ID. Check delivery status via API. Upgrade your plan any time as your volume grows.</p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm font-medium text-gray-600 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
                <span className="text-blue-500">App calls API</span> 
                <ChevronRight size={14} className="text-gray-400 hidden sm:block" />
                <span className="text-blue-500">API Queues Send</span> 
                <ChevronRight size={14} className="text-gray-400 hidden sm:block" />
                <span className="text-blue-500">Postfix Delivers</span> 
                <ChevronRight size={14} className="text-gray-400 hidden sm:block" />
                <span className="text-blue-500">Status Logged</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing" className="max-w-[1200px] mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-[2.5rem] font-medium text-gray-900 tracking-tight mb-4">Simple, honest pricing.</h2>
          <p className="text-gray-500 max-w-xl mx-auto">One flat monthly fee. No per-email charges. No hidden costs. Managed entirely by the team at Strucureo — no DevOps knowledge required.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12"
        >
          
          {/* Solo */}
          <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-200 flex flex-col hover:shadow-lg transition-shadow">
            <div className="mb-6 border-b border-gray-100 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Solo</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">$10</span>
                <span className="text-sm text-gray-500 font-medium">/ mo</span>
              </div>
            </div>
            <ul className="mb-8 flex-grow space-y-2">
              <PlanFeature><strong>VPS</strong> server</PlanFeature>
              <PlanFeature><strong>1</strong> API key</PlanFeature>
              <PlanFeature><strong>1</strong> Domain</PlanFeature>
              <PlanFeature>Unlimited sending</PlanFeature>
              <PlanFeature>REST API</PlanFeature>
              <PlanFeature>Private VPS</PlanFeature>
              <PlanFeature>SPF · DKIM · DMARC</PlanFeature>
              <PlanFeature>TLS encrypted</PlanFeature>
              <PlanFeature>Managed by Strucureo</PlanFeature>
              <PlanFeature included={false}>M365 / Google split routing</PlanFeature>
              <PlanFeature included={false}>Delivery status logs</PlanFeature>
            </ul>
            <motion.a href="mailto:support@strucureo.com" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full block text-center py-3 px-4 rounded-xl font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
              Start with Solo
            </motion.a>
          </motion.div>

          {/* Standard */}
          <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 lg:p-8 border-2 border-blue-100 flex flex-col hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] transition-shadow relative z-10">
            <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl">POPULAR</div>
            <div className="mb-6 border-b border-gray-100 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Standard</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">$17</span>
                <span className="text-sm text-gray-500 font-medium">/ mo</span>
              </div>
            </div>
            <ul className="mb-8 flex-grow space-y-2">
              <PlanFeature><strong>VPS-2</strong> server</PlanFeature>
              <PlanFeature><strong>3</strong> API keys</PlanFeature>
              <PlanFeature>Up to <strong>3</strong> Domains</PlanFeature>
              <PlanFeature>Unlimited sending</PlanFeature>
              <PlanFeature>REST API</PlanFeature>
              <PlanFeature>Private VPS</PlanFeature>
              <PlanFeature>SPF · DKIM · DMARC</PlanFeature>
              <PlanFeature>TLS encrypted</PlanFeature>
              <PlanFeature>Managed by Strucureo</PlanFeature>
              <PlanFeature>M365 / Google split routing</PlanFeature>
              <PlanFeature>Delivery status logs</PlanFeature>
              <PlanFeature>IP warm-up support</PlanFeature>
              <PlanFeature included={false}>Webhook callbacks</PlanFeature>
            </ul>
            <motion.a href="mailto:support@strucureo.com" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full block text-center py-3 px-4 rounded-xl font-medium text-white bg-blue-500 hover:bg-blue-600 shadow-[0_4px_14px_rgba(59,130,246,0.3)] transition-all cursor-pointer">
              Start with Standard
            </motion.a>
          </motion.div>

          {/* Business */}
          <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-200 flex flex-col hover:shadow-lg transition-shadow">
            <div className="mb-6 border-b border-gray-100 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Business</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">$27</span>
                <span className="text-sm text-gray-500 font-medium">/ mo</span>
              </div>
            </div>
            <ul className="mb-8 flex-grow space-y-2">
              <PlanFeature><strong>VPS-2</strong> server</PlanFeature>
              <PlanFeature><strong>10</strong> API keys</PlanFeature>
              <PlanFeature><strong>Unlimited</strong> Domains</PlanFeature>
              <PlanFeature>Unlimited sending</PlanFeature>
              <PlanFeature>REST API</PlanFeature>
              <PlanFeature>Private VPS</PlanFeature>
              <PlanFeature>SPF · DKIM · DMARC</PlanFeature>
              <PlanFeature>TLS encrypted</PlanFeature>
              <PlanFeature>Managed by Strucureo</PlanFeature>
              <PlanFeature>M365 / Google split routing</PlanFeature>
              <PlanFeature>Delivery status logs</PlanFeature>
              <PlanFeature>IP warm-up support</PlanFeature>
              <PlanFeature>Webhook callbacks</PlanFeature>
              <PlanFeature>Admin dashboard</PlanFeature>
            </ul>
            <motion.a href="mailto:support@strucureo.com" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full block text-center py-3 px-4 rounded-xl font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
              Start with Business
            </motion.a>
          </motion.div>

          {/* Agency */}
          <motion.div variants={fadeUp} className="bg-[#1e1e1e] rounded-3xl p-6 lg:p-8 border border-gray-800 flex flex-col hover:shadow-2xl transition-shadow text-white">
            <div className="mb-6 border-b border-gray-700 pb-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Agency</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$52</span>
                <span className="text-sm text-gray-400 font-medium">/ mo</span>
              </div>
            </div>
            <ul className="mb-8 flex-grow space-y-2 text-gray-300">
              <PlanFeature><span className="text-gray-300"><strong>VPS-3/5</strong> server</span></PlanFeature>
              <PlanFeature><span className="text-gray-300"><strong>Unlimited</strong> API keys</span></PlanFeature>
              <PlanFeature><span className="text-gray-300"><strong>Unlimited</strong> Domains</span></PlanFeature>
              <PlanFeature><span className="text-gray-300">Unlimited sending</span></PlanFeature>
              <PlanFeature><span className="text-gray-300">REST API</span></PlanFeature>
              <PlanFeature><span className="text-gray-300">Private VPS</span></PlanFeature>
              <PlanFeature><span className="text-gray-300">SPF · DKIM · DMARC</span></PlanFeature>
              <PlanFeature><span className="text-gray-300">TLS encrypted</span></PlanFeature>
              <PlanFeature><span className="text-gray-300">Managed by Strucureo</span></PlanFeature>
              <PlanFeature><span className="text-gray-300">M365 / Google split routing</span></PlanFeature>
              <PlanFeature><span className="text-gray-300">Delivery status logs</span></PlanFeature>
              <PlanFeature><span className="text-gray-300">IP warm-up support</span></PlanFeature>
              <PlanFeature><span className="text-gray-300">Webhook callbacks</span></PlanFeature>
              <PlanFeature><span className="text-gray-300">Admin dashboard</span></PlanFeature>
              <PlanFeature><span className="text-gray-300">Priority support</span></PlanFeature>
            </ul>
            <motion.a href="mailto:support@strucureo.com" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full block text-center py-3 px-4 rounded-xl font-medium text-black bg-white hover:bg-gray-100 transition-colors cursor-pointer">
              Contact Sales
            </motion.a>
          </motion.div>

        </motion.div>

      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="max-w-[800px] mx-auto px-6 py-24">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl md:text-4xl font-medium text-gray-900 tracking-tight mb-10 text-center">Frequently asked questions</motion.h2>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm divide-y divide-gray-100">
          <FaqItem question="Do I need to migrate my email?" answer="No. DriftSpike only handles outbound sending. Your existing Microsoft 365 or Google Workspace inbox stays completely untouched."/>
          <FaqItem question="What is split routing?" answer="Your domain's MX record keeps pointing to M365 or Google for receiving. The Strucureo team adds your DriftSpike VPS IP to your SPF record so outbound mail is sent through us. Recipients see your normal email address — nothing changes on their end."/>
          <FaqItem question="Is there a sending limit?" answer="None. Send as many emails as your server can handle. VPS-2 comfortably handles up to 50,000 emails per day."/>
          <FaqItem question="What happens if my IP gets flagged?" answer="The Strucureo team monitors your IP reputation continuously. If there's a risk of blacklisting, we notify you immediately and take action. IP warm-up support is included from Standard plan onwards."/>
          <FaqItem question="Can I cancel anytime?" answer="Yes. No contracts, no cancellation fees. Cancel from your dashboard at any time."/>
          <FaqItem question="What's included in onboarding?" answer="The Strucureo team configures your VPS, Postfix, DKIM, SPF, DMARC, and API keys for you. You'll be sending emails within 24 hours of signing up."/>
          <FaqItem question="Who runs DriftSpike?" answer="DriftSpike is built and operated by Strucureo — a managed infrastructure team focused on private, reliable tools for developers and growing businesses."/>
        </motion.div>
      </section>

      {/* --- CTA Banner --- */}
      <section className="py-24 bg-blue-500 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/20 blur-[100px] pointer-events-none"></div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-[600px] mx-auto relative z-10">
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-6">Ready to send without limits?</motion.h2>
          <motion.p variants={fadeUp} className="text-blue-100 text-lg mb-10">Set up takes less than a day. Onboarding is included with every plan. Built by Strucureo. Trusted infrastructure, personal support.</motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="mailto:support@strucureo.com" className="w-full sm:w-auto block text-center px-8 py-4 rounded-full font-bold text-blue-600 bg-white hover:bg-gray-50 transition-all shadow-xl cursor-pointer">
              Start with Solo — $10/mo
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="mailto:support@strucureo.com" className="w-full sm:w-auto block text-center px-8 py-4 rounded-full font-medium text-white border-2 border-white/30 hover:bg-white/10 transition-all cursor-pointer">
              Talk to the Strucureo team
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* --- Footer --- */}
      <footer className="mt-0 pt-24 border-t border-gray-100 relative overflow-hidden bg-[#fcfcfd]">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end pb-32">
          
          <div className="mb-12 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-8 tracking-tight">Start sending today.</h2>
            <motion.a href="mailto:support@strucureo.com" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3.5 rounded-full font-medium text-white bg-blue-500 hover:bg-blue-600 shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition-all inline-flex items-center gap-2 cursor-pointer">
              <Mail size={18} /> Get started
            </motion.a>
          </div>

          <div className="grid grid-cols-2 gap-20 md:gap-32 text-[15px]">
            <div>
              <h4 className="font-semibold text-gray-900 mb-5 uppercase tracking-wider text-xs">DriftSpike</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="mailto:support@strucureo.com" className="hover:text-blue-500 transition-colors">Features</a></li>
                <li><a href="mailto:support@strucureo.com" className="hover:text-blue-500 transition-colors">Pricing</a></li>
                <li><a href="mailto:support@strucureo.com" className="hover:text-blue-500 transition-colors">How it works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-5 uppercase tracking-wider text-xs">Strucureo</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="mailto:support@strucureo.com" className="hover:text-blue-500 transition-colors">Visit strucureo.com</a></li>
                <li><a href="mailto:support@strucureo.com" className="hover:text-blue-500 transition-colors">Contact Strucureo</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 w-[600px] h-[400px] pointer-events-none opacity-90 hidden md:block">
           <div className="absolute w-full h-full bottom-[-100px] right-[-100px]">
              <div className="absolute top-[20%] right-[20%] w-[320px] h-[160px] bg-gradient-to-t from-[#2563eb] to-[#60a5fa] rounded-t-full z-10 blur-[1px]"></div>
              <div className="absolute top-[58%] right-[15%] w-[450px] h-[1px] bg-white/60 z-20"></div>
              <div className="absolute top-[58%] right-[20%] w-[320px] h-[160px] z-10 flex flex-col items-center">
                 <motion.div animate={{ scaleX: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="w-[105%] h-[8px] bg-blue-400/80 rounded-[100%] blur-[2px] mt-2"></motion.div>
                 <motion.div animate={{ scaleX: [1, 1.03, 1] }} transition={{ repeat: Infinity, duration: 4 }} className="w-[95%] h-[12px] bg-blue-500/60 rounded-[100%] blur-[3px] mt-3"></motion.div>
                 <motion.div animate={{ scaleX: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} className="w-[85%] h-[16px] bg-blue-500/40 rounded-[100%] blur-[5px] mt-4"></motion.div>
                 <motion.div animate={{ scaleX: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 3.5 }} className="w-[70%] h-[20px] bg-blue-600/30 rounded-[100%] blur-[8px] mt-5"></motion.div>
                 <motion.div animate={{ scaleX: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 5 }} className="w-[50%] h-[24px] bg-blue-600/20 rounded-[100%] blur-[12px] mt-6"></motion.div>
              </div>
           </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[400px] h-[300px] pointer-events-none opacity-50 md:hidden">
            <div className="absolute top-[30%] left-[25%] w-[200px] h-[100px] bg-gradient-to-t from-[#2563eb] to-[#60a5fa] rounded-t-full z-10 blur-[1px]"></div>
            <div className="absolute top-[63%] left-[25%] w-[200px] h-[100px] z-10 flex flex-col items-center">
                 <motion.div animate={{ scaleX: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="w-[105%] h-[6px] bg-blue-400/80 rounded-[100%] blur-[2px] mt-2"></motion.div>
                 <motion.div animate={{ scaleX: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 4 }} className="w-[90%] h-[10px] bg-blue-500/50 rounded-[100%] blur-[4px] mt-3"></motion.div>
            </div>
        </div>

        <div className="border-t border-gray-100 py-6 px-6 text-center text-gray-400 text-[13px] font-medium relative z-20 bg-[#fcfcfd]/80 backdrop-blur-sm">
          <p>© 2026 DriftSpike · A product by Strucureo · strucureo.com</p>
        </div>
      </footer>

    </div>
  );
}
