import CloudinaryImage from './CloudinaryImage';

export default function Testimonials({ testimonials }) {
  return <section className="gm-section gm-testimonials"><div className="gm-section-heading gm-centered"><span className="gm-section-kicker">From the circle</span><h2>Made for the Navratri community</h2></div><div className="gm-testimonial-grid">{testimonials.map((item) => <article className="gm-testimonial" key={item.name}><span className="gm-quote-mark">“</span><p>{item.quote}</p><div><CloudinaryImage publicId={item.image} alt="" width={96} height={96} /><strong>{item.name}</strong><small>{item.detail}</small></div></article>)}</div></section>;
}
