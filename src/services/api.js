import axios from "axios";

const api = axios.create({
  baseURL: "https://traveler-api-n420.onrender.com",
});

export default api;
