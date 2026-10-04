import { trustFeatures } from '../../data/homeContent';
import TrustFeature from './TrustFeature';

export default function TrustFeatures({ features = trustFeatures }) {
  return <ul id="about" className="gmh-trust" aria-label="Why Garbamate">{features.map((feature) => <TrustFeature key={feature.title} {...feature} />)}</ul>;
}
