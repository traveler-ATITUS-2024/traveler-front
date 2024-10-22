import axios from "axios";

const api = axios.create({
  baseURL: "http://10.1.189.162:8080",
});

export default api;
