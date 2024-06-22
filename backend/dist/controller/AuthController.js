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
exports.UserCheckEmailTakenController = exports.UserCheckUsernameTakenController = exports.UserLogoutController = exports.UserLoginController = exports.UserUpdatePasswordController = exports.UserRegisterController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const SessionModel_1 = __importDefault(require("../models/SessionModel"));
const UserRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    try {
        const user = yield UserModel_1.default.findOne({ email: email }).exec();
        if (user != null)
            return res.status(400).json({ message: "Email already exists" });
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const newUser = new UserModel_1.default({
                username,
                email,
                password: hashedPassword,
                role,
            });
            yield newUser.save();
            res.status(201).json({ message: "User created" });
        }
        catch (error) {
            console.error("Error: ", error);
            res.status(500).json({ message: "Server error" });
        }
    }
    catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server error" });
    }
});
exports.UserRegisterController = UserRegisterController;
const UserUpdatePasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    try {
        const user = yield UserModel_1.default.findOne({ email: email }).exec();
        if (user == null)
            return res.status(400).json({ message: "Email Not found" });
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            user.password = hashedPassword;
            yield user.save();
            res.status(200).json({ message: "Password Updated" });
        }
        catch (error) {
            console.error("Error: ", error);
            res.status(500).json({ message: "Server error" });
        }
    }
    catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server error" });
    }
});
exports.UserUpdatePasswordController = UserUpdatePasswordController;
const UserLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, is_short } = req.body;
    if (!(email || username) || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    let user;
    try {
        if (email)
            user = (yield UserModel_1.default.findOne({ email: email }).exec());
        else
            user = (yield UserModel_1.default.findOne({ username: username }).exec());
        if (user == null)
            return res.status(400).json({ message: "User does not exist" });
        if (yield bcrypt_1.default.compare(password, user.password)) {
            const jwt_user = {
                name: user.username,
                id: user._id,
                role: user.role,
            };
            const token = yield jsonwebtoken_1.default.sign(jwt_user, process.env.JWT_ACCESS_TOKEN_SECRET, {
                expiresIn: is_short ? "1h" : "30d",
            });
            const session = new SessionModel_1.default({
                id: jwt_user.id,
                token: token,
            });
            yield session.save();
            res
                .status(200)
                .json({ message: "Login successful", token: token, role: user.role });
        }
        else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    }
    catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server error" });
    }
});
exports.UserLoginController = UserLoginController;
const UserLogoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
        const sessions = (yield SessionModel_1.default.find({ id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id, token: token }));
        sessions.forEach((session) => __awaiter(void 0, void 0, void 0, function* () {
            yield SessionModel_1.default.deleteOne({ _id: session._id });
        }));
        res.status(200).json({ message: "Logout Successful" });
    }
    catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server error" });
    }
});
exports.UserLogoutController = UserLogoutController;
const UserCheckUsernameTakenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    if (!username)
        return res.status(400).json({ message: "Please enter all fields" });
    try {
        const user = yield UserModel_1.default.findOne({ username: username }).exec();
        res.status(200).json({ taken: user != null });
    }
    catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server error" });
    }
});
exports.UserCheckUsernameTakenController = UserCheckUsernameTakenController;
const UserCheckEmailTakenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    if (!email)
        return res.status(400).json({ message: "Please enter all fields" });
    try {
        const user = yield UserModel_1.default.findOne({ email: email }).exec();
        res.status(200).json({ taken: user != null });
    }
    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Server error" });
    }
});
exports.UserCheckEmailTakenController = UserCheckEmailTakenController;
exports.default = {
    UserLoginController: exports.UserLoginController,
    UserLogoutController: exports.UserLogoutController,
    UserRegisterController: exports.UserRegisterController,
    UserCheckUsernameTakenController: exports.UserCheckUsernameTakenController,
    UserCheckEmailTakenController: exports.UserCheckEmailTakenController,
    UserUpdatePasswordController: exports.UserUpdatePasswordController,
};
