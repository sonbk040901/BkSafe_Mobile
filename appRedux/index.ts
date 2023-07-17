import {
  TypedUseSelectorHook,
  useDispatch as defaultUseDispatchHook,
  useSelector as defaultUseSelectorHook,
} from "react-redux";
import store from "./store";
import type { AppDispatch, RootState } from "./store";
const useDispatch = defaultUseDispatchHook<AppDispatch>;
const useSelector: TypedUseSelectorHook<RootState> = defaultUseSelectorHook;
export * from "./store";
export { useDispatch, useSelector, store };
