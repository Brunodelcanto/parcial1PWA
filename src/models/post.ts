import mongoose, { Schema, model } from 'mongoose';
import { User } from './user';

export interface Post {
    title: String;
    content: String;
    author: User;
    likes: User[];
    edited: Boolean;
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
    },
    {
        timestamps: true,
    }

)

const Post = mongoose.model<Post>("Post", postSchema);

export default Post;