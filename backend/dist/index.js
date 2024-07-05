"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const secrets_1 = require("./secrets");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', routes_1.default);
// const PORT = "3000"
app.listen(secrets_1.PORT, () => {
    console.log(`server is running at: http://localhost${secrets_1.PORT} `);
});
