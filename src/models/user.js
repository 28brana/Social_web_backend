const { model, Schema, Types } = require('mongoose');

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
        phone: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profile: {
            type: string
        },
        bio: {
            type: string
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
        ]
    },
    {
        timestamps: true
    }
);

module.exports = model("User", userSchema);