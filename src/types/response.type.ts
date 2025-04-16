import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TError = {
  success: boolean;
  message: string;
  errorMessages: TErrorMessages;
};

export type TData<T> = {
  result?: T;
  meta?: TMeta;
};

export type TResponse<T> = {
  data?: TData<T>;
  error?: TError;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TErrorMessages = {
  path: string | number;
  message: string;
}[];
