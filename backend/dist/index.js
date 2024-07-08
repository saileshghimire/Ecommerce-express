"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const secrets_1 = require("./secrets");
const routes_1 = __importDefault(require("./routes"));
const errors_1 = require("./middleware/errors");
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', routes_1.default);
exports.prisma = new client_1.PrismaClient();
// export const prismaClient = new PrismaClient({
//     log:['query']
// }).$extends({
//     query:{
//         user:{
//             create({args,query}) {
//                 args.data = SignupSchema.parse(args.data)
//                 return query(args)
//             }
//         }
//     }
// })
app.use(errors_1.errorMiddleware);
// const PORT = "3000"
app.listen(secrets_1.PORT, () => {
    console.log(`server is running at: http://localhost${secrets_1.PORT} `);
});
