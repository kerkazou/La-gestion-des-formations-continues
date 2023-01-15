import axios from "axios";
import { Edite } from "../Modals/ModalsOrganisme";

const API_URL = "http://localhost:1111/";

const getStatistique = () => {
  return axios.get(API_URL);
};

const getEmployee = () => {
  return axios.get(API_URL + 'employees');
};
const deleteEmployee = (id) => {
  return axios.delete(API_URL + 'delete-employee/' + id);
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
const updateformation = (id, data) => {
  return axios.put(API_URL + 'update-formation/' + id, data);
};
const deleteFormation = (id) => {
  return axios.delete(API_URL + 'delete-formation/' + id);
};

const getFormationEmployee = () => {
  return axios.get(API_URL + 'formation-employee');
};
const FormationToEmployee = (data) => {
  return axios.post(API_URL + 'formation-to-employee', data);
};
const deleteEmployeFormation = (id) => {
  return axios.delete(API_URL + 'delete-employe-formation/' + id);
};

const myFormation = (token) => {
  return axios.get(API_URL + 'my-formation/' + token);
};

export default {
  getStatistique,
  getEmployee,
  deleteEmployee,
  getOrganisme,
  getFormation,
  addOrganisme,
  updateOrganisme,
  deleteOrganisme,
  addEmployee,
  addFormation,
  updateformation,
  deleteFormation,
  getFormationEmployee,
  FormationToEmployee,
  deleteEmployeFormation,
  myFormation
};