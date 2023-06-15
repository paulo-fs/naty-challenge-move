import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://api-deslocamento.herokuapp.com/api/v1/",
});
