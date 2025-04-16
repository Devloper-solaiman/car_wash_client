import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

const Error404: FC = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl text-center"
      >
        <h1 className="text-6xl font-bold text-warning mb-4 animate-bounce">
          404
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Oops! The page you are looking for does not exist.
        </p>

        <div className="flex justify-center gap-4">
          <Button color="warning" variant="flat" onClick={handleGoBack}>
            Go Back
          </Button>
          <Button onClick={handleHome} color="warning" variant="faded">
            Go Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Error404;
