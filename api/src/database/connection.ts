import mongoose from "mongoose";

const urlConnection = process.env.DB_URL_CONNECTION || "";


export const connection = mongoose.connect(urlConnection);
