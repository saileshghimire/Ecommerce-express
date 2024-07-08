import { Router } from "express";
import authRouter from "./auth";
import productRoutes from "./product";

const rootRouter:Router = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/products', productRoutes);


export default rootRouter;