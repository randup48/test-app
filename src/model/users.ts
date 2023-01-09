export interface Users {
  id?: string;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface ListUserState {
  value: Users[];
  isLoading: boolean;
}
