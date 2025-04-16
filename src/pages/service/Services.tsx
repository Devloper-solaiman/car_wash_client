import { FC, useState, useEffect } from 'react';
import { useGetAllServicesQuery } from '../../redux/features/admin/serviceManagementApi';
import { Pagination } from '@nextui-org/react';
import ServiceFilter from '../../components/carService/ServiceFilter';
import ServiceCard from '../../components/carService/ServiceCard';
import { TMeta, TService } from '../../types';
import { useTheme } from 'next-themes';
import ServiceSkeleton from '../../components/skeleton/ServiceSkeleton';
import Container from '../../components/ui/Container';

const Services: FC = () => {
  const [sortItem, setSortItem] = useState('price');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [page, setPage] = useState(1);
  const { theme } = useTheme();

  console.log(minPrice, maxPrice);

  const queryParams: Record<string, string> = {
    sort: sortItem,
    limit: '16',
    page: page.toString(),
  };

  if (searchTerm) queryParams.searchTerm = searchTerm;

  const { data: servicesData, isLoading } = useGetAllServicesQuery(queryParams);
  const services = servicesData?.data as TService[];
  const meta = servicesData?.meta as TMeta;

  const [filteredServices, setFilteredServices] =
    useState<TService[]>(services);

  useEffect(() => {
    if (services?.length > 0) {
      const filtered = services?.filter((service) => {
        const servicePrice = service.price;
        const isAboveMinPrice = minPrice
          ? servicePrice >= parseFloat(minPrice)
          : true;
        const isBelowMaxPrice = maxPrice
          ? servicePrice <= parseFloat(maxPrice)
          : true;
        const matchesSearchTerm = service.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        return isAboveMinPrice && isBelowMaxPrice && matchesSearchTerm;
      });

      setFilteredServices(filtered);
    }
  }, [services, searchTerm, minPrice, maxPrice]);

  const handlePageChange = (newPage: number) => setPage(newPage);

  if (isLoading || !services) {
    return (
      <Container>
        {' '}
        <ServiceSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <div className="m-2 md:m-2">
        <h2 className="font-medium text-start">Home/Services</h2>

        <ServiceFilter
          sortItem={sortItem}
          setSortItem={setSortItem}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {(searchTerm || minPrice || maxPrice
            ? filteredServices
            : services
          )?.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>

        {meta?.totalPage > 1 && (
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
    </Container>
  );
};

export default Services;
