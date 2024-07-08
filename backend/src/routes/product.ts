import { Router } from "express";
import { errorHandler } from "../schema/error-handler";
import { createProduct, deleteProduct, getProductById, listProduct, updateProduct } from "../controllers/product";
import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin";

const productRoutes:Router = Router();

productRoutes.post('/',[authMiddleware, adminMiddleware], errorHandler(createProduct));
productRoutes.put('/:id',[authMiddleware,adminMiddleware], errorHandler(updateProduct));
productRoutes.delete('/:id',[authMiddleware,adminMiddleware], errorHandler(deleteProduct));
productRoutes.get('/',[authMiddleware,adminMiddleware],errorHandler(listProduct));
productRoutes.get('/:id',[authMiddleware,adminMiddleware], errorHandler(getProductById));


export default productRoutes