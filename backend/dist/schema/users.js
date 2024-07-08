"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = exports.SigninSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.AddressSchema = zod_1.z.object({
    state: zod_1.z.string(),
    district: zod_1.z.string(),
    municipality: zod_1.z.string(),
    tole: zod_1.z.string(),
    ward: zod_1.z.number(),
    pincode: zod_1.z.string().optional(),
    line: zod_1.z.string().optional()
});
