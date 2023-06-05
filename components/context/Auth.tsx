import { getData, removeData, storeData } from "../../utils";
import {
  PropsWithChildren,
  useState,
  createContext,
  useMemo,
  useContext,
  useEffect,
} from "react";
type ActionType = {
  login: (user: Record<string, string>) => void;
  logout: () => void;
};
type StatusType = "pending" | "login" | "logout";
const AuthContext = createContext<
  | { status: StatusType; user: Record<string, string>; action: ActionType }
  | undefined
>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<StatusType>("pending");
  const [user, setUser] = useState<Record<string, string>>({});
  useEffect(() => {
    const checkLogin = async () => {
      const token = await getData("token");
      const user = await getData("user");
      if (token && user) {
        setStatus("login");
        setUser(user || {});
      } else setStatus("logout");
    };
    checkLogin();
  }, []);

  const action = useMemo(() => {
    return {
      login: (user: Record<string, string>) => {
        setStatus("login");
        setUser(user);
        storeData("token", user.token);
        storeData("user", user);
      },
      logout: () => {
        setStatus("logout");
        setUser({});
        removeData("token");
        removeData("user");
      },
    };
  }, []);
  return (
    <AuthContext.Provider value={{ status, user, action }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
export { AuthProvider, useAuth };
export default AuthProvider;
