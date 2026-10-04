import { BadgeCheck, CalendarClock, ShieldCheck, Headset, UserSearch, CalendarDays, PartyPopper } from 'lucide-react';
import heroGarbaImage from '../assets/hero-garba.png';
import heroboygarbaImage from '../assets/hero-boy.png';

/** Temporary art. Set to false once real transparent hero/vibe/CTA artwork replaces the files in /public/images/home. */
export const USING_PLACEHOLDER_ART = true;

const img = (name) => `/images/home/${name}.webp`;

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Find Partner', to: '/partners' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const heroImage = { src: heroGarbaImage, alt: 'Illustrated Garba dancer holding dandiya sticks in festive attire' };
export const ctaImage = { src: heroboygarbaImage, alt: 'Illustrated young dancer holding dandiya sticks' };

export const cities = ['Nagpur', 'Ahmedabad', 'Vadodara', 'Surat', 'Rajkot', 'Mumbai', 'Pune'];

export const trustFeatures = [
  { icon: BadgeCheck, title: 'Verified Profiles', text: 'Safe & genuine' },
  { icon: CalendarClock, title: 'Flexible Booking', text: 'Hourly / Event based' },
  { icon: ShieldCheck, title: 'Secure Payments', text: '100% safe & trusted' },
  { icon: Headset, title: 'Dedicated Support', text: "We're here for you" },
];

export const steps = [
  { number: '01', icon: UserSearch, title: 'Browse Profiles', text: 'Explore verified dancers, check photos, ratings & interests.' },
  { number: '02', icon: CalendarDays, title: 'Book Your Partner', text: 'Choose your date, time and make a secure payment.' },
  { number: '03', icon: PartyPopper, title: 'Get Ready to Dance', text: 'Meet, connect and enjoy the Garba night!' },
];

// `to` points at the existing partner listing; add query params here once the API supports a vibe/category filter.
export const partnerCategories = [
  { id: 'traditional', title: 'Traditional', text: 'Classic looks, perfect for cultural events', image: img('vibe-traditional'), to: '/partners' },
  { id: 'modern', title: 'Modern', text: 'Trendy, stylish, full of energy', image: img('vibe-modern'), to: '/partners' },
  { id: 'group', title: 'Group Bookings', text: 'For teams, friends & couples', image: img('vibe-group'), to: '/partners' },
  { id: 'premium', title: 'Premium', text: 'Elite dancers for special events', image: img('vibe-premium'), to: '/partners' },
];

// Placeholder stories. Pass real data to <TestimonialsSection testimonials={...} /> when a backend source exists.
export const testimonials = [
  { id: 't1', name: 'Ananya S.', rating: 5, avatar: img('avatar-ananya'), quote: 'Found my perfect Garba partner for Navratri! Super easy process and she was amazing!' },
  { id: 't2', name: 'Rohan M.', rating: 5, avatar: img('avatar-rohan'), quote: 'The platform is super smooth and all profiles are genuine. Had the best Garba night ever!' },
  { id: 't3', name: 'Priya K.', rating: 5, avatar: img('avatar-priya'), quote: 'Loved the experience! Safe, easy and so much fun. Highly recommend!' },
];

// TODO: replace '#…' with real social URLs.
export const socialLinks = [
  { id: 'instagram', label: 'Instagram', href: '#instagram' },
  { id: 'x', label: 'X', href: '#x' },
  { id: 'youtube', label: 'YouTube', href: '#youtube' },
];

// No dedicated Privacy page exists yet: it is covered by section 13 of the Terms page. Contact scrolls to the footer.
export const footerLinks = [
  { label: 'Privacy', to: '/terms-and-conditions' },
  { label: 'Terms', to: '/terms-and-conditions' },
  { label: 'Contact', href: '#contact' },
];
