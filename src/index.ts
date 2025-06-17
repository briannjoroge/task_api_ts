import express from "express";
import taskRoute from "./routes/task";

const app = express();
app.use(express.json());
app.use("/task", taskRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
