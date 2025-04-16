import { Skeleton } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { FC } from "react";

type TSlotSkeletonProps = object;

const SlotSkeleton: FC<TSlotSkeletonProps> = () => {
  const { theme } = useTheme();
  const skeletonColor = theme === "dark" ? "" : "";

  return (
    <div className={`mt-6 flex flex-col justify-center m-2 ${skeletonColor}`}>
      <div className="my-3">
        <Skeleton className="w-[120px] h-[32px] rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between w-full gap-3">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className={`flex flex-col gap-3 items-start border px-3 py-2 rounded-md ${skeletonColor} ${
              theme === "dark" ? "border-gray-100 border-opacity-15" : ""
            }`}
          >
            <Skeleton className="w-[150px] h-[24px] rounded-md" />
            <div className="flex items-center justify-between gap-3 mb-5 mt-2 w-full">
              <Skeleton className="w-[100px] h-[24px] rounded-full" />
              <Skeleton className="w-[100px] h-[24px] rounded-full" />
            </div>
            <Skeleton className="w-full h-[36px] rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotSkeleton;
