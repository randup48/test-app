import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Users } from "../model/users";

const initialState: Users = {
  name: "",
  email: "",
  gender: "male",
  status: "active",
};

export const fieldAddUserSlice = createSlice({
  name: "fieldAddUser",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const { setName, setEmail, setGender, setStatus } =
  fieldAddUserSlice.actions;

export default fieldAddUserSlice.reducer;
