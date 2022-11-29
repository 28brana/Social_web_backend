import { model, Schema, Types } from 'mongoose'

const commentSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User',
        },
        text: {
            type: String,
        },
        // reply: [
        //     {
        //         type: Types.ObjectId,
        //         ref: 'Comment'
        //     }
        // ]
    },
    {
        timestamps: true
    }
);

export default model("Comment", commentSchema);