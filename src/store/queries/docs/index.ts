/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../base";

export const projectAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDocsInGroup: build.query<any, any>({
      query: ({ groupId, projectId }) => ({
        url: `storage/docs/${projectId}/${groupId}`,
        method: "GET",
        flashError: true,
      }),
    }),
  }),
});

export const { useGetDocsInGroupQuery } = projectAPI;
