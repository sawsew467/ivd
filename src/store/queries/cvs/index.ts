/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../base";

export const projectAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCvs: build.query<any, any>({
      query: (projectId) => ({
        url: `/storage/cvs/${projectId}`,
        method: "GET",
        flashError: true,
      }),
    }),
  }),
});

export const { useGetAllCvsQuery } = projectAPI;
