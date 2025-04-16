/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { FC } from 'react';
import { FaAddressBook, FaEdit, FaPhone } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { useTheme } from 'next-themes';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

import CWForm from '../form/CWForm';
import CWInput from '../form/CWInput';
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from '../../redux/features/auth/authApi';
import { useAppSelector } from '../../redux/hook';
import { useCurrentUser, TUser } from '../../redux/features/auth/authSlice';

const UserDetailsModal: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data } = useGetMeQuery(user?.email);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { theme } = useTheme();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading('Updating your profile...');

    try {
      const res = await updateUser({
        id: data?.data?._id,
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
      }).unwrap();

      onOpenChange();
      toast.dismiss(toastId);

      if (res?.success) {
        toast.success('Profile updated successfully');
      }
    } catch (err) {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <Button onPress={onOpen} size="sm" startContent={<FaEdit size={20} />} />

      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent className="m-2">
          <ModalHeader className="flex flex-col gap-1">
            Update Profile
          </ModalHeader>
          <ModalBody>
            <CWForm onSubmit={onSubmit}>
              <div
                className={`flex flex-col items-center justify-center gap-5 border rounded-md p-3 lg:p-5 w-full ${
                  theme === 'dark' ? 'border-gray-50 border-opacity-15' : ''
                }`}
              >
                <CWInput
                  name="name"
                  label="User Name"
                  placeholder="Enter your name"
                  type="text"
                  defaultValue={data?.data?.name}
                />
                <CWInput
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  defaultValue={data?.data?.email}
                  icon={<IoMail className="text-2xl text-warning" />}
                />
                <CWInput
                  name="phone"
                  label="Phone"
                  placeholder="Enter your phone number"
                  type="tel"
                  defaultValue={data?.data?.phone}
                  icon={<FaPhone className="text-2xl text-warning" />}
                />
                <CWInput
                  name="address"
                  label="Address"
                  placeholder="Enter your address"
                  defaultValue={data?.data?.address}
                  icon={<FaAddressBook className="text-2xl text-warning" />}
                />
                <Button
                  isLoading={isLoading}
                  color="warning"
                  variant="flat"
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </CWForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserDetailsModal;
