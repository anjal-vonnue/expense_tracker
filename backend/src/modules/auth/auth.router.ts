import { Router } from "express";
import { loginHandler, meHandler, registerHandler } from "./auth.controller.js";
import { authenticate } from "./auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);
authRouter.get("/me", authenticate, meHandler);

export default authRouter;
