import { TResponseRedux, TService, TSlotBooking } from "../../../types";
import { baseApi } from "../../api/baseApi";

const serviceManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: "/bookings",
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
    getAllServices: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: "/services",
          method: "GET",
          params,
        };
      },
      providesTags: ["services"],
      transformResponse: (response: TResponseRedux<TService[]>) => {
        return {
          data: response.data?.result || [],
          meta: response.data?.meta || {},
        };
      },
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: `/services`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),

    getSingleService: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "Get",
      }),
    }),
    updateService: builder.mutation({
      query: (args) => ({
        url: `/services/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["services"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAllBookingsQuery,
} = serviceManagementApi;
