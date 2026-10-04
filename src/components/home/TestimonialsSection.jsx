import { testimonials as defaultTestimonials } from '../../data/homeContent';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import TestimonialCard from './TestimonialCard';

export default function TestimonialsSection({ testimonials = defaultTestimonials }) {
  return <section className="gmh-stories" aria-labelledby="gmh-stories-title">
    <div className="gmh-wrap gmh-stories__grid">
      <Reveal><SectionHeading kicker="REAL STORIES" title={<span id="gmh-stories-title">What Our Users<br />Say</span>} text="Real people. Real vibes. Real Garba stories." /></Reveal>
      <div className="gmh-stories__cards">{testimonials.map((item, index) => <Reveal key={item.id || item.name} delay={index * 100}><TestimonialCard {...item} /></Reveal>)}</div>
    </div>
  </section>;
}
