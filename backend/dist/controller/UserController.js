"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserAppointmentUpdateStatus = exports.UserSetAppointmentsController = exports.UserGetAppointmentsController = exports.UserAddReviewController = exports.UserRemoveFavoriteController = exports.UserAddFavoriteController = exports.UserFavoritesController = exports.UserFindUsersController = exports.UserUpdateController = exports.UserGetAllController = exports.UserGetController = void 0;
const types = __importStar(require("../types/LocalTypes"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const AppointmentModel_1 = __importDefault(require("../models/AppointmentModel"));
const StorageController_1 = require("./StorageController");
const UserGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.query.id || ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
    try {
        const user = yield UserModel_1.default.findById(id).select("-password").exec();
        res.status(200).json({ message: "User found", user: user });
    }
    catch (e) {
        console.error(e.message);
        return res.status(400).json({ message: "User not found" });
    }
});
exports.UserGetController = UserGetController;
const UserGetAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.default.find().select("-password").exec();
    res.status(200).json({ users: users });
});
exports.UserGetAllController = UserGetAllController;
const UserUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        let user = yield UserModel_1.default.findById((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id)
            .select("-password")
            .exec();
        if (!user)
            return res.status(400).json({ message: "User not found" });
        if (req.body.profile_pic !== user.profile_pic) {
            try {
                yield (0, StorageController_1.StorageDeleteByID)(user.profile_pic, req === null || req === void 0 ? void 0 : req.user);
            }
            catch (e) {
                console.error(e);
            }
        }
        for (let key in req.body) {
            if (UserModel_1.default.schema.obj.hasOwnProperty(key)) {
                // @ts-ignore
                user[key] = req.body[key];
            }
        }
        yield user.save();
        res.status(200).json({ message: "Profile updated", user: user });
    }
    catch (e) {
        console.error(e.message);
        return res.status(400).json({ message: "Error updating profile" });
    }
});
exports.UserUpdateController = UserUpdateController;
const UserFindUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.query.type;
    const catagories = req.query.catagories
        ? JSON.parse(req.query.catagories)
        : [];
    const query = req.query.query;
    let users = null;
    try {
        if (catagories.length > 0) {
            users = yield UserModel_1.default.find({
                $and: [
                    { role: type || "*" },
                    { designation: { $in: catagories.length > 0 ? catagories : ["*"] } },
                    {
                        $or: [
                            { username: { $regex: query, $options: "i" } },
                            { first_name: { $regex: query, $options: "i" } },
                            { last_name: { $regex: query, $options: "i" } },
                            { email: { $regex: query, $options: "i" } },
                        ],
                    },
                ],
            })
                .select("-password")
                .exec();
        }
        else {
            users = yield UserModel_1.default.find({
                $and: [
                    { role: type || "*" },
                    {
                        $or: [
                            { username: { $regex: query, $options: "i" } },
                            { first_name: { $regex: query, $options: "i" } },
                            { last_name: { $regex: query, $options: "i" } },
                            { email: { $regex: query, $options: "i" } },
                        ],
                    },
                ],
            })
                .select("-password")
                .exec();
        }
        res.status(200).json({ users: users });
    }
    catch (e) {
        console.error(e.message);
        return res.status(400).json({ message: "Error finding users" });
    }
});
exports.UserFindUsersController = UserFindUsersController;
const UserFavoritesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    let data = null;
    try {
        if (req.query.populate_data === "true") {
            data = yield UserModel_1.default.findById((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.id)
                .select("favorites")
                .populate("favorites")
                .exec();
        }
        else {
            data = yield UserModel_1.default.findById((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.id).select("favorites").exec();
        }
        if (!data)
            return res.status(400).json({ message: "Favorites not found" });
        res.status(200).json({ favorites: data.favorites });
    }
    catch (e) {
        console.error(e.message);
        return res.status(400).json({ message: "Error getting favorites" });
    }
});
exports.UserFavoritesController = UserFavoritesController;
const UserAddFavoriteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const user = yield UserModel_1.default.findById((_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.id).exec();
        if (!user)
            return res.status(400).json({ message: "User not found" });
        const favorite = yield UserModel_1.default.findById(req.body.favorite_id).exec();
        if (!favorite)
            return res.status(400).json({ message: "Favorite not found" });
        if (!user.favorites.includes(req.body.favorite_id)) {
            user.favorites.push(req.body.favorite_id);
            yield user.save();
        }
        else {
            return res.status(400).json({ message: "Favorite already added" });
        }
        res.status(200).json({ message: "Favorite added" });
    }
    catch (e) {
        console.error(e.message);
        return res.status(400).json({ message: "Error adding favorite" });
    }
});
exports.UserAddFavoriteController = UserAddFavoriteController;
const UserRemoveFavoriteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const user = yield UserModel_1.default.findById((_f = req === null || req === void 0 ? void 0 : req.user) === null || _f === void 0 ? void 0 : _f.id).exec();
        if (!user)
            return res.status(400).json({ message: "User not found" });
        const favorite = yield UserModel_1.default.findById(req.body.favorite_id).exec();
        if (!favorite)
            return res.status(400).json({ message: "Favorite not found" });
        if (user.favorites.includes(req.body.favorite_id)) {
            user.favorites = user.favorites.filter((id) => id.toString() !== req.body.favorite_id);
            yield user.save();
        }
        else {
            return res.status(400).json({ message: "Not in favorite list" });
        }
        res.status(200).json({ message: "Favorite removed" });
    }
    catch (e) {
        console.error(e.message);
        return res.status(400).json({ message: "Error removing favorite" });
    }
});
exports.UserRemoveFavoriteController = UserRemoveFavoriteController;
const UserAddReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.target;
    try {
        const user = yield UserModel_1.default.findById(id).exec();
        if (!user)
            return res.status(400).json({ message: "User not found" });
        const review = {
            name: req.body.name,
            rating: req.body.rating,
            review: req.body.review,
        };
        user.reviews.push(review);
        yield user.save();
        res.status(200).json({ message: "Review added" });
    }
    catch (e) {
        console.error(e.message);
        return res.status(400).json({ message: "Error adding review" });
    }
});
exports.UserAddReviewController = UserAddReviewController;
const UserGetAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expert = req.query.expert;
    const date = req.query.date;
    const client = req.query.client;
    const start_time_only = req.query.start_time_only;
    const user = req.query.user;
    if (!expert && !client && !user)
        return res.status(400).json({ message: "ID not provided" });
    let query = {};
    if (user)
        query = { ["$or"]: [{ expert: user }, { client: user }] };
    if (date)
        query.date = date;
    if (client)
        query.client = client;
    if (expert)
        query.expert = expert;
    try {
        let appointments = null;
        if (start_time_only === "true") {
            appointments = (yield AppointmentModel_1.default.find(query).select("start_time").exec())
                .filter((app) => app.status !== types.AppointmentStatus.CANCELLED)
                .map((app) => app.start_time);
        }
        else {
            appointments = yield AppointmentModel_1.default.find(query)
                .populate("expert", "first_name last_name")
                .populate("client", "first_name last_name")
                .exec();
        }
        return res.status(200).json({ appointments: appointments });
    }
    catch (e) {
        console.error(e.message);
        return res.status(400).json({ message: "Error getting appointments" });
    }
});
exports.UserGetAppointmentsController = UserGetAppointmentsController;
const UserSetAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const expert = req.body.expert;
    const date = req.body.date;
    const start_time = req.body.start_time;
    const duration = req.body.duration;
    const service = req.body.service;
    if (!expert || !date || !start_time || !duration || !service)
        return res.status(400).json({ message: "Missing data" });
    try {
        const existing = yield AppointmentModel_1.default.findOne({
            date: date,
            start_time: start_time,
            expert: expert,
        });
        if (existing)
            return res.status(400).json({ message: "Slot already booked" });
        yield new AppointmentModel_1.default({
            date: date,
            start_time: start_time,
            expert: expert,
            client: (_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g.id,
            service: service,
            duration: duration,
            status: "pending",
        }).save();
        return res.status(200).json({ message: "Appointment set" });
    }
    catch (e) {
        console.error(e.message);
        return res.status(400).json({ message: "Error setting appointment" });
    }
});
exports.UserSetAppointmentsController = UserSetAppointmentsController;
const UserAppointmentUpdateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    const id = req.body.id;
    const status = req.body.status;
    if (!id || !status)
        return res.status(400).json({ message: "Missing data" });
    if (!["pending", "completed", "cancelled"].includes(status))
        return res.status(400).json({ message: "Invalid status" });
    try {
        const appointment = yield AppointmentModel_1.default.findById(id).exec();
        if (!appointment)
            return res.status(400).json({ message: "Appointment not found" });
        if (appointment.client.toString() !== ((_h = req === null || req === void 0 ? void 0 : req.user) === null || _h === void 0 ? void 0 : _h.id) &&
            appointment.expert.toString() !== ((_j = req === null || req === void 0 ? void 0 : req.user) === null || _j === void 0 ? void 0 : _j.id))
            return res.status(400).json({ message: "Unauthorized" });
        appointment.status = status;
        yield appointment.save();
        return res.status(200).json({ message: "Appointment updated" });
    }
    catch (e) {
        console.error(e.message);
        return res.status(400).json({ message: "Error updating appointment" });
    }
});
exports.UserAppointmentUpdateStatus = UserAppointmentUpdateStatus;
