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
exports.addEmailIfUsername = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const addEmailIfUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username } = req.body;
    if (!email && username) {
        const user = yield UserModel_1.default.findOne({ username: username }).exec();
        if (user)
            req.body.email = user === null || user === void 0 ? void 0 : user.email;
    }
    next();
});
exports.addEmailIfUsername = addEmailIfUsername;
exports.default = { addEmailIfUsername: exports.addEmailIfUsername };
