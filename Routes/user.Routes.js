import express from "express";
import {userDeleteController, userLoggedInChecker, userLoggedInUserController, userLoggedOutController, userRegistrationController } from "../Controllers/userController.js";
import { userAuthentication } from "../Middlewares/userAuth.Middleware.js";

const userRoutes = express.Router();

userRoutes.post("/registerUserAccount", userRegistrationController);
userRoutes.post("/userLoggedIn", userLoggedInUserController);
userRoutes.post("/isUserLoggedIn", userAuthentication, userLoggedInChecker)
userRoutes.post("/userAccountDelete", userDeleteController);
userRoutes.post("/userAccountLoggedOut", userLoggedOutController);
export default userRoutes;