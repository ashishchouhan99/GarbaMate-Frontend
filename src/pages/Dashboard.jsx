import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Check, Eye, Heart, ListPlus, MapPin, MessageCircle, Send, UserRound, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import CloudinaryImage from '../components/CloudinaryImage';

const statusLabels = { pending: 'Pending', confirmed: 'Accepted', rejected: 'Rejected', cancelled: 'Cancelled' };

function photoFor(profile) { return profile?.photoUrl; }
function completionFor(profile) {
  if (!profile) return 0;
  const fields = ['city', 'gender', 'age', 'price', 'bio', 'photoUrl', 'garbaStyle', 'preferredEvent'];
  return Math.round((fields.filter((field) => profile[field]).length / fields.length) * 100);
}
function EmptyState({ icon: Icon, title, text, action }) {
  return <div className="dashboard-empty"><span className="dashboard-empty-icon"><Icon size={20} /></span><div><strong>{title}</strong><p>{text}</p></div>{action}</div>;
}
function StatusPill({ status }) { return <span className={`dashboard-status dashboard-status-${status}`}>{statusLabels[status] || status}</span>; }

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({ asSeeker: [], asPartner: [] });
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const [bookingResponse, profileResponse] = await Promise.all([api.get('/bookings/mine'), api.get('/partners/me')]);
      setData(bookingResponse.data);
      setProfile(profileResponse.data);
      setError('');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not load your dashboard.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { refresh(); }, []);

  const act = async (id, status) => {
    try { await api.patch(`/bookings/${id}/status`, { status }); refresh(); } catch (requestError) { setError(requestError.response?.data?.message || 'Could not update request.'); }
  };
  const stats = useMemo(() => ({ sent: data.asSeeker.length, received: data.asPartner.length, views: profile?.profileViews || 0 }), [data, profile]);
  const completion = completionFor(profile);

  const sentRequests = data.asSeeker.length ? data.asSeeker.map((booking) => <article key={booking._id} className="dashboard-request-card">{photoFor(booking.partnerId) ? <img src={photoFor(booking.partnerId)} alt="" /> : <CloudinaryImage publicId="girl.png" alt="" width={96} height={96} />}<div className="dashboard-request-main"><strong>{booking.partnerId?.userId?.name || 'Dance partner'}</strong><span><CalendarDays size={14} /> {new Date(booking.date).toLocaleDateString()}</span></div><StatusPill status={booking.status} />{booking.partnerId?._id && <Link to={`/partners/${booking.partnerId._id}`} className="dashboard-small-link">View</Link>}{booking.status === 'pending' && <button type="button" onClick={() => act(booking._id, 'cancelled')} className="dashboard-text-button">Cancel</button>}</article>) : <EmptyState icon={Send} title="No requests yet" text="Your GarbaJodi requests will appear here." action={<Link to="/partners" className="dashboard-small-action">Explore partners</Link>} />;
  const receivedRequests = data.asPartner.length ? data.asPartner.map((booking) => <article key={booking._id} className="dashboard-request-card">{photoFor(booking.seekerId) ? <img src={photoFor(booking.seekerId)} alt="" /> : <CloudinaryImage publicId="girl.png" alt="" width={96} height={96} />}<div className="dashboard-request-main"><strong>{booking.seekerId?.name || 'A GarbaJodi member'}</strong><span><CalendarDays size={14} /> {new Date(booking.date).toLocaleDateString()}</span><small>{booking.status === 'pending' ? 'Would love to dance together.' : 'Request updated.'}</small></div><StatusPill status={booking.status} />{booking.status === 'pending' && <div className="dashboard-request-actions"><button type="button" onClick={() => act(booking._id, 'confirmed')} className="dashboard-accept"><Check size={15} /> Accept</button><button type="button" onClick={() => act(booking._id, 'rejected')} className="dashboard-decline"><X size={15} /> Decline</button></div>}</article>) : <EmptyState icon={Heart} title="No requests yet" text="People interested in dancing with you will appear here." action={null} />;

  return <div className="dashboard-page">
    <div className="dashboard-welcome"><div><p className="font-semibold uppercase tracking-[.2em] text-magenta">Your GarbaJodi</p><h1 className="mt-2 font-display text-4xl font-bold text-maroon">Welcome, {user?.name}</h1><p className="dashboard-welcome-copy">Navratri is better with the right people. Find your Garba partner and make this season more special! <span>♡</span></p></div><div className="dashboard-festival-note"><span><CalendarDays size={20} /></span><div><strong>Navratri vibes</strong><small>Get ready to dance!</small></div><span className="dashboard-note-spark">✦</span></div></div>
    <section className="dashboard-profile-summary">{photoFor(profile) ? <img src={photoFor(profile)} alt="Your profile" /> : <CloudinaryImage publicId="girl.png" alt="Your profile" width={96} height={96} />}<div><strong>{user?.name || 'Your profile'}</strong><span>{user?.email}</span><p>Ready for Navratri?</p></div><Link to="/list-yourself" className="dashboard-outline-button">Edit profile <span>→</span></Link></section>
    {error && <p className="mt-4 text-magenta">{error}</p>}
    <section className="dashboard-stats"><article><span className="dashboard-stat-icon dashboard-stat-pink"><Send size={17} /></span><div><strong>{stats.sent}</strong><span>Requests sent</span></div></article><article><span className="dashboard-stat-icon dashboard-stat-gold"><Heart size={17} /></span><div><strong>{stats.received}</strong><span>Requests received</span></div></article><article><span className="dashboard-stat-icon dashboard-stat-maroon"><Eye size={17} /></span><div><strong>{stats.views}</strong><span>Profile views</span></div></article></section>
    {loading ? <p className="dashboard-loading">Loading your GarbaJodi…</p> : <><section className="dashboard-section"><div className="dashboard-section-heading"><h2>Requests you sent</h2><Link to="/partners">Explore partners <span>→</span></Link></div><div className="dashboard-request-list">{sentRequests}</div></section><section className="dashboard-section"><div className="dashboard-section-heading"><h2>Requests for you</h2><span className="dashboard-section-hint">Keep your circle moving</span></div><div className="dashboard-request-list">{receivedRequests}</div></section></>}
    <section className="dashboard-listing-card"><div><span className="dashboard-section-kicker">Your profile</span><h2>Your GarbaJodi Profile</h2><div className="dashboard-progress-label"><span>Profile completion</span><strong>{completion}%</strong></div><div className="dashboard-progress"><span style={{ width: `${completion}%` }} /></div><p className="dashboard-listing-status">Status: <strong>{profile?.listingStatus === 'active' && profile?.isActive ? 'Active' : profile?.listingStatus === 'pending_payment' ? 'Pending payment' : 'Not listed'}</strong></p></div>{profile ? <Link to="/list-yourself" className="dashboard-outline-button">Edit profile <span>→</span></Link> : <div><p className="dashboard-listing-prompt">Want to find a Garba partner too?</p><Link to="/list-yourself" className="dashboard-small-action">Create your profile</Link></div>}</section>
    <section className="dashboard-actions"><span className="dashboard-section-kicker">Keep the rhythm going</span><div><Link to="/partners"><MapPin size={17} /> Find a partner</Link><Link to="/list-yourself"><ListPlus size={17} /> List yourself</Link>{profile?._id && <Link to={`/partners/${profile._id}`}><UserRound size={17} /> View my profile</Link>}</div></section>
  </div>;
}
