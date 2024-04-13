import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

const getToken = () => {
  let user = localStorage.getItem("user");
  if (!user) return;

  const userObj = JSON.parse(user);
  return userObj.token;
};

export const createNote = createAsyncThunk("notes/createNote", async (data) => {
  const token = getToken();
  return axios.post(`${BASE_URL}/api/createnote`, data, {
    headers: {
      auth: token,
    },
  });
});

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const token = getToken();
  return axios.get(`${BASE_URL}/api/notelist`, {
    headers: {
      auth: token,
    },
  });
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
  const token = getToken();
  axios.post(
    `${BASE_URL}/api/deletenote`,
     id ,
    {
      headers: {
        auth: token,
      },
    }
  );
  return id;
});

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.data.data.notes.reverse();
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.list = state.list.filter((note) => note._id !== action.payload);
      });
  },
});

export default noteSlice.reducer;
