import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Driver, User } from "../types";
import { getData } from "../utils";
export const BASE_URL = "http://192.168.137.124:3000/api/";
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
    return response.data.data as User;
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
  password: string,
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
const moocDriversData = [
  {
    _id: "1",
    username: "driver1",
    fullname: "Nguyễn Văn A",
    email: "leducson@gmail.com",
    phone: "0123456789",
    avatar: "https://i.pravatar.cc/150?img=1",
    isActivated: true,
    birthday: new Date(),
    address: "Hà Nội",
    starAvg: 4.5,
    lat: 21.02,
    lng: 105.8,
  },
  {
    _id: "2",
    username: "driver2",
    fullname: "Nguyễn Văn B",
    email: "  ",
    phone: "0123456789",
    avatar: "https://i.pravatar.cc/150?img=2",
    isActivated: true,
    birthday: new Date(),
    address: "Hà Nội",
    starAvg: 4.5,
    lat: 21.0277,
    lng: 105.834,
  },
  {
    _id: "3",
    username: "driver3",
    fullname: "Nguyễn Văn C",
    email: "  ",
    phone: "0123456789",
    avatar: "https://i.pravatar.cc/150?img=3",
    isActivated: true,
    birthday: new Date(),
    address: "Hà Nội",
    starAvg: 4.5,
    lat: 21.027763,
    lng: 105.83416,
  },
  {
    _id: "4",
    username: "driver4",
    fullname: "Nguyễn Văn D",
    email: "leducson@gmail.com",
    phone: "0123456789",
    avatar: "https://i.pravatar.cc/150?img=4",
    isActivated: true,
    birthday: new Date(),
    address: "Hà Nội",
    starAvg: 4.5,
    lat: 21.027763,
    lng: 105.83416,
  },
  {
    _id: "5",
    username: "driver5",
    fullname: "Nguyễn Văn E",
    email: "  ",
    phone: "0123456789",
    avatar: "https://i.pravatar.cc/150?img=5",
    isActivated: true,

    birthday: new Date(),
    address: "Hà Nội",
    starAvg: 4.5,
    lat: 21.027763,
    lng: 105.83416,
  },
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const findCarDrivers = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => {
  try {
    const url = `map/drivers?lat=${lat}&lng=${lng}`;
    const response = await axiosInstance.get(url);
    const data = response.data.data as Driver[];
    return data as Driver[];
  } catch (error: any) {
    const err = <AxiosError<any, any>>error;
    throw err.response?.data.message;
  }
};

type LatLng = {
  lat: number;
  lng: number;
};
type Location = {
  latLng: LatLng;
  address: string;
};
type Request = {
  currentLocation: Location;
  startLocation: Location;
  endLocation: Location;
  suggestedDriver: string[];
  driver: string;
};
export const createRequest = async (payload: Request) => {
  const url = "request";
  try {
    const user = await getData("user");
    const response = await axiosInstance.post(url, payload, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data.data;
  } catch (error: any) {
    const err = <AxiosError<any, any>>error;
    throw err.response?.data.message;
  }
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const findBikeDrivers = async (location: {
//   latitude: number;
//   longitude: number;
// }) => {
//   try {
//     const response = { data: moocDriversData };
//     // await axiosInstance.get("drivers/bike");
//     return response.data.data;
//   } catch (error: any) {
//     const err = <AxiosError<any, any>>error;
//     throw err.response?.data.message;
//   }
// };
