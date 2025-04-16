import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import {
  logout,
  TUser,
  useCurrentUser,
} from '../../../../redux/features/auth/authSlice';
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from '../../../../redux/features/auth/authApi';
import { Avatar, Button, Chip } from '@nextui-org/react';
import {
  FaAddressBook,
  FaPhone,
  FaPlus,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { toast } from 'sonner';
import axios from 'axios';
import UserDetailsModal from '../../../../components/modal/UserDetailsModal';

const AdminProfile: FC = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data: userData } = useGetMeQuery(user?.email);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const dispatch = useAppDispatch();

  const userDetails = userData?.data;
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    userDetails?.profileImg || null
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Display preview
      setIsEditing(true); // Show Save and Cancel buttons
    }
  };

  const handleSaveImage = async () => {
    if (!selectedImage) return;

    const toastId = toast.loading('Updating your profile...');
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_NAME
    }/image/upload`;
    const cloudinaryUploadPreset = import.meta.env
      .VITE_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('upload_preset', cloudinaryUploadPreset as string);

    try {
      const { data: cloudinaryData } = await axios.post(
        cloudinaryUrl,
        formData
      );
      const imgUrl = cloudinaryData.secure_url;

      await updateUser({
        id: userDetails?._id,
        data: { profileImg: imgUrl },
      }).unwrap();

      toast.success('Profile image updated successfully', { id: toastId });
      setIsEditing(false); // Hide Save and Cancel buttons after save
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile image', { id: toastId });
    }
  };

  const handleCancelEdit = () => {
    setImagePreview(userDetails?.profileImg || null); // Reset to original profile image
    setSelectedImage(null); // Clear selected file
    setIsEditing(false); // Hide Save and Cancel buttons
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Left Side - User Info */}
      <div className="border border-default-50 rounded-md w-full lg:w-1/3 flex flex-col items-center mx-auto relative">
        {/* Avatar with upload functionality */}
        <div className="relative">
          <Avatar
            className="w-20 h-20 rounded-full object-cover"
            src={imagePreview || userDetails?.profileImg}
            alt={userDetails?.name}
          />
          <label className="absolute bottom-0 right-0 bg-default-400 text-white rounded-full p-1 cursor-pointer">
            <FaPlus />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <h2 className="mt-2 font-bold text-lg">
          {userDetails?.name || 'John Doe'}
        </h2>

        {/* Save and Cancel buttons, only shown when an image is selected */}
        {isEditing && (
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              color="warning"
              variant="flat"
              onClick={handleSaveImage}
              isLoading={isLoading}
              startContent={<FaSave />}
            >
              Save
            </Button>
            <Button
              size="sm"
              onClick={handleCancelEdit}
              startContent={<FaTimes />}
            >
              Cancel
            </Button>
          </div>
        )}
        <div className="w-full mx-auto flex items-center justify-center">
          <Button
            size="sm"
            color="warning"
            variant="solid"
            radius="full"
            onClick={() => dispatch(logout())}
            className="mt-3 w-[100px] text-white"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Right Side - Contact and Activity Information */}
      <div className="flex flex-col gap-5 w-full mx-auto">
        {/* Contact Information */}
        <div className="border border-default-50 p-4 rounded-md">
          <div className="flex items-center justify-between gap-2">
            <Chip className="font-medium text-lg mb-3">
              Contact Information
            </Chip>
            <UserDetailsModal />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-b border-default-200 pt-2">
              <IoMail size={16} />{' '}
              <span>{userDetails?.email || 'example@example.com'}</span>
            </div>
            <div className="flex items-center gap-2 border-b border-default-200 pt-2">
              <FaPhone size={16} />{' '}
              <span>{userDetails?.phone || '(123) 456-7890'}</span>
            </div>
            <div className="flex items-center gap-2 border-b border-default-200 pt-2">
              <FaAddressBook size={16} />{' '}
              <span>{userDetails?.address || 'San Francisco, CA'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
