/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';
import { useDeleteServiceMutation } from '../../redux/features/admin/serviceManagementApi';

type TServiceDeleteModalProps = {
  id: string;
};

const ServiceDeleteModal: FC<TServiceDeleteModalProps> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteService, { isLoading }] = useDeleteServiceMutation();

  const handleDelete = async () => {
    try {
      const res: any = await deleteService(id);
      if (res?.data?.success) {
        toast.success('Service deleted successfully');
        onClose(); // Close modal on successful deletion
      } else {
        toast.error('Failed to delete service');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the service');
    }
  };

  return (
    <>
      <Tooltip color="default" content="Delete">
        <Button
          onPress={onOpen}
          endContent={<FaTrash className="text-red-500" />}
          size="sm"
          color="default"
        />
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
        <ModalContent className="m-2">
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>Are you sure you want to delete this service?</ModalBody>
          <ModalFooter>
            <Button color="warning" variant="bordered" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              variant="flat"
              onPress={handleDelete}
              isLoading={isLoading} // Show a loading state if the deletion is in progress
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ServiceDeleteModal;
