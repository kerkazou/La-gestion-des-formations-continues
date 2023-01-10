import axios from "axios";
import { Edite } from "../Modals/ModalsOrganisme";
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
const updateOrganisme = (data) => {
  return axios.put(API_URL + 'update-organisme/' + data._id, data);
};
const deleteOrganisme = (id) => {
  return axios.delete(API_URL + 'delete-organisme/' + id);
};

const addEmployee = (data) => {
  return axios.post(API_URL + 'add-employee', data);
};
const addFormation = (data) => {
  return axios.post(API_URL + 'add-formation', data);
};
const deleteFormation = (id) => {
  return axios.delete(API_URL + 'delete-formation/' + id);
};

export default {
  getStatistique,
  getEmployee,
  getOrganisme,
  getFormation,
  addOrganisme,
  updateOrganisme,
  deleteOrganisme,
  addEmployee,
  addFormation,
  deleteFormation
};