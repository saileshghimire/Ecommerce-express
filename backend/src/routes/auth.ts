import { Router } from "express";
import { Signin, Signup } from "../controllers/auth";

const authRoutes:Router = Router();

authRoutes.post('/signup', Signup);
 authRoutes.post('/signin', Signin);

export default authRoutes;