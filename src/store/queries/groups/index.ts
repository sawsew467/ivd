import { GroupTraining } from "@/features/training-groups/types";
import { baseApi } from "../base";

export const groupAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllGroups: build.query<GroupTraining[], unknown>({
      query: (projectId) => ({
        url: "groups/" + projectId,
        method: "GET",
        flashError: true,
      }),
    }),
    addNewGroup: build.mutation({
      query: (body) => ({
        url: "groups/create",
        method: "POST",
        body: body,
        flashError: true,
      }),
    }),
    getGroupById: build.query({
      query: ({ groupId, projectId }) => ({
        url: `groups/${projectId}/${groupId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllGroupsQuery,
  useAddNewGroupMutation,
  useGetGroupByIdQuery,
} = groupAPI;
