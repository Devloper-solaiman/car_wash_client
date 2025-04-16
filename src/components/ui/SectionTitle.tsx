// SectionTitle.tsx
import { useEffect, useState, useRef } from 'react';
import { useAnimation, motion } from 'framer-motion';

interface TSectionTitleProps {
  subHeader: string;
  header: string;
  des: string;
}

export default function SectionTitle({
  subHeader,
  header,
  des,
}: TSectionTitleProps) {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Check if the section is within 20% of the viewport height from the top
        if (rect.top <= window.innerHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };

    // Run the handler once on mount to check initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
      });
    }
  }, [controls, isVisible]);

  return (
    <motion.div
      ref={sectionRef}
      className="text-center mb-8 mt-12"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      <div
        color="warning"
        className="rounded-xl text-sm md:text-lg text-warning-500 medium-italic"
      >
        {subHeader}
      </div>
      <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mt-2">
        {header}
      </h3>
      <p className="text-default-600 mt-2 max-w-md mx-auto text-xs">{des}</p>
    </motion.div>
  );
}
