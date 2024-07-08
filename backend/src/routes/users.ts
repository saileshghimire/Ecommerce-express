import { Router } from "express";
import { errorHandler } from "../schema/error-handler";
import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin";
import { addAddress, deleteAddress, listAddress } from "../controllers/users";

const usersRoutes:Router = Router();

usersRoutes.post('/',[authMiddleware, adminMiddleware],errorHandler(addAddress));
usersRoutes.delete('/',[authMiddleware, adminMiddleware], errorHandler(deleteAddress));
usersRoutes.get('/',[authMiddleware],errorHandler(listAddress));



export default usersRoutes;