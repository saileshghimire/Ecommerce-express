import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { errorHandler } from "../schema/error-handler";
import { cancelOrder, changeStatus, createOrder, getOrderById, listAllOrders, listOrder, listUserOrders } from "../controllers/orders";
import { adminMiddleware } from "../middleware/admin";

const orderRoutes:Router = Router()

orderRoutes.post('/',[authMiddleware], errorHandler(createOrder));
orderRoutes.get('/',[authMiddleware], errorHandler(listOrder))
orderRoutes.put('/:id/cancel',[authMiddleware],errorHandler(cancelOrder));
orderRoutes.get('/index',[authMiddleware,adminMiddleware], errorHandler(listAllOrders));
orderRoutes.get('/users/:id',[authMiddleware, adminMiddleware], errorHandler(listUserOrders));
orderRoutes.put('/:id/status',[authMiddleware,adminMiddleware], errorHandler(changeStatus));
orderRoutes.get('/:id',[authMiddleware], errorHandler(getOrderById));


export default orderRoutes