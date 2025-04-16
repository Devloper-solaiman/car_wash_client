/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@nextui-org/react";
import { truncateText } from "../../utils/Text.utils";

interface PerfectCardProps {
  service: any;
  onClick: () => void;
}

export const FeatureCard: React.FC<PerfectCardProps> = ({
  service,
  onClick,
}) => {
  const { name, description, image, ctaText } = service;
  return (
    <Card className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
      <CardHeader className="p-4 flex flex-col items-start">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {truncateText(name, 50)}
        </h2>
        <p className="text-sm text-gray-600">
          {truncateText(description, 100)}
        </p>
      </CardHeader>
      <CardBody className="p-0">
        <Image
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
      </CardBody>
      <CardFooter className="p-4 flex justify-end">
        <Button
          color="primary"
          onClick={onClick}
          className="font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
};
