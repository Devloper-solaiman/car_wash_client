/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { FC, useState } from 'react';
import { IoStar } from 'react-icons/io5';
import CWForm from '../form/CWForm';
import { useTheme } from 'next-themes';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useAddWebsiteReviewMutation } from '../../redux/features/websiteReviewApi';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import CWTextarea from '../form/CWTextarea';

type TAddReviewModalProps = object;

const AddReviewModal: FC<TAddReviewModalProps> = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [addWebsiteReview, { isLoading }] = useAddWebsiteReviewMutation();
  const { theme } = useTheme();

  // State to hold the selected rating
  const [rating, setRating] = useState(0);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Submitting your review...');

    const reviewData = {
      feedback: data.feedback,
      rating,
    };

    try {
      const res = await addWebsiteReview(reviewData).unwrap();
      onOpenChange();
      if (res?.success) {
        toast.success('Review submitted successfully', {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (err) {
      toast.error('Something went wrong', {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="warning" variant="flat">
        Add Review
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent className="m-2">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Review
              </ModalHeader>
              <ModalBody>
                <CWForm onSubmit={onSubmit}>
                  <div
                    className={`flex flex-col items-center justify-center gap-5 border ${
                      theme === 'dark' ? 'border-gray-50 border-opacity-15' : ''
                    } rounded-md p-3 lg:p-5 w-full md:w-[400px]`}
                  >
                    <CWTextarea
                      name="feedback"
                      label="Feedback"
                      placeholder="Enter your feedback"
                      endContent={
                        <IoStar className="text-2xl text-warning pointer-events-none flex-shrink-0" />
                      }
                      variant="bordered"
                      color="warning"
                      rows={3}
                      required
                    />
                    <div className="flex justify-center mt-4">
                      {/* Star Rating */}
                      {Array.from({ length: 5 }, (_, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setRating(i + 1)}
                          className="cursor-pointer"
                        >
                          {i < rating ? (
                            <IoStar className="text-3xl text-warning" />
                          ) : (
                            <IoStar className="text-3xl text-gray-300" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                    <Button
                      isLoading={isLoading}
                      color="warning"
                      variant="flat"
                      type="submit"
                    >
                      Submit Review
                    </Button>
                  </div>
                </CWForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddReviewModal;
