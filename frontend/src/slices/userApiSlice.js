import { USER_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: user,
      }),
    }),
    // getUserDetails: builder.query({
    //   query: () => ({
    //     url: `${USER_URL}/profile`,
    //   }),
    // }),
    // updateUserProfile: builder.mutation({
    //   query: (updatedUser) => ({
    //     url: `${USER_URL}/profile`,
    //     method: "PUT",
    //     body: updatedUser,
    //   }),
    // }),
    // logoutUser: builder.mutation({
    //   query: () => ({
    //     url: `${USER_URL}/logout`,
    //     method: "POST",
    //   }),
    // }),

    // // admin routes
    // getUsers: builder.query({
    //   query: () => ({
    //     url: `${USER_URL}`,
    //   }),
    // }),

    // getUserDetailsById: builder.query({
    //   query: (userId) => ({
    //     url: `${USER_URL}/${userId}`,
    //   }),
    // }),

    // updateUser: builder.mutation({
    //   query: (updatedUser) => ({
    //     url: `${USER_URL}/${updatedUser._id}`,
    //     method: "PUT",
    //     body: updatedUser,
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
  // useGetUserDetailsQuery,
  // useUpdateUserProfileMutation,
  // useLogoutUserMutation,
  // useGetUsersQuery,
  // useGetUserDetailsByIdQuery,
  // useUpdateUserMutation,
  // useDeleteUserMutation,
} = usersApiSlice;
