import mongoose from "mongoose";

const { DB_URL_CONNECTION } = process.env;

export const databaseConnection = mongoose.connect(DB_URL_CONNECTION);
