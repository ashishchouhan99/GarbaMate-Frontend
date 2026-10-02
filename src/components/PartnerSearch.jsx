import { useState } from 'react';
import { Search, MapPin, CalendarDays, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PartnerSearch() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    city: '',
    event: '',
    date: '',
    skillLevel: '',
  });

  const change = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    navigate(`/partners${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return <form className="gm-search" aria-label="Find a Garba partner" onSubmit={submit}>
    <div className="gm-search-heading"><span className="gm-section-kicker">Start here</span><h2>Who are you looking for?</h2><p>Set your vibe and we will do the introductions.</p></div>
    <div className="gm-search-fields">
      <label><MapPin size={17} /> City / Location<input name="city" placeholder="Ahmedabad" value={filters.city} onChange={change} /></label>
      <label><Sparkles size={17} /> Garba event<select name="event" value={filters.event} onChange={change}><option value="">Any event</option><option>Rangilo Raas 2026</option><option>Dandiya Nights</option></select></label>
      <label><CalendarDays size={17} /> Date<input name="date" type="date" value={filters.date} onChange={change} /></label>
      <label>Dance experience<select name="skillLevel" value={filters.skillLevel} onChange={change}><option value="">Any level</option><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="pro">Pro</option></select></label>
      <button type="submit" className="gm-button gm-button-primary"><Search size={17} /> Find Partners</button>
    </div>
  </form>;
}
