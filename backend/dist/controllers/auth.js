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
exports.me = exports.Signin = exports.Signup = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const __1 = require("..");
const users_1 = require("../schema/users");
const not_found_1 = require("../exceptions/not-found");
// const prisma = new PrismaClient();
// const prisma = prismaClient
const Signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    users_1.SignupSchema.parse(body);
    let user = yield __1.prisma.user.findFirst({
        where: {
            email: body.email
        }
    });
    if (user) {
        next(new bad_request_1.BadRequestsException('User already exist', root_1.ErrorCodes.USER_ALREADY_EXISTS));
    }
    user = yield __1.prisma.user.create({
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
    let user = yield __1.prisma.user.findFirst({
        where: {
            email: body.email
        }
    });
    if (!user) {
        throw new not_found_1.NotFoundException('User doesnot exist', root_1.ErrorCodes.USER_NOT_FOUND);
    }
    if (!(0, bcryptjs_1.compareSync)(body.password, user.password)) {
        throw new bad_request_1.BadRequestsException('Incorrect password', root_1.ErrorCodes.INCORRECT_PASSWORD);
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, secrets_1.JWT_SECRET);
    return res.status(200).json(token);
});
exports.Signin = Signin;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.user);
});
exports.me = me;
