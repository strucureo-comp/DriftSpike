'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, FileText, Settings, LogOut, Mail, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
   const router = useRouter();
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState<any>(null);
   const [userData, setUserData] = useState<any>(null);
   const [isEditing, setIsEditing] = useState(false);
   const [saveLoading, setSaveLoading] = useState(false);
   const [editForm, setEditForm] = useState({
      email: '',
      smtp_host: '',
      smtp_port: 587,
      smtp_secure: false,
      smtp_user: '',
      smtp_pass: '',
      from_name: ''
   });

   const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api-drift-spike.vercel.app/api';

   useEffect(() => {
      const fetchData = async () => {
         const { data: { session } } = await supabase.auth.getSession();
         if (!session) {
            router.push('/auth');
            return;
         }

         const user = session.user;
         setUser(user);

         // Helper to refresh user data
         const loadProfile = async () => {
            const { data, error } = await supabase
               .from('users')
               .select('*')
               .eq('id', user.id);

            if (data && data.length > 0) {
               setUserData(data[0]);
               return true;
            }
            return false;
         };

         const exists = await loadProfile();

         if (!exists) {
            console.log('No user profile found, creating default profile...');
            const newUserData = {
               id: user.id,
               email: user.email,
               plan_type: 'free',
               emails_sent_this_month: 0,
               smtp_host: '',
               smtp_port: 587,
               smtp_secure: false,
               smtp_user: '',
               smtp_pass: '',
               from_name: user.email?.split('@')[0] || 'DriftSpike User'
            };

            const { error: insertError } = await supabase
               .from('users')
               .insert([newUserData]);

            if (insertError) {
               // If it's a conflict, just try to load again
               if (insertError.code === '23505') {
                  await loadProfile();
               } else {
                  console.error('Error creating user profile:', insertError);
               }
            } else {
               setUserData(newUserData);
            }
         }
         setLoading(false);
      };

      fetchData();
   }, [router]);

   const handleSignOut = async () => {
      await supabase.auth.signOut();
      router.push('/');
   };

   const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard');
   };

   const handleSaveConfig = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaveLoading(true);

      const { error } = await supabase
         .from('users')
         .upsert({
            id: user.id,
            ...editForm,
            updated_at: new Date().toISOString()
         });

      if (error) {
         console.error('Error saving config:', error);
         alert('Error saving configuration: ' + error.message);
      } else {
         setUserData({ ...userData, ...editForm });
         setIsEditing(false);
         alert('Configuration saved successfully');
      }
      setSaveLoading(false);
   };

   const startEditing = () => {
      setEditForm({
         email: userData?.email || user?.email || '',
         smtp_host: userData?.smtp_host || '',
         smtp_port: userData?.smtp_port || 587,
         smtp_secure: userData?.smtp_secure || false,
         smtp_user: userData?.smtp_user || '',
         smtp_pass: userData?.smtp_pass || '',
         from_name: userData?.from_name || ''
      });
      setIsEditing(true);
   };

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4] font-mono text-sm uppercase font-bold tracking-widest text-black flex-col gap-4">
            <div className="w-8 h-8 border-4 border-black border-t-[#FF4400] animate-spin"></div>
            <span>Synchronizing Service...</span>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-[#F4F4F4]">
         <div className="grid grid-cols-12 border-b border-black bg-white">
            <div className="col-span-12 md:col-span-8 p-4 md:p-6 flex items-center gap-4">
               <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold">
                  {user?.email?.[0].toUpperCase()}
               </div>
               <div>
                  <h1 className="font-bold uppercase tracking-widest text-base md:text-lg">Overview</h1>
                  <p className="font-mono text-[10px] md:text-xs text-gray-500">ID: {user?.id}</p>
               </div>
            </div>
            <div className="col-span-12 md:col-span-4 border-t md:border-t-0 md:border-l border-black p-4 md:p-6 flex items-center justify-between md:justify-end gap-4 bg-[#FF4400]/5">
               <span className="font-mono text-[10px] md:text-xs font-bold uppercase text-[#FF4400]">Status: Operational</span>
               <div className="w-2 h-2 bg-[#FF4400] rounded-full animate-pulse"></div>
            </div>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black border-b border-black bg-white">
            {[
               { label: "Emails Sent", val: userData?.emails_sent_this_month || "0", sub: "Month Count" },
               { label: "Current Tier", val: userData?.plan_type || "Free", sub: "Active Plan" },
               { label: "SMTP Service", val: userData?.smtp_host ? "Verified" : "Pending", sub: "Connection" },
               { label: "Average Speed", val: "1.9s", sub: "Global Latency" }
            ].map((stat, i) => (
               <div key={i} className={`p-4 md:p-8 hover:bg-gray-50 transition-colors ${i % 2 === 1 ? 'border-l border-black md:border-l-0' : ''}`}>
                  <span className="font-mono text-[10px] md:text-xs uppercase text-gray-500 block mb-2">{stat.label}</span>
                  <span className="text-xl md:text-3xl font-black block mb-1 uppercase">{stat.val}</span>
                  <span className="font-mono text-[10px] md:text-xs text-[#FF4400]">{stat.sub}</span>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-black border-b border-black">

            <div className="lg:col-span-2 bg-white min-h-[500px]">
               <div className="p-6 border-b border-black flex justify-between items-center bg-[#F4F4F4]/30">
                  <span className="font-bold uppercase tracking-widest text-sm">SMTP Configuration</span>
                  <button
                     onClick={startEditing}
                     className="text-xs font-mono uppercase underline hover:text-[#FF4400]"
                  >
                     Edit Config
                  </button>
               </div>

               <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <div>
                           <label className="block font-mono text-[10px] uppercase font-bold text-gray-400 mb-1">SMTP Host</label>
                           <div className="font-mono text-sm border-b border-black/10 pb-2">{userData?.smtp_host || 'Not set'}</div>
                        </div>
                        <div>
                           <label className="block font-mono text-[10px] uppercase font-bold text-gray-400 mb-1">SMTP Port</label>
                           <div className="font-mono text-sm border-b border-black/10 pb-2">{userData?.smtp_port || '587'}</div>
                        </div>
                        <div>
                           <label className="block font-mono text-[10px] uppercase font-bold text-gray-400 mb-1">Secure Connection</label>
                           <div className="font-mono text-sm border-b border-black/10 pb-2">{userData?.smtp_secure ? 'SSL/TLS' : 'STARTTLS'}</div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div>
                           <label className="block font-mono text-[10px] uppercase font-bold text-gray-400 mb-1">SMTP User</label>
                           <div className="font-mono text-sm border-b border-black/10 pb-2">{userData?.smtp_user || 'Not set'}</div>
                        </div>
                        <div>
                           <label className="block font-mono text-[10px] uppercase font-bold text-gray-400 mb-1">From Name</label>
                           <div className="font-mono text-sm border-b border-black/10 pb-2">{userData?.from_name || 'Not set'}</div>
                        </div>
                     </div>
                  </div>

                  <div className="border border-black p-6 bg-[#F4F4F4] relative group mb-8">
                     <div className="absolute -top-3 left-4 bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase">System Message</div>
                     <div className="flex gap-4 items-start">
                        <Zap size={20} className="text-[#FF4400] flex-shrink-0 mt-1" />
                        <div>
                           <p className="font-mono text-xs leading-relaxed">
                              {userData?.plan_type === 'free'
                                 ? "You are currently using the FREE plan. To unlock dedicated IPs and high-volume throughput, please upgrade to Premium."
                                 : "PREMIUM plan active. All systems optimized for maximum reliability."
                              }
                           </p>
                           {userData?.plan_type === 'free' && (
                              <a href="mailto:strucureo@gmail.com" className="inline-block mt-4 bg-black text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF4400] transition-colors">
                                 Contact to Upgrade
                              </a>
                           )}
                        </div>
                     </div>
                  </div>


               </div>
            </div>

            <div className="bg-white">
               <div className="p-6 border-b border-black">
                  <span className="font-bold uppercase tracking-widest text-sm">Access Credentials</span>
               </div>
               <div className="p-6 border-b border-black space-y-6">
                  <div>
                     <label className="block font-mono text-xs uppercase font-bold text-gray-400 mb-2">Your API Key (User ID)</label>
                     <div className="flex border border-black group">
                        <input readOnly value={user?.id || ''} className="flex-1 p-2 font-mono text-xs bg-[#F4F4F4] focus:outline-none" />
                        <button
                           onClick={() => copyToClipboard(user?.id || '')}
                           className="px-3 hover:bg-black hover:text-white border-l border-black transition-colors"
                        >
                           <Copy size={14} />
                        </button>
                     </div>
                     <p className="mt-2 text-[10px] font-mono text-gray-400">Security Note: Keep this ID private. It grants access to your SMTP server.</p>
                  </div>

                  <div>
                     <label className="block font-mono text-xs uppercase font-bold text-gray-400 mb-2">Live Test Command (Basic)</label>
                     <div className="relative group/cmd mb-4">
                        <div className="bg-black text-white p-4 font-mono text-[10px] leading-relaxed break-all overflow-hidden border border-black">
                           <span className="text-gray-500">$ </span>
                           curl -X POST {apiUrl}/send-email \<br />
                           &nbsp;&nbsp;-H "x-api-key: {user?.id}" \<br />
                           &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                           &nbsp;&nbsp;-d {'{'} "to": "{userData?.email || user?.email}", "subject": "Your Subject", "html": "&lt;h1&gt;Hello!&lt;/h1&gt;&lt;p&gt;Your message here&lt;/p&gt;" {'}'}
                        </div>
                        <button
                           onClick={() => copyToClipboard(`curl -X POST ${apiUrl}/send-email -H "x-api-key: ${user?.id}" -H "Content-Type: application/json" -d '{"to": "${userData?.email || user?.email}", "subject": "Your Subject", "html": "<h1>Hello!</h1><p>Your message here</p>"}'`)}
                           className="absolute top-2 right-2 p-1.5 bg-white/10 hover:bg-[#FF4400] text-white transition-colors border border-white/20"
                        >
                           <Copy size={12} />
                        </button>
                     </div>

                     <label className="block font-mono text-xs uppercase font-bold text-gray-400 mb-2">Advanced (With Attachment)</label>
                     <div className="relative group/cmd">
                        <div className="bg-black text-white p-4 font-mono text-[9px] leading-tight break-all overflow-hidden border border-black opacity-80 hover:opacity-100 transition-opacity">
                           <span className="text-gray-500">$ </span>
                           curl -X POST {apiUrl}/send-email \<br />
                           &nbsp;&nbsp;-H "x-api-key: {user?.id}" \<br />
                           &nbsp;&nbsp;-d {'{'} "to": "{userData?.email || user?.email}", "subject": "Email with Attachment", "html": "&lt;h1&gt;Hello!&lt;/h1&gt;", "attachments": [{'{'} "filename": "hello.txt", "content": "SGVsbG8gV29ybGQh", "contentType": "text/plain" {'}'}] {'}'}
                        </div>
                        <button
                           onClick={() => copyToClipboard(`curl -X POST ${apiUrl}/send-email -H "x-api-key: ${user?.id}" -H "Content-Type: application/json" -d '{"to": "${userData?.email || user?.email}", "subject": "Email with Attachment", "html": "<h1>Hello!</h1>", "attachments": [{"filename": "hello.txt", "content": "SGVsbG8gV29ybGQh", "contentType": "text/plain"}]}'`)}
                           className="absolute top-2 right-2 p-1.5 bg-white/10 hover:bg-[#FF4400] text-white transition-colors border border-white/20"
                        >
                           <Copy size={12} />
                        </button>
                     </div>
                  </div>
               </div>

               <div className="p-6">
                  <span className="font-bold uppercase tracking-widest text-sm block mb-4">Quick Actions</span>
                  <div className="space-y-2">
                     <button
                        onClick={() => router.push('/docs')}
                        className="w-full text-left p-3 border border-black/10 hover:border-black font-mono text-sm flex items-center gap-2 transition-colors"
                     >
                        <FileText size={14} /> View Documentation
                     </button>
                     <button
                        onClick={handleSignOut}
                        className="w-full text-left p-3 border border-black/10 hover:border-red-500 hover:text-red-700 font-mono text-sm flex items-center gap-2 transition-colors"
                     >
                        <LogOut size={14} /> Sign Out
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {isEditing && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
               <div className="bg-white border-2 border-black w-full max-w-2xl shadow-[12px_12px_0px_0px_#000]">
                  <div className="border-b border-black p-4 flex justify-between items-center bg-black text-white">
                     <span className="font-bold uppercase tracking-widest">Update SMTP Configuration</span>
                     <button onClick={() => setIsEditing(false)} className="hover:text-[#FF4400]">
                        <AlertCircle size={20} className="rotate-45" />
                     </button>
                  </div>

                  <form onSubmit={handleSaveConfig} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-4">
                        <div>
                           <label className="block font-mono text-[10px] uppercase font-bold text-gray-400 mb-1">SMTP Host</label>
                           <input
                              required
                              value={editForm.smtp_host}
                              onChange={e => setEditForm({ ...editForm, smtp_host: e.target.value })}
                              className="w-full border border-black p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#FF4400]"
                              placeholder="smtp.gmail.com"
                           />
                        </div>
                        <div>
                           <label className="block font-mono text-[10px] uppercase font-bold text-gray-400 mb-1">SMTP Port</label>
                           <input
                              type="number"
                              required
                              value={editForm.smtp_port}
                              onChange={e => setEditForm({ ...editForm, smtp_port: parseInt(e.target.value) })}
                              className="w-full border border-black p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#FF4400]"
                              placeholder="587"
                           />
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                           <input
                              type="checkbox"
                              id="smtp_secure"
                              checked={editForm.smtp_secure}
                              onChange={e => setEditForm({ ...editForm, smtp_secure: e.target.checked })}
                              className="w-4 h-4 border-black checked:bg-[#FF4400]"
                           />
                           <label htmlFor="smtp_secure" className="font-mono text-[10px] uppercase font-bold cursor-pointer">Use SSL/TLS (Port 465)</label>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div>
                           <label className="block font-mono text-[10px] uppercase font-bold text-gray-400 mb-1">SMTP User (Email)</label>
                           <input
                              required
                              value={editForm.smtp_user}
                              onChange={e => setEditForm({ ...editForm, smtp_user: e.target.value })}
                              className="w-full border border-black p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#FF4400]"
                              placeholder="user@example.com"
                           />
                        </div>
                        <div>
                           <label className="block font-mono text-[10px] uppercase font-bold text-gray-400 mb-1">SMTP Password / App Key</label>
                           <input
                              type="password"
                              required
                              value={editForm.smtp_pass}
                              onChange={e => setEditForm({ ...editForm, smtp_pass: e.target.value })}
                              className="w-full border border-black p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#FF4400]"
                              placeholder="••••••••••••"
                           />
                        </div>
                        <div>
                           <label className="block font-mono text-[10px] uppercase font-bold text-gray-400 mb-1">From Name</label>
                           <input
                              required
                              value={editForm.from_name}
                              onChange={e => setEditForm({ ...editForm, from_name: e.target.value })}
                              className="w-full border border-black p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#FF4400]"
                              placeholder="DriftSpike Support"
                           />
                        </div>
                     </div>

                     <div className="col-span-full pt-4 flex gap-4">
                        <button
                           type="submit"
                           disabled={saveLoading}
                           className="flex-1 bg-black text-white font-bold uppercase tracking-widest py-3 hover:bg-[#FF4400] transition-colors disabled:opacity-50"
                        >
                           {saveLoading ? 'Saving...' : 'Save Configuration'}
                        </button>
                        <button
                           type="button"
                           onClick={() => setIsEditing(false)}
                           className="px-6 border border-black font-bold uppercase tracking-widest py-3 hover:bg-gray-100 transition-colors"
                        >
                           Cancel
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
}
