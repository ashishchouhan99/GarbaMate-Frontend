import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import CloudinaryImage from '../components/CloudinaryImage';
import { apiError, toast } from '../lib/toast';

export default function PartnerProfile() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [existingBooking, setExistingBooking] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true, state: { from: location } });
      return;
    }
    api.get(`/partners/${id}`).then(({ data }) => setProfile(data)).catch((error) => {
      if (error.response?.status === 402) navigate('/payment/access', { replace: true, state: { from: location } });
      else { setMessage('This dance partner could not be found.'); toast.error('Unable to load this partner profile.'); }
    });
    api.get(`/reviews/partner/${id}`).then(({ data }) => setReviews(data)).catch(() => {});
    api.get('/bookings/mine').then(({ data }) => {
      setExistingBooking((data.asSeeker || []).find((booking) => String(booking.partnerId?._id || booking.partnerId) === String(id)) || null);
    }).catch(() => {});
  }, [id, location, navigate, token]);

  const book = async (event) => {
    event.preventDefault();
    if (submitting || existingBooking) return;
    setMessage('');
    setSubmitting(true);
    try {
      const { data } = await api.post('/bookings', { partnerId: id, date });
      setExistingBooking(data);
      setMessage('Request sent! You can follow its status in your dashboard.'); toast.success('Booking request sent successfully.');
    } catch (error) {
      const message = apiError(error, 'Unable to complete your booking. Please try again.'); setMessage(message); toast.error(message);
    } finally { setSubmitting(false); }
  };

  if (!profile) return <p className="marketplace-loading">{message || 'Loading profile…'}</p>;
  return <div className="marketplace-profile">
    <section className="marketplace-profile-main"><div className="marketplace-profile-hero">{profile.photoUrl ? <img src={profile.photoUrl} alt={`${profile.userId?.name || 'Dance partner'} profile`} /> : <CloudinaryImage publicId="girl.png" alt={`${profile.userId?.name || 'Dance partner'} profile`} width={480} height={600} />}<div><p className="marketplace-meta">{profile.city} · {profile.skillLevel}</p><h1>{profile.userId?.name || 'Dance partner'}{profile.age ? `, ${profile.age}` : ''}</h1><p className="marketplace-profile-summary">{profile.garbaStyle || 'Garba partner'} · {profile.preferredEvent || 'Navratri plans'}</p></div></div><div className="marketplace-profile-section"><h2>About</h2><p>{profile.bio || 'Ready for a memorable Navratri on the dance floor.'}</p></div><div className="marketplace-profile-section"><h2>Availability</h2><p>{profile.availableDates?.length ? `${profile.availableDates.length} date${profile.availableDates.length === 1 ? '' : 's'} available` : 'Availability can be discussed after sending a request.'}</p></div><div className="marketplace-profile-section"><h2>Reviews</h2>{reviews.length ? reviews.map((review) => <div key={review._id} className="marketplace-review"><strong className="text-gold">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</strong><p>{review.comment}</p><small>{review.reviewerId?.name}</small></div>) : <p>No reviews yet.</p>}</div></section>
    <aside className="marketplace-booking"><p className="marketplace-meta">Partner rate</p><strong>₹{profile.price}<small> / night</small></strong><p>{profile.gender} · {profile.skillLevel}</p>{token && existingBooking ? <div className="marketplace-booking-message"><strong>Request sent: {({ pending: 'Pending', confirmed: 'Accepted', rejected: 'Declined', cancelled: 'Cancelled' })[existingBooking.status] || existingBooking.status}</strong>{existingBooking.status === 'confirmed' && <Link to={`/chat/${existingBooking._id}`} className="marketplace-button marketplace-button-primary">Open chat</Link>}</div> : token ? <form onSubmit={book}><label>Choose a date<input required type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={(event) => setDate(event.target.value)} /></label><button disabled={submitting} className="marketplace-button marketplace-button-primary">{submitting ? 'Sending…' : 'Send request'}</button></form> : <Link to="/login" className="marketplace-button marketplace-button-primary">Log in to request</Link>}{message && !existingBooking && <p className="marketplace-booking-message">{message}</p>}</aside>
  </div>;
}
