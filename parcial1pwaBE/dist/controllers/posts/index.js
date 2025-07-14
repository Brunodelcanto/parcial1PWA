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
exports.deletePost = exports.updateTitleAndContent = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const post_1 = __importDefault(require("../../models/post"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new post_1.default(req.body);
        yield post.save();
        res.status(201).json({
            message: "Post created successfully",
            data: post.author,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find().populate("author").populate("likes");
        res.status(200).json({
            message: "Posts obtained successfully",
            data: posts,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield post_1.default.findById(id);
        if (!post) {
            res.status(404).json({
                message: "Post not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Post obtained successfully",
            data: post,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.getPostById = getPostById;
const updateTitleAndContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = yield post_1.default.findByIdAndUpdate(id, {
            title,
            content,
            edited: true,
        }, { new: true });
        if (!post) {
            res.status(404).json({
                message: "Post not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Post updates successfully",
            data: post,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.updateTitleAndContent = updateTitleAndContent;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield post_1.default.findByIdAndDelete(id);
        if (!post) {
            res.status(404).json({
                message: "Post not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Post deleted successfully",
            data: post,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.deletePost = deletePost;
