import axios from "axios";
import queryString from "query-string";
export const API_URL = "https://api.printmyai.io/api";
// export const API_URL = "https://api.ungdunggiare.com/api";
// export const API_URL = "http://54.218.18.5:4040/api/";

const client = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

client.interceptors.request.use(async (config) => {
  const customHeaders = {};
  const accessToken = localStorage.getItem("Bearer");
  if (accessToken) {
    customHeaders.Authorization = `Bearer ${accessToken}`;
  }

  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});

client.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response.status === 401) {
      localStorage.removeItem("Bearer");
      window.location.reload();
    }
    if (error.response.status === 403 || error.response.status === 404) {
      // localStorage.removeItem("Bearer");
    }
    throw error;
  }
);

export default client;
