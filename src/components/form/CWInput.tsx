import { Input } from "@nextui-org/react";
import { useFormContext, Controller } from "react-hook-form";
import { FC, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

type TCWInputProps = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  icon?: JSX.Element;
  defaultValue?: string;
  required?: boolean;
};

const CWInput: FC<TCWInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  icon = (
    <IoMdPerson className="text-2xl text-warning pointer-events-none flex-shrink-0" />
  ),
  defaultValue,
  required,
}) => {
  const { control } = useFormContext();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const isPasswordField = type === "password";
  const inputType = isPasswordField && passwordVisible ? "text" : type;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Input
          {...field}
          label={label}
          placeholder={placeholder}
          type={inputType}
          endContent={
            isPasswordField ? (
              passwordVisible ? (
                <IoEyeOffOutline
                  className="text-xl cursor-pointer text-warning"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoEyeOutline
                  className="text-xl cursor-pointer text-warning"
                  onClick={togglePasswordVisibility}
                />
              )
            ) : (
              icon
            )
          }
          variant="bordered"
          color="warning"
          required={required}
        />
      )}
    />
  );
};

export default CWInput;
