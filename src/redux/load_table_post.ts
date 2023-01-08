import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResourcePost } from "../data/resource";
import { PostsUser } from "../model/posts";

interface ListUserState {
  value: PostsUser[] | undefined;
  isLoading: boolean;
}

const initialState: ListUserState = {
  value: [],
  isLoading: false,
};

export const getPosts = createAsyncThunk(
  "users/getUser",
  async (user_id: string) => {
    return await ResourcePost.getAllPostUser(user_id);
  }
);

export const loadPostSlice = createSlice({
  name: "loadDataPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default loadPostSlice.reducer;
