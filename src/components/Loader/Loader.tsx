// src/components/Loader/Loader.tsx
import { FC } from "react";
import { motion } from "framer-motion";
import logo from "../../../public/Car Wash site logo.png";

const Loader: FC = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <img className="animate-pulse size-14" src={logo} alt="" />
      </div>
    </motion.div>
  );
};

export default Loader;
