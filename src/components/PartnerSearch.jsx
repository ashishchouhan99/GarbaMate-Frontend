import { Search, MapPin, CalendarDays, Sparkles } from 'lucide-react';

export default function PartnerSearch() {
  return <section className="gm-search" aria-label="Find a Garba partner">
    <div className="gm-search-heading"><span className="gm-section-kicker">Start here</span><h2>Who are you looking for?</h2><p>Set your vibe and we will do the introductions.</p></div>
    <div className="gm-search-fields">
      <label><MapPin size={17} /> City / Location<input placeholder="Ahmedabad" /></label>
      <label><Sparkles size={17} /> Garba event<select defaultValue=""><option value="">Any event</option><option>Rangilo Raas 2026</option><option>Dandiya Nights</option></select></label>
      <label><CalendarDays size={17} /> Date<input type="date" /></label>
      <label>Dance experience<select defaultValue=""><option value="">Any level</option><option>Beginner</option><option>Intermediate</option><option>Pro</option></select></label>
      <button className="gm-button gm-button-primary"><Search size={17} /> Find Partners</button>
    </div>
  </section>;
}
