/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../base";

export const projectAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserExams: build.query<any, unknown>({
      query: () => ({
        url: "exams/e1bccc14-6f95-43f1-9fd9-deb9ee1122cd?userId=0e9de8ba-b406-4f73-89c5-94e9a9c2ee9e",
        method: "GET",
        flashError: true,
      }),
    }),
    generateExam: build.mutation({
      query: (data) => ({
        url: "exams/generate",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserExamsQuery, useGenerateExamMutation } = projectAPI;
