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
exports.AuthRole = exports.AuthUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SessionModel_1 = __importDefault(require("../models/SessionModel"));
const AuthUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : req.cookies["token"];
    if (!token)
        return res.status(401).json({ message: "Authentication Token Missing" });
    try {
        const jwt_user = yield (jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET));
        const session = yield SessionModel_1.default.findOne({ id: jwt_user.id, token: token });
        if (session == null)
            return res.status(401).json({ message: "Authentication Token Expired" });
        req.user = jwt_user;
        next();
    }
    catch (e) {
        console.error("Error: ", e);
        return res.status(403).json({ message: "Invalid Token" });
    }
});
exports.AuthUser = AuthUser;
const AuthRole = (role) => {
    return (req, res, next) => {
        var _a;
        if (!Array.isArray(role))
            role = [role];
        if (!((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role))
            return res.status(500).json({ message: "Server Error" });
        if (!role.includes(req.user.role))
            return res.status(401).json({ message: "Unauthorized" });
        next();
    };
};
exports.AuthRole = AuthRole;
exports.default = {
    AuthUser: exports.AuthUser,
    AuthRole: exports.AuthRole,
};
