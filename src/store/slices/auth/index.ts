import { createSlice } from "@reduxjs/toolkit";

interface AuthSliceInterface {
  access_token: string;
  userInfo: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
  };
}

const initialState: AuthSliceInterface = {
  access_token: "",
  userInfo: {
    id: "0e9de8ba-b406-4f73-89c5-94e9a9c2ee9e",
    email: "thangtvb.dev@gmail.com",
    fullName: "Bảo Thắng Trần Văn",
    role: "admin",
    avatarUrl:
      "https://dashboard.clerk.com/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfYXRsYXNzaWFuL2ltZ18ycEVkSEFoWjZWVDdZZ3hvT01WWmc5WjRpajUifQ&w=2048&q=75",
    createdAt: "2024-11-23T04:13:47.122Z",
    updatedAt: "2024-11-23T04:13:47.122Z",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
  },
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;
