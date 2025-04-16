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
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

import CWForm from '../form/CWForm';
import CWInput from '../form/CWInput';
import CWSelect from '../form/CWSelect';
import { useTheme } from 'next-themes';
import { useGetAllServicesQuery } from '../../redux/features/admin/serviceManagementApi';
import { useCreateSlotsMutation } from '../../redux/features/admin/slotManagementApi';
import { FaClock, FaPlus } from 'react-icons/fa';
import { TService } from '../../types';
import CWDateInput from '../form/CwDateInput';

const CreateSlotModal: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: services } = useGetAllServicesQuery({ limit: '1000000' });
  const [createSlot, { isLoading }] = useCreateSlotsMutation();
  const { theme } = useTheme();

  // Corrected servicesItems to be a flat array
  const servicesItems =
    services?.data.map((item: TService) => ({
      key: item._id,
      label: item.name,
    })) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading('Creating slot...');
    console.log(formData);
    const { day, month, year } = formData.date;
    const formattedDate = `${day}-${month}-${year}`;

    try {
      const res = await createSlot({
        service: formData.service,
        date: formattedDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
      }).unwrap();

      onOpenChange();

      console.log(res);
      if (res?.success) {
        toast.success('Slot created successfully', {
          id: toastId,
          duration: 3000,
        });
      } else {
        toast.dismiss(toastId);
      }
    } catch (err) {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        size="sm"
        color="warning"
        className="text-slate-50"
        variant="solid"
        endContent={<FaPlus />}
      >
        Create Slot
      </Button>

      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent className="m-2">
          <ModalHeader className="flex flex-col gap-1">Create Slot</ModalHeader>
          <ModalBody>
            <CWForm onSubmit={onSubmit}>
              <div
                className={`flex flex-col items-center justify-center gap-5 border rounded-md p-3 lg:p-5 w-full ${
                  theme === 'dark' ? 'border-gray-50 border-opacity-15' : ''
                }`}
              >
                <CWSelect
                  name="service"
                  label="Select Service"
                  placeholder="Select a service"
                  items={servicesItems}
                />
                <CWDateInput name="date" label="Date" required={true} />
                <CWInput
                  name="startTime"
                  label="Start Time"
                  type="time"
                  placeholder="Enter start time"
                  icon={
                    <FaClock className="text-2xl text-warning pointer-events-none flex-shrink-0" />
                  }
                />
                <CWInput
                  name="endTime"
                  label="End Time"
                  type="time"
                  placeholder="Enter end time"
                  icon={
                    <FaClock className="text-2xl text-warning pointer-events-none flex-shrink-0" />
                  }
                />
                <Button
                  isLoading={isLoading}
                  color="warning"
                  variant="flat"
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </CWForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateSlotModal;
