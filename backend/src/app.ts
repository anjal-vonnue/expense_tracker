import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.router.js";
import expenseRouter from "./modules/expense/expense.route.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/expenses", expenseRouter);

export default app;
