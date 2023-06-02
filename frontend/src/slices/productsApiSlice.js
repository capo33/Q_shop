import { PRODUCT_URL, UPLOAD_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products
    // getProducts: builder.query({
    //   query: () => ({
    //     url: PRODUCT_URL,
    //   }),
    //   // that we don't want to reload the page when we update a product
    //   keepUnusedDataFor: 5,
    //   providesTags: ["Products"],
    getProducts: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: PRODUCT_URL,
        params: {
          pageNumber,
          keyword,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
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
    // Update a product
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    // upload an image
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    // Delete a product
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Products"],
    }),
    // Create a product review
    // we don't need to get the reviews because we are going to get them from the product details
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    // // Delete a product review
    // deleteReview: builder.mutation({
    //   query: (data) => ({
    //     url: `${PRODUCT_URL}/${data.productId}/reviews/${data.reviewId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Products"],
    // }),

    // Get top rated products
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  // useDeleteReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice;
