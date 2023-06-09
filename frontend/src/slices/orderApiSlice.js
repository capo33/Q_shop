import { apiSlice } from "./apiSlice";
import { ORDER_URL, PAYPAL_URL } from "../constants/constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: "POST",
        body: { ...order },
        credentials: "include",
      }),
    }),

    // Read
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    // Update
    payOrder: builder.mutation({
      // we destructured the orderId and details from the payload object because we want to pass them as separate arguments to the query function
      query: ({ orderId, details }) => ({
        url: `${ORDER_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
        credentials: "include",
      }),
    }),

    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/myorders`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    // updateOrderToPaid: builder.mutation({
    //   query: (id) => ({
    //     url: `${ORDER_URL}/${id}/pay`,
    //     method: "PUT",
    //   }),
    // }),
    updateOrderToDelivered: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/deliver`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  // useGetOrderByIdQuery,
  // useUpdateOrderToPaidMutation,
  useUpdateOrderToDeliveredMutation,
} = orderApiSlice;
