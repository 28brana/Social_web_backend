import { model, Schema, Types } from 'mongoose'

const postSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User',
        },
        content: [
            {
                type: {
                    type: String,
                    enum: ['video', 'image']
                },
                url: {
                    type: String,
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
            type: String,
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
                unique: true,
            }
        ]
    },
    {
        timestamps: true
    }
);

export default model("Post", postSchema);



