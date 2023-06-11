import express from "express";
import authRouterController from "../controllers/authRouterController.js";

const authRouter = express.Router();

//Register
authRouter.post("/register", authRouterController.register);

//Login with account

//Login with Google (Firebase)
authRouter.post("/login/google", authRouterController.loginWithGoogle)

//Logout

//Forgot password

export default authRouter;