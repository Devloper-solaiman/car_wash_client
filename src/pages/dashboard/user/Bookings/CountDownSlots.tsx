import { Chip, Tooltip } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

interface CountDownProps {
  slotDates: string[][];
}

const CountDownSlots: React.FC<CountDownProps> = ({ slotDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [countdowns, setCountdowns] = useState<string[][]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const convertToDateObject = (dateString: string) => {
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}T00:00:00`);
  };

  const getCountdown = (futureDate: Date, currentDate: Date) => {
    const diffInMilliseconds = futureDate.getTime() - currentDate.getTime();

    if (diffInMilliseconds <= 0) {
      return 'Date has passed';
    }

    const getDateDifference = (future: Date, current: Date) => {
      let days = future.getDate() - current.getDate();

      if (days < 0) {
        days += new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          0
        ).getDate();
      }

      return { days };
    };

    const dateDiff = getDateDifference(futureDate, currentDate);

    const hours = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

    return `${dateDiff.days}d , ${hours}h, ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const convertedDates = slotDates.map((arr) =>
      arr?.map((dateString) => convertToDateObject(dateString))
    );

    // Calculate the countdown for each date and store in state
    const newCountdowns = convertedDates?.map((dateArray) =>
      dateArray?.map((convertedDate) =>
        getCountdown(convertedDate, currentDate)
      )
    );

    setCountdowns(newCountdowns);
  }, [slotDates, currentDate]);

  return (
    <div className="flex gap-2 items-center justify-center flex-wrap">
      {countdowns?.length === 0 ? (
        <Chip color="success" size="lg" variant="flat">
          Complete
        </Chip>
      ) : (
        countdowns?.map((dateArray, index) => (
          <div key={index}>
            {dateArray.map((countdown, i) => (
              <Tooltip key={index} content={'Service starting countdown'}>
                <div
                  className={`bg-gray-50 rounded-full py-2 px-5 font-semibold w-[200px] border text-warning ${
                    theme === 'dark'
                      ? 'bg-opacity-10 border-gray-100 border-opacity-15'
                      : ''
                  } mb-3`}
                >
                  <p key={i}>{countdown}</p>
                  <p className="text-[14px] font-normal text-default-500">
                    Service starting time
                  </p>
                </div>
              </Tooltip>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default CountDownSlots;
