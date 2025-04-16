import { Textarea, TextAreaProps } from "@nextui-org/react";
import { useFormContext, Controller } from "react-hook-form";
import { ReactNode, FC } from "react";

type CWTextareaProps = {
  name: string;
  label: string;
  placeholder: string;
  rows: number;
  endContent?: ReactNode;
  defaultValue?: string;
} & TextAreaProps;

const CWTextarea: FC<CWTextareaProps> = ({
  name,
  label,
  placeholder,
  endContent,
  rows,
  defaultValue,
  ...textareaProps
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <Textarea
            {...field}
            label={label}
            color="warning"
            variant="bordered"
            placeholder={placeholder}
            endContent={endContent}
            rows={rows}
            value={field.value || ""}
            status={error ? "error" : undefined}
            {...textareaProps}
          />
          {error && (
            <p className="text-xs text-red-500 mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default CWTextarea;
