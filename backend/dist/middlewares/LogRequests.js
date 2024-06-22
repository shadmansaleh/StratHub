"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogRequest = void 0;
const LogRequest = (req, res, next) => {
    console.log(req.method, ":", req.path, " - Time: ", Date.now());
    next();
};
exports.LogRequest = LogRequest;
exports.default = exports.LogRequest;
