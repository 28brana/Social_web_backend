const { model, Schema, Types } = require('mongoose');

const notificationsSchema = new Schema(
    {
        friendRequest: [
            {
                type: Types.ObjectId,
                ref: 'User'
            }
        ],
        notifications: [
            {
                user: {
                    type: Types.ObjectId,
                    ref: 'User'
                },
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
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = model("Post", notificationsSchema);