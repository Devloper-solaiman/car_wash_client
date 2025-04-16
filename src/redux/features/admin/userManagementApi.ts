import { TResponseRedux, TUserData } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: "/auth/users",
          method: "GET",
          params,
        };
      },
      providesTags: ["users"],
      transformResponse: (response: TResponseRedux<TUserData[]>) => {
        return {
          data: response.data?.result || [],
          meta: response.data?.meta || {},
        };
      },
    }),
    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: "/auth/admins",
          method: "GET",
          params,
        };
      },
      providesTags: ["users"],
      transformResponse: (response: TResponseRedux<TUserData[]>) => {
        return {
          data: response.data?.result || [],
          meta: response.data?.meta || {},
        };
      },
    }),
    updateUserRole: builder.mutation({
      query: (args) => ({
        url: `/auth/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllAdminsQuery,
  useUpdateUserRoleMutation,
} = userManagementApi;
