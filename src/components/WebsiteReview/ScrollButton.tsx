// src/components/ScrollButton.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import { useTheme } from "next-themes";

const ScrollButton = () => {
  const { theme } = useTheme();
  const [isBottom, setIsBottom] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [scrollDirection, setScrollDirection] = useState("");

  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const isBottomPosition =
      scrollPosition >= document.documentElement.scrollHeight;
    const isTopPosition = window.scrollY === 0;

    setIsBottom(isBottomPosition);
    setIsTop(isTopPosition);

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }

    lastScrollY = currentScrollY;
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {scrollDirection === "down" && !isBottom && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={scrollToBottom}
            className={`p-3 rounded-full bg-primaryColor text-gray-700 border focus:outline-none ${
              theme === "dark"
                ? "text-white border-gray-100 border-opacity-20"
                : ""
            }`}
          >
            <FaCircleChevronDown size={24} />
          </button>
        </motion.div>
      )}

      {scrollDirection === "up" && !isTop && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={scrollToTop}
            className={`p-3 rounded-full bg-primaryColor text-gray-700 border focus:outline-none ${
              theme === "dark"
                ? "text-white border-gray-100 border-opacity-20"
                : ""
            }`}
          >
            <FaCircleChevronUp size={24} />
          </button>
        </motion.div>
      )}
    </>
  );
};

export default ScrollButton;
