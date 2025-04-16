import AboutUs from '../pages/about/AboutUs';
import Bookings from '../pages/booking/Bookings';
import FavoriteService from '../pages/favorite';
import Home from '../pages/home/Home';
import Services from '../pages/service/Services';
import ServiceDetails from '../pages/serviceDetails/ServiceDetails';
import Success from '../pages/success/Success';

export const MainRoutes = [
  {
    path: '',
    element: <Home />,
  },
  {
    path: 'services',
    element: <Services />,
  },
  {
    path: 'booking',
    element: <Bookings />,
  },
  {
    path: 'aboutUs',
    element: <AboutUs />,
  },
  {
    path: 'favorites-services',
    element: <FavoriteService />,
  },
  {
    path: 'service-details/:id',
    element: <ServiceDetails />,
  },
  {
    path: 'success',
    element: <Success />,
  },
  {
    path: 'configurations',
    element: <Success />,
  },
  {
    path: 'help&feedback',
    element: <Success />,
  },
];
