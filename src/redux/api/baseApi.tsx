/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
// import { toast } from 'sonner';
import { TError } from '../../types';

const development = import.meta.env.VITE_WORKSPACE;
const localUrl = import.meta.env.VITE_BASE_URL;
const liveUrl = import.meta.env.VITE_LIVE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${development === 'development' ? localUrl : liveUrl}`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  console.log('baseApi response=>', result);

  if (result?.error?.status) {
    const errorData = result.error.data as TError;

    console.log(errorData.errorMessages?.[0]?.message, errorData);
    // if (result.error.status === 500) {
    //   toast.error(errorData.errorMessages?.[0]?.message, { duration: 3000 });
    // }
    // if (result.error.status === 404) {
    //   toast.error(errorData.errorMessages?.[0]?.message, { duration: 3000 });
    // }
    // if (result.error.status === 403) {
    //   toast.error(errorData.errorMessages?.[0]?.message, { duration: 3000 });
    // }
    // if (result.error.status === 400) {
    //   toast.error(errorData.errorMessages?.[0]?.message, { duration: 3000 });
    // }
    // if (result.error.status === 409) {
    //   toast.error(errorData.errorMessages?.[0]?.message, { duration: 3000 });
    // }
    // if (result.error.status === 401) {
    //   result = await baseQuery(args, api, extraOptions);
    // }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['users', 'reviews', 'userInfo', 'services', 'slots'],
  endpoints: () => ({}),
});
