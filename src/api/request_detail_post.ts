import axios from "axios";
import { PostsUser } from "../model/posts";
import { ResponseDetailUser, ResponsePosts } from "../model/reponse_api";
import { AUTH_TOKEN, ConfigAPI } from "./config";

const getDetailUser = (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    })
    .then((response): ResponseDetailUser => {
      // console.log(response);

      return {
        isSuccess: true,
        message: response.statusText,
        data: response.data,
      };
    })
    .catch((error): ResponseDetailUser => {
      return error["response"] !== undefined
        ? {
            message: error["response"]["data"]["message"],
            errorCode: error["response"]["data"]["statusCode"],
            isSuccess: false,
            data: undefined,
          }
        : {
            message: error["message"],
            errorCode: null,
            isSuccess: false,
            data: undefined,
          };
    });

const getPostUser = (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    })
    .then((response): ResponsePosts => {
      // console.log(response);

      return {
        isSuccess: true,
        message: response.statusText,
        data: response.data,
      };
    })
    .catch((error): ResponsePosts => {
      return error["response"] !== undefined
        ? {
            message: error["response"]["data"]["message"],
            errorCode: error["response"]["data"]["statusCode"],
            isSuccess: false,
            data: [],
          }
        : {
            message: error["message"],
            errorCode: null,
            isSuccess: false,
            data: [],
          };
    });

const postPostUser = (url: string, postUser: PostsUser) =>
  axios
    .post(
      url,
      {
        id_user: postUser.user_id,
        title: postUser.title,
        body: postUser.body,
      },
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    )
    .then((response): ResponseDetailUser => {
      // console.log(response);

      return {
        isSuccess: true,
        message: response.statusText,
        data: response.data,
      };
    })
    .catch((error): ResponseDetailUser => {
      return error["response"] !== undefined
        ? {
            message: error["response"]["data"]["message"],
            errorCode: error["response"]["data"]["statusCode"],
            isSuccess: false,
            data: undefined,
          }
        : {
            message: error["message"],
            errorCode: null,
            isSuccess: false,
            data: undefined,
          };
    });

export const API_ENDPOINT_DETAIL_POST = {
  Detail_USER: (user_id: string) =>
    getDetailUser(ConfigAPI.USER_ACTION_URL(user_id)),

  GET_POSTS: (user_id: string) =>
    getPostUser(ConfigAPI.POSTS_ACTION_URL(user_id)),

  POST_POSTS: (posts: PostsUser) =>
    postPostUser(ConfigAPI.POSTS_ACTION_URL(posts.user_id), posts),
};
