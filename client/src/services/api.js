import axios from "axios";
import { CREATE_NOTE, DELETE_NOTE, LOGIN, REGISTER, NOTE_LIST } from "./apiConstants.js";

export const login = async (data) => {
  return axios.post(LOGIN, data);
};

export const register = async (data) => {
  return axios.post(REGISTER, data);
};

//Create note
const getToken = () => {
  let user = localStorage.getItem("user");
  if (!user) return;

  const userObj = JSON.parse(user);
  return userObj.token;
};

export const createNote = async (data) => {
  let token = getToken();

  return axios.post(CREATE_NOTE, data, {
    headers: {
      auth: token,
    },
  });
};

//List of all note
export const getNoteList = async () => {
  let token = getToken();

  return axios.get(NOTE_LIST, {
    headers: {
      auth: token,
    },
  });
};

//Delete note
export const deleteNote = async (data) => {
  let token = getToken();

  return axios.post(DELETE_NOTE, data, {
    headers: {
      auth: token,
    },
  });
};

