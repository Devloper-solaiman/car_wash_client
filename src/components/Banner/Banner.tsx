import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/react";
import { IoCaretBackCircle, IoCaretForwardCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SearchInput from "../Banner/SearchInput";
// import SearchInput from "./SearchInput";

const images = [
  "https://res.cloudinary.com/dcbvputnw/image/upload/v1744123512/qq_qppajp.jpg",
  "https://res.cloudinary.com/dcbvputnw/image/upload/v1744123407/Washing_cars_dufgrv.webp",
  "https://res.cloudinary.com/dcbvputnw/image/upload/v1744123336/ultimate-car-mainten-hero_y9tpci.avif",
  "https://res.cloudinary.com/dcbvputnw/image/upload/v1744123286/experience-gm-oil-change_femgdk.avif",
  "https://res.cloudinary.com/dcbvputnw/image/upload/v1744122824/carw_rdnaqa.webp",
  "https://res.cloudinary.com/dcbvputnw/image/upload/v1744172529/team-pic_qppqta.jpg",
];

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-[75vh] overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-full">
        <AnimatePresence>
          {images.map((image, index) =>
            index === currentIndex ? (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Banner Text with Parallax Effect */}
      <div className="absolute inset-0 flex bg-black bg-opacity-40 flex-col justify-center items-center text-center px-4">
        <SearchInput />
        <motion.p
          className="text-gray-50 text-lg uppercase tracking-wide mb-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          style={{ transform: "translateY(-2px)" }}
        >
          Car wash services
        </motion.p>
        <motion.h1
          className="text-gray-50 text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          We love cars to shine.
        </motion.h1>
        <motion.p
          className="text-gray-100 text-base md:text-sm mb-8 max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Pamper your car with premier full wash complete with interior vacuum
          and window cleaning.
        </motion.p>
        <motion.button
          className="animate-bounce hover:animate-none duration-700 ease-in-out text-white mt-10 h-[45px]"
          onClick={() => navigate("/services")}
          style={{
            borderRadius: "9999px",
            border: "2px solid #FFA500",
            padding: "0 24px",
            backgroundColor: "transparent",
          }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#FFA500",
            color: "#FFFFFF",
          }}
          transition={{ duration: 0.3 }}
        >
          Start Now
        </motion.button>
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={prevSlide}
        startContent={<IoCaretBackCircle size={30} className="text-warning" />}
        isIconOnly
        size="sm"
        radius="full"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 focus:outline-none hidden md:block bg-transparent"
      />
      <Button
        onClick={nextSlide}
        startContent={
          <IoCaretForwardCircle size={30} className="text-warning" />
        }
        isIconOnly
        size="sm"
        radius="full"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none hidden md:block bg-transparent"
      />

      {/* Dots Indicator with Scale and Glow Animation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? "bg-white shadow-lg"
                : "bg-white bg-opacity-50"
            }`}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: index === currentIndex ? 1.3 : 1,
              opacity: index === currentIndex ? 1 : 0.5,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
