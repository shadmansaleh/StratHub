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
exports.StorageDeleteController = exports.StorageDeleteByID = exports.StorageGetController = exports.StorageUploadController = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const FileModel_1 = __importDefault(require("../models/FileModel"));
const promises_1 = __importDefault(require("fs/promises"));
const relPath = (path) => {
    return ["..", path].join("\\");
};
const StorageUploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const allow_list = req.body.permission === "restricted"
        ? UserModel_1.default.find({ username: { $in: req.body.allow_list } })
        : [];
    const file = new FileModel_1.default({
        owner: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id,
        path: req.file.path,
        fname: req.file.filename,
        uploadFname: req.file.originalname,
        filetype: req.file.mimetype,
        permission: req.body.permission || "private",
        permission_allowlist: allow_list,
    });
    yield file.save();
    res.status(200).json({
        message: "File uploaded",
        file: file._id,
    });
});
exports.StorageUploadController = StorageUploadController;
const StorageGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    const file = yield FileModel_1.default.findById(req.params.id).exec();
    if (!file)
        return res.status(400).json({ message: "File not found" });
    if (((_b = file === null || file === void 0 ? void 0 : file.permission) === null || _b === void 0 ? void 0 : _b.toString()) === "private" &&
        ((_c = file === null || file === void 0 ? void 0 : file.owner) === null || _c === void 0 ? void 0 : _c.toString()) !== ((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.id.toString()))
        return res.status(401).json({ message: "Unauthorized" });
    if (((_e = file === null || file === void 0 ? void 0 : file.permission) === null || _e === void 0 ? void 0 : _e.toString()) === "restricted" &&
        !file.permission_allowlist.some((user) => { var _a; return user.toString() === ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id); }))
        return res.status(401).json({ message: "Unauthorized" });
    res.status(200).sendFile(file.path, { root: __dirname + "/../.." });
});
exports.StorageGetController = StorageGetController;
const StorageDeleteByID = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const file = yield FileModel_1.default.findById(id).exec();
    if (!file)
        throw new Error("File not found");
    if (((_f = file === null || file === void 0 ? void 0 : file.owner) === null || _f === void 0 ? void 0 : _f.toString()) !== (user === null || user === void 0 ? void 0 : user.id.toString()))
        throw new Error("Unauthorized");
    yield promises_1.default.unlink(file.path);
    yield FileModel_1.default.findByIdAndDelete(id).exec();
});
exports.StorageDeleteByID = StorageDeleteByID;
const StorageDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.StorageDeleteByID)(req.params.id, req === null || req === void 0 ? void 0 : req.user);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
    res.status(200).json({ message: "File deleted" });
});
exports.StorageDeleteController = StorageDeleteController;
