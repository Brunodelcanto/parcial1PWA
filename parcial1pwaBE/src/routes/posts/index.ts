import express from 'express';
import {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    updateTitleAndContent,
    likePost,
    dislikePost
} from '../../controllers/posts';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.patch('/:id', updateTitleAndContent);
router.delete('/:id', deletePost);
router.patch('/:id/like', likePost);
router.patch('/:id/dislike', dislikePost);

export default router;
