import { useMemo, useState } from 'react';
import { CalendarDays, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cities } from '../../data/homeContent';

/** Uses the same /partners?city=&date= query contract as the existing PartnerSearch + BrowsePartners filters. */
export default function HeroSearchBar() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ city: '', date: '' });
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const change = ({ target }) => setFilters((current) => ({ ...current, [target.name]: target.value }));
  const submit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => { if (value.trim()) params.set(key, value.trim()); });
    navigate(`/partners${params.toString() ? `?${params}` : ''}`);
  };
  return <form className="gmh-search" role="search" aria-label="Find a Garba partner" onSubmit={submit}>
    <label className="gmh-search__field"><MapPin size={18} aria-hidden="true" /><span className="gmh-sr">Location</span><input name="city" list="gmh-cities" placeholder="Your City" autoComplete="off" value={filters.city} onChange={change} /></label>
    <datalist id="gmh-cities">{cities.map((city) => <option key={city} value={city} />)}</datalist>
    <label className="gmh-search__field"><CalendarDays size={18} aria-hidden="true" /><span className="gmh-sr">Event date</span><input name="date" type="date" min={today} value={filters.date} onChange={change} /></label>
    <button type="submit" className="gmh-search__submit"><Search size={18} aria-hidden="true" />Find Partners</button>
  </form>;
}
