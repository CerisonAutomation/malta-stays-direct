'use client';

import { useState, useCallback } from 'react';
import { Puck, type Config, type Data } from '@measured/puck';
import '@measured/puck/puck.css';

// ─── Block Components ──────────────────────────────────────────────────────

const HeroSection = ({ badge, headline, italic, subheadline, cta1, cta2, stats }: any) => (
  <section className="relative min-h-[90vh] flex flex-col justify-center bg-surface-900 text-white px-8 py-24">
    {badge && <p className="text-xs tracking-widest text-gold-400 uppercase mb-4 border border-gold-400 inline-block px-3 py-1">{badge}</p>}
    <h1 className="text-5xl md:text-7xl font-bold mb-2">{headline}</h1>
    {italic && <h2 className="text-4xl md:text-6xl font-bold italic text-gold-400 mb-6">{italic}</h2>}
    {subheadline && <p className="text-lg text-surface-300 max-w-xl mb-8">{subheadline}</p>}
    <div className="flex gap-4 flex-wrap">
      {cta1 && <a href={cta1.href} className="btn-primary px-6 py-3">{cta1.label}</a>}
      {cta2 && <a href={cta2.href} className="btn-secondary px-6 py-3">{cta2.label}</a>}
    </div>
    {stats && stats.length > 0 && (
      <div className="flex gap-10 mt-12">
        {stats.map((s: any, i: number) => (
          <div key={i}>
            <p className="text-3xl font-bold text-gold-400">{s.value}</p>
            <p className="text-xs text-surface-400 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
    )}
  </section>
);

const FeaturesGrid = ({ eyebrow, heading, features }: any) => (
  <section className="py-20 px-8 bg-background">
    {eyebrow && <p className="text-xs uppercase tracking-widest text-gold-500 mb-2">{eyebrow}</p>}
    {heading && <h2 className="text-4xl font-bold mb-12">{heading}</h2>}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {(features ?? []).map((f: any, i: number) => (
        <div key={i} className="bg-surface-100 rounded-2xl p-6 border border-surface-200">
          {f.icon && <span className="text-3xl mb-4 block">{f.icon}</span>}
          <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
          <p className="text-surface-600 text-sm">{f.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const PricingBlock = ({ eyebrow, heading, plans }: any) => (
  <section className="py-20 px-8 bg-surface-900 text-white">
    {eyebrow && <p className="text-xs uppercase tracking-widest text-gold-400 mb-2">{eyebrow}</p>}
    {heading && <h2 className="text-4xl font-bold mb-12">{heading}</h2>}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
      {(plans ?? []).map((p: any, i: number) => (
        <div key={i} className={`rounded-2xl p-8 border ${p.featured ? 'border-gold-400 bg-surface-800' : 'border-surface-700 bg-surface-800/50'}`}>
          {p.featured && <span className="text-xs bg-gold-400 text-black px-2 py-1 rounded mb-4 inline-block font-semibold">Most Popular</span>}
          <h3 className="text-2xl font-bold">{p.name}</h3>
          <p className="text-gold-400 text-4xl font-bold mt-2">{p.rate}</p>
          <p className="text-surface-400 text-sm mb-6">{p.description}</p>
          <ul className="space-y-2">
            {(p.features ?? []).map((f: string, j: number) => (
              <li key={j} className="flex items-center gap-2 text-sm"><span className="text-gold-400">&bull;</span>{f}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

const TestimonialsBlock = ({ eyebrow, heading, testimonials }: any) => (
  <section className="py-20 px-8">
    {eyebrow && <p className="text-xs uppercase tracking-widest text-gold-500 mb-2">{eyebrow}</p>}
    {heading && <h2 className="text-4xl font-bold mb-12">{heading}</h2>}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {(testimonials ?? []).map((t: any, i: number) => (
        <blockquote key={i} className="bg-surface-50 border border-surface-200 rounded-2xl p-6">
          <p className="text-surface-700 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
          <footer className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-200 flex items-center justify-center font-bold text-gold-700">{t.name?.[0]}</div>
            <div>
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-surface-500">{t.location}</p>
            </div>
          </footer>
        </blockquote>
      ))}
    </div>
  </section>
);

const CallToAction = ({ heading, subheading, buttonLabel, buttonHref, variant }: any) => (
  <section className={`py-20 px-8 text-center ${variant === 'dark' ? 'bg-surface-900 text-white' : 'bg-gold-50'}`}>
    {heading && <h2 className="text-4xl font-bold mb-4">{heading}</h2>}
    {subheading && <p className="text-surface-500 mb-8 max-w-lg mx-auto">{subheading}</p>}
    {buttonLabel && <a href={buttonHref ?? '#'} className="btn-primary px-8 py-4 text-lg">{buttonLabel}</a>}
  </section>
);

const TextBlock = ({ content, align, size }: any) => (
  <div className={`py-8 px-8 text-${align ?? 'left'} text-${size ?? 'base'} text-surface-700 max-w-3xl`}
    dangerouslySetInnerHTML={{ __html: content ?? '' }} />
);

const HeadingBlock = ({ text, level, align, color }: any) => {
  const Tag = (`h${level ?? 2}`) as any;
  return <Tag className={`font-bold py-4 px-8 text-${align ?? 'left'} text-${color ?? 'foreground'}`}>{text}</Tag>;
};

const ImageBlock = ({ src, alt, caption, rounded }: any) => (
  <figure className="px-8 py-4">
    {src && <img src={src} alt={alt ?? ''} className={`w-full object-cover ${rounded ? 'rounded-2xl' : ''}`} />}
    {caption && <figcaption className="text-center text-sm text-surface-500 mt-2">{caption}</figcaption>}
  </figure>
);

const SpacerBlock = ({ size }: any) => <div style={{ height: `${size ?? 40}px` }} />;
const DividerBlock = ({ color }: any) => <hr className="mx-8" style={{ borderColor: color ?? 'var(--color-surface-200)' }} />;

// ─── Puck Config ───────────────────────────────────────────────────────────

const config: Config = {
  components: {
    HeroSection: {
      label: 'Hero Section',
      fields: {
        badge: { type: 'text', label: 'Badge text' },
        headline: { type: 'text', label: 'Headline' },
        italic: { type: 'text', label: 'Italic line' },
        subheadline: { type: 'textarea', label: 'Subheadline' },
        cta1: { type: 'object', label: 'CTA 1', objectFields: { label: { type: 'text' }, href: { type: 'text' } } },
        cta2: { type: 'object', label: 'CTA 2', objectFields: { label: { type: 'text' }, href: { type: 'text' } } },
        stats: { type: 'array', label: 'Stats', arrayFields: { value: { type: 'text' }, label: { type: 'text' } } },
      },
      defaultProps: {
        badge: "MALTA'S PREMIER PROPERTY MANAGEMENT",
        headline: 'Your Home in Malta,',
        italic: 'Looked After Like a Hotel',
        subheadline: 'Handpicked luxury accommodations across Malta\'s most sought-after locations.',
        cta1: { label: 'List Your Property', href: '/owners' },
        cta2: { label: 'Book a Stay', href: '/properties' },
        stats: [
          { value: '9+', label: 'Years Superhost' },
          { value: '100%', label: 'Response Rate' },
          { value: '4.9', label: 'Average Rating' },
        ],
      },
      render: HeroSection,
    },
    FeaturesGrid: {
      label: 'Features Grid',
      fields: {
        eyebrow: { type: 'text', label: 'Eyebrow label' },
        heading: { type: 'text', label: 'Heading' },
        features: { type: 'array', label: 'Features', arrayFields: { icon: { type: 'text' }, title: { type: 'text' }, description: { type: 'textarea' } } },
      },
      defaultProps: {
        eyebrow: 'THE DIFFERENCE',
        heading: 'Why Property Owners Choose Us',
        features: [
          { icon: '👥', title: '24/7 Guest Support', description: 'Round-the-clock support for every guest.' },
          { icon: '📈', title: 'Dynamic Pricing', description: 'AI-powered pricing to maximise revenue.' },
          { icon: '🧹', title: 'Pro Cleaning', description: 'Hotel-standard cleaning between every stay.' },
        ],
      },
      render: FeaturesGrid,
    },
    Pricing: {
      label: 'Pricing Plans',
      fields: {
        eyebrow: { type: 'text', label: 'Eyebrow' },
        heading: { type: 'text', label: 'Heading' },
        plans: { type: 'array', label: 'Plans', arrayFields: {
          name: { type: 'text' }, rate: { type: 'text' }, description: { type: 'text' },
          featured: { type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
          features: { type: 'array', arrayFields: { value: { type: 'text', label: 'Feature' } } },
        }},
      },
      defaultProps: {
        eyebrow: 'TRANSPARENT PRICING',
        heading: 'Simple, Performance-Based Fees',
        plans: [
          { name: 'Essentials', rate: '15%', description: 'Per booking, no monthly fee.', featured: false, features: [{ value: 'Dynamic pricing' }, { value: 'Guest screening' }, { value: 'Monthly reports' }] },
          { name: 'Complete', rate: '18%', description: 'Full management, all-inclusive.', featured: true, features: [{ value: 'Everything in Essentials' }, { value: '24/7 guest support' }, { value: 'Pro cleaning' }, { value: 'Maintenance coordination' }] },
        ],
      },
      render: PricingBlock,
    },
    Testimonials: {
      label: 'Testimonials',
      fields: {
        eyebrow: { type: 'text' },
        heading: { type: 'text' },
        testimonials: { type: 'array', arrayFields: { quote: { type: 'textarea' }, name: { type: 'text' }, location: { type: 'text' } } },
      },
      defaultProps: {
        eyebrow: 'OWNER REVIEWS',
        heading: 'Trusted by Property Owners Across Malta',
        testimonials: [
          { quote: 'Revenue increased by 40% in the first 3 months.', name: 'Marco R.', location: 'St Julian\'s' },
          { quote: 'Completely hands-off for me. Exceptional guests every time.', name: 'Sophie L.', location: 'Sliema' },
          { quote: 'The reporting is transparent and detailed. I always know what\'s happening.', name: 'Anton B.', location: 'Valletta' },
        ],
      },
      render: TestimonialsBlock,
    },
    CallToAction: {
      label: 'Call to Action',
      fields: {
        heading: { type: 'text' },
        subheading: { type: 'textarea' },
        buttonLabel: { type: 'text' },
        buttonHref: { type: 'text' },
        variant: { type: 'select', options: [{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }] },
      },
      defaultProps: { heading: 'Ready to Maximise Your Property?', subheading: 'Join Malta\'s most trusted property management service.', buttonLabel: 'Get Started', buttonHref: '/contact', variant: 'dark' },
      render: CallToAction,
    },
    Text: { label: 'Text', fields: { content: { type: 'textarea' }, align: { type: 'select', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }] }, size: { type: 'select', options: [{ label: 'Base', value: 'base' }, { label: 'Large', value: 'lg' }, { label: 'Small', value: 'sm' }] } }, defaultProps: { content: 'Edit this text block...', align: 'left', size: 'base' }, render: TextBlock },
    Heading: { label: 'Heading', fields: { text: { type: 'text' }, level: { type: 'select', options: [{ label: 'H1', value: 1 }, { label: 'H2', value: 2 }, { label: 'H3', value: 3 }] }, align: { type: 'select', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }] } }, defaultProps: { text: 'New Heading', level: 2, align: 'left' }, render: HeadingBlock },
    Image: { label: 'Image', fields: { src: { type: 'text' }, alt: { type: 'text' }, caption: { type: 'text' }, rounded: { type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] } }, defaultProps: { src: '', alt: '', caption: '', rounded: true }, render: ImageBlock },
    Spacer: { label: 'Spacer', fields: { size: { type: 'number' } }, defaultProps: { size: 40 }, render: SpacerBlock },
    Divider: { label: 'Divider', fields: { color: { type: 'text' } }, defaultProps: { color: '#e2e8f0' }, render: DividerBlock },
  },
};

// ─── Default page data ────────────────────────────────────────────────────

const HOME_DEFAULT: Data = {
  content: [
    { type: 'HeroSection', props: { id: 'hero-1', ...config.components.HeroSection.defaultProps } },
    { type: 'FeaturesGrid', props: { id: 'features-1', ...config.components.FeaturesGrid.defaultProps } },
    { type: 'Pricing', props: { id: 'pricing-1', ...config.components.Pricing.defaultProps } },
    { type: 'Testimonials', props: { id: 'testimonials-1', ...config.components.Testimonials.defaultProps } },
    { type: 'CallToAction', props: { id: 'cta-1', ...config.components.CallToAction.defaultProps } },
  ],
  root: { props: { title: 'Home' } },
};

const PAGES: Record<string, { label: string; defaultData: Data }> = {
  home: { label: 'Home', defaultData: HOME_DEFAULT },
  about: { label: 'About', defaultData: { content: [], root: { props: { title: 'About' } } } },
  properties: { label: 'Properties', defaultData: { content: [], root: { props: { title: 'Properties' } } } },
  owners: { label: 'Owners', defaultData: { content: [], root: { props: { title: 'Owners' } } } },
};

// ─── Admin Page ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const [activePage, setActivePage] = useState('home');
  const [pageData, setPageData] = useState<Record<string, Data>>(
    Object.fromEntries(Object.entries(PAGES).map(([k, v]) => [k, v.defaultData]))
  );

  const handlePublish = useCallback((data: Data) => {
    setPageData((prev) => ({ ...prev, [activePage]: data }));
    // In production: POST to /api/cms/pages with { page: activePage, data }
    console.log('Published:', activePage, data);
    alert(`Page "${PAGES[activePage].label}" saved!`);
  }, [activePage]);

  return (
    <div className="flex flex-col h-screen">
      {/* Page Selector Bar */}
      <div className="bg-surface-900 text-white flex items-center gap-1 px-4 py-2 border-b border-surface-700 z-50">
        <span className="font-bold text-gold-400 mr-4">Studio Pro</span>
        {Object.entries(PAGES).map(([key, page]) => (
          <button
            key={key}
            onClick={() => setActivePage(key)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
              activePage === key ? 'bg-gold-400 text-black' : 'text-surface-300 hover:text-white hover:bg-surface-700'
            }`}
          >
            {page.label}
          </button>
        ))}
      </div>

      {/* Puck Editor */}
      <div className="flex-1 overflow-hidden">
        <Puck
          key={activePage}
          config={config}
          data={pageData[activePage]}
          onPublish={handlePublish}
        />
      </div>
    </div>
  );
}
