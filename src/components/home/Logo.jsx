import { Link } from 'react-router-dom';

export default function Logo({ tone = 'dark', onClick }) {
  return <Link to="/" onClick={onClick} className={`gmh-logo gmh-logo--${tone}`} aria-label="Garbamate home">
    <svg className="gmh-logo__sticks" viewBox="0 0 28 28" aria-hidden="true"><path d="M4 24 15 3" stroke="#FF6A00" strokeWidth="3" strokeLinecap="round" /><path d="M12 25 24 6" stroke="#CCFF00" strokeWidth="3" strokeLinecap="round" /></svg>
    <span>Garbamate</span>
  </Link>;
}
