"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./users/index"));
const index_2 = __importDefault(require("./posts/index"));
const router = express_1.default.Router();
router.use("/users", index_1.default);
router.use("/posts", index_2.default);
exports.default = router;
