import axios from "axios";
import { store } from "..";
import { setLoadingOff, setLoadingOn } from "../redux/spinnerSlice";
import { userLocalStorage } from "./localService";

export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjA3LzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTc2OTYwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzA5OTE3MjAwfQ.KMixzquIcyG1HcsZ_iekv3cHfqWMebGVfzp349mNosg";

export const configHeaders = () => {
  return {
    TokenCybersoft: TOKEN_CYBERSOFT,
  };
};
export const BASE_URL = "https://movienew.cybersoft.edu.vn";

export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: "Bearer " + userLocalStorage.get()?.accessToken,
  },
});

https.interceptors.request.use(
  function (config) {
    store.dispatch(setLoadingOn());
    // console.log("api request");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  function (response) {
    store.dispatch(setLoadingOff());

    // console.log("api respone");
    return response;
  },
  function (error) {
    store.dispatch(setLoadingOff());
    return Promise.reject(error);
  }
);
