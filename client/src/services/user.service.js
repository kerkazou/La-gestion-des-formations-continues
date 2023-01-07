import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:1111/";

const getStatistique = () => {
  return axios.get(API_URL);
};

const getEmployee = () => {
  return axios.get(API_URL+'employees');
};
const getFormation = () => {
  return axios.get(API_URL+'formations');
};

export default {
  getStatistique,
  getEmployee,
  getFormation
};