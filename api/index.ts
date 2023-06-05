import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
export const BASE_URL = "http://192.168.1.28:3000/api/";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
type MethodType = "get" | "post" | "put" | "delete" | "patch";
type StatusType = "loading" | "error" | "success";
export function useFetch<T = any>(url: string, method: MethodType, data?: any) {
  const [status, setStatus] = useState<StatusType>("loading");
  const [response, setResponse] = useState<T>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus("loading");
        const response = await axiosInstance[method](url, data);
        setStatus("success");
        setResponse(response.data);
      } catch (error: any) {
        setStatus("error");
        setResponse(error.response.data);
        return error;
      }
    };
    fetchData();
  }, [data, method, url]);
  return { status, response };
}
export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("auth/login", {
      email,
      password,
    });
    return response.data.data;
  } catch (error: any) {
    const err = <AxiosError<any, any>>error;
    throw err.response?.data.message;
  }
};
export const signup = async (
  email: string,
  username: string,
  fullname: string,
  phone: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post("auth/signup", {
      email,
      password,
      username,
      fullname,
      phone,
    });
    return response.data.data;
  } catch (error: any) {
    const err = <AxiosError<any, any>>error;
    throw err.response?.data.message;
  }
};
const moocDriversData = {
  data: [
    { name: "Nguyễn Văn A", coord: { latitude: 21.005, longitude: 105.84 } },
    { name: "Đặng Thị B", coord: { latitude: 21, longitude: 105.85 } },
    { name: "Ngô Văn C", coord: { latitude: 21.008, longitude: 105.86 } },
    { name: "Lê Hồng D", coord: { latitude: 21.007, longitude: 105.85 } },
  ],
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const findCarDrivers = async (location: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const response = { data: moocDriversData };
    // await axiosInstance.get("drivers/car");
    return response.data.data;
  } catch (error: any) {
    const err = <AxiosError<any, any>>error;
    throw err.response?.data.message;
  }
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const findBikeDrivers = async (location: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const response = { data: moocDriversData };
    // await axiosInstance.get("drivers/bike");
    return response.data.data;
  } catch (error: any) {
    const err = <AxiosError<any, any>>error;
    throw err.response?.data.message;
  }
};
