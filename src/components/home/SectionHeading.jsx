export default function SectionHeading({ kicker, title, text, as: Tag = 'h2', light = false, className = '' }) {
  return <div className={`gmh-heading ${light ? 'gmh-heading--light' : ''} ${className}`.trim()}>
    {kicker && <p className="gmh-kicker">{kicker}</p>}
    <Tag>{title}</Tag>
    {text && <p className="gmh-heading__text">{text}</p>}
  </div>;
}
