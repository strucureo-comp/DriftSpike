'use client';

import { useState } from 'react';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api-drift-spike.vercel.app/api';

  const sections = [
    { id: 'introduction', label: 'Introduction', number: '1.0' },
    { id: 'authentication', label: 'Authentication', number: '2.0' },
    { id: 'status', label: 'Check Status', number: '3.0' },
    { id: 'sending', label: 'Sending Emails', number: '4.0' },
    { id: 'errors', label: 'Errors', number: '5.0' },
  ];

  return (
    <div className="grid md:grid-cols-12 min-h-screen">
      <div className="md:col-span-3 border-r border-black bg-[#F4F4F4]">
        <div className="p-6 border-b border-black">
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-gray-500">Contents</span>
        </div>
        <div className="flex flex-col">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`text-left px-6 py-4 border-b border-black/10 font-mono text-sm hover:bg-white hover:pl-8 transition-all ${activeSection === section.id ? 'font-bold bg-white border-l-4 border-l-[#FF4400]' : ''}`}
            >
              {section.number} {section.label}
            </button>
          ))}
        </div>
      </div>

      <div className="md:col-span-9 p-8 md:p-16">
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#FF4400] mb-4 block">1.0 Introduction</span>
          <h1 className="text-5xl font-black uppercase mb-8">API Reference</h1>
          <p className="text-lg leading-relaxed mb-8">
            DriftSpike, a product of <a href="https://www.strucureo.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#FF4400]">Strucureo</a>, provides a robust REST API for seamless email delivery.
            All endpoints are HTTPS-only.
          </p>

          <div className="border border-black p-6 bg-[#F4F4F4] mb-8">
            <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Production Base URL</h3>
            <div className="bg-black text-white p-4 font-mono text-sm">
              {apiUrl}
            </div>
          </div>

          <h2 className="text-2xl font-bold uppercase mb-4 mt-12">Authentication</h2>
          <p className="mb-4 leading-relaxed">
            Authenticating with the API is done via the <code className="bg-gray-200 px-1 font-bold">x-api-key</code> header.
            Your API Key is your unique **Supabase User ID**, which can be found in your dashboard credentials section.
          </p>
          <div className="bg-black text-white p-6 font-mono text-sm overflow-x-auto mb-8">
            x-api-key: YOUR_USER_ID
          </div>

          <h2 className="text-2xl font-bold uppercase mb-4 mt-12">1. Check Status</h2>
          <p className="mb-4">Use this endpoint to verify the service health and connection to your SMTP server.</p>
          <div className="bg-black text-white p-6 font-mono text-sm overflow-x-auto whitespace-pre mb-8">
            {`curl -X GET ${apiUrl}/status \\
  -H "x-api-key: YOUR_USER_ID" \\
  -H "Content-Type: application/json"`}
          </div>

          <h2 className="text-2xl font-bold uppercase mb-4 mt-12">2. Send Email</h2>
          <p className="mb-4 font-bold uppercase tracking-widest text-xs text-gray-500">Basic Usage</p>
          <p className="mb-4">Send a transactional email with HTML content.</p>
          <div className="bg-black text-white p-6 font-mono text-sm overflow-x-auto whitespace-pre mb-8">
            {`curl -X POST ${apiUrl}/send-email \\
  -H "x-api-key: YOUR_USER_ID" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "recipient@example.com",
    "subject": "Your Subject",
    "html": "<h1>Hello!</h1><p>Your message here</p>"
  }'`}
          </div>

          <p className="mb-4 font-bold uppercase tracking-widest text-xs text-gray-500">With Attachments</p>
          <p className="mb-4">Send an email with base64 encoded attachments.</p>
          <div className="bg-black text-white p-6 font-mono text-sm overflow-x-auto whitespace-pre mb-8">
            {`curl -X POST ${apiUrl}/send-email \\
  -H "x-api-key: YOUR_USER_ID" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "recipient@example.com",
    "subject": "Email with Attachment",
    "html": "<h1>Hello!</h1>",
    "attachments": [
      {
        "filename": "hello.txt",
        "content": "SGVsbG8gV29ybGQh",
        "contentType": "text/plain"
      }
    ]
  }'`}
          </div>

          <h2 className="text-2xl font-bold uppercase mb-4 mt-12">Error Handling</h2>
          <p className="mb-4">The API uses standard HTTP response codes to indicate success or failure.</p>

          <div className="space-y-4 mb-8">
            <div className="border border-black p-4 bg-[#EEFFEE]">
              <div className="font-bold font-mono mb-2">200 - OK</div>
              <div className="text-sm text-gray-600">Request succeeded.</div>
            </div>

            <div className="border border-black p-4 bg-[#FFF4E6]">
              <div className="font-bold font-mono mb-2">401 - Unauthorized</div>
              <div className="text-sm text-gray-600">Invalid or missing API key (User ID).</div>
            </div>

            <div className="border border-black p-4 bg-[#FFEEEE]">
              <div className="font-bold font-mono mb-2">500 - Server Error</div>
              <div className="text-sm text-gray-600">SMTP connection failure or internal error.</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold uppercase mb-4 mt-12">Rate Limits & Plans</h2>
          <p className="mb-4">Rate limits vary by plan:</p>
          <ul className="list-disc list-inside space-y-2 mb-8 font-mono text-sm">
            <li>Starter: 1 request per minute</li>
            <li>Production: 30 requests per minute</li>
          </ul>

          <div className="border-t border-black pt-8 mt-12">
            <p className="font-mono text-sm text-gray-500">
              To upgrade to Premium, please contact <a href="mailto:strucureo@gmail.com" className="font-bold text-black underline hover:text-[#FF4400]">strucureo@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
