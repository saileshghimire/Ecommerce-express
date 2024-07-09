import { Router } from "express";
import { errorHandler } from "../schema/error-handler";
import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/users";

const usersRoutes:Router = Router();

usersRoutes.post('/address',[authMiddleware, adminMiddleware],errorHandler(addAddress));
usersRoutes.delete('/address/:id',[authMiddleware, adminMiddleware], errorHandler(deleteAddress));
usersRoutes.get('/address',[authMiddleware],errorHandler(listAddress));
usersRoutes.put('/',[authMiddleware],errorHandler(updateUser));


export default usersRoutes;