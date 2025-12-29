import Link from 'next/link';
import { Check, X } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for testing and small projects',
      features: [
        { text: '1,500 emails per month', included: true },
        { text: '1 request per minute (Throttle)', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Email support', included: true },
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Production',
      price: '$50',
      period: 'per month',
      description: 'For production applications at scale',
      features: [
        { text: 'Unlimited emails per month', included: true },
        { text: '30 requests per minute', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Priority support', included: true },
      ],
      cta: 'Upgrade Now',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For organizations with specific needs',
      features: [
        { text: 'Unlimited emails', included: true },
        { text: 'Unlimited API requests', included: true },
        { text: 'Advanced analytics & reporting', included: true },
        { text: '24/7 phone support', included: true },
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="bg-white">
      <div className="border-b border-black py-16 px-8 text-center bg-[#F4F4F4]">
        <span className="font-mono text-xs uppercase tracking-widest text-[#FF4400] mb-4 block">
          ( Transparent Pricing )
        </span>
        <h1 className="text-5xl md:text-7xl font-black uppercase mb-6">Choose Your Plan</h1>
        <p className="text-lg font-mono max-w-2xl mx-auto">
          Start free, scale when you need. All plans include our core infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black border-b border-black">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`p-8 md:p-12 flex flex-col ${plan.highlighted ? 'bg-[#FF4400]/5 relative' : 'bg-white'}`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 right-0 bg-[#FF4400] text-white px-4 py-1 font-bold text-xs uppercase">
                Popular
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-3xl font-black uppercase mb-2">{plan.name}</h2>
              <p className="font-mono text-sm text-gray-600 mb-6">{plan.description}</p>
              <div className="mb-2">
                <span className="text-5xl font-black">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-gray-500 font-mono text-sm ml-2">/ month</span>}
              </div>
              <span className="font-mono text-xs text-gray-500 uppercase">{plan.period}</span>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3">
                  {feature.included ? (
                    <Check size={18} className="text-[#FF4400] flex-shrink-0 mt-0.5" />
                  ) : (
                    <X size={18} className="text-gray-300 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={`text-sm font-mono ${feature.included ? 'text-black' : 'text-gray-400'}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/auth"
              className={`w-full py-4 font-bold uppercase text-sm tracking-widest text-center border border-black transition-colors ${plan.highlighted
                ? 'bg-[#FF4400] text-white hover:bg-black'
                : 'bg-white hover:bg-black hover:text-white'
                }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="border-b border-black p-8 md:p-16 bg-[#F4F4F4]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: 'Can I change plans later?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                q: 'What happens if I exceed my email limit?',
                a: "We'll notify you when you're approaching your limit. Additional emails can be purchased or you can upgrade your plan.",
              },
              {
                q: 'Do you offer refunds?',
                a: 'Yes, we offer a 14-day money-back guarantee for all paid plans.',
              },
              {
                q: 'Is there a setup fee?',
                a: 'No, all plans have no setup fees. You only pay the monthly subscription.',
              },
            ].map((faq, i) => (
              <div key={i} className="border border-black p-6 bg-white">
                <h3 className="font-bold uppercase text-sm mb-2">{faq.q}</h3>
                <p className="font-mono text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-black p-8 md:p-16 text-center">
        <h2 className="text-3xl font-black uppercase mb-4">Need a Custom Solution?</h2>
        <p className="font-mono text-sm text-gray-600 mb-6 max-w-2xl mx-auto">
          Enterprise plans include custom volume pricing, dedicated infrastructure, and white-glove support.
        </p>
        <Link
          href="/auth"
          className="inline-block bg-black text-white px-8 py-4 font-bold uppercase text-sm tracking-widest hover:bg-[#FF4400] transition-colors"
        >
          Contact Sales
        </Link>
      </div>
    </div>
  );
}
