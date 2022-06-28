import dotenv from "dotenv";
import "express-async-errors";

import accessLogMiddleware from "./middlewares/logger.middleware.js";
import routes from "./routes/index.js";

import express, { json } from "express";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Req and Res logger.
app.use(accessLogMiddleware);

app.use("/api", routes);

export default app;
