import { TUserData } from "./userManagement.type";

export type TReview = {
  _id: string;
  user: TUserData;
  feedback: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
