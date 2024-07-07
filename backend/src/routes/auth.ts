import { Router } from "express";
import { Signin, Signup } from "../controllers/auth";
import { errorHandler } from "../schema/error-handler";

const authRoutes:Router = Router();

authRoutes.post('/signup', errorHandler(Signup));
 authRoutes.post('/signin', errorHandler(Signin));

export default authRoutes;