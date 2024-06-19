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
exports.UserAddReviewController = exports.UserRemoveFavoriteController = exports.UserAddFavoriteController = exports.UserFavoritesController = exports.UserFindUsersController = exports.UserUpdateController = exports.UserGetAllController = exports.UserGetController = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const StorageController_1 = require("./StorageController");
const UserGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.query.id || ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
    const user = yield UserModel_1.default.findById(id).select("-password").exec();
    res.status(200).json({ message: "User found", user: user });
});
exports.UserGetController = UserGetController;
const UserGetAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.default.find().select("-password").exec();
    res.status(200).json({ users: users });
});
exports.UserGetAllController = UserGetAllController;
const UserUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
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
    // const user = await User.findByIdAndUpdate(
    //   req?.user?.id,
    //   { $set: req.body },
    //   { new: true }
    // )
    //   .select("-password")
    //   .exec();
    res.status(200).json({ message: "Profile updated", user: user });
});
exports.UserUpdateController = UserUpdateController;
const UserFindUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.query.type;
    const catagories = req.query.catagories
        ? JSON.parse(req.query.catagories)
        : [];
    const query = req.query.query;
    let users = null;
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
});
exports.UserFindUsersController = UserFindUsersController;
const UserFavoritesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    let data = null;
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
});
exports.UserFavoritesController = UserFavoritesController;
const UserAddFavoriteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
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
});
exports.UserAddFavoriteController = UserAddFavoriteController;
const UserRemoveFavoriteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
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
});
exports.UserRemoveFavoriteController = UserRemoveFavoriteController;
const UserAddReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.target;
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
});
exports.UserAddReviewController = UserAddReviewController;
