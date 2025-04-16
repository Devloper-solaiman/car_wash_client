/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Tooltip,
} from '@nextui-org/react';
import { FC } from 'react';
import {
  FaEdit,
  FaMoneyBillWave,
  FaClock,
  FaAudioDescription,
} from 'react-icons/fa';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

import CWForm from '../form/CWForm';
import CWInput from '../form/CWInput';
import CWTextarea from '../form/CWTextarea';
import { useUpdateServiceMutation } from '../../redux/features/admin/serviceManagementApi';

type TServiceUpdateModalProps = {
  service: {
    _id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
  };
};

const ServiceUpdateModal: FC<TServiceUpdateModalProps> = ({ service }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading('Updating service...');

    try {
      const res = await updateService({
        id: service._id,
        data: {
          name: formData.name,
          description: formData.description,
          duration: Number(formData.duration),
          price: Number(formData.price),
        },
      }).unwrap();

      onOpenChange();
      toast.dismiss(toastId);

      if (res?.success) {
        toast.success('Service updated successfully');
      } else {
        toast.error('Failed to update service');
      }
    } catch (err) {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <Tooltip color="default" content="Edit">
        <Button
          onPress={onOpen}
          size="sm"
          color="warning"
          variant="flat"
          endContent={<FaEdit />}
        ></Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent className="m-2">
          <ModalHeader className="flex flex-col gap-1">
            Update Service
          </ModalHeader>
          <ModalBody>
            <CWForm onSubmit={onSubmit}>
              <div className="flex flex-col items-center justify-center gap-5 border rounded-md p-3 lg:p-5 w-full md:w-[400px]">
                <CWInput
                  name="name"
                  label="Service Name"
                  placeholder="Enter service name"
                  type="text"
                  defaultValue={service.name}
                />
                <CWTextarea
                  name="description"
                  label="Description"
                  placeholder="Enter service description"
                  defaultValue={service.description}
                  rows={3}
                  endContent={
                    <FaAudioDescription className="text-2xl text-warning" />
                  }
                />
                <CWInput
                  name="duration"
                  label="Duration (minutes)"
                  placeholder="Enter duration"
                  defaultValue={service?.duration.toString()}
                  icon={<FaClock className="text-2xl text-warning" />}
                />
                <CWInput
                  name="price"
                  label="Price"
                  placeholder="Enter price"
                  defaultValue={service.price.toString()}
                  icon={<FaMoneyBillWave className="text-2xl text-warning" />}
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

export default ServiceUpdateModal;
