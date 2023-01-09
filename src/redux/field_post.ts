import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PostsUser } from "../model/posts";

const initialState: PostsUser = {
  id: "",
  user_id: "",
  title: "",
  body: "",
};

export const fieldAddPostSlice = createSlice({
  name: "fieldAddPost",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },
  },
});

export const { setTitle, setBody } = fieldAddPostSlice.actions;

export default fieldAddPostSlice.reducer;
