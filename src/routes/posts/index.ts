import express from 'express';
import {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    updateTitleAndContent,
} from '../../controllers/posts';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.patch('/:id', updateTitleAndContent);
router.delete('/:id', deletePost);

export default router;
