import { FC } from "react";
import { motion } from "framer-motion";
import { Chip } from "@nextui-org/react";
import { useTheme } from "next-themes";

type TDocumentationProps = object;

const Documentation: FC<TDocumentationProps> = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <div
      className={`p-6 border rounded-md ${
        theme === "dark" ? "border-gray-100 border-opacity-15" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl md:text-2xl font-bold text-center mb-8">
          Car Washing Dashboard Documentation
        </h1>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Chip variant="bordered" size="md" className="text-lg mb-2">
          Getting Started
        </Chip>
        <p className="mr-3 text-sm">
          Welcome to the Car Washing Dashboard! This documentation will guide
          you through the setup and usage of the dashboard. Whether you're a
          first-time user or a returning one, you'll find all the information
          you need to get started.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <Chip variant="bordered" size="md" className="text-lg mb-2">
          Features
        </Chip>
        <ul className="list-disc list-inside">
          <li>Real-time booking management</li>
          <li>Service history tracking</li>
          <li>User notifications and reminders</li>
          <li>Integrated payment options</li>
          <li>Customizable service packages</li>
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-8"
      >
        <Chip variant="bordered" size="md" className="text-lg mb-2">
          User Instructions
        </Chip>
        <p className="mr-3 text-sm">
          To book a car wash service, navigate to the 'Booking' section and
          select your preferred date and time. You can also choose from a range
          of service packages tailored to your needs.
        </p>
        <p className="mr-3 text-sm">
          Once booked, you can track the status of your service in the 'Service
          History' section. Notifications will be sent to you as reminders for
          your upcoming bookings.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mb-8"
      >
        <Chip variant="bordered" size="md" className="text-lg mb-2">
          Support
        </Chip>
        <p className="mr-3 text-sm">
          If you encounter any issues or have questions, our support team is
          here to help. Contact us through the 'Support' section or reach out
          via email at support@carwashingdashboard.com.
        </p>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-center mt-8"
      >
        <p className="text-gray-600">
          © {currentYear} Car Washing Dashboard. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Documentation;
