import { FC } from "react";
import { motion } from "framer-motion";
import { Chip } from "@nextui-org/react";
import { useTheme } from "next-themes";

type TCalendarProps = object;

const Calendar: FC<TCalendarProps> = () => {
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
          Calendar
        </h1>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Chip variant="bordered" size="md" className="text-lg mb-2">
          Overview
        </Chip>
        <p className="mr-3 text-sm">
          The calendar allows you to view and manage important dates and events
          throughout the year. You can add new events, set reminders, and keep
          track of your schedule easily.
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
          <li>Month view with daily events</li>
          <li>Weekly and daily breakdowns</li>
          <li>Event reminders and notifications</li>
          <li>Custom event categories</li>
          <li>Sync with other calendars</li>
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-8"
      >
        <Chip variant="bordered" size="md" className="text-lg mb-2">
          How to Use
        </Chip>
        <p className="mr-3 text-sm">
          To add an event, simply click on the date in the calendar. Fill in the
          event details, including the title, time, and any reminders. Your
          events will be saved and displayed on the calendar.
        </p>
        <p className="mr-3 text-sm">
          You can navigate through different months using the arrows at the top
          of the calendar. Click on a day to view the events scheduled for that
          day.
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
          For any issues or questions, please reach out to our support team.
          We're here to help you get the most out of your calendar.
        </p>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-center mt-8"
      >
        <p className="text-gray-600">
          © {currentYear} Calendar. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Calendar;
