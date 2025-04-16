/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleServiceQuery } from '../../redux/features/admin/serviceManagementApi';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Button, Calendar, Chip, Divider } from '@nextui-org/react';
import { FaClock } from 'react-icons/fa';
import ServicesSlots from '../../components/serviceSlots/ServicesSlots';
import NoData from '../../components/serviceSlots/NoData';
import ServiceDetailsSkeleton from '../../components/skeleton/ServiceDetailsSkeleton';
// import { formatCalenderDate } from '../../utils/FormatDate';
// import { parseDate } from '@internationalized/date';
import Container from '../../components/ui/Container';
import RelatedServices from '../../components/serviceSlots/RelatedServices';

const ServiceDetails: FC = () => {
  const [focusedDate, setFocusedDate] = useState<any>();
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { id } = useParams<string>();
  const { theme } = useTheme();
  const { data: serviceData, isLoading: serviceLoading } =
    useGetSingleServiceQuery(id);

  console.log(serviceData?.data?.availableDates);

  // Populate availableDates with some initial data if needed
  useEffect(() => {
    if (serviceData?.data?.availableDates) {
      setAvailableDates(serviceData.data.availableDates);
      setSelectedDate(serviceData.data.availableDates[0]);
    }
  }, [serviceData]);

  if (serviceLoading) {
    return (
      <Container>
        <ServiceDetailsSkeleton />
      </Container>
    );
  }

  if (!serviceData?.data) {
    return <NoData text="This is no service available" />;
  }

  const { name, image, description, duration, price } = serviceData.data;

  let formattedDate;

  formattedDate = focusedDate
    ? `${focusedDate?.month}-${focusedDate?.day}-${focusedDate?.year}`
    : availableDates[0];

  return (
    <div
      className={`min-h-screen${
        theme === 'dark' ? 'text-white' : 'text-black'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-start justify-between gap-5 bg-default-50 p-2 md:p-6 rounded-lg">
          <div className="flex flex-col gap-3">
            <Chip variant="faded">{name}</Chip>
            <img
              src={image}
              alt={name}
              className="w-full md:w-[420px] h-64 object-cover mb-4 rounded-lg"
            />
            <p className="text-lg mb-4">{description}</p>
            <div className="flex items-center gap-3 justify-between">
              <Chip color="warning" variant="flat">
                <p className="text-sm flex items-center gap-2">
                  <FaClock size={16} className="mb-0.5" /> {duration} minutes
                </p>
              </Chip>
              <Chip>
                <p className="text-lg font-bold text-primaryColor">
                  ৳{price.toFixed(2)}
                </p>
              </Chip>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <Chip variant="faded">Select a Date</Chip>
            {availableDates.length > 0 && (
              <Calendar
                color="warning"
                aria-label="Select a date"
                focusedValue={focusedDate}
                // defaultValue={parseDate(formatCalenderDate(availableDates[0]))}
                onFocusChange={(date) => {
                  setFocusedDate(date);
                  setSelectedDate(
                    date ? `${date.day}-${date.month}-${date.year}` : null
                  );
                }}
              />
            )}

            <Divider />
            <h2 className="px-1">Available dates:</h2>
            <div className="flex gap-3 flex-wrap">
              {availableDates.map((date, index) => {
                return (
                  <Button
                    key={index}
                    onClick={() => {
                      setSelectedDate(date);
                    }}
                    color="default"
                    size="sm"
                  >
                    {date}
                  </Button>
                );
              })}
            </div>

            <Chip color="warning" variant="faded">
              Selected Date: {formattedDate}
            </Chip>
          </div>
        </div>
        <Divider className="my-4" />
        <ServicesSlots
          slotsId={id}
          selectedDate={selectedDate}
          availableDays={setAvailableDates}
          onSelectDate={setSelectedDate} // Pass function to update availableDates
        />
      </motion.div>
      <RelatedServices />
    </div>
  );
};

export default ServiceDetails;
