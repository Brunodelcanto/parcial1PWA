"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../controllers/users/index");
const router = express_1.default.Router();
router.get("/", index_1.getUsers);
router.get("/:id", index_1.getUserById);
router.post("/", index_1.createUser);
router.patch("/:id", index_1.updateUser);
router.patch("/:id/deactivate", index_1.deactivateUser);
exports.default = router;
