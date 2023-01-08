import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:1111/";

const getStatistique = () => {
  return axios.get(API_URL);
};

const getEmployee = () => {
  return axios.get(API_URL + 'employees');
};
const getOrganisme = () => {
  return axios.get(API_URL + 'organismes');
};
const getFormation = () => {
  return axios.get(API_URL + 'formations');
};

const addOrganisme = (data) => {
  return axios.post(API_URL + 'add-organisme', data);
};

export default {
  getStatistique,
  getEmployee,
  getOrganisme,
  getFormation,
  addOrganisme
};