/* eslint-disable react-hooks/exhaustive-deps */
import { Chip, Skeleton } from '@nextui-org/react';
import { FC, useMemo, useEffect } from 'react';
import { TSlot } from '../../types/slotManagement.type';
import { useGetAllCarBookingSlotsWithServiceQuery } from '../../redux/features/admin/slotManagementApi';
import NoData from './NoData';
import {
  addBookmark,
  TSlotBookmark,
} from '../../redux/features/user/slotBookmarkSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../redux/features/auth/authSlice';
import SlotCard from './SlotCard';
import SlotSkeleton from '../skeleton/ServiceSlotSkeleton';
import Container from '../ui/Container';

type TServicesSlotsProps = {
  slotsId: string | undefined;
  selectedDate: string | null;
  availableDays?: (dates: string[]) => void;
  onSelectDate?: (date: string) => void;
};

const ServicesSlots: FC<TServicesSlotsProps> = ({
  slotsId,
  selectedDate,
  availableDays,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);

  const queryData = {
    id: slotsId,
    args: {
      sort: 'isBooked',
    },
  };

  const { data: serviceWithSlotsData, isLoading: slotsLoading } =
    useGetAllCarBookingSlotsWithServiceQuery(queryData);
  const slotsData = serviceWithSlotsData?.data;

  console.log('slotsData', slotsData);

  const getUniqueDates = () => {
    const uniqueDates = new Set<string>();
    slotsData?.forEach((slot: TSlot) => {
      if (slot.date) {
        uniqueDates.add(slot.date);
      }
    });
    return Array.from(uniqueDates);
  };

  const uniqueDates = useMemo(() => getUniqueDates(), [slotsData]);

  console.log('uniqueDates', uniqueDates);
  console.log('selectedDate', selectedDate);

  useEffect(() => {
    if (availableDays) {
      availableDays(uniqueDates); // Pass uniqueDates to parent
    }
  }, [uniqueDates, availableDays]);

  const filteredSlots = useMemo(() => {
    if (!selectedDate) return slotsData;

    return slotsData?.filter((slot: TSlot) => {
      return selectedDate === slot.date;
    });
  }, [slotsData, selectedDate]);

  console.log('filteredSlot=>', filteredSlots);

  if (slotsLoading) {
    return (
      <Container>
        <div className="flex flex-col mt-6">
          <Skeleton className="w-[80px] rounded-xl h-[25px]" />
          <div className="mt-5">
            <SlotSkeleton />
          </div>
        </div>
      </Container>
    );
  }

  const slotBookingHandler = (slot: TSlot) => {
    const slotBookingData: TSlotBookmark = {
      serviceId: slot.service._id,
      slotId: slot._id,
      serviceName: slot.service.name,

      serviceImage: slot.service.image,
      duration: slot.service.duration,
      price: slot.service.price,
      startTime: slot.startTime,
      endTime: slot.endTime,
    };

    if (user) {
      dispatch(addBookmark(slotBookingData));
      toast.success('Slot successfully bookmarked!');
    } else {
      navigate('/auth/signup');
    }

    console.log('Slot booking data:', slotBookingData);
  };

  if (slotsLoading) {
    return <SlotSkeleton />;
  }
  return (
    <div className="mt-6 flex flex-col justify-center p-2 md:p-6">
      <div className="my-3">
        <Chip variant="faded">Services slots</Chip>
      </div>

      {!filteredSlots?.length ? (
        <NoData text="There are no slots available" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between w-full gap-3">
          {filteredSlots?.map((slot: TSlot) => (
            <SlotCard
              key={slot._id}
              slot={slot}
              onBookSlot={slotBookingHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesSlots;
