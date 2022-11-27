import moment from 'moment';
import { model, Schema } from 'mongoose'

const otpSchema = new Schema(
    {
        email: {
            type: String,
            unique: true
        },
        otp: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: new Date(),
        },
        expiredAt: {
            type: Date,
            default: moment().add('15', 'm').toDate(),
        }
    },

);

export default model("Otp", otpSchema);



