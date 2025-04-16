import { Skeleton } from "@nextui-org/react";
import { FC } from "react";

type TLoaderSkeletonProps = object;

const LoaderSkeleton: FC<TLoaderSkeletonProps> = () => {
  return (
    <div className="min-h-[70vh] flex justify-center items-center m-2">
      <div className="flex flex-col justify-center items-center space-y-4 w-full">
        <div>
          <Skeleton className="w-3/4 lg:w-[150px] h-4 rounded-md" />
        </div>
        <div>
          <Skeleton className="w-3/5 lg:w-[100px] h-4 rounded-md" />
        </div>
        <div>
          <Skeleton className="w-3/4 lg:w-[150px] h-4 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default LoaderSkeleton;
