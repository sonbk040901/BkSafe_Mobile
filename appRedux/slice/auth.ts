import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { removeData, storeData } from "../../utils";

const auth = createSlice({
  name: "auth",
  initialState: {
    isLoading: true,
    isLogin: false,
    user: null as User | null,
  },
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      storeData("user", action.payload);
      return {
        isLoading: false,
        isLogin: true,
        user: action.payload,
      };
    },
    logout: () => {
      removeData("user");
      return {
        isLoading: false,
        isLogin: false,
        user: null,
      };
    },
  },
});
export const { login, logout } = auth.actions;
const { reducer } = auth;
export default reducer;
