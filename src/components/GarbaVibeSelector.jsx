import garbaWomanDandiya from '../assets/garba-woman-dandiya.jpg';
import garbaWomanBack from '../assets/garba-woman-back.jpg';
import dandiyaSticks from '../assets/dandiya-sticks.jpg';
import garbaUmbrellas from '../assets/garba-umbrellas.jpg';
import garbaFestivalNight from '../assets/garba-festival-night.jpg';

export default function GarbaVibeSelector({ vibes }) {
  const imagePaths = [garbaWomanDandiya, garbaWomanBack, dandiyaSticks, garbaUmbrellas, garbaFestivalNight];
  return <section className="gm-section gm-vibes"><div className="gm-section-heading gm-centered"><span className="gm-section-kicker">A little about your rhythm</span><h2>What&apos;s your Garba vibe?</h2><p>There is no wrong way to show up.</p></div><div className="gm-vibe-grid">{vibes.map((vibe, index) => <div className="garba-card" key={vibe.title}><img src={imagePaths[index]} alt={`${vibe.title} Garba image`} className="garba-card-image" /><div className="garba-card-overlay"><h3>{vibe.title}</h3><p>{vibe.text}</p></div></div>)}</div></section>;
}
