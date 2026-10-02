import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import CloudinaryImage from '../components/CloudinaryImage';

export default function BrowsePartners() {
  const [params, setParams] = useSearchParams();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true, state: { from: { pathname: '/partners', search: location.search } } });
      return undefined;
    }
    setLoading(true);
    api.get('/partners', { params: Object.fromEntries(params) }).then(({ data }) => {
      setPartners(data);
      setError('');
    }).catch((requestError) => {
      if (requestError.response?.status === 402) navigate('/payment/access', { replace: true, state: { from: location } });
      else if (requestError.response?.status === 401) navigate('/login', { replace: true, state: { from: location } });
      else setError('Could not load dancers. Is the API running?');
    }).finally(() => setLoading(false));
  }, [location, navigate, params, token]);

  const change = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next);
  };

  return <div className="marketplace-page">
    <div className="marketplace-heading"><div><p className="font-semibold uppercase tracking-[.2em] text-magenta">The dance floor is waiting</p><h1 className="mt-2 font-display text-4xl font-bold text-maroon">Find your dance partner</h1><p className="marketplace-subtitle">Browse active Garba partners and find the right fit for your Navratri plans.</p></div>{!loading && !error && <span className="marketplace-count">{partners.length} {partners.length === 1 ? 'partner' : 'partners'} found</span>}</div>
    <div className="marketplace-filters grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <label className="filter-label"><Search size={16} /> City<input placeholder="e.g. Ahmedabad" value={params.get('city') || ''} onChange={(event) => change('city', event.target.value)} /></label>
      <label className="filter-label">Date<input type="date" value={params.get('date') || ''} onChange={(event) => change('date', event.target.value)} /></label>
      <label className="filter-label">Gender<select value={params.get('gender') || ''} onChange={(event) => change('gender', event.target.value)}><option value="">Any</option><option>Woman</option><option>Man</option><option>Non-binary</option></select></label>
      <label className="filter-label">Level<select value={params.get('skillLevel') || ''} onChange={(event) => change('skillLevel', event.target.value)}><option value="">Any level</option><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="pro">Pro</option></select></label>
      <label className="filter-label">Max ₹ / night<input type="number" min="0" placeholder="Any price" value={params.get('maxPrice') || ''} onChange={(event) => change('maxPrice', event.target.value)} /></label>
    </div>
    {loading ? <p className="marketplace-loading">Finding your mate…</p> : error ? <div className="marketplace-message"><strong>Unable to load partners.</strong><span>Please try again.</span><button type="button" onClick={() => window.location.reload()}>Retry</button></div> : partners.length ? <div className="marketplace-grid">{partners.map((partner) => <article className="marketplace-card" key={partner._id}><div className="marketplace-card-photo">{partner.photoUrl ? <img src={partner.photoUrl} alt={`${partner.userId?.name || 'Dance partner'} profile`} /> : <CloudinaryImage publicId="girl.png" alt={`${partner.userId?.name || 'Dance partner'} profile`} width={480} height={600} />}</div><div className="marketplace-card-body"><p className="marketplace-meta">{partner.city} · {partner.skillLevel}</p><h2>{partner.userId?.name || 'Dance partner'}{partner.age ? `, ${partner.age}` : ''}</h2><p className="marketplace-bio">{partner.bio || 'Ready for a memorable Navratri on the dance floor.'}</p><div className="marketplace-card-footer"><span>{partner.price ? `₹${partner.price} / night` : 'Available for Navratri'}</span><Link to={`/partners/${partner._id}`} className="marketplace-button">View profile</Link></div></div></article>)}</div> : <div className="marketplace-message"><strong>No active partner profiles match those filters.</strong><span>Try widening your search or check back soon.</span></div>}
  </div>;
}
