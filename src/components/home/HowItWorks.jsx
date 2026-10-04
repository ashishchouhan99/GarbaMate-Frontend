import { steps } from '../../data/homeContent';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import StepCard from './StepCard';

export default function HowItWorks({ items = steps }) {
  return <section id="how-it-works" className="gmh-how" aria-labelledby="gmh-how-title">
    <div className="gmh-wrap gmh-how__grid">
      <Reveal><SectionHeading kicker="HOW IT WORKS" title={<span id="gmh-how-title">Simple Steps,<br />Big Dandiya Vibes</span>} text="Get your Garba partner in just 3 easy steps." /></Reveal>
      <ol className="gmh-steps">{items.map((step, index) => <Reveal as="li" key={step.number} delay={index * 110} className="gmh-steps__cell"><StepCard {...step} showArrow={index < items.length - 1} /></Reveal>)}</ol>
    </div>
  </section>;
}
