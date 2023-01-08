import { PostsUser } from "./posts";
import { Users } from "./users";

interface ResponseFromApi {
  isSuccess: boolean;
  error?: boolean;
  errorCode?: number;
  message: string;
}

export interface ResponseUser extends ResponseFromApi {
  data: Users[];
}

export interface ResponseDetailUser extends ResponseFromApi {
  data?: Users;
}

export interface ResponsePosts extends ResponseFromApi {
  data: PostsUser[];
}
