import { Button, Skeleton } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import SectionTitle from '../ui/SectionTitle';

type TWebsiteReviewSkeletonProps = object;

const WebsiteReviewSkeleton: FC<TWebsiteReviewSkeletonProps> = () => {
  const [itemsCount, setItemsCount] = useState(1);
  const { theme } = useTheme();

  const skeletonColor = theme === 'dark' ? '' : '';

  useEffect(() => {
    const updateItemsCount = () => {
      if (window.innerWidth >= 1280) {
        setItemsCount(5);
      } else if (window.innerWidth >= 1024) {
        setItemsCount(4);
      } else if (window.innerWidth >= 768) {
        setItemsCount(3);
      } else {
        setItemsCount(2);
      }
    };
    updateItemsCount();
    window.addEventListener('resize', updateItemsCount);
    return () => window.removeEventListener('resize', updateItemsCount);
  }, []);

  return (
    <div className={`min-h-screen px-2 mt-2 ${skeletonColor}`}>
      <SectionTitle
        subHeader="Customer Reviews"
        header="What Our Clients Say"
        des="Read real testimonials from our satisfied clients. We pride ourselves on our quality of service and customer satisfaction."
      />
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
        <Skeleton className="w-[250px] h-5 rounded-xl mt-3" />

        <Button
          color="warning"
          variant="shadow"
          radius="full"
          className="text-white"
        >
          Add Review
        </Button>
      </div>

      <div className="flex flex-row items-start justify-between gap-2 w-full">
        {[...Array(itemsCount)].map((index) => (
          <div
            key={index}
            className={`flex flex-col gap-3 w-full border rounded-md p-3 mt-5 ${
              theme === 'dark' ? 'border-gray-100 border-opacity-15' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div className="size-10">
                <Skeleton className="w-10 h-10 rounded-full object-cover" />
              </div>
              <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-3 w-full">
                <Skeleton className="w-full h-3 rounded-xl" />
                <Skeleton className="w-10/12 h-3 rounded-xl" />
              </div>
            </div>
            <Skeleton className="w-full h-3 rounded-xl mt-3" />
            <Skeleton className="w-5/12 h-3 rounded-xl mt-1" />
            <div className="flex justify-end items-center gap-3 w-full mt-3">
              <Skeleton className="w-[100px] h-[15px] rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-5">
        <Button
          isIconOnly
          radius="full"
          startContent={<IoIosArrowBack size={25} />}
          aria-label="Previous review"
          className="bg-default-200 p-1 rounded-full text-warning-500"
        />
        <Button
          isIconOnly
          radius="full"
          startContent={<IoIosArrowForward size={25} />}
          aria-label="Next review"
          className="bg-default-200 p-1 rounded-full text-warning-500"
        />
      </div>
    </div>
  );
};

export default WebsiteReviewSkeleton;
