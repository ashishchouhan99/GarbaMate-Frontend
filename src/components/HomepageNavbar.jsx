import { Link } from 'react-router-dom';

export default function HomepageNavbar() {
  return <div className="gm-home-links" aria-label="Homepage sections"><a href="#how-it-works">How it works</a><a href="#about">About</a><Link to="/partners">Find partners <span>↗</span></Link></div>;
}
