import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import CloudinaryImage from '../components/CloudinaryImage';
import { apiError, toast } from '../lib/toast';

export default function Chats() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get('/chats').then(({ data }) => setChats(Array.isArray(data) ? data : data.chats || [])).catch((error) => toast.error(apiError(error, 'Unable to load your messages.'))).finally(() => setLoading(false));
  }, []);
  return <div className="chat-page"><div className="chat-page-heading"><p className="font-semibold uppercase tracking-[.2em] text-magenta">Your conversations</p><h1 className="mt-2 font-display text-4xl font-bold text-maroon">Messages</h1></div>{loading ? <p className="marketplace-loading">Loading messages…</p> : chats.length ? <div className="chat-inbox">{chats.map((chat) => <Link to={`/chat/${chat.bookingId || chat._id}`} className="chat-inbox-item" key={chat.bookingId || chat._id}>{chat.photoUrl ? <img src={chat.photoUrl} alt="" /> : <CloudinaryImage publicId="girl.png" alt="" width={64} height={64} />}<div><strong>{chat.otherUser?.name || chat.name || 'GarbaMate member'}</strong><p>{chat.lastMessage?.text || 'Start a conversation'}</p></div>{chat.unreadCount > 0 && <span className="chat-unread">{chat.unreadCount}</span>}</Link>)}</div> : <div className="marketplace-message"><strong>No conversations yet.</strong><span>Chat becomes available after a partner accepts your request.</span></div>}</div>;
}
