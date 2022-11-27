import { model, Schema, Types } from 'mongoose'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profile: {
            type: String
        },
        bio: {
            type: String
        },
        posts: [
            {
                type: Types.ObjectId,
                ref: 'Post'
            }
        ],
        saved: [
            {
                type: Types.ObjectId,
                ref: 'Post'
            }
        ],
        followers: [
            {
                type: Types.ObjectId,
                ref: 'User'
            }
        ],
        followings: [
            {
                type: Types.ObjectId,
                ref: 'User'
            }
        ],
        notifications: {
            type: Types.ObjectId,
            ref: 'Notification'
        },
        blockedUser: [
            {
                type: Types.ObjectId,
                ref: 'User'
            }
        ],
        isVerified: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

export default model("User", userSchema);