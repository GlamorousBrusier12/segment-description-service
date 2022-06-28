import mongoose from "mongoose";
import app from "./index.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const port = process.env.PORT;

// Error Handler Middleware
app.use(errorMiddleware);

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be present");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database");
  } catch (err) {
    console.error(err);
  }
};

console.log(`Node environment: ${process.env.NODE_ENV}`);

app.listen(port, () => {
  console.log(`Server listening at port http://localhost:${port}`);
});

start();
