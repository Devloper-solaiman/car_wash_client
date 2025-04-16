import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  FaCar,
  FaWater,
  FaTools,
  FaShower,
  FaTint,
  FaWind,
} from "react-icons/fa";
import SectionTitle from "../../components/ui/SectionTitle";
import Container from "../../components/ui/Container";

const services = [
  {
    icon: <FaCar className="text-4xl text-warning" />,
    title: "Exterior Wash",
    description:
      "High-quality exterior wash that leaves your car shining like new.",
  },
  {
    icon: <FaWater className="text-4xl text-warning" />,
    title: "Interior Cleaning",
    description: "Deep interior cleaning to remove all dirt, dust, and odors.",
  },
  {
    icon: <FaTools className="text-4xl text-warning" />,
    title: "Engine Detailing",
    description:
      "Comprehensive engine cleaning for optimal performance and appearance.",
  },
  {
    icon: <FaShower className="text-4xl text-warning" />,
    title: "Underbody Wash",
    description:
      "Thorough underbody wash to remove dirt and salt, protecting your car's underside.",
  },
  {
    icon: <FaTint className="text-4xl text-warning" />,
    title: "Wax & Polish",
    description:
      "Premium wax and polish service that gives your car a mirror-like finish.",
  },
  {
    icon: <FaWind className="text-4xl text-warning" />,
    title: "Tire & Wheel Cleaning",
    description:
      "Detailed tire and wheel cleaning for a spotless, like-new appearance.",
  },
];

const ServiceHighlights: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    }
  }, [controls, isVisible]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      ref={ref}
      className="relative  pb-20 pt-2 px-4 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://as2.ftcdn.net/v2/jpg/10/29/80/47/1000_F_1029804726_4cR964jwvgXuakphKhFmeTLQyzozTIIx.jpg')",
      }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Overlay for darkening the background */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <Container>
        {" "}
        {/* Content */}
        <div className="relative z-10 mx-auto text-white">
          <SectionTitle subHeader="" header="" des="" />
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            className="flex flex-col gap-1 items-center justify-center mb-4"
          >
            <div className="rounded-xl text-sm md:text-lg text-warning-500 italic">
              Our Services
            </div>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mt-2">
              Explore Our Car Care Options
            </h3>
            <p className="text-white mt-2 max-w-md mx-auto text-xs text-center">
              Choose a service tailored to your vehicle's needs, ensuring it
              stays clean and well-maintained.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5"
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg border hover:shadow-lg transition-shadow duration-300 cursor-pointer text-center transform bg-white text-gray-900 border-gray-200 flex flex-col items-center justify-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div>{service.icon}</div>
                <h3 className="text-xl font-semibold mt-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
};

export default ServiceHighlights;
