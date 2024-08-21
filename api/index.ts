import { NextFunction, Request, Response } from "express";
import mountRoutes from "../src/routes";
const express = require("express");
import cors from "cors";
import path from "path";
import connectDB from "../src/lib/db";
const app = express();
const PORT = 3001;


require("dotenv").config({ path: ".env" });

app.use(express.json({ limit: "50mb" }));


const corsConfig = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/favicon.ico', express.static(path.join(__dirname, '../public/favicon.ico')));


connectDB();

mountRoutes(app);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Invalid URL: ${req.originalUrl}`) as any;
  err.status = 404;
  next(err);
});

const server = app.listen(PORT, (error: any) => {
  if (!error) console.log("Server is Successfully Running, and App is listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});

process.on("unhandledRejection", (err: any) => {
  console.error(`unhandledRejection ${err.message} and ${err.name}`);
  server.close(() => {
    console.error(`shut down ......`);
    process.exit(1);
  });
});

module.exports = app;
