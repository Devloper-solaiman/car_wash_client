import { TResponseRedux, TReview } from "../../types";
import { baseApi } from "../api/baseApi";

const websiteReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWebsiteReviews: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([name, value]) => {
            params.append(name, value as string);
          });
        }

        return {
          url: "/website-reviews",
          method: "GET",
          params, // Attach the URL parameters
        };
      },
      transformResponse: (response: TResponseRedux<TReview[]>) => {
        return {
          data: response.data?.result || [],
          meta: response.data?.meta || {},
        };
      },
      providesTags: ["reviews"],
    }),
    addWebsiteReview: builder.mutation({
      query: (data) => ({
        url: "/website-reviews/create-website-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const { useGetAllWebsiteReviewsQuery, useAddWebsiteReviewMutation } =
  websiteReviewApi;
