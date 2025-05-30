import mongoose, { Schema, model } from 'mongoose';
import { User } from './user';

export interface Post {
    title: String;
    content: String;
    author: User;
    likes: User[];
    edited: Boolean;
    createdAt: Date;
}

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        edited: {
            type: Boolean,
            default: false,
            required: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
)

const Post = mongoose.model<Post>("Post", postSchema);

export default Post;