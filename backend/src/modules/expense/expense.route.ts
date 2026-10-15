import { Router } from "express";
import * as expenseController from "./expense.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const expenseRouter = Router();

expenseRouter.use(authenticate);

expenseRouter.get("/", expenseController.getHandler);
expenseRouter.get("/filter-by-date", expenseController.filterByDateHandler);
expenseRouter.get("/:id", expenseController.getByIdHandler);
expenseRouter.post("/", expenseController.postHandler);
expenseRouter.patch("/:id", expenseController.udpateHandler);
expenseRouter.delete("/:id", expenseController.deleteHandler);

export default expenseRouter;
