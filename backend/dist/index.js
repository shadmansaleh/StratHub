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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const AuthRoute_1 = __importDefault(require("./routes/AuthRoute"));
const RootRoute_1 = __importDefault(require("./routes/RootRoute"));
const ChatRoute_1 = __importDefault(require("./routes/ChatRoute"));
const StorageRoute_1 = __importDefault(require("./routes/StorageRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Authenticate_1 = require("./middlewares/Authenticate");
const ErrorHandler_1 = __importDefault(require("./middlewares/ErrorHandler"));
const RateLimiter_1 = __importDefault(require("./middlewares/RateLimiter"));
// import { Server } from "socket.io";
// import bodyParser from "body-parser";
const app = (0, express_1.default)();
app.use((0, RateLimiter_1.default)(100));
dotenv_1.default.config();
const ORIGIN_URL = process.env.ORIGIN_URL || "http://localhost:3000";
app.use((0, cors_1.default)({ origin: ORIGIN_URL, credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
// app.use(bodyParser.json());
// app.use(LogRequest);
// routes
app.use("/auth", AuthRoute_1.default);
app.use("/user", UserRoute_1.default);
app.use("/uploads", express_1.default.static("public/uploads"));
app.use("/storage", Authenticate_1.AuthUser, StorageRoute_1.default);
app.use("/chat", Authenticate_1.AuthUser, ChatRoute_1.default);
app.use("/", RootRoute_1.default);
app.get("/", (req, res) => {
    res.json({ status: "success" });
});
app.use(ErrorHandler_1.default);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
        // const io = new Server(PORT);
        console.log("Connecting to MongoDB...");
        yield mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    });
}
main().catch((err) => console.error(err));
exports.default = app;
