/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateInput } from "@nextui-org/react";
import { useFormContext, Controller } from "react-hook-form";
import { FC } from "react";
import { CalendarDate } from "@internationalized/date";
import { FaCalendar } from "react-icons/fa";

type TCWDateInputProps = {
  name: string;
  label: string;
  placeholderValue?: CalendarDate;
  required?: boolean;
  className?: string;
  endContent?: JSX.Element;
};

const CWDateInput: FC<TCWDateInputProps> = ({
  name,
  label,
  placeholderValue,
  className,
  endContent = (
    <FaCalendar className="text-2xl text-warning pointer-events-none flex-shrink-0" />
  ), // Default endContent
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={placeholderValue} // Use CalendarDate for default
      render={({ field }) => (
        <DateInput
          {...field}
          label={label}
          placeholderValue={placeholderValue}
          className={className}
          color="warning"
          variant="bordered"
          isRequired
          endContent={endContent}
        />
      )}
    />
  );
};

export default CWDateInput;
