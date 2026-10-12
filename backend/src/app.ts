import express from "express";
import authRouter from "./modules/auth/auth.router.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/auth", authRouter);

export default app;
