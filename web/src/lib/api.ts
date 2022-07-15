import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { stringify } from "querystring";

const baseUrl = "http://localhost:4000/api";
axios.defaults.baseURL = "http://localhost:4000";
export const axiosApi = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
  timeout: 5000,
});
axios.defaults.withCredentials = true;
axiosApi.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("tah");
      localStorage.removeItem("CrU");

      // @ts-ignore
      window.location.replace("/");
    }
  }
);
// export function useAuth() {}
export const api = {
  get: <T>(url: string = "", params?: object) =>
    axiosApi.get<T>(baseUrl + url, {
      ...params,
    }),
  post: <T>(url: string = "", data: any, params?: object) =>
    axiosApi.post<T>(baseUrl + url, data, {
      ...params,
    }),
  patch: <T>(url: string = "", data: any, params?: object) =>
    axiosApi.patch<T>(baseUrl + url, data, {
      ...params,
    }),
  delete: <T>(url: string = "") => axiosApi.delete<T>(baseUrl + url),
};
