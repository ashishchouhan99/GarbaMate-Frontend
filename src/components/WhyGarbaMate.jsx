import CloudinaryImage from './CloudinaryImage';

const features = [
  ['garba-group-dance.jpg', 'Find your people', 'Meet people who share your love for Garba.'],
  ['garba-festival-night.jpg', 'Local events', 'Discover Navratri events happening around you.'],
  ['garba-couple-festival.jpg', 'Shared vibes', 'Connect around interests, style and event plans.'],
  ['garba-diya.jpg', 'Safe connections', 'Get to know your circle before meeting in person.'],
];

export default function WhyGarbaMate() {
  return <section className="gm-section gm-why"><div className="gm-why-copy"><span className="gm-section-kicker">Made for the community</span><h2>More than just a dance partner</h2><p>GarbaMate brings the warmth of a shared Navratri night to the way you discover people and events.</p></div><div className="gm-feature-grid">{features.map(([image, title, text]) => <article key={title} className="gm-feature"><CloudinaryImage publicId={image} alt="" width={640} height={480} onError={(event) => { event.currentTarget.parentElement.classList.add('is-missing'); event.currentTarget.style.display = 'none'; }} /><span className="gm-feature-placeholder">Image placeholder</span><div className="gm-feature-copy"><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>;
}
