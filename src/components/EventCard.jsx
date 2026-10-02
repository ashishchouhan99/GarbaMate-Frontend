import { CalendarDays, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return <article className={`gm-event-card gm-event-${event.tone}`}><div className="gm-event-art"><span>✦</span><span>◌</span><span>✧</span><strong>गरबा</strong></div><div className="gm-event-body"><div className="gm-event-date"><CalendarDays size={15} /> {event.date}</div><h3>{event.name}</h3><p><MapPin size={14} /> {event.location}</p><p className="gm-event-time">{event.time}</p><div className="gm-event-footer"><span><Users size={15} /> {event.attendees} people joining</span><Link to="/partners" aria-label={`Find partners for ${event.name}`}>Find partners <span>→</span></Link></div></div></article>;
}
