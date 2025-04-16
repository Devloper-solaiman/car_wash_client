/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Textarea,
  useDisclosure,
  Tooltip,
} from '@nextui-org/react';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import axios from 'axios';
import {
  FaPlus,
  FaMoneyBillWave,
  FaClock,
  FaAudioDescription,
  FaImage,
  FaUser,
} from 'react-icons/fa';
import { useCreateServiceMutation } from '../../redux/features/admin/serviceManagementApi';

type TCreateServiceModalProps = object;

type FormValues = {
  name: string;
  description: string;
  duration: number;
  price: number;
  image?: FileList;
};

const CreateServiceModal: FC<TCreateServiceModalProps> = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [createService, { isLoading }] = useCreateServiceMutation();
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const toastId = toast.loading('Creating service...');

    try {
      let imgUrl = '';
      if (formData.image && formData.image.length > 0) {
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`;
        const cloudinaryUploadPreset = import.meta.env
          .VITE_CLOUDINARY_UPLOAD_PRESET;
        const cloudinaryName = import.meta.env.VITE_CLOUDINARY_NAME;

        const newFormData = new FormData();
        newFormData.append('file', formData.image[0]);
        newFormData.append('upload_preset', cloudinaryUploadPreset as string);
        newFormData.append('cloud_name', cloudinaryName as string);

        const { data: cloudinaryData } = await axios.post(
          cloudinaryUrl,
          newFormData
        );
        imgUrl = cloudinaryData.secure_url;
      }

      const res = await createService({
        name: formData.name,
        description: formData.description,
        duration: Number(formData.duration),
        price: Number(formData.price),
        image: imgUrl,
      }).unwrap();

      toast.dismiss(toastId);
      if (res?.success) {
        toast.success('Service created successfully');
        reset(); // Reset form fields after successful submission
        onOpenChange(); // Close the modal
      } else {
        toast.error('Failed to create service');
      }
    } catch (err) {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <Tooltip color="default" content="Create Service">
        <Button
          onPress={onOpen}
          size="sm"
          color="warning"
          className="text-slate-50"
          variant="solid"
          endContent={<FaPlus />}
        >
          Add Service
        </Button>
      </Tooltip>

      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent className="m-2">
          <ModalHeader className="flex flex-col gap-1">
            Create Service
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center justify-center gap-5 border rounded-md p-3 lg:p-5 w-full">
                <Input
                  {...register('name', { required: true })}
                  label="Service Name"
                  color="warning"
                  variant="bordered"
                  placeholder="Enter service name"
                  type="text"
                  fullWidth
                  endContent={<FaUser className="text-2xl text-warning" />}
                />
                <Textarea
                  {...register('description', { required: true })}
                  label="Description"
                  color="warning"
                  variant="bordered"
                  placeholder="Enter service description"
                  rows={3}
                  fullWidth
                  endContent={
                    <FaAudioDescription className="text-2xl text-warning" />
                  }
                />
                <Input
                  {...register('duration', { required: true })}
                  label="Duration (minutes)"
                  color="warning"
                  variant="bordered"
                  placeholder="Enter duration"
                  type="number"
                  fullWidth
                  endContent={<FaClock className="text-2xl text-warning" />}
                />
                <Input
                  {...register('price', { required: true })}
                  label="Price"
                  color="warning"
                  variant="bordered"
                  placeholder="Enter price"
                  type="number"
                  fullWidth
                  endContent={
                    <FaMoneyBillWave className="text-2xl text-warning" />
                  }
                />
                <Input
                  {...register('image')}
                  label="Service Image"
                  color="warning"
                  variant="bordered"
                  placeholder="Upload image (optional)"
                  type="file"
                  fullWidth
                  endContent={<FaImage className="text-2xl text-warning" />}
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
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateServiceModal;
