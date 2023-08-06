import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api";
export const API_KEY = "AIzaSyBqNWBKDUrJyK_JwjzAJ5COgTa4yciMsrE";
const instance = axios.create({
  baseURL: BASE_URL,
});
export const autoComplete = async (input: string) => {
  const res = await instance.get(
    `place/autocomplete/json?key=${API_KEY}&language=vi&input=${input}`
  );
  const data = <AutoCompleteResultType>res.data;
  return data;
};
export type AutoCompleteResultType = {
  predictions: {
    description: string;
    structured_formatting: { main_text: string };
  }[];
  status: string;
};
