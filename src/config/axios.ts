import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.WALMART_API_PRODUCTION_URL
    : process.env.WALMART_API_SANDBOX_URL;

const walmartAxios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

walmartAxios.interceptors.request.use(async (config) => {
  config.headers["WM_SEC.ACCESS_TOKEN"] =
    config.headers.Authorization || config.headers.authorization;
  config.headers["WM_SVC.NAME"] = "Walmart Marketplace";
  config.headers["WM_QOS.CORRELATION_ID"] = uuidv4();

  return config;
});

walmartAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      return Promise.reject(error.response);
    } else if (error.request) {
      console.error("No response received:", error.request);
      return Promise.reject(error.request);
    } else {
      console.error("Error setting up the request:", error.message);
      return Promise.reject(error.message);
    }
  }
);

export default walmartAxios;
