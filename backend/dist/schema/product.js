"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ProductSchema = zod_1.default.object({
    name: zod_1.default.string(),
    description: zod_1.default.string(),
    price: zod_1.default.number(),
    tags: zod_1.default.array(zod_1.default.string())
});
