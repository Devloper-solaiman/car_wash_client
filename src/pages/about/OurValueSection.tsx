import { motion } from 'framer-motion';
import Container from '../../components/ui/Container';

export default function OurValueSection() {
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
      <div className="py-10 mt-10 px-6 md:px-16 bg-default-100">
        <h2 className="text-xl md:text-3xl font-bold text-center mb-8">
          Our Mission & Values
        </h2>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-default-700 text-xs md:text-sm"
          >
            Our mission is to deliver exceptional car care with a commitment to
            quality, integrity, and customer satisfaction. We use eco-friendly
            products and sustainable practices to reduce our environmental
            footprint.
          </motion.p>
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-default-700 text-xs md:text-sm"
          >
            At our core, we believe in building lasting relationships with our
            clients, ensuring every experience leaves you with a smile and a
            shiny car.
          </motion.p>
        </div>
      </div>
    </Container>
  );
}
