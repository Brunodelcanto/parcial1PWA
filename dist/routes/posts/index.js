"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = require("../../controllers/posts");
const router = express_1.default.Router();
router.get('/', posts_1.getPosts);
router.get('/:id', posts_1.getPostById);
router.post('/', posts_1.createPost);
router.patch('/:id', posts_1.updateTitleAndContent);
router.delete('/:id', posts_1.deletePost);
exports.default = router;
