import { Link } from 'react-router-dom';
import CloudinaryImage from '../CloudinaryImage';

export default function ChatHeader({ chat }) {
  return <header className="chat-header">
    <Link to="/chats" className="chat-back">← <span>Messages</span></Link>
    <div className="chat-person">{chat.photoUrl ? <img src={chat.photoUrl} alt="" /> : <CloudinaryImage publicId="girl.png" alt="" width={48} height={48} />}<div><h1>{chat.otherUser?.name || chat.name || 'GarbaMate member'}</h1><p>{chat.status === 'confirmed' ? 'Connected for Garba' : 'Chat unavailable'}</p></div></div>
  </header>;
}
