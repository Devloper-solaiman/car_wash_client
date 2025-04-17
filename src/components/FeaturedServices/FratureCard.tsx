/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { truncateText } from "../../utils/Text.utils";
import { FaDollarSign, FaFire } from "react-icons/fa6";
interface PerfectCardProps {
  service: any;
  onClick: () => void;
}

export const FeatureCard: React.FC<PerfectCardProps> = ({
  service,
  onClick,
}) => {
  const { name, description, image, price } = service;
  return (
    <a onClick={onClick}>
      <Card  className="max-w-sm w-full h-[300px] shadow-lg overflow-hidden transition-all ease-in-out rounded-sm hover:shadow-xl hover:scale-105 duration-300">
        <CardBody className="overflow-visible p-0">
          <Image
            alt={name}
            className="w-full object-cover h-[140px]"
            radius="none"
            shadow="sm"
            src={image}
            width="100%"
          />
        </CardBody>
        <CardHeader className="flex flex-col  items-start">
          <h2 className="font-bold text-gray-900 dark:text-gray-100">
            {truncateText(name, 30)}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-200">
            {truncateText(description, 50)}
          </p>
        </CardHeader>

        <CardFooter className="flex justify-between" >
            <span className="flex justify-center items-center text-white text-small bg-gray-500 px-2 rounded-2xl">
              <FaDollarSign size={14}/>{price}
            </span>
            <span className="flex justify-center items-center dark:text-white text-small bg-warning-200 py-1 px-2 rounded-2xl">
              <FaFire size={18} className="text-warning-600"/> Trending
            </span>
        </CardFooter>
      </Card>
    </a>
  );
};
