import { FC } from 'react';
import { Button, Chip } from '@nextui-org/react';
import CWForm from '../form/CWForm';
import CWInput from '../form/CWInput';
import { IoMdCall, IoMdMail, IoMdPerson, IoMdPin } from 'react-icons/io';
import CWTextarea from '../form/CWTextarea';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useTheme } from 'next-themes';
import CWSelect from '../form/CWSelect';
import SlotsBookingCard from './SlotsBookingCard';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  clearBookmarks,
  getAllSlotBooking,
} from '../../redux/features/user/slotBookmarkSlice';
import NoData from '../serviceSlots/NoData';
import { useGetMeQuery } from '../../redux/features/auth/authApi';
import { TUser, useCurrentUser } from '../../redux/features/auth/authSlice';
import { TUserData } from '../../types';
import { vehicleTypeItems } from '../../constants/user';
import { useCreateSlotBookingsMutation } from '../../redux/features/user/slotBokingApi';

const SlotBooking: FC = () => {
  const { theme } = useTheme();
  const slotBookingData = useAppSelector(getAllSlotBooking);
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(useCurrentUser) || ({} as TUser);
  const { data: userDetails } = useGetMeQuery(email);
  const totalPrice = slotBookingData?.reduce(
    (sum, booking) => sum + booking.price,
    0
  );

  const [createSlotBooking, { data, isLoading }] =
    useCreateSlotBookingsMutation();
  console.log('Booking successful 1', data);

  const userData = userDetails?.data as TUserData;

  const serviceIds = slotBookingData.map((item) => item.serviceId);
  const slotIds = slotBookingData.map((item) => item.slotId);

  console.log(slotBookingData);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const payload = {
        serviceId: serviceIds,
        slotId: slotIds,
        name: data.name,
        email: data?.email,
        phone: data.phone,
        address: data.address,
        totalPrice: `${totalPrice}`,
        vehicleType: data.vehicleType,
        vehicleBrand: data.vehicleBrand,
        vehicleModel: data.vehicleModel,
        manufacturingYear: Number(data.manufacturingYear),
        registrationPlate: data.registrationPlate,
      };

      console.log('payload =>', payload);

      const result = await createSlotBooking(payload);
      if (result.data.success) {
        window.location.href = result.data.data.paymentSession.payment_url;
        console.log('Booking successful', result);
      }

      dispatch(clearBookmarks());
    } catch (error) {
      console.error('Booking failed', error);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col md:flex-row items-start justify-between gap-5 w-full">
        {/* Left Side */}
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-start justify-between gap-3">
            <Chip variant="bordered">Your bookmarked slots</Chip>
            <div className="flex  justify-between gap-2">
              <Chip>
                <p className="text-sm font-medium text-primaryColor">
                  Total Price: ৳{totalPrice}
                </p>
              </Chip>
              <Button
                onClick={() => dispatch(clearBookmarks())}
                size="sm"
                color="warning"
                radius="full"
                className="text-white h-7"
              >
                Clear cart
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-5  mt-11">
            {slotBookingData?.length === 0 || undefined ? (
              <div className="flex flex-col items-center justify-center">
                <NoData text="There are no slots! Please bookmark slot" />
              </div>
            ) : (
              <>
                {slotBookingData.map((item) => {
                  return (
                    <SlotsBookingCard key={item.slotId} bookingData={item} />
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-5/12">
          <Chip className="mb-6" variant="bordered">
            Booking Form
          </Chip>
          <CWForm onSubmit={onSubmit}>
            <div
              className={`flex flex-col items-center justify-center gap-5 ${
                theme === 'dark' ? 'border-gray-50 border-opacity-15' : ''
              } rounded-md p-3 lg:p-5 w-full h-auto`}
            >
              <CWInput
                name="name"
                label="Name"
                defaultValue={userData?.name}
                placeholder="Enter your name"
                icon={<IoMdPerson className="text-2xl text-warning" />}
              />
              <CWInput
                name="email"
                label="Email"
                defaultValue={userData?.email}
                placeholder="Enter your email"
                type="email"
                icon={<IoMdMail className="text-2xl text-warning" />}
              />
              <CWInput
                name="phone"
                label="Phone Number"
                defaultValue={userData?.phone}
                placeholder="Enter your phone number"
                type="tel"
                icon={<IoMdCall className="text-2xl text-warning" />}
              />
              <CWSelect
                name="vehicleType"
                label="Vehicle Type"
                placeholder="Select a vehicle type"
                items={vehicleTypeItems}
                isRequired
              />
              <CWInput
                name="vehicleBrand"
                label="Vehicle Brand"
                placeholder="Enter vehicle brand"
              />
              <CWInput
                name="vehicleModel"
                label="Vehicle Model"
                placeholder="Enter vehicle model"
              />
              <CWInput
                name="manufacturingYear"
                label="Manufacturing Year"
                placeholder="Enter manufacturing year"
                type="number"
              />
              <CWInput
                name="registrationPlate"
                label="Registration Plate"
                placeholder="Enter registration plate"
              />
              <CWTextarea
                name="address"
                label="Address"
                defaultValue={userData?.address}
                placeholder="Enter your address"
                endContent={
                  <IoMdPin className="text-2xl text-warning pointer-events-none flex-shrink-0" />
                }
                variant="bordered"
                color="warning"
                rows={3}
                required
              />
              <Button
                isLoading={isLoading}
                color="warning"
                variant="flat"
                type="submit"
                isDisabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </div>
          </CWForm>
        </div>
      </div>
    </div>
  );
};

export default SlotBooking;
