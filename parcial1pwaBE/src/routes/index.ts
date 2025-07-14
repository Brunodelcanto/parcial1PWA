import express from 'express';
import userRouter from './users/index';
import postRouter from './posts/index';

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;