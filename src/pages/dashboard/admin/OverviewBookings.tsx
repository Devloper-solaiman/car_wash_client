/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
  Pagination,
  Avatar,
} from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useGetAllBookingsQuery } from '../../../redux/features/admin/serviceManagementApi';
import { TMeta, TSlotBooking } from '../../../types';
import LoaderSkeleton from '../../../components/skeleton/LoaderSkeleton';
import NoData from '../../../components/serviceSlots/NoData';
import { formatTo12Hour } from '../../../utils/FormatDate';

type TOverviewBookingsProps = object;

const OverviewBookings: FC<TOverviewBookingsProps> = () => {
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const queryParams: Record<string, string> = {
    sort: '-createdAt',
    limit: '10',
    page: page.toString(),
  };
  const { data: bookingData, isLoading } = useGetAllBookingsQuery(
    queryParams || undefined
  );

  const bookings = bookingData?.data as TSlotBooking[];
  const meta = bookingData?.meta as TMeta;

  const handlePageChange = (newPage: number) => setPage(newPage);

  // payment status mapping
  const statusColorMap: any = {
    Pending: 'warning',
    Paid: 'success',
    Failed: 'default',
  };

  // table columns
  const columns = [
    { uid: 'service', name: 'Service' },
    { uid: 'vehicleBrand', name: 'Vehicle Type' },
    { uid: 'slot', name: 'Slot' },
    { uid: 'vehicleModel', name: 'Vehicle Details' },
    { uid: 'paymentStatus', name: 'Payment Status' },
    { uid: 'registrationPlate', name: 'Booking Status' },
  ];

  const renderCell = useCallback(
    (booking: TSlotBooking, columnKey: keyof TSlotBooking | 'actions') => {
      switch (columnKey) {
        case 'service':
          return (
            <div className="flex items-center gap-2">
              <Avatar radius="full" src={booking.service?.[0]?.image} />
              <div>
                <h2 className="text-sm whitespace-nowrap">
                  {booking.service[0]?.name}
                </h2>
                <p className="text-xs">{'৳ ' + booking.service[0]?.price}</p>
              </div>
            </div>
          );
        case 'vehicleBrand':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize whitespace-nowrap">
                {booking.vehicleModel}
              </p>
              <p className="text-bold text-sm capitalize whitespace-nowrap text-default-400">
                {booking.vehicleType}
              </p>
            </div>
          );
        case 'slot':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize whitespace-nowrap">
                {booking.vehicleBrand}
              </p>
              <p className="text-bold text-sm capitalize whitespace-nowrap text-default-400">
                Plate No: {booking.registrationPlate}
              </p>
            </div>
          );
        case 'vehicleModel':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize whitespace-nowrap">
                {booking.slot[0]?.date}
              </p>
              <p className="text-bold text-sm capitalize whitespace-nowrap text-default-400">
                {formatTo12Hour(booking.slot[0]?.startTime)} -{' '}
                {formatTo12Hour(booking.slot[0]?.endTime)}
              </p>
            </div>
          );
        case 'paymentStatus':
          return (
            <div className="flex flex-col items-center">
              <Chip
                className="capitalize whitespace-nowrap px-5"
                color={statusColorMap[booking.paymentStatus] || 'default'}
                size="sm"
                variant="bordered"
              >
                ৳{booking.totalPrice} {booking.paymentStatus}
              </Chip>
            </div>
          );
        case 'registrationPlate':
          return (
            <div className="flex items-center justify-center">
              <Chip
                className="capitalize whitespace-nowrap px-5"
                color={'warning'}
                size="sm"
                variant="bordered"
              >
                {booking.slot[0]?.isBooked}
              </Chip>
            </div>
          );

        default:
          return null;
      }
    },
    [statusColorMap]
  );

  if (isLoading) {
    return <LoaderSkeleton />;
  }

  if (!bookings || (bookings?.length === 0 && undefined)) {
    return <NoData text="There are no overview bookings available" />;
  }

  console.log(bookings);

  return (
    <div>
      <div className="mb-3">
        <Chip variant="bordered">Overview All Bookings</Chip>
      </div>
      <Table aria-label="Bookings Overview Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={bookings || []}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    item,
                    columnKey as keyof TSlotBooking | 'actions'
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
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

export default OverviewBookings;
