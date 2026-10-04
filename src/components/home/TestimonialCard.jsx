import { Star } from 'lucide-react';

export default function TestimonialCard({ name, quote, avatar, rating = 5 }) {
  return <figure className="gmh-quote">
    <img src={avatar} alt="" width="48" height="48" loading="lazy" decoding="async" />
    <blockquote>“{quote}”</blockquote>
    <figcaption>— {name}</figcaption>
    <div className="gmh-quote__stars" role="img" aria-label={`${rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill={i < rating ? 'currentColor' : 'none'} />)}</div>
  </figure>;
}
