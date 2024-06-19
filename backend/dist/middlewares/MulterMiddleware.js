"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureStorage = exports.globalStorage = void 0;
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path_1 = __importDefault(require("path"));
const globalStorageDisk = multer.diskStorage({
    destination: function (_req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (_req, file, cb) {
        const fname = `${uuidv4()}_${path_1.default.extname(file.originalname)}`;
        _req.body.fname = fname;
        _req.body.url = `http://localhost:5000/uploads/${fname}`;
        cb(null, fname);
    },
});
const secureStorageDisk = multer.diskStorage({
    destination: function (_req, file, cb) {
        cb(null, "./public/storage");
    },
    filename: function (_req, file, cb) {
        const fname = `${uuidv4()}_${path_1.default.extname(file.originalname)}`;
        cb(null, fname);
    },
});
const fileFilter = (_req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        if (file.size > 1024 * 1024 * 5) {
            return cb(new Error("File size should be less than 5MB"));
        }
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file type"));
    }
};
exports.globalStorage = multer({ storage: globalStorageDisk, fileFilter });
exports.secureStorage = multer({ storage: secureStorageDisk, fileFilter });
exports.default = exports.globalStorage;
