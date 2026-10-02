import EventCard from './EventCard';

export default function EventSection({ events }) {
  return <section id="events" className="gm-section gm-events-section"><div className="gm-section-heading"><div><span className="gm-section-kicker">The calendar is glowing</span><h2>Garba events near you</h2></div><a href="#events" className="gm-text-link">View all events <span>→</span></a></div><div className="gm-event-grid">{events.map((event) => <EventCard key={event.name} event={event} />)}</div></section>;
}
