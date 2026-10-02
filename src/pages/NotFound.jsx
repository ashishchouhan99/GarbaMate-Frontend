import { Link } from 'react-router-dom';

export default function NotFound(){return <div className="py-20 text-center"><p className="font-display text-7xl font-bold text-marigold">404</p><h1 className="mt-3 font-display text-3xl font-bold text-maroon">This dance step went off-script</h1><Link to="/" className="mt-7 inline-block rounded-full bg-maroon px-6 py-3 font-bold text-white">Back to home</Link></div>}
