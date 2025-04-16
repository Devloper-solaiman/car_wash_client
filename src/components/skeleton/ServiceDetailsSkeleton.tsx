import { Divider, Skeleton } from '@nextui-org/react';
import { useTheme } from 'next-themes';

const ServiceDetailsSkeleton = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen mt-2  m-2${
        theme === 'dark' ? 'text-white' : 'text-black'
      }`}
    >
      <div className="mb-4 flex items-center justify-between mt-5">
        <Skeleton className="w-[80px] rounded-xl h-[40px]" />
        <Skeleton className="w-[80px] rounded-xl h-[40px]" />
      </div>

      <div className="max-w-7xl mx-auto bg-white bg-opacity-10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-5 w-full">
          <div className="flex flex-col gap-3 w-full">
            <Skeleton className="w-[100px] h-[30px] rounded-full" />
            <Skeleton className="w-full md:w-[450px] h-[256px] rounded-xl" />
            <Skeleton className="w-full h-[24px] mb-4 md:w-[450px] rounded-2xl" />
            <div className="flex items-center gap-3 justify-between w-full md:w-[450px] ">
              <Skeleton className="w-[100px] h-[30px] rounded-full" />
              <Skeleton className="w-[100px] h-[30px] rounded-full" />
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <Skeleton className="w-[100px] h-[30px] rounded-full" />
            <Skeleton className="w-[220px] h-[300px] rounded-xl" />
            <Skeleton className="w-full h-[100px] rounded-lg" />
          </div>
        </div>
        <Divider className="my-4" />
      </div>
    </div>
  );
};

export default ServiceDetailsSkeleton;
