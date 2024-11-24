import { baseApi } from "../base";

export const usersAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => "users",
    }),
  }),
});

export const { useGetAllUsersQuery } = usersAPI;
