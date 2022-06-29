import Axios, { AxiosRequestConfig } from "axios";

export interface IAuthorizedRequestParams<TBody> {
  method: "get" | "post" | "put" | "delete";
  url: string;
  body?: TBody;
  axiosConfig?: AxiosRequestConfig;
}

const axiosRequest = <TData, TBody>({
  method,
  url,
  body,
}: IAuthorizedRequestParams<TBody>) => {
  const performRequest = async (): Promise<TData> => {
    // Add Auth headers

    // Make request
    let data: TData | undefined;
    switch (method) {
      case "get":
      case "delete":
        ({ data } = await Axios[method](url));
        break;
      case "post":
      case "put":
        ({ data } = await Axios[method](url, body));
    }

    // Make TypeScript happy
    if (!data) {
      throw new Error(
        "Authorized request was succesfull, but no data was returned.",
      );
    }

    return data;
  };
  return performRequest();
};


export default axiosRequest;
