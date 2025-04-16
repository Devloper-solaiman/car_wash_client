/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import {
  Avatar,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useGetAllUsersQuery } from '../../../../redux/features/admin/userManagementApi';
import { TMeta, TUserData } from '../../../../types';
import LoaderSkeleton from '../../../../components/skeleton/LoaderSkeleton';
import UserRoleDropdown from './UserRoleDropdown';
import { useTheme } from 'next-themes';
import NoData from '../../../../components/serviceSlots/NoData';

type TAllUsersProps = object;

const AllUsers: FC<TAllUsersProps> = () => {
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const queryParams: Record<string, string> = {
    sort: '-createdAt',
    limit: '9',
    page: page.toString(),
  };

  const { data: AllUsersData, isLoading } = useGetAllUsersQuery(
    queryParams || undefined
  );
  const users = AllUsersData?.data as TUserData[];
  const meta = AllUsersData?.meta as TMeta | undefined;

  const handlePageChange = (newPage: number) => setPage(newPage);

  if (isLoading) {
    return <LoaderSkeleton />;
  }

  if (!users || (users?.length === 0 && undefined)) {
    return <NoData text="There are no users available" />;
  }

  return (
    <div>
      <div className="mb-3">
        <Chip variant="bordered">All Bookings Users</Chip>
      </div>
      <Table aria-label="Users Overview Table">
        <TableHeader>
          <TableColumn>User</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Address</TableColumn>
          <TableColumn>Update Role</TableColumn>
        </TableHeader>
        <TableBody items={users || []}>
          {(user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar radius="full" src={user.profileImg} />
                  <div>
                    <h2 className="text-sm whitespace-nowrap">{user.name}</h2>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <UserRoleDropdown user={user} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {meta && (
        <div className="mt-10 flex justify-center items-start">
          <Pagination
            color="default"
            variant="flat"
            showControls
            total={meta.totalPage}
            initialPage={page}
            className={`mb-5 px-5 py-1 mx-3 border-none shadow-none rounded-full bg-[#F4F4F5] ${
              theme === 'dark' ? ' bg-opacity-30' : ''
            }`}
            onChange={(newPage) => handlePageChange(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
