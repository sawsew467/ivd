import { Project } from "@/features/projects/types";
import { baseApi } from "../base";

export const projectAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProject: build.query<Project[], unknown>({
      query: () => ({
        url: "projects",
        method: "GET",
        flashError: true,
      }),
    }),
  }),
});

export const { useGetAllProjectQuery } = projectAPI;
