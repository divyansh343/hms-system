import HeroSection from '@/components/home/hero';
import { Container } from '../components/ui/containers';
import FeaturesSection from '@/components/home/feature-section';
import Flex from '@/components/home/flex';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <Flex />
    </div>
  );
};

export default Home;
