import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document {
    username: String;
    email: String;
    createdAt: Date;
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }

    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<User>("User", userSchema);

export default User;