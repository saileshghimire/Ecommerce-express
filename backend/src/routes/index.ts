import { Router } from "express";
import authRouter from "./auth";
import productRoutes from "./product";
import usersRoutes from "./users";

const rootRouter:Router = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/products', productRoutes);
rootRouter.use('/users',usersRoutes);


export default rootRouter;