const steps = [
  ['01', 'Create your profile', 'Tell us your city, Garba style and the events you are attending.', '✦'],
  ['02', 'Find your circle', 'Discover people who share your Garba vibe and plans.', '◌'],
  ['03', 'Dance together', 'Connect, meet safely and enjoy the celebration.', '♢'],
];

export default function HowItWorks() {
  return <section className="gm-section gm-how"><div className="gm-section-heading gm-centered"><span className="gm-section-kicker">Three easy steps</span><h2>Your Garba night starts here</h2></div><div className="gm-steps">{steps.map(([number, title, text, icon]) => <article key={number} className="gm-step"><span className="gm-step-icon">{icon}</span><span className="gm-step-number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>;
}
