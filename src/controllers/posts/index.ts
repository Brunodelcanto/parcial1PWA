import { Request, Response } from "express";
import Post from "../../models/post";

const createPost = async (req: Request, res: Response) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json({
            message: "Post created successfully",
            data: post.author,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// con el metodo popoulate podemos mostrar los datos de los usuarios que han creado el post y los que han dado like
const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate("author").populate("likes");
        res.status(200).json({
            message: "Posts obtained successfully",
            data: posts,
            error: false,
        });
    } catch (error: any) {
    res.status(400).json({
        error: error.message,
        });
    }
}

const getPostById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
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
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// esta funcion lo que nos permite es actualizar el titulo y el contenido del post
// sin dejar que actualice otros campos
// y automaticamente el estado de edited pasa a ser true
const updateTitleAndContent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {title, content} = req.body;
        const post = await Post.findByIdAndUpdate(
            id,
            {
                title,
                content,
                edited: true,
            },
            { new: true}
        );
        if (!post) {
            res.status(404).json({
                message: "Post not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Post updated successfully",
            data: post,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
}

const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
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
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
}

export {
    createPost,
    getPosts,
    getPostById,
    updateTitleAndContent, 
    deletePost
}
