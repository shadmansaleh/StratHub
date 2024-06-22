"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentStatus = exports.ExpertCategory = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["EXPERT"] = "expert";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
var ExpertCategory;
(function (ExpertCategory) {
    ExpertCategory["DESIGN"] = "design";
    ExpertCategory["MARKETING"] = "marketing";
    ExpertCategory["HEALTH"] = "health";
    ExpertCategory["ENGINEERING"] = "engineering";
    ExpertCategory["LAW"] = "law";
    ExpertCategory["EDUCATION"] = "education";
    ExpertCategory["OTHER"] = "other";
    ExpertCategory["NONE"] = "";
})(ExpertCategory || (exports.ExpertCategory = ExpertCategory = {}));
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["PENDING"] = "pending";
    AppointmentStatus["COMPLETED"] = "completed";
    AppointmentStatus["CANCELLED"] = "cancelled";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
