/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import {
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useGetAllAdminsQuery } from '../../../../redux/features/admin/userManagementApi'; // Adjust the import path as needed
import { TUserData } from '../../../../types';
import LoaderSkeleton from '../../../../components/skeleton/LoaderSkeleton';
import UserRoleDropdown from './UserRoleDropdown';
import NoData from '../../../../components/serviceSlots/NoData';

type TAllAdminsProps = object;

const AllAdmins: FC<TAllAdminsProps> = () => {
  const queryParams: Record<string, string> = {
    sort: '-createdAt',
    limit: '10000',
  };

  const { data: allAdminsData, isLoading } = useGetAllAdminsQuery(queryParams);
  const admins = allAdminsData?.data as TUserData[];

  if (isLoading) {
    return <LoaderSkeleton />;
  }

  if (!admins || (admins?.length === 0 && undefined)) {
    return <NoData text="There are no admin available" />;
  }

  return (
    <div>
      <div className="mb-3">
        <Chip variant="bordered">All Admins</Chip>
      </div>
      <Table aria-label="Admins Overview Table">
        <TableHeader>
          <TableColumn>User</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Address</TableColumn>
          <TableColumn>Update Role</TableColumn>
        </TableHeader>
        <TableBody items={admins || []}>
          {(admin) => (
            <TableRow key={admin._id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar radius="full" src={admin.profileImg} />
                  <div>
                    <h2 className="text-sm whitespace-nowrap">{admin.name}</h2>
                  </div>
                </div>
              </TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.phone}</TableCell>
              <TableCell className="whitespace-nowrap">
                {admin.address}
              </TableCell>
              <TableCell>
                <UserRoleDropdown user={admin} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllAdmins;
