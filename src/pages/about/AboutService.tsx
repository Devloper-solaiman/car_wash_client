import { motion } from 'framer-motion';
import { FaWater, FaShower, FaBroom } from 'react-icons/fa';
import Container from '../../components/ui/Container';

export default function AboutService() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, type: 'spring', stiffness: 100 },
    }),
  };

  return (
    <Container>
      <motion.div
        className="px-6 md:px-16 z-[9999] mt-10 md:-mt-[150px] relative flex flex-col md:flex-row justify-center gap-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {[
          {
            icon: <FaWater />,
            title: 'Exterior Wash',
            description:
              'A premium wash to remove dirt and grime, leaving your car’s exterior sparkling clean.',
          },
          {
            icon: <FaShower />,
            title: 'Interior Detailing',
            description:
              'A deep clean for your car’s interior, from seats to carpets, restoring a fresh and clean look.',
          },
          {
            icon: <FaBroom />,
            title: 'Engine Bay Cleaning',
            description:
              'Clean and maintain your engine for optimum performance and longevity.',
          },
        ].map((service, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-default-50 p-6 rounded-lg shadow-lg text-center flex-1"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <div className="text-warning-500 text-4xl mb-4 mx-auto flex items-center justify-center">
              {service.icon}
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              {service.title}
            </h3>
            <p className="text-default-700 mb-4 text-xs md:text-sm">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
}
