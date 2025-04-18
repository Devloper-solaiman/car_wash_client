import { Button } from "@nextui-org/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

type TBackButtonProps = object;

const BackButton: FC<TBackButtonProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="py-4 flex justify-between mr-1 ml-1">
      <Button
        isIconOnly
        startContent={<IoIosArrowBack />}
        variant="flat"
        onClick={() => window.history.back()}
        className="bg-default-100/50"
      ></Button>
      <Button
        className="bg-transparent dark:text-black dark:bg-warning-600 bg-warning-300 border border-default-100/50"
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default BackButton;
