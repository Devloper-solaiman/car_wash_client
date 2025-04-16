import { Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

interface CountDownProps {
  slotDates: string[][];
}

const NavBarCountDown: React.FC<CountDownProps> = ({ slotDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const convertToDateObject = (dateString: string) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}T00:00:00`);
  };

  const getCountdown = (futureDate: Date, currentDate: Date) => {
    const diffInMilliseconds = futureDate.getTime() - currentDate.getTime();

    if (diffInMilliseconds <= 0) {
      return null;
    }

    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const validDates = slotDates
      .flatMap((slot) => slot)
      .map(convertToDateObject);

    const firstValidDate = validDates.find(
      (date) => date.getTime() > currentDate.getTime()
    );

    if (firstValidDate) {
      const countdownValue = getCountdown(firstValidDate, currentDate);

      if (countdownValue) {
        setCountdown(countdownValue);
      } else {
        setCountdown(null);
      }
    } else {
      setCountdown(null);
    }
  }, [slotDates, currentDate]);

  return (
    <div>
      {countdown && (
        <Tooltip content={"Service starting countdown"}>
          <div className="bg-default-50 rounded-full py-1 px-5 font-semibold border text-warning mb-3">
            <p>{countdown}</p>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default NavBarCountDown;
