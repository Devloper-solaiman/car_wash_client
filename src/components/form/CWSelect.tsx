import { FC } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useFormContext, Controller } from "react-hook-form";

type TCWSelectProps = {
  name: string;
  label: string;
  placeholder: string;
  items: Array<{ key: string; label: string }>;
  defaultSelectedKeys?: string[];
  isRequired?: boolean;
};

const CWSelect: FC<TCWSelectProps> = ({
  name,
  label,
  placeholder,
  items,
  defaultSelectedKeys = [],
  isRequired = false,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          label={label}
          placeholder={placeholder}
          defaultSelectedKeys={defaultSelectedKeys}
          isRequired={isRequired}
          color="warning"
          variant="bordered"
        >
          {items.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default CWSelect;
