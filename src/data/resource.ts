import { API_ENDPOINT_DETAIL_POST } from "../api/request_detail_post";
import { API_ENDPOINT_USER } from "../api/request_user";
import { PostsUser } from "../model/posts";
import { Users } from "../model/users";

export class ResourceUser {
  static async getAllUser() {
    const response = await API_ENDPOINT_USER.GET_USER;

    try {
      if (response.isSuccess === true) {
        return response.data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getDetailUser(user_id: string) {
    const response = await API_ENDPOINT_DETAIL_POST.Detail_USER(user_id);

    try {
      if (response.isSuccess === true) {
        return response.data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async postUser(user: Users) {
    const response = await API_ENDPOINT_USER.POST_USER(user);

    try {
      if (response.isSuccess === true) {
        return response.data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async putUser(user: Users) {
    const response = await API_ENDPOINT_USER.PUT_USER(user);

    try {
      if (response.isSuccess === true) {
        return response.data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteUser(user_id: string) {
    const response = await API_ENDPOINT_USER.DELETE_USER(user_id);

    try {
      if (response.isSuccess === true) {
        return response.data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export class ResourcePost {
  static async getAllPostUser(user_id: string) {
    const response = await API_ENDPOINT_DETAIL_POST.GET_POSTS(user_id);

    try {
      if (response.isSuccess === true) {
        return response.data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async postPosts(user: PostsUser) {
    const response = await API_ENDPOINT_DETAIL_POST.POST_POSTS(user);

    try {
      if (response.isSuccess === true) {
        return response.data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
