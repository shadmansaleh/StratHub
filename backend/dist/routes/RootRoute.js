"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MulterMiddleware_1 = require("../middlewares/MulterMiddleware");
const Authenticate_1 = require("../middlewares/Authenticate");
const root = (0, express_1.Router)();
root.post("/upload", Authenticate_1.AuthUser, MulterMiddleware_1.globalStorage.single("file"), (req, res) => {
    res.json({ message: "File uploaded", url: req.body.url });
});
exports.default = root;
