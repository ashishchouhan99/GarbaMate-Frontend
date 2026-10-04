import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

export default function MessageList({ messages, userId, typing }) {
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages.length]);
  return <div className="chat-message-list" aria-live="polite">
    {messages.map((message) => <MessageBubble key={message._id} message={message} mine={String(message.senderId?._id || message.senderId) === String(userId)} />)}
    {typing && <p className="chat-typing">Typing…</p>}
    <span ref={endRef} />
  </div>;
}
