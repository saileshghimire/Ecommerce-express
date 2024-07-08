"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_handler_1 = require("../schema/error-handler");
const product_1 = require("../controllers/product");
const auth_1 = require("../middleware/auth");
const admin_1 = require("../middleware/admin");
const productRoutes = (0, express_1.Router)();
productRoutes.post('/', [auth_1.authMiddleware, admin_1.adminMiddleware], (0, error_handler_1.errorHandler)(product_1.createProduct));
exports.default = productRoutes;
