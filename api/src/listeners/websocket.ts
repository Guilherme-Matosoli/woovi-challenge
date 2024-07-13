import { io } from "../server";

interface PaymentInfo {
  id: string,
  success: boolean
};

io.on("connection", (socket) => {
  socket.on("join", paymentId => {
    socket.join(paymentId);
  });

  socket.on("payment", (payment: PaymentInfo) => {
    io.to(payment.id).emit("payment", { success: true });
  });
});
