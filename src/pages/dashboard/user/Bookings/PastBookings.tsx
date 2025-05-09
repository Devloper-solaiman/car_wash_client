/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
  Avatar,
  Tooltip,
} from '@nextui-org/react';
import { useGetAllMyBookingsQuery } from '../../../../redux/features/user/slotBokingApi';
import { TSlotBooking } from '../../../../types';
import { formatTo12Hour } from '../../../../utils/FormatDate';
import LoaderSkeleton from '../../../../components/skeleton/LoaderSkeleton';
import NoData from '../../../../components/serviceSlots/NoData';

type TPastBookingProps = object;

const PastBooking: FC<TPastBookingProps> = () => {
  const queryParams: Record<string, string> = {
    sort: 'createdAt',
    limit: '8',
  };
  const { data: bookingData, isLoading } = useGetAllMyBookingsQuery(
    queryParams || undefined
  );

  const allBookings = bookingData?.data as TSlotBooking[];
  const bookings = allBookings?.filter(
    (item) => item.slot[0]?.isBooked === 'complete' || 'booked'
  );

  console.log(bookings);

  // payment status mapping
  const statusColorMap: any = {
    Pending: 'warning',
    Paid: 'success',
    Failed: 'default',
  };

  // table columns
  const columns = [
    { uid: 'service', name: 'Service' },
    { uid: 'email', name: 'Customer' },
    { uid: 'vehicleBrand', name: 'Vehicle Type' },
    { uid: 'slot', name: 'Slot' },
    { uid: 'vehicleModel', name: 'Vehicle Details' },
    { uid: 'paymentStatus', name: 'Payment Status' },
  ];

  const renderCell = useCallback(
    (booking: TSlotBooking, columnKey: keyof TSlotBooking | 'actions') => {
      switch (columnKey) {
        case 'service':
          return (
            <div className="flex items-center gap-2">
              <Avatar radius="full" src={booking.service?.[0]?.image} />
              <div>
                <Tooltip content={booking.service[0]?.name}>
                  <h2 className="text-sm whitespace-nowrap">
                    {booking.service[0]?.name.slice(0, 10)}...
                  </h2>
                </Tooltip>
                <p className="text-xs">{'৳ ' + booking.service[0]?.price}</p>
              </div>
            </div>
          );
        case 'email':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize whitespace-nowrap">
                {booking?.name}
              </p>
              <p className="text-bold text-sm capitalize whitespace-nowrap text-default-400">
                {booking?.email}
              </p>
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
                {/* Adding check for undefined values */}
                {booking.slot[0]?.startTime && booking.slot[0]?.endTime ? (
                  <>
                    {formatTo12Hour(booking.slot[0]?.startTime)} -{' '}
                    {formatTo12Hour(booking.slot[0]?.endTime)}
                  </>
                ) : (
                  "Invalid Time"
                )}
              </p>
            </div>
          );
        case 'paymentStatus':
          return (
            <div className="flex flex-col gap-3 items-center">
              <Chip
                className="capitalize whitespace-nowrap px-5"
                color={statusColorMap[booking.paymentStatus] || 'default'}
                size="sm"
                variant="bordered"
              >
                ৳{booking.totalPrice} {booking.paymentStatus}
              </Chip>
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
      <Chip className="mb-5" variant="bordered">
        My Past Bookings
      </Chip>
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
        <TableBody emptyContent={'No past bookings'} items={bookings || []}>
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
    </div>
  );
};

export default PastBooking;
