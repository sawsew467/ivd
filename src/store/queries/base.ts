import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://jkwgg40g4cw80kwwsskcscg8.34.66.59.129.sslip.io:4152/",
  prepareHeaders: async (headers) => {
    try {
      // const { sessionId } = await getToken();
      // console.log("🚀 ~ prepareHeaders: ~ sessionId:", sessionId);

      headers.set("Content-Type", "application/json");

      // if (accessToken) {
      // }
      const accessToken =
        "eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18ycDRabnhQS1J3aUpIN3I0eFhKMWlLcWMxTlQiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE3MzU5Njg4MjQsImZ1bGxfbmFtZSI6IkLhuqNvIFRo4bqvbmcgVHLhuqduIFbEg24iLCJpYXQiOjE3MzIzNjg4MjQsImltYWdlX3VybCI6Imh0dHBzOi8vaW1nLmNsZXJrLmNvbS9leUowZVhCbElqb2ljSEp2ZUhraUxDSnpjbU1pT2lKb2RIUndjem92TDJsdFlXZGxjeTVqYkdWeWF5NWtaWFl2YjJGMWRHaGZZWFJzWVhOemFXRnVMMmx0WjE4eWNFVmtTRUZvV2paV1ZEZFpaM2h2VDAxV1dtYzVXalJwYWpVaWZRIiwiaXNzIjoiaHR0cHM6Ly9zZXQta2F0eWRpZC03MS5jbGVyay5hY2NvdW50cy5kZXYiLCJqdGkiOiI5OTdmYjU5NGY0YmQ4ZGVmYmQ2YiIsIm5iZiI6MTczMjM2ODgxOSwic3ViIjoidXNlcl8ycEVkSEViSnY4S0ZaM0dtUE4yaFFhcEJEd28iLCJ1c2VyX2lkIjoidXNlcl8ycEVkSEViSnY4S0ZaM0dtUE4yaFFhcEJEd28ifQ.jBPs0p75BGa4bHbg-6paNbXm7c4y_pE-7zVoY06w3LOmrIifH3D_W4us9GTkFRKUtZ1fHMp2NT6GCzVRj1eUyFMhEZ-tsjbxjlmqD1vHCiFHSYjPuD7-cPsKE8QmEx5snbcZh1WntMygWXIHtRx8JuWNjfklLiWsyZDhzdRDbUishDpGfHcmWRa_cAayUU_WSPwP9sGhs-6DdmG3MNoKvRc38BhUxLRlSrsC8qbEDURqi_3S-BkqV46tNGSpn2e-mG33WB-Z6y9v8be5rJIRA5fzEGbzs9zz55AjW_dFDSZ6L2h6ztN45p4An6LoSxHP45wHk8m6O0e8PLDS3ZuFVg";
      headers.set("Authorization", `Bearer ${accessToken}`);
    } catch (error) {
      console.error("Error preparing headers:", error);
    }

    return headers;
  },
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
});
