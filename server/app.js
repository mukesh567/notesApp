import express from "express";
import { apiRoute, protectedRoute } from "./utils/api.js";
import connectDb from "./utils/db.js";
import { AuthMiddleware } from "./middlewears/auth-middleware.js";
import cors from "cors";

const app = express();

// Configure CORS middleware with specific options
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization,auth",
};

// Enable CORS with options
app.use(cors(corsOptions));

//For the frontend data
app.use(express.json());

app.use("/api/", apiRoute);
app.use("/api/", AuthMiddleware, protectedRoute);

//And here we run our site if connection is correct
const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Our server running at port : ${PORT}`);
  });
});
