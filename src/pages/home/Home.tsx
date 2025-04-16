import { FC } from 'react';
// import Banner from '../../components/banner/Banner';
// import FeaturedServices from '../../components/featuredServices/FeaturedServices';
import WebsiteReview from '../../components/WebsiteReview/WebsiteReview';
import ServiceHighlights from './ServiceHighligts';
import PricingPlans from './PricingPlans';
import ContactUs from '../contact/ContactUs';
import Banner from '../../components/Banner/Banner';
import FeaturedServices from '../../components/FeaturedServices/FeaturedServices';

type THomeProps = object;

const Home: FC<THomeProps> = () => {
  return (
    <>
      <Banner />

      <FeaturedServices />
      <ServiceHighlights />
      <PricingPlans />
      <WebsiteReview />
      <ContactUs />
    </>
  );
};

export default Home;
