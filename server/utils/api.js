import express from "express";
import { Register, Login } from "../controllers/auth-controller.js";
import { registerSchema } from "../validateSchema/registerSchema.js";
import { loginSchema } from "../validateSchema/loginSchema.js";
import {
  createNote,
  getAllNotes,
  removeNote,
} from "../controllers/note-controller.js";
import { check } from "express-validator";

export const apiRoute = express.Router();

export const protectedRoute = express.Router();

apiRoute.post("/register", registerSchema, Register);
apiRoute.post("/login", loginSchema, Login);

//Protected Routes
protectedRoute.post(
  "/createnote",
  [check("title", "Note title is required").exists()],
  [check("desc", "Note desc is required").exists()],
  createNote
);

protectedRoute.get("/notelist", getAllNotes);

protectedRoute.post(
  "/deletenote",
  [check("note_id", "Note id is required").exists()],
  removeNote
);
