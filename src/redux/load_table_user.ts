import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResourceUser } from "../data/resource";
import { Users } from "../model/users";

interface ListUserState {
  value: Users[] | undefined;
  isLoading: boolean;
}

const initialState: ListUserState = {
  value: [],
  isLoading: false,
};

export const getUsers = createAsyncThunk("table/user", async () => {
  return await ResourceUser.getAllUser();
});

export const loadSlice = createSlice({
  name: "loadData",
  initialState,
  reducers: {
    reset: (state) => {
      state.value = initialState.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { reset } = loadSlice.actions;

export default loadSlice.reducer;
