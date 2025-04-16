import { FC } from 'react';
import SlotBooking from '../../components/slotBooking/SlotBooking';
import Container from '../../components/ui/Container';

type TBookingsProps = object;

const Bookings: FC<TBookingsProps> = () => {
  return (
    <Container>
      <SlotBooking />
    </Container>
  );
};

export default Bookings;
