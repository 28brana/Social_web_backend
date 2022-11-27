import user from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';
import otpGenerator from 'otp-generator';
import { sendMailOtp } from '../services/auth.service.js';
import otp from '../models/otp.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = catchAsync(async (req, res) => {
    const body = req.body;
    const userData = await user.findOne({ username: body.username });
    if (!userData) {
        return res.status(500).json({ msg: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(body.password, userData.password);

    if (passwordMatch) {
        const accessToken = jwt.sign({
            id: userData._id,
        }, process.env.JWT_SECRET, { expiresIn: '3d' })
        const { password, ...other } = userData._doc;
        return res.status(201).json({ ...other, accessToken });
    }

    return res.status(500).json({ msg: 'Password doesnt match' });

})

export const register = catchAsync(async (req, res) => {
    const body = req.body;

    const newUser = new user({
        username: body.username,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
    });

    const result = await newUser.save();


    return res.json({ msg: 'Registered Successfully' });
})

// Required
// {email}
export const sendOtp = catchAsync(async (req, res) => {
    const { email } = req.body;
    let generatedOtp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });

    const otpObject = await otp.find({ email });
    if (!otpObject.length) {
        const newOtp = new otp({
            email,
            otp: await bcrypt.hash(generatedOtp, 10),
        })
        await newOtp.save();
    } else {
        await otp.findOneAndUpdate({ email }, { $set: { otp: await bcrypt.hash(generatedOtp, 10) } });
    }

    const isSent = await sendMailOtp(email, generatedOtp);
    if (isSent) {
        return res.status(201).json({ isSent, msg: 'Otp is send Successfully' });
    }
    return res.status(500).json({ msg: 'Thier is some Error while sending otp' });
})

// Required
// {email,otp}
export const verifyOtp = catchAsync(async (req, res) => {
    const body = req.body;
    const otpData = await otp.findOne({ email: body.email });
    if (!otpData) {
        return res.status(400).json({ msg: 'Wrong Email' });
    }
    const isMatched = await bcrypt.compare(body.otp, otpData.otp);
    if (!isMatched) {
        return res.status(400).json({ msg: 'Wrong Otp ' });
    }

    if (otpData.expiredAt < new Date()) {
        return res.status(400).json({ msg: 'OTP is expired' });
    }
    // console.log(otpData, body);
    const result = await user.findOneAndUpdate({ email: body.email }, { $set: { "isVerified": true }, });
    const accessToken = jwt.sign({
        id: result._id,
    }, process.env.JWT_SECRET, { expiresIn: '3d' })
    const { password, ...other } = result._doc;

    return res.status(201).json({ msg: 'Verified', ...other, accessToken });
})


// {
//     "username": "28brana",
//     "email": "28brana@gmail.com",
//     "phone": "7814368012",
//     "password":"12345678",
// },