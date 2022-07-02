import axios, { AxiosRequestConfig } from "axios";

import React from "react"

const AxiosInterceptors = ({ children }: { children: React.ReactNode}) => {
  axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
    //@ts-ignore
    const accessToken = sessionStorage.getItem("accessToken") || " "

    if (config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    

    return config;
  });

  return <>{children}</>;
};

export default AxiosInterceptors;
