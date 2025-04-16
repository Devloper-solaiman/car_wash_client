import { FC, useCallback, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  Pagination,
  Chip,
  Tooltip,
} from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useGetAllServicesQuery } from '../../../../redux/features/admin/serviceManagementApi';
import { TMeta, TService } from '../../../../types';
import LoaderSkeleton from '../../../../components/skeleton/LoaderSkeleton';
import ServiceDeleteModal from '../../../../components/modal/ServiceDeleteModal';
import { FaClock } from 'react-icons/fa';
import ServiceUpdateModal from '../../../../components/modal/ServiceUpdateModal';
import ServiceImageModal from '../../../../components/modal/ServiceImageModal';
import CreateServiceModal from '../../../../components/modal/CreateServiceModal';
import NoData from '../../../../components/serviceSlots/NoData';

type TAllServicesProps = object;

const AllServices: FC<TAllServicesProps> = () => {
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const queryParams: Record<string, string> = {
    sort: '-createdAt',
    limit: '10',
    page: page.toString(),
  };
  const { data: servicesData, isLoading } = useGetAllServicesQuery(queryParams);

  const services = servicesData?.data as TService[] | undefined;
  const meta = servicesData?.meta as TMeta;

  const handlePageChange = (newPage: number) => setPage(newPage);

  // table columns
  const columns = [
    { uid: 'image', name: 'Image' },
    { uid: 'description', name: 'Description' },
    { uid: 'duration', name: 'Duration' },
    { uid: 'price', name: 'Price' },
    { uid: 'actions', name: 'Actions' },
  ];

  const renderCell = useCallback(
    (service: TService, columnKey: keyof TService | 'actions') => {
      switch (columnKey) {
        case 'image':
          return (
            <Tooltip content={service?.name}>
              <div className="flex items-center gap-3 justify-between">
                <User
                  avatarProps={{
                    radius: 'full',
                    size: 'md',
                    src: service?.image,
                  }}
                  name={
                    service?.name?.length > 15
                      ? `${service.name.slice(0, 12)}...`
                      : service?.name
                  }
                />
                <ServiceImageModal serviceId={service?._id} />
              </div>
            </Tooltip>
          );
        case 'description':
          return (
            <div className="flex flex-wrap w-[200px]">
              <Tooltip className="w-[300px]" content={service.description}>
                <p className="text-sm capitalize whitespace-nowrap overflow-hidden text-ellipsis">
                  {service.description.length > 40
                    ? `${service.description.substring(0, 40)}...`
                    : service.description}
                </p>
              </Tooltip>
            </div>
          );
        case 'duration':
          return (
            <div className="flex flex-col ">
              <Chip color="warning" variant="flat">
                <p className="text-sm flex items-center gap-2">
                  <FaClock size={16} className="mb-0.5" /> {service.duration}{' '}
                  minutes
                </p>
              </Chip>
            </div>
          );
        case 'price':
          return (
            <div className="flex flex-col">
              <Chip>
                <p className="text-sm font-medium text-primaryColor">
                  ৳ {service.price.toFixed(2)}
                </p>
              </Chip>
            </div>
          );
        case 'actions':
          return (
            <div className="flex items-center gap-3">
              <ServiceUpdateModal service={service} />

              <ServiceDeleteModal id={service?._id} />
            </div>
          );

        default:
          return null;
      }
    },
    []
  );

  if (isLoading) {
    return <LoaderSkeleton />;
  }

  if (!services || (services?.length === 0 && undefined)) {
    return <NoData text="There are no services available" />;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 my-5">
        <Chip variant="bordered">All Services</Chip>
        <CreateServiceModal />
      </div>
      <Table aria-label="Bookings Overview Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={services || []}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof TService | 'actions')}
                </TableCell>
              )}
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

export default AllServices;
