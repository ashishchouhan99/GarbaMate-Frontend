import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { apiError, toast } from '../lib/toast';
import { useAuth } from '../context/AuthContext';

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
  const { user: currentUser } = useAuth();
  const purpose = location.pathname.endsWith('/listing') ? 'PROFILE_LISTING' : 'PROFILE_ACCESS';
  const [state, setState] = useState({ loading: true, paying: false, error: '', mockReady: false, amount: null });

  useEffect(() => {
    api.get('/payments/access').then(({ data }) => {
      if (purpose === 'PROFILE_ACCESS' && data.hasAccess) navigate('/partners', { replace: true });
      if (purpose === 'PROFILE_LISTING' && data.isListed) navigate('/dashboard', { replace: true });
      setState((current) => ({ ...current, amount: data.prices?.[purpose] ?? null }));
    }).catch(() => {}).finally(() => setState((current) => ({ ...current, loading: false })));
  }, [navigate, purpose]);

  const pay = async () => {
    setState((current) => ({ ...current, loading: false, paying: true, error: '', mockReady: false }));
    try {
      const { data: order } = await api.post('/payments/create-order', { purpose });
      if (order.mode === 'mock') {
        setState((current) => ({ ...current, loading: false, paying: false, error: '', mockReady: true }));
        return;
      }
      await loadRazorpay();
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'GarbaMate',
        description: purpose === 'PROFILE_LISTING' ? 'Garba partner listing' : 'Garba partner access',
        order_id: order.orderId,
        handler: async (response) => {
          try {
            await api.post('/payments/verify', response);
            toast.success('Payment successful.'); navigate(purpose === 'PROFILE_LISTING' ? '/dashboard' : '/partners', { replace: true });
          } catch (error) {
            const message = apiError(error, "We couldn't verify your payment. Please contact support before retrying."); setState((current) => ({ ...current, loading: false, paying: false, error: message, mockReady: false })); toast.error(message);
          }
        },
        modal: { ondismiss: () => { setState((current) => ({ ...current, paying: false, error: 'Payment was cancelled. You can retry whenever you are ready.' })); toast.info('Payment was cancelled.'); } },
        prefill: {
          name: currentUser?.name || '',
          email: currentUser?.email || '',
          contact: currentUser?.phone || '',
        },
        theme: { color: '#7A0C2E' },
      });
      checkout.on('payment.failed', () => { setState((current) => ({ ...current, loading: false, paying: false, error: 'Payment failed. No access or listing was granted.', mockReady: false })); toast.error('Payment failed. Please try again.'); });
      checkout.open();
    } catch (error) {
      const message = apiError(error, 'Unable to start payment. Please try again.'); setState((current) => ({ ...current, loading: false, paying: false, error: message, mockReady: false })); toast.error(message);
    }
  };

  const completeMock = async (outcome) => {
    setState((current) => ({ ...current, paying: true, error: '' }));
    try {
      await api.post('/payments/mock-complete', { purpose, outcome });
      if (outcome === 'success') { toast.success('Payment successful.'); navigate(purpose === 'PROFILE_LISTING' ? '/dashboard' : '/partners', { replace: true }); }
    } catch (error) {
      const message = apiError(error, 'Payment failed. Please try again.'); setState((current) => ({ ...current, loading: false, paying: false, error: message, mockReady: true })); toast.error(message);
    }
  };

  if (state.loading) return <div className="payment-state"><p>Checking your GarbaMate access…</p></div>;
  return <div className="payment-page"><p className="font-semibold uppercase tracking-[.2em] text-magenta">One small step</p><h1 className="mt-2 font-display text-4xl font-bold text-maroon">{purpose === 'PROFILE_LISTING' ? 'Make your profile live' : 'Unlock your Garba circle'}</h1><p className="mt-3 max-w-xl text-slate-600">{purpose === 'PROFILE_LISTING' ? 'Complete payment to publish your partner profile to the GarbaMate community.' : 'Complete one secure payment to browse partner details and connect for Navratri.'}</p><div className="payment-card"><p className="text-sm text-slate-500">{purpose === 'PROFILE_LISTING' ? 'Partner listing' : 'Community access'}</p><strong>{state.amount === null ? '—' : `₹${state.amount}`}</strong><span>one-time payment</span><button type="button" disabled={state.paying || state.mockReady || state.amount === null} onClick={pay} className="mt-5 w-full rounded-full bg-maroon px-5 py-3 font-bold text-white">{state.paying ? 'Opening secure checkout…' : 'Continue to secure payment'}</button>{state.mockReady && <div className="mt-5 rounded-xl border border-marigold/40 bg-cream p-4"><p className="text-sm font-bold text-maroon">Development mock mode</p><p className="mt-1 text-xs text-slate-600">This does not contact Razorpay or mark a real payment.</p><div className="mt-3 flex gap-2"><button type="button" disabled={state.paying} onClick={() => completeMock('success')} className="rounded-full bg-marigold px-3 py-2 text-sm font-bold text-maroon">Simulate success</button><button type="button" disabled={state.paying} onClick={() => completeMock('failure')} className="rounded-full border border-maroon/20 px-3 py-2 text-sm font-bold text-maroon">Simulate failure</button></div></div>}{state.error && <p className="mt-4 text-sm text-magenta">{state.error}</p>}</div></div>;
}
