import { FC } from 'react';
import { motion } from 'framer-motion';
import WebsiteReview from '../../components/WebsiteReview/WebsiteReview';
import { useNavigate } from 'react-router-dom';
import AboutService from './AboutService';
import OurValueSection from './OurValueSection';
import OurTeam from './OurTeam';

type TAboutUsProps = object;

const AboutUs: FC<TAboutUsProps> = () => {
  const navigate = useNavigate();

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      backgroundColor: '#FFA500',
      color: '#FFFFFF',
      boxShadow: '0px 8px 15px rgba(255, 165, 0, 0.4)',
      transition: { duration: 0.4, type: 'spring', stiffness: 100 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[70vh]"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/closeup-warning-car-headlight-being-cleaned-with-foam-car-wash-concept-automotive-maintenance-car-wash-detailing-warning-headlight-cleaning-foam_918839-62752.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>{' '}
        {/* Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-3/4 text-center text-default-50">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-2xl md:text-5xl font-bold mb-4 text-white"
          >
            Quality Car Wash Services You Can Trust
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="text-sm md:text-xl mb-6 text-white "
          >
            We bring the shine back to your ride with precision and care.
          </motion.p>

          <div className="flex gap-4">
            <motion.button
              className="mt-10 h-[45px] z-[999] text-white"
              onClick={() => navigate('/services')}
              style={{
                borderRadius: '9999px',
                border: '2px solid #FFA500',
                padding: '0 24px',
                backgroundColor: 'transparent',
              }}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              Start Now
            </motion.button>
          </div>
        </div>
      </div>

      {/* Services Offered Section */}
      <AboutService />

      {/* Our Values Section */}
      <OurValueSection />

      {/* Our Team */}
      <OurTeam />

      {/* Customer Testimonials */}
      <WebsiteReview />
    </>
  );
};

export default AboutUs;
