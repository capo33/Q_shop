import { USER_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),

    profile: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: userData,
        credentials: "include",
      }),
    }),

    // admin routes
    // Get all users
    getUsers: builder.query({
      query: () => ({
        url: `${USER_URL}`,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
        method: "DELETE",
      }),
    }),

    // Get user details
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Update user
    updateUser: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/${userData.userId}`,
        method: "PUT",
        body: userData,
      }),
      // invalidatesTags means that when this mutation is called, it will invalidate the cache for the "User" tag
      invalidatesTags: ["User"], 
      
    }),
    // getUserDetailsById: builder.query({
    //   query: (userId) => ({
    //     url: `${USER_URL}/${userId}`,
    //   }),
    // }),


    // deleteUser: builder.mutation({
    //   query: (userId) => ({
    //     url: `${USER_URL}/${userId}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  // useGetUserDetailsByIdQuery,
  // useUpdateUserMutation,
} = usersApiSlice;
