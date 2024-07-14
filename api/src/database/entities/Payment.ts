import mongoose, { Schema } from "mongoose";

const Payment = new Schema({
  id: String,
  pixInfo: {
    code: String,
    identifier: String,
    value: Number
  },
  installment: {
    quantity: Number,
    value: Number
  },
  client: {
    name: String,
    cpf: String
  },
  steps: Number,
  concluded: Boolean
});

export default mongoose.model('payments', Payment);