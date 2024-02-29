"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbconfig_1 = __importDefault(require("./config/dbconfig"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
(0, dbconfig_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use("/api/", routes_1.default);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening in port ${port}`);
});
