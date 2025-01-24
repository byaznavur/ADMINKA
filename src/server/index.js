import axios from "axios";

const request = axios.create({
  baseURL: "https://6792cab1cf994cc6804b1279.mockapi.io/",
  timeout: 10000,
});

export default request;
