import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO',
    imgSrc:
      'https://img.freepik.com/free-photo/young-man-bench-with-hands-together_23-2148322113.jpg',
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    imgSrc:
      'https://thumbs.dreamstime.com/b/happy-cheerful-african-millennial-man-looking-camera-home-american-face-head-shot-smiling-young-black-single-guy-136500293.jpg',
  },
  {
    name: 'Sarah Brown',
    role: 'Head of Marketing',
    imgSrc:
      'https://www.yourtango.com/sites/default/files/image_blog/2024-09/type-single-person-loner.png',
  },
  {
    name: 'Mark Johnson',
    role: 'Product Manager',
    imgSrc:
      'https://t4.ftcdn.net/jpg/09/98/52/85/360_F_998528510_2R8HvSD017MxDYMAoARU7y9hU35q4jCg.jpg',
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, type: 'spring', stiffness: 100 },
  }),
};

type TeamMemberProps = {
  name: string;
  role: string;
  imgSrc: string;
};

const TeamMemberCard: React.FC<TeamMemberProps> = ({ name, role, imgSrc }) => {
  return (
    <div className="bg-default-50 rounded-lg overflow-hidden shadow-lg p-4 text-center border border-default-100">
      <img
        src={imgSrc}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto object-cover"
      />
      <h3 className="text-lg font-semibold mt-4 text-default-900">{name}</h3>
      <p className="text-sm text-default-600">{role}</p>
    </div>
  );
};

export default function OurTeam() {
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
    <div
      className="relative py-20 mt-10 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://clubcarwash.com/wp-content/uploads/2021/05/employees-standing-together-as-family-1024x577.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="flex flex-col gap-1 items-center justify-center"
        >
          <div className="rounded-xl text-sm md:text-lg text-warning-500 italic">
            The People Behind Our Success
          </div>
          <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mt-2">
            Meet Our Team
          </h3>
          <p className="text-white mt-2 max-w-md mx-auto text-xs text-center">
            Our team is composed of dedicated professionals who strive to
            deliver the best service possible.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <TeamMemberCard
                name={member.name}
                role={member.role}
                imgSrc={member.imgSrc}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
