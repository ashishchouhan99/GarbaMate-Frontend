import { useEffect, useRef, useState } from 'react';

/** Fades/slides children in once when scrolled into view. Respects prefers-reduced-motion. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSeen(true); return undefined; }
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`gmh-reveal ${seen ? 'is-in' : ''} ${className}`.trim()} style={{ transitionDelay: `${delay}ms` }} {...rest}>{children}</Tag>;
}
