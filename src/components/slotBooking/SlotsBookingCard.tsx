import { FC, useState } from "react";
import { useTheme } from "next-themes";
import NoData from "../serviceSlots/NoData";
import { Card, Chip } from "@nextui-org/react";
import { FaClock, FaTrash } from "react-icons/fa";
import { TSlotBookmark } from "../../redux/features/user/slotBookmarkSlice";
import { useAppDispatch } from "../../redux/hook";
import { removeBookmark } from "../../redux/features/user/slotBookmarkSlice";
import BookingDeleteModal from "../modal/BookingDeleteModal";
import { toast } from "sonner";
import { formatTo12Hour } from "../../utils/FormatDate";

type TSlotsBookingCardProps = {
  bookingData: TSlotBookmark;
};

const SlotsBookingCard: FC<TSlotsBookingCardProps> = ({ bookingData }) => {
  const { theme } = useTheme();
  const {
    serviceName,
    serviceImage,
    price,
    duration,
    startTime,
    endTime,
    slotId,
  } = bookingData;
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(removeBookmark(slotId));
    toast.success("Booking slot delete successfully");
  };

  if (!bookingData) {
    return <NoData text="Service data not available" />;
  }

  return (
    <>
      <Card
        className={`p-2 md:p-6 rounded-lg bg-white bg-opacity-10 border m-2 ${
          theme === "dark" ? "border-gray-100 border-opacity-15" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-5 w-full">
          <div className="flex flex-col items-center justify-center gap-3">
            <Chip className="text-sm font-bold whitespace-nowrap">
              {serviceName}
            </Chip>
            <img
              src={serviceImage}
              alt={serviceName}
              className="w-[100px] object-cover mb-4 rounded-lg"
            />
          </div>
          <div className="flex items-start flex-col gap-4 w-8/12">
            <div className="flex flex-col md:flex-row items-start justify-between w-full gap-3">
              <Chip color="warning" variant="dot">
                Start Time: {formatTo12Hour(startTime)}
              </Chip>
              <Chip color="warning" variant="dot">
                End Time: {formatTo12Hour(endTime)}
              </Chip>
            </div>
            <div className="flex items-start flex-col md:flex-row justify-between w-full gap-3">
              <Chip color="warning" variant="flat">
                <p className="text-sm flex items-center gap-2">
                  <FaClock size={16} className="mb-0.5" /> {duration} minutes
                </p>
              </Chip>
              <Chip>
                <p className="text-lg font-bold text-primaryColor">
                  ৳{price.toFixed(2)}
                </p>
              </Chip>
            </div>
          </div>
          <div>
            <button
              className={`bg-gray-300 rounded-xl p-3 text-red-500 transition-colors duration-200 ${
                theme === "dark" ? "bg-opacity-30" : ""
              }`}
              onClick={() => setModalOpen(true)}
            >
              <FaTrash size={25} />
            </button>
          </div>
        </div>
      </Card>

      <BookingDeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default SlotsBookingCard;
