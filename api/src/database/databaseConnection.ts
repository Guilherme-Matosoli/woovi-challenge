import mongoose from "mongoose";

const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env;

const urlConnection = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authsource=admin`;

export const databaseConnection = mongoose.connect(urlConnection);
