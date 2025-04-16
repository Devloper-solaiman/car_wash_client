/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { FC } from "react";
import { TUserData } from "../../../../types";
import { useUpdateUserRoleMutation } from "../../../../redux/features/admin/userManagementApi";
import { toast } from "sonner";

type TUserRoleDropdownProps = {
  user: TUserData;
};

const UserRole = {
  Admin: "admin",
  User: "user",
};

const UserRoleDropdown: FC<TUserRoleDropdownProps> = ({ user }) => {
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();

  // Determine the next role based on the current role
  const nextRole = user.role === UserRole.User ? UserRole.Admin : UserRole.User;

  const handleRoleChange = async () => {
    const toastId = toast.loading("Updating role...");
    try {
      const response = await updateUserRole({
        id: user._id,
        data: { role: nextRole },
      }).unwrap();
      if (response?.success) {
        toast.success(`User role updated to ${nextRole}`, {
          id: toastId,
          duration: 3000,
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast.error("Failed to update user role", { id: toastId });
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isLoading={isLoading}
          color={"warning"}
          variant="bordered"
          size="sm"
        >
          <Tooltip content={"Update Role"}>
            {user.role.charAt(0).toUpperCase() +
              user.role.slice(1).toLowerCase()}
          </Tooltip>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Change Role">
        <DropdownItem
          key={nextRole}
          onClick={handleRoleChange}
          isDisabled={isLoading}
        >
          {nextRole.charAt(0).toUpperCase() + nextRole.slice(1)}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserRoleDropdown;
