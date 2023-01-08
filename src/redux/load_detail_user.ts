import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResourceUser } from "../data/resource";
import { Users } from "../model/users";

interface UserState {
  value: Users | undefined;
  isLoading: boolean;
}
const initialState: UserState = {
  value: undefined,
  isLoading: false,
};

export const getDetailUsers = createAsyncThunk(
  "users/getUser",
  async (user_id: string) => {
    return await ResourceUser.getDetailUser(user_id);
  }
);

export const loadDetailSlice = createSlice({
  name: "loadDetailData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(getDetailUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default loadDetailSlice.reducer;
