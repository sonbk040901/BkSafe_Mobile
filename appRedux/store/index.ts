import { configureStore } from "@reduxjs/toolkit";
import auth from "../slice/auth";
import formData from "../slice/formData";
const store = configureStore({
  reducer: {
    auth,
    formData,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
