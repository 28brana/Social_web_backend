const { model, Schema, Types } = require('mongoose');

const commentSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User',
        },
        text: {
            type: string,
        },
        reply: [
            {
                type: Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = model("Comment", commentSchema);