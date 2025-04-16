import { Avatar, Chip } from '@nextui-org/react';
import { TSlotBooking } from '../../../../types';

interface RecentOrderProps {
  booking: TSlotBooking;
}

const RecentOrder = ({ booking }: RecentOrderProps) => (
  <tbody className="bg-default-50 divide-y divide-default-200">
    <tr>
      {/* Customer Info */}
      <td className="px-4 py-2 whitespace-nowrap">
        <div className="flex items-center">
          <Avatar
            className="h-9 w-9"
            radius="sm"
            src={booking.customer?.profileImg || '/placeholder.svg'}
            alt="Avatar"
          />
          <div className="ml-4">
            <p className="text-sm font-medium text-default-900">
              {booking.customer?.name}
            </p>
            <p className="text-sm text-default-500">
              {booking.customer?.email}
            </p>
          </div>
        </div>
      </td>

      {/* Service Info */}
      <td className="px-4 py-2 whitespace-nowrap">
        <div className="flex items-center">
          <Avatar
            className="h-9 w-9"
            radius="sm"
            src={booking.service?.[0].image || '/placeholder.svg'}
            alt="Service Image"
          />
          <div className="ml-4">
            <p className="text-sm font-medium text-default-900">
              {booking.service?.[0].name}
            </p>
          </div>
        </div>
      </td>

      {/* Total Price */}
      <td className="px-4 py-2 whitespace-nowrap">
        <p className="text-sm font-medium text-default-900">
          ৳ {booking.totalPrice}
        </p>
      </td>

      {/* Payment Status */}
      <td className="px-4 py-2 whitespace-nowrap">
        <Chip className="bg-default-100 text-success px-2 py-1 rounded-md">
          {booking.paymentStatus}
        </Chip>
      </td>
    </tr>
  </tbody>
);

export default RecentOrder;
