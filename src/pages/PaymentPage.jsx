import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    script.onerror = () => reject(new Error('Could not load Razorpay checkout.'));
    document.body.appendChild(script);
  });
}

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const purpose = location.pathname.endsWith('/listing') ? 'PROFILE_LISTING' : 'PROFILE_ACCESS';
  const [state, setState] = useState({ loading: true, paying: false, error: '', mockReady: false });

  useEffect(() => {
    api.get('/payments/access').then(({ data }) => {
      if (purpose === 'PROFILE_ACCESS' && data.hasAccess) navigate('/partners', { replace: true });
      if (purpose === 'PROFILE_LISTING' && data.isListed) navigate('/dashboard', { replace: true });
    }).catch(() => {}).finally(() => setState((current) => ({ ...current, loading: false })));
  }, [navigate, purpose]);

  const pay = async () => {
    setState({ loading: false, paying: true, error: '', mockReady: false });
    try {
      const { data: order } = await api.post('/payments/create-order', { purpose });
      if (order.mode === 'mock') {
        setState({ loading: false, paying: false, error: '', mockReady: true });
        return;
      }
      await loadRazorpay();
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'GarbaJodi',
        description: purpose === 'PROFILE_LISTING' ? 'Garba partner listing' : 'Garba partner access',
        order_id: order.orderId,
        handler: async (response) => {
          try {
            await api.post('/payments/verify', response);
            navigate(purpose === 'PROFILE_LISTING' ? '/dashboard' : '/partners', { replace: true });
          } catch (error) {
            setState({ loading: false, paying: false, error: error.response?.data?.message || 'Payment verification failed. Please contact support before retrying.', mockReady: false });
          }
        },
        modal: { ondismiss: () => setState((current) => ({ ...current, paying: false, error: 'Payment was cancelled. You can retry whenever you are ready.' })) },
        prefill: {},
        theme: { color: '#7A0C2E' },
      });
      checkout.on('payment.failed', () => setState({ loading: false, paying: false, error: 'Payment failed. No access or listing was granted.', mockReady: false }));
      checkout.open();
    } catch (error) {
      setState({ loading: false, paying: false, error: error.response?.data?.message || error.message || 'Could not start payment.', mockReady: false });
    }
  };

  const completeMock = async (outcome) => {
    setState((current) => ({ ...current, paying: true, error: '' }));
    try {
      await api.post('/payments/mock-complete', { purpose, outcome });
      if (outcome === 'success') navigate(purpose === 'PROFILE_LISTING' ? '/dashboard' : '/partners', { replace: true });
    } catch (error) {
      setState({ loading: false, paying: false, error: error.response?.data?.message || 'Mock payment failed.', mockReady: true });
    }
  };

  if (state.loading) return <div className="payment-state"><p>Checking your GarbaJodi access…</p></div>;
  return <div className="payment-page"><p className="font-semibold uppercase tracking-[.2em] text-magenta">One small step</p><h1 className="mt-2 font-display text-4xl font-bold text-maroon">{purpose === 'PROFILE_LISTING' ? 'Make your profile live' : 'Unlock your Garba circle'}</h1><p className="mt-3 max-w-xl text-slate-600">{purpose === 'PROFILE_LISTING' ? 'Complete payment to publish your partner profile to the GarbaJodi community.' : 'Complete one secure payment to browse partner details and connect for Navratri.'}</p><div className="payment-card"><p className="text-sm text-slate-500">{purpose === 'PROFILE_LISTING' ? 'Partner listing' : 'Community access'}</p><strong>₹{purpose === 'PROFILE_LISTING' ? '149' : '99'}</strong><span>one-time payment</span><button type="button" disabled={state.paying || state.mockReady} onClick={pay} className="mt-5 w-full rounded-full bg-maroon px-5 py-3 font-bold text-white">{state.paying ? 'Opening secure checkout…' : 'Continue to secure payment'}</button>{state.mockReady && <div className="mt-5 rounded-xl border border-marigold/40 bg-cream p-4"><p className="text-sm font-bold text-maroon">Development mock mode</p><p className="mt-1 text-xs text-slate-600">This does not contact Razorpay or mark a real payment.</p><div className="mt-3 flex gap-2"><button type="button" disabled={state.paying} onClick={() => completeMock('success')} className="rounded-full bg-marigold px-3 py-2 text-sm font-bold text-maroon">Simulate success</button><button type="button" disabled={state.paying} onClick={() => completeMock('failure')} className="rounded-full border border-maroon/20 px-3 py-2 text-sm font-bold text-maroon">Simulate failure</button></div></div>}{state.error && <p className="mt-4 text-sm text-magenta">{state.error}</p>}</div></div>;
}
