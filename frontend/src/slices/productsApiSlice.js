import { PRODUCT_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    // Get a single product
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    // Create a product
    createProduct: builder.mutation({
      // we don't need to pass the body because we are sending a sample product
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",

        credentials: "include",
      }),
      //it will stop it from being cached so that we can see the new product in the list
      // if we don't do this, we will have to refresh the page to see the new product
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
} = productsApiSlice;
