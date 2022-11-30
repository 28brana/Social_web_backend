import { model, Schema, Types } from 'mongoose'

const notificationsSchema = new Schema(
    {
        text: {
            type: string
        },
        picUrl: {
            type: string
        },
        isSeen: {
            type: boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

export default model("Notification", notificationsSchema);