import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document {
    username: String;
    email: String;
    isActive: Boolean;
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
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<User>("User", userSchema);

export default User;