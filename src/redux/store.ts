import { configureStore } from "@reduxjs/toolkit";
import loadReducer from "./load_table_user";
import loadDetailReducer from "./load_detail_user";
import loadDataPosts from "./load_table_post";
import fieldAddUserReducer from "./field_add_user";
import fieldAddPostReducer from "./field_add_post";

export const store = configureStore({
  reducer: {
    loadDataUser: loadReducer,
    loadDataPosts: loadDataPosts,
    loadDetailDataUser: loadDetailReducer,
    setFieldAddUser: fieldAddUserReducer,
    setFieldAddPost: fieldAddPostReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
