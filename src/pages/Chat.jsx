import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { apiError, toast } from '../lib/toast';
import { connectSocket } from '../services/socket';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import ChatInput from '../components/chat/ChatInput';
import '../styles/chat.css';

export default function Chat() {
  const { bookingId } = useParams();
  const { user } = useAuth();
  const [chat, setChat] = useState({ bookingId, status: 'confirmed' });
  const [messages, setMessages] = useState([]);
  const [before, setBefore] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState('');
  const [socketState, setSocketState] = useState('connecting');
  const socketRef = useRef(null);
  const merge = useCallback((incoming) => setMessages((current) => current.some((item) => item._id === incoming._id) ? current : [...current, incoming].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))), []);
  const load = useCallback(async (cursor = null) => {
    const query = cursor ? { before: cursor, limit: 30 } : { limit: 30 };
    const { data } = await api.get(`/bookings/${bookingId}/messages`, { params: query });
    const page = Array.isArray(data) ? data : data.messages || [];
    setMessages((current) => cursor ? [...page, ...current.filter((item) => !page.some((older) => older._id === item._id))] : page);
    if (!cursor && !Array.isArray(data)) setChat((value) => ({ ...value, status: data.status, expired: data.expired }));
    if (!cursor) api.post(`/bookings/${bookingId}/messages/read`).catch(() => {});
    setHasMore(Boolean(data.hasMore));
    setBefore(page[0]?.createdAt || null);
  }, [bookingId]);
  useEffect(() => { load().catch((requestError) => setError(apiError(requestError, 'Chat is not available yet.'))); }, [load]);
  useEffect(() => {
    api.get('/chats').then(({ data }) => {
      const chats = Array.isArray(data) ? data : data.chats || [];
      const current = chats.find((item) => String(item.bookingId || item._id) === String(bookingId));
      if (current) setChat((value) => ({ ...value, ...current }));
    }).catch(() => {});
  }, [bookingId]);
  useEffect(() => {
    const socket = connectSocket();
    socketRef.current = socket;
    socket.on('connect', () => setSocketState('connected'));
    socket.on('disconnect', () => setSocketState('offline'));
    socket.on('connect_error', () => setSocketState('offline'));
    socket.on('message', (message) => merge(message));
    socket.on('typing', ({ bookingId: room, typing: isTyping }) => { if (room === bookingId) setTyping(isTyping); });
    socket.emit('join', bookingId, (response) => { if (response?.error || response?.ok === false) setError(response.error || response.message); });
    const poll = window.setInterval(() => { if (socket.disconnected) load().catch(() => {}); }, 5000);
    return () => { window.clearInterval(poll); socket.emit('leave', { bookingId }); socket.disconnect(); socketRef.current = null; };
  }, [bookingId, load, merge]);
  const send = async (text) => {
    try {
      if (socketRef.current?.connected) {
        socketRef.current.emit('message', { bookingId, text }, (response) => {
          if (!response?.ok) toast.error(response?.message || 'Unable to send your message.');
        });
      } else {
        const { data } = await api.post(`/bookings/${bookingId}/messages`, { text });
        merge(data);
      }
    } catch (requestError) { toast.error(apiError(requestError, 'Unable to send your message.')); }
  };
  const readOnly = chat.status !== 'confirmed' || Boolean(chat.expired);
  const statusText = error || (readOnly ? 'This conversation is read-only.' : socketState === 'offline' ? 'Live updates are unavailable; messages will refresh automatically.' : '');
  return <div className="chat-page"><ChatHeader chat={chat} /><div className="chat-card">{statusText && <p className="chat-notice">{statusText}</p>}{hasMore && <button className="chat-load-older" onClick={() => load(before)}>Load older messages</button>}<MessageList messages={messages} userId={user?.id} typing={typing} /><ChatInput disabled={Boolean(error) || readOnly} onSend={send} /></div></div>;
}
