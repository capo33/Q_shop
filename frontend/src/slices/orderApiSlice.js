import { apiSlice } from "./apiSlice";
import { ORDER_URL } from "../constants/constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: "POST",
        body: {...order},
        credentials: "include",
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    getOrderById: builder.query({
      query: (id) => `${ORDER_URL}/${id}`,
    }),
    getMyOrders: builder.query({
      query: () => `${ORDER_URL}/myorders`,
    }),
    updateOrderToPaid: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/pay`,
        method: "PUT",
      }),
    }),
    updateOrderToDelivered: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/deliver`,
        method: "PUT",
      }),
    }),
    getOrders: builder.query({
      query: () => `${ORDER_URL}`,
    }),

  }),
 });

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
  useUpdateOrderToPaidMutation,
  useUpdateOrderToDeliveredMutation,
  useGetOrdersQuery,
} = orderApiSlice;
