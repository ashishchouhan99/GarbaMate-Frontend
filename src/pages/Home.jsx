import '../styles/home.css';
import HomeNavbar from '../components/home/HomeNavbar';
import HeroSection from '../components/home/HeroSection';
import HowItWorks from '../components/home/HowItWorks';
import VibeSection from '../components/home/VibeSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FinalCTA from '../components/home/FinalCTA';
import HomeFooter from '../components/home/HomeFooter';

export default function Home() {
  return <div className="gmh">
    <HomeNavbar />
    <main>
      <HeroSection />
      <HowItWorks />
      <VibeSection />
      <TestimonialsSection />
      <FinalCTA />
    </main>
    <HomeFooter />
  </div>;
}
