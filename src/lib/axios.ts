import axios from "axios";

export const axiosApi = axios.create({
  baseURL: process.env.baseURL,
  headers: {
    Accept: "application/json",
  },
});
