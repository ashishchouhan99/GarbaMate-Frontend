export default function TrustFeature({ icon: Icon, title, text }) {
  return <li className="gmh-trust__item"><Icon size={28} strokeWidth={1.6} aria-hidden="true" /><strong>{title}</strong><span>{text}</span></li>;
}
