import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deactivateUser,
    activateUser,
    deleteUser
} from "../../controllers/users/index";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.patch("/:id/deactivate", deactivateUser);
router.patch("/:id/activate", activateUser);
router.delete("/:id", deleteUser);

export default router;