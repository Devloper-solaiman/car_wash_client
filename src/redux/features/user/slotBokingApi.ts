import { TResponseRedux, TSlotBooking } from "../../../types";
import { baseApi } from "../../api/baseApi";

const slotBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlotBookings: builder.mutation({
      query: (data) => {
        return {
          url: "/bookings",
          method: "POST",
          body: data,
        };
      },
    }),
    getSingleService: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "Get",
      }),
    }),
    getAllMyBookings: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: "/my-bookings",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TSlotBooking[]>) => {
        return {
          data: response.data?.result || [],
          meta: response.data?.meta || {},
        };
      },
    }),
  }),
});

export const {
  useCreateSlotBookingsMutation,
  useGetSingleServiceQuery,
  useGetAllMyBookingsQuery,
} = slotBookingApi;
