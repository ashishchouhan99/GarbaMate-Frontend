import PartnerCard from './PartnerCard';

export default function PartnerGrid({ partners }) {
  return <div className="gm-partner-grid">{partners.map((partner) => <PartnerCard key={partner.name} partner={partner} />)}</div>;
}
