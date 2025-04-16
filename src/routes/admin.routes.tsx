import AdminDashboard from '../pages/dashboard/admin/Dashboard/AdminDashboard';
import AdminProfile from '../pages/dashboard/admin/Dashboard/AdminProfile';
import OverviewBookings from '../pages/dashboard/admin/OverviewBookings';
import AllServices from '../pages/dashboard/admin/serviceManagement/AllServices';
import AllSlots from '../pages/dashboard/admin/slotManagement/AllSlots';
import AllAdminUsers from '../pages/dashboard/admin/userManagement/AllAdmin';
import AllUserBookings from '../pages/dashboard/admin/userManagement/AllUserBookings';
import AllUsers from '../pages/dashboard/admin/userManagement/AllUsers';
import Calender from '../pages/dashboard/Calender';
import Documentation from '../pages/dashboard/Documentation';

export const AdminRoutes = [
  {
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    path: 'profile',
    element: <AdminProfile />,
  },
  {
    path: 'all-services',
    element: <AllServices />,
  },
  {
    path: 'all-slots',
    element: <AllSlots />,
  },
  {
    path: 'all-bookings',
    element: <OverviewBookings />,
  },
  {
    path: 'all-user-bookings',
    element: <AllUserBookings />,
  },
  {
    path: 'all-users',
    element: <AllUsers />,
  },
  {
    path: 'all-admins',
    element: <AllAdminUsers />,
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
