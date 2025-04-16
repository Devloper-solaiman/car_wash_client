import { Card, CardBody, CardHeader } from '@nextui-org/react';
import TotalSalesCard from './TotalSalesCard ';
import CustomersCard from './CustomersCard ';
import ProductsCard from './ProductsCard ';
import RevenueCard from './RevenueCard ';
import OverviewChart from './OverviewChart ';
import GrowthChart from './GrowthChart';
import RecentOrder from './RecentOrder';
import {
  useGetAllBookingsQuery,
  useGetAllServicesQuery,
} from '../../../../redux/features/admin/serviceManagementApi';
import { useGetAllUsersQuery } from '../../../../redux/features/admin/userManagementApi';
import {
  TMeta,
  TReview,
  TService,
  TSlotBooking,
  TUserData,
} from '../../../../types';

interface AdminDashboardProps {
  usersData?: { data: TUserData[] };
  adminsData?: { data: TUserData[] };
  allBookingsData?: { data: TSlotBooking[] };
  allServicesData?: { data: TService[] };
  allReviewsData?: { data: TReview[] };
}

export default function AdminDashboard({}: AdminDashboardProps = {}) {
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const { data: allBookingsData } = useGetAllBookingsQuery({
    sort: '-createAt',
  });
  const { data: allServicesData } = useGetAllServicesQuery(undefined);

  const allBookings = allBookingsData?.data as TSlotBooking[];

  const totalSales =
    allBookings?.reduce((acc, booking) => acc + booking.totalPrice, 0) || 0;
  const revenue = totalSales * 0.1;

  // Calculate today's, yesterday's, and this month's data
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todaySales =
    allBookings
      ?.filter(
        (booking) =>
          new Date(booking.slot[0]?.date).toDateString() ===
          today.toDateString()
      )
      .reduce((acc, booking) => acc + booking.totalPrice, 0) || 0;
  const yesterdaySales =
    allBookings
      ?.filter(
        (booking) =>
          new Date(booking.slot[0]?.date).toDateString() ===
          yesterday.toDateString()
      )
      .reduce((acc, booking) => acc + booking.totalPrice, 0) || 0;

  const monthSales =
    allBookings
      ?.filter(
        (booking) =>
          new Date(booking.slot[0]?.date).getMonth() === today.getMonth() &&
          new Date(booking.slot[0]?.date).getFullYear() === today.getFullYear()
      )
      .reduce((acc, booking) => acc + booking.totalPrice, 0) || 0;

  const monthlyData = allBookings
    ? Object.values(
        allBookings.reduce(
          (
            acc: Record<
              string,
              { name: string; sales: number; revenue: number }
            >,
            booking: TSlotBooking
          ) => {
            const bookingDate = new Date(booking.slot[0]?.date);
            const month = bookingDate.toLocaleString('default', {
              month: 'short',
            });

            if (!isNaN(bookingDate.getTime())) {
              return {
                ...acc,
                [month]: {
                  name: month,
                  sales: (acc[month]?.sales || 0) + booking.totalPrice,
                  revenue:
                    (acc[month]?.revenue || 0) + booking.totalPrice * 0.1,
                },
              };
            } else {
              console.warn('Invalid date for booking:', booking);
              return acc;
            }
          },
          {}
        )
      )
    : [];

  const salesData = monthlyData.map((item) => ({
    name: item.name,
    sales: item.sales,
  }));
  const revenueData = monthlyData.map((item) => ({
    name: item.name,
    revenue: item.revenue,
  }));

  return (
    <div className="flex-1 space-y-4 px-1 md:px-4 mb-3">
      <h3 className="text-lg font-semibold text-default-800 mb-2">
        Dashboard Overview
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TotalSalesCard totalSales={totalSales} />
        <CustomersCard usersMeta={usersData?.meta as TMeta} />
        <ProductsCard servicesMeta={allServicesData?.meta as TMeta} />
        <RevenueCard totalSalesRevenue={revenue} />
      </div>

      <div className="my-3 col-span-1">
        <h3 className="text-lg font-semibold text-default-800 mb-2">
          Sales Summary
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h2 className="text-sm font-medium">Today's Sales</h2>
              <p className="h-4 w-4 text-muted-foreground"> ৳ </p>
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold"> {todaySales || 0}</div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h2 className="text-sm font-medium">Yesterday's Sales:</h2>
              <p className="h-4 w-4 text-muted-foreground"> ৳ </p>
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold"> {yesterdaySales || 0}</div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h2 className="text-sm font-medium">This Month's Sales:</h2>
              <p className="h-4 w-4 text-muted-foreground"> ৳ </p>
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold"> {monthSales || 0}</div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <OverviewChart data={monthlyData} />
        </div>
        <div className="col-span-3">
          <GrowthChart
            salesData={
              salesData as { name: string; sales: number; revenue: number }[]
            }
            revenueData={revenueData}
          />
        </div>
      </div>

      <Card className="mb-5">
        <CardHeader>
          <h3 className="text-lg font-semibold text-default-800">
            Recent Orders
          </h3>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-default-200">
              <thead className="bg-default-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-default-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-default-500 uppercase tracking-wider"
                  >
                    Service
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-default-500 uppercase tracking-wider"
                  >
                    Total Price
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-default-500 uppercase tracking-wider"
                  >
                    Payment Status
                  </th>
                </tr>
              </thead>
              {allBookings?.slice(0, 5).map((booking, index) => (
                <RecentOrder key={index} booking={booking} />
              ))}
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
