/** Decorative lime brush shapes. `variant` picks the silhouette. */
const PATHS = {
  hero: 'M120 40 L330 0 L300 90 L560 40 L470 190 L600 230 L430 330 L560 470 L360 440 L420 620 L230 520 L150 700 L110 480 L0 420 L120 320 L20 200 L170 190 Z',
  cta: 'M0 90 L190 0 L150 90 L360 30 L290 160 L420 200 L250 280 L340 400 L150 360 L120 470 L60 340 L0 380 Z',
};
export default function BrushStroke({ variant = 'hero', className = '' }) {
  const viewBox = variant === 'hero' ? '0 0 600 700' : '0 0 420 470';
  return <svg className={`gmh-brush ${className}`.trim()} viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d={PATHS[variant]} fill="#CCFF00" /></svg>;
}
