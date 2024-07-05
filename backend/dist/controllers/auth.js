"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signin = exports.Signup = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const prisma = new client_1.PrismaClient();
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    let user = yield prisma.user.findFirst({
        where: {
            email: body.email
        }
    });
    if (user) {
        throw Error('User already exist');
    }
    user = yield prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: (0, bcryptjs_1.hashSync)(body.password, 10)
        }
    });
    return res.status(200).json(user);
});
exports.Signup = Signup;
const Signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    let user = yield prisma.user.findFirst({
        where: {
            email: body.email
        }
    });
    if (!user) {
        throw Error("User doesnot exist");
    }
    if (!(0, bcryptjs_1.compareSync)(body.password, user.password)) {
        throw Error("Incorrect password");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, secrets_1.JWT_SECRET);
    return res.status(200).json(token);
});
exports.Signin = Signin;
