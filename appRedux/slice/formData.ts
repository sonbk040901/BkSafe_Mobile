import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const formData = createSlice({
  name: "formData",
  initialState: {
    email: "",
    password: "",
    confirmPass: "",
    username: "",
    fullname: "",
    phone: "",
  },
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      return { ...state, email: action.payload };
    },
    setPassword: (state, action: PayloadAction<string>) => {
      return { ...state, password: action.payload };
    },
    setConfirmPass: (state, action: PayloadAction<string>) => {
      return { ...state, confirmPass: action.payload };
    },
    setUsername: (state, action: PayloadAction<string>) => {
      return { ...state, username: action.payload };
    },
    setFullname: (state, action: PayloadAction<string>) => {
      return { ...state, fullname: action.payload };
    },
    setPhone: (state, action: PayloadAction<string>) => {
      return { ...state, phone: action.payload };
    },
    clear: () => {
      return {
        email: "",
        password: "",
        confirmPass: "",
        username: "",
        fullname: "",
        phone: "",
      };
    },
  },
});

export const {
  setEmail,
  setPassword,
  setConfirmPass,
  setFullname,
  setPhone,
  setUsername,
  clear,
} = formData.actions;
const { reducer } = formData;
export default reducer;
