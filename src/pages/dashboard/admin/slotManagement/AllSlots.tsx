import { FC, useState } from 'react';
import { useGetAllServicesSlotsQuery } from '../../../../redux/features/admin/slotManagementApi';
import { TMeta, TSlot } from '../../../../types';
import { useTheme } from 'next-themes';
import { Chip, Pagination, Tooltip } from '@nextui-org/react';
import { FaClock } from 'react-icons/fa';
import CreateSlotModal from '../../../../components/modal/CreateSlotsModal';
import SlotStatusDropdown from './SlotStatusDropdown';
import NoData from '../../../../components/serviceSlots/NoData';
import SlotSkeleton from '../../../../components/skeleton/ServiceSlotSkeleton';
import { formatTo12Hour } from '../../../../utils/FormatDate';

type TAllSlotsProps = object;

const AllSlots: FC<TAllSlotsProps> = () => {
  const [page, setPage] = useState(1);
  const queryParams: Record<string, string> = {
    sort: '-createdAt',
    limit: '9',
    page: page.toString(),
  };
  const { theme } = useTheme();
  const { data: slotsData, isLoading } =
    useGetAllServicesSlotsQuery(queryParams);

  const slots = slotsData?.data as TSlot[];
  const meta = slotsData?.meta as TMeta;

  const handlePageChange = (newPage: number) => setPage(newPage);

  if (isLoading) {
    return <SlotSkeleton />;
  }

  if (!slots || (slots?.length === 0 && undefined)) {
    return <NoData text="There are no slots available" />;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 my-5">
        <Chip variant="bordered">All Slots</Chip>
        <CreateSlotModal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between w-full gap-3">
        {slots?.map((slot) => {
          return (
            <div
              key={slot._id}
              className={`flex flex-col gap-3 items-start border px-3 py-2 rounded-md ${
                theme === 'dark' ? 'border-gray-100 border-opacity-15' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-3 w-full">
                <Tooltip content={slot?.service?.name}>
                  <p>
                    {slot?.service?.name?.length > 15
                      ? `${slot?.service.name.slice(0, 12)}...`
                      : slot?.service?.name}
                  </p>
                </Tooltip>
                <Chip color="warning" variant="flat">
                  <p className="text-sm flex items-center gap-2">
                    <FaClock size={16} className="mb-0.5" />{' '}
                    {slot?.service?.duration} minutes
                  </p>
                </Chip>
              </div>
              <Chip
                color={slot.isBooked === 'available' ? 'warning' : 'default'}
                variant="faded"
              >
                {slot.date}
              </Chip>
              <div className="flex flex-row items-center justify-between gap-3 mt-5">
                <Chip color="warning" variant="dot">
                  Start: {formatTo12Hour(slot.startTime)}
                </Chip>
                <Chip color="warning" variant="dot">
                  End: {formatTo12Hour(slot.endTime)}
                </Chip>
              </div>
              <SlotStatusDropdown slot={slot} />
            </div>
          );
        })}
      </div>
      {meta && (
        <div className="mt-10 flex justify-center items-start">
          <Pagination
            color="default"
            variant="flat"
            showControls
            total={meta.totalPage}
            initialPage={page}
            className={`mb-5 px-5 py-1 mx-3 border-none shadow-none rounded-full bg-[#F4F4F5] ${
              theme === 'dark' ? ' bg-opacity-30' : ''
            }`}
            onChange={(newPage) => handlePageChange(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default AllSlots;
