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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAddress = exports.deleteAddress = exports.addAddress = void 0;
const __1 = require("..");
const not_found_1 = require("../exceptions/not-found");
const root_1 = require("../exceptions/root");
const users_1 = require("../schema/users");
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    users_1.AddressSchema.parse(req.body);
    let user;
    try {
        user = yield __1.prisma.user.findFirstOrThrow({
            where: {
                id: req.user.id
            }
        });
    }
    catch (error) {
        throw new not_found_1.NotFoundException('User not Found', root_1.ErrorCodes.USER_NOT_FOUND);
    }
    const address = yield __1.prisma.address.create({
        data: Object.assign(Object.assign({}, req.body), { userId: user.id })
    });
    return res.json(address);
});
exports.addAddress = addAddress;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteAddress = deleteAddress;
const listAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.listAddress = listAddress;
