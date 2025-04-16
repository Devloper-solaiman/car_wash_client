import { TService } from "./sercive.type";
import { TSlot } from "./slotManagement.type";

export type TUserData = {
  profileImg: string;
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TSlotBooking = {
  _id: string;
  customer: TUserData;
  service: TService[];
  slot: TSlot[];
  name: string;
  email: string;
  phone: string;
  address: string;
  vehicleType: string;
  transitionId: string;
  totalPrice: number;
  paymentStatus: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  createdAt: string;
  updatedAt: string;
};
