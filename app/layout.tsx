import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DriftSpike — Private Mail Infrastructure. Unlimited Sending. $10/mo.',
  description: 'DriftSpike gives your business a dedicated SMTP server and REST API. Send unlimited emails from your own domain — no per-email fees, no shared pools. Fully managed by Strucureo.',
  keywords: ['private SMTP server', 'email API', 'unlimited email sending', 'self-hosted mail server', 'transactional email API', 'Postfix managed hosting', 'DriftSpike', 'Strucureo', 'email infrastructure', 'outbound email service'],
  authors: [{ name: 'Strucureo', url: 'https://strucureo.com' }],
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  themeColor: '#06060e',
  alternates: {
    canonical: 'https://driftspike.com/',
    languages: {
      'en': 'https://driftspike.com/',
      'en-IN': 'https://driftspike.com/',
      'en-US': 'https://driftspike.com/',
      'en-GB': 'https://driftspike.com/',
      'x-default': 'https://driftspike.com/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://driftspike.com/',
    title: 'DriftSpike — Private Mail Infrastructure. Unlimited Sending.',
    description: 'Dedicated SMTP server + REST API. Send unlimited emails from your own domain. No per-email fees. Fully managed by Strucureo.',
    siteName: 'DriftSpike',
    locale: 'en_US',
    images: [
      {
        url: 'https://driftspike.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DriftSpike — Private Mail Infrastructure by Strucureo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@strucureo',
    creator: '@strucureo',
    title: 'DriftSpike — Private Mail Infrastructure',
    description: 'Dedicated SMTP + REST API. Unlimited sending. $10/mo flat. Managed by Strucureo.',
    images: ['https://driftspike.com/og-image.jpg'],
  },
  other: {
    'X-UA-Compatible': 'IE=edge',
    'geo.region': 'IN-TN',
    'geo.placename': 'Chennai, Tamil Nadu, India',
    'geo.position': '13.0827;80.2707',
    'ICBM': '13.0827, 80.2707',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://driftspike.com/#product',
      name: 'DriftSpike',
      alternateName: ['DriftSpike Mail API', 'DriftSpike SMTP'],
      url: 'https://driftspike.com',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Email Infrastructure',
      operatingSystem: 'Any',
      description: 'DriftSpike is a private dedicated SMTP server and REST API service for unlimited outbound email sending. No per-email fees, no shared pools, fully managed by Strucureo. Works alongside Microsoft 365 and Google Workspace.',
      featureList: [
        'Unlimited email sending',
        'Dedicated private SMTP server',
        'REST API with API key authentication',
        'SPF, DKIM, DMARC configuration',
        'TLS encrypted connections',
        'Split routing with M365 and Google Workspace',
        'Delivery status tracking',
        'Webhook callbacks',
        'IP warm-up support',
        'Managed by Strucureo team',
      ],
      screenshot: 'https://driftspike.com/og-image.jpg',
      offers: [
        {
          '@type': 'Offer',
          name: 'Solo',
          price: '10.00',
          priceCurrency: 'USD',
          billingIncrement: 'P1M',
          description: '1 API key, 1 domain, unlimited sending, private VPS-2',
          eligibleRegion: { '@type': 'Place', name: 'Worldwide' },
        },
        {
          '@type': 'Offer',
          name: 'Standard',
          price: '17.00',
          priceCurrency: 'USD',
          billingIncrement: 'P1M',
          description: '3 API keys, 1 domain, split routing, delivery logs, IP warm-up',
        },
        {
          '@type': 'Offer',
          name: 'Business',
          price: '27.00',
          priceCurrency: 'USD',
          billingIncrement: 'P1M',
          description: '10 API keys, up to 3 domains, webhooks, VPS-3',
        },
        {
          '@type': 'Offer',
          name: 'Agency',
          price: '52.00',
          priceCurrency: 'USD',
          billingIncrement: 'P1M',
          description: 'Unlimited API keys, unlimited domains, admin dashboard, priority support, VPS-5',
        },
      ],
      provider: { '@id': 'https://strucureo.com/#org' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://strucureo.com/#org',
      name: 'Strucureo',
      url: 'https://strucureo.com',
      description: 'Strucureo is a managed infrastructure team building private, reliable tools for developers and businesses. Products include DriftSpike — private mail infrastructure.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: 'https://strucureo.com',
      },
      sameAs: ['https://driftspike.com'],
    },
    {
      '@type': 'HowTo',
      '@id': 'https://driftspike.com/#howto',
      name: 'How to set up DriftSpike private mail infrastructure',
      description: 'Set up DriftSpike and start sending unlimited emails in under 24 hours — no server knowledge required.',
      totalTime: 'PT24H',
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '10' },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Pick your plan',
          text: 'Choose a DriftSpike plan based on your sending volume and number of domains.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Strucureo sets up your infrastructure',
          text: 'Strucureo provisions your dedicated VPS with Postfix, OpenDKIM, TLS, SpamAssassin, and Fail2Ban.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Add 3 DNS records',
          text: 'Add SPF, DKIM, and DMARC records to your domain. Takes 5 minutes. Split routing configured on Standard and above.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Get your API key',
          text: 'Receive your API key via the Strucureo dashboard. Plug into any app with a single POST request.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Send, track, and scale',
          text: 'Every email is logged. Check delivery status via API. Strucureo monitors your IP reputation continuously.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://driftspike.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I need to migrate my email to use DriftSpike?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. DriftSpike only handles outbound sending. Your existing Microsoft 365 or Google Workspace inbox stays completely untouched.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is split routing in DriftSpike?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Your domain MX record keeps pointing to M365 or Google for receiving. Strucureo adds your DriftSpike VPS IP to your SPF record so outbound mail is sent through DriftSpike. Recipients see your normal email address — nothing changes on their end.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there a sending limit on DriftSpike?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'None. Send as many emails as your server can handle. VPS-2 comfortably handles up to 50,000 emails per day with no volume caps.',
          },
        },
        {
          '@type': 'Question',
          name: 'How quickly can I start sending with DriftSpike?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Setup takes less than 24 hours. Strucureo handles all infrastructure provisioning. You only need to add 3 DNS records.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if my IP gets blacklisted?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Strucureo team monitors your IP reputation continuously. If there is a risk of blacklisting, you are notified immediately and action is taken. IP warm-up support is included from the Standard plan onwards.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I cancel DriftSpike anytime?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. No contracts, no cancellation fees. Cancel from your dashboard at any time.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who manages DriftSpike infrastructure?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'DriftSpike is built and operated by Strucureo — a managed infrastructure team at strucureo.com focused on private, reliable tools for developers and growing businesses.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://driftspike.com/' },
        { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://driftspike.com/#features' },
        { '@type': 'ListItem', position: 3, name: 'How it works', item: 'https://driftspike.com/how-it-works' },
        { '@type': 'ListItem', position: 4, name: 'Pricing', item: 'https://driftspike.com/pricing' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://driftspike.com/#website',
      url: 'https://driftspike.com',
      name: 'DriftSpike',
      description: 'Private mail infrastructure — dedicated SMTP server and REST API, managed by Strucureo.',
      publisher: { '@id': 'https://strucureo.com/#org' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://driftspike.com/?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://strucureo.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
