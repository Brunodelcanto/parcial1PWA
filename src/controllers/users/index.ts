import { Request, Response } from 'express';
import User from '../../models/user';

const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({
            message: "User created successfully",
            data: user,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
};

const getUsers = async (req: Request, res: Response) => {
    try {
        // filtramos para que solo nos muestre los usuarios activos
        const users = await User.find({isActive: true});
        res.status(200).json({
            message: "Fetched successfully",
            data: users,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        })
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({
                message: "User not found",
                error: true,
            });
        }
        res.status(200).json({
            message: "Fetched successfully",
            data: user,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

const updateUser = async (req: Request , res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            { new: true }
        );
        if (!user) {
            res.status(404).json({
                message: "User not found",
                error: true,
            })
            return;
        }
        res.status(200).json({
            message: "User updated successfully",
            data: user,
            error:false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// baja logica de usuario 
const deactivateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true},
        )
        if (!user) {
            res.status(404).json({
                message: "User not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "User deactivated successfully",
            data: user,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

export {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deactivateUser
}