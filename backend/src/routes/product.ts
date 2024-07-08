import { Router } from "express";
import { errorHandler } from "../schema/error-handler";
import { createProduct } from "../controllers/product";
import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin";

const productRoutes:Router = Router();

productRoutes.post('/',[authMiddleware, adminMiddleware], errorHandler(createProduct));

export default productRoutes