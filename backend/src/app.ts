import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.router.js";
import expenseRouter from "./modules/expense/expense.route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/expenses", expenseRouter);

export default app;
