/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../base";

export const projectAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRoadmaps: build.query<any, unknown>({
      query: () => ({
        url: "roadmaps/e1bccc14-6f95-43f1-9fd9-deb9ee1122cd",
        method: "GET",
        flashError: true,
      }),
    }),
    generateRoadmap: build.mutation({
      query: (body: any) => ({
        url: "roadmaps/generate",
        method: "POST",
        body,
        flashError: true,
      }),
    }),
    createRoadmap: build.mutation({
      query: (body: any) => ({
        url: "roadmaps/create",
        method: "POST",
        body,
        flashError: true,
      }),
    }),
    getUserRoadmaps: build.query<any, unknown>({
      query: () => ({
        url: "roadmaps/e1bccc14-6f95-43f1-9fd9-deb9ee1122cd?userId=0e9de8ba-b406-4f73-89c5-94e9a9c2ee9e",
        method: "GET",
        flashError: true,
      }),
    }),
  }),
});

export const {
  useGetAllRoadmapsQuery,
  useGenerateRoadmapMutation,
  useCreateRoadmapMutation,
  useGetUserRoadmapsQuery,
} = projectAPI;
