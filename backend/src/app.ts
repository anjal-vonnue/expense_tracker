import express from "express";
import authRouter from "./modules/auth/auth.router.js";
import expenseRouter from "./modules/expense/expense.route.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/expenses", expenseRouter);

export default app;
