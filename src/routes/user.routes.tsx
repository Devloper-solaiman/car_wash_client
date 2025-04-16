import Calender from '../pages/dashboard/Calender';
import Documentation from '../pages/dashboard/Documentation';
import NewBookings from '../pages/dashboard/user/Bookings/NewBookings';
import PastBookings from '../pages/dashboard/user/Bookings/PastBookings';
import UpcomingBooking from '../pages/dashboard/user/Bookings/UpcomingBookings';
import OverviewMyBooking from '../pages/dashboard/user/OverviewMyBooking';
import UserDashboard from '../pages/dashboard/user/Dashboard/UserDashboard';
import CompleteBookings from '../pages/dashboard/user/Bookings/CompleteBookings';

export const UserRoutes = [
  {
    path: 'profile',
    element: <UserDashboard />,
  },
  {
    path: 'my-bookings',
    element: <OverviewMyBooking />,
  },
  {
    path: 'new-bookings',
    element: <NewBookings />,
  },
  {
    path: 'past-bookings',
    element: <PastBookings />,
  },
  {
    path: 'upcoming-bookings',
    element: <UpcomingBooking />,
  },
  {
    path: 'complete-bookings',
    element: <CompleteBookings />,
  },
  {
    path: 'calender',
    element: <Calender />,
  },
  {
    path: 'documentation',
    element: <Documentation />,
  },
];
