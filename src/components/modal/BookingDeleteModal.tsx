import { FC } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

type BookingDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const BookingDeleteModal: FC<BookingDeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent className="m-2">
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>Are you sure you want to delete this booking?</ModalBody>
        <ModalFooter>
          <Button color="warning" variant="bordered" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="warning"
            variant="flat"
            onPress={() => {
              onDelete();
              onClose();
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookingDeleteModal;
