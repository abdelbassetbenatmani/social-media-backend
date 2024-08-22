import { NextFunction, Request, Response } from "express";
import mountRoutes from "../src/routes";
const express = require("express");
import cors from "cors";
import path from "path";
import { v2 as cloudinary } from 'cloudinary'

import connectDB from "../src/lib/db";
const app = express();
const PORT = 3001;


require("dotenv").config({ path: ".env" });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // For URL-encoded payloads



const corsConfig = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})


app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

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
