import { FC } from 'react';
import { FaRegNoteSticky } from 'react-icons/fa6';

type TNoDataProps = { text: string };

const NoData: FC<TNoDataProps> = ({ text }) => {
  return (
    <div className="flex justify-center items-center h-[300px] lg:h-[70vh]">
      <h1
        className={`bg-default-100 px-5 text-default-700 py-10 text-sm rounded-md flex-col flex items-center justify-between gap-3  w-[300px]`}
      >
        <FaRegNoteSticky className="text-warning size-10 animate-bounce ml-2" />
        {text}
      </h1>
    </div>
  );
};

export default NoData;
