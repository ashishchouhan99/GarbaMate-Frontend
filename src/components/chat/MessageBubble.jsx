export default function MessageBubble({ message, mine }) {
  return <div className={`chat-message-row ${mine ? 'is-mine' : 'is-theirs'}`}>
    <div className="chat-bubble"><p>{message.text}</p><small>{new Date(message.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}{mine && <span aria-label={message.readBy?.length > 1 ? 'Read' : 'Sent'}> · {message.readBy?.length > 1 ? 'Read' : 'Sent'}</span>}</small></div>
  </div>;
}
