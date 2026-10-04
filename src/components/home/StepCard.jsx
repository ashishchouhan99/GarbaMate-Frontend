import { ArrowRight } from 'lucide-react';

export default function StepCard({ number, icon: Icon, title, text, showArrow }) {
  return <div className="gmh-step">
    <span className="gmh-step__number" aria-hidden="true">{number}</span>
    <Icon size={34} strokeWidth={1.5} aria-hidden="true" />
    <h3>{title}</h3>
    <p>{text}</p>
    {showArrow && <ArrowRight className="gmh-step__arrow" size={22} aria-hidden="true" />}
  </div>;
}
