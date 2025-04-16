/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FC } from "react";
import { TSlot } from "../../../../types";
import { useUpdateSlotStatusMutation } from "../../../../redux/features/admin/slotManagementApi";
import { toast } from "sonner";

type TSlotStatusDropdownProps = {
  slot: TSlot;
};

const SlotStatus = {
  Available: "available",
  Canceled: "canceled",
  Booked: "booked",
};

const SlotStatusDropdown: FC<TSlotStatusDropdownProps> = ({ slot }) => {
  const [updateSlotStatus, { isLoading }] = useUpdateSlotStatusMutation();

  // Determine the next status based on the current status
  const nextStatus =
    slot.isBooked === SlotStatus.Available
      ? SlotStatus.Canceled
      : SlotStatus.Available;

  const handleStatusChange = async () => {
    const toastId = toast.loading("Updating status...");
    try {
      const response = await updateSlotStatus({
        id: slot._id,
        data: { isBooked: nextStatus },
      }).unwrap();
      if (response?.success) {
        toast.success(`Slot status updated to ${nextStatus}`, {
          id: toastId,
          duration: 3000,
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast.error("Failed to update slot status", { id: toastId });
    }
  };

  return (
    <Dropdown isDisabled={slot.isBooked === SlotStatus.Booked || isLoading}>
      <DropdownTrigger>
        <Button
          isLoading={isLoading}
          color={"warning"}
          className={
            slot.isBooked === SlotStatus.Available
              ? ""
              : "text-red-500 border border-red-400"
          }
          variant="bordered"
          size="sm"
        >
          {slot.isBooked.charAt(0).toUpperCase() +
            slot.isBooked.slice(1).toLowerCase()}
        </Button>
      </DropdownTrigger>
      {slot.isBooked !== SlotStatus.Booked && (
        <DropdownMenu aria-label="Change Status" onAction={handleStatusChange}>
          <DropdownItem key={nextStatus}>
            {nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}
          </DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default SlotStatusDropdown;
