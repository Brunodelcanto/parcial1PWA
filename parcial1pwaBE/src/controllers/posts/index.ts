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

const likePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // ID del post
        const { userId } = req.body; // ID del usuario que da like

        // Validar que se envió el userId
        if (!userId) {
            res.status(400).json({
                message: "User ID is required",
                error: true,
            });
            return;
        }

        const post = await Post.findById(id);

        if (!post) {
            res.status(404).json({
                message: "Post not found",
                error: true,
            });
            return;
        }

        // Verificamos si el usuario ya dio like
        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            res.status(400).json({
                message: "User already liked this post",
                error: true,
            });
            return;
        }

        // Agregamos el like al array
        post.likes.push(userId);
        await post.save();

        res.status(200).json({
            message: "Post liked successfully",
            data: post,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

const dislikePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({
                message: "User ID is required",
                error: true,
            });
            return;
        }
        const post = await Post.findById(id);
        if (!post) {
            res.status(404).json({
                message: "Post not found",
                error: true,
            });
            return;
        }
        post.likes = post.likes.filter((like: any) => like.toString() !== userId); 
        await post.save();

        res.status(200).json({
            message: "Post disliked successfully",
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
    deletePost,
    likePost,
    dislikePost
}
