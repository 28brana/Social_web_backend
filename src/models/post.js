const { model, Schema, Types } = require('mongoose');

const postSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User',
        },
        content: [
            {
                type: {
                    type: string,
                    enum: ['video', 'image']
                },
                url: {
                    type: string,
                }
            }
        ],
        likes: [
            {
                type: Types.ObjectId,
                ref: 'User',
            }
        ],
        description: {
            type: string,
        },
        comments: [
            {
                type: Types.ObjectId,
                ref: 'Comment',
            }
        ],
        reported: [
            {
                type: Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = model("Post", postSchema);