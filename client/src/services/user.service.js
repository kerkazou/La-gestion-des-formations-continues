import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:1111/";

const getStatistique = () => {
  return axios.get(API_URL);
};

export default {
  getStatistique
};