import type { Config } from '@measured/puck';

// ─── Block Definitions ───────────────────────────────────────────────────────

type HeroSectionProps = {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage: string;
};

type StatsBarProps = {
  stats: Array<{ value: string; label: string }>;
};

type FeaturesGridProps = {
  title: string;
  features: Array<{ icon: string; title: string; description: string }>;
};

type PricingProps = {
  title: string;
  plans: Array<{
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted: boolean;
  }>;
};

type TestimonialsProps = {
  title: string;
  testimonials: Array<{ quote: string; author: string; role: string }>;
};

type CallToActionProps = {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  variant: 'amber' | 'dark' | 'white';
};

type HeadingProps = { text: string; level: 'h1' | 'h2' | 'h3' | 'h4'; align: 'left' | 'center' | 'right' };
type TextProps = { content: string; size: 'sm' | 'base' | 'lg' | 'xl'; align: 'left' | 'center' | 'right' };
type ImageProps = { src: string; alt: string; width: number; height: number; rounded: boolean };
type SpacerProps = { size: 'sm' | 'md' | 'lg' | 'xl' };
type DividerProps = { color: string };
type FooterProps = {};

type BlockProps =
  | HeroSectionProps
  | StatsBarProps
  | FeaturesGridProps
  | PricingProps
  | TestimonialsProps
  | CallToActionProps
  | HeadingProps
  | TextProps
  | ImageProps
  | SpacerProps
  | DividerProps
  | FooterProps;

// ─── Puck Config ─────────────────────────────────────────────────────────────

export const puckConfig: Config<Record<string, BlockProps>> = {
  components: {
    HeroSection: {
      label: 'Hero Section',
      fields: {
        headline: { type: 'text', label: 'Headline' },
        subheadline: { type: 'textarea', label: 'Subheadline' },
        ctaText: { type: 'text', label: 'CTA Button Text' },
        ctaHref: { type: 'text', label: 'CTA Button URL' },
        backgroundImage: { type: 'text', label: 'Background Image URL' },
      },
      defaultProps: {
        headline: 'Your Perfect Malta Getaway Starts Here',
        subheadline: 'Handpicked holiday rentals in Malta\'s finest locations.',
        ctaText: 'Browse Properties',
        ctaHref: '/properties',
        backgroundImage: '',
      },
      render: ({ headline, subheadline, ctaText, ctaHref, backgroundImage }) => (
        <section
          className="relative min-h-[560px] flex items-center justify-center bg-gray-900 text-white"
          style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{headline}</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">{subheadline}</p>
            <a href={ctaHref} className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-xl transition">{ctaText}</a>
          </div>
        </section>
      ),
    },

    StatsBar: {
      label: 'Stats Bar',
      fields: {
        stats: {
          type: 'array',
          label: 'Stats',
          arrayFields: {
            value: { type: 'text', label: 'Value' },
            label: { type: 'text', label: 'Label' },
          },
        },
      },
      defaultProps: {
        stats: [
          { value: '50+', label: 'Properties' },
          { value: '500+', label: 'Happy Guests' },
          { value: '5★', label: 'Average Rating' },
          { value: '24/7', label: 'Support' },
        ],
      },
      render: ({ stats }) => (
        <div className="bg-amber-500 py-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="text-amber-100 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    Heading: {
      label: 'Heading',
      fields: {
        text: { type: 'text', label: 'Text' },
        level: { type: 'select', label: 'Level', options: [{ label: 'H1', value: 'h1' }, { label: 'H2', value: 'h2' }, { label: 'H3', value: 'h3' }, { label: 'H4', value: 'h4' }] },
        align: { type: 'radio', label: 'Align', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }] },
      },
      defaultProps: { text: 'Section Heading', level: 'h2', align: 'center' },
      render: ({ text, level: Level, align }) => (
        <div className="py-4 px-4">
          <Level className={`font-bold text-gray-900 text-${align === 'center' ? 'center' : align === 'right' ? 'right' : 'left'} text-2xl md:text-4xl`}>{text}</Level>
        </div>
      ),
    },

    Text: {
      label: 'Text',
      fields: {
        content: { type: 'textarea', label: 'Content' },
        size: { type: 'select', label: 'Size', options: [{ label: 'Small', value: 'sm' }, { label: 'Base', value: 'base' }, { label: 'Large', value: 'lg' }, { label: 'XL', value: 'xl' }] },
        align: { type: 'radio', label: 'Align', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }] },
      },
      defaultProps: { content: 'Your text here...', size: 'base', align: 'left' },
      render: ({ content, size, align }) => (
        <p className={`text-${size} text-gray-700 text-${align} px-4 py-2 max-w-3xl mx-auto`}>{content}</p>
      ),
    },

    Image: {
      label: 'Image',
      fields: {
        src: { type: 'text', label: 'Image URL' },
        alt: { type: 'text', label: 'Alt Text' },
        width: { type: 'number', label: 'Width (px)' },
        height: { type: 'number', label: 'Height (px)' },
        rounded: { type: 'radio', label: 'Rounded', options: [{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }] },
      },
      defaultProps: { src: 'https://placehold.co/800x400', alt: 'Image', width: 800, height: 400, rounded: false },
      render: ({ src, alt, width, height, rounded }) => (
        <div className="flex justify-center py-4 px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} width={width} height={height} className={rounded ? 'rounded-xl' : ''} style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      ),
    },

    Spacer: {
      label: 'Spacer',
      fields: {
        size: { type: 'select', label: 'Size', options: [{ label: 'Small (16px)', value: 'sm' }, { label: 'Medium (32px)', value: 'md' }, { label: 'Large (64px)', value: 'lg' }, { label: 'XL (96px)', value: 'xl' }] },
      },
      defaultProps: { size: 'md' },
      render: ({ size }) => {
        const heights: Record<string, string> = { sm: 'h-4', md: 'h-8', lg: 'h-16', xl: 'h-24' };
        return <div className={heights[size]} />;
      },
    },

    Divider: {
      label: 'Divider',
      fields: {
        color: { type: 'text', label: 'Border Color (Tailwind class, e.g. border-gray-200)' },
      },
      defaultProps: { color: 'border-gray-200' },
      render: ({ color }) => <hr className={`${color} border-t my-4 mx-4`} />,
    },

    CallToAction: {
      label: 'Call to Action',
      fields: {
        headline: { type: 'text', label: 'Headline' },
        subheadline: { type: 'textarea', label: 'Subheadline' },
        ctaText: { type: 'text', label: 'CTA Button Text' },
        ctaHref: { type: 'text', label: 'CTA Button URL' },
        variant: { type: 'select', label: 'Variant', options: [{ label: 'Amber', value: 'amber' }, { label: 'Dark', value: 'dark' }, { label: 'White', value: 'white' }] },
      },
      defaultProps: { headline: 'Ready to Get Started?', subheadline: 'Contact us today.', ctaText: 'Get in Touch', ctaHref: '/contact', variant: 'amber' },
      render: ({ headline, subheadline, ctaText, ctaHref, variant }) => {
        const bg = variant === 'amber' ? 'bg-amber-500' : variant === 'dark' ? 'bg-gray-900' : 'bg-white';
        const text = variant === 'white' ? 'text-gray-900' : 'text-white';
        const btn = variant === 'amber' ? 'bg-white text-amber-600 hover:bg-amber-50' : 'bg-amber-500 text-white hover:bg-amber-600';
        return (
          <section className={`${bg} ${text} py-16 text-center px-4`}>
            <h2 className="text-3xl font-bold mb-3">{headline}</h2>
            <p className="mb-8 opacity-90">{subheadline}</p>
            <a href={ctaHref} className={`${btn} font-semibold px-8 py-3 rounded-xl transition inline-block`}>{ctaText}</a>
          </section>
        );
      },
    },
  },
};

export default puckConfig;
